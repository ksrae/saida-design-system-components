import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import tokenList from './color-token-name.json';
import { colorTokenTable } from './color-token';

const backgroundColorTokens: string[] = tokenList.color_tokens_background;
const borderColorTokens: string[] = tokenList.color_tokens_border;
const textColorTokens: string[] = tokenList.color_tokens_text;
const iconColorTokens: string[] = tokenList.color_tokens_icon;

type CustomArgs = { tokenLists?: string[] };
 
const colorTokenMeta: Meta = {
  title: 'Foundation/Colors',
  tags: ['false'],
  render: (args: any, context: any) => {
    const selectedTheme = context.globals.theme;
    const themeClass = selectedTheme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    return colorTokenTable(themeClass, args.tokenLists);
  }
};

export default colorTokenMeta;
type Story = StoryObj<CustomArgs>;
 
export const Background: Story = {
  args: {
    tokenLists: backgroundColorTokens
  },
};

 
export const Border: Story = {
  args: {
    tokenLists: borderColorTokens
  },
};


export const Text: Story = {
  args: {
    tokenLists: textColorTokens
  },
};

 
export const Icon: Story = {
  args: {
    tokenLists: iconColorTokens
  },
};
