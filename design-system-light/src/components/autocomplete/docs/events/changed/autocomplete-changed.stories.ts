import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompleteChanged, AutoCompleteProps } from '../../autocomplete';
import autoCompleteMeta from '../../autocomplete.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Events/Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return AutoCompleteChanged();
  },
  argTypes: {
    changed: autoCompleteMeta?.argTypes?.changed
  },
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;


export const Param: Story = {};