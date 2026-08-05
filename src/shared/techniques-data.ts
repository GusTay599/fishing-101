// UK Fishing Techniques Guide
// Each technique includes: species associations, recommended baits, tips

export interface Technique {
  id: string;
  name: string;
  description: string;
  water_type: 'freshwater' | 'saltwater' | 'all';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  best_for_species: string[]; // fish species IDs
  recommended_baits: string[]; // bait IDs
  tips: string[];
  pros: string[];
  cons: string[];
}

export const TECHNIQUES_DATA: Technique[] = [
  // ===== FRESHWATER TECHNIQUES =====
  {
    id: 'float-fishing',
    name: 'Float Fishing',
    description: 'The classic method of presenting bait under a float. Versatile and suitable for beginners and experts alike. Used for coarse, sea, and game fishing with various float setups.',
    water_type: 'all',
    difficulty: 'beginner',
    best_for_species: ['tench', 'bream', 'roach', 'rudd', 'perch', 'chub', 'dace', 'gudgeon', 'plaice', 'dab', 'flounder', 'bass'],
    recommended_baits: ['maggots', 'casters', 'sweetcorn', 'bread', 'ragworm', 'cockles', 'bloodworm-salt'],
    tips: [
      'Match the float size to the depth and current',
      'Use a sensitive float for shy-biting fish like tench',
      'Keep the line tight to the float for better bite detection',
      'Use a waggler float for stillwater, a stick float for rivers'
    ],
    pros: ['Visual bite indication', 'Versatile', 'Beginner-friendly', 'Can fish at precise depths'],
    cons: ['Limited casting distance', 'Affected by wind', 'Can be slow-paced']
  },
  {
    id: 'leger-fishing',
    name: 'Leger / Ledger Fishing',
    description: 'Fishing on the bottom with a weight (lead) to hold the bait in place. The most common method for sea fishing and effective for many freshwater species. Includes running ledger, fixed ledger, and paternoster rigs.',
    water_type: 'all',
    difficulty: 'beginner',
    best_for_species: ['barbel', 'bass', 'cod', 'conger-eel', 'dogfish', 'smooth-hound', 'flounder', 'plaice', 'dab', 'whiting', 'pollock', 'common-carp'],
    recommended_baits: ['boilies', 'worms', 'lugworm', 'squid', 'peeler-crab', 'mackerel-flapper', 'fish-strip-bait'],
    tips: [
      'Use a running ledger for maximum sensitivity',
      'A paternoster rig keeps bait off the bottom',
      'Match the lead weight to the current and casting distance',
      'Use a bait clip for clean, aerodynamic casting'
    ],
    pros: ['Versatile', 'Good for big fish', 'Can fish at distance', 'Works in all conditions'],
    cons: ['Less sensitive than float fishing', 'Can snag on rough ground', 'Bait presentation less visual']
  },
  {
    id: 'feeder-fishing',
    name: 'Feeder Fishing',
    description: 'A self-contained bait delivery system where a cage or method feeder holds groundbait around the hookbait. Extremely effective for bream, carp, and barbel. The feeder breaks down on the bottom creating a concentrated bait patch.',
    water_type: 'freshwater',
    difficulty: 'intermediate',
    best_for_species: ['common-carp', 'bream', 'tench', 'barbel', 'chub', 'roach', 'dace'],
    recommended_baits: ['boilies', 'pellets', 'sweetcorn', 'maggots', 'casters', 'groundbait-mix', 'method-mix'],
    tips: [
      'Use a method feeder for carp and bream in stillwater',
      'Cage feeders are better for rivers and distance casting',
      'Mould the mix firmly so it stays on during the cast',
      'Leave the feeder in place for 10-15 minutes before recasting'
    ],
    pros: ['Delivers bait and hookbait together', 'Self-contained', 'Good for distance', 'Consistent bait placement'],
    cons: ['Requires specific feeders', 'Can be heavy to cast', 'Needs practice to mould']
  },
  {
    id: 'specimen-carp-fishing',
    name: 'Specimen / Carp Fishing',
    description: 'Specialist big-fish tactics using hair rigs, boilies, and electronic bite alarms. Designed for targeting specimen carp, barbel, and other large species. Involves long sessions, heavy tackle, and precise bait placement.',
    water_type: 'freshwater',
    difficulty: 'intermediate',
    best_for_species: ['common-carp', 'barbel', 'tench', 'bream'],
    recommended_baits: ['boilies', 'particles', 'pellets', 'sweetcorn', 'bread'],
    tips: [
      'Hair rig boilies for the most natural presentation',
      'Use pop-ups or wafters for visibility over weed',
      'Pre-bait an area for days before a session',
      'Use a bait boat for precise placement at distance'
    ],
    pros: ['Targets big fish', 'Effective for cautious specimens', 'Many rig options', 'Can fish for days'],
    cons: ['Expensive tackle', 'Requires patience', 'Long sessions', 'Heavy gear']
  },
  {
    id: 'predator-lure-fishing',
    name: 'Predator / Lure Fishing',
    description: 'Using artificial lures to catch predatory fish. Spinning, jigging, and plug fishing are all forms of lure fishing. Active and exciting — you cover water and trigger aggressive strikes from pike, perch, and chub.',
    water_type: 'freshwater',
    difficulty: 'intermediate',
    best_for_species: ['pike', 'perch', 'chub', 'brown-trout', 'rainbow-trout', 'grayling', 'bass'],
    recommended_baits: ['spinners', 'spoons', 'plugs', 'soft-plastics', 'jigs', 'wobblers', 'poppers'],
    tips: [
      'Match the lure size to the prey fish in the venue',
      'Vary retrieve speed and action to trigger strikes',
      'Use natural colours in clear water, bright in murky',
      'Fish near structures where predators ambush prey'
    ],
    pros: ['Active and exciting', 'Cover lots of water', 'No live bait needed', 'Quickly locate fish'],
    cons: ['Can be tiring', 'Requires practice', 'Weather dependent', 'Tangles and snags']
  },
  {
    id: 'fly-fishing',
    name: 'Fly Fishing',
    description: 'The most traditional and elegant form of fishing. Using a weighted line to cast artificial flies that mimic insects. The pinnacle of angling skill — requiring timing, presentation, and a deep understanding of river ecology.',
    water_type: 'freshwater',
    difficulty: 'advanced',
    best_for_species: ['brown-trout', 'rainbow-trout', 'grayling'],
    recommended_baits: ['flies'],
    tips: [
      'Match the hatch — use flies that mimic current insect activity',
      'Start with general patterns like Hare\'s Ear and Pheasant Tail',
      'Presentation is everything — land the fly gently on the water',
      'Learn to read the water for feeding fish'
    ],
    pros: ['Most satisfying method', 'Beautiful and peaceful', 'Highly effective for trout', 'Deep connection with nature'],
    cons: ['Steep learning curve', 'Expensive gear', 'Weather dependent', 'Limited to certain species']
  },
  {
    id: 'trotting',
    name: 'Trotting (Float on River)',
    description: 'A river fishing method where a float is allowed to drift naturally with the current, covering a long stretch of water. Classic for roach, dace, chub, and grayling. The float bounces along the riverbed presenting bait naturally.',
    water_type: 'freshwater',
    difficulty: 'intermediate',
    best_for_species: ['roach', 'dace', 'chub', 'grayling', 'brown-trout', 'barbel', 'gudgeon'],
    recommended_baits: ['maggots', 'casters', 'bread', 'worms', 'cheese-paste'],
    tips: [
      'Use aAvon or stick float for trotting',
      'Mending the line keeps the float drifting naturally',
      'Fish the first hour of the float\'s journey most carefully',
      'Use a link ledger to slow the float in fast water'
    ],
    pros: ['Natural bait presentation', 'Covers lots of water', 'Very effective on rivers', 'Traditional and satisfying'],
    cons: ['River-only method', 'Requires practice', 'Affected by depth changes', 'Needs clear riverbed']
  },
  {
    id: 'pellet-waggler',
    name: 'Pellet Waggler',
    description: 'A specialist method for fishing pellets on the surface or mid-depth using a waggler float. Deadly for carp and F1s in commercial fisheries. The pellets create a feeding frenzy on the surface.',
    water_type: 'freshwater',
    difficulty: 'intermediate',
    best_for_species: ['common-carp', 'tench', 'bream', 'roach', 'rudd'],
    recommended_baits: ['pellets', 'sweetcorn', 'boilies'],
    tips: [
      'Start by balling in pellets to get fish feeding confidently',
      'Fish a hard 8mm pellet on the hook',
      'Set the waggler to fish shallow for surface-feeding carp',
      'Use a fast-sinking pellet for deeper presentations'
    ],
    pros: ['Fast and exciting', 'Very effective on commercials', 'Good for big carp', 'Simple setup'],
    cons: ['Commercial fisheries only', 'Needs lots of pellets', 'Can be too fast-paced']
  },
  {
    id: 'pole-fishing',
    name: 'Pole Fishing',
    description: 'Using a long carbon pole (up to 16m) to present bait with extreme precision. The most accurate method for stillwater fishing. Dominates match fishing and is incredibly effective for bream, tench, and carp.',
    water_type: 'freshwater',
    difficulty: 'intermediate',
    best_for_species: ['bream', 'tench', 'common-carp', 'roach', 'rudd', 'dace', 'gudgeon'],
    recommended_baits: ['maggots', 'casters', 'sweetcorn', 'worms', 'pellets', 'bread'],
    tips: [
      'Start at 13m and ship out to 16m when fish are feeding',
      'Use a bulk shotting pattern for fast bait presentation',
      'Micro-pots allow precise loose feeding',
      'Top kits with elastic allow you to land big fish on light gear'
    ],
    pros: ['Pinpoint accuracy', 'Very sensitive', 'Great for match fishing', 'Versatile depths'],
    cons: ['Bulky equipment', 'Limited to stillwater', 'Takes practice', 'Poles can break']
  },

  // ===== SALTWATER TECHNIQUES =====
  {
    id: 'beach-casting',
    name: 'Beach / Surf Casting',
    description: 'Casting from beaches into the surf zone. The surf creates a feeding zone where waves stir up food. Heavy leads and long casts are needed to reach the feeding zone beyond the breakers.',
    water_type: 'saltwater',
    difficulty: 'beginner',
    best_for_species: ['bass', 'cod', 'whiting', 'smooth-hound', 'flounder', 'dab', 'plaice'],
    recommended_baits: ['lugworm', 'ragworm', 'squid', 'peeler-crab', 'cockles', 'lug-rag-cocktail'],
    tips: [
      'Fish the last two hours of the flood and first of the ebb',
      'Use a shock leader for big casts',
      'Fish at night for the best results',
      'Look for gulleys and sandbanks where fish feed'
    ],
    pros: ['Accessible to everyone', 'Can catch big fish', 'No boat needed', 'Free fishing'],
    cons: ['Weather dependent', 'Casting requires practice', 'Can be cold and wet', 'Difficult in strong winds']
  },
  {
    id: 'pier-fishing',
    name: 'Pier / Mark Fishing',
    description: 'Fishing from piers, harbour walls, and rock marks. Piers provide access to deep water without a boat. A great way to catch a variety of species throughout the year.',
    water_type: 'saltwater',
    difficulty: 'beginner',
    best_for_species: ['mackerel', 'pollock', 'bass', 'cod', 'whiting', 'conger-eel', 'dogfish', 'plaice', 'dab'],
    recommended_baits: ['ragworm', 'mackerel-feather-bait', 'squid', 'fish-strip-bait', 'sand-eel-bait'],
    tips: [
      'Use feathers or sabiki rigs for mackerel bait',
      'Fish at night for cod and conger',
      'Use a running ledger for the best bait presentation',
      'Bring a bucket for bait and a headlamp for night fishing'
    ],
    pros: ['Deep water access', 'Shelter from wind', 'Variety of species', 'Social fishing'],
    cons: ['Can be crowded', 'Tides limit fishing times', 'Access may be restricted', 'Limited casting room']
  },
  {
    id: 'bass-lure-fishing',
    name: 'Bass Lure Fishing',
    description: 'The pinnacle of UK lure fishing. Using plugs, soft plastics, and spinners to catch bass from rocks, beaches, and estuaries. Requires reading the water, understanding tides, and perfecting the retrieve.',
    water_type: 'saltwater',
    difficulty: 'intermediate',
    best_for_species: ['bass', 'pollock', 'mackerel'],
    recommended_baits: ['surface-lures', 'ragworm-lure', 'sand-eel-lure', 'metal-jigs'],
    tips: [
      'Fish at dawn and dusk when bass are most active',
      'A rising tide is the best time for bass',
      'Use slow retrieves in cold water, fast in warm',
      'Fish near structures — rocks, piers, estuary walls'
    ],
    pros: ['Exciting sport', 'No bait needed', 'Active fishing', 'Can catch big bass'],
    cons: ['Steep learning curve', 'Weather dependent', 'Can be frustrating', 'Tiring to cast all day']
  },
  {
    id: 'boat-fishing',
    name: 'Boat / Deep Water Fishing',
    description: 'Fishing from a boat over deep water, wrecks, and reefs. Provides access to species impossible to catch from shore. Heavy tackle and big baits target the biggest fish in the sea.',
    water_type: 'saltwater',
    difficulty: 'intermediate',
    best_for_species: ['conger-eel', 'pollock', 'cod', 'bass', 'smooth-hound', 'dogfish'],
    recommended_baits: ['mackerel-flapper', 'squid', 'peeler-crab', 'fish-strip-bait', 'sandeel-bait'],
    tips: [
      'Use a circle hook for better hook-up rates',
      'Fish near wrecks and reefs where big fish shelter',
      'Chum with chopped mackerel to attract fish',
      'Use a electric reel for very deep water'
    ],
    pros: ['Access to big fish', 'Variety of species', 'Year-round fishing', 'New grounds to explore'],
    cons: ['Expensive', 'Weather dependent', 'Sea sickness risk', 'Needs boat handling skills']
  },
  {
    id: 'squid-jigging',
    name: 'Squid Jigging',
    description: 'Targeting squid using specialised jigs. Squid are caught at night using lights to attract them, then jigged with prawn-shaped lures. Squid are both a bait and a food species.',
    water_type: 'saltwater',
    difficulty: 'intermediate',
    best_for_species: [],
    recommended_baits: [],
    tips: [
      'Fish at night with a bright light to attract squid',
      'Use a slow, lifting jigging action',
      'Squid are most active in autumn and winter',
      'Fresh squid is the best sea bait available'
    ],
    pros: ['Catches premium bait', 'Fun fishing', 'Good eating', 'Year-round potential'],
    cons: ['Seasonal', 'Night fishing only', 'Specialised gear', 'Not always productive']
  },
  {
    id: 'mackerel-angling',
    name: 'Mackerel Angling (Feathers/Rigs)',
    description: 'Catching mackerel using feathered traces, sabiki rigs, and spinners. Mackerel arrive in huge shoals in summer and provide easy, exciting sport. Also the essential method for catching fresh bait.',
    water_type: 'saltwater',
    difficulty: 'beginner',
    best_for_species: ['mackerel'],
    recommended_baits: ['mackerel-feather-bait', 'metal-jigs'],
    tips: [
      'Cast out and retrieve at a steady pace',
      'Mackerel will grab the feathers on the drop',
      'Use silver or holographic feathers for best results',
      'Fish in summer when shoals are near shore'
    ],
    pros: ['Easy for beginners', 'Catches fresh bait', 'Fun sport', 'Cheap gear'],
    cons: ['Seasonal', 'Only catches mackerel', 'Need to be near shoals', 'Can be frenzied']
  },
  {
    id: 'night-fishing',
    name: 'Night Fishing',
    description: 'Fishing after dark when many species are most active. Essential for cod, conger, and big pike. Requires specialist gear including headlamps, bite alarms, and glow sticks.',
    water_type: 'all',
    difficulty: 'intermediate',
    best_for_species: ['cod', 'conger-eel', 'pike', 'eel', 'bass', 'smooth-hound', 'whiting', 'dogfish'],
    recommended_baits: ['lugworm', 'squid', 'mackerel-flapper', 'dead baits (mackerel)', 'peeler-crab', 'whelk'],
    tips: [
      'Use glow sticks on rod tips for bite detection',
      'Keep bait fresh and use strong-smelling options',
      'Fish near light sources where baitfish gather',
      'Always tell someone where you\'re fishing'
    ],
    pros: ['Many species feed at night', 'Less crowded', 'Peaceful', 'Big fish potential'],
    cons: ['Safety concerns', 'Harder to set up', 'Cold and dark', 'Limited visibility']
  },
  {
    id: 'flatfish-fishing',
    name: 'Flatfish Fishing',
    description: 'Specialist tactics for catching plaice, dab, flounder, and other flatfish. Light tackle, small baits, and sensitive rigs are key. Flatfish feed on the bottom so presentation is everything.',
    water_type: 'saltwater',
    difficulty: 'beginner',
    best_for_species: ['plaice', 'dab', 'flounder'],
    recommended_baits: ['ragworm', 'lugworm', 'cockles', 'mussel', 'bloodworm-salt', 'sandeel-strip'],
    tips: [
      'Use light leads and sensitive rigs',
      'Small, fresh baits work best',
      'Fish on a rising tide over sandy ground',
      'A clipped-down rig gives the best distance'
    ],
    pros: ['Great for beginners', 'Year-round fishing', 'Easy to learn', 'Good eating fish'],
    cons: ['Small fish', 'Can be slow', 'Needs patience', 'Bait presentation critical']
  },
];

// Helper functions
export function getTechniquesForFish(fishId: string): Technique[] {
  return TECHNIQUES_DATA.filter(t => t.best_for_species.includes(fishId));
}

export function getTechniquesForBait(baitId: string): Technique[] {
  return TECHNIQUES_DATA.filter(t => t.recommended_baits.includes(baitId));
}

export function getTechniqueById(id: string): Technique | undefined {
  return TECHNIQUES_DATA.find(t => t.id === id);
}
