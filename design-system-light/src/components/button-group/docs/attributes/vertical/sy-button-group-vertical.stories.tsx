import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ButtonGroupVertical } from '../../sy-button-group.main';
import buttonGroupMeta from '../../sy-button-group.stories';

const meta: Meta = {
  title: 'ButtonGroup/Attributes/Vertical',
  component: 'sy-button-group',
  tags: [],
  render: (args) => ButtonGroupVertical(args as { vertical: boolean }),
  argTypes: { vertical: buttonGroupMeta?.argTypes?.vertical },
  args: { vertical: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
