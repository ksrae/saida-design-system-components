import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompleteCaseSensitive, AutoCompleteProps } from '../../autocomplete';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../autocomplete.stories';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Attributes/CaseSensitive',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AutoCompleteCaseSensitive(args);
  },
  argTypes: {
    caseSensitive: autoCompleteMeta?.argTypes?.caseSensitive
  },
  args: {
    caseSensitive: true,
  },
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;


export const Param: Story = {};