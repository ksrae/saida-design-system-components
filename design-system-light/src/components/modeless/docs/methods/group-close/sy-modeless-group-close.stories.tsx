import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ModelessGroupClose } from '../../sy-modeless-group.main';

const meta: Meta = {
  title: 'Modeless/Group Methods/Close',
  component: 'sy-modeless-group',
  tags: [],
  render: () => ModelessGroupClose(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};