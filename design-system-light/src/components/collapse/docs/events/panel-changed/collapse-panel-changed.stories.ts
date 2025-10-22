import type { Meta, StoryObj } from '@storybook/web-components';
import { CollapsePanelProps, CollapsePanelChanged } from '../../collapse-panel';
import collapseMeta from '../../collapse-panel.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<CollapsePanelProps> = {
  title: 'Collapse/Events/Panel Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return CollapsePanelChanged();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<CollapsePanelProps>;


export const Param: Story = {};