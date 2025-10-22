
import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../clear-element';
import { GlobalHeaderProps, Header } from "./global-header";
import '../../input/index';
import '../../icon/index';
import '../../avatar/index';
import '../../divider/index';

const HeaderMeta: Meta<GlobalHeaderProps> = {
    title: 'GlobalHeader/Overview',
    tags: ['false'],
    render: (args) => {
      clearElements(HeaderMeta.title);
      return Header(args);
    },
    argTypes: {
      title: {
        control: 'text',
        description: 'The name of the application will be shown in the header.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
          type: { summary: 'string' }
        }
      },
      sticky: {
        control: 'boolean',
        description: 'Enables a sticky header that remains visible when scrolling.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: false as any},
          type: { summary: 'boolean' }
        }
      },
      search: {
        control: 'boolean',
        description: 'Enables a search input field in the header. The search input field is shown on the right side of the header.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: false as any},
          type: { summary: 'boolean' }
        }
      },
      information: {
        control: 'boolean',
        description: 'Enables a button which has information icon in the header. The information icon is shown on the right side of the header.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: false as any},
          type: { summary: 'boolean' }
        }
      },
      notification: {
        control: 'boolean',
        description: 'Enables a button which has notification icon in the header. The notification icon is shown on the right side of the header.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: false as any},
          type: { summary: 'boolean' }
        }
      },
      slotActions: {
        control: 'text',
        description: 'The header’s action area. The recommended order is search, others, help, notification, and account. Use <b>slot="actions"</b>',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
        }
      },
      selected: {
        type: 'function',
        action: 'click',
        description: 'Triggered when the header tab selected.',
        table: {
          category: 'Callback',
          type: {
            summary: `.addEventListener('selected', (e) => {})`,
            
          },
        }
      },
      changed: {
        type: 'function',
        action: 'click',
        description: 'Triggered when the search input changes.',
        table: {
          category: 'Callback',
          type: {
            summary: `.addEventListener('changed', (e) => {})`,
            
          },
        }
      },
    },
  };
  
  export default HeaderMeta;
  type Story = StoryObj<GlobalHeaderProps>;
  
  export const Default: Story = {
    args: {
      title: 'Application Name',
      sticky: false,
      search: false,
      information: false,
      notification: false,
      // slotLogo: '',
      slotActions: `
      <div slot="actions">
        <sy-divider type="vertical" style="height:18px;margin:0 12px;"></sy-divider>
        <sy-avatar  size="small" image="avatar_default.png"></sy-avatar>
      </div>
      `
    }
  }
