import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessMaximum, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Maximum',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessMaximum(args);
  },
  argTypes: {
    maximum: modelessMeta?.argTypes?.maximum
  },
  args: {
    maximum: true
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
