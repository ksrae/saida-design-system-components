import { html } from 'lit';
import '../docs/badge.story.scss';
import '../badge.element';
import '../../avatar/avatar.element';
import '../../icon/icon.element';

export interface BadgeProps {
  dot: boolean;
  hidden: boolean;
  overflowCount: number;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  size: 'small' | 'medium';
  standalone: boolean;
  variant: 'red' | 'yellow' | 'green' | 'blue' | 'gray';
  value: number;
}

export const Badge = ({ dot, hidden, overflowCount, position, size, standalone, value, variant } : BadgeProps) => {
  const image = 'avatar_default.png';
  return html`
  <div class="badgeContainer">
      <sy-badge 
      ?dot="${dot}"
      ?hidden="${hidden}"
      overflowCount="${overflowCount}"
      position="${position}"
      size="${size}"
      ?standalone="${standalone}"
      value="${value}"
      variant=${variant}>
      <sy-avatar image=${image}></sy-avatar>
    </sy-badge>

    <sy-badge 
      ?dot="${dot}"
      ?hidden="${hidden}"
      overflowCount="${overflowCount}"
      position="${position}"
      size="${size}"
      ?standalone="${standalone}"
      value="${value}"
      variant=${variant}>
      <sy-avatar letter="JK"></sy-avatar>
    </sy-badge>

    <sy-badge 
      ?dot="${dot}"
      ?hidden="${hidden}"
      overflowCount="${overflowCount}"
      position="${position}"
      size="${size}"
      ?standalone="${standalone}"
      value="${value}"
      variant=${variant}>
      <sy-icon size="xxxlarge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>
      </sy-icon>
    </sy-badge>
  </div>
  `;
};

export const BadgeDot = (args: {dot: boolean}) => {
  return html`
  <div class="badgeContainer">
    <sy-badge ?dot=${args.dot} value="1">
      <sy-icon size="xxlarge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 64C306.7 64 296 74.7 296 88L296 97.7C214.6 109.3 152 179.4 152 264L152 278.5C152 316.2 142 353.2 123 385.8L101.1 423.2C97.8 429 96 435.5 96 442.2C96 463.1 112.9 480 133.8 480L506.2 480C527.1 480 544 463.1 544 442.2C544 435.5 542.2 428.9 538.9 423.2L517 385.7C498 353.1 488 316.1 488 278.4L488 263.9C488 179.3 425.4 109.2 344 97.6L344 87.9C344 74.6 333.3 63.9 320 63.9zM488.4 432L151.5 432L164.4 409.9C187.7 370 200 324.6 200 278.5L200 264C200 197.7 253.7 144 320 144C386.3 144 440 197.7 440 264L440 278.5C440 324.7 452.3 370 475.5 409.9L488.4 432zM252.1 528C262 556 288.7 576 320 576C351.3 576 378 556 387.9 528L252.1 528z"/></svg>
      </sy-icon>
    </sy-badge>
  </div>
  `;
};

export const BadgeHidden = (args: {hidden: boolean}) => {
  const image = 'avatar_default.png';
  return html`
  <div class="badgeContainer">
    <sy-badge ?hidden=${args.hidden} value="1">
      <sy-avatar image=${image}></sy-avatar>
    </sy-badge>
  </div>
  `;
};

export const BadgeOverflowCount = (args: {value: number, overflowCount: number}) => {
  return html`
  <div class="badgeContainer">
    <sy-badge value="${args.value}" overflowCount="${args.overflowCount}">
      <sy-icon size="xxlarge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>
      </sy-icon>
    </sy-badge>
  </div>
  `;
};

export const BadgePosition = (args: {position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'}) => {
  return html`
  <h3>TopLeft</h3>
    <sy-badge position="${args.position}">
      <sy-icon size="xxlarge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>
      </sy-icon>
    </sy-badge>
  `
}

export const BadgeSize = (args: {size: 'small' | 'medium'}) => {
  return html`
    <div class="badgeContainer">
        <sy-badge size="${args.size}">
      <sy-icon size="xxlarge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>
      </sy-icon>
        </sy-badge>
    </div>
  `;
  };
  
  export const BadgeStandalone = (args: {standalone: boolean}) => {
    return html`
    <sy-badge ?standalone=${args.standalone} value="1" size="small">
      <sy-icon size="xxlarge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>
      </sy-icon>
    </sy-badge>
    `;
  };
    
  export const BadgeValue = (args: {value: number}) => {
    return html`
    <sy-badge value="${args.value}">
      <sy-icon size="xxlarge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>
      </sy-icon>
    </sy-badge>
    `;
  };

  export const BadgeVariant = (args: {variant: 'red' | 'yellow' | 'green' | 'blue' | 'gray'}) => {
    const image = 'avatar_default.png';
    return html`
    <div class="badgeContainer">
        <sy-badge variant="${args.variant}" value="1" >
          <sy-avatar image=${image}></sy-avatar>
        </sy-badge>
    </div>
    `;
  };
