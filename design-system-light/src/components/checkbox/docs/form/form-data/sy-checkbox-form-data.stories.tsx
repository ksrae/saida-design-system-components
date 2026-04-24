import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxFormData } from '../../sy-checkbox.main';

const meta: Meta = {
  title: 'Checkbox/Form Integration/FormData',
  component: 'sy-checkbox',
  tags: [],
  render: () => CheckboxFormData(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
