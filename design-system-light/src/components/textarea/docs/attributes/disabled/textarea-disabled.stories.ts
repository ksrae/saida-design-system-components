import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaDisabled } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaDisabled(args);
  },
  argTypes: {
    disabled: textareaMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
