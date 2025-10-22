import type { Meta, StoryObj } from '@storybook/web-components';
import { CheckboxProps, CheckboxReadonly } from '../../checkbox';
import checkboxMeta from '../../checkbox.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<CheckboxProps> = {
  title: 'Checkbox/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CheckboxReadonly(args);
  },
  argTypes: {
    readonly: checkboxMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Param: Story = {}