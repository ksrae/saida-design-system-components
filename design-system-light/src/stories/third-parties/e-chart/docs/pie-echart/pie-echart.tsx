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

export const EchartPiechart = (theme:string) => {
    setTimeout(async () => {
      try {
        await loadEchartsScripts();
      var chartDom = document.getElementById('ePieChart');
        if (chartDom && (window as any).echarts) {
        var myChart = (window as any).echarts.init(chartDom, 'customized', {
        renderer: 'svg'
      });
      var option;

      option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
       <div id="ePieChart" style={{width: '100%', height: '400px'}} class={`echart ${theme}`}></div>
     </div>
   );
}
