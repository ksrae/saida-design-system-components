import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const usageMeta: Meta = {
    title: 'Usage',
    tags: ['false'],
    render: () => {
      return <div>Welcome to Storybook</div>;
    }
  };


export default usageMeta;
type Story = StoryObj<any>;

export const Param: Story = {}
