import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../avatar-group.element';
import '../avatar.element';

  export interface AvatarGroupProps {
    clickable: boolean,
    maxCount: number;
    size: 'small' | 'medium' | 'large';
    variant: 'stack' | 'grid';
    slotContent : any;
    selected?: () => any;
  }
  
  export interface AvatarProps {
    clickable: boolean;
    disabled: boolean;
    icon: string;
    image: string;
    letter: string;
    size: 'small' | 'medium' | 'large';
    text: string;
    tooltipContent: string;
    variant: 'lightgray' | 'red' | 'orange' | 'orange' | 'yellow' | 'lime' | 'green' | 'teal' | 'blue' | 'purple' | 'magenta' | 'darkgray';
    selected?: () => any;
    disableStatus?: () => any;
  }

  export const AvatarGroup = ({ clickable, maxCount, size, variant, slotContent } : AvatarGroupProps) => {
    return html`
    <sy-avatar-group
      ?clickable=${clickable}
      maxCount=${maxCount}
      size=${size}
      variant=${variant}>
      <sy-avatar variant="red" letter="JD" size="medium"></sy-avatar>
      <sy-avatar variant="purple" letter="JK" size="medium"></sy-avatar>
      <sy-avatar text="Juwon Kim" size="medium"></sy-avatar>
      <sy-avatar variant="green" text="The Q" size="medium"></sy-avatar>
    </sy-avatar-group>
    `
  };
  
  export const Avatar = ({ clickable, disabled, icon, image, letter, size, text, tooltipContent, variant } : AvatarProps) => {
    return html`
    <sy-avatar-group>
      <sy-avatar
        ?clickable=${clickable}
        ?disabled=${disabled}
        icon=${icon}
        image=${image}
        letter=${letter}
        size=${size}
        text=${text}
        tooltipContent=${tooltipContent}
        variant=${variant}>
      </sy-avatar>
    </sy-avatar-group>
    `
  };

  export const AvatarGroupClickable = (args: {clickable: boolean}) => {
    return html`
    <div>
      <sy-avatar-group 
        id="avatar-list"
        ?clickable=${args.clickable}
        maxCount="2">
        <sy-avatar image="avatar_default.png"></sy-avatar>
        <sy-avatar icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'><path fill='currentColor' d='M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z'/></svg>"></sy-avatar>
        <sy-avatar text="star" color="red"></sy-avatar>
        <sy-avatar letter="AB" color="purple"></sy-avatar>
      </sy-avatar-group>
      <p 
        id="clicked-avatar-group" 
        style="
        margin-top:10px;
        display: ${args.clickable ? 'block' : 'none'}"></p>
      </div>

    <script>
      (() => {
        let elemList = document.querySelector('#avatar-list');  
        let resultList = document.querySelector('#clicked-avatar-group'); 
        
        let handleListClicked = (e) => {
          if(resultList) {
            resultList.innerHTML = '<b>Selected avatar information</b><br/>';
            resultList.innerHTML += '- letter:' + e.detail.letter  + '<br/>';
            resultList.innerHTML += '- text  :' + e.detail.text + '<br/>';
            resultList.innerHTML += '- icon  :' + e.detail.icon + '<br/>';
            resultList.innerHTML += '- image :' + e.detail.image + '<br/>';
            if(e.detail.index !== undefined) {
              resultList.innerHTML += '- index :' + e.detail.index ?? '';
            }
          }
        };

        elemList?.addEventListener('selected', handleListClicked);
        })();
    </script>`;
  }

  export const AvatarGroupMaxCount = (args: {maxCount: number}) => {
    return html`
    <sy-avatar-group maxCount="${args.maxCount}">
      <sy-avatar icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>'></sy-avatar>
      <sy-avatar icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>'></sy-avatar>
      <sy-avatar icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>'></sy-avatar>
      <sy-avatar icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>'></sy-avatar>
      <sy-avatar icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>'></sy-avatar>
    </sy-avatar-group>
  `;
  };
  
  export const AvatarGroupSize = (args: {size: 'small' | 'medium' | 'large'}) => {
    return html`
    <sy-avatar-group size="${args.size}">
      <sy-avatar icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>'></sy-avatar>
      <sy-avatar icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>'></sy-avatar>
    </sy-avatar-group>
    `
  };

  export const AvatarGroupVariant = (args: {variant: 'stack' | 'grid'}) => {
    return html`
      <sy-avatar-group 
        variant="${args.variant}" 
        maxCount="5">
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
      <sy-avatar letter="AB" tooltipContent="User AB"></sy-avatar>
    </sy-avatar-group>
  `;
  };



  export const AvatarClickable = (args: {clickable: boolean}) => {
    return html`
    <div>
      <sy-avatar 
        id="standaloneAvatar" 
        ?clickable=${args.clickable}
        letter="AB" 
        color="purple">
      </sy-avatar>
      <p 
        id="clickedStandaloneAvatar" 
        style="
        margin-top:10px;
        display: ${args.clickable ? 'block': 'none'}">
      </p>
    </div>

    <script>
      (() => {
        let elemStandalone = document.querySelector('#standaloneAvatar');     
        let resultStandalone = document.querySelector('#clickedStandaloneAvatar');    

        let handleStandaloneClicked = (e) => {
          if(resultStandalone) {
            resultStandalone.innerHTML = '<b>Selected avatar information</b><br/>';
          resultStandalone.innerHTML += '- letter:' + e.detail.letter  + '<br/>';
          resultStandalone.innerHTML += '- text  :' + e.detail.text + '<br/>';
          resultStandalone.innerHTML += '- icon  :' + e.detail.icon + '<br/>';
          resultStandalone.innerHTML += '- image :' + e.detail.image;
          }
        };
        elemStandalone?.addEventListener('selected', handleStandaloneClicked);
      })();
    </script>`;
  }

  export const AvatarDisabled = (args: {disabled: boolean}) => {
    return html`
    <span>A menu item contains disabled avatar sets disabled.</span>
    <sy-avatar-group maxCount="1">
      <sy-avatar letter="AB" color="#eeaa11" ?disabled=${args.disabled}></sy-avatar>
      <sy-avatar letter="CD" color="#00aa11" ?disabled=${args.disabled}></sy-avatar>
      <sy-avatar letter="EF" color="#ee0011" ?disabled=${args.disabled}></sy-avatar>
    </sy-avatar-group>
  `;
  };

  export const AvatarImage = (args: {image: string}) => {
    return html`
    <sy-avatar image="${args.image}"></sy-avatar>
    <br/>
  `;
  };

  export const AvatarIcon = (args: {icon: string}) => {
    return html`
    <sy-avatar icon="${args.icon}"></sy-avatar>
  `;
  };

  export const AvatarLetter = (args: {letter: string}) => {
    return html`
    <sy-avatar letter="${args.letter}"></sy-avatar>

  `;
  };

  export const AvatarSize = (args: {size: 'small' | 'medium' | 'large'}) => {
    return html`
    <sy-avatar size="${args.size}" letter="AB"></sy-avatar>
  `;
  };

  export const AvatarText = (args: {text: string}) => {
    return html`
    <sy-avatar text="${args.text}"></sy-avatar>
  `;
  };

  export const AvatartooltipContent = (args: {tooltipContent: string}) => {
    const image = 'avatar_default.png';
    return html`
    <sy-avatar tooltipContent="${args.tooltipContent}" image=${image}></sy-avatar>
  `;
  };

  export const AvatarVariant = (args: {variant: 'lightgray' | 'red' | 'orange' | 'orange' | 'yellow' | 'lime' | 'green' | 'teal' | 'blue' | 'purple' | 'magenta' | 'darkgray'}) => {
    return html`
    <sy-avatar variant="${args.variant}" letter="AB"></sy-avatar>
  `;
  };

  export const AvatarDisableStatus = (args: {disabled: boolean}) => {
    const image = 'avatar_default.png';
    return html`
<sy-avatar id="avatarDisableStatus" ?disabled=${args.disabled} image=${image} clickable></sy-avatar>

<p id="clicked-avatar" style="margin-top:20px;"></p>

    <script>
      (() => {
          let elemAvatar = document.querySelector('#avatarDisableStatus');  
          let result = document.querySelector('#clicked-avatar');    

          let handleClicked = (e) => {
            const text = e.detail;
            
            result.innerHTML = 'disable status: ' + e.detail.disabled + '<br/>';

          };

          elemAvatar.addEventListener('disableStatus', handleClicked);
        })();
    </script>`;
  }

  export const AvatarSelected = () => {
    const image = 'avatar_default.png';
    return html`
<sy-avatar id="imageAvatar" image=${image} clickable></sy-avatar>
<sy-avatar id="iconAvatar" icon="star" clickable></sy-avatar>
<sy-avatar id="letterAvatar" letter="AB" clickable></sy-avatar>
<sy-avatar id="textAvatar" text="First last" clickable></sy-avatar>

<p id="clicked-avatar" style="margin-top:20px;"></p>


    <script>
      (() => {
          let elemAvatar = document.querySelector('#imageAvatar');  
          let elemIcon = document.querySelector('#iconAvatar');  
          let elemLetter = document.querySelector('#letterAvatar');  
          let elemText = document.querySelector('#textAvatar');  
          let result = document.querySelector('#clicked-avatar');    

          let handleClicked = (e) => {
            const text = e.detail;
            
            result.innerHTML = '<b>Selected avatar information</b><br/>';
            result.innerHTML += '- letter:' + e.detail.letter  + '<br/>';
            result.innerHTML += '- text  :' + e.detail.text + '<br/>';
            result.innerHTML += '- icon  :' + e.detail.icon + '<br/>';
            result.innerHTML += '- image :' + e.detail.image;
          };

          elemAvatar.addEventListener('selected', handleClicked);
          elemIcon.addEventListener('selected', handleClicked);
          elemLetter.addEventListener('selected', handleClicked);
          elemText.addEventListener('selected', handleClicked);
        })();
    </script>`;
  }