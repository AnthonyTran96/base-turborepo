import postServices from '@/services/post-services';
import { unstable_cache } from 'next/cache';
import { POSTS_REVALIDATE, POSTS_TAG } from '../types';

export const getPostsAction = unstable_cache(
  async () => {
    const result = await postServices.getPosts();
    if (!result.success) {
      throw new Error('Error Fetch Posts ');
    }
    return result.data || [];
  },
  [POSTS_TAG],
  { tags: [POSTS_TAG], revalidate: POSTS_REVALIDATE }
);

// simple method: cached function module-level
// export const getPostByIdAction = unstable_cache(
//   async (id: number) => {
//     const result = await postServices.getPostById(id);
//     if (!result.success) {
//       throw new Error(`Error Fetch Post with id ${id}`);
//     }
//     return result.data;
//   },
//   [],
//   { tags: [POSTS_TAG], revalidate: POSTS_REVALIDATE }
// );

// invalidate with id
export const createGetPostById = (id: number) => {
  return unstable_cache(
    async () => {
      const result = await postServices.getPostById(id);
      if (!result.success) {
        throw new Error(`Error Fetch Post with id ${id}`);
      }
      return result.data;
    },
    [`${id}`],
    { tags: [`${POSTS_TAG}:${id}`], revalidate: POSTS_REVALIDATE }
  );
};
