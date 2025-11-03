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

export const HistrogramChart = (theme: string) => {
	setTimeout(async () => {
    try{
	    await loadHighchartsScript();
			const histogramChartElement = document.getElementById('myHistogramHighChart');
			if (histogramChartElement) {
			const data = [
                    3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3,
                    4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4,
                    3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5,
                    3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9,
                    2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9,
                    3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6,
                    3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9,
                    2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7,
                    3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1,
                    3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3
                ];

			(window as any).Highcharts.chart(histogramChartElement, {
                     title: {
                        text: 'Highcharts Histogram'
                    },

                    xAxis: [{
                        title: { text: 'Data' },
                        alignTicks: false
                    }, {
                        title: { text: 'Histogram' },
                        alignTicks: false,
                        opposite: true
                    }],

                    yAxis: [{
                        title: { text: 'Data' }
                    }, {
                        title: { text: 'Histogram' },
                        opposite: true
                    }],

                    plotOptions: {
                        histogram: {
                            accessibility: {
                                point: {
                                    valueDescriptionFormat: '{index}. {point.x:.3f} to ' +
                                        '{point.x2:.3f}, {point.y}.'
                                }
                            }
                        }
                    },

                    series: [{
                        name: 'Histogram',
                        type: 'histogram',
                        xAxis: 1,
                        yAxis: 1,
                        baseSeries: 's1',
                        zIndex: -1
                    }, {
                        name: 'Data',
                        type: 'scatter',
                        data: data,
                        id: 's1',
                        marker: {
                            radius: 1.5
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
			<script src="https://code.highcharts.com/modules/histogram-bellcurve.js"></script>
			<script src="https://code.highcharts.com/modules/exporting.js"></script>
			<script src="https://code.highcharts.com/modules/accessibility.js"></script>
			<div id="myHistogramHighChart" class={theme}></div>
		</div>
	);
};




