import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectMode, SelectProps } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Mode',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectMode(args);
  },
  argTypes: {
    mode: selectMeta?.argTypes?.mode
  },
  args: {
    mode: 'default'
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
 