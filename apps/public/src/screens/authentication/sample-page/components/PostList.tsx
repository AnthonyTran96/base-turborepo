import { ROUTES } from '@/config/routes';
import { refreshPosts } from '@/data/post/server';
import { getPosts } from '@/data/post/server/cache';
import ButtonBase from '@repo/ui/button';
import { TextBase } from '@repo/ui/text';
import Link from 'next/link';

const PostList = async () => {
  const posts = await getPosts();

  return (
    <div className="mt-8">
      <ButtonBase type="primary" onClick={refreshPosts} text="Refresh Posts" />
      <div className="mt-8">
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`${ROUTES.SAMPLE_PAGE}/${post.id}`} className="hover:underline">
              <TextBase preset="title3" text={post.title} />
            </Link>
            <TextBase text={post.body} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
