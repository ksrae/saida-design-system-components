import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaMax } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Max',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaMax(args);
  },
  argTypes: {
    max: textareaMeta?.argTypes?.max,
    value: textareaMeta?.argTypes?.value
  },
  args: {
    max: 5,
    value: 'ABCDEFGHIJKL'
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
