import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../../clear-element';
import { CollapsePanelGhost, CollapsePanelProps } from '../../../collapse-panel';
import collapsePanelMeta from '../../../collapse-panel.stories';

const meta: Meta<CollapsePanelProps> = {
  title: 'Collapse/Attributes/Panel/Panel-Ghost',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CollapsePanelGhost(args);
  },
  argTypes: {
    ghost: collapsePanelMeta?.argTypes?.ghost
  },
  args: {
    ghost: true
  }
};

export default meta;
type Story = StoryObj<CollapsePanelProps>;

export const Param: Story = {}