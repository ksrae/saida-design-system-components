import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalOpen } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/Open',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalOpen(args);
  },
  argTypes: {
    open: modalMeta?.argTypes?.open
  },
  args: {
    open: false
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
