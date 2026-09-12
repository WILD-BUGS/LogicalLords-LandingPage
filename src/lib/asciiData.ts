import { Project, Founder, Capability, ProcessStep } from '../types';

export const ASCII_CHARS = '0123456789.:/\\+-*#%░▒▓█';

export const CAPABILITIES: Capability[] = [
  {
    id: 'product-engineering',
    number: '01',
    title: 'PRODUCT ENGINEERING',
    subtext: 'IDEA → PRODUCT → SCALE',
    description: 'Translating zero-to-one problem spaces into hardened production systems. Architecture without dogma, rapid prototyping without technical debt.',
    tags: ['Distributed Systems', 'Domain-Driven Design', 'Zero-To-One', 'Event Sourcing'],
    iconName: 'Cpu'
  },
  {
    id: 'web-development',
    number: '02',
    title: 'WEB DEVELOPMENT',
    subtext: 'MODERN. FAST. MEANINGFUL.',
    description: 'Next-generation web applications running with sub-100ms response times, custom WebGL/WebGPU shaders, micro-frontends, and accessible semantic markup.',
    tags: ['React 19 / Next.js', 'WebGL / Three.js', 'Edge Rendering', 'PWA'],
    iconName: 'Globe'
  },
  {
    id: 'mobile-applications',
    number: '03',
    title: 'MOBILE APPLICATIONS',
    subtext: 'NATIVE & CROSS-PLATFORM',
    description: 'Tactile, gesture-driven mobile surfaces that feel like physical instruments. Offline-first synchronization, high frame-rate native graphics, and hardware telemetry.',
    tags: ['iOS & Android', 'Offline First', 'Gesture Engines', 'BLE / Sensor I/O'],
    iconName: 'Smartphone'
  },
  {
    id: 'ai-and-data',
    number: '04',
    title: 'AI & DATA',
    subtext: 'INTELLIGENCE IN PRACTICE',
    description: 'Pragmatic machine intelligence: high-throughput embeddings, agentic pipelines, RAG with strict factual grounding, and local quantized model inference.',
    tags: ['LLM Orchestration', 'Vector Indexing', 'Multi-Agent Workflows', 'Local Inference'],
    iconName: 'Binary'
  },
  {
    id: 'systems-and-cloud',
    number: '05',
    title: 'SYSTEMS & CLOUD',
    subtext: 'SCALABLE. RELIABLE. SECURE.',
    description: 'Resilient multi-cloud topologies, immutable infrastructure as code, deterministic deployment pipelines, and sub-millisecond database caching tiers.',
    tags: ['Kubernetes / Nomad', 'Terraform', 'Observability', 'Multi-Region Mesh'],
    iconName: 'Layers'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'nexus',
    number: '01',
    name: 'NEXUS',
    tagline: 'An intelligent workspace for modern teams.',
    description: 'A multi-modal workspace uniting real-time canvas collaboration, neural semantic knowledge indexing, and context-aware copilots for high-velocity engineering squads.',
    categories: ['WEB', 'AI', 'PRODUCT'],
    year: '2025',
    metrics: [
      { label: 'Sync Latency', value: '< 18ms' },
      { label: 'Active Orgs', value: '420+' },
      { label: 'Throughput', value: '1.2B ops/mo' }
    ],
    stack: ['React', 'WebSockets', 'VectorDB', 'Rust Engine', 'CRDTs'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    asciiArt: `  _  _ _____  ___   _ ___ 
 | \\| | __\\ \\/ / | | / __|
 | .\` | _| >  <| |_| \\__ \\
 |_|\\_|___/_/\\_\\\\___/|___/`
  },
  {
    id: 'wildbugs',
    number: '02',
    name: 'WILDBUGS',
    tagline: 'Turn testing chaos into clarity.',
    description: 'Autonomous chaos engineering and visual regression suite that simulates unpredictable distributed edge failures before they reach production users.',
    categories: ['DEVTOOLS', 'WEB', 'AI'],
    year: '2025',
    metrics: [
      { label: 'False Positives', value: '0.02%' },
      { label: 'Regression Catch', value: '99.4%' },
      { label: 'Test Time', value: '-68%' }
    ],
    stack: ['TypeScript', 'Puppeteer Cluster', 'Computer Vision', 'Go Workers'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    asciiArt: ` __      _____ _    ___  ___ _   _  ___ ___ 
 \\ \\    / /_ _| |  |   \\| _ ) | | |/ __/ __|
  \\ \\/\\/ / | || |__| |) | _ \\ |_| | (_ \\__ \\
   \\_/\\_/ |___|____|___/|___/\\___/ \\___|___/`
  },
  {
    id: 'orbit',
    number: '03',
    name: 'ORBIT',
    tagline: 'A unified platform for creators.',
    description: 'Cross-platform mobile and desktop suite with hardware-accelerated audio processing, spatial media distribution, and peer-to-peer monetization rails.',
    categories: ['MOBILE', 'CLOUD', 'PRODUCT'],
    year: '2024',
    metrics: [
      { label: 'Frame Rate', value: '120 FPS' },
      { label: 'Audio Engine', value: '32-bit DSP' },
      { label: 'Creators', value: '85k+' }
    ],
    stack: ['Swift', 'Kotlin Multiplatform', 'Metal / Vulkan', 'WebRTC Mesh'],
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
    asciiArt: `   ___  ___ ___ ___ _____ 
  / _ \\| _ \\ _ )_ _|_   _|
 | (_) |   / _ \\| |  | |  
  \\___/|_|_\\___/___| |_|  `
  },
  {
    id: 'kairos',
    number: '04',
    name: 'KAIROS',
    tagline: 'Time well engineered.',
    description: 'High-frequency telemetry aggregation and cognitive calendar optimization for deep-work focus periods, eliminating calendar fragmentation.',
    categories: ['AI', 'SYSTEMS', 'PRODUCT'],
    year: '2024',
    metrics: [
      { label: 'Focus Time Gained', value: '+4.2 hrs/wk' },
      { label: 'Context Switches', value: '-47%' },
      { label: 'Uptime', value: '99.999%' }
    ],
    stack: ['Python', 'TimeScaleDB', 'FastAPI', 'Edge Compute', 'Wasm'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    asciiArt: `  _  __   _   ___ ___   ___  ___ 
 | |/ /  /_\\ |_ _| _ \\ / _ \\/ __|
 | ' <  / _ \\ | ||   /| (_) \\__ \\
 |_|\\_\\/_/ \\_\\___|_|_\\ \\___/|___/`
  }
];

export const FOUNDERS: Founder[] = [
  {
    id: 'varunraj',
    number: '01',
    codename: 'VOLT',
    realName: 'VarunRaj P',
    role: 'PRODUCT & SYSTEM ARCHITECTURE',
    superpower: 'Quantum Blueprinting: Turns high-stakes ambiguous visions into resilient, zero-to-one software engines.',
    quote: 'Build what commands the future.',
    bio: 'The visionary architect of Logical Lords. VarunRaj commands end-to-end product architecture, aligning deep engineering execution with bold technical direction to build systems that scale effortlessly.',
    accentColor: '#FF3030',
    accentBg: 'rgba(255, 48, 48, 0.15)',
    panelTilt: '-rotate-1',
    heroGear: 'Overclocked Neural Core & Kinetic HUD',
    specialties: ['Product Vision', 'System Topology', 'High-Stakes Architecture', 'Zero-to-One Strategy'],
    stats: { power: 97, vision: 99, velocity: 92, chaos: 45 },
    comicIssue: '#01: THE FIRST PROTOCOL'
  },
  {
    id: 'vijaykumar',
    number: '02',
    codename: 'CIPHER',
    realName: 'Vijay Kumar K',
    role: 'FULL STACK & RUNTIME SYSTEMS',
    superpower: 'Algorithmic Transmutation: Deconstructs complex business logic into lightning-fast, modular production code.',
    quote: 'Code with precision, ship without compromise.',
    bio: 'The master systems builder. Vijay Kumar bridges low-level high-throughput backends with reactive, micro-tuned web runtimes, eliminating technical debt before it can materialize.',
    accentColor: '#00E5FF',
    accentBg: 'rgba(0, 229, 255, 0.15)',
    panelTilt: 'rotate-1',
    heroGear: 'Sub-Atomic Compiler & Binary Gauntlet',
    specialties: ['Full-Stack Synthesis', 'Distributed State', 'Reactive Kernels', 'Sub-millisecond Runtimes'],
    stats: { power: 94, vision: 91, velocity: 98, chaos: 55 },
    comicIssue: '#02: CORE MATRIX'
  },
  {
    id: 'sudharsan',
    number: '03',
    codename: 'NOVA',
    realName: 'Sudharsan C',
    role: 'AI & INTELLIGENT SYSTEMS',
    superpower: 'Cosmic Pattern Sight: Extracts latent intelligence across high-dimensional models and massive data streams.',
    quote: 'Intelligence begins where assumptions end.',
    bio: 'The machine learning and intelligence specialist. Sudharsan designs neural pipelines, agentic orchestration layers, and factual retrieval architectures that turn raw data into decisive automated cognition.',
    accentColor: '#238BFF',
    accentBg: 'rgba(35, 139, 255, 0.15)',
    panelTilt: '-rotate-2',
    heroGear: 'Neural Tensor Matrix & Hyperdimensional Lens',
    specialties: ['Agentic Workflows', 'Vector Mathematics', 'Deep Learning', 'Autonomous Intelligence'],
    stats: { power: 96, vision: 97, velocity: 88, chaos: 50 },
    comicIssue: '#03: SYNAPSE IGNITION'
  },
  {
    id: 'vignesh',
    number: '04',
    codename: 'BLAZE',
    realName: 'Vignesh R',
    role: 'MOBILE & HIGH-FPS SURFACES',
    superpower: 'Kinetic Ergonomics: Pushes pixels and native threads at blistering speeds for tactile, organic responsiveness.',
    quote: 'Software that feels alive in your hands.',
    bio: 'The tactile craftsman. Vignesh crafts fluid, gesture-driven surfaces across mobile and web with zero dropped frames, fluid micro-interactions, and hardware-accelerated rendering.',
    accentColor: '#FF5722',
    accentBg: 'rgba(255, 87, 34, 0.15)',
    panelTilt: 'rotate-2',
    heroGear: 'Kinetic Pulse Glove & Haptic Driver',
    specialties: ['Native iOS & Android', 'GPU Shaders', 'Gesture Telemetry', 'Performance Tuning'],
    stats: { power: 90, vision: 89, velocity: 99, chaos: 65 },
    comicIssue: '#04: ACCELERATION POINT'
  },
  {
    id: 'varunan',
    number: '05',
    codename: 'TITAN',
    realName: 'Varunan K M',
    role: 'SYSTEMS & CLOUD INFRASTRUCTURE',
    superpower: 'Indestructible Bastion: Keeps multi-region clusters, databases, and microservices impervious to failure.',
    quote: 'Resilience is engineered, not wished for.',
    bio: 'The bastion of Logical Lords infrastructure. Varunan constructs self-healing Kubernetes topologies, sub-millisecond edge caches, and zero-downtime deployment pipelines that withstand planetary scale traffic.',
    accentColor: '#00F5A0',
    accentBg: 'rgba(0, 245, 160, 0.15)',
    panelTilt: '-rotate-1',
    heroGear: 'Chronosphere Shield & Planetary Edge Beacon',
    specialties: ['Chaos Engineering', 'Kubernetes Mesh', 'Zero-Trust Security', 'Edge Infrastructure'],
    stats: { power: 98, vision: 93, velocity: 90, chaos: 25 },
    comicIssue: '#05: ZERO COMPROMISE'
  },
  {
    id: 'tamilselvan',
    number: '06',
    codename: 'SAGE',
    realName: 'Tamil Selvan',
    role: 'CREATIVE TECH & HUMAN EXPERIENCE',
    superpower: 'Harmonic Synthesis: Harmonizes brutal technical capability with humane, expressive, and intuitive experiences.',
    quote: 'Logic without empathy is just cold code.',
    bio: 'The empathetic bridge between technology and humanity. Tamil Selvan shapes the interactive soul of Logical Lords, ensuring every tool, interface, and protocol delivers elegance, speed, and unforgettable purpose.',
    accentColor: '#FFD700',
    accentBg: 'rgba(255, 215, 0, 0.15)',
    panelTilt: 'rotate-1',
    heroGear: 'Prismatic Spatial Loom & Cybernetic Chisel',
    specialties: ['Spatial Interfaces', 'Interaction Design', 'Micro-Typography', 'Cognitive Ergonomics'],
    stats: { power: 91, vision: 98, velocity: 93, chaos: 55 },
    comicIssue: '#06: THE LIVING CODE'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Deconstruct the First Principles',
    description: 'We interrogate assumptions, analyze latency bottlenecks, and isolate the exact core problem before writing a single line of scaffolding.'
  },
  {
    number: '02',
    title: 'DESIGN',
    subtitle: 'Architect the System & Flow',
    description: 'We map system diagrams, domain models, and high-fidelity interaction state machines with brutal aesthetic discipline.'
  },
  {
    number: '03',
    title: 'ENGINEER',
    subtitle: 'Build with Precision',
    description: 'Six specialists writing modular, type-safe, tested code. Concurrent feature execution with relentless code review standards.'
  },
  {
    number: '04',
    title: 'TEST',
    subtitle: 'Subject to Extreme Chaos',
    description: 'Automated fuzzing, simulated network partition tests, performance benchmarks, and user perception scrutiny.'
  },
  {
    number: '05',
    title: 'SHIP',
    subtitle: 'Zero-Downtime Deployment',
    description: 'Canary rollouts across edge clusters. Real-time telemetry monitoring with sub-minute rollback safeguards.'
  },
  {
    number: '06',
    title: 'EVOLVE',
    subtitle: 'Compound Into Impact',
    description: 'Software is a living organism. We iterate based on ground-truth usage telemetry and changing mission demands.'
  }
];
