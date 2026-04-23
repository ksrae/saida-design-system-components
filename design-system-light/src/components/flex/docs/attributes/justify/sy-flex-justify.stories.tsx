import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { FlexJustify } from '../../sy-flex.main';
import flexMeta from '../../sy-flex.stories';

const meta: Meta = {
  title: 'Flex/Attributes/Justify',
  component: 'sy-flex',
  tags: [],
  render: (args) => FlexJustify(args as { justify: 'start' | 'center' | 'end' | 'space-between' }),
  argTypes: { justify: flexMeta?.argTypes?.justify },
  args: { justify: 'start' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};