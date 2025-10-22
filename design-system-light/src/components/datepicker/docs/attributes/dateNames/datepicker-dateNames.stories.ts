import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerDateNames, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/DateNames',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerDateNames(args);
  },
  argTypes: {
    dateNames: datepickerMeta?.argTypes?.dateNames,
  },
  args: {
    dateNames: 'Su,Mo,Tu,We,Th,Fr,Sa',
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}