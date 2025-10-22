import { html } from 'lit';
import '../tab-group.element';
import '../tab.element';
import '../tab-content.element';
import '../../icon/icon.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface TabGroupProps {
  active: number;
  align: 'center' | 'left';
  disabled: boolean;
  draggable: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
  type: "card" | "line";
  size: "small" | "medium" | "large";
  padding: "small" | "medium" | "large" | 'none';
  slotContent: any;
  selected?: () => any;
  ordered?: () => any;
  closed?: () => any;
  closeTab?: (name: string) => void;
}

export const TabGroup = ({ active, align, disabled, draggable, position, size, type, padding, slotContent }: TabGroupProps) => {
  return html`
  <style>
    .tab-group-wrapper {
      height: 250px;
      width: 600px;
    }
  </style> 
<div class="tab-group-wrapper">
  <sy-tab-group 
    active=${active}
    align=${align}
    ?disabled=${disabled}
    ?draggable=${draggable}
    position=${position}
    type=${type}
    size=${size}
    padding=${padding}
    >
    ${unsafeHTML(slotContent)}
  </sy-tab-group>
</div>
  `;
};

export const TabGroupActive = (args: {active: number}) => {
  return html`
<div class="tab-group-wrapper">
  <sy-tab-group active=${args.active}>
    <div slot="tabs">
      <sy-tab tabkey="t1">tab1</sy-tab>
      <sy-tab tabkey="t2">tab2</sy-tab>
      <sy-tab tabkey="t3">tab3</sy-tab>
      <sy-tab tabkey="t4">tab4</sy-tab>
    </div>

    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
      <sy-tab-content name="t2">This is tab2</sy-tab-content>
      <sy-tab-content name="t3">This is tab3</sy-tab-content>
      <sy-tab-content name="t4">This is tab4</sy-tab-content>
    </div>
  </sy-tab-group>
</div>
`;
}

export const TabGroupAlign = (args: {align: 'center' | 'left'}) => {
  return html`
<div class="tab-group-wrapper">
  <sy-tab-group align=${args.align}>
      <div slot="tabs">
        <sy-tab tabkey="t1">tab1</sy-tab>
        <sy-tab tabkey="t2">tab2</sy-tab>
        <sy-tab tabkey="t3">tab3</sy-tab>
        <sy-tab tabkey="t4">tab4</sy-tab>
      </div>
      
      <div slot="contents">
        <sy-tab-content name="t1">This is tab1</sy-tab-content>
        <sy-tab-content name="t2">This is tab2</sy-tab-content>
        <sy-tab-content name="t3">This is tab3</sy-tab-content>
        <sy-tab-content name="t4">This is tab4</sy-tab-content>
      </div>
  </sy-tab-group>
</div>
`;
}

export const TabGroupDisabled = (args: {disabled: boolean}) => {
  return html`
<div class="tab-group-wrapper">
    <sy-tab-group ?disabled=${args.disabled}>
      <div slot="tabs">
        <sy-tab tabkey="t1">tab1</sy-tab>
        <sy-tab tabkey="t2">tab2</sy-tab>
        <sy-tab tabkey="t3">tab3</sy-tab>
        <sy-tab tabkey="t4">tab4</sy-tab>
      </div>

      <div slot="contents"> 
        <sy-tab-content name="t1">This is tab1</sy-tab-content>
        <sy-tab-content name="t2">This is tab2</sy-tab-content>
        <sy-tab-content name="t3">This is tab3</sy-tab-content>
        <sy-tab-content name="t4">This is tab4</sy-tab-content>
      </div>
    </sy-tab-group>
</div>
`;
}

export const TabGroupDraggable = (args: {draggable: boolean}) => {
  return html`
<div class="tab-group-wrapper">
<sy-tab-group ?draggable=${args.draggable}>
  <div slot="tabs">
      <sy-tab tabkey="t1">tab1</sy-tab>
      <sy-tab tabkey="t2">tab2</sy-tab>
      <sy-tab tabkey="t3">tab3</sy-tab>
      <sy-tab tabkey="t4">tab4</sy-tab>
  </div>
    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
      <sy-tab-content name="t2">This is tab2</sy-tab-content>
      <sy-tab-content name="t3">This is tab3</sy-tab-content>
      <sy-tab-content name="t4">This is tab4</sy-tab-content>
    </div>
  </sy-tab-group>
</div>
`;
}

export const TabGroupMore = () => {
  return html`
  <style>
    .tab-group-wrapper {
      height: 250px;
      width: 300px;
    }
  </style> 
<div class="tab-group-wrapper">
<sy-tab-group>
  <div slot="tabs">
    <sy-tab tabkey="t1">tab1</sy-tab>
    <sy-tab tabkey="t2">tab2</sy-tab>
    <sy-tab tabkey="t3">tab3</sy-tab>
    <sy-tab tabkey="t4">tab4</sy-tab>
    <sy-tab tabkey="t5">tab5</sy-tab>
    <sy-tab tabkey="t6">tab6</sy-tab>
  </div>
  <div slot="contents">
    <sy-tab-content name="t1">This is tab1</sy-tab-content>
    <sy-tab-content name="t2">This is tab2</sy-tab-content>
    <sy-tab-content name="t3">This is tab3</sy-tab-content>
    <sy-tab-content name="t4">This is tab4</sy-tab-content>
    <sy-tab-content name="t5">This is tab5</sy-tab-content>
    <sy-tab-content name="t6">This is tab6</sy-tab-content>
  </div>
  </sy-tab-group>
</div>
`;
}

export const TabGroupExtra = () => {
  return html`
  <style>
    .tab-group-wrapper {
      height: 250px;
      width: 300px;
    }
  </style> 
<div class="tab-group-wrapper">
  <sy-tab-group>
    <div slot="tabs">
      <sy-tab tabkey="t1">tab1</sy-tab>
      <sy-tab tabkey="t2">tab2</sy-tab>
      <sy-tab tabkey="t3">tab3</sy-tab>
      <sy-tab tabkey="t4">tab4</sy-tab>
      <sy-tab tabkey="t5">tab5</sy-tab>
    </div>
      
    <sy-tab slot="extra">
      <sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M344 120C344 106.7 333.3 96 320 96C306.7 96 296 106.7 296 120L296 296L120 296C106.7 296 96 306.7 96 320C96 333.3 106.7 344 120 344L296 344L296 520C296 533.3 306.7 544 320 544C333.3 544 344 533.3 344 520L344 344L520 344C533.3 344 544 333.3 544 320C544 306.7 533.3 296 520 296L344 296L344 120z"/></svg></sy-icon>
    </sy-tab>

    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
      <sy-tab-content name="t2">This is tab2</sy-tab-content>
      <sy-tab-content name="t3">This is tab3</sy-tab-content>
      <sy-tab-content name="t4">This is tab4</sy-tab-content>
      <sy-tab-content name="t5">This is tab5</sy-tab-content>
    </div>
  </sy-tab-group>
</div>
`;
}

export const TabGroupPosition = (args: {position: 'top' | 'bottom' | 'left' | 'right'}) => {
  return html`
  <style>
    .tab-group-wrapper {
      height: 250px;
      width: 300px;
    }
  </style>  
<div class="tab-group-wrapper">
  <sy-tab-group position=${args.position}>
    <div slot="tabs">
      <sy-tab tabkey="t1">tab1</sy-tab>
      <sy-tab tabkey="t2">tab2</sy-tab>
      <sy-tab tabkey="t3">tab3</sy-tab>
      <sy-tab tabkey="t4">tab4</sy-tab>
      <sy-tab tabkey="t5">tab5</sy-tab>
      <sy-tab tabkey="t6">tab6</sy-tab>
    </div>
    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
      <sy-tab-content name="t2">This is tab2</sy-tab-content>
      <sy-tab-content name="t3">This is tab3</sy-tab-content>
      <sy-tab-content name="t4">This is tab4</sy-tab-content>
      <sy-tab-content name="t5">This is tab5</sy-tab-content>
      <sy-tab-content name="t6">This is tab6</sy-tab-content>
    </div>
  </sy-tab-group>
</div>
`;
}

export const TabGroupType = (args: {type: "card" | "line"}) => {
  return html`
<div class="tab-group-wrapper">
<sy-tab-group type=${args.type}>
  <div slot="tabs">
    <sy-tab tabkey="t1"><sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg></sy-icon>tab1</sy-tab>
    <sy-tab tabkey="t2">tab2</sy-tab>
  </div>
  <div slot="contents">
    <sy-tab-content name="t1">This is tab1</sy-tab-content>
    <sy-tab-content name="t2">This is tab2</sy-tab-content>
  </div>
  </sy-tab-group>
</div>
`;
}

export const TabGroupSize = (args: {size: "small" | "medium" | "large"}) => {
  return html`
<div class="tab-group-wrapper">
<sy-tab-group size=${args.size}>
    <div slot="tabs">
      <sy-tab tabkey="t1">tab1</sy-tab>
      <sy-tab tabkey="t2">tab2</sy-tab>
      <sy-tab tabkey="t3">tab3</sy-tab>
    </div>
    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
      <sy-tab-content name="t2">This is tab2</sy-tab-content>
      <sy-tab-content name="t3">This is tab3</sy-tab-content>
    </div>
  </sy-tab-group>
</div>
`;
}

export const TabGroupPadding = (args: {padding: "small" | "medium" | "large" | "none"}) => {
  return html`
<div class="tab-group-wrapper">
  <sy-tab-group padding=${args.padding}>
    <div slot="tabs">
      <sy-tab tabkey="t1">tab1</sy-tab>
      <sy-tab tabkey="t2">tab2</sy-tab>
      <sy-tab tabkey="t3">tab3</sy-tab>
    </div>
    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
      <sy-tab-content name="t2">This is tab2</sy-tab-content>
      <sy-tab-content name="t3">This is tab3</sy-tab-content>
    </div>
  </sy-tab-group>
</div>
`;
}


export const TabGroupSelected = () => {
  return html`
<div class="tab-group-wrapper">
  <sy-tab-group id="tabgroupSelected">
    <div slot="tabs">
      <sy-tab tabkey="t1">tab1</sy-tab>
      <sy-tab tabkey="t2">tab2</sy-tab>
      <sy-tab tabkey="t3">tab3</sy-tab>
      <sy-tab tabkey="t4">tab4</sy-tab>
    </div>
    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
      <sy-tab-content name="t2">This is tab2</sy-tab-content>
      <sy-tab-content name="t3">This is tab3</sy-tab-content>
      <sy-tab-content name="t4">This is tab4</sy-tab-content>
    </div>
  </sy-tab-group>
</div>
<p id="tabgroupSelectedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#tabgroupSelected');  
    const result = document.querySelector('#tabgroupSelectedResult');

    const handleSelected = (e) => {
      result.textContent = e.detail.tabkey + ' is selected. ';
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

export const TabGroupOrdered = () => {
  return html`
<div class="tab-group-wrapper">
  <sy-tab-group id="tabgroupOrdered" draggable>
    <div slot="tabs">
      <sy-tab tabkey="tab1">tab1</sy-tab>
      <sy-tab tabkey="tab2">tab2</sy-tab>
      <sy-tab tabkey="tab3">tab3</sy-tab>
      <sy-tab tabkey="tab4">tab4</sy-tab>
    </div>

    <div slot="contents">
      <sy-tab-content name="tab1">This is tab1</sy-tab-content>
      <sy-tab-content name="tab2">This is tab2</sy-tab-content>
      <sy-tab-content name="tab3">This is tab3</sy-tab-content>
      <sy-tab-content name="tab4">This is tab4</sy-tab-content>
    </div>
  </sy-tab-group>
</div>
<p id="tabgroupOrderedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#tabgroupOrdered');  
    const result = document.querySelector('#tabgroupOrderedResult');

    const handleOrdered = (e) => {
      const { detail } = e;
      console.log(detail);
      
      let newTabArr = [];
      detail.forEach((e) => {
        newTabArr.push(e.tabkey);
      });
      result.textContent = 'Newly ordered tabs are    ' +  newTabArr;
    };

    elem.addEventListener('ordered', handleOrdered);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('ordered', handleOrdered);
    });
  })();
</script>
`;
}
