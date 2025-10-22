import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessGroupUpdateOption } from '../../modeless-group';
import modelessGroupMeta from '../../modeless-group.stories';
import { ModelessGroupModel } from '../../../modeless-group.element';

const meta: Meta<ModelessGroupModel> = {
  title: 'Modeless/Function/UpdateOption',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessGroupUpdateOption(args as any);
  },
  argTypes: {
    // create: modelessGroupMeta?.argTypes?.create
  },
  args: {
    option: {
      width: 300,
      height: 300,
      draggable: true,
      resizable: true
    }
  }
};

export default meta;
type Story = StoryObj<ModelessGroupModel>;

export const Param: Story = {}
