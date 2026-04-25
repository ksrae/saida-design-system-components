import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputAutofocus } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Autofocus',
  component: 'sy-input',
  tags: [],
  render: (args) => InputAutofocus(args as { autofocus: boolean }),
  argTypes: { autofocus: inputMeta?.argTypes?.autofocus },
  args: { autofocus: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
