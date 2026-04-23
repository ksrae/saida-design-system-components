import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupChanged } from '../../sy-radio-group.main';

const meta: Meta = {
  title: 'Radio/Group Events/Changed',
  component: 'sy-radio-group',
  tags: [],
  render: () => RadioGroupChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};