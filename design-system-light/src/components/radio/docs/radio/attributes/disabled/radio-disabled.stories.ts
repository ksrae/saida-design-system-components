import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioProps, RadioDisabled } from '../../radio';
import { clearElements } from '../../../../../clear-element';
import radioMeta from '../../radio.stories';

const meta: Meta<RadioProps> = {
  title: 'Radio/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioDisabled(args);
  },
  argTypes: {
    disabled: radioMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<RadioProps>;

export const Param: Story = {}