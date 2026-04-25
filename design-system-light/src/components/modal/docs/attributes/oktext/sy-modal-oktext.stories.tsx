import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ModalOktext } from '../../sy-modal.main';
import modalMeta from '../../sy-modal.stories';

const meta: Meta = {
  title: 'Modal/Attributes/Ok Text',
  component: 'sy-modal',
  tags: [],
  render: (args) => ModalOktext(args as { okText: string }),
  argTypes: { okText: modalMeta?.argTypes?.okText },
  args: { okText: 'Confirm' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
