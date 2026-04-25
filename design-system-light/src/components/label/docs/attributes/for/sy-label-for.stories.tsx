import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import type { SyLabelProps } from '../../sy-label.main';
import { LabelFor } from '../../sy-label.main';

const meta: Meta<Pick<SyLabelProps, 'htmlFor'>> = {
  title: 'Label/Attributes/For',
  component: 'sy-label',
  tags: [],
  render: (args) => LabelFor(args),
  argTypes: {
    htmlFor: {
      name: 'for',
      control: 'text',
      description: 'Sets the id of the element that the label is bound to.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'label-for-input' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    htmlFor: 'label-for-input',
  },
};
export default meta;
type Story = StoryObj<Pick<SyLabelProps, 'htmlFor'>>;
export const Default: Story = {};
