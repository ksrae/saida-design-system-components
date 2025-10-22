import type { Meta, StoryObj } from '@storybook/web-components';
import { BreadCrumb, BreadCrumbProps } from './breadcrumb';
import { clearElements } from '../../clear-element';


const breadcrumbMeta: Meta<BreadCrumbProps> = {
  title: 'Breadcrumb/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(breadcrumbMeta.title);
    return BreadCrumb(args);
  },
  argTypes: {
    separator: {
      control: 'radio',
      options : ['slash', 'arrow'],
      description: 'Changes the separator type.', 
      table: {
        category: 'Parameter',
        defaultValue : {summary: 'slash'},
        type: { summary: 'slash | arrow' }
      }      
    },
    slotContent: {
      control: false, 
      description: 'Content for the breadcrumb items.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    selected: {
      type: 'function',
      action: 'click', 
      description: 'Triggered when the breadcrumb is selected.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
          
        },
      }
    },
  },
};

export default breadcrumbMeta;
type Story = StoryObj<BreadCrumbProps>;


export const Default: Story = {
  args: {
    separator: 'slash',
    slotContent: ``,
  },
}
