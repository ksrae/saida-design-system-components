import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectError } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Error',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectError(args);
  },
  argTypes: {
    error: selectMeta?.argTypes?.error
  },
  args: {
    error: true
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
