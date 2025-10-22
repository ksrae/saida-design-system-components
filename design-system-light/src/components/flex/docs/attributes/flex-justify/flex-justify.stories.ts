import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import flexMeta from '../../flex.stories';
import { FlexJustify, FlexProps } from '../../flex';

const meta: Meta<FlexProps> = {
  title: 'Flex/Attributes/Justify',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return FlexJustify(args);
  },
  argTypes: {
    justify: flexMeta?.argTypes?.justify
  },
  args: {
    justify: 'start'
  },
};

export default meta;
type Story = StoryObj<FlexProps>;

export const Param: Story = {}
