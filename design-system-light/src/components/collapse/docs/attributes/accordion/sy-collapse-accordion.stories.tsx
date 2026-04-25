import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CollapseAccordion } from '../../sy-collapse.main';
import collapseMeta from '../../sy-collapse.stories';

const meta: Meta = {
  title: 'Collapse/Attributes/Accordion',
  component: 'sy-collapse',
  tags: [],
  render: (args) => CollapseAccordion(args as { accordion: boolean }),
  argTypes: { accordion: collapseMeta?.argTypes?.accordion },
  args: { accordion: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
