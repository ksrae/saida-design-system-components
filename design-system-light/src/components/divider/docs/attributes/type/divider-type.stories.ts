import type { Meta, StoryObj } from '@storybook/web-components';
import { DividerProps, DividerType } from '../../divider';
import dividerMeta from '../../divider.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<DividerProps> = {
  title: 'Divider/Attributes/Type',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DividerType(args);
  },
  argTypes: {
    type: dividerMeta?.argTypes?.type
  },
  args: {
    type: 'horizontal'
  }
};

export default meta;
type Story = StoryObj<DividerProps>;

export const Param: Story = {}