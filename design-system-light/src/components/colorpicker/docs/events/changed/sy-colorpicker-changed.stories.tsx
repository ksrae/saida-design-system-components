import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ColorpickerChanged } from '../../sy-colorpicker.main';

const meta: Meta = {
  title: 'Colorpicker/Events/Changed',
  component: 'sy-colorpicker',
  tags: [],
  render: () => ColorpickerChanged(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
