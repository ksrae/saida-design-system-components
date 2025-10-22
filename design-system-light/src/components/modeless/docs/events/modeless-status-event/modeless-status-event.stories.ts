import type { Meta, StoryObj } from '@storybook/web-components';
import { ModelessProps, ModelessStatusEvent } from '../../modeless';
import modelessMeta from '../../modeless.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Events/Status',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ModelessStatusEvent();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
