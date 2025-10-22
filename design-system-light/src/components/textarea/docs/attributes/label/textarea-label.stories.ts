import type { Meta, StoryObj } from '@storybook/web-components';
import { TextareaProps, TextareaLabel } from '../../textarea';
import textareaMeta from '../../textarea.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TextareaProps> = {
  title: 'Textarea/Attributes/Label',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TextareaLabel(args);
  },
  argTypes: {
    label: textareaMeta?.argTypes?.label
  },
  args: {
    label: 'Label'
  }
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Param: Story = {}
