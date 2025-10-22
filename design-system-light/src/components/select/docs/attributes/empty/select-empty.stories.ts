import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectEmpty } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Empty',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectEmpty(args);
  },
  argTypes: {
    empty: selectMeta?.argTypes?.empty
  },
  args: {
    empty: true
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
