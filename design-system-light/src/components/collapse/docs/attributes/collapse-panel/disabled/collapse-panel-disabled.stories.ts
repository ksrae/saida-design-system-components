import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../../clear-element';
import { CollapsePanelDisabled, CollapsePanelProps } from '../../../collapse-panel';
import collapsePanelMeta from '../../../collapse-panel.stories';

const meta: Meta<CollapsePanelProps> = {
  title: 'Collapse/Attributes/Panel/Panel-Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CollapsePanelDisabled(args);
  },
  argTypes: {
    disabled: collapsePanelMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<CollapsePanelProps>;

export const Param: Story = {}