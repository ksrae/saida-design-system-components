import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyModelessProps, Modeless } from './sy-modeless.main';
import { clearElements } from '../../clear-element';

const modelessMeta: Meta<SyModelessProps> = {
  title: 'Modeless/Overview',
  component: 'sy-modeless',
  tags: [],
  render: (args) => { clearElements(modelessMeta.title); return Modeless(args); },
  argTypes: {
    open: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    isdraggable: { control: 'boolean', name: 'draggable', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    resizable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    closable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    minimizable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    maximizable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    edge: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    maximum: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    minimum: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    top: { control: 'number', table: { category: 'Parameter', type: { summary: 'number' } } },
    left: { control: 'number', table: { category: 'Parameter', type: { summary: 'number' } } },
    width: { control: 'number', table: { category: 'Parameter', defaultValue: { summary: 200 as any }, type: { summary: 'number' } } },
    height: { control: 'number', table: { category: 'Parameter', defaultValue: { summary: 150 as any }, type: { summary: 'number' } } },
    minWidth: { control: 'number', table: { category: 'Parameter', type: { summary: 'number' } } },
    minHeight: { control: 'number', table: { category: 'Parameter', type: { summary: 'number' } } },
    closed: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('closed', (e) => {})` } } },
    statusChanged: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('statusChanged', (e) => {})` } } },
    positionChanged: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('positionChanged', (e) => {})` } } },
  },
};

export default modelessMeta;
type Story = StoryObj<SyModelessProps>;
export const Default: Story = { args: { open: true, resizable: true, closable: true, minimizable: true, maximizable: true, width: 240, height: 160 } as any };
