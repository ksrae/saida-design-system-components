import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AgGrid } from './ag-grid';

const agGrid: Meta = {
  title: 'StyleGuide/AgGrid/Overview',
  tags: ['false'],
  render: (_args, context) => {
    const theme  = context.globals.theme;
    console.log('aggrid theme',theme)
    let chartTheme = theme === 'dark' ? 'ag-theme-sygrid-dark' : 'ag-theme-sygrid';
    return AgGrid(chartTheme);
  },
};


export default agGrid;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {};
