import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaMin } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Min',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaMin(args);
  },
  argTypes: {
    min: textareaMeta?.argTypes?.min
  },
  args: {
    min: 5,
    value: 'ABC'
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
