import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalVariant } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalVariant(args);
  },
  argTypes: {
    variant: modalMeta?.argTypes?.variant
  },
  args: {
    variant: 'modal'
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
