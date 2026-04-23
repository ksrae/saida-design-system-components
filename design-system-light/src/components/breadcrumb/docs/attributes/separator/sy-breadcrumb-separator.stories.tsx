import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BreadCrumbSeparator } from '../../sy-breadcrumb.main';
import breadcrumbMeta from '../../sy-breadcrumb.stories';

const meta: Meta = {
  title: 'Breadcrumb/Attributes/Separator',
  component: 'sy-breadcrumb',
  tags: [],
  render: (args) => BreadCrumbSeparator(args as { separator: 'slash' | 'arrow' }),
  argTypes: { separator: breadcrumbMeta?.argTypes?.separator },
  args: { separator: 'slash' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
