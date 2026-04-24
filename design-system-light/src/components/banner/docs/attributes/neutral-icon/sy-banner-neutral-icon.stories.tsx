import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BannerNeutralIcon } from '../../sy-banner.main';
import bannerMeta from '../../sy-banner.stories';

const meta: Meta = {
  title: 'BannerMessage/Attributes/Neutral Icon',
  component: 'sy-banner-message',
  tags: [],
  render: (args) => BannerNeutralIcon(args as { neutralIcon: string }),
  argTypes: { neutralIcon: bannerMeta?.argTypes?.neutralIcon },
  args: { neutralIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576z"/></svg>` },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
