import type { Meta, StoryObj } from '@storybook/web-components';
import { PopconfirmProps, PopconfirmSelected } from '../../popconfirm';
import popconfirmMeta from '../../popconfirm.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return PopconfirmSelected();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<PopconfirmProps>;


export const Param: Story = {};