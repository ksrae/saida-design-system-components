import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalClosed } from '../../sy-modal.main';

const meta: Meta = {
  title: 'Modal/Events/Closed',
  component: 'sy-modal',
  tags: [],
  render: () => ModalClosed(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
