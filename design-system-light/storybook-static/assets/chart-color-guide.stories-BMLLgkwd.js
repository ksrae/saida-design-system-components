import{c as r}from"./color-token-Dl5wPqf7.js";const m={title:"StyleGuide/HighChart/ColorGuide",tags:["false"]},c={render:(s,t)=>{let e=t.globals.theme==="dark"?"highcharts-dark":"highcharts-light";return r(e,["--charts-highlight-10","--charts-highlight-10","--charts-highlight-60","--charts-highlight-80","--charts-highlight-100"])}},o={render:(s,t)=>{let e=t.globals.theme==="dark"?"highcharts-dark":"highcharts-light";return r(e,["--charts-annotation-0","--charts-annotation-1","--charts-annotation-2","--charts-annotation-3","--charts-annotation-4","--charts-annotation-5"])}},n={render:(s,t)=>{let e=t.globals.theme==="dark"?"highcharts-dark":"highcharts-light";return r(e,["--charts-highlight-10","--charts-highlight-10","--charts-highlight-60","--charts-highlight-80","--charts-highlight-100"])}},i={render:(s,t)=>{let e=t.globals.theme==="dark"?"highcharts-dark":"highcharts-light";return r(e,["--charts-status-information","--charts-status-warning","--charts-status-danger","--charts-status-discovery","--charts-status-neutral","--charts-status-success"])}},l={render:(s,t)=>{let e=t.globals.theme==="dark"?"highcharts-dark":"highcharts-light";return r(e,["--charts-neutral-3","--charts-neutral-5","--charts-neutral-10","--charts-neutral-20","--charts-neutral-40","--charts-neutral-60","--charts-neutral-80","--charts-neutral-100"])}},g={render:(s,t)=>{let e=t.globals.theme==="dark"?"highcharts-dark":"highcharts-light";return r(e,["--charts-series-0","--charts-series-1","--charts-series-2","--charts-series-3","--charts-series-4","--charts-series-5","--charts-series-6","--charts-series-7","--charts-series-8","--charts-series-9"])}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = ["--charts-highlight-10", "--charts-highlight-10", "--charts-highlight-60", "--charts-highlight-80", "--charts-highlight-100"];
    return colorTokenTable(chartTheme, tokenLists);
  }
}`,...c.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = ["--charts-annotation-0", "--charts-annotation-1", "--charts-annotation-2", "--charts-annotation-3", "--charts-annotation-4", "--charts-annotation-5"];
    return colorTokenTable(chartTheme, tokenLists);
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = ["--charts-highlight-10", "--charts-highlight-10", "--charts-highlight-60", "--charts-highlight-80", "--charts-highlight-100"];
    return colorTokenTable(chartTheme, tokenLists);
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = ["--charts-status-information", "--charts-status-warning", "--charts-status-danger", "--charts-status-discovery", "--charts-status-neutral", "--charts-status-success"];
    return colorTokenTable(chartTheme, tokenLists);
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = ["--charts-neutral-3", "--charts-neutral-5", "--charts-neutral-10", "--charts-neutral-20", "--charts-neutral-40", "--charts-neutral-60", "--charts-neutral-80", "--charts-neutral-100"];
    return colorTokenTable(chartTheme, tokenLists);
  }
}`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    const theme = context.globals.theme;
    let chartTheme = theme === 'dark' ? 'highcharts-dark' : 'highcharts-light';
    const tokenLists = ["--charts-series-0", "--charts-series-1", "--charts-series-2", "--charts-series-3", "--charts-series-4", "--charts-series-5", "--charts-series-6", "--charts-series-7", "--charts-series-8", "--charts-series-9"];
    return colorTokenTable(chartTheme, tokenLists);
  }
}`,...g.parameters?.docs?.source}}};const u=["Overview","Annotation","Highlight","Status","Neutral","Series"],k=Object.freeze(Object.defineProperty({__proto__:null,Annotation:o,Highlight:n,Neutral:l,Overview:c,Series:g,Status:i,__namedExportsOrder:u,default:m},Symbol.toStringTag,{value:"Module"}));export{o as A,k as C,n as H,l as N,g as S,i as a};
