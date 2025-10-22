import type { Meta, StoryObj } from '@storybook/web-components';
import { CheckboxProps, CheckboxChanged } from '../../checkbox';
import checkboxMeta from '../../checkbox.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<CheckboxProps> = {
  title: 'Checkbox/Events/Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return CheckboxChanged();
  },
  argTypes: {
    changed: checkboxMeta?.argTypes?.changed
  },
};

export default meta;
type Story = StoryObj<CheckboxProps>;


export const Param: Story = {};