import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompleteProps, AutoCompleteTrigger } from '../../autocomplete';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../autocomplete.stories';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Attributes/Trigger',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return AutoCompleteTrigger(args);
  },
  argTypes: {
    trigger: autoCompleteMeta?.argTypes?.trigger
  },
  args: {
    trigger: 'focus'
  }
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;

export const Param: Story = {}