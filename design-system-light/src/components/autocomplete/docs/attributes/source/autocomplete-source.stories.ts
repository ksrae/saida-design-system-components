import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompleteProps, AutoCompleteSource } from '../../autocomplete';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../autocomplete.stories';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Attributes/Source',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AutoCompleteSource(args);
  },
  argTypes: {
    source: autoCompleteMeta?.argTypes?.source
  },
  args: {
    source: ["abc", "def", "ghi"]
  }
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;

export const Param: Story = {}