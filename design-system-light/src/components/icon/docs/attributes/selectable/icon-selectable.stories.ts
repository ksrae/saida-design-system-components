import type { Meta, StoryObj } from '@storybook/web-components';
import { IconProps, IconSelectable } from '../../icon';
import iconMeta from '../../icon.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<IconProps> = {
  title: 'Icon/Attributes/Selectable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return IconSelectable(args);
  },
  argTypes: {
    selectable: iconMeta?.argTypes?.selectable
  },
  args: {
    selectable: false
  }
};

export default meta;
type Story = StoryObj<IconProps>;

export const Param: Story = {}