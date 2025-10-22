import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputSuffix } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Suffix',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return InputSuffix();
  },
  argTypes: {
    suffix: inputMeta?.argTypes?.suffix
  },
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
