import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessPositionChanged } from '../../sy-modeless.main';

const meta: Meta = {
  title: 'Modeless/Events/PositionChanged',
  component: 'sy-modeless',
  tags: [],
  render: () => ModelessPositionChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};