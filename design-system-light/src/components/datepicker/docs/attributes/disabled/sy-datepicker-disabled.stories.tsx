import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DatepickerDisabled } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Attributes/Disabled',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerDisabled(args as { disabled: boolean }),
  argTypes: { disabled: datepickerMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
