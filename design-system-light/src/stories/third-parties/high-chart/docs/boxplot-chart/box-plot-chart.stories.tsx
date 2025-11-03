import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { BoxPlotChart } from './box-plot-chart';


const highChartMeta: Meta = {
  title: 'StyleGuide/HighChart/Templates/Boxplot Chart',
  tags: ['false'],
  render: (_args, context) => {
    const theme  = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    return BoxPlotChart(chartTheme);
  },
};


export default highChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {};
