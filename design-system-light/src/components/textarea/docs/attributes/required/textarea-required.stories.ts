import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaRequired } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Required',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaRequired(args);
  },
  argTypes: {
    required: textareaMeta?.argTypes?.required
  },
  args: {
    required: true
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
