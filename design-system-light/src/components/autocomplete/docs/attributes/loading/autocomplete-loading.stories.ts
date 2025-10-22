import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompleteLoading, AutoCompleteProps } from '../../autocomplete';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../autocomplete.stories';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Attributes/Loading',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AutoCompleteLoading(args);
  },
  argTypes: {
    loading: autoCompleteMeta?.argTypes?.loading
  },
  args: {
    loading: true,
  },
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;

export const Param: Story = {};