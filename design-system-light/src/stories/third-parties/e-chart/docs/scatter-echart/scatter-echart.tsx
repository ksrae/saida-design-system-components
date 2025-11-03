import { h } from '@stencil/core';

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

async function loadEchartsScripts(): Promise<void> {
  if (!(window as any).echarts) {
    await loadScript('./echarts.js');
  }
  await loadScript('/echarts-theme.js');
}

export const EchartScatter = (theme:string) => {
 setTimeout(async () => {
   try {
     await loadEchartsScripts();
      var chartDom = document.getElementById('scatterChart');
      if (chartDom && (window as any).echarts) {
        var myChart = (window as any).echarts.init(chartDom, 'customized', {
          renderer: 'svg'
        });
        var option = {
          legend: {
            data: ['Series 1', 'Series 2', 'Series 3', 'Series 4']
          },
          xAxis: {
            name: 'X-axis',
            nameLocation: 'middle',
            nameGap: 30
          },
          yAxis: {
            name: 'Y-axis',
            nameLocation: 'middle',
            nameGap: 40
          },
          series: [
            {
              name: 'Series 1',
              symbolSize: 20,
              data: [
                [10.0, 8.04],
                [8.07, 6.95],
                [13.0, 7.58],
                [9.05, 8.81],
                [11.0, 8.33],
                [14.0, 7.66],
                [13.4, 6.81],
                [10.0, 6.33]
              ],
              type: 'scatter'
            },
            {
              name: 'Series 2',
              symbolSize: 15,
              symbol: 'triangle',
              data: [
                [2.5, 5.3],
                [3.5, 6.8],
                [5.2, 4.7],
                [6.8, 7.2],
                [8.5, 9.1],
                [9.3, 8.7],
                [10.2, 10.5],
                [11.8, 9.2]
              ],
              type: 'scatter'
            },
            {
              name: 'Series 3',
              symbolSize: 12,
              symbol: 'diamond',
              data: [
                [3.0, 9.8],
                [5.5, 7.9],
                [7.2, 5.6],
                [8.1, 6.3],
                [9.7, 8.2],
                [11.5, 7.4],
                [12.8, 8.8],
                [14.2, 9.5]
              ],
              type: 'scatter'
            },
            {
              name: 'Series 4',
              symbolSize: 18,
              symbol: 'rect',
              data: [
                [1.5, 3.3],
                [4.5, 2.6],
                [6.7, 4.2],
                [9.2, 3.8],
                [11.3, 5.4],
                [13.5, 2.9],
                [15.8, 4.5],
                [16.2, 5.7]
              ],
              type: 'scatter'
            }
          ]
        };
        myChart.setOption(option);
      }
    } catch (error) {
      console.error('Failed to load ECharts:', error);
    }
  }, 100);

  return (
    <div>
      <div id="scatterChart" style={{width: '100%', height: '400px'}} class={`echart ${theme}`}></div>
    </div>
  );
};
