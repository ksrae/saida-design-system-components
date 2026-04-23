import { html } from 'lit';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const render = () => {
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  return html`
    <sy-modal ${ref(modalRef)} enable-modal-maximize variant="modal" closable>
      <div slot="body">
        <p>Call <code>setMaximum()</code> to toggle maximized state.</p>
        <sy-button variant="primary" @click=${() => modalRef.value?.setMaximum()}>setMaximum()</sy-button>
      </div>
    </sy-modal>
    <sy-button @click=${() => modalRef.value?.setOpen()}>Click to Open</sy-button>
  `;
};

const meta: Meta = {
  title: 'Modal/Methods/setMaximum',
  component: 'sy-modal',
  tags: [],
  render,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
