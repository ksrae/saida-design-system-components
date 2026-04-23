import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { LabelDisabled } from '../../sy-label.main';
import labelMeta from '../../sy-label.stories';

const meta: Meta = {
  title: 'Label/Attributes/Disabled',
  component: 'sy-label',
  tags: [],
  render: (args) => LabelDisabled(args as { disabled: boolean }),
  argTypes: { disabled: labelMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
