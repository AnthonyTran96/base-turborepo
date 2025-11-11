'use server';
import { revalidateTag } from 'next/cache';
import { POSTS_TAG } from '../types';

export const refreshPosts = async () => {
  revalidateTag(POSTS_TAG);
};

export const refreshPostWithId = async (id: number) => {
  revalidateTag(`${POSTS_TAG}:${id}`);
};
