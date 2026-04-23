import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SySkeletonProps extends Components.SySkeleton {}

export const Skeleton = ({ type, rows, width, disabled }: SySkeletonProps) => html`
  <sy-skeleton type=${ifDefined(type)} rows=${ifDefined(rows as any)} width=${ifDefined(width)} ?disabled=${!!disabled}></sy-skeleton>
`;

export const SkeletonType = (args: { type: 'text' | 'avatar' | 'image' | 'gallary' | 'button' | 'table' | 'tree' }) => html`
  <sy-skeleton type=${ifDefined(args.type)}></sy-skeleton>
`;

export const SkeletonRows = (args: { rows: number }) => html`
  <sy-skeleton type="text" rows=${ifDefined(args.rows as any)}></sy-skeleton>
`;

export const SkeletonWidth = (args: { width: string }) => html`
  <sy-skeleton type="text" width=${ifDefined(args.width)}></sy-skeleton>
`;

export const SkeletonDisabled = (args: { disabled: boolean }) => html`
  <sy-skeleton type="text" ?disabled=${!!args.disabled}></sy-skeleton>
`;

export const SkeletonStopResetAnimation = () => {
  const skRef: Ref<HTMLSySkeletonElement> = createRef();
  return html`
    <sy-skeleton ${ref(skRef)} type="text" rows="3"></sy-skeleton>
    <br/>
    <sy-button @click=${() => skRef.value?.stopAnimation()}>stopAnimation()</sy-button>
    <sy-button @click=${() => skRef.value?.resetAnimation()}>resetAnimation()</sy-button>
  `;
};
