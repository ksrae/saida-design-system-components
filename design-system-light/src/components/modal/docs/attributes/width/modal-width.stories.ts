import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalWidth } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/Width',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalWidth(args);
  },
  argTypes: {
    width: modalMeta?.argTypes?.width
  },
  args: {
    width: 500
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
