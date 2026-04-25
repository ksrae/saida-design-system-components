import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CollapseGhost } from '../../sy-collapse.main';
import collapseMeta from '../../sy-collapse.stories';

const meta: Meta = {
  title: 'Collapse/Attributes/Ghost',
  component: 'sy-collapse',
  tags: [],
  render: (args) => CollapseGhost(args as { ghost: boolean }),
  argTypes: { ghost: collapseMeta?.argTypes?.ghost },
  args: { ghost: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
