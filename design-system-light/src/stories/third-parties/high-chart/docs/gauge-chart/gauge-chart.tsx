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

export const GaugeChart = (theme: string) => {
	setTimeout(async () => {
		try {
			await loadHighchartsScript();
			const gaugeChartElement = document.getElementById('myGaugeHighChart');
			const Highcharts = (window as any).Highcharts;
			
			if (gaugeChartElement && Highcharts) {
				const chart = Highcharts.chart(gaugeChartElement, {
					chart: {
						type: 'gauge',
						plotBackgroundColor: null,
						plotBackgroundImage: null,
						plotBorderWidth: 0,
						plotShadow: false,
						height: '80%'
					},

					title: {
						text: 'Speedometer'
					},

					pane: {
						startAngle: -90,
						endAngle: 89.9,
						background: null,
						center: ['50%', '75%'],
						size: '110%'
					},

					// the value axis
					yAxis: {
						min: 0,
						max: 200,
						tickPixelInterval: 72,
						tickPosition: 'inside',
						tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
						tickLength: 20,
						tickWidth: 2,
						minorTickInterval: null,
						labels: {
							distance: 20,
							style: {
								fontSize: '14px'
							}
						},
						lineWidth: 0,
						plotBands: [{
							from: 0,
							to: 130,
							color: 'var(--charts-status-success)', // green
							thickness: 20,
							borderRadius: '50%'
						}, {
							from: 150,
							to: 200,
							color: 'var(--charts-status-danger)', // red
							thickness: 20,
							borderRadius: '50%'
						}, {
							from: 120,
							to: 160,
							color: 'var(--charts-status-warning)', // yellow
							thickness: 20
						}]
					},

					series: [{
						name: 'Speed',
						data: [80],
						tooltip: {
							valueSuffix: ' km/h'
						},
						dataLabels: {
							format: '{y} km/h',
							borderWidth: 0,
							color: (
								Highcharts.defaultOptions.title &&
								Highcharts.defaultOptions.title.style &&
								Highcharts.defaultOptions.title.style.color
							) || '#333333',
							style: {
								fontSize: '16px'
							}
						},
						dial: {
							radius: '80%',
							backgroundColor: 'gray',
							baseWidth: 12,
							baseLength: '0%',
							rearLength: '0%'
						},
						pivot: {
							backgroundColor: 'gray',
							radius: 6
						}
					}]
				});

				// Add some life
				setInterval(() => {
					if (chart && !chart.renderer.forExport) {
						const point = chart.series[0].points[0];
						const inc = Math.round((Math.random() - 0.5) * 20);

						let newVal = point.y + inc;
						if (newVal < 0 || newVal > 200) {
							newVal = point.y - inc;
						}

						point.update(newVal);
					}
				}, 3000);
			}
		} catch (error) {
			console.error('Failed to load Highcharts:', error);
		}
	}, 100);

  return (
		<div>
			<script src="https://code.highcharts.com/highcharts-more.js"></script>
			<script src="https://code.highcharts.com/modules/exporting.js"></script>
			<script src="https://code.highcharts.com/modules/export-data.js"></script>
			<script src="https://code.highcharts.com/modules/accessibility.js"></script>
			<script src="https://code.highcharts.com/themes/adaptive.js"></script>
			<figure class="highcharts-figure">
				<div id="myGaugeHighChart" class={theme}></div>
				<p class="highcharts-description">
					Chart showing use of plot bands with a gauge series. The chart is
					updated dynamically every few seconds.
				</p>
			</figure>
		</div>
	);
};




