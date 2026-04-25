import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { RadioGroupCheckValidity } from '../../sy-radio-group.main';

const meta: Meta = {
  title: 'Radio/Group Methods/Check Validity',
  component: 'sy-radio-group',
  tags: [],
  render: () => RadioGroupCheckValidity(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};