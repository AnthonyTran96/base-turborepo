import { fakePostDetail, fakePosts } from '@/data';
import { MockApiConfig } from '@/types';

export const mockPostApis: MockApiConfig[] = [
  {
    name: 'getPosts',
    url: '/posts',
    method: 'get',
    // status: 201,
    delay: 500,
    handler: (body) => {
      return fakePosts;
    }
  },
  {
    name: 'getPost',
    url: '/posts/:id',
    method: 'get',
    delay: 500,
    handler: (_, __, params) => {
      const post = fakePostDetail;
      post.id = Number(params.id);
      return post;
    }
  }
];
