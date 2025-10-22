import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectPlaceholder, SelectProps } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';
const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Placeholder',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectPlaceholder(args);
  },
  argTypes: {
    placeholder: selectMeta?.argTypes?.placeholder,
    mode: selectMeta?.argTypes?.mode
  },
  args: {
    placeholder: 'Select one',
    mode: 'default'
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
