import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalCanceltext } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Cancel Text',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalCanceltext(args as { cancelText: string }),
  argTypes: { cancelText: modalMeta?.argTypes?.cancelText },
  args: { cancelText: 'Dismiss' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
