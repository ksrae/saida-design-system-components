import type { Meta, StoryObj } from '@storybook/web-components';
import { ModelessPositionEvent, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Events/Position',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ModelessPositionEvent();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
