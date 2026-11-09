import {
  Project,
  SkillCategory,
  ExperienceItem,
  TimelineItem,
  Certification,
  StatItem,
} from './types';

// ---------------------------------------------------------------------------
// PROJECTS — every entry below is work that exists on disk right now.
// Nothing here is a placeholder: if an entry has no public link, it is because
// the source is local/private, not because it does not exist.
// ---------------------------------------------------------------------------
export const PROJECTS: Project[] = [
  {
    id: 'portfolio',
    title: 'This Portfolio',
    tagline: 'Static Next.js site, keyboard-driven, zero backend',
    category: 'Frontend & Interaction',
    description:
      'The site you are reading. A Next.js 14 App Router build with TypeScript strict mode, a mechanical-keyboard skill selector that synthesises its own key sounds with the Web Audio API, and no database at all — it compiles to static HTML and ships from Vercel.',
    architecture: [
      'Next.js 14 App Router, TypeScript strict, every section a client component with its own scoped CSS',
      'Web Audio API synthesises the keypress "thock" from filtered noise plus a pitch-swept oscillator — no audio files',
      'No API routes, no environment variables: the whole site is prerendered and served statically',
    ],
    metrics: [
      { label: 'Framework', value: 'Next.js 14' },
      { label: 'First Load JS', value: '131 kB' },
      { label: 'Backend', value: 'None (static)' },
    ],
    tags: ['Next.js 14', 'TypeScript', 'CSS', 'Web Audio API', 'Vercel'],
    demo_url: 'https://adamnaeman.vercel.app',
    github_url: 'https://github.com/adamnaemman/adamnaeman',
    image_url: '/projects/portfolio.webp',
    status: 'Live',
  },
  {
    id: 'bagsense',
    title: 'BagSense',
    tagline: 'Parametric 3D bag model built from a hand sketch',
    category: 'Final-Year Project',
    description:
      'Final-year project: a smart roll-top backpack with an e-paper status panel. The bag is modelled parametrically in headless Blender from Python — one dimension dictionary drives every panel, strap and buckle — so a sketch change becomes a model and a render set without touching geometry by hand.',
    architecture: [
      'Headless Blender + bpy: dimension dictionary (width, depth, height, flap, strap, pocket) drives all geometry',
      'Sketch-to-model pipeline in three passes: write down what the sketch shows, build the model, render front / side / back views',
      'Separate exploded scene for the ESP32 + e-paper hardware concept so electronics placement can be argued in 3D',
    ],
    metrics: [
      { label: 'Built with', value: 'Python + bpy' },
      { label: 'Pipeline', value: 'sketch → mesh → render' },
      { label: 'Status', value: 'In progress (FYP)' },
    ],
    tags: ['Blender', 'Python', 'ESP32', 'E-paper', 'Product design'],
    image_url: '/projects/bagsense.webp',
    status: 'In progress',
  },
  {
    id: 'dgca',
    title: 'DGCA Meme Sentiment',
    tagline: 'Paper reimplementation: dimension-wise gated cross-attention',
    category: 'NLP & Multimodal',
    description:
      'A PyTorch reimplementation of "Dimension-Wise Gated Cross-Attention for Multimodal Sentiment Analysis" (Hossain et al., WWW Companion 2025), trained on the Memotion 2020 meme dataset — text and image encoded separately, then fused through gated cross-attention per sentiment dimension.',
    architecture: [
      'BERT text encoder and ResNet50 image encoder, both fine-tuned, feeding a cross-attention fusion block',
      'Per-dimension gating so each sentiment axis (funny, offensive, motivation) can weight the modalities differently',
      'Grad-CAM and gating-weight plots plus a Gradio demo for single-meme inference',
    ],
    metrics: [
      { label: 'Framework', value: 'PyTorch' },
      { label: 'Encoders', value: 'BERT + ResNet50' },
      { label: 'Dataset', value: 'Memotion 2020' },
    ],
    tags: ['Python', 'PyTorch', 'BERT', 'ResNet50', 'Gradio'],
    image_url: '/projects/dgca.webp',
    status: 'Coursework',
  },
  {
    id: 'paddy',
    title: 'Paddy Disease App',
    tagline: 'Leaf image classifier with a React front end',
    category: 'Machine Learning',
    description:
      'Rice-leaf disease classification trained on the Kaggle paddy disease dataset, wrapped in a React 19 + Vite web app: upload a leaf photo, get the predicted disease class, with Gemini writing the plain-language explanation and Firebase handling storage.',
    architecture: [
      'Image classification on the paddy disease dataset (train/test image folders plus label CSV)',
      'React 19 + Vite front end built with npm, deployed as a static bundle',
      'Firebase for storage and the Gemini API (@google/generative-ai) for the explanation layer',
    ],
    metrics: [
      { label: 'Frontend', value: 'React 19 + Vite' },
      { label: 'Services', value: 'Firebase + Gemini' },
      { label: 'Task', value: 'Leaf disease classification' },
    ],
    tags: ['Python', 'React 19', 'Vite', 'Firebase', 'Gemini API'],
    image_url: '/projects/paddy.webp',
    status: 'Coursework',
  },
  {
    id: 'garden',
    title: 'Cozy Garden Town',
    tagline: 'Godot walk-around town with a Blender-built mesh',
    category: 'Game Development',
    description:
      'A small cozy town prototype in Godot 4.6: a Blender-built town (1,142 mesh objects) exported to glTF and walked around by a player character, kept deliberately tiny — two hours a week, no combat, three or four NPCs to talk to.',
    architecture: [
      'Blender scene assembled and exported as a single glTF, then imported into Godot as one town scene',
      'Godot 4.6 player controller with a top-down camera traversing the 3D town',
      'Headless self-test scene plus a verify script so every stage can be proven without opening the editor',
    ],
    metrics: [
      { label: 'Engine', value: 'Godot 4.6.2' },
      { label: 'Town mesh', value: '1,142 objects' },
      { label: 'Status', value: 'Prototype' },
    ],
    tags: ['Godot', 'GDScript', 'Blender', 'glTF'],
    image_url: '/projects/garden.webp',
    status: 'Prototype',
  },
  {
    id: 'timerush',
    title: 'TimeRush',
    tagline: 'ESP32 line-following robot with a PID steering loop',
    category: 'Hardware & Embedded',
    description:
      'A two-wheel robot that follows a line using five IR sensors and a PID loop, built on an ESP32 with two ESCs. The steering error is computed from the sensor array and fed through tuned Kp / Kd gains, with the speed envelope clamped to the ESC calibration so the motors never jitter at neutral.',
    architecture: [
      'Five-sensor IR array (far left → far right) produces a weighted line error each loop',
      'PID controller (Kp 14, Kd 10) converts that error into left/right ESC speed offsets',
      'Speed envelope clamped to the ESC neutral point (1500 µs) so "stop" stays a real stop',
    ],
    metrics: [
      { label: 'Board', value: 'ESP32' },
      { label: 'Control', value: 'PID' },
      { label: 'Sensors', value: '5 × IR' },
    ],
    tags: ['C++', 'ESP32', 'Arduino', 'PID', 'Robotics'],
    image_url: '/projects/timerush-card.webp',
    status: 'Hardware build',
  },
];

// Kept as an alias so existing imports keep working.
export const INITIAL_PROJECTS = PROJECTS;

// ---------------------------------------------------------------------------
// SKILLS
// ---------------------------------------------------------------------------
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Web Frontend',
    icon: 'Layout',
    skills: [
      { name: 'React / Next.js', level: 80 },
      { name: 'TypeScript', level: 75 },
      { name: 'CSS Architecture & Layout', level: 85 },
      { name: 'UI Interaction & Motion', level: 75 },
    ],
  },
  {
    title: 'Python & Machine Learning',
    icon: 'Database',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'PyTorch', level: 70 },
      { name: 'Data Preparation & Evaluation', level: 70 },
      { name: 'Blender / bpy Scripting', level: 80 },
    ],
  },
  {
    title: 'Games & Hardware',
    icon: 'Cloud',
    skills: [
      { name: 'Godot & GDScript', level: 65 },
      { name: 'glTF Pipeline (Blender → Engine)', level: 70 },
      { name: 'ESP32 / Arduino (C++)', level: 70 },
      { name: 'Git & Version Control', level: 80 },
    ],
  },
];

// ---------------------------------------------------------------------------
// EXPERIENCE — no invented employers. Only work that can be opened on disk.
// ---------------------------------------------------------------------------
export const EXPERIENCES: ExperienceItem[] = [
  {
    period: 'Now',
    role: 'Final-Year Project — BagSense',
    company: 'University project',
    description:
      'Modelling a smart roll-top bag parametrically in Blender from a hand sketch, with an ESP32 and e-paper hardware concept and a repeatable sketch → model → render pipeline.',
    tags: ['Blender', 'Python', 'ESP32', 'Product design'],
  },
  {
    period: 'Now',
    role: 'Self-directed software builds',
    company: 'Independent',
    description:
      'This portfolio, a local desktop dashboard, a Godot game prototype and agent tooling — each with its own verification script instead of a claim that it works.',
    tags: ['Next.js', 'TypeScript', 'Godot', 'Python'],
  },
  {
    period: 'Coursework',
    role: 'Machine Learning & NLP',
    company: 'University coursework',
    description:
      'Paddy leaf disease classification with a React web front end, and a PyTorch reimplementation of a 2025 multimodal sentiment paper on the Memotion dataset.',
    tags: ['PyTorch', 'BERT', 'React', 'Firebase'],
  },
  {
    period: 'Earlier',
    role: 'Hardware & design',
    company: 'TimeRush',
    description:
      'ESP32 line-following robot with a PID steering loop, plus the team identity and livery designed in Illustrator.',
    tags: ['C++', 'ESP32', 'PID', 'Illustrator'],
  },
];

export const STATS: StatItem[] = [
  { value: '6', label: 'Projects written up', subtext: 'Every one with real source behind it' },
  { value: '0', label: 'Placeholder case studies', subtext: 'No invented clients, no stock metrics' },
  { value: '100%', label: 'Static deploy', subtext: 'No database, no API routes, nothing to leak' },
  { value: '2', label: 'Disciplines', subtext: 'Software engineering and 3D / design' },
];

// ---------------------------------------------------------------------------
// BACKGROUND — timeline and learning, no fabricated employers or credentials
// ---------------------------------------------------------------------------
export const TIMELINE: TimelineItem[] = [
  {
    id: 'timeline-1',
    period: 'NOW',
    role: 'Final-Year Project — BagSense',
    company: 'University · Final year',
    location: 'Malaysia',
    badge: 'IN PROGRESS',
    description:
      'A smart roll-top backpack concept: parametric geometry driven by a dimension dictionary, plus the electronics layout for an ESP32 and e-paper status panel.',
    achievements: [
      'Built the bag parametrically in headless Blender from Python, so one dimension dictionary changes every panel, strap and buckle at once.',
      'Wrote the sketch reading down first — front, side and back views, including what the drawing does not show — before touching geometry.',
      'Rendered front, side and back views plus an exploded hardware scene to check component placement.',
    ],
    techStack: ['Blender', 'Python / bpy', 'ESP32', 'E-paper'],
  },
  {
    id: 'timeline-2',
    period: 'ONGOING',
    role: 'Self-Directed Software Builds',
    company: 'Independent',
    location: 'Malaysia',
    badge: 'SELF-TAUGHT',
    description:
      'The portfolio you are reading, a local desktop dashboard, a Godot game prototype and small automation tools — built and verified on my own hardware.',
    achievements: [
      'Shipped this portfolio as a static Next.js build on Vercel: 131 kB first load, no backend, no environment variables.',
      'Removed a dead Supabase backend rather than leave a contact form that silently dropped messages.',
      'Built a keyboard-driven interaction layer that synthesises key sounds with the Web Audio API instead of shipping audio files.',
    ],
    techStack: ['Next.js', 'TypeScript', 'CSS', 'Web Audio API', 'Vercel'],
  },
  {
    id: 'timeline-3',
    period: 'COURSEWORK',
    role: 'Machine Learning & NLP',
    company: 'University coursework',
    location: 'Malaysia',
    badge: 'ACADEMIC',
    description:
      'Image classification and multimodal sentiment: one project trains a classifier on the paddy disease dataset and ships it behind a React app, the other reimplements a 2025 paper in PyTorch.',
    achievements: [
      'Paddy leaf disease classification paired with a React 19 + Vite front end, Firebase storage and a Gemini explanation layer.',
      'Reimplemented dimension-wise gated cross-attention (WWW Companion 2025) on Memotion 2020 with BERT + ResNet50 encoders.',
      'Added Grad-CAM and gating-weight visualisation so the model can be inspected instead of just scored.',
    ],
    techStack: ['Python', 'PyTorch', 'BERT', 'React 19', 'Firebase'],
  },
  {
    id: 'timeline-4',
    period: 'EARLIER',
    role: 'Hardware & Design',
    company: 'TimeRush',
    location: 'Malaysia',
    badge: 'HARDWARE',
    description:
      'A line-following robot built on an ESP32 with a five-sensor array and a PID steering loop, alongside the team identity designed in Illustrator.',
    achievements: [
      'Tuned Kp / Kd on a five-sensor array and clamped the speed envelope to the ESC calibration so neutral really means stop.',
      'Iterated the robot across several sketch revisions, keeping each working version instead of overwriting it.',
      'Designed the team identity and livery in Illustrator.',
    ],
    techStack: ['C++', 'ESP32', 'Arduino', 'PID', 'Illustrator'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    name: 'DataCamp — self-paced data courses',
    issuer: 'DataCamp',
    date: 'Ongoing',
    verificationBadge: 'COURSEWORK',
    description: 'Self-paced data analysis and Python exercises alongside university work.',
  },
  {
    id: 'cert-2',
    name: 'Machine Learning coursework',
    issuer: 'University',
    date: 'Ongoing',
    verificationBadge: 'COURSEWORK',
    description: 'Classification, evaluation and model inspection, applied to the paddy disease dataset.',
  },
  {
    id: 'cert-3',
    name: 'Natural Language Processing coursework',
    issuer: 'University',
    date: 'Ongoing',
    verificationBadge: 'COURSEWORK',
    description: 'Transformer encoders, multimodal fusion and a paper reimplementation in PyTorch.',
  },
  {
    id: 'cert-4',
    name: 'Operating Systems coursework',
    issuer: 'University',
    date: 'Ongoing',
    verificationBadge: 'COURSEWORK',
    description: 'Processes, memory and scheduling work done as part of the degree.',
  },
];
