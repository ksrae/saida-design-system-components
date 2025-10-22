import type { Meta, StoryObj } from '@storybook/web-components';
import { CheckboxFocusBlur, CheckboxProps } from '../../checkbox';
import { clearElements } from '../../../../clear-element';
import checkboxMeta from '../../checkbox.stories';

const meta: Meta<CheckboxProps> = {
  title: 'Checkbox/Function/Focus & Blur',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return CheckboxFocusBlur();
  },
  argTypes: {
    setFocus: checkboxMeta?.argTypes?.setFocus,
    setBlur: checkboxMeta?.argTypes?.setBlur,
  },
};

export default meta;
type Story = StoryObj<CheckboxProps>;


export const Param: Story = {};
