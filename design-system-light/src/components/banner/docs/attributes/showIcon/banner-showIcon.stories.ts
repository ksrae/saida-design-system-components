import type { Meta, StoryObj } from '@storybook/web-components';
import { BannerShowIcon, BannerProps } from '../../banner';
import { clearElements } from '../../../../clear-element';
import bannerMeta from '../../banner.stories';

const meta: Meta<BannerProps> = {
  title: 'BannerMessage/Attributes/Icon',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BannerShowIcon(args);
  },
  argTypes: {
    showIcon: bannerMeta?.argTypes?.showIcon,
    variant: bannerMeta?.argTypes?.variant
  }, 
  args: {
    showIcon: true,
    variant: 'info',
  }
};

export default meta;
type Story = StoryObj<BannerProps>;

export const Param: Story = {}