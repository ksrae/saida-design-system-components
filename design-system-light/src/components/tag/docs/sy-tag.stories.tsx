import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyTagProps, Tag } from './sy-tag.main';
import { clearElements } from '../../clear-element';

const tagMeta: Meta<SyTagProps> = {
  title: 'Tag/Overview',
  component: 'sy-tag',
  tags: [],
  render: (args) => {
    clearElements(tagMeta.title);
    return Tag(args);
  },
  argTypes: {
    disabled: { control: 'boolean', description: 'Disabled state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    readonly: { control: 'boolean', description: 'Read-only state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    removable: { control: 'boolean', description: 'Shows a close button for removal.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    rounded: { control: 'boolean', description: 'Rounded pill shape.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    selectable: { control: 'boolean', description: 'Tag can be selected/toggled.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Tag size.', table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } } },
    variant: { control: 'select', options: ['gray', 'purple', 'blue', 'green', 'cyan', 'yellow', 'orange', 'red'], description: 'Color variant.', table: { category: 'Parameter', defaultValue: { summary: 'gray' }, type: { summary: 'gray | purple | blue | green | cyan | yellow | orange | red' } } },
    slot: { control: 'text', description: 'Tag label content.', table: { category: 'Parameter', defaultValue: { summary: '' } } },
    selected: { type: 'function', description: 'Emitted when the tag is selected.', table: { category: 'Callback', type: { summary: `.addEventListener('selected', (e) => {})` } } },
    removed: { type: 'function', description: 'Emitted when the tag is removed.', table: { category: 'Callback', type: { summary: `.addEventListener('removed', (e) => {})` } } },
  },
};

export default tagMeta;
type Story = StoryObj<SyTagProps>;

export const Default: Story = {
  args: { disabled: false, readonly: false, removable: false, rounded: false, selectable: false, size: 'medium', variant: 'gray', slot: 'Tag' },
};
