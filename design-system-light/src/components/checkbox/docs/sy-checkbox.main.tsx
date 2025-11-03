import { html } from "lit";
import { Components } from '../../../components';
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface SyCheckboxProps extends Components.SyCheckbox {
  slot?: string;
  changed?: (event: CustomEvent<any>) => void;
  focused?: (event: CustomEvent<any>) => void;
  blured?: (event: CustomEvent<any>) => void;
}

// Main render function
export const Checkbox = ({checked, disabled, indeterminate, readonly, slot}: SyCheckboxProps) => {
  return html`
	<sy-checkbox
    ?checked=${checked}
    ?indeterminate=${indeterminate}
    ?disabled=${disabled}
    ?readonly=${readonly}
  >
    ${unsafeHTML(slot)}
</sy-checkbox>
  `;
};
export const CheckboxChecked = (args: {checked: boolean}) => {
  return html`
<sy-checkbox ?checked=${args.checked}>Checkbox</sy-checkbox>
`;
};

export const CheckboxIndeterminate = (args: {indeterminate: boolean}) => {
  return html`
<sy-checkbox ?indeterminate=${args.indeterminate}>Checkbox</sy-checkbox>
`;
};

export const CheckboxDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-checkbox ?disabled=${args.disabled}>Checkbox</sy-checkbox>
`;
};

export const CheckboxReadonly = (args: {readonly: boolean}) => {
  return html`
<sy-checkbox ?readonly=${args.readonly}>Checkbox</sy-checkbox>
`;
}

export const CheckboxSlot = (args: {slotContent: any}) => {
  return html`
	<sy-checkbox>
    ${unsafeHTML(args.slotContent)}
  </sy-checkbox>
  `;
};

/* export const CheckboxRequired = () => {
  return html`
<!-- if required, checkbox is valid only on checked or indeterminate -->
<h3>Required</h3>
<sy-checkbox required>Checkbox</sy-checkbox>
<!--
  or following are also allowed.
  <sy-checkbox required></sy-checkbox>
  <sy-checkbox required="true"></sy-checkbox>
-->
<br/>
<!-- default -->
<h3>Default</h3>
<sy-checkbox>Checkbox</sy-checkbox>

`;
} */
export const CheckboxChanged = () => {
  return html`
<sy-checkbox id="chkChanged">Checkbox</sy-checkbox>
<p id="chkChangedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#chkChanged');
    const result = document.querySelector('#chkChangedResult');

    const handleChanged = (e) => {
      result.textContent = e.detail.checked ? 'checked' : 'unchecked';
    };

    elem.addEventListener('changed', handleChanged);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('changed', handleChanged);
    });
  })();
</script>
`;
};

export const CheckboxFocusBlur = () => {
  return html`
<sy-checkbox id="chkFocusElem">checkbox</sy-checkbox>
<p id="chkFocusResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#chkFocusElem');
    const result = document.querySelector('#chkFocusResult');

    // focus button by force with function in 1 sec.
    setTimeout(() => {
      elem.setFocus();
    }, 1000);

    // blur button by force with function in 4 sec.
    setTimeout(() => {
      elem.setBlur();
    }, 4000);


    const handleFocus = (e) => {
      result.textContent = 'focus';
    };

    const handleBlur = (e) => {
      result.textContent = 'blur';
    };

    elem.addEventListener('focused', handleFocus);
    elem.addEventListener('blured', handleBlur);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('focus', handleFocus);
      elem.removeEventListener('blur', handleBlur);
    });
  })();

</script>`;
}

// 폼 테스트를 위한 예제 추가
export const CheckboxForm = () => {
  return html`
<div>
  <h3>체크박스 폼 테스트</h3>
  <form id="checkboxForm">
    <div>
      <sy-checkbox id="normalCheckbox" name="normalCheck">기본 체크박스</sy-checkbox>
    </div>
    <div style="margin-top: 10px;">
      <sy-checkbox id="checkedCheckbox" name="checkedCheck" checked>미리 체크된 체크박스</sy-checkbox>
    </div>
    <div style="margin-top: 10px;">
      <sy-checkbox id="indeterminateCheckbox" name="indeterminateCheck">불확정 체크박스</sy-checkbox>
    </div>
    <div style="margin-top: 10px;">
      <sy-checkbox id="requiredCheckbox" name="requiredCheck" required>필수 체크박스</sy-checkbox>
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
</div>
  <script>
    (() => {
      // 불확정 상태 설정
      const indeterminateCheckbox = document.querySelector('#indeterminateCheckbox');
      if (indeterminateCheckbox) {
        indeterminateCheckbox.indeterminate = true;
      }

      const form = document.querySelector('#checkboxForm');
      const resultDisplay = document.querySelector('#formResult');

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // FormData를 사용하여 폼 데이터 수집
        const formData = new FormData(form);

        // 결과 표시
        let result = '폼 데이터:\n';

        // 문자열 연결 방식으로 변경
        result += '\n체크 상태:\n';
        result += 'normalCheck: ' + document.querySelector('#normalCheckbox').checked + '\n';
        result += 'checkedCheck: ' + document.querySelector('#checkedCheckbox').checked + '\n';
        result += 'indeterminateCheck: ' + document.querySelector('#indeterminateCheckbox').checked + '\n';
        result += 'requiredCheck: ' + document.querySelector('#requiredCheckbox').checked + '\n';

        result += '\n불확정 상태:\n';
        result += 'indeterminateCheck: ' + document.querySelector('#indeterminateCheckbox').indeterminate + '\n';

        resultDisplay.textContent = result;
      });

      form.addEventListener('reset', () => {
        setTimeout(() => {
          // 문자열 연결 방식으로 변경
          let resetResult = '폼이 리셋되었습니다. 각 체크박스 상태:\n';
          resetResult += 'normalCheck: ' + document.querySelector('#normalCheckbox').checked + '\n';
          resetResult += 'checkedCheck: ' + document.querySelector('#checkedCheckbox').checked + '\n';
          resetResult += 'indeterminateCheck: ' + document.querySelector('#indeterminateCheckbox').checked + '\n';
          resetResult += 'requiredCheck: ' + document.querySelector('#requiredCheckbox').checked + '\n';
          resetResult += '\n불확정 상태:\n';
          resetResult += 'indeterminateCheck: ' + document.querySelector('#indeterminateCheckbox').indeterminate;

          resultDisplay.textContent = resetResult;
        }, 0);
      });
    })();
  </script>
  `;
};
