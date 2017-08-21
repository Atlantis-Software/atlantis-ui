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
        selectable : true
      },
      {
          label: 'Node 2',
          expandable: true,
          expanded: true,
          children: [
            { label: 'Node 1' },
            { label: 'Node 2' },
            {
              label: 'Node 3',
              expanded: false,
              expandable: true,
              children: [
                { label: 'Node 1' },
                { label: 'Node 2' },
                { label: 'Node 3' },
                { label: 'Node 4' }
              ]
            },
            {
              label: 'Node 4',
              expandable: true,
              expanded: true,
              children: [
                { label: 'Node 1' },
                { label: 'Node 2' },
                { label: 'Node 3' },
                { label: 'Node 4' }
              ]
            }
          ]
      },
      { label: 'Node 3' },
      {
        label: 'Node 4',
        children: [
          { label: 'Node 1' },
          { label: 'Node 2' },
          { label: 'Node 3' },
          { label: 'Node 4' }
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
