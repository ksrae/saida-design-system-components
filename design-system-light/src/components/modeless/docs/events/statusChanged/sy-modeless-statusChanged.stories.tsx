import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessStatusChanged } from '../../sy-modeless.main';

const meta: Meta = {
  title: 'Modeless/Events/StatusChanged',
  component: 'sy-modeless',
  tags: [],
  render: () => ModelessStatusChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};