import type { Meta, StoryObj } from '@storybook/web-components';
import { SyDividerProps, Divider } from './sy-divider.main';
import { clearElements } from '../../clear-element';

const dividerMeta: Meta<SyDividerProps> = {
  title: 'Divider/Overview',
  component: 'sy-divider',
  tags: [],
  render: (args) => {
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
type Story = StoryObj<SyDividerProps>;

export const Default: Story = {
  args: {
    type : 'horizontal',
  },
};
