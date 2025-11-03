import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const themeUsageMeta: Meta = {
    title: 'Theme Guide',
    tags: ['false'],
    render: () => {
      return <div>Welcome to Storybook</div>;
    }
  };


export default themeUsageMeta;
type Story = StoryObj<any>;

export const Param: Story = {}
