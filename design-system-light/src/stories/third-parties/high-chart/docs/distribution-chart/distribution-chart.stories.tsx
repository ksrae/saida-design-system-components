import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DistributionChart } from './distribution-chart';

const highChartMeta: Meta = {
  title: 'StyleGuide/HighChart/Templates/Distribution Chart',
  tags: ['false'],
  render: (_args, context) => {
    const theme  = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    return DistributionChart(chartTheme);
  },
};


export default highChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {};
