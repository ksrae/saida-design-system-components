import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectDefaultValue } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/DefaultValue',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectDefaultValue(args);
  },
  argTypes: {
    defaultValue: selectMeta?.argTypes?.defaultValue,
    mode: selectMeta?.argTypes?.mode
  },
  args: {
    defaultValue: 'value1,value2',
    mode: 'multiple'
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
