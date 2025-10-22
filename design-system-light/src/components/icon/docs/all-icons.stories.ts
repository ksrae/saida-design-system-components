import type { Meta, StoryObj } from '@storybook/web-components';
import { AllIcons, IconListProps } from './all-icons';
import { clearElements } from '../../clear-element';

const allIconMeta: Meta<IconListProps> = {
  title: 'Icons/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements('Icon/Overview');
    return AllIcons();
  },
  argTypes: {
    
  },
};

export default allIconMeta;
type Story = StoryObj<IconListProps>;


export const Default: Story = {

}
