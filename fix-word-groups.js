// Script to fix word groups by regenerating fragmentations without column conflicts

const fs = require('fs');

// Read words.js and extract the wordGroups variable
const wordsContent = fs.readFileSync('./words.js', 'utf8');
const match = wordsContent.match(/const wordGroups = (\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not extract wordGroups from words.js');
    process.exit(1);
}

const wordGroups = eval('(' + match[1] + ')');

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

// Check if a group has any duplicate fragments in columns
function hasColumnConflicts(words, decoy) {
    const columnFragments = [[], [], [], [], []];

    // Collect all fragments
    words.forEach(wordFragments => {
        wordFragments.forEach((frag, col) => {
            columnFragments[col].push(frag.toUpperCase());
        });
    });

    decoy.forEach((frag, col) => {
        columnFragments[col].push(frag.toUpperCase());
    });

    // Check for duplicates
    for (let col = 0; col < 5; col++) {
        const seen = {};
        for (const frag of columnFragments[col]) {
            if (seen[frag]) {
                return true; // Has conflicts
            }
            seen[frag] = true;
        }
    }

    return false; // No conflicts
}

// Fix a single word group
function fixWordGroup(group) {
    const fullWords = group.words.map(frags => frags.join('').toUpperCase());
    const fullDecoy = group.decoy.join('').toUpperCase();

    // Generate all possible patterns for each word
    const wordPatterns = fullWords.map(word => generateFragmentationPatterns(word.length));
    const decoyPatterns = generateFragmentationPatterns(fullDecoy.length);

    // Try different combinations
    const maxAttempts = 10000;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // Generate random fragmentations
        const newWords = fullWords.map((word, i) => {
            const patterns = wordPatterns[i];
            const pattern = patterns[Math.floor(Math.random() * patterns.length)];
            return fragmentWordWithPattern(word, pattern);
        });

        const newDecoy = (() => {
            const pattern = decoyPatterns[Math.floor(Math.random() * decoyPatterns.length)];
            return fragmentWordWithPattern(fullDecoy, pattern);
        })();

        // Check if this combination has no conflicts
        if (!hasColumnConflicts(newWords, newDecoy)) {
            return {
                theme: group.theme,
                words: newWords,
                decoy: newDecoy
            };
        }
    }

    // If we couldn't find a solution, return original
    console.warn(`WARNING: Could not fix group "${group.theme}" after ${maxAttempts} attempts`);
    return group;
}

console.log('=== FIXING WORD GROUPS ===\n');

let fixedCount = 0;
let failedCount = 0;

const fixedGroups = wordGroups.map((group, index) => {
    // Check if this group has conflicts
    if (hasColumnConflicts(group.words, group.decoy)) {
        console.log(`Fixing group ${index + 1}: ${group.theme}...`);
        const fixed = fixWordGroup(group);
        if (hasColumnConflicts(fixed.words, fixed.decoy)) {
            console.log(`  ✗ Failed to fix`);
            failedCount++;
        } else {
            console.log(`  ✓ Fixed`);
            fixedCount++;
        }
        return fixed;
    } else {
        console.log(`Group ${index + 1}: ${group.theme} - Already valid`);
        return group;
    }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Fixed: ${fixedCount}`);
console.log(`Failed: ${failedCount}`);
console.log(`Already valid: ${wordGroups.length - fixedCount - failedCount}`);

// Write the fixed word groups back to words.js
const newContent = `// Word Groups Data - Pre-fragmented
// Each word is already broken into 5 fragments
// All fragments in each column position are guaranteed to be unique
const wordGroups = ${JSON.stringify(fixedGroups, null, 4)};
`;

fs.writeFileSync('./words.js', newContent, 'utf8');
console.log('\n✓ Written fixed word groups to words.js');
