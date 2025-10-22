import { html } from 'lit';
import '../nav.element';
import '../nav-sub.element';
import '../nav-group.element';
import '../nav-item.element';
import '../../divider/divider.element';

export interface NavProps {
  disabled: boolean;
  //trigger: 'hover' | 'click';
  slotContent: any;
  selected?: () => any;
}

export interface NavSubProps {
  disabled: boolean;
  open: boolean;
  title: string;
  value: string;
  slotContent: any;
}

export interface NavGroupProps {
  title: string;
}

export interface NavItemProps {
  value: string;
  disabled: boolean;
  slotContent: any;
}

/**
 * Primary UI component for user interaction
 */
export const Nav = ({ disabled, slotContent }: NavProps) => {
  return html`
<div class="container">
  <sy-nav>
    <sy-nav-group title="group depth 0">
      <sy-nav-item value="1">Item 1</sy-nav-item>
      <sy-nav-item value="2">Item 2</sy-nav-item>
    </sy-nav-group>
    <sy-nav-sub title='sub depth 0 with icon <sy-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"></path></svg></sy-icon>'>
      <sy-nav-item value="3">Item 3</sy-nav-item>
      <sy-nav-sub title="sub depth 1">
        <sy-nav-group title="group depth 2">
          <sy-nav-group title="group depth 3">
            <sy-nav-item value="6">Item 6</sy-nav-item>
            <sy-nav-item value="7">Item 7</sy-nav-item>
          </sy-nav-group>
          <sy-nav-sub title="sub depth 2">
            <sy-nav-item value="8">Item 8</sy-nav-item>
          </sy-nav-sub>
        </sy-nav-group>
      </sy-nav-sub>
    </sy-nav-sub>
    <sy-nav-item value="9">Item 9</sy-nav-item>   
  </sy-nav>
</div>
  `;
};

export const NavSub = ({disabled, open, title, value, slotContent}: NavSubProps) => {
  return html`
<div class="container">
  <sy-nav>
    <sy-nav-sub 
      ?disabled=${disabled}
      ?open=${open}
      title=${title} 
      value=${value}>
			<sy-nav-item value="1">Item1</sy-nav-item>
      <sy-nav-item value="2">Item2</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
</div>
`;
};

export const NavGroup = () => {
  return html`
<div class="container">
  <sy-nav>    
    <sy-nav-group title='Group'>
      <sy-nav-item value="1">Item1</sy-nav-item>
      <sy-nav-item value="2">Item2</sy-nav-item>
    </sy-nav-group>
  </sy-nav>
</div>
`;
};

export const NavItem = ({disabled, value, slotContent}: NavItemProps) => {
  return html`
<div class="container">
  <span>Menu</span>
  <sy-nav>
    <sy-nav-item ?disabled=${disabled} value="${value}">
      Item1
    </sy-nav-item>
  </sy-nav>
</div>
`;
};

export const NavTrigger = (args: {trigger: 'hover' | 'click'}) => {
  return html`
<div class="container">
  <sy-nav trigger=${args.trigger}>
    <sy-nav-sub title="NavSub">
      <sy-nav-item value="1">Item1</sy-nav-item>
      <sy-nav-item value="2">Item2</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
</div>
<br/>
<br/>
<br/>
`;
};

export const SubNav = () => {
  return html`
<div class="container">
  <sy-nav>
    <sy-nav-sub title="NavSub">
      <sy-nav-item value="1">Item1</sy-nav-item>
      <sy-nav-item value="2">Item2</sy-nav-item>
      <sy-nav-sub title="NavSub2">
        <sy-nav-group title="NavGroup2">
          <sy-nav-item value="5">Item5</sy-nav-item>
          <sy-nav-item value="6">Item6</sy-nav-item>
        </sy-nav-group>
      </sy-nav-sub>
    </sy-nav-sub>
    <sy-nav-sub title='NavSub'>
      <sy-nav-group title="nav group">
        <sy-nav-item value="3">Item3</sy-nav-item>
        <sy-nav-item value="4">Item4</sy-nav-item>
      </sy-nav-group>    
    </sy-nav-sub>
  </sy-nav>
</div>

  `;
}

export const SubNavArrow = () => {
  return html`
<h3>Only Subnav has a children nav has arrow</h3>
<p>See Events/Selected for more details.</p>
<div class="container">
  <sy-nav>
    <sy-nav-sub title="Sub has arrow">
      <sy-nav-item value="1-1">Item1-1</sy-nav-item>
      <sy-nav-item value="1-2">Item1-2</sy-nav-item>
    </sy-nav-sub>
    <sy-nav-sub title="Sub has no arrow"></sy-nav-sub>
  </sy-nav>
</div>
  `;
}

export const NavSubDisabled = (args: {disabled: boolean}) => {
  return html`
<div class="container">
  <sy-nav>
    <sy-nav-sub ?disabled=${args.disabled} title="NavSub" >
      <sy-nav-item value="1">Item1</sy-nav-item>
      <sy-nav-item value="2">Item2</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
</div>
<br/>
<br/>
<br/>
  `;
}

export const NavSubOpen = (args: {open: boolean}) => {
  return html`
<div class="container">
  <sy-nav>
    <sy-nav-sub ?open=${args.open} title='NavSub'>
      <sy-nav-group title='Nav Group'>
        <sy-nav-item value="1">Item1</sy-nav-item>
        <sy-nav-item value="2">Item2</sy-nav-item>
      </sy-nav-group>
    </sy-nav-sub>
  </sy-nav>
</div>
<br/>
<br/>
<br/>
  `;
}

export const NavItemDisabled = (args: {disabled: boolean}) => {
  return html`
<div class="container">
  <sy-nav>
    <sy-nav-item ?disabled=${args.disabled} value="1">Item1</sy-nav-item>
  </sy-nav>
</div>
  `;
}

export const NavItemSelected = () => {
  return html`
  <h3>Nav Item Selected</h3>

<div class="container">
  <sy-nav id="navItemSelected">
    <sy-nav-sub title="Item1" value="1">
      <sy-nav-item value="1-1">Item1-1</sy-nav-item>
      <sy-nav-item value="1-2">Item1-2</sy-nav-item>
    </sy-nav-sub>
    <sy-nav-sub title="Item2" value="2">
      <sy-nav-item value="2-1">Item2-1</sy-nav-item>
      <sy-nav-item value="2-2">Item2-2</sy-nav-item>
    </sy-nav-sub>
  </sy-nav>
</div>

<p id="navItemSelectedResult"></p>

<script>
  (() => {
    let elem = document.querySelector('#navItemSelected');  
    let result = document.querySelector('#navItemSelectedResult');    

    let handleSelected = (e) => {
      result.textContent = 'value ' + e.detail + ' is selected';
    };

    elem.addEventListener('selected', handleSelected);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleSelected);
    });
  })();

</script>` 
};