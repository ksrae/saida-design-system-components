import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessGroupUpdateTitle } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/UpdateTitle',
  component: 'sy-modeless-group',
  tags: [],
  render: (args) => ModelessGroupUpdateTitle(args as { id: string; title: string }),
  argTypes: {
    id:    { control: 'text', description: 'id of the modeless to update' },
    title: { control: 'text', description: 'new title for the header' },
  },
  args: {
    id: 'demo1',
    title: 'Updated title',
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
