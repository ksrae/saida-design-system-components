import type { Meta, StoryObj } from '@storybook/web-components';
import { LabelProps, LabelSlot, LabelValue } from '../../label';
import labelMeta from '../../label.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<LabelProps> = {
  title: 'Label/Attributes/Slot',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return LabelSlot(args);
  },
  argTypes: {
    slotContent: labelMeta?.argTypes?.slotContent,
  },
  args: {
    slotContent: '<sy-input placeholder="Input value"></sy-input>',
  }
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Param: Story = {}
