// Test to demonstrate the fragmentation optimization
// This shows how the new algorithm reduces column conflicts

// Sample words from the game
const testWords = ['FLOWERS', 'SHOVEL', 'MULCH', 'WATER'];
const testDecoy = 'LAPTOP';

console.log('=== FRAGMENTATION CONFLICT TEST ===\n');
console.log('Testing words:', testWords);
console.log('Decoy:', testDecoy);
console.log('\n--- OLD METHOD (random fragmentation) ---');

// Old method: fragment each word independently
function fragmentWordOld(word) {
    const len = word.length;
    const sizes = [];
    let remaining = len;

    for (let i = 0; i < 5; i++) {
        const fragmentsLeft = 5 - i;
        const maxPossible = Math.min(3, remaining - (fragmentsLeft - 1));

        let size;
        if (maxPossible <= 1) {
            size = 1;
        } else if (maxPossible === 2) {
            size = Math.random() < 0.5 ? 1 : 2;
        } else {
            const rand = Math.random();
            if (rand < 0.33) size = 1;
            else if (rand < 0.67) size = 2;
            else size = 3;
        }

        sizes.push(size);
        remaining -= size;
    }

    const fragments = [];
    let index = 0;
    for (const size of sizes) {
        fragments.push(word.substring(index, index + size));
        index += size;
    }

    return fragments;
}

function countConflicts(fragmentSets) {
    let conflicts = 0;

    for (let col = 0; col < 5; col++) {
        const seenFragments = {};

        for (let row = 0; row < 5; row++) {
            const fragment = fragmentSets[row][col].toUpperCase();

            if (seenFragments[fragment]) {
                conflicts++;
                console.log(`  Column ${col + 1}: "${fragment}" conflicts (duplicate fragment)`);
            } else {
                seenFragments[fragment] = true;
            }
        }
    }

    return conflicts;
}

// Test countConflicts function
console.log('=== TESTING countConflicts FUNCTION ===\n');

// Test case 1: No conflicts
console.log('Test 1: No conflicts (all fragments unique in each column)');
const noConflicts = [
    ['FL', 'OW', 'ER', 'S', 'T'],      // FLOWERST (hypothetical)
    ['SH', 'OV', 'EL', 'Y', 'Z'],      // SHOVELYZ
    ['MU', 'LC', 'H', 'I', 'N'],       // MULCHIN
    ['WA', 'TE', 'R', 'F', 'A'],       // WATERFA
    ['LA', 'PT', 'OP', 'D', 'E']       // LAPTOPDE
];
console.log('Expected: 0 conflicts');
console.log('Result:', countConflicts(noConflicts));

// Test case 2: One conflict in column 0
console.log('\nTest 2: One conflict (duplicate "SH" in column 0)');
const oneConflict = [
    ['SH', 'OW', 'ER', 'S', 'T'],
    ['SH', 'OV', 'EL', 'Y', 'Z'],      // Duplicate "SH" in col 0
    ['MU', 'LC', 'H', 'I', 'N'],
    ['WA', 'TE', 'R', 'F', 'A'],
    ['LA', 'PT', 'OP', 'D', 'E']
];
console.log('Expected: 1 conflict');
console.log('Result:', countConflicts(oneConflict));

// Test case 3: Multiple conflicts across columns
console.log('\nTest 3: Multiple conflicts (duplicates in columns 0, 1, and 2)');
const multipleConflicts = [
    ['FL', 'ER', 'ER', 'S', 'T'],
    ['FL', 'OV', 'EL', 'Y', 'Z'],      // Duplicate "FL" in col 0
    ['MU', 'LC', 'H', 'I', 'N'],
    ['WA', 'ER', 'R', 'F', 'A'],       // Duplicate "ER" in col 1 and col 2
    ['LA', 'PT', 'OP', 'D', 'E']
];
console.log('Expected: 3 conflicts (FL in col 0, ER in col 1, ER in col 2)');
console.log('Result:', countConflicts(multipleConflicts));

// Test case 4: Same fragment appears 3 times in one column
console.log('\nTest 4: Same fragment appears 3 times (triple "ER" in column 1)');
const tripleConflict = [
    ['FL', 'ER', 'OW', 'S', 'T'],
    ['SH', 'ER', 'EL', 'Y', 'Z'],      // Three "ER" in col 1
    ['MU', 'ER', 'H', 'I', 'N'],       // (counts as 2 conflicts)
    ['WA', 'TE', 'R', 'F', 'A'],
    ['LA', 'PT', 'OP', 'D', 'E']
];
console.log('Expected: 2 conflicts (second and third occurrence of "ER")');
console.log('Result:', countConflicts(tripleConflict));

console.log('\n=== END countConflicts TESTS ===\n\n');

// Test old method 5 times
let oldConflictSum = 0;
for (let test = 1; test <= 5; test++) {
    console.log(`\nTest ${test}:`);
    const oldFragments = [...testWords, testDecoy].map(w => fragmentWordOld(w));

    oldFragments.forEach((frags, i) => {
        const word = i < 4 ? testWords[i] : testDecoy;
        console.log(`  ${word}: [${frags.join(', ')}]`);
    });

    const conflicts = countConflicts(oldFragments);
    console.log(`  Total conflicts: ${conflicts}`);
    oldConflictSum += conflicts;
}

console.log(`\nAverage conflicts (old method): ${(oldConflictSum / 5).toFixed(1)}`);

console.log('\n\n--- NEW METHOD (optimized fragmentation) ---');

// New method
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

function fragmentWordWithPattern(word, pattern) {
    const fragments = [];
    let index = 0;

    for (const size of pattern) {
        fragments.push(word.substring(index, index + size));
        index += size;
    }

    return fragments;
}

function generateOptimalFragmentations(words, decoyWord) {
    const allWords = [...words, decoyWord];
    const patterns = allWords.map(word => generateFragmentationPatterns(word.length));

    const maxCombinations = 1000;
    let bestFragmentations = null;
    let bestConflictScore = Infinity;

    for (let attempt = 0; attempt < maxCombinations; attempt++) {
        const fragmentSets = [];

        for (let i = 0; i < allWords.length; i++) {
            const wordPatterns = patterns[i];
            const randomPattern = wordPatterns[Math.floor(Math.random() * wordPatterns.length)];
            fragmentSets.push(fragmentWordWithPattern(allWords[i], randomPattern));
        }

        const conflicts = countConflicts(fragmentSets);

        if (conflicts < bestConflictScore) {
            bestConflictScore = conflicts;
            bestFragmentations = fragmentSets;

            if (conflicts === 0) {
                break;
            }
        }
    }

    return { fragmentations: bestFragmentations, conflicts: bestConflictScore };
}

// Test new method 5 times
let newConflictSum = 0;
for (let test = 1; test <= 5; test++) {
    console.log(`\nTest ${test}:`);
    const { fragmentations, conflicts } = generateOptimalFragmentations(testWords, testDecoy);

    fragmentations.forEach((frags, i) => {
        const word = i < 4 ? testWords[i] : testDecoy;
        console.log(`  ${word}: [${frags.join(', ')}]`);
    });

    console.log(`  Total conflicts: ${conflicts}`);
    newConflictSum += conflicts;
}

console.log(`\nAverage conflicts (new method): ${(newConflictSum / 5).toFixed(1)}`);

console.log('\n=== RESULTS ===');
console.log(`Old method average: ${(oldConflictSum / 5).toFixed(1)} conflicts`);
console.log(`New method average: ${(newConflictSum / 5).toFixed(1)} conflicts`);
console.log(`Improvement: ${((oldConflictSum - newConflictSum) / 5).toFixed(1)} fewer conflicts per puzzle`);
