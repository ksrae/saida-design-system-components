import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ModelessClosable, ModelessProps } from '../../modeless';
import modelessMeta from '../../modeless.stories';

const meta: Meta<ModelessProps> = {
  title: 'Modeless/Attributes/Closable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ModelessClosable(args);
  },
  argTypes: {
    closable: modelessMeta?.argTypes?.closable
  },
  args: {
    closable: true
  }
};

export default meta;
type Story = StoryObj<ModelessProps>;

export const Param: Story = {}
