import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerDate, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/Date',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerDate(args);
  },
  argTypes: {
    year: datepickerMeta?.argTypes?.year,
    month: datepickerMeta?.argTypes?.month,
    day: datepickerMeta?.argTypes?.day,
    hour: datepickerMeta?.argTypes?.hour,
    minute: datepickerMeta?.argTypes?.minute,
    second: datepickerMeta?.argTypes?.second,
  },
  args: {
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
    second: '',
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}