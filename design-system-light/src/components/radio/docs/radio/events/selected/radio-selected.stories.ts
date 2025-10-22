import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioGroupProps, RadioSelected } from '../../radio';
import radioMeta from '../../radio-group.stories';
import { clearElements } from '../../../../../clear-element';

const meta: Meta<RadioGroupProps> = {
  title: 'Radio/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return RadioSelected();
  },
  argTypes: {
    selected: radioMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<RadioGroupProps>;


export const Param: Story = {};