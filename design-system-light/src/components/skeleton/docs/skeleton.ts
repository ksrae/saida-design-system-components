import { html } from 'lit';
import '../skeleton.element';

export interface SkeletonProps {
	disabled: boolean;
	rows: number;
	type: 'text' | 'avatar' | 'image' | 'gallary' | 'button' | 'table' | 'tree';
	width: string;
}

export const Skeleton = ({disabled, rows, type,  width}: SkeletonProps) => {
	return html`
    <sy-skeleton 
			?disabled=${disabled}
			type=${type} 
			rows=${rows} 
			width=${width} >
		</sy-skeleton>
	`;
}

export const SkeletonDisabled = (args: {disabled: boolean}) => {
	return html`
		<sy-skeleton ?disabled=${args.disabled} type="text" row="3"></sy-skeleton>
	`;
}

export const SkeletonRows = (args: {rows: number, type: 'text' | 'avatar' | 'image' | 'gallary' | 'button' | 'table' | 'tree'}) => {
	return html`
		<sy-skeleton rows=${args.rows} type="${args.type}" row="${args.rows}"></sy-skeleton>
	`;
}

export const SkeletonType = (args: {type: 'text' | 'avatar' | 'image' | 'gallary' | 'button' | 'table' | 'tree'}) => {
	return html`
		<sy-skeleton type=${args.type} row="3"></sy-skeleton>
	`;
}

export const SkeletonWidth = (args: {width: string}) => {
	return html`
		<sy-skeleton width=${args.width} type="text" row="3"></sy-skeleton>
	`;
}