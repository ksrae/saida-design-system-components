import type { Meta, StoryObj } from '@storybook/web-components';
import { BannerVariant, BannerProps } from '../../banner';
import { clearElements } from '../../../../clear-element';
import bannerMeta from '../../banner.stories';

const meta: Meta<BannerProps> = {
  title: 'BannerMessage/Attributes/Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BannerVariant(args);
  },
  argTypes: {
    variant: bannerMeta?.argTypes?.variant,
    showIcon: bannerMeta?.argTypes?.showIcon
  },
  args: {
    variant: 'info'
  }
};

export default meta;
type Story = StoryObj<BannerProps>;

export const Param: Story = {}