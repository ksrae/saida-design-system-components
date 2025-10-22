import { html } from "lit";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../global-header.element';
import "../../tabs/index";
import '../../input/index';
import '../../icon/index';
import '../../dropdown/index';
import '../../menu/index';
import '../../button/index';
import '../../divider/index';

export interface GlobalHeaderProps {
  title: string;
  sticky: boolean;
  search: boolean;
  information: boolean;
  notification: boolean;
  // slotLogo?: any;
  slotActions?:any;
  selected?: () => void;
  changed?: () => void;
}

export const Header = ({title, sticky, search, information, notification, slotActions} : GlobalHeaderProps) => {
  return html`
    <sy-global-header
      title="${title}" 
      ?sticky="${sticky}" 
      ?search="${search}" 
      ?information="${information}" 
      ?notification="${notification}" 
    >
      ${unsafeHTML(slotActions)}
    </sy-global-header>`;
}

export const HeaderTab = () => {
  return html`
    <sy-tab-group active="1" position="top" draggable>
      <sy-global-header title="Set title here">
        <div slot="tabs">
          <sy-tab tabkey="a1">Tab1</sy-tab>
          <sy-tab tabkey="a2" closable>Tab2</sy-tab>
          <sy-tab tabkey="a3">Tab3</sy-tab>
          <sy-tab tabkey="a4">Tab4</sy-tab>
          <sy-tab tabkey="a5">Tab5</sy-tab>
          <sy-tab tabkey="a6">Tab6</sy-tab>
          <sy-tab tabkey="a7" closable>Tab7</sy-tab>
          <sy-tab tabkey="a8">Tab8</sy-tab>
          <sy-tab tabkey="a9">Tab9</sy-tab>
          <sy-tab tabkey="a10">Tab0</sy-tab>
        </div>
      </sy-global-header>
      <div slot="contents">
        <sy-tab-content name="a1">Content for Tab 1</sy-tab-content>
        <sy-tab-content name="a2">Content for Tab 2</sy-tab-content>
        <sy-tab-content name="a3">Content for Tab 3</sy-tab-content>
        <sy-tab-content name="a4">Content for Tab 4</sy-tab-content>
        <sy-tab-content name="a5">Content for Tab 5</sy-tab-content>
        <sy-tab-content name="a6">Content for Tab 6</sy-tab-content>
        <sy-tab-content name="a7">Content for Tab 7</sy-tab-content>
        <sy-tab-content name="a8">Content for Tab 8</sy-tab-content>
        <sy-tab-content name="a9">Content for Tab 9</sy-tab-content>
        <sy-tab-content name="a10">Content for Tab 10</sy-tab-content>
      </div>
    </sy-tab-group>
  `;
};

export const HeaderSticky = (args: {sticky: boolean}) => {
  return html`
    <sy-global-header ?sticky=${args.sticky} title="Set title here">
    </sy-global-header>
  `;
};

export const HeaderSearch = (args: {search: boolean}) => {
  return html`
    <sy-global-header id="syGlobalHeaderSearch" ?search=${args.search} title="Set title here">
    </sy-global-header>
    <p id="syGlobalHeaderSearchResult"></p>

    <script>
      (() => {
        const globalHeader = document.querySelector('#syGlobalHeaderSearch');
        const result = document.querySelector('#syGlobalHeaderSearchResult');

        globalHeader.addEventListener('changed', (event) => {
          const searchText = event.detail.value;
          result.innerHTML = 'Search text: ' + searchText;
        });
      })();
    </script>
  `;
};

export const HeaderInformation = (args: {information: boolean}) => {
  return html`
    <sy-global-header id="syGlobalHeaderInformation" ?information=${args.information} title="Set title here">
    </sy-global-header>

    <p id="syGlobalHeaderInformationResult"></p>

    <script>
      (() => {
        const globalHeader = document.querySelector('#syGlobalHeaderInformation');
        const result = document.querySelector('#syGlobalHeaderInformationResult');

        globalHeader.addEventListener('click', (event) => {
          const searchText = event.detail.type;
          result.innerHTML = 'Search text: ' + searchText;
        });
      })();
    </script>
  `;
};

export const HeaderNotification = (args: {notification: boolean}) => {
  return html`
    <sy-global-header id="syGlobalHeaderNotification" ?notification=${args.notification} title="Set title here">
    </sy-global-header>

    <p id="syGlobalHeaderNotificationResult"></p>

    <script>
      (() => {
        const globalHeader = document.querySelector('#syGlobalHeaderNotification');
        const result = document.querySelector('#syGlobalHeaderNotificationResult');

        globalHeader.addEventListener('click', (event) => {
          const searchText = event.detail.type;
          result.innerHTML = 'Search text: ' + searchText;
        });
      })();
    </script>
  `;
};

export const HeaderSlotAction = (args: {slotActions: any}) => {
  return html`
    <sy-global-header title="Set title here">
      ${unsafeHTML(args.slotActions)}
    </sy-global-header>
  `;
};

export const HeaderTitle = (args: {title: string}) => {
  return html`
    <sy-global-header title="${args.title}">
    </sy-global-header>
  `;
}
