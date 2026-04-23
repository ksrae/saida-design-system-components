import type { Meta, StoryObj } from '@storybook/web-components';
import { DropdownSelected } from '../../sy-dropdown.main';

const meta: Meta = {
  title: 'Dropdown/Events/Selected',
  component: 'sy-dropdown',
  tags: [],
  render: () => DropdownSelected(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
