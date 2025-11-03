import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { colorTokenTable } from '../../../../foundation/color/color-token';

const ChartColorGuideMeta: Meta = {
  title: 'StyleGuide/HighChart/ColorGuide',
  tags: ['false']
};

export const Overview: Story = {
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = [
      "--charts-highlight-10",
      "--charts-highlight-10",
      "--charts-highlight-60",
      "--charts-highlight-80",    
      "--charts-highlight-100",
    ]
    return colorTokenTable(chartTheme,tokenLists);
  }
};

export default ChartColorGuideMeta;
type Story = StoryObj<any>;
 
export const Annotation: Story = {
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = [
      "--charts-annotation-0",
      "--charts-annotation-1",
      "--charts-annotation-2",
      "--charts-annotation-3",
      "--charts-annotation-4",
      "--charts-annotation-5"
    ]

    return colorTokenTable(chartTheme,tokenLists);
  }
};


export const Highlight: Story = {
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = [
      "--charts-highlight-10",
      "--charts-highlight-10",
      "--charts-highlight-60",
      "--charts-highlight-80",    
      "--charts-highlight-100",
    ]
    
    return colorTokenTable(chartTheme,tokenLists);
  }
};

export const Status: Story = {
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = [
      "--charts-status-information",
      "--charts-status-warning",
      "--charts-status-danger",
      "--charts-status-discovery",
      "--charts-status-neutral",
      "--charts-status-success",
    ]
    
    return colorTokenTable(chartTheme,tokenLists);
  }
};

export const Neutral: Story = {
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = [
      "--charts-neutral-3",
      "--charts-neutral-5",
      "--charts-neutral-10",
      "--charts-neutral-20",
      "--charts-neutral-40",
      "--charts-neutral-60",
      "--charts-neutral-80",
      "--charts-neutral-100",
    ]
    
    return colorTokenTable(chartTheme,tokenLists);
  }
}

export const Series: Story = {
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = [
      "--charts-series-0",
      "--charts-series-1",
      "--charts-series-2",
      "--charts-series-3",
      "--charts-series-4",
      "--charts-series-5",
      "--charts-series-6",
      "--charts-series-7",
      "--charts-series-8",
      "--charts-series-9",
    ]
    
    return colorTokenTable(chartTheme,tokenLists);
  }
};
