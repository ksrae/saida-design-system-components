import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectProps, SelectReadonly } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SelectReadonly(args);
  },
  argTypes: {
    readonly: selectMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
