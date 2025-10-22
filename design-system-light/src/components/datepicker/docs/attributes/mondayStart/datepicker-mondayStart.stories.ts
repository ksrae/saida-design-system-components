import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerMondayStart, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/MondayStart',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerMondayStart(args);
  },
  argTypes: {
    mondayStart: datepickerMeta?.argTypes?.mondayStart
  },
  args: {
    mondayStart: true
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}