/* eslint-disable @typescript-eslint/no-explicit-any */
import { refreshPosts } from '@/data/post/server';
import { withAuth } from '@/utils/revalidate/auth';
import { NextResponse } from 'next/server';

export const POST = withAuth(async () => {
  try {
    await refreshPosts();
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 201
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ success: false, message: error.message || error }), {
      status: 500
    });
  }
});

// BE CMS Call
// const svc = new JwtAuthService({
//   secret: process.env.REVALIDATE_SECRET!,
//   issuer: process.env.REVALIDATE_ISS ?? 'csm-service',
//   audience: process.env.REVALIDATE_AUD ?? 'nextjs-revalidate',
// });

// export async function notifyNext(postId: string) {
//   const nonce = uuidv4();
//   const now = Date.now();
//   const token = svc.sign({ nonce, ts: now, sub: 'post-update' }, 60 * 3); // 3 minutes

//   const res = await fetch(process.env.NEXT_URL + '/api/revalidate', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//     body: JSON.stringify({ id: postId, invalidate: ['post', 'list'], ts: now }),
//   });
// }
