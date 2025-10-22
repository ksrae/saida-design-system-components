import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerPlaceholder, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/Placeholder',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerPlaceholder(args);
  },
  argTypes: {
    placeholder: datepickerMeta?.argTypes?.placeholder
  },
  args: {
    placeholder: ''
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}