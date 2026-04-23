import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressCircularTooltipTitle } from '../../sy-progress-circular.main';
import progressCircularMeta from '../../sy-progress-circular.stories';

const meta: Meta = {
  title: 'ProgressCircular/Attributes/Tooltip Title',
  component: 'sy-progress-circular',
  tags: [],
  render: (args) => ProgressCircularTooltipTitle(args as { tooltipTitle: string }),
  argTypes: { tooltipTitle: progressCircularMeta?.argTypes?.tooltipTitle },
  args: { tooltipTitle: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};