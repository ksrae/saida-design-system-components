import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessGroupUpdateTitle } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/UpdateTitle',
  component: 'sy-modeless-group',
  tags: [],
  render: () => ModelessGroupUpdateTitle(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};