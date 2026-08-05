import type Database from 'better-sqlite3';

const SEED_SPOTS = [
  {
    id: 'chesil-beach', name: 'Chesil Beach', lat: 50.6225, lng: -2.5533,
    desc: 'One of the UK\'s most famous shingle beaches stretching 18 miles from Portland to West Bay. Deep water close in with powerful tides. Legendary for mackerel, bass, cod, rays, and dogfish.',
    water: 'saltwater', species: ['Mackerel','Bass','Cod','Thornback Ray','Dogfish','Whiting','Smooth-hound','Plaice'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/9/96/Sea_fishing_off_Chesil_Beach_-_geograph.org.uk_-_374759.jpg']
  },
  {
    id: 'whitby-pier', name: 'Whitby East & West Piers', lat: 54.4885, lng: -0.6115,
    desc: 'Historic harbour town with excellent pier fishing. Winter cod fishing is legendary. The piers provide easy access to deep water year-round.',
    water: 'saltwater', species: ['Cod','Pollock','Whiting','Flatfish','Mackerel','Coalfish'], access: 'pier',
    images: ['https://upload.wikimedia.org/wikipedia/commons/4/40/Whitby_piers.jpg']
  },
  {
    id: 'brighton-marina', name: 'Brighton Marina', lat: 50.8125, lng: -0.0912,
    desc: 'One of the UK\'s busiest fishing marks. Safe, convenient platforms with plenty of space. Ideal for beginners and families. Summer mackerel shoals.',
    water: 'saltwater', species: ['Mackerel','Bream','Wrasse','Conger Eel','Bass','Pollack'], access: 'pier',
    images: ['https://upload.wikimedia.org/wikipedia/commons/5/53/Fishing_boat%2C_Brighton_Marina_-_geograph.org.uk_-_3870655.jpg']
  },
  {
    id: 'holyhead-breakwater', name: 'Holyhead Breakwater', lat: 53.3122, lng: -4.6425,
    desc: 'The UK\'s longest breakwater at 2.4km. Deep water and rocky structure attract pollock, wrasse, and conger. Stunning views across the Menai Strait.',
    water: 'saltwater', species: ['Pollock','Wrasse','Conger','Mackerel','Bass','Coalfish'], access: 'pier',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Holyhead_-_Holyhead_Breakwater%2C_Soldier%27s_Point_-_20220808092800.jpg/330px-Holyhead_-_Holyhead_Breakwater%2C_Soldier%27s_Point_-_20220808092800.jpg']
  },
  {
    id: 'portland-bill', name: 'Portland Bill', lat: 50.513, lng: -2.454,
    desc: 'Jutting dramatically into the English Channel. Strong tidal currents make it ideal for bass and pollock. Dawn and dusk are prime times.',
    water: 'saltwater', species: ['Bass','Pollock','Mackerel','Wrasse','Garfish'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/b/b8/Beach_Huts_and_Fishing_Boats_near_Portland_Bill_-_geograph.org.uk_-_1594964.jpg']
  },
  {
    id: 'porthleven-harbour', name: 'Porthleven Harbour', lat: 50.0833, lng: -5.3167,
    desc: 'One of Cornwall\'s most iconic fishing towns. Harbour walls and nearby beaches offer exceptional angling. Summer mackerel and garfish close to shore.',
    water: 'saltwater', species: ['Bass','Ray','Mackerel','Mullet','Garfish','Flounder'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/6/62/Porthleven_Harbour_-_geograph.org.uk_-_2770145.jpg']
  },
  {
    id: 'tynemouth-pier', name: 'Tynemouth Pier', lat: 55.0167, lng: -1.3,
    desc: 'Long scenic pier reaching into the North Sea. Superb deep water access without a boat. Autumn and winter cod fishing is excellent.',
    water: 'saltwater', species: ['Cod','Coalfish','Whiting','Flatfish','Mackerel'], access: 'pier',
    images: ['https://upload.wikimedia.org/wikipedia/commons/f/ff/Tynemouth_North_pier_lighthouse._-_geograph.org.uk_-_496658.jpg']
  },
  {
    id: 'oban-bay', name: 'Oban Bay', lat: 56.4125, lng: -5.4733,
    desc: 'Scotland\'s Seafood Capital is also an angler\'s dream. Sheltered bays and nearby islands produce huge skate, pollock, and ling.',
    water: 'saltwater', species: ['Skate','Pollock','Spurdog','Ling','Mackerel','Cod'], access: 'boat',
    images: ['https://upload.wikimedia.org/wikipedia/commons/4/49/Fishing_Boats_in_Oban_harbour_-_geograph.org.uk_-_5216396.jpg']
  },
  {
    id: 'swansea-bay', name: 'Swansea Bay', lat: 51.6167, lng: -3.9333,
    desc: 'Wide sandy beaches with accessible sea fishing. Smoothhound and ray in early summer, bass in autumn. Great for casting.',
    water: 'saltwater', species: ['Bass','Smooth-hound','Ray','Dogfish','Flounder','Whiting'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/1/13/Swansea_bay.jpeg']
  },
  {
    id: 'lulworth-cove', name: 'Lulworth Cove', lat: 50.6217, lng: -2.2233,
    desc: 'Postcard-perfect cove with clear waters and rocky seabed. Ideal for float and lure fishing. Summer evening mackerel sessions.',
    water: 'saltwater', species: ['Wrasse','Pollock','Mackerel','Garfish','Bass'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Lulworth_Cove-44.jpg/330px-Lulworth_Cove-44.jpg']
  },
  {
    id: 'heysham-north-wall', name: 'Heysham North Wall', lat: 54.0444, lng: -2.875,
    desc: 'Popular sea wall venue in Lancashire with easy access. Perfect for anglers with mobility issues. Thornback rays, smooth-hounds, bass.',
    water: 'saltwater', species: ['Thornback Ray','Smooth-hound','Bass','Whiting','Plaice','Flounder'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/f/fa/The_shore_looking_down_from_the_lower_side_of_St_Patrick%27s_Chapel%2C_Heysham_-_geograph.org.uk_-_438526.jpg']
  },
  {
    id: 'dungeness-beach', name: 'Dungeness Beach', lat: 50.9139, lng: 0.9819,
    desc: 'Vast shingle beach on the edge of Romney Marsh. Two lighthouses and a power station backdrop. Excellent for rays, dogfish, and bass.',
    water: 'saltwater', species: ['Thornback Ray','Dogfish','Bass','Whiting','Flounder','Smooth-hound'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/b/bc/Lydd-on-Sea%2C_Dungeness%2C_Shingle_beach_-_geograph.org.uk_-_2749765.jpg']
  },
  {
    id: 'pevensey-bay', name: 'Pevensey Bay', lat: 50.8167, lng: 0.3333,
    desc: 'Rural shingle beach near Eastbourne. Where William the Conqueror landed in 1066. Good for rays, dogfish, and flatfish.',
    water: 'saltwater', species: ['Thornback Ray','Dogfish','Whiting','Dab','Flounder'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/a/a3/Beach_at_Normans%27_Bay%2C_near_Pevensey_-_geograph.org.uk_-_7185031.jpg']
  },
  {
    id: 'filey-brigg', name: 'Filey Brigg', lat: 54.2167, lng: -0.2833,
    desc: 'Traditional seaside resort with excellent shore fishing. The Brigg rock formation holds fish year-round. Cod in winter, mackerel in summer.',
    water: 'saltwater', species: ['Cod','Whiting','Mackerel','Flatfish','Pollock','Coalfish'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/f/f0/Filey_Beach_-_geograph.org.uk_-_1546421.jpg']
  },
  {
    id: 'beer-beach', name: 'Beer Beach', lat: 50.6917, lng: -3.0917,
    desc: 'Picturesque Devon village beach on the Jurassic Coast. Cliff-backed setting with good mackerel, pollock, and bass fishing.',
    water: 'saltwater', species: ['Mackerel','Pollock','Bass','Wrasse','Garfish'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/1/1d/Beach_at_Beer%2C_Devon.JPG']
  },
  {
    id: 'salthouse-beach', name: 'Salthouse Beach', lat: 52.95, lng: 1.1,
    desc: 'Endless pebble beach backed by salt marshes in North Norfolk. Solitude and good fishing. Cod, whiting, and flatfish.',
    water: 'saltwater', species: ['Cod','Whiting','Dab','Flounder','Dogfish'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/4/41/Sea_anglers_on_Salthouse_Beach_-_geograph.org.uk_-_3010235.jpg']
  },
  {
    id: 'grafham-water', name: 'Grafham Water', lat: 52.2167, lng: -0.3333,
    desc: 'One of the UK\'s premier reservoir fisheries. 1,500 acres with trout, pike, perch, and carp. Fly fishing, lure fishing, and boat hire.',
    water: 'freshwater', species: ['Rainbow Trout','Brown Trout','Pike','Perch','Carp','Bream'], access: 'boat',
    images: ['https://upload.wikimedia.org/wikipedia/commons/3/30/Water_Tower_at_Grafham_Water_-_geograph.org.uk_-_690586.jpg']
  },
  {
    id: 'rutland-water', name: 'Rutland Water', lat: 52.65, lng: -0.6667,
    desc: 'England\'s largest reservoir at 3,100 acres. World-class trout fishing plus predator fishing for pike and zander.',
    water: 'freshwater', species: ['Rainbow Trout','Brown Trout','Pike','Zander','Perch','Carp'], access: 'boat',
    images: ['https://upload.wikimedia.org/wikipedia/commons/1/11/Fishing_boat_on_Rutland_Water_-_geograph.org.uk_-_3971800.jpg']
  },
  {
    id: 'derwentwater', name: 'Derwentwater, Lake District', lat: 54.5833, lng: -3.15,
    desc: 'Stunning lake in the heart of the Lake District. Perch, pike, and trout in spectacular scenery. Rowing boats available.',
    water: 'freshwater', species: ['Perch','Pike','Trout','Roach','Charr'], access: 'boat',
    images: ['https://upload.wikimedia.org/wikipedia/commons/7/7f/Derwent-water.jpg']
  },
  {
    id: 'llyn-trawsfynydd', name: 'Llyn Trawsfynydd', lat: 52.9667, lng: -3.9167,
    desc: 'Snowdonia reservoir with wild brown trout and stocked rainbows. Mountain scenery and solitude.',
    water: 'freshwater', species: ['Brown Trout','Rainbow Trout','Perch','Pike'], access: 'boat',
    images: ['https://upload.wikimedia.org/wikipedia/commons/b/b6/Llyn_Trawsfynydd_-_Flickr_-_Robert_J_Heath.jpg']
  },
  {
    id: 'leeds-liverpool-canal', name: 'Leeds & Liverpool Canal (Wigan)', lat: 53.54, lng: -2.63,
    desc: 'Historic canal with excellent coarse fishing. Roach, rudd, bream, perch, and tench. Free fishing along most stretches.',
    water: 'freshwater', species: ['Roach','Rudd','Bream','Perch','Tench','Eel'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/1/15/Finished_fishing%2C_Fallwood_Marina%2C_Leeds_and_Liverpool_Canal_-_geograph.org.uk_-_4255524.jpg']
  },
  {
    id: 'grand-union-canal', name: 'Grand Union Canal (Birmingham)', lat: 52.4862, lng: -1.8904,
    desc: 'Extensive canal network through the Midlands. Prolific coarse fishing with roach, bream, perch, and carp.',
    water: 'freshwater', species: ['Roach','Bream','Perch','Carp','Tench','Pike'], access: 'shore',
    images: ['https://upload.wikimedia.org/wikipedia/commons/e/e2/Narrowboat%2C_Grand_Union_Canal_-_geograph.org.uk_-_3967195.jpg']
  },
];

export function seedFishingSpots(db: Database.Database): void {
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO fishing_spots (id, name, latitude, longitude, description, water_type, species, access_type, image_urls, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  // Update existing spots with correct image URLs (overwrite even if they have old URLs)
  const updateStmt = db.prepare(`
    UPDATE fishing_spots SET image_urls = ? WHERE id = ?
  `);

  const now = new Date().toISOString();
  let inserted = 0;
  let updated = 0;
  const insertAll = db.transaction(() => {
    for (const s of SEED_SPOTS) {
      const imagesJson = JSON.stringify(s.images || []);
      const result = insertStmt.run(
        s.id, s.name, s.lat, s.lng, s.desc, s.water,
        JSON.stringify(s.species), s.access,
        imagesJson, now
      );
      if (result.changes > 0) {
        inserted++;
      }
      // Always update images (handles URL corrections)
      const upd = updateStmt.run(imagesJson, s.id);
      if (upd.changes > 0) updated++;
    }
  });
  insertAll();
  if (inserted > 0 || updated > 0) {
    console.log(`Fishing spots: ${inserted} inserted, ${updated} updated with images`);
  }
}
