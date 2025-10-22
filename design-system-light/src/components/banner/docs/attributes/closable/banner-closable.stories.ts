import type { Meta, StoryObj } from '@storybook/web-components';
import { BannerClosable, BannerProps } from '../../banner';
import { clearElements } from '../../../../clear-element';
import bannerMeta from '../../banner.stories';

const meta: Meta<BannerProps> = {
  title: 'BannerMessage/Attributes/Closable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BannerClosable(args);
  },
  argTypes: {
    closable: bannerMeta?.argTypes?.closable
  },
  args: {
    closable: true
  }
};

export default meta;
type Story = StoryObj<BannerProps>;

export const Param: Story = {}