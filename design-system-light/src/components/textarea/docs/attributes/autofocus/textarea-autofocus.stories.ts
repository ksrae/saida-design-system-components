import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaAutofocus } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Autofocus',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaAutofocus(args);
  },
  argTypes: {
    autofocus: textareaMeta?.argTypes?.autofocus
  },
  args: {
    autofocus: true
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
