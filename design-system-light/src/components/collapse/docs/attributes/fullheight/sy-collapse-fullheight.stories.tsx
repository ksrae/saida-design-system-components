import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CollapseFullHeight } from '../../sy-collapse.main';
import collapseMeta from '../../sy-collapse.stories';

const meta: Meta = {
  title: 'Collapse/Attributes/Full Height',
  component: 'sy-collapse',
  tags: [],
  render: (args) => CollapseFullHeight(args as { fullheight: boolean }),
  argTypes: { fullheight: collapseMeta?.argTypes?.fullheight },
  args: { fullheight: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
