import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyModelessGroupProps, ModelessGroup } from './sy-modeless.main';
import { clearElements } from '../../clear-element';

const modelessGroupMeta: Meta<SyModelessGroupProps> = {
  title: 'Modeless/Group Overview',
  component: 'sy-modeless-group',
  tags: [],
  render: (args) => { clearElements(modelessGroupMeta.title); return ModelessGroup(args); },
  argTypes: {},
};

export default modelessGroupMeta;
type Story = StoryObj<SyModelessGroupProps>;
export const Default: Story = { args: {} };
