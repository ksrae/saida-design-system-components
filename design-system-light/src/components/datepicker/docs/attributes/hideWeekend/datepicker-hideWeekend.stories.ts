import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerHideWeekend, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/HideWeekend',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerHideWeekend(args);
  },
  argTypes: {
    hideWeekend: datepickerMeta?.argTypes?.hideWeekend
  },
  args: {
    hideWeekend: true
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}