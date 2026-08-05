// UK Fishing Rigs - Complete Guide
export interface FishingRig {
  id: string;
  name: string;
  category: 'sea' | 'freshwater' | 'canal' | 'boat-sea' | 'boat-fresh';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  species: string[];
  howTo: string[];
  tips: string[];
  svg: string;
}

export const SEA_RIGS: FishingRig[] = [
  {
    id: 'basic-wishbone',
    name: 'Basic Wishbone Rig',
    category: 'sea',
    difficulty: 'beginner',
    description: 'The wishbone rig is the most popular sea fishing rig in the UK. It uses two hooks on separate snoods branching from a single swivel, allowing you to fish two baits at once and increase your chances.',
    species: ['Bass', 'Flounder', 'Dab', 'Whiting', 'Cod'],
    howTo: [
      'Tie a rolling swivel to your main line.',
      'Cut two 30-40cm lengths of rig body line (30-40lb).',
      'Tie each piece to the bottom eye of the swivel using a blood knot.',
      'Attach a hook to the free end of each snood (size 1-4/0).',
      'Tie a impact lead or grip lead to the end of one snood.',
      'Space the hooks so they sit 15-20cm above the lead.',
    ],
    tips: [
      'Use 30-40lb rig body for most shore fishing.',
      'Match hook size to bait size — bigger bait needs bigger hook.',
      'Carry pre-tied wishbones for quick rig changes.',
    ],
    svg: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
      <!-- Main line -->
      <line x1="150" y1="10" x2="150" y2="120" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="165" y="65" font-size="11" fill="#6b7280">Main Line</text>
      <!-- Swivel -->
      <circle cx="150" cy="125" r="6" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <text x="162" y="130" font-size="10" fill="#374151">Swivel</text>
      <!-- Left snood -->
      <line x1="150" y1="131" x2="70" y2="280" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="40" y="200" font-size="10" fill="#0ea5e9" transform="rotate(-50 40 200)">Snood</text>
      <!-- Left hook -->
      <path d="M70 280 Q60 300 65 320 Q70 335 80 325 Q85 315 75 300 Q70 290 70 280" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="30" y="330" font-size="10" fill="#dc2626">Hook</text>
      <!-- Right snood -->
      <line x1="150" y1="131" x2="230" y2="280" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="210" y="200" font-size="10" fill="#0ea5e9" transform="rotate(50 210 200)">Snood</text>
      <!-- Right hook -->
      <path d="M230 280 Q240 300 235 320 Q230 335 220 325 Q215 315 225 300 Q230 290 230 280" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="235" y="330" font-size="10" fill="#dc2626">Hook</text>
      <!-- Lead -->
      <rect x="215" y="355" width="30" height="18" rx="3" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="210" y="390" font-size="10" fill="#78716c">Lead</text>
      <!-- Lead line -->
      <line x1="230" y1="285" x2="230" y2="355" stroke="#78716c" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: 'running-ledger',
    name: 'Running Ledger Rig',
    category: 'sea',
    difficulty: 'beginner',
    description: 'A simple and effective rig where the lead slides freely on the main line. The fish feels less resistance when taking the bait, making it ideal for cautious feeders like cod and bass.',
    species: ['Cod', 'Bass', 'Flounder', 'Ray'],
    howTo: [
      'Thread a running link or bead and swivel onto your main line.',
      'Tie a swivel to the end of your main line to act as a stop.',
      'Tie a 30-50cm hooklength from the swivel using 15-25lb line.',
      'Attach your hook (size 1/0 to 4/0).',
      'Attach a plain lead or grip lead to the running link.',
      'Bait up and cast out — the line runs freely through the lead.',
    ],
    tips: [
      'Great for fishing in strong tides where the lead needs to hold bottom.',
      'Use a bead between the running link and swivel to prevent tangles.',
      'Ideal for fishing at night when you want a fixed lead position.',
    ],
    svg: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
      <!-- Main line -->
      <line x1="150" y1="10" x2="150" y2="150" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="165" y="80" font-size="11" fill="#6b7280">Main Line</text>
      <!-- Running lead -->
      <rect x="135" y="145" width="30" height="18" rx="3" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="170" y="158" font-size="10" fill="#78716c">Running Lead</text>
      <!-- Bead -->
      <circle cx="150" cy="178" r="4" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
      <text x="160" y="182" font-size="9" fill="#d97706">Bead</text>
      <!-- Swivel -->
      <circle cx="150" cy="195" r="6" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <!-- Hooklength -->
      <line x1="150" y1="201" x2="150" y2="300" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="160" y="255" font-size="10" fill="#0ea5e9">Hooklength</text>
      <!-- Hook -->
      <path d="M150 300 Q140 320 145 340 Q150 355 160 345 Q165 335 155 320 Q150 310 150 300" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="165" y="350" font-size="10" fill="#dc2626">Hook</text>
      <!-- Arrow showing movement -->
      <path d="M120 145 L120 125 L115 130 M120 125 L125 130" fill="none" stroke="#6b7280" stroke-width="1.5"/>
      <text x="60" y="135" font-size="9" fill="#6b7280">Line runs</text>
    </svg>`,
  },
  {
    id: 'pulley-rig',
    name: 'Pulley Rig',
    category: 'sea',
    difficulty: 'intermediate',
    description: 'The pulley rig is designed to prevent hooked fish from snapping the line on rocks or reefs. When a fish runs, the pulley action lifts the lead away from snags, making it the go-to rig for rough ground fishing.',
    species: ['Cod', 'Bass', 'Pollock', 'Wrasse', 'Ray'],
    howTo: [
      'Tie a pulley swivel (or use two swivels connected by a heavy split ring).',
      'Tie your main line to one eye of the pulley.',
      'Thread a running lead link onto the main line above the pulley.',
      'Tie a hooklength (40-60cm) to the other eye of the pulley.',
      'Attach hook (2/0 to 5/0) to the hooklength.',
      'The lead hangs from the running link below the pulley.',
    ],
    tips: [
      'Use 50lb+ rig body for rough ground to prevent break-offs.',
      'Pre-tie several pulley rigs for quick setup on the beach.',
      'The pulley action only works when the lead is below the fish.',
    ],
    svg: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
      <!-- Main line -->
      <line x1="150" y1="10" x2="150" y2="100" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="165" y="55" font-size="11" fill="#6b7280">Main Line</text>
      <!-- Running lead link -->
      <rect x="130" y="100" width="40" height="12" rx="2" fill="#a16207" stroke="#854d0e" stroke-width="1"/>
      <text x="175" y="110" font-size="9" fill="#854d0e">Lead Link</text>
      <!-- Lead -->
      <rect x="135" y="112" width="30" height="18" rx="3" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="170" y="125" font-size="10" fill="#78716c">Lead</text>
      <!-- Pulley swivel -->
      <circle cx="150" cy="150" r="8" fill="#7c3aed" stroke="#6d28d9" stroke-width="2"/>
      <circle cx="150" cy="150" r="3" fill="#c4b5fd"/>
      <text x="165" y="155" font-size="10" fill="#7c3aed">Pulley</text>
      <!-- Hooklength -->
      <line x1="150" y1="158" x2="150" y2="280" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="160" y="220" font-size="10" fill="#0ea5e9">Hooklength</text>
      <!-- Hook -->
      <path d="M150 280 Q140 300 145 320 Q150 335 160 325 Q165 315 155 300 Q150 290 150 280" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="165" y="330" font-size="10" fill="#dc2626">Hook</text>
      <!-- Pulley action arrow -->
      <path d="M125 130 Q120 150 130 160" fill="none" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4,2"/>
      <text x="85" y="145" font-size="8" fill="#7c3aed">Pulley</text>
      <text x="82" y="155" font-size="8" fill="#7c3aed">action</text>
    </svg>`,
  },
  {
    id: 'flapper-rig',
    name: 'Flapper Rig',
    category: 'sea',
    difficulty: 'beginner',
    description: 'The flapper rig features 2-4 hooks on individual snoods branching from a central boom. Perfect for tope, dogfish, and general shore fishing when you want to cover more water with multiple baits.',
    species: ['Dogfish', 'Smooth-hound', 'Tope', 'Bass', 'Whiting'],
    howTo: [
      'Cut 3-4 snood lengths (30-40cm each) of 20-30lb line.',
      'Tie all snoods to one end of a rig boom or heavy swivel.',
      'Space hooks along the rig — attach one at the bottom, others 15cm apart going up.',
      'Tie a 30cm hooklength to each snood with appropriate hooks.',
      'Attach a grip lead or plain lead to the boom.',
      'Cast out and wait for bites on any of the hooks.',
    ],
    tips: [
      'Use different baits on each hook to find what\'s working.',
      'The bottom hook catches flatfish, upper hooks catch dogfish.',
      'Check local regulations for maximum hook numbers.',
    ],
    svg: `<svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <!-- Main line -->
      <line x1="150" y1="10" x2="150" y2="80" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="165" y="45" font-size="11" fill="#6b7280">Main Line</text>
      <!-- Boom -->
      <rect x="130" y="80" width="40" height="10" rx="3" fill="#374151" stroke="#1f2937" stroke-width="1.5"/>
      <text x="175" y="88" font-size="9" fill="#374151">Boom</text>
      <!-- Snood 1 (top) -->
      <line x1="145" y1="90" x2="80" y2="200" stroke="#0ea5e9" stroke-width="1.2"/>
      <path d="M80 200 Q72 215 75 230 Q78 240 85 233 Q88 225 82 215 Q80 208 80 200" fill="none" stroke="#dc2626" stroke-width="2"/>
      <!-- Snood 2 -->
      <line x1="150" y1="90" x2="150" y2="230" stroke="#0ea5e9" stroke-width="1.2"/>
      <path d="M150 230 Q142 245 145 260 Q148 270 155 263 Q158 255 152 245 Q150 238 150 230" fill="none" stroke="#dc2626" stroke-width="2"/>
      <!-- Snood 3 (bottom) -->
      <line x1="155" y1="90" x2="220" y2="200" stroke="#0ea5e9" stroke-width="1.2"/>
      <path d="M220 200 Q228 215 225 230 Q222 240 215 233 Q212 225 218 215 Q220 208 220 200" fill="none" stroke="#dc2626" stroke-width="2"/>
      <!-- Lead -->
      <rect x="135" y="360" width="30" height="18" rx="3" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="170" y="373" font-size="10" fill="#78716c">Lead</text>
      <line x1="150" y1="90" x2="150" y2="360" stroke="#78716c" stroke-width="1" stroke-dasharray="4,3"/>
      <!-- Labels -->
      <text x="40" y="195" font-size="8" fill="#0ea5e9">Snood 1</text>
      <text x="160" y="225" font-size="8" fill="#0ea5e9">Snood 2</text>
      <text x="225" y="195" font-size="8" fill="#0ea5e9">Snood 3</text>
    </svg>`,
  },
  {
    id: 'clipped-down-rig',
    name: 'Clipped Down Rig',
    category: 'sea',
    difficulty: 'intermediate',
    description: 'The clipped down rig clips the hook to the rig body during the cast for aerodynamics, then releases on impact with the water. Essential for distance casting on beaches.',
    species: ['Cod', 'Ray', 'Whiting', 'Bass'],
    howTo: [
      'Tie a boom or pulley swivel to your main line.',
      'Attach a 60-80cm hooklength with a bait clip at the end.',
      'Tie a second snood (40-50cm) to the boom for the top hook.',
      'Clip the bottom hook to the bait clip during the cast.',
      'On impact, the clip releases and both baits fish freely.',
      'Use a impact lead on the running link.',
    ],
    tips: [
      'Practice clipping and unclipping at home before hitting the beach.',
      'Always check the clip is functioning before casting — a failed clip means no bait.',
      'Best cast with an overhead or off-the-ground technique.',
    ],
    svg: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
      <!-- Main line -->
      <line x1="150" y1="10" x2="150" y2="90" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="165" y="50" font-size="11" fill="#6b7280">Main Line</text>
      <!-- Boom -->
      <rect x="130" y="90" width="40" height="10" rx="3" fill="#374151" stroke="#1f2937" stroke-width="1.5"/>
      <!-- Top snood (free) -->
      <line x1="145" y1="100" x2="90" y2="220" stroke="#0ea5e9" stroke-width="1.5"/>
      <path d="M90 220 Q82 235 85 250 Q88 260 95 253 Q98 245 92 235 Q90 228 90 220" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="50" y="215" font-size="8" fill="#0ea5e9">Top snood</text>
      <text x="50" y="225" font-size="8" fill="#0ea5e9">(free)</text>
      <!-- Bottom snood (clipped) -->
      <line x1="155" y1="100" x2="155" y2="300" stroke="#0ea5e9" stroke-width="1.5"/>
      <!-- Bait clip -->
      <rect x="143" y="295" width="24" height="10" rx="2" fill="#d97706" stroke="#b45309" stroke-width="1"/>
      <text x="172" y="303" font-size="8" fill="#b45309">Bait Clip</text>
      <!-- Hook clipped -->
      <path d="M155 305 Q148 315 150 325 Q153 332 158 328 Q160 322 156 315 Q155 310 155 305" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="165" y="325" font-size="8" fill="#dc2626">Hook</text>
      <text x="165" y="335" font-size="8" fill="#dc2626">(clipped)</text>
      <!-- Lead -->
      <rect x="135" y="360" width="30" height="18" rx="3" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <line x1="155" y1="305" x2="150" y2="360" stroke="#78716c" stroke-width="1"/>
      <!-- Cast arrow -->
      <path d="M220 50 L220 30 L215 35 M220 30 L225 35" fill="none" stroke="#059669" stroke-width="1.5"/>
      <text x="200" y="60" font-size="8" fill="#059669">Cast ↑</text>
    </svg>`,
  },
  {
    id: 'three-hook-beach',
    name: 'Three-Hook Flattening Rig',
    category: 'sea',
    difficulty: 'beginner',
    description: 'A variation of the wishbone with three hooks spread along the rig body. The extra hook increases your chances and is especially effective for mixed species sessions on the beach.',
    species: ['Dab', 'Flounder', 'Whiting', 'Bass', 'Cod'],
    howTo: [
      'Cut a 1.2m length of 30lb rig body line.',
      'Tie a swivel to one end (top of rig).',
      'Tie hooks at 30cm intervals along the rig body.',
      'Use loop-to-loop connections so hooks can be changed easily.',
      'Tie a grip lead to the bottom end.',
      'Thread a running bead and swivel above the top hook for the main line attachment.',
    ],
    tips: [
      'Use size 1-2 hooks for flatfish, size 2/0 for whiting and bass.',
      'Sand eel or lugworm on the bottom hook catches flounders.',
      'This rig fishes close to the bottom — ideal for the first hour after high tide.',
    ],
    svg: `<svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <!-- Main line -->
      <line x1="150" y1="10" x2="150" y2="50" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <!-- Swivel -->
      <circle cx="150" cy="55" r="5" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <!-- Rig body -->
      <line x1="150" y1="60" x2="150" y2="380" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="160" y="180" font-size="10" fill="#0ea5e9" transform="rotate(90 160 180)">Rig Body (30lb)</text>
      <!-- Hook 1 (top) -->
      <line x1="150" y1="110" x2="100" y2="150" stroke="#0ea5e9" stroke-width="1"/>
      <path d="M100 150 Q93 162 96 175 Q99 183 104 178 Q106 172 101 165 Q100 158 100 150" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="55" y="170" font-size="8" fill="#dc2626">Hook 1</text>
      <!-- Hook 2 (middle) -->
      <line x1="150" y1="200" x2="200" y2="240" stroke="#0ea5e9" stroke-width="1"/>
      <path d="M200 240 Q207 252 204 265 Q201 273 196 268 Q194 262 199 255 Q200 248 200 240" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="210" y="265" font-size="8" fill="#dc2626">Hook 2</text>
      <!-- Hook 3 (bottom) -->
      <line x1="150" y1="290" x2="100" y2="330" stroke="#0ea5e9" stroke-width="1"/>
      <path d="M100 330 Q93 342 96 355 Q99 363 104 358 Q106 352 101 345 Q100 338 100 330" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="55" y="355" font-size="8" fill="#dc2626">Hook 3</text>
      <!-- Lead -->
      <rect x="135" y="385" width="30" height="18" rx="3" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
    </svg>`,
  },
  // ─── ADDITIONAL SEA SHORE RIGS ──────────────────────────
  {
    id: 'uptide-rig',
    name: 'Uptide Rig',
    category: 'sea',
    difficulty: 'intermediate',
    description: 'The uptide rig is designed for fishing uptide of a boat or from the shore in strong currents. The lead sits on the seabed while the baited hook is lifted above by the current, presenting the bait naturally.',
    species: ['Cod', 'Bass', 'Ray', 'Flounder', 'Pollock'],
    howTo: [
      'Tie a heavy swivel (size 7 or 8) to your main line.',
      'Thread a heavy running lead (4-6oz) onto the main line above the swivel.',
      'Tie a 60-80cm hooklength to the other eye of the swivel.',
      'Attach a hook (size 2/0 to 4/0) to the hooklength.',
      'The lead sits on the bottom, the bait lifts above in the current.',
      'Fish uptide of your position — the current does the work.',
    ],
    tips: [
      'Use a heavy lead (4-6oz) to hold bottom in strong tides.',
      'The hooklength should be long enough to lift the bait above the lead.',
      'Excellent for boat fishing where you need to present bait uptide.',
    ],
    svg: `<svg viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="100" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="55" font-size="10" fill="#6b7280">Main Line</text>
      <rect x="80" y="100" width="40" height="12" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="125" y="110" font-size="9" fill="#78716c">Heavy Lead</text>
      <circle cx="100" cy="135" r="7" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <text x="112" y="140" font-size="9" fill="#374151">Swivel</text>
      <path d="M100 142 Q60 200 80 280" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="35" y="200" font-size="9" fill="#0ea5e9" transform="rotate(-20 35 200)">Hooklength</text>
      <path d="M80 280 Q72 295 75 310 Q78 320 85 313 Q88 305 82 295 Q80 288 80 280" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="55" y="330" font-size="9" fill="#dc2626">Hook</text>
      <path d="M100 142 Q140 200 120 280" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="145" y="200" font-size="8" fill="#f59e0b">Current</text>
    </svg>`,
  },
  {
    id: 'surf-casting-rig',
    name: 'Surf Casting Rig',
    category: 'sea',
    difficulty: 'intermediate',
    description: 'A rig designed for long-distance surf casting. Uses a boom to keep the bait away from the main line during the cast, reducing tangles and achieving maximum distance.',
    species: ['Cod', 'Bass', 'Ray', 'Whiting', 'Flounder'],
    howTo: [
      'Tie a rig boom (20-30cm) to your main line via a swivel.',
      'Thread a running lead link onto the main line above the boom.',
      'Tie a 60-100cm hooklength to the end of the boom.',
      'Attach a hook (size 1/0 to 4/0) to the hooklength.',
      'Clip the hook to the bait clip during the cast.',
      'The boom keeps the hooklength away from the main line.',
    ],
    tips: [
      'Use a 6-8oz lead for maximum distance.',
      'The boom prevents tangles during powerful surf casts.',
      'Practice your casting technique — the rig is only as good as the cast.',
    ],
    svg: `<svg viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="80" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="45" font-size="10" fill="#6b7280">Main Line</text>
      <rect x="60" y="80" width="80" height="8" rx="3" fill="#374151" stroke="#1f2937" stroke-width="1.5"/>
      <text x="145" y="88" font-size="9" fill="#374151">Boom</text>
      <rect x="80" y="95" width="40" height="12" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="125" y="105" font-size="9" fill="#78716c">Lead</text>
      <line x1="60" y1="88" x2="40" y2="250" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="10" y="170" font-size="9" fill="#0ea5e9" transform="rotate(-20 10 170)">Hooklength</text>
      <path d="M40 250 Q32 265 35 280 Q38 290 45 283 Q48 275 42 265 Q40 258 40 250" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="50" y="290" font-size="9" fill="#dc2626">Hook</text>
    </svg>`,
  },
  {
    id: 'rock-fishing-rig',
    name: 'Rock Fishing Rig',
    category: 'sea',
    difficulty: 'intermediate',
    description: 'A heavy-duty rig designed for fishing from rocks and reefs. Uses a pulley action to prevent fish from cutting the line on sharp rocks, with a heavy lead to hold position.',
    species: ['Pollack', 'Wrasse', 'Bass', 'Conger', 'Mackerel'],
    howTo: [
      'Tie a heavy pulley swivel to your main line (50lb+ main).',
      'Thread a 4-6oz grip lead onto the main line above the pulley.',
      'Tie a 50-70cm hooklength to the other eye of the pulley.',
      'Attach a strong hook (4/0 to 8/0) to the hooklength.',
      'The pulley action lifts the lead when a fish runs.',
      'Use a shock leader for casting heavy leads from rocks.',
    ],
    tips: [
      'Always use a grip lead on rocks — a plain lead will be lost.',
      'Wear a life jacket when rock fishing.',
      'The pulley rig is essential — it saves fish and tackle from rock damage.',
    ],
    svg: `<svg viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="80" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="45" font-size="10" fill="#6b7280">Main Line (50lb+)</text>
      <rect x="80" y="85" width="40" height="12" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="125" y="95" font-size="9" fill="#78716c">Grip Lead</text>
      <circle cx="100" cy="120" r="8" fill="#7c3aed" stroke="#6d28d9" stroke-width="2"/>
      <text x="115" y="125" font-size="9" fill="#7c3aed">Pulley</text>
      <line x1="100" y1="128" x2="100" y2="250" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="110" y="190" font-size="9" fill="#0ea5e9">Hooklength</text>
      <path d="M100 250 Q90 265 93 280 Q96 290 103 283 Q106 275 100 265 Q100 258 100 250" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="110" y="290" font-size="9" fill="#dc2626">Hook 4/0-8/0</text>
    </svg>`,
  },
  {
    id: 'estuary-rig',
    name: 'Estuary Rig',
    category: 'sea',
    difficulty: 'beginner',
    description: 'A simple, lightweight rig for estuary fishing where currents are moderate and fish are cautious. Ideal for bass, flounder, and mullet in tidal rivers.',
    species: ['Bass', 'Flounder', 'Grey Mullet', 'Dab', 'Whiting'],
    howTo: [
      'Tie a small swivel to your main line (15-20lb).',
      'Tie a 40-60cm hooklength to the swivel (12-15lb).',
      'Attach a size 2-4/0 hook to the hooklength.',
      'Thread a small running lead (1-2oz) onto the main line.',
      'Bait up with ragworm, lugworm, or peeler crab.',
      'Cast into the current and let the bait settle naturally.',
    ],
    tips: [
      'Use lighter tackle than beach fishing — estuary fish are line-shy.',
      'Fish the last 2 hours of the flood for the best results.',
      'A running lead is better than a grip lead in estuaries.',
    ],
    svg: `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="80" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="45" font-size="10" fill="#6b7280">Main Line</text>
      <rect x="85" y="85" width="30" height="10" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1"/>
      <text x="120" y="93" font-size="9" fill="#78716c">Running Lead</text>
      <circle cx="100" cy="115" r="6" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <text x="112" y="120" font-size="9" fill="#374151">Swivel</text>
      <line x1="100" y1="121" x2="100" y2="230" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="108" y="175" font-size="9" fill="#0ea5e9">Hooklength</text>
      <path d="M100 230 Q92 243 94 256 Q97 264 103 258 Q106 252 101 244 Q100 238 100 230" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="110" y="265" font-size="9" fill="#dc2626">Hook</text>
    </svg>`,
  },
  {
    id: 'spin-rig-sea',
    name: 'Sea Spin Rig',
    category: 'sea',
    difficulty: 'beginner',
    description: 'A simple rig for fishing artificial lures and spinners from the shore. Uses a snap swivel to allow quick lure changes and prevent line twist.',
    species: ['Bass', 'Pollack', 'Mackerel', 'Coalfish', 'Garfish'],
    howTo: [
      'Tie a snap swivel to the end of your main line.',
      'Attach a spinner, spoon, or plug to the snap swivel.',
      'Cast out and retrieve with a steady, rhythmic action.',
      'Vary the retrieve speed to find what works.',
      'Pause occasionally — strikes often come on the pause.',
      'Use 15-30lb main line for most shore spinning.',
    ],
    tips: [
      'Match lure weight to your rod — check the rod\'s casting weight.',
      'Early morning and late evening are the best times for spinning.',
      'Bass love small, flashy spinners in coloured water.',
    ],
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="120" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="65" font-size="10" fill="#6b7280">Main Line</text>
      <ellipse cx="100" cy="135" rx="12" ry="8" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <text x="118" y="140" font-size="9" fill="#374151">Snap Swivel</text>
      <ellipse cx="100" cy="190" rx="25" ry="10" fill="#0ea5e9" fill-opacity="0.3" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="130" y="195" font-size="9" fill="#0ea5e9">Lure</text>
      <path d="M75 190 L60 200" fill="none" stroke="#0ea5e9" stroke-width="1"/>
      <path d="M125 190 L140 200" fill="none" stroke="#0ea5e9" stroke-width="1"/>
      <text x="55" y="215" font-size="8" fill="#0ea5e9">Blades</text>
    </svg>`,
  },
  {
    id: 'mackerel-feather-rig',
    name: 'Mackerel Feather Rig',
    category: 'sea',
    difficulty: 'beginner',
    description: 'The classic rig for catching mackerel from piers, boats, and shore. Uses multiple feathered hooks that mimic a shoal of small fish. Drop it down and jig — simple and effective.',
    species: ['Mackerel', 'Scad', 'Garfish', 'Pollack'],
    howTo: [
      'Tie a 4-hook feather rig to your main line via a swivel.',
      'Each hook has a feathered or tinsel dress that imitates a baitfish.',
      'Drop the rig vertically into the water or cast and retrieve.',
      'Jig the rig up and down — the feathers flutter like real fish.',
      'When mackerel hit, strike firmly and wind in.',
      'Use 20-30lb main line — mackerel have sharp gill rakers.',
    ],
    tips: [
      'Pre-tied feather rigs are cheap and available at all tackle shops.',
      'Use a mackerel clip to hold the fish while you unhook.',
      'Feathers work best in clear water with visible mackerel shoals.',
    ],
    svg: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="60" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="35" font-size="10" fill="#6b7280">Main Line</text>
      <circle cx="100" cy="70" r="6" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <line x1="100" y1="76" x2="100" y2="300" stroke="#0ea5e9" stroke-width="1.5"/>
      <path d="M100 100 Q130 105 135 115" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 150 Q130 155 135 165" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 200 Q130 205 135 215" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 250 Q130 255 135 265" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 100 Q70 105 65 115" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 150 Q70 155 65 165" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 200 Q70 205 65 215" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 250 Q70 255 65 265" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <ellipse cx="135" cy="115" rx="15" ry="6" fill="#f59e0b" fill-opacity="0.4" stroke="#f59e0b" stroke-width="1"/>
      <ellipse cx="135" cy="165" rx="15" ry="6" fill="#f59e0b" fill-opacity="0.4" stroke="#f59e0b" stroke-width="1"/>
      <ellipse cx="135" cy="215" rx="15" ry="6" fill="#f59e0b" fill-opacity="0.4" stroke="#f59e0b" stroke-width="1"/>
      <ellipse cx="135" cy="265" rx="15" ry="6" fill="#f59e0b" fill-opacity="0.4" stroke="#f59e0b" stroke-width="1"/>
      <ellipse cx="65" cy="115" rx="15" ry="6" fill="#f59e0b" fill-opacity="0.4" stroke="#f59e0b" stroke-width="1"/>
      <ellipse cx="65" cy="165" rx="15" ry="6" fill="#f59e0b" fill-opacity="0.4" stroke="#f59e0b" stroke-width="1"/>
      <ellipse cx="65" cy="215" rx="15" ry="6" fill="#f59e0b" fill-opacity="0.4" stroke="#f59e0b" stroke-width="1"/>
      <ellipse cx="65" cy="265" rx="15" ry="6" fill="#f59e0b" fill-opacity="0.4" stroke="#f59e0b" stroke-width="1"/>
      <text x="155" y="170" font-size="9" fill="#f59e0b">Feathers</text>
    </svg>`,
  },
];

export const FRESHWATER_RIGS: FishingRig[] = [
  {
    id: 'basic-float-rig',
    name: 'Basic Float Rig',
    category: 'freshwater',
    difficulty: 'beginner',
    description: 'The classic float fishing setup used across UK rivers and stillwaters. The float acts as a visual bite indicator — when it dips or moves sideways, strike! Perfect for beginners and experienced anglers alike.',
    species: ['Roach', 'Bream', 'Perch', 'Chub', 'Dace', 'Tench'],
    howTo: [
      'Thread a float adapter or silicone onto your main line (3-6lb).',
      'Attach your float to the adapter.',
      'Tie a small split shot or bulk shot 30-40cm above the hook.',
      'Tie a size 10-16 hook to the end of your line.',
      'Adjust the shot so only the tip of the float shows above water.',
      'Cast gently upstream and let the float drift down naturally.',
    ],
    tips: [
      'Keep the rod tip high to reduce drag on the float.',
      'Use a lighter float for stillwaters, heavier for rivers.',
      'Match hook size to bait — maggots need size 14-16, worms need 8-10.',
    ],
    svg: `<svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
      <!-- Rod tip -->
      <line x1="100" y1="10" x2="100" y2="30" stroke="#92400e" stroke-width="3"/>
      <text x="110" y="20" font-size="9" fill="#92400e">Rod</text>
      <!-- Main line -->
      <line x1="100" y1="30" x2="100" y2="160" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6,3"/>
      <text x="110" y="95" font-size="9" fill="#6b7280">Main Line</text>
      <!-- Float -->
      <ellipse cx="100" cy="170" rx="8" ry="20" fill="#ef4444" stroke="#dc2626" stroke-width="1.5"/>
      <ellipse cx="100" cy="160" rx="4" ry="6" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
      <text x="115" y="175" font-size="9" fill="#dc2626">Float</text>
      <!-- Water line -->
      <line x1="60" y1="185" x2="140" y2="185" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="145" y="188" font-size="8" fill="#3b82f6">Water</text>
      <!-- Line below water -->
      <line x1="100" y1="190" x2="100" y2="320" stroke="#6b7280" stroke-width="1"/>
      <!-- Shot -->
      <circle cx="100" cy="260" r="4" fill="#71717a" stroke="#52525b" stroke-width="1"/>
      <text x="110" y="264" font-size="8" fill="#52525b">Shot</text>
      <!-- Hook -->
      <path d="M100 320 Q92 335 95 350 Q98 360 104 355 Q107 348 100 340 Q100 332 100 320" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="110" y="345" font-size="9" fill="#dc2626">Hook</text>
      <!-- Bait -->
      <circle cx="98" cy="355" r="3" fill="#fbbf24"/>
      <text x="60" y="365" font-size="8" fill="#f59e0b">Bait</text>
    </svg>`,
  },
  {
    id: 'waggler-rig',
    name: 'Waggler Float Rig',
    category: 'freshwater',
    difficulty: 'beginner',
    description: 'The waggler is a straight-bottomed float attached via a float adapter. It\'s the most popular stillwater float rig in the UK, used on commercials and natural waters for everything from roach to carp.',
    species: ['Roach', 'Bream', 'Carp', 'Tench', ' Rudd'],
    howTo: [
      'Slide a waggler float onto a waggler adapter on your main line (4-6lb).',
      'Position the float so it can be adjusted for depth.',
      'Tie a bulk of shot (4-6 No.4 or No.6) about 40cm from the hook.',
      'Add a dropper shot (1-2 small shots) 15cm below the bulk.',
      'Tie a size 12-16 hook (Kamasan B511 or similar).',
      'Plumb the depth so the waggler tip shows just above the surface.',
    ],
    tips: [
      'Ship the rig out using the pole or cast gently with a float rod.',
      'The bulk shot anchors the bait while the waggler shows bites.',
      'Use a INSERT waggler for close work, a FULL waggler for distance.',
    ],
    svg: `<svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
      <!-- Rod tip -->
      <line x1="100" y1="10" x2="100" y2="30" stroke="#92400e" stroke-width="3"/>
      <text x="110" y="20" font-size="9" fill="#92400e">Rod</text>
      <!-- Main line -->
      <line x1="100" y1="30" x2="100" y2="150" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6,3"/>
      <!-- Waggler float -->
      <rect x="97" y="155" width="6" height="50" rx="3" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
      <circle cx="100" cy="155" r="4" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
      <text x="110" y="180" font-size="9" fill="#16a34a">Waggler</text>
      <!-- Water line -->
      <line x1="60" y1="210" x2="140" y2="210" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="145" y="213" font-size="8" fill="#3b82f6">Water</text>
      <!-- Line below water -->
      <line x1="100" y1="215" x2="100" y2="340" stroke="#6b7280" stroke-width="1"/>
      <!-- Bulk shot -->
      <circle cx="100" cy="270" r="5" fill="#71717a" stroke="#52525b" stroke-width="1"/>
      <circle cx="95" cy="278" r="4" fill="#71717a" stroke="#52525b" stroke-width="1"/>
      <circle cx="105" cy="278" r="4" fill="#71717a" stroke="#52525b" stroke-width="1"/>
      <text x="112" y="278" font-size="8" fill="#52525b">Bulk</text>
      <!-- Dropper shot -->
      <circle cx="100" cy="310" r="3" fill="#a1a1aa" stroke="#71717a" stroke-width="1"/>
      <text x="108" y="314" font-size="7" fill="#71717a">Dropper</text>
      <!-- Hook -->
      <path d="M100 340 Q93 352 96 365 Q99 373 104 368 Q106 362 101 355 Q100 348 100 340" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="110" y="365" font-size="9" fill="#dc2626">Hook</text>
    </svg>`,
  },
  {
    id: 'pole-rig',
    name: 'Pole Float Rig',
    category: 'freshwater',
    difficulty: 'intermediate',
    description: 'The pole rig is the most sensitive float setup in freshwater fishing. Used on commercial fisheries and natural waters, it allows precise bait placement and instant bite detection by shipping the pole out to hand.',
    species: ['Carp', 'F1', 'Bream', 'Tench', 'Roach', 'Barbel'],
    howTo: [
      'Thread a Drennan or similar pole float onto your rig line (0.14-0.20mm).',
      'Add a small float adaptor or silicone stops to fix the float.',
      'Bulk your shots (ST04 or similar) in the top 30cm below the float.',
      'Add two dropper shots below the bulk, spaced 10cm apart.',
      'Tie a size 16-20 hook (wide gape or spade end).',
      'Plumb up so the float shows just the tip above the surface.',
    ],
    tips: [
      'Always plum the depth before starting — it changes throughout the day.',
      'Use the shortest rig possible for the depth you\'re fishing.',
      'Ship out smoothly — jerky movements spook fish.',
    ],
    svg: `<svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
      <!-- Pole tip -->
      <line x1="60" y1="10" x2="100" y2="40" stroke="#1d4ed8" stroke-width="2.5"/>
      <text x="20" y="15" font-size="9" fill="#1d4ed8">Pole</text>
      <!-- Main line -->
      <line x1="100" y1="40" x2="100" y2="160" stroke="#6b7280" stroke-width="1" stroke-dasharray="6,3"/>
      <!-- Pole float -->
      <path d="M97 165 L103 165 L101 200 L99 200 Z" fill="#7c3aed" stroke="#6d28d9" stroke-width="1"/>
      <ellipse cx="100" cy="165" rx="5" ry="3" fill="#fbbf24"/>
      <text x="110" y="185" font-size="9" fill="#6d28d9">Pole Float</text>
      <!-- Water line -->
      <line x1="60" y1="205" x2="140" y2="205" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="145" y="208" font-size="8" fill="#3b82f6">Water</text>
      <!-- Line below water -->
      <line x1="100" y1="210" x2="100" y2="350" stroke="#6b7280" stroke-width="1"/>
      <!-- Bulk shots -->
      <circle cx="100" cy="230" r="3.5" fill="#71717a" stroke="#52525b" stroke-width="1"/>
      <circle cx="96" cy="238" r="3" fill="#71717a" stroke="#52525b" stroke-width="1"/>
      <circle cx="104" cy="238" r="3" fill="#71717a" stroke="#52525b" stroke-width="1"/>
      <circle cx="100" cy="246" r="3.5" fill="#71717a" stroke="#52525b" stroke-width="1"/>
      <text x="112" y="240" font-size="8" fill="#52525b">Bulk</text>
      <!-- Dropper shots -->
      <circle cx="100" cy="290" r="2.5" fill="#a1a1aa" stroke="#71717a" stroke-width="1"/>
      <circle cx="100" cy="310" r="2.5" fill="#a1a1aa" stroke="#71717a" stroke-width="1"/>
      <text x="108" y="302" font-size="7" fill="#71717a">Droppers</text>
      <!-- Hook -->
      <path d="M100 350 Q94 360 96 372 Q98 380 103 376 Q105 370 100 363 Q100 357 100 350" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="108" y="372" font-size="9" fill="#dc2626">Hook</text>
      <!-- Elastic indicator -->
      <path d="M60 10 Q50 20 55 35 Q60 50 50 60" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2"/>
      <text x="20" y="55" font-size="7" fill="#f59e0b">Elastic</text>
    </svg>`,
  },
  {
    id: 'feeder-rig',
    name: 'Basic Method Feeder Rig',
    category: 'freshwater',
    difficulty: 'beginner',
    description: 'The method feeder is the most popular carp and bream rig in the UK. The bait sits on top of a compressed bed of groundbait on the feeder, presenting the hookbait perfectly every cast.',
    species: ['Carp', 'Bream', 'Tench', 'Barbel', 'F1'],
    howTo: [
      'Slide an inline method feeder onto your main line (8-12lb).',
      'Thread a rubber bead or buffer below the feeder.',
      'Tie a short hooklength (4-6 inches) of 8-10lb line.',
      'Attach a size 10-14 hook (wide gape pattern).',
      'Mould your groundbait around the feeder with the hookbait on top.',
      'Cast out and let the feeder settle — the elastic provides shock absorption.',
    ],
    tips: [
      'Squeeze the groundbait firmly so it holds during the cast.',
      'Use a hair-rig for boilies, or thread maggots/corn directly.',
      'The short hooklength means fast pickup — watch for line bites.',
    ],
    svg: `<svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
      <!-- Rod tip -->
      <line x1="100" y1="10" x2="100" y2="30" stroke="#92400e" stroke-width="3"/>
      <text x="110" y="20" font-size="9" fill="#92400e">Rod</text>
      <!-- Main line -->
      <line x1="100" y1="30" x2="100" y2="180" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6,3"/>
      <text x="110" y="105" font-size="9" fill="#6b7280">Main Line</text>
      <!-- Method feeder -->
      <ellipse cx="100" cy="200" rx="22" ry="14" fill="#a16207" stroke="#854d0e" stroke-width="1.5"/>
      <rect x="95" y="185" width="10" height="30" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1"/>
      <text x="128" y="205" font-size="8" fill="#854d0e">Method</text>
      <text x="128" y="215" font-size="8" fill="#854d0e">Feeder</text>
      <!-- Groundbait mould -->
      <ellipse cx="100" cy="200" rx="25" ry="16" fill="none" stroke="#92400e" stroke-width="1" stroke-dasharray="3,2"/>
      <!-- Hookbait on top -->
      <circle cx="100" cy="186" r="4" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
      <text x="110" y="188" font-size="7" fill="#f59e0b">Hookbait</text>
      <!-- Hooklength -->
      <line x1="100" y1="215" x2="100" y2="300" stroke="#0ea5e9" stroke-width="1"/>
      <text x="108" y="260" font-size="8" fill="#0ea5e9">Hooklength</text>
      <text x="108" y="270" font-size="7" fill="#0ea5e9">(4-6 inch)</text>
      <!-- Hook -->
      <path d="M100 300 Q93 312 96 325 Q98 333 104 328 Q106 322 101 315 Q100 308 100 300" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="110" y="325" font-size="9" fill="#dc2626">Hook</text>
      <!-- Hair rig option -->
      <line x1="103" y1="318" x2="115" y2="335" stroke="#dc2626" stroke-width="1"/>
      <circle cx="117" cy="337" r="3" fill="#fbbf24"/>
      <text x="122" y="340" font-size="7" fill="#dc2626">Hair rig</text>
      <text x="122" y="348" font-size="7" fill="#dc2626">option</text>
    </svg>`,
  },
  {
    id: 'hair-rig',
    name: 'Hair Rig (Carp)',
    category: 'freshwater',
    difficulty: 'intermediate',
    description: 'The hair rig revolutionised carp fishing. The bait is threaded onto a "hair" extending from the hook, so the fish sucks in the bait without feeling the hook weight. Essential for any carp angler.',
    species: ['Carp', 'F1', 'Barbel', 'Tench'],
    howTo: [
      'Cut 15-20cm of braided hooklink material (20-30lb).',
      'Tie a knotless knot — thread the line through the hook eye from back to front.',
      'Wrap the line around the hook shank 5-7 times.',
      'Thread the line back through the eye from front to back.',
      'Before tightening, thread a bait stop and your hookbait onto the hair.',
      'Pull tight and the hair exits at the back of the hook bend.',
    ],
    tips: [
      'Use a stiff bristle or pop-up to make the bait blow away from the lead.',
      'The hair should be short enough that the bait sits close to the hook.',
      'Anti-tangle sleeves on the swivel end prevent wraparounds.',
    ],
    svg: `<svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
      <!-- Hooklink -->
      <line x1="100" y1="10" x2="100" y2="180" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="110" y="100" font-size="9" fill="#0ea5e9">Hooklink</text>
      <text x="110" y="112" font-size="8" fill="#0ea5e9">(Braid)</text>
      <!-- Swivel -->
      <circle cx="100" cy="15" r="5" fill="#374151" stroke="#1f2937" stroke-width="1.5"/>
      <!-- Hook shank -->
      <line x1="100" y1="180" x2="100" y2="280" stroke="#9ca3af" stroke-width="3"/>
      <text x="110" y="230" font-size="8" fill="#6b7280">Hook shank</text>
      <!-- Hook bend -->
      <path d="M100 280 Q85 300 88 325 Q92 340 105 330 Q112 320 105 305 Q100 292 100 280" fill="none" stroke="#dc2626" stroke-width="3"/>
      <text x="115" y="315" font-size="9" fill="#dc2626">Hook</text>
      <!-- Knotless knot indication -->
      <rect x="90" y="265" width="20" height="8" rx="2" fill="none" stroke="#0ea5e9" stroke-width="1" stroke-dasharray="2,1"/>
      <text x="45" y="272" font-size="7" fill="#0ea5e9">Knotless</text>
      <text x="45" y="280" font-size="7" fill="#0ea5e9">knot</text>
      <!-- Hair -->
      <line x1="100" y1="295" x2="100" y2="360" stroke="#dc2626" stroke-width="1"/>
      <text x="108" y="330" font-size="8" fill="#dc2626">Hair</text>
      <!-- Bait stop -->
      <rect x="95" y="358" width="10" height="5" rx="1" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
      <text x="110" y="363" font-size="7" fill="#d97706">Stop</text>
      <!-- Bait -->
      <circle cx="100" cy="378" r="10" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="115" y="382" font-size="9" fill="#f59e0b">Boilie</text>
      <!-- Arrow showing how fish takes it -->
      <path d="M60 375 L85 375" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="30" y="370" font-size="7" fill="#059669">Fish sucks</text>
      <text x="30" y="380" font-size="7" fill="#059669">in bait</text>
    </svg>`,
  },
  {
    id: 'leger-rig',
    name: 'Simple Running Ledger',
    category: 'freshwater',
    difficulty: 'beginner',
    description: 'The simplest freshwater ledger rig. A lead slides freely on the main line, with a swivel stop and short hooklength. Ideal for barbel, chub, and general river fishing where you need the bait hard on the bottom.',
    species: ['Barbel', 'Chub', 'Bream', 'Carp', 'Tench'],
    howTo: [
      'Thread a running lead or bomb onto your main line (8-12lb).',
      'Tie a bead and swivel below the lead to act as a stop.',
      'Tie a 12-18 inch hooklength to the swivel using 8-10lb line.',
      'Attach a size 10-14 hook.',
      'Cast out and tighten to the lead — watch the rod tip for bites.',
      'The fish picks up the bait and moves off — the lead stays put.',
    ],
    tips: [
      'Use a quivertip rod for sensitive bite detection.',
      'Barbel bites are typically a sharp pull followed by a drop-back.',
      'Use PVA mesh or string to hold groundbait near the hook.',
    ],
    svg: `<svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
      <!-- Rod tip -->
      <line x1="60" y1="10" x2="100" y2="40" stroke="#92400e" stroke-width="3"/>
      <text x="20" y="15" font-size="9" fill="#92400e">Rod tip</text>
      <!-- Quiver tip -->
      <line x1="100" y1="40" x2="100" y2="70" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="110" y="55" font-size="8" fill="#f59e0b">Quiver tip</text>
      <!-- Main line -->
      <line x1="100" y1="70" x2="100" y2="200" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6,3"/>
      <!-- Running lead -->
      <ellipse cx="100" cy="210" rx="12" ry="8" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="118" y="214" font-size="8" fill="#57534e">Running</text>
      <text x="118" y="224" font-size="8" fill="#57534e">Lead</text>
      <!-- Bead -->
      <circle cx="100" cy="230" r="3" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
      <!-- Swivel -->
      <circle cx="100" cy="245" r="5" fill="#374151" stroke="#1f2937" stroke-width="1.5"/>
      <!-- Hooklength -->
      <line x1="100" y1="250" x2="100" y2="350" stroke="#0ea5e9" stroke-width="1"/>
      <text x="108" y="300" font-size="8" fill="#0ea5e9">Hooklength</text>
      <!-- Hook -->
      <path d="M100 350 Q93 362 96 375 Q98 383 104 378 Q106 372 101 365 Q100 358 100 350" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="110" y="375" font-size="9" fill="#dc2626">Hook</text>
      <!-- Movement arrows -->
      <path d="M65 200 L65 215 L60 210 M65 215 L70 210" fill="none" stroke="#0ea5e9" stroke-width="1"/>
      <text x="30" y="210" font-size="7" fill="#0ea5e9">Line runs</text>
    </svg>`,
  },
];

// ─── BOAT SEA RIGS ─────────────────────────────────────────
export const BOAT_SEA_RIGS: FishingRig[] = [
  {
    id: 'boat-paternoster',
    name: 'Boat Paternoster Rig',
    category: 'boat-sea',
    difficulty: 'beginner',
    description: 'The standard rig for boat fishing over wrecks and rough ground. Uses a weight at the bottom with hooks on droppers above, keeping baits off the seabed and away from snags.',
    species: ['Cod', 'Pollack', 'Wrasse', 'Pouting', 'Ling'],
    howTo: [
      'Tie a 2-4oz lead to the bottom of a paternoster boom.',
      'Thread 2-3 dropper loops onto the boom at 30cm intervals.',
      'Tie a hook (size 2/0 to 5/0) to each dropper loop.',
      'Tie the boom to your main line via a swivel.',
      'Lower the rig to the seabed and lift it slightly.',
      'Watch the rod tip for bites — lifts and rattles.',
    ],
    tips: [
      'Use a heavy enough lead to hold bottom in the tide.',
      'Paternoster rigs are the most versatile boat rig.',
      'Change hooks to match the target species.',
    ],
    svg: `<svg viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="50" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="30" font-size="10" fill="#6b7280">Main Line</text>
      <rect x="85" y="50" width="30" height="8" rx="3" fill="#374151" stroke="#1f2937" stroke-width="1.5"/>
      <text x="120" y="58" font-size="8" fill="#374151">Boom</text>
      <line x1="100" y1="58" x2="100" y2="300" stroke="#0ea5e9" stroke-width="1.5"/>
      <path d="M100 100 Q130 105 135 115" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 170 Q130 175 135 185" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 240 Q130 245 135 255" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 100 Q70 105 65 115" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 170 Q70 175 65 185" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M100 240 Q70 245 65 255" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <rect x="85" y="300" width="30" height="15" rx="3" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="120" y="312" font-size="8" fill="#78716c">Lead</text>
    </svg>`,
  },
  {
    id: 'boat-running-leger',
    name: 'Boat Running Leger',
    category: 'boat-sea',
    difficulty: 'beginner',
    description: 'A simple running leger for boat fishing where the lead slides on the main line. The fish feels less resistance, making it ideal for cautious cod and rays.',
    species: ['Cod', 'Ray', 'Bass', 'Flounder', 'Spurdog'],
    howTo: [
      'Thread a running lead (2-4oz) onto your main line.',
      'Tie a bead and swivel below the lead to act as a stop.',
      'Tie a 60-80cm hooklength to the swivel.',
      'Attach a hook (size 2/0 to 5/0) to the hooklength.',
      'Lower to the seabed and hold the rod still.',
      'Watch for line bites — taps and pulls on the line.',
    ],
    tips: [
      'A running leger is the simplest boat rig to tie.',
      'Use a bead to prevent the lead sliding onto the knot.',
      'Great for fishing uptide of the boat.',
    ],
    svg: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="80" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="45" font-size="10" fill="#6b7280">Main Line</text>
      <rect x="85" y="85" width="30" height="12" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="120" y="95" font-size="8" fill="#78716c">Running Lead</text>
      <circle cx="100" cy="115" r="5" fill="#f59e0b"/>
      <text x="110" y="118" font-size="8" fill="#f59e0b">Bead</text>
      <circle cx="100" cy="135" r="6" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <line x1="100" y1="141" x2="100" y2="250" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="108" y="195" font-size="9" fill="#0ea5e9">Hooklength</text>
      <path d="M100 250 Q92 263 94 276 Q97 284 103 278 Q106 272 101 264 Q100 258 100 250" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="110" y="285" font-size="9" fill="#dc2626">Hook</text>
    </svg>`,
  },
  {
    id: 'boat-float-rig',
    name: 'Boat Float Rig',
    category: 'boat-sea',
    difficulty: 'intermediate',
    description: 'A float rig for fishing baits below the boat at varying depths. Essential for targeting species that feed mid-water like pollack, coalfish, and mackerel.',
    species: ['Pollack', 'Coalfish', 'Mackerel', 'Wrasse', 'Garfish'],
    howTo: [
      'Tie a floats stops at the desired depth on your main line.',
      'Thread a boat float (w/popper) onto the main line.',
      'Tie a swivel below the float.',
      'Tie a 60-100cm hooklength to the swivel.',
      'Attach a small lead to the hooklength to hold the bait down.',
      'Lower the rig to the desired depth and hold steady.',
    ],
    tips: [
      'Adjust the depth to find where the fish are feeding.',
      'A float rig is brilliant for pollack around wrecks.',
      'Use a bright float for visibility in deep water.',
    ],
    svg: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="80" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="45" font-size="10" fill="#6b7280">Main Line</text>
      <ellipse cx="100" cy="100" rx="15" ry="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
      <text x="120" y="103" font-size="8" fill="#d97706">Float</text>
      <circle cx="100" cy="130" r="6" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <line x1="100" y1="136" x2="100" y2="250" stroke="#0ea5e9" stroke-width="1.5"/>
      <rect x="90" y="250" width="20" height="8" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1"/>
      <path d="M100 258 Q92 268 94 278 Q97 285 103 280 Q106 275 101 268 Q100 262 100 258" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="115" y="270" font-size="8" fill="#dc2626">Hook</text>
      <text x="120" y="255" font-size="8" fill="#78716c">Sink</text>
    </svg>`,
  },
  {
    id: 'wreck-fishing-rig',
    name: 'Wreck Fishing Rig',
    category: 'boat-sea',
    difficulty: 'intermediate',
    description: 'A specialized rig for fishing over shipwrecks. Uses a short, strong hooklength to prevent snagging on the wreck, with a heavy weight to hold position.',
    species: ['Cod', 'Pollack', 'Ling', 'Wrasse', 'Pouting'],
    howTo: [
      'Tie a heavy paternoster boom (40-50cm) to your main line.',
      'Thread a 3-4oz lead onto the boom.',
      'Tie a short, strong hooklength (30-40cm, 50lb) to the boom.',
      'Attach a strong hook (4/0 to 8/0) to the hooklength.',
      'Lower to the wreck and feel for the structure.',
      'Hold the rig just above the wreck — don\'t let it snag.',
    ],
    tips: [
      'Use a short, strong hooklength — long lines snag on wrecks.',
      'Feel for the wreck structure before fishing.',
      'Wreck fishing produces the biggest fish — use heavy gear.',
    ],
    svg: `<svg viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="60" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="35" font-size="10" fill="#6b7280">Main Line</text>
      <rect x="60" y="60" width="80" height="10" rx="3" fill="#374151" stroke="#1f2937" stroke-width="1.5"/>
      <text x="145" y="68" font-size="8" fill="#374151">Heavy Boom</text>
      <rect x="85" y="75" width="30" height="12" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1.5"/>
      <text x="120" y="84" font-size="8" fill="#78716c">Lead</text>
      <line x1="60" y1="70" x2="60" y2="200" stroke="#0ea5e9" stroke-width="2"/>
      <text x="15" y="135" font-size="8" fill="#0ea5e9">Short Hooklength</text>
      <path d="M60 200 Q52 213 54 226 Q57 234 63 228 Q66 222 61 214 Q60 208 60 200" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <text x="70" y="235" font-size="8" fill="#dc2626">Hook 4/0-8/0</text>
      <!-- Wreck structure -->
      <path d="M20 280 L180 280 L170 320 L30 320 Z" fill="#78716c" fill-opacity="0.3" stroke="#78716c" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="70" y="310" font-size="9" fill="#78716c">Wreck</text>
    </svg>`,
  },
  {
    id: 'deep-water-rig',
    name: 'Deep Water Rig',
    category: 'boat-sea',
    difficulty: 'advanced',
    description: 'A rig designed for deep water fishing (100m+) where strong currents and heavy leads are required. Uses a heavy boom and strong components to handle the conditions.',
    species: ['Ling', 'Cod', 'Halibut', 'Monkfish', 'Turbot'],
    howTo: [
      'Tie a heavy-duty boom (50-60cm) to your main line.',
      'Thread a 4-6oz lead onto the boom.',
      'Tie a strong hooklength (80-100cm, 60-80lb) to the boom.',
      'Attach a large hook (6/0 to 10/0) to the hooklength.',
      'Lower slowly to the seabed — feel for the lead hitting bottom.',
      'Hold the rod firm and watch for bites.',
    ],
    tips: [
      'Use a heavy-duty boom — standard booms will bend in deep water.',
      'A 6oz lead is minimum for deep water fishing.',
      'Deep water fish fight hard — use heavy tackle.',
    ],
    svg: `<svg viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="50" stroke="#6b7280" stroke-width="3" stroke-dasharray="8,4"/>
      <text x="112" y="30" font-size="10" fill="#6b7280">Heavy Main</text>
      <rect x="55" y="50" width="90" height="12" rx="4" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <text x="150" y="60" font-size="8" fill="#374151">Heavy Boom</text>
      <rect x="80" y="67" width="40" height="15" rx="3" fill="#78716c" stroke="#57534e" stroke-width="2"/>
      <text x="125" y="78" font-size="8" fill="#78716c">6oz Lead</text>
      <line x1="100" y1="82" x2="100" y2="260" stroke="#0ea5e9" stroke-width="2"/>
      <text x="110" y="170" font-size="9" fill="#0ea5e9">Heavy Hooklength</text>
      <path d="M100 260 Q88 278 92 296 Q96 308 104 300 Q108 292 101 280 Q100 270 100 260" fill="none" stroke="#dc2626" stroke-width="3"/>
      <text x="115" y="305" font-size="9" fill="#dc2626">Hook 6/0-10/0</text>
    </svg>`,
  },
  {
    id: 'live-bait-rig-sea',
    name: 'Sea Live Bait Rig',
    category: 'boat-sea',
    difficulty: 'intermediate',
    description: 'A rig for presenting live bait (mackerel, sandeel, pouting) to large predators like tope, smooth-hound, and conger. The bait swims naturally on a flowing trace.',
    species: ['Tope', 'Smooth-hound', 'Conger', 'Spurdog', 'Porbeagle'],
    howTo: [
      'Tie a heavy swivel to your main line.',
      'Attach a 60-80cm wire or heavy mono trace to the swivel.',
      'Tie a small treble hook (size 4-6) to the end of the trace.',
      'Hook the live bait through the nose or back.',
      'Lower the bait into the water and let it swim freely.',
      'Watch for the bait diving — strike when the predator takes.',
    ],
    tips: [
      'Keep the bait alive in a live bait well until needed.',
      'Use a wire trace for tope and smooth-hound — they have teeth.',
      'Live bait is the most effective way to catch big predators.',
    ],
    svg: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="80" stroke="#6b7280" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="112" y="45" font-size="10" fill="#6b7280">Main Line</text>
      <circle cx="100" cy="95" r="7" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <text x="115" y="100" font-size="8" fill="#374151">Swivel</text>
      <line x1="100" y1="102" x2="100" y2="180" stroke="#f59e0b" stroke-width="2"/>
      <text x="112" y="145" font-size="8" fill="#f59e0b">Wire Trace</text>
      <ellipse cx="100" cy="220" rx="30" ry="15" fill="#0ea5e9" fill-opacity="0.3" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="140" y="225" font-size="8" fill="#0ea5e9">Live Bait</text>
      <path d="M85 215 L80 205" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M80 205 L75 215" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <path d="M80 205 L85 215" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <text x="50" y="200" font-size="8" fill="#dc2626">Treble</text>
    </svg>`,
  },
];

// ─── CANAL RIGS ────────────────────────────────────────────
export const CANAL_RIGS: FishingRig[] = [
  {
    id: 'canal-waggler',
    name: 'Canal Waggler Rig',
    category: 'canal',
    difficulty: 'beginner',
    description: 'A sensitive float rig designed for the still, clear waters of UK canals. Uses a straight waggler float for maximum bite detection in the shallow, clear water.',
    species: ['Roach', 'Rudd', 'Bream', 'Perch', 'Gudgeon'],
    howTo: [
      'Thread a straight waggler float onto your main line (3-6lb).',
      'Set the depth so the bait sits just off the bottom.',
      'Tie a size 14-18 hook to a 2lb hooklength.',
      'Add a small shot 15cm above the hook for balance.',
      'Bait with maggots, bread, or sweetcorn.',
      'Lower gently into the nearside margins.',
    ],
    tips: [
      'Canals are shallow — use light floats and fine tackle.',
      'Fish the nearside margins — that\'s where the fish patrol.',
      'Keep noise down — canals are unforgiving of disturbance.',
    ],
    svg: `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="80" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6,3"/>
      <rect x="95" y="80" width="10" height="40" rx="2" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
      <text x="110" y="105" font-size="8" fill="#d97706">Waggler</text>
      <line x1="100" y1="120" x2="100" y2="220" stroke="#0ea5e9" stroke-width="1"/>
      <circle cx="100" cy="180" r="3" fill="#374151"/>
      <text x="108" y="183" font-size="7" fill="#374151">Shot</text>
      <path d="M100 220 Q94 230 96 240 Q98 247 103 242 Q105 238 101 232 Q100 227 100 220" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="108" y="250" font-size="8" fill="#dc2626">Hook 14-18</text>
    </svg>`,
  },
  {
    id: 'canal-pole-rig',
    name: 'Canal Pole Rig',
    category: 'canal',
    difficulty: 'intermediate',
    description: 'The ultimate precision rig for canal fishing. Using a long pole (11-16m) allows you to place the bait exactly where the fish are, right in the far bank margins.',
    species: ['Roach', 'Rudd', 'Bream', 'Perch', 'Tench'],
    howTo: [
      'Set up a pole rig with a float at 11-16m distance.',
      'Set the depth so the bait sits just off the bottom.',
      'Use a size 16-20 hook on a 1-1.5lb hooklength.',
      'Plumb the depth carefully — canals are often uneven.',
      'Ship the pole out and lower the bait gently.',
      'Watch for the float lifting — that\'s a bite.',
    ],
    tips: [
      'Pole fishing is the most precise method for canals.',
      'Use elastic inside the pole tip to absorb lunges.',
      'Feed little and often — a pinch of maggots every few minutes.',
    ],
    svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="100" x2="200" y2="100" stroke="#78716c" stroke-width="3"/>
      <text x="80" y="95" font-size="10" fill="#78716c">Pole (11-16m)</text>
      <line x1="200" y1="100" x2="200" y2="60" stroke="#0ea5e9" stroke-width="1"/>
      <rect x="196" y="60" width="8" height="20" rx="2" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
      <text x="210" y="75" font-size="8" fill="#d97706">Float</text>
      <line x1="200" y1="80" x2="200" y2="150" stroke="#0ea5e9" stroke-width="0.8"/>
      <path d="M200 150 Q196 157 197 164 Q199 169 203 165 Q204 162 201 157 Q200 154 200 150" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <text x="208" y="168" font-size="7" fill="#dc2626">Hook</text>
      <text x="10" y="130" font-size="8" fill="#78716c">Angler</text>
    </svg>`,
  },
  {
    id: 'canal-leger',
    name: 'Canal Leger Rig',
    category: 'canal',
    difficulty: 'beginner',
    description: 'A simple leger rig for fishing bottom baits in canals. Ideal for targeting perch, bream, and tench in the deeper channels.',
    species: ['Perch', 'Bream', 'Tench', 'Eel', 'Roach'],
    howTo: [
      'Tie a small swivel to your main line (4-6lb).',
      'Thread a small running lead (1-2oz) onto the main line.',
      'Tie a 30-50cm hooklength to the swivel (2-3lb).',
      'Attach a size 10-14 hook to the hooklength.',
      'Bait with worm, bread, or corn.',
      'Lower into the canal and watch the rod tip.',
    ],
    tips: [
      'Use a light rod — canals don\'t need heavy gear.',
      'Fish the deep channel in the middle of the canal.',
      'Perch love worm baits fished near obstacles.',
    ],
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="10" x2="100" y2="70" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6,3"/>
      <rect x="87" y="75" width="26" height="10" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1"/>
      <text x="118" y="83" font-size="8" fill="#78716c">Lead</text>
      <circle cx="100" cy="105" r="5" fill="#374151" stroke="#1f2937" stroke-width="1.5"/>
      <line x1="100" y1="110" x2="100" y2="200" stroke="#0ea5e9" stroke-width="1"/>
      <text x="108" y="155" font-size="8" fill="#0ea5e9">Hooklength</text>
      <path d="M100 200 Q94 210 96 220 Q98 227 103 222 Q105 218 101 212 Q100 207 100 200" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="108" y="230" font-size="8" fill="#dc2626">Hook</text>
    </svg>`,
  },
  {
    id: 'canal-margin-rig',
    name: 'Canal Margin Rig',
    category: 'canal',
    difficulty: 'beginner',
    description: 'A simple float rig for fishing the nearside margins of canals. This is where the big fish patrol — right under your feet. Short rod, light float, and patience.',
    species: ['Perch', 'Tench', 'Roach', 'Rudd', 'Carp'],
    howTo: [
      'Use a short rod (9-10ft) or pole.',
      'Set a small float at 2-4ft depth.',
      'Tie a size 12-16 hook to a 1.5-2lb hooklength.',
      'Bait with maggots, casters, or bread.',
      'Lower into the nearside margin — right against the edge.',
      'Watch for the float lifting or moving sideways.',
    ],
    tips: [
      'The nearside margins are the most productive area in canals.',
      'Feed small amounts of bait to draw fish in.',
      'Be quiet — big canal perch are easily spooked.',
    ],
    svg: `<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="180" width="200" height="70" fill="#78716c" fill-opacity="0.3"/>
      <text x="60" y="220" font-size="10" fill="#78716c">Canal Bed</text>
      <line x1="10" y1="180" x2="10" y2="30" stroke="#78716c" stroke-width="4"/>
      <text x="15" y="100" font-size="8" fill="#78716c">Bank</text>
      <line x1="15" y1="50" x2="80" y2="50" stroke="#6b7280" stroke-width="2"/>
      <line x1="80" y1="50" x2="80" y2="120" stroke="#0ea5e9" stroke-width="1"/>
      <rect x="76" y="120" width="8" height="18" rx="2" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
      <line x1="80" y1="138" x2="80" y2="170" stroke="#0ea5e9" stroke-width="0.8"/>
      <path d="M80 170 Q76 177 77 184 Q79 189 83 185 Q84 182 81 177 Q80 174 80 170" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <text x="88" y="180" font-size="7" fill="#dc2626">Hook</text>
    </svg>`,
  },
];

// ─── BOAT FRESHWATER RIGS ──────────────────────────────────
export const BOAT_FRESH_RIGS: FishingRig[] = [
  {
    id: 'trolling-rig',
    name: 'Trolling Rig',
    category: 'boat-fresh',
    difficulty: 'intermediate',
    description: 'A rig for trolling lures and baits behind a moving boat on UK lakes and reservoirs. Essential for targeting pike, zander, and trout in deep water.',
    species: ['Pike', 'Zander', 'Trout', 'Perch', 'Chub'],
    howTo: [
      'Tie a wire trace (30-50cm) to your main line via a swivel.',
      'Attach a spoon, plug, or dead bait to the trace.',
      'Let out 30-50m of line behind the boat.',
      'Troll at a steady pace (2-4 mph).',
      'Watch for the rod tip bending — that\'s a take.',
      'Strike firmly and wind in steadily.',
    ],
    tips: [
      'Use a wire trace for pike — their teeth will cut mono.',
      'Vary your speed and depth to find what works.',
      'Trolling is the most effective way to cover large lakes.',
    ],
    svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="80" width="60" height="30" rx="5" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <text x="20" y="100" font-size="9" fill="white">Boat</text>
      <line x1="70" y1="95" x2="200" y2="95" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6,3"/>
      <text x="110" y="88" font-size="8" fill="#6b7280">Main Line</text>
      <line x1="200" y1="95" x2="250" y2="95" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="210" y="88" font-size="8" fill="#f59e0b">Wire Trace</text>
      <ellipse cx="270" cy="95" rx="18" ry="8" fill="#0ea5e9" fill-opacity="0.3" stroke="#0ea5e9" stroke-width="1"/>
      <text x="295" y="98" font-size="7" fill="#0ea5e9">Lure</text>
      <path d="M50 120 L250 120" fill="none" stroke="#0ea5e9" stroke-width="0.5" stroke-dasharray="4,4"/>
      <text x="100" y="140" font-size="8" fill="#0ea5e9">Water</text>
    </svg>`,
  },
  {
    id: 'drift-rig-lake',
    name: 'Lake Drift Rig',
    category: 'boat-fresh',
    difficulty: 'intermediate',
    description: 'A rig for drifting over deep lake features with a baited trace. Uses the wind and current to cover ground naturally, presenting baits at varying depths.',
    species: ['Pike', 'Zander', 'Carp', 'Bream', 'Ten'],
    howTo: [
      'Tie a running leger to your main line.',
      'Thread a 2-3oz lead onto the main line.',
      'Tie a 100-150cm hooklength to the swivel.',
      'Attach a size 6-2/0 hook to the hooklength.',
      'Let the boat drift naturally with the wind.',
      'The long hooklength keeps the bait above the bottom.',
    ],
    tips: [
      'Drift fishing covers more water than static fishing.',
      'Use a long hooklength to keep the bait visible.',
      'A drogue can slow the drift for better bait presentation.',
    ],
    svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="60" width="60" height="30" rx="5" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <text x="20" y="80" font-size="9" fill="white">Boat</text>
      <path d="M70 75 Q120 60 200 80 Q250 90 280 100" fill="none" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6,3"/>
      <text x="130" y="65" font-size="8" fill="#6b7280">Drift Line</text>
      <rect x="270" y="95" width="20" height="10" rx="2" fill="#78716c" stroke="#57534e" stroke-width="1"/>
      <line x1="280" y1="105" x2="280" y2="150" stroke="#0ea5e9" stroke-width="1"/>
      <path d="M280 150 Q274 158 276 166 Q278 172 283 167 Q285 163 281 158 Q280 154 280 150" fill="none" stroke="#dc2626" stroke-width="1.5"/>
      <text x="290" y="165" font-size="7" fill="#dc2626">Hook</text>
      <path d="M0 180 L300 180" fill="none" stroke="#78716c" stroke-width="0.5" stroke-dasharray="4,4"/>
      <text x="100" y="195" font-size="8" fill="#78716c">Lake Bed</text>
    </svg>`,
  },
  {
    id: 'reservoir-rig',
    name: 'Reservoir Trout Rig',
    category: 'boat-fresh',
    difficulty: 'intermediate',
    description: 'A specialized rig for boat fishing on UK reservoirs. Uses a fly or lure fished at depth behind the boat to target rainbow and brown trout.',
    species: ['Rainbow Trout', 'Brown Trout', 'Blue Trout'],
    howTo: [
      'Tie a fly or lure to your main line (6-8lb).',
      'Thread a small lead or di3 sinking line onto the main line.',
      'Let out 50-100m of line behind the boat.',
      'Troll at a steady pace (2-3 mph).',
      'Vary the depth by adjusting the amount of line out.',
      'Watch for the rod tip jerking — strike immediately.',
    ],
    tips: [
      'Bright lures work best in clear reservoir water.',
      'Fish early morning and late evening for the best results.',
      'Many UK reservoirs require a permit — check before fishing.',
    ],
    svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="70" width="60" height="25" rx="5" fill="#374151" stroke="#1f2937" stroke-width="2"/>
      <text x="20" y="87" font-size="8" fill="white">Boat</text>
      <line x1="70" y1="82" x2="180" y2="82" stroke="#6b7280" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="100" y="76" font-size="7" fill="#6b7280">Main Line</text>
      <line x1="180" y1="82" x2="220" y2="82" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="185" y="76" font-size="7" fill="#0ea5e9">Sinking Line</text>
      <line x1="220" y1="82" x2="270" y2="100" stroke="#6b7280" stroke-width="0.8"/>
      <ellipse cx="280" cy="105" rx="12" ry="6" fill="#dc2626" fill-opacity="0.4" stroke="#dc2626" stroke-width="1"/>
      <text x="296" y="108" font-size="7" fill="#dc2626">Fly</text>
    </svg>`,
  },
];

export const ALL_RIGS = [...SEA_RIGS, ...FRESHWATER_RIGS, ...BOAT_SEA_RIGS, ...CANAL_RIGS, ...BOAT_FRESH_RIGS];
