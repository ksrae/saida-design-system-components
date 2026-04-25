import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessGroupCreate } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/Create',
  component: 'sy-modeless-group',
  tags: [],
  render: (args) => ModelessGroupCreate(args as { id: string; title: string; content: string }),
  argTypes: {
    id:      { control: 'text', description: 'id of the modeless to create' },
    title:   { control: 'text', description: 'title shown in the header' },
    content: { control: 'text', description: 'inner HTML for the body slot' },
  },
  args: {
    id: 'demo1',
    title: 'Demo Modeless',
    content: '<p>Hello from the group</p>',
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};