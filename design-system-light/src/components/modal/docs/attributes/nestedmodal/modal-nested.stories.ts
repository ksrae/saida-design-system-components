import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, NestedModal } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/NestedModal',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return NestedModal();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
