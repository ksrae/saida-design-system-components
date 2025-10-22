import type { Meta, StoryObj } from '@storybook/web-components';
import { TagDisabled, TagProps } from '../../tag';
import tagMeta from '../../tag.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<TagProps> = {
  title: 'Tag/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TagDisabled(args);
  },
  argTypes: {
    disabled: tagMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<TagProps>;

export const Param: Story = {}
