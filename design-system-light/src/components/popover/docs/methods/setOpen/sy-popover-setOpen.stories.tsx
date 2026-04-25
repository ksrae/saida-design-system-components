import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopoverSetOpenClose } from '../../sy-popover.main';

const meta: Meta = {
  title: 'Popover/Methods/Set Open',
  component: 'sy-popover',
  tags: [],
  render: () => PopoverSetOpenClose(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};