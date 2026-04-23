import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxChecked } from '../../sy-checkbox.main';
import checkboxMeta from '../../sy-checkbox.stories';

const meta: Meta = {
  title: 'Checkbox/Attributes/Checked',
  component: 'sy-checkbox',
  tags: [],
  render: (args) => CheckboxChecked(args as { checked: boolean }),
  argTypes: { checked: checkboxMeta?.argTypes?.checked },
  args: { checked: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
