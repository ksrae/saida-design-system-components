import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavDisabled } from '../../sy-nav.main';
import navMeta from '../../sy-nav.stories';

const meta: Meta = {
  title: 'Nav/Attributes/Disabled',
  component: 'sy-nav',
  tags: [],
  render: (args) => NavDisabled(args as { disabled: boolean }),
  argTypes: { disabled: navMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};