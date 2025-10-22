import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompleteProps, AutoCompleteSelected } from '../../autocomplete';
import autoCompleteMeta from '../../autocomplete.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return AutoCompleteSelected();
  },
  argTypes: {
    selected: autoCompleteMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;


export const Param: Story = {};