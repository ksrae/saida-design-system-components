import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessGroupUpdateContent } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/UpdateContent',
  component: 'sy-modeless-group',
  tags: [],
  render: (args) => ModelessGroupUpdateContent(args as { id: string; content: string }),
  argTypes: {
    id:      { control: 'text', description: 'id of the modeless to update' },
    content: { control: 'text', description: 'new HTML content for the body' },
  },
  args: {
    id: 'demo1',
    content: '<strong>Updated content</strong>',
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
