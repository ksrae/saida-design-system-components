import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompletePlaceholder, AutoCompleteProps } from '../../autocomplete';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../autocomplete.stories';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Attributes/Placeholder',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AutoCompletePlaceholder(args);
  },
  argTypes: {
    placeholder: autoCompleteMeta?.argTypes?.placeholder
  },
  args: {
    placeholder: 'Please type here...',
  }
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;

export const Param: Story = {}