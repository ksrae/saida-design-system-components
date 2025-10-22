import type { Meta, StoryObj } from '@storybook/web-components';
import { EmptyProps, EmptyDesc } from '../../empty';
import emptyMeta from '../../empty.stories';
import { clearElements } from '../../../../clear-element';
const meta: Meta<EmptyProps> = {
  title: 'Empty/Attributes/Description',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return EmptyDesc(args);
  },
  argTypes: {
    description: emptyMeta?.argTypes?.description
  },
  args: {
    description: 'default description'
  }
};

export default meta;                                                                                                                  
type Story = StoryObj<EmptyProps>;

export const Param: Story = {}