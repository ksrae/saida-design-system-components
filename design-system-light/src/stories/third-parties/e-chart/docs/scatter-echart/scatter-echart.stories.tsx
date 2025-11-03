import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { EchartScatter } from './scatter-echart';

const eChartMeta: Meta = {
  title: 'StyleGuide/ECharts/Templates/Scatter EChart',
  tags: ['false'],
  render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'echarts-dark' : 'echarts-light';
    return EchartScatter(theme);
  }
};


export default eChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {}