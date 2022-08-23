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
function asijs(){
  var $wnd_0 = window, $doc_0 = document, gwtOnLoad_0, bodyDone, base = '', metaProps = {}, values = [], providers = [], answers = [], softPermutationId = 0, onLoadErrorFunc, propertyErrorFunc;
  if (!$wnd_0.__gwt_stylesLoaded) {
    $wnd_0.__gwt_stylesLoaded = {};
  }
  if (!$wnd_0.__gwt_scriptsLoaded) {
    $wnd_0.__gwt_scriptsLoaded = {};
  }
  function isHostedMode(){
    var result = false;
    try {
      var query = $wnd_0.location.search;
      return (query.indexOf('gwt.codesvr=') != -1 || (query.indexOf('gwt.hosted=') != -1 || $wnd_0.external && $wnd_0.external.gwtOnLoad)) && query.indexOf('gwt.hybrid') == -1;
    }
     catch (e) {
    }
    isHostedMode = function(){
      return result;
    }
    ;
    return result;
  }

  function maybeStartModule(){
    if (gwtOnLoad_0 && bodyDone) {
      gwtOnLoad_0(onLoadErrorFunc, 'asijs', base, softPermutationId);
    }
  }

  function computeScriptBase(){
    var thisScript, markerId = '__gwt_marker_asijs', markerScript;
    $doc_0.write('<script id="' + markerId + '"><\/script>');
    markerScript = $doc_0.getElementById(markerId);
    thisScript = markerScript && markerScript.previousSibling;
    while (thisScript && thisScript.tagName != 'SCRIPT') {
      thisScript = thisScript.previousSibling;
    }
    function getDirectoryOfFile(path){
      var hashIndex = path.lastIndexOf('#');
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf('?');
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf('/', Math.min(queryIndex, hashIndex));
      return slashIndex >= 0?path.substring(0, slashIndex + 1):'';
    }

    ;
    if (thisScript && thisScript.src) {
      base = getDirectoryOfFile(thisScript.src);
    }
    if (base == '') {
      var baseElements = $doc_0.getElementsByTagName('base');
      if (baseElements.length > 0) {
        base = baseElements[baseElements.length - 1].href;
      }
       else {
        base = getDirectoryOfFile($doc_0.location.href);
      }
    }
     else if (base.match(/^\w+:\/\//)) {
    }
     else {
      var img = $doc_0.createElement('img');
      img.src = base + 'clear.cache.gif';
      base = getDirectoryOfFile(img.src);
    }
    if (markerScript) {
      markerScript.parentNode.removeChild(markerScript);
    }
  }

  function processMetas(){
    var metas = document.getElementsByTagName('meta');
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i], name_0 = meta.getAttribute('name'), content_0;
      if (name_0) {
        if (name_0 == 'gwt:property') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            var value_0, eq = content_0.indexOf('=');
            if (eq >= 0) {
              name_0 = content_0.substring(0, eq);
              value_0 = content_0.substring(eq + 1);
            }
             else {
              name_0 = content_0;
              value_0 = '';
            }
            metaProps[name_0] = value_0;
          }
        }
         else if (name_0 == 'gwt:onPropertyErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              propertyErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onPropertyErrorFn"');
            }
          }
        }
         else if (name_0 == 'gwt:onLoadErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              onLoadErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onLoadErrorFn"');
            }
          }
        }
      }
    }
  }

  var __gwt_isKnownPropertyValue = function(propName, propValue){
    return propValue in values[propName];
  }
  ;
  var __gwt_getMetaProperty = function(name_0){
    var value_0 = metaProps[name_0];
    return value_0 == null?null:value_0;
  }
  ;
  function unflattenKeylistIntoAnswers(propValArray, value_0){
    var answer = answers;
    for (var i = 0, n = propValArray.length - 1; i < n; ++i) {
      answer = answer[propValArray[i]] || (answer[propValArray[i]] = []);
    }
    answer[propValArray[n]] = value_0;
  }

  function computePropValue(propName){
    var value_0 = providers[propName](), allowedValuesMap = values[propName];
    if (value_0 in allowedValuesMap) {
      return value_0;
    }
    var allowedValuesList = [];
    for (var k in allowedValuesMap) {
      allowedValuesList[allowedValuesMap[k]] = k;
    }
    if (propertyErrorFunc) {
      propertyErrorFunc(propName, allowedValuesList, value_0);
    }
    throw null;
  }

  providers['user.agent'] = function(){
    var ua = navigator.userAgent.toLowerCase();
    var docMode = $doc_0.documentMode;
    if (function(){
      return ua.indexOf('webkit') != -1;
    }
    ())
      return 'safari';
    if (function(){
      return ua.indexOf('gecko') != -1 || docMode >= 11;
    }
    ())
      return 'gecko1_8';
    return '';
  }
  ;
  values['user.agent'] = {'gecko1_8':0, 'safari':1};
  asijs.onScriptLoad = function(gwtOnLoadFunc){
    asijs = null;
    gwtOnLoad_0 = gwtOnLoadFunc;
    maybeStartModule();
  }
  ;
  if (isHostedMode()) {
    alert('Single-script hosted mode not yet implemented. See issue ' + 'http://code.google.com/p/google-web-toolkit/issues/detail?id=2079');
    return;
  }
  // computeScriptBase();
  processMetas();
  try {
    var strongName;
    unflattenKeylistIntoAnswers(['gecko1_8'], '615D2B03738854E94EBF9405D142D3C2');
    unflattenKeylistIntoAnswers(['safari'], '615D2B03738854E94EBF9405D142D3C2' + ':1');
    strongName = answers[computePropValue('user.agent')];
    var idx = strongName.indexOf(':');
    if (idx != -1) {
      softPermutationId = Number(strongName.substring(idx + 1));
    }
  }
   catch (e) {
    return;
  }
  var onBodyDoneTimerId;
  function onBodyDone(){
    if (!bodyDone) {
      bodyDone = true;
      maybeStartModule();
      if ($doc_0.removeEventListener) {
        $doc_0.removeEventListener('DOMContentLoaded', onBodyDone, false);
      }
      if (onBodyDoneTimerId) {
        clearInterval(onBodyDoneTimerId);
      }
    }
  }

  if ($doc_0.addEventListener) {
    $doc_0.addEventListener('DOMContentLoaded', function(){
      onBodyDone();
    }
    , false);
  }
  var onBodyDoneTimerId = setInterval(function(){
    if (/loaded|complete/.test($doc_0.readyState)) {
      onBodyDone();
    }
  }
  , 50);
}

asijs();
(function () {var $gwt_version = "2.10.0";var $wnd = window;var $doc = $wnd.document;var $moduleName, $moduleBase;var $stats = $wnd.__gwtStatsEvent ? function(a) {$wnd.__gwtStatsEvent(a)} : null;var $strongName = '615D2B03738854E94EBF9405D142D3C2';var $intern_0 = {3:1, 6:1}, $intern_1 = {3:1, 17:1, 11:1}, $intern_2 = {3:1, 17:1, 14:1, 11:1}, $intern_3 = {3:1, 6:1, 93:1}, $intern_4 = {19:1, 37:1}, $intern_5 = 4194303, $intern_6 = 17592186044416, $intern_7 = 4194304, $intern_8 = {3:1, 51:1, 11:1}, $intern_9 = {3:1}, $intern_10 = {19:1, 18:1}, $intern_11 = {3:1, 19:1, 18:1}, $intern_12 = {3:1, 43:1}, $intern_13 = {3:1, 19:1, 37:1}, $intern_14 = {3:1, 39:1, 44:1, 49:1}, $intern_15 = {3:1, 6:1, 270:1}, $intern_16 = -Infinity, $intern_17 = {173:1, 3:1, 6:1, 91:1}, $intern_18 = {7:1, 3:1, 6:1}, $intern_19 = {4:1, 3:1}, $intern_20 = {10:1}, $intern_21 = {10:1, 70:1}, $intern_22 = {10:1, 67:1}, $intern_23 = {10:1, 68:1}, $intern_24 = {10:1, 53:1}, $intern_25 = {10:1, 132:1}, $intern_26 = {10:1, 87:1}, $intern_27 = {10:1, 72:1}, $intern_28 = {10:1, 107:1}, $intern_29 = {10:1, 73:1}, $intern_30 = {10:1, 50:1}, $intern_31 = {10:1, 137:1}, $intern_32 = {10:1, 74:1}, $intern_33 = {10:1, 113:1}, $intern_34 = {10:1, 71:1}, $intern_35 = {10:1, 134:1};
var _, prototypesByTypeId_0, initFnList_0, permutationId = -1;
function create_com_google_gwt_useragent_client_UserAgent(){
  if (permutationId == 0) {
    return new UserAgentImplGecko1_8;
  }
  return new UserAgentImplSafari;
}

function setGwtProperty(propertyName, propertyValue){
  typeof window === 'object' && typeof window['$gwt'] === 'object' && (window['$gwt'][propertyName] = propertyValue);
}

function gwtOnLoad_0(errFn, modName, modBase, softPermutationId){
  ensureModuleInit();
  var initFnList = initFnList_0;
  $moduleName = modName;
  $moduleBase = modBase;
  permutationId = softPermutationId;
  function initializeModules(){
    for (var i = 0; i < initFnList.length; i++) {
      initFnList[i]();
    }
  }

  if (errFn) {
    try {
      $entry(initializeModules)();
    }
     catch (e) {
      errFn(modName, e);
    }
  }
   else {
    $entry(initializeModules)();
  }
}

function ensureModuleInit(){
  initFnList_0 == null && (initFnList_0 = []);
}

function addInitFunctions(){
  ensureModuleInit();
  var initFnList = initFnList_0;
  for (var i = 0; i < arguments.length; i++) {
    initFnList.push(arguments[i]);
  }
}

function typeMarkerFn(){
}

function toString_3(object){
  var number;
  if (Array.isArray(object) && object.typeMarker === typeMarkerFn) {
    return $getName(getClass__Ljava_lang_Class___devirtual$(object)) + '@' + (number = hashCode__I__devirtual$(object) >>> 0 , number.toString(16));
  }
  return object.toString();
}

function dontprovide(namespace, optCtor){
  var cur = $wnd;
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

function portableObjCreate(obj){
  function F(){
  }

  ;
  F.prototype = obj || {};
  return new F;
}

function emptyMethod(){
}

function defineClass(typeId, superTypeIdOrPrototype, castableTypeMap){
  var prototypesByTypeId = prototypesByTypeId_0, superPrototype;
  var prototype_0 = prototypesByTypeId[typeId];
  var clazz = prototype_0 instanceof Array?prototype_0[0]:null;
  if (prototype_0 && !clazz) {
    _ = prototype_0;
  }
   else {
    _ = (superPrototype = superTypeIdOrPrototype && superTypeIdOrPrototype.prototype , !superPrototype && (superPrototype = prototypesByTypeId_0[superTypeIdOrPrototype]) , portableObjCreate(superPrototype));
    _.castableTypeMap = castableTypeMap;
    !superTypeIdOrPrototype && (_.typeMarker = typeMarkerFn);
    prototypesByTypeId[typeId] = _;
  }
  for (var i = 3; i < arguments.length; ++i) {
    arguments[i].prototype = _;
  }
  clazz && (_.___clazz = clazz);
}

$wnd.goog = $wnd.goog || {};
$wnd.goog.global = $wnd.goog.global || $wnd;
prototypesByTypeId_0 = {};
function $equals(this$static, other){
  return maskUndefined(this$static) === maskUndefined(other);
}

function Object_0(){
}

function equals_Ljava_lang_Object__Z__devirtual$(this$static, other){
  return instanceOfString(this$static)?$equals_1(this$static, other):instanceOfDouble(this$static)?$equals_0(this$static, other):instanceOfBoolean(this$static)?(checkCriticalNotNull(this$static) , maskUndefined(this$static) === maskUndefined(other)):hasJavaObjectVirtualDispatch(this$static)?this$static.equals_0(other):isJavaArray(this$static)?$equals(this$static, other):!!this$static && !!this$static.equals?this$static.equals(other):maskUndefined(this$static) === maskUndefined(other);
}

function getClass__Ljava_lang_Class___devirtual$(this$static){
  return instanceOfString(this$static)?Ljava_lang_String_2_classLit:instanceOfDouble(this$static)?Ljava_lang_Double_2_classLit:instanceOfBoolean(this$static)?Ljava_lang_Boolean_2_classLit:hasJavaObjectVirtualDispatch(this$static)?this$static.___clazz:isJavaArray(this$static)?this$static.___clazz:this$static.___clazz || Array.isArray(this$static) && getClassLiteralForArray(Lcom_google_gwt_core_client_JavaScriptObject_2_classLit, 1) || Lcom_google_gwt_core_client_JavaScriptObject_2_classLit;
}

function hashCode__I__devirtual$(this$static){
  return instanceOfString(this$static)?$hashCode_1(this$static):instanceOfDouble(this$static)?$hashCode_0(this$static):instanceOfBoolean(this$static)?$hashCode(this$static):hasJavaObjectVirtualDispatch(this$static)?this$static.hashCode_0():isJavaArray(this$static)?getObjectIdentityHashCode(this$static):!!this$static && !!this$static.hashCode?this$static.hashCode():getObjectIdentityHashCode(this$static);
}

defineClass(1, null, {}, Object_0);
_.equals_0 = function equals(other){
  return $equals(this, other);
}
;
_.getClass_0 = function getClass_0(){
  return this.___clazz;
}
;
_.hashCode_0 = function hashCode_0(){
  return getObjectIdentityHashCode(this);
}
;
_.toString_0 = function toString_0(){
  var number;
  return $getName(getClass__Ljava_lang_Class___devirtual$(this)) + '@' + (number = hashCode__I__devirtual$(this) >>> 0 , number.toString(16));
}
;
_.equals = function(other){
  return this.equals_0(other);
}
;
_.hashCode = function(){
  return this.hashCode_0();
}
;
_.toString = function(){
  return this.toString_0();
}
;
function $clinit_StackTraceCreator(){
  $clinit_StackTraceCreator = emptyMethod;
  var c, enforceLegacy;
  enforceLegacy = !supportsErrorStack();
  c = new StackTraceCreator$CollectorModernNoSourceMap;
  collector_1 = enforceLegacy?new StackTraceCreator$CollectorLegacy:c;
}

function captureStackTrace(error){
  $clinit_StackTraceCreator();
  collector_1.collect(error);
}

function extractFunctionName(fnName){
  var fnRE = /function(?:\s+([\w$]+))?\s*\(/;
  var match_0 = fnRE.exec(fnName);
  return match_0 && match_0[1] || 'anonymous';
}

function supportsErrorStack(){
  if (Error.stackTraceLimit > 0) {
    $wnd.Error.stackTraceLimit = Error.stackTraceLimit = 64;
    return true;
  }
  return 'stack' in new Error;
}

var collector_1;
defineClass(286, 1, {});
function StackTraceCreator$CollectorLegacy(){
}

defineClass(182, 286, {}, StackTraceCreator$CollectorLegacy);
_.collect = function collect(error){
  var seen = {}, name_1;
  var fnStack = [];
  error['fnStack'] = fnStack;
  var callee = arguments.callee.caller;
  while (callee) {
    var name_0 = ($clinit_StackTraceCreator() , callee.name || (callee.name = extractFunctionName(callee.toString())));
    fnStack.push(name_0);
    var keyName = ':' + name_0;
    var withThisName = seen[keyName];
    if (withThisName) {
      var i, j;
      for (i = 0 , j = withThisName.length; i < j; i++) {
        if (withThisName[i] === callee) {
          return;
        }
      }
    }
    (withThisName || (seen[keyName] = [])).push(callee);
    callee = callee.caller;
  }
}
;
defineClass(287, 286, {});
_.collect = function collect_0(error){
}
;
function StackTraceCreator$CollectorModernNoSourceMap(){
}

defineClass(183, 287, {}, StackTraceCreator$CollectorModernNoSourceMap);
function canSet(array, value_0){
  var elementTypeCategory;
  switch (getElementTypeCategory(array)) {
    case 6:
      return instanceOfString(value_0);
    case 7:
      return instanceOfDouble(value_0);
    case 8:
      return instanceOfBoolean(value_0);
    case 3:
      return Array.isArray(value_0) && (elementTypeCategory = getElementTypeCategory(value_0) , !(elementTypeCategory >= 14 && elementTypeCategory <= 16));
    case 11:
      return value_0 != null && typeof value_0 === 'function';
    case 12:
      return value_0 != null && (typeof value_0 === 'object' || typeof value_0 == 'function');
    case 0:
      return canCast(value_0, array.__elementTypeId$);
    case 2:
      return isJsObjectOrFunction(value_0) && !(value_0.typeMarker === typeMarkerFn);
    case 1:
      return isJsObjectOrFunction(value_0) && !(value_0.typeMarker === typeMarkerFn) || canCast(value_0, array.__elementTypeId$);
    default:return true;
  }
}

function ensureNotNull(array){
  return checkCriticalNotNull(array) , array;
}

function getClassLiteralForArray(clazz, dimensions){
  return getClassLiteralForArray_0(clazz, dimensions);
}

function getElementTypeCategory(array){
  return array.__elementTypeCategory$ == null?10:array.__elementTypeCategory$;
}

function initUnidimensionalArray(leafClassLiteral, castableTypeMap, elementTypeId, length_0, elementTypeCategory, dimensions){
  var result;
  result = initializeArrayElementsWithDefaults(elementTypeCategory, length_0);
  elementTypeCategory != 10 && stampJavaTypeInfo(getClassLiteralForArray(leafClassLiteral, dimensions), castableTypeMap, elementTypeId, elementTypeCategory, result);
  return result;
}

function initializeArrayElementsWithDefaults(elementTypeCategory, length_0){
  var array = new Array(length_0);
  var initValue;
  switch (elementTypeCategory) {
    case 14:
    case 15:
      initValue = 0;
      break;
    case 16:
      initValue = false;
      break;
    default:return array;
  }
  for (var i = 0; i < length_0; ++i) {
    array[i] = initValue;
  }
  return array;
}

function isJavaArray(src_0){
  return Array.isArray(src_0) && src_0.typeMarker === typeMarkerFn;
}

function setCheck(array, index_0, value_0){
  checkCriticalArrayType(value_0 == null || canSet(array, value_0));
  return array[index_0] = value_0;
}

function stampJavaTypeInfo(arrayClass, castableTypeMap, elementTypeId, elementTypeCategory, array){
  array.___clazz = arrayClass;
  array.castableTypeMap = castableTypeMap;
  array.typeMarker = typeMarkerFn;
  array.__elementTypeId$ = elementTypeId;
  array.__elementTypeCategory$ = elementTypeCategory;
  return array;
}

function stampJavaTypeInfo_0(array, referenceType){
  getElementTypeCategory(referenceType) != 10 && stampJavaTypeInfo(getClass__Ljava_lang_Class___devirtual$(referenceType), referenceType.castableTypeMap, referenceType.__elementTypeId$, getElementTypeCategory(referenceType), array);
  return array;
}

function canCast(src_0, dstId){
  if (instanceOfString(src_0)) {
    return !!stringCastMap[dstId];
  }
   else if (src_0.castableTypeMap) {
    return !!src_0.castableTypeMap[dstId];
  }
   else if (instanceOfDouble(src_0)) {
    return !!doubleCastMap[dstId];
  }
   else if (instanceOfBoolean(src_0)) {
    return !!booleanCastMap[dstId];
  }
  return false;
}

function castTo(src_0, dstId){
  checkCriticalType(src_0 == null || canCast(src_0, dstId));
  return src_0;
}

function castToBoolean(src_0){
  checkCriticalType(src_0 == null || instanceOfBoolean(src_0));
  return src_0;
}

function castToDouble(src_0){
  checkCriticalType(src_0 == null || instanceOfDouble(src_0));
  return src_0;
}

function castToJso(src_0){
  checkCriticalType(src_0 == null || isJsObjectOrFunction(src_0) && !(src_0.typeMarker === typeMarkerFn));
  return src_0;
}

function castToNative(src_0, jsType){
  checkCriticalType(src_0 == null || jsinstanceOf(src_0, jsType));
  return src_0;
}

function castToString(src_0){
  checkCriticalType(src_0 == null || instanceOfString(src_0));
  return src_0;
}

function hasJavaObjectVirtualDispatch(src_0){
  return !Array.isArray(src_0) && src_0.typeMarker === typeMarkerFn;
}

function instanceOf(src_0, dstId){
  return src_0 != null && canCast(src_0, dstId);
}

function instanceOfBoolean(src_0){
  return typeof src_0 === 'boolean';
}

function instanceOfDouble(src_0){
  return typeof src_0 === 'number';
}

function instanceOfJso(src_0){
  return src_0 != null && isJsObjectOrFunction(src_0) && !(src_0.typeMarker === typeMarkerFn);
}

function instanceOfNative(src_0, jsType){
  return jsinstanceOf(src_0, jsType);
}

function instanceOfString(src_0){
  return typeof src_0 === 'string';
}

function isJsObjectOrFunction(src_0){
  return typeof src_0 === 'object' || typeof src_0 === 'function';
}

function jsinstanceOf(obj, jsType){
  return obj && jsType && obj instanceof jsType;
}

function maskUndefined(src_0){
  return src_0 == null?null:src_0;
}

function round_int(x_0){
  return Math.max(Math.min(x_0, 2147483647), -2147483648) | 0;
}

var booleanCastMap, doubleCastMap, stringCastMap;
function toJava(e){
  var javaException;
  if (instanceOf(e, 11)) {
    return e;
  }
  javaException = e && e.__java$exception;
  if (!javaException) {
    javaException = new JavaScriptException(e);
    captureStackTrace(javaException);
  }
  return javaException;
}

function toJs(t){
  return t.backingJsObject;
}

function $isInstance(instance){
  var type_0;
  if (instance == null) {
    return false;
  }
  type_0 = typeof(instance);
  return $equals_1(type_0, 'boolean') || $equals_1(type_0, 'number') || $equals_1(type_0, 'string') || instance.$implements__java_io_Serializable || Array.isArray(instance);
}

function $isInstance_3(instance){
  var type_0;
  type_0 = typeof(instance);
  if ($equals_1(type_0, 'boolean') || $equals_1(type_0, 'number') || $equals_1(type_0, 'string')) {
    return true;
  }
  return instance != null && instance.$implements__java_lang_Comparable;
}

function $clinit_Boolean(){
  $clinit_Boolean = emptyMethod;
  FALSE = false;
}

function $booleanValue(this$static){
  return checkCriticalNotNull(this$static) , this$static;
}

function $compareTo(this$static, b){
  return compare_0((checkCriticalNotNull(this$static) , this$static), (checkCriticalNotNull(b) , b));
}

function $hashCode(this$static){
  return (checkCriticalNotNull(this$static) , this$static)?1231:1237;
}

function $isInstance_0(instance){
  $clinit_Boolean();
  return $equals_1('boolean', typeof(instance));
}

function compare_0(x_0, y_0){
  $clinit_Boolean();
  return x_0 == y_0?0:x_0?1:-1;
}

function compareTo_Ljava_lang_Object__I__devirtual$(this$static, other){
  $clinit_Boolean();
  return instanceOfString(this$static)?$compareTo_4(this$static, castToString(other)):instanceOfDouble(this$static)?$compareTo_1(this$static, castToDouble(other)):instanceOfBoolean(this$static)?$compareTo(this$static, castToBoolean(other)):this$static.compareTo_0(other);
}

booleanCastMap = {3:1, 177:1, 39:1};
var FALSE;
function $isInstance_1(instance){
  if ($equals_1(typeof(instance), 'string')) {
    return true;
  }
  return instance != null && instance.$implements__java_lang_CharSequence;
}

function $ensureNamesAreInitialized(this$static){
  if (this$static.typeName != null) {
    return;
  }
  initializeNames(this$static);
}

function $getName(this$static){
  $ensureNamesAreInitialized(this$static);
  return this$static.typeName;
}

function Class(){
  ++nextSequentialId;
  this.typeName = null;
  this.simpleName = null;
  this.packageName = null;
  this.compoundName = null;
  this.canonicalName = null;
  this.typeId = null;
  this.arrayLiterals = null;
}

function createClassObject(packageName, compoundClassName){
  var clazz;
  clazz = new Class;
  clazz.packageName = packageName;
  clazz.compoundName = compoundClassName;
  return clazz;
}

function createForClass(packageName, compoundClassName, typeId){
  var clazz;
  clazz = createClassObject(packageName, compoundClassName);
  maybeSetClassLiteral(typeId, clazz);
  return clazz;
}

function createForEnum(packageName, compoundClassName, typeId, enumConstantsFunc){
  var clazz;
  clazz = createClassObject(packageName, compoundClassName);
  maybeSetClassLiteral(typeId, clazz);
  clazz.modifiers = enumConstantsFunc?8:0;
  return clazz;
}

function createForPrimitive(className, primitiveTypeId){
  var clazz;
  clazz = createClassObject('', className);
  clazz.typeId = primitiveTypeId;
  clazz.modifiers = 1;
  return clazz;
}

function getClassLiteralForArray_0(leafClass, dimensions){
  var arrayLiterals = leafClass.arrayLiterals = leafClass.arrayLiterals || [];
  return arrayLiterals[dimensions] || (arrayLiterals[dimensions] = leafClass.createClassLiteralForArray(dimensions));
}

function getPrototypeForClass(clazz){
  if (clazz.isPrimitive()) {
    return null;
  }
  var typeId = clazz.typeId;
  return prototypesByTypeId_0[typeId];
}

function initializeNames(clazz){
  if (clazz.isArray_0()) {
    var componentType = clazz.componentType;
    componentType.isPrimitive()?(clazz.typeName = '[' + componentType.typeId):!componentType.isArray_0()?(clazz.typeName = '[L' + componentType.getName() + ';'):(clazz.typeName = '[' + componentType.getName());
    clazz.canonicalName = componentType.getCanonicalName() + '[]';
    clazz.simpleName = componentType.getSimpleName() + '[]';
    return;
  }
  var packageName = clazz.packageName;
  var compoundName = clazz.compoundName;
  compoundName = compoundName.split('/');
  clazz.typeName = join_0('.', [packageName, join_0('$', compoundName)]);
  clazz.canonicalName = join_0('.', [packageName, join_0('.', compoundName)]);
  clazz.simpleName = compoundName[compoundName.length - 1];
}

function join_0(separator, strings){
  var i = 0;
  while (!strings[i] || strings[i] == '') {
    i++;
  }
  var result = strings[i++];
  for (; i < strings.length; i++) {
    if (!strings[i] || strings[i] == '') {
      continue;
    }
    result += separator + strings[i];
  }
  return result;
}

function maybeSetClassLiteral(typeId, clazz){
  var proto;
  if (!typeId) {
    return;
  }
  clazz.typeId = typeId;
  var prototype_0 = getPrototypeForClass(clazz);
  if (!prototype_0) {
    prototypesByTypeId_0[typeId] = [clazz];
    return;
  }
  prototype_0.___clazz = clazz;
}

defineClass(146, 1, {}, Class);
_.createClassLiteralForArray = function createClassLiteralForArray(dimensions){
  var clazz;
  clazz = new Class;
  clazz.modifiers = 4;
  dimensions > 1?(clazz.componentType = getClassLiteralForArray_0(this, dimensions - 1)):(clazz.componentType = this);
  return clazz;
}
;
_.getCanonicalName = function getCanonicalName(){
  $ensureNamesAreInitialized(this);
  return this.canonicalName;
}
;
_.getName = function getName(){
  return $getName(this);
}
;
_.getSimpleName = function getSimpleName(){
  $ensureNamesAreInitialized(this);
  return this.simpleName;
}
;
_.isArray_0 = function isArray(){
  return (this.modifiers & 4) != 0;
}
;
_.isPrimitive = function isPrimitive(){
  return (this.modifiers & 1) != 0;
}
;
_.toString_0 = function toString_6(){
  return ((this.modifiers & 2) != 0?'interface ':(this.modifiers & 1) != 0?'':'class ') + ($ensureNamesAreInitialized(this) , this.typeName);
}
;
_.modifiers = 0;
var nextSequentialId = 1;
function $isInstance_4(instance){
  return $equals_1('number', typeof(instance)) || instanceOfNative(instance, $wnd.java.lang.Number$impl);
}

function __parseAndValidateDouble(s){
  floatRegex == null && (floatRegex = new RegExp('^\\s*[+-]?(NaN|Infinity|((\\d+\\.?\\d*)|(\\.\\d+))([eE][+-]?\\d+)?[dDfF]?)\\s*$'));
  if (!floatRegex.test(s)) {
    throw toJs(new NumberFormatException('For input string: "' + s + '"'));
  }
  return parseFloat(s);
}

function __parseAndValidateInt(s){
  var i, isTooLow, length_0, startIndex, toReturn;
  if (s == null) {
    throw toJs(new NumberFormatException('null'));
  }
  length_0 = s.length;
  startIndex = length_0 > 0 && (checkCriticalStringElementIndex(0, s.length) , s.charCodeAt(0) == 45 || (checkCriticalStringElementIndex(0, s.length) , s.charCodeAt(0) == 43))?1:0;
  for (i = startIndex; i < length_0; i++) {
    if (digit((checkCriticalStringElementIndex(i, s.length) , s.charCodeAt(i))) == -1) {
      throw toJs(new NumberFormatException('For input string: "' + s + '"'));
    }
  }
  toReturn = parseInt(s, 10);
  isTooLow = toReturn < -2147483648;
  if (isNaN(toReturn)) {
    throw toJs(new NumberFormatException('For input string: "' + s + '"'));
  }
   else if (isTooLow || toReturn > 2147483647) {
    throw toJs(new NumberFormatException('For input string: "' + s + '"'));
  }
  return toReturn;
}

defineClass(117, 1, {3:1, 117:1});
var floatRegex;
function $compareTo_1(this$static, b){
  return compare_1((checkCriticalNotNull(this$static) , this$static), (checkCriticalNotNull(b) , b));
}

function $doubleValue(this$static){
  return checkCriticalNotNull(this$static) , this$static;
}

function $equals_0(this$static, o){
  return checkCriticalNotNull(this$static) , maskUndefined(this$static) === maskUndefined(o);
}

function $hashCode_0(this$static){
  return round_int((checkCriticalNotNull(this$static) , this$static));
}

function $intValue(this$static){
  return round_int((checkCriticalNotNull(this$static) , this$static));
}

function $isInstance_5(instance){
  return $equals_1('number', typeof(instance));
}

function $toString_1(this$static){
  return '' + (checkCriticalNotNull(this$static) , this$static);
}

function compare_1(x_0, y_0){
  if (x_0 < y_0) {
    return -1;
  }
  if (x_0 > y_0) {
    return 1;
  }
  if (x_0 == y_0) {
    return x_0 == 0?compare_1(1 / x_0, 1 / y_0):0;
  }
  return isNaN(x_0)?isNaN(y_0)?0:1:-1;
}

doubleCastMap = {3:1, 39:1, 178:1, 117:1};
function $fillInStackTrace(this$static){
  this$static.writableStackTrace && this$static.backingJsObject !== '__noinit__' && this$static.initializeBackingError();
  return this$static;
}

function $linkBack(this$static, error){
  if (error instanceof Object) {
    try {
      error.__java$exception = this$static;
      if (navigator.userAgent.toLowerCase().indexOf('msie') != -1 && $doc.documentMode < 9) {
        return;
      }
      var throwable = this$static;
      Object.defineProperties(error, {cause:{get:function(){
        var cause = throwable.getCause();
        return cause && cause.getBackingJsObject();
      }
      }, suppressed:{get:function(){
        return throwable.getBackingSuppressed();
      }
      }});
    }
     catch (ignored) {
    }
  }
}

function $setBackingJsObject(this$static, backingJsObject){
  this$static.backingJsObject = backingJsObject;
  $linkBack(this$static, backingJsObject);
}

function $toString_0(this$static, message){
  var className;
  className = $getName(this$static.___clazz);
  return message == null?className:className + ': ' + message;
}

function fixIE(e){
  if (!('stack' in e)) {
    try {
      throw e;
    }
     catch (ignored) {
    }
  }
  return e;
}

function of(e){
  var throwable;
  if (e != null) {
    throwable = e.__java$exception;
    if (throwable) {
      return throwable;
    }
  }
  return instanceOfNative(e, TypeError)?new NullPointerException_0(e):new JsException(e);
}

defineClass(11, 1, {3:1, 11:1});
_.createError = function createError(msg){
  return new Error(msg);
}
;
_.getBackingJsObject = function getBackingJsObject(){
  return this.backingJsObject;
}
;
_.getBackingSuppressed = function getBackingSuppressed(){
  var i, result, suppressed;
  suppressed = (this.suppressedExceptions == null && (this.suppressedExceptions = initUnidimensionalArray(Ljava_lang_Throwable_2_classLit, $intern_0, 11, 0, 0, 1)) , this.suppressedExceptions);
  result = initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, suppressed.length, 5, 1);
  for (i = 0; i < suppressed.length; i++) {
    result[i] = suppressed[i].backingJsObject;
  }
  return result;
}
;
_.getCause = function getCause(){
  return this.cause_0;
}
;
_.getMessage = function getMessage(){
  return this.detailMessage;
}
;
_.initializeBackingError = function initializeBackingError(){
  $setBackingJsObject(this, fixIE(this.createError($toString_0(this, this.detailMessage))));
  captureStackTrace(this);
}
;
_.toString_0 = function toString_2(){
  return $toString_0(this, this.getMessage());
}
;
_.backingJsObject = '__noinit__';
_.writableStackTrace = true;
function Exception(message){
  this.detailMessage = message;
  $fillInStackTrace(this);
  this.initializeBackingError();
}

defineClass(17, 11, $intern_1);
function RuntimeException(){
  $fillInStackTrace(this);
  this.initializeBackingError();
}

function RuntimeException_0(message){
  Exception.call(this, message);
}

defineClass(14, 17, $intern_2, RuntimeException_0);
function IndexOutOfBoundsException(message){
  RuntimeException_0.call(this, message);
}

defineClass(46, 14, $intern_2, IndexOutOfBoundsException);
function JsException(backingJsObject){
  $fillInStackTrace(this);
  this.backingJsObject = backingJsObject;
  $linkBack(this, backingJsObject);
  this.detailMessage = backingJsObject == null?'null':toString_3(backingJsObject);
}

defineClass(76, 14, $intern_2, JsException);
function NullPointerException(){
  RuntimeException.call(this);
}

function NullPointerException_0(typeError){
  JsException.call(this, typeError);
}

function NullPointerException_1(message){
  RuntimeException_0.call(this, message);
}

defineClass(60, 76, {3:1, 17:1, 60:1, 14:1, 11:1}, NullPointerException, NullPointerException_0, NullPointerException_1);
_.createError = function createError_0(msg){
  return new TypeError(msg);
}
;
function $charAt_0(this$static, index_0){
  checkCriticalStringElementIndex(index_0, this$static.length);
  return this$static.charCodeAt(index_0);
}

function $compareTo_4(this$static, other){
  var a, b;
  a = (checkCriticalNotNull(this$static) , this$static);
  b = (checkCriticalNotNull(other) , other);
  return a == b?0:a < b?-1:1;
}

function $equals_1(this$static, other){
  return checkCriticalNotNull(this$static) , maskUndefined(this$static) === maskUndefined(other);
}

function $getChars0(this$static, srcBegin, srcEnd, dst, dstBegin){
  while (srcBegin < srcEnd) {
    dst[dstBegin++] = $charAt_0(this$static, srcBegin++);
  }
}

function $hashCode_1(this$static){
  var h, i;
  h = 0;
  for (i = 0; i < this$static.length; i++) {
    h = (h << 5) - h + (checkCriticalStringElementIndex(i, this$static.length) , this$static.charCodeAt(i)) | 0;
  }
  return h;
}

function $isInstance_6(instance){
  return $equals_1('string', typeof(instance));
}

function $lastIndexOf(this$static, str){
  return this$static.lastIndexOf(str);
}

function $split(this$static, regex, maxMatch){
  var compiled, count, lastNonEmpty, lastTrail, matchIndex, matchObj, out, trail;
  compiled = new RegExp(regex, 'g');
  out = initUnidimensionalArray(Ljava_lang_String_2_classLit, $intern_3, 2, 0, 6, 1);
  count = 0;
  trail = this$static;
  lastTrail = null;
  while (true) {
    matchObj = compiled.exec(trail);
    if (matchObj == null || trail == '' || count == maxMatch - 1 && maxMatch > 0) {
      out[count] = trail;
      break;
    }
     else {
      matchIndex = matchObj.index;
      out[count] = (checkCriticalStringBounds(0, matchIndex, trail.length) , trail.substr(0, matchIndex));
      trail = $substring_0(trail, matchIndex + matchObj[0].length, trail.length);
      compiled.lastIndex = 0;
      if (lastTrail == trail) {
        out[count] = (checkCriticalStringBounds(0, 1, trail.length) , trail.substr(0, 1));
        trail = (checkCriticalStringElementIndex(1, trail.length + 1) , trail.substr(1));
      }
      lastTrail = trail;
      ++count;
    }
  }
  if (maxMatch == 0 && this$static.length > 0) {
    lastNonEmpty = out.length;
    while (lastNonEmpty > 0 && out[lastNonEmpty - 1] == '') {
      --lastNonEmpty;
    }
    lastNonEmpty < out.length && (out.length = lastNonEmpty);
  }
  return out;
}

function $substring(this$static){
  checkCriticalStringElementIndex(1, this$static.length + 1);
  return this$static.substr(1);
}

function $substring_0(this$static, beginIndex, endIndex){
  checkCriticalStringBounds(beginIndex, endIndex, this$static.length);
  return this$static.substr(beginIndex, endIndex - beginIndex);
}

function $trim(this$static){
  var end, length_0, start_0;
  length_0 = this$static.length;
  start_0 = 0;
  while (start_0 < length_0 && (checkCriticalStringElementIndex(start_0, this$static.length) , this$static.charCodeAt(start_0) <= 32)) {
    ++start_0;
  }
  end = length_0;
  while (end > start_0 && (checkCriticalStringElementIndex(end - 1, this$static.length) , this$static.charCodeAt(end - 1) <= 32)) {
    --end;
  }
  return start_0 > 0 || end < length_0?(checkCriticalStringBounds(start_0, end, this$static.length) , this$static.substr(start_0, end - start_0)):this$static;
}

function fromCharCode(array){
  return String.fromCharCode.apply(null, array);
}

function join_1(elements){
  var e, e$iterator, joiner;
  joiner = new StringJoiner;
  for (e$iterator = new ArrayList$1(elements); e$iterator.i < e$iterator.this$01.array.length;) {
    e = castTo($next_1(e$iterator), 115);
    !joiner.builder?(joiner.builder = new StringBuilder_0(joiner.prefix)):$append_4(joiner.builder, joiner.delimiter);
    $append_1(joiner.builder, e);
  }
  return !joiner.builder?joiner.emptyValue:joiner.suffix.length == 0?joiner.builder.string:joiner.builder.string + ('' + joiner.suffix);
}

function valueOf_1(x_0){
  return valueOf_2(x_0, x_0.length);
}

function valueOf_2(x_0, count){
  var batchEnd, batchStart, end, s;
  end = count;
  checkCriticalStringBounds(0, end, x_0.length);
  s = '';
  for (batchStart = 0; batchStart < end;) {
    batchEnd = $wnd.Math.min(batchStart + 10000, end);
    s += fromCharCode(x_0.slice(batchStart, batchEnd));
    batchStart = batchEnd;
  }
  return s;
}

stringCastMap = {3:1, 115:1, 39:1, 2:1};
function StringIndexOutOfBoundsException(message){
  IndexOutOfBoundsException.call(this, message);
}

defineClass(151, 46, $intern_2, StringIndexOutOfBoundsException);
function clone(array){
  var result;
  result = array.slice();
  return stampJavaTypeInfo_0(result, array);
}

function copy(src_0, srcOfs, dest, destOfs, len){
  var batchEnd, batchStart, destArray, end, spliceArgs;
  if (len == 0) {
    return;
  }
  if (src_0 === dest) {
    src_0 = src_0.slice(srcOfs, srcOfs + len);
    srcOfs = 0;
  }
  destArray = dest;
  for (batchStart = srcOfs , end = srcOfs + len; batchStart < end;) {
    batchEnd = $wnd.Math.min(batchStart + 10000, end);
    len = batchEnd - batchStart;
    spliceArgs = src_0.slice(batchStart, batchEnd);
    spliceArgs.splice(0, 0, destOfs, 0);
    Array.prototype.splice.apply(destArray, spliceArgs);
    batchStart = batchEnd;
    destOfs += len;
  }
}

function insertTo(array, index_0, value_0){
  array.splice(index_0, 0, value_0);
}

function insertTo_0(array, index_0, values){
  copy(values, 0, array, index_0, values.length);
}

function push_1(array, o){
  array.push(o);
}

function removeFrom(array, index_0, deleteCount){
  array.splice(index_0, deleteCount);
}

defineClass(366, 1, {});
function HashCodes(){
}

function getIdentityHashCode(o){
  switch (typeof(o)) {
    case 'string':
      return $hashCode_1(o);
    case 'number':
      return $hashCode_0(o);
    case 'boolean':
      return $hashCode(o);
    default:return o == null?0:getObjectIdentityHashCode(o);
  }
}

function getNextHash(){
  return ++nextHash;
}

function getObjectIdentityHashCode(o){
  return o.$H || (o.$H = ++nextHash);
}

defineClass(283, 1, {}, HashCodes);
var nextHash = 0;
function checkCriticalArgument(expression, errorMessage){
  if (!expression) {
    throw toJs(new IllegalArgumentException(errorMessage));
  }
}

function checkCriticalArrayBounds(end, length_0){
  if (0 > end) {
    throw toJs(new IllegalArgumentException('fromIndex: 0 > toIndex: ' + end));
  }
  if (end > length_0) {
    throw toJs(new ArrayIndexOutOfBoundsException_0('fromIndex: 0, toIndex: ' + end + ', length: ' + length_0));
  }
}

function checkCriticalArrayType(expression){
  if (!expression) {
    throw toJs(new ArrayStoreException);
  }
}

function checkCriticalConcurrentModification(currentModCount, recordedModCount){
  if (currentModCount != recordedModCount) {
    throw toJs(new ConcurrentModificationException);
  }
}

function checkCriticalElement(expression){
  if (!expression) {
    throw toJs(new NoSuchElementException);
  }
}

function checkCriticalElementIndex(index_0, size_0){
  if (index_0 < 0 || index_0 >= size_0) {
    throw toJs(new IndexOutOfBoundsException('Index: ' + index_0 + ', Size: ' + size_0));
  }
}

function checkCriticalNotNull(reference){
  if (reference == null) {
    throw toJs(new NullPointerException);
  }
  return reference;
}

function checkCriticalPositionIndex(index_0, size_0){
  if (index_0 < 0 || index_0 > size_0) {
    throw toJs(new IndexOutOfBoundsException('Index: ' + index_0 + ', Size: ' + size_0));
  }
}

function checkCriticalPositionIndexes(start_0, end, size_0){
  if (start_0 < 0 || end > size_0) {
    throw toJs(new IndexOutOfBoundsException('fromIndex: ' + start_0 + ', toIndex: ' + end + ', size: ' + size_0));
  }
  if (start_0 > end) {
    throw toJs(new IllegalArgumentException('fromIndex: ' + start_0 + ' > toIndex: ' + end));
  }
}

function checkCriticalState(expression){
  if (!expression) {
    throw toJs(new IllegalStateException);
  }
}

function checkCriticalStringBounds(start_0, end, length_0){
  if (start_0 < 0 || end > length_0 || end < start_0) {
    throw toJs(new StringIndexOutOfBoundsException('fromIndex: ' + start_0 + ', toIndex: ' + end + ', length: ' + length_0));
  }
}

function checkCriticalStringElementIndex(index_0, size_0){
  if (index_0 < 0 || index_0 >= size_0) {
    throw toJs(new StringIndexOutOfBoundsException('Index: ' + index_0 + ', Size: ' + size_0));
  }
}

function checkCriticalType(expression){
  if (!expression) {
    throw toJs(new ClassCastException);
  }
}

function toDoubleFromUnsignedInt(value_0){
  return value_0 >>> 0;
}

defineClass(284, 1, {});
var Ljava_lang_Object_2_classLit = createForClass('java.lang', 'Object', 1);
var Lcom_google_gwt_core_client_JavaScriptObject_2_classLit = createForClass('com.google.gwt.core.client', 'JavaScriptObject$', 0);
var Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/Collector', 286);
var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorLegacy_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorLegacy', 182);
var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorModern', 287);
var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModernNoSourceMap_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorModernNoSourceMap', 183);
var Ljava_lang_Boolean_2_classLit = createForClass('java.lang', 'Boolean', 177);
var Ljava_lang_Class_2_classLit = createForClass('java.lang', 'Class', 146);
var Ljava_lang_Number_2_classLit = createForClass('java.lang', 'Number', 117);
var Ljava_lang_Double_2_classLit = createForClass('java.lang', 'Double', 178);
var Ljava_lang_Throwable_2_classLit = createForClass('java.lang', 'Throwable', 11);
var Ljava_lang_Exception_2_classLit = createForClass('java.lang', 'Exception', 17);
var Ljava_lang_RuntimeException_2_classLit = createForClass('java.lang', 'RuntimeException', 14);
var Ljava_lang_IndexOutOfBoundsException_2_classLit = createForClass('java.lang', 'IndexOutOfBoundsException', 46);
var Ljava_lang_JsException_2_classLit = createForClass('java.lang', 'JsException', 76);
var Ljava_lang_NullPointerException_2_classLit = createForClass('java.lang', 'NullPointerException', 60);
var Ljava_lang_String_2_classLit = createForClass('java.lang', 'String', 2);
var Ljava_lang_StringIndexOutOfBoundsException_2_classLit = createForClass('java.lang', 'StringIndexOutOfBoundsException', 151);
var Ljavaemul_internal_HashCodes_2_classLit = createForClass('javaemul.internal', 'HashCodes', 283);
var Ljavaemul_internal_JsUtils_2_classLit = createForClass('javaemul.internal', 'JsUtils', 284);
function emptyToNull(string){
  return string || null;
}

function nullToEmpty(string){
  return string || '';
}

function stringIsNullOrEmpty(string){
  return !string;
}

defineClass(273, 1, {});
var Lcom_google_common_base_Platform_2_classLit = createForClass('com.google.common.base', 'Platform', 273);
function checkNotNull(reference, errorMessage){
  if (!reference) {
    throw toJs(new NullPointerException_1(errorMessage));
  }
  return reference;
}

function checkState(expression){
  if (!expression) {
    throw toJs(new IllegalStateException);
  }
}

function lenientFormat(template, args){
  var builder, i, i0, placeholderStart, templateStart;
  template = template == null?'null':template;
  for (i0 = 0; i0 < args.length; i0++) {
    args[i0] = lenientToString(args[i0]);
  }
  builder = new StringBuilder;
  templateStart = 0;
  i = 0;
  while (i < args.length) {
    placeholderStart = template.indexOf('%s', templateStart);
    if (placeholderStart == -1) {
      break;
    }
    builder.string += '' + (checkCriticalStringBounds(templateStart, placeholderStart, (template == null?'null':template).length) , (template == null?'null':template).substr(templateStart, placeholderStart - templateStart));
    $append_3(builder, args[i++]);
    templateStart = placeholderStart + 2;
  }
  $append_2(builder, template, templateStart, template.length);
  if (i < args.length) {
    builder.string += ' [';
    $append_3(builder, args[i++]);
    while (i < args.length) {
      builder.string += ', ';
      $append_3(builder, args[i++]);
    }
    builder.string += ']';
  }
  return builder.string;
}

function lenientToString(o){
  var e, number, objectToString;
  if (o == null) {
    return 'null';
  }
  try {
    return toString_3(o);
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 17)) {
      e = $e0;
      objectToString = $getName(getClass__Ljava_lang_Class___devirtual$(o)) + '@' + (number = getIdentityHashCode(o) >>> 0 , number.toString(16));
      $log(getLogger(), ($clinit_Level() , 'Exception during lenientFormat for ' + objectToString), e);
      return '<' + objectToString + ' threw ' + $getName(e.___clazz) + '>';
    }
     else 
      throw toJs($e0);
  }
}

function $forEachRemaining(this$static, consumer){
  checkCriticalNotNull(consumer);
  while (this$static.hasNext_0()) {
    $accept_0(consumer, this$static.next_1());
  }
}

defineClass(294, 1, {});
_.forEachRemaining = function forEachRemaining(consumer){
  $forEachRemaining(this, consumer);
}
;
_.remove_0 = function remove_0(){
  throw toJs(new UnsupportedOperationException);
}
;
var Lcom_google_common_collect_UnmodifiableIterator_2_classLit = createForClass('com.google.common.collect', 'UnmodifiableIterator', 294);
function $hasNext(this$static){
  checkState(this$static.state != 3);
  switch (this$static.state) {
    case 2:
      return false;
    case 0:
      return true;
  }
  return $tryToComputeNext(this$static);
}

function $next(this$static){
  var result;
  if (!$hasNext(this$static)) {
    throw toJs(new NoSuchElementException);
  }
  this$static.state = 1;
  result = this$static.next_0;
  this$static.next_0 = null;
  return result;
}

function $tryToComputeNext(this$static){
  this$static.state = 3;
  this$static.next_0 = this$static.computeNext();
  if (this$static.state != 2) {
    this$static.state = 0;
    return true;
  }
  return false;
}

defineClass(154, 294, {});
_.hasNext_0 = function hasNext(){
  return $hasNext(this);
}
;
_.next_1 = function next_0(){
  return $next(this);
}
;
_.state = 1;
var Lcom_google_common_collect_AbstractIterator_2_classLit = createForClass('com.google.common.collect', 'AbstractIterator', 154);
function difference(set1, set2){
  checkNotNull(set1, 'set1');
  checkNotNull(set2, 'set2');
  return new Sets$3(set1, set2);
}

function intersection_0(set1, set2){
  checkNotNull(set1, 'set1');
  checkNotNull(set2, 'set2');
  return new Sets$2(set1, set2);
}

function $addAll(this$static, c){
  var changed, e, e$iterator;
  checkCriticalNotNull(c);
  changed = false;
  for (e$iterator = c.iterator_0(); e$iterator.hasNext_0();) {
    e = e$iterator.next_1();
    changed = changed | this$static.add(e);
  }
  return changed;
}

function $advanceToFind(this$static, o, remove){
  var e, iter;
  for (iter = this$static.iterator_0(); iter.hasNext_0();) {
    e = iter.next_1();
    if (maskUndefined(o) === maskUndefined(e) || o != null && equals_Ljava_lang_Object__Z__devirtual$(o, e)) {
      remove && iter.remove_0();
      return true;
    }
  }
  return false;
}

function $containsAll(this$static, c){
  var e, e$iterator;
  checkCriticalNotNull(c);
  for (e$iterator = c.iterator_0(); e$iterator.hasNext_0();) {
    e = e$iterator.next_1();
    if (!this$static.contains(e)) {
      return false;
    }
  }
  return true;
}

function $removeAll(this$static, c){
  var changed, iter, o;
  checkCriticalNotNull(c);
  changed = false;
  for (iter = this$static.iterator_0(); iter.hasNext_0();) {
    o = iter.next_1();
    if (c.contains(o)) {
      iter.remove_0();
      changed = true;
    }
  }
  return changed;
}

function $toArray(this$static){
  return this$static.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, this$static.size(), 5, 1));
}

function $toString(this$static){
  var e, e$iterator, joiner;
  joiner = new StringJoiner_0('[', ']');
  for (e$iterator = this$static.iterator_0(); e$iterator.hasNext_0();) {
    e = e$iterator.next_1();
    $add_4(joiner, maskUndefined(e) === maskUndefined(this$static)?'(this Collection)':e == null?'null':toString_3(e));
  }
  return !joiner.builder?joiner.emptyValue:joiner.suffix.length == 0?joiner.builder.string:joiner.builder.string + ('' + joiner.suffix);
}

defineClass(288, 1, {19:1});
_.spliterator_0 = function spliterator_0(){
  return new Spliterators$IteratorSpliterator(this, 0);
}
;
_.stream = function stream(){
  return new StreamImpl(null, this.spliterator_0());
}
;
_.add = function add_0(o){
  throw toJs(new UnsupportedOperationException_0('Add not supported on this collection'));
}
;
_.addAll = function addAll(c){
  return $addAll(this, c);
}
;
_.clear = function clear_0(){
  var iter;
  for (iter = this.iterator_0(); iter.hasNext_0();) {
    iter.next_1();
    iter.remove_0();
  }
}
;
_.contains = function contains(o){
  return $advanceToFind(this, o, false);
}
;
_.containsAll = function containsAll(c){
  return $containsAll(this, c);
}
;
_.isEmpty = function isEmpty(){
  return this.size() == 0;
}
;
_.remove = function remove_1(o){
  return $advanceToFind(this, o, true);
}
;
_.removeAll = function removeAll(c){
  return $removeAll(this, c);
}
;
_.retainAll = function retainAll(c){
  var changed, iter, o;
  checkCriticalNotNull(c);
  changed = false;
  for (iter = this.iterator_0(); iter.hasNext_0();) {
    o = iter.next_1();
    if (!c.contains(o)) {
      iter.remove_0();
      changed = true;
    }
  }
  return changed;
}
;
_.toArray = function toArray(){
  return $toArray(this);
}
;
_.toArray_0 = function toArray_0(a){
  var i, it, result, size_0;
  size_0 = this.size();
  a.length < size_0 && (a = stampJavaTypeInfo_1(new Array(size_0), a));
  result = a;
  it = this.iterator_0();
  for (i = 0; i < size_0; ++i) {
    setCheck(result, i, it.next_1());
  }
  a.length > size_0 && setCheck(a, size_0, null);
  return a;
}
;
_.toString_0 = function toString_1(){
  return $toString(this);
}
;
var Ljava_util_AbstractCollection_2_classLit = createForClass('java.util', 'AbstractCollection', 288);
defineClass(292, 288, $intern_4);
_.spliterator_0 = function spliterator_1(){
  return new Spliterators$IteratorSpliterator(this, 1);
}
;
_.equals_0 = function equals_0(o){
  var other;
  if (o === this) {
    return true;
  }
  if (!instanceOf(o, 37)) {
    return false;
  }
  other = castTo(o, 37);
  if (other.size() != this.size()) {
    return false;
  }
  return this.containsAll(other);
}
;
_.hashCode_0 = function hashCode_1(){
  return hashCode_9(this);
}
;
_.removeAll = function removeAll_0(c){
  var iter, o, o$iterator, size_0;
  checkCriticalNotNull(c);
  size_0 = this.size();
  if (size_0 < c.size()) {
    for (iter = this.iterator_0(); iter.hasNext_0();) {
      o = iter.next_1();
      c.contains(o) && iter.remove_0();
    }
  }
   else {
    for (o$iterator = c.iterator_0(); o$iterator.hasNext_0();) {
      o = o$iterator.next_1();
      this.remove(o);
    }
  }
  return size_0 != this.size();
}
;
var Ljava_util_AbstractSet_2_classLit = createForClass('java.util', 'AbstractSet', 292);
defineClass(293, 292, $intern_4);
_.iterator_0 = function iterator_0(){
  return this.iterator_1();
}
;
_.add = function add_1(e){
  throw toJs(new UnsupportedOperationException);
}
;
_.addAll = function addAll_0(newElements){
  throw toJs(new UnsupportedOperationException);
}
;
_.clear = function clear_1(){
  throw toJs(new UnsupportedOperationException);
}
;
_.remove = function remove_2(object){
  throw toJs(new UnsupportedOperationException);
}
;
_.removeAll = function removeAll_1(oldElements){
  throw toJs(new UnsupportedOperationException);
}
;
_.retainAll = function retainAll_0(elementsToKeep){
  throw toJs(new UnsupportedOperationException);
}
;
var Lcom_google_common_collect_Sets$SetView_2_classLit = createForClass('com.google.common.collect', 'Sets/SetView', 293);
function $size(this$static){
  var e, e$iterator, size_0;
  size_0 = 0;
  for (e$iterator = this$static.val$set11.iterator_0(); e$iterator.hasNext_0();) {
    e = e$iterator.next_1();
    this$static.val$set22.contains(e) && ++size_0;
  }
  return size_0;
}

function Sets$2(val$set1, val$set2){
  this.val$set11 = val$set1;
  this.val$set22 = val$set2;
}

defineClass(197, 293, $intern_4, Sets$2);
_.iterator_0 = function iterator_2(){
  return new Sets$2$1(this.val$set11, this.val$set22);
}
;
_.contains = function contains_0(object){
  return this.val$set11.contains(object) && this.val$set22.contains(object);
}
;
_.containsAll = function containsAll_0(collection){
  return this.val$set11.containsAll(collection) && this.val$set22.containsAll(collection);
}
;
_.isEmpty = function isEmpty_0(){
  return disjoint(this.val$set22, this.val$set11);
}
;
_.iterator_1 = function iterator_1(){
  return new Sets$2$1(this.val$set11, this.val$set22);
}
;
_.size = function size_1(){
  return $size(this);
}
;
_.stream = function stream_0(){
  return $filter(this.val$set11.stream(), new Sets$2$0methodref$contains$Type(this.val$set22));
}
;
var Lcom_google_common_collect_Sets$2_2_classLit = createForClass('com.google.common.collect', 'Sets/2', 197);
function Sets$2$0methodref$contains$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(198, 1, {}, Sets$2$0methodref$contains$Type);
_.test_0 = function test_0(arg0){
  return this.$$outer_0.contains(arg0);
}
;
var Lcom_google_common_collect_Sets$2$0methodref$contains$Type_2_classLit = createForClass('com.google.common.collect', 'Sets/2/0methodref$contains$Type', 198);
function Sets$2$1(val$set1, val$set2){
  this.val$set12 = val$set1;
  this.val$set23 = val$set2;
  this.itr = this.val$set12.iterator_0();
}

defineClass(155, 154, {}, Sets$2$1);
_.computeNext = function computeNext(){
  var e;
  while (this.itr.hasNext_0()) {
    e = this.itr.next_1();
    if (this.val$set23.contains(e)) {
      return e;
    }
  }
  return this.state = 2 , null;
}
;
var Lcom_google_common_collect_Sets$2$1_2_classLit = createForClass('com.google.common.collect', 'Sets/2/1', 155);
function Sets$3(val$set1, val$set2){
  this.val$set11 = val$set1;
  this.val$set22 = val$set2;
}

defineClass(199, 293, $intern_4, Sets$3);
_.iterator_0 = function iterator_4(){
  return new Sets$3$1(this.val$set11, this.val$set22);
}
;
_.contains = function contains_1(element){
  return $contains_3(this.val$set11, element) && !$contains_3(this.val$set22, element);
}
;
_.isEmpty = function isEmpty_1(){
  return $containsAll(this.val$set22, this.val$set11);
}
;
_.iterator_1 = function iterator_3(){
  return new Sets$3$1(this.val$set11, this.val$set22);
}
;
_.size = function size_2(){
  var e, e$iterator, entry, entryIterator, size_0;
  size_0 = 0;
  for (e$iterator = (entryIterator = new TreeMap$EntryIterator((new TreeMap$EntrySet((new AbstractNavigableMap$NavigableKeySet(this.val$set11.map_0)).map_0)).this$01_0) , new AbstractNavigableMap$NavigableKeySet$1(entryIterator)); $hasNext_0(e$iterator.val$entryIterator2.iter);) {
    e = (entry = $next_3(e$iterator.val$entryIterator2) , entry.getKey());
    $contains_3(this.val$set22, e) || ++size_0;
  }
  return size_0;
}
;
_.stream = function stream_1(){
  return $filter(new StreamImpl(null, new SortedSet$1(this.val$set11)), new Sets$3$lambda$0$Type(this.val$set22));
}
;
var Lcom_google_common_collect_Sets$3_2_classLit = createForClass('com.google.common.collect', 'Sets/3', 199);
function Sets$3$1(val$set1, val$set2){
  var entryIterator;
  this.val$set12 = val$set1;
  this.val$set23 = val$set2;
  this.itr = (entryIterator = new TreeMap$EntryIterator((new TreeMap$EntrySet((new AbstractNavigableMap$NavigableKeySet(this.val$set12.map_0)).map_0)).this$01_0) , new AbstractNavigableMap$NavigableKeySet$1(entryIterator));
}

defineClass(124, 154, {}, Sets$3$1);
_.computeNext = function computeNext_0(){
  var e, entry;
  while ($hasNext_0(this.itr.val$entryIterator2.iter)) {
    e = (entry = $next_3(this.itr.val$entryIterator2) , entry.getKey());
    if (!$contains_3(this.val$set23, e)) {
      return e;
    }
  }
  return this.state = 2 , null;
}
;
var Lcom_google_common_collect_Sets$3$1_2_classLit = createForClass('com.google.common.collect', 'Sets/3/1', 124);
function Sets$3$lambda$0$Type(set2_0){
  this.set2_0 = set2_0;
}

defineClass(200, 1, {}, Sets$3$lambda$0$Type);
_.test_0 = function test_1(arg0){
  return !$contains_3(this.set2_0, arg0);
}
;
var Lcom_google_common_collect_Sets$3$lambda$0$Type_2_classLit = createForClass('com.google.common.collect', 'Sets/3/lambda$0$Type', 200);
defineClass(191, 76, $intern_2);
var Lcom_google_gwt_core_client_impl_JavaScriptExceptionBase_2_classLit = createForClass('com.google.gwt.core.client.impl', 'JavaScriptExceptionBase', 191);
function $clinit_JavaScriptException(){
  $clinit_JavaScriptException = emptyMethod;
  NOT_SET = new Object_0;
}

function $ensureInit(this$static){
  var exception;
  if (this$static.message_0 == null) {
    exception = maskUndefined(this$static.e) === maskUndefined(NOT_SET)?null:this$static.e;
    this$static.name_0 = exception == null?'null':instanceOfJso(exception)?getExceptionName0(castToJso(exception)):instanceOfString(exception)?'String':$getName(getClass__Ljava_lang_Class___devirtual$(exception));
    this$static.description = this$static.description + ': ' + (instanceOfJso(exception)?getExceptionDescription0(castToJso(exception)):exception + '');
    this$static.message_0 = '(' + this$static.name_0 + ') ' + this$static.description;
  }
}

function JavaScriptException(e){
  $clinit_JavaScriptException();
  JsException.call(this, e);
  this.description = '';
  this.e = e;
  this.description = '';
}

function getExceptionDescription0(e){
  return e == null?null:e.message;
}

function getExceptionName0(e){
  return e == null?null:e.name;
}

defineClass(78, 191, {78:1, 3:1, 17:1, 14:1, 11:1}, JavaScriptException);
_.getMessage = function getMessage_0(){
  $ensureInit(this);
  return this.message_0;
}
;
_.getThrown = function getThrown(){
  return maskUndefined(this.e) === maskUndefined(NOT_SET)?null:this.e;
}
;
var NOT_SET;
var Lcom_google_gwt_core_client_JavaScriptException_2_classLit = createForClass('com.google.gwt.core.client', 'JavaScriptException', 78);
defineClass(271, 1, {});
var Lcom_google_gwt_core_client_Scheduler_2_classLit = createForClass('com.google.gwt.core.client', 'Scheduler', 271);
function $clinit_Impl(){
  $clinit_Impl = emptyMethod;
  !!($clinit_StackTraceCreator() , collector_1);
}

function apply_0(jsFunction, thisObj, args){
  return jsFunction.apply(thisObj, args);
  var __0;
}

function enter(){
  var now_0;
  if (entryDepth != 0) {
    now_0 = Date.now();
    if (now_0 - watchdogEntryDepthLastScheduled > 2000) {
      watchdogEntryDepthLastScheduled = now_0;
      watchdogEntryDepthTimerId = $wnd.setTimeout(watchdogEntryDepthRun, 10);
    }
  }
  if (entryDepth++ == 0) {
    $flushEntryCommands(($clinit_SchedulerImpl() , INSTANCE));
    return true;
  }
  return false;
}

function entry_0(jsFunction){
  $clinit_Impl();
  return function(){
    return entry0_0(jsFunction, this, arguments);
    var __0;
  }
  ;
}

function entry0_0(jsFunction, thisObj, args){
  var initialEntry;
  initialEntry = enter();
  try {
    return apply_0(jsFunction, thisObj, args);
  }
   finally {
    exit(initialEntry);
  }
}

function exit(initialEntry){
  initialEntry && $flushFinallyCommands(($clinit_SchedulerImpl() , INSTANCE));
  --entryDepth;
  if (initialEntry) {
    if (watchdogEntryDepthTimerId != -1) {
      watchdogEntryDepthCancel(watchdogEntryDepthTimerId);
      watchdogEntryDepthTimerId = -1;
    }
  }
}

function reportToBrowser(e){
  $clinit_Impl();
  $wnd.setTimeout(function(){
    throw e;
  }
  , 0);
}

function watchdogEntryDepthCancel(timerId){
  $wnd.clearTimeout(timerId);
}

function watchdogEntryDepthRun(){
  entryDepth != 0 && (entryDepth = 0);
  watchdogEntryDepthTimerId = -1;
}

var entryDepth = 0, watchdogEntryDepthLastScheduled = 0, watchdogEntryDepthTimerId = -1;
function $clinit_SchedulerImpl(){
  $clinit_SchedulerImpl = emptyMethod;
  INSTANCE = new SchedulerImpl;
}

function $flushEntryCommands(this$static){
  var oldQueue, rescheduled;
  if (this$static.entryCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.entryCommands;
      this$static.entryCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (this$static.entryCommands);
    this$static.entryCommands = rescheduled;
  }
}

function $flushFinallyCommands(this$static){
  var oldQueue, rescheduled;
  if (this$static.finallyCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.finallyCommands;
      this$static.finallyCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (this$static.finallyCommands);
    this$static.finallyCommands = rescheduled;
  }
}

function SchedulerImpl(){
}

function push_0(queue, task){
  !queue && (queue = []);
  queue[queue.length] = task;
  return queue;
}

function runScheduledTasks(tasks, rescheduled){
  var e, i, j, t;
  for (i = 0 , j = tasks.length; i < j; i++) {
    t = tasks[i];
    try {
      t[1]?t[0].$_nullMethod() && (rescheduled = push_0(rescheduled, t)):t[0].$_nullMethod();
    }
     catch ($e0) {
      $e0 = toJava($e0);
      if (instanceOf($e0, 11)) {
        e = $e0;
        $clinit_Impl();
        reportToBrowser(instanceOf(e, 78)?castTo(e, 78).getThrown():e);
      }
       else 
        throw toJs($e0);
    }
  }
  return rescheduled;
}

defineClass(222, 271, {}, SchedulerImpl);
var INSTANCE;
var Lcom_google_gwt_core_client_impl_SchedulerImpl_2_classLit = createForClass('com.google.gwt.core.client.impl', 'SchedulerImpl', 222);
function create(value_0){
  var a0, a1, a2;
  a0 = value_0 & $intern_5;
  a1 = value_0 >> 22 & $intern_5;
  a2 = value_0 < 0?1048575:0;
  return create0(a0, a1, a2);
}

function create0(l, m, h){
  return {l:l, m:m, h:h};
}

function fromDouble(value_0){
  var a0, a1, a2, negative, result, neg0, neg1, neg2;
  if (isNaN(value_0)) {
    return $clinit_BigLongLib$Const() , ZERO;
  }
  if (value_0 < -9223372036854775808) {
    return $clinit_BigLongLib$Const() , MIN_VALUE;
  }
  if (value_0 >= 9223372036854775807) {
    return $clinit_BigLongLib$Const() , MAX_VALUE;
  }
  negative = false;
  if (value_0 < 0) {
    negative = true;
    value_0 = -value_0;
  }
  a2 = 0;
  if (value_0 >= $intern_6) {
    a2 = round_int(value_0 / $intern_6);
    value_0 -= a2 * $intern_6;
  }
  a1 = 0;
  if (value_0 >= $intern_7) {
    a1 = round_int(value_0 / $intern_7);
    value_0 -= a1 * $intern_7;
  }
  a0 = round_int(value_0);
  result = create0(a0, a1, a2);
  negative && (neg0 = ~result.l + 1 & $intern_5 , neg1 = ~result.m + (neg0 == 0?1:0) & $intern_5 , neg2 = ~result.h + (neg0 == 0 && neg1 == 0?1:0) & 1048575 , result.l = neg0 , result.m = neg1 , result.h = neg2 , undefined);
  return result;
}

function $clinit_BigLongLib$Const(){
  $clinit_BigLongLib$Const = emptyMethod;
  MAX_VALUE = create0($intern_5, $intern_5, 524287);
  MIN_VALUE = create0(0, 0, 524288);
  create(1);
  create(2);
  ZERO = create(0);
}

var MAX_VALUE, MIN_VALUE, ZERO;
function createLongEmul(big_0){
  var a2;
  a2 = big_0.h;
  if (a2 == 0) {
    return big_0.l + big_0.m * $intern_7;
  }
  if (a2 == 1048575) {
    return big_0.l + big_0.m * $intern_7 - $intern_6;
  }
  return big_0;
}

function fromDouble_0(value_0){
  if (-17592186044416 < value_0 && value_0 < $intern_6) {
    return value_0 < 0?$wnd.Math.ceil(value_0):$wnd.Math.floor(value_0);
  }
  return createLongEmul(fromDouble(value_0));
}

function init(){
  $wnd.setTimeout($entry(assertCompileTimeUserAgent));
  $onModuleLoad();
}

function $exec(this$static, input_0){
  return this$static.exec(input_0);
}

function $onModuleLoad(){
  var allowedModes, currentMode, i;
  currentMode = $doc.compatMode;
  allowedModes = stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_String_2_classLit, 1), $intern_3, 2, 6, ['CSS1Compat']);
  for (i = 0; i < allowedModes.length; i++) {
    if ($equals_1(allowedModes[i], currentMode)) {
      return;
    }
  }
  allowedModes.length == 1 && $equals_1('CSS1Compat', allowedModes[0]) && $equals_1('BackCompat', currentMode)?"GWT no longer supports Quirks Mode (document.compatMode=' BackCompat').<br>Make sure your application's host HTML page has a Standards Mode (document.compatMode=' CSS1Compat') doctype,<br>e.g. by using &lt;!doctype html&gt; at the start of your application's HTML page.<br><br>To continue using this unsupported rendering mode and risk layout problems, suppress this message by adding<br>the following line to your*.gwt.xml module file:<br>&nbsp;&nbsp;&lt;extend-configuration-property name=\"document.compatMode\" value=\"" + currentMode + '"/&gt;':"Your *.gwt.xml module configuration prohibits the use of the current document rendering mode (document.compatMode=' " + currentMode + "').<br>Modify your application's host HTML page doctype, or update your custom " + "'document.compatMode' configuration property settings.";
}

function assertCompileTimeUserAgent(){
  var compileTimeValue, impl, runtimeValue;
  impl = castTo(create_com_google_gwt_useragent_client_UserAgent(), 174);
  compileTimeValue = impl.getCompileTimeValue();
  runtimeValue = impl.getRuntimeValue();
  if (!$equals_1(compileTimeValue, runtimeValue)) {
    throw toJs(new UserAgentAsserter$UserAgentAssertionError(compileTimeValue, runtimeValue));
  }
}

function Error_0(message, cause){
  this.cause_0 = cause;
  this.detailMessage = message;
  $fillInStackTrace(this);
  this.initializeBackingError();
}

defineClass(51, 11, $intern_8);
var Ljava_lang_Error_2_classLit = createForClass('java.lang', 'Error', 51);
defineClass(30, 51, $intern_8);
var Ljava_lang_AssertionError_2_classLit = createForClass('java.lang', 'AssertionError', 30);
function UserAgentAsserter$UserAgentAssertionError(compileTimeValue, runtimeValue){
  Error_0.call(this, 'Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (' + compileTimeValue + ') ' + 'does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.' == null?'null':toString_3('Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (' + compileTimeValue + ') ' + 'does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.'), instanceOf('Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (' + compileTimeValue + ') ' + 'does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.', 11)?castTo('Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (' + compileTimeValue + ') ' + 'does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.', 11):null);
}

defineClass(175, 30, $intern_8, UserAgentAsserter$UserAgentAssertionError);
var Lcom_google_gwt_useragent_client_UserAgentAsserter$UserAgentAssertionError_2_classLit = createForClass('com.google.gwt.useragent.client', 'UserAgentAsserter/UserAgentAssertionError', 175);
function UserAgentImplGecko1_8(){
}

defineClass(224, 1, {174:1}, UserAgentImplGecko1_8);
_.getCompileTimeValue = function getCompileTimeValue(){
  return 'gecko1_8';
}
;
_.getRuntimeValue = function getRuntimeValue(){
  var ua = navigator.userAgent.toLowerCase();
  var docMode = $doc.documentMode;
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('gecko') != -1 || docMode >= 11;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}
;
var Lcom_google_gwt_useragent_client_UserAgentImplGecko1_18_2_classLit = createForClass('com.google.gwt.useragent.client', 'UserAgentImplGecko1_8', 224);
function UserAgentImplSafari(){
}

defineClass(223, 1, {174:1}, UserAgentImplSafari);
_.getCompileTimeValue = function getCompileTimeValue_0(){
  return 'safari';
}
;
_.getRuntimeValue = function getRuntimeValue_0(){
  var ua = navigator.userAgent.toLowerCase();
  var docMode = $doc.documentMode;
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('gecko') != -1 || docMode >= 11;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}
;
var Lcom_google_gwt_useragent_client_UserAgentImplSafari_2_classLit = createForClass('com.google.gwt.useragent.client', 'UserAgentImplSafari', 223);
function $charAt(this$static, index_0){
  return $charAt_0(this$static.string, index_0);
}

function $setLength(this$static){
  var oldLength;
  oldLength = this$static.string.length;
  0 < oldLength?(this$static.string = $substring_0(this$static.string, 0, 0)):0 > oldLength && (this$static.string += valueOf_1(initUnidimensionalArray(C_classLit, $intern_9, 5, -oldLength, 15, 1)));
}

function AbstractStringBuilder(string){
  this.string = string;
}

defineClass(77, 1, {115:1});
_.toString_0 = function toString_4(){
  return this.string;
}
;
var Ljava_lang_AbstractStringBuilder_2_classLit = createForClass('java.lang', 'AbstractStringBuilder', 77);
function ArrayIndexOutOfBoundsException(){
  RuntimeException.call(this);
}

function ArrayIndexOutOfBoundsException_0(msg){
  IndexOutOfBoundsException.call(this, msg);
}

defineClass(172, 46, $intern_2, ArrayIndexOutOfBoundsException, ArrayIndexOutOfBoundsException_0);
var Ljava_lang_ArrayIndexOutOfBoundsException_2_classLit = createForClass('java.lang', 'ArrayIndexOutOfBoundsException', 172);
function ArrayStoreException(){
  RuntimeException.call(this);
}

defineClass(212, 14, $intern_2, ArrayStoreException);
var Ljava_lang_ArrayStoreException_2_classLit = createForClass('java.lang', 'ArrayStoreException', 212);
function $compareTo_0(this$static, c){
  return this$static.value_0 - c.value_0;
}

function Character(value_0){
  this.value_0 = value_0;
}

function digit(c){
  if (c >= 48 && c < 48 + $wnd.Math.min(10, 10)) {
    return c - 48;
  }
  if (c >= 97 && c < 97) {
    return c - 97 + 10;
  }
  if (c >= 65 && c < 65) {
    return c - 65 + 10;
  }
  return -1;
}

function valueOf(c){
  var result;
  if (c < 128) {
    return $clinit_Character$BoxedValues() , result = boxedValues[c] , !result && (result = boxedValues[c] = new Character(c)) , result;
  }
  return new Character(c);
}

defineClass(52, 1, {3:1, 52:1, 39:1}, Character);
_.compareTo_0 = function compareTo(c){
  return $compareTo_0(this, castTo(c, 52));
}
;
_.equals_0 = function equals_1(o){
  return instanceOf(o, 52) && castTo(o, 52).value_0 == this.value_0;
}
;
_.hashCode_0 = function hashCode_2(){
  return this.value_0;
}
;
_.toString_0 = function toString_5(){
  return String.fromCharCode(this.value_0);
}
;
_.value_0 = 0;
var Ljava_lang_Character_2_classLit = createForClass('java.lang', 'Character', 52);
function $clinit_Character$BoxedValues(){
  $clinit_Character$BoxedValues = emptyMethod;
  boxedValues = initUnidimensionalArray(Ljava_lang_Character_2_classLit, $intern_0, 52, 128, 0, 1);
}

var boxedValues;
function ClassCastException(){
  RuntimeException_0.call(this, null);
}

defineClass(181, 14, $intern_2, ClassCastException);
var Ljava_lang_ClassCastException_2_classLit = createForClass('java.lang', 'ClassCastException', 181);
function $isInstance_2(instance){
  if (instance == null) {
    return false;
  }
  return instance.$implements__java_lang_Cloneable || Array.isArray(instance);
}

function $compareTo_2(this$static, other){
  return this$static.ordinal_0 - other.ordinal_0;
}

function Enum(name_0, ordinal){
  this.name_0 = name_0;
  this.ordinal_0 = ordinal;
}

defineClass(44, 1, {3:1, 39:1, 44:1});
_.compareTo_0 = function compareTo_1(other){
  return $compareTo_2(this, castTo(other, 44));
}
;
_.compareTo = function compareTo_0(other){
  return this.ordinal_0 - other.ordinal_0;
}
;
_.equals = function equals_2(other){
  return this === other;
}
;
_.equals_0 = function(other){
  return this.equals(other);
}
;
_.hashCode = function hashCode_3(){
  return getObjectIdentityHashCode(this);
}
;
_.hashCode_0 = function(){
  return this.hashCode();
}
;
_.name = function name_2(){
  return this.name_0 != null?this.name_0:'' + this.ordinal_0;
}
;
_.ordinal = function ordinal_0(){
  return this.ordinal_0;
}
;
_.toString = function toString_7(){
  return this.name_0 != null?this.name_0:'' + this.ordinal_0;
}
;
_.toString_0 = function(){
  return this.toString();
}
;
_.ordinal_0 = 0;
var Ljava_lang_Enum_2_classLit = createForClass('java.lang', 'Enum', 44);
function IllegalArgumentException(message){
  RuntimeException_0.call(this, message);
}

defineClass(61, 14, $intern_2, IllegalArgumentException);
var Ljava_lang_IllegalArgumentException_2_classLit = createForClass('java.lang', 'IllegalArgumentException', 61);
function IllegalStateException(){
  RuntimeException.call(this);
}

function IllegalStateException_0(){
  RuntimeException_0.call(this, "Stream already terminated, can't be modified or used");
}

defineClass(119, 14, $intern_2, IllegalStateException, IllegalStateException_0);
var Ljava_lang_IllegalStateException_2_classLit = createForClass('java.lang', 'IllegalStateException', 119);
function $compareTo_3(this$static, b){
  return compare_2(this$static.value_0, b.value_0);
}

function Integer(value_0){
  this.value_0 = value_0;
}

function compare_2(x_0, y_0){
  return x_0 < y_0?-1:x_0 > y_0?1:0;
}

function valueOf_0(i){
  var rebase, result;
  if (i > -129 && i < 128) {
    return $clinit_Integer$BoxedValues() , rebase = i + 128 , result = boxedValues_0[rebase] , !result && (result = boxedValues_0[rebase] = new Integer(i)) , result;
  }
  return new Integer(i);
}

defineClass(45, 117, {3:1, 39:1, 45:1, 117:1}, Integer);
_.compareTo_0 = function compareTo_2(b){
  return $compareTo_3(this, castTo(b, 45));
}
;
_.equals_0 = function equals_3(o){
  return instanceOf(o, 45) && castTo(o, 45).value_0 == this.value_0;
}
;
_.hashCode_0 = function hashCode_4(){
  return this.value_0;
}
;
_.toString_0 = function toString_8(){
  return '' + this.value_0;
}
;
_.value_0 = 0;
var Ljava_lang_Integer_2_classLit = createForClass('java.lang', 'Integer', 45);
function $clinit_Integer$BoxedValues(){
  $clinit_Integer$BoxedValues = emptyMethod;
  boxedValues_0 = initUnidimensionalArray(Ljava_lang_Integer_2_classLit, $intern_0, 45, 256, 0, 1);
}

var boxedValues_0;
defineClass(369, 1, {});
function NumberFormatException(message){
  IllegalArgumentException.call(this, message);
}

defineClass(56, 61, {3:1, 17:1, 56:1, 14:1, 11:1}, NumberFormatException);
var Ljava_lang_NumberFormatException_2_classLit = createForClass('java.lang', 'NumberFormatException', 56);
function $append(this$static, x_0){
  this$static.string += String.fromCharCode(x_0);
  return this$static;
}

function $append_0(this$static, x_0){
  this$static.string += '' + x_0;
  return this$static;
}

function StringBuffer(){
  AbstractStringBuilder.call(this, '');
}

function StringBuffer_0(){
  AbstractStringBuilder.call(this, '');
}

function StringBuffer_1(s){
  AbstractStringBuilder.call(this, (checkCriticalNotNull(s) , s));
}

defineClass(55, 77, {115:1}, StringBuffer, StringBuffer_0, StringBuffer_1);
var Ljava_lang_StringBuffer_2_classLit = createForClass('java.lang', 'StringBuffer', 55);
function $append_1(this$static, x_0){
  this$static.string += '' + x_0;
  return this$static;
}

function $append_2(this$static, x_0, start_0, end){
  this$static.string += '' + (checkCriticalStringBounds(start_0, end, (x_0 == null?'null':x_0).length) , (x_0 == null?'null':x_0).substr(start_0, end - start_0));
  return this$static;
}

function $append_3(this$static, x_0){
  this$static.string += '' + x_0;
  return this$static;
}

function $append_4(this$static, x_0){
  this$static.string += '' + x_0;
  return this$static;
}

function StringBuilder(){
  AbstractStringBuilder.call(this, '');
}

function StringBuilder_0(s){
  AbstractStringBuilder.call(this, (checkCriticalNotNull(s) , s));
}

defineClass(116, 77, {115:1}, StringBuilder, StringBuilder_0);
var Ljava_lang_StringBuilder_2_classLit = createForClass('java.lang', 'StringBuilder', 116);
defineClass(371, 1, {});
function UnsupportedOperationException(){
  RuntimeException.call(this);
}

function UnsupportedOperationException_0(message){
  RuntimeException_0.call(this, message);
}

defineClass(34, 14, $intern_2, UnsupportedOperationException, UnsupportedOperationException_0);
var Ljava_lang_UnsupportedOperationException_2_classLit = createForClass('java.lang', 'UnsupportedOperationException', 34);
function $containsEntry(this$static, entry){
  var key, ourValue, value_0;
  key = entry.getKey();
  value_0 = entry.getValue();
  ourValue = this$static.get(key);
  if (!(maskUndefined(value_0) === maskUndefined(ourValue) || value_0 != null && equals_Ljava_lang_Object__Z__devirtual$(value_0, ourValue))) {
    return false;
  }
  if (ourValue == null && !this$static.containsKey(key)) {
    return false;
  }
  return true;
}

function $implFindEntry(this$static, key, remove){
  var entry, iter, k;
  for (iter = this$static.entrySet().iterator_0(); iter.hasNext_0();) {
    entry = castTo(iter.next_1(), 13);
    k = entry.getKey();
    if (maskUndefined(key) === maskUndefined(k) || key != null && equals_Ljava_lang_Object__Z__devirtual$(key, k)) {
      if (remove) {
        entry = new AbstractMap$SimpleEntry(entry.getKey(), entry.getValue());
        iter.remove_0();
      }
      return entry;
    }
  }
  return null;
}

function $toString_2(this$static, o){
  return o === this$static?'(this Map)':o == null?'null':toString_3(o);
}

function getEntryValueOrNull(entry){
  return !entry?null:entry.getValue();
}

defineClass(291, 1, {43:1});
_.getOrDefault = function getOrDefault(key, defaultValue){
  var currentValue;
  return currentValue = this.get(key) , currentValue == null && !this.containsKey(key)?defaultValue:currentValue;
}
;
_.putIfAbsent = function putIfAbsent(key, value_0){
  var currentValue;
  return currentValue = this.get(key) , currentValue != null?currentValue:this.put(key, value_0);
}
;
_.replace = function replace(key, value_0){
  return this.containsKey(key)?this.put(key, value_0):null;
}
;
_.clear = function clear_2(){
  this.entrySet().clear();
}
;
_.containsEntry = function containsEntry(entry){
  return $containsEntry(this, entry);
}
;
_.containsKey = function containsKey(key){
  return !!$implFindEntry(this, key, false);
}
;
_.containsValue = function containsValue(value_0){
  var entry, entry$iterator, v;
  for (entry$iterator = this.entrySet().iterator_0(); entry$iterator.hasNext_0();) {
    entry = castTo(entry$iterator.next_1(), 13);
    v = entry.getValue();
    if (maskUndefined(value_0) === maskUndefined(v) || value_0 != null && equals_Ljava_lang_Object__Z__devirtual$(value_0, v)) {
      return true;
    }
  }
  return false;
}
;
_.equals_0 = function equals_4(obj){
  var entry, entry$iterator, otherMap;
  if (obj === this) {
    return true;
  }
  if (!instanceOf(obj, 43)) {
    return false;
  }
  otherMap = castTo(obj, 43);
  if (this.size() != otherMap.size()) {
    return false;
  }
  for (entry$iterator = otherMap.entrySet().iterator_0(); entry$iterator.hasNext_0();) {
    entry = castTo(entry$iterator.next_1(), 13);
    if (!this.containsEntry(entry)) {
      return false;
    }
  }
  return true;
}
;
_.get = function get_0(key){
  return getEntryValueOrNull($implFindEntry(this, key, false));
}
;
_.hashCode_0 = function hashCode_5(){
  return hashCode_9(this.entrySet());
}
;
_.isEmpty = function isEmpty_2(){
  return this.size() == 0;
}
;
_.keySet = function keySet(){
  return new AbstractMap$1(this);
}
;
_.put = function put(key, value_0){
  throw toJs(new UnsupportedOperationException_0('Put not supported on this map'));
}
;
_.putAll = function putAll(map_0){
  var e, e$iterator;
  checkCriticalNotNull(map_0);
  for (e$iterator = map_0.entrySet().iterator_0(); e$iterator.hasNext_0();) {
    e = castTo(e$iterator.next_1(), 13);
    this.put(e.getKey(), e.getValue());
  }
}
;
_.remove = function remove_3(key){
  return getEntryValueOrNull($implFindEntry(this, key, true));
}
;
_.size = function size_3(){
  return this.entrySet().size();
}
;
_.toString_0 = function toString_9(){
  var entry, entry$iterator, joiner;
  joiner = new StringJoiner_0('{', '}');
  for (entry$iterator = this.entrySet().iterator_0(); entry$iterator.hasNext_0();) {
    entry = castTo(entry$iterator.next_1(), 13);
    $add_4(joiner, $toString_2(this, entry.getKey()) + '=' + $toString_2(this, entry.getValue()));
  }
  return !joiner.builder?joiner.emptyValue:joiner.suffix.length == 0?joiner.builder.string:joiner.builder.string + ('' + joiner.suffix);
}
;
_.values = function values_0(){
  return new AbstractMap$2(this);
}
;
var Ljava_util_AbstractMap_2_classLit = createForClass('java.util', 'AbstractMap', 291);
function $containsKey(this$static, key){
  return instanceOfString(key)?key == null?!!$getEntry(this$static.hashCodeMap, null):$contains_1(this$static.stringMap, key):!!$getEntry(this$static.hashCodeMap, key);
}

function $containsValue(this$static, value_0, entries){
  var entry, entry$iterator;
  for (entry$iterator = entries.iterator_0(); entry$iterator.hasNext_0();) {
    entry = castTo(entry$iterator.next_1(), 13);
    if (this$static.equals_1(value_0, entry.getValue())) {
      return true;
    }
  }
  return false;
}

function $get(this$static, key){
  return instanceOfString(key)?$getStringValue(this$static, key):getEntryValueOrNull($getEntry(this$static.hashCodeMap, key));
}

function $getStringValue(this$static, key){
  return key == null?getEntryValueOrNull($getEntry(this$static.hashCodeMap, null)):$get_1(this$static.stringMap, key);
}

function $put(this$static, key, value_0){
  return instanceOfString(key)?$putStringValue(this$static, key, value_0):$put_0(this$static.hashCodeMap, key, value_0);
}

function $putStringValue(this$static, key, value_0){
  return key == null?$put_0(this$static.hashCodeMap, null, value_0):$put_1(this$static.stringMap, key, value_0);
}

function $remove(this$static, key){
  return instanceOfString(key)?$removeStringValue(this$static, key):$remove_3(this$static.hashCodeMap, key);
}

function $removeStringValue(this$static, key){
  return key == null?$remove_3(this$static.hashCodeMap, null):$remove_4(this$static.stringMap, key);
}

function $reset(this$static){
  this$static.hashCodeMap = new InternalHashCodeMap(this$static);
  this$static.stringMap = new InternalStringMap(this$static);
  ++this$static.modCount;
}

function $size_0(this$static){
  return this$static.hashCodeMap.size_0 + this$static.stringMap.size_0;
}

defineClass(122, 291, {43:1});
_.clear = function clear_3(){
  $reset(this);
}
;
_.containsKey = function containsKey_0(key){
  return $containsKey(this, key);
}
;
_.containsValue = function containsValue_0(value_0){
  return $containsValue(this, value_0, this.stringMap) || $containsValue(this, value_0, this.hashCodeMap);
}
;
_.entrySet = function entrySet(){
  return new AbstractHashMap$EntrySet(this);
}
;
_.get = function get_1(key){
  return $get(this, key);
}
;
_.put = function put_0(key, value_0){
  return $put(this, key, value_0);
}
;
_.remove = function remove_4(key){
  return $remove(this, key);
}
;
_.size = function size_4(){
  return $size_0(this);
}
;
_.modCount = 0;
var Ljava_util_AbstractHashMap_2_classLit = createForClass('java.util', 'AbstractHashMap', 122);
function $contains(this$static, o){
  if (instanceOf(o, 13)) {
    return $containsEntry(this$static.this$01, castTo(o, 13));
  }
  return false;
}

function AbstractHashMap$EntrySet(this$0){
  this.this$01 = this$0;
}

defineClass(195, 292, $intern_4, AbstractHashMap$EntrySet);
_.clear = function clear_4(){
  this.this$01.clear();
}
;
_.contains = function contains_2(o){
  return $contains(this, o);
}
;
_.iterator_0 = function iterator_5(){
  return new AbstractHashMap$EntrySetIterator(this.this$01);
}
;
_.remove = function remove_5(entry){
  var key;
  if ($contains(this, entry)) {
    key = castTo(entry, 13).getKey();
    this.this$01.remove(key);
    return true;
  }
  return false;
}
;
_.size = function size_5(){
  return this.this$01.size();
}
;
var Ljava_util_AbstractHashMap$EntrySet_2_classLit = createForClass('java.util', 'AbstractHashMap/EntrySet', 195);
function $computeHasNext(this$static){
  if (this$static.current.hasNext_0()) {
    return true;
  }
  if (this$static.current != this$static.stringMapEntries) {
    return false;
  }
  this$static.current = new InternalHashCodeMap$1(this$static.this$01.hashCodeMap);
  return this$static.current.hasNext_0();
}

function AbstractHashMap$EntrySetIterator(this$0){
  this.this$01 = this$0;
  this.stringMapEntries = new InternalStringMap$1(this.this$01.stringMap);
  this.current = this.stringMapEntries;
  this.hasNext = $computeHasNext(this);
  this.lastModCount = this.this$01.modCount;
}

defineClass(196, 1, {}, AbstractHashMap$EntrySetIterator);
_.forEachRemaining = function forEachRemaining_0(consumer){
  $forEachRemaining(this, consumer);
}
;
_.next_1 = function next_1(){
  var rv;
  return checkCriticalConcurrentModification(this.this$01.modCount, this.lastModCount) , checkCriticalElement(this.hasNext) , this.last = this.current , rv = castTo(this.current.next_1(), 13) , this.hasNext = $computeHasNext(this) , rv;
}
;
_.hasNext_0 = function hasNext_0(){
  return this.hasNext;
}
;
_.remove_0 = function remove_6(){
  checkCriticalState(!!this.last);
  checkCriticalConcurrentModification(this.this$01.modCount, this.lastModCount);
  this.last.remove_0();
  this.last = null;
  this.hasNext = $computeHasNext(this);
  this.lastModCount = this.this$01.modCount;
}
;
_.hasNext = false;
_.lastModCount = 0;
var Ljava_util_AbstractHashMap$EntrySetIterator_2_classLit = createForClass('java.util', 'AbstractHashMap/EntrySetIterator', 196);
function $sort_0(this$static, c){
  var a, i;
  a = this$static.toArray();
  mergeSort(a, 0, a.length, c);
  for (i = 0; i < a.length; i++) {
    this$static.setAtIndex(i, a[i]);
  }
}

function $indexOf(this$static, toFind){
  var i, n;
  for (i = 0 , n = this$static.size(); i < n; ++i) {
    if (equals_10(toFind, this$static.getAtIndex(i))) {
      return i;
    }
  }
  return -1;
}

defineClass(289, 288, $intern_10);
_.sort_1 = function sort_1(c){
  $sort_0(this, c);
}
;
_.spliterator_0 = function spliterator_2(){
  return new Spliterators$IteratorSpliterator(this, 16);
}
;
_.addAtIndex = function add_2(index_0, element){
  throw toJs(new UnsupportedOperationException_0('Add not supported on this list'));
}
;
_.add = function add_3(obj){
  this.addAtIndex(this.size(), obj);
  return true;
}
;
_.addAllAtIndex = function addAll_1(index_0, c){
  var changed, e, e$iterator;
  checkCriticalNotNull(c);
  changed = false;
  for (e$iterator = c.iterator_0(); e$iterator.hasNext_0();) {
    e = e$iterator.next_1();
    this.addAtIndex(index_0++, e);
    changed = true;
  }
  return changed;
}
;
_.clear = function clear_5(){
  this.removeRange_0(0, this.size());
}
;
_.equals_0 = function equals_5(o){
  var elem, elem$iterator, elemOther, iterOther, other;
  if (o === this) {
    return true;
  }
  if (!instanceOf(o, 18)) {
    return false;
  }
  other = castTo(o, 18);
  if (this.size() != other.size()) {
    return false;
  }
  iterOther = other.iterator_0();
  for (elem$iterator = this.iterator_0(); elem$iterator.hasNext_0();) {
    elem = elem$iterator.next_1();
    elemOther = iterOther.next_1();
    if (!(maskUndefined(elem) === maskUndefined(elemOther) || elem != null && equals_Ljava_lang_Object__Z__devirtual$(elem, elemOther))) {
      return false;
    }
  }
  return true;
}
;
_.hashCode_0 = function hashCode_6(){
  return hashCode_10(this);
}
;
_.indexOf = function indexOf(toFind){
  return $indexOf(this, toFind);
}
;
_.iterator_0 = function iterator_6(){
  return new AbstractList$IteratorImpl(this);
}
;
_.lastIndexOf = function lastIndexOf(toFind){
  var i;
  for (i = this.size() - 1; i > -1; --i) {
    if (equals_10(toFind, this.getAtIndex(i))) {
      return i;
    }
  }
  return -1;
}
;
_.listIterator = function listIterator(from){
  return new AbstractList$ListIteratorImpl(this, from);
}
;
_.removeAtIndex = function remove_7(index_0){
  throw toJs(new UnsupportedOperationException_0('Remove not supported on this list'));
}
;
_.removeRange_0 = function removeRange(fromIndex, endIndex){
  var i, iter;
  iter = this.listIterator(fromIndex);
  for (i = fromIndex; i < endIndex; ++i) {
    iter.next_1();
    iter.remove_0();
  }
}
;
_.setAtIndex = function set_1(index_0, o){
  throw toJs(new UnsupportedOperationException_0('Set not supported on this list'));
}
;
_.subList = function subList(fromIndex, toIndex){
  return new AbstractList$SubList(this, fromIndex, toIndex);
}
;
var Ljava_util_AbstractList_2_classLit = createForClass('java.util', 'AbstractList', 289);
function $hasNext_0(this$static){
  return this$static.i < this$static.this$01_0.size();
}

function $next_0(this$static){
  checkCriticalElement(this$static.i < this$static.this$01_0.size());
  return this$static.this$01_0.getAtIndex(this$static.last = this$static.i++);
}

function $remove_0(this$static){
  checkCriticalState(this$static.last != -1);
  this$static.this$01_0.removeAtIndex(this$static.last);
  this$static.i = this$static.last;
  this$static.last = -1;
}

function AbstractList$IteratorImpl(this$0){
  this.this$01_0 = this$0;
}

defineClass(148, 1, {}, AbstractList$IteratorImpl);
_.forEachRemaining = function forEachRemaining_1(consumer){
  $forEachRemaining(this, consumer);
}
;
_.hasNext_0 = function hasNext_1(){
  return $hasNext_0(this);
}
;
_.next_1 = function next_2(){
  return $next_0(this);
}
;
_.remove_0 = function remove_8(){
  $remove_0(this);
}
;
_.i = 0;
_.last = -1;
var Ljava_util_AbstractList$IteratorImpl_2_classLit = createForClass('java.util', 'AbstractList/IteratorImpl', 148);
function AbstractList$ListIteratorImpl(this$0, start_0){
  this.this$01 = this$0;
  AbstractList$IteratorImpl.call(this, this$0);
  checkCriticalPositionIndex(start_0, this$0.size());
  this.i = start_0;
}

defineClass(149, 148, {}, AbstractList$ListIteratorImpl);
_.remove_0 = function remove_9(){
  $remove_0(this);
}
;
_.add_0 = function add_4(o){
  this.this$01.addAtIndex(this.i, o);
  ++this.i;
  this.last = -1;
}
;
_.set_0 = function set_2(o){
  checkCriticalState(this.last != -1);
  this.this$01.setAtIndex(this.last, o);
}
;
var Ljava_util_AbstractList$ListIteratorImpl_2_classLit = createForClass('java.util', 'AbstractList/ListIteratorImpl', 149);
function AbstractList$SubList(wrapped, fromIndex, toIndex){
  checkCriticalPositionIndexes(fromIndex, toIndex, wrapped.size());
  this.wrapped = wrapped;
  this.fromIndex = fromIndex;
  this.size_0 = toIndex - fromIndex;
}

defineClass(150, 289, $intern_10, AbstractList$SubList);
_.addAtIndex = function add_5(index_0, element){
  checkCriticalPositionIndex(index_0, this.size_0);
  this.wrapped.addAtIndex(this.fromIndex + index_0, element);
  ++this.size_0;
}
;
_.getAtIndex = function get_2(index_0){
  checkCriticalElementIndex(index_0, this.size_0);
  return this.wrapped.getAtIndex(this.fromIndex + index_0);
}
;
_.removeAtIndex = function remove_10(index_0){
  var result;
  checkCriticalElementIndex(index_0, this.size_0);
  result = this.wrapped.removeAtIndex(this.fromIndex + index_0);
  --this.size_0;
  return result;
}
;
_.setAtIndex = function set_3(index_0, element){
  checkCriticalElementIndex(index_0, this.size_0);
  return this.wrapped.setAtIndex(this.fromIndex + index_0, element);
}
;
_.size = function size_6(){
  return this.size_0;
}
;
_.fromIndex = 0;
_.size_0 = 0;
var Ljava_util_AbstractList$SubList_2_classLit = createForClass('java.util', 'AbstractList/SubList', 150);
function AbstractMap$1(this$0){
  this.this$01 = this$0;
}

defineClass(36, 292, $intern_4, AbstractMap$1);
_.clear = function clear_6(){
  this.this$01.clear();
}
;
_.contains = function contains_3(key){
  return this.this$01.containsKey(key);
}
;
_.iterator_0 = function iterator_7(){
  var outerIter;
  return outerIter = this.this$01.entrySet().iterator_0() , new AbstractMap$1$1(outerIter);
}
;
_.remove = function remove_11(key){
  if (this.this$01.containsKey(key)) {
    this.this$01.remove(key);
    return true;
  }
  return false;
}
;
_.size = function size_7(){
  return this.this$01.size();
}
;
var Ljava_util_AbstractMap$1_2_classLit = createForClass('java.util', 'AbstractMap/1', 36);
function AbstractMap$1$1(val$outerIter){
  this.val$outerIter2 = val$outerIter;
}

defineClass(47, 1, {}, AbstractMap$1$1);
_.forEachRemaining = function forEachRemaining_2(consumer){
  $forEachRemaining(this, consumer);
}
;
_.hasNext_0 = function hasNext_2(){
  return this.val$outerIter2.hasNext_0();
}
;
_.next_1 = function next_3(){
  var entry;
  return entry = castTo(this.val$outerIter2.next_1(), 13) , entry.getKey();
}
;
_.remove_0 = function remove_12(){
  this.val$outerIter2.remove_0();
}
;
var Ljava_util_AbstractMap$1$1_2_classLit = createForClass('java.util', 'AbstractMap/1/1', 47);
function AbstractMap$2(this$0){
  this.this$01 = this$0;
}

defineClass(152, 288, {19:1}, AbstractMap$2);
_.clear = function clear_7(){
  this.this$01.clear();
}
;
_.contains = function contains_4(value_0){
  return this.this$01.containsValue(value_0);
}
;
_.iterator_0 = function iterator_8(){
  var outerIter;
  return outerIter = this.this$01.entrySet().iterator_0() , new AbstractMap$2$1(outerIter);
}
;
_.size = function size_8(){
  return this.this$01.size();
}
;
var Ljava_util_AbstractMap$2_2_classLit = createForClass('java.util', 'AbstractMap/2', 152);
function AbstractMap$2$1(val$outerIter){
  this.val$outerIter2 = val$outerIter;
}

defineClass(153, 1, {}, AbstractMap$2$1);
_.forEachRemaining = function forEachRemaining_3(consumer){
  $forEachRemaining(this, consumer);
}
;
_.hasNext_0 = function hasNext_3(){
  return this.val$outerIter2.hasNext_0();
}
;
_.next_1 = function next_4(){
  var entry;
  return entry = castTo(this.val$outerIter2.next_1(), 13) , entry.getValue();
}
;
_.remove_0 = function remove_13(){
  this.val$outerIter2.remove_0();
}
;
var Ljava_util_AbstractMap$2$1_2_classLit = createForClass('java.util', 'AbstractMap/2/1', 153);
function $setValue(this$static, value_0){
  var oldValue;
  oldValue = this$static.value_0;
  this$static.value_0 = value_0;
  return oldValue;
}

defineClass(82, 1, {82:1, 13:1});
_.equals_0 = function equals_6(other){
  var entry;
  if (!instanceOf(other, 13)) {
    return false;
  }
  entry = castTo(other, 13);
  return equals_10(this.key, entry.getKey()) && equals_10(this.value_0, entry.getValue());
}
;
_.getKey = function getKey(){
  return this.key;
}
;
_.getValue = function getValue(){
  return this.value_0;
}
;
_.hashCode_0 = function hashCode_7(){
  return hashCode_11(this.key) ^ hashCode_11(this.value_0);
}
;
_.setValue = function setValue(value_0){
  return $setValue(this, value_0);
}
;
_.toString_0 = function toString_10(){
  return this.key + '=' + this.value_0;
}
;
var Ljava_util_AbstractMap$AbstractEntry_2_classLit = createForClass('java.util', 'AbstractMap/AbstractEntry', 82);
function AbstractMap$SimpleEntry(key, value_0){
  this.key = key;
  this.value_0 = value_0;
}

defineClass(57, 82, {82:1, 57:1, 13:1}, AbstractMap$SimpleEntry);
var Ljava_util_AbstractMap$SimpleEntry_2_classLit = createForClass('java.util', 'AbstractMap/SimpleEntry', 57);
defineClass(296, 1, {13:1});
_.equals_0 = function equals_7(other){
  var entry;
  if (!instanceOf(other, 13)) {
    return false;
  }
  entry = castTo(other, 13);
  return equals_10(this.val$entry2.value[0], entry.getKey()) && equals_10($getValue(this), entry.getValue());
}
;
_.hashCode_0 = function hashCode_8(){
  return hashCode_11(this.val$entry2.value[0]) ^ hashCode_11($getValue(this));
}
;
_.toString_0 = function toString_11(){
  return this.val$entry2.value[0] + '=' + $getValue(this);
}
;
var Ljava_util_AbstractMapEntry_2_classLit = createForClass('java.util', 'AbstractMapEntry', 296);
function $containsEntry_0(this$static, entry){
  var key, lookupEntry;
  key = entry.getKey();
  lookupEntry = $getEntry_0(this$static, key);
  return !!lookupEntry && equals_10(lookupEntry.value_0, entry.getValue());
}

function $containsKey_0(this$static, k){
  var key;
  key = k;
  return !!$getEntry_0(this$static, key);
}

defineClass(297, 291, {43:1});
_.containsEntry = function containsEntry_0(entry){
  return $containsEntry_0(this, entry);
}
;
_.containsKey = function containsKey_1(k){
  return $containsKey_0(this, k);
}
;
_.entrySet = function entrySet_0(){
  return new AbstractNavigableMap$EntrySet(this);
}
;
_.get = function get_3(k){
  var key;
  key = k;
  return getEntryValueOrNull($getEntry_0(this, key));
}
;
_.keySet = function keySet_0(){
  return new AbstractNavigableMap$NavigableKeySet(this);
}
;
var Ljava_util_AbstractNavigableMap_2_classLit = createForClass('java.util', 'AbstractNavigableMap', 297);
function AbstractNavigableMap$EntrySet(this$0){
  this.this$01_0 = this$0;
}

defineClass(159, 292, $intern_4, AbstractNavigableMap$EntrySet);
_.contains = function contains_5(o){
  return instanceOf(o, 13) && $containsEntry_0(this.this$01_0, castTo(o, 13));
}
;
_.iterator_0 = function iterator_9(){
  return new TreeMap$EntryIterator(this.this$01_0);
}
;
_.remove = function remove_14(o){
  var entry;
  if (instanceOf(o, 13)) {
    entry = castTo(o, 13);
    return $removeEntry(this.this$01_0, entry);
  }
  return false;
}
;
_.size = function size_9(){
  return this.this$01_0.size_0;
}
;
var Ljava_util_AbstractNavigableMap$EntrySet_2_classLit = createForClass('java.util', 'AbstractNavigableMap/EntrySet', 159);
function AbstractNavigableMap$NavigableKeySet(map_0){
  this.map_0 = map_0;
}

defineClass(105, 292, $intern_4, AbstractNavigableMap$NavigableKeySet);
_.spliterator_0 = function spliterator_3(){
  return new SortedSet$1(this);
}
;
_.clear = function clear_8(){
  $clear_0(this.map_0);
}
;
_.contains = function contains_6(o){
  return $containsKey_0(this.map_0, o);
}
;
_.iterator_0 = function iterator_10(){
  var entryIterator;
  return entryIterator = new TreeMap$EntryIterator((new TreeMap$EntrySet(this.map_0)).this$01_0) , new AbstractNavigableMap$NavigableKeySet$1(entryIterator);
}
;
_.remove = function remove_15(o){
  if ($containsKey_0(this.map_0, o)) {
    $remove_8(this.map_0, o);
    return true;
  }
  return false;
}
;
_.size = function size_10(){
  return this.map_0.size_0;
}
;
var Ljava_util_AbstractNavigableMap$NavigableKeySet_2_classLit = createForClass('java.util', 'AbstractNavigableMap/NavigableKeySet', 105);
function AbstractNavigableMap$NavigableKeySet$1(val$entryIterator){
  this.val$entryIterator2 = val$entryIterator;
}

defineClass(106, 1, {}, AbstractNavigableMap$NavigableKeySet$1);
_.forEachRemaining = function forEachRemaining_4(consumer){
  $forEachRemaining(this, consumer);
}
;
_.hasNext_0 = function hasNext_4(){
  return $hasNext_0(this.val$entryIterator2.iter);
}
;
_.next_1 = function next_5(){
  var entry;
  return entry = $next_3(this.val$entryIterator2) , entry.getKey();
}
;
_.remove_0 = function remove_16(){
  $remove_9(this.val$entryIterator2);
}
;
var Ljava_util_AbstractNavigableMap$NavigableKeySet$1_2_classLit = createForClass('java.util', 'AbstractNavigableMap/NavigableKeySet/1', 106);
function $add(this$static, index_0, element){
  var iter;
  iter = this$static.listIterator(index_0);
  iter.add_0(element);
}

defineClass(299, 289, $intern_10);
_.addAtIndex = function add_6(index_0, element){
  $add(this, index_0, element);
}
;
_.addAllAtIndex = function addAll_2(index_0, c){
  var e, e$iterator, iter, modified;
  checkCriticalNotNull(c);
  modified = false;
  iter = this.listIterator(index_0);
  for (e$iterator = c.iterator_0(); e$iterator.hasNext_0();) {
    e = e$iterator.next_1();
    iter.add_0(e);
    modified = true;
  }
  return modified;
}
;
_.getAtIndex = function get_4(index_0){
  var iter;
  iter = this.listIterator(index_0);
  try {
    return iter.next_1();
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 66)) {
      throw toJs(new IndexOutOfBoundsException("Can't get element " + index_0));
    }
     else 
      throw toJs($e0);
  }
}
;
_.iterator_0 = function iterator_11(){
  return this.listIterator(0);
}
;
_.removeAtIndex = function remove_17(index_0){
  var iter, old;
  iter = this.listIterator(index_0);
  try {
    old = iter.next_1();
    iter.remove_0();
    return old;
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 66)) {
      throw toJs(new IndexOutOfBoundsException("Can't remove element " + index_0));
    }
     else 
      throw toJs($e0);
  }
}
;
_.setAtIndex = function set_4(index_0, element){
  var iter, old;
  iter = this.listIterator(index_0);
  try {
    old = iter.next_1();
    iter.set_0(element);
    return old;
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 66)) {
      throw toJs(new IndexOutOfBoundsException("Can't set element " + index_0));
    }
     else 
      throw toJs($e0);
  }
}
;
var Ljava_util_AbstractSequentialList_2_classLit = createForClass('java.util', 'AbstractSequentialList', 299);
function $$init(this$static){
  this$static.array = initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, 0, 5, 1);
}

function $add_0(this$static, index_0, o){
  checkCriticalPositionIndex(index_0, this$static.array.length);
  insertTo(this$static.array, index_0, o);
}

function $add_1(this$static, o){
  push_1(this$static.array, o);
  return true;
}

function $addAll_0(this$static, index_0, c){
  var cArray, len;
  checkCriticalPositionIndex(index_0, this$static.array.length);
  cArray = c.toArray();
  len = cArray.length;
  if (len == 0) {
    return false;
  }
  insertTo_0(this$static.array, index_0, cArray);
  return true;
}

function $addAll_1(this$static, c){
  var cArray, len;
  cArray = c.toArray();
  len = cArray.length;
  if (len == 0) {
    return false;
  }
  insertTo_0(this$static.array, this$static.array.length, cArray);
  return true;
}

function $get_0(this$static, index_0){
  checkCriticalElementIndex(index_0, this$static.array.length);
  return this$static.array[index_0];
}

function $indexOf_0(this$static, o, index_0){
  for (; index_0 < this$static.array.length; ++index_0) {
    if (equals_10(o, this$static.array[index_0])) {
      return index_0;
    }
  }
  return -1;
}

function $lastIndexOf_0(this$static, o){
  return $lastIndexOf_1(this$static, o, this$static.array.length - 1);
}

function $lastIndexOf_1(this$static, o, index_0){
  for (; index_0 >= 0; --index_0) {
    if (equals_10(o, this$static.array[index_0])) {
      return index_0;
    }
  }
  return -1;
}

function $remove_1(this$static, index_0){
  var previous;
  previous = (checkCriticalElementIndex(index_0, this$static.array.length) , this$static.array[index_0]);
  removeFrom(this$static.array, index_0, 1);
  return previous;
}

function $removeRange(this$static, fromIndex, endIndex){
  var count;
  checkCriticalPositionIndexes(fromIndex, endIndex, this$static.array.length);
  count = endIndex - fromIndex;
  removeFrom(this$static.array, fromIndex, count);
}

function $set(this$static, index_0, o){
  var previous;
  previous = (checkCriticalElementIndex(index_0, this$static.array.length) , this$static.array[index_0]);
  this$static.array[index_0] = o;
  return previous;
}

function $sort(this$static, c){
  sort_3(this$static.array, this$static.array.length, c);
}

function $toArray_0(this$static, out){
  var i, size_0;
  size_0 = this$static.array.length;
  out.length < size_0 && (out = stampJavaTypeInfo_1(new Array(size_0), out));
  for (i = 0; i < size_0; ++i) {
    setCheck(out, i, this$static.array[i]);
  }
  out.length > size_0 && setCheck(out, size_0, null);
  return out;
}

function ArrayList(){
  $$init(this);
}

function ArrayList_0(c){
  $$init(this);
  insertTo_0(this.array, 0, clone(c.array));
}

defineClass(9, 289, $intern_11, ArrayList, ArrayList_0);
_.addAtIndex = function add_7(index_0, o){
  $add_0(this, index_0, o);
}
;
_.add = function add_8(o){
  return $add_1(this, o);
}
;
_.addAllAtIndex = function addAll_3(index_0, c){
  return $addAll_0(this, index_0, c);
}
;
_.addAll = function addAll_4(c){
  return $addAll_1(this, c);
}
;
_.clear = function clear_9(){
  this.array.length = 0;
}
;
_.contains = function contains_7(o){
  return $indexOf_0(this, o, 0) != -1;
}
;
_.getAtIndex = function get_5(index_0){
  return $get_0(this, index_0);
}
;
_.indexOf = function indexOf_0(o){
  return $indexOf_0(this, o, 0);
}
;
_.isEmpty = function isEmpty_3(){
  return this.array.length == 0;
}
;
_.iterator_0 = function iterator_12(){
  return new ArrayList$1(this);
}
;
_.lastIndexOf = function lastIndexOf_0(o){
  return $lastIndexOf_0(this, o);
}
;
_.removeAtIndex = function remove_18(index_0){
  return $remove_1(this, index_0);
}
;
_.remove = function remove_19(o){
  var i;
  i = $indexOf_0(this, o, 0);
  if (i == -1) {
    return false;
  }
  checkCriticalElementIndex(i, this.array.length);
  removeFrom(this.array, i, 1);
  return true;
}
;
_.removeRange_0 = function removeRange_0(fromIndex, endIndex){
  $removeRange(this, fromIndex, endIndex);
}
;
_.setAtIndex = function set_5(index_0, o){
  return $set(this, index_0, o);
}
;
_.size = function size_11(){
  return this.array.length;
}
;
_.sort_1 = function sort_2(c){
  $sort(this, c);
}
;
_.toArray = function toArray_1(){
  return clone(this.array);
}
;
_.toArray_0 = function toArray_2(out){
  return $toArray_0(this, out);
}
;
var Ljava_util_ArrayList_2_classLit = createForClass('java.util', 'ArrayList', 9);
function $next_1(this$static){
  checkCriticalElement(this$static.i < this$static.this$01.array.length);
  this$static.last = this$static.i++;
  return this$static.this$01.array[this$static.last];
}

function ArrayList$1(this$0){
  this.this$01 = this$0;
}

defineClass(16, 1, {}, ArrayList$1);
_.forEachRemaining = function forEachRemaining_5(consumer){
  $forEachRemaining(this, consumer);
}
;
_.hasNext_0 = function hasNext_5(){
  return this.i < this.this$01.array.length;
}
;
_.next_1 = function next_6(){
  return $next_1(this);
}
;
_.remove_0 = function remove_20(){
  checkCriticalState(this.last != -1);
  $remove_1(this.this$01, this.i = this.last);
  this.last = -1;
}
;
_.i = 0;
_.last = -1;
var Ljava_util_ArrayList$1_2_classLit = createForClass('java.util', 'ArrayList/1', 16);
function insertionSort(array, low, high, comp){
  var i, j, t;
  for (i = low + 1; i < high; ++i) {
    for (j = i; j > low && comp.compare(array[j - 1], array[j]) > 0; --j) {
      t = array[j];
      setCheck(array, j, array[j - 1]);
      setCheck(array, j - 1, t);
    }
  }
}

function merge(src_0, srcLow, srcMid, srcHigh, dest, destLow, destHigh, comp){
  var topIdx;
  topIdx = srcMid;
  while (destLow < destHigh) {
    topIdx >= srcHigh || srcLow < srcMid && comp.compare(src_0[srcLow], src_0[topIdx]) <= 0?setCheck(dest, destLow++, src_0[srcLow++]):setCheck(dest, destLow++, src_0[topIdx++]);
  }
}

function mergeSort(x_0, fromIndex, toIndex, comp){
  var temp;
  comp = ($clinit_Comparators() , !comp?INTERNAL_NATURAL_ORDER:comp);
  temp = x_0.slice(fromIndex, toIndex);
  mergeSort_0(temp, x_0, fromIndex, toIndex, -fromIndex, comp);
}

function mergeSort_0(temp, array, low, high, ofs, comp){
  var length_0, tempHigh, tempLow, tempMid;
  length_0 = high - low;
  if (length_0 < 7) {
    insertionSort(array, low, high, comp);
    return;
  }
  tempLow = low + ofs;
  tempHigh = high + ofs;
  tempMid = tempLow + (tempHigh - tempLow >> 1);
  mergeSort_0(array, temp, tempLow, tempMid, -ofs, comp);
  mergeSort_0(array, temp, tempMid, tempHigh, -ofs, comp);
  if (comp.compare(temp[tempMid - 1], temp[tempMid]) <= 0) {
    while (low < high) {
      setCheck(array, low++, temp[tempLow++]);
    }
    return;
  }
  merge(temp, tempLow, tempMid, tempHigh, array, low, high, comp);
}

function sort_3(x_0, toIndex, c){
  checkCriticalArrayBounds(toIndex, x_0.length);
  mergeSort(x_0, 0, toIndex, c);
}

function $toArray_1(this$static, out){
  var i, size_0;
  size_0 = this$static.array.length;
  out.length < size_0 && (out = stampJavaTypeInfo_1(new Array(size_0), out));
  for (i = 0; i < size_0; ++i) {
    setCheck(out, i, this$static.array[i]);
  }
  out.length > size_0 && setCheck(out, size_0, null);
  return out;
}

function Arrays$ArrayList(array){
  checkCriticalNotNull(array);
  this.array = array;
}

defineClass(26, 289, $intern_11, Arrays$ArrayList);
_.contains = function contains_8(o){
  return $indexOf(this, o) != -1;
}
;
_.getAtIndex = function get_6(index_0){
  return checkCriticalElementIndex(index_0, this.array.length) , this.array[index_0];
}
;
_.setAtIndex = function set_6(index_0, value_0){
  var was;
  was = (checkCriticalElementIndex(index_0, this.array.length) , this.array[index_0]);
  setCheck(this.array, index_0, value_0);
  return was;
}
;
_.size = function size_12(){
  return this.array.length;
}
;
_.sort_1 = function sort_4(c){
  sort_3(this.array, this.array.length, c);
}
;
_.toArray = function toArray_3(){
  return $toArray_1(this, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, this.array.length, 5, 1));
}
;
_.toArray_0 = function toArray_4(out){
  return $toArray_1(this, out);
}
;
var Ljava_util_Arrays$ArrayList_2_classLit = createForClass('java.util', 'Arrays/ArrayList', 26);
function binarySearch(sortedList, key, comparator){
  var compareResult, high, low, mid, midVal;
  comparator = ($clinit_Comparators() , !comparator?INTERNAL_NATURAL_ORDER:comparator);
  low = 0;
  high = sortedList.size() - 1;
  while (low <= high) {
    mid = low + (high - low >> 1);
    midVal = sortedList.getAtIndex(mid);
    compareResult = comparator.compare(midVal, key);
    if (compareResult < 0) {
      low = mid + 1;
    }
     else if (compareResult > 0) {
      high = mid - 1;
    }
     else {
      return mid;
    }
  }
  return -low - 1;
}

function disjoint(c1, c2){
  var iterating, o, o$iterator, testing;
  iterating = c1;
  testing = c2;
  if (!!c1 && !c2) {
    iterating = c2;
    testing = c1;
  }
  for (o$iterator = iterating.iterator_0(); o$iterator.hasNext_0();) {
    o = o$iterator.next_1();
    if (testing.contains(o)) {
      return false;
    }
  }
  return true;
}

function hashCode_9(collection){
  var e, e$iterator, hashCode;
  hashCode = 0;
  for (e$iterator = collection.iterator_0(); e$iterator.hasNext_0();) {
    e = e$iterator.next_1();
    hashCode = hashCode + (e != null?hashCode__I__devirtual$(e):0);
    hashCode = hashCode | 0;
  }
  return hashCode;
}

function hashCode_10(list){
  var e, e$iterator, hashCode;
  hashCode = 1;
  for (e$iterator = list.iterator_0(); e$iterator.hasNext_0();) {
    e = e$iterator.next_1();
    hashCode = 31 * hashCode + (e != null?hashCode__I__devirtual$(e):0);
    hashCode = hashCode | 0;
  }
  return hashCode;
}

function max_1(coll, comp){
  var entry, entry0, it, max_0, outerIter, t;
  comp = ($clinit_Comparators() , !comp?INTERNAL_NATURAL_ORDER:comp);
  it = (outerIter = (new AbstractMap$1(coll.map_0)).this$01.entrySet().iterator_0() , new AbstractMap$1$1(outerIter));
  max_0 = (entry0 = castTo(it.val$outerIter2.next_1(), 13) , entry0.getKey());
  while (it.val$outerIter2.hasNext_0()) {
    t = (entry = castTo(it.val$outerIter2.next_1(), 13) , entry.getKey());
    comp.compare(t, max_0) > 0 && (max_0 = t);
  }
  return max_0;
}

function $clinit_Comparators(){
  $clinit_Comparators = emptyMethod;
  INTERNAL_NATURAL_ORDER = new Comparators$NaturalOrderComparator;
}

var INTERNAL_NATURAL_ORDER;
function $compare(a, b){
  return checkCriticalNotNull(a) , compareTo_Ljava_lang_Object__I__devirtual$(a, (checkCriticalNotNull(b) , b));
}

function $compare_0(a, b){
  return $compare(castTo(a, 39), castTo(b, 39));
}

function Comparators$NaturalOrderComparator(){
}

defineClass(220, 1, $intern_9, Comparators$NaturalOrderComparator);
_.compare = function compare_3(a, b){
  return $compare_0(a, b);
}
;
_.equals_0 = function equals_8(other){
  return this === other;
}
;
var Ljava_util_Comparators$NaturalOrderComparator_2_classLit = createForClass('java.util', 'Comparators/NaturalOrderComparator', 220);
function ConcurrentModificationException(){
  RuntimeException.call(this);
}

defineClass(267, 14, $intern_2, ConcurrentModificationException);
var Ljava_util_ConcurrentModificationException_2_classLit = createForClass('java.util', 'ConcurrentModificationException', 267);
function EmptyStackException(){
  RuntimeException.call(this);
}

defineClass(164, 14, $intern_2, EmptyStackException);
var Ljava_util_EmptyStackException_2_classLit = createForClass('java.util', 'EmptyStackException', 164);
function HashMap(){
  $reset(this);
}

function HashMap_0(ignored){
  checkCriticalArgument(ignored >= 0, 'Negative initial capacity');
  checkCriticalArgument(true, 'Non-positive load factor');
  $reset(this);
}

defineClass(24, 122, $intern_12, HashMap, HashMap_0);
_.equals_1 = function equals_9(value1, value2){
  return maskUndefined(value1) === maskUndefined(value2) || value1 != null && equals_Ljava_lang_Object__Z__devirtual$(value1, value2);
}
;
_.getHashCode = function getHashCode(key){
  var hashCode;
  if (key == null) {
    return 0;
  }
  hashCode = hashCode__I__devirtual$(key);
  return hashCode | 0;
}
;
var Ljava_util_HashMap_2_classLit = createForClass('java.util', 'HashMap', 24);
function $add_2(this$static, o){
  var old;
  old = $put(this$static.map_0, o, this$static);
  return old == null;
}

function $contains_0(this$static, o){
  return $containsKey(this$static.map_0, o);
}

function $remove_2(this$static, o){
  return $remove(this$static.map_0, o) != null;
}

function HashSet(){
  this.map_0 = new HashMap;
}

function HashSet_0(c){
  this.map_0 = new HashMap_0(c.array.length);
  $addAll(this, c);
}

defineClass(25, 292, $intern_13, HashSet, HashSet_0);
_.add = function add_9(o){
  return $add_2(this, o);
}
;
_.clear = function clear_10(){
  $reset(this.map_0);
}
;
_.contains = function contains_9(o){
  return $contains_0(this, o);
}
;
_.isEmpty = function isEmpty_4(){
  return $size_0(this.map_0) == 0;
}
;
_.iterator_0 = function iterator_13(){
  var outerIter;
  return outerIter = (new AbstractMap$1(this.map_0)).this$01.entrySet().iterator_0() , new AbstractMap$1$1(outerIter);
}
;
_.remove = function remove_21(o){
  return $remove_2(this, o);
}
;
_.size = function size_13(){
  return $size_0(this.map_0);
}
;
var Ljava_util_HashSet_2_classLit = createForClass('java.util', 'HashSet', 25);
function $findEntryInChain(this$static, key, chain){
  var entry, entry$array, entry$index, entry$max;
  for (entry$array = chain , entry$index = 0 , entry$max = entry$array.length; entry$index < entry$max; ++entry$index) {
    entry = entry$array[entry$index];
    if (this$static.host.equals_1(key, entry.getKey())) {
      return entry;
    }
  }
  return null;
}

function $getChainOrEmpty(this$static, hashCode){
  var chain;
  chain = this$static.backingMap.get(hashCode);
  return chain == null?initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, 0, 5, 1):chain;
}

function $getEntry(this$static, key){
  return $findEntryInChain(this$static, key, $getChainOrEmpty(this$static, this$static.host.getHashCode(key)));
}

function $put_0(this$static, key, value_0){
  var chain, chain0, entry, hashCode;
  hashCode = this$static.host.getHashCode(key);
  chain0 = (chain = this$static.backingMap.get(hashCode) , chain == null?initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, 0, 5, 1):chain);
  if (chain0.length == 0) {
    this$static.backingMap.set(hashCode, chain0);
  }
   else {
    entry = $findEntryInChain(this$static, key, chain0);
    if (entry) {
      return entry.setValue(value_0);
    }
  }
  setCheck(chain0, chain0.length, new AbstractMap$SimpleEntry(key, value_0));
  ++this$static.size_0;
  ++this$static.host.modCount;
  return null;
}

function $remove_3(this$static, key){
  var chain, chain0, entry, hashCode, i;
  hashCode = this$static.host.getHashCode(key);
  chain0 = (chain = this$static.backingMap.get(hashCode) , chain == null?initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, 0, 5, 1):chain);
  for (i = 0; i < chain0.length; i++) {
    entry = chain0[i];
    if (this$static.host.equals_1(key, entry.getKey())) {
      if (chain0.length == 1) {
        chain0.length = 0;
        $delete(this$static.backingMap, hashCode);
      }
       else {
        chain0.splice(i, 1);
      }
      --this$static.size_0;
      ++this$static.host.modCount;
      return entry.getValue();
    }
  }
  return null;
}

function InternalHashCodeMap(host){
  this.backingMap = newJsMap();
  this.host = host;
}

defineClass(219, 1, {}, InternalHashCodeMap);
_.iterator_0 = function iterator_14(){
  return new InternalHashCodeMap$1(this);
}
;
_.size_0 = 0;
var Ljava_util_InternalHashCodeMap_2_classLit = createForClass('java.util', 'InternalHashCodeMap', 219);
function InternalHashCodeMap$1(this$0){
  this.this$01 = this$0;
  this.chains = this.this$01.backingMap.entries();
  this.chain = initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, 0, 5, 1);
}

defineClass(157, 1, {}, InternalHashCodeMap$1);
_.forEachRemaining = function forEachRemaining_6(consumer){
  $forEachRemaining(this, consumer);
}
;
_.next_1 = function next_7(){
  return this.lastEntry = this.chain[this.itemIndex++] , this.lastEntry;
}
;
_.hasNext_0 = function hasNext_6(){
  var current;
  if (this.itemIndex < this.chain.length) {
    return true;
  }
  current = this.chains.next();
  if (!current.done) {
    this.chain = current.value[1];
    this.itemIndex = 0;
    return true;
  }
  return false;
}
;
_.remove_0 = function remove_22(){
  $remove_3(this.this$01, this.lastEntry.getKey());
  this.itemIndex != 0 && --this.itemIndex;
}
;
_.itemIndex = 0;
_.lastEntry = null;
var Ljava_util_InternalHashCodeMap$1_2_classLit = createForClass('java.util', 'InternalHashCodeMap/1', 157);
function $delete(this$static, key){
  var fn;
  fn = this$static['delete'];
  fn.call(this$static, key);
}

function $delete_0(this$static, key){
  var fn;
  fn = this$static['delete'];
  fn.call(this$static, key);
}

function $clinit_InternalJsMapFactory(){
  $clinit_InternalJsMapFactory = emptyMethod;
  jsMapCtor = getJsMapConstructor();
}

function canHandleObjectCreateAndProto(){
  if (!Object.create || !Object.getOwnPropertyNames) {
    return false;
  }
  var protoField = '__proto__';
  var map_0 = Object.create(null);
  if (map_0[protoField] !== undefined) {
    return false;
  }
  var keys_0 = Object.getOwnPropertyNames(map_0);
  if (keys_0.length != 0) {
    return false;
  }
  map_0[protoField] = 42;
  if (map_0[protoField] !== 42) {
    return false;
  }
  if (Object.getOwnPropertyNames(map_0).length == 0) {
    return false;
  }
  return true;
}

function getJsMapConstructor(){
  function isCorrectIterationProtocol(){
    try {
      return (new Map).entries().next().done;
    }
     catch (e) {
      return false;
    }
  }

  if (typeof Map === 'function' && Map.prototype.entries && isCorrectIterationProtocol()) {
    return Map;
  }
   else {
    return getJsMapPolyFill();
  }
}

function getJsMapPolyFill(){
  function Stringmap(){
    this.obj = this.createObject();
  }

  ;
  Stringmap.prototype.createObject = function(key){
    return Object.create(null);
  }
  ;
  Stringmap.prototype.get = function(key){
    return this.obj[key];
  }
  ;
  Stringmap.prototype.set = function(key, value_0){
    this.obj[key] = value_0;
  }
  ;
  Stringmap.prototype['delete'] = function(key){
    delete this.obj[key];
  }
  ;
  Stringmap.prototype.keys = function(){
    return Object.getOwnPropertyNames(this.obj);
  }
  ;
  Stringmap.prototype.entries = function(){
    var keys_0 = this.keys();
    var map_0 = this;
    var nextIndex = 0;
    return {next:function(){
      if (nextIndex >= keys_0.length)
        return {done:true};
      var key = keys_0[nextIndex++];
      return {value:[key, map_0.get(key)], done:false};
    }
    };
  }
  ;
  if (!canHandleObjectCreateAndProto()) {
    Stringmap.prototype.createObject = function(){
      return {};
    }
    ;
    Stringmap.prototype.get = function(key){
      return this.obj[':' + key];
    }
    ;
    Stringmap.prototype.set = function(key, value_0){
      this.obj[':' + key] = value_0;
    }
    ;
    Stringmap.prototype['delete'] = function(key){
      delete this.obj[':' + key];
    }
    ;
    Stringmap.prototype.keys = function(){
      var result = [];
      for (var key in this.obj) {
        key.charCodeAt(0) == 58 && result.push(key.substring(1));
      }
      return result;
    }
    ;
  }
  return Stringmap;
}

function newJsMap(){
  $clinit_InternalJsMapFactory();
  return new jsMapCtor;
}

var jsMapCtor;
function $contains_1(this$static, key){
  return !(this$static.backingMap.get(key) === undefined);
}

function $get_1(this$static, key){
  return this$static.backingMap.get(key);
}

function $put_1(this$static, key, value_0){
  var oldValue;
  oldValue = this$static.backingMap.get(key);
  this$static.backingMap.set(key, value_0 === undefined?null:value_0);
  if (oldValue === undefined) {
    ++this$static.size_0;
    ++this$static.host.modCount;
  }
   else {
    ++this$static.valueMod;
  }
  return oldValue;
}

function $remove_4(this$static, key){
  var value_0;
  value_0 = this$static.backingMap.get(key);
  if (value_0 === undefined) {
    ++this$static.valueMod;
  }
   else {
    $delete_0(this$static.backingMap, key);
    --this$static.size_0;
    ++this$static.host.modCount;
  }
  return value_0;
}

function InternalStringMap(host){
  this.backingMap = newJsMap();
  this.host = host;
}

defineClass(217, 1, {}, InternalStringMap);
_.iterator_0 = function iterator_15(){
  return new InternalStringMap$1(this);
}
;
_.size_0 = 0;
_.valueMod = 0;
var Ljava_util_InternalStringMap_2_classLit = createForClass('java.util', 'InternalStringMap', 217);
function InternalStringMap$1(this$0){
  this.this$01 = this$0;
  this.entries_0 = this.this$01.backingMap.entries();
  this.current = this.entries_0.next();
}

defineClass(156, 1, {}, InternalStringMap$1);
_.forEachRemaining = function forEachRemaining_7(consumer){
  $forEachRemaining(this, consumer);
}
;
_.next_1 = function next_8(){
  return this.last = this.current , this.current = this.entries_0.next() , new InternalStringMap$2(this.this$01, this.last, this.this$01.valueMod);
}
;
_.hasNext_0 = function hasNext_7(){
  return !this.current.done;
}
;
_.remove_0 = function remove_23(){
  $remove_4(this.this$01, this.last.value[0]);
}
;
var Ljava_util_InternalStringMap$1_2_classLit = createForClass('java.util', 'InternalStringMap/1', 156);
function $getValue(this$static){
  if (this$static.this$01.valueMod != this$static.val$lastValueMod3) {
    return $get_1(this$static.this$01, this$static.val$entry2.value[0]);
  }
  return this$static.val$entry2.value[1];
}

function InternalStringMap$2(this$0, val$entry, val$lastValueMod){
  this.this$01 = this$0;
  this.val$entry2 = val$entry;
  this.val$lastValueMod3 = val$lastValueMod;
}

defineClass(218, 296, {13:1}, InternalStringMap$2);
_.getKey = function getKey_0(){
  return this.val$entry2.value[0];
}
;
_.getValue = function getValue_0(){
  return $getValue(this);
}
;
_.setValue = function setValue_0(object){
  return $put_1(this.this$01, this.val$entry2.value[0], object);
}
;
_.val$lastValueMod3 = 0;
var Ljava_util_InternalStringMap$2_2_classLit = createForClass('java.util', 'InternalStringMap/2', 218);
function $clear(this$static){
  $reset(this$static.map_0);
  this$static.head.prev = this$static.head;
  this$static.head.next_0 = this$static.head;
}

function $put_2(this$static, key, value_0){
  var newEntry, old, oldValue;
  old = castTo($get(this$static.map_0, key), 58);
  if (!old) {
    newEntry = new LinkedHashMap$ChainEntry_0(this$static, key, value_0);
    $put(this$static.map_0, key, newEntry);
    $addToEnd(newEntry);
    return null;
  }
   else {
    oldValue = $setValue(old, value_0);
    $recordAccess(this$static, old);
    return oldValue;
  }
}

function $recordAccess(this$static, entry){
  if (this$static.accessOrder) {
    $remove_6(entry);
    $addToEnd(entry);
  }
}

function $remove_5(this$static, key){
  var entry;
  entry = castTo($remove(this$static.map_0, key), 58);
  if (entry) {
    $remove_6(entry);
    return entry.value_0;
  }
  return null;
}

function LinkedHashMap(){
  $reset(this);
  this.head = new LinkedHashMap$ChainEntry(this);
  this.map_0 = new HashMap;
  this.head.prev = this.head;
  this.head.next_0 = this.head;
}

defineClass(160, 24, $intern_12, LinkedHashMap);
_.clear = function clear_11(){
  $clear(this);
}
;
_.containsKey = function containsKey_2(key){
  return $containsKey(this.map_0, key);
}
;
_.containsValue = function containsValue_1(value_0){
  var node;
  node = this.head.next_0;
  while (node != this.head) {
    if (equals_10(node.value_0, value_0)) {
      return true;
    }
    node = node.next_0;
  }
  return false;
}
;
_.entrySet = function entrySet_1(){
  return new LinkedHashMap$EntrySet(this);
}
;
_.get = function get_7(key){
  var entry;
  entry = castTo($get(this.map_0, key), 58);
  if (entry) {
    $recordAccess(this, entry);
    return entry.value_0;
  }
  return null;
}
;
_.put = function put_1(key, value_0){
  return $put_2(this, key, value_0);
}
;
_.remove = function remove_24(key){
  return $remove_5(this, key);
}
;
_.size = function size_14(){
  return $size_0(this.map_0);
}
;
_.accessOrder = false;
var Ljava_util_LinkedHashMap_2_classLit = createForClass('java.util', 'LinkedHashMap', 160);
function $addToEnd(this$static){
  var tail;
  tail = this$static.this$01.head.prev;
  this$static.prev = tail;
  this$static.next_0 = this$static.this$01.head;
  tail.next_0 = this$static.this$01.head.prev = this$static;
}

function $remove_6(this$static){
  this$static.next_0.prev = this$static.prev;
  this$static.prev.next_0 = this$static.next_0;
  this$static.next_0 = this$static.prev = null;
}

function LinkedHashMap$ChainEntry(this$0){
  LinkedHashMap$ChainEntry_0.call(this, this$0, null, null);
}

function LinkedHashMap$ChainEntry_0(this$0, key, value_0){
  this.this$01 = this$0;
  AbstractMap$SimpleEntry.call(this, key, value_0);
}

defineClass(58, 57, {82:1, 57:1, 58:1, 13:1}, LinkedHashMap$ChainEntry, LinkedHashMap$ChainEntry_0);
var Ljava_util_LinkedHashMap$ChainEntry_2_classLit = createForClass('java.util', 'LinkedHashMap/ChainEntry', 58);
function $contains_2(this$static, o){
  if (instanceOf(o, 13)) {
    return $containsEntry(this$static.this$01, castTo(o, 13));
  }
  return false;
}

function LinkedHashMap$EntrySet(this$0){
  this.this$01 = this$0;
}

defineClass(237, 292, $intern_4, LinkedHashMap$EntrySet);
_.clear = function clear_12(){
  $clear(this.this$01);
}
;
_.contains = function contains_10(o){
  return $contains_2(this, o);
}
;
_.iterator_0 = function iterator_16(){
  return new LinkedHashMap$EntrySet$EntryIterator(this);
}
;
_.remove = function remove_25(entry){
  var key;
  if ($contains_2(this, entry)) {
    key = castTo(entry, 13).getKey();
    $remove_5(this.this$01, key);
    return true;
  }
  return false;
}
;
_.size = function size_15(){
  return $size_0(this.this$01.map_0);
}
;
var Ljava_util_LinkedHashMap$EntrySet_2_classLit = createForClass('java.util', 'LinkedHashMap/EntrySet', 237);
function LinkedHashMap$EntrySet$EntryIterator(this$1){
  this.this$11 = this$1;
  this.next_0 = this$1.this$01.head.next_0;
  this.lastModCount = this$1.this$01.map_0.modCount;
}

defineClass(238, 1, {}, LinkedHashMap$EntrySet$EntryIterator);
_.forEachRemaining = function forEachRemaining_8(consumer){
  $forEachRemaining(this, consumer);
}
;
_.next_1 = function next_9(){
  return checkCriticalConcurrentModification(this.this$11.this$01.map_0.modCount, this.lastModCount) , checkCriticalElement(this.next_0 != this.this$11.this$01.head) , this.last = this.next_0 , this.next_0 = this.next_0.next_0 , this.last;
}
;
_.hasNext_0 = function hasNext_8(){
  return this.next_0 != this.this$11.this$01.head;
}
;
_.remove_0 = function remove_26(){
  checkCriticalState(!!this.last);
  checkCriticalConcurrentModification(this.this$11.this$01.map_0.modCount, this.lastModCount);
  $remove_6(this.last);
  $remove(this.this$11.this$01.map_0, this.last.key);
  this.lastModCount = this.this$11.this$01.map_0.modCount;
  this.last = null;
}
;
_.lastModCount = 0;
var Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2_classLit = createForClass('java.util', 'LinkedHashMap/EntrySet/EntryIterator', 238);
function $addLast(this$static, o){
  $addNode(this$static, o, this$static.tail.prev, this$static.tail);
}

function $addNode(this$static, o, prev, next){
  var node;
  node = new LinkedList$Node;
  node.value_0 = o;
  node.prev = prev;
  node.next_0 = next;
  next.prev = prev.next_0 = node;
  ++this$static.size_0;
}

function $listIterator(this$static, index_0){
  var i, node;
  checkCriticalPositionIndex(index_0, this$static.size_0);
  if (index_0 >= this$static.size_0 >> 1) {
    node = this$static.tail;
    for (i = this$static.size_0; i > index_0; --i) {
      node = node.prev;
    }
  }
   else {
    node = this$static.header.next_0;
    for (i = 0; i < index_0; ++i) {
      node = node.next_0;
    }
  }
  return new LinkedList$ListIteratorImpl(this$static, index_0, node);
}

function $removeNode(this$static, node){
  var oldValue;
  oldValue = node.value_0;
  node.next_0.prev = node.prev;
  node.prev.next_0 = node.next_0;
  node.next_0 = node.prev = null;
  node.value_0 = null;
  --this$static.size_0;
  return oldValue;
}

function $reset_0(this$static){
  this$static.header.next_0 = this$static.tail;
  this$static.tail.prev = this$static.header;
  this$static.header.prev = this$static.tail.next_0 = null;
  this$static.size_0 = 0;
}

function LinkedList(){
  this.header = new LinkedList$Node;
  this.tail = new LinkedList$Node;
  $reset_0(this);
}

defineClass(128, 299, $intern_11, LinkedList);
_.add = function add_10(o){
  return this.addLast(o) , true;
}
;
_.addLast = function addLast(o){
  $addLast(this, o);
}
;
_.clear = function clear_13(){
  $reset_0(this);
}
;
_.listIterator = function listIterator_0(index_0){
  return $listIterator(this, index_0);
}
;
_.size = function size_16(){
  return this.size_0;
}
;
_.size_0 = 0;
var Ljava_util_LinkedList_2_classLit = createForClass('java.util', 'LinkedList', 128);
function $add_3(this$static, o){
  $addNode(this$static.this$01, o, this$static.currentNode_0.prev, this$static.currentNode_0);
  ++this$static.currentIndex;
  this$static.lastNode = null;
}

function $hasNext_1(this$static){
  return this$static.currentNode_0 != this$static.this$01.tail;
}

function $next_2(this$static){
  checkCriticalElement(this$static.currentNode_0 != this$static.this$01.tail);
  this$static.lastNode = this$static.currentNode_0;
  this$static.currentNode_0 = this$static.currentNode_0.next_0;
  ++this$static.currentIndex;
  return this$static.lastNode.value_0;
}

function $previous(this$static){
  checkCriticalElement(this$static.currentNode_0.prev != this$static.this$01.header);
  this$static.lastNode = this$static.currentNode_0 = this$static.currentNode_0.prev;
  --this$static.currentIndex;
  return this$static.lastNode.value_0;
}

function $remove_7(this$static){
  var nextNode;
  checkCriticalState(!!this$static.lastNode);
  nextNode = this$static.lastNode.next_0;
  $removeNode(this$static.this$01, this$static.lastNode);
  this$static.currentNode_0 == this$static.lastNode?(this$static.currentNode_0 = nextNode):--this$static.currentIndex;
  this$static.lastNode = null;
}

function $set_0(this$static, o){
  checkCriticalState(!!this$static.lastNode);
  this$static.lastNode.value_0 = o;
}

function LinkedList$ListIteratorImpl(this$0, index_0, startNode){
  this.this$01 = this$0;
  this.currentNode_0 = startNode;
  this.currentIndex = index_0;
}

defineClass(239, 1, {}, LinkedList$ListIteratorImpl);
_.forEachRemaining = function forEachRemaining_9(consumer){
  $forEachRemaining(this, consumer);
}
;
_.add_0 = function add_11(o){
  $add_3(this, o);
}
;
_.hasNext_0 = function hasNext_9(){
  return $hasNext_1(this);
}
;
_.next_1 = function next_10(){
  return $next_2(this);
}
;
_.remove_0 = function remove_27(){
  $remove_7(this);
}
;
_.set_0 = function set_7(o){
  $set_0(this, o);
}
;
_.currentIndex = 0;
_.lastNode = null;
var Ljava_util_LinkedList$ListIteratorImpl_2_classLit = createForClass('java.util', 'LinkedList/ListIteratorImpl', 239);
function LinkedList$Node(){
}

defineClass(129, 1, {}, LinkedList$Node);
var Ljava_util_LinkedList$Node_2_classLit = createForClass('java.util', 'LinkedList/Node', 129);
function NoSuchElementException(){
  RuntimeException.call(this);
}

defineClass(66, 14, {3:1, 17:1, 14:1, 11:1, 66:1}, NoSuchElementException);
var Ljava_util_NoSuchElementException_2_classLit = createForClass('java.util', 'NoSuchElementException', 66);
function equals_10(a, b){
  return maskUndefined(a) === maskUndefined(b) || a != null && equals_Ljava_lang_Object__Z__devirtual$(a, b);
}

function hashCode_11(o){
  return o != null?hashCode__I__devirtual$(o):0;
}

function $forEachRemaining_0(this$static, consumer){
  while (this$static.tryAdvance(consumer))
  ;
}

function $initIterator(this$static){
  if (!this$static.it) {
    this$static.it = this$static.collection.iterator_0();
    this$static.estimateSize = this$static.collection.size();
  }
}

function Spliterators$IteratorSpliterator(collection, characteristics){
  this.collection = (checkCriticalNotNull(collection) , collection);
  this.characteristics = (characteristics & 4096) == 0?characteristics | 64 | 16384:characteristics;
}

defineClass(21, 1, {}, Spliterators$IteratorSpliterator);
_.characteristics_0 = function characteristics_0(){
  return this.characteristics;
}
;
_.estimateSize_0 = function estimateSize(){
  $initIterator(this);
  return this.estimateSize;
}
;
_.forEachRemaining = function forEachRemaining_10(consumer){
  $initIterator(this);
  this.it.forEachRemaining(consumer);
}
;
_.tryAdvance = function tryAdvance(consumer){
  checkCriticalNotNull(consumer);
  $initIterator(this);
  if (this.it.hasNext_0()) {
    consumer.accept_0(this.it.next_1());
    return true;
  }
  return false;
}
;
_.characteristics = 0;
_.estimateSize = 0;
var Ljava_util_Spliterators$IteratorSpliterator_2_classLit = createForClass('java.util', 'Spliterators/IteratorSpliterator', 21);
function SortedSet$1($anonymous0){
  Spliterators$IteratorSpliterator.call(this, $anonymous0, 21);
}

defineClass(98, 21, {}, SortedSet$1);
var Ljava_util_SortedSet$1_2_classLit = createForClass('java.util', 'SortedSet/1', 98);
defineClass(176, 1, {});
_.forEachRemaining = function forEachRemaining_11(consumer){
  $forEachRemaining_0(this, consumer);
}
;
_.characteristics_0 = function characteristics_1(){
  return this.characteristics;
}
;
_.estimateSize_0 = function estimateSize_0(){
  return this.sizeEstimate;
}
;
_.characteristics = 0;
_.sizeEstimate = 0;
var Ljava_util_Spliterators$BaseSpliterator_2_classLit = createForClass('java.util', 'Spliterators/BaseSpliterator', 176);
function Spliterators$AbstractSpliterator(size_0, characteristics){
  this.sizeEstimate = size_0;
  this.characteristics = (characteristics & 64) != 0?characteristics | 16384:characteristics;
}

defineClass(147, 176, {});
var Ljava_util_Spliterators$AbstractSpliterator_2_classLit = createForClass('java.util', 'Spliterators/AbstractSpliterator', 147);
function checkArrayElementIndex(index_0, size_0){
  if (index_0 < 0 || index_0 >= size_0) {
    throw toJs(new ArrayIndexOutOfBoundsException);
  }
}

defineClass(229, 289, $intern_11);
_.addAtIndex = function add_12(index_0, o){
  checkArrayElementIndex(index_0, this.arrayList.array.length + 1);
  $add_0(this.arrayList, index_0, o);
}
;
_.add = function add_13(o){
  return $add_1(this.arrayList, o);
}
;
_.addAllAtIndex = function addAll_5(index_0, c){
  checkArrayElementIndex(index_0, this.arrayList.array.length + 1);
  return $addAll_0(this.arrayList, index_0, c);
}
;
_.addAll = function addAll_6(c){
  return $addAll_1(this.arrayList, c);
}
;
_.clear = function clear_14(){
  this.arrayList.array.length = 0;
}
;
_.contains = function contains_11(elem){
  return $indexOf_0(this.arrayList, elem, 0) != -1;
}
;
_.containsAll = function containsAll_1(c){
  return $containsAll(this.arrayList, c);
}
;
_.getAtIndex = function get_8(index_0){
  return checkArrayElementIndex(index_0, this.arrayList.array.length) , $get_0(this.arrayList, index_0);
}
;
_.indexOf = function indexOf_1(elem){
  return $indexOf_0(this.arrayList, elem, 0);
}
;
_.isEmpty = function isEmpty_5(){
  return this.arrayList.array.length == 0;
}
;
_.iterator_0 = function iterator_17(){
  return new ArrayList$1(this.arrayList);
}
;
_.lastIndexOf = function lastIndexOf_1(o){
  return $lastIndexOf_0(this.arrayList, o);
}
;
_.removeAtIndex = function remove_28(index_0){
  return checkArrayElementIndex(index_0, this.arrayList.array.length) , $remove_1(this.arrayList, index_0);
}
;
_.removeAll = function removeAll_2(c){
  return $removeAll(this.arrayList, c);
}
;
_.removeRange_0 = function removeRange_1(fromIndex, endIndex){
  $removeRange(this.arrayList, fromIndex, endIndex);
}
;
_.setAtIndex = function set_8(index_0, elem){
  checkArrayElementIndex(index_0, this.arrayList.array.length);
  return $set(this.arrayList, index_0, elem);
}
;
_.size = function size_17(){
  return this.arrayList.array.length;
}
;
_.sort_1 = function sort_5(c){
  $sort(this.arrayList, c);
}
;
_.subList = function subList_0(fromIndex, toIndex){
  return new AbstractList$SubList(this.arrayList, fromIndex, toIndex);
}
;
_.toArray = function toArray_5(){
  return clone(this.arrayList.array);
}
;
_.toArray_0 = function toArray_6(a){
  return $toArray_0(this.arrayList, a);
}
;
_.toString_0 = function toString_12(){
  return $toString(this.arrayList);
}
;
var Ljava_util_Vector_2_classLit = createForClass('java.util', 'Vector', 229);
function $peek(this$static){
  var sz;
  sz = this$static.arrayList.array.length;
  if (sz > 0) {
    return checkArrayElementIndex(sz - 1, this$static.arrayList.array.length) , $get_0(this$static.arrayList, sz - 1);
  }
   else {
    throw toJs(new EmptyStackException);
  }
}

function $pop(this$static){
  var sz;
  sz = this$static.arrayList.array.length;
  if (sz > 0) {
    return checkArrayElementIndex(sz - 1, this$static.arrayList.array.length) , $remove_1(this$static.arrayList, sz - 1);
  }
   else {
    throw toJs(new EmptyStackException);
  }
}

function $push(this$static, o){
  $add_1(this$static.arrayList, o);
  return o;
}

function Stack(){
  this.arrayList = new ArrayList;
}

defineClass(230, 229, $intern_11, Stack);
var Ljava_util_Stack_2_classLit = createForClass('java.util', 'Stack', 230);
function $add_4(this$static, newElement){
  !this$static.builder?(this$static.builder = new StringBuilder_0(this$static.prefix)):$append_4(this$static.builder, this$static.delimiter);
  $append_1(this$static.builder, newElement);
  return this$static;
}

function StringJoiner(){
  StringJoiner_0.call(this, '', '');
}

function StringJoiner_0(prefix, suffix){
  this.delimiter = ', ';
  this.prefix = prefix;
  this.suffix = suffix;
  this.emptyValue = this.prefix + ('' + this.suffix);
}

defineClass(92, 1, {}, StringJoiner, StringJoiner_0);
_.toString_0 = function toString_13(){
  return !this.builder?this.emptyValue:this.suffix.length == 0?this.builder.string:this.builder.string + ('' + this.suffix);
}
;
var Ljava_util_StringJoiner_2_classLit = createForClass('java.util', 'StringJoiner', 92);
function $clear_0(this$static){
  this$static.root_0 = null;
  this$static.size_0 = 0;
}

function $getEntry_0(this$static, key){
  var c, childNum, tree;
  tree = this$static.root_0;
  while (tree) {
    c = $compare_0(key, tree.key);
    if (c == 0) {
      return tree;
    }
    childNum = c < 0?0:1;
    tree = tree.child[childNum];
  }
  return null;
}

function $inOrderAdd(this$static, list, type_0, current, fromKey, fromInclusive, toKey, toInclusive){
  var leftNode, rightNode;
  if (!current) {
    return;
  }
  leftNode = current.child[0];
  !!leftNode && $inOrderAdd(this$static, list, type_0, leftNode, fromKey, fromInclusive, toKey, toInclusive);
  $inRange(this$static, type_0, current.key, fromKey, fromInclusive, toKey, toInclusive) && list.add(current);
  rightNode = current.child[1];
  !!rightNode && $inOrderAdd(this$static, list, type_0, rightNode, fromKey, fromInclusive, toKey, toInclusive);
}

function $inRange(this$static, type_0, key, fromKey, fromInclusive, toKey, toInclusive){
  var compare, compare0;
  if (type_0.fromKeyValid() && (compare0 = $compare_0(key, fromKey) , compare0 < 0 || !fromInclusive && compare0 == 0)) {
    return false;
  }
  if (type_0.toKeyValid() && (compare = $compare_0(key, toKey) , compare > 0 || !toInclusive && compare == 0)) {
    return false;
  }
  return true;
}

function $insert(this$static, tree, newNode, state){
  var c, childNum;
  if (!tree) {
    return newNode;
  }
   else {
    c = $compare_0(newNode.key, tree.key);
    if (c == 0) {
      state.value_0 = $setValue(tree, newNode.value_0);
      state.found = true;
      return tree;
    }
    childNum = c < 0?0:1;
    tree.child[childNum] = $insert(this$static, tree.child[childNum], newNode, state);
    if ($isRed(tree.child[childNum])) {
      if ($isRed(tree.child[1 - childNum])) {
        tree.isRed = true;
        tree.child[0].isRed = false;
        tree.child[1].isRed = false;
      }
       else {
        $isRed(tree.child[childNum].child[childNum])?(tree = $rotateSingle(tree, 1 - childNum)):$isRed(tree.child[childNum].child[1 - childNum]) && (tree = $rotateDouble(tree, 1 - childNum));
      }
    }
  }
  return tree;
}

function $isRed(node){
  return !!node && node.isRed;
}

function $put_3(this$static, key, value_0){
  var node, state;
  node = new TreeMap$Node(key, value_0);
  state = new TreeMap$State;
  this$static.root_0 = $insert(this$static, this$static.root_0, node, state);
  state.found || ++this$static.size_0;
  this$static.root_0.isRed = false;
  return state.value_0;
}

function $remove_8(this$static, k){
  var key, state;
  key = k;
  state = new TreeMap$State;
  $removeWithState(this$static, key, state);
  return state.value_0;
}

function $removeEntry(this$static, entry){
  var state;
  state = new TreeMap$State;
  state.matchValue = true;
  state.value_0 = entry.getValue();
  return $removeWithState(this$static, entry.getKey(), state);
}

function $removeWithState(this$static, key, state){
  var c, dir_0, dir2, found, grandparent, head, last, newNode, node, parent_0, sibling;
  if (!this$static.root_0) {
    return false;
  }
  found = null;
  parent_0 = null;
  head = new TreeMap$Node(null, null);
  dir_0 = 1;
  head.child[1] = this$static.root_0;
  node = head;
  while (node.child[dir_0]) {
    last = dir_0;
    grandparent = parent_0;
    parent_0 = node;
    node = node.child[dir_0];
    c = $compare_0(key, node.key);
    dir_0 = c < 0?0:1;
    c == 0 && (!state.matchValue || equals_10(node.value_0, state.value_0)) && (found = node);
    if (!(!!node && node.isRed) && !$isRed(node.child[dir_0])) {
      if ($isRed(node.child[1 - dir_0])) {
        parent_0 = parent_0.child[last] = $rotateSingle(node, dir_0);
      }
       else if (!$isRed(node.child[1 - dir_0])) {
        sibling = parent_0.child[1 - last];
        if (sibling) {
          if (!$isRed(sibling.child[1 - last]) && !$isRed(sibling.child[last])) {
            parent_0.isRed = false;
            sibling.isRed = true;
            node.isRed = true;
          }
           else {
            dir2 = grandparent.child[1] == parent_0?1:0;
            $isRed(sibling.child[last])?(grandparent.child[dir2] = $rotateDouble(parent_0, last)):$isRed(sibling.child[1 - last]) && (grandparent.child[dir2] = $rotateSingle(parent_0, last));
            node.isRed = grandparent.child[dir2].isRed = true;
            grandparent.child[dir2].child[0].isRed = false;
            grandparent.child[dir2].child[1].isRed = false;
          }
        }
      }
    }
  }
  if (found) {
    state.found = true;
    state.value_0 = found.value_0;
    if (node != found) {
      newNode = new TreeMap$Node(node.key, node.value_0);
      $replaceNode(this$static, head, found, newNode);
      parent_0 == found && (parent_0 = newNode);
    }
    parent_0.child[parent_0.child[1] == node?1:0] = node.child[!node.child[0]?1:0];
    --this$static.size_0;
  }
  this$static.root_0 = head.child[1];
  !!this$static.root_0 && (this$static.root_0.isRed = false);
  return state.found;
}

function $replaceNode(this$static, head, node, newNode){
  var direction, parent_0;
  parent_0 = head;
  direction = parent_0.key == null || $compare_0(node.key, parent_0.key) > 0?1:0;
  while (parent_0.child[direction] != node) {
    parent_0 = parent_0.child[direction];
    direction = $compare_0(node.key, parent_0.key) > 0?1:0;
  }
  parent_0.child[direction] = newNode;
  newNode.isRed = node.isRed;
  newNode.child[0] = node.child[0];
  newNode.child[1] = node.child[1];
  node.child[0] = null;
  node.child[1] = null;
}

function $rotateDouble(tree, rotateDirection){
  var otherChildDir;
  otherChildDir = 1 - rotateDirection;
  tree.child[otherChildDir] = $rotateSingle(tree.child[otherChildDir], otherChildDir);
  return $rotateSingle(tree, rotateDirection);
}

function $rotateSingle(tree, rotateDirection){
  var otherChildDir, save;
  otherChildDir = 1 - rotateDirection;
  save = tree.child[otherChildDir];
  tree.child[otherChildDir] = save.child[rotateDirection];
  save.child[rotateDirection] = tree;
  tree.isRed = true;
  save.isRed = false;
  return save;
}

function TreeMap(){
  this.root_0 = null;
  this.cmp = ($clinit_Comparators() , $clinit_Comparators() , INTERNAL_NATURAL_ORDER);
}

defineClass(158, 297, $intern_12, TreeMap);
_.clear = function clear_15(){
  $clear_0(this);
}
;
_.entrySet = function entrySet_2(){
  return new TreeMap$EntrySet(this);
}
;
_.put = function put_2(key, value_0){
  return $put_3(this, key, value_0);
}
;
_.remove = function remove_29(k){
  return $remove_8(this, k);
}
;
_.size = function size_18(){
  return this.size_0;
}
;
_.size_0 = 0;
var Ljava_util_TreeMap_2_classLit = createForClass('java.util', 'TreeMap', 158);
function $next_3(this$static){
  return this$static.last = castTo($next_0(this$static.iter), 13);
}

function $remove_9(this$static){
  $remove_0(this$static.iter);
  $removeEntry(this$static.this$01, this$static.last);
  this$static.last = null;
}

function TreeMap$EntryIterator(this$0){
  TreeMap$EntryIterator_0.call(this, this$0, ($clinit_TreeMap$SubMapType() , All));
}

function TreeMap$EntryIterator_0(this$0, type_0){
  var list;
  this.this$01 = this$0;
  list = new ArrayList;
  $inOrderAdd(this$0, list, type_0, this$0.root_0, null, false, null, false);
  this.iter = new AbstractList$ListIteratorImpl(list, 0);
}

defineClass(64, 1, {}, TreeMap$EntryIterator);
_.forEachRemaining = function forEachRemaining_12(consumer){
  $forEachRemaining(this, consumer);
}
;
_.next_1 = function next_11(){
  return $next_3(this);
}
;
_.hasNext_0 = function hasNext_10(){
  return $hasNext_0(this.iter);
}
;
_.remove_0 = function remove_30(){
  $remove_9(this);
}
;
var Ljava_util_TreeMap$EntryIterator_2_classLit = createForClass('java.util', 'TreeMap/EntryIterator', 64);
function TreeMap$EntrySet(this$0){
  this.this$01 = this$0;
  AbstractNavigableMap$EntrySet.call(this, this$0);
}

defineClass(85, 159, $intern_4, TreeMap$EntrySet);
_.clear = function clear_16(){
  $clear_0(this.this$01);
}
;
var Ljava_util_TreeMap$EntrySet_2_classLit = createForClass('java.util', 'TreeMap/EntrySet', 85);
function TreeMap$Node(key, value_0){
  AbstractMap$SimpleEntry.call(this, key, value_0);
  this.child = initUnidimensionalArray(Ljava_util_TreeMap$Node_2_classLit, $intern_0, 65, 2, 0, 1);
  this.isRed = true;
}

defineClass(65, 57, {82:1, 57:1, 13:1, 65:1}, TreeMap$Node);
_.isRed = false;
var Ljava_util_TreeMap$Node_2_classLit = createForClass('java.util', 'TreeMap/Node', 65);
function TreeMap$State(){
}

defineClass(126, 1, {}, TreeMap$State);
_.toString_0 = function toString_14(){
  return 'State: mv=' + this.matchValue + ' value=' + this.value_0 + ' done=' + this.done_0 + ' found=' + this.found;
}
;
_.done_0 = false;
_.found = false;
_.matchValue = false;
var Ljava_util_TreeMap$State_2_classLit = createForClass('java.util', 'TreeMap/State', 126);
function $clinit_TreeMap$SubMapType(){
  $clinit_TreeMap$SubMapType = emptyMethod;
  All = new TreeMap$SubMapType('All', 0);
  Head = new TreeMap$SubMapType$1;
  Range_0 = new TreeMap$SubMapType$2;
  Tail = new TreeMap$SubMapType$3;
}

function TreeMap$SubMapType(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_1(){
  $clinit_TreeMap$SubMapType();
  return stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_TreeMap$SubMapType_2_classLit, 1), $intern_0, 49, 0, [All, Head, Range_0, Tail]);
}

defineClass(49, 44, $intern_14, TreeMap$SubMapType);
_.fromKeyValid = function fromKeyValid(){
  return false;
}
;
_.toKeyValid = function toKeyValid(){
  return false;
}
;
var All, Head, Range_0, Tail;
var Ljava_util_TreeMap$SubMapType_2_classLit = createForEnum('java.util', 'TreeMap/SubMapType', 49, values_1);
function TreeMap$SubMapType$1(){
  TreeMap$SubMapType.call(this, 'Head', 1);
}

defineClass(226, 49, $intern_14, TreeMap$SubMapType$1);
_.toKeyValid = function toKeyValid_0(){
  return true;
}
;
var Ljava_util_TreeMap$SubMapType$1_2_classLit = createForEnum('java.util', 'TreeMap/SubMapType/1', 226, null);
function TreeMap$SubMapType$2(){
  TreeMap$SubMapType.call(this, 'Range', 2);
}

defineClass(227, 49, $intern_14, TreeMap$SubMapType$2);
_.fromKeyValid = function fromKeyValid_0(){
  return true;
}
;
_.toKeyValid = function toKeyValid_1(){
  return true;
}
;
var Ljava_util_TreeMap$SubMapType$2_2_classLit = createForEnum('java.util', 'TreeMap/SubMapType/2', 227, null);
function TreeMap$SubMapType$3(){
  TreeMap$SubMapType.call(this, 'Tail', 3);
}

defineClass(228, 49, $intern_14, TreeMap$SubMapType$3);
_.fromKeyValid = function fromKeyValid_1(){
  return true;
}
;
var Ljava_util_TreeMap$SubMapType$3_2_classLit = createForEnum('java.util', 'TreeMap/SubMapType/3', 228, null);
function $add_5(this$static, o){
  return $put_3(this$static.map_0, o, ($clinit_Boolean() , FALSE)) == null;
}

function $contains_3(this$static, o){
  return $containsKey_0(this$static.map_0, o);
}

function TreeSet(){
  this.map_0 = new TreeMap;
}

defineClass(215, 292, $intern_13, TreeSet);
_.spliterator_0 = function spliterator_4(){
  return new SortedSet$1(this);
}
;
_.add = function add_14(o){
  return $add_5(this, o);
}
;
_.clear = function clear_17(){
  $clear_0(this.map_0);
}
;
_.contains = function contains_12(o){
  return $contains_3(this, o);
}
;
_.iterator_0 = function iterator_18(){
  var entryIterator;
  return entryIterator = new TreeMap$EntryIterator((new TreeMap$EntrySet((new AbstractNavigableMap$NavigableKeySet(this.map_0)).map_0)).this$01_0) , new AbstractNavigableMap$NavigableKeySet$1(entryIterator);
}
;
_.remove = function remove_31(o){
  return $remove_8(this.map_0, o) != null;
}
;
_.size = function size_19(){
  return this.map_0.size_0;
}
;
var Ljava_util_TreeSet_2_classLit = createForClass('java.util', 'TreeSet', 215);
function Function$lambda$0$Type(){
}

defineClass(180, 1, {}, Function$lambda$0$Type);
_.apply_0 = function apply_1(t){
  return t;
}
;
var Ljava_util_function_Function$lambda$0$Type_2_classLit = createForClass('java.util.function', 'Function/lambda$0$Type', 180);
defineClass(103, 1, {103:1});
var Ljava_util_logging_Handler_2_classLit = createForClass('java.util.logging', 'Handler', 103);
function $clinit_Level(){
  $clinit_Level = emptyMethod;
  INFO = new Level$LevelInfo;
}

defineClass(295, 1, $intern_9);
_.getName = function getName_0(){
  return 'DUMMY';
}
;
_.toString_0 = function toString_15(){
  return this.getName();
}
;
var INFO;
var Ljava_util_logging_Level_2_classLit = createForClass('java.util.logging', 'Level', 295);
function Level$LevelInfo(){
}

defineClass(211, 295, $intern_9, Level$LevelInfo);
_.getName = function getName_1(){
  return 'INFO';
}
;
var Ljava_util_logging_Level$LevelInfo_2_classLit = createForClass('java.util.logging', 'Level/LevelInfo', 211);
function $addLoggerImpl(this$static, logger){
  (($clinit_Logger() , LOGGING_OFF)?null:logger.name_0).length == 0 && $addHandler(logger, new SimpleConsoleLogHandler);
  $putStringValue(this$static.loggerMap, LOGGING_OFF?null:logger.name_0, logger);
}

function $ensureLogger(this$static, name_0){
  var logger, newLogger, name_1, parentName;
  logger = castTo($getStringValue(this$static.loggerMap, name_0), 84);
  if (!logger) {
    newLogger = new Logger(name_0);
    name_1 = ($clinit_Logger() , LOGGING_OFF)?null:newLogger.name_0;
    parentName = $substring_0(name_1, 0, $wnd.Math.max(0, $lastIndexOf(name_1, String.fromCharCode(46))));
    $setParent(newLogger, $ensureLogger(this$static, parentName));
    (LOGGING_OFF?null:newLogger.name_0).length == 0 && $addHandler(newLogger, new SimpleConsoleLogHandler);
    $putStringValue(this$static.loggerMap, LOGGING_OFF?null:newLogger.name_0, newLogger);
    return newLogger;
  }
  return logger;
}

function LogManager(){
  this.loggerMap = new HashMap;
}

function getLogManager(){
  var rootLogger;
  if (!singleton) {
    singleton = new LogManager;
    rootLogger = new Logger('');
    $setLevel(rootLogger, ($clinit_Level() , INFO));
    $addLoggerImpl(singleton, rootLogger);
  }
  return singleton;
}

defineClass(221, 1, {}, LogManager);
var singleton;
var Ljava_util_logging_LogManager_2_classLit = createForClass('java.util.logging', 'LogManager', 221);
function LogRecord(msg){
  this.msg = msg;
  fromDouble_0(Date.now());
}

defineClass(231, 1, $intern_9, LogRecord);
_.thrown = null;
var Ljava_util_logging_LogRecord_2_classLit = createForClass('java.util.logging', 'LogRecord', 231);
function $clinit_Logger(){
  $clinit_Logger = emptyMethod;
  LOGGING_OFF = true;
  ALL_ENABLED = false;
  INFO_ENABLED = false;
  WARNING_ENABLED = false;
  SEVERE_ENABLED = false;
}

function $actuallyLog(this$static, record){
  var handler$array, handler$array0, handler$index, handler$index0, handler$max, handler$max0, logger;
  for (handler$array0 = $getHandlers(this$static) , handler$index0 = 0 , handler$max0 = handler$array0.length; handler$index0 < handler$max0; ++handler$index0) {
    $publish(record);
  }
  logger = !LOGGING_OFF && this$static.useParentHandlers?LOGGING_OFF?null:this$static.parent_0:null;
  while (logger) {
    for (handler$array = $getHandlers(logger) , handler$index = 0 , handler$max = handler$array.length; handler$index < handler$max; ++handler$index) {
      $publish(record);
    }
    logger = !LOGGING_OFF && logger.useParentHandlers?LOGGING_OFF?null:logger.parent_0:null;
  }
}

function $addHandler(this$static, handler){
  if (LOGGING_OFF) {
    return;
  }
  $add_1(this$static.handlers, handler);
}

function $getEffectiveLevel(this$static){
  var effectiveLevel, logger;
  if (this$static.level) {
    return this$static.level;
  }
  logger = LOGGING_OFF?null:this$static.parent_0;
  while (logger) {
    effectiveLevel = LOGGING_OFF?null:logger.level;
    if (effectiveLevel) {
      return effectiveLevel;
    }
    logger = LOGGING_OFF?null:logger.parent_0;
  }
  return $clinit_Level() , INFO;
}

function $getHandlers(this$static){
  if (LOGGING_OFF) {
    return initUnidimensionalArray(Ljava_util_logging_Handler_2_classLit, $intern_15, 103, 0, 0, 1);
  }
  return castTo($toArray_0(this$static.handlers, initUnidimensionalArray(Ljava_util_logging_Handler_2_classLit, $intern_15, 103, this$static.handlers.array.length, 0, 1)), 270);
}

function $log(this$static, msg, thrown){
  var record;
  (ALL_ENABLED?($getEffectiveLevel(this$static) , true):INFO_ENABLED?($clinit_Level() , true):WARNING_ENABLED?($clinit_Level() , true):SEVERE_ENABLED && ($clinit_Level() , false)) && (record = new LogRecord(msg) , record.thrown = thrown , $actuallyLog(this$static, record) , undefined);
}

function $setLevel(this$static, newLevel){
  if (LOGGING_OFF) {
    return;
  }
  this$static.level = newLevel;
}

function $setParent(this$static, newParent){
  if (LOGGING_OFF) {
    return;
  }
  !!newParent && (this$static.parent_0 = newParent);
}

function Logger(name_0){
  $clinit_Logger();
  if (LOGGING_OFF) {
    return;
  }
  this.name_0 = name_0;
  this.useParentHandlers = true;
  this.handlers = new ArrayList;
}

function getLogger(){
  $clinit_Logger();
  if (LOGGING_OFF) {
    return new Logger(null);
  }
  return $ensureLogger(getLogManager(), 'com.google.common.base.Strings');
}

defineClass(84, 1, {84:1}, Logger);
_.useParentHandlers = false;
var ALL_ENABLED = false, INFO_ENABLED = false, LOGGING_OFF = false, SEVERE_ENABLED = false, WARNING_ENABLED = false;
var Ljava_util_logging_Logger_2_classLit = createForClass('java.util.logging', 'Logger', 84);
function $publish(record){
  var console_0, level, val;
  console_0 = $equals_1(typeof(console_0), 'undefined')?null:new ConsoleLogger;
  if (!console_0) {
    return;
  }
  $clinit_Level();
  level = (val = 900 , val >= 1000?'error':val >= 900?'warn':val >= 800?'info':'log');
  $log_0(level, record.msg);
  !!record.thrown && $log_1(console_0, level, record.thrown, 'Exception: ', true);
}

function SimpleConsoleLogHandler(){
}

defineClass(161, 103, {103:1}, SimpleConsoleLogHandler);
var Ljava_util_logging_SimpleConsoleLogHandler_2_classLit = createForClass('java.util.logging', 'SimpleConsoleLogHandler', 161);
function of_0(supplier, accumulator, combiner, finisher, characteristics){
  checkCriticalNotNull(supplier);
  checkCriticalNotNull(accumulator);
  checkCriticalNotNull(combiner);
  checkCriticalNotNull(finisher);
  checkCriticalNotNull(characteristics);
  return new CollectorImpl(supplier, accumulator, combiner, finisher);
}

function of_1(supplier, accumulator, combiner, characteristics){
  checkCriticalNotNull(supplier);
  checkCriticalNotNull(accumulator);
  checkCriticalNotNull(combiner);
  checkCriticalNotNull(characteristics);
  return new CollectorImpl(supplier, accumulator, combiner, new Function$lambda$0$Type);
}

function $clinit_Collector$Characteristics(){
  $clinit_Collector$Characteristics = emptyMethod;
  CONCURRENT = new Collector$Characteristics('CONCURRENT', 0);
  IDENTITY_FINISH = new Collector$Characteristics('IDENTITY_FINISH', 1);
  UNORDERED = new Collector$Characteristics('UNORDERED', 2);
}

function Collector$Characteristics(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_2(){
  $clinit_Collector$Characteristics();
  return stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [CONCURRENT, IDENTITY_FINISH, UNORDERED]);
}

defineClass(20, 44, {3:1, 39:1, 44:1, 20:1}, Collector$Characteristics);
var CONCURRENT, IDENTITY_FINISH, UNORDERED;
var Ljava_util_stream_Collector$Characteristics_2_classLit = createForEnum('java.util.stream', 'Collector/Characteristics', 20, values_2);
function CollectorImpl(supplier, accumulator, combiner, finisher){
  this.supplier = supplier;
  this.accumulator = accumulator;
  this.combiner = combiner;
  this.finisher = finisher;
}

defineClass(120, 1, {}, CollectorImpl);
var Ljava_util_stream_CollectorImpl_2_classLit = createForClass('java.util.stream', 'CollectorImpl', 120);
function groupingBy(downstream){
  return groupingBy0(new Collectors$lambda$6$Type, downstream);
}

function groupingBy0(supplier, downstream){
  return of_0(supplier, new Collectors$lambda$7$Type, new Collectors$lambda$8$Type, new Collectors$lambda$9$Type(downstream), stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, []));
}

function lambda$19(downstream_0, a_2, t_3){
  downstream_0.accumulator.accept(a_2, lambda$3(castTo(t_3, 93)));
}

function lambda$7(m_1, o_2){
  var k, l;
  k = castTo(o_2, 93)[0];
  l = castTo(m_1.get(k), 18);
  if (!l) {
    l = new ArrayList;
    m_1.put(k, l);
  }
  l.add(o_2);
}

function lambda$9(downstream_1, m_2){
  var entry, entry$iterator, result;
  result = new LinkedHashMap;
  for (entry$iterator = m_2.entrySet().iterator_0(); entry$iterator.hasNext_0();) {
    entry = castTo(entry$iterator.next_1(), 13);
    $put_2(result, entry.getKey(), streamAndCollect(downstream_1, castTo(entry.getValue(), 18)));
  }
  return result;
}

function mapping(downstream){
  return new CollectorImpl(downstream.supplier, new Collectors$lambda$19$Type(downstream), downstream.combiner, downstream.finisher);
}

function streamAndCollect(downstream, list){
  var a, t, t$iterator;
  a = downstream.supplier.get_0();
  for (t$iterator = list.iterator_0(); t$iterator.hasNext_0();) {
    t = t$iterator.next_1();
    downstream.accumulator.accept(a, t);
  }
  return downstream.finisher.apply_0(a);
}

function Collectors$20methodref$add$Type(){
}

defineClass(27, 1, {}, Collectors$20methodref$add$Type);
_.accept = function accept_0(arg0, arg1){
  castTo(arg0, 19).add(arg1);
}
;
var Ljava_util_stream_Collectors$20methodref$add$Type_2_classLit = createForClass('java.util.stream', 'Collectors/20methodref$add$Type', 27);
function Collectors$21methodref$ctor$Type(){
}

defineClass(29, 1, {}, Collectors$21methodref$ctor$Type);
_.get_0 = function get_9(){
  return new ArrayList;
}
;
var Ljava_util_stream_Collectors$21methodref$ctor$Type_2_classLit = createForClass('java.util.stream', 'Collectors/21methodref$ctor$Type', 29);
function Collectors$lambda$19$Type(downstream_0){
  this.downstream_0 = downstream_0;
}

defineClass(189, 1, {}, Collectors$lambda$19$Type);
_.accept = function accept_1(arg0, arg1){
  lambda$19(this.downstream_0, arg0, arg1);
}
;
var Ljava_util_stream_Collectors$lambda$19$Type_2_classLit = createForClass('java.util.stream', 'Collectors/lambda$19$Type', 189);
function Collectors$lambda$42$Type(){
}

defineClass(28, 1, {}, Collectors$lambda$42$Type);
var Ljava_util_stream_Collectors$lambda$42$Type_2_classLit = createForClass('java.util.stream', 'Collectors/lambda$42$Type', 28);
function Collectors$lambda$6$Type(){
}

defineClass(185, 1, {}, Collectors$lambda$6$Type);
_.get_0 = function get_10(){
  return new LinkedHashMap;
}
;
var Ljava_util_stream_Collectors$lambda$6$Type_2_classLit = createForClass('java.util.stream', 'Collectors/lambda$6$Type', 185);
function Collectors$lambda$7$Type(){
}

defineClass(186, 1, {}, Collectors$lambda$7$Type);
_.accept = function accept_2(arg0, arg1){
  lambda$7(castTo(arg0, 43), arg1);
}
;
var Ljava_util_stream_Collectors$lambda$7$Type_2_classLit = createForClass('java.util.stream', 'Collectors/lambda$7$Type', 186);
function Collectors$lambda$8$Type(){
}

defineClass(187, 1, {}, Collectors$lambda$8$Type);
var Ljava_util_stream_Collectors$lambda$8$Type_2_classLit = createForClass('java.util.stream', 'Collectors/lambda$8$Type', 187);
function Collectors$lambda$9$Type(downstream_1){
  this.downstream_1 = downstream_1;
}

defineClass(188, 1, {}, Collectors$lambda$9$Type);
_.apply_0 = function apply_2(arg0){
  return lambda$9(this.downstream_1, castTo(arg0, 43));
}
;
var Ljava_util_stream_Collectors$lambda$9$Type_2_classLit = createForClass('java.util.stream', 'Collectors/lambda$9$Type', 188);
function $terminate(this$static){
  if (!this$static.root_0) {
    $throwIfTerminated(this$static);
    this$static.terminated = true;
  }
   else {
    $terminate(this$static.root_0);
  }
}

function $throwIfTerminated(this$static){
  if (this$static.root_0) {
    $throwIfTerminated(this$static.root_0);
  }
   else if (this$static.terminated) {
    throw toJs(new IllegalStateException_0);
  }
}

function TerminatableStream(previous){
  if (!previous) {
    this.root_0 = null;
    new ArrayList;
  }
   else {
    this.root_0 = previous;
  }
}

defineClass(202, 1, {});
_.terminated = false;
var Ljava_util_stream_TerminatableStream_2_classLit = createForClass('java.util.stream', 'TerminatableStream', 202);
function $collect(this$static, collector){
  var lastArg;
  return collector.finisher.apply_0($reduce(this$static, collector.supplier.get_0(), (lastArg = new StreamImpl$lambda$4$Type(collector) , lastArg)));
}

function $filter(this$static, predicate){
  $throwIfTerminated(this$static);
  return new StreamImpl(this$static, new StreamImpl$FilterSpliterator(predicate, this$static.spliterator));
}

function $map(this$static, mapper){
  $throwIfTerminated(this$static);
  return new StreamImpl(this$static, new StreamImpl$MapToObjSpliterator(mapper, this$static.spliterator));
}

function $reduce(this$static, identity, accumulator){
  var consumer;
  $terminate(this$static);
  consumer = new StreamImpl$ValueConsumer;
  consumer.value_0 = identity;
  this$static.spliterator.forEachRemaining(new StreamImpl$lambda$5$Type(consumer, accumulator));
  return consumer.value_0;
}

function StreamImpl(prev, spliterator){
  TerminatableStream.call(this, prev);
  this.spliterator = spliterator;
}

function lambda$4(collector_0, a_1, t_2){
  collector_0.accumulator.accept(a_1, t_2);
  return a_1;
}

function lambda$5(consumer_0, accumulator_1, item_2){
  $accept(consumer_0, $apply(accumulator_1, consumer_0.value_0, item_2));
}

defineClass(22, 202, {22:1}, StreamImpl);
var Ljava_util_stream_StreamImpl_2_classLit = createForClass('java.util.stream', 'StreamImpl', 22);
function $lambda$0(this$static, action_1, item_1){
  if (this$static.filter_0.test_0(item_1)) {
    this$static.found = true;
    action_1.accept_0(item_1);
  }
}

function StreamImpl$FilterSpliterator(filter, original){
  Spliterators$AbstractSpliterator.call(this, original.estimateSize_0(), original.characteristics_0() & -16449);
  checkCriticalNotNull(filter);
  this.filter_0 = filter;
  this.original = original;
}

defineClass(204, 147, {}, StreamImpl$FilterSpliterator);
_.tryAdvance = function tryAdvance_0(action){
  this.found = false;
  while (!this.found && this.original.tryAdvance(new StreamImpl$FilterSpliterator$lambda$0$Type(this, action)))
  ;
  return this.found;
}
;
_.found = false;
var Ljava_util_stream_StreamImpl$FilterSpliterator_2_classLit = createForClass('java.util.stream', 'StreamImpl/FilterSpliterator', 204);
function StreamImpl$FilterSpliterator$lambda$0$Type($$outer_0, action_1){
  this.$$outer_0 = $$outer_0;
  this.action_1 = action_1;
}

defineClass(207, 1, {}, StreamImpl$FilterSpliterator$lambda$0$Type);
_.accept_0 = function accept_3(arg0){
  $lambda$0(this.$$outer_0, this.action_1, arg0);
}
;
var Ljava_util_stream_StreamImpl$FilterSpliterator$lambda$0$Type_2_classLit = createForClass('java.util.stream', 'StreamImpl/FilterSpliterator/lambda$0$Type', 207);
function $lambda$0_0(this$static, action_1, u_1){
  action_1.accept_0(this$static.map_0.apply_0(u_1));
}

function StreamImpl$MapToObjSpliterator(map_0, original){
  Spliterators$AbstractSpliterator.call(this, original.estimateSize_0(), original.characteristics_0() & -6);
  checkCriticalNotNull(map_0);
  this.map_0 = map_0;
  this.original = original;
}

defineClass(203, 147, {}, StreamImpl$MapToObjSpliterator);
_.tryAdvance = function tryAdvance_1(action){
  return this.original.tryAdvance(new StreamImpl$MapToObjSpliterator$lambda$0$Type(this, action));
}
;
var Ljava_util_stream_StreamImpl$MapToObjSpliterator_2_classLit = createForClass('java.util.stream', 'StreamImpl/MapToObjSpliterator', 203);
function StreamImpl$MapToObjSpliterator$lambda$0$Type($$outer_0, action_1){
  this.$$outer_0 = $$outer_0;
  this.action_1 = action_1;
}

defineClass(206, 1, {}, StreamImpl$MapToObjSpliterator$lambda$0$Type);
_.accept_0 = function accept_4(arg0){
  $lambda$0_0(this.$$outer_0, this.action_1, arg0);
}
;
var Ljava_util_stream_StreamImpl$MapToObjSpliterator$lambda$0$Type_2_classLit = createForClass('java.util.stream', 'StreamImpl/MapToObjSpliterator/lambda$0$Type', 206);
function $accept(this$static, value_0){
  this$static.value_0 = value_0;
}

function StreamImpl$ValueConsumer(){
}

defineClass(205, 1, {}, StreamImpl$ValueConsumer);
_.accept_0 = function accept_5(value_0){
  $accept(this, value_0);
}
;
var Ljava_util_stream_StreamImpl$ValueConsumer_2_classLit = createForClass('java.util.stream', 'StreamImpl/ValueConsumer', 205);
function $apply(this$static, arg0, arg1){
  return lambda$4(this$static.collector_0, arg0, arg1);
}

function StreamImpl$lambda$4$Type(collector_0){
  this.collector_0 = collector_0;
}

defineClass(208, 1, {}, StreamImpl$lambda$4$Type);
var Ljava_util_stream_StreamImpl$lambda$4$Type_2_classLit = createForClass('java.util.stream', 'StreamImpl/lambda$4$Type', 208);
function $accept_0(this$static, arg0){
  lambda$5(this$static.consumer_0, this$static.accumulator_1, arg0);
}

function StreamImpl$lambda$5$Type(consumer_0, accumulator_1){
  this.consumer_0 = consumer_0;
  this.accumulator_1 = accumulator_1;
}

defineClass(209, 1, {}, StreamImpl$lambda$5$Type);
_.accept_0 = function accept_6(arg0){
  $accept_0(this, arg0);
}
;
var Ljava_util_stream_StreamImpl$lambda$5$Type_2_classLit = createForClass('java.util.stream', 'StreamImpl/lambda$5$Type', 209);
function stampJavaTypeInfo_1(array, referenceType){
  return stampJavaTypeInfo_0(array, referenceType);
}

function $groupStart(msg, expanded){
  (!expanded && console.groupCollapsed != null?console.groupCollapsed:console.group != null?console.group:console.log).call(console, msg);
}

function $log_0(level, message){
  var logFn;
  logFn = console[level];
  logFn.call(console, message);
}

function $log_1(this$static, level, t, label_0, expanded){
  var cause, suppressed, suppressed$array, suppressed$index, suppressed$max;
  $groupStart(label_0 + $toString_0(t, t.getMessage()), expanded);
  $log_0(level, getBackingErrorStack(t));
  cause = t.cause_0;
  !!cause && $log_1(this$static, level, cause, 'Caused by: ', false);
  for (suppressed$array = (t.suppressedExceptions == null && (t.suppressedExceptions = initUnidimensionalArray(Ljava_lang_Throwable_2_classLit, $intern_0, 11, 0, 0, 1)) , t.suppressedExceptions) , suppressed$index = 0 , suppressed$max = suppressed$array.length; suppressed$index < suppressed$max; ++suppressed$index) {
    suppressed = suppressed$array[suppressed$index];
    $log_1(this$static, level, suppressed, 'Suppressed: ', false);
  }
  console.groupEnd != null && console.groupEnd.call(console);
}

function ConsoleLogger(){
}

function getBackingErrorStack(t){
  var backingError = t.backingJsObject;
  function stringify(fnStack){
    if (!fnStack || fnStack.length == 0) {
      return '';
    }
    return '\t' + fnStack.join('\n\t');
  }

  return backingError && (backingError.stack || stringify(t['fnStack']));
}

defineClass(265, 1, {}, ConsoleLogger);
var Ljavaemul_internal_ConsoleLogger_2_classLit = createForClass('javaemul.internal', 'ConsoleLogger', 265);
defineClass(372, 1, {});
function ASIEvaluationException(message){
  Exception.call(this, message);
}

defineClass(118, 17, $intern_1, ASIEvaluationException);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_ASIEvaluationException_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance', 'ASIEvaluationException', 118);
function ASIParsingException(message){
  Exception.call(this, message);
}

defineClass(15, 17, $intern_1, ASIParsingException);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_ASIParsingException_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance', 'ASIParsingException', 15);
function ASIJs(xmlString){
  var doc, map_0, algNameVersionDate, lowestLevelDefinition, lowestLevelOriginalSir, drugAndFullNames, drugClassAndDrugs, geneAndDrugClasses, algInfo, algName, nodes0, algVersion, nodes1, algDate, dateNode, nodes;
  this.xmlString = xmlString;
  $clinit_JsXmlAsiTransformer();
  this.genes = $transform(xmlString);
  this.algorithmInfo = (doc = $parseXml(xmlString) , map_0 = new HashMap , algNameVersionDate = (algInfo = new HashMap , algName = $trim((nodes0 = $queryNodes(doc, 'ALGORITHM/ALGNAME') , nodes0.array.length == 0?null:(checkCriticalElementIndex(0, nodes0.array.length) , castToNative(nodes0.array[0], $wnd.Node))).textContent) , algVersion = $trim((nodes1 = $queryNodes(doc, 'ALGORITHM/ALGVERSION') , nodes1.array.length == 0?null:(checkCriticalElementIndex(0, nodes1.array.length) , castToNative(nodes1.array[0], $wnd.Node))).textContent) , algDate = 'NA' , dateNode = (nodes = $queryNodes(doc, 'ALGORITHM/ALGDATE') , nodes.array.length == 0?null:(checkCriticalElementIndex(0, nodes.array.length) , castToNative(nodes.array[0], $wnd.Node))) , dateNode != null && (algDate = $trim(dateNode.textContent)) , $put_1(algInfo.stringMap, 'ALGNAME', algName) , $put_1(algInfo.stringMap, 'ALGVERSION', algVersion) , $put_1(algInfo.stringMap, 'ALGDATE', algDate) , algInfo) , $put_1(map_0.stringMap, 'ALGNAME_ALGVERSION_ALGDATE', algNameVersionDate) , $put_1(map_0.stringMap, 'ALGNAME_ALGVERSION', algNameVersionDate) , lowestLevelDefinition = castTo($getStringValue($createLevelMap(doc), '1'), 23) , lowestLevelOriginalSir = new HashMap , $putStringValue(lowestLevelOriginalSir, 'ORIGINAL', lowestLevelDefinition.text_0) , $putStringValue(lowestLevelOriginalSir, 'SIR', lowestLevelDefinition.sir) , $put_1(map_0.stringMap, 'ORDER1_ORIGINAL_SIR', lowestLevelOriginalSir) , drugAndFullNames = $parseForDrugAndFullNames(doc) , $put_1(map_0.stringMap, 'DRUG_FULLNAME', drugAndFullNames) , drugClassAndDrugs = $parseForDrugClassesAndDrugs(doc, drugAndFullNames) , $put_1(map_0.stringMap, 'DRUGCLASS_DRUGLIST', drugClassAndDrugs) , geneAndDrugClasses = $parseForGeneAndDrugClasses(doc, drugClassAndDrugs) , $put_1(map_0.stringMap, 'GENE_DRUGCLASSLIST', geneAndDrugClasses) , map_0);
}

function lambda$3(mut_0){
  return mut_0.length > 1?mut_0[1]:'';
}

defineClass(285, 1, {}, ASIJs);
_.evaluate = function evaluate(mutations){
  var entry, entry$iterator, gene, geneMuts, geneName, geneResults, invalidMutations, mut, mut$iterator, mutList, mutationComparator, mutsByGene, asArray;
  mutList = (asArray = mutations , new Arrays$ArrayList(asArray));
  mutsByGene = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(mutList, 16)), new ASIJs$lambda$0$Type), groupingBy(mapping(of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [($clinit_Collector$Characteristics() , IDENTITY_FINISH)]))))), 43);
  geneResults = new ArrayList;
  invalidMutations = new ArrayList;
  mutationComparator = new StringMutationComparator;
  for (entry$iterator = mutsByGene.entrySet().iterator_0(); entry$iterator.hasNext_0();) {
    entry = castTo(entry$iterator.next_1(), 13);
    geneName = castToString(entry.getKey());
    geneMuts = castTo(entry.getValue(), 18);
    gene = castTo($getStringValue(this.genes, geneName), 35);
    for (mut$iterator = geneMuts.iterator_0(); mut$iterator.hasNext_0();) {
      mut = castToString(mut$iterator.next_1());
      (!gene || !$booleanValue($matches($matcher(($clinit_StringMutationComparator() , MUTATION_PATTERN), (checkCriticalNotNull(mut) , mut))))) && (push_1(invalidMutations.array, "'" + geneName + (mut == ''?'':':' + mut) + "'") , true);
    }
    !!gene && invalidMutations.array.length == 0 && $add_1(geneResults, $evaluate_2(gene, geneMuts, mutationComparator));
  }
  if (invalidMutations.array.length != 0) {
    throw toJs(new ASIEvaluationException(lenientFormat('Invalid mutations: %s', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [join_1(invalidMutations)]))));
  }
  return of_2(geneResults);
}
;
_.getAlgorithmInfo = function getAlgorithmInfo(){
  return of_2(this.algorithmInfo);
}
;
_.getTransformResults = function getTransformResults(){
  return this.genes;
}
;
_.getXMLString = function getXMLString(){
  return this.xmlString;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_client_ASIJs_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.client', 'ASIJs', 285);
function ASIJs$lambda$0$Type(){
}

defineClass(179, 1, {}, ASIJs$lambda$0$Type);
_.apply_0 = function apply_3(arg0){
  return $split(castToString(arg0), ':', 2);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_client_ASIJs$lambda$0$Type_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.client', 'ASIJs/lambda$0$Type', 179);
function of_2(input_0){
  var collected;
  if (instanceOf(input_0, 43)) {
    return toJsPropertyMap(castTo(input_0, 43));
  }
   else if (instanceOf(input_0, 19)) {
    return new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected = castTo($collect($map(castTo(input_0, 19).stream(), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [($clinit_Collector$Characteristics() , IDENTITY_FINISH)]))), 18) , collected.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected.size(), 5, 1)))))));
  }
   else if (instanceOf(input_0, 45)) {
    return castTo(input_0, 45).value_0;
  }
   else if (instanceOfDouble(input_0)) {
    return $doubleValue(castToDouble(input_0));
  }
   else if (instanceOf(input_0, 23)) {
    return toJsPropertyMap_2(castTo(input_0, 23));
  }
   else if (instanceOf(input_0, 40)) {
    return toJsPropertyMap_0(castTo(input_0, 40));
  }
   else if (instanceOf(input_0, 88)) {
    return toJsPropertyMap_1(castTo(input_0, 88));
  }
   else if (instanceOf(input_0, 79)) {
    return toJsPropertyMap_4(castTo(input_0, 79));
  }
   else if (instanceOf(input_0, 80)) {
    return toJsPropertyMap_5(castTo(input_0, 80));
  }
   else if (instanceOf(input_0, 95)) {
    return toJsPropertyMap_8(castTo(input_0, 95));
  }
   else if (instanceOf(input_0, 62)) {
    return toJsPropertyMap_3(castTo(input_0, 62));
  }
   else if (instanceOf(input_0, 94)) {
    return toJsPropertyMap_6(castTo(input_0, 94));
  }
   else if (instanceOf(input_0, 96)) {
    return toJsPropertyMap_7(castTo(input_0, 96));
  }
  return input_0;
}

function toJsPropertyMap(input_0){
  var entry, entry$iterator, jsmap, key, val;
  jsmap = {};
  for (entry$iterator = input_0.entrySet().iterator_0(); entry$iterator.hasNext_0();) {
    entry = castTo(entry$iterator.next_1(), 13);
    key = toString_3(entry.getKey());
    val = of_2(entry.getValue());
    jsmap[key] = val;
  }
  return jsmap;
}

function toJsPropertyMap_0(cmt){
  var cmtResult;
  if (!cmt) {
    return null;
  }
  cmtResult = {};
  cmtResult['id'] = cmt.id_0;
  cmtResult['sort'] = cmt.sort_0.value_0;
  cmtResult['text'] = cmt.text_0;
  return cmtResult;
}

function toJsPropertyMap_1(def){
  var defResult;
  if (!def) {
    return null;
  }
  instanceOf(def, 23)?(defResult = toJsPropertyMap_2(castTo(def, 23))):instanceOf(def, 40)?(defResult = toJsPropertyMap_0(castTo(def, 40))):(defResult = {});
  return defResult;
}

function toJsPropertyMap_2(level){
  var levelResult;
  if (!level) {
    return null;
  }
  levelResult = {};
  levelResult['order'] = level.order.value_0;
  levelResult['SIR'] = level.sir;
  levelResult['text'] = level.text_0;
  return levelResult;
}

function toJsPropertyMap_3(evalCond){
  var collected, collected0, collected1, condResult, evaluator, score;
  if (!evalCond) {
    return null;
  }
  condResult = {};
  evaluator = evalCond.evaluator;
  condResult['result'] = (score = castToDouble($peek(evaluator.stack_0)) , evaluator.isBooleanResult?($clinit_Boolean() , $equals_0(score, ($clinit_AsiGrammarAdapter() , TRUE_VALUE))?true:false):score);
  condResult['statement'] = evalCond.ruleCondition.statement;
  condResult['scoredMutations'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected0 = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evaluator.allScoredMutations, 1)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [($clinit_Collector$Characteristics() , IDENTITY_FINISH)]))), 18) , collected0.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected0.size(), 5, 1)))))));
  condResult['scoredItems'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected1 = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evaluator.scoredItems, 16)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [IDENTITY_FINISH]))), 18) , collected1.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected1.size(), 5, 1)))))));
  condResult['definitions'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evalCond.definitions, 1)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [IDENTITY_FINISH]))), 18) , collected.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected.size(), 5, 1)))))));
  return condResult;
}

function toJsPropertyMap_4(evalDrug){
  var collected, collected0, drug, drugResult;
  if (!evalDrug) {
    return null;
  }
  drugResult = {};
  drug = evalDrug.drug;
  drugResult['drugName'] = drug.name_0;
  drugResult['drugFullName'] = drug.fullName;
  drugResult['highestLevel'] = toJsPropertyMap_2($size_0(evalDrug.levelDefinitions.map_0) > 0?castTo(max_1(evalDrug.levelDefinitions, new LevelDefinitionComparator), 23):null);
  drugResult['levels'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected0 = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evalDrug.levelDefinitions, 1)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [($clinit_Collector$Characteristics() , IDENTITY_FINISH)]))), 18) , collected0.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected0.size(), 5, 1)))))));
  drugResult['conditions'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evalDrug.evaluatedConditions, 16)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [IDENTITY_FINISH]))), 18) , collected.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected.size(), 5, 1)))))));
  return drugResult;
}

function toJsPropertyMap_5(evalDC){
  var collected, dcResult;
  if (!evalDC) {
    return null;
  }
  dcResult = {};
  dcResult['drugClassName'] = evalDC.drugClass.name_0;
  dcResult['drugs'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evalDC.evaluatedDrugs, 16)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [($clinit_Collector$Characteristics() , IDENTITY_FINISH)]))), 18) , collected.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected.size(), 5, 1)))))));
  return dcResult;
}

function toJsPropertyMap_6(evalGene){
  var collected, collected0, collected1, collected2, geneResult;
  if (!evalGene) {
    return null;
  }
  geneResult = {};
  geneResult['geneName'] = evalGene.gene.name_0;
  geneResult['drugClasses'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected0 = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evalGene.evaluatedDrugClasses, 16)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [($clinit_Collector$Characteristics() , IDENTITY_FINISH)]))), 18) , collected0.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected0.size(), 5, 1)))))));
  geneResult['mutationComments'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected1 = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evalGene.geneCommentDefinitions, 1)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [IDENTITY_FINISH]))), 18) , collected1.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected1.size(), 5, 1)))))));
  geneResult['resultComments'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected2 = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evalGene.evaluatedResultCommentRules, 16)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [IDENTITY_FINISH]))), 18) , collected2.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected2.size(), 5, 1)))))));
  geneResult['scoredMutations'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(evalGene.geneScoredMutations, 1)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [IDENTITY_FINISH]))), 18) , collected.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected.size(), 5, 1)))))));
  return geneResult;
}

function toJsPropertyMap_7(resultComment){
  var cmtResult, collected, collected0, rule;
  if (!resultComment) {
    return null;
  }
  cmtResult = {};
  cmtResult['result'] = resultComment.evaluationResult;
  cmtResult['definitions'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected0 = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(resultComment.definitions, 1)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [($clinit_Collector$Characteristics() , IDENTITY_FINISH)]))), 18) , collected0.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected0.size(), 5, 1)))))));
  rule = resultComment.resultCommentRule;
  cmtResult['levelConditions'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected = castTo($collect($map(castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(rule.levelConditions, 16)), new JsObjectify$lambda$1$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [IDENTITY_FINISH]))), 19).stream(), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [IDENTITY_FINISH]))), 18) , collected.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected.size(), 5, 1)))))));
  return cmtResult;
}

function toJsPropertyMap_8(item_0){
  var collected, itemResult;
  if (!item_0) {
    return null;
  }
  itemResult = {};
  itemResult['mutations'] = new ($wnd.Array.bind.apply($wnd.Array, [null].concat(ensureNotNull((collected = castTo($collect($map(new StreamImpl(null, new Spliterators$IteratorSpliterator(item_0.mutations, 1)), new JsObjectify$lambda$0$Type), of_1(new Collectors$21methodref$ctor$Type, new Collectors$20methodref$add$Type, new Collectors$lambda$42$Type, stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 20, 0, [($clinit_Collector$Characteristics() , IDENTITY_FINISH)]))), 18) , collected.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, collected.size(), 5, 1)))))));
  itemResult['value'] = item_0.value_0;
  itemResult['score'] = item_0.score;
  return itemResult;
}

function JsObjectify$lambda$0$Type(){
}

defineClass(31, 1, {}, JsObjectify$lambda$0$Type);
_.apply_0 = function apply_4(arg0){
  return of_2(arg0);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_client_JsObjectify$lambda$0$Type_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.client', 'JsObjectify/lambda$0$Type', 31);
function JsObjectify$lambda$1$Type(){
}

defineClass(184, 1, {}, JsObjectify$lambda$1$Type);
_.apply_0 = function apply_5(arg0){
  return $toString_3(castTo(arg0, 100));
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_client_JsObjectify$lambda$1$Type_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.client', 'JsObjectify/lambda$1$Type', 184);
function $matches(this$static){
  this$static.result = $exec(this$static.pattern, this$static.input_0);
  return $clinit_Boolean() , !!this$static.result && this$static.result.index == 0 && this$static.pattern.lastIndex == this$static.input_0.length?true:false;
}

function Matcher(regex, input_0){
  this.pattern = new RegExp(regex, 'g');
  this.input_0 = input_0;
}

defineClass(214, 1, {}, Matcher);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_compatregex_Matcher_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.compatregex', 'Matcher', 214);
function $matcher(this$static, input_0){
  return new Matcher(this$static.regex, input_0);
}

function Pattern(regex){
  this.regex = regex;
}

defineClass(123, 1, {}, Pattern);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_compatregex_Pattern_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.compatregex', 'Pattern', 123);
function CommentAction(comment){
  this.comment = comment;
}

defineClass(102, 1, {102:1, 143:1}, CommentAction);
_.evaluate_0 = function evaluate_0(result){
  var reslt;
  return reslt = castToBoolean(result) , (checkCriticalNotNull(reslt) , reslt)?this.comment:null;
}
;
_.supports_0 = function supports(resultType){
  return resultType == Ljava_lang_Boolean_2_classLit;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_CommentAction_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'CommentAction', 102);
function CommentDefinition(id_0, text_0){
  this.id_0 = id_0;
  this.text_0 = text_0;
}

function CommentDefinition_0(id_0, text_0, sort_0){
  this.id_0 = id_0;
  this.text_0 = text_0;
  this.sort_0 = sort_0;
}

defineClass(40, 1, {40:1, 88:1}, CommentDefinition, CommentDefinition_0);
_.toString_0 = function toString_16(){
  return lenientFormat('{id: %s, text: %s, sort: %s}', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [this.id_0, this.text_0, this.sort_0]));
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_CommentDefinition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'CommentDefinition', 40);
function $evaluate(this$static, mutations, comparator){
  var evaluatedConditions, evaluatedMutationTypes, evaluatedMutations, m, m$iterator, mt, mutationType, mutationType$iterator, rule, rule$iterator;
  evaluatedConditions = new ArrayList;
  for (rule$iterator = new ArrayList$1(this$static.drugRules); rule$iterator.i < rule$iterator.this$01.array.length;) {
    rule = castTo($next_1(rule$iterator), 97);
    $add_1(evaluatedConditions, $evaluate_5(rule, mutations, comparator));
  }
  evaluatedMutationTypes = new ArrayList;
  if (this$static.mutationTypes) {
    for (mutationType$iterator = new ArrayList$1(this$static.mutationTypes); mutationType$iterator.i < mutationType$iterator.this$01.array.length;) {
      mutationType = castTo($next_1(mutationType$iterator), 104);
      evaluatedMutations = new ArrayList;
      for (m$iterator = mutations.iterator_0(); m$iterator.hasNext_0();) {
        m = m$iterator.next_1();
        mutationType.mutations.contains(m) && $add_1(evaluatedMutations, castToString(m));
      }
      mt = new MutationType(mutationType.name_0, evaluatedMutations);
      push_1(evaluatedMutationTypes.array, mt);
    }
  }
  this$static.mutationTypes = evaluatedMutationTypes;
  return new EvaluatedDrug(this$static, evaluatedConditions);
}

function Drug(drugName, drugFullName, drugRules, mutationTypes, defaultLevel){
  this.fullName = drugFullName;
  this.name_0 = drugName;
  this.drugRules = drugRules;
  this.mutationTypes = mutationTypes;
  this.defaultLevel = defaultLevel;
}

defineClass(83, 1, {83:1}, Drug);
_.toString_0 = function toString_17(){
  return this.name_0;
}
;
_.defaultLevel = 0;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_Drug_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'Drug', 83);
function $evaluate_0(this$static, mutations, comparator){
  var drug, drug$iterator, entry, evaluatedDrugs, outerIter;
  evaluatedDrugs = new ArrayList;
  for (drug$iterator = (outerIter = (new AbstractMap$1(this$static.drugs.map_0)).this$01.entrySet().iterator_0() , new AbstractMap$1$1(outerIter)); drug$iterator.val$outerIter2.hasNext_0();) {
    drug = (entry = castTo(drug$iterator.val$outerIter2.next_1(), 13) , castTo(entry.getKey(), 83));
    $add_1(evaluatedDrugs, $evaluate(drug, mutations, comparator));
  }
  return new EvaluatedDrugClass(this$static, evaluatedDrugs);
}

function DrugClass(name_0, drugs){
  this.name_0 = name_0;
  this.drugs = drugs;
}

defineClass(81, 1, {81:1}, DrugClass);
_.toString_0 = function toString_18(){
  return this.name_0;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_DrugClass_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'DrugClass', 81);
function $evaluate_1(this$static, drugToCompare, level){
  var comparison, comparison$iterator, result;
  result = $equals_1(drugToCompare, this$static.drugName) && this$static.comparisons.array.length > 0;
  for (comparison$iterator = new ArrayList$1(this$static.comparisons); comparison$iterator.i < comparison$iterator.this$01.array.length;) {
    comparison = castTo($next_1(comparison$iterator), 48);
    result = result && $evaluate_3(comparison, level);
  }
  return new EvaluatedDrugLevelCondition(this$static, result, level, drugToCompare);
}

function $toString_3(this$static){
  var buffer, comparison, comparison$iterator, delim;
  buffer = new StringBuffer;
  delim = '';
  $append_0(buffer, this$static.drugName + ' {');
  for (comparison$iterator = new ArrayList$1(this$static.comparisons); comparison$iterator.i < comparison$iterator.this$01.array.length;) {
    comparison = castTo($next_1(comparison$iterator), 48);
    buffer.string += delim;
    $append_0(buffer, comparison.operator + ' ' + comparison.levelOrder);
    delim = ' AND ';
  }
  buffer.string += '}';
  return buffer.string;
}

function DrugLevelCondition(drugName){
  this.drugName = drugName;
  this.comparisons = new ArrayList;
}

defineClass(100, 1, {100:1}, DrugLevelCondition);
_.toString_0 = function toString_19(){
  return $toString_3(this);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_DrugLevelCondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'DrugLevelCondition', 100);
function $evaluate_2(this$static, mutations, comparator){
  var drugClass, drugClass$iterator, drugLevelResults, evaluatedDrug, evaluatedDrugClass, evaluatedDrugClassObj, evaluatedDrugClassObj$iterator, evaluatedDrugClasses, evaluatedDrugObj, evaluatedDrugObj$iterator, evaluatedGeneRules, evaluatedResultComments, finalLevel, geneRule, geneRule$iterator, resultCommentRule, resultCommentRule$iterator, updatedMutations;
  updatedMutations = this$static.indelRange?replaceMutationsInRange(mutations, this$static.indelRange):mutations;
  evaluatedGeneRules = new ArrayList;
  for (geneRule$iterator = this$static.geneRules.iterator_0(); geneRule$iterator.hasNext_0();) {
    geneRule = castTo(geneRule$iterator.next_1(), 97);
    $add_1(evaluatedGeneRules, $evaluate_5(geneRule, updatedMutations, comparator));
  }
  evaluatedDrugClasses = new ArrayList;
  for (drugClass$iterator = this$static.drugClasses.iterator_0(); drugClass$iterator.hasNext_0();) {
    drugClass = castTo(drugClass$iterator.next_1(), 81);
    $add_1(evaluatedDrugClasses, $evaluate_0(drugClass, updatedMutations, comparator));
  }
  drugLevelResults = new HashMap;
  for (evaluatedDrugClassObj$iterator = new ArrayList$1(evaluatedDrugClasses); evaluatedDrugClassObj$iterator.i < evaluatedDrugClassObj$iterator.this$01.array.length;) {
    evaluatedDrugClassObj = $next_1(evaluatedDrugClassObj$iterator);
    evaluatedDrugClass = castTo(evaluatedDrugClassObj, 80);
    for (evaluatedDrugObj$iterator = new ArrayList$1(evaluatedDrugClass.evaluatedDrugs); evaluatedDrugObj$iterator.i < evaluatedDrugObj$iterator.this$01.array.length;) {
      evaluatedDrugObj = $next_1(evaluatedDrugObj$iterator);
      evaluatedDrug = castTo(evaluatedDrugObj, 79);
      finalLevel = ($size_0(evaluatedDrug.levelDefinitions.map_0) > 0?castTo(max_1(evaluatedDrug.levelDefinitions, new LevelDefinitionComparator), 23):null)?$size_0(evaluatedDrug.levelDefinitions.map_0) > 0?castTo(max_1(evaluatedDrug.levelDefinitions, new LevelDefinitionComparator), 23):null:new LevelDefinition(valueOf_0(evaluatedDrug.drug.defaultLevel), '', '');
      $putStringValue(drugLevelResults, evaluatedDrug.drug.name_0, finalLevel);
    }
  }
  evaluatedResultComments = new ArrayList;
  for (resultCommentRule$iterator = new ArrayList$1(this$static.resultCommentRules); resultCommentRule$iterator.i < resultCommentRule$iterator.this$01.array.length;) {
    resultCommentRule = castTo($next_1(resultCommentRule$iterator), 121);
    $add_1(evaluatedResultComments, $evaluate_4(resultCommentRule, drugLevelResults));
  }
  return new EvaluatedGene(this$static, evaluatedGeneRules, evaluatedDrugClasses, evaluatedResultComments);
}

function Gene(name_0, geneRules){
  Gene_0.call(this, name_0, new HashSet, geneRules);
}

function Gene_0(name_0, drugClasses, geneRules){
  Gene_1.call(this, name_0, drugClasses, geneRules, new ArrayList);
}

function Gene_1(name_0, drugClasses, geneRules, resultCommentRules){
  Gene_2.call(this, name_0, drugClasses, geneRules, resultCommentRules, null);
}

function Gene_2(name_0, drugClasses, geneRules, resultCommentRules, indelRange){
  Gene_3.call(this, name_0, drugClasses, geneRules, resultCommentRules, indelRange, 0);
}

function Gene_3(name_0, drugClasses, geneRules, resultCommentRules, indelRange, defaultLevel){
  this.name_0 = name_0;
  this.drugClasses = drugClasses;
  this.geneRules = geneRules;
  this.resultCommentRules = resultCommentRules;
  this.indelRange = indelRange;
  this.defaultLevel = defaultLevel;
}

function Gene_4(name_0, drugClasses, indelRange){
  Gene_2.call(this, name_0, drugClasses, new ArrayList, new ArrayList, indelRange);
}

function replaceMutationsInRange(mutationList, indelRange){
  var mut, o, o$iterator, res;
  res = new ArrayList;
  for (o$iterator = mutationList.iterator_0(); o$iterator.hasNext_0();) {
    o = o$iterator.next_1();
    mut = toString_3(o);
    $indexOf(indelRange.input_0, mut) != -1?$add_1(res, indelRange.output):(push_1(res.array, mut) , true);
  }
  return res;
}

defineClass(35, 1, {35:1}, Gene, Gene_3, Gene_4);
_.toString_0 = function toString_20(){
  return this.name_0;
}
;
_.defaultLevel = 0;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_Gene_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'Gene', 35);
function IndelRangeDefinition(input_0, output){
  this.input_0 = input_0;
  this.output = output;
}

defineClass(194, 1, {}, IndelRangeDefinition);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_IndelRangeDefinition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'IndelRangeDefinition', 194);
function LevelAction(level){
  this.level = level;
}

defineClass(225, 1, {143:1}, LevelAction);
_.evaluate_0 = function evaluate_1(result){
  var reslt;
  return reslt = castToBoolean(result) , (checkCriticalNotNull(reslt) , reslt)?this.level:null;
}
;
_.supports_0 = function supports_0(resultType){
  return resultType == Ljava_lang_Boolean_2_classLit;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_LevelAction_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'LevelAction', 225);
function $clinit_LevelConditionComparison(){
  $clinit_LevelConditionComparison = emptyMethod;
  LTE = 'LTE';
  GTE = 'GTE';
  LT = 'LT';
  GT = 'GT';
  EQ = 'EQ';
  NEQ = 'NEQ';
  possibleOperators = new HashSet_0(new Arrays$ArrayList(stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_String_2_classLit, 1), $intern_3, 2, 6, [LTE, GTE, LT, GT, EQ, NEQ])));
}

function $evaluate_3(this$static, level){
  var order, result;
  order = level.order;
  switch (this$static.operator.toUpperCase()) {
    case 'LTE':
      result = order.value_0 <= this$static.levelOrder.value_0;
      break;
    case 'GTE':
      result = order.value_0 >= this$static.levelOrder.value_0;
      break;
    case 'GT':
      result = order.value_0 > this$static.levelOrder.value_0;
      break;
    case 'LT':
      result = order.value_0 < this$static.levelOrder.value_0;
      break;
    case 'EQ':
      result = order == this$static.levelOrder;
      break;
    case 'NEQ':
      result = order != this$static.levelOrder;
      break;
    default:result = false;
  }
  return result;
}

function LevelConditionComparison(levelOrder, operator){
  $clinit_LevelConditionComparison();
  this.levelOrder = levelOrder;
  if (!$contains_0(possibleOperators, operator)) {
    throw toJs(new ASIParsingException('Invalid level comparison operator: ' + operator));
  }
  this.operator = operator;
}

defineClass(48, 1, {48:1}, LevelConditionComparison);
_.toString_0 = function toString_21(){
  return this.operator + ' ' + this.levelOrder;
}
;
var EQ, GT, GTE, LT, LTE, NEQ, possibleOperators;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_LevelConditionComparison_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'LevelConditionComparison', 48);
function $toString_4(this$static){
  return lenientFormat('{order: %s, text: %s, sir: %s}', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [this$static.order, this$static.text_0, this$static.sir]));
}

function LevelDefinition(order, text_0, sir){
  this.order = order;
  this.text_0 = text_0;
  this.sir = sir;
}

defineClass(23, 1, {88:1, 23:1}, LevelDefinition);
_.toString_0 = function toString_22(){
  return $toString_4(this);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_LevelDefinition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'LevelDefinition', 23);
function $compare_1(level1, level2){
  return $compareTo_3(level1.order, level2.order);
}

function LevelDefinitionComparator(){
}

defineClass(99, 1, {}, LevelDefinitionComparator);
_.compare = function compare_4(level1, level2){
  return $compare_1(castTo(level1, 23), castTo(level2, 23));
}
;
_.equals_0 = function equals_11(other){
  return this === other;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_LevelDefinitionComparator_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'LevelDefinitionComparator', 99);
function MutationType(name_0, mutations){
  this.name_0 = name_0;
  this.mutations = mutations;
}

defineClass(104, 1, {104:1}, MutationType);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_MutationType_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'MutationType', 104);
function $withinRange(this$static, score){
  return score >= this$static.min_0 && score <= this$static.max_0;
}

function RangeValue(min_0, max_0, level){
  this.min_0 = min_0;
  this.max_0 = max_0;
  this.level = level;
}

defineClass(63, 1, {63:1}, RangeValue);
_.toString_0 = function toString_23(){
  return this.min_0 + ' to ' + this.max_0 + ' => ' + this.level.order;
}
;
_.max_0 = 0;
_.min_0 = 0;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_RangeValue_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'RangeValue', 63);
function $evaluate_4(this$static, drugResultLevels){
  var action, action$iterator, drugLevelCondition, drugLevelCondition$iterator, drugName, drugResultLevel, evaluatedDrugLevelCondition, evaluatedDrugLevelCondition$iterator, evaluatedDrugLevelConditions, evaluatedResultCommentRule, reslt, result;
  evaluatedDrugLevelConditions = new ArrayList;
  for (drugLevelCondition$iterator = new ArrayList$1(this$static.levelConditions); drugLevelCondition$iterator.i < drugLevelCondition$iterator.this$01.array.length;) {
    drugLevelCondition = castTo($next_1(drugLevelCondition$iterator), 100);
    drugName = drugLevelCondition.drugName;
    if (drugName == null?!!$getEntry(drugResultLevels.hashCodeMap, null):$contains_1(drugResultLevels.stringMap, drugName)) {
      drugResultLevel = castTo(drugName == null?getEntryValueOrNull($getEntry(drugResultLevels.hashCodeMap, null)):$get_1(drugResultLevels.stringMap, drugName), 23);
      $add_1(evaluatedDrugLevelConditions, $evaluate_1(drugLevelCondition, drugName, drugResultLevel));
    }
  }
  result = ($clinit_Boolean() , evaluatedDrugLevelConditions.array.length > 0?true:false);
  for (evaluatedDrugLevelCondition$iterator = new ArrayList$1(evaluatedDrugLevelConditions); evaluatedDrugLevelCondition$iterator.i < evaluatedDrugLevelCondition$iterator.this$01.array.length;) {
    evaluatedDrugLevelCondition = castTo($next_1(evaluatedDrugLevelCondition$iterator), 101);
    result = (checkCriticalNotNull(result) , result) && $booleanValue(evaluatedDrugLevelCondition.evaluationResult)?true:false;
  }
  evaluatedResultCommentRule = new EvaluatedResultCommentRule(this$static, (checkCriticalNotNull(result) , result), evaluatedDrugLevelConditions);
  for (action$iterator = new ArrayList$1(this$static.levelActions); action$iterator.i < action$iterator.this$01.array.length;) {
    action = castTo($next_1(action$iterator), 102);
    $addDefinition_0(evaluatedResultCommentRule, (reslt = result , (checkCriticalNotNull(reslt) , reslt)?action.comment:null));
  }
  return evaluatedResultCommentRule;
}

function ResultCommentRule(conditions, actions){
  this.levelConditions = conditions;
  this.levelActions = actions;
}

defineClass(121, 1, {121:1}, ResultCommentRule);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_ResultCommentRule_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'ResultCommentRule', 121);
function $evaluate_5(this$static, mutations, comparator){
  var action, action$iterator, evaluatedCondition, evaluator, score, score0, score1;
  evaluatedCondition = $evaluate_6(this$static.condition, mutations, comparator);
  evaluator = evaluatedCondition.evaluator;
  for (action$iterator = new ArrayList$1(this$static.actions_0); action$iterator.i < action$iterator.this$01.array.length;) {
    action = castTo($next_1(action$iterator), 143);
    if (!action.supports_0((score0 = castToDouble($peek(evaluator.stack_0)) , getClass__Ljava_lang_Class___devirtual$(evaluator.isBooleanResult?($clinit_Boolean() , $equals_0(score0, ($clinit_AsiGrammarAdapter() , TRUE_VALUE))?true:false):score0)))) {
      throw toJs(new ASIEvaluationException('Action: ' + action + '; does not support a result of type: ' + (score1 = castToDouble($peek(evaluator.stack_0)) , getClass__Ljava_lang_Class___devirtual$(evaluator.isBooleanResult?($clinit_Boolean() , $equals_0(score1, ($clinit_AsiGrammarAdapter() , TRUE_VALUE))?true:false):score1))));
    }
    $addDefinition(evaluatedCondition, action.evaluate_0((score = castToDouble($peek(evaluator.stack_0)) , evaluator.isBooleanResult?($clinit_Boolean() , $equals_0(score, ($clinit_AsiGrammarAdapter() , TRUE_VALUE))?true:false):score)));
  }
  return evaluatedCondition;
}

function $moreThanOneScoreRange(actions){
  var action, action$iterator, scoreRangeActionCount;
  scoreRangeActionCount = 0;
  for (action$iterator = new ArrayList$1(actions); action$iterator.i < action$iterator.this$01.array.length;) {
    action = castTo($next_1(action$iterator), 143);
    instanceOf(action, 125) && (scoreRangeActionCount += 1);
  }
  return scoreRangeActionCount > 1;
}

function Rule(condition, actions){
  if (actions.array.length == 0) {
    throw toJs(new ASIParsingException('no action exists for the rule:\n' + condition.statement));
  }
   else if ($moreThanOneScoreRange(actions)) {
    throw toJs(new ASIParsingException('more than one score range for the rule:\n' + condition.statement));
  }
  this.condition = condition;
  this.actions_0 = actions;
}

defineClass(97, 1, {97:1}, Rule);
_.toString_0 = function toString_24(){
  return this.condition.statement;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_Rule_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'Rule', 97);
function $evaluate_6(this$static, mutations, comparator){
  var adapter;
  adapter = new AsiGrammarAdapter(mutations, comparator);
  $apply_7(this$static.conditionTree, adapter);
  return new EvaluatedCondition(this$static, adapter);
}

function RuleCondition(statement){
  var e, parser;
  this.statement = statement;
  parser = new Parser(new Lexer(statement));
  try {
    this.conditionTree = $parse(parser);
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 17)) {
      e = $e0;
      throw toJs(new ASIParsingException('Invalid condition statement: ' + statement + '\r\n original error: ' + e));
    }
     else 
      throw toJs($e0);
  }
}

defineClass(201, 1, {}, RuleCondition);
_.toString_0 = function toString_25(){
  return this.statement;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_RuleCondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'RuleCondition', 201);
function $checkForOverlappingRanges(rangeValues){
  var rangeValue1, rangeValue1$iterator, rangeValue2, rangeValue2$iterator;
  for (rangeValue1$iterator = new ArrayList$1(rangeValues); rangeValue1$iterator.i < rangeValue1$iterator.this$01.array.length;) {
    rangeValue1 = castTo($next_1(rangeValue1$iterator), 63);
    for (rangeValue2$iterator = new ArrayList$1(rangeValues); rangeValue2$iterator.i < rangeValue2$iterator.this$01.array.length;) {
      rangeValue2 = castTo($next_1(rangeValue2$iterator), 63);
      if (!equals_Ljava_lang_Object__Z__devirtual$(rangeValue1, rangeValue2) && (rangeValue1.min_0 <= rangeValue2.min_0 && rangeValue2.min_0 <= rangeValue1.max_0 || rangeValue2.min_0 <= rangeValue1.min_0 && rangeValue1.min_0 <= rangeValue2.max_0)) {
        throw toJs(new ASIParsingException('Score range values overlap: ' + rangeValue1 + ', ' + rangeValue2));
      }
    }
  }
}

function $evaluate_7(this$static, result){
  var rangeValue, rangeValue$iterator, reslt;
  reslt = castToDouble(result);
  for (rangeValue$iterator = new ArrayList$1(this$static.rangeValues); rangeValue$iterator.i < rangeValue$iterator.this$01.array.length;) {
    rangeValue = castTo($next_1(rangeValue$iterator), 63);
    if ($withinRange(rangeValue, (checkCriticalNotNull(reslt) , reslt))) {
      return rangeValue.level;
    }
  }
  throw toJs(new ASIEvaluationException('No score range has been defined for a score of: ' + result));
}

function ScoreRangeAction(rangeValues){
  $checkForOverlappingRanges(rangeValues);
  this.rangeValues = rangeValues;
}

defineClass(125, 1, {143:1, 125:1}, ScoreRangeAction);
_.evaluate_0 = function evaluate_2(result){
  return $evaluate_7(this, result);
}
;
_.supports_0 = function supports_1(resultType){
  return resultType == Ljava_lang_Double_2_classLit;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_definition_ScoreRangeAction_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.definition', 'ScoreRangeAction', 125);
function $addDefinition(this$static, definition){
  !!definition && $add_2(this$static.definitions, definition);
}

function EvaluatedCondition(ruleCondition, evaluator){
  this.ruleCondition = ruleCondition;
  this.evaluator = evaluator;
  this.definitions = new HashSet;
}

defineClass(62, 1, {62:1}, EvaluatedCondition);
_.toString_0 = function toString_26(){
  return lenientFormat('\n\t\tstatement: %s,\n\t\tdefinitions: %s}', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [this.ruleCondition, this.definitions]));
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_evaluate_EvaluatedCondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.evaluate', 'EvaluatedCondition', 62);
function $parseEvaluatedConditions(this$static, evaluatedConditions){
  var definition, definition$iterator, definitions, entry, evaluatedCondition, evaluatedCondition$iterator, outerIter;
  this$static.evaluatedConditions = evaluatedConditions;
  for (evaluatedCondition$iterator = new ArrayList$1(evaluatedConditions); evaluatedCondition$iterator.i < evaluatedCondition$iterator.this$01.array.length;) {
    evaluatedCondition = castTo($next_1(evaluatedCondition$iterator), 62);
    $addAll(this$static.scoredMutations, evaluatedCondition.evaluator.allScoredMutations);
    definitions = evaluatedCondition.definitions;
    for (definition$iterator = (outerIter = (new AbstractMap$1(definitions.map_0)).this$01.entrySet().iterator_0() , new AbstractMap$1$1(outerIter)); definition$iterator.val$outerIter2.hasNext_0();) {
      definition = (entry = castTo(definition$iterator.val$outerIter2.next_1(), 13) , castTo(entry.getKey(), 88));
      instanceOf(definition, 23) && $add_2(this$static.levelDefinitions, castTo(definition, 23));
      instanceOf(definition, 40) && $add_2(this$static.commentDefinitions, castTo(definition, 40));
    }
  }
}

function EvaluatedDrug(drug, evaluatedConditions){
  this.drug = drug;
  this.scoredMutations = new HashSet;
  this.levelDefinitions = new HashSet;
  this.commentDefinitions = new HashSet;
  $parseEvaluatedConditions(this, evaluatedConditions);
}

defineClass(79, 1, {79:1}, EvaluatedDrug);
_.toString_0 = function toString_27(){
  var highestLevelDefinition;
  highestLevelDefinition = $size_0(this.levelDefinitions.map_0) > 0?castTo(max_1(this.levelDefinitions, new LevelDefinitionComparator), 23):null;
  return lenientFormat('{Drug: %s, Scored Mutations: %s, Level: %s, Comments: %s}', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [this.drug, this.scoredMutations, !highestLevelDefinition?'':lenientFormat('{order: %s, text: %s, sir: %s}', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [highestLevelDefinition.order, highestLevelDefinition.text_0, highestLevelDefinition.sir])), this.commentDefinitions]));
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_evaluate_EvaluatedDrug_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.evaluate', 'EvaluatedDrug', 79);
function EvaluatedDrugClass(drugClass, evaluatedDrugs){
  this.drugClass = drugClass;
  this.evaluatedDrugs = new ArrayList_0(evaluatedDrugs);
}

defineClass(80, 1, {80:1}, EvaluatedDrugClass);
_.toString_0 = function toString_28(){
  return lenientFormat('{Drug Class: %s, Evaluated Drugs: %s}', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [this.drugClass, this.evaluatedDrugs]));
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_evaluate_EvaluatedDrugClass_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.evaluate', 'EvaluatedDrugClass', 80);
function EvaluatedDrugLevelCondition(drugLevelCondition, evaluationResult, level, drugName){
  this.drugLevelCondition = drugLevelCondition;
  this.evaluationResult = ($clinit_Boolean() , evaluationResult?true:false);
  this.scoredLevel = level;
  this.drugName = drugName;
}

defineClass(101, 1, {101:1}, EvaluatedDrugLevelCondition);
_.toString_0 = function toString_29(){
  return lenientFormat('\n\t\tdrug: %s,\n\t\tlevel condition: %s,\n\t\tresult: %s,\n\t\tscored level: %s', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [this.drugName, this.drugLevelCondition, this.evaluationResult, this.scoredLevel]));
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_evaluate_EvaluatedDrugLevelCondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.evaluate', 'EvaluatedDrugLevelCondition', 101);
function $parseGeneCommentDefinitions(this$static, geneEvaluatedConditions){
  var evaluatedCondition, evaluatedCondition$iterator;
  for (evaluatedCondition$iterator = new ArrayList$1(geneEvaluatedConditions); evaluatedCondition$iterator.i < evaluatedCondition$iterator.this$01.array.length;) {
    evaluatedCondition = castTo($next_1(evaluatedCondition$iterator), 62);
    $addAll(this$static.geneScoredMutations, evaluatedCondition.evaluator.allScoredMutations);
    $addAll(this$static.geneCommentDefinitions, evaluatedCondition.definitions);
  }
}

function EvaluatedGene(gene, geneEvaluatedConditions, evaluatedDrugClasses, evaluatedResultCommentRules){
  this.gene = gene;
  this.evaluatedDrugClasses = evaluatedDrugClasses;
  this.geneScoredMutations = new HashSet;
  this.geneCommentDefinitions = new HashSet;
  $parseGeneCommentDefinitions(this, geneEvaluatedConditions);
  this.evaluatedResultCommentRules = evaluatedResultCommentRules;
}

defineClass(94, 1, {94:1}, EvaluatedGene);
_.toString_0 = function toString_30(){
  return lenientFormat('{Gene: %s, Evaluated Drug Classes: %s, Gene Comments: %s}', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [this.gene, this.evaluatedDrugClasses, this.geneCommentDefinitions]));
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_evaluate_EvaluatedGene_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.evaluate', 'EvaluatedGene', 94);
function $addDefinition_0(this$static, definition){
  !!definition && $add_2(this$static.definitions, definition);
}

function EvaluatedResultCommentRule(resultCommentRule, evaluationResult, evaluatedDrugLevelConditions){
  this.resultCommentRule = resultCommentRule;
  this.evaluationResult = ($clinit_Boolean() , evaluationResult?true:false);
  this.evaluatedDrugLevelConditions = evaluatedDrugLevelConditions;
  this.definitions = new HashSet;
}

defineClass(96, 1, {96:1}, EvaluatedResultCommentRule);
_.toString_0 = function toString_31(){
  var buffer, condition, condition$iterator, definition, definition$iterator, entry, outerIter;
  buffer = new StringBuffer;
  $append_0($append_0((buffer.string += '\t' , buffer), 'Drug Level Conditions:'), '\n');
  for (condition$iterator = new ArrayList$1(this.evaluatedDrugLevelConditions); condition$iterator.i < condition$iterator.this$01.array.length;) {
    condition = castTo($next_1(condition$iterator), 101);
    $append_0($append_0((buffer.string += '\t\t' , buffer), 'Condition: ' + condition.drugLevelCondition), '\n');
    $append($append_0((buffer.string += '\t\t\t' , buffer), 'Scored Level for ' + condition.drugName + ': ' + $toString_4(condition.scoredLevel)), 10);
  }
  $append_0($append_0((buffer.string += '\t' , buffer), 'Definitions:'), '\n');
  for (definition$iterator = (outerIter = (new AbstractMap$1(this.definitions.map_0)).this$01.entrySet().iterator_0() , new AbstractMap$1$1(outerIter)); definition$iterator.val$outerIter2.hasNext_0();) {
    definition = (entry = castTo(definition$iterator.val$outerIter2.next_1(), 13) , castTo(entry.getKey(), 88));
    $append($append_0((buffer.string += '\t\t' , buffer), 'Comment: ' + toString_3(definition)), 10);
  }
  buffer.string += '\n';
  return buffer.string;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_evaluate_EvaluatedResultCommentRule_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.evaluate', 'EvaluatedResultCommentRule', 96);
function $setIn(this$static, node, in_0){
  !this$static.in_0 && (this$static.in_0 = new HashMap_0(1));
  in_0?$put(this$static.in_0, node, in_0):$remove(this$static.in_0, node);
}

function AnalysisAdapter(){
}

defineClass(192, 1, {}, AnalysisAdapter);
_.caseAAndLogicsymbol = function caseAAndLogicsymbol(node){
}
;
_.caseAAtleastSelectstatement2 = function caseAAtleastSelectstatement2(node){
}
;
_.caseAAtleastnotmorethanSelectstatement2 = function caseAAtleastnotmorethanSelectstatement2(node){
}
;
_.caseABooleancondition = function caseABooleancondition(node){
}
;
_.caseACondition2 = function caseACondition2(node){
}
;
_.caseAExactlySelectstatement2 = function caseAExactlySelectstatement2(node){
}
;
_.caseAExcludeCondition = function caseAExcludeCondition(node){
}
;
_.caseAExcludestatement = function caseAExcludestatement(node){
}
;
_.caseAFloatNumber = function caseAFloatNumber(node){
}
;
_.caseAIntegerNumber = function caseAIntegerNumber(node){
}
;
_.caseAListitems = function caseAListitems(node){
}
;
_.caseALogicstatementStatement = function caseALogicstatementStatement(node){
}
;
_.caseAMaxScoreitem = function caseAMaxScoreitem(node){
}
;
_.caseANotmorethanSelectstatement2 = function caseANotmorethanSelectstatement2(node){
}
;
_.caseAOrLogicsymbol = function caseAOrLogicsymbol(node){
}
;
_.caseAResidueCondition = function caseAResidueCondition(node){
}
;
_.caseAResidueResidue = function caseAResidueResidue(node){
}
;
_.caseAResidueinvertResidue = function caseAResidueinvertResidue(node){
}
;
_.caseAResiduenotResidue = function caseAResiduenotResidue(node){
}
;
_.caseAScoreStatement = function caseAScoreStatement(node){
}
;
_.caseAScorecondition = function caseAScorecondition(node){
}
;
_.caseAScoreitems = function caseAScoreitems(node){
}
;
_.caseAScorelist = function caseAScorelist(node){
}
;
_.caseASelectCondition = function caseASelectCondition(node){
}
;
_.caseASelectlist = function caseASelectlist(node){
}
;
_.caseASelectstatement = function caseASelectstatement(node){
}
;
_.caseAStatementCondition = function caseAStatementCondition(node){
}
;
_.caseAStatementScoreitem = function caseAStatementScoreitem(node){
}
;
_.caseEOF = function caseEOF(node){
}
;
_.caseStart = function caseStart(node){
}
;
_.caseTAminoAcid = function caseTAminoAcid(node){
}
;
_.caseTAnd = function caseTAnd(node){
}
;
_.caseTAtleast = function caseTAtleast(node){
}
;
_.caseTComma = function caseTComma(node){
}
;
_.caseTExactly = function caseTExactly(node){
}
;
_.caseTExclude = function caseTExclude(node){
}
;
_.caseTFloat = function caseTFloat(node){
}
;
_.caseTFrom = function caseTFrom(node){
}
;
_.caseTInteger = function caseTInteger(node){
}
;
_.caseTLPar = function caseTLPar(node){
}
;
_.caseTMapper = function caseTMapper(node){
}
;
_.caseTMax = function caseTMax(node){
}
;
_.caseTMin = function caseTMin(node){
}
;
_.caseTNot = function caseTNot(node){
}
;
_.caseTNotmorethan = function caseTNotmorethan(node){
}
;
_.caseTOr = function caseTOr(node){
}
;
_.caseTRPar = function caseTRPar(node){
}
;
_.caseTScore = function caseTScore(node){
}
;
_.caseTSelect = function caseTSelect(node){
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_analysis_AnalysisAdapter_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis', 'AnalysisAdapter', 192);
function $caseAAtleastSelectstatement2(this$static, node){
  !!node._atleast_ && $apply_10(node._atleast_, this$static);
  !!node._integer_ && $apply_16(node._integer_, this$static);
  !!node._from_ && $apply_15(node._from_, this$static);
  !!node._lPar_ && $apply_17(node._lPar_, this$static);
  !!node._selectlist_ && $apply_4(node._selectlist_, this$static);
  !!node._rPar_ && $apply_24(node._rPar_, this$static);
}

function $caseAAtleastnotmorethanSelectstatement2(this$static, node){
  !!node._atleast_ && $apply_10(node._atleast_, this$static);
  !!node._atleastnumber_ && $apply_16(node._atleastnumber_, this$static);
  !!node._logicsymbol_ && node._logicsymbol_.apply_1(this$static);
  !!node._notmorethan_ && $apply_22(node._notmorethan_, this$static);
  !!node._notmorethannumber_ && $apply_16(node._notmorethannumber_, this$static);
  !!node._from_ && $apply_15(node._from_, this$static);
  !!node._lPar_ && $apply_17(node._lPar_, this$static);
  !!node._selectlist_ && $apply_4(node._selectlist_, this$static);
  !!node._rPar_ && $apply_24(node._rPar_, this$static);
}

function $caseAExactlySelectstatement2(this$static, node){
  !!node._exactly_ && $apply_12(node._exactly_, this$static);
  !!node._integer_ && $apply_16(node._integer_, this$static);
  !!node._from_ && $apply_15(node._from_, this$static);
  !!node._lPar_ && $apply_17(node._lPar_, this$static);
  !!node._selectlist_ && $apply_4(node._selectlist_, this$static);
  !!node._rPar_ && $apply_24(node._rPar_, this$static);
}

function $caseANotmorethanSelectstatement2(this$static, node){
  !!node._notmorethan_ && $apply_22(node._notmorethan_, this$static);
  !!node._integer_ && $apply_16(node._integer_, this$static);
  !!node._from_ && $apply_15(node._from_, this$static);
  !!node._lPar_ && $apply_17(node._lPar_, this$static);
  !!node._selectlist_ && $apply_4(node._selectlist_, this$static);
  !!node._rPar_ && $apply_24(node._rPar_, this$static);
}

function $caseAResidueResidue(this$static, node){
  var i, temp;
  !!node._originalaminoacid_ && $apply_8(node._originalaminoacid_, this$static);
  !!node._integer_ && $apply_16(node._integer_, this$static);
  temp = $toArray(node._mutatedaminoacid_);
  for (i = 0; i < temp.length; i++) {
    $apply_8(castTo(temp[i], 33), this$static);
  }
}

function $caseAResidueinvertResidue(this$static, node){
  var i, temp;
  !!node._originalaminoacid_ && $apply_8(node._originalaminoacid_, this$static);
  !!node._integer_ && $apply_16(node._integer_, this$static);
  !!node._lPar_ && $apply_17(node._lPar_, this$static);
  !!node._not_ && $apply_21(node._not_, this$static);
  temp = $toArray(node._mutatedaminoacid_);
  for (i = 0; i < temp.length; i++) {
    $apply_8(castTo(temp[i], 33), this$static);
  }
  !!node._rPar_ && $apply_24(node._rPar_, this$static);
}

function $caseAResiduenotResidue(this$static, node){
  var i, temp;
  !!node._not_ && $apply_21(node._not_, this$static);
  !!node._originalaminoacid_ && $apply_8(node._originalaminoacid_, this$static);
  !!node._integer_ && $apply_16(node._integer_, this$static);
  temp = $toArray(node._mutatedaminoacid_);
  for (i = 0; i < temp.length; i++) {
    $apply_8(castTo(temp[i], 33), this$static);
  }
}

function $caseAScorelist(this$static, node){
  var i, temp;
  !!node._scoreitem_ && node._scoreitem_.apply_1(this$static);
  temp = $toArray(node._scoreitems_);
  for (i = 0; i < temp.length; i++) {
    castTo(temp[i], 74).apply_1(this$static);
  }
}

function $caseASelectlist(this$static, node){
  var i, temp;
  !!node._residue_ && node._residue_.apply_1(this$static);
  temp = $toArray(node._listitems_);
  for (i = 0; i < temp.length; i++) {
    castTo(temp[i], 72).apply_1(this$static);
  }
}

function $caseAStatementScoreitem(this$static, node){
  !!node._booleancondition_ && $apply_0(node._booleancondition_, this$static);
  !!node._mapper_ && $apply_18(node._mapper_, this$static);
  !!node._min_ && $apply_20(node._min_, this$static);
  !!node._number_ && node._number_.apply_1(this$static);
}

defineClass(290, 192, {});
_.caseAAndLogicsymbol = function caseAAndLogicsymbol_0(node){
  !!node._and_ && $apply_9(node._and_, this);
}
;
_.caseAAtleastSelectstatement2 = function caseAAtleastSelectstatement2_0(node){
  $caseAAtleastSelectstatement2(this, node);
}
;
_.caseAAtleastnotmorethanSelectstatement2 = function caseAAtleastnotmorethanSelectstatement2_0(node){
  $caseAAtleastnotmorethanSelectstatement2(this, node);
}
;
_.caseABooleancondition = function caseABooleancondition_0(node){
  var i, temp;
  !!node._condition_ && node._condition_.apply_1(this);
  temp = $toArray(node._condition2_);
  for (i = 0; i < temp.length; i++) {
    castTo(temp[i], 68).apply_1(this);
  }
}
;
_.caseACondition2 = function caseACondition2_0(node){
  !!node._logicsymbol_ && node._logicsymbol_.apply_1(this);
  !!node._condition_ && node._condition_.apply_1(this);
}
;
_.caseAExactlySelectstatement2 = function caseAExactlySelectstatement2_0(node){
  $caseAExactlySelectstatement2(this, node);
}
;
_.caseAExcludeCondition = function caseAExcludeCondition_0(node){
  !!node._excludestatement_ && $apply_1(node._excludestatement_, this);
}
;
_.caseAExcludestatement = function caseAExcludestatement_0(node){
  !!node._exclude_ && $apply_13(node._exclude_, this);
  !!node._residue_ && node._residue_.apply_1(this);
}
;
_.caseAFloatNumber = function caseAFloatNumber_0(node){
  !!node._float_ && $apply_14(node._float_, this);
}
;
_.caseAIntegerNumber = function caseAIntegerNumber_0(node){
  !!node._integer_ && $apply_16(node._integer_, this);
}
;
_.caseAListitems = function caseAListitems_0(node){
  !!node._comma_ && $apply_11(node._comma_, this);
  !!node._residue_ && node._residue_.apply_1(this);
}
;
_.caseALogicstatementStatement = function caseALogicstatementStatement_0(node){
  !!node._booleancondition_ && $apply_0(node._booleancondition_, this);
}
;
_.caseAMaxScoreitem = function caseAMaxScoreitem_0(node){
  !!node._max_ && $apply_19(node._max_, this);
  !!node._lPar_ && $apply_17(node._lPar_, this);
  !!node._scorelist_ && $apply_3(node._scorelist_, this);
  !!node._rPar_ && $apply_24(node._rPar_, this);
}
;
_.caseANotmorethanSelectstatement2 = function caseANotmorethanSelectstatement2_0(node){
  $caseANotmorethanSelectstatement2(this, node);
}
;
_.caseAOrLogicsymbol = function caseAOrLogicsymbol_0(node){
  !!node._or_ && $apply_23(node._or_, this);
}
;
_.caseAResidueCondition = function caseAResidueCondition_0(node){
  !!node._residue_ && node._residue_.apply_1(this);
}
;
_.caseAResidueResidue = function caseAResidueResidue_0(node){
  $caseAResidueResidue(this, node);
}
;
_.caseAResidueinvertResidue = function caseAResidueinvertResidue_0(node){
  $caseAResidueinvertResidue(this, node);
}
;
_.caseAResiduenotResidue = function caseAResiduenotResidue_0(node){
  $caseAResiduenotResidue(this, node);
}
;
_.caseAScoreStatement = function caseAScoreStatement_0(node){
  !!node._scorecondition_ && $apply_2(node._scorecondition_, this);
}
;
_.caseAScorecondition = function caseAScorecondition_0(node){
  !!node._score_ && $apply_25(node._score_, this);
  !!node._from_ && $apply_15(node._from_, this);
  !!node._lPar_ && $apply_17(node._lPar_, this);
  !!node._scorelist_ && $apply_3(node._scorelist_, this);
  !!node._rPar_ && $apply_24(node._rPar_, this);
}
;
_.caseAScoreitems = function caseAScoreitems_0(node){
  !!node._comma_ && $apply_11(node._comma_, this);
  !!node._scoreitem_ && node._scoreitem_.apply_1(this);
}
;
_.caseAScorelist = function caseAScorelist_0(node){
  $caseAScorelist(this, node);
}
;
_.caseASelectCondition = function caseASelectCondition_0(node){
  !!node._selectstatement_ && $apply_5(node._selectstatement_, this);
}
;
_.caseASelectlist = function caseASelectlist_0(node){
  $caseASelectlist(this, node);
}
;
_.caseASelectstatement = function caseASelectstatement_0(node){
  !!node._select_ && $apply_26(node._select_, this);
  !!node._selectstatement2_ && node._selectstatement2_.apply_1(this);
}
;
_.caseAStatementCondition = function caseAStatementCondition_0(node){
  !!node._lPar_ && $apply_17(node._lPar_, this);
  !!node._booleancondition_ && $apply_0(node._booleancondition_, this);
  !!node._rPar_ && $apply_24(node._rPar_, this);
}
;
_.caseAStatementScoreitem = function caseAStatementScoreitem_0(node){
  $caseAStatementScoreitem(this, node);
}
;
_.caseStart = function caseStart_0(node){
  node._pStatement_.apply_1(this);
  $apply_6(node._eof_, this);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_analysis_DepthFirstAdapter_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis', 'DepthFirstAdapter', 290);
function $clinit_AsiGrammarAdapter(){
  $clinit_AsiGrammarAdapter = emptyMethod;
  TRUE_VALUE = 1;
  FALSE_VALUE = 0;
  NOT_SCORED = NaN;
}

function $maxValueFromStack(this$static, n){
  var i, max_0, value_0;
  max_0 = $intern_16;
  for (i = 0; i < n; i++) {
    value_0 = __parseAndValidateDouble($toString_1(castToDouble($pop(this$static.stack_0))));
    !isNaN((checkCriticalNotNull(value_0) , value_0)) && (checkCriticalNotNull(value_0) , value_0) > max_0 && (max_0 = (checkCriticalNotNull(value_0) , value_0));
  }
  return max_0 == $intern_16?0:max_0;
}

function $sumValuesFromStack(this$static, n){
  var i, summation, value_0;
  summation = 0;
  for (i = 0; i < n; i++) {
    value_0 = __parseAndValidateDouble($toString_1(castToDouble($pop(this$static.stack_0))));
    isNaN((checkCriticalNotNull(value_0) , value_0)) || (summation += (checkCriticalNotNull(value_0) , value_0));
  }
  return summation;
}

function AsiGrammarAdapter(mutationList, comparator){
  $clinit_AsiGrammarAdapter();
  this.stack_0 = new Stack;
  this.allScoredMutations = new HashSet;
  this.scoredItemMutations = new HashSet;
  this.scoredItems = new ArrayList;
  this.mutationList = mutationList;
  this.comparator = comparator;
  this.isBooleanResult = true;
  this.mutationList.sort_1(this.comparator);
}

defineClass(193, 290, {}, AsiGrammarAdapter);
_.caseAAtleastSelectstatement2 = function caseAAtleastSelectstatement2_1(node){
  $caseAAtleastSelectstatement2(this, node);
  $doubleValue(castToDouble($pop(this.stack_0))) >= __parseAndValidateDouble(node._integer_.text_0)?$push(this.stack_0, TRUE_VALUE):$push(this.stack_0, FALSE_VALUE);
}
;
_.caseAAtleastnotmorethanSelectstatement2 = function caseAAtleastnotmorethanSelectstatement2_1(node){
  var count, isAtleast, isNotmorethan;
  $caseAAtleastnotmorethanSelectstatement2(this, node);
  count = $intValue(castToDouble($pop(this.stack_0)));
  isAtleast = count >= __parseAndValidateDouble(node._atleastnumber_.text_0);
  isNotmorethan = count <= __parseAndValidateDouble(node._notmorethannumber_.text_0);
  instanceOf(node._logicsymbol_, 108) && isAtleast && isNotmorethan || instanceOf(node._logicsymbol_, 109) && (isAtleast || isNotmorethan)?$push(this.stack_0, TRUE_VALUE):$push(this.stack_0, FALSE_VALUE);
}
;
_.caseACondition2 = function caseACondition2_1(node){
  var first, second;
  !!node._logicsymbol_ && node._logicsymbol_.apply_1(this);
  !!node._condition_ && node._condition_.apply_1(this);
  first = $intValue(castToDouble($pop(this.stack_0)));
  second = $intValue(castToDouble($pop(this.stack_0)));
  if (instanceOf(node._logicsymbol_, 108)) {
    $push(this.stack_0, first & second);
  }
   else if (instanceOf(node._logicsymbol_, 109)) {
    $push(this.stack_0, first | second);
  }
   else {
    throw toJs(new RuntimeException_0('Logic symbol ' + node._logicsymbol_ + ' was not expected.'));
  }
}
;
_.caseAExactlySelectstatement2 = function caseAExactlySelectstatement2_1(node){
  $caseAExactlySelectstatement2(this, node);
  $doubleValue(castToDouble($pop(this.stack_0))) == __parseAndValidateDouble(node._integer_.text_0)?$push(this.stack_0, TRUE_VALUE):$push(this.stack_0, FALSE_VALUE);
}
;
_.caseAExcludestatement = function caseAExcludestatement_1(node){
  var inverted;
  !!node._exclude_ && $apply_13(node._exclude_, this);
  !!node._residue_ && node._residue_.apply_1(this);
  inverted = $intValue(castToDouble($pop(this.stack_0))) ^ $intValue(TRUE_VALUE);
  $push(this.stack_0, inverted);
}
;
_.caseANotmorethanSelectstatement2 = function caseANotmorethanSelectstatement2_1(node){
  $caseANotmorethanSelectstatement2(this, node);
  $doubleValue(castToDouble($pop(this.stack_0))) <= __parseAndValidateDouble(node._integer_.text_0)?$push(this.stack_0, TRUE_VALUE):$push(this.stack_0, FALSE_VALUE);
}
;
_.caseAResidueResidue = function caseAResidueResidue_1(node){
  var index_0, mutation, residue;
  $caseAResidueResidue(this, node);
  residue = $createMutation(node._integer_, node._mutatedaminoacid_);
  index_0 = binarySearch(this.mutationList, residue, this.comparator);
  if (index_0 >= 0) {
    $push(this.stack_0, TRUE_VALUE);
    mutation = castToString(this.mutationList.getAtIndex(index_0));
    $add_2(this.allScoredMutations, mutation);
    $add_2(this.scoredItemMutations, mutation);
  }
   else {
    $push(this.stack_0, FALSE_VALUE);
  }
}
;
_.caseAResidueinvertResidue = function caseAResidueinvertResidue_1(node){
  var index_0, mutation, residue;
  $caseAResidueinvertResidue(this, node);
  residue = $createMutation(node._integer_, node._mutatedaminoacid_);
  residue = $invertMutation(residue);
  index_0 = binarySearch(this.mutationList, residue, this.comparator);
  if (index_0 >= 0) {
    $push(this.stack_0, TRUE_VALUE);
    mutation = castToString(this.mutationList.getAtIndex(index_0));
    $add_2(this.allScoredMutations, mutation);
    $add_2(this.scoredItemMutations, mutation);
  }
   else {
    $push(this.stack_0, FALSE_VALUE);
  }
}
;
_.caseAResiduenotResidue = function caseAResiduenotResidue_1(node){
  var foundMutation, index_0, iterator, mutatedAminoacid, mutatedAminoacidList, residue;
  $caseAResiduenotResidue(this, node);
  foundMutation = false;
  iterator = $listIterator_0(node._mutatedaminoacid_, 0);
  while ($hasNext_1(iterator.iterator)) {
    mutatedAminoacid = castTo($next_2(iterator.iterator), 33);
    mutatedAminoacidList = new HashSet;
    $put(mutatedAminoacidList.map_0, mutatedAminoacid, mutatedAminoacidList);
    residue = $createMutation(node._integer_, mutatedAminoacidList);
    index_0 = binarySearch(this.mutationList, residue, this.comparator);
    if (index_0 < 0)
    ;
    else {
      foundMutation = true;
      break;
    }
  }
  if (foundMutation) {
    $push(this.stack_0, FALSE_VALUE);
  }
   else {
    $push(this.stack_0, TRUE_VALUE);
    $add_2(this.allScoredMutations, $trim('' + toString_34(node._not_) + toString_34(node._originalaminoacid_) + toString_34(node._integer_) + toString_33(node._mutatedaminoacid_)));
    $add_2(this.scoredItemMutations, $trim('' + toString_34(node._not_) + toString_34(node._originalaminoacid_) + toString_34(node._integer_) + toString_33(node._mutatedaminoacid_)));
  }
}
;
_.caseAScorelist = function caseAScorelist_1(node){
  var size_0, value_0;
  $caseAScorelist(this, node);
  this.isBooleanResult = false;
  size_0 = node._scoreitems_.size_0 + 1;
  value_0 = instanceOf(node.parent_0, 140)?$maxValueFromStack(this, size_0):$sumValuesFromStack(this, size_0);
  $push(this.stack_0, value_0);
}
;
_.caseASelectlist = function caseASelectlist_1(node){
  $caseASelectlist(this, node);
  $push(this.stack_0, $sumValuesFromStack(this, node._listitems_.size_0 + 1));
}
;
_.caseAStatementScoreitem = function caseAStatementScoreitem_1(node){
  var number, score, value_0;
  $caseAStatementScoreitem(this, node);
  value_0 = $doubleValue(castToDouble($pop(this.stack_0)));
  if (value_0 != $doubleValue(FALSE_VALUE)) {
    number = __parseAndValidateDouble(toString_3(node._number_));
    score = !node._min_?number:-number;
    $push(this.stack_0, score);
    $add_1(this.scoredItems, new AsiGrammarAdapter$ScoredItem('' + toString_34(node._booleancondition_) + toString_34(node._mapper_) + toString_34(node._min_) + toString_34(node._number_), this.scoredItemMutations, score));
  }
   else {
    $push(this.stack_0, NOT_SCORED);
  }
  this.scoredItemMutations = new HashSet;
}
;
_.isBooleanResult = false;
var FALSE_VALUE, NOT_SCORED, TRUE_VALUE;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_AsiGrammarAdapter_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar', 'AsiGrammarAdapter', 193);
function AsiGrammarAdapter$ScoredItem(value_0, mutations, score){
  this.value_0 = value_0;
  this.mutations = mutations;
  this.score = score;
}

defineClass(95, 1, {95:1}, AsiGrammarAdapter$ScoredItem);
_.toString_0 = function toString_32(){
  return this.value_0;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_AsiGrammarAdapter$ScoredItem_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar', 'AsiGrammarAdapter/ScoredItem', 95);
function $clinit_StringMutationComparator(){
  $clinit_StringMutationComparator = emptyMethod;
  AMINO_ACIDS = (checkCriticalNotNull('ACDEFGHIKLMNPQRSTVWYZdi') , 'ACDEFGHIKLMNPQRSTVWYZdi');
  AMINO_ACIDS_SET = stringToSortedCharacterSet(AMINO_ACIDS);
  MUTATION_PATTERN = new Pattern('(?:[A-Z]?)(\\d+)([' + AMINO_ACIDS + ']+)');
}

function $compare_2(this$static, o1, o2){
  var aminoAcidsSet1, aminoAcidsSet2, codon1, codon2, intersection, matcher1, matcher2, minSize;
  matcher1 = $matcher(MUTATION_PATTERN, o1);
  matcher2 = $matcher(MUTATION_PATTERN, o2);
  matcher1.result = $exec(matcher1.pattern, matcher1.input_0);
  if (!matcher1.result || (matcher2.result = $exec(matcher2.pattern, matcher2.input_0) , !matcher2.result)) {
    throw toJs(new RuntimeException_0('Invalid String formated mutations: ' + o1 + ', ' + o2));
  }
  codon1 = valueOf_0(__parseAndValidateInt(matcher1.result[1]));
  codon2 = valueOf_0(__parseAndValidateInt(matcher2.result[1]));
  if (!(!!codon2 && codon2.value_0 == codon1.value_0)) {
    return compare_2(codon1.value_0, codon2.value_0);
  }
  aminoAcidsSet1 = stringToSortedCharacterSet(matcher1.result[2]);
  aminoAcidsSet2 = stringToSortedCharacterSet(matcher2.result[2]);
  intersection = intersection_0(aminoAcidsSet1, aminoAcidsSet2);
  if (this$static.strictComparision) {
    minSize = (aminoAcidsSet1.map_0.size_0 <= aminoAcidsSet2.map_0.size_0?aminoAcidsSet1:aminoAcidsSet2).map_0.size_0;
    if ($size(intersection) >= minSize) {
      return 0;
    }
  }
   else {
    if ($size(intersection) > 0) {
      return 0;
    }
  }
  return $compareTo_4($toString(aminoAcidsSet1), $toString(aminoAcidsSet2));
}

function $createMutation(codonNumber, aminoAcidCollection){
  var aminoAcid, aminoAcid$iterator, mutation;
  mutation = new StringBuffer_1($trim(codonNumber.text_0 + ' '));
  for (aminoAcid$iterator = aminoAcidCollection.iterator_0(); aminoAcid$iterator.hasNext_0();) {
    aminoAcid = aminoAcid$iterator.next_1();
    $append_0(mutation, $trim(toString_3(aminoAcid)));
  }
  if (!$booleanValue($matches($matcher(MUTATION_PATTERN, mutation.string)))) {
    throw toJs(new IllegalArgumentException('Invalid createMutation paramters: ' + codonNumber + ', ' + aminoAcidCollection));
  }
  return mutation.string;
}

function $invertMutation(mutation){
  var foundAcids, matcher, notFoundAcids;
  matcher = $matcher(MUTATION_PATTERN, mutation);
  matcher.result = $exec(matcher.pattern, matcher.input_0);
  if (!matcher.result) {
    throw toJs(new IllegalArgumentException('Invalid invertMutation paramter: ' + mutation));
  }
  foundAcids = stringToSortedCharacterSet(matcher.result[2]);
  notFoundAcids = difference(AMINO_ACIDS_SET, foundAcids);
  return matcher.result[1] + ('' + collectionToString(notFoundAcids));
}

function StringMutationComparator(){
  $clinit_StringMutationComparator();
  this.strictComparision = false;
}

function collectionToString(col){
  var buffer, iter;
  buffer = new StringBuffer;
  for (iter = new Sets$3$1(col.val$set11, col.val$set22); $hasNext(iter);) {
    $append_0(buffer, String.fromCharCode(castTo($next(iter), 52).value_0));
  }
  return buffer.string;
}

function stringToSortedCharacterSet(str){
  var i, set_0;
  set_0 = new TreeSet;
  for (i = 0; i < str.length; i++) {
    $add_5(set_0, valueOf((checkCriticalStringElementIndex(i, str.length) , str.charCodeAt(i))));
  }
  return set_0;
}

defineClass(190, 1, {}, StringMutationComparator);
_.compare = function compare_5(o1, o2){
  return $compare_2(this, castToString(o1), castToString(o2));
}
;
_.equals_0 = function equals_12(other){
  return this === other;
}
;
_.strictComparision = false;
var AMINO_ACIDS, AMINO_ACIDS_SET, MUTATION_PATTERN;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_StringMutationComparator_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar', 'StringMutationComparator', 190);
function $clinit_Lexer(){
  $clinit_Lexer = emptyMethod;
  gotoTable_0 = stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 4), {3:1, 6:1, 91:1}, 173, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 3), $intern_17, 7, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [9, 9, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [10, 10, 2]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 13, 3]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [32, 32, 4]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [40, 40, 5]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [41, 41, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [44, 44, 7]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [45, 45, 8]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [48, 57, 9]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [61, 61, 10]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [65, 65, 11]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [67, 67, 12]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [68, 68, 13]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [69, 69, 14]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [70, 70, 15]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [71, 71, 16]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [72, 72, 17]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [73, 73, 18]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [75, 75, 19]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [76, 76, 20]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [77, 77, 21]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [78, 78, 22]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [79, 79, 23]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [80, 80, 24]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [81, 81, 25]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [82, 82, 26]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [83, 83, 27]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [84, 84, 28]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [86, 86, 29]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [87, 87, 30]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [89, 89, 31]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [90, 90, 32]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [100, 100, 33]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [105, 105, 34])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [9, 32, -2])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [9, 32, -2])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [9, 32, -2])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [9, 32, -2])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [46, 46, 35]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [48, 57, 9])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [62, 62, 36])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [78, 78, 37]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [84, 84, 38])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [88, 88, 39])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [82, 82, 40])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [65, 65, 41])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [79, 79, 42])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [82, 82, 43])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [67, 67, 44]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [69, 69, 45])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [48, 57, 46])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [68, 68, 47])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [76, 76, 48])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [65, 65, 49]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [67, 67, 50])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [79, 79, 51])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [88, 88, 52])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [84, 84, 53])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [79, 79, 54])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [76, 76, 55])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [48, 57, 46])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [69, 69, 56])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [67, 67, 57])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [76, 76, 58])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [77, 77, 59])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [77, 77, 60])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [82, 82, 61])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [69, 69, 62])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [65, 65, 63])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [84, 84, 64])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [85, 85, 65])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [79, 79, 66])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [69, 69, 67])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [67, 67, 68])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [83, 83, 69])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [76, 76, 70])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [68, 68, 71])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [82, 82, 72])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [84, 84, 73])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [84, 84, 74])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [89, 89, 75])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [69, 69, 76])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [69, 69, 77])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, []), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [84, 84, 78])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [72, 72, 79])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [65, 65, 80])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [78, 78, 81])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [])])]);
  accept_7 = stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 16, 16, 16, 16, 12, 13, 15, 0, 17, -1, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, -1, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, -1, 14, -1, -1, -1, -1, -1, -1, 2, -1, -1, 18, 1, -1, -1, -1, -1, 11, 3, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, 5, 7, 8, 4, -1, -1, -1, -1, 9])]);
}

function $getChar(this$static){
  var result;
  if (this$static.eof) {
    return -1;
  }
  if (this$static.inPointer == this$static.in_0.length) {
    this$static.eof = true;
    return -1;
  }
  result = this$static.in_0[this$static.inPointer++];
  return result;
}

function $getText(this$static, acceptLength){
  var i, s;
  s = new StringBuffer_0;
  for (i = 0; i < acceptLength; i++) {
    $append(s, $charAt(this$static.text_0, i));
  }
  return s.string;
}

function $getToken(this$static){
  var accept, accept_length, accept_line, accept_pos, accept_state, accept_token, c, dfa_state, gotoTable, high, low, middle, oldState, start_line, start_pos, tmp1, tmp2, token;
  dfa_state = 0;
  start_pos = this$static.pos;
  start_line = this$static.line;
  accept_state = -1;
  accept_token = -1;
  accept_length = -1;
  accept_pos = -1;
  accept_line = -1;
  gotoTable = gotoTable_0[this$static.state.id_0];
  accept = accept_7[this$static.state.id_0];
  $setLength(this$static.text_0);
  while (true) {
    c = $getChar(this$static);
    if (c != -1) {
      switch (c) {
        case 10:
          if (this$static.cr) {
            this$static.cr = false;
          }
           else {
            ++this$static.line;
            this$static.pos = 0;
          }

          break;
        case 13:
          ++this$static.line;
          this$static.pos = 0;
          this$static.cr = true;
          break;
        default:++this$static.pos;
          this$static.cr = false;
      }
      $append(this$static.text_0, c & 65535);
      do {
        oldState = dfa_state < -1?-2 - dfa_state:dfa_state;
        dfa_state = -1;
        tmp1 = gotoTable[oldState];
        low = 0;
        high = tmp1.length - 1;
        while (low <= high) {
          middle = (low + high) / 2 | 0;
          tmp2 = tmp1[middle];
          if (c < tmp2[0]) {
            high = middle - 1;
          }
           else if (c > tmp2[1]) {
            low = middle + 1;
          }
           else {
            dfa_state = tmp2[2];
            break;
          }
        }
      }
       while (dfa_state < -1);
    }
     else {
      dfa_state = -1;
    }
    if (dfa_state >= 0) {
      if (accept[dfa_state] != -1) {
        accept_state = dfa_state;
        accept_token = accept[dfa_state];
        accept_length = this$static.text_0.string.length;
        accept_pos = this$static.pos;
        accept_line = this$static.line;
      }
    }
     else {
      if (accept_state != -1) {
        switch (accept_token) {
          case 0:
            {
              token = new TMin(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 1:
            {
              token = new TAnd(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 2:
            {
              token = new TOr(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 3:
            {
              token = new TNot(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 4:
            {
              token = new TExclude(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 5:
            {
              token = new TSelect(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 6:
            {
              token = new TFrom(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 7:
            {
              token = new TAtleast(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 8:
            {
              token = new TExactly(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 9:
            {
              token = new TNotmorethan(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 10:
            {
              token = new TScore(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 11:
            {
              token = new TMax(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 12:
            {
              token = new TLPar(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 13:
            {
              token = new TRPar(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 14:
            {
              token = new TMapper(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 15:
            {
              token = new TComma(start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 16:
            {
              token = new TBlank($getText(this$static, accept_length), start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 17:
            {
              token = new TInteger($getText(this$static, accept_length), start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 18:
            {
              token = new TFloat($getText(this$static, accept_length), start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

          case 19:
            {
              token = new TAminoAcid($getText(this$static, accept_length), start_line + 1, start_pos + 1);
              $pushBack(this$static, accept_length);
              this$static.pos = accept_pos;
              this$static.line = accept_line;
              return token;
            }

        }
      }
       else {
        if (this$static.text_0.string.length > 0) {
          throw toJs(new LexerException('[' + (start_line + 1) + ',' + (start_pos + 1) + ']' + ' Unknown token: ' + this$static.text_0));
        }
         else {
          token = new EOF(start_line + 1, start_pos + 1);
          return token;
        }
      }
    }
  }
}

function $next_4(this$static){
  var result;
  while (!this$static.token) {
    this$static.token = $getToken(this$static);
  }
  result = this$static.token;
  this$static.token = null;
  return result;
}

function $peek_0(this$static){
  while (!this$static.token) {
    this$static.token = $getToken(this$static);
  }
  return this$static.token;
}

function $pushBack(this$static, acceptLength){
  var pushBackSize;
  pushBackSize = this$static.text_0.string.length - acceptLength;
  if (pushBackSize > 0) {
    this$static.inPointer -= pushBackSize;
    this$static.eof = false;
  }
}

function Lexer(in_0){
  var n, charArr;
  $clinit_Lexer();
  this.state = ($clinit_Lexer$State() , INITIAL);
  this.text_0 = new StringBuffer;
  this.in_0 = (n = in_0.length , charArr = initUnidimensionalArray(C_classLit, $intern_9, 5, n, 15, 1) , $getChars0(in_0, 0, n, charArr, 0) , charArr);
  this.inPointer = 0;
}

defineClass(233, 1, {}, Lexer);
_.cr = false;
_.eof = false;
_.inPointer = 0;
_.line = 0;
_.pos = 0;
var accept_7, gotoTable_0;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_lexer_Lexer_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.lexer', 'Lexer', 233);
function $clinit_Lexer$State(){
  $clinit_Lexer$State = emptyMethod;
  INITIAL = new Lexer$State;
}

function Lexer$State(){
  this.id_0 = 0;
}

defineClass(234, 1, {}, Lexer$State);
_.id_0 = 0;
var INITIAL;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_lexer_Lexer$State_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.lexer', 'Lexer/State', 234);
function LexerException(message){
  Exception.call(this, message);
}

defineClass(236, 17, $intern_1, LexerException);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_lexer_LexerException_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.lexer', 'LexerException', 236);
function $parent(this$static, parent_0){
  this$static.parent_0 = parent_0;
}

function toString_33(list){
  var node, node$iterator, s;
  s = new StringBuffer;
  for (node$iterator = new TypedLinkedList$TypedLinkedListIterator(list, $listIterator(list, 0)); $hasNext_1(node$iterator.iterator);) {
    node = castTo($next_2(node$iterator.iterator), 10);
    s.string += '' + node;
  }
  return s.string;
}

function toString_34(node){
  if (node) {
    return toString_3(node);
  }
  return '';
}

defineClass(10, 1, $intern_20);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_Node_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'Node', 10);
defineClass(86, 10, {10:1, 86:1});
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PLogicsymbol_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PLogicsymbol', 86);
function $setAnd(this$static, node){
  !!this$static._and_ && (this$static._and_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._and_ = node;
}

function AAndLogicsymbol(_and_){
  $setAnd(this, _and_);
}

defineClass(108, 86, {108:1, 10:1, 86:1}, AAndLogicsymbol);
_.apply_1 = function apply_6(sw){
  sw.caseAAndLogicsymbol(this);
}
;
_.removeChild_0 = function removeChild(child){
  if (this._and_ == child) {
    this._and_ = null;
    return;
  }
}
;
_.toString_0 = function toString_35(){
  return '' + toString_34(this._and_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AAndLogicsymbol_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AAndLogicsymbol', 108);
defineClass(70, 10, $intern_21);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PSelectstatement2_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PSelectstatement2', 70);
function $setAtleast(this$static, node){
  !!this$static._atleast_ && (this$static._atleast_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._atleast_ = node;
}

function $setFrom(this$static, node){
  !!this$static._from_ && (this$static._from_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._from_ = node;
}

function $setInteger(this$static, node){
  !!this$static._integer_ && (this$static._integer_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._integer_ = node;
}

function $setLPar(this$static, node){
  !!this$static._lPar_ && (this$static._lPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._lPar_ = node;
}

function $setRPar(this$static, node){
  !!this$static._rPar_ && (this$static._rPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._rPar_ = node;
}

function $setSelectlist(this$static, node){
  !!this$static._selectlist_ && (this$static._selectlist_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._selectlist_ = node;
}

function AAtleastSelectstatement2(_atleast_, _integer_, _from_, _lPar_, _selectlist_, _rPar_){
  $setAtleast(this, _atleast_);
  $setInteger(this, _integer_);
  $setFrom(this, _from_);
  $setLPar(this, _lPar_);
  $setSelectlist(this, _selectlist_);
  $setRPar(this, _rPar_);
}

defineClass(255, 70, $intern_21, AAtleastSelectstatement2);
_.apply_1 = function apply_7(sw){
  sw.caseAAtleastSelectstatement2(this);
}
;
_.removeChild_0 = function removeChild_0(child){
  if (this._atleast_ == child) {
    this._atleast_ = null;
    return;
  }
  if (this._integer_ == child) {
    this._integer_ = null;
    return;
  }
  if (this._from_ == child) {
    this._from_ = null;
    return;
  }
  if (this._lPar_ == child) {
    this._lPar_ = null;
    return;
  }
  if (this._selectlist_ == child) {
    this._selectlist_ = null;
    return;
  }
  if (this._rPar_ == child) {
    this._rPar_ = null;
    return;
  }
}
;
_.toString_0 = function toString_36(){
  return '' + toString_34(this._atleast_) + toString_34(this._integer_) + toString_34(this._from_) + toString_34(this._lPar_) + toString_34(this._selectlist_) + toString_34(this._rPar_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AAtleastSelectstatement2_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AAtleastSelectstatement2', 255);
function $setAtleast_0(this$static, node){
  !!this$static._atleast_ && (this$static._atleast_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._atleast_ = node;
}

function $setAtleastnumber(this$static, node){
  !!this$static._atleastnumber_ && (this$static._atleastnumber_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._atleastnumber_ = node;
}

function $setFrom_0(this$static, node){
  !!this$static._from_ && (this$static._from_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._from_ = node;
}

function $setLPar_0(this$static, node){
  !!this$static._lPar_ && (this$static._lPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._lPar_ = node;
}

function $setLogicsymbol(this$static, node){
  !!this$static._logicsymbol_ && (this$static._logicsymbol_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._logicsymbol_ = node;
}

function $setNotmorethan(this$static, node){
  !!this$static._notmorethan_ && (this$static._notmorethan_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._notmorethan_ = node;
}

function $setNotmorethannumber(this$static, node){
  !!this$static._notmorethannumber_ && (this$static._notmorethannumber_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._notmorethannumber_ = node;
}

function $setRPar_0(this$static, node){
  !!this$static._rPar_ && (this$static._rPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._rPar_ = node;
}

function $setSelectlist_0(this$static, node){
  !!this$static._selectlist_ && (this$static._selectlist_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._selectlist_ = node;
}

function AAtleastnotmorethanSelectstatement2(_atleast_, _atleastnumber_, _logicsymbol_, _notmorethan_, _notmorethannumber_, _from_, _lPar_, _selectlist_, _rPar_){
  $setAtleast_0(this, _atleast_);
  $setAtleastnumber(this, _atleastnumber_);
  $setLogicsymbol(this, _logicsymbol_);
  $setNotmorethan(this, _notmorethan_);
  $setNotmorethannumber(this, _notmorethannumber_);
  $setFrom_0(this, _from_);
  $setLPar_0(this, _lPar_);
  $setSelectlist_0(this, _selectlist_);
  $setRPar_0(this, _rPar_);
}

defineClass(257, 70, $intern_21, AAtleastnotmorethanSelectstatement2);
_.apply_1 = function apply_8(sw){
  sw.caseAAtleastnotmorethanSelectstatement2(this);
}
;
_.removeChild_0 = function removeChild_1(child){
  if (this._atleast_ == child) {
    this._atleast_ = null;
    return;
  }
  if (this._atleastnumber_ == child) {
    this._atleastnumber_ = null;
    return;
  }
  if (this._logicsymbol_ == child) {
    this._logicsymbol_ = null;
    return;
  }
  if (this._notmorethan_ == child) {
    this._notmorethan_ = null;
    return;
  }
  if (this._notmorethannumber_ == child) {
    this._notmorethannumber_ = null;
    return;
  }
  if (this._from_ == child) {
    this._from_ = null;
    return;
  }
  if (this._lPar_ == child) {
    this._lPar_ = null;
    return;
  }
  if (this._selectlist_ == child) {
    this._selectlist_ = null;
    return;
  }
  if (this._rPar_ == child) {
    this._rPar_ = null;
    return;
  }
}
;
_.toString_0 = function toString_37(){
  return '' + toString_34(this._atleast_) + toString_34(this._atleastnumber_) + toString_34(this._logicsymbol_) + toString_34(this._notmorethan_) + toString_34(this._notmorethannumber_) + toString_34(this._from_) + toString_34(this._lPar_) + toString_34(this._selectlist_) + toString_34(this._rPar_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AAtleastnotmorethanSelectstatement2_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AAtleastnotmorethanSelectstatement2', 257);
defineClass(67, 10, $intern_22);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PBooleancondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PBooleancondition', 67);
function $apply_0(this$static, sw){
  sw.caseABooleancondition(this$static);
}

function $setCondition(this$static, node){
  !!this$static._condition_ && (this$static._condition_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._condition_ = node;
}

function ABooleancondition(_condition_, _condition2_){
  this._condition2_ = new TypedLinkedList_0(new ABooleancondition$Condition2_Cast(this));
  $setCondition(this, _condition_);
  $reset_0(this._condition2_);
  $addAll_2(this._condition2_, _condition2_);
}

defineClass(165, 67, $intern_22, ABooleancondition);
_.apply_1 = function apply_9(sw){
  $apply_0(this, sw);
}
;
_.removeChild_0 = function removeChild_2(child){
  if (this._condition_ == child) {
    this._condition_ = null;
    return;
  }
  if ($advanceToFind(this._condition2_, child, true)) {
    return;
  }
}
;
_.toString_0 = function toString_38(){
  return '' + toString_34(this._condition_) + toString_33(this._condition2_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_ABooleancondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'ABooleancondition', 165);
function ABooleancondition$Condition2_Cast(this$0){
  this.this$01 = this$0;
}

defineClass(243, 1, {}, ABooleancondition$Condition2_Cast);
_.cast_0 = function cast_0(o){
  var node;
  return node = castTo(o, 68) , !!node.parent_0 && node.parent_0 != this.this$01 && node.parent_0.removeChild_0(node) , (!node.parent_0 || node.parent_0 != this.this$01) && $parent(node, this.this$01) , node;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_ABooleancondition$Condition2_1Cast_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'ABooleancondition/Condition2_Cast', 243);
defineClass(68, 10, $intern_23);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PCondition2_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PCondition2', 68);
function $setCondition_0(this$static, node){
  !!this$static._condition_ && (this$static._condition_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._condition_ = node;
}

function $setLogicsymbol_0(this$static, node){
  !!this$static._logicsymbol_ && (this$static._logicsymbol_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._logicsymbol_ = node;
}

function ACondition2(_logicsymbol_, _condition_){
  $setLogicsymbol_0(this, _logicsymbol_);
  $setCondition_0(this, _condition_);
}

defineClass(248, 68, $intern_23, ACondition2);
_.apply_1 = function apply_10(sw){
  sw.caseACondition2(this);
}
;
_.removeChild_0 = function removeChild_3(child){
  if (this._logicsymbol_ == child) {
    this._logicsymbol_ = null;
    return;
  }
  if (this._condition_ == child) {
    this._condition_ = null;
    return;
  }
}
;
_.toString_0 = function toString_39(){
  return '' + toString_34(this._logicsymbol_) + toString_34(this._condition_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_ACondition2_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'ACondition2', 248);
function $setExactly(this$static, node){
  !!this$static._exactly_ && (this$static._exactly_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._exactly_ = node;
}

function $setFrom_1(this$static, node){
  !!this$static._from_ && (this$static._from_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._from_ = node;
}

function $setInteger_0(this$static, node){
  !!this$static._integer_ && (this$static._integer_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._integer_ = node;
}

function $setLPar_1(this$static, node){
  !!this$static._lPar_ && (this$static._lPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._lPar_ = node;
}

function $setRPar_1(this$static, node){
  !!this$static._rPar_ && (this$static._rPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._rPar_ = node;
}

function $setSelectlist_1(this$static, node){
  !!this$static._selectlist_ && (this$static._selectlist_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._selectlist_ = node;
}

function AExactlySelectstatement2(_exactly_, _integer_, _from_, _lPar_, _selectlist_, _rPar_){
  $setExactly(this, _exactly_);
  $setInteger_0(this, _integer_);
  $setFrom_1(this, _from_);
  $setLPar_1(this, _lPar_);
  $setSelectlist_1(this, _selectlist_);
  $setRPar_1(this, _rPar_);
}

defineClass(254, 70, $intern_21, AExactlySelectstatement2);
_.apply_1 = function apply_11(sw){
  sw.caseAExactlySelectstatement2(this);
}
;
_.removeChild_0 = function removeChild_4(child){
  if (this._exactly_ == child) {
    this._exactly_ = null;
    return;
  }
  if (this._integer_ == child) {
    this._integer_ = null;
    return;
  }
  if (this._from_ == child) {
    this._from_ = null;
    return;
  }
  if (this._lPar_ == child) {
    this._lPar_ = null;
    return;
  }
  if (this._selectlist_ == child) {
    this._selectlist_ = null;
    return;
  }
  if (this._rPar_ == child) {
    this._rPar_ = null;
    return;
  }
}
;
_.toString_0 = function toString_40(){
  return '' + toString_34(this._exactly_) + toString_34(this._integer_) + toString_34(this._from_) + toString_34(this._lPar_) + toString_34(this._selectlist_) + toString_34(this._rPar_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AExactlySelectstatement2_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AExactlySelectstatement2', 254);
defineClass(53, 10, $intern_24);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PCondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PCondition', 53);
function $setExcludestatement(this$static, node){
  !!this$static._excludestatement_ && (this$static._excludestatement_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._excludestatement_ = node;
}

function AExcludeCondition(_excludestatement_){
  $setExcludestatement(this, _excludestatement_);
}

defineClass(246, 53, $intern_24, AExcludeCondition);
_.apply_1 = function apply_12(sw){
  sw.caseAExcludeCondition(this);
}
;
_.removeChild_0 = function removeChild_5(child){
  if (this._excludestatement_ == child) {
    this._excludestatement_ = null;
    return;
  }
}
;
_.toString_0 = function toString_41(){
  return '' + toString_34(this._excludestatement_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AExcludeCondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AExcludeCondition', 246);
defineClass(132, 10, $intern_25);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PExcludestatement_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PExcludestatement', 132);
function $apply_1(this$static, sw){
  sw.caseAExcludestatement(this$static);
}

function $setExclude(this$static, node){
  !!this$static._exclude_ && (this$static._exclude_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._exclude_ = node;
}

function $setResidue(this$static, node){
  !!this$static._residue_ && (this$static._residue_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._residue_ = node;
}

function AExcludestatement(_exclude_, _residue_){
  $setExclude(this, _exclude_);
  $setResidue(this, _residue_);
}

defineClass(252, 132, $intern_25, AExcludestatement);
_.apply_1 = function apply_13(sw){
  $apply_1(this, sw);
}
;
_.removeChild_0 = function removeChild_6(child){
  if (this._exclude_ == child) {
    this._exclude_ = null;
    return;
  }
  if (this._residue_ == child) {
    this._residue_ = null;
    return;
  }
}
;
_.toString_0 = function toString_42(){
  return '' + toString_34(this._exclude_) + toString_34(this._residue_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AExcludestatement_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AExcludestatement', 252);
defineClass(87, 10, $intern_26);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PNumber_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PNumber', 87);
function $setFloat(this$static, node){
  !!this$static._float_ && (this$static._float_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._float_ = node;
}

function AFloatNumber(_float_){
  $setFloat(this, _float_);
}

defineClass(264, 87, $intern_26, AFloatNumber);
_.apply_1 = function apply_14(sw){
  sw.caseAFloatNumber(this);
}
;
_.removeChild_0 = function removeChild_7(child){
  if (this._float_ == child) {
    this._float_ = null;
    return;
  }
}
;
_.toString_0 = function toString_43(){
  return '' + toString_34(this._float_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AFloatNumber_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AFloatNumber', 264);
function $setInteger_1(this$static, node){
  !!this$static._integer_ && (this$static._integer_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._integer_ = node;
}

function AIntegerNumber(_integer_){
  $setInteger_1(this, _integer_);
}

defineClass(263, 87, $intern_26, AIntegerNumber);
_.apply_1 = function apply_15(sw){
  sw.caseAIntegerNumber(this);
}
;
_.removeChild_0 = function removeChild_8(child){
  if (this._integer_ == child) {
    this._integer_ = null;
    return;
  }
}
;
_.toString_0 = function toString_44(){
  return '' + toString_34(this._integer_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AIntegerNumber_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AIntegerNumber', 263);
defineClass(72, 10, $intern_27);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PListitems_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PListitems', 72);
function $setComma(this$static, node){
  !!this$static._comma_ && (this$static._comma_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._comma_ = node;
}

function $setResidue_0(this$static, node){
  !!this$static._residue_ && (this$static._residue_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._residue_ = node;
}

function AListitems(_comma_, _residue_){
  $setComma(this, _comma_);
  $setResidue_0(this, _residue_);
}

defineClass(259, 72, $intern_27, AListitems);
_.apply_1 = function apply_16(sw){
  sw.caseAListitems(this);
}
;
_.removeChild_0 = function removeChild_9(child){
  if (this._comma_ == child) {
    this._comma_ = null;
    return;
  }
  if (this._residue_ == child) {
    this._residue_ = null;
    return;
  }
}
;
_.toString_0 = function toString_45(){
  return '' + toString_34(this._comma_) + toString_34(this._residue_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AListitems_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AListitems', 259);
defineClass(107, 10, $intern_28);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PStatement_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PStatement', 107);
function $setBooleancondition(this$static, node){
  !!this$static._booleancondition_ && (this$static._booleancondition_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._booleancondition_ = node;
}

function ALogicstatementStatement(_booleancondition_){
  $setBooleancondition(this, _booleancondition_);
}

defineClass(241, 107, $intern_28, ALogicstatementStatement);
_.apply_1 = function apply_17(sw){
  sw.caseALogicstatementStatement(this);
}
;
_.removeChild_0 = function removeChild_10(child){
  if (this._booleancondition_ == child) {
    this._booleancondition_ = null;
    return;
  }
}
;
_.toString_0 = function toString_46(){
  return '' + toString_34(this._booleancondition_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_ALogicstatementStatement_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'ALogicstatementStatement', 241);
defineClass(73, 10, $intern_29);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PScoreitem_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PScoreitem', 73);
function $setLPar_2(this$static, node){
  !!this$static._lPar_ && (this$static._lPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._lPar_ = node;
}

function $setMax(this$static, node){
  !!this$static._max_ && (this$static._max_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._max_ = node;
}

function $setRPar_2(this$static, node){
  !!this$static._rPar_ && (this$static._rPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._rPar_ = node;
}

function $setScorelist(this$static, node){
  !!this$static._scorelist_ && (this$static._scorelist_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._scorelist_ = node;
}

function AMaxScoreitem(_max_, _lPar_, _scorelist_, _rPar_){
  $setMax(this, _max_);
  $setLPar_2(this, _lPar_);
  $setScorelist(this, _scorelist_);
  $setRPar_2(this, _rPar_);
}

defineClass(140, 73, {140:1, 10:1, 73:1}, AMaxScoreitem);
_.apply_1 = function apply_18(sw){
  sw.caseAMaxScoreitem(this);
}
;
_.removeChild_0 = function removeChild_11(child){
  if (this._max_ == child) {
    this._max_ = null;
    return;
  }
  if (this._lPar_ == child) {
    this._lPar_ = null;
    return;
  }
  if (this._scorelist_ == child) {
    this._scorelist_ = null;
    return;
  }
  if (this._rPar_ == child) {
    this._rPar_ = null;
    return;
  }
}
;
_.toString_0 = function toString_47(){
  return '' + toString_34(this._max_) + toString_34(this._lPar_) + toString_34(this._scorelist_) + toString_34(this._rPar_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AMaxScoreitem_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AMaxScoreitem', 140);
function $setFrom_2(this$static, node){
  !!this$static._from_ && (this$static._from_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._from_ = node;
}

function $setInteger_2(this$static, node){
  !!this$static._integer_ && (this$static._integer_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._integer_ = node;
}

function $setLPar_3(this$static, node){
  !!this$static._lPar_ && (this$static._lPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._lPar_ = node;
}

function $setNotmorethan_0(this$static, node){
  !!this$static._notmorethan_ && (this$static._notmorethan_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._notmorethan_ = node;
}

function $setRPar_3(this$static, node){
  !!this$static._rPar_ && (this$static._rPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._rPar_ = node;
}

function $setSelectlist_2(this$static, node){
  !!this$static._selectlist_ && (this$static._selectlist_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._selectlist_ = node;
}

function ANotmorethanSelectstatement2(_notmorethan_, _integer_, _from_, _lPar_, _selectlist_, _rPar_){
  $setNotmorethan_0(this, _notmorethan_);
  $setInteger_2(this, _integer_);
  $setFrom_2(this, _from_);
  $setLPar_3(this, _lPar_);
  $setSelectlist_2(this, _selectlist_);
  $setRPar_3(this, _rPar_);
}

defineClass(256, 70, $intern_21, ANotmorethanSelectstatement2);
_.apply_1 = function apply_19(sw){
  sw.caseANotmorethanSelectstatement2(this);
}
;
_.removeChild_0 = function removeChild_12(child){
  if (this._notmorethan_ == child) {
    this._notmorethan_ = null;
    return;
  }
  if (this._integer_ == child) {
    this._integer_ = null;
    return;
  }
  if (this._from_ == child) {
    this._from_ = null;
    return;
  }
  if (this._lPar_ == child) {
    this._lPar_ = null;
    return;
  }
  if (this._selectlist_ == child) {
    this._selectlist_ = null;
    return;
  }
  if (this._rPar_ == child) {
    this._rPar_ = null;
    return;
  }
}
;
_.toString_0 = function toString_48(){
  return '' + toString_34(this._notmorethan_) + toString_34(this._integer_) + toString_34(this._from_) + toString_34(this._lPar_) + toString_34(this._selectlist_) + toString_34(this._rPar_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_ANotmorethanSelectstatement2_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'ANotmorethanSelectstatement2', 256);
function $setOr(this$static, node){
  !!this$static._or_ && (this$static._or_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._or_ = node;
}

function AOrLogicsymbol(_or_){
  $setOr(this, _or_);
}

defineClass(109, 86, {109:1, 10:1, 86:1}, AOrLogicsymbol);
_.apply_1 = function apply_20(sw){
  sw.caseAOrLogicsymbol(this);
}
;
_.removeChild_0 = function removeChild_13(child){
  if (this._or_ == child) {
    this._or_ = null;
    return;
  }
}
;
_.toString_0 = function toString_49(){
  return '' + toString_34(this._or_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AOrLogicsymbol_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AOrLogicsymbol', 109);
function $setResidue_1(this$static, node){
  !!this$static._residue_ && (this$static._residue_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._residue_ = node;
}

function AResidueCondition(_residue_){
  $setResidue_1(this, _residue_);
}

defineClass(245, 53, $intern_24, AResidueCondition);
_.apply_1 = function apply_21(sw){
  sw.caseAResidueCondition(this);
}
;
_.removeChild_0 = function removeChild_14(child){
  if (this._residue_ == child) {
    this._residue_ = null;
    return;
  }
}
;
_.toString_0 = function toString_50(){
  return '' + toString_34(this._residue_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AResidueCondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AResidueCondition', 245);
defineClass(50, 10, $intern_30);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PResidue_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PResidue', 50);
function $setInteger_3(this$static, node){
  !!this$static._integer_ && (this$static._integer_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._integer_ = node;
}

function $setOriginalaminoacid(this$static, node){
  !!this$static._originalaminoacid_ && (this$static._originalaminoacid_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._originalaminoacid_ = node;
}

function AResidueResidue(_originalaminoacid_, _integer_, _mutatedaminoacid_){
  this._mutatedaminoacid_ = new TypedLinkedList_0(new AResidueResidue$Mutatedaminoacid_Cast(this));
  $setOriginalaminoacid(this, _originalaminoacid_);
  $setInteger_3(this, _integer_);
  $reset_0(this._mutatedaminoacid_);
  $addAll_2(this._mutatedaminoacid_, _mutatedaminoacid_);
}

defineClass(166, 50, $intern_30, AResidueResidue);
_.apply_1 = function apply_22(sw){
  sw.caseAResidueResidue(this);
}
;
_.removeChild_0 = function removeChild_15(child){
  if (this._originalaminoacid_ == child) {
    this._originalaminoacid_ = null;
    return;
  }
  if (this._integer_ == child) {
    this._integer_ = null;
    return;
  }
  if ($advanceToFind(this._mutatedaminoacid_, child, true)) {
    return;
  }
}
;
_.toString_0 = function toString_51(){
  return '' + toString_34(this._originalaminoacid_) + toString_34(this._integer_) + toString_33(this._mutatedaminoacid_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AResidueResidue_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AResidueResidue', 166);
function AResidueResidue$Mutatedaminoacid_Cast(this$0){
  this.this$01 = this$0;
}

defineClass(249, 1, {}, AResidueResidue$Mutatedaminoacid_Cast);
_.cast_0 = function cast_1(o){
  var node;
  return node = castTo(o, 33) , !!node.parent_0 && node.parent_0 != this.this$01 && node.parent_0.removeChild_0(node) , (!node.parent_0 || node.parent_0 != this.this$01) && $parent(node, this.this$01) , node;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AResidueResidue$Mutatedaminoacid_1Cast_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AResidueResidue/Mutatedaminoacid_Cast', 249);
function $setInteger_4(this$static, node){
  !!this$static._integer_ && (this$static._integer_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._integer_ = node;
}

function $setLPar_4(this$static, node){
  !!this$static._lPar_ && (this$static._lPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._lPar_ = node;
}

function $setNot(this$static, node){
  !!this$static._not_ && (this$static._not_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._not_ = node;
}

function $setOriginalaminoacid_0(this$static, node){
  !!this$static._originalaminoacid_ && (this$static._originalaminoacid_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._originalaminoacid_ = node;
}

function $setRPar_4(this$static, node){
  !!this$static._rPar_ && (this$static._rPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._rPar_ = node;
}

function AResidueinvertResidue(_originalaminoacid_, _integer_, _lPar_, _not_, _mutatedaminoacid_, _rPar_){
  this._mutatedaminoacid_ = new TypedLinkedList_0(new AResidueinvertResidue$Mutatedaminoacid_Cast(this));
  $setOriginalaminoacid_0(this, _originalaminoacid_);
  $setInteger_4(this, _integer_);
  $setLPar_4(this, _lPar_);
  $setNot(this, _not_);
  $reset_0(this._mutatedaminoacid_);
  $addAll_2(this._mutatedaminoacid_, _mutatedaminoacid_);
  $setRPar_4(this, _rPar_);
}

defineClass(168, 50, $intern_30, AResidueinvertResidue);
_.apply_1 = function apply_23(sw){
  sw.caseAResidueinvertResidue(this);
}
;
_.removeChild_0 = function removeChild_16(child){
  if (this._originalaminoacid_ == child) {
    this._originalaminoacid_ = null;
    return;
  }
  if (this._integer_ == child) {
    this._integer_ = null;
    return;
  }
  if (this._lPar_ == child) {
    this._lPar_ = null;
    return;
  }
  if (this._not_ == child) {
    this._not_ = null;
    return;
  }
  if ($advanceToFind(this._mutatedaminoacid_, child, true)) {
    return;
  }
  if (this._rPar_ == child) {
    this._rPar_ = null;
    return;
  }
}
;
_.toString_0 = function toString_52(){
  return '' + toString_34(this._originalaminoacid_) + toString_34(this._integer_) + toString_34(this._lPar_) + toString_34(this._not_) + toString_33(this._mutatedaminoacid_) + toString_34(this._rPar_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AResidueinvertResidue_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AResidueinvertResidue', 168);
function AResidueinvertResidue$Mutatedaminoacid_Cast(this$0){
  this.this$01 = this$0;
}

defineClass(251, 1, {}, AResidueinvertResidue$Mutatedaminoacid_Cast);
_.cast_0 = function cast_2(o){
  var node;
  return node = castTo(o, 33) , !!node.parent_0 && node.parent_0 != this.this$01 && node.parent_0.removeChild_0(node) , (!node.parent_0 || node.parent_0 != this.this$01) && $parent(node, this.this$01) , node;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AResidueinvertResidue$Mutatedaminoacid_1Cast_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AResidueinvertResidue/Mutatedaminoacid_Cast', 251);
function $setInteger_5(this$static, node){
  !!this$static._integer_ && (this$static._integer_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._integer_ = node;
}

function $setNot_0(this$static, node){
  !!this$static._not_ && (this$static._not_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._not_ = node;
}

function $setOriginalaminoacid_1(this$static, node){
  !!this$static._originalaminoacid_ && (this$static._originalaminoacid_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._originalaminoacid_ = node;
}

function AResiduenotResidue(_not_, _originalaminoacid_, _integer_, _mutatedaminoacid_){
  this._mutatedaminoacid_ = new TypedLinkedList_0(new AResiduenotResidue$Mutatedaminoacid_Cast(this));
  $setNot_0(this, _not_);
  $setOriginalaminoacid_1(this, _originalaminoacid_);
  $setInteger_5(this, _integer_);
  $reset_0(this._mutatedaminoacid_);
  $addAll_2(this._mutatedaminoacid_, _mutatedaminoacid_);
}

defineClass(167, 50, $intern_30, AResiduenotResidue);
_.apply_1 = function apply_24(sw){
  sw.caseAResiduenotResidue(this);
}
;
_.removeChild_0 = function removeChild_17(child){
  if (this._not_ == child) {
    this._not_ = null;
    return;
  }
  if (this._originalaminoacid_ == child) {
    this._originalaminoacid_ = null;
    return;
  }
  if (this._integer_ == child) {
    this._integer_ = null;
    return;
  }
  if ($advanceToFind(this._mutatedaminoacid_, child, true)) {
    return;
  }
}
;
_.toString_0 = function toString_53(){
  return '' + toString_34(this._not_) + toString_34(this._originalaminoacid_) + toString_34(this._integer_) + toString_33(this._mutatedaminoacid_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AResiduenotResidue_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AResiduenotResidue', 167);
function AResiduenotResidue$Mutatedaminoacid_Cast(this$0){
  this.this$01 = this$0;
}

defineClass(250, 1, {}, AResiduenotResidue$Mutatedaminoacid_Cast);
_.cast_0 = function cast_3(o){
  var node;
  return node = castTo(o, 33) , !!node.parent_0 && node.parent_0 != this.this$01 && node.parent_0.removeChild_0(node) , (!node.parent_0 || node.parent_0 != this.this$01) && $parent(node, this.this$01) , node;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AResiduenotResidue$Mutatedaminoacid_1Cast_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AResiduenotResidue/Mutatedaminoacid_Cast', 250);
function $setScorecondition(this$static, node){
  !!this$static._scorecondition_ && (this$static._scorecondition_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._scorecondition_ = node;
}

function AScoreStatement(_scorecondition_){
  $setScorecondition(this, _scorecondition_);
}

defineClass(242, 107, $intern_28, AScoreStatement);
_.apply_1 = function apply_25(sw){
  sw.caseAScoreStatement(this);
}
;
_.removeChild_0 = function removeChild_18(child){
  if (this._scorecondition_ == child) {
    this._scorecondition_ = null;
    return;
  }
}
;
_.toString_0 = function toString_54(){
  return '' + toString_34(this._scorecondition_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AScoreStatement_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AScoreStatement', 242);
defineClass(137, 10, $intern_31);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PScorecondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PScorecondition', 137);
function $apply_2(this$static, sw){
  sw.caseAScorecondition(this$static);
}

function $setFrom_3(this$static, node){
  !!this$static._from_ && (this$static._from_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._from_ = node;
}

function $setLPar_5(this$static, node){
  !!this$static._lPar_ && (this$static._lPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._lPar_ = node;
}

function $setRPar_5(this$static, node){
  !!this$static._rPar_ && (this$static._rPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._rPar_ = node;
}

function $setScore(this$static, node){
  !!this$static._score_ && (this$static._score_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._score_ = node;
}

function $setScorelist_0(this$static, node){
  !!this$static._scorelist_ && (this$static._scorelist_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._scorelist_ = node;
}

function AScorecondition(_score_, _from_, _lPar_, _scorelist_, _rPar_){
  $setScore(this, _score_);
  $setFrom_3(this, _from_);
  $setLPar_5(this, _lPar_);
  $setScorelist_0(this, _scorelist_);
  $setRPar_5(this, _rPar_);
}

defineClass(260, 137, $intern_31, AScorecondition);
_.apply_1 = function apply_26(sw){
  $apply_2(this, sw);
}
;
_.removeChild_0 = function removeChild_19(child){
  if (this._score_ == child) {
    this._score_ = null;
    return;
  }
  if (this._from_ == child) {
    this._from_ = null;
    return;
  }
  if (this._lPar_ == child) {
    this._lPar_ = null;
    return;
  }
  if (this._scorelist_ == child) {
    this._scorelist_ = null;
    return;
  }
  if (this._rPar_ == child) {
    this._rPar_ = null;
    return;
  }
}
;
_.toString_0 = function toString_55(){
  return '' + toString_34(this._score_) + toString_34(this._from_) + toString_34(this._lPar_) + toString_34(this._scorelist_) + toString_34(this._rPar_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AScorecondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AScorecondition', 260);
defineClass(74, 10, $intern_32);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PScoreitems_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PScoreitems', 74);
function $setComma_0(this$static, node){
  !!this$static._comma_ && (this$static._comma_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._comma_ = node;
}

function $setScoreitem(this$static, node){
  !!this$static._scoreitem_ && (this$static._scoreitem_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._scoreitem_ = node;
}

function AScoreitems(_comma_, _scoreitem_){
  $setComma_0(this, _comma_);
  $setScoreitem(this, _scoreitem_);
}

defineClass(262, 74, $intern_32, AScoreitems);
_.apply_1 = function apply_27(sw){
  sw.caseAScoreitems(this);
}
;
_.removeChild_0 = function removeChild_20(child){
  if (this._comma_ == child) {
    this._comma_ = null;
    return;
  }
  if (this._scoreitem_ == child) {
    this._scoreitem_ = null;
    return;
  }
}
;
_.toString_0 = function toString_56(){
  return '' + toString_34(this._comma_) + toString_34(this._scoreitem_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AScoreitems_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AScoreitems', 262);
defineClass(113, 10, $intern_33);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PScorelist_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PScorelist', 113);
function $apply_3(this$static, sw){
  sw.caseAScorelist(this$static);
}

function $setScoreitem_0(this$static, node){
  !!this$static._scoreitem_ && (this$static._scoreitem_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._scoreitem_ = node;
}

function AScorelist(_scoreitem_, _scoreitems_){
  this._scoreitems_ = new TypedLinkedList_0(new AScorelist$Scoreitems_Cast(this));
  $setScoreitem_0(this, _scoreitem_);
  $reset_0(this._scoreitems_);
  $addAll_2(this._scoreitems_, _scoreitems_);
}

defineClass(170, 113, $intern_33, AScorelist);
_.apply_1 = function apply_28(sw){
  $apply_3(this, sw);
}
;
_.removeChild_0 = function removeChild_21(child){
  if (this._scoreitem_ == child) {
    this._scoreitem_ = null;
    return;
  }
  if ($advanceToFind(this._scoreitems_, child, true)) {
    return;
  }
}
;
_.toString_0 = function toString_57(){
  return '' + toString_34(this._scoreitem_) + toString_33(this._scoreitems_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AScorelist_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AScorelist', 170);
function AScorelist$Scoreitems_Cast(this$0){
  this.this$01 = this$0;
}

defineClass(261, 1, {}, AScorelist$Scoreitems_Cast);
_.cast_0 = function cast_4(o){
  var node;
  return node = castTo(o, 74) , !!node.parent_0 && node.parent_0 != this.this$01 && node.parent_0.removeChild_0(node) , (!node.parent_0 || node.parent_0 != this.this$01) && $parent(node, this.this$01) , node;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AScorelist$Scoreitems_1Cast_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AScorelist/Scoreitems_Cast', 261);
function $setSelectstatement(this$static, node){
  !!this$static._selectstatement_ && (this$static._selectstatement_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._selectstatement_ = node;
}

function ASelectCondition(_selectstatement_){
  $setSelectstatement(this, _selectstatement_);
}

defineClass(247, 53, $intern_24, ASelectCondition);
_.apply_1 = function apply_29(sw){
  sw.caseASelectCondition(this);
}
;
_.removeChild_0 = function removeChild_22(child){
  if (this._selectstatement_ == child) {
    this._selectstatement_ = null;
    return;
  }
}
;
_.toString_0 = function toString_58(){
  return '' + toString_34(this._selectstatement_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_ASelectCondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'ASelectCondition', 247);
defineClass(71, 10, $intern_34);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PSelectlist_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PSelectlist', 71);
function $apply_4(this$static, sw){
  sw.caseASelectlist(this$static);
}

function $setResidue_2(this$static, node){
  !!this$static._residue_ && (this$static._residue_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._residue_ = node;
}

function ASelectlist(_residue_, _listitems_){
  this._listitems_ = new TypedLinkedList_0(new ASelectlist$Listitems_Cast(this));
  $setResidue_2(this, _residue_);
  $reset_0(this._listitems_);
  $addAll_2(this._listitems_, _listitems_);
}

defineClass(169, 71, $intern_34, ASelectlist);
_.apply_1 = function apply_30(sw){
  $apply_4(this, sw);
}
;
_.removeChild_0 = function removeChild_23(child){
  if (this._residue_ == child) {
    this._residue_ = null;
    return;
  }
  if ($advanceToFind(this._listitems_, child, true)) {
    return;
  }
}
;
_.toString_0 = function toString_59(){
  return '' + toString_34(this._residue_) + toString_33(this._listitems_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_ASelectlist_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'ASelectlist', 169);
function ASelectlist$Listitems_Cast(this$0){
  this.this$01 = this$0;
}

defineClass(258, 1, {}, ASelectlist$Listitems_Cast);
_.cast_0 = function cast_5(o){
  var node;
  return node = castTo(o, 72) , !!node.parent_0 && node.parent_0 != this.this$01 && node.parent_0.removeChild_0(node) , (!node.parent_0 || node.parent_0 != this.this$01) && $parent(node, this.this$01) , node;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_ASelectlist$Listitems_1Cast_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'ASelectlist/Listitems_Cast', 258);
defineClass(134, 10, $intern_35);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_PSelectstatement_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'PSelectstatement', 134);
function $apply_5(this$static, sw){
  sw.caseASelectstatement(this$static);
}

function $setSelect(this$static, node){
  !!this$static._select_ && (this$static._select_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._select_ = node;
}

function $setSelectstatement2(this$static, node){
  !!this$static._selectstatement2_ && (this$static._selectstatement2_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._selectstatement2_ = node;
}

function ASelectstatement(_select_, _selectstatement2_){
  $setSelect(this, _select_);
  $setSelectstatement2(this, _selectstatement2_);
}

defineClass(253, 134, $intern_35, ASelectstatement);
_.apply_1 = function apply_31(sw){
  $apply_5(this, sw);
}
;
_.removeChild_0 = function removeChild_24(child){
  if (this._select_ == child) {
    this._select_ = null;
    return;
  }
  if (this._selectstatement2_ == child) {
    this._selectstatement2_ = null;
    return;
  }
}
;
_.toString_0 = function toString_60(){
  return '' + toString_34(this._select_) + toString_34(this._selectstatement2_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_ASelectstatement_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'ASelectstatement', 253);
function $setBooleancondition_0(this$static, node){
  !!this$static._booleancondition_ && (this$static._booleancondition_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._booleancondition_ = node;
}

function $setLPar_6(this$static, node){
  !!this$static._lPar_ && (this$static._lPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._lPar_ = node;
}

function $setRPar_6(this$static, node){
  !!this$static._rPar_ && (this$static._rPar_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._rPar_ = node;
}

function AStatementCondition(_lPar_, _booleancondition_, _rPar_){
  $setLPar_6(this, _lPar_);
  $setBooleancondition_0(this, _booleancondition_);
  $setRPar_6(this, _rPar_);
}

defineClass(244, 53, $intern_24, AStatementCondition);
_.apply_1 = function apply_32(sw){
  sw.caseAStatementCondition(this);
}
;
_.removeChild_0 = function removeChild_25(child){
  if (this._lPar_ == child) {
    this._lPar_ = null;
    return;
  }
  if (this._booleancondition_ == child) {
    this._booleancondition_ = null;
    return;
  }
  if (this._rPar_ == child) {
    this._rPar_ = null;
    return;
  }
}
;
_.toString_0 = function toString_61(){
  return '' + toString_34(this._lPar_) + toString_34(this._booleancondition_) + toString_34(this._rPar_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AStatementCondition_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AStatementCondition', 244);
function $setBooleancondition_1(this$static, node){
  !!this$static._booleancondition_ && (this$static._booleancondition_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._booleancondition_ = node;
}

function $setMapper(this$static, node){
  !!this$static._mapper_ && (this$static._mapper_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._mapper_ = node;
}

function $setMin(this$static, node){
  !!this$static._min_ && (this$static._min_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._min_ = node;
}

function $setNumber(this$static, node){
  !!this$static._number_ && (this$static._number_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._number_ = node;
}

function AStatementScoreitem(_booleancondition_, _mapper_, _min_, _number_){
  $setBooleancondition_1(this, _booleancondition_);
  $setMapper(this, _mapper_);
  $setMin(this, _min_);
  $setNumber(this, _number_);
}

defineClass(171, 73, $intern_29, AStatementScoreitem);
_.apply_1 = function apply_33(sw){
  sw.caseAStatementScoreitem(this);
}
;
_.removeChild_0 = function removeChild_26(child){
  if (this._booleancondition_ == child) {
    this._booleancondition_ = null;
    return;
  }
  if (this._mapper_ == child) {
    this._mapper_ = null;
    return;
  }
  if (this._min_ == child) {
    this._min_ = null;
    return;
  }
  if (this._number_ == child) {
    this._number_ = null;
    return;
  }
}
;
_.toString_0 = function toString_62(){
  return '' + toString_34(this._booleancondition_) + toString_34(this._mapper_) + toString_34(this._min_) + toString_34(this._number_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_AStatementScoreitem_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'AStatementScoreitem', 171);
defineClass(298, 10, $intern_20);
_.removeChild_0 = function removeChild_27(child){
}
;
_.toString_0 = function toString_63(){
  return this.text_0 + ' ';
}
;
_.line = 0;
_.pos = 0;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_Token_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'Token', 298);
function $apply_6(this$static, sw){
  sw.caseEOF(this$static);
}

function EOF(line, pos){
  this.text_0 = '';
  this.line = line;
  this.pos = pos;
}

defineClass(127, 298, {127:1, 10:1}, EOF);
_.apply_1 = function apply_34(sw){
  $apply_6(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_EOF_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'EOF', 127);
function NoCast(){
}

defineClass(163, 1, {}, NoCast);
_.cast_0 = function cast_6(o){
  return o;
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_NoCast_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'NoCast', 163);
function $apply_7(this$static, sw){
  sw.caseStart(this$static);
}

function $setEOF(this$static, node){
  !!this$static._eof_ && (this$static._eof_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._eof_ = node;
}

function $setPStatement(this$static, node){
  !!this$static._pStatement_ && (this$static._pStatement_.parent_0 = null , undefined);
  if (node) {
    !!node.parent_0 && node.parent_0.removeChild_0(node);
    node.parent_0 = this$static;
  }
  this$static._pStatement_ = node;
}

function Start(_pStatement_, _eof_){
  $setPStatement(this, _pStatement_);
  $setEOF(this, _eof_);
}

defineClass(216, 10, $intern_20, Start);
_.apply_1 = function apply_35(sw){
  $apply_7(this, sw);
}
;
_.removeChild_0 = function removeChild_28(child){
  if (this._pStatement_ == child) {
    this._pStatement_ = null;
    return;
  }
  if (this._eof_ == child) {
    this._eof_ = null;
    return;
  }
}
;
_.toString_0 = function toString_64(){
  return '' + toString_34(this._pStatement_) + toString_34(this._eof_);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_Start_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'Start', 216);
function $apply_8(this$static, sw){
  sw.caseTAminoAcid(this$static);
}

function TAminoAcid(text_0, line, pos){
  this.text_0 = text_0;
  this.line = line;
  this.pos = pos;
}

defineClass(33, 298, {10:1, 33:1}, TAminoAcid);
_.apply_1 = function apply_36(sw){
  $apply_8(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TAminoAcid_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TAminoAcid', 33);
function $apply_9(this$static, sw){
  sw.caseTAnd(this$static);
}

function TAnd(line, pos){
  this.text_0 = 'AND';
  this.line = line;
  this.pos = pos;
}

defineClass(130, 298, {10:1, 130:1}, TAnd);
_.apply_1 = function apply_37(sw){
  $apply_9(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TAnd_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TAnd', 130);
function $apply_10(this$static, sw){
  sw.caseTAtleast(this$static);
}

function TAtleast(line, pos){
  this.text_0 = 'ATLEAST';
  this.line = line;
  this.pos = pos;
}

defineClass(110, 298, {10:1, 110:1}, TAtleast);
_.apply_1 = function apply_38(sw){
  $apply_10(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TAtleast_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TAtleast', 110);
function TBlank(text_0, line, pos){
  this.text_0 = text_0;
  this.line = line;
  this.pos = pos;
}

defineClass(266, 298, $intern_20, TBlank);
_.apply_1 = function apply_39(sw){
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TBlank_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TBlank', 266);
function $apply_11(this$static, sw){
  sw.caseTComma(this$static);
}

function TComma(line, pos){
  this.text_0 = ',';
  this.line = line;
  this.pos = pos;
}

defineClass(112, 298, {10:1, 112:1}, TComma);
_.apply_1 = function apply_40(sw){
  $apply_11(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TComma_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TComma', 112);
function $apply_12(this$static, sw){
  sw.caseTExactly(this$static);
}

function TExactly(line, pos){
  this.text_0 = 'EXACTLY';
  this.line = line;
  this.pos = pos;
}

defineClass(136, 298, {10:1, 136:1}, TExactly);
_.apply_1 = function apply_41(sw){
  $apply_12(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TExactly_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TExactly', 136);
function $apply_13(this$static, sw){
  sw.caseTExclude(this$static);
}

function TExclude(line, pos){
  this.text_0 = 'EXCLUDE';
  this.line = line;
  this.pos = pos;
}

defineClass(133, 298, {10:1, 133:1}, TExclude);
_.apply_1 = function apply_42(sw){
  $apply_13(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TExclude_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TExclude', 133);
function $apply_14(this$static, sw){
  sw.caseTFloat(this$static);
}

function TFloat(text_0, line, pos){
  this.text_0 = text_0;
  this.line = line;
  this.pos = pos;
}

defineClass(142, 298, {10:1, 142:1}, TFloat);
_.apply_1 = function apply_43(sw){
  $apply_14(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TFloat_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TFloat', 142);
function $apply_15(this$static, sw){
  sw.caseTFrom(this$static);
}

function TFrom(line, pos){
  this.text_0 = 'FROM';
  this.line = line;
  this.pos = pos;
}

defineClass(59, 298, {10:1, 59:1}, TFrom);
_.apply_1 = function apply_44(sw){
  $apply_15(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TFrom_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TFrom', 59);
function $apply_16(this$static, sw){
  sw.caseTInteger(this$static);
}

function TInteger(text_0, line, pos){
  this.text_0 = text_0;
  this.line = line;
  this.pos = pos;
}

defineClass(32, 298, {10:1, 32:1}, TInteger);
_.apply_1 = function apply_45(sw){
  $apply_16(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TInteger_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TInteger', 32);
function $apply_17(this$static, sw){
  sw.caseTLPar(this$static);
}

function TLPar(line, pos){
  this.text_0 = '(';
  this.line = line;
  this.pos = pos;
}

defineClass(41, 298, {10:1, 41:1}, TLPar);
_.apply_1 = function apply_46(sw){
  $apply_17(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TLPar_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TLPar', 41);
function $apply_18(this$static, sw){
  sw.caseTMapper(this$static);
}

function TMapper(line, pos){
  this.text_0 = '=>';
  this.line = line;
  this.pos = pos;
}

defineClass(114, 298, {10:1, 114:1}, TMapper);
_.apply_1 = function apply_47(sw){
  $apply_18(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TMapper_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TMapper', 114);
function $apply_19(this$static, sw){
  sw.caseTMax(this$static);
}

function TMax(line, pos){
  this.text_0 = 'MAX';
  this.line = line;
  this.pos = pos;
}

defineClass(141, 298, {10:1, 141:1}, TMax);
_.apply_1 = function apply_48(sw){
  $apply_19(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TMax_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TMax', 141);
function $apply_20(this$static, sw){
  sw.caseTMin(this$static);
}

function TMin(line, pos){
  this.text_0 = '-';
  this.line = line;
  this.pos = pos;
}

defineClass(139, 298, {10:1, 139:1}, TMin);
_.apply_1 = function apply_49(sw){
  $apply_20(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TMin_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TMin', 139);
function $apply_21(this$static, sw){
  sw.caseTNot(this$static);
}

function TNot(line, pos){
  this.text_0 = 'NOT';
  this.line = line;
  this.pos = pos;
}

defineClass(69, 298, {10:1, 69:1}, TNot);
_.apply_1 = function apply_50(sw){
  $apply_21(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TNot_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TNot', 69);
function $apply_22(this$static, sw){
  sw.caseTNotmorethan(this$static);
}

function TNotmorethan(line, pos){
  this.text_0 = 'NOTMORETHAN';
  this.line = line;
  this.pos = pos;
}

defineClass(111, 298, {10:1, 111:1}, TNotmorethan);
_.apply_1 = function apply_51(sw){
  $apply_22(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TNotmorethan_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TNotmorethan', 111);
function $apply_23(this$static, sw){
  sw.caseTOr(this$static);
}

function TOr(line, pos){
  this.text_0 = 'OR';
  this.line = line;
  this.pos = pos;
}

defineClass(131, 298, {10:1, 131:1}, TOr);
_.apply_1 = function apply_52(sw){
  $apply_23(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TOr_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TOr', 131);
function $apply_24(this$static, sw){
  sw.caseTRPar(this$static);
}

function TRPar(line, pos){
  this.text_0 = ')';
  this.line = line;
  this.pos = pos;
}

defineClass(42, 298, {10:1, 42:1}, TRPar);
_.apply_1 = function apply_53(sw){
  $apply_24(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TRPar_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TRPar', 42);
function $apply_25(this$static, sw){
  sw.caseTScore(this$static);
}

function TScore(line, pos){
  this.text_0 = 'SCORE';
  this.line = line;
  this.pos = pos;
}

defineClass(138, 298, {10:1, 138:1}, TScore);
_.apply_1 = function apply_54(sw){
  $apply_25(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TScore_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TScore', 138);
function $apply_26(this$static, sw){
  sw.caseTSelect(this$static);
}

function TSelect(line, pos){
  this.text_0 = 'SELECT';
  this.line = line;
  this.pos = pos;
}

defineClass(135, 298, {10:1, 135:1}, TSelect);
_.apply_1 = function apply_55(sw){
  $apply_26(this, sw);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TSelect_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TSelect', 135);
function $add_6(this$static, o){
  return $addLast_0(this$static, this$static.cast.cast_0(o)) , true;
}

function $addAll_2(this$static, c){
  var elements, i;
  elements = c.toArray();
  for (i = 0; i < elements.length; i++) {
    $addLast_0(this$static, this$static.cast.cast_0(elements[i]));
  }
  return true;
}

function $addLast_0(this$static, o){
  $addLast(this$static, this$static.cast.cast_0(o));
}

function $listIterator_0(this$static, index_0){
  return new TypedLinkedList$TypedLinkedListIterator(this$static, $listIterator(this$static, index_0));
}

function TypedLinkedList(){
  LinkedList.call(this);
  this.cast = new NoCast;
}

function TypedLinkedList_0(cast){
  LinkedList.call(this);
  this.cast = cast;
}

defineClass(12, 128, {3:1, 19:1, 18:1, 12:1}, TypedLinkedList, TypedLinkedList_0);
_.addAtIndex = function add_15(index_0, element){
  $add(this, index_0, this.cast.cast_0(element));
}
;
_.add = function add_16(o){
  return $add_6(this, o);
}
;
_.addAllAtIndex = function addAll_7(index_0, c){
  var elements, i, pos;
  pos = index_0;
  elements = c.toArray();
  for (i = 0; i < elements.length; i++) {
    $add(this, pos++, this.cast.cast_0(elements[i]));
  }
  return true;
}
;
_.addAll = function addAll_8(c){
  return $addAll_2(this, c);
}
;
_.addLast = function addLast_0(o){
  $addLast_0(this, o);
}
;
_.listIterator = function listIterator_1(index_0){
  return $listIterator_0(this, index_0);
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TypedLinkedList_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TypedLinkedList', 12);
function TypedLinkedList$TypedLinkedListIterator(this$0, iterator){
  this.this$01 = this$0;
  this.iterator = iterator;
}

defineClass(162, 1, {}, TypedLinkedList$TypedLinkedListIterator);
_.forEachRemaining = function forEachRemaining_13(consumer){
  $forEachRemaining(this, consumer);
}
;
_.add_0 = function add_17(o){
  $add_3(this.iterator, this.this$01.cast.cast_0(o));
}
;
_.hasNext_0 = function hasNext_11(){
  return $hasNext_1(this.iterator);
}
;
_.next_1 = function next_12(){
  return $next_2(this.iterator);
}
;
_.remove_0 = function remove_32(){
  $remove_7(this.iterator);
}
;
_.set_0 = function set_9(o){
  $set_0(this.iterator, this.this$01.cast.cast_0(o));
}
;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_node_TypedLinkedList$TypedLinkedListIterator_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.node', 'TypedLinkedList/TypedLinkedListIterator', 162);
function $clinit_Parser(){
  $clinit_Parser = emptyMethod;
  actionTable = stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 3), $intern_17, 7, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 0]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [4, 0, 2]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [5, 0, 3]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [10, 0, 4]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 5]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 15]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 16])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 2]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 3]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [7, 0, 18]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [8, 0, 19]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [9, 0, 20])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 4]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [6, 0, 22])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 5]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [4, 0, 2]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [5, 0, 3]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 5]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 24]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 25])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 7]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 27])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 8]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [19, 2, -1])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 0])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 2]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [1, 0, 28]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [2, 0, 29])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 5])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 6])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 1])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 15]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 25])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 16]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 34])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 17])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 18]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 35])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 19]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 36])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 20]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 37])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 18])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 22]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 38])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 23]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 0, 39])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 24]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 40])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 37])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 11]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 41])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 27]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 42]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 25])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 9])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 10])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 35])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 31]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [4, 0, 2]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [5, 0, 3]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 5]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 3]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [1, 0, 28]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [2, 0, 29])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 13]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 41])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 34]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 25])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 35]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [1, 0, 28]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [2, 0, 29]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [6, 0, 47])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 36]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [6, 0, 49])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 37]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [6, 0, 50])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 38]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [4, 0, 2]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [5, 0, 3]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [11, 0, 51]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 5]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 4])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 40]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 25])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 38])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 42]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 56])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 12]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 41])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 8])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 36])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 14]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 41])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 47]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 57])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 48]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [9, 0, 58])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 49]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 59])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 50]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 60])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 51]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 61])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 52]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [14, 0, 62])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 53]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 0, 63])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 27]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [15, 0, 64])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 55]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 0, 67]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 41])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 56]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 25])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 57]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 58]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 71])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 59]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 60]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 61]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [4, 0, 2]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [5, 0, 3]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [11, 0, 51]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 5]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 62]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [0, 0, 75]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 76]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [17, 0, 77])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 26])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 64]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [4, 0, 2]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [5, 0, 3]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [11, 0, 51]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 5]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 41])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 28]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [15, 0, 64])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 15])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 68]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 0, 81]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 41])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 23]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [15, 0, 82])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 70]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 0, 85])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 71]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [6, 0, 86])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 72]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 0, 87])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 73]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 0, 88])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 74]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 0, 89])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 75]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 76]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [17, 0, 77])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 33])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 34])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 29])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 32])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 42])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 16])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 82]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 39])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 24]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [15, 0, 82])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 20])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 86]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [12, 0, 93])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 19])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 21])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 31])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 30])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 25])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 40])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 93]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [3, 0, 1]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [16, 0, 6]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [18, 0, 7])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 3, 94]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [13, 0, 95])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 1, 22])])]);
  gotoTable_1 = stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 3), $intern_17, 7, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 8])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 52]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [0, 9]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [5, 23])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 10]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [31, 44])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 30]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [32, 45])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 31]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [35, 48])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 11]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [2, 17]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [57, 69]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [59, 69]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [60, 69]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [82, 91]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [93, 69])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 12])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 13])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 21])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 70]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [59, 72]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [60, 73]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [93, 94])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 83]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [84, 92])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 14])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 53]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [61, 74])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 54]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [64, 79])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 65]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [66, 80])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 78]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [75, 90])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 32])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 26]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [15, 33]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [27, 43]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [34, 46]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [40, 55]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [56, 68])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 84])]), stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 2), $intern_18, 4, 0, [stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [-1, 66])])]);
  errorMessages = stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_String_2_classLit, 1), $intern_3, 2, 6, ["expecting: 'NOT', 'EXCLUDE', 'SELECT', 'SCORE', '(', integer, amino acid", 'expecting: integer, amino acid', "expecting: 'NOT', integer, amino acid", "expecting: 'ATLEAST', 'EXACTLY', 'NOTMORETHAN'", "expecting: 'FROM'", "expecting: 'NOT', 'EXCLUDE', 'SELECT', '(', integer, amino acid", "expecting: '(', amino acid", 'expecting: integer', 'expecting: EOF', "expecting: 'AND', 'OR', ')', '=>', EOF", 'expecting: amino acid', "expecting: '('", "expecting: ')'", "expecting: 'NOT'", "expecting: 'AND', 'OR', ')', '=>', ',', amino acid, EOF", "expecting: 'NOT', 'EXCLUDE', 'SELECT', 'NOTMORETHAN', '(', integer, amino acid", "expecting: 'AND', 'OR', 'FROM'", "expecting: 'NOT', 'EXCLUDE', 'SELECT', 'MAX', '(', integer, amino acid", "expecting: 'NOTMORETHAN'", "expecting: '=>'", "expecting: ')', ','", "expecting: ')', amino acid", "expecting: '-', integer, float", "expecting: 'AND', 'OR', ')', '=>', ',', EOF", 'expecting: integer, float']);
  errors = stampJavaTypeInfo(getClassLiteralForArray(I_classLit, 1), $intern_19, 5, 15, [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 9, 9, 8, 10, 7, 9, 7, 7, 7, 9, 11, 12, 13, 14, 14, 6, 15, 15, 9, 5, 9, 14, 10, 16, 4, 4, 17, 9, 10, 14, 13, 14, 9, 9, 14, 11, 18, 11, 11, 11, 19, 12, 20, 21, 10, 2, 7, 2, 2, 17, 22, 8, 17, 20, 20, 23, 21, 20, 12, 4, 12, 12, 12, 24, 20, 20, 20, 20, 20, 23, 2, 20, 20, 9, 11, 9, 9, 20, 20, 20, 20, 2, 12, 9]);
}

function $goTo(this$static, index_0){
  var high, low, middle, state, value_0;
  state = $state(this$static);
  low = 1;
  high = gotoTable_1[index_0].length - 1;
  value_0 = gotoTable_1[index_0][0][1];
  while (low <= high) {
    middle = (low + high) / 2 | 0;
    if (state < gotoTable_1[index_0][middle][0]) {
      high = middle - 1;
    }
     else if (state > gotoTable_1[index_0][middle][0]) {
      low = middle + 1;
    }
     else {
      value_0 = gotoTable_1[index_0][middle][1];
      break;
    }
  }
  return value_0;
}

function $index(this$static, token){
  this$static.converter.index_0 = -1;
  token.apply_1(this$static.converter);
  return this$static.converter.index_0;
}

function $parse(this$static){
  var high, ign, index_0, list, low, middle, node, node1, node2, nodeList, nodeArrayList1, pbooleanconditionNode2, pstatementNode1, nodeList_0, nodeArrayList1_0, pscoreconditionNode2, pstatementNode1_0, nodeList_1, nodeArrayList1_1, listNode3, pconditionNode2, pbooleanconditionNode1, nodeList_2, nodeArrayList2, nodeArrayList1_2, listNode4, pconditionNode2_0, listNode3_0, pbooleanconditionNode1_0, nodeList_3, nodeArrayList3, nodeArrayList2_0, nodeArrayList1_3, tlparNode2, pbooleanconditionNode3, trparNode4, pconditionNode1, nodeList_4, nodeArrayList1_4, presidueNode2, pconditionNode1_0, nodeList_5, nodeArrayList1_5, pexcludestatementNode2, pconditionNode1_1, nodeList_6, nodeArrayList1_6, pselectstatementNode2, pconditionNode1_2, nodeList_7, nodeArrayList2_1, nodeArrayList1_7, plogicsymbolNode2, pconditionNode3, pcondition2Node1, nodeList_8, nodeArrayList1_8, tandNode2, plogicsymbolNode1, nodeList_9, nodeArrayList1_9, torNode2, plogicsymbolNode1_0, nodeList_10, nodeArrayList2_2, nodeArrayList1_10, listNode5, tintegerNode3, listNode4_0, presidueNode1, nodeList_11, nodeArrayList3_0, nodeArrayList2_3, nodeArrayList1_11, listNode5_0, taminoacidNode2, tintegerNode3_0, listNode4_1, presidueNode1_0, nodeList_12, nodeArrayList3_1, nodeArrayList2_4, nodeArrayList1_12, listNode6, tnotNode2, tintegerNode4, listNode5_1, presidueNode1_1, nodeList_13, nodeArrayList4, nodeArrayList3_2, nodeArrayList2_5, nodeArrayList1_13, listNode6_0, tnotNode2_0, taminoacidNode3, tintegerNode4_0, listNode5_2, presidueNode1_2, nodeList_14, nodeArrayList5, nodeArrayList4_0, nodeArrayList3_3, nodeArrayList2_6, nodeArrayList1_14, listNode7, tintegerNode3_1, tlparNode4, tnotNode5, listNode6_1, trparNode8, presidueNode1_3, nodeList_15, nodeArrayList6, nodeArrayList5_0, nodeArrayList4_1, nodeArrayList3_4, nodeArrayList2_7, nodeArrayList1_15, listNode7_0, taminoacidNode2_0, tintegerNode3_2, tlparNode4_0, tnotNode5_0, listNode6_2, trparNode8_0, presidueNode1_4, nodeList_16, nodeArrayList2_8, nodeArrayList1_16, texcludeNode2, presidueNode3, pexcludestatementNode1, nodeList_17, nodeArrayList2_9, nodeArrayList1_17, tselectNode2, pselectstatement2Node3, pselectstatementNode1, nodeList_18, nodeArrayList6_0, nodeArrayList5_1, nodeArrayList4_2, nodeArrayList3_5, nodeArrayList2_10, nodeArrayList1_18, texactlyNode2, tintegerNode3_3, tfromNode4, tlparNode5, pselectlistNode6, trparNode7, pselectstatement2Node1, nodeList_19, nodeArrayList6_1, nodeArrayList5_2, nodeArrayList4_3, nodeArrayList3_6, nodeArrayList2_11, nodeArrayList1_19, tatleastNode2, tintegerNode3_4, tfromNode4_0, tlparNode5_0, pselectlistNode6_0, trparNode7_0, pselectstatement2Node1_0, nodeList_20, nodeArrayList6_2, nodeArrayList5_3, nodeArrayList4_4, nodeArrayList3_7, nodeArrayList2_12, nodeArrayList1_20, tnotmorethanNode2, tintegerNode3_5, tfromNode4_1, tlparNode5_1, pselectlistNode6_1, trparNode7_1, pselectstatement2Node1_1, nodeList_21, nodeArrayList9, nodeArrayList8, nodeArrayList7, nodeArrayList6_3, nodeArrayList5_4, nodeArrayList4_5, nodeArrayList3_8, nodeArrayList2_13, nodeArrayList1_21, tatleastNode2_0, tintegerNode3_6, plogicsymbolNode4, tnotmorethanNode5, tintegerNode6, tfromNode7, tlparNode8, pselectlistNode9, trparNode10, pselectstatement2Node1_2, nodeList_22, nodeArrayList1_22, listNode3_1, presidueNode2_0, pselectlistNode1, nodeList_23, nodeArrayList2_14, nodeArrayList1_23, listNode4_2, presidueNode2_1, listNode3_2, pselectlistNode1_0, nodeList_24, nodeArrayList2_15, nodeArrayList1_24, tcommaNode2, presidueNode3_0, plistitemsNode1, nodeList_25, nodeArrayList5_5, nodeArrayList4_6, nodeArrayList3_9, nodeArrayList2_16, nodeArrayList1_25, tscoreNode2, tfromNode3, tlparNode4_1, pscorelistNode5, trparNode6, pscoreconditionNode1, nodeList_26, nodeArrayList1_26, listNode3_3, pscoreitemNode2, pscorelistNode1, nodeList_27, nodeArrayList2_17, nodeArrayList1_27, listNode4_3, pscoreitemNode2_0, listNode3_4, pscorelistNode1_0, nodeList_28, nodeArrayList3_10, nodeArrayList2_18, nodeArrayList1_28, pbooleanconditionNode2_0, tmapperNode3, pnumberNode5, pscoreitemNode1, nodeList_29, nodeArrayList4_7, nodeArrayList3_11, nodeArrayList2_19, nodeArrayList1_29, pbooleanconditionNode2_1, tmapperNode3_0, tminNode4, pnumberNode5_0, pscoreitemNode1_0, nodeList_30, nodeArrayList4_8, nodeArrayList3_12, nodeArrayList2_20, nodeArrayList1_30, tmaxNode2, tlparNode3, pscorelistNode4, trparNode5, pscoreitemNode1_1, nodeList_31, nodeArrayList2_21, nodeArrayList1_31, tcommaNode2_0, pscoreitemNode3, pscoreitemsNode1, nodeList_32, nodeArrayList1_32, tintegerNode2, pnumberNode1, nodeList_33, nodeArrayList1_33, tfloatNode2, pnumberNode1_0, nodeList_34, nodeArrayList1_34, listNode2, pcondition2Node1_0, nodeList_35, nodeArrayList2_22, nodeArrayList1_35, listNode3_5, listNode1, pcondition2Node2, nodeList_36, nodeArrayList1_36, listNode2_0, taminoacidNode1, nodeList_37, nodeArrayList2_23, nodeArrayList1_37, listNode3_6, listNode1_0, taminoacidNode2_1, nodeList_38, nodeArrayList1_38, listNode2_1, plistitemsNode1_0, nodeList_39, nodeArrayList2_24, nodeArrayList1_39, listNode3_7, listNode1_1, plistitemsNode2, nodeList_40, nodeArrayList1_40, listNode2_2, pscoreitemsNode1_0, nodeList_41, nodeArrayList2_25, nodeArrayList1_41, listNode3_8, listNode1_2, pscoreitemsNode2;
  $push_0(this$static, 0, null);
  ign = null;
  while (true) {
    while ($index(this$static, $peek_0(this$static.lexer)) == -1) {
      !ign && (ign = new TypedLinkedList_0(new NoCast));
      $add_6(ign, $next_4(this$static.lexer));
    }
    if (ign) {
      $setIn(this$static.ignoredTokens, $peek_0(this$static.lexer), ign);
      ign = null;
    }
    this$static.last_pos = $peek_0(this$static.lexer).pos;
    this$static.last_line = $peek_0(this$static.lexer).line;
    $peek_0(this$static.lexer);
    index_0 = $index(this$static, $peek_0(this$static.lexer));
    this$static.action_0[0] = actionTable[$state(this$static)][0][1];
    this$static.action_0[1] = actionTable[$state(this$static)][0][2];
    low = 1;
    high = actionTable[$state(this$static)].length - 1;
    while (low <= high) {
      middle = (low + high) / 2 | 0;
      if (index_0 < actionTable[$state(this$static)][middle][0]) {
        high = middle - 1;
      }
       else if (index_0 > actionTable[$state(this$static)][middle][0]) {
        low = middle + 1;
      }
       else {
        this$static.action_0[0] = actionTable[$state(this$static)][middle][1];
        this$static.action_0[1] = actionTable[$state(this$static)][middle][2];
        break;
      }
    }
    switch (this$static.action_0[0]) {
      case 0:
        {
          list = new ArrayList;
          $add_1(list, $next_4(this$static.lexer));
          $push_0(this$static, this$static.action_0[1], list);
        }

        break;
      case 1:
        switch (this$static.action_0[1]) {
          case 0:
            {
              list = (nodeList = new ArrayList , nodeArrayList1 = castTo($previous(this$static.stack_0), 8).nodes , pbooleanconditionNode2 = (checkCriticalElementIndex(0, nodeArrayList1.array.length) , castTo(nodeArrayList1.array[0], 67)) , pstatementNode1 = new ALogicstatementStatement(pbooleanconditionNode2) , push_1(nodeList.array, pstatementNode1) , nodeList);
              $push_0(this$static, $goTo(this$static, 0), list);
            }

            break;
          case 1:
            {
              list = (nodeList_0 = new ArrayList , nodeArrayList1_0 = castTo($previous(this$static.stack_0), 8).nodes , pscoreconditionNode2 = (checkCriticalElementIndex(0, nodeArrayList1_0.array.length) , castTo(nodeArrayList1_0.array[0], 137)) , pstatementNode1_0 = new AScoreStatement(pscoreconditionNode2) , push_1(nodeList_0.array, pstatementNode1_0) , nodeList_0);
              $push_0(this$static, $goTo(this$static, 0), list);
            }

            break;
          case 2:
            {
              list = (nodeList_1 = new ArrayList , nodeArrayList1_1 = castTo($previous(this$static.stack_0), 8).nodes , listNode3 = new TypedLinkedList , pconditionNode2 = (checkCriticalElementIndex(0, nodeArrayList1_1.array.length) , castTo(nodeArrayList1_1.array[0], 53)) , pbooleanconditionNode1 = new ABooleancondition(pconditionNode2, listNode3) , push_1(nodeList_1.array, pbooleanconditionNode1) , nodeList_1);
              $push_0(this$static, $goTo(this$static, 1), list);
            }

            break;
          case 3:
            {
              list = (nodeList_2 = new ArrayList , nodeArrayList2 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_2 = castTo($previous(this$static.stack_0), 8).nodes , listNode4 = new TypedLinkedList , pconditionNode2_0 = (checkCriticalElementIndex(0, nodeArrayList1_2.array.length) , castTo(nodeArrayList1_2.array[0], 53)) , listNode3_0 = (checkCriticalElementIndex(0, nodeArrayList2.array.length) , castTo(nodeArrayList2.array[0], 12)) , !!listNode3_0 && $addAll_2(listNode4, listNode3_0) , pbooleanconditionNode1_0 = new ABooleancondition(pconditionNode2_0, listNode4) , push_1(nodeList_2.array, pbooleanconditionNode1_0) , nodeList_2);
              $push_0(this$static, $goTo(this$static, 1), list);
            }

            break;
          case 4:
            {
              list = (nodeList_3 = new ArrayList , nodeArrayList3 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_0 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_3 = castTo($previous(this$static.stack_0), 8).nodes , tlparNode2 = (checkCriticalElementIndex(0, nodeArrayList1_3.array.length) , castTo(nodeArrayList1_3.array[0], 41)) , pbooleanconditionNode3 = (checkCriticalElementIndex(0, nodeArrayList2_0.array.length) , castTo(nodeArrayList2_0.array[0], 67)) , trparNode4 = (checkCriticalElementIndex(0, nodeArrayList3.array.length) , castTo(nodeArrayList3.array[0], 42)) , pconditionNode1 = new AStatementCondition(tlparNode2, pbooleanconditionNode3, trparNode4) , push_1(nodeList_3.array, pconditionNode1) , nodeList_3);
              $push_0(this$static, $goTo(this$static, 2), list);
            }

            break;
          case 5:
            {
              list = (nodeList_4 = new ArrayList , nodeArrayList1_4 = castTo($previous(this$static.stack_0), 8).nodes , presidueNode2 = (checkCriticalElementIndex(0, nodeArrayList1_4.array.length) , castTo(nodeArrayList1_4.array[0], 50)) , pconditionNode1_0 = new AResidueCondition(presidueNode2) , push_1(nodeList_4.array, pconditionNode1_0) , nodeList_4);
              $push_0(this$static, $goTo(this$static, 2), list);
            }

            break;
          case 6:
            {
              list = (nodeList_5 = new ArrayList , nodeArrayList1_5 = castTo($previous(this$static.stack_0), 8).nodes , pexcludestatementNode2 = (checkCriticalElementIndex(0, nodeArrayList1_5.array.length) , castTo(nodeArrayList1_5.array[0], 132)) , pconditionNode1_1 = new AExcludeCondition(pexcludestatementNode2) , push_1(nodeList_5.array, pconditionNode1_1) , nodeList_5);
              $push_0(this$static, $goTo(this$static, 2), list);
            }

            break;
          case 7:
            {
              list = (nodeList_6 = new ArrayList , nodeArrayList1_6 = castTo($previous(this$static.stack_0), 8).nodes , pselectstatementNode2 = (checkCriticalElementIndex(0, nodeArrayList1_6.array.length) , castTo(nodeArrayList1_6.array[0], 134)) , pconditionNode1_2 = new ASelectCondition(pselectstatementNode2) , push_1(nodeList_6.array, pconditionNode1_2) , nodeList_6);
              $push_0(this$static, $goTo(this$static, 2), list);
            }

            break;
          case 8:
            {
              list = (nodeList_7 = new ArrayList , nodeArrayList2_1 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_7 = castTo($previous(this$static.stack_0), 8).nodes , plogicsymbolNode2 = (checkCriticalElementIndex(0, nodeArrayList1_7.array.length) , castTo(nodeArrayList1_7.array[0], 86)) , pconditionNode3 = (checkCriticalElementIndex(0, nodeArrayList2_1.array.length) , castTo(nodeArrayList2_1.array[0], 53)) , pcondition2Node1 = new ACondition2(plogicsymbolNode2, pconditionNode3) , push_1(nodeList_7.array, pcondition2Node1) , nodeList_7);
              $push_0(this$static, $goTo(this$static, 3), list);
            }

            break;
          case 9:
            {
              list = (nodeList_8 = new ArrayList , nodeArrayList1_8 = castTo($previous(this$static.stack_0), 8).nodes , tandNode2 = (checkCriticalElementIndex(0, nodeArrayList1_8.array.length) , castTo(nodeArrayList1_8.array[0], 130)) , plogicsymbolNode1 = new AAndLogicsymbol(tandNode2) , push_1(nodeList_8.array, plogicsymbolNode1) , nodeList_8);
              $push_0(this$static, $goTo(this$static, 4), list);
            }

            break;
          case 10:
            {
              list = (nodeList_9 = new ArrayList , nodeArrayList1_9 = castTo($previous(this$static.stack_0), 8).nodes , torNode2 = (checkCriticalElementIndex(0, nodeArrayList1_9.array.length) , castTo(nodeArrayList1_9.array[0], 131)) , plogicsymbolNode1_0 = new AOrLogicsymbol(torNode2) , push_1(nodeList_9.array, plogicsymbolNode1_0) , nodeList_9);
              $push_0(this$static, $goTo(this$static, 4), list);
            }

            break;
          case 11:
            {
              list = (nodeList_10 = new ArrayList , nodeArrayList2_2 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_10 = castTo($previous(this$static.stack_0), 8).nodes , listNode5 = new TypedLinkedList , tintegerNode3 = (checkCriticalElementIndex(0, nodeArrayList1_10.array.length) , castTo(nodeArrayList1_10.array[0], 32)) , listNode4_0 = (checkCriticalElementIndex(0, nodeArrayList2_2.array.length) , castTo(nodeArrayList2_2.array[0], 12)) , !!listNode4_0 && $addAll_2(listNode5, listNode4_0) , presidueNode1 = new AResidueResidue(null, tintegerNode3, listNode5) , push_1(nodeList_10.array, presidueNode1) , nodeList_10);
              $push_0(this$static, $goTo(this$static, 5), list);
            }

            break;
          case 12:
            {
              list = (nodeList_11 = new ArrayList , nodeArrayList3_0 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_3 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_11 = castTo($previous(this$static.stack_0), 8).nodes , listNode5_0 = new TypedLinkedList , taminoacidNode2 = (checkCriticalElementIndex(0, nodeArrayList1_11.array.length) , castTo(nodeArrayList1_11.array[0], 33)) , tintegerNode3_0 = (checkCriticalElementIndex(0, nodeArrayList2_3.array.length) , castTo(nodeArrayList2_3.array[0], 32)) , listNode4_1 = (checkCriticalElementIndex(0, nodeArrayList3_0.array.length) , castTo(nodeArrayList3_0.array[0], 12)) , !!listNode4_1 && $addAll_2(listNode5_0, listNode4_1) , presidueNode1_0 = new AResidueResidue(taminoacidNode2, tintegerNode3_0, listNode5_0) , push_1(nodeList_11.array, presidueNode1_0) , nodeList_11);
              $push_0(this$static, $goTo(this$static, 5), list);
            }

            break;
          case 13:
            {
              list = (nodeList_12 = new ArrayList , nodeArrayList3_1 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_4 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_12 = castTo($previous(this$static.stack_0), 8).nodes , listNode6 = new TypedLinkedList , tnotNode2 = (checkCriticalElementIndex(0, nodeArrayList1_12.array.length) , castTo(nodeArrayList1_12.array[0], 69)) , tintegerNode4 = (checkCriticalElementIndex(0, nodeArrayList2_4.array.length) , castTo(nodeArrayList2_4.array[0], 32)) , listNode5_1 = (checkCriticalElementIndex(0, nodeArrayList3_1.array.length) , castTo(nodeArrayList3_1.array[0], 12)) , !!listNode5_1 && $addAll_2(listNode6, listNode5_1) , presidueNode1_1 = new AResiduenotResidue(tnotNode2, null, tintegerNode4, listNode6) , push_1(nodeList_12.array, presidueNode1_1) , nodeList_12);
              $push_0(this$static, $goTo(this$static, 5), list);
            }

            break;
          case 14:
            {
              list = (nodeList_13 = new ArrayList , nodeArrayList4 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_2 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_5 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_13 = castTo($previous(this$static.stack_0), 8).nodes , listNode6_0 = new TypedLinkedList , tnotNode2_0 = (checkCriticalElementIndex(0, nodeArrayList1_13.array.length) , castTo(nodeArrayList1_13.array[0], 69)) , taminoacidNode3 = (checkCriticalElementIndex(0, nodeArrayList2_5.array.length) , castTo(nodeArrayList2_5.array[0], 33)) , tintegerNode4_0 = (checkCriticalElementIndex(0, nodeArrayList3_2.array.length) , castTo(nodeArrayList3_2.array[0], 32)) , listNode5_2 = (checkCriticalElementIndex(0, nodeArrayList4.array.length) , castTo(nodeArrayList4.array[0], 12)) , !!listNode5_2 && $addAll_2(listNode6_0, listNode5_2) , presidueNode1_2 = new AResiduenotResidue(tnotNode2_0, taminoacidNode3, tintegerNode4_0, listNode6_0) , push_1(nodeList_13.array, presidueNode1_2) , nodeList_13);
              $push_0(this$static, $goTo(this$static, 5), list);
            }

            break;
          case 15:
            {
              list = (nodeList_14 = new ArrayList , nodeArrayList5 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList4_0 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_3 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_6 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_14 = castTo($previous(this$static.stack_0), 8).nodes , listNode7 = new TypedLinkedList , tintegerNode3_1 = (checkCriticalElementIndex(0, nodeArrayList1_14.array.length) , castTo(nodeArrayList1_14.array[0], 32)) , tlparNode4 = (checkCriticalElementIndex(0, nodeArrayList2_6.array.length) , castTo(nodeArrayList2_6.array[0], 41)) , tnotNode5 = (checkCriticalElementIndex(0, nodeArrayList3_3.array.length) , castTo(nodeArrayList3_3.array[0], 69)) , listNode6_1 = (checkCriticalElementIndex(0, nodeArrayList4_0.array.length) , castTo(nodeArrayList4_0.array[0], 12)) , !!listNode6_1 && $addAll_2(listNode7, listNode6_1) , trparNode8 = (checkCriticalElementIndex(0, nodeArrayList5.array.length) , castTo(nodeArrayList5.array[0], 42)) , presidueNode1_3 = new AResidueinvertResidue(null, tintegerNode3_1, tlparNode4, tnotNode5, listNode7, trparNode8) , push_1(nodeList_14.array, presidueNode1_3) , nodeList_14);
              $push_0(this$static, $goTo(this$static, 5), list);
            }

            break;
          case 16:
            {
              list = (nodeList_15 = new ArrayList , nodeArrayList6 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList5_0 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList4_1 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_4 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_7 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_15 = castTo($previous(this$static.stack_0), 8).nodes , listNode7_0 = new TypedLinkedList , taminoacidNode2_0 = (checkCriticalElementIndex(0, nodeArrayList1_15.array.length) , castTo(nodeArrayList1_15.array[0], 33)) , tintegerNode3_2 = (checkCriticalElementIndex(0, nodeArrayList2_7.array.length) , castTo(nodeArrayList2_7.array[0], 32)) , tlparNode4_0 = (checkCriticalElementIndex(0, nodeArrayList3_4.array.length) , castTo(nodeArrayList3_4.array[0], 41)) , tnotNode5_0 = (checkCriticalElementIndex(0, nodeArrayList4_1.array.length) , castTo(nodeArrayList4_1.array[0], 69)) , listNode6_2 = (checkCriticalElementIndex(0, nodeArrayList5_0.array.length) , castTo(nodeArrayList5_0.array[0], 12)) , !!listNode6_2 && $addAll_2(listNode7_0, listNode6_2) , trparNode8_0 = (checkCriticalElementIndex(0, nodeArrayList6.array.length) , castTo(nodeArrayList6.array[0], 42)) , presidueNode1_4 = new AResidueinvertResidue(taminoacidNode2_0, tintegerNode3_2, tlparNode4_0, tnotNode5_0, listNode7_0, trparNode8_0) , push_1(nodeList_15.array, presidueNode1_4) , nodeList_15);
              $push_0(this$static, $goTo(this$static, 5), list);
            }

            break;
          case 17:
            {
              list = (nodeList_16 = new ArrayList , nodeArrayList2_8 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_16 = castTo($previous(this$static.stack_0), 8).nodes , texcludeNode2 = (checkCriticalElementIndex(0, nodeArrayList1_16.array.length) , castTo(nodeArrayList1_16.array[0], 133)) , presidueNode3 = (checkCriticalElementIndex(0, nodeArrayList2_8.array.length) , castTo(nodeArrayList2_8.array[0], 50)) , pexcludestatementNode1 = new AExcludestatement(texcludeNode2, presidueNode3) , push_1(nodeList_16.array, pexcludestatementNode1) , nodeList_16);
              $push_0(this$static, $goTo(this$static, 6), list);
            }

            break;
          case 18:
            {
              list = (nodeList_17 = new ArrayList , nodeArrayList2_9 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_17 = castTo($previous(this$static.stack_0), 8).nodes , tselectNode2 = (checkCriticalElementIndex(0, nodeArrayList1_17.array.length) , castTo(nodeArrayList1_17.array[0], 135)) , pselectstatement2Node3 = (checkCriticalElementIndex(0, nodeArrayList2_9.array.length) , castTo(nodeArrayList2_9.array[0], 70)) , pselectstatementNode1 = new ASelectstatement(tselectNode2, pselectstatement2Node3) , push_1(nodeList_17.array, pselectstatementNode1) , nodeList_17);
              $push_0(this$static, $goTo(this$static, 7), list);
            }

            break;
          case 19:
            {
              list = (nodeList_18 = new ArrayList , nodeArrayList6_0 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList5_1 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList4_2 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_5 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_10 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_18 = castTo($previous(this$static.stack_0), 8).nodes , texactlyNode2 = (checkCriticalElementIndex(0, nodeArrayList1_18.array.length) , castTo(nodeArrayList1_18.array[0], 136)) , tintegerNode3_3 = (checkCriticalElementIndex(0, nodeArrayList2_10.array.length) , castTo(nodeArrayList2_10.array[0], 32)) , tfromNode4 = (checkCriticalElementIndex(0, nodeArrayList3_5.array.length) , castTo(nodeArrayList3_5.array[0], 59)) , tlparNode5 = (checkCriticalElementIndex(0, nodeArrayList4_2.array.length) , castTo(nodeArrayList4_2.array[0], 41)) , pselectlistNode6 = (checkCriticalElementIndex(0, nodeArrayList5_1.array.length) , castTo(nodeArrayList5_1.array[0], 71)) , trparNode7 = (checkCriticalElementIndex(0, nodeArrayList6_0.array.length) , castTo(nodeArrayList6_0.array[0], 42)) , pselectstatement2Node1 = new AExactlySelectstatement2(texactlyNode2, tintegerNode3_3, tfromNode4, tlparNode5, pselectlistNode6, trparNode7) , push_1(nodeList_18.array, pselectstatement2Node1) , nodeList_18);
              $push_0(this$static, $goTo(this$static, 8), list);
            }

            break;
          case 20:
            {
              list = (nodeList_19 = new ArrayList , nodeArrayList6_1 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList5_2 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList4_3 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_6 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_11 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_19 = castTo($previous(this$static.stack_0), 8).nodes , tatleastNode2 = (checkCriticalElementIndex(0, nodeArrayList1_19.array.length) , castTo(nodeArrayList1_19.array[0], 110)) , tintegerNode3_4 = (checkCriticalElementIndex(0, nodeArrayList2_11.array.length) , castTo(nodeArrayList2_11.array[0], 32)) , tfromNode4_0 = (checkCriticalElementIndex(0, nodeArrayList3_6.array.length) , castTo(nodeArrayList3_6.array[0], 59)) , tlparNode5_0 = (checkCriticalElementIndex(0, nodeArrayList4_3.array.length) , castTo(nodeArrayList4_3.array[0], 41)) , pselectlistNode6_0 = (checkCriticalElementIndex(0, nodeArrayList5_2.array.length) , castTo(nodeArrayList5_2.array[0], 71)) , trparNode7_0 = (checkCriticalElementIndex(0, nodeArrayList6_1.array.length) , castTo(nodeArrayList6_1.array[0], 42)) , pselectstatement2Node1_0 = new AAtleastSelectstatement2(tatleastNode2, tintegerNode3_4, tfromNode4_0, tlparNode5_0, pselectlistNode6_0, trparNode7_0) , push_1(nodeList_19.array, pselectstatement2Node1_0) , nodeList_19);
              $push_0(this$static, $goTo(this$static, 8), list);
            }

            break;
          case 21:
            {
              list = (nodeList_20 = new ArrayList , nodeArrayList6_2 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList5_3 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList4_4 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_7 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_12 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_20 = castTo($previous(this$static.stack_0), 8).nodes , tnotmorethanNode2 = (checkCriticalElementIndex(0, nodeArrayList1_20.array.length) , castTo(nodeArrayList1_20.array[0], 111)) , tintegerNode3_5 = (checkCriticalElementIndex(0, nodeArrayList2_12.array.length) , castTo(nodeArrayList2_12.array[0], 32)) , tfromNode4_1 = (checkCriticalElementIndex(0, nodeArrayList3_7.array.length) , castTo(nodeArrayList3_7.array[0], 59)) , tlparNode5_1 = (checkCriticalElementIndex(0, nodeArrayList4_4.array.length) , castTo(nodeArrayList4_4.array[0], 41)) , pselectlistNode6_1 = (checkCriticalElementIndex(0, nodeArrayList5_3.array.length) , castTo(nodeArrayList5_3.array[0], 71)) , trparNode7_1 = (checkCriticalElementIndex(0, nodeArrayList6_2.array.length) , castTo(nodeArrayList6_2.array[0], 42)) , pselectstatement2Node1_1 = new ANotmorethanSelectstatement2(tnotmorethanNode2, tintegerNode3_5, tfromNode4_1, tlparNode5_1, pselectlistNode6_1, trparNode7_1) , push_1(nodeList_20.array, pselectstatement2Node1_1) , nodeList_20);
              $push_0(this$static, $goTo(this$static, 8), list);
            }

            break;
          case 22:
            {
              list = (nodeList_21 = new ArrayList , nodeArrayList9 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList8 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList7 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList6_3 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList5_4 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList4_5 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_8 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_13 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_21 = castTo($previous(this$static.stack_0), 8).nodes , tatleastNode2_0 = (checkCriticalElementIndex(0, nodeArrayList1_21.array.length) , castTo(nodeArrayList1_21.array[0], 110)) , tintegerNode3_6 = (checkCriticalElementIndex(0, nodeArrayList2_13.array.length) , castTo(nodeArrayList2_13.array[0], 32)) , plogicsymbolNode4 = (checkCriticalElementIndex(0, nodeArrayList3_8.array.length) , castTo(nodeArrayList3_8.array[0], 86)) , tnotmorethanNode5 = (checkCriticalElementIndex(0, nodeArrayList4_5.array.length) , castTo(nodeArrayList4_5.array[0], 111)) , tintegerNode6 = (checkCriticalElementIndex(0, nodeArrayList5_4.array.length) , castTo(nodeArrayList5_4.array[0], 32)) , tfromNode7 = (checkCriticalElementIndex(0, nodeArrayList6_3.array.length) , castTo(nodeArrayList6_3.array[0], 59)) , tlparNode8 = (checkCriticalElementIndex(0, nodeArrayList7.array.length) , castTo(nodeArrayList7.array[0], 41)) , pselectlistNode9 = (checkCriticalElementIndex(0, nodeArrayList8.array.length) , castTo(nodeArrayList8.array[0], 71)) , trparNode10 = (checkCriticalElementIndex(0, nodeArrayList9.array.length) , castTo(nodeArrayList9.array[0], 42)) , pselectstatement2Node1_2 = new AAtleastnotmorethanSelectstatement2(tatleastNode2_0, tintegerNode3_6, plogicsymbolNode4, tnotmorethanNode5, tintegerNode6, tfromNode7, tlparNode8, pselectlistNode9, trparNode10) , push_1(nodeList_21.array, pselectstatement2Node1_2) , nodeList_21);
              $push_0(this$static, $goTo(this$static, 8), list);
            }

            break;
          case 23:
            {
              list = (nodeList_22 = new ArrayList , nodeArrayList1_22 = castTo($previous(this$static.stack_0), 8).nodes , listNode3_1 = new TypedLinkedList , presidueNode2_0 = (checkCriticalElementIndex(0, nodeArrayList1_22.array.length) , castTo(nodeArrayList1_22.array[0], 50)) , pselectlistNode1 = new ASelectlist(presidueNode2_0, listNode3_1) , push_1(nodeList_22.array, pselectlistNode1) , nodeList_22);
              $push_0(this$static, $goTo(this$static, 9), list);
            }

            break;
          case 24:
            {
              list = (nodeList_23 = new ArrayList , nodeArrayList2_14 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_23 = castTo($previous(this$static.stack_0), 8).nodes , listNode4_2 = new TypedLinkedList , presidueNode2_1 = (checkCriticalElementIndex(0, nodeArrayList1_23.array.length) , castTo(nodeArrayList1_23.array[0], 50)) , listNode3_2 = (checkCriticalElementIndex(0, nodeArrayList2_14.array.length) , castTo(nodeArrayList2_14.array[0], 12)) , !!listNode3_2 && $addAll_2(listNode4_2, listNode3_2) , pselectlistNode1_0 = new ASelectlist(presidueNode2_1, listNode4_2) , push_1(nodeList_23.array, pselectlistNode1_0) , nodeList_23);
              $push_0(this$static, $goTo(this$static, 9), list);
            }

            break;
          case 25:
            {
              list = (nodeList_24 = new ArrayList , nodeArrayList2_15 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_24 = castTo($previous(this$static.stack_0), 8).nodes , tcommaNode2 = (checkCriticalElementIndex(0, nodeArrayList1_24.array.length) , castTo(nodeArrayList1_24.array[0], 112)) , presidueNode3_0 = (checkCriticalElementIndex(0, nodeArrayList2_15.array.length) , castTo(nodeArrayList2_15.array[0], 50)) , plistitemsNode1 = new AListitems(tcommaNode2, presidueNode3_0) , push_1(nodeList_24.array, plistitemsNode1) , nodeList_24);
              $push_0(this$static, $goTo(this$static, 10), list);
            }

            break;
          case 26:
            {
              list = (nodeList_25 = new ArrayList , nodeArrayList5_5 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList4_6 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_9 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_16 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_25 = castTo($previous(this$static.stack_0), 8).nodes , tscoreNode2 = (checkCriticalElementIndex(0, nodeArrayList1_25.array.length) , castTo(nodeArrayList1_25.array[0], 138)) , tfromNode3 = (checkCriticalElementIndex(0, nodeArrayList2_16.array.length) , castTo(nodeArrayList2_16.array[0], 59)) , tlparNode4_1 = (checkCriticalElementIndex(0, nodeArrayList3_9.array.length) , castTo(nodeArrayList3_9.array[0], 41)) , pscorelistNode5 = (checkCriticalElementIndex(0, nodeArrayList4_6.array.length) , castTo(nodeArrayList4_6.array[0], 113)) , trparNode6 = (checkCriticalElementIndex(0, nodeArrayList5_5.array.length) , castTo(nodeArrayList5_5.array[0], 42)) , pscoreconditionNode1 = new AScorecondition(tscoreNode2, tfromNode3, tlparNode4_1, pscorelistNode5, trparNode6) , push_1(nodeList_25.array, pscoreconditionNode1) , nodeList_25);
              $push_0(this$static, $goTo(this$static, 11), list);
            }

            break;
          case 27:
            {
              list = (nodeList_26 = new ArrayList , nodeArrayList1_26 = castTo($previous(this$static.stack_0), 8).nodes , listNode3_3 = new TypedLinkedList , pscoreitemNode2 = (checkCriticalElementIndex(0, nodeArrayList1_26.array.length) , castTo(nodeArrayList1_26.array[0], 73)) , pscorelistNode1 = new AScorelist(pscoreitemNode2, listNode3_3) , push_1(nodeList_26.array, pscorelistNode1) , nodeList_26);
              $push_0(this$static, $goTo(this$static, 12), list);
            }

            break;
          case 28:
            {
              list = (nodeList_27 = new ArrayList , nodeArrayList2_17 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_27 = castTo($previous(this$static.stack_0), 8).nodes , listNode4_3 = new TypedLinkedList , pscoreitemNode2_0 = (checkCriticalElementIndex(0, nodeArrayList1_27.array.length) , castTo(nodeArrayList1_27.array[0], 73)) , listNode3_4 = (checkCriticalElementIndex(0, nodeArrayList2_17.array.length) , castTo(nodeArrayList2_17.array[0], 12)) , !!listNode3_4 && $addAll_2(listNode4_3, listNode3_4) , pscorelistNode1_0 = new AScorelist(pscoreitemNode2_0, listNode4_3) , push_1(nodeList_27.array, pscorelistNode1_0) , nodeList_27);
              $push_0(this$static, $goTo(this$static, 12), list);
            }

            break;
          case 29:
            {
              list = (nodeList_28 = new ArrayList , nodeArrayList3_10 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_18 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_28 = castTo($previous(this$static.stack_0), 8).nodes , pbooleanconditionNode2_0 = (checkCriticalElementIndex(0, nodeArrayList1_28.array.length) , castTo(nodeArrayList1_28.array[0], 67)) , tmapperNode3 = (checkCriticalElementIndex(0, nodeArrayList2_18.array.length) , castTo(nodeArrayList2_18.array[0], 114)) , pnumberNode5 = (checkCriticalElementIndex(0, nodeArrayList3_10.array.length) , castTo(nodeArrayList3_10.array[0], 87)) , pscoreitemNode1 = new AStatementScoreitem(pbooleanconditionNode2_0, tmapperNode3, null, pnumberNode5) , push_1(nodeList_28.array, pscoreitemNode1) , nodeList_28);
              $push_0(this$static, $goTo(this$static, 13), list);
            }

            break;
          case 30:
            {
              list = (nodeList_29 = new ArrayList , nodeArrayList4_7 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_11 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_19 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_29 = castTo($previous(this$static.stack_0), 8).nodes , pbooleanconditionNode2_1 = (checkCriticalElementIndex(0, nodeArrayList1_29.array.length) , castTo(nodeArrayList1_29.array[0], 67)) , tmapperNode3_0 = (checkCriticalElementIndex(0, nodeArrayList2_19.array.length) , castTo(nodeArrayList2_19.array[0], 114)) , tminNode4 = (checkCriticalElementIndex(0, nodeArrayList3_11.array.length) , castTo(nodeArrayList3_11.array[0], 139)) , pnumberNode5_0 = (checkCriticalElementIndex(0, nodeArrayList4_7.array.length) , castTo(nodeArrayList4_7.array[0], 87)) , pscoreitemNode1_0 = new AStatementScoreitem(pbooleanconditionNode2_1, tmapperNode3_0, tminNode4, pnumberNode5_0) , push_1(nodeList_29.array, pscoreitemNode1_0) , nodeList_29);
              $push_0(this$static, $goTo(this$static, 13), list);
            }

            break;
          case 31:
            {
              list = (nodeList_30 = new ArrayList , nodeArrayList4_8 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList3_12 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList2_20 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_30 = castTo($previous(this$static.stack_0), 8).nodes , tmaxNode2 = (checkCriticalElementIndex(0, nodeArrayList1_30.array.length) , castTo(nodeArrayList1_30.array[0], 141)) , tlparNode3 = (checkCriticalElementIndex(0, nodeArrayList2_20.array.length) , castTo(nodeArrayList2_20.array[0], 41)) , pscorelistNode4 = (checkCriticalElementIndex(0, nodeArrayList3_12.array.length) , castTo(nodeArrayList3_12.array[0], 113)) , trparNode5 = (checkCriticalElementIndex(0, nodeArrayList4_8.array.length) , castTo(nodeArrayList4_8.array[0], 42)) , pscoreitemNode1_1 = new AMaxScoreitem(tmaxNode2, tlparNode3, pscorelistNode4, trparNode5) , push_1(nodeList_30.array, pscoreitemNode1_1) , nodeList_30);
              $push_0(this$static, $goTo(this$static, 13), list);
            }

            break;
          case 32:
            {
              list = (nodeList_31 = new ArrayList , nodeArrayList2_21 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_31 = castTo($previous(this$static.stack_0), 8).nodes , tcommaNode2_0 = (checkCriticalElementIndex(0, nodeArrayList1_31.array.length) , castTo(nodeArrayList1_31.array[0], 112)) , pscoreitemNode3 = (checkCriticalElementIndex(0, nodeArrayList2_21.array.length) , castTo(nodeArrayList2_21.array[0], 73)) , pscoreitemsNode1 = new AScoreitems(tcommaNode2_0, pscoreitemNode3) , push_1(nodeList_31.array, pscoreitemsNode1) , nodeList_31);
              $push_0(this$static, $goTo(this$static, 14), list);
            }

            break;
          case 33:
            {
              list = (nodeList_32 = new ArrayList , nodeArrayList1_32 = castTo($previous(this$static.stack_0), 8).nodes , tintegerNode2 = (checkCriticalElementIndex(0, nodeArrayList1_32.array.length) , castTo(nodeArrayList1_32.array[0], 32)) , pnumberNode1 = new AIntegerNumber(tintegerNode2) , push_1(nodeList_32.array, pnumberNode1) , nodeList_32);
              $push_0(this$static, $goTo(this$static, 15), list);
            }

            break;
          case 34:
            {
              list = (nodeList_33 = new ArrayList , nodeArrayList1_33 = castTo($previous(this$static.stack_0), 8).nodes , tfloatNode2 = (checkCriticalElementIndex(0, nodeArrayList1_33.array.length) , castTo(nodeArrayList1_33.array[0], 142)) , pnumberNode1_0 = new AFloatNumber(tfloatNode2) , push_1(nodeList_33.array, pnumberNode1_0) , nodeList_33);
              $push_0(this$static, $goTo(this$static, 15), list);
            }

            break;
          case 35:
            {
              list = (nodeList_34 = new ArrayList , nodeArrayList1_34 = castTo($previous(this$static.stack_0), 8).nodes , listNode2 = new TypedLinkedList , pcondition2Node1_0 = (checkCriticalElementIndex(0, nodeArrayList1_34.array.length) , castTo(nodeArrayList1_34.array[0], 68)) , !!pcondition2Node1_0 && ($addLast_0(listNode2, listNode2.cast.cast_0(pcondition2Node1_0)) , true) , push_1(nodeList_34.array, listNode2) , nodeList_34);
              $push_0(this$static, $goTo(this$static, 16), list);
            }

            break;
          case 36:
            {
              list = (nodeList_35 = new ArrayList , nodeArrayList2_22 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_35 = castTo($previous(this$static.stack_0), 8).nodes , listNode3_5 = new TypedLinkedList , listNode1 = (checkCriticalElementIndex(0, nodeArrayList1_35.array.length) , castTo(nodeArrayList1_35.array[0], 12)) , pcondition2Node2 = (checkCriticalElementIndex(0, nodeArrayList2_22.array.length) , castTo(nodeArrayList2_22.array[0], 68)) , !!listNode1 && $addAll_2(listNode3_5, listNode1) , !!pcondition2Node2 && ($addLast_0(listNode3_5, listNode3_5.cast.cast_0(pcondition2Node2)) , true) , push_1(nodeList_35.array, listNode3_5) , nodeList_35);
              $push_0(this$static, $goTo(this$static, 16), list);
            }

            break;
          case 37:
            {
              list = (nodeList_36 = new ArrayList , nodeArrayList1_36 = castTo($previous(this$static.stack_0), 8).nodes , listNode2_0 = new TypedLinkedList , taminoacidNode1 = (checkCriticalElementIndex(0, nodeArrayList1_36.array.length) , castTo(nodeArrayList1_36.array[0], 33)) , !!taminoacidNode1 && ($addLast_0(listNode2_0, listNode2_0.cast.cast_0(taminoacidNode1)) , true) , push_1(nodeList_36.array, listNode2_0) , nodeList_36);
              $push_0(this$static, $goTo(this$static, 17), list);
            }

            break;
          case 38:
            {
              list = (nodeList_37 = new ArrayList , nodeArrayList2_23 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_37 = castTo($previous(this$static.stack_0), 8).nodes , listNode3_6 = new TypedLinkedList , listNode1_0 = (checkCriticalElementIndex(0, nodeArrayList1_37.array.length) , castTo(nodeArrayList1_37.array[0], 12)) , taminoacidNode2_1 = (checkCriticalElementIndex(0, nodeArrayList2_23.array.length) , castTo(nodeArrayList2_23.array[0], 33)) , !!listNode1_0 && $addAll_2(listNode3_6, listNode1_0) , !!taminoacidNode2_1 && ($addLast_0(listNode3_6, listNode3_6.cast.cast_0(taminoacidNode2_1)) , true) , push_1(nodeList_37.array, listNode3_6) , nodeList_37);
              $push_0(this$static, $goTo(this$static, 17), list);
            }

            break;
          case 39:
            {
              list = (nodeList_38 = new ArrayList , nodeArrayList1_38 = castTo($previous(this$static.stack_0), 8).nodes , listNode2_1 = new TypedLinkedList , plistitemsNode1_0 = (checkCriticalElementIndex(0, nodeArrayList1_38.array.length) , castTo(nodeArrayList1_38.array[0], 72)) , !!plistitemsNode1_0 && ($addLast_0(listNode2_1, listNode2_1.cast.cast_0(plistitemsNode1_0)) , true) , push_1(nodeList_38.array, listNode2_1) , nodeList_38);
              $push_0(this$static, $goTo(this$static, 18), list);
            }

            break;
          case 40:
            {
              list = (nodeList_39 = new ArrayList , nodeArrayList2_24 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_39 = castTo($previous(this$static.stack_0), 8).nodes , listNode3_7 = new TypedLinkedList , listNode1_1 = (checkCriticalElementIndex(0, nodeArrayList1_39.array.length) , castTo(nodeArrayList1_39.array[0], 12)) , plistitemsNode2 = (checkCriticalElementIndex(0, nodeArrayList2_24.array.length) , castTo(nodeArrayList2_24.array[0], 72)) , !!listNode1_1 && $addAll_2(listNode3_7, listNode1_1) , !!plistitemsNode2 && ($addLast_0(listNode3_7, listNode3_7.cast.cast_0(plistitemsNode2)) , true) , push_1(nodeList_39.array, listNode3_7) , nodeList_39);
              $push_0(this$static, $goTo(this$static, 18), list);
            }

            break;
          case 41:
            {
              list = (nodeList_40 = new ArrayList , nodeArrayList1_40 = castTo($previous(this$static.stack_0), 8).nodes , listNode2_2 = new TypedLinkedList , pscoreitemsNode1_0 = (checkCriticalElementIndex(0, nodeArrayList1_40.array.length) , castTo(nodeArrayList1_40.array[0], 74)) , !!pscoreitemsNode1_0 && ($addLast_0(listNode2_2, listNode2_2.cast.cast_0(pscoreitemsNode1_0)) , true) , push_1(nodeList_40.array, listNode2_2) , nodeList_40);
              $push_0(this$static, $goTo(this$static, 19), list);
            }

            break;
          case 42:
            {
              list = (nodeList_41 = new ArrayList , nodeArrayList2_25 = castTo($previous(this$static.stack_0), 8).nodes , nodeArrayList1_41 = castTo($previous(this$static.stack_0), 8).nodes , listNode3_8 = new TypedLinkedList , listNode1_2 = (checkCriticalElementIndex(0, nodeArrayList1_41.array.length) , castTo(nodeArrayList1_41.array[0], 12)) , pscoreitemsNode2 = (checkCriticalElementIndex(0, nodeArrayList2_25.array.length) , castTo(nodeArrayList2_25.array[0], 74)) , !!listNode1_2 && $addAll_2(listNode3_8, listNode1_2) , !!pscoreitemsNode2 && ($addLast_0(listNode3_8, listNode3_8.cast.cast_0(pscoreitemsNode2)) , true) , push_1(nodeList_41.array, listNode3_8) , nodeList_41);
              $push_0(this$static, $goTo(this$static, 19), list);
            }

        }

        break;
      case 2:
        {
          node2 = castTo($next_4(this$static.lexer), 127);
          node1 = castTo($get_0(castTo($previous(this$static.stack_0), 8).nodes, 0), 107);
          node = new Start(node1, node2);
          return node;
        }

      case 3:
        throw toJs(new ParserException('[' + this$static.last_line + ',' + this$static.last_pos + '] ' + errorMessages[errors[this$static.action_0[1]]]));
    }
  }
}

function $push_0(this$static, numstate, listNode){
  var s;
  this$static.nodeList = listNode;
  if (!$hasNext_1(this$static.stack_0)) {
    $add_3(this$static.stack_0, new State(numstate, this$static.nodeList));
    return;
  }
  s = castTo($next_2(this$static.stack_0), 8);
  s.state = numstate;
  s.nodes = this$static.nodeList;
}

function $state(this$static){
  var s;
  s = castTo($previous(this$static.stack_0), 8);
  $next_2(this$static.stack_0);
  return s.state;
}

function Parser(lexer){
  $clinit_Parser();
  this.ignoredTokens = new AnalysisAdapter;
  this.stack_0 = $listIterator(new LinkedList, 0);
  this.converter = new TokenIndex;
  this.action_0 = initUnidimensionalArray(I_classLit, $intern_19, 5, 2, 15, 1);
  this.lexer = lexer;
}

defineClass(232, 1, {}, Parser);
_.last_line = 0;
_.last_pos = 0;
var actionTable, errorMessages, errors, gotoTable_1;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_parser_Parser_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.parser', 'Parser', 232);
function ParserException(message){
  Exception.call(this, message);
}

defineClass(235, 17, $intern_1, ParserException);
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_parser_ParserException_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.parser', 'ParserException', 235);
function State(state, nodes){
  this.state = state;
  this.nodes = nodes;
}

defineClass(8, 1, {8:1}, State);
_.state = 0;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_parser_State_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.parser', 'State', 8);
function TokenIndex(){
}

defineClass(240, 192, {}, TokenIndex);
_.caseEOF = function caseEOF_0(node){
  this.index_0 = 19;
}
;
_.caseTAminoAcid = function caseTAminoAcid_0(node){
  this.index_0 = 18;
}
;
_.caseTAnd = function caseTAnd_0(node){
  this.index_0 = 1;
}
;
_.caseTAtleast = function caseTAtleast_0(node){
  this.index_0 = 7;
}
;
_.caseTComma = function caseTComma_0(node){
  this.index_0 = 15;
}
;
_.caseTExactly = function caseTExactly_0(node){
  this.index_0 = 8;
}
;
_.caseTExclude = function caseTExclude_0(node){
  this.index_0 = 4;
}
;
_.caseTFloat = function caseTFloat_0(node){
  this.index_0 = 17;
}
;
_.caseTFrom = function caseTFrom_0(node){
  this.index_0 = 6;
}
;
_.caseTInteger = function caseTInteger_0(node){
  this.index_0 = 16;
}
;
_.caseTLPar = function caseTLPar_0(node){
  this.index_0 = 12;
}
;
_.caseTMapper = function caseTMapper_0(node){
  this.index_0 = 14;
}
;
_.caseTMax = function caseTMax_0(node){
  this.index_0 = 11;
}
;
_.caseTMin = function caseTMin_0(node){
  this.index_0 = 0;
}
;
_.caseTNot = function caseTNot_0(node){
  this.index_0 = 3;
}
;
_.caseTNotmorethan = function caseTNotmorethan_0(node){
  this.index_0 = 9;
}
;
_.caseTOr = function caseTOr_0(node){
  this.index_0 = 2;
}
;
_.caseTRPar = function caseTRPar_0(node){
  this.index_0 = 13;
}
;
_.caseTScore = function caseTScore_0(node){
  this.index_0 = 10;
}
;
_.caseTSelect = function caseTSelect_0(node){
  this.index_0 = 5;
}
;
_.index_0 = 0;
var Lorg_fstrf_stanfordAsiInterpreter_resistance_grammar_parser_TokenIndex_2_classLit = createForClass('org.fstrf.stanfordAsiInterpreter.resistance.grammar.parser', 'TokenIndex', 240);
function $clinit_BaseXmlAsiTransformer(){
  $clinit_BaseXmlAsiTransformer = emptyMethod;
  SCORE_RANGE_PATTERN = new Pattern('(-INF|\\d+(?:\\.\\d+)?)\\s*TO\\s*(INF|\\d+(?:\\.\\d+)?)\\s*=>\\s*(\\d+)');
  SINGLE_SCORE_PATTERN = new Pattern('(\\(|\\,\\s*\\d+(?:\\.\\d+)?)\\s*=>\\s*(\\d+)');
}

function $createCommentMap(root){
  var comment, comments, id_0, node, node$iterator, nodes, nodes0, nodes1, sort_0, text_0;
  comments = new HashMap;
  for (node$iterator = new ArrayList$1($queryNodes(root, '/ALGORITHM/DEFINITIONS/COMMENT_DEFINITIONS/COMMENT_STRING')); node$iterator.i < node$iterator.this$01.array.length;) {
    node = $next_1(node$iterator);
    id_0 = (nodes0 = $queryNodes(castToNative(node, $wnd.Node), '@id') , nodes0.array.length == 0?null:(checkCriticalElementIndex(0, nodes0.array.length) , castToNative(nodes0.array[0], $wnd.Node))).textContent;
    text_0 = $trim((nodes1 = $queryNodes(castToNative(node, $wnd.Node), 'TEXT') , nodes1.array.length == 0?null:(checkCriticalElementIndex(0, nodes1.array.length) , castToNative(nodes1.array[0], $wnd.Node))).textContent);
    sort_0 = (nodes = $queryNodes(castToNative(node, $wnd.Node), 'SORT_TAG') , nodes.array.length == 0?null:(checkCriticalElementIndex(0, nodes.array.length) , castToNative(nodes.array[0], $wnd.Node)));
    sort_0 == null?(comment = new CommentDefinition(id_0, text_0)):(comment = new CommentDefinition_0(id_0, text_0, valueOf_0(__parseAndValidateInt(sort_0.textContent))));
    id_0 == null?$put_0(comments.hashCodeMap, null, comment):$put_1(comments.stringMap, id_0, comment);
  }
  return comments;
}

function $createLevelMap(root){
  var level, levels, node, node$iterator, nodes, nodes0, nodes1, order;
  levels = new HashMap;
  for (node$iterator = new ArrayList$1($queryNodes(root, '/ALGORITHM/DEFINITIONS/LEVEL_DEFINITION')); node$iterator.i < node$iterator.this$01.array.length;) {
    node = $next_1(node$iterator);
    order = $trim((nodes0 = $queryNodes(castToNative(node, $wnd.Node), 'ORDER') , nodes0.array.length == 0?null:(checkCriticalElementIndex(0, nodes0.array.length) , castToNative(nodes0.array[0], $wnd.Node))).textContent);
    level = new LevelDefinition(valueOf_0(__parseAndValidateInt(order)), $trim((nodes1 = $queryNodes(castToNative(node, $wnd.Node), 'ORIGINAL') , nodes1.array.length == 0?null:(checkCriticalElementIndex(0, nodes1.array.length) , castToNative(nodes1.array[0], $wnd.Node))).textContent), $trim((nodes = $queryNodes(castToNative(node, $wnd.Node), 'SIR') , nodes.array.length == 0?null:(checkCriticalElementIndex(0, nodes.array.length) , castToNative(nodes.array[0], $wnd.Node))).textContent));
    order == null?$put_0(levels.hashCodeMap, null, level):$put_1(levels.stringMap, order, level);
  }
  return levels;
}

function $getRequiredDefinition(definitions, key){
  var obj;
  obj = castTo($getStringValue(definitions, $trim(key.textContent)), 88);
  if (!obj) {
    throw toJs(new ASIParsingException('required definition: ' + key.textContent + ' does not exist.'));
  }
  return obj;
}

function $getValidatedLevelFromString(levelString, levels){
  var level;
  try {
    level = valueOf_0(__parseAndValidateInt(levelString));
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 56)) {
      throw toJs(new ASIParsingException('specified level order "' + levelString + '" is not an integer'));
    }
     else 
      throw toJs($e0);
  }
  if (!(levelString == null?!!$getEntry(levels.hashCodeMap, null):$contains_1(levels.stringMap, levelString))) {
    throw toJs(new ASIParsingException(levelString + ' has not been defined as a level order'));
  }
  return level;
}

function $isUniqueDefinedDrug(drugName, drugClasses){
  var drug, drug$iterator, drugClass, drugClass$iterator, drugList, entry, entry0, outerIter, outerIter0;
  for (drugClass$iterator = (outerIter0 = (new AbstractMap$2(drugClasses)).this$01.entrySet().iterator_0() , new AbstractMap$2$1(outerIter0)); drugClass$iterator.val$outerIter2.hasNext_0();) {
    drugClass = (entry0 = castTo(drugClass$iterator.val$outerIter2.next_1(), 13) , castTo(entry0.getValue(), 81));
    drugList = drugClass.drugs;
    for (drug$iterator = (outerIter = (new AbstractMap$1(drugList.map_0)).this$01.entrySet().iterator_0() , new AbstractMap$1$1(outerIter)); drug$iterator.val$outerIter2.hasNext_0();) {
      drug = (entry = castTo(drug$iterator.val$outerIter2.next_1(), 13) , castTo(entry.getKey(), 83));
      if ($equals_1(drugName, drug.name_0)) {
        return false;
      }
    }
  }
  return true;
}

function $isUniqueDefinedDrug2(inDrugName, drugClasses){
  var className, className$iterator, drugList, entry, outerIter;
  for (className$iterator = (outerIter = (new AbstractMap$1(drugClasses)).this$01.entrySet().iterator_0() , new AbstractMap$1$1(outerIter)); className$iterator.val$outerIter2.hasNext_0();) {
    className = (entry = castTo(className$iterator.val$outerIter2.next_1(), 13) , castToString(entry.getKey()));
    drugList = castTo(className == null?getEntryValueOrNull($getEntry(drugClasses.hashCodeMap, null)):$get_1(drugClasses.stringMap, className), 37);
    if (drugList.contains(inDrugName))
      return false;
  }
  return true;
}

function $parseDrugClasses(root, drugs){
  var className, drug, drugClassNode, drugClassNode$iterator, drugClasses, drugList, drugListStr, drugName, drugName$array, drugName$index, drugName$max, drugNames, nodes, tagDefinedDrugNames;
  tagDefinedDrugNames = new HashSet;
  $addAll(tagDefinedDrugNames, new AbstractMap$1(drugs));
  drugClasses = new HashMap;
  nodes = $queryNodes(root, '/ALGORITHM/DEFINITIONS/DRUGCLASS');
  for (drugClassNode$iterator = new ArrayList$1(nodes); drugClassNode$iterator.i < drugClassNode$iterator.this$01.array.length;) {
    drugClassNode = $next_1(drugClassNode$iterator);
    className = $trim($queryUniqueSingleNode(castToNative(drugClassNode, $wnd.Node), 'NAME').textContent);
    drugListStr = $trim($queryUniqueSingleNode(castToNative(drugClassNode, $wnd.Node), 'DRUGLIST').textContent);
    drugNames = $split(drugListStr, ',', 0);
    drugList = new HashSet;
    for (drugName$array = drugNames , drugName$index = 0 , drugName$max = drugName$array.length; drugName$index < drugName$max; ++drugName$index) {
      drugName = drugName$array[drugName$index];
      drugName = $trim(drugName);
      drug = castTo(drugName == null?getEntryValueOrNull($getEntry(drugs.hashCodeMap, null)):$get_1(drugs.stringMap, drugName), 83);
      if (!drug) {
        throw toJs(new ASIParsingException(drugName + ' has not been defined as a drug.'));
      }
      if (!$isUniqueDefinedDrug(drug.name_0, drugClasses)) {
        throw toJs(new ASIParsingException('The drug: ' + drug.name_0 + '; has been defined for more than one drug class.'));
      }
      $remove_2(tagDefinedDrugNames, drug.name_0);
      $put(drugList.map_0, drug, drugList);
    }
    $putStringValue(drugClasses, className, new DrugClass(className, drugList));
  }
  if ($size_0(tagDefinedDrugNames.map_0) > 0) {
    throw toJs(new ASIParsingException('The following drugs have not been associated with a drug class: ' + $toString(tagDefinedDrugNames)));
  }
  return drugClasses;
}

function $parseDrugLevelCondition(levelConditionNode, levels, drugs){
  var EQNode, GTENode, GTNode, LTENode, LTNode, NEQNode, anyNodeSpecified, drugLevelCondition, drugName, level, levelString;
  drugName = $queryUniqueSingleNode(castToNative(levelConditionNode, $wnd.Node), 'DRUG_NAME').textContent;
  if (!(drugName == null?!!$getEntry(drugs.hashCodeMap, null):$contains_1(drugs.stringMap, drugName))) {
    throw toJs(new ASIParsingException(drugName + ' has result comment rules but is not defined as a drug'));
  }
  drugLevelCondition = new DrugLevelCondition(drugName);
  LTENode = $queryUniqueSingleNode(castToNative(levelConditionNode, $wnd.Node), 'LTE');
  GTENode = $queryUniqueSingleNode(castToNative(levelConditionNode, $wnd.Node), 'GTE');
  LTNode = $queryUniqueSingleNode(castToNative(levelConditionNode, $wnd.Node), 'LT');
  GTNode = $queryUniqueSingleNode(castToNative(levelConditionNode, $wnd.Node), 'GT');
  EQNode = $queryUniqueSingleNode(castToNative(levelConditionNode, $wnd.Node), 'EQ');
  NEQNode = $queryUniqueSingleNode(castToNative(levelConditionNode, $wnd.Node), 'NEQ');
  anyNodeSpecified = false;
  if (LTENode != null) {
    levelString = LTENode.textContent;
    level = $getValidatedLevelFromString(levelString, levels);
    $add_1(drugLevelCondition.comparisons, new LevelConditionComparison(level, 'LTE'));
    anyNodeSpecified = true;
  }
  if (GTENode != null) {
    levelString = GTENode.textContent;
    level = $getValidatedLevelFromString(levelString, levels);
    $add_1(drugLevelCondition.comparisons, new LevelConditionComparison(level, 'GTE'));
    anyNodeSpecified = true;
  }
  if (LTNode != null) {
    levelString = LTNode.textContent;
    level = $getValidatedLevelFromString(levelString, levels);
    $add_1(drugLevelCondition.comparisons, new LevelConditionComparison(level, 'LT'));
    anyNodeSpecified = true;
  }
  if (GTNode != null) {
    levelString = GTNode.textContent;
    level = $getValidatedLevelFromString(levelString, levels);
    $add_1(drugLevelCondition.comparisons, new LevelConditionComparison(level, 'GT'));
    anyNodeSpecified = true;
  }
  if (EQNode != null) {
    levelString = EQNode.textContent;
    level = $getValidatedLevelFromString(levelString, levels);
    $add_1(drugLevelCondition.comparisons, new LevelConditionComparison(level, 'EQ'));
    anyNodeSpecified = true;
  }
  if (NEQNode != null) {
    levelString = NEQNode.textContent;
    level = $getValidatedLevelFromString(levelString, levels);
    $add_1(drugLevelCondition.comparisons, new LevelConditionComparison(level, 'NEQ'));
    anyNodeSpecified = true;
  }
  if (!anyNodeSpecified) {
    throw toJs(new ASIParsingException('no level comparison specified in level condition'));
  }
  return drugLevelCondition;
}

function $parseDrugs(root, levels, comments, globalRange){
  var defaultLevel, defaultLevelNode, drug, drug$iterator, drugFullName, drugListStr, drugMutationTypes, drugName, drugNames, drugNodes, drugRules, drugs, fullNameNode, node, node$iterator, nodes, nodes0, nodes1, nodes2, nodes3, ruleNodes, typeName;
  drugs = new HashMap;
  drugNodes = $queryNodes(root, 'ALGORITHM/DRUG');
  for (drug$iterator = new ArrayList$1(drugNodes); drug$iterator.i < drug$iterator.this$01.array.length;) {
    drug = $next_1(drug$iterator);
    drugName = $trim((nodes0 = $queryNodes(castToNative(drug, $wnd.Node), 'NAME') , nodes0.array.length == 0?null:(checkCriticalElementIndex(0, nodes0.array.length) , castToNative(nodes0.array[0], $wnd.Node))).textContent);
    drugFullName = null;
    defaultLevel = 0;
    try {
      defaultLevelNode = (nodes1 = $queryNodes(castToNative(drug, $wnd.Node), 'ACTIONS/DEFAULT_LEVEL') , nodes1.array.length == 0?null:(checkCriticalElementIndex(0, nodes1.array.length) , castToNative(nodes1.array[0], $wnd.Node)));
      defaultLevelNode != null && (defaultLevel = __parseAndValidateInt(defaultLevelNode.textContent));
    }
     catch ($e0) {
      $e0 = toJava($e0);
      if (!instanceOf($e0, 60))
        throw toJs($e0);
    }
    fullNameNode = (nodes2 = $queryNodes(castToNative(drug, $wnd.Node), 'FULLNAME') , nodes2.array.length == 0?null:(checkCriticalElementIndex(0, nodes2.array.length) , castToNative(nodes2.array[0], $wnd.Node)));
    fullNameNode != null && (drugFullName = $trim(fullNameNode.textContent));
    drugMutationTypes = new ArrayList;
    nodes3 = $queryNodes(castToNative(drug, $wnd.Node), 'MUTATION_TYPE');
    for (node$iterator = new ArrayList$1(nodes3); node$iterator.i < node$iterator.this$01.array.length;) {
      node = $next_1(node$iterator);
      typeName = $trim((nodes1 = $queryNodes(castToNative(node, $wnd.Node), 'TYPE_NAME') , nodes1.array.length == 0?null:(checkCriticalElementIndex(0, nodes1.array.length) , castToNative(nodes1.array[0], $wnd.Node))).textContent);
      drugListStr = $trim((nodes = $queryNodes(castToNative(node, $wnd.Node), 'MUTATIONS') , nodes.array.length == 0?null:(checkCriticalElementIndex(0, nodes.array.length) , castToNative(nodes.array[0], $wnd.Node))).textContent);
      drugNames = $split(drugListStr, ',', 0);
      $add_1(drugMutationTypes, new MutationType(typeName, new Arrays$ArrayList(drugNames)));
    }
    ruleNodes = $queryNodes(castToNative(drug, $wnd.Node), 'RULE');
    drugRules = $parseRules(ruleNodes, levels, comments, globalRange);
    $putStringValue(drugs, drugName, new Drug(drugName, drugFullName, drugRules, drugMutationTypes, defaultLevel));
  }
  return drugs;
}

function $parseForDrugAndFullNames(root){
  var drug, drug$iterator, drugFullName, drugName, drugNodes, drugs, fullNameNode, nodes, nodes0;
  drugs = new HashMap;
  drugNodes = $queryNodes(root, 'ALGORITHM/DRUG');
  for (drug$iterator = new ArrayList$1(drugNodes); drug$iterator.i < drug$iterator.this$01.array.length;) {
    drug = $next_1(drug$iterator);
    drugName = $trim((nodes0 = $queryNodes(castToNative(drug, $wnd.Node), 'NAME') , nodes0.array.length == 0?null:(checkCriticalElementIndex(0, nodes0.array.length) , castToNative(nodes0.array[0], $wnd.Node))).textContent);
    drugFullName = null;
    fullNameNode = (nodes = $queryNodes(castToNative(drug, $wnd.Node), 'FULLNAME') , nodes.array.length == 0?null:(checkCriticalElementIndex(0, nodes.array.length) , castToNative(nodes.array[0], $wnd.Node)));
    fullNameNode != null && (drugFullName = $trim(fullNameNode.textContent));
    drugName == null?$put_0(drugs.hashCodeMap, null, drugFullName):$put_1(drugs.stringMap, drugName, drugFullName);
  }
  return drugs;
}

function $parseForDrugClassesAndDrugs(root, drugs){
  var className, drugClassNode, drugClassNode$iterator, drugClasses, drugList, drugListStr, drugName, drugName$array, drugName$index, drugName$max, drugNames, nodes, tagDefinedDrugNames;
  tagDefinedDrugNames = new HashSet;
  $addAll(tagDefinedDrugNames, new AbstractMap$1(drugs));
  drugClasses = new HashMap;
  nodes = $queryNodes(root, '/ALGORITHM/DEFINITIONS/DRUGCLASS');
  for (drugClassNode$iterator = new ArrayList$1(nodes); drugClassNode$iterator.i < drugClassNode$iterator.this$01.array.length;) {
    drugClassNode = $next_1(drugClassNode$iterator);
    className = $trim($queryUniqueSingleNode(castToNative(drugClassNode, $wnd.Node), 'NAME').textContent);
    drugListStr = $trim($queryUniqueSingleNode(castToNative(drugClassNode, $wnd.Node), 'DRUGLIST').textContent);
    drugNames = $split(drugListStr, ',', 0);
    drugList = new HashSet;
    for (drugName$array = drugNames , drugName$index = 0 , drugName$max = drugName$array.length; drugName$index < drugName$max; ++drugName$index) {
      drugName = drugName$array[drugName$index];
      drugName = $trim(drugName);
      if (!(drugName == null?!!$getEntry(drugs.hashCodeMap, null):$contains_1(drugs.stringMap, drugName))) {
        throw toJs(new ASIParsingException(drugName + ' has not been defined as a drug.'));
      }
      if (!$isUniqueDefinedDrug2(drugName, drugClasses)) {
        throw toJs(new ASIParsingException('The drug: ' + drugName + '; has been defined for more than one drug class.'));
      }
      $removeStringValue(tagDefinedDrugNames.map_0, drugName) != null;
      $putStringValue(drugList.map_0, drugName, drugList);
    }
    className == null?$put_0(drugClasses.hashCodeMap, null, drugList):$put_1(drugClasses.stringMap, className, drugList);
  }
  if ($size_0(tagDefinedDrugNames.map_0) > 0) {
    throw toJs(new ASIParsingException('The following drugs have not been associated with a drug class: ' + $toString(tagDefinedDrugNames)));
  }
  return drugClasses;
}

function $parseForGeneAndDrugClasses(root, drugClasses){
  var drugClassListNodes, drugClassListStr, drugClassName, drugClassName$array, drugClassName$index, drugClassName$max, drugClassNames, drugClassSet, geneName, genes, node, node$iterator, nodes, nodes0;
  nodes0 = $queryNodes(root, '/ALGORITHM/DEFINITIONS/GENE_DEFINITION');
  if (nodes0.array.length == 0) {
    throw toJs(new ASIParsingException('no gene specified'));
  }
  genes = new HashMap;
  for (node$iterator = new ArrayList$1(nodes0); node$iterator.i < node$iterator.this$01.array.length;) {
    node = $next_1(node$iterator);
    geneName = $trim((nodes = $queryNodes(castToNative(node, $wnd.Node), 'NAME') , nodes.array.length == 0?null:(checkCriticalElementIndex(0, nodes.array.length) , castToNative(nodes.array[0], $wnd.Node))).textContent);
    drugClassListNodes = $queryNodes(castToNative(node, $wnd.Node), 'DRUGCLASSLIST');
    if (drugClassListNodes.array.length > 1) {
      throw toJs(new ASIParsingException('duplicate node DRUGCLASSLIST'));
    }
    drugClassSet = new HashSet;
    if (drugClassListNodes.array.length == 1) {
      drugClassListStr = $trim((checkCriticalElementIndex(0, drugClassListNodes.array.length) , castToNative(drugClassListNodes.array[0], $wnd.Node)).textContent);
      if ($equals_1($trim(drugClassListStr), '')) {
        throw toJs(new ASIParsingException('drug class list missing for gene ' + geneName));
      }
      drugClassNames = $split(drugClassListStr, ',', 0);
      for (drugClassName$array = drugClassNames , drugClassName$index = 0 , drugClassName$max = drugClassName$array.length; drugClassName$index < drugClassName$max; ++drugClassName$index) {
        drugClassName = drugClassName$array[drugClassName$index];
        drugClassName = $trim(drugClassName);
        if (drugClassName == null?!!$getEntry(drugClasses.hashCodeMap, null):$contains_1(drugClasses.stringMap, drugClassName))
          $putStringValue(drugClassSet.map_0, drugClassName, drugClassSet);
        else 
          throw toJs(new ASIParsingException(drugClassName + ' has not been defined as a drugClass.'));
      }
    }
    geneName == null?$put_0(genes.hashCodeMap, null, drugClassSet):$put_1(genes.stringMap, geneName, drugClassSet);
  }
  return genes;
}

function $parseGeneMutationComments(root, levels, comments, globalRange){
  var geneName, geneNameNode, geneNode, geneNode$iterator, geneRuleNodes, geneRules, genes, nodes;
  nodes = $queryNodes(root, '/ALGORITHM/MUTATION_COMMENTS/GENE');
  genes = new HashMap;
  for (geneNode$iterator = new ArrayList$1(nodes); geneNode$iterator.i < geneNode$iterator.this$01.array.length;) {
    geneNode = $next_1(geneNode$iterator);
    geneNameNode = $queryUniqueSingleNode(castToNative(geneNode, $wnd.Node), 'NAME');
    if (geneNameNode == null) {
      throw toJs(new ASIParsingException('no gene name'));
    }
    geneRuleNodes = $queryNodes(castToNative(geneNode, $wnd.Node), 'RULE');
    if (geneRuleNodes.array.length == 0) {
      throw toJs(new ASIParsingException('no rule for gene ' + geneNameNode.textContent));
    }
    geneName = $trim(geneNameNode.textContent);
    geneRules = $parseRules(geneRuleNodes, levels, comments, globalRange);
    $putStringValue(genes, geneName, new Gene(geneName, geneRules));
  }
  return genes;
}

function $parseGenes(root, drugClasses){
  var drugClassListNodes, drugClassListStr, drugClassName, drugClassName$array, drugClassName$index, drugClassName$max, drugClassNames, drugClassSet, geneName, genes, indelInputs, indelOutput, indelRange, indelRangeNode, inputListStr, node, node$iterator, nodes, nodes0, nodes1;
  nodes0 = $queryNodes(root, '/ALGORITHM/DEFINITIONS/GENE_DEFINITION');
  if (nodes0.array.length == 0) {
    throw toJs(new ASIParsingException('no gene specified'));
  }
  genes = new HashMap;
  for (node$iterator = new ArrayList$1(nodes0); node$iterator.i < node$iterator.this$01.array.length;) {
    node = $next_1(node$iterator);
    geneName = $trim((nodes1 = $queryNodes(castToNative(node, $wnd.Node), 'NAME') , nodes1.array.length == 0?null:(checkCriticalElementIndex(0, nodes1.array.length) , castToNative(nodes1.array[0], $wnd.Node))).textContent);
    drugClassListNodes = $queryNodes(castToNative(node, $wnd.Node), 'DRUGCLASSLIST');
    if (drugClassListNodes.array.length > 1) {
      throw toJs(new ASIParsingException('duplicate node DRUGCLASSLIST'));
    }
    indelRange = null;
    indelRangeNode = (nodes = $queryNodes(castToNative(node, $wnd.Node), 'INDEL_RANGE_DEFINITION') , nodes.array.length == 0?null:(checkCriticalElementIndex(0, nodes.array.length) , castToNative(nodes.array[0], $wnd.Node)));
    if (indelRangeNode != null) {
      inputListStr = $trim($queryUniqueSingleNode(indelRangeNode, 'INPUT').textContent);
      indelInputs = $split(inputListStr, ' ', 0);
      indelOutput = $trim($queryUniqueSingleNode(indelRangeNode, 'OUTPUT').textContent);
      indelRange = new IndelRangeDefinition(new Arrays$ArrayList(indelInputs), indelOutput);
    }
    drugClassSet = new HashSet;
    if (drugClassListNodes.array.length == 1) {
      drugClassListStr = $trim((checkCriticalElementIndex(0, drugClassListNodes.array.length) , castToNative(drugClassListNodes.array[0], $wnd.Node)).textContent);
      if ($equals_1($trim(drugClassListStr), '')) {
        throw toJs(new ASIParsingException('drug class list missing for gene ' + geneName));
      }
      drugClassNames = $split(drugClassListStr, ',', 0);
      for (drugClassName$array = drugClassNames , drugClassName$index = 0 , drugClassName$max = drugClassName$array.length; drugClassName$index < drugClassName$max; ++drugClassName$index) {
        drugClassName = drugClassName$array[drugClassName$index];
        $add_2(drugClassSet, castTo($getStringValue(drugClasses, $trim(drugClassName)), 81));
      }
    }
    $putStringValue(genes, geneName, new Gene_4(geneName, drugClassSet, indelRange));
  }
  return genes;
}

function $parseLevelActions(levelActionNode, comments){
  var actions, commentNode, definition;
  actions = new ArrayList;
  commentNode = $queryUniqueSingleNode(levelActionNode, 'COMMENT/@ref');
  if (commentNode == null) {
    throw toJs(new ASIParsingException('no comment specified for level action'));
  }
  definition = castTo($getRequiredDefinition(comments, commentNode), 40);
  $add_1(actions, new CommentAction(definition));
  return actions;
}

function $parseResultCommentRules(root, levels, comments, definedDrugs){
  var drugLevelConditionNode, drugLevelConditionNode$iterator, drugLevelConditionNodes, drugLevelConditions, levelActionNode, levelActions, levelConditionNode, nodes, resultCommentRules, ruleNode, ruleNode$iterator;
  nodes = $queryNodes(root, '/ALGORITHM/RESULT_COMMENTS/RESULT_COMMENT_RULE');
  resultCommentRules = new ArrayList;
  for (ruleNode$iterator = new ArrayList$1(nodes); ruleNode$iterator.i < ruleNode$iterator.this$01.array.length;) {
    ruleNode = $next_1(ruleNode$iterator);
    levelConditionNode = $queryUniqueSingleNode(castToNative(ruleNode, $wnd.Node), 'DRUG_LEVEL_CONDITIONS');
    drugLevelConditionNodes = $queryNodes(levelConditionNode, 'DRUG_LEVEL_CONDITION');
    if (drugLevelConditionNodes.array.length == 0) {
      throw toJs(new ASIParsingException('no drug level conditions specified in result comment rule'));
    }
    drugLevelConditions = new ArrayList;
    for (drugLevelConditionNode$iterator = new ArrayList$1(drugLevelConditionNodes); drugLevelConditionNode$iterator.i < drugLevelConditionNode$iterator.this$01.array.length;) {
      drugLevelConditionNode = $next_1(drugLevelConditionNode$iterator);
      $add_1(drugLevelConditions, $parseDrugLevelCondition(drugLevelConditionNode, levels, definedDrugs));
    }
    levelActionNode = $queryUniqueSingleNode(castToNative(ruleNode, $wnd.Node), 'LEVEL_ACTION');
    if (levelActionNode == null) {
      throw toJs(new ASIParsingException('no level action specified for result comment'));
    }
    levelActions = $parseLevelActions(levelActionNode, comments);
    $add_1(resultCommentRules, new ResultCommentRule(drugLevelConditions, levelActions));
  }
  return resultCommentRules;
}

function $parseRules(ruleNodes, levels, comments, globalRange){
  var commentNode, condition, definition, drugRules, levelNode, nodes, rule, rule$iterator, ruleActions, scoreRange, scoreRangeNode;
  drugRules = new ArrayList;
  for (rule$iterator = new ArrayList$1(ruleNodes); rule$iterator.i < rule$iterator.this$01.array.length;) {
    rule = $next_1(rule$iterator);
    condition = new RuleCondition($trim((nodes = $queryNodes(castToNative(rule, $wnd.Node), 'CONDITION') , nodes.array.length == 0?null:(checkCriticalElementIndex(0, nodes.array.length) , castToNative(nodes.array[0], $wnd.Node))).textContent));
    ruleActions = new ArrayList;
    commentNode = $queryUniqueSingleNode(castToNative(rule, $wnd.Node), 'ACTIONS/COMMENT/@ref');
    levelNode = $queryUniqueSingleNode(castToNative(rule, $wnd.Node), 'ACTIONS/LEVEL');
    scoreRangeNode = $queryUniqueSingleNode(castToNative(rule, $wnd.Node), 'ACTIONS/SCORERANGE');
    if (commentNode != null) {
      definition = castTo($getRequiredDefinition(comments, commentNode), 40);
      $add_1(ruleActions, new CommentAction(definition));
    }
    if (levelNode != null) {
      definition = castTo($getRequiredDefinition(levels, levelNode), 23);
      $add_1(ruleActions, new LevelAction(definition));
    }
    if (scoreRangeNode != null) {
      if ($queryNodes(scoreRangeNode, 'USE_GLOBALRANGE').array.length == 1) {
        if (globalRange.array.length == 0) {
          throw toJs(new ASIParsingException('required global range does not exist: ' + scoreRangeNode.textContent));
        }
        scoreRange = globalRange;
      }
       else {
        scoreRange = $parseScoreRange($trim(scoreRangeNode.textContent), levels);
      }
      $add_1(ruleActions, new ScoreRangeAction(scoreRange));
    }
    if (commentNode == null && levelNode == null && scoreRangeNode == null) {
      throw toJs(new ASIParsingException('no action exists for rule: ' + castToNative(rule, $wnd.Node).textContent + '/ \n' + condition.statement));
    }
    $add_1(drugRules, new Rule(condition, ruleActions));
  }
  return drugRules;
}

function $parseScoreRange(scoreRange, levels){
  var level, matcher, max_0, min_0, rangeValue, rangeValues, val;
  rangeValues = new ArrayList;
  matcher = $matcher(SCORE_RANGE_PATTERN, scoreRange);
  while (matcher.result = $exec(matcher.pattern, matcher.input_0) , !!matcher.result) {
    min_0 = $equals_1($trim(matcher.result[1]), '-INF')?$intern_16:__parseAndValidateDouble($trim(matcher.result[1]));
    max_0 = $equals_1($trim(matcher.result[2]), 'INF')?Infinity:__parseAndValidateDouble($trim(matcher.result[2]));
    level = $trim(matcher.result[3]);
    if ((level == null?getEntryValueOrNull($getEntry(levels.hashCodeMap, null)):$get_1(levels.stringMap, level)) == null) {
      throw toJs(new ASIParsingException('undefined level: ' + level));
    }
    rangeValue = new RangeValue(min_0, max_0, castTo(level == null?getEntryValueOrNull($getEntry(levels.hashCodeMap, null)):$get_1(levels.stringMap, level), 23));
    push_1(rangeValues.array, rangeValue);
  }
  matcher = $matcher(SINGLE_SCORE_PATTERN, scoreRange);
  while (matcher.result = $exec(matcher.pattern, matcher.input_0) , !!matcher.result) {
    val = __parseAndValidateDouble($trim($substring(matcher.result[1])));
    level = $trim(matcher.result[2]);
    if ((level == null?getEntryValueOrNull($getEntry(levels.hashCodeMap, null)):$get_1(levels.stringMap, level)) == null) {
      throw toJs(new ASIParsingException('undefined level: ' + level));
    }
    rangeValue = new RangeValue(val, val, castTo(level == null?getEntryValueOrNull($getEntry(levels.hashCodeMap, null)):$get_1(levels.stringMap, level), 23));
    push_1(rangeValues.array, rangeValue);
  }
  return rangeValues;
}

function $transform(messageXml){
  var comments, doc, drugClasses, drugs, entry, geneDrugClass, geneEvaluatedDrugs, geneEvaluatedMutationComments, geneMutationComments, geneName, geneName$iterator, geneNames, geneNamesComments, geneNamesDrugs, genes, globalNode, globalRange, intersection, levels, outerIter, resultCommentRules;
  doc = $parseXml(messageXml);
  levels = $createLevelMap(doc);
  comments = $createCommentMap(doc);
  globalNode = $queryUniqueSingleNode(doc, '/ALGORITHM/DEFINITIONS/GLOBALRANGE');
  globalRange = globalNode != null?$parseScoreRange($queryUniqueSingleNode(doc, '/ALGORITHM/DEFINITIONS/GLOBALRANGE').textContent, levels):new ArrayList;
  drugs = $parseDrugs(doc, levels, comments, globalRange);
  drugClasses = $parseDrugClasses(doc, drugs);
  geneEvaluatedDrugs = $parseGenes(doc, drugClasses);
  geneNamesDrugs = new AbstractMap$1(geneEvaluatedDrugs);
  geneEvaluatedMutationComments = $parseGeneMutationComments(doc, levels, comments, globalRange);
  geneNamesComments = new AbstractMap$1(geneEvaluatedMutationComments);
  resultCommentRules = $parseResultCommentRules(doc, levels, comments, drugs);
  intersection = intersection_0(geneNamesDrugs, geneNamesComments);
  if ($size(intersection) < geneNamesComments.this$01.size()) {
    throw toJs(new ASIParsingException('Some genes defined in MUTATION_COMMENTS, have no corresponding GENE_DEFINITION.'));
  }
  geneNames = new HashSet;
  $addAll(geneNames, geneNamesDrugs);
  $addAll(geneNames, geneNamesComments);
  genes = new HashMap;
  for (geneName$iterator = (outerIter = (new AbstractMap$1(geneNames.map_0)).this$01.entrySet().iterator_0() , new AbstractMap$1$1(outerIter)); geneName$iterator.val$outerIter2.hasNext_0();) {
    geneName = (entry = castTo(geneName$iterator.val$outerIter2.next_1(), 13) , castToString(entry.getKey()));
    geneDrugClass = castTo(geneName == null?getEntryValueOrNull($getEntry(geneEvaluatedDrugs.hashCodeMap, null)):$get_1(geneEvaluatedDrugs.stringMap, geneName), 35);
    geneMutationComments = castTo(geneName == null?getEntryValueOrNull($getEntry(geneEvaluatedMutationComments.hashCodeMap, null)):$get_1(geneEvaluatedMutationComments.stringMap, geneName), 35);
    !geneMutationComments?$putStringValue(genes, geneName, new Gene_3(geneName, geneDrugClass.drugClasses, new ArrayList, resultCommentRules, geneDrugClass.indelRange, geneDrugClass.defaultLevel)):$putStringValue(genes, geneName, new Gene_3(geneName, geneDrugClass.drugClasses, geneMutationComments.geneRules, resultCommentRules, geneDrugClass.indelRange, geneDrugClass.defaultLevel));
  }
  return genes;
}

var SCORE_RANGE_PATTERN, SINGLE_SCORE_PATTERN;
function $clinit_JsXmlAsiTransformer(){
  $clinit_JsXmlAsiTransformer = emptyMethod;
  $clinit_BaseXmlAsiTransformer();
  XPATH_EVALUATOR = new $wnd.XPathEvaluator;
}

function $parseXml(messageXml){
  var doc, errorNode;
  doc = (new $wnd.DOMParser).parseFromString(messageXml, 'application/xml');
  errorNode = doc.querySelector('parsererror');
  if (errorNode != null) {
    throw toJs(new ASIParsingException(errorNode.textContent));
  }
  doc.normalize();
  return doc;
}

function $queryNodes(parent_0, xpath){
  var child, nodes, result;
  result = XPATH_EVALUATOR.evaluate(xpath, parent_0);
  nodes = new ArrayList;
  do {
    child = result.iterateNext();
    if (child == null) {
      break;
    }
    push_1(nodes.array, child);
  }
   while (true);
  return nodes;
}

function $queryUniqueSingleNode(parent_0, xpath){
  var nodes;
  nodes = $queryNodes(parent_0, xpath);
  if (nodes.array.length > 1) {
    throw toJs(new ASIParsingException('multiple nodes ' + xpath + ' exist within parent: ' + parent_0.textContent));
  }
  return nodes.array.length == 0?null:(checkCriticalElementIndex(0, nodes.array.length) , castToNative(nodes.array[0], $wnd.Node));
}

var XPATH_EVALUATOR;
var C_classLit = createForPrimitive('char', 'C');
var I_classLit = createForPrimitive('int', 'I');
_ = provide('com.google.common.base.Platform');
_.emptyToNull = emptyToNull;
_.nullToEmpty = nullToEmpty;
_.stringIsNullOrEmpty = stringIsNullOrEmpty;
_ = provide('default', ASIJs);
_ = provide('java.io.Serializable');
_.$isInstance = $isInstance;
$clinit_Boolean();
_ = provide('java.lang.Boolean');
_.$isInstance = $isInstance_0;
_ = provide('java.lang.CharSequence');
_.$isInstance = $isInstance_1;
_ = provide('java.lang.Cloneable');
_.$isInstance = $isInstance_2;
_ = provide('java.lang.Comparable');
_.$isInstance = $isInstance_3;
_ = provide('java.lang.Double');
_.$isInstance = $isInstance_5;
_ = provide('java.lang.Number');
_.$isInstance = $isInstance_4;
_ = provide('java.lang.String');
_.$isInstance = $isInstance_6;
_ = provide('java.lang.Throwable');
_.of = of;
_ = provide('javaemul.internal.HashCodes', HashCodes);
_.getIdentityHashCode = getIdentityHashCode;
_.getNextHash = getNextHash;
_.getObjectIdentityHashCode = getObjectIdentityHashCode;
_ = provide('javaemul.internal.JsUtils');
_.toDoubleFromUnsignedInt = toDoubleFromUnsignedInt;
var $entry = ($clinit_Impl() , entry_0);
var gwtOnLoad = gwtOnLoad = gwtOnLoad_0;
addInitFunctions(init);
setGwtProperty('permProps', [[['locale', 'default'], ['user.agent', 'gecko1_8']], [['locale', 'default'], ['user.agent', 'safari']]]);
if (asijs) asijs.onScriptLoad(gwtOnLoad);})();// export default defaultExport;
