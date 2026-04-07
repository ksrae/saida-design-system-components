

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
  } else {
    // Browser globals
    factory({}, root.echarts);
  }
}(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg);
    }
  }; if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }
  const element = document.querySelector('.echart');
  const themeElement = element.classList.contains('echarts-light') ? document.querySelector('.echarts-light') : document.querySelector('.echarts-dark');
  const isDarkTheme = element.classList.contains('echarts-dark');

  // DOM 접근을 최소화하기 위해 모든 CSS 토큰 값을 한 번에 캐싱
  function getCachedColors() {
    if (!themeElement) {
      console.error('Element with class "echarts" not found.');
    }
    const style = getComputedStyle(themeElement);
    return {
      /* Background Color */
      chartBackground: style.getPropertyValue('--charts-background-color'),
      chartLabel: style.getPropertyValue('--charts-neutral-5'),
      chartArea: style.getPropertyValue('--charts-neutral-20'),

      /* Series */
      chartSeries0: style.getPropertyValue('--charts-series-0'),
      chartSeries1: style.getPropertyValue('--charts-series-1'),
      chartSeries2: style.getPropertyValue('--charts-series-2'),
      chartSeries3: style.getPropertyValue('--charts-series-3'),
      chartSeries4: style.getPropertyValue('--charts-series-4'),
      chartSeries5: style.getPropertyValue('--charts-series-5'),
      chartSeries6: style.getPropertyValue('--charts-series-6'),
      chartSeries7: style.getPropertyValue('--charts-series-7'),
      chartSeries8: style.getPropertyValue('--charts-series-8'),

      /* Text Color */
      chartTitle: style.getPropertyValue('--charts-neutral-80'),
      chartSubTitle: style.getPropertyValue('--charts-neutral-60'),
      chartLegend: style.getPropertyValue('--charts-neutral-80'),

      /* Grid Color */
      chartSplitLine: style.getPropertyValue('--charts-neutral-10'),
      chartAxisLine: style.getPropertyValue('--charts-neutral-80'),
      chartGridLine: style.getPropertyValue('--charts-neutral-10'),
      chartAxisLabel: style.getPropertyValue('--charts-neutral-80'),
      chartAxisTick: style.getPropertyValue('--charts-neutral-80'),
      chartAxisArea1: style.getPropertyValue('--charts-neutral-80'),
      chartAxisArea2: style.getPropertyValue('--charts-neutral-80'),
      
      /* Grid Color dark*/
      // chartGridLineDark: style.getPropertyValue('--charts-neutral-5'),

      /* Border Color */
      chartBorder: style.getPropertyValue('--charts-neutral-20'),


      /* Status Color */
      chartsStatusDanger: style.getPropertyValue('--charts-status-danger'),
      chartsStatusDiscovery: style.getPropertyValue('--charts-status-discovery'),
      chartsStatusInformation: style.getPropertyValue('--charts-status-information'),
      chartsStatusNeutral: style.getPropertyValue('--charts-status-neutral'),
      chartsStatusSuccess: style.getPropertyValue('--charts-status-success'),
      chartsStatusWarning: style.getPropertyValue('--charts-status-warning'),

      /* visual Map */
      chartsVisualMap0: style.getPropertyValue('--charts-highlight-60'),
      chartsVisualMap1: style.getPropertyValue('--charts-highlight-20'),
      chartsVisualMap2: style.getPropertyValue('--charts-highlight-10'),

      /* Tool Box */
      chartsToolboxItem: style.getPropertyValue('--charts-neutral-40'),
      chartsToolboxEmphasis: style.getPropertyValue('--charts-neutral-60'),

      /* Tooltip */
      chartTooltip: style.getPropertyValue('--charts-neutral-20'),

      /* Timeline */
      chartTimelineItem: style.getPropertyValue('--charts-neutral-20'),
      chartTimelineControl: style.getPropertyValue('--charts-neutral-20'),
      chartTimelineCheckpoint: style.getPropertyValue('--charts-highlight-80'),
      chartTimelineCheckBorder: style.getPropertyValue('--charts-highlight-80'),
      chartTimelineLine: style.getPropertyValue('--charts-neutral-80'),
      chartTimelineLabel: style.getPropertyValue('--charts-neutral-20'),
      chartTimelineEmphasisItem: style.getPropertyValue('--charts-neutral-3'),
      chartTimelineEmphasisControl: style.getPropertyValue('--charts-neutral-20'),
      chartTimelineEmphasisLabel: style.getPropertyValue('--charts-neutral-20'),

      /* MAP&GEO */
      chartMapgeoAreaArea: style.getPropertyValue('--charts-mapgeo-area'),
      chartMapgeoAreaLabel: style.getPropertyValue('--charts-mapgeo-label'),

    };
  }

  const colors = getCachedColors();

  echarts.registerTheme('customized', {
    "color": [
      /* Background Color */
      colors.chartSeries0,
      colors.chartSeries1,
      colors.chartSeries2,
      colors.chartSeries3,
      colors.chartSeries4,
      colors.chartSeries5,
      colors.chartSeries6,
      colors.chartSeries7,
      colors.chartSeries8,
    ],

    "backgroundColor": colors.chartBackground,
    "textStyle": {},
    "title": {
      "textStyle": {
        "color": colors.chartTitle,
        "fontSize": 16,
        "fontWeight": 700,
      },
      "subtextStyle": {
        "color": colors.chartSubTitle,
        "fontSize": 12,
        "fontWeight": 400,
      }
    },
    "line": {
      "itemStyle": {
        "borderWidth": 1
      },
      "lineStyle": {
        "width": 2
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "radar": {
      "itemStyle": {
        "borderWidth": 1
      },
      "lineStyle": {
        "width": 2
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "bar": {
      "itemStyle": {
        "barBorderWidth": 0,
        "barBorderColor": colors.chartBorder,
      }
    },
    "pie": {
      "itemStyle": {
        "borderWidth": 0,
        "barBorderColor": colors.chartBorder,
      }
    },
    "scatter": {
      "itemStyle": {
        "borderWidth": 0,
        "barBorderColor": colors.chartBorder,
      }
    },
    "boxplot": {
      "itemStyle": {
        "borderWidth": 0,
        "barBorderColor": colors.chartBorder,
      }
    },
    "parallel": {
      "itemStyle": {
        "borderWidth": 0,
        "barBorderColor": colors.chartBorder,
      }
    },
    "sankey": {
      "itemStyle": {
        "borderWidth": 0,
        "barBorderColor": colors.chartBorder,
      }
    },
    "funnel": {
      "itemStyle": {
        "borderWidth": 0,
        "barBorderColor": colors.chartBorder,
      }
    },
    "gauge": {
      "itemStyle": {
        "borderWidth": 0,
        "barBorderColor": colors.chartBorder,
      }
    },
    "candlestick": {
      "itemStyle": {
        "color": colors.chartsStatusDanger,
        "color0": colors.chartsStatusSuccess,
        "borderColor": colors.chartsStatusDanger,
        "borderColor0": colors.chartsStatusSuccess,
        "borderWidth": 1
      }
    },
    "graph": {
      "itemStyle": {
        "borderWidth": 0,
        "barBorderColor": colors.chartBorder,
      },
      "lineStyle": {
        "width": 1,
        "color": colors.chartBorder,
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false,
      "color": [
        colors.chartSeries0,
        colors.chartSeries1,
        colors.chartSeries2,
        colors.chartSeries3,
        colors.chartSeries4,
        colors.chartSeries5,
        colors.chartSeries6,
        colors.chartSeries7,
        colors.chartSeries8,
      ],
      "label": {
        "color": colors.chartLabel,
      }
    },
    "map": {
      "itemStyle": {
        "areaColor": colors.chartArea,
        "borderColor": colors.chartBorder,
        "borderWidth": 0.5
      },
      "label": {
        "color": "#000"
      },
      "emphasis": {
        "itemStyle": {
          "areaColor": colors.chartMapgeoAreaArea,
          "borderColor": colors.chartBorder,
          "borderWidth": 1
        },
        "label": {
          "color": colors.chartMapgeoAreaLabel,
        }
      }
    },
    "geo": {
      "itemStyle": {
        "areaColor": colors.chartArea,
        "borderColor": colors.chartBorder,
        "borderWidth": 0.5
      },
      "label": {
        "color": "#000"
      },
      "emphasis": {
        "itemStyle": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": colors.chartBorder,
          "borderWidth": 1
        },
        "label": {
          "color": colors.chartMapgeoAreaLabel,
        }
      }
    },
    "categoryAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": colors.chartAxisLine,
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": colors.chartAxisTick,
        }
      },      
      "axisLabel": {
        "show": true,
        "color": colors.chartAxisLabel,
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": colors.chartSplitLine,
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.2)",
            "rgba(210,219,238,0.2)"
          ]
        }
      }
    },
    "valueAxis": {
      "axisLine": {
        "show": false,
        "lineStyle": {
          "color": colors.chartAxisLine,
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": colors.chartAxisTick,
        }
      },    
      "axisLabel": {
        "show": true,
        "color": colors.chartAxisLabel,
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          // "color": isDarkTheme ? colors.chartGridLineDark : colors.chartGridLine,
          "color": colors.chartGridLine,
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.2)",
            "rgba(210,219,238,0.2)"
          ]
        }
      }
    },
    "logAxis": {
      "axisLine": {
        "show": false,
        "lineStyle": {
          "color": colors.chartAxisLine,
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": colors.chartAxisTick,
        }
      },
      "axisLabel": {
        "show": true,
        "color": colors.chartAxisLabel,
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            colors.chartSplitLine,
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.2)",
            "rgba(210,219,238,0.2)"
          ]
        }
      }
    },
    "timeAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": colors.chartAxisLine,
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": colors.chartAxisTick,
        }
      },
      "axisLabel": {
        "show": true,
        "color": colors.chartAxisLabel,
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            colors.chartSplitLine,
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.2)",
            "rgba(210,219,238,0.2)"
          ]
        }
      }
    },
    "toolbox": {
      "iconStyle": {
        "borderColor": colors.chartsToolboxItem,
      },
      "emphasis": {
        "iconStyle": {
          "borderColor": colors.chartsToolboxEmphasis,
        }
      }
    },
    "legend": {
      "textStyle": {
        "color": colors.chartLegend,
      }
    },
    "tooltip": {
      "axisPointer": {
        "lineStyle": {
          "color": colors.chartTooltip,
          "width": 1
        },
        "crossStyle": {
          "color": colors.chartTooltip,
          "width": 1
        }
      }
    },
    "timeline": {
      "lineStyle": {
        "color": colors.chartTimelineLine,
        "width": 2
      },
      "itemStyle": {
        "color": colors.chartTimelineItem,
        "borderWidth": 1
      },
      "controlStyle": {
        "color": colors.chartTimelineControl,
        "borderColor": colors.chartTimelineControl,
        "borderWidth": 1
      },
      "checkpointStyle": {
        "color": colors.chartTimelineCheckpoint,
        "borderColor": colors.chartTimelineCheckBorder,
      },
      "label": {
        "color": colors.chartTimelineLabel,
      },
      "emphasis": {
        "itemStyle": {
          "color": colors.chartTimelineEmphasisItem,
        },
        "controlStyle": {
          "color": colors.chartTimelineEmphasisControl,
          "borderColor": colors.chartTimelineEmphasisControl,
          "borderWidth": 1
        },
        "label": {
          "color": colors.chartTimelineEmphasisLabel,
        }
      }
    },
    "visualMap": {
      "color": [
        colors.chartsVisualMap0,
        colors.chartsVisualMap1,
        colors.chartsVisualMap2,
      ]
    },
    "dataZoom": {
      "handleSize": "undefined%",
      "textStyle": {}
    },
    "markPoint": {
      "label": {
        "color": colors.chartLabel,
      },
      "emphasis": {
        "label": {
          "color": colors.chartLabel,
        }
      }
    }
  });
}));


