import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioGroupPosition, RadioGroupProps } from '../../radio';
import radioMeta from '../../radio-group.stories';
import { clearElements } from '../../../../../clear-element';

const meta: Meta<RadioGroupProps> = {
  title: 'Radio/Attributes/Group-Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioGroupPosition(args);
  },
  argTypes: {
    position: radioMeta?.argTypes?.position
  },
  args: {
    position: 'horizontal'
  }
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Param: Story = {}