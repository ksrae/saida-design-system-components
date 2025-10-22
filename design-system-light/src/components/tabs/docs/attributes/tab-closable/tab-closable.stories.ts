import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import tabMeta from '../../tab.stories';
import { TabClosable, TabProps } from '../../tab';

const meta: Meta<TabProps> = {
  title: 'Tab/Attributes/Closable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabClosable(args);
  },
  argTypes: {
    closable: tabMeta?.argTypes?.closable
  },
  args: {
    closable: true
  }
};

export default meta;
type Story = StoryObj<TabProps>;

export const Param: Story = {}