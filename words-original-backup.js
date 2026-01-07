// Word Groups Data
const wordGroups = [
    {
        theme: 'GARDEN',
        words: ['FLOWERS', 'SHOVEL', 'MULCH', 'WATER'],
        decoy: 'LAPTOP'
    },
    {
        theme: 'KITCHEN',
        words: ['STOVE', 'KNIFE', 'PLATE', 'SPOON'],
        decoy: 'FOREST'
    },
    {
        theme: 'FOREST',
        words: ['TREES', 'MAPLE', 'TRAIL', 'CREEK'],
        decoy: 'GUITAR'
    },
    {
        theme: 'MOVIE',
        words: ['FILMS', 'ACTOR', 'SCENE', 'DRAMA'],
        decoy: 'PLANET'
    },
    {
        theme: 'ANIMAL',
        words: ['TIGER', 'BEARS', 'ZEBRA', 'RHINO'],
        decoy: 'CASTLE'
    },
    {
        theme: 'PIRATE',
        words: ['SHIPS', 'CHEST', 'SWORD', 'SKULL'],
        decoy: 'MEMORY'
    },
    {
        theme: 'JUNGLE',
        words: ['VINES', 'RIVER', 'TRIBE', 'MACAW'],
        decoy: 'SCHOOL'
    },
    {
        theme: 'ARCTIC',
        words: ['POLAR', 'BEARS', 'SNOWY', 'FROST'],
        decoy: 'DESERT'
    },
    {
        theme: 'COFFEE',
        words: ['BEANS', 'CREAM', 'LATTE', 'MOCHA'],
        decoy: 'MEADOW'
    },
    {
        theme: 'BAKERY',
        words: ['BREAD', 'FLOUR', 'OVENS', 'MUFFIN'],
        decoy: 'WIZARD'
    },
    {
        theme: 'TRAINS',
        words: ['TRACK', 'COACH', 'STEAM', 'RAILS'],
        decoy: 'CLOUDS'
    },
    {
        theme: 'KNIGHT',
        words: ['ARMOR', 'SWORD', 'HORSE', 'QUEST'],
        decoy: 'ROBOTS'
    },
    {
        theme: 'BEACH',
        words: ['SANDY', 'WAVES', 'SHELL', 'SHORE'],
        decoy: 'ROCKET'
    },
    {
        theme: 'GALAXY',
        words: ['STARS', 'ORBIT', 'SPACE', 'NEBULA'],
        decoy: 'BAMBOO'
    },
    {
        theme: 'ROBOT',
        words: ['METAL', 'WIRES', 'CIRCUIT', 'SERVO'],
        decoy: 'ORCHID'
    },
    {
        theme: 'MAGIC',
        words: ['SPELL', 'WANDS', 'CHARM', 'TRICK'],
        decoy: 'CANYON'
    },
    {
        theme: 'ZOMBIE',
        words: ['BRAIN', 'WALKS', 'GROAN', 'HORDE'],
        decoy: 'PALACE'
    },
    {
        theme: 'MUMMY',
        words: ['WRAPS', 'EGYPT', 'CURSE', 'BURIAL'],
        decoy: 'SHIELD'
    },
    {
        theme: 'MARSH',
        words: ['SWAMP', 'REEDS', 'WATER', 'FROGGY'],
        decoy: 'BRONZE'
    },
    {
        theme: 'VALLEY',
        words: ['HILLS', 'GRASS', 'CREEK', 'FIELD'],
        decoy: 'PIRATE'
    },
    {
        theme: 'ISLAND',
        words: ['PALMS', 'COAST', 'WATER', 'BEACH'],
        decoy: 'TRAINS'
    },
    {
        theme: 'WHALE',
        words: ['OCEAN', 'GIANT', 'SPOUT', 'DIVES'],
        decoy: 'THUNDER'
    },
    {
        theme: 'DOLPHIN',
        words: ['OCEAN', 'JUMPS', 'PLAYFUL', 'SMART'],
        decoy: 'CRIMSON'
    },
    {
        theme: 'SUMMIT',
        words: ['PEAKS', 'CLIMB', 'MOUNT', 'ROCKY'],
        decoy: 'VELVET'
    },
    {
        theme: 'MEADOW',
        words: ['GRASS', 'FIELD', 'GREEN', 'FLOWER'],
        decoy: 'COBALT'
    },
    {
        theme: 'VOLCANO',
        words: ['MAGMA', 'ERUPT', 'CRATER', 'ASHEN'],
        decoy: 'MAROON'
    },
    {
        theme: 'HARRY POTTER',
        words: ['SNAPE', 'MAGIC', 'HOGWART', 'POTION'],
        decoy: 'SHADOW'
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
        theme: 'BEATLES',
        words: ['LENNON', 'MCCARTNEY', 'HARRISON', 'STARR'],
        decoy: 'SILVER'
    },
    {
        theme: 'EINSTEIN',
        words: ['RELATIVITY', 'ENERGY', 'THEORY', 'PHYSICS'],
        decoy: 'COPPER'
    },
    {
        theme: 'TENNIS',
        words: ['SERVE', 'VOLLEY', 'BASELINE', 'DEUCE'],
        decoy: 'SAFFRON'
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
        theme: 'SHAKESPEARE',
        words: ['HAMLET', 'MACBETH', 'ROMEO', 'JULIET'],
        decoy: 'CRYSTAL'
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
        theme: 'SURFING',
        words: ['BARREL', 'WIPEOUT', 'BOARD', 'WAVES'],
        decoy: 'QUARTZ'
    },
    {
        theme: 'YOGA POSE',
        words: ['DOWNDOG', 'WARRIOR', 'LOTUS', 'NAMASTE'],
        decoy: 'TOPAZ'
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
        theme: 'SEINFELD',
        words: ['JERRY', 'ELAINE', 'GEORGE', 'KRAMER'],
        decoy: 'SAPPHIRE'
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
        theme: 'WHISKEY',
        words: ['BOURBON', 'SCOTCH', 'BARREL', 'AGING'],
        decoy: 'PEARL'
    },
    {
        theme: 'WINERY',
        words: ['MERLOT', 'CABERNET', 'PINOT', 'CHARDONNAY'],
        decoy: 'JADEITE'
    },
    {
        theme: 'MEXICO',
        words: ['TACOS', 'TEQUILA', 'MARIACHI', 'CANCUN'],
        decoy: 'CORAL'
    },
    {
        theme: 'ITALY',
        words: ['PASTA', 'VENICE', 'COLOSSEUM', 'GELATO'],
        decoy: 'GRANITE'
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
        theme: 'POKER',
        words: ['FLUSH', 'STRAIGHT', 'ROYAL', 'BLUFF'],
        decoy: 'MOONSTONE'
    },
    {
        theme: 'CHESS',
        words: ['BISHOP', 'KNIGHT', 'CHECKMATE', 'CASTLE'],
        decoy: 'AGATE'
    },
    {
        theme: 'HOCKEY',
        words: ['STICK', 'PENALTY', 'SKATING', 'GOALIE'],
        decoy: 'TOURMALINE'
    },
    {
        theme: 'BATMAN',
        words: ['GOTHAM', 'JOKER', 'ROBIN', 'ALFRED'],
        decoy: 'PERIDOT'
    },
    {
        theme: 'SUPERMAN',
        words: ['KRYPTON', 'METROPOLIS', 'CLARK', 'SMALLVILLE'],
        decoy: 'ZIRCON'
    },
    {
        theme: 'STARWARS',
        words: ['VADER', 'SKYWALKER', 'SABER', 'FORCE'],
        decoy: 'BERYL'
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
        theme: 'OLYMPICS',
        words: ['TORCH', 'STADIUM', 'TRACK', 'MEDALS'],
        decoy: 'LARIMAR'
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
        theme: 'BICYCLE',
        words: ['PEDAL', 'CHAIN', 'WHEEL', 'BRAKE'],
        decoy: 'TURRET'
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
        theme: 'SKIING',
        words: ['SLOPE', 'POWDER', 'DOWNHILL', 'ALPINE'],
        decoy: 'ECLIPSE'
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
        theme: 'FENCING',
        words: ['SABRE', 'LUNGE', 'RIPOSTE', 'THRUST'],
        decoy: 'HAMMER'
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
        theme: 'FORMULA',
        words: ['RACING', 'PITSTOP', 'TRACK', 'GRAND'],
        decoy: 'WHISTLE'
    },
    {
        theme: 'NASCAR',
        words: ['DRAFTING', 'STOCKCAR', 'VICTORY', 'SPEEDWAY'],
        decoy: 'STARDUST'
    },
    {
        theme: 'BALLET',
        words: ['PIROUETTE', 'POINTE', 'DANCER', 'GRACE'],
        decoy: 'RAVEN'
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
        theme: 'DRUMMER',
        words: ['SNARE', 'CYMBAL', 'STICK', 'TEMPO'],
        decoy: 'STARFISH'
    },
    {
        theme: 'PIANIST',
        words: ['MELODY', 'GRAND', 'CHORD', 'SONATA'],
        decoy: 'BLIZZARD'
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
    }
];
