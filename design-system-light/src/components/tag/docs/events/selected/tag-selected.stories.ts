import type { Meta, StoryObj } from '@storybook/web-components';
import { TagProps, TagSelected } from '../../tag';
import tagMeta from '../../tag.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TagProps> = {
  title: 'Tag/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TagSelected();
  },
  argTypes: {
    selected: tagMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<TagProps>;

export const Param: Story = {}
