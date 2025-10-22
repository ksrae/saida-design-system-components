import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalEnableModalMaximize } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/EnableModalMaximize',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalEnableModalMaximize(args);
  },
  argTypes: {
    enableModalMaximize: modalMeta?.argTypes?.enableModalMaximize
  },
  args: {
    enableModalMaximize: false
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
