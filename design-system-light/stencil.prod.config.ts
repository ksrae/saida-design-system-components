import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['sy-input'],
    event: 'changed',
    targetAttr: 'value',
    type: 'text'
  },
  {
    elementSelectors: ['sy-input-number'],
    event: 'changed',
    targetAttr: 'value',
    type: 'number'
  },
  {
    elementSelectors: ['sy-checkbox'],
    event: 'changed',
    targetAttr: 'checked',
    type: 'boolean'
  }
];

export const config: Config = {
  namespace: 'design-system-light',
  plugins: [
    sass({
      injectGlobalPaths: [

      ],

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
      dir: 'components',
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
    },

    // ngModule
    angularOutputTarget({
      componentCorePackage: '@dc/synergy',
      outputType: 'component',
      directivesProxyFile: '../angular-library/projects/stencil-components/src/lib/components.ts',
      directivesArrayFile: '../angular-library/projects/stencil-components/src/lib/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings
    }),
    // standalone
    angularOutputTarget({
      componentCorePackage: '@dc/synergy',
      outputType: 'standalone',
      directivesProxyFile: '../angular-library/projects/stencil-standalone/src/lib/components.ts',
      directivesArrayFile: '../angular-library/projects/stencil-standalone/src/lib/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings
    }),
    // react esm
    reactOutputTarget({
      stencilPackageName: '@dc/synergy',
      outDir: '../react-library/lib/components/esm',
      esModules: true,
    }),
    // react cjs
    reactOutputTarget({
      stencilPackageName: '@dc/synergy',
      outDir: '../react-library/lib/components/cjs',
      esModules: false,
    }),
  ],

  testing: {
    browserHeadless: "shell",
  },
};
