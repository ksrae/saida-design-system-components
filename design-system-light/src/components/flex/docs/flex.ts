import { html } from "lit";
import "../flex.element";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface FlexProps {
  direction: "horizontal" | "vertical" | "horizontal-reverse" | "vertical-reverse"
  align: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  rowGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  columnGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  height: string;
  justify: 'start' | 'center' | 'end' | 'space-between';
  padding: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  width: string;
  wrap: 'nowrap' | 'wrap' | 'wrap-reverse'
  slotContent: any;
}

export const Flex = ({ align, columnGap, rowGap, height, justify, padding, direction, width, wrap, slotContent }: FlexProps) => {
  return html`
    <sy-flex 
      align=${align}
      columnGap=${columnGap}
      rowGap=${rowGap}
      padding=${padding}
      height=${height}
      justify=${justify}
      direction=${direction}
      width=${width}
      wrap=${wrap}
     >
      ${unsafeHTML(slotContent)}
</sy-flex>
  `;
};

export const FlexAlign = (args: {align: 'start' | 'end' | 'center' | 'stretch' | 'baseline'}) => {
  return html`
    <sy-flex align="${args.align}" width="100%" height="100">
      <div class="flex-item">Item1</div>
      <div class="flex-item">Item2</div>
      <div class="flex-item">Item3</div>
      <div class="flex-item">Item4</div>
    </sy-flex>
  `;
};

export const FlexJustify = (args: {justify: 'start' | 'center' | 'end' | 'space-between'}) => {
  return html`
    <sy-flex justify="${args.justify}" width="100%" height="100" type="horizontal">
      <div class="flex-item">Item1</div>
      <div class="flex-item">Item2</div>
    </sy-flex>
  `;
};

export const FlexGap = (args: {
  columnGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge', 
  rowGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
}) => {
  return html`
    <sy-flex columnGap="${args.columnGap}" rowGap="${args.rowGap}" width="100%" height="100">
      <div class="flex-item">Item1</div>
      <div class="flex-item">Item2</div>
    </sy-flex>
  `;
};

export const FlexPadding = (args: {padding: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'}) => {
  return html`
    <sy-flex padding="${args.padding}" width="100%" height="100">
      <div class="flex-item">Item1</div>
      <div class="flex-item">Item2</div>
    </sy-flex>
  `;
};

export const FlexSize = (args: {width: string, height: string}) => {
  return html`
    <sy-flex width="${args.width}" height="${args.height}">
      <div class="flex-item">Item1</div>
      <div class="flex-item">Item2</div>
    </sy-flex>
  `;
};

export const FlexDirection = (args: {direction: "horizontal" | "vertical" | "horizontal-reverse" | "vertical-reverse"}) => {
  return html`
    <sy-flex direction="${args.direction}" width="100%" height="100">
      <div class="flex-item">Item1</div>
      <div class="flex-item">Item2</div>
    </sy-flex>
  `;
};

export const FlexWrap = (args: {wrap: "wrap" | "nowrap" | "wrap-reverse"}) => {
  return html`
    <sy-flex wrap="${args.wrap}" padding="small" columnGap="small" rowGap="small"  width="200px">
      <div class="flex-item" style="white-space: nowrap;">flex & item1</div>
      <div class="flex-item" style="white-space: nowrap;">flex & item2</div>
      <div class="flex-item" style="white-space: nowrap;">flex & item3</div>
      <div class="flex-item" style="white-space: nowrap;">flex & item4</div>
    </sy-flex>
  `;
};
