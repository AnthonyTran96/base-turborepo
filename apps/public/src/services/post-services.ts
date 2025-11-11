import { Post } from '@/model/post';
import { ApiResponse } from '@/types/common';
import { sanitizeResponse } from './networking/app-helper';
import { cmsApiConstants } from './networking/cms-apis';
import { requestCms } from './networking/cms-services';

async function getPosts(): ApiResponse<Post[] | undefined> {
  return sanitizeResponse(requestCms('get', cmsApiConstants.POSTS).catch((error) => error));
}

async function getPostById(id: number): ApiResponse<Post | undefined> {
  const url = `${cmsApiConstants.POSTS}/${id}`;
  return sanitizeResponse(requestCms('get', url).catch((error) => error));
}

const postServices = {
  getPosts,
  getPostById
};

export default postServices;
