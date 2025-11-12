'use server';
import { buildEntityTag } from '@/utils/cache';
import { DebugUtils } from '@repo/utils/debug-utils';
import { revalidateTag } from 'next/cache';
import { POST_WITH_ID_TAG, POSTS_TAG } from '../types';

export const refreshPosts = async () => {
  DebugUtils.logS('reset post list');
  revalidateTag(POSTS_TAG);
};

export const refreshPostWithId = async (id: number) => {
  DebugUtils.logS(`reset post with id ${id}`);
  revalidateTag(buildEntityTag(POST_WITH_ID_TAG, id));
};
