import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalSlot } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/Slot',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalSlot(args);
  },
  argTypes: {
    slotHeader: modalMeta?.argTypes?.slotHeader,
    slotBody: modalMeta?.argTypes?.slotBody,
    slotFooter: modalMeta?.argTypes?.slotFooter,
  },
  args: {
    slotHeader: 'Header',
    slotBody: 'Body',
    slotFooter: 'Footer'
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
