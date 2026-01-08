// Test to validate all word fragments in words.js

// Load the word groups by requiring the HTML file and extracting from script
const fs = require('fs');

// Read words.js and extract the wordGroups variable
const wordsContent = fs.readFileSync('./words.js', 'utf8');

// Extract the array content between the brackets
const match = wordsContent.match(/const wordGroups = (\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not extract wordGroups from words.js');
    process.exit(1);
}

const wordGroups = eval('(' + match[1] + ')');

console.log('=== WORD FRAGMENT VALIDATION TEST ===\n');
console.log(`Total word groups: ${wordGroups.length}\n`);

let totalErrors = 0;
let totalWarnings = 0;

// Test each word group
wordGroups.forEach((group, groupIndex) => {
    console.log(`\n--- Group ${groupIndex + 1}: ${group.theme} ---`);

    const errors = [];
    const warnings = [];

    // Validate theme
    if (!group.theme || group.theme.length === 0) {
        errors.push('Missing theme');
    }

    // Validate words array
    if (!group.words || !Array.isArray(group.words)) {
        errors.push('Missing or invalid words array');
        console.log('✗ ERRORS:', errors.join(', '));
        totalErrors += errors.length;
        return;
    }

    if (group.words.length !== 4) {
        errors.push(`Expected 4 words, got ${group.words.length}`);
    }

    // Validate decoy
    if (!group.decoy || !Array.isArray(group.decoy)) {
        errors.push('Missing or invalid decoy array');
    }

    // Validate each word's fragments
    group.words.forEach((wordFragments, wordIndex) => {
        if (!Array.isArray(wordFragments)) {
            errors.push(`Word ${wordIndex + 1} is not an array`);
            return;
        }

        if (wordFragments.length !== 5) {
            errors.push(`Word ${wordIndex + 1} has ${wordFragments.length} fragments, expected 5`);
        }

        // Check for empty fragments
        const emptyFragments = wordFragments.filter(f => !f || f.length === 0);
        if (emptyFragments.length > 0) {
            errors.push(`Word ${wordIndex + 1} has ${emptyFragments.length} empty fragment(s)`);
        }

        // Reconstruct word
        const fullWord = wordFragments.join('').toUpperCase();
        console.log(`  Word ${wordIndex + 1}: ${fullWord} [${wordFragments.join(', ')}]`);

        // Check word length
        if (fullWord.length < 5 || fullWord.length > 15) {
            warnings.push(`Word ${wordIndex + 1} (${fullWord}) length ${fullWord.length} is unusual (expected 5-15)`);
        }

        // Check fragment lengths
        wordFragments.forEach((frag, fragIndex) => {
            if (frag.length < 1 || frag.length > 3) {
                warnings.push(`Word ${wordIndex + 1} fragment ${fragIndex + 1} "${frag}" has length ${frag.length} (expected 1-3)`);
            }
        });
    });

    // Validate decoy fragments
    if (group.decoy) {
        if (group.decoy.length !== 5) {
            errors.push(`Decoy has ${group.decoy.length} fragments, expected 5`);
        }

        const emptyDecoyFragments = group.decoy.filter(f => !f || f.length === 0);
        if (emptyDecoyFragments.length > 0) {
            errors.push(`Decoy has ${emptyDecoyFragments.length} empty fragment(s)`);
        }

        const decoyWord = group.decoy.join('').toUpperCase();
        console.log(`  Decoy: ${decoyWord} [${group.decoy.join(', ')}]`);

        if (decoyWord.length < 5 || decoyWord.length > 15) {
            warnings.push(`Decoy (${decoyWord}) length ${decoyWord.length} is unusual (expected 5-15)`);
        }

        group.decoy.forEach((frag, fragIndex) => {
            if (frag.length < 1 || frag.length > 3) {
                warnings.push(`Decoy fragment ${fragIndex + 1} "${frag}" has length ${frag.length} (expected 1-3)`);
            }
        });
    }

    // Check for duplicate fragments in each column (this would cause conflicts)
    const columnFragments = [[], [], [], [], []];

    // Collect fragments from all words
    group.words.forEach((wordFragments) => {
        wordFragments.forEach((frag, colIndex) => {
            columnFragments[colIndex].push(frag.toUpperCase());
        });
    });

    // Add decoy fragments
    if (group.decoy) {
        group.decoy.forEach((frag, colIndex) => {
            columnFragments[colIndex].push(frag.toUpperCase());
        });
    }

    // Check for duplicates in each column
    columnFragments.forEach((column, colIndex) => {
        const seen = {};
        column.forEach(frag => {
            if (seen[frag]) {
                errors.push(`Column ${colIndex + 1} has duplicate fragment "${frag}"`);
            } else {
                seen[frag] = true;
            }
        });
    });

    // Display results for this group
    if (errors.length > 0) {
        console.log(`  ✗ ERRORS (${errors.length}):`);
        errors.forEach(err => console.log(`    - ${err}`));
        totalErrors += errors.length;
    }

    if (warnings.length > 0) {
        console.log(`  ⚠ WARNINGS (${warnings.length}):`);
        warnings.forEach(warn => console.log(`    - ${warn}`));
        totalWarnings += warnings.length;
    }

    if (errors.length === 0 && warnings.length === 0) {
        console.log('  ✓ All fragments valid');
    }
});

console.log('\n\n=== SUMMARY ===');
console.log(`Total groups: ${wordGroups.length}`);
console.log(`Total errors: ${totalErrors}`);
console.log(`Total warnings: ${totalWarnings}`);

if (totalErrors === 0) {
    console.log('\n✓ All word groups are valid!');
} else {
    console.log(`\n✗ Found ${totalErrors} error(s) that need to be fixed`);
}

if (totalWarnings > 0) {
    console.log(`⚠ Found ${totalWarnings} warning(s) to review`);
}
