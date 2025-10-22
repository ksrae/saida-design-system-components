import type { Meta, StoryObj } from '@storybook/web-components';
import { LabelWidth, LabelProps } from '../../label';
import labelMeta from '../../label.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<LabelProps> = {
  title: 'Label/Attributes/Width',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return LabelWidth(args);
  },
  argTypes: {
    width: labelMeta?.argTypes?.width,
  },
  args: {
    width: ''
  }
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Param: Story = {}
