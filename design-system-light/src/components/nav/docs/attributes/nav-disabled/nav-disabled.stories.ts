import type { Meta, StoryObj } from '@storybook/web-components';
import { NavItemDisabled, NavItemProps } from '../../nav';
import { clearElements } from '../../../../clear-element';
import navItemMeta from '../../nav-item.stories';
import { html } from 'lit';

const meta: Meta<NavItemProps> = {
  title: 'NavigationMenu/Attributes/Nav Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return html`<sy-nav ?disabled=${args.disabled}>
        <sy-nav-sub title="NavSub" open>
            <sy-nav-item value="1">Item1</sy-nav-item>
            <sy-nav-sub title="NavSub2" open>
               <sy-nav-group title="group">
                <sy-nav-item value="2">Item2</sy-nav-item>
                <sy-nav-item value="3">Item3</sy-nav-item>
              </sy-nav-group>
            </sy-nav-sub>
        </sy-nav-sub>
        <sy-nav-item value="4">Item4</sy-nav-item>
      </sy-nav>`;
  },
  argTypes: {
    disabled: navItemMeta?.argTypes?.disabled
  },
  args: {
    disabled: false
  }
};

export default meta;
type Story = StoryObj<NavItemProps>;

export const Param: Story = {}

