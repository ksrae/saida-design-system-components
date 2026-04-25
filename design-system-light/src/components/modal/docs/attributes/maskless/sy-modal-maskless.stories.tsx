import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModalMaskless } from '../../sy-modal.main';

const meta: Meta = {
  title: 'Modal/Attributes/Maskless',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalMaskless(args as { maskless: boolean }),
  argTypes: {
    maskless: {
      control: 'boolean',
      description: 'Removes the dimmed backdrop behind the modal.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
  },
  args: { maskless: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
