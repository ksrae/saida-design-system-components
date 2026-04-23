import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxFocusBlur } from '../../sy-checkbox.main';

const meta: Meta = {
  title: 'Checkbox/Methods/Set Focus & Blur',
  component: 'sy-checkbox',
  tags: [],
  render: () => CheckboxFocusBlur(),
  argTypes: {},
  args: {},
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
