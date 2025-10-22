import type { Meta, StoryObj } from '@storybook/web-components';
import { PopconfirmProps, PopconfirmPosition } from '../../popconfirm';
import popconfirmMeta from '../../popconfirm.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Attributes/Position',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return PopconfirmPosition();
  },
  argTypes: {
    position: popconfirmMeta?.argTypes?.position,
  },
};

export default meta;
type Story = StoryObj<PopconfirmProps>;

export const Param: Story = {}