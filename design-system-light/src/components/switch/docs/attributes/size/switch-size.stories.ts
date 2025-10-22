import type { Meta, StoryObj } from '@storybook/web-components';
import { SwitchProps, SwitchSize } from '../../switch';
import switchMeta from '../../switch.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SwitchProps> = {
  title: 'Switch/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SwitchSize(args);
  },
  argTypes: {
    size: switchMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<SwitchProps>;

export const Param: Story = {}
