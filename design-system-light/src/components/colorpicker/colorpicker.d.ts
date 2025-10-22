import { ColorPickerContentElement } from "./colorpicker-content.element";
import { ColorPickerElement } from "./colorpicker.element";

declare global {
	interface HTMLElementTagNameMap {
		'sy-colorpicker': ColorPickerElement;
		'sy-colorpicker-content': ColorPickerContentElement
	}
}
