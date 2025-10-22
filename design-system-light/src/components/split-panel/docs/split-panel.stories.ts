import type { Meta, StoryObj } from '@storybook/web-components';
import { SplitPanel, SplitPanelProps } from './split-panel';
import { clearElements } from '../../clear-element';

const splitPanelMeta: Meta<SplitPanelProps> = {
  title: 'SplitPanel/Overview',
  tags: ['false'],
  render: (args:any) => {
    clearElements(splitPanelMeta.title);
    return SplitPanel(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean', 
      description : 'Disables split.',
      table: {
        category : 'Parameter',
        defaultValue : { summary : false as any},
        type: { summary: 'boolean' }
      }
    },
    hideDivider: {
      control: 'boolean', 
      description : 'Hide split divider.',
      table: {
        category : 'Parameter',
        defaultValue : { summary : false as any},
        type: { summary: 'boolean' }
      }
    },
    ratio: {
      control: 'number', 
      description : 'Set the ratio of the two panels either horizontally or vertically.',
      table: {
        category : 'Parameter',
        defaultValue : { summary : 50 as any},
        type: { summary: 'number' }
      }
    },
    minRatio: {
      control: 'number', 
      description : 'Set the minimum ratio. Ratio cannot be lower than minimum ratio.',
      table: {
        category : 'Parameter',
        defaultValue : { summary : 0 as any},
        type: { summary: 'number' }
      }
    },
    type: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'split position of split-panel',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'horizontal'},
        type: { summary: 'horizontal | vertical' }
      }
    },
    horizontalChanged: {
      type: 'function',
      action: 'selected', 
      description: 'Triggers when ratio of horizontal panel is changed.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('horizontalChanged', (e) => {})`,
        },
      }
    },
    verticalChanged: {
      type: 'function',
      action: 'selected', 
      description: 'Triggers when ratio of vertical panel is changed.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('verticalChanged', (e) => {})`,
        },
      }
    },
    slotLeftContent: {
      control: false,
      description: 'The content for the left or top panel',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Bottom'},
      }
    },
    slotRightContent: {
      control: false,
      description: 'The content for the right or bottom panel',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Bottom'},
      }
    },
  },
  
};

export default splitPanelMeta;
type Story = StoryObj<SplitPanelProps>;


export const Default: Story = {
  args: {
    disabled: false,
    hideDivider: false,
    ratio: 50,
    minRatio: 0,
    type: 'horizontal',
    slotLeftContent: ``,
    slotRightContent: ``,
  },  
}
