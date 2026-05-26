/**
 * Seed: Hyperspectral Heavy Metal Detection article.
 * Idempotent — re-running updates the existing article (matched by slug).
 *
 *   pnpm tsx scripts/seed-article-hyperspectral.ts
 */
import * as dotenv from 'dotenv';
import { getPayload } from 'payload';
import config from '../payload.config';
import { slugify } from '../lib/slug';

dotenv.config();

type LexNode = Record<string, unknown>;

const text = (value: string, format = 0): LexNode => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
});

const paragraph = (children: LexNode[]): LexNode => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  textStyle: '',
  children,
});

const heading = (tag: 'h2' | 'h3', value: string): LexNode => ({
  type: 'heading',
  tag,
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: [text(value)],
});

const list = (items: string[], variant: 'bullet' | 'number' = 'bullet'): LexNode => ({
  type: 'list',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  listType: variant,
  start: 1,
  tag: variant === 'bullet' ? 'ul' : 'ol',
  children: items.map((item, i) => ({
    type: 'listitem',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    value: i + 1,
    children: [text(item)],
  })),
});

const richText = (children: LexNode[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children,
  },
});

const TITLE =
  'Hyperspectral Heavy Metal Detection: Multiscale Spatial Deep Learning on EnMAP Satellite Imagery';
const SLUG = 'hyperspectral-heavy-metal-detection-deep-learning';

const content = richText([
  paragraph([
    text(
      'Detecting heavy metal contamination in soil from space is one of the most consequential applications of modern remote sensing. Traditional in-situ sampling is slow, expensive, and spatially sparse — making it nearly impossible to monitor pollution at the scale of mining basins, agricultural regions, or industrial corridors. ',
    ),
    text(
      'Hyperspectral satellite imagery, combined with multiscale spatial deep learning, finally changes the equation.',
      1,
    ),
  ]),
  paragraph([
    text(
      'Over the course of a two-month engineering internship at Archeon Solutions, we developed a state-of-the-art multiscale spatial deep learning network that detects soil heavy metal pollution — targeting elements such as copper (Cu) and zinc (Zn) — directly from spaceborne hyperspectral data captured by the EnMAP satellite. This article walks through the technical workflow: from raw L1A radiance data, through cascaded residual feature extraction, to attention-based spectral reweighting and transfer learning across geochemical domains.',
    ),
  ]),

  heading('h2', 'Why Hyperspectral for Soil Pollution Monitoring?'),
  paragraph([
    text(
      'Multispectral sensors like Sentinel-2 or Landsat-9 capture roughly 10–13 broad bands. They are excellent for vegetation indices and land cover, but they cannot resolve the narrow absorption features that diagnose mineralogy and trace-element chemistry. ',
    ),
    text(
      'Hyperspectral sensors capture hundreds of contiguous narrow bands, recording a near-continuous reflectance spectrum for every pixel.',
      1,
    ),
  ]),
  paragraph([
    text(
      'The EnMAP (Environmental Mapping and Analysis Program) mission, operated by DLR, delivers 242 spectral bands from 400 to 2500 nm — covering the visible, near-infrared (VNIR) and short-wave infrared (SWIR) ranges — at a 30 m ground sampling distance. This spectral richness is exactly what is required to disentangle the subtle reflectance signatures of soils contaminated with heavy metals, even when those signatures are dominated by overlapping organic, moisture, and mineral effects.',
    ),
  ]),

  heading('h2', 'Step 1 — Satellite Data Acquisition and Preprocessing'),
  paragraph([
    text(
      'We worked with L1A-level EnMAP products: raw, geometrically uncorrected radiance data with full spectral fidelity. Before any model could learn from it, we built a deterministic preprocessing pipeline:',
    ),
  ]),
  list([
    'Radiometric calibration — converting raw digital numbers to top-of-atmosphere radiance, then to surface reflectance.',
    'Cloud and shadow masking — a critical step for hyperspectral SWIR bands, which are especially sensitive to thin cirrus contamination.',
    'Bad-band removal — discarding water-vapor absorption regions (around 1400 nm and 1900 nm) that carry no usable surface information.',
    'Spatial co-registration — aligning swaths so that ground-truth sampling sites match the correct pixel coordinates.',
  ]),
  paragraph([
    text(
      'The output of this stage is a clean reflectance cube of shape (H × W × 242), ready for spatial-spectral feature extraction.',
    ),
  ]),

  heading('h2', 'Step 2 — Multiscale Spatial Network Architecture'),
  paragraph([
    text(
      'The core technical contribution is a custom PyTorch architecture designed specifically for the high-dimensional complexity of spaceborne hyperspectral data. The model rests on three pillars: a cascade structure with residual learning, a four-branch multiscale spatial module, and a channel-attention block.',
    ),
  ]),

  heading('h3', 'Cascade Structure with Residual Learning'),
  paragraph([
    text(
      'Deep networks applied to hyperspectral data often suffer from network degradation: as depth grows, training error stops decreasing because gradients fail to propagate through stacked nonlinearities. We mitigate this with a cascade of residual blocks, where each block learns a refinement on top of an identity skip connection. This preserves the spectral signal across the network and allows us to scale depth without overfitting the limited number of ground-truth samples available for heavy metal concentration.',
    ),
  ]),

  heading('h3', 'Four-Branch Multiscale Spatial Module'),
  paragraph([
    text(
      'A soil pixel rarely tells the whole story alone — surrounding texture, edges, and local context all matter. To capture features at multiple receptive fields simultaneously, the spatial module uses four parallel convolutional branches:',
    ),
  ]),
  list([
    '1×1 standard convolution — pure spectral mixing, no spatial context.',
    '3×3 standard convolution — fine local spatial structure.',
    '3×3 dilated convolution (rate 2) — medium-range spatial context without parameter blow-up.',
    '3×3 dilated convolution (rate 4) — coarse contextual cues for broader contamination plumes.',
  ]),
  paragraph([
    text(
      'Each branch produces 32-channel feature maps, which are concatenated into a dense 128-channel output. This explicit dimensionality budget keeps the parameter count tractable while preserving multiscale information — a deliberate trade-off between expressiveness and the small-data regime typical of geochemical fieldwork.',
    ),
  ]),

  heading('h3', 'Attention-Based Spectral Reweighting'),
  paragraph([
    text(
      'Not all of the 128 fused channels carry equal predictive weight for heavy metals. We integrate a channel-attention block that combines ',
    ),
    text('Global Average Pooling (GAP)', 1),
    text(' and '),
    text('Global Max Pooling (GMP)', 1),
    text(
      ' to summarize each channel by both its mean activation and its peak response. The pooled descriptors are passed through fully connected layers that compress 128 channels down to 32, mapping inter-channel correlations, before expanding back to 128 with sigmoid gating. The result is a learned per-channel weight that amplifies the spectral features most diagnostic of Cu and Zn signatures and suppresses noise from atmospheric residuals or sensor artefacts.',
    ),
  ]),

  heading('h2', 'Step 3 — Transfer Learning from Sand and Silt Datasets'),
  paragraph([
    text(
      'Heavy metal field samples are scarce. A single concentration measurement can require an ICP-MS lab run on a hand-collected core — making it impossible to train a deep network from scratch on a target like copper or zinc alone. Our solution is two-stage transfer learning:',
    ),
  ]),
  list(
    [
      'Pre-train the cascade-attention backbone on large public sand and silt spectral libraries. These datasets are abundant and teach the network the base geochemical and mineralogical features — quartz, clay minerals, iron oxides, organic content — that constrain soil reflectance.',
      'Fine-tune the final regression head on the labelled heavy metal dataset, freezing early layers and gradually unfreezing the multiscale module. This forces the network to specialize on the subtle absorption shifts induced by Cu and Zn complexation without forgetting the broader soil chemistry it has already internalized.',
    ],
    'number',
  ),
  paragraph([
    text(
      'This curriculum-style training is the single most important factor in achieving accurate predictions on regions where field samples were not available.',
    ),
  ]),

  heading('h2', 'Why This Matters Beyond Pollution Mapping'),
  paragraph([
    text(
      'The architecture is intentionally general. A multiscale spatial module with channel attention, trained with cross-domain transfer learning, is directly applicable to a broader set of earth observation and planetary exploration problems:',
    ),
  ]),
  list([
    'Mineral exploration and lithium prospecting from orbital hyperspectral data.',
    'Agricultural soil-quality monitoring at landscape scale.',
    'Mars and lunar surface characterization from CRISM, M3, or future hyperspectral missions.',
    'Coastal water quality and harmful-algal-bloom detection.',
  ]),

  heading('h2', 'What Comes Next'),
  paragraph([
    text(
      'The current model meets its detection accuracy targets on EnMAP scenes, but inference time remains the main bottleneck for operational, large-area mapping. The next phase of the project — continuing independently after the internship — focuses on architecture optimization: depthwise-separable convolutions in the multiscale branches, low-rank factorizations in the attention block, and INT8 quantization for edge inference. The goal is real-time, basin-scale heavy metal mapping from a single satellite pass.',
    ),
  ]),
  paragraph([
    text(
      'Bridging deep learning research, remote sensing, and planetary science is exactly the kind of work Archeon Solutions exists to do. If you are working on hyperspectral pipelines, environmental monitoring, or AI for earth and space — we would love to hear from you.',
    ),
  ]),
]);

const run = async (): Promise<void> => {
  const payload = await getPayload({ config });

  const category = await (async () => {
    const found = await payload.find({
      collection: 'categories',
      where: { slug: { equals: 'research' } },
      limit: 1,
    });
    if (found.docs[0]) return found.docs[0];
    return payload.create({
      collection: 'categories',
      data: { name: 'Research', slug: 'research' },
    });
  })();

  const tagNames = [
    'Hyperspectral',
    'Remote Sensing',
    'Deep Learning',
    'PyTorch',
    'Satellite Imagery',
    'EnMAP',
    'Computer Vision',
    'Earth Observation',
  ];
  const tagIds: (string | number)[] = [];
  for (const name of tagNames) {
    const slug = slugify(name);
    const found = await payload.find({
      collection: 'tags',
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const doc = found.docs[0] ?? (await payload.create({ collection: 'tags', data: { name, slug } }));
    tagIds.push(doc.id);
  }

  const project = await payload.find({
    collection: 'projects',
    where: { slug: { equals: 'hyperspectral-heavy-metal' } },
    limit: 1,
  });
  const projectId = project.docs[0]?.id;

  const data = {
    title: TITLE,
    slug: SLUG,
    excerpt:
      'How we built a multiscale spatial deep learning network in PyTorch to detect soil heavy metal contamination from EnMAP hyperspectral satellite imagery — covering preprocessing, residual cascade architecture, channel attention, and cross-domain transfer learning.',
    content,
    category: category.id,
    tags: tagIds,
    relatedProject: projectId,
    publishedAt: new Date().toISOString(),
    _status: 'published' as const,
  };

  const existing = await payload.find({
    collection: 'articles',
    where: { slug: { equals: SLUG } },
    limit: 1,
    draft: true,
  });

  if (existing.docs[0]) {
    await payload.update({
      collection: 'articles',
      id: existing.docs[0].id,
      data: data as never,
    });
    console.log(`✓ Updated article "${TITLE}"`);
  } else {
    await payload.create({ collection: 'articles', data: data as never });
    console.log(`✓ Created article "${TITLE}"`);
  }

  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
