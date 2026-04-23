import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyToastItemProps, ToastItem } from './sy-toast.main';
import { clearElements } from '../../clear-element';

const toastItemMeta: Meta<SyToastItemProps> = {
  title: 'Toast/Item Overview',
  component: 'sy-toast-item',
  tags: [],
  render: (args) => { clearElements(toastItemMeta.title); return ToastItem(args); },
  argTypes: {
    open: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    position: { control: 'select', options: ['topLeft','topRight','bottomLeft','bottomRight'], table: { category: 'Parameter', defaultValue: { summary: 'bottomRight' }, type: { summary: 'topLeft | topRight | bottomLeft | bottomRight' } } },
    variant: { control: 'select', options: ['neutral','success','error','info','warning'], table: { category: 'Parameter', defaultValue: { summary: 'neutral' }, type: { summary: 'neutral | success | error | info | warning' } } },
    closable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    duration: { control: 'number', table: { category: 'Parameter', type: { summary: 'number' } } },
  },
};
export default toastItemMeta;
type Story = StoryObj<SyToastItemProps>;
export const Default: Story = { args: { open: true, position: 'bottomRight', variant: 'neutral', closable: false, duration: 3000 } as any };
