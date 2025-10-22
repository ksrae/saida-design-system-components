import type { Meta, StoryObj } from '@storybook/web-components';
import { CollapseDisabled, CollapseProps } from '../../../collapse';
import { clearElements } from '../../../../../clear-element';
import collapseMeta from '../../../collapse.stories';

const meta: Meta<CollapseProps> = {
  title: 'Collapse/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CollapseDisabled(args);
  },
  argTypes: {
    disabled: collapseMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<CollapseProps>;

export const Param: Story = {}