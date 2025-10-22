import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessProps, ModelessResizable } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Resizable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessResizable(args);
  },
  argTypes: {
    resizable: modelessMeta?.argTypes?.resizable
  },
  args: {
    resizable: true
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
