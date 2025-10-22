import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputChanged } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Events/Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return InputChanged();
  },
  argTypes: {
    changed: inputMeta?.argTypes?.changed
  },
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
