import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import flexMeta from '../../flex.stories';
import { FlexSize, FlexProps } from '../../flex';

const meta: Meta<FlexProps> = {
  title: 'Flex/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return FlexSize(args);
  },
  argTypes: {
    height: flexMeta?.argTypes?.height,
    width: flexMeta?.argTypes?.width,
  },
  args: {
    height: '100',
    width: '100',
  },
};

export default meta;
type Story = StoryObj<FlexProps>;

export const Param: Story = {}
