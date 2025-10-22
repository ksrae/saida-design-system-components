import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalMaskclosable } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/MaskClosable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalMaskclosable(args);
  },
  argTypes: {
    maskClosable: modalMeta?.argTypes?.maskClosable
  },
  args: {
    maskClosable: true
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
