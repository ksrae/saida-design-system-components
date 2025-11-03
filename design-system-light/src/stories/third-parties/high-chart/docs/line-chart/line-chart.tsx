import { h } from '@stencil/core';

// Highcharts 스크립트 로드 함수 - 중복 방지 로직 포함
function loadHighchartsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // 이미 로드되었으면 바로 리턴
    if ((window as any).Highcharts) {
      resolve();
      return;
    }

    // 기존 스크립트 태그 확인
    const existingScript = document.querySelector('script[src*="highcharts.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Highcharts')));
      return;
    }

    // 새 스크립트 태그 생성
    const script = document.createElement('script');
    script.src = 'https://code.highcharts.com/highcharts.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Highcharts'));
    document.head.appendChild(script);
  });
}

export const LineChart = (theme: string) => {
	setTimeout(async () => {
		try {
			await loadHighchartsScript();
			const chartElement = document.getElementById('myHighChart');
			const Highcharts = (window as any).Highcharts;

			if (chartElement && Highcharts) {
				Highcharts.chart(chartElement, {
					title: {
						text: 'U.S Solar Employment Growth',
						align: 'left'
					},
					subtitle: {
						text: 'By Job Category.'
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
					series: [{
						type: 'line',
						name: 'Installation & Developers',
						data: [
							43934, 48656, 65165, 81827, 112143, 142383,
							171533, 165174, 155157, 161454, 154610, 168960, 171558
						]
					}, {
						type: 'line',
						name: 'Manufacturing',
						data: [
							24916, 37941, 29742, 29851, 32490, 30282,
							38121, 36885, 33726, 34243, 31050, 33099, 33473
						]
					}, {
						type: 'line',
						name: 'Sales & Distribution',
						data: [
							11744, 30000, 16005, 19771, 20185, 24377,
							32147, 30912, 29243, 29213, 25663, 28978, 30618
						]
					}, {
						type: 'line',
						name: 'Operations & Maintenance',
						data: [
							null, null, null, null, null, null, null,
							null, 11164, 11218, 10077, 12530, 16585
						]
					}, {
						type: 'line',
						name: 'Other',
						data: [
							21908, 5548, 8105, 11248, 8989, 11816, 18274,
							17300, 13053, 11906, 10073, 11471, 11648
						]
					}],
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
			<div id="myHighChart" class={theme}></div>
		</div>
	);
};




