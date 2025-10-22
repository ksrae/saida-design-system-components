import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalClosed, ModalProps } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Events/Closed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ModalClosed();
  },
  argTypes: {
    closed: modalMeta?.argTypes?.closed,
  },
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
