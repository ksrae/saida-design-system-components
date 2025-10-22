import type { Meta, StoryObj } from '@storybook/web-components';
import datepickerMeta from '../../datepicker.stories';
import { clearElements } from '../../../../clear-element';
import { DatepickerProps, DatepickerChanged } from '../../datepicker';

const meta: Meta<DatepickerProps> = {
  title: 'Datepicker/Events/Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return DatepickerChanged();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<DatepickerProps>;


export const Param: Story = {};