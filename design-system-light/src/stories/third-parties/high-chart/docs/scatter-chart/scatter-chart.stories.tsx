import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ScatterChart } from './scatter-chart';

const highChartMeta: Meta = {
  title: 'StyleGuide/HighChart/Templates/Scatter Chart',
  tags: ['false'],
  render: (_args: any, context: any) => {
    const theme  = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    return ScatterChart(chartTheme);
  },
};


export default highChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {};
