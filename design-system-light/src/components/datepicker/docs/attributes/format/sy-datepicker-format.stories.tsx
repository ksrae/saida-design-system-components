import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerFormat } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Attributes/Format',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerFormat(args as { format: string; variant: 'date'|'datetime'|'range'|'time' }),
  argTypes: {
    format: datepickerMeta?.argTypes?.format,
    variant: datepickerMeta?.argTypes?.variant,
  },
  args: { format: 'yyyy/MM/dd', variant: 'date' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
