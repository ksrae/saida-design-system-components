import { html } from 'lit';
import '../switch.element';
import '../../button/button.element';

export interface SwitchProps {
  checked: boolean;
  disabled: boolean;
  label : string;
  loading: boolean;
  readonly: boolean;
  size: 'small' | 'medium';
  changed?: () => any;
}

export const Switch = ({ checked, disabled, label, loading, readonly, size }: SwitchProps) => {
  return html`
	<sy-switch
    ?checked=${checked}
    ?disabled=${disabled}
    label=${label}
    ?loading=${loading}
    ?readonly=${readonly}
    size=${size}></sy-switch>
  `;
};
export const SwitchChecked = (args: {checked: boolean}) => {
  return html`
<sy-switch ?checked=${args.checked}></sy-switch>
`;
};

export const SwitchDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-switch ?disabled=${args.disabled}></sy-switch>
`;
};

export const SwitchLabel = (args: {label: string}) => {
  return html`
<sy-switch label=${args.label}></sy-switch>
`;
};

export const SwitchLoading = (args: {loading: boolean}) => {
  return html`
<sy-switch ?loading=${args.loading}></sy-switch>
`;
};

export const SwitchReadonly = (args: {readonly: boolean}) => {
  return html`
<sy-switch ?readonly=${args.readonly}></sy-switch>
`;
};

export const SwitchSize = (args: {size: 'small' | 'medium'}) => {
  return html`
<sy-switch size=${args.size}></sy-switch>
`;
};

export const SwitchChanged = () => {
  return html`
<h3>Changed</h3>
<sy-switch id="switchChanged" size='medium'></sy-switch>
<br/>
<p id="switchChangedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#switchChanged');  
    const result = document.querySelector('#switchChangedResult');
    
    const handleSwitchChanged = (e) => {
      result.textContent = 'switch :' + e.detail;
    };

    elem.addEventListener('changed', handleSwitchChanged);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleSwitchChanged);
    });
  })();

</script>
`;
};

// 스위치 폼 테스트 예제 추가
export const SwitchForm = () => {
  return html`
<div>
  <h3>스위치 폼 테스트</h3>
  <form id="switchForm">
    <div>
      <sy-switch id="normalSwitch" name="normalSwitch" label="기본 스위치"></sy-switch>
    </div>
    <div style="margin-top: 15px;">
      <sy-switch id="checkedSwitch" name="checkedSwitch" checked label="미리 켜진 스위치"></sy-switch>
    </div>
    <div style="margin-top: 15px;">
      <sy-switch id="disabledSwitch" name="disabledSwitch" disabled label="비활성화된 스위치"></sy-switch>
    </div>
    <div style="margin-top: 15px;">
      <sy-switch id="smallSwitch" name="smallSwitch" size="small" label="작은 크기 스위치"></sy-switch>
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
      const form = document.querySelector('#switchForm');
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
        
        result += '\n현재 스위치 상태:\n';
        result += 'normalSwitch: ' + document.querySelector('#normalSwitch').checked + '\n';
        result += 'checkedSwitch: ' + document.querySelector('#checkedSwitch').checked + '\n';
        result += 'disabledSwitch: ' + document.querySelector('#disabledSwitch').checked + '\n';
        result += 'smallSwitch: ' + document.querySelector('#smallSwitch').checked + '\n';
        
        resultDisplay.textContent = result;
      });
      
      form.addEventListener('reset', () => {
        setTimeout(() => {
          let resetResult = '폼이 리셋되었습니다. 각 스위치 상태:\n';
          resetResult += 'normalSwitch: ' + document.querySelector('#normalSwitch').checked + '\n';
          resetResult += 'checkedSwitch: ' + document.querySelector('#checkedSwitch').checked + '\n';
          resetResult += 'disabledSwitch: ' + document.querySelector('#disabledSwitch').checked + '\n';
          resetResult += 'smallSwitch: ' + document.querySelector('#smallSwitch').checked + '\n';
          
          resultDisplay.textContent = resetResult;
        }, 0);
      });
    })();
  </script>
</div>
  `;
};
