import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessPosition, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessPosition(args);
  },
  argTypes: {
    top: modelessMeta?.argTypes?.top,
    left: modelessMeta?.argTypes?.left,
  },
  args: {
    top: 0,
    left: 0
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
