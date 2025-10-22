import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import tabMeta from '../../tab.stories';
import { TabDisabled, TabProps } from '../../tab';

const meta: Meta<TabProps> = {
  title: 'Tab/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabDisabled(args);
  },
  argTypes: {
    disabled: tabMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<TabProps>;

export const Param: Story = {}