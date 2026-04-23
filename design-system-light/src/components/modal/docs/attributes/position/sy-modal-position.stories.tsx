import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalPosition } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Position',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalPosition(args as { top: number; left: number }),
  argTypes: {
    top: modalMeta?.argTypes?.top,
    left: modalMeta?.argTypes?.left,
  },
  args: { top: 80, left: 120 },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
