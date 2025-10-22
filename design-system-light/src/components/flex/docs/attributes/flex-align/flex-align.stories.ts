import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import flexMeta from '../../flex.stories';
import { FlexAlign, FlexProps } from '../../flex';
import { html } from 'lit';

const meta: Meta<FlexProps> = {
  title: 'Flex/Attributes/Align',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return FlexAlign(args);
  },
  argTypes: {
    align: flexMeta?.argTypes?.align
  },
  args: {
    align: 'start'
  },
};

export default meta;
type Story = StoryObj<FlexProps>;

export const Param: Story = {}


export const startSample: Story = {
  args: {
    align: 'start'
  },
  render: (args) => {
    return html`
    <style>
        sy-flex {
          background-color: var(--background-default);
        } 
      </style>
        
        <h4 sy-typography="">Align Start</h4>
        <sy-flex align="start" direction="horizontal" justify="space-between" padding="medium" columngap="medium" width="100%" class="align-start-sample">
          <h1 sy-typography>Header Title</h1>
          <h3 sy-typography>Header Title</h3>
          <h5 sy-typography>Header Title</h5>
        </sy-flex>
  `
  }
};

export const endSample: Story = {
  args: {
    align: 'end'
  },
  render: (args) => {
    return html`
    <style>
        sy-flex {
          background-color: var(--background-default);
        } 
      </style>
        
        <h4 sy-typography="">Align End</h4>
        <sy-flex align="end" direction="horizontal" justify="space-between" padding="medium" columngap="medium" width="100%" class="align-end-sample">
          <h1 sy-typography>Header Title</h1>
          <h3 sy-typography>Header Title</h3>
          <h5 sy-typography>Header Title</h5>
        </sy-flex>
  `
  }
};

export const centerSample: Story = {
  args: {
    align: 'center'
  },
  render: (args) => {
    return html`
    <style>
        sy-flex {
          background-color: var(--background-default);
        } 
      </style>
        
        <h4 sy-typography="">Align Center</h4>
        <sy-flex align="center" direction="horizontal" justify="space-between" padding="medium" columngap="medium" width="100%" class="align-center-sample">
          <h1 sy-typography>Header Title</h1>
          <h3 sy-typography>Header Title</h3>
          <h5 sy-typography>Header Title</h5>
        </sy-flex>
  `
  }
};

export const baselineSample: Story = {
  args: {
    align: 'baseline'
  },
  render: (args) => {
    return html`
    <style>
        sy-flex {
          background-color: var(--background-default);
        } 
      </style>
        
        <h4 sy-typography="">Align Baseline</h4>
        <sy-flex align="baseline" direction="horizontal" justify="space-between" padding="medium" columngap="medium" width="100%" class="align-baseline-sample">
          <h1 sy-typography>Header Title</h1>
          <h3 sy-typography>Header Title</h3>
          <h5 sy-typography>Header Title</h5>
        </sy-flex>
  `
  }
};

export const stretchSample: Story = {
  args: {
    align: 'stretch'
  },
  render: (args) => {
    return html`
    <style>
        sy-flex {
          background-color: var(--background-default);
        } 
      </style>
        
        <h4 sy-typography="">Align Strech</h4>
        <sy-flex align="stretch" direction="horizontal" justify="space-between" padding="medium" columngap="medium" width="100%" class="align-stretch-sample">
          <h1 sy-typography>Header Title</h1>
          <h3 sy-typography>Header Title</h3>
          <h5 sy-typography>Header Title</h5>
        </sy-flex>
  `
  }
};



// export const flexStart: Story = {
//   args: {
//     align: 'start'
//   },
//   render: (args) => FlexAlign(args)
// };

// export const flexEnd: Story = {
//   args: {
//     align: 'end'
//   },
//   render: (args) => FlexAlign(args)
// };

// export const center: Story = {
//   args: {
//     align: 'center'
//   },
//   render: (args) => FlexAlign(args)
// };

// export const stretch: Story = {
//   args: {
//     align: 'stretch'
//   },
//   render: (args) => FlexAlign(args)
// };

// export const baseline: Story = {  
//   args: {
//     align: 'baseline'
//   },
//   render: (args) => FlexAlign(args)
// };