import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectCleared, SelectProps } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Events/Cleared',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return SelectCleared();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
