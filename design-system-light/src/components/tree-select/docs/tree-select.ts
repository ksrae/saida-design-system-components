import { html } from "lit";
import '../tree-select.element';

export interface TreeNode {
  appendable?: boolean; // Add appendable button, editable property of sy-tree must be true
  appendPlaceholder?: string; // placeholder text for appendable button
  checked?: boolean;      // checked as default
  children?: TreeNode[];  // add child nodes
  clickable?: boolean;    // allow clickable event,
  disabled?: boolean;   // disabled all features: checkable, clickable, editable
  editable?: boolean;   // Add editable button, editable property of sy-tree must be true
  expanded?: boolean;     // expanded as default  
  fixed?: boolean;      // fix check status, user cannot check manually.
  icon?: string;          // icon type
  iconVariant?: string;   // 'regular' | 'solid'
  indeterminate?: boolean;  // it is for check status, do not set this value manually.
  label: string;
  removable?: boolean;  // Add removable button, editable property of sy-tree must be true
  tagMessage?: string;           // text on the tag
  tagVariant?: "gray"| "purple" | "blue" | "green" | "cyan" | "yellow" | "orange" | "red";  // tag background color
  value: string;
}

export interface TreeSelectProps {
  checkable: boolean;
  clearable: boolean;
  defaultValue: string;
  disabled: boolean;
  status: 'error' | 'default';
  expandable: boolean;
  expandAll: boolean;
  line: boolean;
  loading: boolean;
  maxTagCount: number;
  nodes: TreeNode[];
  nodeWidth: number | null;
  readonly: boolean;
  placeholder: string;
  itemChecked?: () => any;
  itemSelected?: () => any;
  nodesChanged?: () => any;
}


export const TreeSelect = ({ checkable, clearable, defaultValue, disabled, expandable, expandAll, line, loading, maxTagCount, placeholder, readonly, nodes, nodeWidth, status}: TreeSelectProps) => {
  return html`
    <sy-tree-select
      ?checkable=${checkable}
      ?clearable=${clearable}
      defaultValue=${defaultValue}
      ?disabled=${disabled}
      ?expandable=${expandable}
      ?expandAll=${expandAll}
      ?line=${line}
      ?loading=${loading}
      maxTagCount=${maxTagCount}
      placeholder=${placeholder}
      ?readonly=${readonly}
      .nodes=${nodes}      
      nodeWidth=${nodeWidth}
      status=${status}
    ></sy-tree-select>
  `;
};

export const TreeSelectCheckable = (args: {checkable: boolean}) => {
  return html`

<sy-tree-select ?checkable=${args.checkable} expandAll id="treeSelectCheckable"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', checked: true, children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectCheckable');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeSelectClearable = (args: {clearable: boolean}) => {
  return html`

<sy-tree-select ?clearable=${args.clearable} id="treeSelectClearable"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectClearable');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeSelectDisabled = (args: {disabled: boolean}) => {
  return html`

<sy-tree-select ?disabled=${args.disabled} id="treeSelectDefaultValue"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectDefaultValue');
    tree.nodes = nodes;   
  })();
</script>
  `;
};


export const TreeSelectStatus = (args: {status: 'error' | 'default'}) => {
  return html`

<sy-tree-select status=${args.status} id="treeSelectStatus"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectStatus');
    tree.nodes = nodes;   
  })();
</script>
  `;
};


export const TreeSelectDefaultValue = (args: {defaultValue: string}) => {
  return html`

<sy-tree-select defaultValue=${args.defaultValue} id="treeSelectDefaultValue"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectDefaultValue');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeSelectExpandable = (args: {expandable: boolean}) => {
  return html`

<sy-tree-select ?expandable=${args.expandable} id="treeSelectExpandable"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectExpandable');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeSelectExpandAll = (args: {expandAll: boolean, expandable: boolean}) => {
  return html`

<sy-tree-select ?expandAll=${args.expandAll} ?expandable=${args.expandable} id="treeSelectExpandAll"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectExpandAll');
    tree.nodes = nodes;   
  })();
</script>
  `;
};


export const TreeSelectLine = (args: {line: boolean}) => {
  return html`

<sy-tree-select ?line=${args.line} id="treeSelectLine"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', checked: true, children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectLine');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeSelectLoading = (args: {loading: boolean}) => {
  return html`

<sy-tree-select ?loading=${args.loading} id="treeSelectLoading"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', checked: true, children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectLoading');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeSelectMaxTagCount = (args: {maxTagCount: number}) => {
  return html`

<sy-tree-select maxTagCount=${args.maxTagCount} checkable expandAll id="treeSelectMaxTagCount"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011', checked: true }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', checked: true,children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectMaxTagCount');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeSelectNodes = () => {
  return html`

<sy-tree-select id="treeSelectNodes"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectNodes');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeSelectNodeWidth = (args: {nodeWidth: number | null}) => {
  return html`

<sy-tree-select .nodeWidth=${args.nodeWidth} id="treeSelectNodeWidth"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectNodeWidth');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeSelectReadonly = (args: {readonly: boolean}) => {
  return html`

<sy-tree-select ?readonly=${args.readonly} id="treeSelectReadonly"></sy-tree-select>

<script>
  (() => {
    const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectReadonly');
    tree.nodes = nodes;   
  })();
</script>
  `;
};


export const TreeSelectItemSelected = () => {
  return html`
    <sy-tree-select id="treeSelectItemSelected" expandAll></sy-tree-select>
    <div id="treeSelectItemSelectedResult" style="white-space: pre; font-family: monospace; background-color: #f5f5f5; padding: 10px; border-radius: 4px; max-height: 300px; overflow: auto; margin-top: 16px;"></div>

    <script>
      (() => {
        const nodes = [
          {
            label: 'grandparent 1', 
            value: '100', 
            children: [
              {
                label: 'parent 1-0', 
                value: '1001', 
                children: [
                  { label: 'leaf1', value: '10010' }, 
                  { label: 'leaf2', value: '10011' }, 
                  { label: 'leaf3', value: '10012' }  
                ]
              },
              {
                label: 'parent 1-1',
                value: '1002', 
                children: [{ label: 'leaf4', value: '10020' }] 
              },
            ]
          }
        ];
        const elem = document.querySelector('sy-tree-select#treeSelectItemSelected');
        const result = document.querySelector('#treeSelectItemSelectedResult');

        elem.nodes = nodes;
        elem.addEventListener('itemSelected', (e) => {
          const { checked, target, ...detail } = e.detail;
          result.textContent = JSON.stringify(detail, null, 2);
        });
      })();
    </script>
  `;
};

export const TreeSelectItemChecked = () => {
  return html`
    <sy-tree-select id="treeSelectItemChecked" checkable expandAll></sy-tree-select>
    <div id="treeSelectItemCheckedResult" style="white-space: pre; font-family: monospace; background-color: #f5f5f5; padding: 10px; border-radius: 4px; max-height: 300px; overflow: auto; margin-top: 16px;"></div>

    <script>
      (() => {
        const nodes = [
          {
            label: 'grandparent 1', 
            value: '100', 
            children: [
              {
                label: 'parent 1-0', 
                value: '1001', 
                children: [
                  { label: 'leaf1', value: '10010' }, 
                  { label: 'leaf2', value: '10011' }, 
                  { label: 'leaf3', value: '10012' }  
                ]
              },
              {
                label: 'parent 1-1',
                value: '1002', 
                children: [{ label: 'leaf4', value: '10020' }] 
              },
            ]
          }
        ];
        const elem = document.querySelector('sy-tree-select#treeSelectItemChecked');
        const result = document.querySelector('#treeSelectItemCheckedResult');

        elem.nodes = nodes;
        elem.addEventListener('itemChecked', (e) => {
          result.textContent = JSON.stringify(e.detail, null, 2);
        });
      })();
    </script>
  `;
};

export const TreeSelectNodeChanged = () => {
  return html`
    <sy-tree-select id="treeSelectNodeChanged" expandAll checkable></sy-tree-select>
    <div id="treeSelectNodeChangedResult" style="white-space: pre; font-family: monospace; background-color: #f5f5f5; padding: 10px; border-radius: 4px; max-height: 300px; overflow: auto; margin-top: 16px;"></div>

    <script>
      (() => {
        const nodes = [
          {
            label: 'grandparent 1', 
            value: '100', 
            children: [
              {
                label: 'parent 1-0', 
                value: '1001', 
                children: [
                  { label: 'leaf1', value: '10010' }, 
                  { label: 'leaf2', value: '10011' }, 
                  { label: 'leaf3', value: '10012' }  
                ]
              },
              {
                label: 'parent 1-1',
                value: '1002', 
                children: [{ label: 'leaf4', value: '10020' }] 
              },
            ]
          }
        ];
        const elem = document.querySelector('sy-tree-select#treeSelectNodeChanged');
        const result = document.querySelector('#treeSelectNodeChangedResult');

        elem.nodes = nodes;
        elem.addEventListener('nodeChanged', (e) => {
          result.textContent = JSON.stringify(e.detail, null, 2); // 2 spaces for indentation (cleaner than tabs in many cases)
        });
      })();
    </script>
  `;
};
