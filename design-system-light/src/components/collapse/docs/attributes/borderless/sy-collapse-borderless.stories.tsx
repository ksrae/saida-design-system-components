import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CollapseBorderless } from '../../sy-collapse.main';
import collapseMeta from '../../sy-collapse.stories';

const meta: Meta = {
  title: 'Collapse/Attributes/Borderless',
  component: 'sy-collapse',
  tags: [],
  render: (args) => CollapseBorderless(args as { borderless: boolean }),
  argTypes: { borderless: collapseMeta?.argTypes?.borderless },
  args: { borderless: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
