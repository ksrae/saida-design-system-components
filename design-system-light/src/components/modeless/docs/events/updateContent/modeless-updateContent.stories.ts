import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessGroupUpdateContent } from '../../modeless-group';
import modelessGroupMeta from '../../modeless-group.stories';
import { ModelessGroupModel } from '../../../modeless-group.element';

const meta: Meta<ModelessGroupModel> = {
  title: 'Modeless/Function/UpdateContent',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessGroupUpdateContent(args as any);
  },
  argTypes: {
    // create: modelessGroupMeta?.argTypes?.create
  },
  args: {
    content: 'Default Content',
  }
};

export default meta;
type Story = StoryObj<ModelessGroupModel>;

export const Param: Story = {}
