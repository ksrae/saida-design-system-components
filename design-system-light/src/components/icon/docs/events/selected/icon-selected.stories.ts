import type { Meta, StoryObj } from '@storybook/web-components';
import iconMeta from '../../icon.stories';
import { clearElements } from '../../../../clear-element';
import { IconProps, IconSelected } from '../../icon';

const meta: Meta<IconProps> = {
  title: 'Icon/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return IconSelected();
  },
  argTypes: {
    selected: iconMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<IconProps>;

export const Param: Story = {}
