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

export const LollipopChart = (theme: string) => {
	setTimeout( async () => {
		try {
    await loadHighchartsScript();
			const lollipopChartElement = document.getElementById('myLollipopHighChart');
			if (lollipopChartElement && (window as any).Highcharts) {
			(window as any).Highcharts.chart(lollipopChartElement, {
              accessibility: {
                point: {
                  valueDescriptionFormat: '{index}. {xDescription}, {point.y}.'
                  }
              },

              legend: {
                enabled: false
              },

              subtitle: {
                text: '2024'
              },

              title: {
                text: 'Top 10 Countries by Population'
              },

              tooltip: {
                shared: true
              },

              xAxis: {
                type: 'category'
              },

              yAxis: {
                title: {
                  text: 'Population'
                }
              },

              series: [{
                name: 'Population',
                type: 'lollipop',
                data: [{
                  name: 'India',
                  y: 1441719852
                }, {
                  name: 'China',
                  y: 1425178782
                }, {
                  name: 'United States',
                  y: 341814420
                }, {
                  name: 'Indonesia',
                  y: 279798049
                }, {
                  name: 'Pakistan',
                  y: 245209815
                }, {
                  name: 'Nigeria',
                  y: 229152217
                }, {
                  name: 'Brazil',
                  y: 217637297
                }, {
                  name: 'Bangladesh',
                  y: 174701211
                }, {
                  name: 'Russia',
                  y: 143957079
                }, {
                  name: 'Ethiopia',
                  y: 129719719
                }]
					}]
				});
			}
  } catch (error) {
      console.error('Failed to load Highcharts:', error);
    }
  }, 100);
  
  return (
		<div>
			<script src="https://code.highcharts.com/highcharts-more.js"></script>
			<script src="https://code.highcharts.com/modules/dumbbell.js"></script>
			<script src="https://code.highcharts.com/modules/lollipop.js"></script>
			<script src="https://code.highcharts.com/modules/exporting.js"></script>
			<script src="https://code.highcharts.com/modules/accessibility.js"></script>
			<div id="myLollipopHighChart" class={theme}></div>
		</div>
	);
}




