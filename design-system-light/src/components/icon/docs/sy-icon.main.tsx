import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Components } from '../../../components';

export interface SyIconProps extends Components.SyIcon {
  slot?: any;
  selected?: (event: CustomEvent<any>) => void;
}

export const Icon = ({path, selectable, size, slot}: SyIconProps) => {
  return html`
	<sy-icon
    path=${path}
    ?selectable=${selectable}
    size=${size}>
    ${unsafeHTML(slot)}
  </sy-icon>
  `;
};

export const IconSelectable = (args: {selectable: boolean}) => {
  return html`
<sy-icon id="iconSelectable" ?selectable=${args.selectable}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M568.4 196.5C563.9 207 550 206.3 543.5 196.9C515.7 156.9 477.4 124.7 432.5 104.3C422.1 99.6 418.8 86 428.4 79.7C443.4 69.8 461.4 64 480.7 64C533.3 64 575.9 106.6 575.9 159.2C575.9 172.4 573.2 185 568.3 196.5zM96.5 196.9C90 206.3 76 207 71.6 196.5C66.7 185 64 172.4 64 159.2C64 106.6 106.6 64 159.2 64C178.5 64 196.5 69.8 211.5 79.7C221.1 86 217.8 99.6 207.4 104.3C162.6 124.7 124.3 156.9 96.4 196.9zM454.2 531.4C416.8 559.4 370.3 576 320 576C269.7 576 223.2 559.4 185.9 531.4L150.6 566.6C138.1 579.1 117.8 579.1 105.3 566.6C92.8 554.1 92.8 533.8 105.3 521.3L140.5 486.1C112.6 448.8 96 402.3 96 352C96 228.3 196.3 128 320 128C443.7 128 544 228.3 544 352C544 402.3 527.4 448.8 499.4 486.2L534.6 521.4C547.1 533.9 547.1 554.2 534.6 566.7C522.1 579.2 501.8 579.2 489.3 566.7L454.1 531.5zM344 248C344 234.7 333.3 224 320 224C306.7 224 296 234.7 296 248L296 352C296 358.4 298.5 364.5 303 369L359 425C368.4 434.4 383.6 434.4 392.9 425C402.2 415.6 402.3 400.4 392.9 391.1L343.9 342.1L343.9 248z"/></svg>
</sy-icon>
<p id="iconSelectableResult"></p>

<script>
  (() => {
    let elem = document.querySelector('#iconSelectable');
    let result = document.querySelector('#iconSelectableResult');

    let handleSelected = (e) => {
      result.textContent = 'icon selected.';
    };

    elem.addEventListener('selected', handleSelected);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleSelected);
    });
  })();

</script>
`;
}

export const IconPath = (args: {path: string}) => {
  return html`
<sy-icon path="${args.path}" style="color: #e53935;"></sy-icon>
`;
}

export const IconSize = (args: {size: 'xxsmall' |  'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'}) => {
  return html`
<sy-icon size="${args.size}">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M568.4 196.5C563.9 207 550 206.3 543.5 196.9C515.7 156.9 477.4 124.7 432.5 104.3C422.1 99.6 418.8 86 428.4 79.7C443.4 69.8 461.4 64 480.7 64C533.3 64 575.9 106.6 575.9 159.2C575.9 172.4 573.2 185 568.3 196.5zM96.5 196.9C90 206.3 76 207 71.6 196.5C66.7 185 64 172.4 64 159.2C64 106.6 106.6 64 159.2 64C178.5 64 196.5 69.8 211.5 79.7C221.1 86 217.8 99.6 207.4 104.3C162.6 124.7 124.3 156.9 96.4 196.9zM454.2 531.4C416.8 559.4 370.3 576 320 576C269.7 576 223.2 559.4 185.9 531.4L150.6 566.6C138.1 579.1 117.8 579.1 105.3 566.6C92.8 554.1 92.8 533.8 105.3 521.3L140.5 486.1C112.6 448.8 96 402.3 96 352C96 228.3 196.3 128 320 128C443.7 128 544 228.3 544 352C544 402.3 527.4 448.8 499.4 486.2L534.6 521.4C547.1 533.9 547.1 554.2 534.6 566.7C522.1 579.2 501.8 579.2 489.3 566.7L454.1 531.5zM344 248C344 234.7 333.3 224 320 224C306.7 224 296 234.7 296 248L296 352C296 358.4 298.5 364.5 303 369L359 425C368.4 434.4 383.6 434.4 392.9 425C402.2 415.6 402.3 400.4 392.9 391.1L343.9 342.1L343.9 248z"/></svg>
</sy-icon>
`;
}

// export const IconType = (args: {type: string}) => {
//   return html`
// <sy-icon type="${args.type}"></sy-icon>
// `;
// }

export const IconSlot = () => {
  return html`
<sy-icon>
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
  </svg>
</sy-icon>`;
}

export const IconSelected = () => {
  return html`
<h3>Selected Event</h3>
<sy-icon selectable id="IconSelected">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M568.4 196.5C563.9 207 550 206.3 543.5 196.9C515.7 156.9 477.4 124.7 432.5 104.3C422.1 99.6 418.8 86 428.4 79.7C443.4 69.8 461.4 64 480.7 64C533.3 64 575.9 106.6 575.9 159.2C575.9 172.4 573.2 185 568.3 196.5zM96.5 196.9C90 206.3 76 207 71.6 196.5C66.7 185 64 172.4 64 159.2C64 106.6 106.6 64 159.2 64C178.5 64 196.5 69.8 211.5 79.7C221.1 86 217.8 99.6 207.4 104.3C162.6 124.7 124.3 156.9 96.4 196.9zM454.2 531.4C416.8 559.4 370.3 576 320 576C269.7 576 223.2 559.4 185.9 531.4L150.6 566.6C138.1 579.1 117.8 579.1 105.3 566.6C92.8 554.1 92.8 533.8 105.3 521.3L140.5 486.1C112.6 448.8 96 402.3 96 352C96 228.3 196.3 128 320 128C443.7 128 544 228.3 544 352C544 402.3 527.4 448.8 499.4 486.2L534.6 521.4C547.1 533.9 547.1 554.2 534.6 566.7C522.1 579.2 501.8 579.2 489.3 566.7L454.1 531.5zM344 248C344 234.7 333.3 224 320 224C306.7 224 296 234.7 296 248L296 352C296 358.4 298.5 364.5 303 369L359 425C368.4 434.4 383.6 434.4 392.9 425C402.2 415.6 402.3 400.4 392.9 391.1L343.9 342.1L343.9 248z"/></svg>
</sy-icon>
<br/>

<p id="IconSelectedResult"></p>

<script>
  (() => {
    let elem = document.querySelector('#IconSelected');
    let result = document.querySelector('#IconSelectedResult');

    let handleSelected = (e) => {
      result.textContent = e.detail?.value + ' is selected.';
    };

    elem.addEventListener('selected', handleSelected);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleSelected);
    });
  })();

</script>`
};
