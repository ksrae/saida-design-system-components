import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputCheckValidity } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Methods/checkValidity',
  component: 'sy-input',
  tags: [],
  render: () => InputCheckValidity(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
