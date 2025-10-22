import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessDraggable, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Draggable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessDraggable(args);
  },
  argTypes: {
    draggable: modelessMeta?.argTypes?.draggable
  },
  args: {
    draggable: true
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
