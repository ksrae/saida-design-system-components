import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CheckboxIndeterminate } from '../../sy-checkbox.main';
import checkboxMeta from '../../sy-checkbox.stories';

const meta: Meta = {
  title: 'Checkbox/Attributes/Indeterminate',
  component: 'sy-checkbox',
  tags: [],
  render: (args) => CheckboxIndeterminate(args as { indeterminate: boolean }),
  argTypes: { indeterminate: checkboxMeta?.argTypes?.indeterminate },
  args: { indeterminate: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
