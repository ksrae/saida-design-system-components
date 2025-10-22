import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalTriggerButtons } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Function/Trigger',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ModalTriggerButtons();
  },
  argTypes: {
    setCancel: modalMeta?.argTypes?.setCancel,
    setOk: modalMeta?.argTypes?.setOk,
    setClose: modalMeta?.argTypes?.setClose,
    setOpen: modalMeta?.argTypes?.setOpen,
  },
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
