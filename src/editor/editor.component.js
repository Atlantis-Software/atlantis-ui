import { Component, ElementRef, ApplicationRef, ChangeDetectorRef} from '@angular/core';
import { pluginsService } from './plugins.class.js';
export class editorComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-editor',
        template: require('./editor.html'),
        inputs: ["toolbar"]
      })
    ];
  }
  constructor(plugins, ElementRef, ApplicationRef, ChangeDetectorRef) {
    this.plugins = plugins;
    this.elementRef = ElementRef;
    this.applicationRef = ApplicationRef;
    this.cdr = ChangeDetectorRef;
    document.execCommand('styleWithCSS', false);
  }

  ngOnChanges() {
    this._toolbar = this.plugins.load(this.toolbar);
    this._loadToolbar();
  }

  ngAfterViewInit() {
    this._loadToolbar();
  }

  _loadToolbar() {
    var btnGroups = this.elementRef.nativeElement.querySelectorAll(".btn-group");
    if (btnGroups.length > 0) {
      this._toolbar.forEach((pluginsBlock, index)=> {
        pluginsBlock.forEach((plugin)=> {
          this.applicationRef.attachView(plugin.hostView);
          btnGroups[index].appendChild(plugin.location.nativeElement);
          plugin.changeDetectorRef.detectChanges();
        });
      });
    }
    this.cdr.detectChanges();
  }

  commandState($event) {
    if (!$event.key || $event.key === "ArrowLeft" || $event.key === "ArrowUp" || $event.key === "ArrowRight" || $event.key === "ArrowDown") {
      this._toolbar.forEach((pluginBlock)=> {
        pluginBlock.forEach((plugin)=> {
          if (plugin.instance.commandState) {
            plugin.instance.commandState();
          }
        });
      });
    }
  }

  openModal(plugin) {
    this.modal.show = true;
    this.modal.title = plugin.modal.title;
    this.modal.template = plugin.modal.template;
  }
}

editorComponent.parameters = [pluginsService, ElementRef, ApplicationRef, ChangeDetectorRef];
