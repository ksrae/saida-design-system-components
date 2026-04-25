import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModalSetCancel } from '../../sy-modal.main';

const meta: Meta = {
  title: 'Modal/Methods/setCancel',
  component: 'sy-modal',
  tags: [],
  render: () => ModalSetCancel(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
