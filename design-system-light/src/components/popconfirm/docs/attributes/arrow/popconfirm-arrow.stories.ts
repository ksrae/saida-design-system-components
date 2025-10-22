import type { Meta, StoryObj } from '@storybook/web-components';
import { PopconfirmProps, PopconfirmArrow } from '../../popconfirm';
import popconfirmMeta from '../../popconfirm.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Attributes/Arrow',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PopconfirmArrow(args);
  },
  argTypes: {
    arrow: popconfirmMeta?.argTypes?.arrow
  },
  args: {
    arrow: true
  }
};

export default meta;
type Story = StoryObj<PopconfirmProps>;

export const Param: Story = {}