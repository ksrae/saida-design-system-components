import type { Meta, StoryObj } from '@storybook/web-components';
import { BreadCrumbProps, BreadCrumbSeparator } from '../../breadcrumb';
import { clearElements } from '../../../../clear-element';
import breadcrumbMeta from '../../breadcrumb.stories';

const meta: Meta<BreadCrumbProps> = {
  title: 'Breadcrumb/Attributes/Separator',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BreadCrumbSeparator(args);
  },
  argTypes: {
    separator: breadcrumbMeta?.argTypes?.separator
  },
  args: {
    separator: 'slash'
  }
};

export default meta;
type Story = StoryObj<BreadCrumbProps>;

export const Param: Story = {}

