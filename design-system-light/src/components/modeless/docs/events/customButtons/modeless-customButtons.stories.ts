import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessCustomButtons, ModelessProps } from '../../modeless';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Function/CustomButtons',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ModelessCustomButtons();
  },
  argTypes: {
    
  },
  args: {
    
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
