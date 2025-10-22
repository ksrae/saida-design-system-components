import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessGroupUpdateTitle } from '../../modeless-group';
import modelessGroupMeta from '../../modeless-group.stories';
import { ModelessGroupModel } from '../../../modeless-group.element';

const meta: Meta<ModelessGroupModel> = {
  title: 'Modeless/Function/UpdateTitle',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessGroupUpdateTitle(args as any);
  },
  argTypes: {
    // create: modelessGroupMeta?.argTypes?.create
  },
  args: {
    title: 'Modeless',
  }
};

export default meta;
type Story = StoryObj<ModelessGroupModel>;

export const Param: Story = {}
