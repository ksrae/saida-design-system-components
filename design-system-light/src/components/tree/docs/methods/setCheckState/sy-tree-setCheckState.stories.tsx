import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSetCheckState } from '../../sy-tree.main';

const meta: Meta = {
  title: 'Tree/Methods/SetCheckState',
  component: 'sy-tree',
  tags: [],
  render: () => TreeSetCheckState(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};