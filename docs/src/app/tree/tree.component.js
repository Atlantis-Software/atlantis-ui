import {Component} from '@angular/core';

export default  class TreeComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./tree.html')
      })
    ];
  }
  constructor(){
    this.nodesBasic = [
      {
        label: 'Node without children',
        selectable: false
      },
      {
        label: 'Node with children',
        children: [
          {
            label: 'Sub-node 1'
          },
          {
            label: 'Sub-node 2'
          }
        ]
      }
    ];

    this.nodesWithLazyLoading = [
      {
        label: 'Node 1'
      },
      {
        label: 'Node 2',
        expanded: true,
        children: [
          {
            label: 'Node 21'
          },
          {
            label: 'Node 22'
          },
          {
            label: 'Node 23',
            expanded: false,
            children: [
              {
                label: 'Node 231'
              },
              {
                label: 'Node 232'
              },
              {
                label: 'Node 233'
              },
              {
                label: 'Node 234'
              }
            ]
          },
          {
            label: 'Node 24',
            expanded: true,
            children: [
              {
                label: 'Node 241'
              },
              {
                label: 'Node 242'
              },
              {
                label: 'Node 243'
              },
              {
                label: 'Node 244',
                expanded: true,
                children: [
                  {
                    label: 'Node 2441'
                  },
                  {
                    label: 'Node 2442'
                  },
                  {
                    label: 'Node 2443'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        label: 'Node 3'
      },
      {
        label: 'Node 4',
        children: [
          {
            label: 'Node 41'
          },
          {
            label: 'Node 42'
          },
          {
            label: 'Node 43'
          },
          {
            label: 'Node 44'
          }
        ],
        expandable: true
      }
    ];

    this.nodesWithParameters = [
      {
        label: 'Node with children and not open per default',
        children: [
          {
            label: 'Sub-node hidden on init',
            selectable: false,
          }
        ]
      },
      {
        label: 'Node with children open per default',
        expanded: true,
        children: [
          {
            label: 'Sub-node show on init and with children but not expandable',
            disabled: true,
            children: [
              {
                label: 'Sub-sub-node'
              }
            ]
          },
          {
            label: 'Sub-node without children but disabled',
            disabled: true
          }
        ]
      }
    ];

    this.nodesSortable = [
      {
        label: 'Node 1',
      },
      {
        label: 'Node 2',
        expanded: true,
        children: [
          { label: 'Node 21' },
          { label: 'Node 22',
          },
          {
            label: 'Node 23',
            expanded: true,
            children: [
              { label: 'Node 231' },
              { label: 'Node 232' },
              { label: 'Node 233' },
              { label: 'Node 234' }
            ]
          },
        ]
      },
      {
        label: 'Node 3'
      }
    ];

    this.nodesSortableNested = [
      {
        label: 'Node 1',
      },
      {
        label: 'Node 2',
        expanded: true,
        children: [
          { label: 'Node 21' },
          { label: 'Node 22' },
          {
            label: 'Node 23',
            children: [
              { label: 'Node 231' },
              { label: 'Node 232' },
              { label: 'Node 233' },
              { label: 'Node 234' }
            ]
          },
          {
            label: 'Node 24',
            expanded: true,
            children: [
              { label: 'Node 241' },
              { label: 'Node 242' },
              { label: 'Node 243' },
              { label: 'Node 244' }
            ]
          }
        ]
      },
      { label: 'Node 3' },
      {
        label: 'Node 4',
        children: [
          { label: 'Node 41' },
          { label: 'Node 42' },
          { label: 'Node 43' },
          { label: 'Node 44' }
        ],
      }
    ];

    this.plugins = [
      {icon: 'check', description: 'check plugins', onDblclick: this.check, onChange: function(node){
        if (node.selected) {
          this.hide();
        } else {
          this.show();
        }
      }},
      'checkbox'
    ];
  }

  checkBox() {
    this.nodesWithLazyLoading[1].children[0].selected = true;
  }

  unCheckBox() {
    this.nodesWithLazyLoading[1].children[0].selected = false;
  }

  expandCallback(event) {
    console.log("expand event on : ", event);
    if (event.children[0].loading) {
      setTimeout(() => {
        event.children = [{
          label: "lazy loaded children"
        }];
      }, 3000);
    }
  }

  collapseCallback(event) {
    console.log("collapse event on : ", event);
  }

  onClickCallback(event) {
    this.selection = event;
    console.log("click event on : ", event);
  }

  checkedCallback(event) {
    console.log("checked event on : ", event);
  }

  uncheckedCallback(event) {
    console.log("unchecked event on : ", event);
  }

  check(event) {
    console.log("check : ", event);
    this.disable();
  }

}


TreeComponent.parameters = [];
