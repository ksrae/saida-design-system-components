import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalOpen } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Open',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalOpen(args as { open: boolean }),
  argTypes: { open: modalMeta?.argTypes?.open },
  args: { open: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
