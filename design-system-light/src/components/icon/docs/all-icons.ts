import { html } from "lit";
import "../icon.element";
import "../../toast/toast.element";
import "../../toast/toast-item.element";
import iconData from "./icon-data.json";

export interface IconListProps {}

const ICON_DATA = iconData;
  

export const AllIcons = () => {
  return html`
    <style>
      .icons-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        gap: 12px;
      }
      .icon-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 10px;
        gap: 8px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
      }
      .icon-container:hover {
        background-color: #f0f0f0;
      }
      .icon-container p {
        margin: 0;
        padding-top: 8px;
        line-height: 1.2;
        font-size: 14px;
        color: #707070;
        word-break: break-all;
      }
      sy-icon {
        font-size: 25px !important;
      }
      .icon-option {
        margin-bottom: 20px;
        display: flex;
        gap: 16px;
        align-items: center;
      }
    </style>
    
    <div class="icon-option">
      <label for="sizeSelector">Size</label>
      <select id="sizeSelector">
        <option value="xxsmall">xxsmall</option>      
        <option value="xsmall">xsmall</option>
        <option value="small">small</option>
        <option value="medium" selected>medium</option>
        <option value="large">large</option>
        <option value="xlarge">xlarge</option>
        <option value="xxlarge">xxlarge</option>
        <option value="xxxlarge">xxxlarge</option>
      </select>
      <label for="variantSelector">Variant</label>
      <select id="variantSelector">
        ${Object.keys(ICON_DATA).map(variant => html`<option value="${variant}">${variant.charAt(0).toUpperCase() + variant.slice(1)}</option>`)}
      </select>
    </div>

    <div class="icons-wrapper"></div>
    <sy-toast-message id="iconToast"></sy-toast-message>

    <script>
      (() => {
        const data = ${JSON.stringify(ICON_DATA)};
        const sizeSelect = document.querySelector("#sizeSelector");
        const variantSelect = document.querySelector("#variantSelector");
        const iconsWrapper = document.querySelector(".icons-wrapper");
        const toast = document.querySelector('#iconToast');
        let currentSize = sizeSelect.value;
        let currentVariant = variantSelect.value;
        const createSvgString = (dValue) => {
          return \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="\${dValue}"></path></svg>\`;
        };
        const renderIcons = (size, variant) => {
          iconsWrapper.innerHTML = '';
          const iconsToRender = data[variant] || [];
          const validIcons = iconsToRender
            .filter(icon => icon.name && icon.name.trim() !== '')
            // ✅ 이 부분이 이름순으로 항상 정렬해주는 코드입니다.
            .sort((a, b) => a.name.localeCompare(b.name));
          validIcons.forEach((iconData) => {
            const iconElement = document.createElement("sy-icon");
            iconElement.setAttribute("size", size);
            iconElement.innerHTML = createSvgString(iconData.value);
            const name = document.createElement("p");
            name.innerText = iconData.name;
            const iconContainer = document.createElement("div");
            iconContainer.classList.add("icon-container");
            iconContainer.appendChild(iconElement);
            iconContainer.appendChild(name);
            iconContainer.addEventListener("click", () => {
              copyToClipboard(iconElement);
            });
            iconsWrapper.appendChild(iconContainer);
          });
        };
        const copyToClipboard = (iconElement) => {
          const svgStringToCopy = iconElement.innerHTML.trim();
          if (navigator.clipboard) {
            navigator.clipboard.writeText(svgStringToCopy).then(() => {
              showToast('SVG Copied!', 'The SVG code has been copied to your clipboard.');
            });
          } else {
            const tempElem = document.createElement("textarea");
            tempElem.value = svgStringToCopy;
            document.body.appendChild(tempElem);
            tempElem.select();
            document.execCommand("copy");
            document.body.removeChild(tempElem);
            showToast('SVG Copied!', 'The SVG code has been copied to your clipboard.');
          }
          console.log("Copied:", svgStringToCopy);
        };
        const showToast = (header, body) => {
          if (toast && typeof toast.createInfoToast === 'function') {
            setTimeout(() => {
              toast.createInfoToast({ headerSlot: header, bodySlot: body });
            }, 0);
          }
        };
        sizeSelect.addEventListener("change", (e) => {
          currentSize = e.target.value;
          iconsWrapper.querySelectorAll("sy-icon").forEach(icon => icon.setAttribute("size", currentSize));
        });
        variantSelect.addEventListener("change", (e) => {
          currentVariant = e.target.value;
          renderIcons(currentSize, currentVariant);
        });
        renderIcons(currentSize, currentVariant);
      })();
    </script>
  `;
};
