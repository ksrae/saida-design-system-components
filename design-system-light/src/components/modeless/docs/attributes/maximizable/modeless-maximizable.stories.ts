import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessMaximizable, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Maximizable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessMaximizable(args);
  },
  argTypes: {
    maximizable: modelessMeta?.argTypes?.maximizable
  },
  args: {
    maximizable: true
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
