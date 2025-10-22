import { html } from "lit";
import '../tree.element';
import '../../button/button.element';

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
  indeterminate?: boolean;  // it is for check status, do not set this value manually.
  label: string;
  removable?: boolean;  // Add removable button, editable property of sy-tree must be true
  tagMessage?: string;           // text on the tag
  tagVariant?: "gray"| "purple" | "blue" | "green" | "cyan" | "yellow" | "orange" | "red";  // tag background color
  value: string;
}

export interface TreeProps {
  checkable: boolean;
  clickable: boolean;
  draggable: boolean;
  editable: boolean;
  expandable: boolean;
  expandAll: boolean;
  line: boolean;
  manualAdd: boolean;
  manualRemove: boolean;
  nodes: TreeNode[];
  nodeWidth: number | null;
  selectedValue: string;
  
  expandChanged?: () => any;
  itemAdded?: () => any;
  itemChecked?: () => any;
  itemDropped?: () => any;
  itemEdited?: () => any;
  itemRemoved?: () => any;
  itemSelected?: () => any;
  nodesChanged?: () => any;
}


export const Tree = ({ checkable, clickable, draggable, editable, expandable, expandAll, line, manualAdd, manualRemove, nodes, nodeWidth, selectedValue }: TreeProps) => {
  return html`
    <sy-tree
      ?checkable=${checkable}
      ?clickable=${clickable}  
      ?draggable=${draggable}
      ?editable=${editable}
      ?expandable=${expandable}
      ?expandAll=${expandAll}
      ?line=${line}
      ?manualAdd=${manualAdd}
      ?manualRemove=${manualRemove}
      .nodes=${nodes}
      nodeWidth=${nodeWidth}
      selectedValue=${selectedValue}
    ></sy-tree>
  `;
};

export const TreeCheckable = (args: {checkable: boolean, clickable: boolean}) => {
  return html`
    <sy-tree expandAll ?checkable=${args.checkable} ?clickable=${args.clickable} id="treeCheckable"></sy-tree>

<script>
  (() => {
    const nodes = [
        {
          label: 'parent 1', 
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

    const tree = document.querySelector('sy-tree#treeCheckable');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeClickable = (args: {clickable: boolean}) => {
  return html`
  <sy-tree ?clickable=${args.clickable} expandAll id="treeClickable"></sy-tree>
  <br/>
  <p id="treeClickableResult">No item selected</p>

    <script>
      (() => {
        const nodes = [
        {
          label: 'parent 1', 
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
        const elem = document.querySelector('sy-tree#treeClickable');
        const result = document.querySelector('#treeClickableResult');

        elem.nodes = nodes;
        elem.addEventListener('itemSelected', (e) => {
          result.textContent = 'Item "' + e.detail.label + '" is clicked';
        });
      })();
    </script>
  `;
};

export const TreeDraggable = (args: {draggable: boolean}) => {
  return html`
    <sy-tree ?draggable=${args.draggable} id="treeDraggable" expandAll></sy-tree>

<script>
  (() => {
    const nodes = [
        {
          label: 'parent 1', 
          value: '100' 
        },
        {
          label: 'parent 2',
          value: '200'
        },
        {
          label: 'parent 3',
          value: '300'
        },
        {
          label: 'parent 4',
          value: '400'
        },
      ];

    const tree = document.querySelector('sy-tree#treeDraggable');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeEditable = (args: {editable: boolean}) => {
  return html`
    <sy-tree ?editable=${args.editable} id="treeEditable" expandAll></sy-tree>

<script>
  (() => {
    const nodes = [
      {
        label: 'parent 1 <sy-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M392 96C378.7 96 368 106.7 368 120C368 133.3 378.7 144 392 144L462.1 144L320 286.1L177.9 144L248 144C261.3 144 272 133.3 272 120C272 106.7 261.3 96 248 96L120 96C106.7 96 96 106.7 96 120L96 248C96 261.3 106.7 272 120 272C133.3 272 144 261.3 144 248L144 177.9L286.1 320L144 462.1L144 392C144 378.7 133.3 368 120 368C106.7 368 96 378.7 96 392L96 520C96 533.3 106.7 544 120 544L248 544C261.3 544 272 533.3 272 520C272 506.7 261.3 496 248 496L177.9 496L320 353.9L462.1 496L392 496C378.7 496 368 506.7 368 520C368 533.3 378.7 544 392 544L520 544C533.3 544 544 533.3 544 520L544 392C544 378.7 533.3 368 520 368C506.7 368 496 378.7 496 392L496 462.1L353.9 320L496 177.9L496 248C496 261.3 506.7 272 520 272C533.3 272 544 261.3 544 248L544 120C544 106.7 533.3 96 520 96L392 96z"></path></svg></sy-icon>', 
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
    const tree = document.querySelector('sy-tree#treeEditable');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeExpandable = (args: {expandable: boolean}) => {
  return html`
    <sy-tree ?expandable=${args.expandable} id="treeExpandable"></sy-tree>

<script>
  (() => {
    const nodes = [
        {
          label: 'parent 1', 
          value: '100',
          expanded: true, 
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

    const tree = document.querySelector('sy-tree#treeExpandable');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeExpandAll = (args: {expandAll: boolean, expandable: boolean}) => {
  return html`
    <sy-tree ?expandAll=${args.expandAll} ?expandable=${args.expandable} id="treeExpandAll"></sy-tree>

<script>
  (() => {
    const nodes = [
        {
          label: 'parent 1', 
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

    const tree = document.querySelector('sy-tree#treeExpandAll');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeLine = (args: {line: boolean}) => {
  return html`
    <sy-tree ?line=${args.line} expandable id="treeLine"></sy-tree>

<script>
  (() => {
    const nodes = [
        {
          label: 'parent 1', 
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

    const tree = document.querySelector('sy-tree#treeLine');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeManualAdd = (args: {manualAdd: boolean}) => {
  return html`
    <sy-tree editable ?manualAdd=${args.manualAdd} expandAll id="treeManualAdd"></sy-tree>
    <p id="treeManualAddResult"></p>
    <sy-button id="treeManualAddButton">Manual Add Button</sy-button>
<script>
  (() => {
    const nodes = [
        {
          label: 'parent 1', 
          value: '100', 
          children: [
            {
              label: 'parent 1-0', 
              value: '1001', 
              children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012', children: [
                  { label: 'leaf1leaf1', value: '100100' }, 
                  { label: 'leaf1leaf2', value: '100101' }, 
                ] }  
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

    const tree = document.querySelector('sy-tree#treeManualAdd');
    const result = document.querySelector('#treeManualAddResult');
    const manualAddButton = document.querySelector('#treeManualAddButton');
    tree.nodes = nodes;   

    let addNode = null;
    tree.addEventListener('itemAdded', (e) => {
      const isManualAdd = document.querySelector('#control-manualAdd')?.checked ?? false;
      result.textContent = isManualAdd ? 'Click "Manual Add Button" to add item ' + JSON.stringify(e.detail) : 'Item Added: ' + JSON.stringify(e.detail);
      addNode = isManualAdd ? e.detail : null;
    });

    manualAddButton.addEventListener('click', () => {
      if(addNode) {
        tree.manualAddChildNode(addNode.parentValue, addNode.childLabel, addNode.childValue);
        result.textContent = 'Item Added: ' + JSON.stringify(addNode);
        addNode = null;
      } else {
        result.textContent = 'No manual item selected';
      }
    });

  })();
</script>
  `;
};

export const TreeManualRemove = (args: {manualRemove: boolean}) => {
  return html`
    <sy-tree editable ?manualRemove=${args.manualRemove} expandAll id="treeManualRemove"></sy-tree>
    <p id="treeManualRemoveResult"></p>
    <sy-button id="treeManualRemoveButton">Manual Remove Button</sy-button>
<script>
  (() => {
    const nodes = [
        {
          label: 'parent 1', 
          value: '100', 
          children: [
            {
              label: 'parent 1-0', 
              value: '1001', 
              children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012', children: [
                  { label: 'leaf1leaf1', value: '100100' }, 
                  { label: 'leaf1leaf2', value: '100101' }, 
                ] }  
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

    const tree = document.querySelector('sy-tree#treeManualRemove');
    const result = document.querySelector('#treeManualRemoveResult');
    const manualRemoveButton = document.querySelector('#treeManualRemoveButton');
    tree.nodes = nodes;   

    let removeNode = null;
    tree.addEventListener('itemRemoved', (e) => {
      const isManualRemove = document.querySelector('#control-manualRemove')?.checked ?? false;
      result.textContent = isManualRemove ? 'Click "Manual Remove Button" to remove item ' + JSON.stringify(e.detail) : 'Item Removed: ' + JSON.stringify(e.detail);
      removeNode = isManualRemove ? e.detail : null;
    });

    manualRemoveButton.addEventListener('click', () => {
      if(removeNode) {
        tree.manualRemoveNode(removeNode.value);
        result.textContent = 'Item Removed: ' + JSON.stringify(removeNode);
      } else {
        result.textContent = 'No manual item selected';
      }
    });

  })();
</script>
  `;
};

export const TreeNodes = () => {
  return html`

<sy-tree id="treeNodes"></sy-tree>

<script>
  (() => {
    const nodes = [
        {
          label: 'parent 1', 
          value: '100', 
          icon: '',
          tagMessage: 'tag',
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

    const tree = document.querySelector('sy-tree#treeNodes');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeNodeWidth = (args: {nodeWidth: number | null}) => {
  return html`
    <sy-tree .nodeWidth="${args.nodeWidth}" id="treeNodeWidth"></sy-tree>

<script>
  (() => {
    const nodes = [
        {
          label: 'parent 111111111111111111111111111111111111111111', 
          value: '100', 
           
          children: [
            {
              label: 'parent 1-00000000000000000000000000000000000', 
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

    const tree = document.querySelector('sy-tree#treeNodeWidth');
    tree.nodes = nodes;   
  })();
</script>
    
  `;
};

export const TreeSelectedValue = (args: {selectedValue: string}) => {
  return html`
    <sy-tree selectedValue=${args.selectedValue} clickable id="treeSelectedValue"></sy-tree>

<script>
  (() => {
    const nodes = [
        {
          label: 'parent 1', 
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

    const tree = document.querySelector('sy-tree#treeSelectedValue');
    tree.nodes = nodes;   
  })();
</script>
  `;
};

export const TreeExpandChanged = () => {
  return html`
    <sy-tree id="treeExpandChanged" expandable></sy-tree>
    <p id="treeExpandChangedResult"></p>

    <script>
      (() => {
        const nodes = [
          {
            label: 'parent 1', 
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
        const elem = document.querySelector('sy-tree#treeExpandChanged');
        const result = document.querySelector('#treeExpandChangedResult');

        elem.nodes = nodes;
        elem.addEventListener('expandChanged', (e) => {
          result.textContent = 'Item : ' + JSON.stringify(e.detail);
        });
      })();
    </script>
  `;
};

export const TreeItemChecked = () => {
  return html`
    <sy-tree id="treeItemChecked" checkable expandAll></sy-tree>
    <p id="treeItemCheckedResult"></p>

    <script>
      (() => {
        const nodes = [
          {
            label: 'parent 1', 
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
        const elem = document.querySelector('sy-tree#treeItemChecked');
        const result = document.querySelector('#treeItemCheckedResult');

        elem.nodes = nodes;
        elem.addEventListener('itemChecked', (e) => {
          result.textContent = 'Item : ' + JSON.stringify(e.detail);
        });
      })();
    </script>
  `;
};

export const TreeItemEdited = () => {
  return html`
    <sy-tree id="treeItemEdited" editable expandAll></sy-tree>
    <p id="treeItemEditedResult"></p>

    <script>
      (() => {
        const nodes = [
          {
            label: 'parent 1', 
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
        const elem = document.querySelector('sy-tree#treeItemEdited');
        const result = document.querySelector('#treeItemEditedResult');

        elem.nodes = nodes;
        elem.addEventListener('itemAdded', (e) => {
          result.textContent = 'Item Added: ' + JSON.stringify(e.detail);
        });
        elem.addEventListener('itemRemoved', (e) => {
          result.textContent = 'Item Removed: ' + JSON.stringify(e.detail);
        });
        elem.addEventListener('itemEdited', (e) => {
          result.textContent = 'Item Edited: ' + JSON.stringify(e.detail);
        });
      })();
    </script>
  `;
};

export const TreeItemSelected = () => {
  return html`
    <sy-tree id="treeItemSelected" expandAll clickable></sy-tree>
    <p id="treeItemSelectedResult"></p>

    <script>
      (() => {
        const nodes = [
          {
            label: 'parent 1', 
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
        const elem = document.querySelector('sy-tree#treeItemSelected');
        const result = document.querySelector('#treeItemSelectedResult');

        elem.nodes = nodes;
        elem.addEventListener('itemSelected', (e) => {
          result.textContent = 'Item : ' + JSON.stringify(e.detail);
        });
      })();
    </script>
  `;
};

export const TreeNodesChanged = () => {
  return html`
    <sy-tree id="treeNodesChanged" expandAll checkable draggable></sy-tree>
    <p id="treeNodesChangedResult"></p>

    <script>
      (() => {
        const nodes = [
          {
            label: 'parent 1', 
            value: '100', 
            children: [
              {
                label: 'child 1', 
                value: '1001'
              },
              {
                label: 'child 2',
                value: '1002'
              },
            ]
          }
        ];
        const elem = document.querySelector('sy-tree#treeNodesChanged');
        const result = document.querySelector('#treeNodesChangedResult');

        elem.nodes = nodes;
        elem.addEventListener('nodesChanged', function(e) {
          result.innerHTML = '<pre>' + JSON.stringify(e.detail, null, 2) + '</pre>';
        });
      })();
    </script>
  `;
};



export const TreeNode = (args: {
  appendable?: boolean,
  appendPlaceholder?: string,
  checked?: boolean,
  children?: TreeNode[],
  clickable?: boolean,
  disabled?: boolean,
  editable?: boolean,
  expanded?: boolean,
  fixed?: boolean,
  icon?: string,
  indeterminate?: boolean,
  label: string,
  removable?: boolean,
  tagMessage?: string
  tagVariant?: "gray"| "purple" | "blue" | "green" | "cyan" | "yellow" | "orange" | "red",
  value: string,
}) => {
  return html`
    <sy-tree id="treeNode" checkable expandable draggable clickable editable></sy-tree>
    <br/>
    <div style="border-bottom:1px solid #ddd"></div>
    <br/>
    <sy-button variant="primary" id="btnTreeNode">Apply</sy-button>

<script>
  (() => {
    const updatedArgs = ${JSON.stringify(args)};
    setNodes(updatedArgs);

    btnTreeNode.addEventListener('click', (e) => {      
      const controls = getTreeNodeControlValue(updatedArgs);
      setNodes(controls);
    });
  })();

  function setNodes(args) {
    const nodes = [
      {
        appendable: args.appendable,
        appendPlaceholder: args.appendPlaceholder,
        checked: args.checked,
        children: args.children,
        clickable: args.clickable,
        disabled: args.disabled,
        editable: args.editable,
        expanded: args.expanded,
        fixed: args.fixed,
        icon: args.icon,
        indeterminate: args.indeterminate,
        label: args.label, 
        removable: args.removable,
        tagMessage: args.tagMessage,
        tagVariant: args.tagVariant,
        value: args.value, 
      }
    ];

      const tree = document.querySelector('sy-tree#treeNode');
      tree.nodes = nodes;  
  }

  function getTreeNodeControlValue(updatedArgs) {
    return {
      appendable: document.querySelector('#control-appendable')?.checked ?? updatedArgs.appendable,
      appendPlaceholder: document.querySelector('#control-appendPlaceholder')?.value ?? updatedArgs.appendPlaceholder,
      checked: document.querySelector('#control-checked')?.checked ?? updatedArgs.checked,
      children: document.querySelector('#control-children')?.value ? JSON.parse(document.querySelector('#control-children')?.value) : updatedArgs.children,
      clickable: document.querySelector('#control-clickable')?.checked ?? updatedArgs.clickable,
      disabled: document.querySelector('#control-disabled')?.checked ?? updatedArgs.disabled,
      editable: document.querySelectorAll('#control-editable')[1]?.checked ?? updatedArgs.editable,
      expanded: document.querySelector('#control-expanded')?.checked ?? updatedArgs.expanded,
      fixed: document.querySelector('#control-fixed')?.checked ?? updatedArgs.fixed,
      icon: document.querySelector('#control-icon')?.value ?? updatedArgs.icon,
      indeterminate: document.querySelector('#control-indeterminate')?.checked ?? updatedArgs.indeterminate,
      label: document.querySelector('#control-label')?.value ?? updatedArgs.label,
      removable: document.querySelector('#control-removable')?.checked ?? updatedArgs.removable,
      tagMessage: document.querySelector('#control-tagMessage')?.value ?? updatedArgs.tagMessage,
      tagVariant: document.querySelector('#control-tagVariant')?.value ?? updatedArgs.tagVariant,
      value: document.querySelector('#control-value')?.value ?? updatedArgs.value,
    };
  }
</script>
  `;
};
