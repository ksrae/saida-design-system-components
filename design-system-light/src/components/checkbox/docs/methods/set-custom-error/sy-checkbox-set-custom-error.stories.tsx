import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxSetCustomError } from '../../sy-checkbox.main';

const meta: Meta = {
  title: 'Checkbox/Methods/setCustomError',
  component: 'sy-checkbox',
  tags: [],
  render: () => CheckboxSetCustomError(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
