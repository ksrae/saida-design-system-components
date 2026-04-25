import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteTrigger } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Trigger',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteTrigger(args as { trigger: 'focus' | 'input' }),
  argTypes: {
    trigger: autocompleteMeta?.argTypes?.trigger,
  },
  args: {
    trigger: 'focus',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
