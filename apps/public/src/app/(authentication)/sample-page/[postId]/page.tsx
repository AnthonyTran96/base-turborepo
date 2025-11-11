import { createGetPostById, getPostsAction } from '@/data/post/server/cache';
import PostDetailPage from '@/screens/authentication/sample-page/post-detail';
import { DebugUtils } from '@repo/utils/debug-utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await getPostsAction();
  const topPosts = posts.slice(0, 15);

  return topPosts.map((post) => ({
    postId: `${post.id}`
  }));
}
// To statically render all paths the first time they're visited
// export async function generateStaticParams() {
//   return [];
// }

export async function generateMetadata({
  params
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const getPostByIdAction = createGetPostById(Number(postId));
  const post = await getPostByIdAction();
  if (!post) return notFound();

  return {
    title: post.title,
    description: post.title
  };
}

const PostDetail = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params;
  const getPostByIdAction = createGetPostById(Number(postId));
  const post = await getPostByIdAction();
  if (!post) return notFound();
  DebugUtils.logS('render post page with Id ' + postId);
  return <PostDetailPage data={post} />;
};

export default PostDetail;
