import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectDisabled } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectDisabled(args);
  },
  argTypes: {
    disabled: selectMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
