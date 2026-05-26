import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPayload } from '@/lib/payload';

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const collection = searchParams.get('collection') ?? 'articles';

  const payload = await getPayload();
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) return new Response('Unauthorized', { status: 401 });

  const draft = await draftMode();
  draft.enable();

  if (!slug) redirect('/');
  if (collection === 'projects') redirect(`/projects/${slug}`);
  redirect(`/blog/${slug}`);
}
