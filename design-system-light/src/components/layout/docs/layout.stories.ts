import type { Meta, StoryObj } from '@storybook/web-components';
import { BasicLayout, ControlLayout, LayoutProps } from './layout';

const layoutMeta: Meta<LayoutProps> = {
  title: 'Layout/Overview',
  tags: ['false'],
  render: (args) => {
    if(args.slot) {
    return BasicLayout(args);
    } else {
      return ControlLayout(args);
    }
  },
  argTypes : {
    headerHeight: {
      control: "text",
      options: ["small", "medium", "large"],
      description: "Sets the header height of the layout",
      table: {
        category: "Parameter",
        defaultValue: { summary: "medium" },
        type: { summary: "small | medium | large | string"}
      },
    },
    siderWidth: {
      control: "text",
      options: ["small", "medium", "large"],
      description: "Sets the sider width of the layout",
      table: {
        category: "Parameter",
        defaultValue: { summary: "medium" },
        type: { summary: "small | medium | large | string"}
      },
    },
    footerHeight: {
      control: "text" ,
      options: ["small", "medium", "large"],
      description: "Sets the footer height of the layout",
      table: {
        category: "Parameter",
        defaultValue: { summary: "medium" },
        type: { summary: "small | medium | large | string"}
      },
    }
  }
};

export default layoutMeta;
type Story = StoryObj<LayoutProps>;

export const Layout1: Story = {
  args: {
    slot: `
        <sy-header>Header</sy-header>
        <sy-content>Content</sy-content>
        <sy-footer>Footer</sy-footer>`
    } 
}

export const Layout2: Story = {
  args: {
    slot: `
      <sy-header>Header</sy-header>
        <sy-layout>
          <sy-sider>Sider</sy-sider>        
          <sy-content>Content</sy-content>
        </sy-layout>
      <sy-footer>Footer</sy-footer>`
    }
} 

export const Layout3: Story = {
  args: {
    slot: `
      <sy-header>Header</sy-header>
        <sy-layout>
          <sy-content>Content</sy-content>
          <sy-sider>Sider</sy-sider>
        </sy-layout>
      <sy-footer>Footer</sy-footer>`
  }
}

export const Layout4: Story = {
  args: {
    slot: `
      <sy-sider>Sider</sy-sider>
      <sy-layout>
        <sy-header>Header</sy-header>
        <sy-content>Content</sy-content>
        <sy-footer>Footer</sy-footer>
      </sy-layout>`
    }
}

export const Layout5: Story = {
  args: {
    slot: `
      <sy-sider>Sider</sy-sider>
      <sy-layout>
        <sy-header>Header</sy-header>
        <sy-content>
          <sy-content>Content</sy-content>
          <sy-content>Content</sy-content>
        </sy-content>
        <sy-footer>Footer</sy-footer>
      </sy-layout>`
    }
}

export const Default: Story = {
  args: {
    headerHeight: "medium",
    siderWidth: "medium",
    footerHeight: "medium"
  }
}
