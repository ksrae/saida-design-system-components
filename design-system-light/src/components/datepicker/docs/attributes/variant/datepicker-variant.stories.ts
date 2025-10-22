import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerVariant, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerVariant(args);
  },
  argTypes: {
    variant: datepickerMeta?.argTypes?.variant
  },
  args: {
    variant: 'date'
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}