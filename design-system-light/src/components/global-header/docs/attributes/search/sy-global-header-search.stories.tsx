import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { GlobalHeaderSearch } from '../../sy-global-header.main';
import globalHeaderMeta from '../../sy-global-header.stories';

const meta: Meta = {
  title: 'GlobalHeader/Attributes/Search',
  component: 'sy-global-header',
  tags: [],
  render: (args) => GlobalHeaderSearch(args as { search: boolean }),
  argTypes: { search: globalHeaderMeta?.argTypes?.search },
  args: { search: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};