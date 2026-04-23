import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalHideFooter } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Hide Footer',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalHideFooter(args as { hideFooter: boolean }),
  argTypes: { hideFooter: modalMeta?.argTypes?.hideFooter },
  args: { hideFooter: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
