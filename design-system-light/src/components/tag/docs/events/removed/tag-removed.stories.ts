import type { Meta, StoryObj } from '@storybook/web-components';
import { TagProps, TagRemoved } from '../../tag';
import tagMeta from '../../tag.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TagProps> = {
  title: 'Tag/Events/Removed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TagRemoved();
  },
  argTypes: {
    removed: tagMeta?.argTypes?.removed
  },
};

export default meta;
type Story = StoryObj<TagProps>;

export const Param: Story = {}
