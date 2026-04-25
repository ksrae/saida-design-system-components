import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyBannerProps, Banner } from './sy-banner.main';
import { clearElements } from '../../clear-element';

const bannerMeta: Meta<SyBannerProps> = {
  title: 'BannerMessage/Overview',
  component: 'sy-banner-message',
  tags: [],
  render: (args) => {
    clearElements(bannerMeta.title);
    return Banner(args);
  },
 argTypes: {
    closable: {
      control: 'boolean',
      description: 'Display a close button to close banner on the screen.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    neutralIcon: {
      control: 'text',
      name: 'neutralIcon (neutral-icon)',
      description: 'This icon only can be applicable when the banner type is neutral. Icon must be true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    showIcon: {
      control: 'boolean',
      description: 'Determines whether display icon.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    message: {
      control: 'text',
      description: 'The main content of the banner.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    header: {
      control: 'text',
      description: 'A header of the banner.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'neutral'],
      description: 'The color of the badge.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'info' },
        type: { summary: "info | success | warning | error | neutral" }

      },
    },
    slotFooter: {
      control: false,
      description: 'Custom footer slot in banner. If not set, the footer will not be displayed.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
  args: {
    closable: false,
    showIcon: true,
    neutralIcon: '',
    message: 'Banners are typically used for global alerts (e.g., system outages, updates, cookie consent).',
    header: 'Banner Header',
    variant: 'info',
    slotFooter:`
       <div slot="footer">
        <sy-button size="small" id="btn1">Button1</sy-button>
        <sy-button size="small" id="btn2" variant="primary">Button2</sy-button>
      </div>
    `
  },
};

export default bannerMeta;

type Story = StoryObj<SyBannerProps>;

export const Default: Story = {};
