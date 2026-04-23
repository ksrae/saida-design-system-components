import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessClosable } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Closable',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessClosable(args as { closable: boolean }),
  argTypes: { closable: modelessMeta?.argTypes?.closable },
  args: { closable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};