import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaFocusBlur } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Events/Focus',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TextareaFocusBlur();
  },
  argTypes: {
    setFocus: textareaMeta?.argTypes?.setFocus,
    setBlur: textareaMeta?.argTypes?.setBlur,
  },
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
