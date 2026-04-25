import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyButtonProps, ButtonFullWidth } from '../../sy-button.main';
import buttonMeta from '../../sy-button.stories';

// NOTE: "Justified" folder kept for URL stability; the underlying prop is now
// `fullWidth` (attribute: `full-width`) per spec. The legacy `justified` attribute
// still works via fnAssignPropFromAlias inside the component for back-compat.
const meta: Meta<SyButtonProps> = {
  title: 'Button/Attributes/Full Width',
  component: 'sy-button',
  tags: [],
  render: (args) => ButtonFullWidth(args),
  argTypes: {
    fullWidth: buttonMeta?.argTypes?.fullWidth
  },
  args: {
    fullWidth: true
  },
};

export default meta;

type Story = StoryObj<SyButtonProps>;
export const Default: Story = {};
