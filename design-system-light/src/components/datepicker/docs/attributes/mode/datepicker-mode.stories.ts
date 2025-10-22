import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerMode, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/Mode',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerMode(args);
  },
  argTypes: {
    mode: datepickerMeta?.argTypes?.mode
  },
  args: {
    mode: 'day'
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}