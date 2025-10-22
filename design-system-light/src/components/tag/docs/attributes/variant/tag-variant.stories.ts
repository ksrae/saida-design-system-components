import type { Meta, StoryObj } from '@storybook/web-components';
import { TagProps, TagVariant } from '../../tag';
import tagMeta from '../../tag.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TagProps> = {
  title: 'Tag/Attributes/Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TagVariant(args);
  },
  argTypes: {
    variant: tagMeta?.argTypes?.variant
  },
  args: {
    variant: 'gray'
  }
};

export default meta;
type Story = StoryObj<TagProps>;

export const Param: Story = {}
