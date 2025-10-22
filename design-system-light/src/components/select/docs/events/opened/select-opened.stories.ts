import type { Meta, StoryObj } from '@storybook/web-components';
import { SelectOpened, SelectProps } from '../../select';
import selectMeta from '../../select.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<SelectProps> = {
  title: 'Select/Events/Opened',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return SelectOpened();
  },
  argTypes: {
    opened: selectMeta?.argTypes?.opened
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Param: Story = {}
