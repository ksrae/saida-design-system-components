import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { borderRadiusTable } from './border-radius-token';

const borderRadiusTokens: string[] = [
  "--border-radius-none",
  // "--border-radius-none-rem",  
  "--border-radius-small",
  // "--border-radius-small-rem",
  "--border-radius-medium",
  // "--border-radius-medium-rem",
  "--border-radius-large",
  // "--border-radius-large-rem",
  "--border-radius-full",
  // "--border-radius-full-rem"
];

type CustomArgs = { tokenLists?: string[] };
 
const spacingTokenMeta: Meta = {
  title: 'Foundation/BorderRadius',
  tags: ['false'],
  render: (args) => {
    return borderRadiusTable(args.tokenLists)
  }
};

export default spacingTokenMeta;
type Story = StoryObj<CustomArgs>;
 
export const Default: Story = {
  args: {
    tokenLists: borderRadiusTokens
  },
};
