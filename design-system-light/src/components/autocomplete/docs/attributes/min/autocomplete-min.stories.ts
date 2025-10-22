import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompleteMin, AutoCompleteProps } from '../../autocomplete';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../autocomplete.stories';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Attributes/Min',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AutoCompleteMin(args);
  },
  argTypes: {
    min: autoCompleteMeta?.argTypes?.min
  },
  args: {
    min: 2,
  }
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;

export const Param: Story = {}