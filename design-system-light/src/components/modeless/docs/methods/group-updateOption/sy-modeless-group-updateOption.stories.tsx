import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessGroupUpdateOption } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/UpdateOption',
  component: 'sy-modeless-group',
  tags: [],
  render: () => ModelessGroupUpdateOption(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};