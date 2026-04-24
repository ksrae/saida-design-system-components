import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BannerShowIcon } from '../../sy-banner.main';
import bannerMeta from '../../sy-banner.stories';

const meta: Meta = {
  title: 'BannerMessage/Attributes/Show Icon',
  component: 'sy-banner-message',
  tags: [],
  render: (args) => BannerShowIcon(args as { showIcon: boolean }),
  argTypes: { showIcon: bannerMeta?.argTypes?.showIcon },
  args: { showIcon: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
