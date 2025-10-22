import type { Meta, StoryObj } from '@storybook/web-components';
import { LabelProps, LabelRequired } from '../../label';
import labelMeta from '../../label.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<LabelProps> = {
  title: 'Label/Attributes/Required',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return LabelRequired(args);
  },
  argTypes: {
    required: labelMeta?.argTypes?.required,
    requiredPosition: labelMeta?.argTypes?.requiredPosition,
  },
  args: {
    required: true,
    requiredPosition: 'right',
  }
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Param: Story = {}
