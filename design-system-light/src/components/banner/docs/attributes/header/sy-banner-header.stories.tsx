import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BannerHeader } from '../../sy-banner.main';
import bannerMeta from '../../sy-banner.stories';

const meta: Meta = {
  title: 'BannerMessage/Attributes/Header',
  component: 'sy-banner-message',
  tags: [],
  render: (args) => BannerHeader(args as { header: string }),
  argTypes: { header: bannerMeta?.argTypes?.header },
  args: { header: 'Banner Title' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
