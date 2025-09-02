import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'design-syem-light',
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/assets/style/global.scss',
        'src/assets/style/global/_font.scss'
      ]
    })
  ],
  globalStyle: 'src/assets/style/global.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
};
