import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessGroupCreate } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/Create',
  component: 'sy-modeless-group',
  tags: [],
  render: () => ModelessGroupCreate(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};