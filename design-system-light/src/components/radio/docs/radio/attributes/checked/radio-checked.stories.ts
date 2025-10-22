import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioProps, RadioChecked } from '../../radio';
import radioMeta from '../../radio.stories';
import { clearElements } from '../../../../../clear-element';

const meta: Meta<RadioProps> = {
  title: 'Radio/Attributes/Checked',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioChecked(args);
  },
  argTypes: {
    checked: radioMeta?.argTypes?.checked
  },
  args: {
    checked: false
  }
};

export default meta;
type Story = StoryObj<RadioProps>;

export const Param: Story = {}