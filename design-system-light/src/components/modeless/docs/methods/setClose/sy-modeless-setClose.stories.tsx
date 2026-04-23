import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessSetClose } from '../../sy-modeless.main';

const meta: Meta = {
  title: 'Modeless/Methods/SetClose',
  component: 'sy-modeless',
  tags: [],
  render: () => ModelessSetClose(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};