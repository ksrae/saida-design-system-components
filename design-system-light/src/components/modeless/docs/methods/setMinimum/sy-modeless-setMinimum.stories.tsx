import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessSetMinimum } from '../../sy-modeless.main';

const meta: Meta = {
  title: 'Modeless/Methods/SetMinimum',
  component: 'sy-modeless',
  tags: [],
  render: () => ModelessSetMinimum(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};