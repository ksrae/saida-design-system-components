import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SpinnerDescription } from '../../sy-spinner.main';
import spinnerMeta from '../../sy-spinner.stories';

const meta: Meta = {
  title: 'Spinner/Attributes/Description',
  component: 'sy-spinner',
  tags: [],
  render: (args) => SpinnerDescription(args as { description: string }),
  argTypes: { description: spinnerMeta?.argTypes?.description },
  args: { description: 'Loading...' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};