import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AvatarGroup, SyAvatarGroupProps } from './sy-avatar.main';
import { clearElements } from '../../clear-element';

const avatarGroupMeta: Meta<SyAvatarGroupProps> = {
  title: 'Avatar/Group Overview',
  component: 'sy-avatar-group',
  tags: [],
  render: (args) => {
    clearElements(avatarGroupMeta.title);
    return AvatarGroup(args);
  },
  argTypes: {
      clickable: {
      control: 'boolean',
      description: 'Determines whether avatar is clickable.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    maxCount: {
      control: 'number',
      description: 'Maximum number of avatars to be displayed.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: Infinity as any },
        type: { summary: 'number' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the avatars.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'medium' },
        type: { summary: "small | medium | large" }
      }
    },
    variant: {
      control: 'radio',
      options: ['stack', 'grid'],
      description: 'Define the display of the avatars',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'stack' },
        type: { summary: 'stack | grid' }
      },
    },
    slot: {
      control: false,
      description: 'The list of the avatar',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        disabled: true
      }
    },
  }
};

export default avatarGroupMeta;

type Story = StoryObj<SyAvatarGroupProps>;

export const Default: Story = {
  args: {
    clickable: false,
    variant: 'stack',
    maxCount: 2,
    size: 'medium',
    slot: ``
  },
};

