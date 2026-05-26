/**
 * Static fallbacks used when the CMS is empty (fresh install before /admin seed).
 * Once content lives in Payload, these are bypassed automatically.
 */

export const fallbackProjects = [
  {
    id: 'fb-1',
    slug: 'hyperspectral-heavy-metal',
    tag: 'REMOTE SENSING',
    title: 'Hyperspectral Heavy Metal Detection',
    summary:
      'Built a complete pipeline for processing hyperspectral satellite imagery to detect and quantify heavy metal contamination in soil across mining regions. Achieved 94.2% detection accuracy using custom spectral unmixing algorithms.',
    metrics: [{ value: '94.2% accuracy' }, { value: '12 spectral bands' }, { value: '50km² coverage' }],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fb-2',
    slug: 'ct-super-resolution',
    tag: 'MEDICAL IMAGING',
    title: 'CT Scan Super-Resolution & Denoising',
    summary:
      'Developed a novel diffusion-based architecture for simultaneous super-resolution (4x) and denoising of low-dose CT scans, enabling diagnostic-quality images from 75% reduced radiation exposure.',
    metrics: [{ value: '4× upscale' }, { value: '75% dose reduction' }, { value: 'PSNR 38.7dB' }],
    image: '/images/denoising.webp',
  },
  {
    id: 'fb-3',
    slug: 'endometriosis-detection',
    tag: 'HEALTHCARE AI',
    title: 'Real-Time Endometriosis Detection',
    summary:
      'Deployed a real-time computer vision system for laparoscopic surgery that identifies endometriosis lesions with sub-100ms latency, assisting surgeons during live procedures.',
    metrics: [{ value: '< 100ms latency' }, { value: '91.8% sensitivity' }, { value: 'Real-time' }],
    video: '/videos/endometryosis.mp4',
  },
  {
    id: 'fb-4',
    slug: 'deepseek-inference',
    tag: 'LLM OPTIMIZATION',
    title: 'DeepSeek V3 Inference World Record',
    summary:
      'Achieved world-record throughput on DeepSeek V3 through custom CUDA kernels, int4 quantization with minimal quality loss, and a novel tensor parallelism strategy across 8-GPU clusters.',
    metrics: [{ value: 'World record' }, { value: '3.2× speedup' }, { value: '< 1% quality loss' }],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
  },
];

export const fallbackTeam = [
  {
    id: 'fb-pld',
    name: 'Pierre-Louis Delcroix',
    role: 'LLM Engineering',
    initials: 'PLD',
    bio: 'Production ML across healthcare and fintech. World-record LLM inference at 303 tokens/sec on DeepSeek R1. ML research on diffusion models for CT imaging at Siemens Healthineers.',
  },
  {
    id: 'fb-tb',
    name: 'Théo Bonzi',
    role: 'Computer Vision Engineering',
    initials: 'TB',
    bio: 'Ex-UC Berkeley research, published in astronomical ML. Edge OCR architect — 10× faster inference on CPU-only hardware. Real-time medical ultrasound AI and generative vision from R&D to production.',
  },
  {
    id: 'fb-aw',
    name: 'August Weinbren',
    role: 'Medical ML Engineering',
    initials: 'AW',
    bio: 'Doctoral researcher at UCL. ML engineer on radiotherapy optimization and medical image registration at Siemens Healthineers. LLM inference specialist with CUDA, TensorRT, and speculative decoding.',
  },
  {
    id: 'fb-jj',
    name: 'Jessup Jong',
    role: 'Geospatial AI & Remote Sensing',
    initials: 'JJ',
    bio: 'Deep learning engineer leading applied research and performance benchmarking. Computer vision on satellite imagery for geospatial asset tracking. Former ML engineer at Upstage building LLM systems.',
  },
];

export const fallbackStats = [
  { value: '1', label: 'World record · DeepSeek V3' },
  { value: '4', label: 'PhDs & research alumni' },
  { value: '10+', label: 'Tier-1 enterprise engagements' },
  { value: '2', label: 'Offices · SF · Zürich' },
];

export const fallbackServices = [
  {
    id: 'fb-cv',
    icon: 'Eye',
    title: 'Computer Vision',
    summary:
      'Production-grade vision for medical, industrial and earth-observation. Detection, segmentation, super-resolution and real-time inference on the edge.',
    span: 'md:col-span-2',
  },
  {
    id: 'fb-llm',
    icon: 'Brain',
    title: 'LLM Engineering',
    summary:
      'On-prem and air-gapped LLMs. Custom kernels, quantization, speculative decoding — the work that took us to a world record on DeepSeek V3.',
    span: 'md:col-span-2',
  },
  {
    id: 'fb-hai',
    icon: 'HeartPulse',
    title: 'Healthcare AI',
    summary:
      'Clinical-grade models with regulatory awareness. Surgical assistance, imaging and diagnostics that meet hospital reliability bars.',
    span: 'md:col-span-2',
  },
  {
    id: 'fb-fin',
    icon: 'BarChart3',
    title: 'Finance AI',
    summary:
      'Risk, alpha research and document intelligence for banks and asset managers. Models that survive compliance, audit and stress.',
    span: 'md:col-span-2',
  },
  {
    id: 'fb-rnd',
    icon: 'Microscope',
    title: 'Research & Development',
    summary:
      'Frontier research turned into deployable systems. We co-author with Berkeley, Harvard and UCL — and ship what works to your stack.',
    span: 'md:col-span-4',
  },
];

export const fallbackIndustries = [
  {
    id: 'finance',
    name: 'Banking & Finance',
    tagline: 'Regulated · On-prem · Audited',
    body:
      'We build risk engines, on-prem LLM stacks and document-intelligence systems for tier-1 banks and asset managers. Auditable from training data to inference, deployed inside your perimeter — no third-party model APIs.',
    metrics: [
      { value: '60%', label: 'Manual review reduction' },
      { value: '< 50ms', label: 'P99 inference latency' },
      { value: '0', label: 'Data leaving perimeter' },
    ],
    partners: ['JP Morgan', 'Avian'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    tagline: 'Clinical-grade · Imaging · Surgical',
    body:
      'Imaging, surgical AI and diagnostic systems built to hospital reliability bars. We have shipped real-time intra-operative vision, CT super-resolution and registration pipelines with Siemens Healthineers and academic partners.',
    metrics: [
      { value: '4×', label: 'Resolution recovery' },
      { value: '75%', label: 'Radiation dose reduction' },
      { value: '< 100ms', label: 'Surgical inference loop' },
    ],
    partners: ['Siemens Healthineers', 'UCL', 'Harvard'],
  },
  {
    id: 'industrial',
    name: 'Industrial & Public Sector',
    tagline: 'Earth obs · Sensors · Defense-adjacent',
    body:
      'Hyperspectral remote sensing, geospatial intelligence and edge vision for industrial operators and the public sector. From satellite to silicon — built where bandwidth is scarce and stakes are high.',
    metrics: [
      { value: '94.2%', label: 'Detection accuracy' },
      { value: '50 km²', label: 'Single-pass coverage' },
      { value: '12', label: 'Spectral bands fused' },
    ],
    partners: ['NVIDIA', 'Confidential'],
  },
  {
    id: 'rnd',
    name: 'R&D & Frontier Compute',
    tagline: 'Inference · Kernels · Training infra',
    body:
      'When your bottleneck is compute, we go to the metal. Custom CUDA kernels, quantization, distributed inference and training infrastructure that compounds — not slideware. Open-source contributions where it serves the work.',
    metrics: [
      { value: '3.2×', label: 'Throughput vs. baseline' },
      { value: '< 1%', label: 'Quality loss at int4' },
      { value: '#1', label: 'World ranking · DeepSeek V3' },
    ],
    partners: ['NVIDIA', 'DeepSeek'],
  },
];

export const fallbackClients = [
  { id: 'fb-siemens', name: 'Siemens Healthineers', logoUrl: '/logos/siemens-healthineers.svg', height: 28 },
  { id: 'fb-nvidia', name: 'NVIDIA', logoUrl: '/logos/nvidia.svg', height: 22 },
  { id: 'fb-avian', name: 'Avian', logoUrl: '/logos/avian.svg', height: 26 },
];

export const fallbackAffiliations = [
  { id: 'fb-berk', name: 'UC Berkeley', logoUrl: '/logos/berkeley.svg', height: 56 },
  { id: 'fb-harv', name: 'Harvard University', logoUrl: '/logos/harvard.svg', height: 56 },
  { id: 'fb-ucl', name: 'University College London', logoUrl: '/logos/ucl.svg', height: 56 },
];

export const fallbackTestimonials = [
  {
    id: 'fb-t1',
    quote:
      "Archeon's hyperspectral analysis pipeline transformed our environmental monitoring program. Their team delivered accuracy levels we didn't think were achievable with satellite data alone.",
    author: 'Dr. Elena Vasquez',
    role: 'Director of Environmental Sciences',
    company: 'GeoWatch International',
  },
  {
    id: 'fb-t2',
    quote:
      'The super-resolution model they built for our CT imaging division has meaningfully reduced radiation exposure for patients while maintaining diagnostic quality. Genuinely groundbreaking work.',
    author: 'Prof. James Whitfield',
    role: 'Chief of Radiology',
    company: 'Nordic Medical Institute',
  },
  {
    id: 'fb-t3',
    quote:
      'Working with Archeon on inference optimization was a revelation. They found performance gains our internal team had missed for months, ultimately achieving results that set an industry benchmark.',
    author: 'Kai Nakamura',
    role: 'VP of Infrastructure',
    company: 'Nexus AI Labs',
  },
];
