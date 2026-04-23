import{j as e,M as s,C as n}from"./blocks-Q9nwDdg9.js";import{useMDXComponents as l}from"./index-DejdW_EF.js";import{C as a,B as c,V as i,A as h,L as d,T as u,a as y,b as p,c as m,F as g,M as b}from"./echart-color-guide.stories-CiHoW3JK.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nFrKWBxN.js";import"./index-BdigElPL.js";const S=""+new URL("chart-overview-light-D9pUuSNs.svg",import.meta.url).href,x=""+new URL("chart-overview-dark-CdRdx48P.svg",import.meta.url).href;function t(o){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...l(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:a}),`
`,e.jsx(r.h1,{id:"echart-color-guide",children:"EChart Color Guide"}),`
`,e.jsxs(r.p,{children:["The color token below will be automatically filled according to the Echart rule.",e.jsx("br",{}),`
(Status color should be applied directly if necessary.)`,e.jsx("br",{}),e.jsx("br",{})]}),`
`,e.jsxs(r.p,{children:["Echart does not have a separate token scss file.",e.jsx("br",{}),`
Please use the code below with the synergy theme.`,e.jsx("br",{}),`
When you install sy-components, it is already applied.`,e.jsx("br",{}),e.jsx("br",{})]}),`
`,e.jsxs(r.p,{children:["If you want to change the colors.",e.jsx("br",{}),`
You can change the theme through the ecart-theme.js file.`,e.jsx("br",{})]}),`
`,e.jsx("b",{children:"Color Token (echarts-theme.js)"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{children:`

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
  const themeElement = element.classList.contains('echarts-light') ? document.querySelector('.echarts-light') :  document.querySelector('.echarts-dark');
  console.log('themeelement', themeElement)

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
      chartAxisLabel: style.getPropertyValue('--charts-neutral-80'),
      chartAxisTick: style.getPropertyValue('--charts-neutral-80'),

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

    "backgroundColor": colors.chcartBackground,
    "textStyle": {},
    "title": {
      "textStyle": {
        "color": colors.chartTitle,
      },
      "subtextStyle": {
        "color": colors.chartSubTitle,
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
        "borderColor":  colors.chartBorder,
        "borderWidth": 0.5
      },
      "label": {
        "color": "#000"
      },
      "emphasis": {
        "itemStyle": {
          "areaColor": colors.chartMapgeoAreaArea,
          "borderColor":  colors.chartBorder,
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



`})}),`
`,e.jsx(r.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(r.p,{children:["Data visualization is the representation of information in pictorial or graphical format, such as charts, graphs, maps, and diagrams. ",e.jsx("br",{}),`
These visuals aid in the communication of complex data so that insights can be more easily drawn.
Because color can affect our perception of information, the appropriate use of color is critical in making a data visualization successful.`,e.jsx("br",{})]}),`
`,e.jsx("br",{}),`
`,e.jsx("img",{src:S,alt:"Chart overview light",width:"100%"}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("img",{src:x,alt:"Chart overview dark",width:"100%"}),`
`,e.jsx(r.h2,{id:"basicconfig",children:"BasicConfig"}),`
`,e.jsx(n,{of:c,sourceState:"none"}),`
`,e.jsx(r.h2,{id:"visualmapping",children:"VisualMapping"}),`
`,e.jsx(n,{of:i,sourceState:"none"}),`
`,e.jsx(r.h2,{id:"axis",children:"Axis"}),`
`,e.jsx(n,{of:h,sourceState:"none"}),`
`,e.jsx(r.h2,{id:"legend",children:"Legend"}),`
`,e.jsx(n,{of:d,sourceState:"none"}),`
`,e.jsx(r.h2,{id:"toolbox",children:"Toolbox"}),`
`,e.jsx(n,{of:u,sourceState:"none"}),`
`,e.jsx(r.h2,{id:"tooltip",children:"Tooltip"}),`
`,e.jsx(n,{of:y,sourceState:"none"}),`
`,e.jsx(r.h2,{id:"timeline",children:"Timeline"}),`
`,e.jsx(n,{of:p,sourceState:"none"}),`
`,e.jsx(r.h2,{id:"candlestick",children:"Candlestick"}),`
`,e.jsx(n,{of:m,sourceState:"none"}),`
`,e.jsx(r.h2,{id:"forcedirected",children:"ForceDirected"}),`
`,e.jsx(n,{of:g,sourceState:"none"}),`
`,e.jsx(r.h2,{id:"mapgeo",children:"MapGeo"}),`
`,e.jsx(n,{of:b,sourceState:"none"})]})}function w(o={}){const{wrapper:r}={...l(),...o.components};return r?e.jsx(r,{...o,children:e.jsx(t,{...o})}):t(o)}export{w as default};
