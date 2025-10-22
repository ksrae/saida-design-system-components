import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaBorderless } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Borderless',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaBorderless(args);
  },
  argTypes: {
    borderless: textareaMeta?.argTypes?.borderless
  },
  args: {
    borderless: true
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
