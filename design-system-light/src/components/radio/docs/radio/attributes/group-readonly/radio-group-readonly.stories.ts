import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioGroupProps, RadioGroupReadonly } from '../../radio';
import radioMeta from '../../radio-group.stories';
import { clearElements } from '../../../../../clear-element';

const meta: Meta<RadioGroupProps> = {
  title: 'Radio/Attributes/Group-Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioGroupReadonly(args);
  },
  argTypes: {
    readonly: radioMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Param: Story = {}