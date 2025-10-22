import type { Meta, StoryObj } from '@storybook/web-components';
import { CollapseBorderless, CollapseProps } from '../../../collapse';
import { clearElements } from '../../../../../clear-element';
import collapseMeta from '../../../collapse.stories';

const meta: Meta<CollapseProps> = {
  title: 'Collapse/Attributes/Borderless',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CollapseBorderless(args);
  },
  argTypes: {
    borderless: collapseMeta?.argTypes?.borderless
  },
  args: {
    borderless: true
  }
};

export default meta;
type Story = StoryObj<CollapseProps>;

export const Param: Story = {}