import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessProps, ModelessSize } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessSize(args);
  },
  argTypes: {
    height: modelessMeta?.argTypes?.height,
    width: modelessMeta?.argTypes?.width,
  },
  args: {
    height: 150,
    width: 200,
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
