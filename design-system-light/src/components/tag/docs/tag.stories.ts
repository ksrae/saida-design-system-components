import type { Meta, StoryObj } from '@storybook/web-components';
import { Tag, TagProps } from './tag';
import { clearElements } from '../../clear-element';

const tagMeta: Meta<TagProps> = {
  title: 'Tag/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(tagMeta.title);
    return Tag(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the tag.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Set to readonly the tag. The tag does not be interacted by user interface.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    removable: {
      control: 'boolean',
      description: 'Sets whether the tag removable.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    rounded: {
      control: 'boolean',
      description: 'Tags in rounded shape',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    selectable: {
      control: 'boolean',
      description: 'Sets whether the tag selectable.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the tag.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'medium'},
        type: { summary: 'small | medium | large' },
      }
    }, 
    variant: {
      control: 'select',
      options: ['gray', 'purple', 'blue', 'green', 'cyan', 'yellow', 'orange', 'red'],
      description: 'Tags in different colors',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'gray'},
        type: { summary: 'gray | purple | blue | green | cyan | yellow | orange | red' },
      }
    }, 
		slotContent: {
      control: false,
      description: 'The label value of the tag.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Tag'},
      }
    },
    selected: {
      type: 'function',
      action: 'selected',
      description: 'Triggered selected event when selectable tag is clicked.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
          
        },
      }
    },  
    removed: {
      type: 'function',
      action: 'removed',
      description: 'Triggered removed event when removable tag is removed.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('removed', (e) => {})`,
          
        },
      }
    },  
	}
};

export default tagMeta;
type Story = StoryObj<TagProps>;


export const Default: Story = {
  args: {
    disabled: false,
    readonly: false,
    removable: false,      
    rounded: false,
    selectable: false,
    size: 'medium',
    variant: 'gray',
		slotContent: '',
  },
  
  
}
