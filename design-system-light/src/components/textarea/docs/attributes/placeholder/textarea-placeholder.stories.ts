import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaPlaceholder } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Placeholder',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaPlaceholder(args);
  },
  argTypes: {
    placeholder: textareaMeta?.argTypes?.placeholder
  },
  args: {
    placeholder: 'Placeholder'
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
