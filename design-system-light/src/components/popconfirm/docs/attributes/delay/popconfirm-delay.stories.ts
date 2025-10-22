import type { Meta, StoryObj } from '@storybook/web-components';
import { PopconfirmProps, PopconfirmDelay } from '../../popconfirm';
import popconfirmMeta from '../../popconfirm.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Attributes/Delay',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PopconfirmDelay(args);
  },
  argTypes: {
    opendelay: popconfirmMeta?.argTypes?.opendelay,
    closedelay: popconfirmMeta?.argTypes?.closedelay,
  },
  args: {
    opendelay: 1000,
    closedelay: 1000
  }
};

export default meta;
type Story = StoryObj<PopconfirmProps>;

export const Param: Story = {}