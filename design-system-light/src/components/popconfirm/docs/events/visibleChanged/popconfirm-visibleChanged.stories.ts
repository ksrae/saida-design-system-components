import type { Meta, StoryObj } from '@storybook/web-components';
import { PopconfirmProps, PopconfirmVisibitChanged } from '../../popconfirm';
import popconfirmMeta from '../../popconfirm.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Events/VisibleChanged',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return PopconfirmVisibitChanged();
  },
  argTypes: {
    visibleChanged: popconfirmMeta?.argTypes?.visibleChanged
  },
};

export default meta;
type Story = StoryObj<PopconfirmProps>;


export const Param: Story = {};