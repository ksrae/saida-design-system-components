import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessGroupCloseAll } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/CloseAll',
  component: 'sy-modeless-group',
  tags: [],
  render: () => ModelessGroupCloseAll(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};