import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { agGridColorTokenTable } from './ag-grid-color-guide';

const agGridColorGuideMeta: Meta = {
  title: 'StyleGuide/AgGrid/ColorGuide',
  tags: ['false']
};


export default agGridColorGuideMeta;
type Story = StoryObj<any>;

export const Grid: Story = {
  render: (args: any, context:any) => {
    const selectedTheme = context.globals.theme;
    const themeClass = selectedTheme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Column-header" : [
          "--ag-secondary-border-color",
          "--ag-border-color",
          "--ag-icon-default",
          "--ag-data-color",
          "--ag-header-background-color"
      ],      
      "Grouping-panel" : [
          "--ag-data-color",
          "--ag-foreground-color",
          "--ag-border-color",
          "--ag-subheader-background-color"
      ],      
      "Menu-trigger" : [
          "--ag-icon-default"
      ],       
      "Filter" : [
          "--ag-foreground-color",
          "--ag-filter-input-border",
          "--ag-foreground-color",
          "--ag-filter-input-background"
      ], 
      "Resize-handle" : [
          "--ag-secondary-border-color",
          "--ag-icon-default"
      ], 
      "Cell-edit" : [
          "--ag-gridcell-input-text",
          "--ag-secondary-border-color",
          "--ag-gridcell-input-border-focus",
          "--ag-gridcell-input-background",
          "--ag-background-color"
      ], 
      "Filter-menu-action-button" : [
          "--ag-foreground-color",
          "--ag-filter-input-border",
          "--ag-border-color",
          "--ag-header-background-color",
          "--ag-filter-input-background"
      ], 
      "Scrollbar-slug" : [
          "--ag-scrollbar-slug-default"
      ], 
      "Pivot-mode-select" : [
          "--ag-toggle-inactive-background",
          "--ag-toggle-foreground"
      ], 
      "Input-filter" : [
          "--ag-foreground-color",
          "--ag-filter-input-border",
          "--ag-filter-input-background"
      ], 
      "Grid-cell" : [
          "--ag-header-background-color",
          "--ag-data-color",
          "--ag-foreground-color",
          "--ag-secondary-border-color",
          "--ag-toggle-inactive-background"
      ], 
      "Right-click-menu" : [
          "--ag-data-color",
          "--ag-foreground-color",
          "--ag-header-background-color",
          "--ag-icon-default",
          "--ag-border-color",
          "--ag-background-color",
      ], 
      "Tab" : [
          "--ag-data-color",
          "--ag-icon-default",
          "--ag-selected-tab-underline-color",
          "--ag-side-button-selected-background-color",
          "--ag-tab-border-default",
          "--ag-side-buttons-background-color"
      ], 
      "Filter-list-item" : [
          "--ag-icon-default",
          "--ag-data-color",
          "--ag-control-inactive-background",
          "--ag-background-color",
      ], 
      "Tab-panel" : [
          "--ag-side-button-panel-background-color"
      ], 
      "Tool-panel" : [
          "--ag-control-panel-background-color",
          "--ag-secondary-border-color",
          "--ag-border-color",
          "--ag-data-color",
          "--ag-foreground-color",
          "--ag-icon-default",
          "--ag-control-inactive-background",
          "--ag-background-color"
      ], 
      "Panel-category-title" : [
          "--ag-data-color",
          "--ag-icon-default"
      ], 
      "Drag-drop-panel" : [
          "--ag-data-color",
          "--ag-border-color",
          "--ag-control-panel-background-color"
      ], 
      "Pagination" : [
          "--ag-foreground-color",
          "--ag-border-color",
          "--ag-background-color"
      ], 
      "Scrolbar-slug" : [
          "--ag-scrollbar-slug-default"
      ],               
      "Scrolbar-track" : [
          "--ag-border-color",
          "--ag-header-background-color"
      ],  
      "Status-bar" : [
          "--ag-foreground-color",
          "--ag-border-color",
          "--ag-background-color"
      ]                                                               
    };
    return agGridColorTokenTable(themeClass, tokenLists);
  }
};

