import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputName } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Name',
  component: 'sy-input',
  tags: [],
  render: (args) => InputName(args as { name: string }),
  argTypes: { name: inputMeta?.argTypes?.name },
  args: { name: 'username' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
