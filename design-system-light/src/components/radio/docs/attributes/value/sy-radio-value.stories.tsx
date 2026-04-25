import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { RadioValue } from '../../sy-radio.main';
import radioMeta from '../../sy-radio.stories';

const meta: Meta = {
  title: 'Radio/Attributes/Value',
  component: 'sy-radio',
  tags: [],
  render: (args) => RadioValue(args as { value: string }),
  argTypes: { value: radioMeta?.argTypes?.value },
  args: { value: 'option-a' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};