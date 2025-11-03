import { h } from '@stencil/core';

// Highcharts Script Load
function loadHighchartsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // if already load, return
    if ((window as any).Highcharts) {
      resolve();
      return;
    }

    // check if script is loading
    const existingScript = document.querySelector('script[src*="highcharts.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Highcharts')));
      return;
    }

    // create new script
    const script = document.createElement('script');
    script.src = 'https://code.highcharts.com/highcharts.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Highcharts'));
    document.head.appendChild(script);
  });
}

export const BoxPlotChart = (theme: string) => {
	setTimeout( async () => {
    try {
      await loadHighchartsScript();
      const boxPlotChartElement = document.getElementById('myBoxPlotHighChart');
      if (boxPlotChartElement && (window as any).Highcharts) {
			(window as any).Highcharts.chart(boxPlotChartElement, {
               title: {
                text: 'Highcharts Box Plot Example'
              },
              legend: {
                enabled: false
              },
              xAxis: {
                categories: ['1', '2', '3', '4', '5'],
                title: {
                  text: 'Experiment No.'
                }
              },

              yAxis: {
                title: {
                  text: 'Observations'
                },
                plotLines: [{
                  value: 932,
                  color: 'red',
                  width: 1,
                  label: {
                    text: 'Theoretical mean: 932',
                    align: 'center',
                    style: {
                      color: 'gray'
                    }
                  }
                }]
              },

          series: [{
            name: 'Observations',
            type:'boxplot',
            data: [
              [760, 801, 848, 895, 965],
              [733, 853, 939, 980, 1080],
              [714, 762, 817, 870, 918],
              [724, 802, 806, 871, 950],
              [834, 836, 864, 882, 910]
            ],
            tooltip: {
              headerFormat: '<em>Experiment No {point.key}</em><br/>'
            }
        }, {
            name: 'Outliers',
            type: 'scatter',
            data: [
              [0, 644],
              [4, 718],
              [4, 951],
              [4, 969]
            ],
            marker: {
                fillColor: 'white',
                lineWidth: 1,
            },
            tooltip: {
                pointFormat: 'Observation: {point.y}'
            }
        }]
			});
		}
  } catch (error) {
			console.error('Failed to load Highcharts:', error);
	}
}, 100);

	return (
		<div>
	{/* 		<script src="https://code.highcharts.com/highcharts.js"></script> */}
			<script src="https://code.highcharts.com/highcharts-more.js"></script>
			<script src="https://code.highcharts.com/modules/exporting.js"></script>
			<script src="https://code.highcharts.com/modules/export-data.js"></script>
			<script src="https://code.highcharts.com/modules/accessibility.js"></script>
			<div id="myBoxPlotHighChart" class={theme}></div>
		</div>
	);
}




