import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectRemoved } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Events/Removed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return SelectRemoved();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
