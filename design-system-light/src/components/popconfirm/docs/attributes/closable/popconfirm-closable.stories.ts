import type { Meta, StoryObj } from '@storybook/web-components';
import { PopconfirmProps, PopconfirmClosable } from '../../popconfirm';
import popconfirmMeta from '../../popconfirm.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Attributes/Closable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return PopconfirmClosable(args);
  },
  argTypes: {
    closable: popconfirmMeta?.argTypes?.closable
  },
  args: {
    closable: true
  }
};

export default meta;
type Story = StoryObj<PopconfirmProps>;

export const Param: Story = {}