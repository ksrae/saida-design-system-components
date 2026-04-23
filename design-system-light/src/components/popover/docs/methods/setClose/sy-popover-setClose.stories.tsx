import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopoverSetOpenClose } from '../../sy-popover.main';

const meta: Meta = {
  title: 'Popover/Methods/Set Close',
  component: 'sy-popover',
  tags: [],
  render: () => PopoverSetOpenClose(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};