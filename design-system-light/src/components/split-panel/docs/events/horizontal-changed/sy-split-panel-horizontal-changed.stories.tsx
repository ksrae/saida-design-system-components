import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SplitPanelHorizontalChanged } from '../../sy-split-panel.main';

const meta: Meta = {
  title: 'SplitPanel/Events/Horizontal Changed',
  component: 'sy-split-panel',
  tags: [],
  render: () => SplitPanelHorizontalChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};