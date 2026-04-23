import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalEnableModalMaximize } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Enable Maximize',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalEnableModalMaximize(args as { enableModalMaximize: boolean }),
  argTypes: { enableModalMaximize: modalMeta?.argTypes?.enableModalMaximize },
  args: { enableModalMaximize: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
