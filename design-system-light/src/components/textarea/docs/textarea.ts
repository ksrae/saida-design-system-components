import { html } from "lit";
import "../textarea.element";
import '../../button/button.element';
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface TextareaProps {
  autofocus: boolean;
  borderless: boolean;
  clearable: boolean;
  counter: boolean;
  disabled: boolean;
  label: string;
  max: number;
  min: number;
  placeholder: string;
  readonly: boolean;
  required: boolean;
  resize: "none" | "horizontal" | "vertical" | "both";
  rows: number;
  size: "small" | "medium" | "large";
  // validation: boolean;
  value: string;
  // message: string;
  slotContent: any;
  changed?: () => any;
  blured?: () => void;
  focused?: () => void;
  setFocus?: () => any;
  setBlur?: () => any;
}

export const Textarea = ({ autofocus, borderless, clearable, counter, disabled, label, max, min, placeholder, readonly, required, resize, rows, size, value, slotContent}: TextareaProps) => {
  return html`
    <sy-textarea
      ?autofocus=${autofocus}
      ?borderless=${borderless}
      ?clearable=${clearable}
      ?counter=${counter}
      ?disabled=${disabled}
      label=${label}
      max=${max}
      min=${min}
      placeholder=${placeholder}
      ?readonly=${readonly}
      ?required=${required}
      resize=${resize}
      rows=${rows}
      size=${size}
      value=${value}>
    </sy-textarea>
  `;
};

export const TextareaSlot = ({ slotContent }: TextareaProps) => {
  return html` <sy-textarea> ${unsafeHTML(slotContent)} </sy-textarea> `;
};

export const TextareaAutofocus = (args: {autofocus: boolean}) => {
  return html`
    <sy-textarea ?autofocus=${args.autofocus}></sy-textarea>
  `;
};

export const TextareaBorderless = (args: {borderless: boolean}) => {
  return html`
<sy-textarea ?borderless=${args.borderless} placeholder="please input value here"></sy-textarea>
`;
};

export const TextareaClearable = (args: {clearable: boolean}) => {
  return html`
<sy-textarea ?clearable=${args.clearable} placeholder="please input value here">
  
</sy-textarea>
`;
};
 
export const TextareaCounter = (args: {counter: boolean, max: number}) => {
  return html`
    <sy-textarea ?counter=${args.counter} max=${args.max}></sy-textarea>
  `;
};

export const TextareaDisabled = (args: {disabled: boolean}) => {
  return html`
    <sy-textarea ?disabled=${args.disabled}></sy-textarea>
  `;
};

export const TextareaLabel = (args: {label: string}) => {
  return html`
    <sy-textarea label=${args.label}></sy-textarea>
  `;
};

export const TextareaMax = (args: {max: number, value: string}) => {
  return html`
    <sy-textarea max=${args.max} value=${args.value}></sy-textarea>
  `;
};

export const TextareaMin = (args: {min: number, value: string}) => {
  return html`
    <sy-textarea min=${args.min} value=${args.value}></sy-textarea>
  `;
};

export const TextareaPlaceholder = (args: {placeholder: string}) => {
  return html`
    <sy-textarea placeholder=${args.placeholder}></sy-textarea>
  `;
};

export const TextareaReadonly = (args: {readonly: boolean}) => {
  return html`
    <sy-textarea ?readonly=${args.readonly}></sy-textarea>
  `;
};

export const TextareaRequired = (args: {required: boolean}) => {
  return html`
    <sy-textarea ?required=${args.required}></sy-textarea>
  `;
};

export const TextareaResize = (args: {resize: "none" | "horizontal" | "vertical" | "both"}) => {
  return html`
    <sy-textarea resize=${args.resize}></sy-textarea>
  `;
};

export const TextareaRows = (args: {rows: number}) => {
  return html`
    <sy-textarea rows=${args.rows}></sy-textarea>
  `;
};

export const TextareaSize = (args: {size: "small" | "medium" | "large"}) => {
  return html`
    <sy-textarea size=${args.size}></sy-textarea>
  `;
};

export const TextareaValue = (args: {value: string}) => {
  return html`
    <sy-textarea value=${args.value}></sy-textarea>
  `;
};

// export const TextareaValid = () => {
//   return html`
//   <h3>Default</h3>
//     <h4>Invalid</h4>
//     <p>Value length=5, min=10</p>
//     <sy-textarea validation value="value" min="10"></sy-textarea>
//     <br />
//     <br />
//     <h3>valid</h3>
//     <h4>Invalid</h4>
//     <p>Value length=5, min=10</p>
//     <sy-textarea validation value="value" min="10"></sy-textarea>
//   `;
// };


// export const TextareaMessage = () => {
//   return html`
// <h3>Message</h3>
// <sy-textarea>
//   <p slot="message">Text area Message</p>
// </sy-textarea>
// <br/>
// <br/>
// <h3>Default</h3>
// <sy-textarea></sy-textarea>
// `;
// }

export const TextareaChanged = () => {
  return html`
    <h3>Changed</h3>
    <sy-textarea id="txtareaChanged" clearable validation></sy-textarea>
    <p id="txtareaChangedResult"></p>
    <script>
      (() => {
        const elem = document.querySelector("#txtareaChanged");
        const result = document.querySelector("#txtareaChangedResult");

        const handleChanged = (e) => {
          result.textContent =
            Number(e.detail.length) > 0
              ? e.detail.value + " " + e.detail.length + " " + e.detail.status
              : "";
        };

        elem.addEventListener("changed", handleChanged);

        // this is for release click event. It is recommanded for optimization.
        window.addEventListener("beforeunload", () => {
          elem.removeEventListener("changed", handleChanged);
        });
      })();
    </script>
  `;
};

export const TextareaFocusBlur = () => {
  return html` <!-- focus -->
    <h3>Focus, Blur Function</h3>
    <sy-textarea id="txtareaFocusElem"></sy-textarea>
    <p id="txtareaFocusResult"></p>
    <script>
      (() => {
        const elem = document.querySelector("#txtareaFocusElem");
        const result = document.querySelector("#txtareaFocusResult");

        // focus button by force with function in 1 sec.
        setTimeout(() => {
          elem.setFocus();
        }, 1000);

        // blur button by force with function in 4 sec.
        setTimeout(() => {
          elem.setBlur();
        }, 4000);

        const handleFocus = (e) => {
          result.textContent = "focus";
        };

        const handleBlur = (e) => {
          result.textContent = "blur";
        };

        elem.addEventListener("focused", handleFocus);
        elem.addEventListener("blured", handleBlur);

        // this is for release click event. It is recommanded for optimization.
        window.addEventListener("beforeunload", () => {
          elem.removeEventListener("focused", handleFocus);
          elem.removeEventListener("blured", handleBlur);
        });
      })();
    </script>`;
};

// 텍스트에어리어 폼 테스트 예제 추가
export const TextareaForm = () => {
  return html`
<div>
  <h3>텍스트에어리어 폼 테스트</h3>
  <form id="textareaForm">
    <div>
      <sy-textarea id="normalTextarea" name="normalTextarea" placeholder="기본 텍스트에어리어"></sy-textarea>
    </div>
    <div style="margin-top: 15px;">
      <sy-textarea id="prefilledTextarea" name="prefilledTextarea" value="미리 내용이 있는 텍스트에어리어"></sy-textarea>
    </div>
    <div style="margin-top: 15px;">
      <sy-textarea id="requiredTextarea" name="requiredTextarea" required placeholder="필수 입력 텍스트에어리어"></sy-textarea>
    </div>
    <div style="margin-top: 15px;">
      <sy-textarea id="constrainedTextarea" name="constrainedTextarea" min="10" max="100" counter placeholder="10-100자 제한 텍스트에어리어"></sy-textarea>
    </div>
    <div style="margin-top: 20px;">
      <sy-button type="submit">폼 제출</sy-button>
      <sy-button type="reset">폼 리셋</sy-button>
    </div>
  </form>
  
  <div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px;">
    <h4>폼 제출 결과:</h4>
    <pre id="formResult">결과가 여기에 표시됩니다</pre>
  </div>
  
  <script>
    (() => {
      const form = document.querySelector('#textareaForm');
      const resultDisplay = document.querySelector('#formResult');
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // FormData를 사용하여 폼 데이터 수집
        const formData = new FormData(form);
        
        // 결과 표시
        let result = '폼 데이터:\n';
        for (const [name, value] of formData.entries()) {
          result += name + ': ' + value + '\n';
        }
        
        result += '\n현재 텍스트에어리어 값:\n';
        result += 'normalTextarea: ' + document.querySelector('#normalTextarea').value + '\n';
        result += 'prefilledTextarea: ' + document.querySelector('#prefilledTextarea').value + '\n';
        result += 'requiredTextarea: ' + document.querySelector('#requiredTextarea').value + '\n';
        result += 'constrainedTextarea: ' + document.querySelector('#constrainedTextarea').value + '\n';
        
        resultDisplay.textContent = result;
      });
      
      form.addEventListener('reset', () => {
        setTimeout(() => {
          let resetResult = '폼이 리셋되었습니다. 각 텍스트에어리어의 상태:\n';
          resetResult += 'normalTextarea: ' + document.querySelector('#normalTextarea').value + '\n';
          resetResult += 'prefilledTextarea: ' + document.querySelector('#prefilledTextarea').value + '\n';
          resetResult += 'requiredTextarea: ' + document.querySelector('#requiredTextarea').value + '\n';
          resetResult += 'constrainedTextarea: ' + document.querySelector('#constrainedTextarea').value + '\n';
          
          resultDisplay.textContent = resetResult;
        }, 0);
      });
    })();
  </script>
</div>
  `;
};
