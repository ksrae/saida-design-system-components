import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { NestedModal } from '../../sy-modal.main';

const meta: Meta = {
  title: 'Modal/Methods/Nested',
  component: 'sy-modal',
  tags: [],
  render: () => NestedModal(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
