import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { FlexDirection } from '../../sy-flex.main';
import flexMeta from '../../sy-flex.stories';

const meta: Meta = {
  title: 'Flex/Attributes/Direction',
  component: 'sy-flex',
  tags: [],
  render: (args) => FlexDirection(args as { direction: 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse' }),
  argTypes: { direction: flexMeta?.argTypes?.direction },
  args: { direction: 'horizontal' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};