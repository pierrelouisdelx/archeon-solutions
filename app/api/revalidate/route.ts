import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const secret = req.headers.get('x-revalidate-secret');
  if (!process.env.REVALIDATION_SECRET || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { tags?: string[]; paths?: string[] };
  (body.tags ?? []).forEach((t) => revalidateTag(t, 'max'));
  (body.paths ?? []).forEach((p) => revalidatePath(p));
  return NextResponse.json({ ok: true });
}
