import type { Meta, StoryObj } from '@storybook/web-components';
import { SwitchProps, SwitchDisabled } from '../../switch';
import switchMeta from '../../switch.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SwitchProps> = {
  title: 'Switch/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SwitchDisabled(args);
  },
  argTypes: {
    disabled: switchMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<SwitchProps>;

export const Param: Story = {}
