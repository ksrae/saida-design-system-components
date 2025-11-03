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

export const DistributionChart = (theme: string) => {
	setTimeout(async () => {
		try {
		await loadHighchartsScript();
			const distributionChartElement = document.getElementById('myDistributionChart');
			if (distributionChartElement && (window as any).Highcharts) {
			(window as any).Highcharts.chart(distributionChartElement, {
                     title: {
                        text: 'U.S Solar Employment Growth',
                        align: 'left'
                    },
                    subtitle: {
                        text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.'
                    },
                    yAxis: {
                        title: {
                        text: 'Number of Employees'
                        }
                    },
                    xAxis: {
                        accessibility: {
                        rangeDescription: 'Range: 2010 to 2022'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                    plotOptions: {
                        series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                        }
                    },
                    series: [
                        {
                        name: 'Year 2000',
                        type: 'column',
                        data: [ 43934, 48656, 30000, 81827, 80000, 50000,
                            100000, 60000, 100000, 161454, 150000, 30000, 171558]
                        },
                        {
                        type: 'line',
                        name: 'Installation & Developers',
                        data: [
                            43934, 48656, 65165, 81827, 112143, 142383,
                            171533, 165174, 155157, 161454, 154610, 168960, 171558
                        ]
                        },
                    ],
                    responsive: {
                        rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                            }
                        }
                        }]
                    }
                    });
		}
		} catch (error) {
			console.error('Failed to load Highcharts:', error);
		}
	}, 100);

	return (
		<div>
			<script src="https://code.highcharts.com/highcharts-more.js"></script>
			<div id="myDistributionChart" class={theme}></div>
		</div>
	);
}




