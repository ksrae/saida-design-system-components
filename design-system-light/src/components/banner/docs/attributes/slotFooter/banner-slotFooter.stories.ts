import type { Meta, StoryObj } from '@storybook/web-components';
import { BannerSlotFooter, BannerProps } from '../../banner';
import { clearElements } from '../../../../clear-element';
import bannerMeta from '../../banner.stories';

const meta: Meta<BannerProps> = {
  title: 'BannerMessage/Attributes/SlotFooter',
  tags: ['false'],
  render: (args: BannerProps) => {
    clearElements(meta.title);
    return BannerSlotFooter(args);
  },
  argTypes: {
    slotFooter: bannerMeta?.argTypes?.slotFooter,
  },
  args: {
    slotFooter: `
    <div slot="footer">
      <sy-button size="small" id="btn1">Button1</sy-button>
      <sy-button size="small" id="btn2" variant="primary">Button2</sy-button>
    </div>
    `
  }
};

export default meta;
type Story = StoryObj<BannerProps>;

export const Param: Story = {}