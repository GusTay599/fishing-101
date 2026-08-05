// UK Fish Species Guide - Comprehensive data for UK fishing
// Each species includes: description, bait, best times, seasons, habitat, identification, image URLs

export interface FishSpecies {
  id: string;
  name: string;
  scientific_name: string;
  water_type: 'freshwater' | 'saltwater' | 'brackish' | 'all';
  category: 'coarse' | 'game' | 'sea' | 'predator';
  description: string;
  bait: string[];
  techniques: string[]; // technique IDs
  best_times: string;
  best_months: number[]; // 1-12
  habitat: string;
  typical_size: string;
  record_size: string;
  identification: string[];
  fun_facts: string[];
  image_urls: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const FISH_SPECIES_DATA: FishSpecies[] = [
  // ===== FRESHWATER / COARSE =====
  {
    id: 'common-carp',
    name: 'Common Carp',
    scientific_name: 'Cyprinus carpio',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'One of the most popular coarse fish in the UK, carp are known for their size, strength, and the challenge they present to anglers. They can live for decades and grow to over 50lbs in the right conditions.',
    bait: ['Boilies', 'Sweetcorn', 'Bread', 'Maggots', 'Worms', 'Pellets', 'Particles (tiger nuts, maples)'],
    techniques: ['specimen-carp-fishing', 'feeder-fishing', 'pellet-waggler', 'pole-fishing', 'float-fishing'],
    best_times: 'Early morning and late evening, especially in summer. Night fishing is very productive.',
    best_months: [4, 5, 6, 7, 8, 9, 10],
    habitat: 'Lakes, ponds, rivers, and reservoirs. Prefer still or slow-moving water with weed beds and features.',
    typical_size: '5-20 lbs',
    record_size: '68 lbs (UK record)',
    identification: [
      'Large, thick body with a humped back',
      'Two barbels on the upper lip',
      'Large scales with a golden-bronze colour',
      'Single dorsal fin with a serrated spine',
      'Forked tail fin',
      'Mouth can protrude downward for feeding on the bottom'
    ],
    fun_facts: [
      'Carp can live for over 20 years',
      'They feed by rooting in the bottom like a vacuum',
      'A carp\'s mouth is perfectly designed for bottom feeding',
      'They can detect bait from over 100 metres away'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Cyprinus_carpio_2008_G1_%28cropped%29.jpg/330px-Cyprinus_carpio_2008_G1_%28cropped%29.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'tench',
    name: 'Tench',
    scientific_name: 'Tinca tinca',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'Known as the "doctor fish" due to the slimy coating on its skin which was once believed to have healing properties. Tench are beautiful olive-green fish that are a prized catch for coarse anglers.',
    bait: ['Sweetcorn', 'Worms', 'Maggots', 'Casters', 'Bread', 'Small boilies', 'Particles'],
    techniques: ['float-fishing', 'feeder-fishing', 'pole-fishing', 'specimen-carp-fishing'],
    best_times: 'Dawn and dusk, especially on warm summer evenings. Overcast days are ideal.',
    best_months: [5, 6, 7, 8, 9],
    habitat: 'Still waters with heavy weed growth. Lakes, ponds, and slow-moving rivers.',
    typical_size: '2-6 lbs',
    record_size: '15 lbs 9 oz (UK record)',
    identification: [
      'Deep, laterally compressed body',
      'Olive-green to bronze colouration',
      'Very small scales covered in thick slime',
      'Red or orange eyes',
      'Small mouth with a slight downward turn',
      'Powerful, broad tail fin'
    ],
    fun_facts: [
      'The slime coat protects tench from infections and parasites',
      'Tench can survive in low-oxygen water better than most fish',
      'They root through weed beds leaving visible trails',
      'Best caught at night during summer months'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Tinca_tinca_Natural_History_Museum_University_of_Pisa.jpg/330px-Tinca_tinca_Natural_History_Museum_University_of_Pisa.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'pike',
    name: 'Northern Pike',
    scientific_name: 'Esox lucius',
    water_type: 'freshwater',
    category: 'predator',
    description: 'The apex predator of UK freshwaters. Pike are ambush hunters with incredible speed and power. They are feared and respected by all who fish for them, providing some of the most thrilling sport available.',
    bait: ['Dead baits (mackerel, sardines, smelt)', 'Lures (spinners, spoons, plugs)', 'Live baits (where legal)', 'Strip baits', 'Jelly baits'],
    techniques: ['predator-lure-fishing', 'leger-fishing', 'night-fishing'],
    best_times: 'Dawn and dusk are prime. Overcast, mild days with a bit of wind are ideal.',
    best_months: [1, 2, 3, 4, 5, 9, 10, 11, 12],
    habitat: 'Lakes, rivers, canals, and reservoirs. Prefer areas with cover like weed beds, overhanging trees, and snags.',
    typical_size: '5-15 lbs',
    record_size: '46 lbs 13 oz (UK record)',
    identification: [
      'Long, torpedo-shaped body',
      'Mottled green/gold with lighter spots',
      'Duck-bill shaped snout with many sharp teeth',
      'Dorsal fin set far back near the tail',
      'Large, powerful tail for explosive strikes',
      'Eyes positioned for binocular vision'
    ],
    fun_facts: [
      'Pike can strike with incredible speed — up to 10mph in a burst',
      'They can eat fish up to half their own body length',
      'Pike have been around for over 60 million years',
      'A single pike can devastate a small pond\'s fish population'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Esox_lucius_ZOO_1.jpg/330px-Esox_lucius_ZOO_1.jpg'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'perch',
    name: 'European Perch',
    scientific_name: 'Perca fluviatilis',
    water_type: 'freshwater',
    category: 'predator',
    description: 'One of the UK\'s most beautiful and widespread fish. Perch are aggressive predators that provide excellent sport on light tackle. Their distinctive stripes and red fins make them instantly recognisable.',
    bait: ['Worms', 'Maggots', 'Small spinners', 'Micro jigs', 'Small dead baits', 'Soft plastic lures'],
    techniques: ['predator-lure-fishing', 'float-fishing', 'leger-fishing'],
    best_times: 'Dawn and dusk, but can be caught throughout the day. Overcast days are best.',
    best_months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Rivers, lakes, ponds, and canals. Often found near structures like bridges, walls, and weed beds.',
    typical_size: '0.5-3 lbs',
    record_size: '6 lbs 6 oz (UK record)',
    identification: [
      'Olive-green body with 5-7 dark vertical bars',
      'Bright red lower fins (pelvic, anal, and caudal)',
      'Two separate dorsal fins — first spiny, second soft',
      'Large mouth extending past the eye',
      'Jagged, rough scales',
      'Stocky, deep body'
    ],
    fun_facts: [
      'Perch school together and hunt in packs',
      'The red fins become more vivid during spawning',
      'They can puff up their gill covers to appear larger',
      'Perch are one of the first fish many UK anglers catch as children'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Barsche_im_See_%28Jungfische%29.jpg/330px-Barsche_im_See_%28Jungfische%29.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'roach',
    name: 'Roach',
    scientific_name: 'Rutilus rutilus',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'One of the most common and widespread fish in the UK. Roach are a classic coarse fish that provide excellent sport on light tackle. They shoal together in large numbers.',
    bait: ['Maggots', 'Casters', 'Worms', 'Sweetcorn', 'Bread', 'Paste', 'Small boilies'],
    techniques: ['pole-fishing', 'float-fishing', 'feeder-fishing', 'trotting'],
    best_times: 'Dawn and dusk. Can be caught throughout the day in winter.',
    best_months: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    habitat: 'Rivers, lakes, ponds, and canals. Prefer clean water with some vegetation.',
    typical_size: '0.5-2 lbs',
    record_size: '4 lbs 4 oz (UK record)',
    identification: [
      'Silver body with a bluish-green back',
      'Red-orange eye and fins',
      'Small, fine scales',
      'Mouth pointing slightly upward',
      'Single dorsal fin and deeply forked tail',
      'Can hybridise with other cyprinids'
    ],
    fun_facts: [
      'Roach are one of the most numerous fish in UK waters',
      'They can hybridise with bream, rudd, and carp',
      'Roach shoals can contain thousands of fish',
      'They are a key food source for pike and perch'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Rutilusrutilus38cm_2143x1060.JPG/330px-Rutilusrutilus38cm_2143x1060.JPG'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'bream',
    name: 'Common Bream',
    scientific_name: 'Abramis brama',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'The king of the stillwater coarse fish. Bream are deep-bodied, bronze-coloured fish that can grow to impressive sizes. They are a favourite target for specimen anglers.',
    bait: ['Sweetcorn', 'Worms', 'Maggots', 'Casters', 'Bread', 'Groundbait', 'Pellets'],
    techniques: ['feeder-fishing', 'float-fishing', 'pole-fishing', 'specimen-carp-fishing'],
    best_times: 'Dawn and dusk. Night fishing can be extremely productive.',
    best_months: [4, 5, 6, 7, 8, 9, 10],
    habitat: 'Still and slow-moving waters. Lakes, reservoirs, and slow rivers with muddy bottoms.',
    typical_size: '3-8 lbs',
    record_size: '22 lbs 9 oz (UK record)',
    identification: [
      'Deep, laterally compressed body',
      'Bronze to golden colouration',
      'Very small head relative to body size',
      'Small mouth that can protrude',
      'Large, deeply forked tail',
      'Long, low anal fin'
    ],
    fun_facts: [
      'Bream can sense feeding fish by detecting water disturbances',
      'They create visible "bream beds" — bare patches on the lake bottom',
      'A shoal of feeding bream creates a bubbling, fizzing display',
      'Bream can live for over 20 years'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Carp_bream1.jpg/330px-Carp_bream1.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'barbel',
    name: 'Barbel',
    scientific_name: 'Barbus barbus',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'The river king. Barbel are the ultimate river fish — powerful, muscular, and found in the fastest currents. They provide arguably the best sport of any UK freshwater fish.',
    bait: ['Worms', 'Boilies', 'Pellets', 'Maggots', 'Sweetcorn', 'Paste', 'Casters'],
    techniques: ['leger-fishing', 'feeder-fishing', 'specimen-carp-fishing', 'trotting'],
    best_times: 'Late afternoon through to dawn. Overcast days with slightly coloured water are perfect.',
    best_months: [4, 5, 6, 7, 8, 9, 10],
    habitat: 'Fast-flowing rivers with gravel or sandy bottoms. Prefer clean, well-oxygenated water.',
    typical_size: '3-8 lbs',
    record_size: '21 lbs 1 oz (UK record)',
    identification: [
      'Elongated, streamlined body built for fast currents',
      'Two pairs of barbels (whiskers) around the mouth',
      'Golden-brown to bronze colouration',
      'Large, powerful tail and pectoral fins',
      'Small eyes relative to head size',
      'Subterminal mouth adapted for bottom feeding'
    ],
    fun_facts: [
      'Barbel get their name from the barbels (whiskers) around their mouth',
      'They can detect food by touch and taste using their barbels',
      'A hooked barbel can make explosive, powerful runs',
      'They are one of the fastest-growing UK freshwater fish'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Barbel.jpg/330px-Barbel.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'chub',
    name: 'Chub',
    scientific_name: 'Squalius cephalus',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'A versatile and widespread river fish. Chub are known for being cautious and providing excellent sport on a variety of methods. They can grow to impressive sizes in southern rivers.',
    bait: ['Bread', 'Worms', 'Cheese paste', 'Maggots', 'Sweetcorn', 'Small boilies', 'Spinners'],
    techniques: ['trotting', 'float-fishing', 'predator-lure-fishing', 'leger-fishing'],
    best_times: 'Dusk and dawn are best, but chub can be caught throughout the day.',
    best_months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Rivers and streams with overhanging trees and cover. Also found in still waters.',
    typical_size: '1-4 lbs',
    record_size: '8 lbs 5 oz (UK record)',
    identification: [
      'Tubular, muscular body',
      'Large, broad head (hence the name)',
      'Large, silvery scales',
      'Mouth extends back to the eye',
      'Grey-green to bronze colouration',
      'Single dorsal fin and large tail'
    ],
    fun_facts: [
      'Chub are notoriously cautious and hard to catch',
      'They are omnivorous — eating insects, fruit, and even mice',
      'Bread is the classic chub bait',
      'Chub patrol under overhanging trees looking for fallen food'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Squalius_cephalus_Prague_Vltava_2.jpg/330px-Squalius_cephalus_Prague_Vltava_2.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'grayling',
    name: 'Grayling',
    scientific_name: 'Thymallus thymallus',
    water_type: 'freshwater',
    category: 'game',
    description: 'The "lady of the stream." Grayling are elegant, beautifully marked fish found in clear, fast-flowing rivers. They are prized by fly anglers, especially as they provide sport during the trout closed season.',
    bait: ['Flies (nymphs, dry flies, spinners)', 'Small spinners', 'Worms', 'Maggots'],
    techniques: ['fly-fishing', 'trotting', 'predator-lure-fishing'],
    best_times: 'Midday to afternoon when insect hatches occur. Overcast days are ideal.',
    best_months: [3, 4, 5, 6, 9, 10, 11, 12],
    habitat: 'Clear, fast-flowing rivers with gravel bottoms. Prefer well-oxygenated water.',
    typical_size: '1-3 lbs',
    record_size: '4 lbs 4 oz (UK record)',
    identification: [
      'Sleek, silver body with a purple-blue sheen',
      'Very large, sail-like dorsal fin',
      'Small mouth with no teeth on the upper jaw',
      'Reddish-orange tinge on the fins',
      'Small adipose fin between dorsal and tail',
      'Tiny scales giving a smooth appearance'
    ],
    fun_facts: [
      'Grayling have a unique ability to swim backwards using their large dorsal fin',
      'They smell of thyme when freshly caught (hence the Latin name thymallus)',
      'Grayling are indicators of clean, well-oxygenated water',
      'They provide excellent sport during winter when trout fishing is closed'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Thymallus_thymallus_P%C3%A9nzes_p%C3%A9r.jpg/330px-Thymallus_thymallus_P%C3%A9nzes_p%C3%A9r.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'brown-trout',
    name: 'Brown Trout',
    scientific_name: 'Salmo trutta',
    water_type: 'freshwater',
    category: 'game',
    description: 'The classic game fish of UK rivers. Brown trout are beautiful, wild fish that provide challenging sport on light tackle. They are native to UK rivers and streams.',
    bait: ['Flies (dry flies, nymphs, wet flies)', 'Spinners', 'Worms', 'Maggots (under strict conditions)'],
    techniques: ['fly-fishing', 'trotting', 'predator-lure-fishing'],
    best_times: 'Dawn and dusk, and during insect hatches. Evening fishing is often best.',
    best_months: [3, 4, 5, 6, 7, 8, 9],
    habitat: 'Clear, cool rivers and streams with gravel bottoms. Also found in some lakes and reservoirs.',
    typical_size: '0.5-3 lbs',
    record_size: '23 lbs 12 oz (UK record)',
    identification: [
      'Brown to golden body with dark and red spots',
      'Spots surrounded by pale halos',
      'Adipose fin present (small fin between dorsal and tail)',
      'Jaw may develop a kype (hook) in spawning males',
      'Tail is slightly forked',
      'Wild fish have sleek, torpedo-shaped bodies'
    ],
    fun_facts: [
      'Brown trout are native to UK rivers and have been here for thousands of years',
      'They can be incredibly selective feeders, refusing anything artificial',
      'Wild brown trout are much harder to catch than stocked fish',
      'Each river\'s trout can look quite different from those in other rivers'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Brown_Trout_%28Salmo_trutta%29_%2853678765394%29.jpg/330px-Brown_Trout_%28Salmo_trutta%29_%2853678765394%29.jpg'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'rainbow-trout',
    name: 'Rainbow Trout',
    scientific_name: 'Oncorhynchus mykiss',
    water_type: 'freshwater',
    category: 'game',
    description: 'Originally from North America, rainbow trout were introduced to UK waters and have become a popular game fish. They are easier to catch than brown trout, making them ideal for beginners.',
    bait: ['Flies', 'Spinners', 'Worms', 'Maggots', 'Sweetcorn', 'Artificial baits'],
    techniques: ['fly-fishing', 'predator-lure-fishing', 'float-fishing', 'feeder-fishing'],
    best_times: 'Throughout the day, but early morning and late afternoon are best.',
    best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    habitat: 'Lakes, reservoirs, and rivers. Stocked fish are found in managed fisheries.',
    typical_size: '1-5 lbs',
    record_size: '34 lbs 10 oz (UK record)',
    identification: [
      'Silver body with a pinkish-red lateral stripe',
      'Dark spots across the body and fins',
      'Adipose fin present',
      'White edge on the lower jaw',
      'Black mouth and gums',
      'More rounded body than wild brown trout'
    ],
    fun_facts: [
      'Rainbow trout are anadromous in their native Pacific — the sea-run form is called steelhead',
      'They were first introduced to UK rivers in the 1880s',
      'Rainbow trout are far more tolerant of warm water than brown trout',
      'They are the most popular stocked game fish in the UK'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Close_up_of_rainbow_trout_fish_underwater_oncorhynchus_mykiss.jpg/330px-Close_up_of_rainbow_trout_fish_underwater_oncorhynchus_mykiss.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'eel',
    name: 'European Eel',
    scientific_name: 'Anguilla anguilla',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'One of the most mysterious fish in the UK. Eels spend years in rivers before making an epic journey to the Sargasso Sea to spawn. They are a declining species and catch-and-release is strongly advised.',
    bait: ['Lobworms', 'Dead baits', 'Lures', 'Maggots', 'Small fish'],
    techniques: ['leger-fishing', 'night-fishing', 'predator-lure-fishing'],
    best_times: 'Night fishing is by far the best. Eels are almost exclusively nocturnal.',
    best_months: [5, 6, 7, 8, 9],
    habitat: 'Rivers, lakes, ponds, and canals. Hide in crevices, under rocks, and in mud during the day.',
    typical_size: '0.5-2 lbs',
    record_size: '9 lbs (approximate, very old eels)',
    identification: [
      'Long, snake-like body with no obvious scales',
      'Brown to olive-green on top, yellow on the belly',
      'Small, round pectoral fins',
      'Continuous dorsal and anal fins joined to the tail',
      'Mouth extends past the eye',
      'Tiny scales embedded in the skin'
    ],
    fun_facts: [
      'Eels can travel overland through wet grass to reach new waters',
      'No one has ever seen European eels spawn in the wild',
      'They can live for over 80 years',
      'Eels are critically endangered and need conservation protection'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Anguilla_anguilla.jpg/330px-Anguilla_anguilla.jpg'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'rudd',
    name: 'Rudd',
    scientific_name: 'Scardinius erythrophthalmus',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'A stunning golden fish often confused with roach. Rudd are less common than roach but can grow larger. They prefer weedy, still waters and are a beautiful sight in the margins.',
    bait: ['Sweetcorn', 'Bread', 'Maggots', 'Casters', 'Worms', 'Particles'],
    techniques: ['pole-fishing', 'float-fishing', 'feeder-fishing'],
    best_times: 'Warm summer afternoons when they feed in the margins. Dawn and dusk are also good.',
    best_months: [5, 6, 7, 8, 9],
    habitat: 'Still waters with heavy weed growth. Ponds, lakes, and slow-moving river backwaters.',
    typical_size: '0.5-3 lbs',
    record_size: '5 lbs 9 oz (UK record)',
    identification: [
      'Golden-bronze colour with a greenish back',
      'Deep, laterally compressed body (deeper than roach)',
      'Bright red fins (especially the dorsal fin)',
      'Dorsal fin set further back than on roach',
      'Upward-pointing mouth',
      'Large scales with a golden sheen'
    ],
    fun_facts: [
      'Rudd can be distinguished from roach by the dorsal fin position',
      'They often feed at the surface, making for exciting sight-fishing',
      'Rudd are one of the most beautiful UK coarse fish',
      'They can hybridise with roach, creating confusing hybrids'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Scardinius_erythropthalmus_2009_G1.jpg/330px-Scardinius_erythropthalmus_2009_G1.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'gudgeon',
    name: 'Gudgeon',
    scientific_name: 'Gobio gobio',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'A small but endearing bottom-feeding fish. Gudgeon are often the first fish children catch. They shoal together and can provide fun, fast-paced sport on light tackle.',
    bait: ['Maggots', 'Casters', 'Worms', 'Small pieces of bread'],
    techniques: ['float-fishing', 'pole-fishing', 'trotting'],
    best_times: 'Throughout the day, but best in the evening.',
    best_months: [4, 5, 6, 7, 8, 9, 10],
    habitat: 'Clean rivers and streams with gravel or sandy bottoms. Also found in some still waters.',
    typical_size: '2-6 oz',
    record_size: '1 lb 1 oz (UK record)',
    identification: [
      'Small, slender body',
      'Brownish with dark blotches along the sides',
      'Two small barbels at the corners of the mouth',
      'Mouth pointing downward',
      'Relatively large eyes',
      'Forked tail fin'
    ],
    fun_facts: [
      'Gudgeon are one of the UK\'s smallest coarse fish',
      'They detect food by touch and taste using their barbels',
      'Gudgeon are an important food source for larger predatory fish',
      'They provide excellent fun for beginners learning to fish'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Riviergrondel.jpg/330px-Riviergrondel.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'dace',
    name: 'Dace',
    scientific_name: 'Leuciscus leuciscus',
    water_type: 'freshwater',
    category: 'coarse',
    description: 'A small, silvery fish of fast-flowing rivers. Dace are elegant fish that shoal in large numbers and provide excellent sport on very light tackle.',
    bait: ['Maggots', 'Casters', 'Worms', 'Bread flake', 'Small spinners'],
    techniques: ['trotting', 'float-fishing', 'predator-lure-fishing'],
    best_times: 'Dawn and dusk. Can be caught throughout the day in winter.',
    best_months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Fast-flowing rivers with clean gravel bottoms.',
    typical_size: '2-6 oz',
    record_size: '1 lb 11 oz (UK record)',
    identification: [
      'Slender, streamlined body',
      'Silver with a greenish back',
      'Small, pointed head',
      'Mouth extending to the eye',
      'Slightly forked tail',
      'Small scales with a bright sheen'
    ],
    fun_facts: [
      'Dace can jump clear of the water when hooked',
      'They are one of the fastest-swimming UK coarse fish',
      'Dace shoals can number in the thousands',
      'They are an indicator of clean, well-oxygenated rivers'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Leuciscus_leuciscus.jpg/330px-Leuciscus_leuciscus.jpg'
    ],
    difficulty: 'beginner'
  },

  // ===== SALTWATER / SEA =====
  {
    id: 'bass',
    name: 'European Sea Bass',
    scientific_name: 'Dicentrarchus labrax',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The premier sport fish of UK sea angling. Bass are powerful, silver predators that patrol the coastlines and estuaries. They are prized for their fighting ability and are excellent eating.',
    bait: ['Sandworms', 'Lugworms', 'Ragworms', 'Mackerel strips', 'Lures (surface plugs, metals)', 'Crab'],
    techniques: ['bass-lure-fishing', 'beach-casting', 'leger-fishing', 'night-fishing', 'pier-fishing'],
    best_times: 'Dawn and dusk, especially on a rising tide. Overcast days with a bit of surf are ideal.',
    best_months: [4, 5, 6, 7, 8, 9, 10],
    habitat: 'Coastal waters, estuaries, beaches, and rock marks. Follow tides in and out of estuaries.',
    typical_size: '2-6 lbs',
    record_size: '18 lbs 12 oz (UK record)',
    identification: [
      'Silver body with a dark grey/blue back',
      'Two separate dorsal fins',
      'Large mouth extending past the eye',
      'Sharp gill cover spines',
      'Broad, powerful tail',
      'Two dark spots on the gill cover'
    ],
    fun_facts: [
      'Bass can detect prey using electroreceptors on their head',
      'They school together and hunt in coordinated groups',
      'Bass can live for over 30 years',
      'They are one of the few UK sea fish that taste truly excellent'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Sealife%2C_Bray%2C_Ireland._%286985874908%29.jpg/330px-Sealife%2C_Bray%2C_Ireland._%286985874908%29.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'cod',
    name: 'Atlantic Cod',
    scientific_name: 'Gadus morhua',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The classic UK sea fish. Cod have been a staple of British fishing for centuries. Though stocks have declined, they can still be caught from shore and boat, especially in winter.',
    bait: ['Worms (lug, rag)', 'Mackerel strips', 'Squid', 'Prawns', 'Crab', 'Fish baits'],
    techniques: ['beach-casting', 'leger-fishing', 'pier-fishing', 'boat-fishing', 'night-fishing'],
    best_times: 'Night fishing is often best, especially in winter. Dawn and dusk also productive.',
    best_months: [1, 2, 3, 10, 11, 12],
    habitat: 'Deep water over rough ground. Found from shore marks and piers, and in deeper water from boats.',
    typical_size: '2-8 lbs',
    record_size: '58 lbs 8 oz (UK record)',
    identification: [
      'Brownish-green with dark spots and a pale lateral line',
      'Three dorsal fins and two anal fins',
      'Barbel on the chin',
      'Large head with a wide mouth',
      'Slightly forked tail',
      'White belly'
    ],
    fun_facts: [
      'Cod were once so abundant they were the backbone of UK fishing industry',
      'A cod can eat fish up to half its own size',
      'They use their chin barbel to detect prey on the sea bed',
      'Cod stocks have declined dramatically since the 1970s'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Atlantic_Cod%2C_Atlantischer_Kabeljau_%28Gadus_morhua%29.jpg/330px-Atlantic_Cod%2C_Atlantischer_Kabeljau_%28Gadus_morhua%29.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'mackerel',
    name: 'Atlantic Mackerel',
    scientific_name: 'Scomber scombrus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The most common and easily caught UK sea fish. Mackerel arrive in huge shoals in summer and provide fantastic sport on light tackle. They are also excellent bait for bigger species.',
    bait: ['Feathered traces', 'Sabiki rigs', 'Spinners', 'Strip baits', 'Whole small fish'],
    techniques: ['mackerel-angling', 'pier-fishing', 'boat-fishing'],
    best_times: 'Can be caught throughout the day when shoals are present. Dawn and dusk are best.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Found all around the UK coast. Shoals move inshore during summer.',
    typical_size: '1-2 lbs',
    record_size: '4 lbs 5 oz (UK record)',
    identification: [
      'Streamlined, torpedo-shaped body',
      'Dark green/blue back with tiger-stripe markings',
      'Silver sides and white belly',
      'Two widely separated dorsal fins',
      'Five small finlets behind the dorsal and anal fins',
      'Forked tail'
    ],
    fun_facts: [
      'Mackerel shoals can stretch for miles',
      'They are one of the fastest UK fish, reaching 45mph',
      'Mackerel are extremely sensitive to light — avoid shadows',
      'They die almost immediately once removed from water'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Scomber_scombrus_217326414.jpg/330px-Scomber_scombrus_217326414.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'plaice',
    name: 'Plaice',
    scientific_name: 'Pleuronectes platessa',
    water_type: 'saltwater',
    category: 'sea',
    description: 'One of the UK\'s most popular flatfish. Plaice are excellent eating and can be caught from shore and boat. They are relatively easy to catch and great for beginners.',
    bait: ['Ragworms', 'Lugworms', 'Mackerel strips', 'Squid', 'Sandeel'],
    techniques: ['flatfish-fishing', 'beach-casting', 'leger-fishing', 'pier-fishing'],
    best_times: 'Tide times matter — fishing an hour either side of high tide is best.',
    best_months: [3, 4, 5, 6, 7, 8, 9, 10],
    habitat: 'Sandy and muddy seabeds from shore and boat. Found in relatively shallow water.',
    typical_size: '1-3 lbs',
    record_size: '14 lbs (UK record)',
    identification: [
      'Flat, diamond-shaped body',
      'Brown upper side with distinctive orange/red spots',
      'White underside',
      'Both eyes on the right side of the head',
      'Small mouth',
      'Rough scales on the upper side'
    ],
    fun_facts: [
      'Plaice can change colour to match the seabed',
      'They are one of the most commercially important UK fish',
      'Plaice can live for over 20 years',
      'They migrate to deeper water in winter to spawn'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Pleuronectes_platessa.jpg/330px-Pleuronectes_platessa.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'dab',
    name: 'Dab',
    scientific_name: 'Limanda limanda',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The most common flatfish in UK waters. Dab are small but provide excellent sport for beginners and are great fun on light tackle. They are also excellent eating when fresh.',
    bait: ['Maggots', 'Worms', 'Mackerel strips', 'Squid', 'Sandeel'],
    techniques: ['flatfish-fishing', 'beach-casting', 'leger-fishing', 'pier-fishing'],
    best_times: 'Through most of the tide, but the last hour of the flood is often best.',
    best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    habitat: 'Sandy and muddy seabeds. Found from beaches, piers, and inshore waters.',
    typical_size: '4-10 oz',
    record_size: '3 lbs 2 oz (UK record)',
    identification: [
      'Small, rounded flatfish',
      'Brown upper side with scattered dark spots',
      'Distinctive curved lateral line',
      'Both eyes on the right side',
      'Slightly smaller than plaice',
      'Smooth scales'
    ],
    fun_facts: [
      'Dab are the most common flatfish in UK waters',
      'They are an excellent fish for beginners to learn flatfish identification',
      'Dab can change colour to match their surroundings',
      'They are a key food source for larger predatory fish'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Limanda_limanda.jpg/330px-Limanda_limanda.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'whiting',
    name: 'Whiting',
    scientific_name: 'Merlangius merlangus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'One of the most common UK sea fish. Whiting are prolific and easy to catch, making them ideal for beginners. While small specimens are common, they can grow to impressive sizes.',
    bait: ['Worms', 'Mackerel strips', 'Squid', 'Sand', 'Small fish baits'],
    techniques: ['beach-casting', 'leger-fishing', 'pier-fishing', 'night-fishing'],
    best_times: 'Night fishing is best, especially in winter. Can be caught throughout the day.',
    best_months: [1, 2, 3, 10, 11, 12],
    habitat: 'Found all around the UK coast over various seabeds. Common from piers, beaches, and rock marks.',
    typical_size: '0.5-2 lbs',
    record_size: '7 lbs 6 oz (UK record)',
    identification: [
      'Elongated body tapering to a thin tail',
      'Brownish-grey with a white lateral line',
      'Three dorsal fins and two anal fins',
      'No barbel on the chin',
      'Large mouth extending past the eye',
      'Slightly forked tail'
    ],
    fun_facts: [
      'Whiting are one of the most prolific UK sea fish',
      'They are related to cod but grow much faster',
      'Large whiting are called "king whiting" by anglers',
      'They are often considered "bait thieves" by cod anglers'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Wijting002.jpg/330px-Wijting002.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'flounder',
    name: 'European Flounder',
    scientific_name: 'Platichthys flesus',
    water_type: 'brackish',
    category: 'sea',
    description: 'A versatile flatfish found in both salt and brackish water. Flounder are one of the few sea fish that can be caught in rivers and estuaries. They are a great species for urban anglers.',
    bait: ['Worms (lug, rag)', 'Mussels', 'Squid', 'Sand', 'Mackerel strips'],
    techniques: ['flatfish-fishing', 'beach-casting', 'leger-fishing', 'pier-fishing'],
    best_times: 'Moving tides are best. The last two hours of the flood and first hour of the ebb.',
    best_months: [4, 5, 6, 7, 8, 9, 10],
    habitat: 'Estuaries, harbours, rivers, and shallow coastal waters. Prefer sandy or muddy bottoms.',
    typical_size: '0.5-2 lbs',
    record_size: '6 lbs 14 oz (UK record)',
    identification: [
      'Flat, oval-shaped body',
      'Brown/green upper side, often with dark blotches',
      'White underside',
      'Both eyes on the left side (unlike plaice)',
      'Rough, bony scales along the lateral line',
      'Small, asymmetrical mouth'
    ],
    fun_facts: [
      'Flounder can tolerate fresh water and have been found far up rivers',
      'They are one of the few sea fish that can be caught in rivers',
      'Flounder can change colour to match the bottom',
      'They are often caught from urban harbours and docks'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Platichthys_flesus_1.jpg/330px-Platichthys_flesus_1.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'smooth-hound',
    name: 'Smooth-hound',
    scientific_name: 'Mustelus mustelus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A small, dog-like shark that provides excellent sport from UK beaches. Smooth-hounds fight incredibly hard and are a favourite target for shore anglers.',
    bait: ['Crab (peeler and hardback)', 'Squid', 'Mackerel', 'Worms'],
    techniques: ['beach-casting', 'leger-fishing', 'night-fishing'],
    best_times: 'Night fishing on an incoming tide is best.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Sandy and muddy seabeds around the UK coast. Found from beaches and in deeper water from boats.',
    typical_size: '5-15 lbs',
    record_size: '30 lbs (UK record)',
    identification: [
      'Sleek, shark-like body',
      'Grey/brown upper side, white underside',
      'No spines on the dorsal fins',
      'Flat, crushing teeth (not sharp like other sharks)',
      'Long, pointed snout',
      'Two large dorsal fins of similar size'
    ],
    fun_facts: [
      'Smooth-hounds are actually small sharks, not dogs',
      'They crush crabs and shellfish with their flat teeth',
      'They fight incredibly hard when hooked',
      'Smooth-hounds are one of the fastest-growing UK shark species'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mustelus_mosis_phuket.jpg/330px-Mustelus_mosis_phuket.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'conger-eel',
    name: 'Conger Eel',
    scientific_name: 'Conger conger',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The largest eel in UK waters. Conger are powerful, nocturnal predators that hide in wrecks and rocky crevices during the day. They provide some of the most exciting sport in UK sea angling.',
    bait: ['Mackerel', 'Squid', 'Large fish baits', 'Live baits'],
    techniques: ['boat-fishing', 'pier-fishing', 'night-fishing', 'leger-fishing'],
    best_times: 'Night fishing is essential. Conger are almost exclusively nocturnal.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Wrecks, rocky reefs, piers, and breakwaters. Hide in crevices during the day.',
    typical_size: '10-30 lbs',
    record_size: '130 lbs (UK record)',
    identification: [
      'Large, snake-like body',
      'Dark grey to black colouration',
      'Large mouth with rows of sharp teeth',
      'Continuous dorsal/anal fin running to the tail',
      'No visible scales',
      'Powerful, muscular body'
    ],
    fun_facts: [
      'Conger can grow to over 2 metres long',
      'They have incredibly powerful jaws',
      'Conger are most active during new moon phases',
      'They can survive for several hours out of water'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/European_conger.jpg/330px-European_conger.jpg'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'dogfish',
    name: 'Lesser Spotted Dogfish',
    scientific_name: 'Scyliorhinus canicula',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The most common shark in UK waters. Dogfish are small, catshark species that provide excellent sport for beginners. They fight surprisingly hard and are easy to catch.',
    bait: ['Mackerel', 'Squid', 'Worms', 'Fish baits', 'Pilchards'],
    techniques: ['beach-casting', 'leger-fishing', 'night-fishing', 'pier-fishing'],
    best_times: 'Night fishing is best, but can be caught during the day.',
    best_months: [4, 5, 6, 7, 8, 9, 10],
    habitat: 'Found all around the UK coast over various seabeds. Common from beaches and rock marks.',
    typical_size: '2-5 lbs',
    record_size: '10 lbs (UK record)',
    identification: [
      'Small, slender shark body',
      'Brown with dark brown spots',
      'Two dorsal fins (second much smaller)',
      'Cat-like eyes with vertical pupils',
      'Barbels near the nostrils',
      'Rough, sandpaper-like skin'
    ],
    fun_facts: [
      'Dogfish are actually small sharks, not dogs',
      'They are one of the most common sharks in the world',
      'Dogfish have been around for over 400 million years',
      'They can be kept in home aquariums (though not recommended)'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Scyliorhinus_canicula.jpg/330px-Scyliorhinus_canicula.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'pollock',
    name: 'Pollock',
    scientific_name: 'Pollachius virens',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A powerful, predatory fish found around rocky coastlines. Pollock are exciting to catch on lures and provide excellent sport from shore and boat.',
    bait: ['Lures (soft plastics, spinners, plugs)', 'Mackerel strips', 'Sandeel', 'Squid'],
    techniques: ['bass-lure-fishing', 'pier-fishing', 'boat-fishing', 'leger-fishing'],
    best_times: 'Dawn and dusk are best. Overcast days with coloured water are ideal.',
    best_months: [4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Rocky coastlines, wrecks, and deep water. Found around cliffs, piers, and reefs.',
    typical_size: '2-8 lbs',
    record_size: '27 lbs 10 oz (UK record)',
    identification: [
      'Elongated, streamlined body',
      'Dark green/brown with a golden lateral line',
      'Large mouth with a projecting lower jaw',
      'Three dorsal fins',
      'Small scales giving a smooth appearance',
      'Powerful, forked tail'
    ],
    fun_facts: [
      'Pollock are one of the best UK fish for lure fishing',
      'They are related to cod but grow faster',
      'Pollock are aggressive predators that chase down prey',
      'They are excellent eating with firm, white flesh'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pollachius_virens_01.jpg/330px-Pollachius_virens_01.jpg'
    ],
    difficulty: 'intermediate'
  },
  // ─── ADDITIONAL UK SEA FISH ─────────────────────────────────
  {
    id: 'thornback-ray',
    name: 'Thornback Ray',
    scientific_name: 'Raja clavata',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The most common ray in UK waters and a favourite shore target. Thornbacks are reliable sport throughout the year, found from beaches, piers, and breakwaters.',
    bait: ['Squid', 'Mackerel', 'Ragworm', 'Lugworm', 'Peeler crab', 'Sand eel'],
    techniques: ['beach-casting', 'pier-fishing', 'boat-fishing', 'leger-fishing'],
    best_times: 'Tide changes are best. Fish the last 2 hours of the flood and first 2 of the ebb.',
    best_months: [4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Sandy and muddy seabeds from shore to 60m depth. Common around estuaries and bays.',
    typical_size: '2-5 lbs',
    record_size: '27 lbs 14 oz (UK record)',
    identification: [
      'Diamond-shaped body with pointed snout',
      'Thorny spines along the back and tail',
      'Brown/grey upper body with dark spots and bars',
      'White underside',
      'Two dorsal fins at the tail base',
      'Thorns form a row along the midline'
    ],
    fun_facts: [
      'Thornbacks are the most abundant ray in British waters',
      'They are named for the thorn-like spines covering their body',
      'A thornback can produce a low electrical discharge',
      'They are excellent eating with firm, white flesh'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Raja_clavata_%28juv%29.jpg/330px-Raja_clavata_%28juv%29.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'spurdog',
    name: 'Spurdog',
    scientific_name: 'Squalus acanthias',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A small, heavily-fished shark species found in large shoals around UK coasts. Spurdogs are feisty fighters on light tackle and provide excellent sport from shore and boat.',
    bait: ['Mackerel', 'Squid', 'Pilchard', 'Sand eel', 'Lugworm'],
    techniques: ['beach-casting', 'pier-fishing', 'boat-fishing', 'leger-fishing'],
    best_times: 'Fishing at dusk and dawn produces the best results. Night fishing is very productive.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Rocky and sandy areas from shore to 400m. They form large shoals and move inshore in summer.',
    typical_size: '2-4 lbs',
    record_size: '19 lbs 7 oz (UK record)',
    identification: [
      'Small, slender shark with a pointed snout',
      'Two dorsal fins each with a spine',
      'Grey/brown upper body, white underneath',
      'No anal fin',
      'Distinctive white-tipped dorsal spines',
      'Large eyes relative to head size'
    ],
    fun_facts: [
      'Spurdogs are one of the few sharks with venomous dorsal spines',
      'They can live for over 70 years',
      'Spurdogs were once the most abundant shark in the North Sea',
      'Handle with extreme care — the spines deliver a painful wound'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Squalus_acanthias_stellwagen.jpg/330px-Squalus_acanthias_stellwagen.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'tope',
    name: 'Tope',
    scientific_name: 'Galeorhinus galeus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A slim, elegant shark that provides some of the best sport available from UK shore fishing. Tope fight hard, make powerful runs, and are a prized catch for beach anglers.',
    bait: ['Mackerel', 'Squid', 'Herring', 'Sand eel', 'Pilchard'],
    techniques: ['beach-casting', 'boat-fishing', 'leger-fishing'],
    best_times: 'Summer evenings and nights are prime. Fish the flood tide.',
    best_months: [6, 7, 8, 9],
    habitat: 'Sandy and rocky seabeds from shore to 400m. Inshore during summer months.',
    typical_size: '5-15 lbs',
    record_size: '46 lbs (UK shore record)',
    identification: [
      'Slim, streamlined body with a pointed snout',
      'Grey/bronze upper body, white underside',
      'Two dorsal fins, no spines',
      'Distinctive white markings on the belly',
      'Long, upper caudal lobe',
      'Large, round eyes'
    ],
    fun_facts: [
      'Tope are one of the fastest sharks in UK waters',
      'They travel in large shoals during summer',
      'Tope can reach speeds of up to 24 mph',
      'They are highly migratory, travelling hundreds of miles'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Galeorhinus_galeus_SI3.jpg/330px-Galeorhinus_galeus_SI3.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'bull-huss',
    name: 'Bull Huss',
    scientific_name: 'Scyliorhinus stellaris',
    water_type: 'saltwater',
    category: 'sea',
    description: 'Also known as the Greater Spotted Dogfish, the Bull Huss is the largest of the cat shark family found around UK coasts. A powerful fighter that provides great sport on light gear.',
    bait: ['Mackerel', 'Squid', 'Crab', 'Lobster', 'Lugworm'],
    techniques: ['boat-fishing', 'pier-fishing', 'leger-fishing'],
    best_times: 'Dusk and night fishing are best. They become more active as light fades.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Rocky reefs, caves, and kelp forests from shore to 100m depth.',
    typical_size: '3-10 lbs',
    record_size: '30 lbs 4 oz (UK record)',
    identification: [
      'Robust body with a broad, flattened head',
      'Brown/grey with large dark spots and blotches',
      'Barbels present on the snout',
      'Two dorsal fins set far back',
      'Large mouth with sharp teeth',
      'Spiracles (breathing holes) behind the eyes'
    ],
    fun_facts: [
      'Bull Huss are also called Nurse Hounds due to their nocturnal habits',
      'They lay large, leathery egg cases called "mermaid purses"',
      'A single Bull Huss can have up to 20 pups',
      'They are ambush predators, lying in wait among rocks'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Katzenhai-01.jpg/330px-Katzenhai-01.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'grey-mullet',
    name: 'Grey Mullet',
    scientific_name: 'Chelon labrosus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A notoriously tricky fish to catch, grey mullet are found in harbours, estuaries, and around structures. Known as the "buck\'s bream" for their elusiveness, they are a prized catch for the patient angler.',
    bait: ['Bread', 'Maggots', 'Corn', 'Worms', 'Mysis shrimp', 'Green crab'],
    techniques: ['float-fishing', 'beach-casting', 'pier-fishing'],
    best_times: 'Calm, warm days with light winds. Early morning and late evening.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Harbours, estuaries, breakwaters, and calm bays. They patrol the surface.',
    typical_size: '2-5 lbs',
    record_size: '10 lbs 6 oz (UK record)',
    identification: [
      'Broad, deep body with a large head',
      'Grey/silver with darker back',
      'Large, thick scales',
      'Small mouth with fleshy lips',
      'Two dorsal fins widely separated',
      'Forked tail fin'
    ],
    fun_facts: [
      'Grey mullet are considered the hardest fish to catch in UK waters',
      'They feed by filtering microscopic organisms from mud',
      'Mullet can jump clear of the water when hooked',
      'They are one of the few saltwater fish that can tolerate fresh water'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Chelon_labrosus.jpg/330px-Chelon_labrosus.jpg'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'red-mullet',
    name: 'Red Mullet',
    scientific_name: 'Mullus surmuletus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A beautiful, bottom-dwelling fish found on sandy and muddy seabeds. Red mullet have distinctive barbels used to sniff out food and are prized for their delicate, fillet-like flesh.',
    bait: ['Lugworm', 'Ragworm', 'Squid', 'Mackerel', 'Peeler crab'],
    techniques: ['beach-casting', 'boat-fishing', 'leger-fishing'],
    best_times: 'Fishing over low water and the first of the flood.',
    best_months: [6, 7, 8, 9, 10],
    habitat: 'Sandy and shingle seabeds from shore to 100m. Often found near weed beds.',
    typical_size: '1-2 lbs',
    record_size: '4 lbs 15 oz (UK record)',
    identification: [
      'Reddish-brown to pink body with two yellow stripes',
      'Barbels hanging from the chin',
      'Large eyes positioned high on the head',
      'Two dorsal fins',
      'Deep, compressed body',
      'Distinctive reddish colour fades quickly after death'
    ],
    fun_facts: [
      'Red mullet use their barbels to taste food on the seabed',
      'They are the only UK fish that changes colour when stressed',
      'Red mullet were a luxury food in ancient Rome',
      'They are most active at dawn and dusk'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mullus_surmuletus%2C_Bouches-du-Rh%C3%B4ne%2C_Provence-Alpes-C%C3%B4te_d%27Azur%2C_FR_imported_from_iNaturalist_photo_277193780_%28cropped%29.jpg/330px-Mullus_surmuletus%2C_Bouches-du-Rh%C3%B4ne%2C_Provence-Alpes-C%C3%B4te_d%27Azur%2C_FR_imported_from_iNaturalist_photo_277193780_%28cropped%29.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'black-bream',
    name: 'Black Bream',
    scientific_name: 'Spondyliosoma cantharus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A prolific, hard-fighting fish found around piers, breakwaters, and rocky areas. Black bream fight hard for their size and are a favourite target for light tackle anglers.',
    bait: ['Ragworm', 'Lugworm', 'Mackerel', 'Squid', 'Peeler crab', 'Lobster'],
    techniques: ['pier-fishing', 'boat-fishing', 'float-fishing'],
    best_times: 'Dawn and dusk. Fish the last hour of the flood.',
    best_months: [5, 6, 7, 8, 9],
    habitat: 'Rocky reefs, piers, breakwaters, and mixed ground from shore to 100m.',
    typical_size: '1-3 lbs',
    record_size: '7 lbs 4 oz (UK record)',
    identification: [
      'Oval, deep body with a steep head profile',
      'Dark grey/silver with blue-black markings',
      'Large, rough scales',
      'Small mouth with strong teeth',
      'Two dorsal fins, the first short and spiny',
      'Purple/blue sheen on the head and back'
    ],
    fun_facts: [
      'Black bream build nests and guard their eggs — unusual for a sea fish',
      'Males turn dark blue-black during spawning season',
      'They are one of the most prolific species around UK piers',
      'Black bream are excellent eating with sweet, white flesh'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Chopa_%28Spondyliosoma_cantharus%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_57.jpg/330px-Chopa_%28Spondyliosoma_cantharus%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_57.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'scad',
    name: 'Scad',
    scientific_name: 'Trachurus trachurus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'Also called Horse Mackerel, scad arrive in UK waters in huge shoals during summer. They provide fast and furious sport on light tackle and are excellent bait for bigger species.',
    bait: ['Small feathers', 'Sabiki rigs', 'Tiny spinners', 'Worms'],
    techniques: ['pier-fishing', 'boat-fishing', 'mackerel-angling'],
    best_times: 'Scad shoal around piers and breakwaters in the evening.',
    best_months: [6, 7, 8, 9, 10],
    habitat: 'Open water and around structures. They follow plankton blooms inshore.',
    typical_size: '0.5-1.5 lbs',
    record_size: '3 lbs 14 oz (UK record)',
    identification: [
      'Streamlined, elongated body',
      'Silvery with a greenish back',
      'Distinctive sharp scutes along the lateral line',
      'Large mouth extending past the eye',
      'Two dorsal fins, the first short and spiny',
      'Forked tail'
    ],
    fun_facts: [
      'Scad are also called "poor man\'s mackerel"',
      'They are excellent bait for cod, bass, and pollock',
      'Scad migrate from the Mediterranean to UK waters each summer',
      'They have a bioluminescent organ on their belly'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Atlantic_Horse_Mackerel.jpg/330px-Atlantic_Horse_Mackerel.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'coalfish',
    name: 'Coalfish',
    scientific_name: 'Pollachius virens',
    water_type: 'saltwater',
    category: 'sea',
    description: 'Often confused with pollock, coalfish are a powerful predator found around rocky coastlines. They fight hard and are frequently caught from piers and breakwaters.',
    bait: ['Lures (spinners, plugs)', 'Sandeel', 'Squid', 'Mackerel strips'],
    techniques: ['pier-fishing', 'boat-fishing', 'bass-lure-fishing'],
    best_times: 'Dawn and dusk. Overcast days are best.',
    best_months: [4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Rocky coastlines, wrecks, and deep water. Found from shore to 200m.',
    typical_size: '2-6 lbs',
    record_size: '19 lbs 1 oz (UK record)',
    identification: [
      'Similar to pollock but with a more uniform dark colour',
      'Dark brown/black with a pale lateral line',
      'Large mouth with strong teeth',
      'Three dorsal fins',
      'Pale patch behind the gill cover',
      'More robust body than pollock'
    ],
    fun_facts: [
      'Coalfish are also called "saithe" in Scotland',
      'They are one of the most abundant fish in UK waters',
      'Coalfish are commercially important for fish and chips',
      'They migrate in large shoals between deep and shallow water'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pollachius_virens_01.jpg/330px-Pollachius_virens_01.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'ballan-wrasse',
    name: 'Ballan Wrasse',
    scientific_name: 'Labrus bergylta',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The largest wrasse species found in UK waters, ballan wrasse are beautifully coloured fish found around rocky reefs and kelp forests. They fight incredibly hard and provide outstanding sport on light tackle.',
    bait: ['Lures (soft plastics, small plugs)', 'Crab', 'Mussel', 'Worms'],
    techniques: ['bass-lure-fishing', 'pier-fishing', 'float-fishing'],
    best_times: 'Calm, warm days. Fish over kelp beds.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Rocky reefs, kelp forests, and boulder fields from shore to 50m.',
    typical_size: '2-5 lbs',
    record_size: '9 lbs 1 oz (UK record)',
    identification: [
      'Large, deep body with a thick, powerful tail',
      'Highly variable colouring — green, red, orange, brown, or mottled',
      'Large scales and thick lips',
      'Single, long dorsal fin',
      'Pharyngeal teeth for crushing shellfish',
      'Males develop a blue spot on the gill cover during breeding'
    ],
    fun_facts: [
      'Ballan wrasse can change sex from female to male',
      'They use their powerful teeth to crush crabs and sea urchins',
      'Wrasse are sometimes called "Old Wives"',
      'They are excellent eating but increasingly released by conservation-minded anglers'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Maragota_%28Labrus_bergylta%29%2C_isla_de_Mouro%2C_Santander%2C_Espa%C3%B1a%2C_2019-08-15%2C_DD_55.jpg/330px-Maragota_%28Labrus_bergylta%29%2C_isla_de_Mouro%2C_Santander%2C_Espa%C3%B1a%2C_2019-08-15%2C_DD_55.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'corkwing-wrasse',
    name: 'Corkwing Wrasse',
    scientific_name: 'Symphodus melops',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A small but beautifully marked wrasse found around rocky shores and kelp. Corkwings are a favourite for light tackle and fly fishing, providing surprising fight for their size.',
    bait: ['Small worms', 'Maggots', 'Tiny lures', 'Flies'],
    techniques: ['float-fishing', 'bass-lure-fishing'],
    best_times: 'Warm, calm days over kelp and weed beds.',
    best_months: [4, 5, 6, 7, 8, 9],
    habitat: 'Rocky shores, kelp forests, and harbour walls from shore to 30m.',
    typical_size: '0.5-1.5 lbs',
    record_size: '3 lbs 3 oz (UK record)',
    identification: [
      'Small, oval body with a blunt head',
      'Green/brown with dark markings and a blue streak on the gill',
      'Dark spot on the tail base',
      'Small mouth with thick lips',
      'Males develop bright green and orange breeding colours',
      'Juveniles have a distinctive dark spot behind the eye'
    ],
    fun_facts: [
      'Male corkwings build nests from seaweed and guard the eggs',
      'They are one of the most colourful UK fish',
      'Corkwings are popular with fly fishermen',
      'They are an indicator species for marine conservation'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Porredana_%28Symphodus_melops%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_23.jpg/330px-Porredana_%28Symphodus_melops%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_23.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'pouting',
    name: 'Pouting',
    scientific_name: 'Trisopterus luscus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'Also known as Bib, pouting are one of the most common fish around UK piers and breakwaters. They school in large numbers and provide easy sport for beginners.',
    bait: ['Worms', 'Mackerel', 'Squid', 'Lugworm'],
    techniques: ['pier-fishing', 'beach-casting', 'boat-fishing'],
    best_times: 'Pouting shoal around structures at dusk and during the night.',
    best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    habitat: 'Piers, breakwaters, wrecks, and mixed ground from shore to 200m.',
    typical_size: '0.5-2 lbs',
    record_size: '5 lbs 6 oz (UK record)',
    identification: [
      'Oval body with a steep head profile',
      'Coppery-brown with a dark lateral line',
      'Three dorsal fins, the second much longer',
      'Barbel on the chin',
      'Large mouth',
      'Bronze/gold sheen on the body'
    ],
    fun_facts: [
      'Pouting are also called "Bib" in northern England',
      'They are one of the most abundant fish in the North Sea',
      'Pouting are excellent bait for cod and bass',
      'They are related to cod but grow much smaller'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Faneca_%28Trisopterus_luscus%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2022-07-29%2C_DD_43.jpg/330px-Faneca_%28Trisopterus_luscus%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2022-07-29%2C_DD_43.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'ling',
    name: 'Ling',
    scientific_name: 'Molva molva',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A powerful, elongated member of the cod family found in deeper waters. Ling are prized by boat anglers for their size and fighting ability, and they provide excellent table fare.',
    bait: ['Squid', 'Mackerel', 'Sand eel', 'Lugworm', 'Ragworm'],
    techniques: ['boat-fishing', 'leger-fishing'],
    best_times: 'Dawn and dusk. Fish over wrecks and rough ground.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Deep water, wrecks, and rough ground from 30m to 400m.',
    typical_size: '5-15 lbs',
    record_size: '53 lbs 12 oz (UK record)',
    identification: [
      'Long, slender body with a pointed head',
      'Brown/grey with lighter speckling',
      'Single long dorsal fin',
      'Barbel on the chin',
      'Large mouth with powerful teeth',
      'Can be distinguished from cod by the longer, more elongated body'
    ],
    fun_facts: [
      'Ling are one of the largest cod family members in UK waters',
      'They can grow over 6 feet long',
      'Ling are ambush predators that hide in wrecks',
      'They are one of the best-eating sea fish'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Molva_molva_dis.png/330px-Molva_molva_dis.png'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'haddock',
    name: 'Haddock',
    scientific_name: 'Melanogrammus aeglefinus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'One of the most important commercial fish in the UK, haddock are a popular target for boat anglers in northern waters. They provide good sport and are excellent eating.',
    bait: ['Lugworm', 'Ragworm', 'Mackerel', 'Squid', 'Sand eel'],
    techniques: ['boat-fishing', 'beach-casting', 'leger-fishing'],
    best_times: 'Early morning and late evening. Fish over sand and gravel.',
    best_months: [4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Sandy and muddy seabeds from 30m to 200m. More common in northern waters.',
    typical_size: '2-5 lbs',
    record_size: '15 lbs 11 oz (UK record)',
    identification: [
      'Silver-grey body with a dark lateral line',
      'Distinctive dark "thumbprint" mark behind the pectoral fin',
      'Three dorsal fins',
      'Small barbel on the chin',
      'Lower jaw slightly longer than upper',
      'Dark back fading to silver sides'
    ],
    fun_facts: [
      'Haddock are the fish used in the Scottish national dish "Cullen Skink"',
      'The "thumbprint" mark is said to be the fingerprint of St Peter',
      'Haddock are one of the most sustainable fish stocks in UK waters',
      'They school in large numbers over sandy seabeds'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Haddock%2C_Boston_Aquarium.JPG/330px-Haddock%2C_Boston_Aquarium.JPG'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'lemon-sole',
    name: 'Lemon Sole',
    scientific_name: 'Microstomus kitt',
    water_type: 'saltwater',
    category: 'sea',
    description: 'Despite the name, lemon sole are not true sole — they are a right-eyed flatfish. Prized for their delicate flavour, they are found on sandy and muddy seabeds around the UK.',
    bait: ['Lugworm', 'Ragworm', 'Squid', 'Mackerel', 'Sand eel'],
    techniques: ['boat-fishing', 'beach-casting', 'leger-fishing'],
    best_times: 'Fishing over low water and the first of the flood on calm days.',
    best_months: [4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Sandy and muddy seabeds from 20m to 200m. Found in deeper water than most flatfish.',
    typical_size: '1-3 lbs',
    record_size: '8 lbs 6 oz (UK record)',
    identification: [
      'Small, oval-shaped flatfish',
      'Brown/pinkish body with darker spots and blotches',
      'Small mouth',
      'Smooth, slimy skin',
      'Both eyes on the right side',
      'Distinctive lemon-yellow tinge to the underside'
    ],
    fun_facts: [
      'Lemon sole are not true sole — they belong to the plaice family',
      'They are one of the most highly regarded eating fish',
      'Lemon sole are found in deeper water than most flatfish',
      'They are also called "petra sole" in some regions'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Microstomus_kitt_1.jpg/330px-Microstomus_kitt_1.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'megrim-sole',
    name: 'Megrim Sole',
    scientific_name: 'Lepidorhombus whiffiagonis',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A deep-water flatfish found on sandy and muddy seabeds. Megrim sole are increasingly caught by boat anglers and are now recognised as excellent eating.',
    bait: ['Squid', 'Mackerel', 'Sand eel', 'Lugworm'],
    techniques: ['boat-fishing', 'leger-fishing'],
    best_times: 'Daytime fishing over sand and mud in deeper water.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Sandy and muddy seabeds from 50m to 400m. More common in western waters.',
    typical_size: '1-3 lbs',
    record_size: '5 lbs 6 oz (UK record)',
    identification: [
      'Elongated flatfish with a pointed head',
      'Pale brown with dark spots',
      'Large eyes',
      'Both eyes on the left side',
      'Distinctive curved lateral line',
      'Very thin, delicate body'
    ],
    fun_facts: [
      'Megrim sole were once discarded as bycatch but are now highly valued',
      'They are one of the most abundant flatfish in deep UK waters',
      'Megrim sole are related to turbot and brill',
      'They provide surprising sport on light boat tackle'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Lepidorhombus_whiffiagonis_4G.jpg/330px-Lepidorhombus_whiffiagonis_4G.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'turbot',
    name: 'Turbot',
    scientific_name: 'Scophthalmus maximus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'One of the most prized flatfish in UK waters, turbot are found on sandy and gravel seabeds. They provide excellent sport and are considered one of the finest eating fish.',
    bait: ['Mackerel', 'Squid', 'Sand eel', 'Peeler crab', 'Ragworm'],
    techniques: ['boat-fishing', 'beach-casting', 'leger-fishing'],
    best_times: 'Fishing at dawn and dusk over sand and gravel.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Sandy, gravel, and mixed seabeds from 10m to 80m.',
    typical_size: '3-8 lbs',
    record_size: '30 lbs 6 oz (UK record)',
    identification: [
      'Diamond-shaped body with bony tubercles',
      'Brown with darker spots and blotches',
      'Both eyes on the left side',
      'Very wide, flat body',
      'Large mouth with sharp teeth',
      'Distinctive rough, warty skin texture'
    ],
    fun_facts: [
      'Turbot are considered the king of flatfish',
      'They are ambush predators that bury themselves in sand',
      'A large turbot can be worth hundreds of pounds in restaurants',
      'Turbot spawn in winter and the larvae are carried by currents'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Psetta_maxima_Luc_Viatour.jpg/330px-Psetta_maxima_Luc_Viatour.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'brill',
    name: 'Brill',
    scientific_name: 'Scophthalmus rhombus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A close relative of turbot but with smoother skin, brill are found on sandy and muddy seabeds. They are excellent sport and highly regarded as table fish.',
    bait: ['Mackerel', 'Squid', 'Sand eel', 'Lugworm', 'Ragworm'],
    techniques: ['boat-fishing', 'beach-casting', 'leger-fishing'],
    best_times: 'Dawn and dusk over sand and mixed ground.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Sandy and muddy seabeds from 10m to 100m.',
    typical_size: '2-6 lbs',
    record_size: '15 lbs 4 oz (UK record)',
    identification: [
      'Oval-shaped flatfish with smooth skin',
      'Brown/grey with dark spots',
      'Both eyes on the left side',
      'Smoother skin than turbot (no bony tubercles)',
      'Large mouth',
      'Distinctive rounded body shape'
    ],
    fun_facts: [
      'Brill are often confused with turbot but have smoother skin',
      'They are excellent eating with delicate, sweet flesh',
      'Brill are found on lighter ground than turbot',
      'They provide surprising sport on light boat tackle'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Scophthalmus_rhombus.jpg/330px-Scophthalmus_rhombus.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'dover-sole',
    name: 'Dover Sole',
    scientific_name: 'Solea solea',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The most prized flatfish in UK waters, Dover sole are found on sandy and muddy seabeds. They fight surprisingly hard and are considered the finest eating of all UK flatfish.',
    bait: ['Lugworm', 'Ragworm', 'Squid', 'Sand eel', 'Mackerel'],
    techniques: ['boat-fishing', 'beach-casting', 'leger-fishing'],
    best_times: 'Fishing over low water and the first of the flood.',
    best_months: [4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Sandy and muddy seabeds from 10m to 150m.',
    typical_size: '2-5 lbs',
    record_size: '14 lbs 6 oz (UK record)',
    identification: [
      'Elongated oval body with a rounded snout',
      'Brown/grey with darker blotches',
      'Both eyes on the right side',
      'Small mouth',
      'Smooth, slimy skin',
      'Distinctive dark spot at the pectoral fin base'
    ],
    fun_facts: [
      'Dover sole are so named because they were landed at Dover market',
      'They can "walk" on the seabed using their pectoral fins',
      'A large Dover sole can be worth over £50 in restaurants',
      'They are one of the longest-lived flatfish, reaching 50+ years'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Solea_solea_1.jpg/330px-Solea_solea_1.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'monkfish',
    name: 'Monkfish',
    scientific_name: 'Lophius piscatorius',
    water_type: 'saltwater',
    category: 'sea',
    description: 'Also known as Anglerfish, monkfish are ambush predators found on the seabed. They provide excellent sport from boat and are prized in restaurants for their firm, lobster-like tail meat.',
    bait: ['Mackerel', 'Squid', 'Sand eel', 'Whole fish', 'Lobster'],
    techniques: ['boat-fishing', 'leger-fishing'],
    best_times: 'Daytime fishing over sand and mud.',
    best_months: [4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Sandy and muddy seabeds from 20m to 600m. Found in deeper water.',
    typical_size: '5-20 lbs',
    record_size: '135 lbs (UK record)',
    identification: [
      'Enormous, flattened head with a huge mouth',
      'Brown/mottled body with fleshy appendages',
      'Modified dorsal spine as a lure ("fishing rod")',
      'Tiny eyes relative to head size',
      'Powerful, sharp teeth',
      'Tadpole-like body shape'
    ],
    fun_facts: [
      'Monkfish tails are sold as "poor man\'s lobster"',
      'They lure prey using a bioluminescent appendage on their head',
      'A monkfish can swallow a fish twice its own size',
      'They are ambush predators that lie buried in sand'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lophius_piscatorius_in_situ_off_of_northern_Ireland.jpg/330px-Lophius_piscatorius_in_situ_off_of_northern_Ireland.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'john-dory',
    name: 'John Dory',
    scientific_name: 'Zeus faber',
    water_type: 'saltwater',
    category: 'sea',
    description: 'An unmistakable fish with a distinctive dark spot on each side. John Dory are found around wrecks and rocky areas and are excellent eating with delicate, white flesh.',
    bait: ['Squid', 'Sand eel', 'Small fish', 'Lures'],
    techniques: ['boat-fishing', 'pier-fishing'],
    best_times: 'Daytime fishing over wrecks and reefs.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Wrecks, reefs, and rocky areas from 20m to 200m.',
    typical_size: '1-4 lbs',
    record_size: '8 lbs 11 oz (UK record)',
    identification: [
      'Very tall, compressed body with a protruding forehead',
      'Silvery/olive body with a distinctive dark "thumbprint" on each side',
      'Long dorsal fin filaments',
      'Small mouth that can extend forward',
      'Large, plate-like scales',
      'Unmistakable profile — looks like no other fish'
    ],
    fun_facts: [
      'The dark spot is said to be the mark of St Peter\'s thumb',
      'John Dory can rapidly change colour',
      'They use their extendable mouth to create suction and engulf prey',
      'They are one of the most expensive fish in restaurants'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Zeus.faber.jpg/330px-Zeus.faber.jpg'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'weever-fish',
    name: 'Weever Fish',
    scientific_name: 'Trachinus draco',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A small but venomous fish that buries itself in sand. While painful to step on, weevers provide surprisingly good sport on light tackle and are excellent eating when the spines are removed.',
    bait: ['Ragworm', 'Lugworm', 'Mackerel strip', 'Squid'],
    techniques: ['beach-casting', 'pier-fishing'],
    best_times: 'Summer months. Fish over sandy beaches.',
    best_months: [6, 7, 8, 9],
    habitat: 'Sandy beaches and estuaries. Buries itself in the sand.',
    typical_size: '0.5-2 lbs',
    record_size: '4 lbs 2 oz (UK record)',
    identification: [
      'Elongated body with a steep, venomous head',
      'Brown/yellow with darker mottling',
      'Venomous spines on the gill covers and dorsal fin',
      'Large mouth with sharp teeth',
      'Small eyes positioned high on the head',
      'Often buried in sand with only eyes visible'
    ],
    fun_facts: [
      'Weever stings are extremely painful — the venom is heat-sensitive',
      'The best treatment is to immerse the sting in hot water',
      'Weevers are ambush predators that lie buried in sand',
      'Despite their reputation, they are excellent eating'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Trachinus_draco_2.jpeg/330px-Trachinus_draco_2.jpeg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'porbeagle-shark',
    name: 'Porbeagle Shark',
    scientific_name: 'Lamna nasus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A powerful, stocky shark found in UK waters. Porbeagles are one of the fastest and strongest fish in the sea, providing an unforgettable fight for boat anglers.',
    bait: ['Mackerel', 'Squid', 'Herring', 'Pilchard'],
    techniques: ['boat-fishing'],
    best_times: 'Summer months. Fish over deep water and headlands.',
    best_months: [5, 6, 7, 8, 9],
    habitat: 'Deep water and open ocean from 30m to 400m. Occasionally close to shore.',
    typical_size: '20-60 lbs',
    record_size: '253 lbs (UK record)',
    identification: [
      'Stocky, torpedo-shaped body',
      'Grey/silver with a white belly',
      'Conical snout',
      'Large, black eyes',
      'Strong, keeled tail',
      'Distinctive white patch on the second dorsal fin'
    ],
    fun_facts: [
      'Porbeagles are related to the great white shark',
      'They can maintain their body temperature above the surrounding water',
      'Porbeagles are one of the fastest sharks in UK waters',
      'They are endangered and should be carefully released'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Lamna_nasus_noaa.jpg/330px-Lamna_nasus_noaa.jpg'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'blue-shark',
    name: 'Blue Shark',
    scientific_name: 'Prionace glauca',
    water_type: 'saltwater',
    category: 'sea',
    description: 'An elegant, deep-water shark with a distinctive indigo blue colour. Blue sharks visit UK waters in summer and provide incredible sport on light tackle.',
    bait: ['Mackerel', 'Squid', 'Pilchard', 'Herring'],
    techniques: ['boat-fishing'],
    best_times: 'Late summer. Fish in deep water with chum.',
    best_months: [7, 8, 9],
    habitat: 'Deep, open water from 200m to 400m. Occasionally close to shore in summer.',
    typical_size: '20-60 lbs',
    record_size: '228 lbs (UK record)',
    identification: [
      'Slender, torpedo-shaped body',
      'Distinctive indigo blue on top, white underneath',
      'Long, pointed pectoral fins',
      'Conical snout',
      'Large, round eyes',
      'First dorsal fin set well behind the pectoral fins'
    ],
    fun_facts: [
      'Blue sharks are the most abundant pelagic shark in the world',
      'They can travel thousands of miles during migration',
      'Blue sharks have been recorded diving to over 3,500m',
      'They are found in every ocean except the Arctic'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg/330px-Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'stingray',
    name: 'Stingray',
    scientific_name: 'Dasyatis pastinaca',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A flat, diamond-shaped ray found on sandy and muddy seabeds. Stingrays provide surprising sport and should be handled carefully due to the venomous tail spine.',
    bait: ['Lugworm', 'Ragworm', 'Mackerel', 'Squid', 'Peeler crab'],
    techniques: ['beach-casting', 'boat-fishing', 'pier-fishing'],
    best_times: 'Summer months. Fish the last of the flood.',
    best_months: [6, 7, 8, 9],
    habitat: 'Sandy and muddy seabeds from shore to 60m.',
    typical_size: '5-15 lbs',
    record_size: '50 lbs 6 oz (UK record)',
    identification: [
      'Flat, diamond-shaped body',
      'Brown/grey upper body, white underneath',
      'Venomous barbed spine on the tail',
      'Whip-like tail, longer than the body width',
      'No dorsal or caudal fins',
      'Eyes on top of the head with spiracles behind'
    ],
    fun_facts: [
      'Stingray stings are extremely painful — the venom is heat-sensitive',
      'They bury themselves in sand with only their eyes visible',
      'A stingray can deliver a sting that requires hospital treatment',
      'They are surprisingly powerful fighters when hooked'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Black_sea_fauna_stingray_01.jpg/330px-Black_sea_fauna_stingray_01.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'undulate-ray',
    name: 'Undulate Ray',
    scientific_name: 'Raja undulata',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A beautiful, endangered ray with distinctive dark wavy markings. Undulate rays are found on sandy seabeds and are increasingly rare — catch and release is strongly recommended.',
    bait: ['Squid', 'Mackerel', 'Ragworm', 'Lugworm'],
    techniques: ['boat-fishing', 'beach-casting'],
    best_times: 'Summer months over sand and mixed ground.',
    best_months: [5, 6, 7, 8, 9],
    habitat: 'Sandy and muddy seabeds from 10m to 150m.',
    typical_size: '2-5 lbs',
    record_size: '13 lbs 6 oz (UK record)',
    identification: [
      'Diamond-shaped body with a pointed snout',
      'Sandy/brown with distinctive dark, wavy lines',
      'Row of thorns along the tail',
      'White underside',
      'Small eyes',
      'Distinctive undulating (wavy) dark markings'
    ],
    fun_facts: [
      'Undulate rays are endangered and should always be released',
      'They are one of the most beautiful rays in UK waters',
      'Their wavy markings are unique to each individual',
      'They are protected under UK and EU conservation law'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Raya_mosaico_%28Raja_undulata%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_92-93_PAN.jpg/330px-Raya_mosaico_%28Raja_undulata%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_92-93_PAN.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'cuckoo-ray',
    name: 'Cuckoo Ray',
    scientific_name: 'Rostroraja alba',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A medium-sized ray with distinctive dark spots and a pointed snout. Cuckoo rays are found on sandy seabeds and provide good sport from boat and shore.',
    bait: ['Squid', 'Mackerel', 'Ragworm', 'Lugworm', 'Sand eel'],
    techniques: ['boat-fishing', 'beach-casting'],
    best_times: 'Summer months over sand and gravel.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Sandy and gravel seabeds from 10m to 200m.',
    typical_size: '2-5 lbs',
    record_size: '11 lbs 14 oz (UK record)',
    identification: [
      'Diamond-shaped body with a pointed snout',
      'Sandy/brown with large, dark spots',
      'Row of thorns along the tail and back',
      'White underside',
      'Distinctive spotted pattern',
      'Medium-sized eyes'
    ],
    fun_facts: [
      'Cuckoo rays are named for their call-like sound when caught',
      'They are found in deeper water than most shore rays',
      'Cuckoo rays are one of the more common rays in UK waters',
      'They provide excellent sport on light boat tackle'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/FMIB_50423_White_Ray_%28Raia_betis%29.jpeg/330px-FMIB_50423_White_Ray_%28Raia_betis%29.jpeg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'small-eyed-ray',
    name: 'Small-eyed Ray',
    scientific_name: 'Raja microocellata',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A medium-sized ray with distinctive small eyes and a mottled pattern. Small-eyed rays are found on sandy seabeds and are a common catch from UK beaches.',
    bait: ['Squid', 'Mackerel', 'Ragworm', 'Lugworm'],
    techniques: ['beach-casting', 'boat-fishing', 'pier-fishing'],
    best_times: 'Summer months. Fish the flood tide.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Sandy and muddy seabeds from shore to 80m.',
    typical_size: '2-5 lbs',
    record_size: '10 lbs 8 oz (UK record)',
    identification: [
      'Diamond-shaped body',
      'Sandy/brown with lighter spots and mottling',
      'Distinctively small eyes',
      'Row of thorns along the tail',
      'White underside',
      'Medium-sized body'
    ],
    fun_facts: [
      'Small-eyed rays are one of the most common rays caught from UK beaches',
      'They have the smallest eyes relative to body size of any UK ray',
      'Small-eyed rays are excellent eating',
      'They are most active during the summer months'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ecomare_-_kleinoogroog_in_zeeaquarium_%28kleinoogrog-zeeaquarium-00-sd%29.jpg/330px-Ecomare_-_kleinoogroog_in_zeeaquarium_%28kleinoogrog-zeeaquarium-00-sd%29.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'spotted-ray',
    name: 'Spotted Ray',
    scientific_name: 'Raja montagui',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A small ray with distinctive dark spots. Spotted rays are common around UK coasts and provide good sport on light tackle from beaches and piers.',
    bait: ['Lugworm', 'Ragworm', 'Squid', 'Mackerel'],
    techniques: ['beach-casting', 'pier-fishing', 'boat-fishing'],
    best_times: 'Summer months. Fish the flood tide.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Sandy and muddy seabeds from shore to 100m.',
    typical_size: '1-3 lbs',
    record_size: '6 lbs 8 oz (UK record)',
    identification: [
      'Small, diamond-shaped body',
      'Sandy/brown with distinctive dark spots',
      'Small eyes',
      'Row of thorns along the tail',
      'White underside',
      'Distinctive spotted pattern covering the back'
    ],
    fun_facts: [
      'Spotted rays are the smallest common ray in UK waters',
      'They are named for the distinctive spots covering their body',
      'Spotted rays are one of the easiest rays to catch',
      'They are excellent eating with sweet, white flesh'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Raja_montagui2.jpg/330px-Raja_montagui2.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'halibut',
    name: 'Halibut',
    scientific_name: 'Hippoglossus hippoglossus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'The largest flatfish in UK waters, halibut are prized by boat anglers for their size and fighting ability. They provide incredible sport and are among the finest eating fish.',
    bait: ['Mackerel', 'Squid', 'Sand eel', 'Live bait', 'Lures'],
    techniques: ['boat-fishing'],
    best_times: 'Daytime over deep water and wrecks.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Sandy, gravel, and rocky seabeds from 50m to 200m.',
    typical_size: '10-50 lbs',
    record_size: '233 lbs 8 oz (UK shore record)',
    identification: [
      'Very large, diamond-shaped flatfish',
      'Dark brown/green with lighter patches',
      'Both eyes on the right side',
      'Powerful tail for fast swimming',
      'Large mouth with sharp teeth',
      'Smooth scales'
    ],
    fun_facts: [
      'Halibut can live over 50 years and grow over 8 feet long',
      'They are endangered and should be carefully released',
      'A single halibut can weigh over 300 lbs',
      'Halibut are one of the most commercially valuable fish in the North Atlantic'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Hippoglossus_hippoglossus_196509307.jpg/330px-Hippoglossus_hippoglossus_196509307.jpg'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'witch-sole',
    name: 'Witch Sole',
    scientific_name: 'Glyptocephalus cynoglossus',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A right-eyed flatfish found on muddy seabeds in deeper water. Witch sole are delicate, elongated fish prized for their excellent flavour.',
    bait: ['Lugworm', 'Ragworm', 'Squid', 'Sand eel'],
    techniques: ['boat-fishing'],
    best_times: 'Daytime over mud in deeper water.',
    best_months: [5, 6, 7, 8, 9, 10],
    habitat: 'Muddy seabeds from 50m to 300m.',
    typical_size: '1-3 lbs',
    record_size: '4 lbs 2 oz (UK record)',
    identification: [
      'Elongated, oval-shaped flatfish',
      'Brown with darker spots',
      'Both eyes on the right side',
      'Very small mouth',
      'Smooth, thin body',
      'Distinctive curved lateral line'
    ],
    fun_facts: [
      'Witch sole are also called "witch" or "witch flounder"',
      'They are one of the most delicate-tasting flatfish',
      'Witch sole are found in deeper water than most flatfish',
      'They are increasingly rare and should be released'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Glyptocephalus_cynoglossus_2.jpg/330px-Glyptocephalus_cynoglossus_2.jpg'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'rockling',
    name: 'Rockling',
    scientific_name: 'Ciliata mustela',
    water_type: 'saltwater',
    category: 'sea',
    description: 'A small, eel-like fish found in rock pools and around rocky shores. Rocklings are common but rarely targeted, providing sport on very light tackle.',
    bait: ['Tiny worms', 'Maggots', 'Small pieces of fish'],
    techniques: ['float-fishing', 'pier-fishing'],
    best_times: 'Night fishing around rock pools and harbour walls.',
    best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    habitat: 'Rock pools, harbour walls, and rocky shores.',
    typical_size: '0.25-1 lb',
    record_size: '1 lb 10 oz (UK record)',
    identification: [
      'Long, eel-like body',
      'Brown/grey with darker mottling',
      'Barbel on the chin',
      'Small dorsal fin',
      'Pointed tail',
      'Often found hiding in crevices'
    ],
    fun_facts: [
      'Rocklings are the most common fish in UK rock pools',
      'They have a distinctive barbel on the chin',
      'Rocklings can survive out of water for short periods',
      'They are nocturnal and hide during the day'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Ciliata_mustela_motelle_%C3%A0_cinq_barbillons_juv%C3%A9niles_Wimereux_7_juillet_2016_F_Lamiot_02.jpg/330px-Ciliata_mustela_motelle_%C3%A0_cinq_barbillons_juv%C3%A9niles_Wimereux_7_juillet_2016_F_Lamiot_02.jpg'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'saithe',
    name: 'Saithe',
    scientific_name: 'Pollachius virens',
    water_type: 'saltwater',
    category: 'sea',
    description: 'Also known as coalfish in Scotland, saithe are powerful, schooling fish found around rocky coastlines. They provide excellent sport on lures and are commercially important.',
    bait: ['Lures (spinners, plugs, jigs)', 'Sandeel', 'Squid', 'Mackerel'],
    techniques: ['bass-lure-fishing', 'pier-fishing', 'boat-fishing'],
    best_times: 'Dawn and dusk. Overcast days are best.',
    best_months: [4, 5, 6, 7, 8, 9, 10, 11],
    habitat: 'Rocky coastlines, wrecks, and open water from shore to 200m.',
    typical_size: '2-8 lbs',
    record_size: '19 lbs 1 oz (UK record)',
    identification: [
      'Streamlined body similar to cod',
      'Dark brown/black with a pale lateral line',
      'Single long dorsal fin',
      'Forked tail',
      'Small barbel on the chin',
      'Three dorsal fins'
    ],
    fun_facts: [
      'Saithe are called "coalfish" in England but "saithe" in Scotland',
      'They are one of the most commercially important fish in the North Atlantic',
      'Saithe travel in massive shoals',
      'They are excellent on light lure tackle'
    ],
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pollachius_virens_01.jpg/330px-Pollachius_virens_01.jpg'
    ],
    difficulty: 'beginner'
  }
];

// Helper functions for searching and filtering
export function searchFish(query: string): FishSpecies[] {
  const lower = query.toLowerCase();
  return FISH_SPECIES_DATA.filter(fish => 
    fish.name.toLowerCase().includes(lower) ||
    fish.scientific_name.toLowerCase().includes(lower) ||
    fish.description.toLowerCase().includes(lower) ||
    fish.habitat.toLowerCase().includes(lower) ||
    fish.bait.some(b => b.toLowerCase().includes(lower))
  );
}

export function filterFishByWaterType(waterType: FishSpecies['water_type']): FishSpecies[] {
  return FISH_SPECIES_DATA.filter(fish => fish.water_type === waterType || fish.water_type === 'all');
}

export function filterFishByCategory(category: FishSpecies['category']): FishSpecies[] {
  return FISH_SPECIES_DATA.filter(fish => fish.category === category);
}

export function filterFishByDifficulty(difficulty: FishSpecies['difficulty']): FishSpecies[] {
  return FISH_SPECIES_DATA.filter(fish => fish.difficulty === difficulty);
}

export function getFishById(id: string): FishSpecies | undefined {
  return FISH_SPECIES_DATA.find(fish => fish.id === id);
}

export function getFishByMonth(month: number): FishSpecies[] {
  return FISH_SPECIES_DATA.filter(fish => fish.best_months.includes(month));
}

// For the fish identifier
export interface IdentifierTrait {
  question: string;
  options: { label: string; value: string }[];
}

export const IDENTIFIER_TRAITS: IdentifierTrait[] = [
  {
    question: 'What type of water was the fish caught in?',
    options: [
      { label: 'Freshwater (river, lake, pond)', value: 'freshwater' },
      { label: 'Saltwater (sea, coast)', value: 'saltwater' },
      { label: 'Brackish (estuary, harbour)', value: 'brackish' },
    ]
  },
  {
    question: 'What was the general shape of the fish?',
    options: [
      { label: 'Long and torpedo-shaped', value: 'torpedo' },
      { label: 'Deep and laterally compressed (tall)', value: 'deep' },
      { label: 'Flat (both eyes on one side)', value: 'flat' },
      { label: 'Snake-like', value: 'snake' },
      { label: 'Small and slender', value: 'slender' },
    ]
  },
  {
    question: 'What colour was the fish?',
    options: [
      { label: 'Silver/grey', value: 'silver' },
      { label: 'Brown/green', value: 'brown' },
      { label: 'Golden/bronze', value: 'golden' },
      { label: 'Dark/black', value: 'dark' },
      { label: 'Spotted or striped', value: 'patterned' },
    ]
  },
  {
    question: 'Approximately how big was the fish?',
    options: [
      { label: 'Under 6 inches', value: 'tiny' },
      { label: '6-12 inches', value: 'small' },
      { label: '1-2 feet', value: 'medium' },
      { label: 'Over 2 feet', value: 'large' },
    ]
  },
  {
    question: 'Did the fish have whiskers/barbels?',
    options: [
      { label: 'Yes, whiskers near the mouth', value: 'yes' },
      { label: 'No, no whiskers', value: 'no' },
      { label: 'Not sure', value: 'unknown' },
    ]
  }
];
