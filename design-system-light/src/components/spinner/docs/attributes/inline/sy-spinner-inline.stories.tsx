import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SpinnerInline } from '../../sy-spinner.main';
import spinnerMeta from '../../sy-spinner.stories';

const meta: Meta = {
  title: 'Spinner/Attributes/Inline',
  component: 'sy-spinner',
  tags: [],
  render: (args) => SpinnerInline(args as { inline: boolean }),
  argTypes: { inline: spinnerMeta?.argTypes?.inline },
  args: { inline: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};