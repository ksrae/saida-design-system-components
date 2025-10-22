import type { Meta, StoryObj } from '@storybook/web-components';
import { CollapseAccordion, CollapseProps } from '../../../collapse';
import { clearElements } from '../../../../../clear-element';
import collapseMeta from '../../../collapse.stories';

const meta: Meta<CollapseProps> = {
  title: 'Collapse/Attributes/Accordion',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return CollapseAccordion(args);
  },
  argTypes: {
    accordion: collapseMeta?.argTypes?.accordion
  },
  args: {
    accordion: true
  }
};

export default meta;
type Story = StoryObj<CollapseProps>;

export const Param: Story = {}