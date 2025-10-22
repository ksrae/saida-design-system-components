import type { Meta, StoryObj } from '@storybook/web-components';
import { Tab, TabProps } from './tab';
import { clearElements } from '../../clear-element';

const tabMeta: Meta<TabProps> = {
  title: 'TabContent/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements('Tab/Overview');
    return Tab(args);
  },
  argTypes: {
    closable: {
      control: 'boolean',
      description: 'Add close button to the tab',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled the tab',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    manualClose: {
      control: 'boolean',
      name: 'manualClose (manual-close)',
      description: 'Tab is closed by manual close only.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    tabkey: {
      control: 'text',
      description: 'Sets key to identify the tab. This tabkey is to find a tab-content which has name attribute with the key.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 't1'},
        type: { summary: 'string' }
      }
    },
    slotContent: {
      control: 'text',
      description: 'Sets tab and tab-contents',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    setClose: {
      type: 'function',
      action: 'click',
      description: 'To close a tab.',
      table: {
        category: 'Function',
        type: {
          summary: `setClose(isForce)`,

        },
      }
    },
	}
};

export default tabMeta;
type Story = StoryObj<TabProps>;


export const Default: Story = {
  args: {
    closable: false,
    disabled: false,
    manualClose: false,
    tabkey: 't1',
		slotContent: ``,
  },
  
  
}
