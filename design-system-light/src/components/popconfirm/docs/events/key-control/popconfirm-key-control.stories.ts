import type { Meta, StoryObj } from '@storybook/web-components';
import { PopconfirmKeyControl, PopconfirmProps } from '../../popconfirm';
import popconfirmMeta from '../../popconfirm.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Events/Key Control',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return PopconfirmKeyControl();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<PopconfirmProps>;


export const Param: Story = {};