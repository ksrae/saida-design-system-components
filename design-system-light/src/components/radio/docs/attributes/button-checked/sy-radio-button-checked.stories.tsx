import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioButtonChecked } from '../../sy-radio-button.main';
import radioButtonMeta from '../../sy-radio-button.stories';

const meta: Meta = {
  title: 'RadioButton/Attributes/Checked',
  component: 'sy-radio-button',
  tags: [],
  render: (args) => RadioButtonChecked(args as { checked: boolean }),
  argTypes: { checked: radioButtonMeta?.argTypes?.checked },
  args: { checked: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};