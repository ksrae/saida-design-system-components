import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { IconSelectable } from '../../sy-icon.main';
import iconMeta from '../../sy-icon.stories';

const meta: Meta = {
  title: 'Icon/Attributes/Selectable',
  component: 'sy-icon',
  tags: [],
  render: (args) => IconSelectable(args as { selectable: boolean }),
  argTypes: { selectable: iconMeta?.argTypes?.selectable },
  args: { selectable: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
