import { html } from 'lit';
import '../select.element';
import '../select-option.element';
import '../../dropdown/dropdown.element';
import '../../tag/tag.element';
import '../../menu/menu.element';
import '../../menu/menu-item.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../button/button.element';

export interface SelectProps {
  clearable: boolean;
  disabled: boolean;
  empty: boolean;
  error: boolean;
  hide: boolean;
  loading: boolean;
  maxTagCount: number;
  mode: 'default' | 'searchable' | 'multiple' | 'tag';
  defaultValue: string;
  placeholder: string;
  readonly: boolean;
  size: 'small' | 'medium' | 'large';
  slotContent: any;
  clearValue?: () => void;
  opened?: () => any;
  removed?: () => any;
  cleared?: () => any;
  selected?: () => any;
  inputChanged?: () => any;
}


/**
 * Primary UI component for user interaction
 */
export const Select = ({clearable, disabled, empty, error, hide, loading, maxTagCount, mode, defaultValue, placeholder, readonly, size, slotContent}: SelectProps) => {
  return html`
  <div>
    <sy-select 
      id="selectSample"
      ?clearable=${clearable}
      ?disabled=${disabled}
      ?empty=${empty}
      ?error=${error}
      ?loading=${loading}
      ?hide=${hide}
      maxTagCount=${maxTagCount}
      mode=${mode}
      defaultValue=${defaultValue}
      placeholder=${placeholder}
      ?readonly=${readonly}
      size=${size}>
      <sy-option value="value1" label="option1"></sy-option>
      <sy-option value="value2" label="option2"></sy-option>
      <sy-option value="value3" label="option3"></sy-option>
    </sy-select>
  </div>

  <script>
    (() => {
    // this codes for only overview on storybook.    
    document.querySelector('#selectSample').addEventListener('clicked', (e) => {
      const optionsContainer = document.querySelector('.options-container');
      if(optionsContainer) {
        optionsContainer.style.zIndex = 148;
      }
    });
    })
  </script>
  `;

};


export const SelectClearable = (args: {clearable: boolean, mode: 'default' | 'searchable' | 'multiple' | 'tag'}) => {
  return html`
  <sy-select ?clearable=${args.clearable} mode=${args.mode} placeholder="Open select">
    <sy-option value="value1" label="option1"></sy-option>
    <sy-option value="value2" label="option2"></sy-option>
    <sy-option value="value3" label="option3"></sy-option>
    <sy-option value="value4" label="option4"></sy-option>
    <sy-option value="value5" label="option5"></sy-option>
    <sy-option value="value6" label="option6"></sy-option>
    <sy-option value="value7" label="option7"></sy-option>
    <sy-option value="value8" label="option8"></sy-option>
    <sy-option value="value9" label="option9"></sy-option>
    <sy-option value="value11" label="option11"></sy-option>
    <sy-option value="value12" label="option12"></sy-option>
    <sy-option value="value13" label="option13"></sy-option>
    <sy-option value="value14" label="option14"></sy-option>
    <sy-option value="value15" label="option15"></sy-option>
    <sy-option value="value16" label="option16"></sy-option>
    <sy-option value="value17" label="option17"></sy-option>
    <sy-option value="value18" label="option18"></sy-option>
    <sy-option value="value19" label="option19"></sy-option>
  </sy-select>

  <sy-select ?clearable=${args.clearable} mode=${args.mode} placeholder="Open select">
    <sy-option value="value1" label="option1"></sy-option>
    <sy-option value="value2" label="option2"></sy-option>
    <sy-option value="value3" label="option3"></sy-option>
    <sy-option value="value4" label="option4"></sy-option>
    <sy-option value="value5" label="option5"></sy-option>
    <sy-option value="value6" label="option6"></sy-option>
    <sy-option value="value7" label="option7"></sy-option>
    <sy-option value="value8" label="option8"></sy-option>
    <sy-option value="value9" label="option9"></sy-option>
    <sy-option value="value11" label="option11"></sy-option>
    <sy-option value="value12" label="option12"></sy-option>
    <sy-option value="value13" label="option13"></sy-option>
    <sy-option value="value14" label="option14"></sy-option>
    <sy-option value="value15" label="option15"></sy-option>
    <sy-option value="value16" label="option16"></sy-option>
    <sy-option value="value17" label="option17"></sy-option>
    <sy-option value="value18" label="option18"></sy-option>
    <sy-option value="value19" label="option19"></sy-option>
  </sy-select>
  `;
};

export const SelectEmpty = (args: {empty: boolean}) => {
  return html`
<sy-select ?empty=${args.empty}>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
  `;
};

export const SelectError = (args: {error: boolean}) => {
  return html`
<sy-select ?error=${args.error}>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
  `;
};

export const SelectDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-select ?disabled=${args.disabled}>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
  `;
};

export const SelectReadonly = (args: {readonly: boolean}) => {
  return html`
<sy-select ?readonly=${args.readonly}>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
  `;
};

export const SelectHide = (args: {hide: boolean, mode: 'default' | 'searchable' | 'multiple' | 'tag'}) => {
  return html`
<sy-select ?hide=${args.hide} mode=${args.mode}>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
  `;
};

export const SelectLoading = (args: {loading: boolean}) => {
  return html`
<sy-select ?loading=${args.loading}></sy-select>
  `;
};

export const SelectMaxTagCount = (args: {maxTagCount: number}) => {
  return html`
<sy-select maxTagCount=${args.maxTagCount} mode="multiple">
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
  `;
};

export const SelectDefaultValue = (args: {defaultValue: string, mode: 'default' | 'searchable' | 'multiple' | 'tag'}) => {
  return html`
<sy-select defaultValue=${args.defaultValue} mode=${args.mode}>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
  `;
};

export const SelectPlaceholder = (args: {placeholder: string, mode: 'default' | 'searchable' | 'multiple' | 'tag'}) => {
  return html`
<sy-select placeholder=${args.placeholder} mode=${args.mode}>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
  `;
};


export const SelectSize = (args: {size: 'small' | 'medium' | 'large'}) => {
  return html`
<sy-select size=${args.size}>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
  `;
};

// export const SelectStatus = () => {
//   return html`
// <h3>Error Status</h3>
// <sy-select status="error">
//   <sy-option value="value1" label="option1"></sy-option>
//   <sy-option value="value2" label="option2"></sy-option>
//   <sy-option value="value3" label="option3"></sy-option>
// </sy-select>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <h3>Loading Status</h3>
// <sy-select status="loading">

// </sy-select>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <h3>Default Status</h3>
// <sy-select>
//   <sy-option value="value1" label="option1"></sy-option>
//   <sy-option value="value2" label="option2"></sy-option>
//   <sy-option value="value3" label="option3"></sy-option>
// </sy-select>
//   `;
// };


export const SelectMode = (args: {mode: 'default' | 'searchable' | 'multiple' | 'tag'}) => {
  return html`
<sy-select mode=${args.mode}>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
`
};

// export const SelectClicked = () => {
//   return html`
// <h3>Open / Close</h3>
// <sy-select id="selectClicked">
//   <sy-option value="value1" label="option1"></sy-option>
//   <sy-option value="value2" label="option2"></sy-option>
//   <sy-option value="value3" label="option3"></sy-option>
// </sy-select>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <p id="selectClickedResult"></p>
// <script>
//   (() => {
//     const elem = document.querySelector('#selectClicked');  
//     const result = document.querySelector('#selectClickedResult');
    
//     const handleSelectClicked = (e) => {
//       result.textContent = 'value is ' + e.detail + '.';
//     };

//     elem.addEventListener('clicked', handleSelectClicked);

//     // this is for release click event. It is recommanded for optimization.
//     window.addEventListener('beforeunload', () => {
//       elem.removeEventListener('clicked', handleSelectClicked);
//     });
//   })();

// </script>
// `;
// }


export const SelectSelected = () => {
  return html`
<sy-select id="selectSelected" mode="multiple">
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
  <sy-option value="value4" label="option4"></sy-option>
</sy-select>
<br/>
<br/>
<br/>
<br/>
<br/>
<p id="selectSelectedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#selectSelected');  
    const result = document.querySelector('#selectSelectedResult');
    
    const handleSelectSelected = (e) => {
      console.log('event detail', e.detail);
      const selectedItems = e.detail.selectedOptions;
      result.textContent = 'Selected items: ' +
      selectedItems.map(item => 'label ' + item.label + ' and value ' + item.value).join(', ');
    };

    elem.addEventListener('selected', handleSelectSelected);

    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleSelectSelected);
    });
  })();

</script>
`;
}

export const SelectInputChanged = () => {
  return html`
<sy-select id="selectInputChanged" mode="searchable">
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
<br/>
<br/>
<br/>
<br/>
<br/>
<p id="selectInputChangedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#selectInputChanged');  
    const result = document.querySelector('#selectInputChangedResult');
    
    const handleSelectInputChanged = (e) => {
      result.textContent = 'input value is ' + e.detail;
    };

    elem.addEventListener('inputChanged', handleSelectInputChanged);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('inputChanged', handleSelectInputChanged);
    });
  })();

</script>
`;
}

export const SelectOpened = () => {
  return html`
<sy-select id="selectOpened">
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
<br/>
<br/>
<br/>
<br/>
<br/>
<p id="selectOpenedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#selectOpened');  
    const result = document.querySelector('#selectOpenedResult');
    
    const handleSelectOpened = (e) => {
      result.textContent = 'select is opened';
    };

    elem.addEventListener('opened', handleSelectOpened);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('opened', handleSelectOpened);
    });
  })();

</script>
`;
}


export const SelectRemoved = () => {
  return html`
<sy-select id="selectRemoved" mode="multiple">
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
<br/>
<br/>
<br/>
<br/>
<br/>
<p id="selectRemovedResult"></p>
<p id="selectRemainResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#selectRemoved');  
    const result = document.querySelector('#selectRemovedResult');
    const remainResult = document.querySelector('#selectRemainResult');

    const handleSelectRemoved = (e) => {
      result.textContent = 'item removed: ' + e.detail.item.label;
      remainResult.textContent = 'Remaining items: ' +
        e.detail.selectedOptions.map(item => 'label ' + item.label + ' and value ' + item.value).join(', ');
    };

    elem.addEventListener('removed', handleSelectRemoved);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('removed', handleSelectRemoved);
    });
  })();

</script>
`;
}


export const SelectCleared = () => {
  return html`
<sy-select id="selectCleared" mode="multiple" clearable>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
<br/>
<br/>
<br/>
<br/>
<br/>
<p id="selectClearedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#selectCleared');  
    const result = document.querySelector('#selectClearedResult');

    const handleSelectCleared = (e) => {
      result.textContent = 'Select is cleared';
    };
    elem.addEventListener('cleared', handleSelectCleared);

  })();

</script>
`;
}


// // 셀렉트 폼 테스트 예제 추가
// export const SelectForm = () => {
//   return html`
// <div>
//   <h3>셀렉트 폼 테스트</h3>
//   <form id="selectForm">
//     <div>
//       <h4>기본 셀렉트 (단일 선택)</h4>
//       <sy-select id="defaultSelect" name="defaultSelect" placeholder="옵션을 선택하세요">
//         <sy-option value="option1" label="옵션 1"></sy-option>
//         <sy-option value="option2" label="옵션 2"></sy-option>
//         <sy-option value="option3" label="옵션 3"></sy-option>
//       </sy-select>
//     </div>
    
//     <div style="margin-top: 20px;">
//       <h4>기본값이 있는 셀렉트</h4>
//       <sy-select id="preselectedSelect" name="preselectedSelect" defaultValue="option2" placeholder="옵션을 선택하세요">
//         <sy-option value="option1" label="옵션 1"></sy-option>
//         <sy-option value="option2" label="옵션 2"></sy-option>
//         <sy-option value="option3" label="옵션 3"></sy-option>
//       </sy-select>
//     </div>
    
//     <div style="margin-top: 20px;">
//       <h4>다중 선택 셀렉트</h4>
//       <sy-select id="multipleSelect" mode="multiple" name="multipleSelect" placeholder="여러 옵션을 선택하세요">
//         <sy-option value="option1" label="옵션 1"></sy-option>
//         <sy-option value="option2" label="옵션 2"></sy-option>
//         <sy-option value="option3" label="옵션 3"></sy-option>
//         <sy-option value="option4" label="옵션 4"></sy-option>
//       </sy-select>
//     </div>
    
//     <div style="margin-top: 20px;">
//       <h4>태그 모드 셀렉트</h4>
//       <sy-select id="tagSelect" mode="tag" name="tagSelect" placeholder="태그를 입력하세요">
//         <sy-option value="tag1" label="태그 1"></sy-option>
//         <sy-option value="tag2" label="태그 2"></sy-option>
//         <sy-option value="tag3" label="태그 3"></sy-option>
//       </sy-select>
//     </div>
    
//     <div style="margin-top: 20px;">
//       <sy-button type="submit">폼 제출</sy-button>
//       <sy-button type="reset">폼 리셋</sy-button>
//     </div>
//   </form>
  
//   <div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px;">
//     <h4>폼 제출 결과:</h4>
//     <pre id="formResult">결과가 여기에 표시됩니다</pre>
//   </div>
  
//   <script>
//     (function() {
//       var form = document.querySelector('#selectForm');
//       var resultDisplay = document.querySelector('#formResult');
      
//       form.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         // FormData 사용하여 폼 데이터 수집
//         var formData = new FormData(form);
        
//         // 결과 표시
//         var result = '폼 데이터:';
//         result += '\\n';
        
//         // FormData 항목 표시
//         var entries = formData.entries();
//         var entry;
//         while(!(entry = entries.next()).done) {
//           result += entry.value[0] + ': ' + entry.value[1];
//           result += '\\n';
//         }
        
//         // 현재 선택된 값 표시
//         result += '\\n현재 선택된 값:';
//         result += '\\n';
//         var defaultSelect = document.querySelector('#defaultSelect');
//         var preselectedSelect = document.querySelector('#preselectedSelect');
//         var multipleSelect = document.querySelector('#multipleSelect');
//         var tagSelect = document.querySelector('#tagSelect');
        
//         // 선택된 값을 안전하게 가져오는 함수
//         function getSelectedValues(element) {
//           if (element && element.selectedOptions && element.selectedOptions.length) {
//             var values = [];
//             for (var i = 0; i < element.selectedOptions.length; i++) {
//               values.push(element.selectedOptions[i].value);
//             }
//             return values.join(', ');
//           }
//           return '(없음)';
//         }
        
//         result += 'defaultSelect: ' + getSelectedValues(defaultSelect) + '\\n';
//         result += 'preselectedSelect: ' + getSelectedValues(preselectedSelect) + '\\n';
//         result += 'multipleSelect: ' + getSelectedValues(multipleSelect) + '\\n';
//         result += 'tagSelect: ' + getSelectedValues(tagSelect) + '\\n';
        
//         resultDisplay.textContent = result;
//       });
      
//       form.addEventListener('reset', () => {
//         setTimeout(function() {
//           var resetResult = '폼이 리셋되었습니다. 각 셀렉트의 상태:\\n';
          
//           // 선택된 값을 안전하게 가져오는 함수 
//           function getSelectedValues(element) {
//             if (element && element.selectedOptions && element.selectedOptions.length) {
//               var values = [];
//               for (var i = 0; i < element.selectedOptions.length; i++) {
//                 values.push(element.selectedOptions[i].value);
//               }
//               return values.join(', ');
//             }
//             return '(없음)';
//           }
          
//           var defaultSelect = document.querySelector('#defaultSelect');
//           var preselectedSelect = document.querySelector('#preselectedSelect');
//           var multipleSelect = document.querySelector('#multipleSelect');
//           var tagSelect = document.querySelector('#tagSelect');
          
//           resetResult += 'defaultSelect: ' + getSelectedValues(defaultSelect) + '\\n';
//           resetResult += 'preselectedSelect: ' + getSelectedValues(preselectedSelect) + '\\n';
//           resetResult += 'multipleSelect: ' + getSelectedValues(multipleSelect) + '\\n';
//           resetResult += 'tagSelect: ' + getSelectedValues(tagSelect) + '\\n';
          
//           resultDisplay.textContent = resetResult;
//         }, 0);
//       });
//     })();
// 다중 선택의 결과 처리 방식
// FormData 객체 내부:

// 같은 이름("multipleSelect")으로 여러 값("option1", "option2")이 저장됨
// formData.getAll("multipleSelect")로 조회 시 → ["option1", "option2"] 배열 반환
// formData.get("multipleSelect")로 조회 시 → 첫 번째 값인 "option1"만 반환
// 폼 제출 시:

// HTTP 요청 파라미터: multipleSelect=option1&multipleSelect=option2
// 서버 측에서는 일반적으로 이를 배열로 해석 (프레임워크마다 다를 수 있음)
// HTML 표준과의 일치:

// 이 동작은 네이티브 HTML의 <select multiple> 요소나
// 같은 이름을 가진 여러 체크박스와 동일한 방식으로 작동합니다.
// 이렇게 구현함으로써 다중 선택 컴포넌트가 표준 HTML 폼 제출과 일관되게 동작하도록 하였습니다.
//   </script>
// </div>
//   `;
// };