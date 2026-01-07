// Word Groups Data
const wordGroups = [
    {
        theme: 'GARDEN',
        words: ['FLOWERS', 'SEEDS', 'SOILS', 'WATER'],
        decoy: 'LAPTOP'
    },
    {
        theme: 'KITCHEN',
        words: ['STOVE', 'KNIFE', 'PLATE', 'SPOON'],
        decoy: 'FOREST'
    },
    {
        theme: 'FOREST',
        words: ['TREES', 'BIRDS', 'TRAIL', 'MAPLE'],
        decoy: 'GUITAR'
    },
    {
        theme: 'WINTER',
        words: ['SNOWS', 'FROST', 'FROZEN', 'SKATE'],
        decoy: 'SUMMER'
    },
    {
        theme: 'TRAVEL',
        words: ['HOTEL', 'FLIGHT', 'ROADS', 'TOURS'],
        decoy: 'GARDEN'
    },
    {
        theme: 'MOVIE',
        words: ['FILMS', 'ACTOR', 'SCENE', 'DRAMA'],
        decoy: 'PLANET'
    },
    {
        theme: 'ANIMAL',
        words: ['TIGER', 'BEARS', 'ZEBRA', 'LIONS'],
        decoy: 'CASTLE'
    },
    {
        theme: 'DESERT',
        words: ['SANDY', 'CACTUS', 'OASIS', 'DUNES'],
        decoy: 'OCEAN'
    },
    {
        theme: 'CASTLE',
        words: ['TOWER', 'MOATS', 'WALLS', 'GUARD'],
        decoy: 'DOCTOR'
    },
    {
        theme: 'CIRCUS',
        words: ['CLOWN', 'TENTS', 'MAGIC', 'LIONS'],
        decoy: 'STREAM'
    },
    {
        theme: 'PIRATE',
        words: ['SHIPS', 'CHEST', 'SWORD', 'SKULL'],
        decoy: 'MEMORY'
    },
    {
        theme: 'JUNGLE',
        words: ['VINES', 'TREES', 'TRIBE', 'RIVER'],
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
        decoy: 'FOREST'
    },
    {
        theme: 'PIZZA',
        words: ['CRUST', 'SAUCE', 'CHEESE', 'OVENS'],
        decoy: 'ROBOTS'
    },
    {
        theme: 'BAKERY',
        words: ['BREAD', 'FLOUR', 'OVENS', 'ROLLS'],
        decoy: 'PLANET'
    },
    {
        theme: 'TRAINS',
        words: ['TRACK', 'COACH', 'STEAM', 'RAILS'],
        decoy: 'CLOUDS'
    },
    {
        theme: 'BRIDGE',
        words: ['STEEL', 'CABLE', 'RIVER', 'TOWER'],
        decoy: 'JUNGLE'
    },
    {
        theme: 'MARKET',
        words: ['FRUIT', 'GOODS', 'STAND', 'TRADE'],
        decoy: 'ROCKET'
    },
    {
        theme: 'DRAGON',
        words: ['FIRES', 'WINGS', 'SCALE', 'FLAME'],
        decoy: 'GARDEN'
    },
    {
        theme: 'KNIGHT',
        words: ['ARMOR', 'SWORD', 'HORSE', 'QUEST'],
        decoy: 'CLOUDS'
    },
    {
        theme: 'BEACH',
        words: ['SANDY', 'WAVES', 'SHELL', 'SHORE'],
        decoy: 'ROCKET'
    },
    {
        theme: 'STORM',
        words: ['THUNDER', 'RAINS', 'WINDY', 'CLOUD'],
        decoy: 'PALACE'
    },
    {
        theme: 'HARBOR',
        words: ['BOATS', 'DOCKS', 'CRANE', 'SHIPS'],
        decoy: 'JUNGLE'
    },
    {
        theme: 'TEMPLE',
        words: ['STONE', 'ALTAR', 'MONKS', 'BELLS'],
        decoy: 'ROBOTS'
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
        theme: 'METEOR',
        words: ['SPACE', 'ROCKS', 'FALLS', 'CRASH'],
        decoy: 'PLANTS'
    },
    {
        theme: 'GALAXY',
        words: ['STARS', 'ORBIT', 'SPACE', 'NEBULA'],
        decoy: 'GARDEN'
    },
    {
        theme: 'ROBOT',
        words: ['METAL', 'WIRES', 'CHIPS', 'SERVO'],
        decoy: 'FOREST'
    },
    {
        theme: 'LASER',
        words: ['BEAMS', 'LIGHT', 'POWER', 'FOCUS'],
        decoy: 'PLANTS'
    },
    {
        theme: 'MAGIC',
        words: ['SPELL', 'WANDS', 'CHARM', 'TRICK'],
        decoy: 'ROBOTS'
    },
    {
        theme: 'FAIRY',
        words: ['WINGS', 'DUSTS', 'GLOWS', 'SPELL'],
        decoy: 'TRAINS'
    },
    {
        theme: 'GHOST',
        words: ['HAUNT', 'SPIRIT', 'CHAIN', 'MOANS'],
        decoy: 'GARDEN'
    },
    {
        theme: 'ZOMBIE',
        words: ['BRAIN', 'WALKS', 'GROAN', 'HORDE'],
        decoy: 'PALACE'
    },
    {
        theme: 'MUMMY',
        words: ['WRAPS', 'TOMBS', 'EGYPT', 'CURSE'],
        decoy: 'ROCKETS'
    },
    {
        theme: 'CAVES',
        words: ['DARKS', 'STONE', 'DEPTH', 'ECHOS'],
        decoy: 'GARDEN'
    },
    {
        theme: 'MINES',
        words: ['GOLDS', 'SHAFT', 'ROCKS', 'DRILL'],
        decoy: 'CLOUDS'
    },
    {
        theme: 'RIVER',
        words: ['FLOWS', 'WATER', 'ROCKS', 'FISHY'],
        decoy: 'PALACE'
    },
    {
        theme: 'MARSH',
        words: ['SWAMP', 'REEDS', 'FROGS', 'WATER'],
        decoy: 'ROCKET'
    },
    {
        theme: 'FIELD',
        words: ['GRASS', 'WHEAT', 'FARMS', 'CROPS'],
        decoy: 'ROBOTS'
    },
    {
        theme: 'RANCH',
        words: ['HORSE', 'FARMS', 'FENCE', 'BARNS'],
        decoy: 'CLOUDS'
    },
    {
        theme: 'FENCE',
        words: ['WOODS', 'POSTS', 'WIRES', 'RAILS'],
        decoy: 'PLANET'
    },
    {
        theme: 'TOWER',
        words: ['TALLS', 'STONE', 'CLIMB', 'BELLS'],
        decoy: 'GARDEN'
    },
    {
        theme: 'CLOCK',
        words: ['TIMES', 'HANDS', 'TICKS', 'ALARM'],
        decoy: 'FOREST'
    },
    {
        theme: 'WATCH',
        words: ['TIMES', 'STRAP', 'DIALS', 'HANDS'],
        decoy: 'GARDEN'
    },
    {
        theme: 'PHONE',
        words: ['CALLS', 'RINGS', 'DIALS', 'VOICE'],
        decoy: 'FOREST'
    },
    {
        theme: 'CAMERA',
        words: ['LENSES', 'FLASH', 'PHOTO', 'FOCUS'],
        decoy: 'GARDEN'
    },
    {
        theme: 'PHOTO',
        words: ['IMAGE', 'FRAME', 'SHOTS', 'ALBUM'],
        decoy: 'JUNGLE'
    },
    {
        theme: 'PALACE',
        words: ['KINGS', 'THRONE', 'GRAND', 'HALLS'],
        decoy: 'FOREST'
    },
    {
        theme: 'THRONE',
        words: ['KINGS', 'ROYAL', 'SEATS', 'CROWN'],
        decoy: 'FOREST'
    },
    {
        theme: 'CROWN',
        words: ['KINGS', 'GOLDS', 'JEWEL', 'ROYAL'],
        decoy: 'FOREST'
    },
    {
        theme: 'SHIELD',
        words: ['ARMOR', 'METAL', 'GUARD', 'CREST'],
        decoy: 'FOREST'
    },
    {
        theme: 'HAMMER',
        words: ['NAILS', 'TOOLS', 'STRIKE', 'METAL'],
        decoy: 'FOREST'
    },
    {
        theme: 'ANVIL',
        words: ['FORGE', 'METAL', 'SMITH', 'IRONS'],
        decoy: 'GARDEN'
    },
    {
        theme: 'FORGE',
        words: ['FIRES', 'METAL', 'SMITH', 'ANVIL'],
        decoy: 'GARDEN'
    },
    {
        theme: 'BLADE',
        words: ['SHARP', 'EDGES', 'STEEL', 'SWORD'],
        decoy: 'GARDEN'
    },
    {
        theme: 'HUNTER',
        words: ['TRACK', 'PREYS', 'WOODS', 'RIFLE'],
        decoy: 'PALACE'
    },
    {
        theme: 'TRACKS',
        words: ['TRAIL', 'FOOTS', 'HUNTS', 'PRINT'],
        decoy: 'PALACE'
    },
    {
        theme: 'EAGLES',
        words: ['WINGS', 'NESTS', 'SOARS', 'TALON'],
        decoy: 'PALACE'
    },
    {
        theme: 'FALCON',
        words: ['BIRDS', 'SWIFT', 'DIVES', 'HUNTS'],
        decoy: 'PALACE'
    },
    {
        theme: 'HAWKS',
        words: ['BIRDS', 'PREYS', 'SOARS', 'TALON'],
        decoy: 'CASTLE'
    },
    {
        theme: 'RAVENS',
        words: ['BLACK', 'BIRDS', 'WINGS', 'CALLS'],
        decoy: 'CASTLE'
    },
    {
        theme: 'PARROT',
        words: ['BIRDS', 'COLOR', 'TALKS', 'BEAKS'],
        decoy: 'CASTLE'
    },
    {
        theme: 'MONKEY',
        words: ['TREES', 'TAILS', 'CLIMB', 'SWING'],
        decoy: 'CASTLE'
    },
    {
        theme: 'PANDA',
        words: ['BAMBOO', 'BLACK', 'WHITE', 'BEARS'],
        decoy: 'CASTLE'
    },
    {
        theme: 'KOALA',
        words: ['TREES', 'LEAFS', 'SLEEP', 'BEARS'],
        decoy: 'ROCKET'
    },
    {
        theme: 'WHALE',
        words: ['OCEAN', 'GIANT', 'SPOUT', 'DIVES'],
        decoy: 'FOREST'
    },
    {
        theme: 'DOLPHIN',
        words: ['OCEAN', 'JUMPS', 'SWIMS', 'SMART'],
        decoy: 'FOREST'
    },
    {
        theme: 'SEALS',
        words: ['WATER', 'SWIMS', 'FISHY', 'COAST'],
        decoy: 'JUNGLE'
    },
    {
        theme: 'SUMMIT',
        words: ['PEAKS', 'CLIMB', 'MOUNT', 'ROCKY'],
        decoy: 'PALACE'
    },
    {
        theme: 'CANYON',
        words: ['GORGE', 'CLIFF', 'DEEPS', 'ROCKS'],
        decoy: 'PALACE'
    },
    {
        theme: 'RAPIDS',
        words: ['RIVER', 'RUSHS', 'WATER', 'ROCKS'],
        decoy: 'CASTLE'
    },
    {
        theme: 'STREAM',
        words: ['WATER', 'FLOWS', 'CREEK', 'ROCKS'],
        decoy: 'CASTLE'
    },
    {
        theme: 'BROOK',
        words: ['STREAM', 'WATER', 'SMALL', 'FLOWS'],
        decoy: 'ROBOTS'
    },
    {
        theme: 'MEADOW',
        words: ['GRASS', 'FIELD', 'GREEN', 'FLOWER'],
        decoy: 'ROBOTS'
    },
    {
        theme: 'PLAINS',
        words: ['FLATS', 'GRASS', 'WIDES', 'OPENS'],
        decoy: 'CASTLE'
    },
    {
        theme: 'PRAIRIE',
        words: ['GRASS', 'WIDES', 'FLATS', 'OPENS'],
        decoy: 'ROBOTS'
    },
    {
        theme: 'TUNDRA',
        words: ['COLDS', 'MOSSY', 'FLATS', 'BARES'],
        decoy: 'JUNGLE'
    },
    {
        theme: 'VOLCANO',
        words: ['LAVAS', 'ERUPT', 'CRATER', 'ASHEN'],
        decoy: 'PALACE'
    }
];
