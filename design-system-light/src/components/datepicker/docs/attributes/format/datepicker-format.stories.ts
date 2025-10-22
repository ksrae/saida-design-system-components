import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerFormat, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/Format',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerFormat(args);
  },
  argTypes: {
    format: datepickerMeta?.argTypes?.format,
    variant: datepickerMeta?.argTypes?.variant
  },
  args: {
    format: 'yyyy-MM-dd',
    variant: 'date'
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}