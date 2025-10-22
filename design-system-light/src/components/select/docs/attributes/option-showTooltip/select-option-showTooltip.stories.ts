import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectOptionShowTooltip, SelectOptionProps } from '../../select-option';
import selectOptionMeta from '../../select-option.stories';
import { clearElements } from '../../../../clear-element';
const meta: Meta<SelectOptionProps> = {
  title: 'Select/Attributes/Option ShowTooltip',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectOptionShowTooltip(args);
  },
  argTypes: {
    showTooltip: selectOptionMeta?.argTypes?.showTooltip,
  },
  args: {
    showTooltip: false,
  }
};

export default meta;
type Story = StoryObj<SelectOptionProps>;

export const Param: Story = {}
