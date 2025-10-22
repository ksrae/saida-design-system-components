import type { Meta, StoryObj } from '@storybook/web-components';
import { IconProps, IconSlot } from '../../icon';
import iconMeta from '../../icon.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<IconProps> = {
  title: 'Icon/Attributes/Slot',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return IconSlot();
  },
};

export default meta;
type Story = StoryObj<IconProps>;

export const Param: Story = {}
