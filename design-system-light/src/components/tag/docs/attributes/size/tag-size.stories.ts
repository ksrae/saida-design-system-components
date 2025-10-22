import type { Meta, StoryObj } from '@storybook/web-components';
import { TagProps, TagSize } from '../../tag';
import tagMeta from '../../tag.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TagProps> = {
  title: 'Tag/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TagSize(args);
  },
  argTypes: {
    size: tagMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<TagProps>;

export const Param: Story = {}
