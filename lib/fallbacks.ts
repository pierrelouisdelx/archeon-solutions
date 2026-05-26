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
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fb-2',
    slug: 'ct-super-resolution',
    tag: 'MEDICAL IMAGING',
    title: 'CT Scan Super-Resolution & Denoising',
    summary:
      'Developed a novel diffusion-based architecture for simultaneous super-resolution (4x) and denoising of low-dose CT scans, enabling diagnostic-quality images from 75% reduced radiation exposure.',
    metrics: [{ value: '4x upscale' }, { value: '75% dose reduction' }, { value: 'PSNR 38.7dB' }],
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
    metrics: [{ value: 'World record' }, { value: '3.2x speedup' }, { value: '< 1% quality loss' }],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
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
    bio: 'Ex-UC Berkeley research, published in astronomical ML. Edge OCR architect—10× faster inference on CPU-only hardware. Real-time medical ultrasound AI and generative vision from R&D to production.',
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
    bio: 'Deep learning engineer leading applied research and performance benchmarking. Computer vision on satellite imagery for geospatial asset tracking. Former ML engineer at Upstage building LLM systems and data-driven products.',
  },
];

export const fallbackStats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '2', label: 'Research Papers' },
  { value: '1', label: 'World Record' },
  { value: '100%', label: 'Client Retention' },
];

export const fallbackServices = [
  { id: 'fb-cv', icon: 'Eye', title: 'Computer Vision', summary: 'From object detection to image segmentation, we build production-grade vision systems for industrial, medical, and earth observation applications.', span: 'md:col-span-2' },
  { id: 'fb-llm', icon: 'Brain', title: 'LLM Optimization', summary: 'Inference acceleration, quantization, and distributed deployment strategies that push language models to their performance limits.', span: 'md:col-span-1' },
  { id: 'fb-hai', icon: 'HeartPulse', title: 'Healthcare AI', summary: 'FDA-aware AI solutions for diagnostics, surgical assistance, and medical imaging that meet the highest standards of clinical reliability.', span: 'md:col-span-1' },
  { id: 'fb-hyp', icon: 'Microscope', title: 'Hyperspectral Analysis', summary: 'Advanced spectral imaging pipelines for earth observation, mineral detection, and environmental monitoring at scale.', span: 'md:col-span-1' },
  { id: 'fb-mlo', icon: 'Cpu', title: 'MLOps & Deployment', summary: 'End-to-end ML infrastructure: from experiment tracking and model registry to scalable inference endpoints and monitoring.', span: 'md:col-span-1' },
  { id: 'fb-rnd', icon: 'BarChart3', title: 'Research & Development', summary: 'Cutting-edge research partnerships. We collaborate with institutions to bring novel AI methods from paper to production.', span: 'md:col-span-2' },
];

export const fallbackClients = [
  { id: 'fb-siemens', name: 'Siemens Healthineers', logoUrl: '/logos/siemens-healthineers.svg', height: 36 },
  { id: 'fb-nvidia', name: 'NVIDIA', logoUrl: '/logos/nvidia.svg', height: 28 },
  { id: 'fb-avian', name: 'Avian', logoUrl: '/logos/avian.svg', height: 32 },
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
