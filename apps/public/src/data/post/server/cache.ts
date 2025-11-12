import postServices from '@/services/post-services';
import { buildEntityTag, createCache } from '@/utils/cache';
import { POST_WITH_ID_TAG, POSTS_REVALIDATE, POSTS_TAG } from '../types';

export const getPosts = createCache(
  POSTS_TAG,
  async () => {
    const result = await postServices.getPosts();
    if (!result.success) {
      throw new Error('Error Fetch Posts');
    }
    return result.data || [];
  },
  { tags: () => [POSTS_TAG], revalidate: POSTS_REVALIDATE }
);

export const getPostById = createCache(
  POST_WITH_ID_TAG,
  async (id: number) => {
    const result = await postServices.getPostById(id);
    if (!result.success) throw new Error(`Error fetching post ${id}`);
    return result.data;
  },
  { tags: ([id]) => [buildEntityTag(POST_WITH_ID_TAG, id)], revalidate: POSTS_REVALIDATE }
);
