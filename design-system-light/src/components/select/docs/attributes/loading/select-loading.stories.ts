import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectLoading } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Loading',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectLoading(args);
  },
  argTypes: {
    loading: selectMeta?.argTypes?.loading
  },
  args: {
    loading: true
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
