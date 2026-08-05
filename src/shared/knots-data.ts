// Fishing Knots - Complete Guide
export interface FishingKnot {
  id: string;
  name: string;
  category: 'hook-to-line' | 'line-to-line' | 'loop-knots' | 'specialist';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  strength: number; // percentage of line strength retained
  bestFor: string[];
  description: string;
  howTo: string[];
  tips: string[];
  svg: string;
}

export const ALL_KNOTS: FishingKnot[] = [
  // ─── HOOK TO LINE ─────────────────────────────────────────
  {
    id: 'improved-clinch',
    name: 'Improved Clinch Knot',
    category: 'hook-to-line',
    difficulty: 'beginner',
    strength: 95,
    bestFor: ['Attaching hook to line', 'Swivels', 'Lures'],
    description: 'The Improved Clinch Knot is one of the most widely used fishing knots. It secures the hook or lure to the line by threading the line through the eye and wrapping it around itself before tucking it back through the loop. Simple, reliable, and ideal for beginners.',
    howTo: [
      'Thread the line through the eye of the hook — leave about 15cm of tag end.',
      'Wrap the tag end around the standing line 5-7 times (fewer wraps for thicker line).',
      'Thread the tag end through the small loop formed just above the eye.',
      'Then thread the tag end through the large loop you just created.',
      'Moisten the knot with saliva or water to reduce friction.',
      'Pull the standing line firmly to tighten. Trim the tag end close.',
    ],
    tips: [
      'Always moisten before tightening — dry friction weakens the line.',
      'Use 5 wraps for heavy line (20lb+), 7 wraps for light line.',
      'Not ideal for braid — use a Palomar or Uni Knot instead.',
    ],
    svg: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <!-- Standing line -->
      <line x1="100" y1="10" x2="100" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <text x="112" y="55" font-size="11" fill="#6b7280">Standing Line</text>
      <!-- Eye of hook -->
      <circle cx="100" cy="260" r="8" fill="none" stroke="#1f2937" stroke-width="2.5"/>
      <text x="115" y="264" font-size="10" fill="#1f2937">Eye</text>
      <!-- Hook shank -->
      <line x1="100" y1="268" x2="100" y2="310" stroke="#dc2626" stroke-width="3"/>
      <path d="M100 310 Q90 315 85 305" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <!-- Wraps -->
      <path d="M100 110 Q130 125 100 140 Q70 155 100 170 Q130 185 100 200 Q70 215 100 230 Q120 240 100 250" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <text x="135" y="175" font-size="10" fill="#0ea5e9">5-7 wraps</text>
      <!-- Tag end -->
      <path d="M100 250 L80 270 L80 245" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="45" y="255" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },
  {
    id: 'palomar',
    name: 'Palomar Knot',
    category: 'hook-to-line',
    difficulty: 'beginner',
    strength: 98,
    bestFor: ['Heavy loads', 'Braided line', 'Hooks', 'Swivels'],
    description: 'The Palomar Knot is considered the strongest and most reliable knot for attaching a hook to line. It passes through the eye twice, creating a doubled-line attachment that retains nearly 100% of the line\'s strength. Essential for braid users.',
    howTo: [
      'Double about 20cm of line to create a loop.',
      'Pass the doubled line (loop) through the eye of the hook.',
      'Tie a simple overhand knot with the doubled line — don\'t tighten yet.',
      'Pass the hook (or lure) through the loop.',
      'Moisten the knot and pull both the standing line and tag end to tighten evenly.',
      'Trim the tag end close to the knot.',
    ],
    tips: [
      'The single most important knot for braided line.',
      'Test it by pulling hard — it should hold firm with no slippage.',
      'Can be bulky on very small hooks — use a Trilene knot for tiny hooks.',
    ],
    svg: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <!-- Standing line -->
      <line x1="80" y1="10" x2="80" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <text x="88" y="55" font-size="11" fill="#6b7280">Standing Line</text>
      <!-- Doubled line through eye -->
      <line x1="80" y1="100" x2="100" y2="200" stroke="#0ea5e9" stroke-width="2"/>
      <line x1="120" y1="100" x2="100" y2="200" stroke="#0ea5e9" stroke-width="2"/>
      <text x="125" y="150" font-size="10" fill="#0ea5e9">Doubled Line</text>
      <!-- Overhand knot -->
      <path d="M80 130 Q140 150 120 180 Q100 200 80 170" fill="none" stroke="#7c3aed" stroke-width="2"/>
      <text x="140" y="170" font-size="10" fill="#7c3aed">Overhand</text>
      <!-- Eye -->
      <circle cx="100" cy="240" r="8" fill="none" stroke="#1f2937" stroke-width="2.5"/>
      <!-- Hook -->
      <line x1="100" y1="248" x2="100" y2="290" stroke="#dc2626" stroke-width="3"/>
      <path d="M100 290 Q90 295 85 285" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <!-- Loop around hook -->
      <ellipse cx="100" cy="260" rx="30" ry="15" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="135" y="265" font-size="10" fill="#f59e0b">Loop</text>
    </svg>`,
  },
  {
    id: 'uni-knot',
    name: 'Uni Knot',
    category: 'hook-to-line',
    difficulty: 'beginner',
    strength: 90,
    bestFor: ['All-purpose', 'Hook to line', 'Line to swivel', 'Backing to fly line'],
    description: 'The Uni Knot (also called the Grinner Knot) is a highly versatile knot that works for attaching hooks, swivels, and joining lines. It forms a sliding loop that tightens onto the eye of the hook. Easy to learn and works with all line types.',
    howTo: [
      'Thread the line through the eye of the hook, leaving 15cm of tag end.',
      'Form a loop by bringing the tag end back parallel to the standing line.',
      'Wrap the tag end around both lines inside the loop — 5-7 times.',
      'Moisten the knot and pull the tag end to tighten the wraps into a barrel.',
      'Slide the knot down to the eye by pulling the standing line.',
      'Trim the tag end.',
    ],
    tips: [
      'For a uni-to-uni line join: tie one uni on each line and slide together.',
      'Excellent for attaching backing to fly line.',
      'If the knot won\'t slide, you haven\'t moistened it enough.',
    ],
    svg: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <!-- Standing line -->
      <line x1="100" y1="10" x2="100" y2="120" stroke="#6b7280" stroke-width="2.5"/>
      <text x="112" y="65" font-size="11" fill="#6b7280">Standing Line</text>
      <!-- Loop -->
      <path d="M100 120 Q150 140 150 180 Q150 220 100 240" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <path d="M100 120 Q50 140 50 180 Q50 220 100 240" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <text x="155" y="180" font-size="10" fill="#0ea5e0">Loop</text>
      <!-- Barrel wraps -->
      <ellipse cx="100" cy="180" rx="15" ry="25" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="120" y="185" font-size="10" fill="#7c3aed">Barrel</text>
      <!-- Eye -->
      <circle cx="100" cy="260" r="8" fill="none" stroke="#1f2937" stroke-width="2.5"/>
      <!-- Hook -->
      <line x1="100" y1="268" x2="100" y2="310" stroke="#dc2626" stroke-width="3"/>
      <path d="M100 310 Q90 315 85 305" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <!-- Tag end -->
      <path d="M150 180 L170 200" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="155" y="215" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },
  {
    id: 'snell',
    name: 'Snell Knot',
    category: 'hook-to-line',
    difficulty: 'intermediate',
    strength: 97,
    bestFor: ['Hooks without eyes', 'Hooks with offset shanks', 'Big game hooks'],
    description: 'The Snell Knot wraps the line directly around the hook shank, making it the strongest way to attach hooks — especially eyed hooks with offset shanks or hooks without eyes. The line exits the eye at an angle that improves hook-setting power.',
    howTo: [
      'Lay the line along the hook shank, with the tag end pointing toward the bend.',
      'Form a large loop with the standing line alongside the shank.',
      'Wrap the standing line around the shank and both parts of the loop — 6-8 wraps, working toward the eye.',
      'Hold the wraps and pull the standing line to tighten.',
      'The knot should seat snugly against the eye.',
      'Trim the tag end close.',
    ],
    tips: [
      'Works brilliantly for hooks without eyes (freshwater nymph hooks).',
      'The wraps along the shank prevent the hook from bending out under load.',
      'Use wet hands to tighten — never tools on braid.',
    ],
    svg: `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Hook shank -->
      <line x1="100" y1="40" x2="100" y2="250" stroke="#dc2626" stroke-width="3"/>
      <circle cx="100" cy="40" r="6" fill="none" stroke="#dc2626" stroke-width="2"/>
      <path d="M100 250 Q85 260 80 245" fill="none" stroke="#dc2626" stroke-width="3"/>
      <text x="115" y="44" font-size="10" fill="#dc2626">Eye</text>
      <!-- Line along shank -->
      <line x1="100" y1="10" x2="100" y2="40" stroke="#6b7280" stroke-width="2.5"/>
      <text x="112" y="25" font-size="10" fill="#6b7280">Standing Line</text>
      <!-- Wraps -->
      <ellipse cx="100" cy="80" rx="20" ry="6" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="100" cy="100" rx="20" ry="6" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="100" cy="120" rx="20" ry="6" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="100" cy="140" rx="20" ry="6" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="100" cy="160" rx="20" ry="6" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="100" cy="180" rx="20" ry="6" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="125" y="135" font-size="10" fill="#0ea5e9">6-8 wraps</text>
      <!-- Tag end -->
      <line x1="100" y1="180" x2="60" y2="200" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="30" y="210" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },
  {
    id: 'trilene',
    name: 'Trilene Knot',
    category: 'hook-to-line',
    difficulty: 'beginner',
    strength: 95,
    bestFor: ['Small hooks', 'Light line', 'Monofilament', 'Fluorocarbon'],
    description: 'The Trilene Knot is an improved version of the Clinch Knot that passes through the eye twice, giving extra security on small hooks. It\'s the go-to knot for light tackle fishing and works brilliantly with monofilament and fluorocarbon.',
    howTo: [
      'Thread the line through the eye of the hook — then pass it through again, creating a double loop at the eye.',
      'Wrap the tag end around the standing line 4-6 times.',
      'Thread the tag end through the double loop at the eye.',
      'Moisten and pull the standing line to tighten.',
      'Trim the tag end.',
    ],
    tips: [
      'The double pass through the eye makes it more secure than a standard Clinch.',
      'Perfect for small trout and panfish hooks.',
      'Use 4 wraps for light line, 5-6 for heavier line.',
    ],
    svg: `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Standing line -->
      <line x1="100" y1="10" x2="100" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <text x="112" y="55" font-size="11" fill="#6b7280">Standing Line</text>
      <!-- Double loop at eye -->
      <circle cx="100" cy="230" r="10" fill="none" stroke="#1f2937" stroke-width="2"/>
      <circle cx="100" cy="230" r="6" fill="none" stroke="#1f2937" stroke-width="2"/>
      <text x="118" y="234" font-size="10" fill="#1f2937">Double Loop</text>
      <!-- Wraps -->
      <path d="M100 110 Q135 130 100 150 Q65 170 100 190 Q125 205 100 215" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <text x="135" y="165" font-size="10" fill="#0ea5e9">4-6 wraps</text>
      <!-- Hook -->
      <line x1="100" y1="240" x2="100" y2="280" stroke="#dc2626" stroke-width="3"/>
      <path d="M100 280 Q90 285 85 275" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <!-- Tag end -->
      <path d="M100 215 L60 230" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="30" y="225" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },
  {
    id: 'orvis',
    name: 'Orvis Knot',
    category: 'hook-to-line',
    difficulty: 'beginner',
    strength: 96,
    bestFor: ['Quick attachment', 'Hooks', 'Swivels', 'Lures'],
    description: 'The Orvis Knot was developed by the Orvis company as a quick, reliable knot for attaching hooks and lures. It forms a figure-eight inside the eye of the hook, creating a secure double-line attachment that\'s fast to tie even with cold hands.',
    howTo: [
      'Thread the line through the eye of the hook.',
      'Form a figure-eight with the tag end around the standing line.',
      'Pass the tag end through the loop created by the figure-eight.',
      'Moisten and pull tight.',
      'Trim the tag end.',
    ],
    tips: [
      'Can be tied one-handed — useful when you\'re already holding a fish.',
      'Stronger than a standard Clinch Knot.',
      'Works well with all line types.',
    ],
    svg: `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Standing line -->
      <line x1="100" y1="10" x2="100" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <text x="112" y="55" font-size="11" fill="#6b7280">Standing Line</text>
      <!-- Figure eight -->
      <path d="M100 100 Q140 120 120 150 Q100 170 80 150 Q60 130 100 110" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="140" y="140" font-size="10" fill="#7c3aed">Figure 8</text>
      <!-- Eye -->
      <circle cx="100" cy="230" r="8" fill="none" stroke="#1f2937" stroke-width="2.5"/>
      <!-- Hook -->
      <line x1="100" y1="238" x2="100" y2="280" stroke="#dc2626" stroke-width="3"/>
      <path d="M100 280 Q90 285 85 275" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <!-- Tag end through loop -->
      <path d="M120 150 L130 190 L100 210" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="135" y="195" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },

  // ─── LINE TO LINE ─────────────────────────────────────────
  {
    id: 'blood-knot',
    name: 'Blood Knot',
    category: 'line-to-line',
    difficulty: 'intermediate',
    strength: 90,
    bestFor: ['Joining two lines', 'Leader to main line', 'Similar diameter lines'],
    description: 'The Blood Knot is the classic method for joining two pieces of monofilament of similar diameter. It creates a neat, slim barrel that passes through rod guides easily. The key is wrapping each line around the other an equal number of times.',
    howTo: [
      'Overlap the two lines by about 15cm, with the tag ends pointing in opposite directions.',
      'Wrap the right tag end around the left line 5-7 times.',
      'Wrap the left tag end around the right line 5-7 times (same number of wraps).',
      'Thread each tag end through the gap in the middle, in opposite directions.',
      'Moisten and pull both standing lines to tighten the barrel.',
      'Trim both tag ends close.',
    ],
    tips: [
      'The number of wraps must be equal on both sides or the knot will fail.',
      'For lines of different diameters, add 2 extra wraps on the thinner line side.',
      'A blood knot connector (barrel) can be added for extra security.',
    ],
    svg: `<svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Left standing line -->
      <line x1="10" y1="100" x2="80" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <text x="15" y="90" font-size="11" fill="#6b7280">Line A</text>
      <!-- Left wraps -->
      <path d="M80 100 Q95 80 110 100 Q95 120 110 100" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <path d="M110 100 Q125 80 140 100 Q125 120 140 100" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <path d="M140 100 Q155 80 170 100 Q155 120 170 100" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <!-- Right wraps -->
      <path d="M110 100 Q95 80 80 100 Q95 120 80 100" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <path d="M140 100 Q125 80 110 100 Q125 120 110 100" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <path d="M170 100 Q155 80 140 100 Q155 120 140 100" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <!-- Center -->
      <circle cx="140" cy="100" r="4" fill="#7c3aed"/>
      <text x="128" y="70" font-size="10" fill="#7c3aed">Center</text>
      <!-- Right standing line -->
      <line x1="170" y1="100" x2="270" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <text x="230" y="90" font-size="11" fill="#6b7280">Line B</text>
      <!-- Tag ends -->
      <path d="M140 100 L130 130" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <path d="M140 100 L150 130" fill="none" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="120" y="145" font-size="9" fill="#f59e0b">Tag End A</text>
      <text x="148" y="145" font-size="9" fill="#0ea5e9">Tag End B</text>
      <!-- Wrap count -->
      <text x="80" y="170" font-size="10" fill="#0ea5e9">5-7 wraps each side</text>
    </svg>`,
  },
  {
    id: 'surgeon',
    name: "Surgeon's Knot",
    category: 'line-to-line',
    difficulty: 'beginner',
    strength: 85,
    bestFor: ['Lines of different diameters', 'Quick joins', 'Wet conditions'],
    description: "The Surgeon's Knot is the easiest way to join two lines, especially when they're different diameters. It's essentially a double overhand knot — simple enough to tie with cold, wet hands. Not as slim as a Blood Knot but much faster.",
    howTo: [
      'Overlap the two lines by about 20cm.',
      'Tie a simple overhand knot with both lines together.',
      'Before tightening, pass both tag ends through the loop again (double overhand).',
      'Moisten and pull all four ends to tighten.',
      'The knot should form a neat barrel. Trim tag ends.',
    ],
    tips: [
      'Add a third pass-through for extra security on very different diameters.',
      'Not as slim as a blood knot — may catch on rod guides.',
      'Great for joining tippet to leader in fly fishing.',
    ],
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Left line -->
      <line x1="10" y1="100" x2="70" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <text x="15" y="90" font-size="11" fill="#6b7280">Line A</text>
      <!-- Right line -->
      <line x1="130" y1="100" x2="190" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <text x="155" y="90" font-size="11" fill="#6b7280">Line B</text>
      <!-- Overhand knot -->
      <ellipse cx="100" cy="100" rx="30" ry="25" fill="none" stroke="#0ea5e9" stroke-width="2.5"/>
      <path d="M70 100 Q100 70 130 100 Q100 130 70 100" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="140" y="75" font-size="10" fill="#0ea5e0">1st pass</text>
      <text x="140" y="130" font-size="10" fill="#f59e0b">2nd pass</text>
      <!-- Tag ends -->
      <path d="M100 75 L80 50" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <path d="M100 125 L120 155" fill="none" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="55" y="45" font-size="9" fill="#f59e0b">Tag A</text>
      <text x="125" y="165" font-size="9" fill="#0ea5e9">Tag B</text>
    </svg>`,
  },
  {
    id: 'albright',
    name: 'Albright Special',
    category: 'line-to-line',
    difficulty: 'intermediate',
    strength: 85,
    bestFor: ['Braid to leader', 'Different line types', 'Heavy shock leader'],
    description: 'The Albright Special is the gold standard for joining braid to a mono or fluorocarbon leader. It\'s designed for lines of very different diameters and creates a compact knot that slides through rod guides smoothly.',
    howTo: [
      'Form a loop in the thicker line (leader) by folding it back on itself.',
      'Thread the thinner line (braid) through the loop from the same side.',
      'Wrap the braid around both legs of the loop — 10-12 wraps toward the loop\'s apex.',
      'Thread the braid back through the loop from the same side it entered.',
      'Pull the braid tight, then the leader, to seat the knot.',
      'Trim the tag ends.',
    ],
    tips: [
      'For braid, use 10-12 wraps. For mono-to-mono, 6-8 wraps is enough.',
      'The wraps must all go the same direction.',
      'Moisten generously — braid generates friction heat.',
    ],
    svg: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Leader loop -->
      <path d="M180 100 Q200 60 180 40 Q160 20 140 40 Q120 60 140 80 Q160 100 180 100" fill="none" stroke="#6b7280" stroke-width="3"/>
      <text x="185" y="70" font-size="10" fill="#6b7280">Leader</text>
      <!-- Leader standing line -->
      <line x1="180" y1="100" x2="230" y2="100" stroke="#6b7280" stroke-width="3"/>
      <!-- Braid wraps -->
      <ellipse cx="160" cy="50" rx="8" ry="4" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="145" cy="50" rx="8" ry="4" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="130" cy="55" rx="8" ry="4" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="120" cy="65" rx="8" ry="4" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="115" cy="80" rx="8" ry="4" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="80" y="45" font-size="10" fill="#0ea5e9">10-12 wraps</text>
      <!-- Braid standing line -->
      <line x1="10" y1="100" x2="115" y2="100" stroke="#0ea5e9" stroke-width="2"/>
      <text x="15" y="90" font-size="11" fill="#0ea5e9">Braid</text>
      <!-- Tag end -->
      <path d="M115 100 L100 130" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="70" y="140" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },
  {
    id: 'fg-knot',
    name: 'FG Knot',
    category: 'line-to-line',
    difficulty: 'advanced',
    strength: 95,
    bestFor: ['Braid to leader', 'Jigging', 'Trolling', 'Strongest braid connection'],
    description: 'The FG Knot (Fine Grip) is the strongest and most popular braid-to-leader knot among serious anglers. It uses a weaving pattern that grips the leader under load — the harder you pull, the tighter it grips. Requires practice but is worth mastering.',
    howTo: [
      'Hold the leader taut between your teeth and the braid in your hand.',
      'Weave the braid over and under the leader in an alternating pattern — 20-30 weaves.',
      'Each weave should be tight against the previous one.',
      'After weaving, tie 3 half-hitch knots over both lines.',
      'Trim the leader tag end close.',
      'Tie 2 more half-hitches over just the braid to finish.',
      'Pull test — the knot should be slim and tight.',
    ],
    tips: [
      'Tension is key — keep the leader tight throughout.',
      'Use a pulling tool or gloves to maintain braid tension.',
      'The FG knot is slim enough to pass through rod guides effortlessly.',
      'Practice at home before trying on the water.',
    ],
    svg: `<svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Leader -->
      <line x1="10" y1="100" x2="270" y2="100" stroke="#78716c" stroke-width="3"/>
      <text x="15" y="90" font-size="11" fill="#78716c">Leader (thick)</text>
      <!-- Braid weaves -->
      <path d="M60 100 Q70 80 80 100 Q90 120 100 100 Q110 80 120 100 Q130 120 140 100 Q150 80 160 100 Q170 120 180 100 Q190 80 200 100" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <text x="80" y="70" font-size="10" fill="#0ea5e9">20-30 weaves</text>
      <!-- Half hitches -->
      <ellipse cx="220" cy="100" rx="8" ry="12" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <ellipse cx="240" cy="100" rx="8" ry="12" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <ellipse cx="260" cy="100" rx="8" ry="12" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <text x="215" y="130" font-size="10" fill="#f59e0b">Half Hitches</text>
      <!-- Braid standing -->
      <line x1="10" y1="100" x2="60" y2="100" stroke="#0ea5e9" stroke-width="2"/>
      <!-- Leader tag -->
      <path d="M270 100 L280 80" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="255" y="75" font-size="9" fill="#f59e0b">Trim</text>
    </svg>`,
  },
  {
    id: 'nail-knot',
    name: 'Nail Knot',
    category: 'line-to-line',
    difficulty: 'intermediate',
    strength: 85,
    bestFor: ['Fly line backing', 'Leader to fly line', 'No tools needed'],
    description: 'The Nail Knot traditionally uses a nail (or tube) as a tool to create neat wraps that grip the line underneath. Essential for fly fishermen attaching leader to fly line, but works for any line-to-line connection where one line slides inside the wraps of the other.',
    howTo: [
      'Place a nail (or thin tube) alongside the thicker line.',
      'Lay the thinner line alongside both, with the tag end pointing back.',
      'Wrap the thinner line around the nail, thicker line, and itself — 5-7 wraps toward the tag end.',
      'Thread the tag end through the wraps (underneath the nail).',
      'Remove the nail and pull the standing line and tag end to tighten.',
      'The wraps should grip the thicker line firmly. Trim tag ends.',
    ],
    tips: [
      'A drinking straw works as well as a nail.',
      'Use a bodkin or needle to help thread the tag end.',
      'Essential for fly fishing — practice until it\'s second nature.',
    ],
    svg: `<svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Nail / tube -->
      <rect x="80" y="85" width="120" height="8" rx="4" fill="#a8a29e" stroke="#78716c" stroke-width="1"/>
      <text x="115" y="80" font-size="10" fill="#78716c">Nail / Tube</text>
      <!-- Thick line (fly line) -->
      <line x1="10" y1="100" x2="250" y2="100" stroke="#6b7280" stroke-width="3.5"/>
      <text x="15" y="118" font-size="10" fill="#6b7280">Thick Line (e.g. Fly Line)</text>
      <!-- Wraps -->
      <ellipse cx="110" cy="98" rx="6" ry="10" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="125" cy="98" rx="6" ry="10" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="140" cy="98" rx="6" ry="10" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="155" cy="98" rx="6" ry="10" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="170" cy="98" rx="6" ry="10" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="110" y="60" font-size="10" fill="#0ea5e9">5-7 wraps</text>
      <!-- Thin line -->
      <line x1="10" y1="95" x2="80" y2="95" stroke="#0ea5e9" stroke-width="1.5"/>
      <!-- Tag end -->
      <path d="M170 98 L185 130" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="190" y="140" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },

  // ─── LOOP KNOTS ───────────────────────────────────────────
  {
    id: 'rapala',
    name: 'Rapala Knot (Non-Slip Loop)',
    category: 'loop-knots',
    difficulty: 'intermediate',
    strength: 90,
    bestFor: ['Lures that need to swim freely', 'Minnows', 'Crankbaits', 'Spoons'],
    description: 'The Rapala Knot creates a fixed, non-slip loop that lets lures swing freely — essential for lures that need natural swimming action. Named after Rapala lures, it\'s the go-to knot for any lure that performs better with a loose connection.',
    howTo: [
      'Tie an overhand knot in the line about 15cm from the end — don\'t tighten.',
      'Thread the tag end through the lure\'s eye.',
      'Pass the tag end back through the overhand knot loop.',
      'Wrap the tag end around the standing line 3-5 times.',
      'Pass the tag end back through the overhand knot loop (the same way it entered).',
      'Moisten and pull the standing line to tighten. Trim tag end.',
    ],
    tips: [
      'The loop should be about 1cm — too big and the lure won\'t hook up properly.',
      'Essential for jerkbaits and minnow-style lures.',
      'Test the loop by swinging the lure — it should move freely.',
    ],
    svg: `<svg viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Standing line -->
      <line x1="110" y1="10" x2="110" y2="80" stroke="#6b7280" stroke-width="2.5"/>
      <text x="120" y="45" font-size="11" fill="#6b7280">Standing Line</text>
      <!-- Overhand knot -->
      <ellipse cx="110" cy="100" rx="20" ry="12" fill="none" stroke="#7c3aed" stroke-width="2"/>
      <text x="135" y="105" font-size="10" fill="#7c3aed">Overhand</text>
      <!-- Wraps -->
      <path d="M110 112 Q140 125 110 140 Q80 155 110 170 Q130 180 110 185" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <text x="140" y="150" font-size="10" fill="#0ea5e0">3-5 wraps</text>
      <!-- Loop -->
      <ellipse cx="110" cy="230" rx="25" ry="20" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="140" y="235" font-size="10" fill="#f59e0b">Fixed Loop</text>
      <!-- Lure -->
      <ellipse cx="110" cy="265" rx="15" ry="8" fill="#0ea5e9" fill-opacity="0.3" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="130" y="270" font-size="10" fill="#0ea5e9">Lure</text>
      <!-- Tag end -->
      <path d="M110 185 L80 210" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="50" y="220" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },
  {
    id: 'perfection-loop',
    name: 'Perfection Loop',
    category: 'loop-knots',
    difficulty: 'intermediate',
    strength: 95,
    bestFor: ['Fixed loops in leader', 'Fly fishing loops', 'Loop-to-loop connections'],
    description: 'The Perfection Loop creates a strong, fixed loop in the end of a line — ideal for creating loop-to-loop connections with pre-tied flies or lures. It lies flat and maintains almost full line strength.',
    howTo: [
      'Form a loop with the tag end crossing over the standing line.',
      'Wrap the tag end around the standing line — one full wrap.',
      'Form a second, smaller loop by bringing the tag end back over.',
      'Pass the smaller loop through the larger loop.',
      'Pull the standing line and the smaller loop in opposite directions to tighten.',
      'The finished knot should have the loop exiting at 90° from the standing line.',
    ],
    tips: [
      'Critical: the second loop must pass through the first from behind.',
      'Test by pulling hard — it should hold firm.',
      'Essential for creating pre-tied leaders with loop connections.',
    ],
    svg: `<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
      <!-- Standing line -->
      <line x1="100" y1="10" x2="100" y2="80" stroke="#6b7280" stroke-width="2.5"/>
      <text x="112" y="45" font-size="11" fill="#6b7280">Standing Line</text>
      <!-- Large loop -->
      <path d="M100 80 Q160 100 140 160 Q120 200 100 180" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <text x="165" y="130" font-size="10" fill="#0ea5e9">Large Loop</text>
      <!-- Small loop through -->
      <path d="M100 120 Q130 130 120 160 Q110 180 100 160" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="130" y="170" font-size="10" fill="#f59e0b">Small Loop</text>
      <!-- Final loop -->
      <ellipse cx="100" cy="225" rx="20" ry="15" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="125" y="230" font-size="10" fill="#7c3aed">Output</text>
      <!-- Tag end -->
      <path d="M120 160 L140 180" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="145" y="190" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },
  {
    id: 'surgeon-end-loop',
    name: "Surgeon's End Loop",
    category: 'loop-knots',
    difficulty: 'beginner',
    strength: 80,
    bestFor: ['Quick loops', 'Tippet rings', 'Leader ends'],
    description: "The Surgeon's End Loop is the quickest way to form a fixed loop at the end of a line. It's essentially a Surgeon's Knot tied as a loop — simple, fast, and strong enough for most applications.",
    howTo: [
      'Double the line back to form a loop about 20cm long.',
      'Tie a simple overhand knot with the doubled line.',
      'Pass the loop through the knot opening again (double overhand).',
      'Moisten and pull the loop and standing line to tighten.',
      'The loop should be about 5-8cm. Trim the tag end.',
    ],
    tips: [
      'For extra strength, add a third pass-through.',
      'Great for attaching tippet rings.',
      'Quick enough to tie in the dark.',
    ],
    svg: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <!-- Standing line -->
      <line x1="100" y1="10" x2="100" y2="80" stroke="#6b7280" stroke-width="2.5"/>
      <text x="112" y="45" font-size="11" fill="#6b7280">Standing Line</text>
      <!-- Overhand knot with doubled line -->
      <ellipse cx="100" cy="120" rx="30" ry="20" fill="none" stroke="#0ea5e9" stroke-width="2.5"/>
      <path d="M70 120 Q100 90 130 120 Q100 150 70 120" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <text x="135" y="125" font-size="10" fill="#0ea5e9">2nd pass</text>
      <!-- Loop -->
      <ellipse cx="100" cy="200" rx="20" ry="18" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
      <text x="125" y="205" font-size="10" fill="#7c3aed">Loop</text>
      <!-- Tag end -->
      <path d="M70 120 L50 150" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="25" y="160" font-size="10" fill="#f59e0b">Tag End</text>
    </svg>`,
  },
  {
    id: 'bimini-twist',
    name: 'Bimini Twist',
    category: 'loop-knots',
    difficulty: 'advanced',
    strength: 100,
    bestFor: ['Double line loops', 'Big game', 'Tournament fishing', 'Maximum strength'],
    description: 'The Bimini Twist creates a double-line loop that retains 100% of the line\'s strength — the only knot to do so. It\'s used in big game fishing and tournament situations where maximum knot strength is non-negotiable. The key is allowing the wraps to roll over themselves.',
    howTo: [
      'Double the line to form a loop about 30cm long.',
      'Hold the loop open with your knees or a fixed object.',
      'Make 20-30 wraps of the tag end around the double line, working away from the loop.',
      'Release the tension on the loop — the wraps will begin to roll back over themselves.',
      'Guide the wraps as they roll back toward the loop until they cover the original wraps.',
      'Tie a half-hitch to lock the wraps. Trim the tag end.',
    ],
    tips: [
      'The wraps must roll back over themselves — this is what gives 100% strength.',
      'Use 20 wraps for light line, 30 for heavy.',
      'Practice at home — it\'s difficult to learn on the water.',
      'Used as the starting point for many big-game leader systems.',
    ],
    svg: `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Loop -->
      <ellipse cx="100" cy="250" rx="30" ry="25" fill="none" stroke="#7c3aed" stroke-width="3"/>
      <text x="135" y="255" font-size="10" fill="#7c3aed">Loop</text>
      <!-- Double line -->
      <line x1="80" y1="225" x2="80" y2="60" stroke="#6b7280" stroke-width="2"/>
      <line x1="120" y1="225" x2="120" y2="60" stroke="#6b7280" stroke-width="2"/>
      <!-- Wraps -->
      <path d="M80 200 Q140 190 120 180 Q80 170 120 160 Q80 150 120 140 Q80 130 120 120 Q80 110 120 100 Q80 90 120 80" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="140" y="145" font-size="10" fill="#0ea5e0">20-30 wraps</text>
      <!-- Roll back -->
      <path d="M120 80 Q60 90 80 100 Q120 110 80 120 Q120 130 80 140 Q120 150 80 160 Q120 170 80 180 Q120 190 80 200" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="15" y="145" font-size="10" fill="#f59e0b">Rolls back</text>
      <!-- Half hitch -->
      <ellipse cx="100" cy="70" rx="12" ry="8" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="115" y="73" font-size="9" fill="#dc2626">Half-hitch lock</text>
    </svg>`,
  },

  // ─── SPECIALIST ───────────────────────────────────────────
  {
    id: 'double-uni',
    name: 'Double Uni Knot',
    category: 'specialist',
    difficulty: 'beginner',
    strength: 88,
    bestFor: ['Joining braid to mono', 'Quick line changes', 'All diameters'],
    description: 'The Double Uni Knot is simply two Uni Knots tied back-to-back, one on each line. It\'s the easiest and most forgiving line-to-line join, working with any combination of line types and diameters.',
    howTo: [
      'Overlap the two lines by about 15cm.',
      'Tie a Uni Knot with Line A around Line B.',
      'Tie a Uni Knot with Line B around Line A.',
      'Slide both knots together by pulling the standing lines.',
      'Trim both tag ends.',
    ],
    tips: [
      'Use 5 wraps for each uni if the lines are similar diameter.',
      'Use 7-8 wraps for joining braid to mono.',
      'Pull firmly — the two knots jam against each other.',
    ],
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
      <!-- Line A -->
      <line x1="10" y1="80" x2="80" y2="80" stroke="#0ea5e9" stroke-width="2.5"/>
      <text x="15" y="70" font-size="11" fill="#0ea5e9">Line A</text>
      <!-- Uni knot A -->
      <ellipse cx="110" cy="80" rx="25" ry="18" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <text x="85" y="50" font-size="10" fill="#0ea5e9">Uni A</text>
      <!-- Line B -->
      <line x1="140" y1="80" x2="270" y2="80" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="235" y="70" font-size="11" fill="#f59e0b">Line B</text>
      <!-- Uni knot B -->
      <ellipse cx="170" cy="80" rx="25" ry="18" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <text x="185" y="50" font-size="10" fill="#f59e0b">Uni B</text>
      <!-- Junction -->
      <circle cx="140" cy="80" r="4" fill="#7c3aed"/>
      <text x="125" y="120" font-size="10" fill="#7c3aed">Slide Together</text>
      <!-- Tag ends -->
      <path d="M110 62 L100 40" fill="none" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4,3"/>
      <path d="M170 98 L180 120" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
    </svg>`,
  },
  {
    id: 'loop-to-loop',
    name: 'Loop-to-Loop Connection',
    category: 'specialist',
    difficulty: 'beginner',
    strength: 90,
    bestFor: ['Pre-tied leaders', 'Fly fishing', 'Quick leader changes'],
    description: 'The Loop-to-Loop Connection is the simplest way to join two pre-tied loops together. It\'s used extensively in fly fishing to connect leaders to fly lines and tippet sections together. The key is making sure the loops don\'t cross over when connecting.',
    howTo: [
      'Take the loop on your leader and the loop on your fly line (or tippet).',
      'Pass one loop through the other.',
      'Pull both standing lines in opposite directions.',
      'The loops should nest neatly inside each other without twisting.',
      'Check that the connection lies flat — twisted loops weaken the connection.',
    ],
    tips: [
      'Never let the loops twist — this creates a weak point.',
      'For fly fishing, always use loop-to-loop for quick changes on the bank.',
      'Trim any tag ends from the original loop knots.',
    ],
    svg: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Left line -->
      <line x1="10" y1="100" x2="80" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <!-- Left loop -->
      <ellipse cx="100" cy="100" rx="25" ry="20" fill="none" stroke="#0ea5e9" stroke-width="2.5"/>
      <text x="40" y="90" font-size="11" fill="#6b7280">Leader Loop</text>
      <!-- Right loop through -->
      <ellipse cx="100" cy="100" rx="20" ry="16" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
      <!-- Right line -->
      <line x1="120" y1="100" x2="230" y2="100" stroke="#6b7280" stroke-width="2.5"/>
      <text x="155" y="90" font-size="11" fill="#6b7280">Fly Line Loop</text>
      <!-- Arrows -->
      <text x="80" y="60" font-size="10" fill="#7c3aed">Pass one through</text>
      <text x="80" y="145" font-size="10" fill="#7c3aed">Pull tight</text>
      <path d="M100 55 L100 45 L95 50 M100 45 L105 50" fill="none" stroke="#7c3aed" stroke-width="1.5"/>
      <path d="M100 155 L100 165 L95 160 M100 165 L105 160" fill="none" stroke="#7c3aed" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: 'arbor-knot',
    name: 'Arbor Knot',
    category: 'specialist',
    difficulty: 'beginner',
    strength: 70,
    bestFor: ['Attaching backing to reel spool', 'Any reel spool'],
    description: 'The Arbor Knot is used to attach backing (or any line) to the arbor (center post) of a reel spool. It\'s a simple knot that relies on the backing sliding tight against the spool rather than knot strength alone.',
    howTo: [
      'Wrap the line around the reel spool.',
      'Tie an overhand knot with the tag end around the standing line.',
      'Tie a second overhand knot with the tag end around itself, further along.',
      'Pull the standing line — the first knot slides down to the spool.',
      'The second overhand knot acts as a stopper, preventing the first from slipping.',
      'Trim the tag end.',
    ],
    tips: [
      'The knot strength doesn\'t matter — it\'s the friction on the spool that holds.',
      'Make sure the backing lays flat on the spool for even winding.',
      'Used for both fly reels and spinning reels.',
    ],
    svg: `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <!-- Reel spool -->
      <circle cx="110" cy="110" r="70" fill="none" stroke="#78716c" stroke-width="3"/>
      <circle cx="110" cy="110" r="15" fill="#78716c"/>
      <text x="140" y="40" font-size="11" fill="#78716c">Reel Spool</text>
      <!-- Line around spool -->
      <path d="M40 110 Q110 40 180 110" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <!-- Overhand knot 1 -->
      <ellipse cx="95" cy="125" rx="10" ry="8" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <text x="60" y="145" font-size="9" fill="#f59e0b">1st knot</text>
      <!-- Overhand knot 2 (stopper) -->
      <ellipse cx="65" cy="155" rx="10" ry="8" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="35" y="175" font-size="9" fill="#dc2626">Stopper</text>
      <!-- Standing line -->
      <line x1="40" y1="110" x2="10" y2="110" stroke="#6b7280" stroke-width="2.5"/>
      <text x="5" y="100" font-size="10" fill="#6b7280">To Reel</text>
      <!-- Tag end -->
      <path d="M65 155 L50 180" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="20" y="190" font-size="9" fill="#f59e0b">Tag End</text>
    </svg>`,
  },
  {
    id: 'fg-uni',
    name: 'FG Uni Combo',
    category: 'specialist',
    difficulty: 'advanced',
    strength: 92,
    bestFor: ['Braid to leader', 'Versatile connection', 'All conditions'],
    description: 'The FG Uni Combo combines the FG Knot\'s weaving grip with a Uni Knot finish for a braid-to-leader connection that\'s easier to tie than a full FG but stronger than a standalone Uni. A practical compromise for real-world conditions.',
    howTo: [
      'Hold the leader taut and weave the braid over and under — 15-20 times.',
      'After weaving, tie a Uni Knot with the braid tag end around the leader.',
      'Tighten the Uni to lock the wraps in place.',
      'Trim the leader tag end close.',
      'Tie 2 half-hitches with the braid to finish.',
      'Pull test to confirm the knot holds.',
    ],
    tips: [
      'Fewer weaves than a full FG but still very strong.',
      'The Uni finish is more forgiving than the standard FG half-hitch finish.',
      'Good all-rounder for boat and shore fishing.',
    ],
    svg: `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <!-- Leader -->
      <line x1="10" y1="90" x2="270" y2="90" stroke="#78716c" stroke-width="3"/>
      <text x="15" y="80" font-size="11" fill="#78716c">Leader</text>
      <!-- Braid weaves -->
      <path d="M60 90 Q75 70 90 90 Q105 110 120 90 Q135 70 150 90 Q165 110 180 90" fill="none" stroke="#0ea5e9" stroke-width="2"/>
      <text x="80" y="60" font-size="10" fill="#0ea5e9">15-20 weaves</text>
      <!-- Uni finish -->
      <ellipse cx="210" cy="90" rx="20" ry="15" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="200" y="125" font-size="10" fill="#f59e0b">Uni Finish</text>
      <!-- Half hitches -->
      <ellipse cx="245" cy="90" rx="8" ry="12" fill="none" stroke="#7c3aed" stroke-width="2"/>
      <ellipse cx="262" cy="90" rx="8" ry="12" fill="none" stroke="#7c3aed" stroke-width="2"/>
      <!-- Braid standing -->
      <line x1="10" y1="90" x2="60" y2="90" stroke="#0ea5e9" stroke-width="2"/>
      <text x="15" y="105" font-size="11" fill="#0ea5e9">Braid</text>
      <!-- Tag -->
      <path d="M180 90 L170 120" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="140" y="135" font-size="9" fill="#f59e0b">Trim leader tag</text>
    </svg>`,
  },
  {
    id: 'dropper-loop',
    name: 'Dropper Loop',
    category: 'specialist',
    difficulty: 'intermediate',
    strength: 85,
    bestFor: ['Adding hooks mid-line', 'Paternoster rigs', 'Multi-hook setups'],
    description: 'The Dropper Loop creates a fixed loop at any point along a line without cutting it — essential for building paternoster rigs and multi-hook setups. The loop stands out at 90° from the main line, perfect for suspending hooks or beads.',
    howTo: [
      'Form a loop in the line where you want the dropper.',
      'Hold the loop open and wrap one side around the other — 5-7 times.',
      'Thread the original loop through the gap formed in the center of the wraps.',
      'Moisten and pull both standing lines to tighten.',
      'The loop should stand out at 90° from the main line.',
    ],
    tips: [
      'Critical: the loop must pass through the center of the wraps.',
      'Used on every paternoster rig in UK sea fishing.',
      'Can also be used for attaching beads and sequins to attract fish.',
    ],
    svg: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <!-- Main line -->
      <line x1="100" y1="10" x2="100" y2="230" stroke="#6b7280" stroke-width="2.5"/>
      <text x="112" y="30" font-size="11" fill="#6b7280">Main Line</text>
      <!-- Wraps -->
      <ellipse cx="100" cy="120" rx="8" ry="8" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="100" cy="140" rx="8" ry="8" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="100" cy="160" rx="8" ry="8" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="115" y="145" font-size="10" fill="#0ea5e9">5-7 wraps</text>
      <!-- Loop -->
      <ellipse cx="100" cy="120" rx="35" ry="15" fill="none" stroke="#f59e0b" stroke-width="2.5" transform="rotate(-20 100 120)"/>
      <text x="40" y="115" font-size="10" fill="#f59e0b">Dropper Loop</text>
      <!-- Hook -->
      <path d="M65 110 Q55 100 50 110 Q50 120 60 115" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="30" y="100" font-size="10" fill="#dc2626">Hook</text>
    </svg>`,
  },
];

export const KNOT_CATEGORIES: Record<string, string> = {
  'hook-to-line': 'Hook to Line',
  'line-to-line': 'Line to Line',
  'loop-knots': 'Loop Knots',
  specialist: 'Specialist',
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};
