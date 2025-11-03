import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { StackedEchartLine } from './stacked-line-echart';

const eChartMeta: Meta = {
  title: 'StyleGuide/ECharts/Templates/Stacked Line EChart',
  tags: ['false'],
  render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'echarts-dark' : 'echarts-light';
    return StackedEchartLine(theme);
  }
};


export default eChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {}
