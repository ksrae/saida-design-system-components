import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaSize } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaSize(args);
  },
  argTypes: {
    size: textareaMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
