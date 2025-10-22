import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerDisabled, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerDisabled(args);
  },
  argTypes: {
    disabled: datepickerMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}