import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaValue } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Value',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaValue(args);
  },
  argTypes: {
    value: textareaMeta?.argTypes?.value
  },
  args: {
    value: 'value'
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
