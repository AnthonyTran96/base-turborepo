import preset from '@repo/tailwind-config/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx,scss}']
};
