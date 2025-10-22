import type { Meta, StoryObj } from '@storybook/web-components';
import { BasicLayout, ControlLayout, LayoutProps } from '../layout';
import "../../../global-header/global-header.element";
import "../../../button/button.element";
import "../../../avatar/avatar.element";
import "../../../nav/nav.element";
import "../../../pagination/pagination.element";
import "../../../split-panel/split-panel.element";
import "../../../tabs/tab-group.element";
import "../../../tabs/tab-content.element";
import "../../../tabs/tab.element";



const layoutSampleMeta: Meta<LayoutProps> = {
  title: 'Layout/Sample',
  tags: ['false'],
  render: (args) => {
    if (args.slot) {
      return BasicLayout(args);
    } else {
      return ControlLayout(args);
    }
  },
};

export default layoutSampleMeta;
type Story = StoryObj<LayoutProps>;

export const Layout1: Story = {
  args: {
    slot: `
        <sy-header>
          <sy-global-header title="Application Name">
            <div slot="actions">
            <sy-divider type="vertical" style="height:18px;margin:0 12px;"></sy-divider>
            <sy-avatar size="small" image="avatar_default.png"></sy-avatar>
            </div>
          </sy-global-header>
        </sy-header>
        <sy-content  style="background-color:white;">
          <sy-spinner delay="0" description="Loading..." size="medium">
            </sy-spinner>
        </sy-content>
        <sy-footer style="background-color:white;">
          <sy-pagination activepage="1" pagesize="10" totalitems="300" pagesizeoptions="10, 20, 30, 40">
          </sy-pagination>        
        </sy-footer>`
  }
}

export const Layout2: Story = {
  args: {
    slot: `
      <sy-header>
        <sy-global-header title="Application Name">
            <div slot="actions">
              <sy-divider type="vertical" style="height:18px;margin:0 12px;"></sy-divider>
              <sy-avatar size="small" image="avatar_default.png"></sy-avatar>
            </div>
        </sy-global-header>
      </sy-header>
        <sy-layout>
          <sy-sider style="border-right:1px solid var(--border-subtlest);background-color:white;">
              <sy-nav>
                <sy-nav-group title="group depth 0">
                  <sy-nav-item value="1">Item 1</sy-nav-item>
                  <sy-nav-item value="2">Item 2</sy-nav-item>
                </sy-nav-group>
                <sy-nav-item value="9">Item 9</sy-nav-item>   
              </sy-nav>       
          </sy-sider>        
          <sy-content style="background-color:white;">

  
  <sy-tab-group active="1">
    <div slot="tabs">
      <sy-tab tabkey="t1">tab1</sy-tab>
      <sy-tab tabkey="t2">tab2</sy-tab>
      <sy-tab tabkey="t3">tab3</sy-tab>
      <sy-tab tabkey="t4">tab4</sy-tab>
    </div>

    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
      <sy-tab-content name="t2">This is tab2</sy-tab-content>
      <sy-tab-content name="t3">This is tab3</sy-tab-content>
      <sy-tab-content name="t4">This is tab4</sy-tab-content>
    </div>
  </sy-tab-group>          
          </sy-content>
        </sy-layout>      
        `
        
  }
}

export const Layout3: Story = {
  args: {
    slot: `
      <sy-header>
      <sy-global-header title="Application Name"></sy-global-header>       
      </sy-header>
        <sy-layout>
          <sy-content style="background-color:white;">
            <sy-split-panel style="height:200px;" minratio="0" ratio="50" type="horizontal">
              <span slot="left"><sy-empty description="No data"></sy-empty></span>
              <span slot="right"><sy-empty description="No data"></sy-empty></span>
            </sy-split-panel>         
          </sy-content>
        </sy-layout>`
  }
} 
