import type { Meta, StoryObj } from '@storybook/web-components';
import { CollapseGhost, CollapseProps } from '../../../collapse';
import { clearElements } from '../../../../../clear-element';
import collapseMeta from '../../../collapse.stories';

const meta: Meta<CollapseProps> = {
  title: 'Collapse/Attributes/Ghost',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CollapseGhost(args);
  },
  argTypes: {
    ghost: collapseMeta?.argTypes?.ghost
  },
  args: {
    ghost: true
  }
};

export default meta;
type Story = StoryObj<CollapseProps>;

export const Param: Story = {}