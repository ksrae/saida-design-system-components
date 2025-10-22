import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalPosition, ModalProps } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalPosition(args);
  },
  argTypes: {
    top: modalMeta?.argTypes?.top,
    left: modalMeta?.argTypes?.left,
  },
  args: {
    top: undefined,
    left: undefined,
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
