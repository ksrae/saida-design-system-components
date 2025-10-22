import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessMinimizable, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Minimizable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessMinimizable(args);
  },
  argTypes: {
    minimizable: modelessMeta?.argTypes?.minimizable
  },
  args: {
    minimizable: true
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
