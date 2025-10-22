import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectClearable } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Clearable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectClearable(args);
  },
  argTypes: {
    clearable: selectMeta?.argTypes?.clearable,
    mode: selectMeta?.argTypes?.mode,
  },
  args: {
    clearable: true,
    mode: 'default',
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
