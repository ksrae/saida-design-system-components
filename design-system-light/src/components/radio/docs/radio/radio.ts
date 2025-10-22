import { html } from 'lit';
import '../../radio.element';
import '../../radio-group.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface RadioGroupProps {
  // label: string;
  // required: boolean;
  disabled: boolean;
  defaultValue: string;
  position: 'horizontal' | 'vertical';
  readonly: boolean;
  required: boolean;
  size: 'small' | 'medium' | 'large';
  variant: 'outlined' | 'solid';
  slotContent: any;
  selected?: () => any;
  // validChanged?: () => any;
}
export interface RadioProps {
  checked: boolean;
  disabled: boolean;
  readonly: boolean;
  value: string;
  slotContent: any;
  selected?: () => any;
}

/**
 * Primary UI component for user interaction
 */
export const RadioGroup = ({disabled, defaultValue, position, readonly, slotContent}: RadioGroupProps) => {
  return html`
	<sy-radio-group
    ?disabled=${disabled}
    defaultValue=${defaultValue}
    position=${position}
    ?readonly=${readonly}>
    <sy-radio value="1">Radio 1</sy-radio>
    <sy-radio value="2">Radio 2</sy-radio>
    <sy-radio value="3">Radio 3</sy-radio>
</sy-radio-group>
  `;
};

export const Radio = ({checked, disabled, readonly, value, slotContent}: RadioProps) => {
  return html`
	<sy-radio-group position="horizontal">
    <sy-radio 
      ?checked=${checked}
      ?disabled=${disabled}
      ?readonly=${readonly}
      value=${value}>
      <span>Radio</span>
    </sy-radio>
</sy-radio-group>
  `;
};
export const RadioGroupDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-radio-group ?disabled=${args.disabled} position="horizontal">
  <sy-radio value="1">Radio 1</sy-radio>
  <sy-radio value="2">Radio 2</sy-radio>
  <sy-radio value="3">Radio 3</sy-radio>
</sy-radio-group>
`;
};

export const RadioGroupDefaultValue = (args: {defaultValue: string}) => {
  return html`
<sy-radio-group defaultValue=${args.defaultValue} position="horizontal">
  <sy-radio value="1">Radio 1</sy-radio>
  <sy-radio value="2">Radio 2</sy-radio>
  <sy-radio value="3">Radio 3</sy-radio>
</sy-radio-group>
`;
};

export const RadioGroupPosition = (args: {position: 'horizontal' | 'vertical'}) => {
  return html`
<sy-radio-group position=${args.position}>
  <sy-radio value="1">Radio 1</sy-radio>
  <sy-radio value="2">Radio 2</sy-radio>
  <sy-radio value="3">Radio 3</sy-radio>
</sy-radio-group>
`;
}
export const RadioGroupReadonly = (args: {readonly: boolean}) => {
  return html`
<sy-radio-group ?readonly=${args.readonly} position="horizontal">
  <sy-radio value="1">Radio 1</sy-radio>
  <sy-radio value="2">Radio 2</sy-radio>
  <sy-radio value="3">Radio 3</sy-radio>
</sy-radio-group>
`;
};

export const RadioChecked = (args: {checked: boolean}) => {
  return html`
<sy-radio-group>
  <sy-radio ?checked=${args.checked} value="1">Radio 1</sy-radio>
</sy-radio-group>
`;
}
export const RadioDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-radio-group>
  <sy-radio ?disabled=${args.disabled} value="1">Radio 1</sy-radio>
</sy-radio-group>
`;
}
export const RadioReadonly = (args: {readonly: boolean}) => {
  return html`
<sy-radio-group>
  <sy-radio ?readonly=${args.readonly} value="1">Radio 1</sy-radio>
</sy-radio-group>
`;
}
export const RadioSelected = () => {
  return html`
<h3>Selected</h3>
<sy-radio-group id="radioSelected" position="horizontal">
  <sy-radio value="1">Radio 1</sy-radio>
  <sy-radio value="2">Radio 2</sy-radio>
  <sy-radio value="3">Radio 3</sy-radio>
</sy-radio-group>

<p id="radioSelectedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#radioSelected');  
    const result = document.querySelector('#radioSelectedResult');
    
    const handleRadioSelected = (e) => {
      result.textContent = 'value ' + e.detail.value + ' is selected';
    };

    elem.addEventListener('selected', handleRadioSelected);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleRadioSelected);
    });
  })();

</script>
`;
};

// 라디오 폼 테스트 예제 추가
export const RadioForm = () => {
  return html`
<div>
  <h3>라디오 그룹 폼 테스트</h3>
  <form id="radioForm">
    <fieldset>
      <legend>기본 라디오 그룹</legend>
      <sy-radio-group id="basicRadioGroup" name="basicRadio" position="horizontal">
        <sy-radio value="option1">옵션 1</sy-radio>
        <sy-radio value="option2">옵션 2</sy-radio>
        <sy-radio value="option3">옵션 3</sy-radio>
      </sy-radio-group>
    </fieldset>
    
    <fieldset style="margin-top: 20px;">
      <legend>기본 값이 있는 라디오 그룹</legend>
      <sy-radio-group id="defaultRadioGroup" name="defaultRadio" defaultValue="option2">
        <sy-radio value="option1">옵션 1</sy-radio>
        <sy-radio value="option2">옵션 2</sy-radio>
        <sy-radio value="option3">옵션 3</sy-radio>
      </sy-radio-group>
    </fieldset>
    
    <fieldset style="margin-top: 20px;">
      <legend>필수 라디오 그룹</legend>
      <sy-radio-group id="requiredRadioGroup" name="requiredRadio" required position="horizontal">
        <sy-radio value="option1">옵션 1</sy-radio>
        <sy-radio value="option2">옵션 2</sy-radio>
        <sy-radio value="option3">옵션 3</sy-radio>
      </sy-radio-group>
    </fieldset>
    
    <fieldset style="margin-top: 20px;">
      <legend>라디오 버튼 그룹</legend>
      <sy-radio-group id="buttonRadioGroup" name="buttonRadio" size="medium" variant="outlined" position="horizontal">
        <sy-radio-button value="button1">버튼 1</sy-radio-button>
        <sy-radio-button value="button2">버튼 2</sy-radio-button>
        <sy-radio-button value="button3">버튼 3</sy-radio-button>
      </sy-radio-group>
    </fieldset>
    
    <div style="margin-top: 20px;">
      <button type="submit">폼 제출</button>
      <button type="reset">폼 리셋</button>
    </div>
  </form>
  
  <div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px;">
    <h4>폼 제출 결과:</h4>
    <pre id="formResult">결과가 여기에 표시됩니다</pre>
  </div>
  
  <script>
    (() => {
      const form = document.querySelector('#radioForm');
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
        
        result += '\n현재 선택된 값:\n';
        result += 'basicRadio: ' + document.querySelector('#basicRadioGroup').selectedValue + '\n';
        result += 'defaultRadio: ' + document.querySelector('#defaultRadioGroup').selectedValue + '\n';
        result += 'requiredRadio: ' + document.querySelector('#requiredRadioGroup').selectedValue + '\n';
        result += 'buttonRadio: ' + document.querySelector('#buttonRadioGroup').selectedValue + '\n';
        
        resultDisplay.textContent = result;
      });
      
      form.addEventListener('reset', () => {
        setTimeout(() => {
          let resetResult = '폼이 리셋되었습니다. 각 라디오 그룹의 상태:\n';
          resetResult += 'basicRadio: ' + document.querySelector('#basicRadioGroup').selectedValue + '\n';
          resetResult += 'defaultRadio: ' + document.querySelector('#defaultRadioGroup').selectedValue + '\n';
          resetResult += 'requiredRadio: ' + document.querySelector('#requiredRadioGroup').selectedValue + '\n';
          resetResult += 'buttonRadio: ' + document.querySelector('#buttonRadioGroup').selectedValue + '\n';
          
          resultDisplay.textContent = resetResult;
        }, 0);
      });
    })();
  </script>
</div>
  `;
};
