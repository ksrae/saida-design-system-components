import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerHideWeekend } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Attributes/Hide Weekend',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerHideWeekend(args as { hideWeekend: boolean }),
  argTypes: { hideWeekend: datepickerMeta?.argTypes?.hideWeekend },
  args: { hideWeekend: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
