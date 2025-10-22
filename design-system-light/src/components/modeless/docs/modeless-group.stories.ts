import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../clear-element';
import { ModelessGroup, ModelessGroupProps } from './modeless-group';

const modelessGroupMeta: Meta<ModelessGroupProps> = {
  title: 'ModelessGroup/Overview',
  tags: ['false'],
  render: () => {
    clearElements('Modeless/Overview');
    return ModelessGroup();
  },
  argTypes: {
    create: {
      type: 'function',
      action: 'create', 
      description: 'Create a new modal',
      table: {
        category: 'Function',
        type: {
          summary: '.create()',
        },
      },
    },
    updateContent: {
      type: 'function',
      action: 'updateContent',
      description: 'Update the content of the modal',
      table: {
        category: 'Function',
        type: {
          summary: '.updateContent()',
        },
      },
    },
    updateTitle: {
      type: 'function',
      action: 'updateTitle',
      description: 'Update the title of the modal',
      table: {
        category: 'Function',
        type: {
          summary: '.updateTitle()',
        },
      },
    },
    updateOption: {
      type: 'function',
      action: 'updateOption',
      description: 'Update the option of the modal',
      table: {
        category: 'Function',
        type: {
          summary: '.updateOption()',
        },
      },
    },
    close: {
      type: 'function',
      action: 'close',
      description: 'Close the modal',
      table: {
        category: 'Function',
        type: {
          summary: '.close()',
        },
      },
    },
    closeAll: {
      type: 'function',
      action: 'closeAll',
      description: 'Close all modals',
      table: {
        category: 'Function',
        type: {
          summary: `.closeAll()`,
        },
      }
    }
  }
};

export default modelessGroupMeta;
type Story = StoryObj<ModelessGroupProps>;

export const Default: Story = {
  args: {

  }
}
