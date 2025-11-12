/* eslint-disable @typescript-eslint/no-explicit-any */
import { refreshPosts, refreshPostWithId } from '@/data/post/server';
import postServices from '@/services/post-services';
import { withAuth } from '@/utils/revalidate/auth';
import { NextResponse } from 'next/server';

export const POST = withAuth(async (_, __, ctx) => {
  try {
    const params = await ctx?.params;
    if (!params?.postId || isNaN(Number(params.postId))) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Invalid PostId' }), {
        status: 400
      });
    }
    const result = await postServices.getPostById(Number(params.postId));
    if (!result.success) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Invalid PostId' }), {
        status: 400
      });
    }
    await Promise.all([refreshPostWithId(Number(params.postId)), refreshPosts()]);
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 201
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ success: false, message: error.message || error }), {
      status: 500
    });
  }
});
