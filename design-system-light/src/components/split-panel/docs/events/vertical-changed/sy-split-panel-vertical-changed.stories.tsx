import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SplitPanelVerticalChanged } from '../../sy-split-panel.main';

const meta: Meta = {
  title: 'SplitPanel/Events/Vertical Changed',
  component: 'sy-split-panel',
  tags: [],
  render: () => SplitPanelVerticalChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};