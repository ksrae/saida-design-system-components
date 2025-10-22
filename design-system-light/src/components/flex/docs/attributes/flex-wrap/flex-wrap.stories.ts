import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import flexMeta from '../../flex.stories';
import { FlexProps, FlexWrap } from '../../flex';

const meta: Meta<FlexProps> = {
  title: 'Flex/Attributes/Wrap',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return FlexWrap(args);
  },
  argTypes: {
    wrap: flexMeta?.argTypes?.wrap
  },
  args: {
    wrap: 'nowrap'
  }
};


export default meta;
type Story = StoryObj<FlexProps>;

export const Param: Story = {}
