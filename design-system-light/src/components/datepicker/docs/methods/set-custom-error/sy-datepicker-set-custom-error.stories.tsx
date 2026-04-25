import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerSetCustomError } from '../../sy-datepicker.main';

const meta: Meta = {
  title: 'Datepicker/Methods/setCustomError',
  component: 'sy-datepicker',
  tags: [],
  render: () => DatepickerSetCustomError(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
