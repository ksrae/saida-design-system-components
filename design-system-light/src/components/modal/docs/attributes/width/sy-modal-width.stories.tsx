import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModalWidth } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Width',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalWidth(args as { width: number }),
  argTypes: { width: modalMeta?.argTypes?.width },
  args: { width: 600 },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
