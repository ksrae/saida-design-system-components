import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import flexMeta from '../../flex.stories';
import { FlexGap, FlexProps } from '../../flex';

const meta: Meta<FlexProps> = {
  title: 'Flex/Attributes/Gap',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return FlexGap(args);
  },
  argTypes: {
    columnGap: flexMeta?.argTypes?.columnGap,
    rowGap: flexMeta?.argTypes?.rowGap,
  },
  args: {
    columnGap: 'medium',
    rowGap: 'medium',
  },
};

export default meta;
type Story = StoryObj<FlexProps>;

export const Param: Story = {}
