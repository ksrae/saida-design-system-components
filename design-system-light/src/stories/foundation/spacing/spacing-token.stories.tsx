import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { spacingTokenTable } from './spacing-token';

const spacingTokens: string[] = [
  "--spacing-4xsmall",
  // "--spacing-4xsmall-rem",
  "--spacing-3xsmall",
  // "--spacing-3xsmall-rem",
  "--spacing-2xsmall",
  // "--spacing-2xsmall-rem",
  "--spacing-xsmall",
  // "--spacing-xsmall-rem",
  "--spacing-small",
  // "--spacing-small-rem",
  "--spacing-medium",
  // "--spacing-medium-rem",
  "--spacing-large",
  // "--spacing-large-rem",
  "--spacing-xlarge",
  // "--spacing-xlarge-rem",
  "--spacing-2xlarge",
  // "--spacing-2xlarge-rem",
  "--spacing-3xlarge",
  // "--spacing-3xlarge-rem",
  "--spacing-4xlarge",
  // "--spacing-4xlarge-rem"
];

type CustomArgs = { tokenLists?: string[] };
 
const spacingTokenMeta: Meta = {
  title: 'Foundation/Spacing',
  tags: ['false'],
  render: (args: any, context: any) => {
    const selectedTheme = context.globals.theme;
    const themeClass = selectedTheme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
   return spacingTokenTable(themeClass, args.tokenLists);
  }
};

export default spacingTokenMeta;
type Story = StoryObj<CustomArgs>;
 
export const Default: Story = {
  args: {
    tokenLists: spacingTokens
  },
};
