import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import tabMeta from '../../tab.stories';
import { TabKey, TabProps } from '../../tab';

const meta: Meta<TabProps> = {
  title: 'Tab/Attributes/Tabkey',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabKey(args);
  },
  argTypes: {
    tabkey: tabMeta?.argTypes?.tabkey
  },
  args: {
    tabkey: 't1'
  }
};

export default meta;
type Story = StoryObj<TabProps>;

export const Param: Story = {}