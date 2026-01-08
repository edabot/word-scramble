# Word Fragment Puzzle Game

## Project Overview
Create an online puzzle game where words are broken into 5 fragments (1-2 letters each) and distributed across a 5×5 grid. Each column is scrambled so no two fragments from the same word are adjacent vertically. Players must reconstruct the 5 words by selecting fragments in the correct order across columns.

## Game Concept

### Core Mechanics
- 5 words, each 5-8 letters long
- Each word broken into exactly 5 fragments
- Fragments placed in a 5×5 grid (5 columns, 5 rows)
- Each word occupies one fragment per column
- Columns are scrambled vertically
- Players select fragments left-to-right to reconstruct words
- One word is the "theme" that connects the other four words

### Example Setup
**Words**: OCEAN, WAVES, CORAL, SHARK, BEACH

**Before Scrambling** (each row is a word):
```
Column: 1    2    3    4    5
Row 1:  OC | EA | N  | -  | -     (OCEAN)
Row 2:  WA | VE | S  | -  | -     (WAVES)
Row 3:  CO | RA | L  | -  | -     (CORAL)
Row 4:  SH | AR | K  | -  | -     (SHARK)
Row 5:  BE | AC | H  | -  | -     (BEACH)
```

**After Scrambling** (column order randomized):
```
Column: 1    2    3    4    5
Row 1:  BE | VE | L  | -  | -
Row 2:  SH | EA | K  | -  | -
Row 3:  WA | AC | S  | -  | -
Row 4:  CO | AR | N  | -  | -
Row 5:  OC | RA | H  | -  | -
```

Player must find: BEACH (row 1), SHARK (row 2), WAVES (row 3), CORAL (row 4), OCEAN (row 5)

## Technical Requirements

### Word Fragmentation Algorithm

#### Fragment Rules
- Each word split into exactly 5 fragments
- Each fragment contains 1-2 letters
- Distribution should be relatively balanced
- Prefer splitting at natural syllable boundaries when possible

#### Fragmentation Strategy
```javascript
function fragmentWord(word) {
  // Ensure word is 5-8 letters
  const len = word.length
  const fragments = []
  
  // Calculate fragment sizes
  // For 5 letters: [1,1,1,1,1]
  // For 6 letters: [2,1,1,1,1] or [1,2,1,1,1] etc.
  // For 7 letters: [2,2,1,1,1] or variations
  // For 8 letters: [2,2,2,1,1] or variations
  
  const sizes = calculateFragmentSizes(len)
  
  let index = 0
  for (const size of sizes) {
    fragments.push(word.substring(index, index + size))
    index += size
  }
  
  return fragments // Array of 5 strings
}

function calculateFragmentSizes(wordLength) {
  // Generate distribution of 5 numbers that sum to wordLength
  // Each number is 1 or 2
  
  const twoLetterCount = wordLength - 5 // Number of 2-letter fragments
  const oneLetterCount = 5 - twoLetterCount // Number of 1-letter fragments
  
  // Create array and shuffle for variety
  const sizes = [
    ...Array(twoLetterCount).fill(2),
    ...Array(oneLetterCount).fill(1)
  ]
  
  return shuffle(sizes)
}
```

### Grid Generation

#### Step 1: Create Initial Grid
```javascript
function createInitialGrid(words) {
  // words is array of 5 words
  const grid = []
  
  for (const word of words) {
    const fragments = fragmentWord(word)
    grid.push(fragments) // Each row is a word's fragments
  }
  
  return grid // 5x5 array
}
```

#### Step 2: Scramble Columns
```javascript
function scrambleGrid(grid) {
  const scrambled = [[], [], [], [], []]
  
  // For each column (0-4)
  for (let col = 0; col < 5; col++) {
    // Extract column
    const column = [
      grid[0][col],
      grid[1][col],
      grid[2][col],
      grid[3][col],
      grid[4][col]
    ]
    
    // Shuffle column with constraint: no adjacent fragments from same word
    const shuffled = shuffleColumnWithConstraint(column, col)
    
    // Place back in scrambled grid
    for (let row = 0; row < 5; row++) {
      scrambled[row][col] = shuffled[row]
    }
  }
  
  return scrambled
}
```

#### Step 3: Constraint-Based Shuffling
**CRITICAL**: Ensure no two fragments from the same word are vertically adjacent

```javascript
function shuffleColumnWithConstraint(column, columnIndex) {
  const maxAttempts = 1000
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shuffled = shuffle([...column])
    
    if (isValidColumnArrangement(shuffled, columnIndex)) {
      return shuffled
    }
  }
  
  // Fallback: use backtracking or deterministic arrangement
  return arrangeColumnDeterministically(column)
}

function isValidColumnArrangement(column, columnIndex) {
  // Check that no two adjacent cells in this column
  // belong to the same word in the solution
  
  // Need to track which word each fragment belongs to
  // This requires maintaining word ownership metadata
  
  for (let i = 0; i < column.length - 1; i++) {
    const fragment1 = column[i]
    const fragment2 = column[i + 1]
    
    // If both fragments are from same word, invalid
    if (areFromSameWord(fragment1, fragment2, columnIndex)) {
      return false
    }
  }
  
  return true
}
```

### Fragment Metadata Tracking
```javascript
// Each fragment needs to know which word it belongs to
const fragmentMetadata = {
  fragment: 'OC',
  wordIndex: 0, // OCEAN is word 0
  fragmentIndex: 0, // First fragment of that word
  columnIndex: 0 // Belongs in column 0
}

// Build metadata during fragmentation
function createFragmentMetadata(words) {
  const metadata = []
  
  words.forEach((word, wordIdx) => {
    const fragments = fragmentWord(word)
    fragments.forEach((fragment, fragIdx) => {
      metadata.push({
        fragment: fragment,
        wordIndex: wordIdx,
        fragmentIndex: fragIdx,
        columnIndex: fragIdx
      })
    })
  })
  
  return metadata
}
```

## User Interface Design

### Layout Components

#### Grid Display
```html
<div class="game-container">
  <div class="theme-display">
    <h2>Theme: <span id="theme">???</span></h2>
  </div>
  
  <div class="puzzle-grid">
    <!-- 5x5 grid of fragment cells -->
  </div>
  
  <div class="word-builder">
    <!-- Shows current word being built -->
    <div id="currentWord"></div>
    <button id="submitWord">Submit Word</button>
    <button id="clearWord">Clear</button>
  </div>
  
  <div class="found-words">
    <h3>Found Words:</h3>
    <ul id="foundWordsList"></ul>
  </div>
  
  <div class="game-controls">
    <button id="newGame">New Puzzle</button>
    <button id="giveUp">Show Solution</button>
  </div>
</div>
```

#### Fragment Cell Structure
```html
<div class="fragment-cell" 
     data-row="0" 
     data-col="0" 
     data-fragment="OC"
     data-word-index="0"
     data-selected="false">
  OC
</div>
```

### Interaction Model

#### Selection Rules
1. **First Selection**: Player can click any cell in column 0
2. **Subsequent Selections**: Must select from next column (left to right)
3. **Column Order**: Must select fragments in order: col 0 → col 1 → col 2 → col 3 → col 4
4. **Building Word**: Selected fragments concatenate to form word
5. **Submit**: After selecting 5 fragments (one per column), can submit
6. **Clear**: Can clear selection and start over at any time

#### Visual Feedback
- **Available cells**: Highlighted/enabled (clickable)
- **Selected cells**: Different color, marked with selection order (1,2,3,4,5)
- **Used cells**: Grayed out (already part of found word)
- **Current word**: Display concatenated fragments above grid
- **Found words**: List below grid with checkmarks

### Game States

#### State Machine
```javascript
const GameState = {
  SELECTING: 'selecting',     // Player selecting fragments
  WORD_COMPLETE: 'complete',  // 5 fragments selected, ready to submit
  CHECKING: 'checking',       // Validating submitted word
  WON: 'won',                // All 5 words found
  LOST: 'lost'               // Gave up / showed solution
}

const gameState = {
  currentState: GameState.SELECTING,
  selectedFragments: [],     // Array of selected fragment objects
  foundWords: [],            // Array of correctly found words
  remainingWords: [],        // Words still to find
  currentColumn: 0,          // Which column can be selected next (0-4)
  grid: [],                  // Scrambled 5x5 grid
  solution: []               // Original unscrambled word arrangement
}
```

## Game Logic Implementation

### Selection Handler
```javascript
function handleFragmentClick(row, col, fragment) {
  // Check if this is the correct next column
  if (col !== gameState.currentColumn) {
    showError('Must select from column ' + (gameState.currentColumn + 1))
    return
  }
  
  // Check if cell already used in found word
  if (isCellUsed(row, col)) {
    showError('This fragment is already used')
    return
  }
  
  // Add to selection
  gameState.selectedFragments.push({
    row: row,
    col: col,
    fragment: fragment,
    wordIndex: getWordIndex(row, col)
  })
  
  // Update visual
  markCellSelected(row, col, gameState.selectedFragments.length)
  
  // Move to next column
  gameState.currentColumn++
  
  // Update available cells highlighting
  if (gameState.currentColumn < 5) {
    highlightColumn(gameState.currentColumn)
  } else {
    // All 5 selected, enable submit
    gameState.currentState = GameState.WORD_COMPLETE
    enableSubmitButton()
  }
  
  // Update current word display
  updateWordDisplay()
}
```

### Word Validation
```javascript
function submitWord() {
  const builtWord = gameState.selectedFragments
    .map(f => f.fragment)
    .join('')
    .toUpperCase()
  
  // Check if word is in the word list
  if (isValidWord(builtWord)) {
    // Check if already found
    if (gameState.foundWords.includes(builtWord)) {
      showMessage('You already found ' + builtWord + '!')
      clearSelection()
      return
    }
    
    // Success!
    gameState.foundWords.push(builtWord)
    addToFoundList(builtWord)
    markCellsAsUsed(gameState.selectedFragments)
    showSuccess('Correct! Found: ' + builtWord)
    
    // Check if theme revealed
    if (builtWord === gameState.themeWord) {
      revealTheme(builtWord)
    }
    
    // Check win condition
    if (gameState.foundWords.length === 5) {
      gameState.currentState = GameState.WON
      showVictory()
    }
    
    clearSelection()
  } else {
    showError('Not a valid word!')
    // Option: keep selection or auto-clear
  }
}

function isValidWord(word) {
  return gameState.wordList.includes(word.toUpperCase())
}
```

### Clear Selection
```javascript
function clearSelection() {
  // Remove visual selection markers
  gameState.selectedFragments.forEach(f => {
    unmarkCellSelected(f.row, f.col)
  })
  
  // Reset state
  gameState.selectedFragments = []
  gameState.currentColumn = 0
  gameState.currentState = GameState.SELECTING
  
  // Re-highlight first column
  highlightColumn(0)
  
  // Clear word display
  updateWordDisplay()
  
  // Disable submit button
  disableSubmitButton()
}
```

## Styling & Visual Design

### Grid Styling
```css
.puzzle-grid {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 100px);
  gap: 8px;
  margin: 20px auto;
  width: fit-content;
}

.fragment-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  border: 3px solid #ccc;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.fragment-cell.available {
  border-color: #4CAF50;
  background: #f0f8f0;
  cursor: pointer;
}

.fragment-cell.available:hover {
  background: #e0f0e0;
  transform: scale(1.05);
}

.fragment-cell.selected {
  background: #2196F3;
  color: white;
  border-color: #1976D2;
}

.fragment-cell.used {
  background: #e0e0e0;
  color: #999;
  border-color: #bbb;
  cursor: not-allowed;
}

.fragment-cell .selection-number {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 12px;
  background: white;
  color: #2196F3;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Word Builder Display
```css
.word-builder {
  text-align: center;
  margin: 20px 0;
}

#currentWord {
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 4px;
  min-height: 50px;
  color: #333;
}

.word-builder button {
  margin: 10px 5px;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

#submitWord {
  background: #4CAF50;
  color: white;
  border: none;
}

#submitWord:disabled {
  background: #ccc;
  cursor: not-allowed;
}
```

## Advanced Features

### Hint System
```javascript
function giveHint() {
  // Reveal the correct first fragment of an unfound word
  const unfoundWords = getUnfoundWords()
  const randomWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)]
  
  // Find and highlight the first fragment
  const firstFragment = randomWord.fragments[0]
  highlightHintCell(firstFragment.row, firstFragment.col)
  
  // Reduce score or count as penalty
  gameState.hintsUsed++
}
```

### Difficulty Levels
- **Easy**: 5-letter words only, theme revealed at start
- **Medium**: 5-7 letter words, theme revealed after 2 words found
- **Hard**: 5-8 letter words, theme only revealed after all words found
- **Expert**: Additional scrambling complexity, time limit

### Scoring System
```javascript
const scoring = {
  basePoints: 100,          // Per word found
  timeBonus: 10,            // Per second remaining
  noHintBonus: 50,          // If no hints used
  perfectBonus: 200,        // All words without clear/mistakes
  hintPenalty: -25,         // Per hint used
  wrongSubmitPenalty: -10   // Per incorrect submission
}

function calculateScore() {
  let score = gameState.foundWords.length * scoring.basePoints
  
  if (gameState.hintsUsed === 0) {
    score += scoring.noHintBonus
  } else {
    score += gameState.hintsUsed * scoring.hintPenalty
  }
  
  score += gameState.wrongSubmissions * scoring.wrongSubmitPenalty
  
  // Time bonus if applicable
  if (gameState.timeRemaining > 0) {
    score += gameState.timeRemaining * scoring.timeBonus
  }
  
  return Math.max(0, score)
}
```

### Theme Reveal Mechanics
```javascript
// Option 1: Reveal when theme word found
if (builtWord === gameState.themeWord) {
  document.getElementById('theme').textContent = builtWord
  showMessage(`${builtWord} is the theme!`)
}

// Option 2: Reveal after N words found
if (gameState.foundWords.length >= 2 && !gameState.themeRevealed) {
  document.getElementById('theme').textContent = gameState.themeWord
  gameState.themeRevealed = true
}

// Option 3: Reveal at end only
if (gameState.foundWords.length === 5) {
  document.getElementById('theme').textContent = gameState.themeWord
}
```

## Word Data Structure

### Word Groups Format
```javascript
const wordGroups = [
  {
    theme: 'OCEAN',
    words: ['OCEAN', 'WAVES', 'CORAL', 'SHARK', 'BEACH']
  },
  {
    theme: 'MUSIC',
    words: ['MUSIC', 'PIANO', 'DRUMS', 'NOTES', 'TEMPO']
  },
  {
    theme: 'GARDEN',
    words: ['GARDEN', 'FLOWERS', 'SEEDS', 'SOIL', 'WATER']
  },
  {
    theme: 'SPACE',
    words: ['SPACE', 'STARS', 'PLANET', 'COMET', 'ROCKET']
  },
  {
    theme: 'KITCHEN',
    words: ['KITCHEN', 'STOVE', 'KNIFE', 'PLATE', 'SPOON']
  }
]

function loadRandomPuzzle() {
  const group = wordGroups[Math.floor(Math.random() * wordGroups.length)]
  return {
    themeWord: group.theme,
    wordList: group.words,
    words: group.words
  }
}
```

### Word Validation
```javascript
function validateWordGroup(group) {
  // Check all words are 5-8 letters
  for (const word of group.words) {
    if (word.length < 5 || word.length > 8) {
      return false
    }
  }
  
  // Check exactly 5 words
  if (group.words.length !== 5) {
    return false
  }
  
  // Check theme is in word list
  if (!group.words.includes(group.theme)) {
    return false
  }
  
  return true
}
```

## Mobile Responsiveness

### Touch Interactions
```javascript
// Handle touch events for mobile
fragmentCell.addEventListener('touchstart', (e) => {
  e.preventDefault() // Prevent double-tap zoom
  handleFragmentClick(row, col, fragment)
})
```

### Responsive Layout
```css
@media (max-width: 768px) {
  .puzzle-grid {
    grid-template-columns: repeat(5, 60px);
    grid-template-rows: repeat(5, 60px);
    gap: 4px;
  }
  
  .fragment-cell {
    font-size: 18px;
  }
  
  #currentWord {
    font-size: 24px;
  }
}
```

## Testing Checklist
- [ ] Words fragment correctly (always 5 pieces)
- [ ] Grid generates without errors
- [ ] Column scrambling ensures no vertical adjacency
- [ ] First column is selectable at start
- [ ] Selection advances column-by-column
- [ ] Invalid column selections are rejected
- [ ] Word display updates with each selection
- [ ] Submit button enables after 5 selections
- [ ] Correct words are accepted
- [ ] Incorrect words are rejected
- [ ] Found words marked as used
- [ ] Used cells cannot be reselected
- [ ] Clear button resets selection
- [ ] Theme reveals appropriately
- [ ] All 5 words trigger win condition
- [ ] New puzzle loads correctly
- [ ] Mobile touch interactions work
- [ ] Responsive layout on different screen sizes

## Performance Considerations
- Pre-generate and cache word fragmentations
- Optimize column scrambling algorithm
- Use CSS transforms for animations
- Debounce rapid clicking
- Minimize DOM manipulations

## Accessibility
- Keyboard navigation support (arrow keys, enter, escape)
- Screen reader announcements for selections and found words
- High contrast mode option
- Focus indicators on cells
- ARIA labels for all interactive elements

## Future Enhancements
- Daily puzzle mode
- User-submitted word groups
- Multiplayer race mode
- Achievement system
- Different grid sizes (4×4, 6×6)
- Animation effects for correct/incorrect
- Sound effects
- Leaderboard integration
- Social sharing of scores
- Tutorial/practice mode
- Undo button (limited uses)
- Save/resume progress
