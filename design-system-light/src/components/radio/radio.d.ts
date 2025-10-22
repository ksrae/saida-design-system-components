import { RadioElement } from "./radio.element";
import { RadioGroupElement } from './radio-group.element';
import { RadioButtonElement } from './radio-button.element';

declare global {
  interface HTMLElementTagNameMap {
    'sy-radio': RadioElement;
    'sy-radio-group': RadioGroupElement;
    'sy-radio-button': RadioButtonElement;
  }
}