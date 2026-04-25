import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModalSetClose } from '../../sy-modal.main';

const meta: Meta = {
  title: 'Modal/Methods/setClose',
  component: 'sy-modal',
  tags: [],
  render: () => ModalSetClose(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
