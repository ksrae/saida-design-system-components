import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'synergy',
  tsconfig: 'tsconfig.build.json',
  plugins: [
    sass({
    })
  ],
  sourceMap: false, 
  globalStyle: 'src/assets/style/global.scss',
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'assets/style', dest: 'assets/style' }
      ],

    },
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      copy: [
        {
          src: '../custom-elements',
          dest: 'components',
          warn: true,
        },
      ],
      externalRuntime: false,
      generateTypeDeclarations: true
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    }
  ],

  testing: {
    browserHeadless: "shell",
  },
};
