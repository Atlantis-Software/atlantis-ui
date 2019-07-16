import { Component, ElementRef, ApplicationRef, ChangeDetectorRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { pluginsService } from './plugins.class.js';
export class editorComponent {

  static get annotations() {
    return [
      new Component({
        selector: 'atlui-editor',
        template: require('./editor.html'),
        inputs: ["toolbar", ""],
        providers: [{
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => editorComponent),
          multi: true
        }],
      })
    ];
  }
  constructor(plugins, ElementRef, ApplicationRef, ChangeDetectorRef) {
    this.plugins = plugins;
    this.elementRef = ElementRef;
    this.applicationRef = ApplicationRef;
    this.cdr = ChangeDetectorRef;
    this.onModelTouched = function() {};
    this.onModelChange = function() {};
  }

  get value() {
    return this.val;
  }

  writeValue(val) {
    if (val !== this.val) {
      this.val = val;
      this.onModelChange(val);
    }
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  ngOnChanges() {
    this._toolbar = this.plugins.load(this.toolbar);
    this._loadToolbar();
  }

  ngAfterViewInit() {
    this._loadToolbar();
    document.execCommand('styleWithCSS', false, true);
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

  ngOnDestroy() {
    if (this._toolbar) {
      this._toolbar.forEach((pluginsBlock)=> {
        pluginsBlock.forEach((plugin)=> {
          plugin.destroy();
          plugin.null;
        });
      });
      this._toolbar = [];
    }
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
    var editor = this.elementRef.nativeElement.querySelector(".editor");
    this.onModelChange(editor.innerHTML);
  }
}

editorComponent.parameters = [pluginsService, ElementRef, ApplicationRef, ChangeDetectorRef];
