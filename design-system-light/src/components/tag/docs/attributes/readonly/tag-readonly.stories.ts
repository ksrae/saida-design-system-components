import type { Meta, StoryObj } from '@storybook/web-components';
import { TagProps, TagReadonly } from '../../tag';
import tagMeta from '../../tag.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TagProps> = {
  title: 'Tag/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TagReadonly(args);
  },
  argTypes: {
    readonly: tagMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<TagProps>;

export const Param: Story = {}
