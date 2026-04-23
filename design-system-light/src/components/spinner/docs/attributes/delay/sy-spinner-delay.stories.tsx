import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SpinnerDelay } from '../../sy-spinner.main';
import spinnerMeta from '../../sy-spinner.stories';

const meta: Meta = {
  title: 'Spinner/Attributes/Delay',
  component: 'sy-spinner',
  tags: [],
  render: (args) => SpinnerDelay(args as { delay: number }),
  argTypes: { delay: spinnerMeta?.argTypes?.delay },
  args: { delay: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};