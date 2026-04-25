import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerMode } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Attributes/Mode',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerMode(args as { mode: 'day'|'month'|'year' }),
  argTypes: { mode: datepickerMeta?.argTypes?.mode },
  args: { mode: 'day' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
