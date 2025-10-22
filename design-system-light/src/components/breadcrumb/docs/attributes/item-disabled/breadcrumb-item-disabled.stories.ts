import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { BreadCrumbItemDisabled, BreadCrumbItemProps } from '../../breadcrumb-item';
import breadcrumbItemMeta from '../../breadcrumb-item.stories';

const meta: Meta<BreadCrumbItemProps> = {
  title: 'Breadcrumb/Attributes/Item Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return BreadCrumbItemDisabled(args);
  },
  argTypes: {
    disabled: breadcrumbItemMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<BreadCrumbItemProps>;

export const Param: Story = {}