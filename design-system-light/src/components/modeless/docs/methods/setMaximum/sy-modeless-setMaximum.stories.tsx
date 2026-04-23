import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessSetMaximum } from '../../sy-modeless.main';

const meta: Meta = {
  title: 'Modeless/Methods/SetMaximum',
  component: 'sy-modeless',
  tags: [],
  render: () => ModelessSetMaximum(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};