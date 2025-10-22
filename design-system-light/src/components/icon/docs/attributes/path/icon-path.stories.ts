import type { Meta, StoryObj } from '@storybook/web-components';
import { IconPath, IconProps } from '../../icon';
import iconMeta from '../../icon.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<IconProps> = {
  title: 'Icon/Attributes/Path',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return IconPath(args);
  },
  argTypes: {
    path: iconMeta?.argTypes?.path
  },
  args: {
    path: 'https://unpkg.com/feather-icons/dist/icons/alert-circle.svg'
  }
};

export default meta;
type Story = StoryObj<IconProps>;

export const Param: Story = {}
