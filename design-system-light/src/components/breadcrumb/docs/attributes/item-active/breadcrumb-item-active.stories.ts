import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { BreadCrumbItemActive, BreadCrumbItemProps } from '../../breadcrumb-item';
import breadcrumbItemMeta from '../../breadcrumb-item.stories';

const meta: Meta<BreadCrumbItemProps> = {
  title: 'Breadcrumb/Attributes/Item Active',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BreadCrumbItemActive(args);
  },
  argTypes: {
    active: breadcrumbItemMeta?.argTypes?.active
  },
  args: {
    active: true
  }
};

export default meta;
type Story = StoryObj<BreadCrumbItemProps>;

export const Param: Story = {}