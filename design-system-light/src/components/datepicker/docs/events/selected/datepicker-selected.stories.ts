import type { Meta, StoryObj } from '@storybook/web-components';

import datepickerMeta from '../../datepicker.stories';
import { clearElements } from '../../../../clear-element';
import { DatepickerProps, DatepickerSelected } from '../../datepicker';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Events/Selected',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DatepickerSelected({ variant: args.variant as 'date' | 'datetime' | 'time' }); // 타입을 명시적으로 제한
  },
  argTypes: {
    variant: datepickerMeta?.argTypes?.variant,
  },
  args: {
    variant: 'date',
  },
};

export default meta;
type Story = StoryObj<DatepickerProps>;


export const Param: Story = {};