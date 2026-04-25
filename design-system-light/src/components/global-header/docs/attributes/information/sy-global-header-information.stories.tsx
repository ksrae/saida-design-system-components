import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { GlobalHeaderInformation } from '../../sy-global-header.main';
import globalHeaderMeta from '../../sy-global-header.stories';

const meta: Meta = {
  title: 'GlobalHeader/Attributes/Information',
  component: 'sy-global-header',
  tags: [],
  render: (args) => GlobalHeaderInformation(args as { information: boolean }),
  argTypes: { information: globalHeaderMeta?.argTypes?.information },
  args: { information: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};