import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaRows } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Rows',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaRows(args);
  },
  argTypes: {
    rows: textareaMeta?.argTypes?.rows
  },
  args: {
    rows: 4
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
