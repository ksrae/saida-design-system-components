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

export const BarChart = (theme: string) => {
	setTimeout(async () => {
		try {
			await loadHighchartsScript();
			const barChartElement = document.getElementById('myBarHighChart');
			const Highcharts = (window as any).Highcharts;

			if (barChartElement && Highcharts) {
				Highcharts.chart(barChartElement, {
					title: {
						text: 'Historic World Population by Region'
					},
					subtitle: {
						text: 'Source: <a ' +
							'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
							'target="_blank">Wikipedia.org</a>'
					},
					xAxis: {
						categories: ['Africa', 'America', 'Asia', 'Europe'],
						title: {
							text: null
						},
						gridLineWidth: 1,
						lineWidth: 0
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Population (millions)',
							align: 'high'
						},
						labels: {
							overflow: 'justify'
						},
						gridLineWidth: 0
					},
					tooltip: {
						valueSuffix: ' millions'
					},
					plotOptions: {
						bar: {
							borderRadius: '50%',
							dataLabels: {
								enabled: true
							},
							groupPadding: 0.1
						}
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						x: -40,
						y: 80,
						floating: true,
						borderWidth: 1,
						backgroundColor: '#FFFFFF',
						shadow: true
					},
					credits: {
						enabled: false
					},
					series: [{
						name: 'Year 1990',
						type: 'bar',
						data: [632, 727, 3202, 721]
					}, {
						name: 'Year 2000',
						type: 'bar',
						data: [814, 841, 3714, 726]
					}, {
						name: 'Year 2021',
						type: 'bar',
						data: [1393, 1031, 4695, 745]
					}]
				});
			}
		} catch (error) {
			console.error('Failed to load Highcharts:', error);
		}
	}, 100);

	return (
		<div>
			{/* <script src="https://code.highcharts.com/highcharts.js"></script> */}
			<script src="https://code.highcharts.com/modules/exporting.js"></script>
			<script src="https://code.highcharts.com/modules/export-data.js"></script>
			<script src="https://code.highcharts.com/modules/accessibility.js"></script>
			<div id="myBarHighChart" class={theme}></div>
		</div>
	);
};




