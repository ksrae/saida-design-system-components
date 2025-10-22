import { SkeletonElement } from "./skeleton.element";

declare global {
	interface HTMLElementTagNameMap {
		'sy-skeleton': SkeletonElement;
	}
}
