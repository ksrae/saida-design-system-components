import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaReadonly } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaReadonly(args);
  },
  argTypes: {
    readonly: textareaMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
