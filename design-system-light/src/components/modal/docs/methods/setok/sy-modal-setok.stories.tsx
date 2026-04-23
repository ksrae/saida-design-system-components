import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalTriggerButtons } from '../../sy-modal.main';

const meta: Meta = {
  title: 'Modal/Methods/setOk',
  component: 'sy-modal',
  tags: [],
  render: () => ModalTriggerButtons(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
