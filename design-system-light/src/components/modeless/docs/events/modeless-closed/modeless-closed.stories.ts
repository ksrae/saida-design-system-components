import type { Meta, StoryObj } from '@storybook/web-components';
import { ModelessClosed, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Events/Closed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ModelessClosed();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
