/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module '*.svg' {
  import type * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default ReactComponent; // SVGR component
}

declare module '*.svg?url' {
  const src: import('next/image').StaticImageData;
  export default src;
}
