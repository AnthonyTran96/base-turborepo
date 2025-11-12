/* eslint-disable turbo/no-undeclared-env-vars */
export const ENVConfig = {
  API_URL: process.env.LINK_API,
  API_PREFIX: process.env.API_PREFIX,
  LINK_CMS: process.env.LINK_CMS,
  VERSION_NAME: process.env.VERSION_NAME,
  ENV: process.env.ENV,
  SESSION_SECRET: process.env.SESSION_SECRET,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  REVALIDATE_ISS: process.env.REVALIDATE_ISS,
  REVALIDATE_AUD: process.env.REVALIDATE_AUD
};
