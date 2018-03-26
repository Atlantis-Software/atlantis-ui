import blockquote from './plugins/blockquote.plugin.js';
import bold from './plugins/bold.plugin.js';
import createLink from './plugins/createLink.plugin.js';
import format from './plugins/format.plugin.js';
import indent from './plugins/indent.plugin.js';

import insertImage from './plugins/insertImage.plugin.js';
import insertOrderedList from './plugins/insertOrderedList.plugin.js';
import insertUnorderedList from './plugins/insertUnorderedList.plugin.js';

import italic from './plugins/italic.plugin.js';

import justifyCenter from './plugins/justifyCenter.plugin.js';
import justifyFull from './plugins/justifyFull.plugin.js';
import justifyLeft from './plugins/justifyLeft.plugin.js';
import justifyRight from './plugins/justifyRight.plugin.js';

import outdent from './plugins/outdent.plugin.js';
import redo from './plugins/redo.plugin.js';
import removeFormat from './plugins/removeFormat.plugin.js';
import selectAll from './plugins/selectAll.plugin.js';
import strikethrough from './plugins/strikethrough.plugin.js';
import underline from './plugins/underline.plugin.js';
import undo from './plugins/undo.plugin.js';
import unlink from './plugins/unlink.plugin.js';

import { ComponentFactoryResolver, Injector } from '@angular/core';

const allPlugins = {
  bold, createLink, format, indent, insertImage, insertOrderedList, insertUnorderedList,
  italic, justifyCenter, justifyFull, justifyLeft, justifyRight, blockquote,
  outdent, redo, removeFormat, selectAll, strikethrough,  underline, undo, unlink
};


export class pluginsService {
  constructor(ComponentFactoryResolver, Injector) {
    this.componentFactoryResolver = ComponentFactoryResolver;
    this.injector = Injector;
  }
  load(toolbar) {
    var plugins = [];
    toolbar.forEach((pluginBlock, indexBlock)=> {
      plugins.push([]);
      pluginBlock.forEach((plugin)=> {
        if (allPlugins[plugin]) {
          var componentFactory = this.componentFactoryResolver.resolveComponentFactory(allPlugins[plugin]);
          var componentRef = componentFactory.create(this.injector);
          plugins[indexBlock].push(componentRef);
        }
      });
    });
    return plugins;
  }
}

pluginsService.parameters = [ComponentFactoryResolver, Injector];
