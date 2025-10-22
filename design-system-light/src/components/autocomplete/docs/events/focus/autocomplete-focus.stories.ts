import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoCompleteFocusBlur, AutoCompleteProps } from '../../autocomplete';
import { clearElements } from '../../../../clear-element';
import autoCompleteMeta from '../../autocomplete.stories';

const meta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Function/Focus & Blur',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return AutoCompleteFocusBlur();
  },
  argTypes: {
    setFocus: autoCompleteMeta?.argTypes?.setFocus,
    setBlur: autoCompleteMeta?.argTypes?.setBlur,
  },
};

export default meta;
type Story = StoryObj<AutoCompleteProps>;


export const Param: Story = {};
