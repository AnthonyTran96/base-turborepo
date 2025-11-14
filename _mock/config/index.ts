import { MockApiConfig } from '@/types';
import { mockAuthApis } from './auth';
import { mockPostApis } from './post';

const mockConfig: MockApiConfig[] = [
  {
    url: '/getData/:id1/:id2',
    method: 'get',
    handler: (_, query, params) => {
      return { message: 'This is a GET request with queries and params', query, params };
    }
  },
  {
    url: '/postData',
    method: 'post',
    handler: (body) => {
      return { message: 'This is a POST request with body', data: body };
    }
  },
  // Thêm các endpoint ở đây
  ...mockAuthApis,
  ...mockPostApis
];

export default mockConfig;
