import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupSetCustomError } from '../../sy-radio-group.main';

const meta: Meta = {
  title: 'Radio/Group Methods/Set Custom Error',
  component: 'sy-radio-group',
  tags: [],
  render: () => RadioGroupSetCustomError(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};