import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const highChartMeta: Meta = {
  title: 'StyleGuide/HighChart/Overview',
  tags: ['false'],
  render: () => {
    return <div>log</div>;
  },
};

export default highChartMeta;
type Story = StoryObj<any>;

// type = "line"
export const Default: Story = {};
