import {Component} from '@angular/core';

export default  class TreeComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./tree.html')
      })
    ]
  }
  constructor(){
    this.nodes = [
      { label: 'Node 1',
        selectable : false
      },
      {
        label: 'Node 2',
        expandable: true,
        expanded: true,
        children: [
          { label: 'Node 21' },
          { label: 'Node 22' },
          {
            label: 'Node 23',
            expanded: false,
            expandable: true,
            children: [
              { label: 'Node 231' },
              { label: 'Node 232' },
              { label: 'Node 233' },
              { label: 'Node 234' }
            ]
          },
          {
            label: 'Node 24',
            expandable: true,
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
        expandable: true
      }
    ];

    this.nodes1= [
      {
        label: 'Node1', model: { type: 'Array', count: 1 }
      },
      {
        label: 'Node2',
        expandable: true,
        model: { type: 'Object' },
        children: [
          {
            label: 'Node1', model: { type: 'Array', count: 1 }
          }
        ]
      },
      {
        label: 'Node3', model: { type: 'Array', count: 1 }
      }
    ];
  }

  onSelect(data){
    console.log(data);
  }
}


TreeComponent.parameters = [];
