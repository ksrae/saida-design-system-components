import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioGroupProps, RadioGroupDisabled } from '../../radio';
import radioMeta from '../../radio-group.stories';
import { clearElements } from '../../../../../clear-element';

const meta: Meta<RadioGroupProps> = {
  title: 'Radio/Attributes/Group-Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioGroupDisabled(args);
  },
  argTypes: {
    disabled: radioMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Param: Story = {}