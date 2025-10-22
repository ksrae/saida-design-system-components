import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaChanged } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Events/Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TextareaChanged();
  },
  argTypes: {
    changed: textareaMeta?.argTypes?.changed
  },
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
