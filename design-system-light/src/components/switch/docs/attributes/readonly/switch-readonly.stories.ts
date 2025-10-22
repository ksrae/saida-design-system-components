import type { Meta, StoryObj } from '@storybook/web-components';
import { SwitchProps, SwitchReadonly } from '../../switch';
import switchMeta from '../../switch.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SwitchProps> = {
  title: 'Switch/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SwitchReadonly(args);
  },
  argTypes: {
    readonly: switchMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<SwitchProps>;

export const Param: Story = {}
