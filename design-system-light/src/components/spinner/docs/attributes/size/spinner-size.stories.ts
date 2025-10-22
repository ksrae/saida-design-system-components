import type { Meta, StoryObj } from '@storybook/web-components';
import { SpinnerProps, SpinnerSize } from '../../spinner';
import spinnerMeta from '../../spinner.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SpinnerProps> = {
  title: 'Spinner/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SpinnerSize(args);
  },
  argTypes: {
    size: spinnerMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Param: Story = {}