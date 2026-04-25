import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModalSetOk } from '../../sy-modal.main';

const meta: Meta = {
  title: 'Modal/Methods/setOk',
  component: 'sy-modal',
  tags: [],
  render: () => ModalSetOk(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
