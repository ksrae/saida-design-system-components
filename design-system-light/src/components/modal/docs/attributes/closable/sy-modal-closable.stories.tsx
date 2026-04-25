import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModalClosable } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Closable',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalClosable(args as { closable: boolean }),
  argTypes: { closable: modalMeta?.argTypes?.closable },
  args: { closable: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
