import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessGroupCloseAll } from '../../modeless-group';
import modelessGroupMeta from '../../modeless-group.stories';
import { ModelessGroupModel } from '../../../modeless-group.element';

const meta: Meta<ModelessGroupModel> = {
  title: 'Modeless/Function/CloseAll',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ModelessGroupCloseAll();
  },
  argTypes: {
    // create: modelessGroupMeta?.argTypes?.create
  },
  args: {
    
  }
};

export default meta;
type Story = StoryObj<ModelessGroupModel>;

export const Param: Story = {}
