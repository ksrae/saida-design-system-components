import type { Meta, StoryObj } from '@storybook/web-components';
import { SpinnerDelay, SpinnerDesc, SpinnerProps } from '../../spinner';
import spinnerMeta from '../../spinner.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SpinnerProps> = {
  title: 'Spinner/Attributes/Description',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SpinnerDesc(args);
  },
  argTypes: {
    description: spinnerMeta?.argTypes?.description
  },
  args: {
    description: 'Loading...'
  }
};

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Param: Story = {}