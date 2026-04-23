import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { GlobalHeaderAppTitle } from '../../sy-global-header.main';
import globalHeaderMeta from '../../sy-global-header.stories';

const meta: Meta = {
  title: 'GlobalHeader/Attributes/App Title',
  component: 'sy-global-header',
  tags: [],
  render: (args) => GlobalHeaderAppTitle(args as { appTitle: string }),
  argTypes: { appTitle: globalHeaderMeta?.argTypes?.appTitle },
  args: { appTitle: 'Header' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};