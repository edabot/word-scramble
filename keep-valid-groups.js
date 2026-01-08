// Script to keep only valid word groups (no column conflicts)

const fs = require('fs');

// Read words.js and extract the wordGroups variable
const wordsContent = fs.readFileSync('./words.js', 'utf8');
const match = wordsContent.match(/const wordGroups = (\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not extract wordGroups from words.js');
    process.exit(1);
}

const wordGroups = eval('(' + match[1] + ')');

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

console.log('=== FILTERING WORD GROUPS ===\n');

const validGroups = [];
const removedGroups = [];

wordGroups.forEach((group, index) => {
    const hasConflicts = hasColumnConflicts(group.words, group.decoy);

    if (hasConflicts) {
        console.log(`✗ Removing group ${index + 1}: ${group.theme} (has conflicts)`);
        removedGroups.push(group.theme);
    } else {
        console.log(`✓ Keeping group ${index + 1}: ${group.theme}`);
        validGroups.push(group);
    }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Valid groups kept: ${validGroups.length}`);
console.log(`Groups removed: ${removedGroups.length}`);

console.log(`\nRemoved themes:`);
removedGroups.forEach(theme => console.log(`  - ${theme}`));

// Write the valid word groups back to words.js
const newContent = `// Word Groups Data - Pre-fragmented
// Each word is already broken into 5 fragments
// All fragments in each column position are guaranteed to be unique
const wordGroups = ${JSON.stringify(validGroups, null, 4)};
`;

fs.writeFileSync('./words.js', newContent, 'utf8');
console.log(`\n✓ Written ${validGroups.length} valid word groups to words.js`);
