import { css } from 'lit';

export default css`
    :host {
      display: block;
      position: relative;
      border: 1px solid #ccc;
      overflow: hidden;
      cursor: pointer;
    }
    .disabled {
      pointer-events: none;
      opacity: 0.4;
    }
    .select-container {
      position: relative;
      padding-right: 20px;
    }
    .select-container::after {
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
    .select-container.open::after {
      transform: translateY(-50%) rotate(-135deg);
    }
    .dropdown-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
    }
    .show {
      visibility: visible;
      max-height: 200px;
    }
    .hidden {
      visibility: hidden;
    }
    slot {
      display: flex;
      flex-direction: column;
    }
    ::slotted(sy-option) {
      padding: 10px;
      cursor: pointer;
    }
    ::slotted(sy-option:hover) {
      background-color: #f0f0f0;
    }
  `;