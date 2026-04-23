import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DatepickerReadonly } from '../../sy-datepicker.main';
import datepickerMeta from '../../sy-datepicker.stories';

const meta: Meta = {
  title: 'Datepicker/Attributes/Readonly',
  component: 'sy-datepicker',
  tags: [],
  render: (args) => DatepickerReadonly(args as { readonly: boolean }),
  argTypes: { readonly: datepickerMeta?.argTypes?.readonly },
  args: { readonly: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
