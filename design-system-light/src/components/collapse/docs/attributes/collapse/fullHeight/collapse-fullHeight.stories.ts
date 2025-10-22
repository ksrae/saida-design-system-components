import type { Meta, StoryObj } from '@storybook/web-components';
import { CollapseFullHeight, CollapseProps } from '../../../collapse';
import { clearElements } from '../../../../../clear-element';
import collapseMeta from '../../../collapse.stories';

const meta: Meta<CollapseProps> = {
  title: 'Collapse/Attributes/Fullheight',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CollapseFullHeight(args);
  },
  argTypes: {
    fullheight: collapseMeta?.argTypes?.fullheight
  },
  args: {
    fullheight: true
  }
};

export default meta;
type Story = StoryObj<CollapseProps>;

export const Param: Story = {}