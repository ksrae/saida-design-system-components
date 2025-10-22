import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectMaxTagCount } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/MaxTagCount',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectMaxTagCount(args);
  },
  argTypes: {
    maxTagCount: selectMeta?.argTypes?.maxTagCount
  },
  args: {
    maxTagCount: 0
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
