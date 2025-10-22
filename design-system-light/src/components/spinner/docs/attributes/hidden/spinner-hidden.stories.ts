import type { Meta, StoryObj } from '@storybook/web-components';
import { SpinnerProps, SpinnerHidden } from '../../spinner';
import spinnerMeta from '../../spinner.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SpinnerProps> = {
  title: 'Spinner/Attributes/Hidden',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SpinnerHidden(args);
  },
  argTypes: {
    hidden: spinnerMeta?.argTypes?.hidden
  },
  args: {
    hidden: true
  }
};

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Param: Story = {}