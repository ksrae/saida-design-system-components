import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaClearable } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Clearable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaClearable(args);
  },
  argTypes: {
    clearable: textareaMeta?.argTypes?.clearable
  },
  args: {
    clearable: true
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
