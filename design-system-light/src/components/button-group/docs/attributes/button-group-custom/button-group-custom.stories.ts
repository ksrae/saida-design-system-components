import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ButtonGroupCustom, ButtonGroupProps } from '../../button-group';

const meta: Meta<ButtonGroupProps> = {
  title: 'ButtonGroup/Attributes/Custom',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ButtonGroupCustom();
  }
};

export default meta;
type Story = StoryObj<ButtonGroupProps>;

export const Param: Story = {}
