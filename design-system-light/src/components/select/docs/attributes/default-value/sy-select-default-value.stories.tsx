import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectDefaultValue } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Default Value',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectDefaultValue(args as { defaultValue: string }),
  argTypes: { defaultValue: selectMeta?.argTypes?.defaultValue },
  // Pre-fill with "apple" so the story lands in a populated state showing
  // exactly what `defaultValue` does. Empty default would render an empty
  // trigger and look like the prop did nothing.
  args: { defaultValue: 'apple' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};