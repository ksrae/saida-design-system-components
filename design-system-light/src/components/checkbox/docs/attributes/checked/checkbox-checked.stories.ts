import type { Meta, StoryObj } from '@storybook/web-components';
import { CheckboxChecked, CheckboxProps } from '../../checkbox';
import checkboxMeta from '../../checkbox.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<CheckboxProps> = {
  title: 'Checkbox/Attributes/Checked',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CheckboxChecked(args);
  },
  argTypes: {
    checked: checkboxMeta?.argTypes?.checked
  },
  args: {
    checked: true
  }
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Param: Story = {}