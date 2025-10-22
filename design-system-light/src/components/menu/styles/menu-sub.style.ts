import { css } from 'lit';


export default css`
    .hidden {
      display: none;
    }
    .visible {
      display: block;
    }
    /* .sub-menu-label {
      padding: 8px 16px;
      cursor: pointer;
      background-color: #eee;
    }
    .sub-menu-label::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%) rotate(45deg);
      border: solid black;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      transition: transform 0.3s ease;
    }
    .sub-menu-label[open]::after {
      transform: translateY(-50%) rotate(-135deg);
    }
    .sub-menu-content {
      padding-left: 16px;
    } */


    .sub-menu-label {
      padding: 8px 16px;
      cursor: pointer;
      background-color: #eee;
      position: relative; /* 화살표 위치 조정을 위해 필요 */
    }
    .sub-menu-label::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%) rotate(45deg);
      border: solid black;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      transition: transform 0.3s ease;
    }
    .sub-menu-label[open]::after {
      transform: translateY(-50%) rotate(-135deg);
    }
    .sub-menu-content {
      display: none;
    }
    .sub-menu-content.visible {
      display: block;
      padding-left: 16px;
    }
`;
