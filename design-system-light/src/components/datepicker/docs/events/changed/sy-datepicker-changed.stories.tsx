import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerChanged } from '../../sy-datepicker.main';

const meta: Meta = {
  title: 'Datepicker/Events/Changed',
  component: 'sy-datepicker',
  tags: [],
  render: () => DatepickerChanged(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
