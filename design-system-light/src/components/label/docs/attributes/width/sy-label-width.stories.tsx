import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { LabelWidth } from '../../sy-label.main';
import labelMeta from '../../sy-label.stories';

const meta: Meta = {
  title: 'Label/Attributes/Width',
  component: 'sy-label',
  tags: [],
  render: (args) => LabelWidth(args as { width: string }),
  argTypes: { width: labelMeta?.argTypes?.width },
  args: { width: '200px' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
