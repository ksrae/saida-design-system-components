// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { Typography, TypographyHeading } from './typography-token'

const typographyMeta: Meta = {
  title: 'Foundation/Typography',
  tags: ['false'],
  render: (args) => {
    if(args.type === 'heading') {
      return TypographyHeading({ typenames: args.typenames });
    } else
    return Typography({ typename: args.typenames });
  },
};

export default typographyMeta;
type Story = StoryObj<typeof Typography | typeof TypographyHeading>;
 
export const typoFontfaces: Story = {
  args: {
    type: 'fontfaces',
    typenames: ['roboto-regular','roboto-medium', 'roboto-bold']
  },
};

export const typoHeading: Story = {
  args: {
    type: 'heading',
    typenames: ['typo-heading1','typo-heading2','typo-heading3','typo-heading4','typo-heading5','typo-heading6']
  },
};

export const textStylesRegular: Story = {
  args: {
    type: 'tectstyles',
    typenames: ['base-regular','base-medium','base-bold','base-italic','base-underline','base-strikethrough']
  },
};

export const textStylesLarge: Story = {
  args: {
    type: 'tectstyles',
    typenames: ['large-regular','large-medium','large-bold','large-italic','large-underline','large-strikethrough','large-code']
  },
};

export const textStylesSmall: Story = {
  args: {
    type: 'tectstyles',
    typenames: ['small-regular','small-medium','small-bold','small-italic','small-underline','small-strikethrough','small-code']
  },
};

export const textStylesXSmall: Story = {
  args: {
    type: 'tectstyles',
    typenames: ['xsmall-regular','xsmall-medium','xsmall-bold','xsmall-code']
  },
};

export const textColor: Story = {
  args: {
    type: 'textcolors',
    typenames: ['text-bold','text-default','text-subtle','text-subtlest','text-disabled',
                'text-brand-default','text-brand-subtitle','text-subtlest','text-error','text-warning',
                'text-success','text-information','text-new','text-extended']
    },
};




