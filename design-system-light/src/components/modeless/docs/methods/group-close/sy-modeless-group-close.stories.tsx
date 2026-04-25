import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessGroupClose } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/Close',
  component: 'sy-modeless-group',
  tags: [],
  render: (args) => ModelessGroupClose(args as { id: string }),
  argTypes: {
    id: { control: 'text', description: 'id of the modeless to close' },
  },
  args: { id: 'demo1' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
