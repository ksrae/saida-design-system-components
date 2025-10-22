import type { Meta, StoryObj } from '@storybook/web-components';
import { TagProps, TagSelectable } from '../../tag';
import tagMeta from '../../tag.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TagProps> = {
  title: 'Tag/Attributes/Selectable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TagSelectable(args);
  },
  argTypes: {
    selectable: tagMeta?.argTypes?.selectable
  },
  args: {
    selectable: true
  }
};

export default meta;
type Story = StoryObj<TagProps>;

export const Param: Story = {}
