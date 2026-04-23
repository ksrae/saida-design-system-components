import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalMaskclosable } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Mask Closable',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalMaskclosable(args as { maskClosable: boolean }),
  argTypes: { maskClosable: modalMeta?.argTypes?.maskClosable },
  args: { maskClosable: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
