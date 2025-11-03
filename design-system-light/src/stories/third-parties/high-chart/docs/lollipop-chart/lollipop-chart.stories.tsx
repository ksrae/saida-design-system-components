import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { LollipopChart } from './lollipop-chart';


const highChartMeta: Meta = {
  title: 'StyleGuide/HighChart/Templates/Lollipop Chart',
  tags: ['false'],
  render: (_args, context) => {
    const theme  = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    return LollipopChart(chartTheme);
  },
};


export default highChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {};
