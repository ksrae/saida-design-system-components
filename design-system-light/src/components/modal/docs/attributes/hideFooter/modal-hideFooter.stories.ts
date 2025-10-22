import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalHideFooter } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/Hide Footer',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalHideFooter(args);
  },
  argTypes: {
    hideFooter: modalMeta?.argTypes?.hideFooter
  },
  args: {
    hideFooter: true
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
