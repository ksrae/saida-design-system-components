import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SpinnerHidden } from '../../sy-spinner.main';
import spinnerMeta from '../../sy-spinner.stories';

const meta: Meta = {
  title: 'Spinner/Attributes/Hidden',
  component: 'sy-spinner',
  tags: [],
  render: (args) => SpinnerHidden(args as { hidden: boolean }),
  argTypes: { hidden: spinnerMeta?.argTypes?.hidden },
  args: { hidden: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};