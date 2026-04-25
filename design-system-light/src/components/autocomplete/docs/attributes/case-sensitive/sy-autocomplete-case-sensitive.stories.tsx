import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteCaseSensitive } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Case Sensitive',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteCaseSensitive(args as { caseSensitive: boolean }),
  argTypes: {
    caseSensitive: autocompleteMeta?.argTypes?.caseSensitive,
  },
  args: {
    caseSensitive: true,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
