import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'design-system-light',
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/assets/style/global/_font.scss'
      ],
      includePaths: ['src/assets/style/theme']
    })
  ],
  globalStyle: 'src/assets/style/global.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'assets/style', dest: 'assets/style' }, // 스타일 폴더를 dist의 style로 복사
      ],
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
