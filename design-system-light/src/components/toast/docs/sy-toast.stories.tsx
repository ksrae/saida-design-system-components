import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyToastProps, Toast } from './sy-toast.main';
import { clearElements } from '../../clear-element';

const toastMeta: Meta<SyToastProps> = {
  title: 'Toast/Overview',
  component: 'sy-toast',
  tags: [],
  render: (args) => { clearElements(toastMeta.title); return Toast(args); },
  argTypes: {
    latestTop: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    duration: { control: 'number', table: { category: 'Parameter', defaultValue: { summary: 3000 as any }, type: { summary: 'number' } } },
  },
};
export default toastMeta;
type Story = StoryObj<SyToastProps>;
export const Default: Story = { args: { latestTop: false, duration: 3000 } as any };
