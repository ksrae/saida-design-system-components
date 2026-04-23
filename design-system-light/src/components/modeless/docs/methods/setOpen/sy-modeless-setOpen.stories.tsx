import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessSetOpen } from '../../sy-modeless.main';

const meta: Meta = {
  title: 'Modeless/Methods/SetOpen',
  component: 'sy-modeless',
  tags: [],
  render: () => ModelessSetOpen(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};