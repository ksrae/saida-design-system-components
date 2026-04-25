import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerVariant } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Attributes/Variant',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerVariant(args as { variant: 'date'|'datetime'|'range'|'time' }),
  argTypes: { variant: datepickerMeta?.argTypes?.variant },
  args: { variant: 'date' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
