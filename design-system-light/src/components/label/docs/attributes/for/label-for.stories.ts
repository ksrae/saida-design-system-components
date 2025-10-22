import type { Meta, StoryObj } from '@storybook/web-components';
import { LabelFor, LabelProps } from '../../label';
import labelMeta from '../../label.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<LabelProps> = {
  title: 'Label/Attributes/For',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return LabelFor();
  },
  argTypes: {

  },
  args: {

  }
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Param: Story = {}
