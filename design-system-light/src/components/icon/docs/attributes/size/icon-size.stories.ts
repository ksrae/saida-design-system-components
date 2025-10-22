import type { Meta, StoryObj } from '@storybook/web-components';
import { IconProps, IconSize } from '../../icon';
import iconMeta from '../../icon.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<IconProps> = {
  title: 'Icon/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return IconSize(args);
  },
  argTypes: {
    size: iconMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<IconProps>;

export const Param: Story = {}