import type { Meta, StoryObj } from '@storybook/web-components';
import { SpinnerDelay, SpinnerProps } from '../../spinner';
import spinnerMeta from '../../spinner.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SpinnerProps> = {
  title: 'Spinner/Attributes/Delay',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SpinnerDelay(args);
  },
  argTypes: {
    delay: spinnerMeta?.argTypes?.delay
  },
  args: {
    delay: 1000
  }
};

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Param: Story = {}