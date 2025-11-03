import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const welcomeMeta: Meta = {
  title: 'Welcome',
  tags: ['false'],
  render: () => {
    return <div>Welcome to Storybook</div>;
}
};

export default welcomeMeta;
type Story = StoryObj<any>;

export const Welcome: Story = {}
