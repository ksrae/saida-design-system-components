import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModalSlot } from '../../sy-modal.main';

const meta: Meta = {
  title: 'Modal/Attributes/Slots',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalSlot(args as { slotHeader: any; slotBody: any; slotFooter: any }),
  argTypes: {
    slotHeader: { control: 'text', description: 'Header slot content', table: { category: 'Parameter' } },
    slotBody:   { control: 'text', description: 'Body slot content',   table: { category: 'Parameter' } },
    slotFooter: { control: 'text', description: 'Footer slot content', table: { category: 'Parameter' } },
  },
  args: {
    slotHeader: 'Custom header',
    slotBody: 'Custom body content.',
    slotFooter: '<sy-button variant="primary">Continue</sy-button>',
  },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
