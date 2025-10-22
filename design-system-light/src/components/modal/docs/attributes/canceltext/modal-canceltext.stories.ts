import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalCanceltext } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/CancelText',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalCanceltext(args);
  },
  argTypes: {
    cancelText: modalMeta?.argTypes?.cancelText
  },
  args: {
    cancelText: '<i>text is allowed, as well as html.</i>'
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
