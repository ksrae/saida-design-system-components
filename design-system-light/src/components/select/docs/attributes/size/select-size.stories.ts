import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectSize } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectSize(args);
  },
  argTypes: {
    size: selectMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
