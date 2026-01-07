// Test suite for words.js validation
// Run with: node test-words.js

// Load the word groups
const fs = require('fs');
const path = require('path');

// Read and parse the words.js file
const wordsContent = fs.readFileSync(path.join(__dirname, 'words.js'), 'utf8');
// Extract the array by evaluating the file in a safer way
const match = wordsContent.match(/const wordGroups = (\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not parse words.js file');
    process.exit(1);
}
const wordGroups = eval(match[1]);

console.log('=== WORD GROUPS VALIDATION TEST ===\n');
console.log(`Total word groups: ${wordGroups.length}\n`);

let totalErrors = 0;
let totalWarnings = 0;

// Track decoy usage
const decoyUsage = {};

// Helper function to check if a word is plural
function isPlural(word) {
    // Simple plural detection - ends with S but not SS, and not just 2 letters
    if (word.length <= 2) return false;
    if (word.endsWith('SS')) return false;
    if (word.endsWith('S')) return true;
    return false;
}

// Helper function to count plurals in an array
function countPlurals(words) {
    return words.filter(isPlural).length;
}

// Validate each word group
wordGroups.forEach((group, index) => {
    const groupErrors = [];
    const groupWarnings = [];

    // Check theme
    if (!group.theme || group.theme.length < 5 || group.theme.length > 12) {
        groupErrors.push(`Theme "${group.theme}" is not between 5-12 characters (length: ${group.theme?.length || 0})`);
    }

    // Check decoy
    if (!group.decoy || group.decoy.length < 5 || group.decoy.length > 12) {
        groupErrors.push(`Decoy "${group.decoy}" is not between 5-12 characters (length: ${group.decoy?.length || 0})`);
    }

    // Track decoy usage
    if (group.decoy) {
        if (decoyUsage[group.decoy]) {
            decoyUsage[group.decoy]++;
            groupWarnings.push(`Decoy "${group.decoy}" is reused (used ${decoyUsage[group.decoy]} times)`);
        } else {
            decoyUsage[group.decoy] = 1;
        }
    }

    // Check words array
    if (!group.words || !Array.isArray(group.words)) {
        groupErrors.push('Words property is missing or not an array');
    } else {
        if (group.words.length !== 4) {
            groupErrors.push(`Word list should have exactly 4 words (found: ${group.words.length})`);
        }

        // Check each word
        group.words.forEach((word, wordIndex) => {
            if (!word || word.length < 5 || word.length > 12) {
                groupErrors.push(`Word #${wordIndex + 1} "${word}" is not between 5-12 characters (length: ${word?.length || 0})`);
            }
        });

        // Check plural count
        const pluralCount = countPlurals(group.words);
        if (pluralCount > 1) {
            const pluralWords = group.words.filter(isPlural);
            groupErrors.push(`Has ${pluralCount} plural words (max 1 allowed): ${pluralWords.join(', ')}`);
        }
    }

    // Print results for this group
    if (groupErrors.length > 0 || groupWarnings.length > 0) {
        console.log(`\n❌ Group #${index + 1}: ${group.theme}`);

        if (groupErrors.length > 0) {
            console.log('  ERRORS:');
            groupErrors.forEach(error => console.log(`    - ${error}`));
            totalErrors += groupErrors.length;
        }

        if (groupWarnings.length > 0) {
            console.log('  WARNINGS:');
            groupWarnings.forEach(warning => console.log(`    - ${warning}`));
            totalWarnings += groupWarnings.length;
        }
    }
});

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Total groups tested: ${wordGroups.length}`);
console.log(`Total errors: ${totalErrors}`);
console.log(`Total warnings: ${totalWarnings}`);

// Decoy reuse summary
const reusedDecoys = Object.entries(decoyUsage).filter(([_, count]) => count > 1);
if (reusedDecoys.length > 0) {
    console.log('\n=== REUSED DECOYS ===');
    reusedDecoys.forEach(([decoy, count]) => {
        console.log(`  "${decoy}" used ${count} times`);
    });
}

// Character length distribution
console.log('\n=== CHARACTER LENGTH DISTRIBUTION ===');
const lengthCounts = {};
wordGroups.forEach(group => {
    group.words.forEach(word => {
        const len = word.length;
        lengthCounts[len] = (lengthCounts[len] || 0) + 1;
    });
});
Object.keys(lengthCounts).sort((a, b) => a - b).forEach(len => {
    console.log(`  ${len} characters: ${lengthCounts[len]} words`);
});

// Plural distribution
console.log('\n=== PLURAL DISTRIBUTION ===');
let groupsWithZeroPlurals = 0;
let groupsWithOnePlural = 0;
let groupsWithTwoPlurals = 0;
let groupsWithMorePlurals = 0;

wordGroups.forEach(group => {
    const count = countPlurals(group.words);
    if (count === 0) groupsWithZeroPlurals++;
    else if (count === 1) groupsWithOnePlural++;
    else if (count === 2) groupsWithTwoPlurals++;
    else groupsWithMorePlurals++;
});

console.log(`  0 plurals: ${groupsWithZeroPlurals} groups`);
console.log(`  1 plural:  ${groupsWithOnePlural} groups`);
console.log(`  2+ plurals: ${groupsWithTwoPlurals + groupsWithMorePlurals} groups (ERROR)`);

// Exit with error code if there are errors
if (totalErrors > 0) {
    console.log('\n❌ VALIDATION FAILED');
    process.exit(1);
} else {
    console.log('\n✅ ALL VALIDATION CHECKS PASSED');
    if (totalWarnings > 0) {
        console.log(`⚠️  ${totalWarnings} warnings found`);
    }
    process.exit(0);
}
