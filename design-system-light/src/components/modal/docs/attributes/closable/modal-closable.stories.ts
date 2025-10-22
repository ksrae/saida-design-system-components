import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalClosable } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/Closable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalClosable(args);
  },
  argTypes: {
    closable: modalMeta?.argTypes?.closable
  },
  args: {
    closable: true
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
