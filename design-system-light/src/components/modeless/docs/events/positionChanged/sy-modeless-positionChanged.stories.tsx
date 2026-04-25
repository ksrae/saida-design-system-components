import type { Meta, StoryObj } from '@stencil/storybook-plugin';
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