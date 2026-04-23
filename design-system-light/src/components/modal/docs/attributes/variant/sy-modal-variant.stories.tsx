import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModalVariant } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Variant',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalVariant(args as { variant: 'modal'|'dialog' }),
  argTypes: { variant: modalMeta?.argTypes?.variant },
  args: { variant: 'modal' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
