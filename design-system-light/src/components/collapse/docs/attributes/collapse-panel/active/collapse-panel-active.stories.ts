import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../../clear-element';
import { CollapsePanelActive, CollapsePanelProps } from '../../../collapse-panel';
import collapsePanelMeta from '../../../collapse-panel.stories';

const meta: Meta<CollapsePanelProps> = {
  title: 'Collapse/Attributes/Panel/Panel-Active',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CollapsePanelActive(args);
  },
  argTypes: {
    active: collapsePanelMeta?.argTypes?.active
  },
  args: {
    active: true
  }
};

export default meta;
type Story = StoryObj<CollapsePanelProps>;

export const Param: Story = {}