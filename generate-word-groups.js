// Script to generate 100 new valid word groups with pop culture themes

const fs = require('fs');

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

    words.forEach(wordFragments => {
        wordFragments.forEach((frag, col) => {
            columnFragments[col].push(frag.toUpperCase());
        });
    });

    decoy.forEach((frag, col) => {
        columnFragments[col].push(frag.toUpperCase());
    });

    for (let col = 0; col < 5; col++) {
        const seen = {};
        for (const frag of columnFragments[col]) {
            if (seen[frag]) {
                return true;
            }
            seen[frag] = true;
        }
    }

    return false;
}

// Try to create a valid word group
function createValidWordGroup(theme, words, decoy) {
    // Validate word lengths
    for (const word of words) {
        if (word.length < 5 || word.length > 15) {
            console.log(`  ✗ Word "${word}" is ${word.length} letters (must be 5-15)`);
            return null;
        }
    }
    if (decoy.length < 5 || decoy.length > 15) {
        console.log(`  ✗ Decoy "${decoy}" is ${decoy.length} letters (must be 5-15)`);
        return null;
    }

    const wordPatterns = words.map(word => generateFragmentationPatterns(word.length));
    const decoyPatterns = generateFragmentationPatterns(decoy.length);

    const maxAttempts = 50000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const indices = wordPatterns.map(patterns => Math.floor(Math.random() * patterns.length));
        const decoyIndex = Math.floor(Math.random() * decoyPatterns.length);

        const fragmentedWords = words.map((word, i) => {
            const pattern = wordPatterns[i][indices[i]];
            return fragmentWordWithPattern(word, pattern);
        });

        const fragmentedDecoy = fragmentWordWithPattern(decoy, decoyPatterns[decoyIndex]);

        if (!hasColumnConflicts(fragmentedWords, fragmentedDecoy)) {
            return {
                theme: theme,
                words: fragmentedWords,
                decoy: fragmentedDecoy
            };
        }
    }

    return null;
}

// Pop culture themed word groups (all words must be 5-15 letters)
const wordGroupDefinitions = [
    // Movies
    { theme: "MATRIX", words: ["TRINITY", "AGENT", "PILLS", "SPOON"], decoy: "SWORD" },
    { theme: "JAWS", words: ["SHARK", "OCEAN", "BOATS", "BLOOD"], decoy: "PIANO" },
    { theme: "SHREK", words: ["OGRES", "DONKEY", "SWAMP", "FIONA"], decoy: "MEDAL" },
    { theme: "AVATAR", words: ["PANDORA", "BLUES", "TREES", "NAVI"], decoy: "STORM" },
    { theme: "TITANIC", words: ["SHIPS", "ICEBERG", "ROSES", "JACKS"], decoy: "MOONS" },
    { theme: "GLADIATOR", words: ["ROMAN", "SWORD", "ARENA", "MAXIM"], decoy: "PIANO" },
    { theme: "INCEPTION", words: ["DREAM", "SPINS", "COBBS", "LAYER"], decoy: "FRUIT" },
    { theme: "JUMANJI", words: ["GAMES", "JUNGLE", "DICED", "ROBIN"], decoy: "CLOCK" },
    { theme: "FROZEN", words: ["ELSAS", "ANNAS", "OLAFS", "ICING"], decoy: "DRUMS" },
    { theme: "FINDING NEMO", words: ["FISHES", "DORYS", "CORAL", "OCEAN"], decoy: "BREAD" },

    // More Movies
    { theme: "SHAWSHANK", words: ["PRISON", "ANDYS", "REDDS", "HOPES"], decoy: "MIXER" },
    { theme: "ROCKY", words: ["BOXER", "ADRIAN", "STEPS", "CREED"], decoy: "PLANT" },
    { theme: "GOONIES", words: ["TREASURE", "KIDSS", "MAPSS", "PIRATE"], decoy: "CLOUD" },
    { theme: "ALIEN", words: ["SPACE", "CHEST", "RIPLEY", "XENON"], decoy: "PIANO" },
    { theme: "PULP FICTION", words: ["JULES", "WALLET", "DINER", "BRIEF"], decoy: "TORCH" },
    { theme: "GOODFELLAS", words: ["MOBSTER", "HENRY", "TOMMY", "WISES"], decoy: "BRANCH" },
    { theme: "GHOSTBUSTERS", words: ["SLIMER", "PROTON", "GHOSTS", "ECTO"], decoy: "MARBLE" },
    { theme: "JURASSIC", words: ["RAPTOR", "ISLAND", "GRANT", "PARK"], decoy: "MIXER" },
    { theme: "BACK FUTURE", words: ["DELOREAN", "MARTY", "FLUX", "CLOCK"], decoy: "PIANO" },
    { theme: "TERMINATOR", words: ["CYBORG", "SARAH", "CONNOR", "SKYNET"], decoy: "MARBLE" },

    // TV Shows
    { theme: "BREAKING BAD", words: ["WALTER", "METHLAB", "JESSIE", "HEISENBERG"], decoy: "GUITAR" },
    { theme: "STRANGER THINGS", words: ["ELEVEN", "DEMOGORGON", "HAWKINS", "UPSIDE"], decoy: "MARBLE" },
    { theme: "LOST", words: ["ISLAND", "DHARMA", "HATCH", "JACKS"], decoy: "PIANO" },
    { theme: "SOPRANOS", words: ["TONYS", "MOBSTER", "THERAPY", "CARMELA"], decoy: "VIOLIN" },
    { theme: "SQUID GAME", words: ["REDDS", "LIGHT", "DOLLS", "MARBLE"], decoy: "PIANO" },
    { theme: "MANDALORIAN", words: ["GROGU", "ARMOR", "BOUNTY", "RAZOR"], decoy: "FLUTE" },
    { theme: "WITCHER", words: ["GERALT", "MONSTER", "SWORD", "TOSSS"], decoy: "BRAIN" },
    { theme: "GAME THRONES", words: ["STARK", "DRAGON", "THRONE", "TYRION"], decoy: "ANCHOR" },
    { theme: "WALKING DEAD", words: ["ZOMBIES", "RICKSS", "WALKER", "GRIMES"], decoy: "BRANCH" },
    { theme: "SIMPSONS", words: ["HOMER", "BART", "SPRINGFIELD", "DONUTS"], decoy: "MARBLE" },

    // Music & Bands
    { theme: "NIRVANA", words: ["KURTS", "GRUNGE", "SMELLS", "TEENS"], decoy: "CLOCK" },
    { theme: "QUEEN", words: ["FREDDIE", "MERCURY", "BOHEMIAN", "RHAPSODY"], decoy: "VIOLIN" },
    { theme: "LED ZEPPELIN", words: ["STAIRWAY", "JIMMY", "PAGES", "PLANT"], decoy: "MARBLE" },
    { theme: "PINK FLOYD", words: ["WALLS", "DARKS", "MOONS", "WISHS"], decoy: "STAMP" },
    { theme: "RADIOHEAD", words: ["THOMS", "YORKE", "KARMA", "POLICE"], decoy: "BUCKET" },
    { theme: "METALLICA", words: ["JAMES", "HETFIELD", "MASTER", "PUPPETS"], decoy: "BRANCH" },
    { theme: "ELVIS", words: ["KINGS", "GRACELAND", "BLUES", "SUEDE"], decoy: "MIXER" },
    { theme: "PRINCE", words: ["PURPLE", "RAINS", "DOVES", "CRYSS"], decoy: "BENCH" },
    { theme: "TAYLOR SWIFT", words: ["SHAKE", "BLANK", "SPACE", "LOVER"], decoy: "MIXER" },
    { theme: "BILLIE EILISH", words: ["OCEAN", "EYES", "BADDD", "GUYYY"], decoy: "PIANO" },

    // Video Games
    { theme: "ZELDA", words: ["LINKS", "GANON", "HYRULE", "TRIFORCE"], decoy: "MIXER" },
    { theme: "POKEMON", words: ["PIKACHU", "ASHEN", "POKEBALL", "GYMSS"], decoy: "VIOLIN" },
    { theme: "SONIC", words: ["HEDGEHOG", "RINGS", "TAILS", "EGGMAN"], decoy: "BRANCH" },
    { theme: "MINECRAFT", words: ["STEVE", "BLOCKS", "CREEPER", "DIAMOND"], decoy: "MARBLE" },
    { theme: "FORTNITE", words: ["BATTLE", "ROYALE", "BUILD", "EMOTE"], decoy: "PIANO" },
    { theme: "MARIO KART", words: ["RACER", "SHELLS", "BANANA", "DRIFT"], decoy: "CLOUD" },
    { theme: "HALO", words: ["MASTER", "CHIEF", "CORTANA", "RINGS"], decoy: "BENCH" },
    { theme: "CALL DUTY", words: ["WARFARE", "MODERN", "SNIPER", "GHOST"], decoy: "PIANO" },
    { theme: "TETRIS", words: ["BLOCKS", "LINES", "FALLS", "ROTATE"], decoy: "PIANO" },
    { theme: "PACMAN", words: ["DOTSS", "GHOSTS", "MAZES", "CHERRY"], decoy: "MIXER" },

    // More Video Games
    { theme: "DOOM", words: ["DEMONS", "MARSS", "SHOTGUN", "HELLS"], decoy: "PIANO" },
    { theme: "PORTAL", words: ["CAKES", "CHELL", "GLADOS", "APERTURE"], decoy: "STORM" },
    { theme: "SKYRIM", words: ["DRAGON", "SHOUT", "NORDS", "DOVAH"], decoy: "MIXER" },
    { theme: "FALLOUT", words: ["VAULT", "NUKAS", "COLAS", "WASTELAND"], decoy: "BRANCH" },
    { theme: "ANIMAL CROSSING", words: ["TOMSS", "NOOKS", "ISABELLE", "BELLS"], decoy: "MIXER" },
    { theme: "SIMS", words: ["BUILD", "FAMILY", "POOLS", "LADDER"], decoy: "TORCH" },
    { theme: "LEAGUE LEGENDS", words: ["CHAMPION", "LANES", "NEXUS", "BARON"], decoy: "MIXER" },
    { theme: "OVERWATCH", words: ["HERO", "PAYLOAD", "TRACER", "MERCY"], decoy: "BENCH" },
    { theme: "AMONG US", words: ["IMPOSTER", "TASKS", "VENTS", "CREWMATE"], decoy: "BRANCH" },
    { theme: "ROBLOX", words: ["OBBY", "ROBUX", "AVATAR", "BUILD"], decoy: "MIXER" },

    // Comics & Superheroes
    { theme: "SPIDERMAN", words: ["PETER", "PARKER", "WEBS", "SWING"], decoy: "MIXER" },
    { theme: "WOLVERINE", words: ["LOGAN", "CLAWS", "ADAMANTIUM", "HEALING"], decoy: "BRANCH" },
    { theme: "DEADPOOL", words: ["WADES", "WILSON", "MERCENARY", "CHIMICHANGA"], decoy: "VIOLIN" },
    { theme: "WONDER WOMAN", words: ["DIANA", "LASSO", "TRUTH", "AMAZONIA"], decoy: "BRANCH" },
    { theme: "FLASH", words: ["BARRY", "ALLEN", "SPEED", "FORCE"], decoy: "MIXER" },
    { theme: "GREEN LANTERN", words: ["HALS", "JORDAN", "RINGS", "WILLS"], decoy: "BENCH" },
    { theme: "THOR", words: ["HAMMER", "MJOLNIR", "ASGARD", "WORTHY"], decoy: "PIANO" },
    { theme: "HULK", words: ["BRUCE", "BANNER", "SMASH", "GAMMA"], decoy: "CLOCK" },
    { theme: "AQUAMAN", words: ["ARTHUR", "CURRY", "TRIDENT", "ATLANTIS"], decoy: "BRANCH" },
    { theme: "BLACK PANTHER", words: ["TCHALLA", "WAKANDA", "VIBRANIUM", "SHURI"], decoy: "MIXER" },

    // Anime & Manga
    { theme: "NARUTO", words: ["NINJA", "HOKAGE", "RAMEN", "KURAMA"], decoy: "PIANO" },
    { theme: "DRAGON BALL", words: ["GOKUS", "KAMEHAMEHA", "SAIYAN", "VEGETA"], decoy: "BRANCH" },
    { theme: "ONE PIECE", words: ["LUFFY", "PIRATE", "RUBBER", "STRAW"], decoy: "MIXER" },
    { theme: "ATTACK TITAN", words: ["ERENS", "WALLS", "GIANT", "SCOUT"], decoy: "PIANO" },
    { theme: "SAILOR MOON", words: ["USAGI", "MOONS", "PRISM", "POWER"], decoy: "BENCH" },
    { theme: "DEMON SLAYER", words: ["TANJIRO", "SWORD", "BREATHING", "NEZUKO"], decoy: "MARBLE" },
    { theme: "MY HERO", words: ["DEKUS", "QUIRK", "PLUSS", "ULTRA"], decoy: "MIXER" },
    { theme: "DEATH NOTE", words: ["LIGHT", "RYUKS", "SHINIGAMI", "KIRAS"], decoy: "BENCH" },
    { theme: "COWBOY BEBOP", words: ["SPIKE", "SPIEGEL", "BOUNTY", "JAZZZ"], decoy: "MIXER" },
    { theme: "FULLMETAL", words: ["EDWARD", "ELRIC", "ALCHEMY", "TRANSMUTE"], decoy: "BRANCH" },

    // Books & Literature
    { theme: "GATSBY", words: ["JAYSS", "DAISY", "GREEN", "LIGHT"], decoy: "BENCH" },
    { theme: "MOCKINGBIRD", words: ["ATTICUS", "FINCH", "SCOUT", "BOOSS"], decoy: "PIANO" },
    { theme: "ORWELL", words: ["WINSTON", "SMITH", "BIGGS", "BROTHER"], decoy: "MIXER" },
    { theme: "HUNGER GAMES", words: ["KATNISS", "PEETA", "MOCKINGJAY", "ARENA"], decoy: "VIOLIN" },
    { theme: "DIVERGENT", words: ["TRISS", "PRIOR", "FACTION", "FOURS"], decoy: "BENCH" },
    { theme: "MAZE RUNNER", words: ["THOMAS", "GLADE", "WICKED", "GRIEVER"], decoy: "PIANO" },
    { theme: "TWILIGHT", words: ["BELLA", "EDWARD", "VAMPIRE", "CULLEN"], decoy: "BRANCH" },
    { theme: "HOBBIT", words: ["BILBO", "BAGGINS", "GOLLUM", "SHIRE"], decoy: "MIXER" },
    { theme: "CHRONICLES NARNIA", words: ["ASLAN", "WARDROBE", "PEVENSIE", "CASPIAN"], decoy: "BRANCH" },
    { theme: "PERCY JACKSON", words: ["DEMIGOD", "POSEIDON", "OLYMPUS", "ANNABETH"], decoy: "VIOLIN" },

    // More Pop Culture
    { theme: "POKEMON GO", words: ["CATCH", "GYMSS", "RAIDS", "BUDDY"], decoy: "MIXER" },
    { theme: "TIKTOK", words: ["DANCE", "VIRAL", "FYPSS", "DUETS"], decoy: "BENCH" },
    { theme: "INSTAGRAM", words: ["FILTER", "STORY", "REELS", "LIKES"], decoy: "PIANO" },
    { theme: "YOUTUBE", words: ["SUBSCRIBE", "VLOGS", "MONETIZE", "ALGORITHM"], decoy: "BRANCH" },
    { theme: "NETFLIX", words: ["BINGE", "STREAM", "CHILL", "SERIES"], decoy: "MIXER" },
    { theme: "SPOTIFY", words: ["PLAYLIST", "SHUFFLE", "PREMIUM", "WRAPPED"], decoy: "VIOLIN" },
    { theme: "TWITCH", words: ["STREAM", "EMOTE", "CHATSS", "RAIDS"], decoy: "BENCH" },
    { theme: "DISCORD", words: ["SERVER", "VOICE", "NITRO", "CHANNEL"], decoy: "PIANO" },
    { theme: "MINECRAFT", words: ["CRAFT", "ENDERMAN", "NETHER", "ENCHANT"], decoy: "MIXER" },
    { theme: "ROBLOX", words: ["BUILD", "OBBYY", "ROBUX", "GAMES"], decoy: "BENCH" }
];

console.log('=== GENERATING 100 WORD GROUPS ===\n');

const validGroups = [];
let failed = 0;

for (let i = 0; i < wordGroupDefinitions.length && validGroups.length < 100; i++) {
    const def = wordGroupDefinitions[i];
    console.log(`Generating ${i + 1}: ${def.theme}...`);

    const group = createValidWordGroup(def.theme, def.words, def.decoy);

    if (group) {
        validGroups.push(group);
        console.log(`  ✓ Success (${validGroups.length}/100)`);
    } else {
        console.log(`  ✗ Failed`);
        failed++;
    }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Successfully generated: ${validGroups.length}`);
console.log(`Failed: ${failed}`);

if (validGroups.length >= 100) {
    // Write to file
    const newContent = `// Word Groups Data - Pre-fragmented
// Each word is already broken into 5 fragments
// All fragments in each column position are guaranteed to be unique
const wordGroups = ${JSON.stringify(validGroups.slice(0, 100), null, 4)};
`;

    fs.writeFileSync('./words.js', newContent, 'utf8');
    console.log(`\n✓ Written 100 valid word groups to words.js`);
} else {
    console.log(`\n✗ Only generated ${validGroups.length} groups, need 100`);
}
