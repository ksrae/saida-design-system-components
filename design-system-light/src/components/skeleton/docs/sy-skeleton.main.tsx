import { html, ifDefined, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SySkeletonProps extends Components.SySkeleton {}

export const Skeleton = ({ type, rows, width, disabled }: SySkeletonProps) => html`
  <sy-skeleton type=${ifDefined(type)} rows=${ifDefined(rows as any)} width=${ifDefined(width)} ?disabled=${!!disabled}></sy-skeleton>
`;

// `rows` is exposed alongside `type` because text-style skeletons (and
// any future row-based variants) only show their full shape when rows
// > 0. Without an inline rows control on the Type story, the user
// couldn't dial row count without leaving for the Rows story.
export const SkeletonType = (args: {
  type: 'text' | 'avatar' | 'image' | 'gallary' | 'button' | 'table' | 'tree';
  rows: number;
}) => html`
  <sy-skeleton type=${ifDefined(args.type)} rows=${ifDefined(args.rows as any)}></sy-skeleton>
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
