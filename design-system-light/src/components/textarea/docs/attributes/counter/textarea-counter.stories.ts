import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaCounter } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Counter',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaCounter(args);
  },
  argTypes: {
    counter: textareaMeta?.argTypes?.counter,
    max: textareaMeta?.argTypes?.max
  },
  args: {
    counter: true,
    max: 10
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
