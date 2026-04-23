import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxChanged } from '../../sy-checkbox.main';

const meta: Meta = {
  title: 'Checkbox/Events/Changed',
  component: 'sy-checkbox',
  tags: [],
  render: () => CheckboxChanged(),
  argTypes: {},
  args: {},
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
