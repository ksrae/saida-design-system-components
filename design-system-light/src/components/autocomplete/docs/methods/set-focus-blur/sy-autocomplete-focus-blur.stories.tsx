import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteFocusBlur } from '../../sy-autocomplete.main';

const meta: Meta = {
  title: 'Autocomplete/Methods/Set Focus & Blur',
  component: 'sy-autocomplete',
  tags: [],
  render: () => AutocompleteFocusBlur(),
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
