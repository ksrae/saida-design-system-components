import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectHide } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Hide',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectHide(args);
  },
  argTypes: {
    hide: selectMeta?.argTypes?.hide,
    mode: selectMeta?.argTypes?.mode,
  },
  args: {
    hide: true,
    mode: 'default'
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
