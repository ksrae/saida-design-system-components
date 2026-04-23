import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupGetStatus } from '../../sy-radio-group.main';

const meta: Meta = {
  title: 'Radio/Group Methods/Get Status',
  component: 'sy-radio-group',
  tags: [],
  render: () => RadioGroupGetStatus(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};