import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BannerVariant } from '../../sy-banner.main';
import bannerMeta from '../../sy-banner.stories';

const meta: Meta = {
  title: 'BannerMessage/Attributes/Variant',
  component: 'sy-banner-message',
  tags: [],
  render: (args) => BannerVariant(args as { variant: 'info' | 'success' | 'warning' | 'error' | 'neutral' }),
  argTypes: { variant: bannerMeta?.argTypes?.variant },
  args: { variant: 'info' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
