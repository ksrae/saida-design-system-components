import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { EchartPiechart } from './pie-echart';

const eChartMeta: Meta = {
  title: 'StyleGuide/ECharts/Templates/Pie EChart',
  tags: ['false'],
  render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'echarts-dark' : 'echarts-light';
    return EchartPiechart(theme);
  }
};


export default eChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {}