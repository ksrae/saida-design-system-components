import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BannerClosable } from '../../sy-banner.main';
import bannerMeta from '../../sy-banner.stories';

const meta: Meta = {
  title: 'BannerMessage/Attributes/Closable',
  component: 'sy-banner-message',
  tags: [],
  render: (args) => BannerClosable(args as { closable: boolean }),
  argTypes: { closable: bannerMeta?.argTypes?.closable },
  args: { closable: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
