import localFont from 'next/font/local';

export const roboto = localFont({
  src: [
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-Thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-ThinItalic.woff2',
      weight: '100',
      style: 'italic'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-LightItalic.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-Italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-MediumItalic.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-BoldItalic.woff2',
      weight: '700',
      style: 'italic'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-Black.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../../../../../packages/ui/src/assets/fonts/roboto/Roboto-BlackItalic.woff2',
      weight: '900',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-roboto'
});
