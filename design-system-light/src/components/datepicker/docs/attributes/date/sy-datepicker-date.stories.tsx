import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerDate } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

type DateArgs = { year: string; month: string; day: string; hour: string; minute: string; second: string };

const meta: Meta = {
  title: 'Datepicker/Attributes/Date',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerDate(args as DateArgs),
  argTypes: {
    year:   datepickerMeta?.argTypes?.year,
    month:  datepickerMeta?.argTypes?.month,
    day:    datepickerMeta?.argTypes?.day,
    hour:   datepickerMeta?.argTypes?.hour,
    minute: datepickerMeta?.argTypes?.minute,
    second: datepickerMeta?.argTypes?.second,
  },
  args: { year: '2025', month: '1', day: '15', hour: '9', minute: '30', second: '0' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
