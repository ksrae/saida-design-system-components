import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectSelectedOptions } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Selected Options',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectSelectedOptions(args as { selectedOptions: { value: string; label?: string }[] }),
  argTypes: { selectedOptions: selectMeta?.argTypes?.selectedOptions },
  // Pre-fill with two chips so the user lands on a populated state and can
  // immediately observe how `selectedOptions` drives the rendered tags.
  // Empty default would show an empty trigger and look like the prop did
  // nothing; the actual options (Apple / Banana / Cherry) are still
  // available in the dropdown for picking more.
  args: {
    selectedOptions: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};