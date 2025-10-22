import type { Meta, StoryObj } from '@storybook/web-components';
import { PopconfirmMaunalControl, PopconfirmProps } from '../../popconfirm';
import popconfirmMeta from '../../popconfirm.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Events/Manual Control',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return PopconfirmMaunalControl();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<PopconfirmProps>;


export const Param: Story = {};