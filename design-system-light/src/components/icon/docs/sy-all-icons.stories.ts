import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../clear-element';
import { AllIcons, IconListProps } from './sy-all-icons.main';

const allIconMeta: Meta<IconListProps> = {
  title: 'Icons/Overview',
  tags: ['false'],
  render: () => {
    clearElements(allIconMeta.title);
    return AllIcons();
  },
  argTypes: {

  },
};

export default allIconMeta;
type Story = StoryObj<IconListProps>;


export const Default: Story = {

}
