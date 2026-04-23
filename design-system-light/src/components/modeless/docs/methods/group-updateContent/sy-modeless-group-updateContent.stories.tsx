import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessGroupUpdateContent } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/UpdateContent',
  component: 'sy-modeless-group',
  tags: [],
  render: () => ModelessGroupUpdateContent(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};