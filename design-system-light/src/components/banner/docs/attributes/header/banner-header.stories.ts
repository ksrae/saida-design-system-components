import type { Meta, StoryObj } from '@storybook/web-components';
import { BannerTitle, BannerProps } from '../../banner';
import { clearElements } from '../../../../clear-element';
import bannerMeta from '../../banner.stories';

const meta: Meta<BannerProps> = {
  title: 'BannerMessage/Attributes/Header',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BannerTitle(args);
  },
  argTypes: {
    header: bannerMeta?.argTypes?.header
  },
  args: {
    header: 'Banner Title'
  }
};

export default meta;
type Story = StoryObj<BannerProps>;

export const Param: Story = {}