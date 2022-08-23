/* eslint-disable */

Object.defineProperty(exports, "__esModule", {
  value: true
});

function provide(namespace, optCtor) {
  // if (namespace === 'default') {
  //   defaultExport = optCtor || {};
  //   return defaultExport;
  // }
  var cur = exports;
  if (namespace === '') {
    return cur;
  }
  var parts = namespace.split('.');
  !(parts[0] in cur) && cur.execScript && cur.execScript('var ' + parts[0]);
  if (optCtor) {
    var clazz = optCtor.prototype.___clazz;
    clazz.jsConstructor = optCtor;
  }
  for (var part; parts.length && (part = parts.shift());) {
    cur = cur[part] = cur[part] || !parts.length && optCtor || {};
  }
  return cur;
}
