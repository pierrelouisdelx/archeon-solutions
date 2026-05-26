import { ImageResponse } from 'next/og';
import { getArticleBySlug, getProjectBySlug } from '@/lib/content';

export const runtime = 'nodejs';
export const revalidate = 3600;

type Params = { params: Promise<{ type: string; slug: string }> };

export async function GET(_req: Request, { params }: Params): Promise<Response> {
  const { type, slug } = await params;

  let title = 'Archeon Solutions';
  let eyebrow = 'AI Engineering';

  if (type === 'projects') {
    const doc = await getProjectBySlug(slug);
    if (doc) {
      title = (doc as { title?: string }).title ?? title;
      eyebrow = (doc as { tag?: string }).tag ?? 'Project';
    }
  } else if (type === 'blog' || type === 'articles') {
    const doc = await getArticleBySlug(slug);
    if (doc) {
      title = (doc as { title?: string }).title ?? title;
      const cat = (doc as { category?: { name?: string } }).category;
      eyebrow = cat?.name ?? 'Article';
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          padding: '80px',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#60A5FA',
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 24,
          }}
        >
          <div style={{ fontWeight: 600 }}>Archeon Solutions</div>
          <div style={{ color: '#94A3B8' }}>archeon.ai</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
