import { css } from 'lit';

export default css`
  .popover {
    display: block;
    position: absolute;
    background-color: black;
    color: white;
    padding: 8px;
    border-radius: 4px;
    white-space: nowrap;
    box-sizing: border-box;
  }
  .popover[arrow][position="top"]::after,
  .popover[arrow][position="bottom"]::after,
  .popover[arrow][position="left"]::after,
  .popover[arrow][position="right"]::after {
    content: '';
    position: absolute;
    border-style: solid;
  }
  .popover[arrow][position="top"]::after {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-color: black transparent transparent transparent;
  }
  .popover[arrow][position="bottom"]::after {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    border-width: 5px;
    border-color: black transparent transparent transparent;
  }
  .popover[arrow][position="left"]::after {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-width: 5px;
    border-color: transparent transparent transparent black;
  }
  .popover[arrow][position="right"]::after {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-width: 5px;
    border-color: transparent black transparent transparent;
  }
  .popover[arrow][position="top"] {
    bottom: calc(100% + var(--custom-tooltip-distance, 5px));
    left: 50%;
    transform: translateX(-50%);
  }
  .popover[arrow][position="bottom"] {
    top: calc(100% + var(--custom-tooltip-distance, 5px));
    left: 50%;
    transform: translateX(-50%);
  }
  .popover[arrow][position="left"] {
    right: calc(100% + var(--custom-tooltip-distance, 5px));
    top: 50%;
    transform: translateY(-50%);
  }
  .popover[arrow][position="right"] {
    left: calc(100% + var(--custom-tooltip-distance, 5px));
    top: 50%;
    transform: translateY(-50%);
  }
  .popover[position="top"] {
    bottom: calc(100% + var(--custom-tooltip-distance, 0px));
    left: 50%;
    transform: translateX(-50%);
  }
  .popover[position="bottom"] {
    top: calc(100% + var(--custom-tooltip-distance, 0px));
    left: 50%;
    transform: translateX(-50%);
  }
  .popover[position="left"] {
    right: calc(100% + var(--custom-tooltip-distance, 0px));
    top: 50%;
    transform: translateY(-50%);
  }
  .popover[position="right"] {
    left: calc(100% + var(--custom-tooltip-distance, 0px));
    top: 50%;
    transform: translateY(-50%);
  }
`;
