import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DatepickerPlaceholder } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Attributes/Placeholder',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerPlaceholder(args as { placeholder: string }),
  argTypes: { placeholder: datepickerMeta?.argTypes?.placeholder },
  args: { placeholder: 'Select a date' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
