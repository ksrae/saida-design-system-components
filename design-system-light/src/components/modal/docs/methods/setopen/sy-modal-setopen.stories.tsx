import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModalTriggerButtons } from '../../sy-modal.main';

const meta: Meta = {
  title: 'Modal/Methods/setOpen',
  component: 'sy-modal',
  tags: [],
  render: () => ModalTriggerButtons(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
