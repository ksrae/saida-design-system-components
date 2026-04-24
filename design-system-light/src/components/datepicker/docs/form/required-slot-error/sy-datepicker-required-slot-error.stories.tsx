import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DatepickerRequiredSlotError } from '../../sy-datepicker.main';

const meta: Meta = {
  title: 'Datepicker/Form Integration/Required + Slot Error',
  component: 'sy-datepicker',
  tags: [],
  render: () => DatepickerRequiredSlotError(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
