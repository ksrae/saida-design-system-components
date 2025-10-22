import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../../clear-element';
import { CollapsePanelArrow, CollapsePanelProps } from '../../../collapse-panel';
import collapsePanelMeta from '../../../collapse-panel.stories';

const meta: Meta<CollapsePanelProps> = {
  title: 'Collapse/Attributes/Panel/Panel-Arrow',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CollapsePanelArrow(args);
  },
  argTypes: {
    arrow: collapsePanelMeta?.argTypes?.arrow
  },
  args: {
    arrow: true
  }
};

export default meta;
type Story = StoryObj<CollapsePanelProps>;

export const Param: Story = {}