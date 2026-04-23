import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { LabelFor } from '../../sy-label.main';

const meta: Meta = {
  title: 'Label/Attributes/For',
  component: 'sy-label',
  tags: [],
  render: () => LabelFor(),
  argTypes: {},
  args: {},
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
