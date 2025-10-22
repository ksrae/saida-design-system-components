import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessEdge, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Edge',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessEdge(args);
  },
  argTypes: {
    edge: modelessMeta?.argTypes?.edge
  },
  args: {
    edge: true
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
