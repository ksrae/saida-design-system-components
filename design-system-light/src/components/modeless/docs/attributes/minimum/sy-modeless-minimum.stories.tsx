import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModelessMinimum } from '../../sy-modeless.main';
import modelessMeta from '../../sy-modeless.stories';

const meta: Meta = {
  title: 'Modeless/Attributes/Minimum',
  component: 'sy-modeless',
  tags: [],
  render: (args) => ModelessMinimum(args as { minimum: boolean }),
  argTypes: { minimum: modelessMeta?.argTypes?.minimum },
  args: { minimum: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};