import type { Meta, StoryObj } from '@storybook/web-components';
import { SwitchProps, SwitchChecked } from '../../switch';
import switchMeta from '../../switch.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SwitchProps> = {
  title: 'Switch/Attributes/Checked',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SwitchChecked(args);
  },
  argTypes: {
    checked: switchMeta?.argTypes?.checked
  },
  args: {
    checked: true
  }
};

export default meta;
type Story = StoryObj<SwitchProps>;

export const Param: Story = {}
