import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessClosed } from '../../sy-modeless.main';

const meta: Meta = {
  title: 'Modeless/Events/Closed',
  component: 'sy-modeless',
  tags: [],
  render: () => ModelessClosed(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};