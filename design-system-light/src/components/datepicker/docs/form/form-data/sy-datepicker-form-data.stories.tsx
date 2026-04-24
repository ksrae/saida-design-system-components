import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DatepickerFormData } from '../../sy-datepicker.main';

const meta: Meta = {
  title: 'Datepicker/Form Integration/FormData',
  component: 'sy-datepicker',
  tags: [],
  render: () => DatepickerFormData(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
