import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectOptionProps, SelectOptionDisalbed } from '../../select-option';
import selectOptionMeta from '../../select-option.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectOptionProps> = {
  title: 'Select/Attributes/Option Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectOptionDisalbed(args);
  },
  argTypes: {
    disabled: selectOptionMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<SelectOptionProps>;

export const Param: Story = {}
