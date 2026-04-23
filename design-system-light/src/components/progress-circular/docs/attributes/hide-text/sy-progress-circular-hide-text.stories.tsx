import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressCircularHideText } from '../../sy-progress-circular.main';
import progressCircularMeta from '../../sy-progress-circular.stories';

const meta: Meta = {
  title: 'ProgressCircular/Attributes/Hide Text',
  component: 'sy-progress-circular',
  tags: [],
  render: (args) => ProgressCircularHideText(args as { hideText: boolean }),
  argTypes: { hideText: progressCircularMeta?.argTypes?.hideText },
  args: { hideText: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};