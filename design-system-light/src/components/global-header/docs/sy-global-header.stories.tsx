import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyGlobalHeaderProps, GlobalHeader } from './sy-global-header.main';
import { clearElements } from '../../clear-element';

const globalHeaderMeta: Meta<SyGlobalHeaderProps> = {
  title: 'GlobalHeader/Overview',
  component: 'sy-global-header',
  tags: [],
  render: (args) => {
    clearElements(globalHeaderMeta.title);
    return GlobalHeader(args);
  },
  argTypes: {
    appTitle: { control: 'text', name: 'appTitle (title)', description: 'Application title shown in header.', table: { category: 'Parameter', type: { summary: 'string' } } },
    sticky: { control: 'boolean', description: 'Stick to top.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    search: { control: 'boolean', description: 'Show search action.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    information: { control: 'boolean', description: 'Show information action.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    notification: { control: 'boolean', description: 'Show notification action.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    changed: { type: 'function', description: 'Emitted when tab changes.', table: { category: 'Callback', type: { summary: `.addEventListener('changed', (e) => {})` } } },
    actionClick: { type: 'function', description: 'Emitted on action icon click.', table: { category: 'Callback', type: { summary: `.addEventListener('actionClick', (e) => {})` } } },
    selected: { type: 'function', description: 'Emitted on selection.', table: { category: 'Callback', type: { summary: `.addEventListener('selected', (e) => {})` } } },
  },
};

export default globalHeaderMeta;
type Story = StoryObj<SyGlobalHeaderProps>;

export const Default: Story = {
  args: { appTitle: 'My Application', sticky: false, search: true, information: true, notification: true },
};
