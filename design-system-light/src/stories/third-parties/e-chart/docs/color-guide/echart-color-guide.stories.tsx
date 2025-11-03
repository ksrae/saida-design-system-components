import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { eChartColorTokenTable } from './echart-color-guide';

const eChartColorGuideMeta: Meta = {
  title: 'StyleGuide/ECharts/ColorGuide',
  tags: ['false']
};

export default eChartColorGuideMeta;
type Story = StoryObj<any>;

 // type = "BasicConfig"
 export const BasicConfig: Story = {
   render: (_args: any, context: any) => {
     let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
     const tokenLists = {
      "Background" : [
        "--charts-background-color",
      ],
      "Title" : [
        "--charts-neutral-80"
      ],

      "Subtitle" : [
        "--charts-neutral-60"
      ],

      "Theme" : [
       /* 여기 아래래부터 테마 10개*/
       "--charts-series-0",
       "--charts-series-1",
       "--charts-series-2",
       "--charts-series-3",
       "--charts-series-4",
       "--charts-series-5",
       "--charts-series-6",
       "--charts-series-7",
       "--charts-series-8",
       "--charts-series-9",
      ],

      "Labe Text" : [
        "--charts-neutral-5"
      ]
     }

     return eChartColorTokenTable(theme,tokenLists);
    }
 };


 // type = "Visual Mapping"
 export const VisualMapping: Story = {
   render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
     const tokenLists = {
      "Visual Mapping" : [
       "--charts-highlight-60",
       "--charts-highlight-20",
       "--charts-highlight-10"
      ]
    }
      return eChartColorTokenTable(theme,tokenLists);
    }
 };

 // type = "Axis"
 export const Axis: Story = {
   render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
     const tokenLists = {
      "Line" : [
        "--charts-highlight-80"
      ],
      "Tick" : [
        "--charts-neutral-80"
      ],
      "Grid" : [
        "--charts-neutral-10"
      ],
      // "Area" : [
      //  /* Area 2colors */
      //  "#ffffff33;",
      //  "#D2DBEE33;"
      // ],
      "Label" : [
        "--charts-neutral-80"
      ]
    }

    return eChartColorTokenTable(theme,tokenLists);
  }
 };

 // type = "Legend"
 export const Legend: Story = {
   render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
     const tokenLists = {
      "Text" : [
        "--charts-highlight-80"
      ]
     }

      return eChartColorTokenTable(theme,tokenLists);
    }
 };

 // type = "Toolbox"
 export const Toolbox: Story = {
   render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
     const tokenLists = {
      "Item" : [
        "--charts-neutral-40",
      ],
      "Emphasis" : [
        "--charts-neutral-60"
      ]
     }

      return eChartColorTokenTable(theme,tokenLists);
    }
 };

 // type = "Tooltip"
 export const Tooltip: Story = {
   render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
     const tokenLists = {
      "Axis Color" : [
        "--charts-neutral-20"
      ]
     }

     return eChartColorTokenTable(theme,tokenLists);
   }
 };

 // type = "Timeline"
 export const Timeline: Story = {
   render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
     const tokenLists = {
      "Item" : [
       "--charts-highlight-20"
      ],
      "Emphasis" : [
        "--charts-background-color",
      ],
      "Check" : [
        "--charts-highlight-80"
      ],
      "Check Border Color" : [
        "--charts-highlight-80"
      ],
      "Axis" : [
        "--charts-highlight-10"
      ],
      "Control Color" : [
        "--charts-highlight-20"
      ],
      "Control Border Color" : [
        "--charts-highlight-20"
      ],
      "Text Color" : [
        "--charts-highlight-20"
      ]
    }

    return eChartColorTokenTable(theme,tokenLists);
  }
 };

 // type = "Candlestick Chart"
 export const Candlestick: Story = {
   render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';

     const tokenLists = {
      "Bullish Color" : [
        "--charts-status-danger"
      ],
      "Bearish Color" : [
        "--charts-status-success"
      ],
      "Bullish Border Color" : [
        "--charts-status-danger"
      ],
      "Bearish Border Color" : [
        "--charts-status-success"
      ]
     }

     return eChartColorTokenTable(theme,tokenLists);
    }
 };

 // type = "Force directed Chart"
 export const ForceDirected: Story = {
   render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';

     const tokenLists = {
      "Line Color" : [
        "--charts-neutral-20"
      ]
     }

     return eChartColorTokenTable(theme,tokenLists);
   }
 };

 // type = "Map Geo Chart"
 export const MapGeo: Story = {
   render: (_args, context) => {
    let theme  = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
     const tokenLists = {
      "Area Color" : [
        "--charts-status-warning"
      ],
      "Label Color" : [
       "--charts-series-3"
      ]
     }

     return eChartColorTokenTable(theme,tokenLists);
   }
 };
