import { html } from 'lit';
import '../../spinner/spinner.element';
import '../autocomplete-option.element';
import '../autocomplete.element';

  export interface AutoCompleteProps {
    caseSensitive: boolean;
    debounceTime: number;
    loading: boolean;
    min: number;
    placeholder: string;
    required: boolean;
    size: 'small' | 'medium' | 'large';
    source: string[];
    trigger: 'focus' | 'input'
    setFocus?: () => void;
    setBlur?: () => void;
    selected?: (event: CustomEvent<string>) => any;
    changed?: (event: CustomEvent<string>) => any;
  }

  export const AutoComplete = ({caseSensitive, debounceTime, loading, min, placeholder, required, size, source, trigger } : AutoCompleteProps) => {
    return html`
    <sy-autocomplete 
      ?caseSensitive=${caseSensitive}
      debounceTime=${debounceTime}
      ?loading=${loading}
      min=${min}
      placeholder=${placeholder}
      ?required=${required}
      size=${size} 
      .source=${source}
      trigger=${trigger}>
    </sy-autocomplete>
    `
  };
    
  export const AutoCompleteCaseSensitive = (args: {caseSensitive: boolean}) => {
    return html`
  <sy-autoComplete 
    ?caseSensitive="${args.caseSensitive}" 
    id="autocompleteCase">
  </sy-autoComplete>

<script>
    (() => {
      let source = ["ABC", "DEF", "GHI"];
      document.querySelector('#autocompleteCase').source = source;
    })();
  </script>
  `;
  };

  export const AutoCompleteDebounce = (args: {debounceTime: number}) => {
    return html`
    <sy-autocomplete 
      id="autocompleteDebounce" 
      debounceTime="${args.debounceTime}">
    </sy-autocomplete>
    
    <script>
      (() => {
        let source = ["synopsys", "Design", "System"];
        document.querySelector('#autocompleteDebounce').source = source;
      })();
    </script>
    `;
  }
  
  export const AutoCompleteLoading = (args: {loading: boolean}) => {
    return html`
  <sy-autoComplete 
    id="autocompleteLoading"
    ?loading=${args.loading}>
  </sy-autoComplete>

  <script>
    (() => {
      let source = ["abc", "def", "ghi"];
      document.querySelector('#autocompleteLoading').source = source;
    })();
  </script>
  `;
  };

  export const AutoCompleteMin = (args: {min: number}) => {
    return html`
  <sy-autoComplete 
    id="autocompleteMin"
    min="${args.min}">
  </sy-autoComplete>
  
  <script>
    (() => {
      let source = ["abc", "def", "ghi"];
      document.querySelector('#autocompleteMin').source = source;
    })();
  </script>
  `;
  };

  export const AutoCompletePlaceholder = (args: {placeholder: string}) => {
    return html`
  <sy-autoComplete 
    id="autoCompletePlaceholder" 
    placeholder="${args.placeholder}">
  </sy-autoComplete>

<script>
  (() => {
    let source = ["abc", "def", "ghi"];
    document.querySelector('#autoCompletePlaceholder').source = source;
  })();
</script>
`;
  };


  export const AutoCompleteSize = (args: {size: 'small' | 'medium' | 'large'}) => {
    return html`
  <sy-autoComplete 
    id="autoCompleteSize" 
    size="${args.size}">
  </sy-autoComplete>

<script>
  (() => {
    let source = ["abc", "def", "ghi"];
    document.querySelector('#autoCompleteSize').source = source;
  })();
</script>
`;
  };

  export const AutoCompleteSource = (args: {source: string[]}) => {
    return html`
    <sy-autocomplete 
      id="autocompleteSource">
    </sy-autocomplete>

    <script>
      (() => {
        document.querySelector('#autocompleteSource').source = ${JSON.stringify(args.source)};
      })();
    </script>
    `
  };

  export const AutoCompleteTrigger = (args: {trigger: 'focus' | 'input'}) => {
    return html`
  <sy-autoComplete 
    id="autocompleteVariant"
    trigger="${args.trigger}">  
  </sy-autoComplete>
  
  <script>
    (() => {
      let source = ["abc", "def", "ghi"];
      document.querySelector('#autocompleteVariant').source = source;
    })();
  </script>
  `;
  };

  export const AutoCompleteFocusBlur = () => {
    return html`
    <sy-autoComplete id="autoFocusElem"></sy-autoComplete>
  <br/>
  <br/>
  <p id="autoFocusResult"></p>
  <script>
    (() => {
      let elem = document.querySelector('#autoFocusElem');  
      let result = document.querySelector('#autoFocusResult');
      
      let source = ["abc", "def", "ghi"];
      elem.source = source;
      // focus button by force with function in 1 sec.
      setTimeout(() => {
        elem.setFocus();  
      }, 1000);
      
      // blur button by force with function in 4 sec.
      setTimeout(() => {
        elem.setBlur();  
      }, 4000);
  
  
      let handleFocus = (e) => {
        result.textContent = 'focus';
      };
  
      let handleBlur = (e) => {
        result.textContent = 'blur';
      };
  
      elem.addEventListener('focus', handleFocus);
      elem.addEventListener('blur', handleBlur);
  
      // this is for release click event. It is recommanded for optimization.
      window.addEventListener('beforeunload', () => {
        elem.removeEventListener('focus', handleFocus);
        elem.removeEventListener('blur', handleBlur);
      });
    })();
  
  </script>`;
  } 

  export const AutoCompleteSelected = () => {
    return html`
    <sy-autocomplete id="autocompleteSelected"></sy-autocomplete>
    <p id="autocompleteSelectedResult"></p>

  <script>
    (() => {
      let source = ["abc", "def", "ghi"];
      let elem = document.querySelector('#autocompleteSelected');  
      elem.source = source;

      let result = document.querySelector('#autocompleteSelectedResult');    

      let handleAutoCompleteSelected = (e) => {
        result.textContent = 'value ' + e.detail.value + ' is selected';
      };

      elem.addEventListener('selected', handleAutoCompleteSelected);
    })();

  </script>` 
};


  export const AutoCompleteChanged = () => {
    return html`
    <sy-autocomplete id="autocompleteChanged"></sy-autocomplete>
    <p id="autocompleteChangedResult"></p>

  <script>
    (() => {
      let source = ["abc", "def", "ghi"];
      let elem = document.querySelector('#autocompleteChanged');  
      elem.source = source;

      let result = document.querySelector('#autocompleteChangedResult');    

      let handleAutoCompleteChanged = (e) => {
        result.textContent = 'value ' + e.detail.value + ' is changed';
      };

      elem.addEventListener('changed', handleAutoCompleteChanged);
    })();

  </script>` 
};






