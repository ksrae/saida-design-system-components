import type { Meta, StoryObj } from '@storybook/web-components';
import { ModalProps, ModalOktext } from '../../modal';
import modalMeta from '../../modal.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModalProps> = {
  title: 'Modal/Attributes/OkText',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModalOktext(args);
  },
  argTypes: {
    okText: modalMeta?.argTypes?.okText
  },
  args: {
    okText: '<i>text is allowed, as well as html.</i>'
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Param: Story = {}
