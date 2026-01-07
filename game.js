// Game State
const GameState = {
    SELECTING: 'selecting',
    WORD_COMPLETE: 'complete',
    CHECKING: 'checking',
    WON: 'won',
    LOST: 'lost'
};

let gameState = {
    currentState: GameState.SELECTING,
    selectedFragments: [],
    foundWords: [],
    currentColumn: 0,
    grid: [],
    solution: [],
    wordList: [],
    themeWord: '',
    themeRevealed: false,
    gridMetadata: []
};

// Utility function to shuffle array
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Calculate fragment sizes for a word
function calculateFragmentSizes(wordLength) {
    const twoLetterCount = wordLength - 5;
    const oneLetterCount = 5 - twoLetterCount;

    const sizes = [
        ...Array(twoLetterCount).fill(2),
        ...Array(oneLetterCount).fill(1)
    ];

    return shuffle(sizes);
}

// Fragment a word into 5 pieces
function fragmentWord(word) {
    const len = word.length;
    const sizes = calculateFragmentSizes(len);
    const fragments = [];

    let index = 0;
    for (const size of sizes) {
        fragments.push(word.substring(index, index + size));
        index += size;
    }

    return fragments;
}

// Create initial grid (before scrambling)
function createInitialGrid(words) {
    const grid = [];
    const metadata = [];

    words.forEach((word, wordIdx) => {
        const fragments = fragmentWord(word);
        grid.push(fragments);

        // Store metadata for each fragment
        fragments.forEach((fragment, fragIdx) => {
            metadata.push({
                fragment: fragment,
                wordIndex: wordIdx,
                fragmentIndex: fragIdx,
                originalRow: wordIdx,
                originalCol: fragIdx
            });
        });
    });

    return { grid, metadata };
}

// Check if column arrangement is valid (no adjacent fragments from same word)
function isValidColumnArrangement(column, metadata) {
    for (let i = 0; i < column.length - 1; i++) {
        const frag1 = column[i];
        const frag2 = column[i + 1];

        // Find metadata for these fragments
        const meta1 = metadata.find(m => m.fragment === frag1.fragment && m.currentRow === frag1.currentRow);
        const meta2 = metadata.find(m => m.fragment === frag2.fragment && m.currentRow === frag2.currentRow);

        // If both from same original word, invalid
        if (meta1 && meta2 && meta1.wordIndex === meta2.wordIndex) {
            return false;
        }
    }
    return true;
}

// Deterministic arrangement that ensures no adjacency
function arrangeColumnDeterministically(column) {
    // Simple strategy: try to alternate word indices
    const sorted = [...column].sort((a, b) => a.wordIndex - b.wordIndex);

    // Distribute evenly
    const result = [];
    const groups = [[], [], [], [], []];

    sorted.forEach(item => {
        groups[item.wordIndex].push(item);
    });

    // Interleave
    for (let i = 0; i < 5; i++) {
        for (let g = 0; g < 5; g++) {
            if (groups[g].length > 0) {
                result.push(groups[g].shift());
                if (result.length === 5) break;
            }
        }
        if (result.length === 5) break;
    }

    return result;
}

// Check if arrangement has at most one consecutive pair per word
function countConsecutivePairs(scrambled) {
    const pairCounts = {}; // Track consecutive pairs for each word

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 4; col++) {  // Check columns 0-3 (pairs with next column)
            const currentMeta = scrambled.metadata.find(m => m.row === row && m.col === col);
            const nextMeta = scrambled.metadata.find(m => m.row === row && m.col === col + 1);

            // Skip if either is a decoy
            if (!currentMeta || !nextMeta || currentMeta.isDecoy || nextMeta.isDecoy) {
                continue;
            }

            // Check if they're consecutive fragments of the same word
            if (currentMeta.wordIndex === nextMeta.wordIndex &&
                currentMeta.fragmentIndex + 1 === nextMeta.fragmentIndex) {
                const wordKey = currentMeta.wordIndex;
                pairCounts[wordKey] = (pairCounts[wordKey] || 0) + 1;

                // If any word has more than one consecutive pair, invalid
                if (pairCounts[wordKey] > 1) {
                    return false;
                }
            }
        }
    }

    return true;
}

// Scramble grid columns
function scrambleGrid(grid, metadata, decoyWord) {
    const scrambled = [[], [], [], [], []];  // 5 rows now (4 words + 1 decoy)
    const newMetadata = [];
    const columnData = [];

    // Fragment the decoy word
    const decoyFragments = fragmentWord(decoyWord);

    // First, prepare all columns with their fragments
    for (let col = 0; col < 5; col++) {
        const column = [];
        for (let row = 0; row < 4; row++) {
            const fragment = grid[row][col];
            const meta = metadata.find(m =>
                m.originalRow === row && m.originalCol === col
            );
            column.push({
                fragment: fragment,
                wordIndex: meta.wordIndex,
                fragmentIndex: meta.fragmentIndex,
                originalRow: row,
                originalCol: col,
                isDecoy: false
            });
        }

        // Add decoy fragment for this column
        column.push({
            fragment: decoyFragments[col],
            wordIndex: -1,
            fragmentIndex: -1,
            originalRow: 4,
            originalCol: col,
            isDecoy: true
        });

        columnData.push(column);
    }

    // Now scramble all columns with global constraints
    const maxAttempts = 10000;
    let attempts = 0;
    let validArrangement = false;

    while (attempts < maxAttempts && !validArrangement) {
        attempts++;

        // Shuffle each column
        const shuffledColumns = columnData.map(col => shuffle([...col]));

        // Build temporary metadata for validation
        const tempMetadata = [];
        for (let col = 0; col < 5; col++) {
            for (let row = 0; row < 5; row++) {
                tempMetadata.push({
                    fragment: shuffledColumns[col][row].fragment,
                    wordIndex: shuffledColumns[col][row].wordIndex,
                    fragmentIndex: shuffledColumns[col][row].fragmentIndex,
                    row: row,
                    col: col,
                    isDecoy: shuffledColumns[col][row].isDecoy
                });
            }
        }

        // Check vertical adjacency (no same word fragments vertically adjacent)
        let verticalValid = true;
        for (let col = 0; col < 5; col++) {
            for (let row = 0; row < 4; row++) {
                const current = shuffledColumns[col][row];
                const next = shuffledColumns[col][row + 1];

                if (!current.isDecoy && !next.isDecoy &&
                    current.wordIndex === next.wordIndex) {
                    verticalValid = false;
                    break;
                }
            }
            if (!verticalValid) break;
        }

        if (!verticalValid) continue;

        // Check consecutive pair constraint
        const tempScrambled = { metadata: tempMetadata };
        if (countConsecutivePairs(tempScrambled)) {
            validArrangement = true;

            // Place in final scrambled grid
            for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    scrambled[row][col] = shuffledColumns[col][row].fragment;
                }
            }

            // Set final metadata
            newMetadata.push(...tempMetadata);
        }
    }

    // Fallback if no valid arrangement found
    if (!validArrangement) {
        console.warn('Could not find arrangement with consecutive pair constraint, using simpler constraints');

        for (let col = 0; col < 5; col++) {
            let shuffled;
            let colAttempts = 0;

            while (colAttempts < 1000) {
                shuffled = shuffle([...columnData[col]]);

                // Just check vertical adjacency
                let valid = true;
                for (let i = 0; i < shuffled.length - 1; i++) {
                    if (!shuffled[i].isDecoy && !shuffled[i + 1].isDecoy) {
                        if (shuffled[i].wordIndex === shuffled[i + 1].wordIndex) {
                            valid = false;
                            break;
                        }
                    }
                }

                if (valid) break;
                colAttempts++;
            }

            // Place in scrambled grid
            for (let row = 0; row < 5; row++) {
                scrambled[row][col] = shuffled[row].fragment;
                newMetadata.push({
                    fragment: shuffled[row].fragment,
                    wordIndex: shuffled[row].wordIndex,
                    fragmentIndex: shuffled[row].fragmentIndex,
                    row: row,
                    col: col,
                    isDecoy: shuffled[row].isDecoy || false
                });
            }
        }
    }

    return { scrambled, newMetadata };
}

// Initialize new game
function initializeGame() {
    // Select random word group
    const group = wordGroups[Math.floor(Math.random() * wordGroups.length)];

    // Create initial grid
    const { grid, metadata } = createInitialGrid(group.words);

    // Scramble grid
    const { scrambled, newMetadata } = scrambleGrid(grid, metadata, group.decoy);

    // Reset game state
    gameState = {
        currentState: GameState.SELECTING,
        selectedFragments: [],
        foundWords: [],
        currentColumn: 0,
        grid: scrambled,
        solution: grid,
        wordList: group.words,
        themeWord: group.theme,
        themeRevealed: false,
        gridMetadata: newMetadata
    };

    // Render grid
    renderGrid();

    // Reset UI
    document.getElementById('theme').textContent = '????';
    document.getElementById('currentWord').textContent = '';
    document.getElementById('foundWordsList').innerHTML = '';
    document.getElementById('foundCount').textContent = '0/4';
    clearMessage();

    // Highlight first column
    highlightColumn(0);

    // Console log words for testing
    console.log('=== PUZZLE WORDS (for testing) ===');
    console.log('Theme:', gameState.themeWord);
    console.log('Words:', gameState.wordList);
    console.log('Decoy:', group.decoy);
    console.log('==================================');
}

// Render the grid
function renderGrid() {
    const gridElement = document.getElementById('puzzleGrid');
    gridElement.innerHTML = '';

    for (let row = 0; row < 5; row++) {  // 5 rows now (4 words + 1 decoy)
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement('div');
            cell.className = 'fragment-cell';
            cell.textContent = gameState.grid[row][col];
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Add click handler
            cell.addEventListener('click', () => handleFragmentClick(row, col));

            gridElement.appendChild(cell);
        }
    }
}

// Highlight available column
function highlightColumn(colIndex) {
    const cells = document.querySelectorAll('.fragment-cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        cell.classList.remove('available');

        // Check if this column and not used
        if (col === colIndex && !isCellUsed(row, col)) {
            cell.classList.add('available');
        }
    });
}

// Check if cell is already used in a found word
function isCellUsed(row, col) {
    const usedCells = gameState.foundWords.flatMap(word => {
        // Find which cells were used for this word
        const wordFragments = [];
        let currentCol = 0;

        // This is a simplification - in reality we'd need to track which cells were used
        // For now, we'll mark cells as used by adding a class
        return wordFragments;
    });

    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    return cell && cell.classList.contains('used');
}

// Handle fragment click
function handleFragmentClick(row, col) {
    // Check if correct column
    if (col !== gameState.currentColumn) {
        showMessage(`Please select from column ${gameState.currentColumn + 1}`, 'error');
        return;
    }

    // Check if already used
    if (isCellUsed(row, col)) {
        showMessage('This fragment is already used', 'error');
        return;
    }

    // Check if already selected
    const alreadySelected = gameState.selectedFragments.some(f => f.row === row && f.col === col);
    if (alreadySelected) {
        return;
    }

    // Get fragment and metadata
    const fragment = gameState.grid[row][col];
    const meta = gameState.gridMetadata.find(m => m.row === row && m.col === col);

    // Add to selection
    gameState.selectedFragments.push({
        row: row,
        col: col,
        fragment: fragment,
        wordIndex: meta.wordIndex,
        fragmentIndex: meta.fragmentIndex
    });

    // Update visual
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.classList.add('selected');
    cell.classList.remove('available');

    // Add selection number
    const numberSpan = document.createElement('span');
    numberSpan.className = 'selection-number';
    numberSpan.textContent = gameState.selectedFragments.length;
    cell.appendChild(numberSpan);

    // Move to next column
    gameState.currentColumn++;

    // Update display
    updateWordDisplay();

    // Check if word complete
    if (gameState.currentColumn < 5) {
        highlightColumn(gameState.currentColumn);
    } else {
        // Auto-submit when 5th fragment is selected
        gameState.currentState = GameState.WORD_COMPLETE;
        setTimeout(() => submitWord(), 300);
    }
}

// Update current word display
function updateWordDisplay() {
    const word = gameState.selectedFragments
        .map(f => f.fragment)
        .join('');
    document.getElementById('currentWord').textContent = word.toUpperCase();
}

// Animate fragments to a target row
function animateFragmentsToRow(fragments, targetRow, wordIndex) {
    // Store the fragments that need to be moved
    const fragmentsToMove = [...fragments];
    let completedAnimations = 0;

    // For each fragment, animate it to the target row
    fragmentsToMove.forEach((frag) => {
        const sourceCell = document.querySelector(`[data-row="${frag.row}"][data-col="${frag.col}"]`);
        const targetCell = document.querySelector(`[data-row="${targetRow}"][data-col="${frag.col}"]`);

        if (sourceCell && targetCell) {
            // Get positions
            const sourceRect = sourceCell.getBoundingClientRect();
            const targetRect = targetCell.getBoundingClientRect();

            // Calculate distance
            const deltaY = targetRect.top - sourceRect.top;

            // If already in target position, just apply styling
            if (deltaY === 0) {
                sourceCell.classList.add('used');
                sourceCell.classList.add(`solution-word-${wordIndex}`);
                sourceCell.classList.remove('selected');
                completedAnimations++;

                // If all animations complete, re-highlight first column
                if (completedAnimations === fragmentsToMove.length) {
                    setTimeout(() => highlightColumn(0), 50);
                }
                return;
            }

            // Create a clone for animation
            const clone = sourceCell.cloneNode(true);
            clone.style.position = 'fixed';
            clone.style.left = sourceRect.left + 'px';
            clone.style.top = sourceRect.top + 'px';
            clone.style.width = sourceRect.width + 'px';
            clone.style.height = sourceRect.height + 'px';
            clone.style.zIndex = '1000';
            clone.classList.add('animating');
            document.body.appendChild(clone);

            // Hide original cells temporarily
            sourceCell.style.opacity = '0';
            const targetCellRow = parseInt(targetCell.dataset.row);
            const targetCellCol = parseInt(targetCell.dataset.col);
            const targetMeta = gameState.gridMetadata.find(m => m.row === targetCellRow && m.col === targetCellCol);
            targetCell.style.opacity = '0';

            // Animate the clone
            setTimeout(() => {
                clone.style.transition = 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
                clone.style.top = targetRect.top + 'px';
            }, 10);

            // After animation completes
            setTimeout(() => {
                // Swap the grid data
                const temp = gameState.grid[frag.row][frag.col];
                gameState.grid[frag.row][frag.col] = gameState.grid[targetRow][frag.col];
                gameState.grid[targetRow][frag.col] = temp;

                // Update metadata
                const sourceMeta = gameState.gridMetadata.find(m => m.row === frag.row && m.col === frag.col);
                if (sourceMeta) {
                    sourceMeta.row = targetRow;
                }
                if (targetMeta) {
                    targetMeta.row = frag.row;
                }

                // Update the actual cells
                sourceCell.textContent = gameState.grid[frag.row][frag.col];
                sourceCell.dataset.row = frag.row;
                targetCell.textContent = gameState.grid[targetRow][frag.col];
                targetCell.dataset.row = targetRow;

                // Clear all styling from source cell that moved down
                sourceCell.classList.remove('used', 'selected', 'available');
                sourceCell.className = 'fragment-cell';

                // Apply final styling to target cell
                targetCell.classList.add('used');
                targetCell.classList.add(`solution-word-${wordIndex}`);
                targetCell.classList.remove('selected', 'available');

                // Show cells again
                sourceCell.style.opacity = '1';
                targetCell.style.opacity = '1';

                // Remove clone
                clone.remove();

                // Update the fragment's row reference
                frag.row = targetRow;

                // Track completed animations
                completedAnimations++;

                // If all animations complete, re-highlight first column
                if (completedAnimations === fragmentsToMove.length) {
                    setTimeout(() => highlightColumn(0), 50);
                }
            }, 510);
        }
    });
}

// Clear selection
function clearSelection() {
    // Remove visual markers
    gameState.selectedFragments.forEach(f => {
        const cell = document.querySelector(`[data-row="${f.row}"][data-col="${f.col}"]`);
        if (cell) {
            cell.classList.remove('selected');
            const numberSpan = cell.querySelector('.selection-number');
            if (numberSpan) {
                numberSpan.remove();
            }
        }
    });

    // Reset state
    gameState.selectedFragments = [];
    gameState.currentColumn = 0;
    gameState.currentState = GameState.SELECTING;

    // Update UI
    document.getElementById('currentWord').textContent = '';

    // Highlight first column
    highlightColumn(0);
    clearMessage();
}

// Submit word
function submitWord() {
    const builtWord = gameState.selectedFragments
        .map(f => f.fragment)
        .join('')
        .toUpperCase();

    // Check if valid word
    if (gameState.wordList.includes(builtWord)) {
        // Check if already found
        if (gameState.foundWords.includes(builtWord)) {
            showMessage(`You already found ${builtWord}!`, 'error');
            clearSelection();
            return;
        }

        // Success!
        gameState.foundWords.push(builtWord);

        // Get the word index for color coding
        const wordIndex = gameState.selectedFragments[0].wordIndex;

        // Determine target row (based on how many words have been found)
        const targetRow = gameState.foundWords.length - 1;

        // Animate fragments to target row
        animateFragmentsToRow(gameState.selectedFragments, targetRow, wordIndex);

        // Add to found list with matching color
        const listItem = document.createElement('li');
        listItem.textContent = builtWord;
        listItem.classList.add(`found-word-${wordIndex}`);
        document.getElementById('foundWordsList').appendChild(listItem);

        // Update count
        document.getElementById('foundCount').textContent = `${gameState.foundWords.length}/4`;

        showMessage(`Correct! Found: ${builtWord}`, 'success');

        // Check if theme revealed
        if (builtWord === gameState.themeWord) {
            revealTheme(builtWord);
        } else if (gameState.foundWords.length >= 2 && !gameState.themeRevealed) {
            revealTheme(gameState.themeWord);
        }

        // Check win condition
        if (gameState.foundWords.length === 4) {
            gameState.currentState = GameState.WON;
            // Gray out decoy letters after animation completes
            setTimeout(() => {
                markDecoysAsUsed();
            }, 600);
        }

        // Clear selection
        clearSelection();
    } else {
        // Wrong word - shake the grid
        const gridElement = document.getElementById('puzzleGrid');
        gridElement.classList.add('shake');

        showMessage('Not a valid word!', 'error');

        // Remove shake class after animation and clear selection
        setTimeout(() => {
            gridElement.classList.remove('shake');
            clearSelection();
        }, 840);
    }
}

// Reveal theme
function revealTheme(theme) {
    document.getElementById('theme').textContent = theme;
    gameState.themeRevealed = true;
}

// Show message
function showMessage(text, type) {
    const messageEl = document.getElementById('messageDisplay');
    messageEl.textContent = text;
    messageEl.className = 'message-display ' + type;

    // Clear after 3 seconds
    setTimeout(() => {
        if (messageEl.textContent === text) {
            clearMessage();
        }
    }, 3000);
}

// Clear message
function clearMessage() {
    const messageEl = document.getElementById('messageDisplay');
    messageEl.textContent = '';
    messageEl.className = 'message-display';
}

// Show victory screen
function showVictory() {
    const overlay = document.createElement('div');
    overlay.className = 'victory-overlay';

    const message = document.createElement('div');
    message.className = 'victory-message';
    message.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You found all 4 words!</p>
        <p>Theme: <strong>${gameState.themeWord}</strong></p>
        <button onclick="closeVictory()">Play Again</button>
    `;

    overlay.appendChild(message);
    document.body.appendChild(overlay);
}

// Close victory screen
function closeVictory() {
    const overlay = document.querySelector('.victory-overlay');
    if (overlay) {
        overlay.remove();
    }
    initializeGame();
}

// Mark all decoy fragments as used (gray them out)
function markDecoysAsUsed() {
    const cells = document.querySelectorAll('.fragment-cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        // Find metadata for this cell
        const meta = gameState.gridMetadata.find(m => m.row === row && m.col === col);

        // If it's a decoy, mark it as used
        if (meta && meta.isDecoy) {
            cell.classList.add('used');
            cell.classList.remove('available');
        }
    });
}

// Sort solution words into their correct rows
function sortSolutionWords() {
    // Group fragments by their word index
    const wordFragments = {};

    gameState.gridMetadata.forEach(meta => {
        if (!meta.isDecoy && meta.wordIndex >= 0) {
            if (!wordFragments[meta.wordIndex]) {
                wordFragments[meta.wordIndex] = [];
            }
            wordFragments[meta.wordIndex].push({
                row: meta.row,
                col: meta.col,
                fragmentIndex: meta.fragmentIndex,
                wordIndex: meta.wordIndex
            });
        }
    });

    console.log('Word fragments to sort:', wordFragments);

    // Process each word sequentially with delays to avoid conflicts
    const wordIndices = Object.keys(wordFragments).sort((a, b) => parseInt(a) - parseInt(b));

    wordIndices.forEach((wordIndex, index) => {
        setTimeout(() => {
            const targetRow = parseInt(wordIndex);
            const fragments = wordFragments[wordIndex];

            // Sort fragments by column order
            fragments.sort((a, b) => a.col - b.col);

            console.log(`Sorting word ${wordIndex} to row ${targetRow}:`, fragments);

            // Animate each fragment to target row
            animateFragmentsToRow(fragments, targetRow, parseInt(wordIndex));

            // Gray out decoys after last word animation completes
            if (index === wordIndices.length - 1) {
                setTimeout(() => {
                    markDecoysAsUsed();
                }, 600);
            }
        }, index * 100);
    });
}

// Show solution
function showSolution() {
    if (confirm('Are you sure you want to see the solution? This will end the current game.')) {
        gameState.currentState = GameState.LOST;

        // Highlight each word's fragments in the grid with different colors
        const cells = document.querySelectorAll('.fragment-cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            // Find metadata for this cell
            const meta = gameState.gridMetadata.find(m => m.row === row && m.col === col);

            // If it's not a decoy, add the color class for that word
            if (meta && !meta.isDecoy && meta.wordIndex >= 0) {
                cell.classList.add(`solution-word-${meta.wordIndex}`);
                cell.classList.remove('available');
            }
        });

        // Reveal theme
        revealTheme(gameState.themeWord);

        showMessage('Game ended. Start a new puzzle!', 'error');

        // Wait 3 seconds, then sort the words and gray out decoys
        setTimeout(() => {
            sortSolutionWords();
        }, 3000);
    }
}

// Event Listeners
document.getElementById('clearWord').addEventListener('click', clearSelection);
document.getElementById('newGame').addEventListener('click', initializeGame);
document.getElementById('giveUp').addEventListener('click', showSolution);

// Make closeVictory available globally
window.closeVictory = closeVictory;

// Initialize game on load
initializeGame();
