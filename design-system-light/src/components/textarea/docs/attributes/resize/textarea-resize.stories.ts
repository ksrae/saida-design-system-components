import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaResize } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Resize',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaResize(args);
  },
  argTypes: {
    resize: textareaMeta?.argTypes?.resize
  },
  args: {
    resize: 'both'
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
