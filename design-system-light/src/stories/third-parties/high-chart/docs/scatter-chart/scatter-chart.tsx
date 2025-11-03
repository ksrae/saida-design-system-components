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


export const ScatterChart = (theme: string) => {
	setTimeout(async() => {
    try {
      await loadHighchartsScript();
      const scatterChartElement = document.getElementById('myscatterHighChart');
      if (!scatterChartElement || !(window as any).Highcharts) return;

		const series: any[] = [{
			name: 'Basketball',
			id: 'basketball',
			marker: {
				symbol: 'circle'
			}
		}, {
			name: 'Triathlon',
			id: 'triathlon',
			marker: {
				symbol: 'triangle'
			}
		}, {
			name: 'Volleyball',
			id: 'volleyball',
			marker: {
				symbol: 'square'
			}
		}];

		async function getData() {
			const response = await fetch('scatterchartData.json');
			return response.json();
		}

		getData().then((data: any) => {
			const getDataBySport = (sportName: string) => {
				const temp: any[] = [];
				data.forEach((elm: any) => {
					if (elm.sport === sportName && elm.weight > 0 && elm.height > 0) {
						temp.push([elm.height, elm.weight]);
					}
				});
				return temp;
			};
			
			series.forEach((s: any) => {
				s.data = getDataBySport(s.id);
			});

			(window as any).Highcharts.chart(scatterChartElement, {
                chart: {
                    type: 'scatter',
                    zooming: {
                        type: 'xy'
                    }
                },
                title: {
                    text: 'Olympics athletes by height and weight'
                },
                subtitle: {
                    text:
                  'Source: <a href="https://www.theguardian.com/sport/datablog/2012/aug/07/olympics-2012-athletes-age-weight-height">The Guardian</a>'
                },
                xAxis: {
                    title: {
                        text: 'Height'
                    },
                    labels: {
                        format: '{value} m'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Weight'
                    },
                    labels: {
                        format: '{value} kg'
                    }
                },
                legend: {
                    enabled: true
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 2.5,
                            symbol: 'circle',
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        jitter: {
                            x: 0.005
                        }
                    }
                },
                tooltip: {
                    pointFormat: 'Height: {point.x} m <br/> Weight: {point.y} kg'
                },
                series
            });
        });
      } catch (error) {
        console.error('Failed to load Highcharts:', error);
      }
  }, 100);

	return (
		<div>
			<script src="https://code.highcharts.com/modules/exporting.js"></script>
			<script src="https://code.highcharts.com/modules/export-data.js"></script>
			<script src="https://code.highcharts.com/modules/accessibility.js"></script>
			<div id="myscatterHighChart" class={theme}></div>
		</div>
	);
}




