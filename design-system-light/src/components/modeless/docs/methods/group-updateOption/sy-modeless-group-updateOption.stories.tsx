import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessGroupUpdateOption } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/UpdateOption',
  component: 'sy-modeless-group',
  tags: [],
  render: (args) => ModelessGroupUpdateOption(args as { id: string }),
  argTypes: {
    id: { control: 'text', description: 'id of the modeless whose options to update' },
  },
  args: { id: 'demo1' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
