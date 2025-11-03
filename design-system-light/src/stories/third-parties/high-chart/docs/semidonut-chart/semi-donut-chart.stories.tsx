import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SemiDonutChart } from './semi-donut-chart';


const highChartMeta: Meta = {
  title: 'StyleGuide/HighChart/Templates/Semidonut Chart',
  tags: ['false'],
  render: (_args, context) => {
    const theme  = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    return SemiDonutChart(chartTheme);
  },
};


export default highChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {};
