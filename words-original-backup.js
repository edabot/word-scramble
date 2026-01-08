// Word Groups Data
const wordGroups = [
    {
        theme: 'MAGIC',
        words: ['SPELL', 'WANDS', 'CHARM', 'TRICK'],
        decoy: 'CANYON'
    },
    {
        theme: 'MARSH',
        words: ['SWAMP', 'REEDS', 'WATER', 'FROGGY'],
        decoy: 'BRONZE'
    },
    {
        theme: 'DOLPHIN',
        words: ['OCEAN', 'JUMPS', 'PLAYFUL', 'SMART'],
        decoy: 'CRIMSON'
    },
    {
        theme: 'WESTEROS',
        words: ['STARK', 'DRAGON', 'THRONE', 'TYRION'],
        decoy: 'ANCHOR'
    },
    {
        theme: 'NOLAN',
        words: ['INCEPTION', 'BATMAN', 'INTERSTELLAR', 'DUNKIRK'],
        decoy: 'EMERALD'
    },
    {
        theme: 'SPIELBERG',
        words: ['RAIDERS', 'JURASSIC', 'SCHINDLER', 'SAVING'],
        decoy: 'MARBLE'
    },
    {
        theme: 'ESPRESSO',
        words: ['COFFEE', 'CAPPUCCINO', 'LATTE', 'MACCHIATO'],
        decoy: 'VIOLET'
    },
    {
        theme: 'SUSHI',
        words: ['SALMON', 'WASABI', 'NIGIRI', 'SASHIMI'],
        decoy: 'TURQUOISE'
    },
    {
        theme: 'MARVEL',
        words: ['IRONMAN', 'SPIDERMAN', 'AVENGERS', 'BLACKPANTHER'],
        decoy: 'INDIGO'
    },
    {
        theme: 'PIXAR',
        words: ['TOYSTORY', 'MONSTERSINC', 'INCREDIBLES', 'BRAVE'],
        decoy: 'MAGENTA'
    },
    {
        theme: 'EINSTEIN',
        words: ['RELATIVITY', 'ENERGY', 'THEORY', 'PHYSICS'],
        decoy: 'COPPER'
    },
    {
        theme: 'BASKETBALL',
        words: ['TRIPLE', 'DRIBBLE', 'REBOUND', 'LAYUP'],
        decoy: 'PEACH'
    },
    {
        theme: 'PIZZA',
        words: ['PEPPERONI', 'MOZZARELLA', 'MARGHERITA', 'NEAPOLITAN'],
        decoy: 'WHISPER'
    },
    {
        theme: 'MUSIC',
        words: ['SAXOPHONE', 'TRUMPET', 'BEBOP', 'SWING'],
        decoy: 'SCARLET'
    },
    {
        theme: 'HIMALAYA',
        words: ['EVEREST', 'SHERPA', 'NEPAL', 'CLIMB'],
        decoy: 'DIAMOND'
    },
    {
        theme: 'MYTHOLOGY',
        words: ['APOLLO', 'ATHENA', 'POSEIDON', 'HERCULES'],
        decoy: 'OLYMPUS'
    },
    {
        theme: 'EGYPTIAN',
        words: ['PHARAOH', 'PYRAMID', 'SPHINX', 'CLEOPATRA'],
        decoy: 'RUBIES'
    },
    {
        theme: 'FRIENDS',
        words: ['RACHEL', 'MONICA', 'PHOEBE', 'CHANDLER'],
        decoy: 'AMBER'
    },
    {
        theme: 'OFFICE',
        words: ['MICHAEL', 'DWIGHT', 'SCHRUTE', 'DUNDER'],
        decoy: 'JASPER'
    },
    {
        theme: 'BREAKFAST',
        words: ['PANCAKES', 'WAFFLE', 'OMELETTE', 'BACON'],
        decoy: 'OPALINE'
    },
    {
        theme: 'WINERY',
        words: ['MERLOT', 'CABERNET', 'PINOT', 'CHARDONNAY'],
        decoy: 'JADEITE'
    },
    {
        theme: 'JAPAN',
        words: ['TOKYO', 'TEMPLE', 'SAMURAI', 'KIMONO'],
        decoy: 'OBSIDIAN'
    },
    {
        theme: 'DIVING',
        words: ['SCUBA', 'OXYGEN', 'FLIPPERS', 'DEPTH'],
        decoy: 'GARNET'
    },
    {
        theme: 'SAFARI',
        words: ['ELEPHANT', 'GIRAFFE', 'SAVANNA', 'ZEBRA'],
        decoy: 'CITRINE'
    },
    {
        theme: 'HOCKEY',
        words: ['STICK', 'PENALTY', 'SKATING', 'GOALIE'],
        decoy: 'TOURMALINE'
    },
    {
        theme: 'SUPERMAN',
        words: ['KRYPTON', 'METROPOLIS', 'CLARK', 'SMALLVILLE'],
        decoy: 'ZIRCON'
    },
    {
        theme: 'STARTREK',
        words: ['SPOCK', 'ENTERPRISE', 'VULCAN', 'WARPSPEED'],
        decoy: 'IOLITE'
    },
    {
        theme: 'TOLKIEN',
        words: ['FRODO', 'GANDALF', 'MORDOR', 'ARAGORN'],
        decoy: 'KUNZITE'
    },
    {
        theme: 'DISNEY',
        words: ['MICKEY', 'FROZEN', 'MOANA', 'ALADDIN'],
        decoy: 'SPINEL'
    },
    {
        theme: 'APPLE',
        words: ['IPHONE', 'MACBOOK', 'AIRPODS', 'WATCH'],
        decoy: 'AZURITE'
    },
    {
        theme: 'GOOGLE',
        words: ['SEARCH', 'CHROME', 'ANDROID', 'YOUTUBE'],
        decoy: 'MALACHITE'
    },
    {
        theme: 'TESLA',
        words: ['PLAID', 'ELECTRIC', 'AUTOPILOT', 'BATTERY'],
        decoy: 'RHODONITE'
    },
    {
        theme: 'AQUARIUM',
        words: ['CORAL', 'JELLYFISH', 'OCTOPUS', 'DOLPHIN'],
        decoy: 'SUGILITE'
    },
    {
        theme: 'MARATHON',
        words: ['RUNNER', 'FINISH', 'ENDURANCE', 'MEDAL'],
        decoy: 'TANZANITE'
    },
    {
        theme: 'CLIMBING',
        words: ['HARNESS', 'SUMMIT', 'BOULDER', 'RAPPEL'],
        decoy: 'KEYBOARD'
    },
    {
        theme: 'CAMPING',
        words: ['CAMPFIRE', 'SLEEPING', 'TRAIL', 'LANTERN'],
        decoy: 'PRINTER'
    },
    {
        theme: 'FISHING',
        words: ['TACKLE', 'CASTING', 'ANGLER', 'HOOKING'],
        decoy: 'MACHINE'
    },
    {
        theme: 'SAILING',
        words: ['ANCHOR', 'NAUTICAL', 'VOYAGE', 'COMPASS'],
        decoy: 'NEBULA'
    },
    {
        theme: 'WRESTLING',
        words: ['GRAPPLE', 'TAKEDOWN', 'MATCH', 'SUBMISSION'],
        decoy: 'PHOENIX'
    },
    {
        theme: 'GYMNASTICS',
        words: ['VAULT', 'FLOOR', 'ROUTINE', 'BALANCE'],
        decoy: 'SPHINX'
    },
    {
        theme: 'ARCHERY',
        words: ['ARROW', 'TARGET', 'QUIVER', 'BULLSEYE'],
        decoy: 'ZENITH'
    },
    {
        theme: 'BASEBALL',
        words: ['PITCHER', 'HOMERUN', 'DIAMOND', 'STRIKE'],
        decoy: 'PRISM'
    },
    {
        theme: 'FOOTBALL',
        words: ['TOUCHDOWN', 'QUARTERBACK', 'TACKLE', 'FIELD'],
        decoy: 'MIRROR'
    },
    {
        theme: 'CRICKET',
        words: ['WICKET', 'BOWLER', 'CENTURY', 'PITCH'],
        decoy: 'LANTERN'
    },
    {
        theme: 'GOLFER',
        words: ['DRIVER', 'PUTTER', 'BIRDIE', 'CADDY'],
        decoy: 'STATUE'
    },
    {
        theme: 'NASCAR',
        words: ['DRAFTING', 'STOCKCAR', 'VICTORY', 'SPEEDWAY'],
        decoy: 'STARDUST'
    },
    {
        theme: 'HIPHOP',
        words: ['BREAK', 'FREESTYLE', 'BATTLE', 'CIPHER'],
        decoy: 'GLACIER'
    },
    {
        theme: 'SALSA',
        words: ['RHYTHM', 'PARTNER', 'DANCE', 'TEMPO'],
        decoy: 'FALCON'
    },
    {
        theme: 'OPERA',
        words: ['SOPRANO', 'STAGE', 'THEATER', 'OVERTURE'],
        decoy: 'TALON'
    },
    {
        theme: 'SYMPHONY',
        words: ['ORCHESTRA', 'CONDUCTOR', 'MOVEMENT', 'SCORE'],
        decoy: 'MOUNTAIN'
    },
    {
        theme: 'GUITAR',
        words: ['STRING', 'ACOUSTIC', 'CHORD', 'MELODY'],
        decoy: 'AVALANCHE'
    },
    {
        theme: 'VIOLIN',
        words: ['STRING', 'CONCERTO', 'MELODY', 'VIBRATO'],
        decoy: 'CANDLE'
    },
    {
        theme: 'FLUTIST',
        words: ['WOODWIND', 'EMBOUCHURE', 'FINGER', 'MELODY'],
        decoy: 'PYTHON'
    },
    {
        theme: 'BANJO',
        words: ['STRING', 'BLUEGRASS', 'TWANG', 'PLUCK'],
        decoy: 'SERENADE'
    },
    {
        theme: 'SHREK',
        words: ['OGRES', 'DONKEY', 'SWAMP', 'FIONA'],
        decoy: 'MEDAL'
    },
    {
        theme: 'TERMINATOR',
        words: ['CYBORG', 'SARAH', 'CONNOR', 'SKYNET'],
        decoy: 'MARBLE'
    },
    {
        theme: 'BREAKING BAD',
        words: ['WALTER', 'METHLAB', 'JESSIE', 'HEISENBERG'],
        decoy: 'GUITAR'
    },
    {
        theme: 'STRANGER THINGS',
        words: ['ELEVEN', 'DEMOGORGON', 'HAWKINS', 'UPSIDEDOWN'],
        decoy: 'MARBLE'
    },
    {
        theme: 'SOPRANOS',
        words: ['TONYS', 'MOBSTER', 'THERAPY', 'CARMELA'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'WITCHER',
        words: ['GERALT', 'MONSTER', 'SWORD', 'TOSSS'],
        decoy: 'BRAIN'
    },
    {
        theme: 'GAME THRONES',
        words: ['STARK', 'DRAGON', 'THRONE', 'TYRION'],
        decoy: 'ANCHOR'
    },
    {
        theme: 'WALKING DEAD',
        words: ['ZOMBIES', 'RICKSS', 'WALKER', 'GRIMES'],
        decoy: 'BRANCH'
    },
    {
        theme: 'QUEEN',
        words: ['FREDDIE', 'MERCURY', 'BOHEMIAN', 'RHAPSODY'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'POKEMON',
        words: ['PIKACHU', 'ASHEN', 'POKEBALL', 'GYMSS'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'MINECRAFT',
        words: ['STEVE', 'BLOCKS', 'CREEPER', 'DIAMOND'],
        decoy: 'MARBLE'
    },
    {
        theme: 'MARIO KART',
        words: ['RACER', 'SHELLS', 'BANANA', 'DRIFT'],
        decoy: 'CLOUD'
    },
    {
        theme: 'CALL DUTY',
        words: ['WARFARE', 'MODERN', 'SNIPER', 'GHOST'],
        decoy: 'PIANO'
    },
    {
        theme: 'WOLVERINE',
        words: ['LOGAN', 'CLAWS', 'ADAMANTIUM', 'HEALING'],
        decoy: 'BRANCH'
    },
    {
        theme: 'DEADPOOL',
        words: ['WADES', 'WILSON', 'MERCENARY', 'CHIMICHANGA'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'THOR',
        words: ['HAMMER', 'MJOLNIR', 'ASGARD', 'WORTHY'],
        decoy: 'PIANO'
    },
    {
        theme: 'AQUAMAN',
        words: ['ARTHUR', 'CURRY', 'TRIDENT', 'ATLANTIS'],
        decoy: 'BRANCH'
    },
    {
        theme: 'BLACK PANTHER',
        words: ['TCHALLA', 'WAKANDA', 'VIBRANIUM', 'SHURI'],
        decoy: 'MIXER'
    },
    {
        theme: 'DRAGON BALL',
        words: ['GOKUS', 'KAMEHAMEHA', 'SAIYAN', 'VEGETA'],
        decoy: 'BRANCH'
    },
    {
        theme: 'DEMON SLAYER',
        words: ['TANJIRO', 'SWORD', 'BREATHING', 'NEZUKO'],
        decoy: 'MARBLE'
    },
    {
        theme: 'FULLMETAL',
        words: ['EDWARD', 'ELRIC', 'ALCHEMY', 'TRANSMUTE'],
        decoy: 'BRANCH'
    },
    {
        theme: 'TWILIGHT',
        words: ['BELLA', 'EDWARD', 'VAMPIRE', 'CULLEN'],
        decoy: 'BRANCH'
    },
    {
        theme: 'CHRONICLES NARNIA',
        words: ['ASLAN', 'WARDROBE', 'PEVENSIE', 'CASPIAN'],
        decoy: 'BRANCH'
    },
    {
        theme: 'PERCY JACKSON',
        words: ['DEMIGOD', 'POSEIDON', 'OLYMPUS', 'ANNABETH'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'YOUTUBE',
        words: ['SUBSCRIBE', 'VLOGS', 'MONETIZE', 'ALGORITHM'],
        decoy: 'BRANCH'
    },
    {
        theme: 'SPOTIFY',
        words: ['PLAYLIST', 'SHUFFLE', 'PREMIUM', 'WRAPPED'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'SPONGEBOB',
        words: ['PATRICK', 'SQUIDWARD', 'KRABS', 'PLANKTON'],
        decoy: 'MARBLE'
    },
    {
        theme: 'RICK MORTY',
        words: ['PORTAL', 'PICKLE', 'SCHWIFTY', 'MEESEEKS'],
        decoy: 'BRANCH'
    },
    {
        theme: 'FUTURAMA',
        words: ['BENDER', 'LEELA', 'PLANET', 'EXPRESS'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'LEGEND KORRA',
        words: ['AVATAR', 'BENDING', 'REPUBLIC', 'ASAMI'],
        decoy: 'BRANCH'
    },
    {
        theme: 'CASTLEVANIA',
        words: ['DRACULA', 'TREVOR', 'SYPHA', 'ALUCARD'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'SANDMAN',
        words: ['MORPHEUS', 'DREAMS', 'ENDLESS', 'DESIRE'],
        decoy: 'MARBLE'
    },
    {
        theme: 'COBRA KAI',
        words: ['KARATE', 'DANIEL', 'JOHNNY', 'MIGUEL'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'PEAKY BLINDERS',
        words: ['THOMAS', 'SHELBY', 'BIRMINGHAM', 'RAZOR'],
        decoy: 'MARBLE'
    },
    {
        theme: 'TED LASSO',
        words: ['COACH', 'RICHMOND', 'BELIEVE', 'FOOTBALL'],
        decoy: 'MARBLE'
    },
    {
        theme: 'SQUID GAMES',
        words: ['PLAYER', 'GUARD', 'MARBLE', 'BRIDGE'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'HOUSE DRAGON',
        words: ['TARGARYEN', 'DAEMON', 'RHAENYRA', 'VISERYS'],
        decoy: 'MARBLE'
    },
    {
        theme: 'RINGS POWER',
        words: ['GALADRIEL', 'ELROND', 'NUMENOR', 'SAURON'],
        decoy: 'BRANCH'
    },
    {
        theme: 'WHITE LOTUS',
        words: ['RESORT', 'TANYA', 'PORTIA', 'ETHAN'],
        decoy: 'BRANCH'
    },
    {
        theme: 'LOKI',
        words: ['SYLVIE', 'MOBIUS', 'TIMELY', 'VARIANT'],
        decoy: 'BRANCH'
    },
    {
        theme: 'WANDAVISION',
        words: ['WANDA', 'VISION', 'AGATHA', 'NEXUS'],
        decoy: 'MARBLE'
    },
    {
        theme: 'FRIENDS',
        words: ['RACHEL', 'MONICA', 'PHOEBE', 'CHANDLER'],
        decoy: 'VIOLIN'
    },
    {
        theme: 'OFFICE',
        words: ['MICHAEL', 'DWIGHT', 'SCHRUTE', 'DUNDER'],
        decoy: 'MARBLE'
    },
    {
        theme: 'PARKS REC',
        words: ['LESLIE', 'KNOPE', 'SWANSON', 'PERKINS'],
        decoy: 'BRANCH'
    },
    {
        theme: 'COMMUNITY',
        words: ['STUDY', 'GROUP', 'GREENDALE', 'WINGER'],
        decoy: 'MARBLE'
    },
    {
        theme: 'VEEP',
        words: ['SELINA', 'MEYER', 'ERICSSON', 'SPLETT'],
        decoy: 'VIOLIN'
    }
];
