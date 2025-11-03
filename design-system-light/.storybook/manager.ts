/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { addons } from 'storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
  showToolbar: true,
  sidebar: {
    showRoots: true,
    collapsedRoots: [
      'foundation',
      'flex',
      'layout',
      'form',
      'styleguide',
      'log',
      'autocomplete',
      'avatar',
      'badge',
      "bannermessage",
      'breadcrumb',
      'buttongroup',
      'button',
      'card',
      'checkbox',
      'colorpicker',
      'collapse',
      'datepicker',
      'divider',
      'drawer',
      'dropdown',
      'empty',
      'globalheader',
      'header',
      'icon',
      'inlinemessage',
      'inputnumber',
      'input',
      'label',
      'menu',
      'modal',
      'modeless',
      'navigationmenu',
      'pagination',
      'popconfirm',
      'popover',
      'progressbar',
      'progresscircular',
      'radio',
      'radiobutton',
      'select',
      'skeleton',
      'slider',
      'spinner',
      'splitpanel',
      'steps',
      'switch',
      'tab',
      'tag',
      'textarea',
      'toastmessage',
      'tooltip',
      'treeselect',
      'tree',
    ],
    filters: {
      patterns: (item: { tags?: string[] }): boolean => {
        return !(item.tags ?? []).includes('sidebar-hidden');
      },
    },
  },
});
