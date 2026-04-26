import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyTooltipProps, Tooltip } from './sy-tooltip.main';
import { clearElements } from '../../clear-element';

const tooltipMeta: Meta<SyTooltipProps> = {
  title: 'Tooltip/Overview',
  component: 'sy-tooltip',
  tags: [],
  render: (args) => {
    clearElements(tooltipMeta.title);
    return Tooltip(args);
  },
  argTypes: {
    hideArrow: { control: 'boolean', name: 'hideArrow (hide-arrow)', description: 'Hides the arrow indicator.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    open: { control: 'boolean', description: 'Controls the visibility (works with trigger="none").', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    closedelay: { control: 'number', description: 'Delay before closing (ms).', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    maxWidth: { control: 'number', name: 'maxWidth (max-width)', description: 'Maximum tooltip width in px.', table: { category: 'Parameter', defaultValue: { summary: 'null' as any }, type: { summary: 'number | null' } } },
    opendelay: { control: 'number', description: 'Delay before opening (ms).', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    content: { control: 'text', description: 'Tooltip content text.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    position: { control: 'select', options: ['top', 'topLeft', 'topRight', 'right', 'rightTop', 'rightBottom', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'leftTop', 'leftBottom'], description: 'Tooltip position.', table: { category: 'Parameter', defaultValue: { summary: 'top' }, type: { summary: 'top | topLeft | topRight | right | rightTop | rightBottom | bottom | bottomLeft | bottomRight | left | leftTop | leftBottom' } } },
    trigger: { control: 'select', options: ['hover', 'click', 'focus', 'none'], description: 'Tooltip trigger.', table: { category: 'Parameter', defaultValue: { summary: 'hover' }, type: { summary: 'hover | click | focus | none' } } },
    slot: { control: 'text', description: 'Inner content of the trigger sy-button.', table: { category: 'Parameter', defaultValue: { summary: 'Hover me' } } },
    close: { type: 'function', description: 'Closes the tooltip programmatically.', table: { category: 'Function', type: { summary: 'close()' } } },
  },
};

export default tooltipMeta;
type Story = StoryObj<SyTooltipProps>;

export const Default: Story = {
  args: {
    hideArrow: false,
    open: false,
    closedelay: 0,
    maxWidth: null,
    opendelay: 0,
    content: 'Tooltip content',
    position: 'top',
    trigger: 'hover',
    slot: 'Hover me',
  },
};
