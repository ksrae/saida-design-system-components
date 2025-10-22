import type { Meta, StoryObj } from '@storybook/web-components';
import { BreadCrumb } from './breadcrumb';
import { clearElements } from '../../clear-element';
import { BreadCrumbItemProps } from './breadcrumb-item';

const breadcrumbItemMeta: Meta<BreadCrumbItemProps> = {
  title: 'Breadcrumb-item/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements('Breadcrumb/Overview');
    return BreadCrumb(args);
  },
  argTypes: {
    active: {
      control: 'boolean', 
      description: 'Sets active style.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean', 
      description: 'Disables the breadcrumb.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    separator: {
      control: 'radio', //provide a toggle control to this argument in the ui 
      options : ['slash', 'arrow'],
      description: 'Changes the separator type.', 
      table: {
        category: 'Parameter',
        defaultValue : { summary: 'slash' },
        type: { summary: 'slash | arrow' }
      }      
    },
  },
};

export default breadcrumbItemMeta;
type Story = StoryObj<BreadCrumbItemProps>;


export const Default: Story = {
  args: {
    active: false,
    disabled: false,
    separator: 'slash',
    slotContent: `
    Item
    `,
  },
}
