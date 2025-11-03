import { h } from '@stencil/core';

// ECharts 스크립트 로드 함수 - 중복 방지 로직 포함
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 기존 스크립트 태그 확인
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
  // echarts.js 먼저 로드
  if (!(window as any).echarts) {
    await loadScript('./echarts.js');
  }
  // echarts-theme.js 로드
  await loadScript('/echarts-theme.js');
}


export const EchartLine = (theme: string) => {
  setTimeout(async () => {
    try {
      await loadEchartsScripts();
      var chartDom = document.getElementById('eLineChart');
      if (chartDom && (window as any).echarts) {
        var myChart = (window as any).echarts.init(chartDom, 'customized', {
          renderer: 'svg'
        });
        var option = {
          title: {
            text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };
        myChart.setOption(option);
      }
    } catch (error) {
      console.error('Error loading ECharts scripts:', error);
    }
  }, 100);

  return (
    <div>
      <div id="eLineChart" style={{width: '100%', height: '400px'}} class={`echart ${theme}`}></div>
    </div>
  );
}
