import type { StorybookConfig } from '@stencil/storybook-plugin';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  // getAbsolutePath() 호출을 모두 단순 문자열로 변경합니다.
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/addon-docs",
    // 주석 처리된 부분도 문자열 형식으로 바꿔두는 것이 좋습니다.
    // '@storybook/addon-a11y',
    // '@storybook/addon-designs',
  ],
  framework: {
    name: "@stencil/storybook-plugin"
  },
  staticDirs: [{ from: '../src/assets', to: '/assets' }, './image', './style-guide'],
};

export default config;
