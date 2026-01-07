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

// Generate decoy fragments for a column
function generateDecoyFragment(col, usedFragments) {
    // Common letters for decoys - different pool for each column
    const letterPools = [
        ['BR', 'FL', 'GR', 'PL', 'ST', 'TR', 'CL', 'DR', 'PR', 'SL'],  // Column 0
        ['OU', 'EA', 'AI', 'IE', 'OO', 'EE', 'OA', 'AU', 'ER', 'OR'],  // Column 1
        ['ND', 'NT', 'NK', 'MP', 'MB', 'NG', 'ST', 'LL', 'SS', 'FF'],  // Column 2
        ['ER', 'LY', 'ED', 'AL', 'EN', 'LE', 'TH', 'CH', 'SH', 'GH'],  // Column 3
        ['TS', 'DS', 'ES', 'RS', 'NS', 'LS', 'CK', 'NK', 'RY', 'LY']   // Column 4
    ];

    const pool = letterPools[col] || letterPools[0];

    // Find a fragment that's not already used
    for (const frag of pool) {
        if (!usedFragments.some(f => f.fragment === frag)) {
            return frag;
        }
    }

    // Fallback: generate random consonant-vowel combo
    const consonants = 'BCDFGHJKLMNPRSTVWXYZ';
    const vowels = 'AEIOU';
    return consonants[Math.floor(Math.random() * consonants.length)] +
           vowels[Math.floor(Math.random() * vowels.length)];
}

// Scramble grid columns
function scrambleGrid(grid, metadata) {
    const scrambled = [[], [], [], [], [], []];  // 6 rows now
    const newMetadata = [];

    for (let col = 0; col < 5; col++) {
        // Extract column with metadata
        const column = [];
        for (let row = 0; row < 5; row++) {
            const fragment = grid[row][col];
            const meta = metadata.find(m =>
                m.originalRow === row && m.originalCol === col
            );
            column.push({
                fragment: fragment,
                wordIndex: meta.wordIndex,
                fragmentIndex: meta.fragmentIndex,
                currentRow: row,
                currentCol: col,
                isDecoy: false
            });
        }

        // Add decoy fragment for this column
        const decoyFragment = generateDecoyFragment(col, column);
        column.push({
            fragment: decoyFragment,
            wordIndex: -1,  // -1 indicates decoy
            fragmentIndex: -1,
            currentRow: 5,
            currentCol: col,
            isDecoy: true
        });

        // Shuffle with constraint
        let shuffled;
        let attempts = 0;
        const maxAttempts = 1000;

        while (attempts < maxAttempts) {
            shuffled = shuffle([...column]);

            // Check validity (no adjacent fragments from same word, excluding decoys)
            let valid = true;
            for (let i = 0; i < shuffled.length - 1; i++) {
                // Skip check if either fragment is a decoy
                if (!shuffled[i].isDecoy && !shuffled[i + 1].isDecoy) {
                    if (shuffled[i].wordIndex === shuffled[i + 1].wordIndex) {
                        valid = false;
                        break;
                    }
                }
            }

            if (valid) break;
            attempts++;
        }

        // If couldn't find valid arrangement, use deterministic
        if (attempts >= maxAttempts) {
            shuffled = arrangeColumnDeterministically(column);
        }

        // Place in scrambled grid (6 rows)
        for (let row = 0; row < 6; row++) {
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

    return { scrambled, newMetadata };
}

// Initialize new game
function initializeGame() {
    // Select random word group
    const group = wordGroups[Math.floor(Math.random() * wordGroups.length)];

    // Create initial grid
    const { grid, metadata } = createInitialGrid(group.words);

    // Scramble grid
    const { scrambled, newMetadata } = scrambleGrid(grid, metadata);

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
    document.getElementById('foundCount').textContent = '0/5';
    clearMessage();

    // Highlight first column
    highlightColumn(0);
}

// Render the grid
function renderGrid() {
    const gridElement = document.getElementById('puzzleGrid');
    gridElement.innerHTML = '';

    for (let row = 0; row < 6; row++) {  // 6 rows now
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

        // Mark cells as used
        gameState.selectedFragments.forEach(f => {
            const cell = document.querySelector(`[data-row="${f.row}"][data-col="${f.col}"]`);
            if (cell) {
                cell.classList.add('used');
                cell.classList.remove('selected');
            }
        });

        // Add to found list
        const listItem = document.createElement('li');
        listItem.textContent = builtWord;
        document.getElementById('foundWordsList').appendChild(listItem);

        // Update count
        document.getElementById('foundCount').textContent = `${gameState.foundWords.length}/5`;

        showMessage(`Correct! Found: ${builtWord}`, 'success');

        // Check if theme revealed
        if (builtWord === gameState.themeWord) {
            revealTheme(builtWord);
        } else if (gameState.foundWords.length >= 2 && !gameState.themeRevealed) {
            revealTheme(gameState.themeWord);
        }

        // Check win condition
        if (gameState.foundWords.length === 5) {
            gameState.currentState = GameState.WON;
            setTimeout(() => showVictory(), 1000);
        }

        // Clear selection
        clearSelection();
    } else {
        showMessage('Not a valid word!', 'error');
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
        <p>You found all 5 words!</p>
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

// Show solution
function showSolution() {
    if (confirm('Are you sure you want to see the solution? This will end the current game.')) {
        gameState.currentState = GameState.LOST;

        // Reveal all words
        const words = gameState.wordList.join(', ');
        alert(`Solution:\n\n${words}\n\nTheme: ${gameState.themeWord}`);

        // Reveal theme
        revealTheme(gameState.themeWord);

        showMessage('Game ended. Start a new puzzle!', 'error');
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
