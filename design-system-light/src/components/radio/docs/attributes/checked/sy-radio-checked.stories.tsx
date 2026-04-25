import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { RadioChecked } from '../../sy-radio.main';
import radioMeta from '../../sy-radio.stories';

const meta: Meta = {
  title: 'Radio/Attributes/Checked',
  component: 'sy-radio',
  tags: [],
  render: (args) => RadioChecked(args as { checked: boolean }),
  argTypes: { checked: radioMeta?.argTypes?.checked },
  args: { checked: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};