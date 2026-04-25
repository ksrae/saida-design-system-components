import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerSelected } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Events/Selected',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerSelected(args as { variant: 'date'|'datetime'|'time'|'range' }),
  argTypes: { variant: datepickerMeta?.argTypes?.variant },
  args: { variant: 'date' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
