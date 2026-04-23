import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessSetRestore } from '../../sy-modeless.main';

const meta: Meta = {
  title: 'Modeless/Methods/SetRestore',
  component: 'sy-modeless',
  tags: [],
  render: () => ModelessSetRestore(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};