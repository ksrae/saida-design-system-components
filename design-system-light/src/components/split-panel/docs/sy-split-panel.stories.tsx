import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SySplitPanelProps, SplitPanel } from './sy-split-panel.main';
import { clearElements } from '../../clear-element';

const splitPanelMeta: Meta<SySplitPanelProps> = {
  title: 'SplitPanel/Overview',
  component: 'sy-split-panel',
  tags: [],
  render: (args) => {
    clearElements(splitPanelMeta.title);
    return SplitPanel(args);
  },
  argTypes: {
    disabled: { control: 'boolean', description: 'Disables drag resizing.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    hideDivider: { control: 'boolean', name: 'hideDivider (hide-divider)', description: 'Hides the divider.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    minRatio: { control: { type: 'number', min: 0, max: 50 }, name: 'minRatio (min-ratio)', description: 'Minimum ratio for either side.', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    ratio: { control: { type: 'number', min: 0, max: 100 }, description: 'Initial split ratio (0–100).', table: { category: 'Parameter', defaultValue: { summary: 50 as any }, type: { summary: 'number' } } },
    type: { control: 'select', options: ['horizontal', 'vertical'], description: 'Split orientation.', table: { category: 'Parameter', defaultValue: { summary: 'horizontal' }, type: { summary: 'horizontal | vertical' } } },
    horizontalChanged: { type: 'function', description: 'Emitted when horizontal split changes.', table: { category: 'Callback', type: { summary: `.addEventListener('horizontalChanged', (e) => {})` } } },
    verticalChanged: { type: 'function', description: 'Emitted when vertical split changes.', table: { category: 'Callback', type: { summary: `.addEventListener('verticalChanged', (e) => {})` } } },
  },
};

export default splitPanelMeta;
type Story = StoryObj<SySplitPanelProps>;

export const Default: Story = {
  args: { disabled: false, hideDivider: false, minRatio: 0, ratio: 50, type: 'horizontal' },
};
