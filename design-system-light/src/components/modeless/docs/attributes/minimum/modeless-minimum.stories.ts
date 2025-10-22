import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessMinimum, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Minimum',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessMinimum(args);
  },
  argTypes: {
    minimum: modelessMeta?.argTypes?.minimum
  },
  args: {
    minimum: true
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
