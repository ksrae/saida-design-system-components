import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { IconPath } from '../../sy-icon.main';
import iconMeta from '../../sy-icon.stories';

const meta: Meta = {
  title: 'Icon/Attributes/Path',
  component: 'sy-icon',
  tags: [],
  render: (args) => IconPath(args as { path: string }),
  argTypes: { path: iconMeta?.argTypes?.path },
  args: { path: 'assets/syicon-use01.png' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
