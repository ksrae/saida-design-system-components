import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DatepickerDateNames } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Attributes/Date Names',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerDateNames(args as { dateNames: string }),
  argTypes: { dateNames: datepickerMeta?.argTypes?.dateNames },
  args: { dateNames: '일,월,화,수,목,금,토' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
