import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SySliderProps extends Components.SySlider {}

export const Slider = (args: SySliderProps) => html`
  <sy-slider
    ?disabled=${!!args.disabled}
    ?readonly=${!!args.readonly}
    ?range=${!!args.range}
    ?reverse=${!!args.reverse}
    ?vertical=${!!args.vertical}
    .min=${args.min}
    .max=${args.max}
    .step=${args.step}
    .value=${args.value}
    .showTooltip=${args.showTooltip}
    .tooltipPlacement=${args.tooltipPlacement}
    .marks=${args.marks}
    .hideMarks=${args.hideMarks}
    .rangeValue=${args.rangeValue}
    .hideTrackFill=${args.hideTrackFill}
    .snapToMarks=${args.snapToMarks}
    label=${ifDefined(args.label)}>
  </sy-slider>
`;

export const SliderMin              = (args: { min: number })                          => html`<sy-slider .min=${args.min} .max=${100} .value=${args.min}></sy-slider>`;
export const SliderMax              = (args: { max: number })                          => html`<sy-slider .max=${args.max}></sy-slider>`;
export const SliderStep             = (args: { step: number })                         => html`<sy-slider .step=${args.step}></sy-slider>`;
export const SliderValue            = (args: { value: number })                        => html`<sy-slider .value=${args.value}></sy-slider>`;
export const SliderDisabled         = (args: { disabled: boolean })                    => html`<sy-slider ?disabled=${!!args.disabled}></sy-slider>`;
export const SliderReadonly         = (args: { readonly: boolean })                    => html`<sy-slider ?readonly=${!!args.readonly}></sy-slider>`;
export const SliderShowTooltip      = (args: { showTooltip: 'default' | 'always' | 'never' })          => html`<sy-slider .showTooltip=${args.showTooltip}></sy-slider>`;
export const SliderTooltipPlacement = (args: { tooltipPlacement: 'top' | 'bottom' | 'right' | 'left' }) => html`<sy-slider .tooltipPlacement=${args.tooltipPlacement}></sy-slider>`;
export const SliderMarks            = (args: { marks: { [key: number]: string } })    => html`<sy-slider .marks=${args.marks}></sy-slider>`;
export const SliderHideMarks        = (args: { hideMarks: boolean })                  => html`<sy-slider .hideMarks=${args.hideMarks} .marks=${{ 0:'0', 50:'50', 100:'100' }}></sy-slider>`;
export const SliderRange            = (args: { range: boolean })                      => html`<sy-slider ?range=${!!args.range} .rangeValue=${[20,80]}></sy-slider>`;
export const SliderRangeValue       = (args: { rangeValue: number[] })                => html`<sy-slider range .rangeValue=${args.rangeValue}></sy-slider>`;
export const SliderReverse          = (args: { reverse: boolean })                    => html`<sy-slider ?reverse=${!!args.reverse}></sy-slider>`;
export const SliderLabel            = (args: { label: string })                       => html`<sy-slider label=${ifDefined(args.label)}></sy-slider>`;
export const SliderHideTrackFill    = (args: { hideTrackFill: boolean })              => html`<sy-slider .hideTrackFill=${args.hideTrackFill}></sy-slider>`;
export const SliderSnapToMarks      = (args: { snapToMarks: boolean })                => html`<sy-slider .snapToMarks=${args.snapToMarks} .marks=${{ 0:'0', 25:'25', 50:'50', 75:'75', 100:'100' }}></sy-slider>`;
export const SliderVertical         = (args: { vertical: boolean })                   => html`<div style="height:200px;"><sy-slider ?vertical=${!!args.vertical}></sy-slider></div>`;
