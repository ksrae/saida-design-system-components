import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessGroupCreate, ModelessGroupProps } from '../../modeless-group';
import modelessGroupMeta from '../../modeless-group.stories';
import { ModelessGroupModel } from '../../../modeless-group.element';

const meta: Meta<ModelessGroupModel> = {
  title: 'Modeless/Function/Create',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessGroupCreate(args);
  },
  argTypes: {
    // create: modelessGroupMeta?.argTypes?.create
  },
  args: {
    id: 'modeless1',
    content: 'content',
    title: 'title',
    option: {
      top: 0,
      left: 0,
      width: 300,
      height: 300,
      draggable: true,
      resizable: true,
      closable: true,
      edge: false,
      maximizable: false,
      minimizable: false,
    }
  }
};

export default meta;
type Story = StoryObj<ModelessGroupProps>;

export const Param: Story = {}
