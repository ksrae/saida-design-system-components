import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TagSelectable } from '../../sy-tag.main';
import tagMeta from '../../sy-tag.stories';

const meta: Meta = {
  title: 'Tag/Attributes/Selectable',
  component: 'sy-tag',
  tags: [],
  render: (args) => TagSelectable(args as { selectable: boolean }),
  argTypes: { selectable: tagMeta?.argTypes?.selectable },
  args: { selectable: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};