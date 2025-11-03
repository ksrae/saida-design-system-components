import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { HistrogramChart } from './histogram-chart';

const highChartMeta: Meta = {
  title: 'StyleGuide/HighChart/Templates/Histogram Chart',
  tags: ['false'],
  render: (_args: any, context: any) => {
    const theme  = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    return HistrogramChart(chartTheme);
  },
};


export default highChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {};
