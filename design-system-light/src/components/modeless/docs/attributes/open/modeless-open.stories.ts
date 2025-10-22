import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessOpen, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Open',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessOpen(args);
  },
  argTypes: {
    open: modelessMeta?.argTypes?.open
  },
  args: {
    open: false
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
