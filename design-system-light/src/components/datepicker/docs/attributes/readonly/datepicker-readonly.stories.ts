import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { DatepickerReadonly, DatepickerProps } from '../../datepicker';
import datepickerMeta from '../../datepicker.stories';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerReadonly(args);
  },
  argTypes: {
    readonly: datepickerMeta?.argTypes?.readonly
  },
  args: {
    readonly: false
  }
};

export default meta;
type Story = StoryObj<DatepickerProps>;

export const Param: Story = {}