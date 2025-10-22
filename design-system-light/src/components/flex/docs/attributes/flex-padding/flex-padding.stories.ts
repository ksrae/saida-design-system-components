import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import flexMeta from '../../flex.stories';
import { FlexPadding, FlexProps } from '../../flex';

const meta: Meta<FlexProps> = {
  title: 'Flex/Attributes/Padding',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return FlexPadding(args);
  },
  argTypes: {
    padding: flexMeta?.argTypes?.padding
  },
  args: {
    padding: 'medium'
  },
};

export default meta;
type Story = StoryObj<FlexProps>;

export const Param: Story = {}
