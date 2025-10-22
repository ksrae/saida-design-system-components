import type { Meta, StoryObj } from '@storybook/web-components';
import { TabGroup, TabGroupProps } from './tab-group';
import { clearElements } from '../../clear-element';

const tabGroupMeta: Meta<TabGroupProps> = {
  title: 'Tab/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(tabGroupMeta.title);
    return TabGroup(args);
  },
  
  argTypes: {
    active: {
      control: 'number',
      description: 'Sets index of the tab to be active',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 0 as any},
        type: { summary: 'number' }
      }      
    },
    align: {
      control: 'radio',
      options: ['center', 'left'],
      description: 'Align tabs.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'left'},
        type: { summary: 'center | left' }
      }
    },
    draggable: {
      control: 'boolean',
      description: 'Allows tab dragging to change its order',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the tab.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left' , 'right'],
      description: 'Changes the orientation of the tab.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'top'},
        type: { summary: 'top | bottom | left | right' },
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the all tabs.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'medium'},
        type: { summary: 'small | medium | large' },
      }
    },
    type: {
      control: 'radio',
      options: ['card', 'line'],
      description: 'Style type of the all tabs.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'line'},
        type: { summary: 'card | line' }
      }
    },
    padding:{
      control: 'select',
      options: ['small', 'medium', 'large', 'none'],
      description: 'Padding of the tab group.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'none'},
        type: { summary: 'small | medium | large | none' },
      }
    },
    slotContent: {
      //control: false,
      description: 'Sets tab and tab-contents',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    closeTab: {
      type: 'function',
      action: 'click',
      description: 'To close a tab by name',
      table: {
        category: 'Function',
        type: {
          summary: `closeTab(name)`,

        },
      }
    },
    selected: {
      type: 'function',
      action: 'click',
      description: 'Triggered selected event when tab is selected',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
          
        },
      }
    },
    ordered: {
      type: 'function',
      action: 'click',
      description: 'Triggered ordered event when draggable tabs ordered by dragging',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('ordered', (e) => {})`,
          
        },
      }
    },
    closed: {
      type: 'function',
      action: 'click',
      description: 'Triggered closed event when the tab is closed',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('closed', (e) => {})`,

        },
      }
    },
	}
};

export default tabGroupMeta;
type Story = StoryObj<TabGroupProps>;


export const Default: Story = {
  args: {
    active: 0,
    align: 'left',
    disabled: false,
    draggable: false,
    position: 'top',
    size: 'medium',
    type: 'line',
    padding:'medium',
		slotContent: `
    <div slot="tabs">
      <sy-tab tabkey="a1">Tab1</sy-tab>
      <sy-tab tabkey="a2" closable>Tab2</sy-tab>
      <sy-tab tabkey="a3">Tab3</sy-tab>
      <sy-tab tabkey="a4">Tab4</sy-tab>
      <sy-tab tabkey="a5">Tab5</sy-tab>
      <sy-tab tabkey="a6">Tab6</sy-tab>
      <sy-tab tabkey="a7">Tab7</sy-tab>
      <sy-tab tabkey="a8">Tab8</sy-tab>
      <sy-tab tabkey="a9">Tab9</sy-tab>
      <sy-tab tabkey="a10">Tab10</sy-tab>
    </div>
    
    <div slot="contents">
      <sy-tab-content name="a1">Content for Tab 1</sy-tab-content>
      <sy-tab-content name="a2">Content for Tab 2</sy-tab-content>
      <sy-tab-content name="a3">Content for Tab 3</sy-tab-content>
      <sy-tab-content name="a4">Content for Tab 4</sy-tab-content>
      <sy-tab-content name="a5">Content for Tab 5</sy-tab-content>
      <sy-tab-content name="a6">Content for Tab 6</sy-tab-content>
      <sy-tab-content name="a7">Content for Tab 7</sy-tab-content>
      <sy-tab-content name="a8">Content for Tab 8</sy-tab-content>
      <sy-tab-content name="a9">Content for Tab 9</sy-tab-content>
      <sy-tab-content name="a10">Content for Tab 10</sy-tab-content>
    </div>
    `,
  },
  
  
}
