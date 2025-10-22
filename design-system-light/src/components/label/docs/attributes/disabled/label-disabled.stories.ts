import type { Meta, StoryObj } from '@storybook/web-components';
import { LabelProps, LabelDisabled } from '../../label';
import labelMeta from '../../label.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<LabelProps> = {
  title: 'Label/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return LabelDisabled(args);
  },
  argTypes: {
    disabled: labelMeta?.argTypes?.disabled,
  },
  args: {
    disabled: true,
  }
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Param: Story = {}
