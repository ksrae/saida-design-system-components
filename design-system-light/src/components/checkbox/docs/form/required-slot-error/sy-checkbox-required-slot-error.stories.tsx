import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxRequiredSlotError } from '../../sy-checkbox.main';

const meta: Meta = {
  title: 'Checkbox/Form Integration/Required + Slot Error',
  component: 'sy-checkbox',
  tags: [],
  render: () => CheckboxRequiredSlotError(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
