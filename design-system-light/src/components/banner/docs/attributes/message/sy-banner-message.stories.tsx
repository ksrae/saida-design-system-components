import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BannerMessage } from '../../sy-banner.main';
import bannerMeta from '../../sy-banner.stories';

const meta: Meta = {
  title: 'BannerMessage/Attributes/Message',
  component: 'sy-banner-message',
  tags: [],
  render: (args) => BannerMessage(args as { message: string }),
  argTypes: { message: bannerMeta?.argTypes?.message },
  args: { message: 'A short alert message goes here.' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
