import type { Meta, StoryObj } from '@storybook/web-components';
import { SwitchProps, SwitchChanged } from '../../switch';
import switchMeta from '../../switch.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SwitchProps> = {
  title: 'Switch/Events/Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return SwitchChanged();
  },
  argTypes: {
    changed: switchMeta?.argTypes?.changed
  },
};

export default meta;
type Story = StoryObj<SwitchProps>;

export const Param: Story = {}
