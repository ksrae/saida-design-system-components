import type { Meta, StoryObj } from '@storybook/web-components';
import { TagProps, TagRounded } from '../../tag';
import tagMeta from '../../tag.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TagProps> = {
  title: 'Tag/Attributes/Rounded',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TagRounded(args);
  },
  argTypes: {
    rounded: tagMeta?.argTypes?.rounded
  },
  args: {
    rounded: true
  }
};

export default meta;
type Story = StoryObj<TagProps>;

export const Param: Story = {}
