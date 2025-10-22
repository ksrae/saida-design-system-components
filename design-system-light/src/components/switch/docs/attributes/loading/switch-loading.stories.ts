import type { Meta, StoryObj } from '@storybook/web-components';
import { SwitchProps, SwitchLoading } from '../../switch';
import switchMeta from '../../switch.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SwitchProps> = {
  title: 'Switch/Attributes/Loading',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SwitchLoading(args);
  },
  argTypes: {
    loading: switchMeta?.argTypes?.loading
  },
  args: {
    loading: true
  }
};

export default meta;
type Story = StoryObj<SwitchProps>;

export const Param: Story = {}
