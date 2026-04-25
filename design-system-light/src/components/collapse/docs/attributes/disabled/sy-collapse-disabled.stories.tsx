import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CollapseDisabled } from '../../sy-collapse.main';
import collapseMeta from '../../sy-collapse.stories';

const meta: Meta = {
  title: 'Collapse/Attributes/Disabled',
  component: 'sy-collapse',
  tags: [],
  render: (args) => CollapseDisabled(args as { disabled: boolean }),
  argTypes: { disabled: collapseMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
