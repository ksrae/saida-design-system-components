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


export const SemiDonutChart = (theme: string) => {
	setTimeout(async () => {
		try {
			await loadHighchartsScript();
			const semiDonutChartElement = document.getElementById('mySemiDonutHighChart');
			if (semiDonutChartElement && (window as any).Highcharts) {
			(window as any).Highcharts.chart(semiDonutChartElement, {
                  title: {
                  text: 'Browser<br>shares<br>January<br>2022',
                  align: 'center',
                  verticalAlign: 'middle',
                  y: 60,
                  style: {
                      fontSize: '1.1em'
                  }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%'],
                        size: '110%'
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    innerSize: '50%',
                    data: [
                        ['Chrome', 73.86],
                        ['Edge', 11.97],
                        ['Firefox', 5.52],
                        ['Safari', 2.98],
                        ['Internet Explorer', 1.90],
                        ['Other', 3.77]
                    ]
					}]
				});
			}
		} catch (error) {
      console.error('Failed to load Highcharts:', error);
    }
  }, 100);

  return (
		<div>
			<script src="https://code.highcharts.com/modules/exporting.js"></script>
			<script src="https://code.highcharts.com/modules/accessibility.js"></script>
			<div id="mySemiDonutHighChart" class={theme}></div>
		</div>
	);
}




