import type { Meta, StoryObj } from '@storybook/web-components';
import { CheckboxSlot, CheckboxProps } from '../../checkbox';
import checkboxMeta from '../../checkbox.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<CheckboxProps> = {
  title: 'Checkbox/Attributes/Slot',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CheckboxSlot(args);
  },
  argTypes: {
    slotContent: checkboxMeta?.argTypes?.slotContent
  },
  args: {
    slotContent: "This is a checkbox Text"
  }
};

export default meta;
type Story = StoryObj<CheckboxProps>;


export const Param: Story = {}


