import type { Meta, StoryObj } from '@storybook/web-components';
import { CheckboxProps, CheckboxIndeterminate } from '../../checkbox';
import checkboxMeta from '../../checkbox.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<CheckboxProps> = {
  title: 'Checkbox/Attributes/Indeterminate',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CheckboxIndeterminate(args);
  },
  argTypes: {
    indeterminate: checkboxMeta?.argTypes?.indeterminate
  },
  args: {
    indeterminate: true
  }
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Param: Story = {}