import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CheckboxDisabled } from '../../sy-checkbox.main';
import checkboxMeta from '../../sy-checkbox.stories';

const meta: Meta = {
  title: 'Checkbox/Attributes/Disabled',
  component: 'sy-checkbox',
  tags: [],
  render: (args) => CheckboxDisabled(args as { disabled: boolean }),
  argTypes: { disabled: checkboxMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
