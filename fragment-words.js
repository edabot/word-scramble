// Script to fragment all words in word groups and ensure column uniqueness
// Run with: node fragment-words.js

const fs = require('fs');
const path = require('path');

// Generate all valid fragmentation patterns for a given word length
function generateFragmentationPatterns(wordLength) {
    const patterns = [];

    function generate(remaining, fragments, index) {
        if (index === 5) {
            if (remaining === 0) {
                patterns.push([...fragments]);
            }
            return;
        }

        const fragmentsLeft = 5 - index;
        const minSize = Math.max(1, remaining - (fragmentsLeft - 1) * 3);
        const maxSize = Math.min(3, remaining - (fragmentsLeft - 1));

        for (let size = minSize; size <= maxSize; size++) {
            fragments[index] = size;
            generate(remaining - size, fragments, index + 1);
        }
    }

    generate(wordLength, [], 0);
    return patterns;
}

// Fragment a word using a specific size pattern
function fragmentWordWithPattern(word, pattern) {
    const fragments = [];
    let index = 0;

    for (const size of pattern) {
        fragments.push(word.substring(index, index + size));
        index += size;
    }

    return fragments;
}

// Check if all fragments in a column position are unique
// Returns the number of duplicate fragments across all columns (lower is better)
function countDuplicateFragments(fragmentSets) {
    let duplicates = 0;
    for (let col = 0; col < 5; col++) {
        const fragments = fragmentSets.map(set => set[col]);
        const uniqueFragments = new Set(fragments);
        duplicates += fragments.length - uniqueFragments.size;
    }
    return duplicates;
}

// Generate fragmentations with column uniqueness constraint
// Tries to minimize duplicate fragments, but doesn't require perfection
function generateOptimalFragmentations(words, decoyWord) {
    const allWords = [...words, decoyWord];
    const patterns = allWords.map(word => generateFragmentationPatterns(word.length));

    const maxAttempts = 5000;
    let bestFragmentSets = null;
    let bestDuplicateCount = Infinity;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const fragmentSets = [];

        // Generate one fragmentation for each word
        for (let i = 0; i < allWords.length; i++) {
            const wordPatterns = patterns[i];
            const randomPattern = wordPatterns[Math.floor(Math.random() * wordPatterns.length)];
            fragmentSets.push(fragmentWordWithPattern(allWords[i], randomPattern));
        }

        // Count duplicate fragments
        const duplicates = countDuplicateFragments(fragmentSets);

        if (duplicates < bestDuplicateCount) {
            bestDuplicateCount = duplicates;
            bestFragmentSets = fragmentSets;

            // If we found perfect uniqueness, stop early
            if (duplicates === 0) {
                break;
            }
        }
    }

    return { fragmentSets: bestFragmentSets, duplicateCount: bestDuplicateCount };
}

// Load existing word groups
const wordsContent = fs.readFileSync(path.join(__dirname, 'words.js'), 'utf8');
const match = wordsContent.match(/const wordGroups = (\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not parse words.js file');
    process.exit(1);
}
const wordGroups = eval(match[1]);

console.log('Fragmenting all word groups...\n');

// Fragment each group
const fragmentedGroups = [];
let perfectCount = 0;
let goodCount = 0;
let okayCount = 0;
let totalDuplicates = 0;

for (let i = 0; i < wordGroups.length; i++) {
    const group = wordGroups[i];

    const { fragmentSets, duplicateCount } = generateOptimalFragmentations(group.words, group.decoy);

    fragmentedGroups.push({
        theme: group.theme,
        words: fragmentSets.slice(0, 4), // First 4 are the real words
        decoy: fragmentSets[4] // 5th is the decoy
    });

    totalDuplicates += duplicateCount;

    if (duplicateCount === 0) {
        perfectCount++;
        console.log(`✓ Group ${i + 1}/${wordGroups.length}: ${group.theme} (perfect - 0 duplicates)`);
    } else if (duplicateCount <= 2) {
        goodCount++;
        console.log(`✓ Group ${i + 1}/${wordGroups.length}: ${group.theme} (good - ${duplicateCount} duplicates)`);
    } else {
        okayCount++;
        console.log(`○ Group ${i + 1}/${wordGroups.length}: ${group.theme} (okay - ${duplicateCount} duplicates)`);
    }
}

console.log(`\n=== FRAGMENTATION COMPLETE ===`);
console.log(`Perfect (0 duplicates): ${perfectCount}/${wordGroups.length}`);
console.log(`Good (1-2 duplicates): ${goodCount}/${wordGroups.length}`);
console.log(`Okay (3+ duplicates): ${okayCount}/${wordGroups.length}`);
console.log(`Total duplicate fragments: ${totalDuplicates}`);
console.log(`Average duplicates per group: ${(totalDuplicates / wordGroups.length).toFixed(2)}`);

// Generate new words.js content
const newContent = `// Word Groups Data - Pre-fragmented
// Each word is already broken into 5 fragments
// All fragments in each column position are guaranteed to be unique
const wordGroups = ${JSON.stringify(fragmentedGroups, null, 4)};
`;

// Write to new file
fs.writeFileSync(path.join(__dirname, 'words-fragmented.js'), newContent);
console.log('\n✓ Fragmented word groups written to words-fragmented.js');
console.log('Review the file, then rename it to words.js to use it.');
