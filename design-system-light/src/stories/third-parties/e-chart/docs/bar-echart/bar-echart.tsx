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

export const EchartBar = (theme:string) => {
  setTimeout(async () => {
    try {
      await loadEchartsScripts();
      var app: any = {};
      var chartDom = document.getElementById('eBarChart');
        if (chartDom && (window as any).echarts) {
          var myChart = (window as any).echarts.init(chartDom, 'customized', {
          renderer: 'svg'
        });
        var option;

        const posList = [
          'left',
          'right',
          'top',
          'bottom',
          'inside',
          'insideTop',
          'insideLeft',
          'insideRight',
          'insideBottom',
          'insideTopLeft',
          'insideTopRight',
          'insideBottomLeft',
          'insideBottomRight'
        ];
        app.configParameters = {
          rotate: {
            min: -90,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: posList.reduce(function (map, pos) {
              map[pos] = pos;
              return map;
            }, {})
          },
          distance: {
            min: 0,
            max: 100
          }
        };
        app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function () {
            const labelOption = {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            };
            myChart.setOption({
              series: [
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                }
              ]
            });
          }
        };
        const labelOption = {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {}
          }
        };
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar', 'stack'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: ['2012', '2013', '2014', '2015', '2016']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Forest',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [320, 332, 301, 334, 390]
            },
            {
              name: 'Steppe',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290]
            },
            {
              name: 'Desert',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190]
            },
            {
              name: 'Wetland',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [98, 77, 101, 99, 40]
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
      <div id="eBarChart" style={{width: '100%', height: '400px'}} class={`echart ${theme}`}></div>
    </div>
  );
}

