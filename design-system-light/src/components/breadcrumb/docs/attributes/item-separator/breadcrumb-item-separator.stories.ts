import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { BreadCrumbItemProps, BreadCrumbItemSeparator } from '../../breadcrumb-item';
import breadcrumbItemMeta from '../../breadcrumb-item.stories';

const meta: Meta<BreadCrumbItemProps> = {
  title: 'Breadcrumb/Attributes/Item Separator',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BreadCrumbItemSeparator(args);
  },
  argTypes: {
    separator: breadcrumbItemMeta?.argTypes?.separator
  },
  args: {
    separator: 'slash'
  }
};

export default meta;
type Story = StoryObj<BreadCrumbItemProps>;

export const Param: Story = {}