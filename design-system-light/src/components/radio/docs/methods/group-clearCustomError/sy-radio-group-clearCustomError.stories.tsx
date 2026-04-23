import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupClearCustomError } from '../../sy-radio-group.main';

const meta: Meta = {
  title: 'Radio/Group Methods/Clear Custom Error',
  component: 'sy-radio-group',
  tags: [],
  render: () => RadioGroupClearCustomError(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};