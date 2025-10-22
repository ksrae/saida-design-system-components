import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectInputChanged, SelectProps, SelectSelected } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Events/InputChanged',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return SelectInputChanged();
  },
  argTypes: {
    inputChanged: selectMeta?.argTypes?.inputChanged
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
