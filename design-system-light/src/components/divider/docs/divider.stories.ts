import type { Meta, StoryObj } from '@storybook/web-components';
import { Divider, DividerProps } from './divider';
import { clearElements } from '../../clear-element';

const dividerMeta: Meta<DividerProps> = {
  title: 'Divider/Overview',
  tags: ['false'],
  render: (args:any) => {
    clearElements(dividerMeta.title);
    return Divider(args);
  },
  argTypes: {
    type : {
        control : 'radio',
        options : ['horizontal', 'vertical'], 
        description : 'Changes the orientation of the divider.',
        table : {
          category : 'Parameter', 
          defaultValue : { summary : 'horizontal'},
          type: { summary: 'horizontal | vertical' }
        }
    },
  }
};

export default dividerMeta;
type Story = StoryObj<DividerProps>;


export const Default: Story = {
  args: {
    type : 'horizontal', 
  },
  
  
}
