import type { Meta, StoryObj } from '@storybook/web-components';
import { BannerMessage, BannerProps } from '../../banner';
import { clearElements } from '../../../../clear-element';
import bannerMeta from '../../banner.stories';

const meta: Meta<BannerProps> = {
  title: 'BannerMessage/Attributes/Message',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BannerMessage(args);
  },
  argTypes: {
    message: bannerMeta?.argTypes?.message
  },
  args: {
    message: 'This is a banner message'
  }
};

export default meta;
type Story = StoryObj<BannerProps>;

export const Param: Story = {}