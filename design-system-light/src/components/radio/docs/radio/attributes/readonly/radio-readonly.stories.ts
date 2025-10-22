import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioProps, RadioReadonly } from '../../radio';
import { clearElements } from '../../../../../clear-element';
import radioMeta from '../../radio.stories';

const meta: Meta<RadioProps> = {
  title: 'Radio/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioReadonly(args);
  },
  argTypes: {
    readonly: radioMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<RadioProps>;

export const Param: Story = {}