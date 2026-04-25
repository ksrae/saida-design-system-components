import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { GlobalHeaderNotification } from '../../sy-global-header.main';
import globalHeaderMeta from '../../sy-global-header.stories';

const meta: Meta = {
  title: 'GlobalHeader/Attributes/Notification',
  component: 'sy-global-header',
  tags: [],
  render: (args) => GlobalHeaderNotification(args as { notification: boolean }),
  argTypes: { notification: globalHeaderMeta?.argTypes?.notification },
  args: { notification: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};