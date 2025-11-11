const cmsEndPoint = {
  POSTS: '/posts'
} as const;

const configApi = () => {
  const apiOb: Record<string, string> = {};
  Object.keys(cmsEndPoint).forEach((x) => {
    const valueApi = cmsEndPoint[x as keyof typeof cmsEndPoint];
    apiOb[x] = valueApi;
  });
  return apiOb;
};

type ApiConstantsType<T> = {
  [a in keyof T]: string;
};

export const cmsApiConstants = configApi() as ApiConstantsType<typeof cmsEndPoint>;
