import { create } from 'storybook/theming/create';
import logo from './image/synergy-logo.svg';

export default create({
  base: 'light',

  colorPrimary: '#7e45af',
  colorSecondary: '#7e45af',

  // Typography
  fontBase: '"Roboto", "Open Sans", sans-serif',
  brandTitle: 'Design System',
  // brandUrl: 'https://example.com',
  brandImage: logo,
  brandTarget: '_self',

  // Toolbar default and active colors
  barSelectedColor: '#DFD0EC',
  barHoverColor: '#DFD0EC',
});
