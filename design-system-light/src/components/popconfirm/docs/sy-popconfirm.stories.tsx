import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyPopconfirmProps, Popconfirm } from './sy-popconfirm.main';
import { clearElements } from '../../clear-element';

const popconfirmMeta: Meta<SyPopconfirmProps> = {
  title: 'Popconfirm/Overview',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => {
    clearElements(popconfirmMeta.title);
    return Popconfirm(args);
  },
  argTypes: {
    arrow: { control: 'boolean', description: 'Show arrow indicator.', table: { category: 'Parameter', defaultValue: { summary: true as any }, type: { summary: 'boolean' } } },
    closable: { control: 'boolean', description: 'Show close button.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    position: { control: 'select', options: ['top','bottom','left','right','topLeft','topRight','bottomLeft','bottomRight','leftTop','leftBottom','rightTop','rightBottom'], description: 'Placement position.', table: { category: 'Parameter', defaultValue: { summary: 'top' }, type: { summary: 'Position' } } },
    trigger: { control: 'radio', options: ['click', 'none'], description: 'Open trigger.', table: { category: 'Parameter', defaultValue: { summary: 'click' }, type: { summary: 'click | none' } } },
    opendelay: { control: 'number', description: 'Open delay (ms).', table: { category: 'Parameter', defaultValue: { summary: 200 as any }, type: { summary: 'number' } } },
    closedelay: { control: 'number', description: 'Close delay (ms).', table: { category: 'Parameter', defaultValue: { summary: 500 as any }, type: { summary: 'number' } } },
    confirmText: { control: 'text', name: 'confirmText (confirm-text)', description: 'Confirm button label.', table: { category: 'Parameter', defaultValue: { summary: 'OK' }, type: { summary: 'string' } } },
    cancelText: { control: 'text', name: 'cancelText (cancel-text)', description: 'Cancel button label.', table: { category: 'Parameter', defaultValue: { summary: 'Cancel' }, type: { summary: 'string' } } },
    sticky: { control: 'boolean', description: 'Prevents auto-close.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    slot: { control: 'text', description: 'Target / default slot content.', table: { category: 'Parameter', type: { summary: 'HTML' } } },
    slotTitle: { control: 'text', description: 'Title slot content.', table: { category: 'Parameter', type: { summary: 'HTML' } } },
    visibleChanged: { type: 'function', description: 'Emitted when popup visibility changes.', table: { category: 'Callback', type: { summary: `.addEventListener('visibleChanged', (e) => {})` } } },
    selected: { type: 'function', description: 'Emitted with selected action.', table: { category: 'Callback', type: { summary: `.addEventListener('selected', (e) => {})` } } },
  },
};

export default popconfirmMeta;
type Story = StoryObj<SyPopconfirmProps>;

export const Default: Story = {
  args: {
    arrow: true, closable: false, position: 'top', trigger: 'click', opendelay: 200, closedelay: 500,
    confirmText: 'OK', cancelText: 'Cancel', sticky: false,
    slotTitle: '<span slot="title">Are you sure?</span>',
    slot: '<sy-button slot="target">Target</sy-button>',
  },
};
