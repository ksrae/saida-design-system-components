import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabClosed, TabProps } from '../../tab';

const meta: Meta<TabProps> = {
  title: 'Tab/Events/Closed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TabClosed();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<TabProps>;

export const Param: Story = {}