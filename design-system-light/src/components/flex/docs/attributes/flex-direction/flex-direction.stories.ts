import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import flexMeta from '../../flex.stories';
import { FlexProps, FlexDirection } from '../../flex';

const meta: Meta<FlexProps> = {
  title: 'Flex/Attributes/Direction',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return FlexDirection(args);
  },
  argTypes: {
    direction: flexMeta?.argTypes?.direction
  },
  args: {
    direction: 'horizontal'
  }
};


export default meta;
type Story = StoryObj<FlexProps>;

export const Param: Story = {}
