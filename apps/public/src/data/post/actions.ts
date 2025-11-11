import { mutate } from 'swr';
import { initialPost, POST_KEY } from './types';

const reset = () => {
  mutate(POST_KEY, () => initialPost, false);
};

export const postActions = {
  reset
};
