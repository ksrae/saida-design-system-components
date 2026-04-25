import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { GlobalHeaderSticky } from '../../sy-global-header.main';
import globalHeaderMeta from '../../sy-global-header.stories';

const meta: Meta = {
  title: 'GlobalHeader/Attributes/Sticky',
  component: 'sy-global-header',
  tags: [],
  render: (args) => GlobalHeaderSticky(args as { sticky: boolean }),
  argTypes: { sticky: globalHeaderMeta?.argTypes?.sticky },
  args: { sticky: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};