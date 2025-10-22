import type { Meta, StoryObj } from '@storybook/web-components';
import { SpinnerProps, SpinnerInline } from '../../spinner';
import spinnerMeta from '../../spinner.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SpinnerProps> = {
  title: 'Spinner/Attributes/Inline',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SpinnerInline(args);
  },
  argTypes: {
    inline: spinnerMeta?.argTypes?.inline
  },
  args: {
    inline: true,
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Param: Story = {}