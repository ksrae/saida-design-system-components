import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { EchartStackedBar } from './stacked-bar-echart';

const eChartMeta: Meta = {
  title: 'StyleGuide/ECharts/Templates/Stacked Bar EChart',
  tags: ['false'],
  render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'echarts-dark' : 'echarts-light';
    return EchartStackedBar(theme);
  }
};


export default eChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {}
