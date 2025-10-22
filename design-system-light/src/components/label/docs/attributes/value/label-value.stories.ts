import type { Meta, StoryObj } from '@storybook/web-components';
import { LabelProps, LabelValue } from '../../label';
import labelMeta from '../../label.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<LabelProps> = {
  title: 'Label/Attributes/Value',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return LabelValue(args);
  },
  argTypes: {
    value: labelMeta?.argTypes?.value,
    valuePosition: labelMeta?.argTypes?.valuePosition,
  },
  args: {
    value: 'Value',
    valuePosition: 'right',
  }
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Param: Story = {}
