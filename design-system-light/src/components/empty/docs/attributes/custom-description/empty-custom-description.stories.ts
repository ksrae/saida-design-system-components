import type { Meta, StoryObj } from '@storybook/web-components';
import { EmptyProps, EmptyCustomDesc } from '../../empty';
import { clearElements } from '../../../../clear-element';
const meta: Meta<EmptyProps> = {
  title: 'Empty/Attributes/Custom Description',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return EmptyCustomDesc();
  },
  argTypes: {

  },
};

export default meta;                                                                                                                  
type Story = StoryObj<EmptyProps>;

export const Param: Story = {}