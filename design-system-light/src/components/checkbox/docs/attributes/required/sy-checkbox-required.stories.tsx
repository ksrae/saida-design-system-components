import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxRequired } from '../../sy-checkbox.main';
import checkboxMeta from '../../sy-checkbox.stories';

const meta: Meta = {
  title: 'Checkbox/Attributes/Required',
  component: 'sy-checkbox',
  tags: [],
  render: (args) => CheckboxRequired(args as { required: boolean }),
  argTypes: { required: checkboxMeta?.argTypes?.required },
  args: { required: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
