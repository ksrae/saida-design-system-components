import type { Meta, StoryObj } from '@storybook/web-components';
import { SwitchProps, SwitchLabel } from '../../switch';
import switchMeta from '../../switch.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SwitchProps> = {
  title: 'Switch/Attributes/Label',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SwitchLabel(args);
  },
  argTypes: {
    label: switchMeta?.argTypes?.label
  },
  args: {
    label: 'Label'
  }
};

export default meta;
type Story = StoryObj<SwitchProps>;

export const Param: Story = {}
