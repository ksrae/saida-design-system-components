import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessGroupClose } from '../../modeless-group';
import modelessGroupMeta from '../../modeless-group.stories';
import { ModelessGroupModel } from '../../../modeless-group.element';

const meta: Meta<ModelessGroupModel> = {
  title: 'Modeless/Function/Close',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessGroupClose(args as any);
  },
  argTypes: {
    // create: modelessGroupMeta?.argTypes?.create
  },
  args: {
    id: 'modelessClose1'
  }
};

export default meta;
type Story = StoryObj<ModelessGroupModel>;

export const Param: Story = {}
