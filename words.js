// Word Groups Data
const wordGroups = [
    {
        theme: 'GARDEN',
        words: ['GARDEN', 'FLOWERS', 'SEEDS', 'SOILS', 'WATER']
    },
    {
        theme: 'KITCHEN',
        words: ['KITCHEN', 'STOVE', 'KNIFE', 'PLATE', 'SPOON']
    },
    {
        theme: 'FOREST',
        words: ['FOREST', 'TREES', 'BIRDS', 'TRAIL', 'MAPLE']
    },
    {
        theme: 'WINTER',
        words: ['WINTER', 'SNOWS', 'FROST', 'FROZEN', 'SKATE']
    },
    {
        theme: 'TRAVEL',
        words: ['TRAVEL', 'HOTEL', 'FLIGHT', 'ROADS', 'TOURS']
    },
    {
        theme: 'MOVIE',
        words: ['MOVIE', 'FILMS', 'ACTOR', 'SCENE', 'DRAMA']
    },
    {
        theme: 'ANIMAL',
        words: ['ANIMAL', 'TIGER', 'BEARS', 'ZEBRA', 'LIONS']
    },
    {
        theme: 'DESERT',
        words: ['DESERT', 'SANDY', 'CACTUS', 'OASIS', 'DUNES']
    },
    {
        theme: 'CASTLE',
        words: ['CASTLE', 'TOWER', 'MOATS', 'WALLS', 'GUARD']
    },
    {
        theme: 'CIRCUS',
        words: ['CIRCUS', 'CLOWN', 'TENTS', 'MAGIC', 'LIONS']
    },
    {
        theme: 'PIRATE',
        words: ['PIRATE', 'SHIPS', 'CHEST', 'SWORD', 'SKULL']
    },
    {
        theme: 'JUNGLE',
        words: ['JUNGLE', 'VINES', 'TREES', 'TRIBE', 'RIVER']
    },
    {
        theme: 'ARCTIC',
        words: ['ARCTIC', 'POLAR', 'BEARS', 'SNOWY', 'FROST']
    },
    {
        theme: 'COFFEE',
        words: ['COFFEE', 'BEANS', 'CREAM', 'LATTE', 'MOCHA']
    },
    {
        theme: 'PIZZA',
        words: ['PIZZA', 'CRUST', 'SAUCE', 'CHEESE', 'OVENS']
    },
    {
        theme: 'BAKERY',
        words: ['BAKERY', 'BREAD', 'FLOUR', 'OVENS', 'ROLLS']
    },
    {
        theme: 'TRAINS',
        words: ['TRAINS', 'TRACK', 'COACH', 'STEAM', 'RAILS']
    },
    {
        theme: 'BRIDGE',
        words: ['BRIDGE', 'STEEL', 'CABLE', 'RIVER', 'TOWER']
    },
    {
        theme: 'MARKET',
        words: ['MARKET', 'FRUIT', 'GOODS', 'STAND', 'TRADE']
    },
    {
        theme: 'DRAGON',
        words: ['DRAGON', 'FIRES', 'WINGS', 'SCALE', 'FLAME']
    },
    {
        theme: 'KNIGHT',
        words: ['KNIGHT', 'ARMOR', 'SWORD', 'HORSE', 'QUEST']
    },
    {
        theme: 'BEACH',
        words: ['BEACH', 'SANDY', 'WAVES', 'SHELL', 'SHORE']
    },
    {
        theme: 'STORM',
        words: ['STORM', 'THUNDER', 'RAINS', 'WINDY', 'CLOUD']
    },
    {
        theme: 'HARBOR',
        words: ['HARBOR', 'BOATS', 'DOCKS', 'CRANE', 'SHIPS']
    },
    {
        theme: 'TEMPLE',
        words: ['TEMPLE', 'STONE', 'ALTAR', 'MONKS', 'BELLS']
    },
    {
        theme: 'VALLEY',
        words: ['VALLEY', 'HILLS', 'GRASS', 'CREEK', 'FIELD']
    },
    {
        theme: 'ISLAND',
        words: ['ISLAND', 'PALMS', 'COAST', 'WATER', 'BEACH']
    },
    {
        theme: 'METEOR',
        words: ['METEOR', 'SPACE', 'ROCKS', 'FALLS', 'CRASH']
    },
    {
        theme: 'GALAXY',
        words: ['GALAXY', 'STARS', 'ORBIT', 'SPACE', 'NEBULA']
    },
    {
        theme: 'ROBOT',
        words: ['ROBOT', 'METAL', 'WIRES', 'CHIPS', 'SERVO']
    },
    {
        theme: 'LASER',
        words: ['LASER', 'BEAMS', 'LIGHT', 'POWER', 'FOCUS']
    },
    {
        theme: 'MAGIC',
        words: ['MAGIC', 'SPELL', 'WANDS', 'CHARM', 'TRICK']
    },
    {
        theme: 'FAIRY',
        words: ['FAIRY', 'WINGS', 'DUSTS', 'GLOWS', 'SPELL']
    },
    {
        theme: 'GHOST',
        words: ['GHOST', 'HAUNT', 'SPIRIT', 'CHAIN', 'MOANS']
    },
    {
        theme: 'ZOMBIE',
        words: ['ZOMBIE', 'BRAIN', 'WALKS', 'GROAN', 'HORDE']
    },
    {
        theme: 'MUMMY',
        words: ['MUMMY', 'WRAPS', 'TOMBS', 'EGYPT', 'CURSE']
    },
    {
        theme: 'CAVES',
        words: ['CAVES', 'DARKS', 'STONE', 'DEPTH', 'ECHOS']
    },
    {
        theme: 'MINES',
        words: ['MINES', 'GOLDS', 'SHAFT', 'ROCKS', 'DRILL']
    },
    {
        theme: 'RIVER',
        words: ['RIVER', 'FLOWS', 'WATER', 'ROCKS', 'FISHY']
    },
    {
        theme: 'MARSH',
        words: ['MARSH', 'SWAMP', 'REEDS', 'FROGS', 'WATER']
    },
    {
        theme: 'FIELD',
        words: ['FIELD', 'GRASS', 'WHEAT', 'FARMS', 'CROPS']
    },
    {
        theme: 'RANCH',
        words: ['RANCH', 'HORSE', 'FARMS', 'FENCE', 'BARNS']
    },
    {
        theme: 'FENCE',
        words: ['FENCE', 'WOODS', 'POSTS', 'WIRES', 'RAILS']
    },
    {
        theme: 'TOWER',
        words: ['TOWER', 'TALLS', 'STONE', 'CLIMB', 'BELLS']
    },
    {
        theme: 'CLOCK',
        words: ['CLOCK', 'TIMES', 'HANDS', 'TICKS', 'ALARM']
    },
    {
        theme: 'WATCH',
        words: ['WATCH', 'TIMES', 'STRAP', 'DIALS', 'HANDS']
    },
    {
        theme: 'PHONE',
        words: ['PHONE', 'CALLS', 'RINGS', 'DIALS', 'VOICE']
    },
    {
        theme: 'CAMERA',
        words: ['CAMERA', 'LENSES', 'FLASH', 'PHOTO', 'FOCUS']
    },
    {
        theme: 'PHOTO',
        words: ['PHOTO', 'IMAGE', 'FRAME', 'SHOTS', 'ALBUM']
    },
    {
        theme: 'PALACE',
        words: ['PALACE', 'KINGS', 'THRONE', 'GRAND', 'HALLS']
    },
    {
        theme: 'THRONE',
        words: ['THRONE', 'KINGS', 'ROYAL', 'SEATS', 'CROWN']
    },
    {
        theme: 'CROWN',
        words: ['CROWN', 'KINGS', 'GOLDS', 'JEWEL', 'ROYAL']
    },
    {
        theme: 'SHIELD',
        words: ['SHIELD', 'ARMOR', 'METAL', 'GUARD', 'CREST']
    },
    {
        theme: 'HAMMER',
        words: ['HAMMER', 'NAILS', 'TOOLS', 'STRIKE', 'METAL']
    },
    {
        theme: 'ANVIL',
        words: ['ANVIL', 'FORGE', 'METAL', 'SMITH', 'IRONS']
    },
    {
        theme: 'FORGE',
        words: ['FORGE', 'FIRES', 'METAL', 'SMITH', 'ANVIL']
    },
    {
        theme: 'BLADE',
        words: ['BLADE', 'SHARP', 'EDGES', 'STEEL', 'SWORD']
    },
    {
        theme: 'HUNTER',
        words: ['HUNTER', 'TRACK', 'PREYS', 'WOODS', 'RIFLE']
    },
    {
        theme: 'TRACKS',
        words: ['TRACKS', 'TRAIL', 'FOOTS', 'HUNTS', 'PRINT']
    },
    {
        theme: 'EAGLES',
        words: ['EAGLES', 'WINGS', 'NESTS', 'SOARS', 'TALON']
    },
    {
        theme: 'FALCON',
        words: ['FALCON', 'BIRDS', 'SWIFT', 'DIVES', 'HUNTS']
    },
    {
        theme: 'HAWKS',
        words: ['HAWKS', 'BIRDS', 'PREYS', 'SOARS', 'TALON']
    },
    {
        theme: 'RAVENS',
        words: ['RAVENS', 'BLACK', 'BIRDS', 'WINGS', 'CALLS']
    },
    {
        theme: 'PARROT',
        words: ['PARROT', 'BIRDS', 'COLOR', 'TALKS', 'BEAKS']
    },
    {
        theme: 'MONKEY',
        words: ['MONKEY', 'TREES', 'TAILS', 'CLIMB', 'SWING']
    },
    {
        theme: 'PANDA',
        words: ['PANDA', 'BAMBOO', 'BLACK', 'WHITE', 'BEARS']
    },
    {
        theme: 'KOALA',
        words: ['KOALA', 'TREES', 'LEAFS', 'SLEEP', 'BEARS']
    },
    {
        theme: 'WHALE',
        words: ['WHALE', 'OCEAN', 'GIANT', 'SPOUT', 'DIVES']
    },
    {
        theme: 'DOLPHIN',
        words: ['DOLPHIN', 'OCEAN', 'JUMPS', 'SWIMS', 'SMART']
    },
    {
        theme: 'SEALS',
        words: ['SEALS', 'WATER', 'SWIMS', 'FISHY', 'COAST']
    },
    {
        theme: 'SUMMIT',
        words: ['SUMMIT', 'PEAKS', 'CLIMB', 'MOUNT', 'ROCKY']
    },
    {
        theme: 'CANYON',
        words: ['CANYON', 'GORGE', 'CLIFF', 'DEEPS', 'ROCKS']
    },
    {
        theme: 'RAPIDS',
        words: ['RAPIDS', 'RIVER', 'RUSHS', 'WATER', 'ROCKS']
    },
    {
        theme: 'STREAM',
        words: ['STREAM', 'WATER', 'FLOWS', 'CREEK', 'ROCKS']
    },
    {
        theme: 'BROOK',
        words: ['BROOK', 'STREAM', 'WATER', 'SMALL', 'FLOWS']
    },
    {
        theme: 'MEADOW',
        words: ['MEADOW', 'GRASS', 'FIELD', 'GREEN', 'FLOWER']
    },
    {
        theme: 'PLAINS',
        words: ['PLAINS', 'FLATS', 'GRASS', 'WIDES', 'OPENS']
    },
    {
        theme: 'PRAIRIE',
        words: ['PRAIRIE', 'GRASS', 'WIDES', 'FLATS', 'OPENS']
    },
    {
        theme: 'TUNDRA',
        words: ['TUNDRA', 'COLDS', 'MOSSY', 'FLATS', 'BARES']
    },
    {
        theme: 'VOLCANO',
        words: ['VOLCANO', 'LAVAS', 'ERUPT', 'CRATER', 'ASHEN']
    }
];
