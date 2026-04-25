import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyPopoverProps, Popover } from './sy-popover.main';
import { clearElements } from '../../clear-element';

const popoverMeta: Meta<SyPopoverProps> = {
  title: 'Popover/Overview',
  component: 'sy-popover',
  tags: [],
  render: (args) => {
    clearElements(popoverMeta.title);
    return Popover(args);
  },
  argTypes: {
    arrow: { control: 'boolean', description: 'Show arrow indicator.', table: { category: 'Parameter', defaultValue: { summary: true as any }, type: { summary: 'boolean' } } },
    open: { control: 'boolean', description: 'Open state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    position: { control: 'select', options: ['top','bottom','left','right','topLeft','topRight','bottomLeft','bottomRight','leftTop','leftBottom','rightTop','rightBottom'], description: 'Placement position.', table: { category: 'Parameter', defaultValue: { summary: 'top' }, type: { summary: 'Position' } } },
    trigger: { control: 'select', options: ['hover','click','focus','none'], description: 'Open trigger.', table: { category: 'Parameter', defaultValue: { summary: 'hover' }, type: { summary: 'hover | click | focus | none' } } },
    opendelay: { control: 'number', description: 'Open delay (ms).', table: { category: 'Parameter', defaultValue: { summary: 200 as any }, type: { summary: 'number' } } },
    closedelay: { control: 'number', description: 'Close delay (ms).', table: { category: 'Parameter', defaultValue: { summary: 500 as any }, type: { summary: 'number' } } },
    sticky: { control: 'boolean', description: 'Prevents auto-close on outside interaction.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    slot: { control: 'text', description: 'Target + body slot HTML.', table: { category: 'Parameter', type: { summary: 'HTML' } } },
  },
};

export default popoverMeta;
type Story = StoryObj<SyPopoverProps>;

export const Default: Story = {
  args: {
    arrow: true, open: false, position: 'top', trigger: 'hover', opendelay: 200, closedelay: 500, sticky: false,
    slot: '<sy-button slot="target">Target</sy-button><span>Popover body</span>',
  },
};
