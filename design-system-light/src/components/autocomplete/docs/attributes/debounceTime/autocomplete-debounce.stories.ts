import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompleteDebounce, AutoCompleteProps } from '../../autocomplete';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../autocomplete.stories';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Attributes/Debounce Time',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AutoCompleteDebounce(args);
  },
  argTypes: {
    debounceTime: autoCompleteMeta?.argTypes?.debounceTime
  },
  args: {
    debounceTime: 1000,
  },
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;

export const Param: Story = {};