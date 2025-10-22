import type { Meta, StoryObj } from '@storybook/web-components';
import { CheckboxProps, CheckboxDisabled } from '../../checkbox';
import checkboxMeta from '../../checkbox.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<CheckboxProps> = {
  title: 'Checkbox/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CheckboxDisabled(args);
  },
  argTypes: {
    disabled: checkboxMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Param: Story = {}