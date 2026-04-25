import type { Meta, StoryObj } from '@stencil/storybook-plugin';
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