import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SpinnerSize } from '../../sy-spinner.main';
import spinnerMeta from '../../sy-spinner.stories';

const meta: Meta = {
  title: 'Spinner/Attributes/Size',
  component: 'sy-spinner',
  tags: [],
  render: (args) => SpinnerSize(args as { size: 'small' | 'medium' | 'large' | 'xlarge' }),
  argTypes: { size: spinnerMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};