import type { Meta, StoryObj } from '@storybook/web-components';
import { BreadCrumbProps, BreadCrumbSelected } from '../../breadcrumb';
import breadcrumbMeta from '../../breadcrumb.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<BreadCrumbProps> = {
  title: 'Breadcrumb/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return BreadCrumbSelected();
  },
  argTypes: {
    selected: breadcrumbMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<BreadCrumbProps>;


export const Param: Story = {};