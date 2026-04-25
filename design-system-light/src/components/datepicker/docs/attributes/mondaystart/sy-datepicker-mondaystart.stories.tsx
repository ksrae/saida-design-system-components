import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerMondayStart } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Attributes/Monday Start',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerMondayStart(args as { mondayStart: boolean }),
  argTypes: { mondayStart: datepickerMeta?.argTypes?.mondayStart },
  args: { mondayStart: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
