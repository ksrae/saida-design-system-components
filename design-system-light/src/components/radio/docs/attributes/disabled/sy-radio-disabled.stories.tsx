import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { RadioDisabled } from '../../sy-radio.main';
import radioMeta from '../../sy-radio.stories';

const meta: Meta = {
  title: 'Radio/Attributes/Disabled',
  component: 'sy-radio',
  tags: [],
  render: (args) => RadioDisabled(args as { disabled: boolean }),
  argTypes: { disabled: radioMeta?.argTypes?.disabled },
  args: { disabled: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};