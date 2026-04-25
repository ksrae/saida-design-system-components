import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CollapseMethods } from '../../sy-collapse.main';

const meta: Meta = {
  title: 'Collapse/Methods/Open & Close',
  component: 'sy-collapse',
  tags: [],
  render: () => CollapseMethods(),
  argTypes: {},
  args: {},
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
