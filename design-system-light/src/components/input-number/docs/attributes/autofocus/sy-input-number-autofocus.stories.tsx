import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberAutofocus } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Autofocus',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberAutofocus(args as { autofocus: boolean }),
  argTypes: { autofocus: inputNumberMeta?.argTypes?.autofocus },
  args: { autofocus: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
