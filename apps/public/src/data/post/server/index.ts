'use server';
import { DebugUtils } from '@repo/utils/debug-utils';
import { revalidateTag } from 'next/cache';
import { POSTS_TAG } from '../types';

export const refreshPosts = async () => {
  DebugUtils.logS('reset post list');
  revalidateTag(POSTS_TAG);
};

export const refreshPostWithId = async (id: number) => {
  DebugUtils.logS(`reset post with id ${id}`);
  revalidateTag(`${POSTS_TAG}:${id}`);
};
