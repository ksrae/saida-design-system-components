import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectSelected } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return SelectSelected();
  },
  argTypes: {
    selected: selectMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
