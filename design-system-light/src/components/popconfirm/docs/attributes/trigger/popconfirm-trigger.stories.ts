import type { Meta, StoryObj } from '@storybook/web-components';
import { PopconfirmProps, PopconfirmTrigger } from '../../popconfirm';
import popconfirmMeta from '../../popconfirm.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Attributes/Trigger',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PopconfirmTrigger(args);
  },
  argTypes: {
    trigger: popconfirmMeta?.argTypes?.trigger
  },
  args: {
    trigger: 'click'
  }
};

export default meta;
type Story = StoryObj<PopconfirmProps>;

export const Param: Story = {}