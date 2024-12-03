var zp=e=>{throw TypeError(e)};var Fl=(e,t,n)=>t.has(e)||zp("Cannot "+n);var D=(e,t,n)=>(Fl(e,t,"read from private field"),n?n.call(e):t.get(e)),ge=(e,t,n)=>t.has(e)?zp("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),re=(e,t,n,r)=>(Fl(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),nt=(e,t,n)=>(Fl(e,t,"access private method"),n);var Ls=(e,t,n,r)=>({set _(i){re(e,t,i,n)},get _(){return D(e,t,r)}});function Im(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in e)){const o=Object.getOwnPropertyDescriptor(r,i);o&&Object.defineProperty(e,i,o.get?o:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function Lm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Rm={exports:{}},sl={},Tm={exports:{}},oe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var us=Symbol.for("react.element"),U1=Symbol.for("react.portal"),W1=Symbol.for("react.fragment"),Q1=Symbol.for("react.strict_mode"),H1=Symbol.for("react.profiler"),V1=Symbol.for("react.provider"),q1=Symbol.for("react.context"),G1=Symbol.for("react.forward_ref"),K1=Symbol.for("react.suspense"),J1=Symbol.for("react.memo"),X1=Symbol.for("react.lazy"),_p=Symbol.iterator;function Y1(e){return e===null||typeof e!="object"?null:(e=_p&&e[_p]||e["@@iterator"],typeof e=="function"?e:null)}var Dm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Nm=Object.assign,Om={};function Ji(e,t,n){this.props=e,this.context=t,this.refs=Om,this.updater=n||Dm}Ji.prototype.isReactComponent={};Ji.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ji.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function zm(){}zm.prototype=Ji.prototype;function id(e,t,n){this.props=e,this.context=t,this.refs=Om,this.updater=n||Dm}var od=id.prototype=new zm;od.constructor=id;Nm(od,Ji.prototype);od.isPureReactComponent=!0;var Mp=Array.isArray,_m=Object.prototype.hasOwnProperty,sd={current:null},Mm={key:!0,ref:!0,__self:!0,__source:!0};function $m(e,t,n){var r,i={},o=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)_m.call(t,r)&&!Mm.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];i.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:us,type:e,key:o,ref:s,props:i,_owner:sd.current}}function Z1(e,t){return{$$typeof:us,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ad(e){return typeof e=="object"&&e!==null&&e.$$typeof===us}function ey(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var $p=/\/+/g;function Bl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ey(""+e.key):t.toString(36)}function ra(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case us:case U1:s=!0}}if(s)return s=e,i=i(s),e=r===""?"."+Bl(s,0):r,Mp(i)?(n="",e!=null&&(n=e.replace($p,"$&/")+"/"),ra(i,t,n,"",function(d){return d})):i!=null&&(ad(i)&&(i=Z1(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace($p,"$&/")+"/")+e)),t.push(i)),1;if(s=0,r=r===""?".":r+":",Mp(e))for(var l=0;l<e.length;l++){o=e[l];var c=r+Bl(o,l);s+=ra(o,t,n,c,i)}else if(c=Y1(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=r+Bl(o,l++),s+=ra(o,t,n,c,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Rs(e,t,n){if(e==null)return e;var r=[],i=0;return ra(e,r,"","",function(o){return t.call(n,o,i++)}),r}function ty(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ht={current:null},ia={transition:null},ny={ReactCurrentDispatcher:ht,ReactCurrentBatchConfig:ia,ReactCurrentOwner:sd};function Fm(){throw Error("act(...) is not supported in production builds of React.")}oe.Children={map:Rs,forEach:function(e,t,n){Rs(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Rs(e,function(){t++}),t},toArray:function(e){return Rs(e,function(t){return t})||[]},only:function(e){if(!ad(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};oe.Component=Ji;oe.Fragment=W1;oe.Profiler=H1;oe.PureComponent=id;oe.StrictMode=Q1;oe.Suspense=K1;oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ny;oe.act=Fm;oe.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Nm({},e.props),i=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=sd.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)_m.call(t,c)&&!Mm.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];r.children=l}return{$$typeof:us,type:e.type,key:i,ref:o,props:r,_owner:s}};oe.createContext=function(e){return e={$$typeof:q1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:V1,_context:e},e.Consumer=e};oe.createElement=$m;oe.createFactory=function(e){var t=$m.bind(null,e);return t.type=e,t};oe.createRef=function(){return{current:null}};oe.forwardRef=function(e){return{$$typeof:G1,render:e}};oe.isValidElement=ad;oe.lazy=function(e){return{$$typeof:X1,_payload:{_status:-1,_result:e},_init:ty}};oe.memo=function(e,t){return{$$typeof:J1,type:e,compare:t===void 0?null:t}};oe.startTransition=function(e){var t=ia.transition;ia.transition={};try{e()}finally{ia.transition=t}};oe.unstable_act=Fm;oe.useCallback=function(e,t){return ht.current.useCallback(e,t)};oe.useContext=function(e){return ht.current.useContext(e)};oe.useDebugValue=function(){};oe.useDeferredValue=function(e){return ht.current.useDeferredValue(e)};oe.useEffect=function(e,t){return ht.current.useEffect(e,t)};oe.useId=function(){return ht.current.useId()};oe.useImperativeHandle=function(e,t,n){return ht.current.useImperativeHandle(e,t,n)};oe.useInsertionEffect=function(e,t){return ht.current.useInsertionEffect(e,t)};oe.useLayoutEffect=function(e,t){return ht.current.useLayoutEffect(e,t)};oe.useMemo=function(e,t){return ht.current.useMemo(e,t)};oe.useReducer=function(e,t,n){return ht.current.useReducer(e,t,n)};oe.useRef=function(e){return ht.current.useRef(e)};oe.useState=function(e){return ht.current.useState(e)};oe.useSyncExternalStore=function(e,t,n){return ht.current.useSyncExternalStore(e,t,n)};oe.useTransition=function(){return ht.current.useTransition()};oe.version="18.3.1";Tm.exports=oe;var k=Tm.exports;const Lt=Lm(k),ry=Im({__proto__:null,default:Lt},[k]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iy=k,oy=Symbol.for("react.element"),sy=Symbol.for("react.fragment"),ay=Object.prototype.hasOwnProperty,ly=iy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,cy={key:!0,ref:!0,__self:!0,__source:!0};function Bm(e,t,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)ay.call(t,r)&&!cy.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:oy,type:e,key:o,ref:s,props:i,_owner:ly.current}}sl.Fragment=sy;sl.jsx=Bm;sl.jsxs=Bm;Rm.exports=sl;var a=Rm.exports,Um={exports:{}},Nt={},Wm={exports:{}},Qm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(T,$){var H=T.length;T.push($);e:for(;0<H;){var Z=H-1>>>1,ne=T[Z];if(0<i(ne,$))T[Z]=$,T[H]=ne,H=Z;else break e}}function n(T){return T.length===0?null:T[0]}function r(T){if(T.length===0)return null;var $=T[0],H=T.pop();if(H!==$){T[0]=H;e:for(var Z=0,ne=T.length,Ue=ne>>>1;Z<Ue;){var ye=2*(Z+1)-1,J=T[ye],X=ye+1,F=T[X];if(0>i(J,H))X<ne&&0>i(F,J)?(T[Z]=F,T[X]=H,Z=X):(T[Z]=J,T[ye]=H,Z=ye);else if(X<ne&&0>i(F,H))T[Z]=F,T[X]=H,Z=X;else break e}}return $}function i(T,$){var H=T.sortIndex-$.sortIndex;return H!==0?H:T.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var c=[],d=[],f=1,p=null,g=3,w=!1,v=!1,y=!1,C=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(T){for(var $=n(d);$!==null;){if($.callback===null)r(d);else if($.startTime<=T)r(d),$.sortIndex=$.expirationTime,t(c,$);else break;$=n(d)}}function b(T){if(y=!1,x(T),!v)if(n(c)!==null)v=!0,Ke(E);else{var $=n(d);$!==null&&_(b,$.startTime-T)}}function E(T,$){v=!1,y&&(y=!1,m(R),R=-1),w=!0;var H=g;try{for(x($),p=n(c);p!==null&&(!(p.expirationTime>$)||T&&!ee());){var Z=p.callback;if(typeof Z=="function"){p.callback=null,g=p.priorityLevel;var ne=Z(p.expirationTime<=$);$=e.unstable_now(),typeof ne=="function"?p.callback=ne:p===n(c)&&r(c),x($)}else r(c);p=n(c)}if(p!==null)var Ue=!0;else{var ye=n(d);ye!==null&&_(b,ye.startTime-$),Ue=!1}return Ue}finally{p=null,g=H,w=!1}}var j=!1,I=null,R=-1,N=5,M=-1;function ee(){return!(e.unstable_now()-M<N)}function le(){if(I!==null){var T=e.unstable_now();M=T;var $=!0;try{$=I(!0,T)}finally{$?he():(j=!1,I=null)}}else j=!1}var he;if(typeof h=="function")he=function(){h(le)};else if(typeof MessageChannel<"u"){var me=new MessageChannel,Ge=me.port2;me.port1.onmessage=le,he=function(){Ge.postMessage(null)}}else he=function(){C(le,0)};function Ke(T){I=T,j||(j=!0,he())}function _(T,$){R=C(function(){T(e.unstable_now())},$)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_continueExecution=function(){v||w||(v=!0,Ke(E))},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):N=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(T){switch(g){case 1:case 2:case 3:var $=3;break;default:$=g}var H=g;g=$;try{return T()}finally{g=H}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(T,$){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var H=g;g=T;try{return $()}finally{g=H}},e.unstable_scheduleCallback=function(T,$,H){var Z=e.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?Z+H:Z):H=Z,T){case 1:var ne=-1;break;case 2:ne=250;break;case 5:ne=1073741823;break;case 4:ne=1e4;break;default:ne=5e3}return ne=H+ne,T={id:f++,callback:$,priorityLevel:T,startTime:H,expirationTime:ne,sortIndex:-1},H>Z?(T.sortIndex=H,t(d,T),n(c)===null&&T===n(d)&&(y?(m(R),R=-1):y=!0,_(b,H-Z))):(T.sortIndex=ne,t(c,T),v||w||(v=!0,Ke(E))),T},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(T){var $=g;return function(){var H=g;g=$;try{return T.apply(this,arguments)}finally{g=H}}}})(Qm);Wm.exports=Qm;var uy=Wm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dy=k,Dt=uy;function z(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Hm=new Set,$o={};function Jr(e,t){_i(e,t),_i(e+"Capture",t)}function _i(e,t){for($o[e]=t,e=0;e<t.length;e++)Hm.add(t[e])}var Pn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qc=Object.prototype.hasOwnProperty,py=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Fp={},Bp={};function fy(e){return qc.call(Bp,e)?!0:qc.call(Fp,e)?!1:py.test(e)?Bp[e]=!0:(Fp[e]=!0,!1)}function hy(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function my(e,t,n,r){if(t===null||typeof t>"u"||hy(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function mt(e,t,n,r,i,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var et={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){et[e]=new mt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];et[t]=new mt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){et[e]=new mt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){et[e]=new mt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){et[e]=new mt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){et[e]=new mt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){et[e]=new mt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){et[e]=new mt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){et[e]=new mt(e,5,!1,e.toLowerCase(),null,!1,!1)});var ld=/[\-:]([a-z])/g;function cd(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ld,cd);et[t]=new mt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ld,cd);et[t]=new mt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ld,cd);et[t]=new mt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){et[e]=new mt(e,1,!1,e.toLowerCase(),null,!1,!1)});et.xlinkHref=new mt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){et[e]=new mt(e,1,!1,e.toLowerCase(),null,!0,!0)});function ud(e,t,n,r){var i=et.hasOwnProperty(t)?et[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(my(t,n,i,r)&&(n=null),r||i===null?fy(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ln=dy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ts=Symbol.for("react.element"),ci=Symbol.for("react.portal"),ui=Symbol.for("react.fragment"),dd=Symbol.for("react.strict_mode"),Gc=Symbol.for("react.profiler"),Vm=Symbol.for("react.provider"),qm=Symbol.for("react.context"),pd=Symbol.for("react.forward_ref"),Kc=Symbol.for("react.suspense"),Jc=Symbol.for("react.suspense_list"),fd=Symbol.for("react.memo"),Bn=Symbol.for("react.lazy"),Gm=Symbol.for("react.offscreen"),Up=Symbol.iterator;function ao(e){return e===null||typeof e!="object"?null:(e=Up&&e[Up]||e["@@iterator"],typeof e=="function"?e:null)}var Re=Object.assign,Ul;function So(e){if(Ul===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ul=t&&t[1]||""}return`
`+Ul+e}var Wl=!1;function Ql(e,t){if(!e||Wl)return"";Wl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),o=r.stack.split(`
`),s=i.length-1,l=o.length-1;1<=s&&0<=l&&i[s]!==o[l];)l--;for(;1<=s&&0<=l;s--,l--)if(i[s]!==o[l]){if(s!==1||l!==1)do if(s--,l--,0>l||i[s]!==o[l]){var c=`
`+i[s].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=s&&0<=l);break}}}finally{Wl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?So(e):""}function gy(e){switch(e.tag){case 5:return So(e.type);case 16:return So("Lazy");case 13:return So("Suspense");case 19:return So("SuspenseList");case 0:case 2:case 15:return e=Ql(e.type,!1),e;case 11:return e=Ql(e.type.render,!1),e;case 1:return e=Ql(e.type,!0),e;default:return""}}function Xc(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ui:return"Fragment";case ci:return"Portal";case Gc:return"Profiler";case dd:return"StrictMode";case Kc:return"Suspense";case Jc:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case qm:return(e.displayName||"Context")+".Consumer";case Vm:return(e._context.displayName||"Context")+".Provider";case pd:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case fd:return t=e.displayName||null,t!==null?t:Xc(e.type)||"Memo";case Bn:t=e._payload,e=e._init;try{return Xc(e(t))}catch{}}return null}function xy(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Xc(t);case 8:return t===dd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ar(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Km(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function yy(e){var t=Km(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ds(e){e._valueTracker||(e._valueTracker=yy(e))}function Jm(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Km(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Sa(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Yc(e,t){var n=t.checked;return Re({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Wp(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=ar(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Xm(e,t){t=t.checked,t!=null&&ud(e,"checked",t,!1)}function Zc(e,t){Xm(e,t);var n=ar(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?eu(e,t.type,n):t.hasOwnProperty("defaultValue")&&eu(e,t.type,ar(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Qp(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function eu(e,t,n){(t!=="number"||Sa(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var bo=Array.isArray;function Ci(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+ar(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function tu(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(z(91));return Re({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Hp(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(z(92));if(bo(n)){if(1<n.length)throw Error(z(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:ar(n)}}function Ym(e,t){var n=ar(t.value),r=ar(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Vp(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Zm(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function nu(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Zm(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ns,e0=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ns=Ns||document.createElement("div"),Ns.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ns.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Fo(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Io={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},vy=["Webkit","ms","Moz","O"];Object.keys(Io).forEach(function(e){vy.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Io[t]=Io[e]})});function t0(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Io.hasOwnProperty(e)&&Io[e]?(""+t).trim():t+"px"}function n0(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=t0(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var wy=Re({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ru(e,t){if(t){if(wy[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(z(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(z(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(z(61))}if(t.style!=null&&typeof t.style!="object")throw Error(z(62))}}function iu(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ou=null;function hd(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var su=null,Si=null,bi=null;function qp(e){if(e=fs(e)){if(typeof su!="function")throw Error(z(280));var t=e.stateNode;t&&(t=dl(t),su(e.stateNode,e.type,t))}}function r0(e){Si?bi?bi.push(e):bi=[e]:Si=e}function i0(){if(Si){var e=Si,t=bi;if(bi=Si=null,qp(e),t)for(e=0;e<t.length;e++)qp(t[e])}}function o0(e,t){return e(t)}function s0(){}var Hl=!1;function a0(e,t,n){if(Hl)return e(t,n);Hl=!0;try{return o0(e,t,n)}finally{Hl=!1,(Si!==null||bi!==null)&&(s0(),i0())}}function Bo(e,t){var n=e.stateNode;if(n===null)return null;var r=dl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(z(231,t,typeof n));return n}var au=!1;if(Pn)try{var lo={};Object.defineProperty(lo,"passive",{get:function(){au=!0}}),window.addEventListener("test",lo,lo),window.removeEventListener("test",lo,lo)}catch{au=!1}function jy(e,t,n,r,i,o,s,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(f){this.onError(f)}}var Lo=!1,ba=null,ka=!1,lu=null,Cy={onError:function(e){Lo=!0,ba=e}};function Sy(e,t,n,r,i,o,s,l,c){Lo=!1,ba=null,jy.apply(Cy,arguments)}function by(e,t,n,r,i,o,s,l,c){if(Sy.apply(this,arguments),Lo){if(Lo){var d=ba;Lo=!1,ba=null}else throw Error(z(198));ka||(ka=!0,lu=d)}}function Xr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function l0(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Gp(e){if(Xr(e)!==e)throw Error(z(188))}function ky(e){var t=e.alternate;if(!t){if(t=Xr(e),t===null)throw Error(z(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Gp(i),e;if(o===r)return Gp(i),t;o=o.sibling}throw Error(z(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,r=o;break}if(l===r){s=!0,r=i,n=o;break}l=l.sibling}if(!s){for(l=o.child;l;){if(l===n){s=!0,n=o,r=i;break}if(l===r){s=!0,r=o,n=i;break}l=l.sibling}if(!s)throw Error(z(189))}}if(n.alternate!==r)throw Error(z(190))}if(n.tag!==3)throw Error(z(188));return n.stateNode.current===n?e:t}function c0(e){return e=ky(e),e!==null?u0(e):null}function u0(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=u0(e);if(t!==null)return t;e=e.sibling}return null}var d0=Dt.unstable_scheduleCallback,Kp=Dt.unstable_cancelCallback,Py=Dt.unstable_shouldYield,Ey=Dt.unstable_requestPaint,ze=Dt.unstable_now,Ay=Dt.unstable_getCurrentPriorityLevel,md=Dt.unstable_ImmediatePriority,p0=Dt.unstable_UserBlockingPriority,Pa=Dt.unstable_NormalPriority,Iy=Dt.unstable_LowPriority,f0=Dt.unstable_IdlePriority,al=null,pn=null;function Ly(e){if(pn&&typeof pn.onCommitFiberRoot=="function")try{pn.onCommitFiberRoot(al,e,void 0,(e.current.flags&128)===128)}catch{}}var Xt=Math.clz32?Math.clz32:Dy,Ry=Math.log,Ty=Math.LN2;function Dy(e){return e>>>=0,e===0?32:31-(Ry(e)/Ty|0)|0}var Os=64,zs=4194304;function ko(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ea(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var l=s&~i;l!==0?r=ko(l):(o&=s,o!==0&&(r=ko(o)))}else s=n&~i,s!==0?r=ko(s):o!==0&&(r=ko(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Xt(t),i=1<<n,r|=e[n],t&=~i;return r}function Ny(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Oy(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-Xt(o),l=1<<s,c=i[s];c===-1?(!(l&n)||l&r)&&(i[s]=Ny(l,t)):c<=t&&(e.expiredLanes|=l),o&=~l}}function cu(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function h0(){var e=Os;return Os<<=1,!(Os&4194240)&&(Os=64),e}function Vl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ds(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Xt(t),e[t]=n}function zy(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Xt(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function gd(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Xt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var ve=0;function m0(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var g0,xd,x0,y0,v0,uu=!1,_s=[],Zn=null,er=null,tr=null,Uo=new Map,Wo=new Map,Wn=[],_y="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Jp(e,t){switch(e){case"focusin":case"focusout":Zn=null;break;case"dragenter":case"dragleave":er=null;break;case"mouseover":case"mouseout":tr=null;break;case"pointerover":case"pointerout":Uo.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wo.delete(t.pointerId)}}function co(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=fs(t),t!==null&&xd(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function My(e,t,n,r,i){switch(t){case"focusin":return Zn=co(Zn,e,t,n,r,i),!0;case"dragenter":return er=co(er,e,t,n,r,i),!0;case"mouseover":return tr=co(tr,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return Uo.set(o,co(Uo.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,Wo.set(o,co(Wo.get(o)||null,e,t,n,r,i)),!0}return!1}function w0(e){var t=Er(e.target);if(t!==null){var n=Xr(t);if(n!==null){if(t=n.tag,t===13){if(t=l0(n),t!==null){e.blockedOn=t,v0(e.priority,function(){x0(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function oa(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=du(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ou=r,n.target.dispatchEvent(r),ou=null}else return t=fs(n),t!==null&&xd(t),e.blockedOn=n,!1;t.shift()}return!0}function Xp(e,t,n){oa(e)&&n.delete(t)}function $y(){uu=!1,Zn!==null&&oa(Zn)&&(Zn=null),er!==null&&oa(er)&&(er=null),tr!==null&&oa(tr)&&(tr=null),Uo.forEach(Xp),Wo.forEach(Xp)}function uo(e,t){e.blockedOn===t&&(e.blockedOn=null,uu||(uu=!0,Dt.unstable_scheduleCallback(Dt.unstable_NormalPriority,$y)))}function Qo(e){function t(i){return uo(i,e)}if(0<_s.length){uo(_s[0],e);for(var n=1;n<_s.length;n++){var r=_s[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Zn!==null&&uo(Zn,e),er!==null&&uo(er,e),tr!==null&&uo(tr,e),Uo.forEach(t),Wo.forEach(t),n=0;n<Wn.length;n++)r=Wn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Wn.length&&(n=Wn[0],n.blockedOn===null);)w0(n),n.blockedOn===null&&Wn.shift()}var ki=Ln.ReactCurrentBatchConfig,Aa=!0;function Fy(e,t,n,r){var i=ve,o=ki.transition;ki.transition=null;try{ve=1,yd(e,t,n,r)}finally{ve=i,ki.transition=o}}function By(e,t,n,r){var i=ve,o=ki.transition;ki.transition=null;try{ve=4,yd(e,t,n,r)}finally{ve=i,ki.transition=o}}function yd(e,t,n,r){if(Aa){var i=du(e,t,n,r);if(i===null)nc(e,t,r,Ia,n),Jp(e,r);else if(My(i,e,t,n,r))r.stopPropagation();else if(Jp(e,r),t&4&&-1<_y.indexOf(e)){for(;i!==null;){var o=fs(i);if(o!==null&&g0(o),o=du(e,t,n,r),o===null&&nc(e,t,r,Ia,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else nc(e,t,r,null,n)}}var Ia=null;function du(e,t,n,r){if(Ia=null,e=hd(r),e=Er(e),e!==null)if(t=Xr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=l0(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ia=e,null}function j0(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ay()){case md:return 1;case p0:return 4;case Pa:case Iy:return 16;case f0:return 536870912;default:return 16}default:return 16}}var Jn=null,vd=null,sa=null;function C0(){if(sa)return sa;var e,t=vd,n=t.length,r,i="value"in Jn?Jn.value:Jn.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===i[o-r];r++);return sa=i.slice(e,1<r?1-r:void 0)}function aa(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ms(){return!0}function Yp(){return!1}function Ot(e){function t(n,r,i,o,s){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Ms:Yp,this.isPropagationStopped=Yp,this}return Re(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ms)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ms)},persist:function(){},isPersistent:Ms}),t}var Xi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},wd=Ot(Xi),ps=Re({},Xi,{view:0,detail:0}),Uy=Ot(ps),ql,Gl,po,ll=Re({},ps,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:jd,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==po&&(po&&e.type==="mousemove"?(ql=e.screenX-po.screenX,Gl=e.screenY-po.screenY):Gl=ql=0,po=e),ql)},movementY:function(e){return"movementY"in e?e.movementY:Gl}}),Zp=Ot(ll),Wy=Re({},ll,{dataTransfer:0}),Qy=Ot(Wy),Hy=Re({},ps,{relatedTarget:0}),Kl=Ot(Hy),Vy=Re({},Xi,{animationName:0,elapsedTime:0,pseudoElement:0}),qy=Ot(Vy),Gy=Re({},Xi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ky=Ot(Gy),Jy=Re({},Xi,{data:0}),ef=Ot(Jy),Xy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Yy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ev(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Zy[e])?!!t[e]:!1}function jd(){return ev}var tv=Re({},ps,{key:function(e){if(e.key){var t=Xy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=aa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Yy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:jd,charCode:function(e){return e.type==="keypress"?aa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?aa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),nv=Ot(tv),rv=Re({},ll,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tf=Ot(rv),iv=Re({},ps,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:jd}),ov=Ot(iv),sv=Re({},Xi,{propertyName:0,elapsedTime:0,pseudoElement:0}),av=Ot(sv),lv=Re({},ll,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),cv=Ot(lv),uv=[9,13,27,32],Cd=Pn&&"CompositionEvent"in window,Ro=null;Pn&&"documentMode"in document&&(Ro=document.documentMode);var dv=Pn&&"TextEvent"in window&&!Ro,S0=Pn&&(!Cd||Ro&&8<Ro&&11>=Ro),nf=" ",rf=!1;function b0(e,t){switch(e){case"keyup":return uv.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function k0(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var di=!1;function pv(e,t){switch(e){case"compositionend":return k0(t);case"keypress":return t.which!==32?null:(rf=!0,nf);case"textInput":return e=t.data,e===nf&&rf?null:e;default:return null}}function fv(e,t){if(di)return e==="compositionend"||!Cd&&b0(e,t)?(e=C0(),sa=vd=Jn=null,di=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return S0&&t.locale!=="ko"?null:t.data;default:return null}}var hv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function of(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!hv[e.type]:t==="textarea"}function P0(e,t,n,r){r0(r),t=La(t,"onChange"),0<t.length&&(n=new wd("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var To=null,Ho=null;function mv(e){_0(e,0)}function cl(e){var t=hi(e);if(Jm(t))return e}function gv(e,t){if(e==="change")return t}var E0=!1;if(Pn){var Jl;if(Pn){var Xl="oninput"in document;if(!Xl){var sf=document.createElement("div");sf.setAttribute("oninput","return;"),Xl=typeof sf.oninput=="function"}Jl=Xl}else Jl=!1;E0=Jl&&(!document.documentMode||9<document.documentMode)}function af(){To&&(To.detachEvent("onpropertychange",A0),Ho=To=null)}function A0(e){if(e.propertyName==="value"&&cl(Ho)){var t=[];P0(t,Ho,e,hd(e)),a0(mv,t)}}function xv(e,t,n){e==="focusin"?(af(),To=t,Ho=n,To.attachEvent("onpropertychange",A0)):e==="focusout"&&af()}function yv(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return cl(Ho)}function vv(e,t){if(e==="click")return cl(t)}function wv(e,t){if(e==="input"||e==="change")return cl(t)}function jv(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var en=typeof Object.is=="function"?Object.is:jv;function Vo(e,t){if(en(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!qc.call(t,i)||!en(e[i],t[i]))return!1}return!0}function lf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function cf(e,t){var n=lf(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=lf(n)}}function I0(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?I0(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function L0(){for(var e=window,t=Sa();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Sa(e.document)}return t}function Sd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Cv(e){var t=L0(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&I0(n.ownerDocument.documentElement,n)){if(r!==null&&Sd(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=cf(n,o);var s=cf(n,r);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Sv=Pn&&"documentMode"in document&&11>=document.documentMode,pi=null,pu=null,Do=null,fu=!1;function uf(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;fu||pi==null||pi!==Sa(r)||(r=pi,"selectionStart"in r&&Sd(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Do&&Vo(Do,r)||(Do=r,r=La(pu,"onSelect"),0<r.length&&(t=new wd("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=pi)))}function $s(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var fi={animationend:$s("Animation","AnimationEnd"),animationiteration:$s("Animation","AnimationIteration"),animationstart:$s("Animation","AnimationStart"),transitionend:$s("Transition","TransitionEnd")},Yl={},R0={};Pn&&(R0=document.createElement("div").style,"AnimationEvent"in window||(delete fi.animationend.animation,delete fi.animationiteration.animation,delete fi.animationstart.animation),"TransitionEvent"in window||delete fi.transitionend.transition);function ul(e){if(Yl[e])return Yl[e];if(!fi[e])return e;var t=fi[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in R0)return Yl[e]=t[n];return e}var T0=ul("animationend"),D0=ul("animationiteration"),N0=ul("animationstart"),O0=ul("transitionend"),z0=new Map,df="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function cr(e,t){z0.set(e,t),Jr(t,[e])}for(var Zl=0;Zl<df.length;Zl++){var ec=df[Zl],bv=ec.toLowerCase(),kv=ec[0].toUpperCase()+ec.slice(1);cr(bv,"on"+kv)}cr(T0,"onAnimationEnd");cr(D0,"onAnimationIteration");cr(N0,"onAnimationStart");cr("dblclick","onDoubleClick");cr("focusin","onFocus");cr("focusout","onBlur");cr(O0,"onTransitionEnd");_i("onMouseEnter",["mouseout","mouseover"]);_i("onMouseLeave",["mouseout","mouseover"]);_i("onPointerEnter",["pointerout","pointerover"]);_i("onPointerLeave",["pointerout","pointerover"]);Jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Jr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Pv=new Set("cancel close invalid load scroll toggle".split(" ").concat(Po));function pf(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,by(r,t,void 0,e),e.currentTarget=null}function _0(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var l=r[s],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==o&&i.isPropagationStopped())break e;pf(i,l,d),o=c}else for(s=0;s<r.length;s++){if(l=r[s],c=l.instance,d=l.currentTarget,l=l.listener,c!==o&&i.isPropagationStopped())break e;pf(i,l,d),o=c}}}if(ka)throw e=lu,ka=!1,lu=null,e}function be(e,t){var n=t[yu];n===void 0&&(n=t[yu]=new Set);var r=e+"__bubble";n.has(r)||(M0(t,e,2,!1),n.add(r))}function tc(e,t,n){var r=0;t&&(r|=4),M0(n,e,r,t)}var Fs="_reactListening"+Math.random().toString(36).slice(2);function qo(e){if(!e[Fs]){e[Fs]=!0,Hm.forEach(function(n){n!=="selectionchange"&&(Pv.has(n)||tc(n,!1,e),tc(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Fs]||(t[Fs]=!0,tc("selectionchange",!1,t))}}function M0(e,t,n,r){switch(j0(t)){case 1:var i=Fy;break;case 4:i=By;break;default:i=yd}n=i.bind(null,t,n,e),i=void 0,!au||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function nc(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var c=s.tag;if((c===3||c===4)&&(c=s.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;s=s.return}for(;l!==null;){if(s=Er(l),s===null)return;if(c=s.tag,c===5||c===6){r=o=s;continue e}l=l.parentNode}}r=r.return}a0(function(){var d=o,f=hd(n),p=[];e:{var g=z0.get(e);if(g!==void 0){var w=wd,v=e;switch(e){case"keypress":if(aa(n)===0)break e;case"keydown":case"keyup":w=nv;break;case"focusin":v="focus",w=Kl;break;case"focusout":v="blur",w=Kl;break;case"beforeblur":case"afterblur":w=Kl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=Zp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=Qy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=ov;break;case T0:case D0:case N0:w=qy;break;case O0:w=av;break;case"scroll":w=Uy;break;case"wheel":w=cv;break;case"copy":case"cut":case"paste":w=Ky;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=tf}var y=(t&4)!==0,C=!y&&e==="scroll",m=y?g!==null?g+"Capture":null:g;y=[];for(var h=d,x;h!==null;){x=h;var b=x.stateNode;if(x.tag===5&&b!==null&&(x=b,m!==null&&(b=Bo(h,m),b!=null&&y.push(Go(h,b,x)))),C)break;h=h.return}0<y.length&&(g=new w(g,v,null,n,f),p.push({event:g,listeners:y}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",g&&n!==ou&&(v=n.relatedTarget||n.fromElement)&&(Er(v)||v[En]))break e;if((w||g)&&(g=f.window===f?f:(g=f.ownerDocument)?g.defaultView||g.parentWindow:window,w?(v=n.relatedTarget||n.toElement,w=d,v=v?Er(v):null,v!==null&&(C=Xr(v),v!==C||v.tag!==5&&v.tag!==6)&&(v=null)):(w=null,v=d),w!==v)){if(y=Zp,b="onMouseLeave",m="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(y=tf,b="onPointerLeave",m="onPointerEnter",h="pointer"),C=w==null?g:hi(w),x=v==null?g:hi(v),g=new y(b,h+"leave",w,n,f),g.target=C,g.relatedTarget=x,b=null,Er(f)===d&&(y=new y(m,h+"enter",v,n,f),y.target=x,y.relatedTarget=C,b=y),C=b,w&&v)t:{for(y=w,m=v,h=0,x=y;x;x=ni(x))h++;for(x=0,b=m;b;b=ni(b))x++;for(;0<h-x;)y=ni(y),h--;for(;0<x-h;)m=ni(m),x--;for(;h--;){if(y===m||m!==null&&y===m.alternate)break t;y=ni(y),m=ni(m)}y=null}else y=null;w!==null&&ff(p,g,w,y,!1),v!==null&&C!==null&&ff(p,C,v,y,!0)}}e:{if(g=d?hi(d):window,w=g.nodeName&&g.nodeName.toLowerCase(),w==="select"||w==="input"&&g.type==="file")var E=gv;else if(of(g))if(E0)E=wv;else{E=yv;var j=xv}else(w=g.nodeName)&&w.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(E=vv);if(E&&(E=E(e,d))){P0(p,E,n,f);break e}j&&j(e,g,d),e==="focusout"&&(j=g._wrapperState)&&j.controlled&&g.type==="number"&&eu(g,"number",g.value)}switch(j=d?hi(d):window,e){case"focusin":(of(j)||j.contentEditable==="true")&&(pi=j,pu=d,Do=null);break;case"focusout":Do=pu=pi=null;break;case"mousedown":fu=!0;break;case"contextmenu":case"mouseup":case"dragend":fu=!1,uf(p,n,f);break;case"selectionchange":if(Sv)break;case"keydown":case"keyup":uf(p,n,f)}var I;if(Cd)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else di?b0(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(S0&&n.locale!=="ko"&&(di||R!=="onCompositionStart"?R==="onCompositionEnd"&&di&&(I=C0()):(Jn=f,vd="value"in Jn?Jn.value:Jn.textContent,di=!0)),j=La(d,R),0<j.length&&(R=new ef(R,e,null,n,f),p.push({event:R,listeners:j}),I?R.data=I:(I=k0(n),I!==null&&(R.data=I)))),(I=dv?pv(e,n):fv(e,n))&&(d=La(d,"onBeforeInput"),0<d.length&&(f=new ef("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:d}),f.data=I))}_0(p,t)})}function Go(e,t,n){return{instance:e,listener:t,currentTarget:n}}function La(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=Bo(e,n),o!=null&&r.unshift(Go(e,o,i)),o=Bo(e,t),o!=null&&r.push(Go(e,o,i))),e=e.return}return r}function ni(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ff(e,t,n,r,i){for(var o=t._reactName,s=[];n!==null&&n!==r;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&d!==null&&(l=d,i?(c=Bo(n,o),c!=null&&s.unshift(Go(n,c,l))):i||(c=Bo(n,o),c!=null&&s.push(Go(n,c,l)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var Ev=/\r\n?/g,Av=/\u0000|\uFFFD/g;function hf(e){return(typeof e=="string"?e:""+e).replace(Ev,`
`).replace(Av,"")}function Bs(e,t,n){if(t=hf(t),hf(e)!==t&&n)throw Error(z(425))}function Ra(){}var hu=null,mu=null;function gu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var xu=typeof setTimeout=="function"?setTimeout:void 0,Iv=typeof clearTimeout=="function"?clearTimeout:void 0,mf=typeof Promise=="function"?Promise:void 0,Lv=typeof queueMicrotask=="function"?queueMicrotask:typeof mf<"u"?function(e){return mf.resolve(null).then(e).catch(Rv)}:xu;function Rv(e){setTimeout(function(){throw e})}function rc(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Qo(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Qo(t)}function nr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function gf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Yi=Math.random().toString(36).slice(2),dn="__reactFiber$"+Yi,Ko="__reactProps$"+Yi,En="__reactContainer$"+Yi,yu="__reactEvents$"+Yi,Tv="__reactListeners$"+Yi,Dv="__reactHandles$"+Yi;function Er(e){var t=e[dn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[En]||n[dn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gf(e);e!==null;){if(n=e[dn])return n;e=gf(e)}return t}e=n,n=e.parentNode}return null}function fs(e){return e=e[dn]||e[En],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function hi(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(z(33))}function dl(e){return e[Ko]||null}var vu=[],mi=-1;function ur(e){return{current:e}}function Pe(e){0>mi||(e.current=vu[mi],vu[mi]=null,mi--)}function Se(e,t){mi++,vu[mi]=e.current,e.current=t}var lr={},at=ur(lr),wt=ur(!1),Ur=lr;function Mi(e,t){var n=e.type.contextTypes;if(!n)return lr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function jt(e){return e=e.childContextTypes,e!=null}function Ta(){Pe(wt),Pe(at)}function xf(e,t,n){if(at.current!==lr)throw Error(z(168));Se(at,t),Se(wt,n)}function $0(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(z(108,xy(e)||"Unknown",i));return Re({},n,r)}function Da(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||lr,Ur=at.current,Se(at,e),Se(wt,wt.current),!0}function yf(e,t,n){var r=e.stateNode;if(!r)throw Error(z(169));n?(e=$0(e,t,Ur),r.__reactInternalMemoizedMergedChildContext=e,Pe(wt),Pe(at),Se(at,e)):Pe(wt),Se(wt,n)}var jn=null,pl=!1,ic=!1;function F0(e){jn===null?jn=[e]:jn.push(e)}function Nv(e){pl=!0,F0(e)}function dr(){if(!ic&&jn!==null){ic=!0;var e=0,t=ve;try{var n=jn;for(ve=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}jn=null,pl=!1}catch(i){throw jn!==null&&(jn=jn.slice(e+1)),d0(md,dr),i}finally{ve=t,ic=!1}}return null}var gi=[],xi=0,Na=null,Oa=0,_t=[],Mt=0,Wr=null,Cn=1,Sn="";function Sr(e,t){gi[xi++]=Oa,gi[xi++]=Na,Na=e,Oa=t}function B0(e,t,n){_t[Mt++]=Cn,_t[Mt++]=Sn,_t[Mt++]=Wr,Wr=e;var r=Cn;e=Sn;var i=32-Xt(r)-1;r&=~(1<<i),n+=1;var o=32-Xt(t)+i;if(30<o){var s=i-i%5;o=(r&(1<<s)-1).toString(32),r>>=s,i-=s,Cn=1<<32-Xt(t)+i|n<<i|r,Sn=o+e}else Cn=1<<o|n<<i|r,Sn=e}function bd(e){e.return!==null&&(Sr(e,1),B0(e,1,0))}function kd(e){for(;e===Na;)Na=gi[--xi],gi[xi]=null,Oa=gi[--xi],gi[xi]=null;for(;e===Wr;)Wr=_t[--Mt],_t[Mt]=null,Sn=_t[--Mt],_t[Mt]=null,Cn=_t[--Mt],_t[Mt]=null}var Rt=null,It=null,Ae=!1,Jt=null;function U0(e,t){var n=$t(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function vf(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Rt=e,It=nr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Rt=e,It=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Wr!==null?{id:Cn,overflow:Sn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=$t(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Rt=e,It=null,!0):!1;default:return!1}}function wu(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ju(e){if(Ae){var t=It;if(t){var n=t;if(!vf(e,t)){if(wu(e))throw Error(z(418));t=nr(n.nextSibling);var r=Rt;t&&vf(e,t)?U0(r,n):(e.flags=e.flags&-4097|2,Ae=!1,Rt=e)}}else{if(wu(e))throw Error(z(418));e.flags=e.flags&-4097|2,Ae=!1,Rt=e}}}function wf(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Rt=e}function Us(e){if(e!==Rt)return!1;if(!Ae)return wf(e),Ae=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!gu(e.type,e.memoizedProps)),t&&(t=It)){if(wu(e))throw W0(),Error(z(418));for(;t;)U0(e,t),t=nr(t.nextSibling)}if(wf(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(z(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){It=nr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}It=null}}else It=Rt?nr(e.stateNode.nextSibling):null;return!0}function W0(){for(var e=It;e;)e=nr(e.nextSibling)}function $i(){It=Rt=null,Ae=!1}function Pd(e){Jt===null?Jt=[e]:Jt.push(e)}var Ov=Ln.ReactCurrentBatchConfig;function fo(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(z(309));var r=n.stateNode}if(!r)throw Error(z(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var l=i.refs;s===null?delete l[o]:l[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(z(284));if(!n._owner)throw Error(z(290,e))}return e}function Ws(e,t){throw e=Object.prototype.toString.call(t),Error(z(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function jf(e){var t=e._init;return t(e._payload)}function Q0(e){function t(m,h){if(e){var x=m.deletions;x===null?(m.deletions=[h],m.flags|=16):x.push(h)}}function n(m,h){if(!e)return null;for(;h!==null;)t(m,h),h=h.sibling;return null}function r(m,h){for(m=new Map;h!==null;)h.key!==null?m.set(h.key,h):m.set(h.index,h),h=h.sibling;return m}function i(m,h){return m=sr(m,h),m.index=0,m.sibling=null,m}function o(m,h,x){return m.index=x,e?(x=m.alternate,x!==null?(x=x.index,x<h?(m.flags|=2,h):x):(m.flags|=2,h)):(m.flags|=1048576,h)}function s(m){return e&&m.alternate===null&&(m.flags|=2),m}function l(m,h,x,b){return h===null||h.tag!==6?(h=dc(x,m.mode,b),h.return=m,h):(h=i(h,x),h.return=m,h)}function c(m,h,x,b){var E=x.type;return E===ui?f(m,h,x.props.children,b,x.key):h!==null&&(h.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Bn&&jf(E)===h.type)?(b=i(h,x.props),b.ref=fo(m,h,x),b.return=m,b):(b=ha(x.type,x.key,x.props,null,m.mode,b),b.ref=fo(m,h,x),b.return=m,b)}function d(m,h,x,b){return h===null||h.tag!==4||h.stateNode.containerInfo!==x.containerInfo||h.stateNode.implementation!==x.implementation?(h=pc(x,m.mode,b),h.return=m,h):(h=i(h,x.children||[]),h.return=m,h)}function f(m,h,x,b,E){return h===null||h.tag!==7?(h=Mr(x,m.mode,b,E),h.return=m,h):(h=i(h,x),h.return=m,h)}function p(m,h,x){if(typeof h=="string"&&h!==""||typeof h=="number")return h=dc(""+h,m.mode,x),h.return=m,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Ts:return x=ha(h.type,h.key,h.props,null,m.mode,x),x.ref=fo(m,null,h),x.return=m,x;case ci:return h=pc(h,m.mode,x),h.return=m,h;case Bn:var b=h._init;return p(m,b(h._payload),x)}if(bo(h)||ao(h))return h=Mr(h,m.mode,x,null),h.return=m,h;Ws(m,h)}return null}function g(m,h,x,b){var E=h!==null?h.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return E!==null?null:l(m,h,""+x,b);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ts:return x.key===E?c(m,h,x,b):null;case ci:return x.key===E?d(m,h,x,b):null;case Bn:return E=x._init,g(m,h,E(x._payload),b)}if(bo(x)||ao(x))return E!==null?null:f(m,h,x,b,null);Ws(m,x)}return null}function w(m,h,x,b,E){if(typeof b=="string"&&b!==""||typeof b=="number")return m=m.get(x)||null,l(h,m,""+b,E);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Ts:return m=m.get(b.key===null?x:b.key)||null,c(h,m,b,E);case ci:return m=m.get(b.key===null?x:b.key)||null,d(h,m,b,E);case Bn:var j=b._init;return w(m,h,x,j(b._payload),E)}if(bo(b)||ao(b))return m=m.get(x)||null,f(h,m,b,E,null);Ws(h,b)}return null}function v(m,h,x,b){for(var E=null,j=null,I=h,R=h=0,N=null;I!==null&&R<x.length;R++){I.index>R?(N=I,I=null):N=I.sibling;var M=g(m,I,x[R],b);if(M===null){I===null&&(I=N);break}e&&I&&M.alternate===null&&t(m,I),h=o(M,h,R),j===null?E=M:j.sibling=M,j=M,I=N}if(R===x.length)return n(m,I),Ae&&Sr(m,R),E;if(I===null){for(;R<x.length;R++)I=p(m,x[R],b),I!==null&&(h=o(I,h,R),j===null?E=I:j.sibling=I,j=I);return Ae&&Sr(m,R),E}for(I=r(m,I);R<x.length;R++)N=w(I,m,R,x[R],b),N!==null&&(e&&N.alternate!==null&&I.delete(N.key===null?R:N.key),h=o(N,h,R),j===null?E=N:j.sibling=N,j=N);return e&&I.forEach(function(ee){return t(m,ee)}),Ae&&Sr(m,R),E}function y(m,h,x,b){var E=ao(x);if(typeof E!="function")throw Error(z(150));if(x=E.call(x),x==null)throw Error(z(151));for(var j=E=null,I=h,R=h=0,N=null,M=x.next();I!==null&&!M.done;R++,M=x.next()){I.index>R?(N=I,I=null):N=I.sibling;var ee=g(m,I,M.value,b);if(ee===null){I===null&&(I=N);break}e&&I&&ee.alternate===null&&t(m,I),h=o(ee,h,R),j===null?E=ee:j.sibling=ee,j=ee,I=N}if(M.done)return n(m,I),Ae&&Sr(m,R),E;if(I===null){for(;!M.done;R++,M=x.next())M=p(m,M.value,b),M!==null&&(h=o(M,h,R),j===null?E=M:j.sibling=M,j=M);return Ae&&Sr(m,R),E}for(I=r(m,I);!M.done;R++,M=x.next())M=w(I,m,R,M.value,b),M!==null&&(e&&M.alternate!==null&&I.delete(M.key===null?R:M.key),h=o(M,h,R),j===null?E=M:j.sibling=M,j=M);return e&&I.forEach(function(le){return t(m,le)}),Ae&&Sr(m,R),E}function C(m,h,x,b){if(typeof x=="object"&&x!==null&&x.type===ui&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Ts:e:{for(var E=x.key,j=h;j!==null;){if(j.key===E){if(E=x.type,E===ui){if(j.tag===7){n(m,j.sibling),h=i(j,x.props.children),h.return=m,m=h;break e}}else if(j.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Bn&&jf(E)===j.type){n(m,j.sibling),h=i(j,x.props),h.ref=fo(m,j,x),h.return=m,m=h;break e}n(m,j);break}else t(m,j);j=j.sibling}x.type===ui?(h=Mr(x.props.children,m.mode,b,x.key),h.return=m,m=h):(b=ha(x.type,x.key,x.props,null,m.mode,b),b.ref=fo(m,h,x),b.return=m,m=b)}return s(m);case ci:e:{for(j=x.key;h!==null;){if(h.key===j)if(h.tag===4&&h.stateNode.containerInfo===x.containerInfo&&h.stateNode.implementation===x.implementation){n(m,h.sibling),h=i(h,x.children||[]),h.return=m,m=h;break e}else{n(m,h);break}else t(m,h);h=h.sibling}h=pc(x,m.mode,b),h.return=m,m=h}return s(m);case Bn:return j=x._init,C(m,h,j(x._payload),b)}if(bo(x))return v(m,h,x,b);if(ao(x))return y(m,h,x,b);Ws(m,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,h!==null&&h.tag===6?(n(m,h.sibling),h=i(h,x),h.return=m,m=h):(n(m,h),h=dc(x,m.mode,b),h.return=m,m=h),s(m)):n(m,h)}return C}var Fi=Q0(!0),H0=Q0(!1),za=ur(null),_a=null,yi=null,Ed=null;function Ad(){Ed=yi=_a=null}function Id(e){var t=za.current;Pe(za),e._currentValue=t}function Cu(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Pi(e,t){_a=e,Ed=yi=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(yt=!0),e.firstContext=null)}function Bt(e){var t=e._currentValue;if(Ed!==e)if(e={context:e,memoizedValue:t,next:null},yi===null){if(_a===null)throw Error(z(308));yi=e,_a.dependencies={lanes:0,firstContext:e}}else yi=yi.next=e;return t}var Ar=null;function Ld(e){Ar===null?Ar=[e]:Ar.push(e)}function V0(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Ld(t)):(n.next=i.next,i.next=n),t.interleaved=n,An(e,r)}function An(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Un=!1;function Rd(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function q0(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function bn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function rr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,ue&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,An(e,n)}return i=r.interleaved,i===null?(t.next=t,Ld(r)):(t.next=i.next,i.next=t),r.interleaved=t,An(e,n)}function la(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,gd(e,n)}}function Cf(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ma(e,t,n,r){var i=e.updateQueue;Un=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var c=l,d=c.next;c.next=null,s===null?o=d:s.next=d,s=c;var f=e.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==s&&(l===null?f.firstBaseUpdate=d:l.next=d,f.lastBaseUpdate=c))}if(o!==null){var p=i.baseState;s=0,f=d=c=null,l=o;do{var g=l.lane,w=l.eventTime;if((r&g)===g){f!==null&&(f=f.next={eventTime:w,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var v=e,y=l;switch(g=t,w=n,y.tag){case 1:if(v=y.payload,typeof v=="function"){p=v.call(w,p,g);break e}p=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=y.payload,g=typeof v=="function"?v.call(w,p,g):v,g==null)break e;p=Re({},p,g);break e;case 2:Un=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,g=i.effects,g===null?i.effects=[l]:g.push(l))}else w={eventTime:w,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(d=f=w,c=p):f=f.next=w,s|=g;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;g=l,l=g.next,g.next=null,i.lastBaseUpdate=g,i.shared.pending=null}}while(!0);if(f===null&&(c=p),i.baseState=c,i.firstBaseUpdate=d,i.lastBaseUpdate=f,t=i.shared.interleaved,t!==null){i=t;do s|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);Hr|=s,e.lanes=s,e.memoizedState=p}}function Sf(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(z(191,i));i.call(r)}}}var hs={},fn=ur(hs),Jo=ur(hs),Xo=ur(hs);function Ir(e){if(e===hs)throw Error(z(174));return e}function Td(e,t){switch(Se(Xo,t),Se(Jo,e),Se(fn,hs),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:nu(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=nu(t,e)}Pe(fn),Se(fn,t)}function Bi(){Pe(fn),Pe(Jo),Pe(Xo)}function G0(e){Ir(Xo.current);var t=Ir(fn.current),n=nu(t,e.type);t!==n&&(Se(Jo,e),Se(fn,n))}function Dd(e){Jo.current===e&&(Pe(fn),Pe(Jo))}var Ie=ur(0);function $a(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var oc=[];function Nd(){for(var e=0;e<oc.length;e++)oc[e]._workInProgressVersionPrimary=null;oc.length=0}var ca=Ln.ReactCurrentDispatcher,sc=Ln.ReactCurrentBatchConfig,Qr=0,Le=null,We=null,He=null,Fa=!1,No=!1,Yo=0,zv=0;function rt(){throw Error(z(321))}function Od(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!en(e[n],t[n]))return!1;return!0}function zd(e,t,n,r,i,o){if(Qr=o,Le=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ca.current=e===null||e.memoizedState===null?Fv:Bv,e=n(r,i),No){o=0;do{if(No=!1,Yo=0,25<=o)throw Error(z(301));o+=1,He=We=null,t.updateQueue=null,ca.current=Uv,e=n(r,i)}while(No)}if(ca.current=Ba,t=We!==null&&We.next!==null,Qr=0,He=We=Le=null,Fa=!1,t)throw Error(z(300));return e}function _d(){var e=Yo!==0;return Yo=0,e}function sn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?Le.memoizedState=He=e:He=He.next=e,He}function Ut(){if(We===null){var e=Le.alternate;e=e!==null?e.memoizedState:null}else e=We.next;var t=He===null?Le.memoizedState:He.next;if(t!==null)He=t,We=e;else{if(e===null)throw Error(z(310));We=e,e={memoizedState:We.memoizedState,baseState:We.baseState,baseQueue:We.baseQueue,queue:We.queue,next:null},He===null?Le.memoizedState=He=e:He=He.next=e}return He}function Zo(e,t){return typeof t=="function"?t(e):t}function ac(e){var t=Ut(),n=t.queue;if(n===null)throw Error(z(311));n.lastRenderedReducer=e;var r=We,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var l=s=null,c=null,d=o;do{var f=d.lane;if((Qr&f)===f)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var p={lane:f,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=p,s=r):c=c.next=p,Le.lanes|=f,Hr|=f}d=d.next}while(d!==null&&d!==o);c===null?s=r:c.next=l,en(r,t.memoizedState)||(yt=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,Le.lanes|=o,Hr|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function lc(e){var t=Ut(),n=t.queue;if(n===null)throw Error(z(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do o=e(o,s.action),s=s.next;while(s!==i);en(o,t.memoizedState)||(yt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function K0(){}function J0(e,t){var n=Le,r=Ut(),i=t(),o=!en(r.memoizedState,i);if(o&&(r.memoizedState=i,yt=!0),r=r.queue,Md(Z0.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||He!==null&&He.memoizedState.tag&1){if(n.flags|=2048,es(9,Y0.bind(null,n,r,i,t),void 0,null),qe===null)throw Error(z(349));Qr&30||X0(n,t,i)}return i}function X0(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Y0(e,t,n,r){t.value=n,t.getSnapshot=r,eg(t)&&tg(e)}function Z0(e,t,n){return n(function(){eg(t)&&tg(e)})}function eg(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!en(e,n)}catch{return!0}}function tg(e){var t=An(e,1);t!==null&&Yt(t,e,1,-1)}function bf(e){var t=sn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Zo,lastRenderedState:e},t.queue=e,e=e.dispatch=$v.bind(null,Le,e),[t.memoizedState,e]}function es(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function ng(){return Ut().memoizedState}function ua(e,t,n,r){var i=sn();Le.flags|=e,i.memoizedState=es(1|t,n,void 0,r===void 0?null:r)}function fl(e,t,n,r){var i=Ut();r=r===void 0?null:r;var o=void 0;if(We!==null){var s=We.memoizedState;if(o=s.destroy,r!==null&&Od(r,s.deps)){i.memoizedState=es(t,n,o,r);return}}Le.flags|=e,i.memoizedState=es(1|t,n,o,r)}function kf(e,t){return ua(8390656,8,e,t)}function Md(e,t){return fl(2048,8,e,t)}function rg(e,t){return fl(4,2,e,t)}function ig(e,t){return fl(4,4,e,t)}function og(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function sg(e,t,n){return n=n!=null?n.concat([e]):null,fl(4,4,og.bind(null,t,e),n)}function $d(){}function ag(e,t){var n=Ut();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Od(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function lg(e,t){var n=Ut();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Od(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function cg(e,t,n){return Qr&21?(en(n,t)||(n=h0(),Le.lanes|=n,Hr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,yt=!0),e.memoizedState=n)}function _v(e,t){var n=ve;ve=n!==0&&4>n?n:4,e(!0);var r=sc.transition;sc.transition={};try{e(!1),t()}finally{ve=n,sc.transition=r}}function ug(){return Ut().memoizedState}function Mv(e,t,n){var r=or(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},dg(e))pg(t,n);else if(n=V0(e,t,n,r),n!==null){var i=ft();Yt(n,e,r,i),fg(n,t,r)}}function $v(e,t,n){var r=or(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(dg(e))pg(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,l=o(s,n);if(i.hasEagerState=!0,i.eagerState=l,en(l,s)){var c=t.interleaved;c===null?(i.next=i,Ld(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=V0(e,t,i,r),n!==null&&(i=ft(),Yt(n,e,r,i),fg(n,t,r))}}function dg(e){var t=e.alternate;return e===Le||t!==null&&t===Le}function pg(e,t){No=Fa=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function fg(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,gd(e,n)}}var Ba={readContext:Bt,useCallback:rt,useContext:rt,useEffect:rt,useImperativeHandle:rt,useInsertionEffect:rt,useLayoutEffect:rt,useMemo:rt,useReducer:rt,useRef:rt,useState:rt,useDebugValue:rt,useDeferredValue:rt,useTransition:rt,useMutableSource:rt,useSyncExternalStore:rt,useId:rt,unstable_isNewReconciler:!1},Fv={readContext:Bt,useCallback:function(e,t){return sn().memoizedState=[e,t===void 0?null:t],e},useContext:Bt,useEffect:kf,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ua(4194308,4,og.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ua(4194308,4,e,t)},useInsertionEffect:function(e,t){return ua(4,2,e,t)},useMemo:function(e,t){var n=sn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=sn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Mv.bind(null,Le,e),[r.memoizedState,e]},useRef:function(e){var t=sn();return e={current:e},t.memoizedState=e},useState:bf,useDebugValue:$d,useDeferredValue:function(e){return sn().memoizedState=e},useTransition:function(){var e=bf(!1),t=e[0];return e=_v.bind(null,e[1]),sn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Le,i=sn();if(Ae){if(n===void 0)throw Error(z(407));n=n()}else{if(n=t(),qe===null)throw Error(z(349));Qr&30||X0(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,kf(Z0.bind(null,r,o,e),[e]),r.flags|=2048,es(9,Y0.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=sn(),t=qe.identifierPrefix;if(Ae){var n=Sn,r=Cn;n=(r&~(1<<32-Xt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Yo++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=zv++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Bv={readContext:Bt,useCallback:ag,useContext:Bt,useEffect:Md,useImperativeHandle:sg,useInsertionEffect:rg,useLayoutEffect:ig,useMemo:lg,useReducer:ac,useRef:ng,useState:function(){return ac(Zo)},useDebugValue:$d,useDeferredValue:function(e){var t=Ut();return cg(t,We.memoizedState,e)},useTransition:function(){var e=ac(Zo)[0],t=Ut().memoizedState;return[e,t]},useMutableSource:K0,useSyncExternalStore:J0,useId:ug,unstable_isNewReconciler:!1},Uv={readContext:Bt,useCallback:ag,useContext:Bt,useEffect:Md,useImperativeHandle:sg,useInsertionEffect:rg,useLayoutEffect:ig,useMemo:lg,useReducer:lc,useRef:ng,useState:function(){return lc(Zo)},useDebugValue:$d,useDeferredValue:function(e){var t=Ut();return We===null?t.memoizedState=e:cg(t,We.memoizedState,e)},useTransition:function(){var e=lc(Zo)[0],t=Ut().memoizedState;return[e,t]},useMutableSource:K0,useSyncExternalStore:J0,useId:ug,unstable_isNewReconciler:!1};function Ht(e,t){if(e&&e.defaultProps){t=Re({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Su(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Re({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var hl={isMounted:function(e){return(e=e._reactInternals)?Xr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ft(),i=or(e),o=bn(r,i);o.payload=t,n!=null&&(o.callback=n),t=rr(e,o,i),t!==null&&(Yt(t,e,i,r),la(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ft(),i=or(e),o=bn(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=rr(e,o,i),t!==null&&(Yt(t,e,i,r),la(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ft(),r=or(e),i=bn(n,r);i.tag=2,t!=null&&(i.callback=t),t=rr(e,i,r),t!==null&&(Yt(t,e,r,n),la(t,e,r))}};function Pf(e,t,n,r,i,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,s):t.prototype&&t.prototype.isPureReactComponent?!Vo(n,r)||!Vo(i,o):!0}function hg(e,t,n){var r=!1,i=lr,o=t.contextType;return typeof o=="object"&&o!==null?o=Bt(o):(i=jt(t)?Ur:at.current,r=t.contextTypes,o=(r=r!=null)?Mi(e,i):lr),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=hl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function Ef(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&hl.enqueueReplaceState(t,t.state,null)}function bu(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Rd(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=Bt(o):(o=jt(t)?Ur:at.current,i.context=Mi(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Su(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&hl.enqueueReplaceState(i,i.state,null),Ma(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Ui(e,t){try{var n="",r=t;do n+=gy(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function cc(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ku(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Wv=typeof WeakMap=="function"?WeakMap:Map;function mg(e,t,n){n=bn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Wa||(Wa=!0,Ou=r),ku(e,t)},n}function gg(e,t,n){n=bn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){ku(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ku(e,t),typeof r!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function Af(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Wv;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=rw.bind(null,e,t,n),t.then(e,e))}function If(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Lf(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=bn(-1,1),t.tag=2,rr(n,t,1))),n.lanes|=1),e)}var Qv=Ln.ReactCurrentOwner,yt=!1;function dt(e,t,n,r){t.child=e===null?H0(t,null,n,r):Fi(t,e.child,n,r)}function Rf(e,t,n,r,i){n=n.render;var o=t.ref;return Pi(t,i),r=zd(e,t,n,r,o,i),n=_d(),e!==null&&!yt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,In(e,t,i)):(Ae&&n&&bd(t),t.flags|=1,dt(e,t,r,i),t.child)}function Tf(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!qd(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,xg(e,t,o,r,i)):(e=ha(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:Vo,n(s,r)&&e.ref===t.ref)return In(e,t,i)}return t.flags|=1,e=sr(o,r),e.ref=t.ref,e.return=t,t.child=e}function xg(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(Vo(o,r)&&e.ref===t.ref)if(yt=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(yt=!0);else return t.lanes=e.lanes,In(e,t,i)}return Pu(e,t,n,r,i)}function yg(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Se(wi,Et),Et|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Se(wi,Et),Et|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,Se(wi,Et),Et|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,Se(wi,Et),Et|=r;return dt(e,t,i,n),t.child}function vg(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Pu(e,t,n,r,i){var o=jt(n)?Ur:at.current;return o=Mi(t,o),Pi(t,i),n=zd(e,t,n,r,o,i),r=_d(),e!==null&&!yt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,In(e,t,i)):(Ae&&r&&bd(t),t.flags|=1,dt(e,t,n,i),t.child)}function Df(e,t,n,r,i){if(jt(n)){var o=!0;Da(t)}else o=!1;if(Pi(t,i),t.stateNode===null)da(e,t),hg(t,n,r),bu(t,n,r,i),r=!0;else if(e===null){var s=t.stateNode,l=t.memoizedProps;s.props=l;var c=s.context,d=n.contextType;typeof d=="object"&&d!==null?d=Bt(d):(d=jt(n)?Ur:at.current,d=Mi(t,d));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof s.getSnapshotBeforeUpdate=="function";p||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==r||c!==d)&&Ef(t,s,r,d),Un=!1;var g=t.memoizedState;s.state=g,Ma(t,r,s,i),c=t.memoizedState,l!==r||g!==c||wt.current||Un?(typeof f=="function"&&(Su(t,n,f,r),c=t.memoizedState),(l=Un||Pf(t,n,l,r,g,c,d))?(p||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),s.props=r,s.state=c,s.context=d,r=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,q0(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:Ht(t.type,l),s.props=d,p=t.pendingProps,g=s.context,c=n.contextType,typeof c=="object"&&c!==null?c=Bt(c):(c=jt(n)?Ur:at.current,c=Mi(t,c));var w=n.getDerivedStateFromProps;(f=typeof w=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==p||g!==c)&&Ef(t,s,r,c),Un=!1,g=t.memoizedState,s.state=g,Ma(t,r,s,i);var v=t.memoizedState;l!==p||g!==v||wt.current||Un?(typeof w=="function"&&(Su(t,n,w,r),v=t.memoizedState),(d=Un||Pf(t,n,d,r,g,v,c)||!1)?(f||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,v,c),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,v,c)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),s.props=r,s.state=v,s.context=c,r=d):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return Eu(e,t,n,r,o,i)}function Eu(e,t,n,r,i,o){vg(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return i&&yf(t,n,!1),In(e,t,o);r=t.stateNode,Qv.current=t;var l=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=Fi(t,e.child,null,o),t.child=Fi(t,null,l,o)):dt(e,t,l,o),t.memoizedState=r.state,i&&yf(t,n,!0),t.child}function wg(e){var t=e.stateNode;t.pendingContext?xf(e,t.pendingContext,t.pendingContext!==t.context):t.context&&xf(e,t.context,!1),Td(e,t.containerInfo)}function Nf(e,t,n,r,i){return $i(),Pd(i),t.flags|=256,dt(e,t,n,r),t.child}var Au={dehydrated:null,treeContext:null,retryLane:0};function Iu(e){return{baseLanes:e,cachePool:null,transitions:null}}function jg(e,t,n){var r=t.pendingProps,i=Ie.current,o=!1,s=(t.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),Se(Ie,i&1),e===null)return ju(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,o?(r=t.mode,o=t.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=xl(s,r,0,null),e=Mr(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Iu(n),t.memoizedState=Au,e):Fd(t,s));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Hv(e,t,s,r,l,i,n);if(o){o=r.fallback,s=t.mode,i=e.child,l=i.sibling;var c={mode:"hidden",children:r.children};return!(s&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=sr(i,c),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?o=sr(l,o):(o=Mr(o,s,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,s=e.child.memoizedState,s=s===null?Iu(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=Au,r}return o=e.child,e=o.sibling,r=sr(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Fd(e,t){return t=xl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Qs(e,t,n,r){return r!==null&&Pd(r),Fi(t,e.child,null,n),e=Fd(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Hv(e,t,n,r,i,o,s){if(n)return t.flags&256?(t.flags&=-257,r=cc(Error(z(422))),Qs(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=xl({mode:"visible",children:r.children},i,0,null),o=Mr(o,i,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Fi(t,e.child,null,s),t.child.memoizedState=Iu(s),t.memoizedState=Au,o);if(!(t.mode&1))return Qs(e,t,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(z(419)),r=cc(o,r,void 0),Qs(e,t,s,r)}if(l=(s&e.childLanes)!==0,yt||l){if(r=qe,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,An(e,i),Yt(r,e,i,-1))}return Vd(),r=cc(Error(z(421))),Qs(e,t,s,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=iw.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,It=nr(i.nextSibling),Rt=t,Ae=!0,Jt=null,e!==null&&(_t[Mt++]=Cn,_t[Mt++]=Sn,_t[Mt++]=Wr,Cn=e.id,Sn=e.overflow,Wr=t),t=Fd(t,r.children),t.flags|=4096,t)}function Of(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Cu(e.return,t,n)}function uc(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function Cg(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(dt(e,t,r.children,n),r=Ie.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Of(e,n,t);else if(e.tag===19)Of(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Se(Ie,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&$a(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),uc(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&$a(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}uc(t,!0,n,null,o);break;case"together":uc(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function da(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function In(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Hr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(z(153));if(t.child!==null){for(e=t.child,n=sr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=sr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Vv(e,t,n){switch(t.tag){case 3:wg(t),$i();break;case 5:G0(t);break;case 1:jt(t.type)&&Da(t);break;case 4:Td(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;Se(za,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Se(Ie,Ie.current&1),t.flags|=128,null):n&t.child.childLanes?jg(e,t,n):(Se(Ie,Ie.current&1),e=In(e,t,n),e!==null?e.sibling:null);Se(Ie,Ie.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Cg(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Se(Ie,Ie.current),r)break;return null;case 22:case 23:return t.lanes=0,yg(e,t,n)}return In(e,t,n)}var Sg,Lu,bg,kg;Sg=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Lu=function(){};bg=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Ir(fn.current);var o=null;switch(n){case"input":i=Yc(e,i),r=Yc(e,r),o=[];break;case"select":i=Re({},i,{value:void 0}),r=Re({},r,{value:void 0}),o=[];break;case"textarea":i=tu(e,i),r=tu(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ra)}ru(n,r);var s;n=null;for(d in i)if(!r.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var l=i[d];for(s in l)l.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&($o.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in r){var c=r[d];if(l=i!=null?i[d]:void 0,r.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(s in l)!l.hasOwnProperty(s)||c&&c.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in c)c.hasOwnProperty(s)&&l[s]!==c[s]&&(n||(n={}),n[s]=c[s])}else n||(o||(o=[]),o.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&($o.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&be("scroll",e),o||l===c||(o=[])):(o=o||[]).push(d,c))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};kg=function(e,t,n,r){n!==r&&(t.flags|=4)};function ho(e,t){if(!Ae)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function it(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function qv(e,t,n){var r=t.pendingProps;switch(kd(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return it(t),null;case 1:return jt(t.type)&&Ta(),it(t),null;case 3:return r=t.stateNode,Bi(),Pe(wt),Pe(at),Nd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Us(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Jt!==null&&(Mu(Jt),Jt=null))),Lu(e,t),it(t),null;case 5:Dd(t);var i=Ir(Xo.current);if(n=t.type,e!==null&&t.stateNode!=null)bg(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(z(166));return it(t),null}if(e=Ir(fn.current),Us(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[dn]=t,r[Ko]=o,e=(t.mode&1)!==0,n){case"dialog":be("cancel",r),be("close",r);break;case"iframe":case"object":case"embed":be("load",r);break;case"video":case"audio":for(i=0;i<Po.length;i++)be(Po[i],r);break;case"source":be("error",r);break;case"img":case"image":case"link":be("error",r),be("load",r);break;case"details":be("toggle",r);break;case"input":Wp(r,o),be("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},be("invalid",r);break;case"textarea":Hp(r,o),be("invalid",r)}ru(n,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&Bs(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Bs(r.textContent,l,e),i=["children",""+l]):$o.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&be("scroll",r)}switch(n){case"input":Ds(r),Qp(r,o,!0);break;case"textarea":Ds(r),Vp(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Ra)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Zm(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[dn]=t,e[Ko]=r,Sg(e,t,!1,!1),t.stateNode=e;e:{switch(s=iu(n,r),n){case"dialog":be("cancel",e),be("close",e),i=r;break;case"iframe":case"object":case"embed":be("load",e),i=r;break;case"video":case"audio":for(i=0;i<Po.length;i++)be(Po[i],e);i=r;break;case"source":be("error",e),i=r;break;case"img":case"image":case"link":be("error",e),be("load",e),i=r;break;case"details":be("toggle",e),i=r;break;case"input":Wp(e,r),i=Yc(e,r),be("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=Re({},r,{value:void 0}),be("invalid",e);break;case"textarea":Hp(e,r),i=tu(e,r),be("invalid",e);break;default:i=r}ru(n,i),l=i;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?n0(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&e0(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Fo(e,c):typeof c=="number"&&Fo(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&($o.hasOwnProperty(o)?c!=null&&o==="onScroll"&&be("scroll",e):c!=null&&ud(e,o,c,s))}switch(n){case"input":Ds(e),Qp(e,r,!1);break;case"textarea":Ds(e),Vp(e);break;case"option":r.value!=null&&e.setAttribute("value",""+ar(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Ci(e,!!r.multiple,o,!1):r.defaultValue!=null&&Ci(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Ra)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return it(t),null;case 6:if(e&&t.stateNode!=null)kg(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(z(166));if(n=Ir(Xo.current),Ir(fn.current),Us(t)){if(r=t.stateNode,n=t.memoizedProps,r[dn]=t,(o=r.nodeValue!==n)&&(e=Rt,e!==null))switch(e.tag){case 3:Bs(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Bs(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[dn]=t,t.stateNode=r}return it(t),null;case 13:if(Pe(Ie),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ae&&It!==null&&t.mode&1&&!(t.flags&128))W0(),$i(),t.flags|=98560,o=!1;else if(o=Us(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(z(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(z(317));o[dn]=t}else $i(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;it(t),o=!1}else Jt!==null&&(Mu(Jt),Jt=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Ie.current&1?Qe===0&&(Qe=3):Vd())),t.updateQueue!==null&&(t.flags|=4),it(t),null);case 4:return Bi(),Lu(e,t),e===null&&qo(t.stateNode.containerInfo),it(t),null;case 10:return Id(t.type._context),it(t),null;case 17:return jt(t.type)&&Ta(),it(t),null;case 19:if(Pe(Ie),o=t.memoizedState,o===null)return it(t),null;if(r=(t.flags&128)!==0,s=o.rendering,s===null)if(r)ho(o,!1);else{if(Qe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=$a(e),s!==null){for(t.flags|=128,ho(o,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Se(Ie,Ie.current&1|2),t.child}e=e.sibling}o.tail!==null&&ze()>Wi&&(t.flags|=128,r=!0,ho(o,!1),t.lanes=4194304)}else{if(!r)if(e=$a(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ho(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!Ae)return it(t),null}else 2*ze()-o.renderingStartTime>Wi&&n!==1073741824&&(t.flags|=128,r=!0,ho(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ze(),t.sibling=null,n=Ie.current,Se(Ie,r?n&1|2:n&1),t):(it(t),null);case 22:case 23:return Hd(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Et&1073741824&&(it(t),t.subtreeFlags&6&&(t.flags|=8192)):it(t),null;case 24:return null;case 25:return null}throw Error(z(156,t.tag))}function Gv(e,t){switch(kd(t),t.tag){case 1:return jt(t.type)&&Ta(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Bi(),Pe(wt),Pe(at),Nd(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Dd(t),null;case 13:if(Pe(Ie),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(z(340));$i()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Pe(Ie),null;case 4:return Bi(),null;case 10:return Id(t.type._context),null;case 22:case 23:return Hd(),null;case 24:return null;default:return null}}var Hs=!1,st=!1,Kv=typeof WeakSet=="function"?WeakSet:Set,B=null;function vi(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Oe(e,t,r)}else n.current=null}function Ru(e,t,n){try{n()}catch(r){Oe(e,t,r)}}var zf=!1;function Jv(e,t){if(hu=Aa,e=L0(),Sd(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,l=-1,c=-1,d=0,f=0,p=e,g=null;t:for(;;){for(var w;p!==n||i!==0&&p.nodeType!==3||(l=s+i),p!==o||r!==0&&p.nodeType!==3||(c=s+r),p.nodeType===3&&(s+=p.nodeValue.length),(w=p.firstChild)!==null;)g=p,p=w;for(;;){if(p===e)break t;if(g===n&&++d===i&&(l=s),g===o&&++f===r&&(c=s),(w=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=w}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(mu={focusedElem:e,selectionRange:n},Aa=!1,B=t;B!==null;)if(t=B,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,B=e;else for(;B!==null;){t=B;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var y=v.memoizedProps,C=v.memoizedState,m=t.stateNode,h=m.getSnapshotBeforeUpdate(t.elementType===t.type?y:Ht(t.type,y),C);m.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(z(163))}}catch(b){Oe(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,B=e;break}B=t.return}return v=zf,zf=!1,v}function Oo(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&Ru(t,n,o)}i=i.next}while(i!==r)}}function ml(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Tu(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Pg(e){var t=e.alternate;t!==null&&(e.alternate=null,Pg(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[dn],delete t[Ko],delete t[yu],delete t[Tv],delete t[Dv])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Eg(e){return e.tag===5||e.tag===3||e.tag===4}function _f(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Eg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Du(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ra));else if(r!==4&&(e=e.child,e!==null))for(Du(e,t,n),e=e.sibling;e!==null;)Du(e,t,n),e=e.sibling}function Nu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Nu(e,t,n),e=e.sibling;e!==null;)Nu(e,t,n),e=e.sibling}var Ye=null,Gt=!1;function On(e,t,n){for(n=n.child;n!==null;)Ag(e,t,n),n=n.sibling}function Ag(e,t,n){if(pn&&typeof pn.onCommitFiberUnmount=="function")try{pn.onCommitFiberUnmount(al,n)}catch{}switch(n.tag){case 5:st||vi(n,t);case 6:var r=Ye,i=Gt;Ye=null,On(e,t,n),Ye=r,Gt=i,Ye!==null&&(Gt?(e=Ye,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ye.removeChild(n.stateNode));break;case 18:Ye!==null&&(Gt?(e=Ye,n=n.stateNode,e.nodeType===8?rc(e.parentNode,n):e.nodeType===1&&rc(e,n),Qo(e)):rc(Ye,n.stateNode));break;case 4:r=Ye,i=Gt,Ye=n.stateNode.containerInfo,Gt=!0,On(e,t,n),Ye=r,Gt=i;break;case 0:case 11:case 14:case 15:if(!st&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&Ru(n,t,s),i=i.next}while(i!==r)}On(e,t,n);break;case 1:if(!st&&(vi(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Oe(n,t,l)}On(e,t,n);break;case 21:On(e,t,n);break;case 22:n.mode&1?(st=(r=st)||n.memoizedState!==null,On(e,t,n),st=r):On(e,t,n);break;default:On(e,t,n)}}function Mf(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Kv),t.forEach(function(r){var i=ow.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Qt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,s=t,l=s;e:for(;l!==null;){switch(l.tag){case 5:Ye=l.stateNode,Gt=!1;break e;case 3:Ye=l.stateNode.containerInfo,Gt=!0;break e;case 4:Ye=l.stateNode.containerInfo,Gt=!0;break e}l=l.return}if(Ye===null)throw Error(z(160));Ag(o,s,i),Ye=null,Gt=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(d){Oe(i,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ig(t,e),t=t.sibling}function Ig(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Qt(t,e),rn(e),r&4){try{Oo(3,e,e.return),ml(3,e)}catch(y){Oe(e,e.return,y)}try{Oo(5,e,e.return)}catch(y){Oe(e,e.return,y)}}break;case 1:Qt(t,e),rn(e),r&512&&n!==null&&vi(n,n.return);break;case 5:if(Qt(t,e),rn(e),r&512&&n!==null&&vi(n,n.return),e.flags&32){var i=e.stateNode;try{Fo(i,"")}catch(y){Oe(e,e.return,y)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&Xm(i,o),iu(l,s);var d=iu(l,o);for(s=0;s<c.length;s+=2){var f=c[s],p=c[s+1];f==="style"?n0(i,p):f==="dangerouslySetInnerHTML"?e0(i,p):f==="children"?Fo(i,p):ud(i,f,p,d)}switch(l){case"input":Zc(i,o);break;case"textarea":Ym(i,o);break;case"select":var g=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var w=o.value;w!=null?Ci(i,!!o.multiple,w,!1):g!==!!o.multiple&&(o.defaultValue!=null?Ci(i,!!o.multiple,o.defaultValue,!0):Ci(i,!!o.multiple,o.multiple?[]:"",!1))}i[Ko]=o}catch(y){Oe(e,e.return,y)}}break;case 6:if(Qt(t,e),rn(e),r&4){if(e.stateNode===null)throw Error(z(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(y){Oe(e,e.return,y)}}break;case 3:if(Qt(t,e),rn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Qo(t.containerInfo)}catch(y){Oe(e,e.return,y)}break;case 4:Qt(t,e),rn(e);break;case 13:Qt(t,e),rn(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Wd=ze())),r&4&&Mf(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(st=(d=st)||f,Qt(t,e),st=d):Qt(t,e),rn(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!f&&e.mode&1)for(B=e,f=e.child;f!==null;){for(p=B=f;B!==null;){switch(g=B,w=g.child,g.tag){case 0:case 11:case 14:case 15:Oo(4,g,g.return);break;case 1:vi(g,g.return);var v=g.stateNode;if(typeof v.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(y){Oe(r,n,y)}}break;case 5:vi(g,g.return);break;case 22:if(g.memoizedState!==null){Ff(p);continue}}w!==null?(w.return=g,B=w):Ff(p)}f=f.sibling}e:for(f=null,p=e;;){if(p.tag===5){if(f===null){f=p;try{i=p.stateNode,d?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=p.stateNode,c=p.memoizedProps.style,s=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=t0("display",s))}catch(y){Oe(e,e.return,y)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(y){Oe(e,e.return,y)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Qt(t,e),rn(e),r&4&&Mf(e);break;case 21:break;default:Qt(t,e),rn(e)}}function rn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Eg(n)){var r=n;break e}n=n.return}throw Error(z(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Fo(i,""),r.flags&=-33);var o=_f(e);Nu(e,o,i);break;case 3:case 4:var s=r.stateNode.containerInfo,l=_f(e);Du(e,l,s);break;default:throw Error(z(161))}}catch(c){Oe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Xv(e,t,n){B=e,Lg(e)}function Lg(e,t,n){for(var r=(e.mode&1)!==0;B!==null;){var i=B,o=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||Hs;if(!s){var l=i.alternate,c=l!==null&&l.memoizedState!==null||st;l=Hs;var d=st;if(Hs=s,(st=c)&&!d)for(B=i;B!==null;)s=B,c=s.child,s.tag===22&&s.memoizedState!==null?Bf(i):c!==null?(c.return=s,B=c):Bf(i);for(;o!==null;)B=o,Lg(o),o=o.sibling;B=i,Hs=l,st=d}$f(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,B=o):$f(e)}}function $f(e){for(;B!==null;){var t=B;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:st||ml(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!st)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Ht(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Sf(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Sf(t,s,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var f=d.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Qo(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(z(163))}st||t.flags&512&&Tu(t)}catch(g){Oe(t,t.return,g)}}if(t===e){B=null;break}if(n=t.sibling,n!==null){n.return=t.return,B=n;break}B=t.return}}function Ff(e){for(;B!==null;){var t=B;if(t===e){B=null;break}var n=t.sibling;if(n!==null){n.return=t.return,B=n;break}B=t.return}}function Bf(e){for(;B!==null;){var t=B;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ml(4,t)}catch(c){Oe(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){Oe(t,i,c)}}var o=t.return;try{Tu(t)}catch(c){Oe(t,o,c)}break;case 5:var s=t.return;try{Tu(t)}catch(c){Oe(t,s,c)}}}catch(c){Oe(t,t.return,c)}if(t===e){B=null;break}var l=t.sibling;if(l!==null){l.return=t.return,B=l;break}B=t.return}}var Yv=Math.ceil,Ua=Ln.ReactCurrentDispatcher,Bd=Ln.ReactCurrentOwner,Ft=Ln.ReactCurrentBatchConfig,ue=0,qe=null,Fe=null,Ze=0,Et=0,wi=ur(0),Qe=0,ts=null,Hr=0,gl=0,Ud=0,zo=null,xt=null,Wd=0,Wi=1/0,vn=null,Wa=!1,Ou=null,ir=null,Vs=!1,Xn=null,Qa=0,_o=0,zu=null,pa=-1,fa=0;function ft(){return ue&6?ze():pa!==-1?pa:pa=ze()}function or(e){return e.mode&1?ue&2&&Ze!==0?Ze&-Ze:Ov.transition!==null?(fa===0&&(fa=h0()),fa):(e=ve,e!==0||(e=window.event,e=e===void 0?16:j0(e.type)),e):1}function Yt(e,t,n,r){if(50<_o)throw _o=0,zu=null,Error(z(185));ds(e,n,r),(!(ue&2)||e!==qe)&&(e===qe&&(!(ue&2)&&(gl|=n),Qe===4&&Qn(e,Ze)),Ct(e,r),n===1&&ue===0&&!(t.mode&1)&&(Wi=ze()+500,pl&&dr()))}function Ct(e,t){var n=e.callbackNode;Oy(e,t);var r=Ea(e,e===qe?Ze:0);if(r===0)n!==null&&Kp(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Kp(n),t===1)e.tag===0?Nv(Uf.bind(null,e)):F0(Uf.bind(null,e)),Lv(function(){!(ue&6)&&dr()}),n=null;else{switch(m0(r)){case 1:n=md;break;case 4:n=p0;break;case 16:n=Pa;break;case 536870912:n=f0;break;default:n=Pa}n=Mg(n,Rg.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Rg(e,t){if(pa=-1,fa=0,ue&6)throw Error(z(327));var n=e.callbackNode;if(Ei()&&e.callbackNode!==n)return null;var r=Ea(e,e===qe?Ze:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ha(e,r);else{t=r;var i=ue;ue|=2;var o=Dg();(qe!==e||Ze!==t)&&(vn=null,Wi=ze()+500,_r(e,t));do try{tw();break}catch(l){Tg(e,l)}while(!0);Ad(),Ua.current=o,ue=i,Fe!==null?t=0:(qe=null,Ze=0,t=Qe)}if(t!==0){if(t===2&&(i=cu(e),i!==0&&(r=i,t=_u(e,i))),t===1)throw n=ts,_r(e,0),Qn(e,r),Ct(e,ze()),n;if(t===6)Qn(e,r);else{if(i=e.current.alternate,!(r&30)&&!Zv(i)&&(t=Ha(e,r),t===2&&(o=cu(e),o!==0&&(r=o,t=_u(e,o))),t===1))throw n=ts,_r(e,0),Qn(e,r),Ct(e,ze()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(z(345));case 2:br(e,xt,vn);break;case 3:if(Qn(e,r),(r&130023424)===r&&(t=Wd+500-ze(),10<t)){if(Ea(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){ft(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=xu(br.bind(null,e,xt,vn),t);break}br(e,xt,vn);break;case 4:if(Qn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-Xt(r);o=1<<s,s=t[s],s>i&&(i=s),r&=~o}if(r=i,r=ze()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Yv(r/1960))-r,10<r){e.timeoutHandle=xu(br.bind(null,e,xt,vn),r);break}br(e,xt,vn);break;case 5:br(e,xt,vn);break;default:throw Error(z(329))}}}return Ct(e,ze()),e.callbackNode===n?Rg.bind(null,e):null}function _u(e,t){var n=zo;return e.current.memoizedState.isDehydrated&&(_r(e,t).flags|=256),e=Ha(e,t),e!==2&&(t=xt,xt=n,t!==null&&Mu(t)),e}function Mu(e){xt===null?xt=e:xt.push.apply(xt,e)}function Zv(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!en(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Qn(e,t){for(t&=~Ud,t&=~gl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Xt(t),r=1<<n;e[n]=-1,t&=~r}}function Uf(e){if(ue&6)throw Error(z(327));Ei();var t=Ea(e,0);if(!(t&1))return Ct(e,ze()),null;var n=Ha(e,t);if(e.tag!==0&&n===2){var r=cu(e);r!==0&&(t=r,n=_u(e,r))}if(n===1)throw n=ts,_r(e,0),Qn(e,t),Ct(e,ze()),n;if(n===6)throw Error(z(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,br(e,xt,vn),Ct(e,ze()),null}function Qd(e,t){var n=ue;ue|=1;try{return e(t)}finally{ue=n,ue===0&&(Wi=ze()+500,pl&&dr())}}function Vr(e){Xn!==null&&Xn.tag===0&&!(ue&6)&&Ei();var t=ue;ue|=1;var n=Ft.transition,r=ve;try{if(Ft.transition=null,ve=1,e)return e()}finally{ve=r,Ft.transition=n,ue=t,!(ue&6)&&dr()}}function Hd(){Et=wi.current,Pe(wi)}function _r(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Iv(n)),Fe!==null)for(n=Fe.return;n!==null;){var r=n;switch(kd(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ta();break;case 3:Bi(),Pe(wt),Pe(at),Nd();break;case 5:Dd(r);break;case 4:Bi();break;case 13:Pe(Ie);break;case 19:Pe(Ie);break;case 10:Id(r.type._context);break;case 22:case 23:Hd()}n=n.return}if(qe=e,Fe=e=sr(e.current,null),Ze=Et=t,Qe=0,ts=null,Ud=gl=Hr=0,xt=zo=null,Ar!==null){for(t=0;t<Ar.length;t++)if(n=Ar[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=i,r.next=s}n.pending=r}Ar=null}return e}function Tg(e,t){do{var n=Fe;try{if(Ad(),ca.current=Ba,Fa){for(var r=Le.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Fa=!1}if(Qr=0,He=We=Le=null,No=!1,Yo=0,Bd.current=null,n===null||n.return===null){Qe=1,ts=t,Fe=null;break}e:{var o=e,s=n.return,l=n,c=t;if(t=Ze,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,f=l,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var g=f.alternate;g?(f.updateQueue=g.updateQueue,f.memoizedState=g.memoizedState,f.lanes=g.lanes):(f.updateQueue=null,f.memoizedState=null)}var w=If(s);if(w!==null){w.flags&=-257,Lf(w,s,l,o,t),w.mode&1&&Af(o,d,t),t=w,c=d;var v=t.updateQueue;if(v===null){var y=new Set;y.add(c),t.updateQueue=y}else v.add(c);break e}else{if(!(t&1)){Af(o,d,t),Vd();break e}c=Error(z(426))}}else if(Ae&&l.mode&1){var C=If(s);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Lf(C,s,l,o,t),Pd(Ui(c,l));break e}}o=c=Ui(c,l),Qe!==4&&(Qe=2),zo===null?zo=[o]:zo.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var m=mg(o,c,t);Cf(o,m);break e;case 1:l=c;var h=o.type,x=o.stateNode;if(!(o.flags&128)&&(typeof h.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(ir===null||!ir.has(x)))){o.flags|=65536,t&=-t,o.lanes|=t;var b=gg(o,l,t);Cf(o,b);break e}}o=o.return}while(o!==null)}Og(n)}catch(E){t=E,Fe===n&&n!==null&&(Fe=n=n.return);continue}break}while(!0)}function Dg(){var e=Ua.current;return Ua.current=Ba,e===null?Ba:e}function Vd(){(Qe===0||Qe===3||Qe===2)&&(Qe=4),qe===null||!(Hr&268435455)&&!(gl&268435455)||Qn(qe,Ze)}function Ha(e,t){var n=ue;ue|=2;var r=Dg();(qe!==e||Ze!==t)&&(vn=null,_r(e,t));do try{ew();break}catch(i){Tg(e,i)}while(!0);if(Ad(),ue=n,Ua.current=r,Fe!==null)throw Error(z(261));return qe=null,Ze=0,Qe}function ew(){for(;Fe!==null;)Ng(Fe)}function tw(){for(;Fe!==null&&!Py();)Ng(Fe)}function Ng(e){var t=_g(e.alternate,e,Et);e.memoizedProps=e.pendingProps,t===null?Og(e):Fe=t,Bd.current=null}function Og(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Gv(n,t),n!==null){n.flags&=32767,Fe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Qe=6,Fe=null;return}}else if(n=qv(n,t,Et),n!==null){Fe=n;return}if(t=t.sibling,t!==null){Fe=t;return}Fe=t=e}while(t!==null);Qe===0&&(Qe=5)}function br(e,t,n){var r=ve,i=Ft.transition;try{Ft.transition=null,ve=1,nw(e,t,n,r)}finally{Ft.transition=i,ve=r}return null}function nw(e,t,n,r){do Ei();while(Xn!==null);if(ue&6)throw Error(z(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(z(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(zy(e,o),e===qe&&(Fe=qe=null,Ze=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Vs||(Vs=!0,Mg(Pa,function(){return Ei(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Ft.transition,Ft.transition=null;var s=ve;ve=1;var l=ue;ue|=4,Bd.current=null,Jv(e,n),Ig(n,e),Cv(mu),Aa=!!hu,mu=hu=null,e.current=n,Xv(n),Ey(),ue=l,ve=s,Ft.transition=o}else e.current=n;if(Vs&&(Vs=!1,Xn=e,Qa=i),o=e.pendingLanes,o===0&&(ir=null),Ly(n.stateNode),Ct(e,ze()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Wa)throw Wa=!1,e=Ou,Ou=null,e;return Qa&1&&e.tag!==0&&Ei(),o=e.pendingLanes,o&1?e===zu?_o++:(_o=0,zu=e):_o=0,dr(),null}function Ei(){if(Xn!==null){var e=m0(Qa),t=Ft.transition,n=ve;try{if(Ft.transition=null,ve=16>e?16:e,Xn===null)var r=!1;else{if(e=Xn,Xn=null,Qa=0,ue&6)throw Error(z(331));var i=ue;for(ue|=4,B=e.current;B!==null;){var o=B,s=o.child;if(B.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(B=d;B!==null;){var f=B;switch(f.tag){case 0:case 11:case 15:Oo(8,f,o)}var p=f.child;if(p!==null)p.return=f,B=p;else for(;B!==null;){f=B;var g=f.sibling,w=f.return;if(Pg(f),f===d){B=null;break}if(g!==null){g.return=w,B=g;break}B=w}}}var v=o.alternate;if(v!==null){var y=v.child;if(y!==null){v.child=null;do{var C=y.sibling;y.sibling=null,y=C}while(y!==null)}}B=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,B=s;else e:for(;B!==null;){if(o=B,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Oo(9,o,o.return)}var m=o.sibling;if(m!==null){m.return=o.return,B=m;break e}B=o.return}}var h=e.current;for(B=h;B!==null;){s=B;var x=s.child;if(s.subtreeFlags&2064&&x!==null)x.return=s,B=x;else e:for(s=h;B!==null;){if(l=B,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:ml(9,l)}}catch(E){Oe(l,l.return,E)}if(l===s){B=null;break e}var b=l.sibling;if(b!==null){b.return=l.return,B=b;break e}B=l.return}}if(ue=i,dr(),pn&&typeof pn.onPostCommitFiberRoot=="function")try{pn.onPostCommitFiberRoot(al,e)}catch{}r=!0}return r}finally{ve=n,Ft.transition=t}}return!1}function Wf(e,t,n){t=Ui(n,t),t=mg(e,t,1),e=rr(e,t,1),t=ft(),e!==null&&(ds(e,1,t),Ct(e,t))}function Oe(e,t,n){if(e.tag===3)Wf(e,e,n);else for(;t!==null;){if(t.tag===3){Wf(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ir===null||!ir.has(r))){e=Ui(n,e),e=gg(t,e,1),t=rr(t,e,1),e=ft(),t!==null&&(ds(t,1,e),Ct(t,e));break}}t=t.return}}function rw(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ft(),e.pingedLanes|=e.suspendedLanes&n,qe===e&&(Ze&n)===n&&(Qe===4||Qe===3&&(Ze&130023424)===Ze&&500>ze()-Wd?_r(e,0):Ud|=n),Ct(e,t)}function zg(e,t){t===0&&(e.mode&1?(t=zs,zs<<=1,!(zs&130023424)&&(zs=4194304)):t=1);var n=ft();e=An(e,t),e!==null&&(ds(e,t,n),Ct(e,n))}function iw(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),zg(e,n)}function ow(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(z(314))}r!==null&&r.delete(t),zg(e,n)}var _g;_g=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||wt.current)yt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return yt=!1,Vv(e,t,n);yt=!!(e.flags&131072)}else yt=!1,Ae&&t.flags&1048576&&B0(t,Oa,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;da(e,t),e=t.pendingProps;var i=Mi(t,at.current);Pi(t,n),i=zd(null,t,r,e,i,n);var o=_d();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,jt(r)?(o=!0,Da(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Rd(t),i.updater=hl,t.stateNode=i,i._reactInternals=t,bu(t,r,e,n),t=Eu(null,t,r,!0,o,n)):(t.tag=0,Ae&&o&&bd(t),dt(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(da(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=aw(r),e=Ht(r,e),i){case 0:t=Pu(null,t,r,e,n);break e;case 1:t=Df(null,t,r,e,n);break e;case 11:t=Rf(null,t,r,e,n);break e;case 14:t=Tf(null,t,r,Ht(r.type,e),n);break e}throw Error(z(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ht(r,i),Pu(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ht(r,i),Df(e,t,r,i,n);case 3:e:{if(wg(t),e===null)throw Error(z(387));r=t.pendingProps,o=t.memoizedState,i=o.element,q0(e,t),Ma(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=Ui(Error(z(423)),t),t=Nf(e,t,r,n,i);break e}else if(r!==i){i=Ui(Error(z(424)),t),t=Nf(e,t,r,n,i);break e}else for(It=nr(t.stateNode.containerInfo.firstChild),Rt=t,Ae=!0,Jt=null,n=H0(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if($i(),r===i){t=In(e,t,n);break e}dt(e,t,r,n)}t=t.child}return t;case 5:return G0(t),e===null&&ju(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,s=i.children,gu(r,i)?s=null:o!==null&&gu(r,o)&&(t.flags|=32),vg(e,t),dt(e,t,s,n),t.child;case 6:return e===null&&ju(t),null;case 13:return jg(e,t,n);case 4:return Td(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Fi(t,null,r,n):dt(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ht(r,i),Rf(e,t,r,i,n);case 7:return dt(e,t,t.pendingProps,n),t.child;case 8:return dt(e,t,t.pendingProps.children,n),t.child;case 12:return dt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,Se(za,r._currentValue),r._currentValue=s,o!==null)if(en(o.value,s)){if(o.children===i.children&&!wt.current){t=In(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){s=o.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(o.tag===1){c=bn(-1,n&-n),c.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var f=d.pending;f===null?c.next=c:(c.next=f.next,f.next=c),d.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Cu(o.return,n,t),l.lanes|=n;break}c=c.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(z(341));s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Cu(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}dt(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Pi(t,n),i=Bt(i),r=r(i),t.flags|=1,dt(e,t,r,n),t.child;case 14:return r=t.type,i=Ht(r,t.pendingProps),i=Ht(r.type,i),Tf(e,t,r,i,n);case 15:return xg(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ht(r,i),da(e,t),t.tag=1,jt(r)?(e=!0,Da(t)):e=!1,Pi(t,n),hg(t,r,i),bu(t,r,i,n),Eu(null,t,r,!0,e,n);case 19:return Cg(e,t,n);case 22:return yg(e,t,n)}throw Error(z(156,t.tag))};function Mg(e,t){return d0(e,t)}function sw(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $t(e,t,n,r){return new sw(e,t,n,r)}function qd(e){return e=e.prototype,!(!e||!e.isReactComponent)}function aw(e){if(typeof e=="function")return qd(e)?1:0;if(e!=null){if(e=e.$$typeof,e===pd)return 11;if(e===fd)return 14}return 2}function sr(e,t){var n=e.alternate;return n===null?(n=$t(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ha(e,t,n,r,i,o){var s=2;if(r=e,typeof e=="function")qd(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case ui:return Mr(n.children,i,o,t);case dd:s=8,i|=8;break;case Gc:return e=$t(12,n,t,i|2),e.elementType=Gc,e.lanes=o,e;case Kc:return e=$t(13,n,t,i),e.elementType=Kc,e.lanes=o,e;case Jc:return e=$t(19,n,t,i),e.elementType=Jc,e.lanes=o,e;case Gm:return xl(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Vm:s=10;break e;case qm:s=9;break e;case pd:s=11;break e;case fd:s=14;break e;case Bn:s=16,r=null;break e}throw Error(z(130,e==null?e:typeof e,""))}return t=$t(s,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function Mr(e,t,n,r){return e=$t(7,e,r,t),e.lanes=n,e}function xl(e,t,n,r){return e=$t(22,e,r,t),e.elementType=Gm,e.lanes=n,e.stateNode={isHidden:!1},e}function dc(e,t,n){return e=$t(6,e,null,t),e.lanes=n,e}function pc(e,t,n){return t=$t(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function lw(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Vl(0),this.expirationTimes=Vl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Vl(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Gd(e,t,n,r,i,o,s,l,c){return e=new lw(e,t,n,l,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=$t(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Rd(o),e}function cw(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ci,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function $g(e){if(!e)return lr;e=e._reactInternals;e:{if(Xr(e)!==e||e.tag!==1)throw Error(z(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(jt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(z(171))}if(e.tag===1){var n=e.type;if(jt(n))return $0(e,n,t)}return t}function Fg(e,t,n,r,i,o,s,l,c){return e=Gd(n,r,!0,e,i,o,s,l,c),e.context=$g(null),n=e.current,r=ft(),i=or(n),o=bn(r,i),o.callback=t??null,rr(n,o,i),e.current.lanes=i,ds(e,i,r),Ct(e,r),e}function yl(e,t,n,r){var i=t.current,o=ft(),s=or(i);return n=$g(n),t.context===null?t.context=n:t.pendingContext=n,t=bn(o,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=rr(i,t,s),e!==null&&(Yt(e,i,s,o),la(e,i,s)),s}function Va(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Qf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Kd(e,t){Qf(e,t),(e=e.alternate)&&Qf(e,t)}function uw(){return null}var Bg=typeof reportError=="function"?reportError:function(e){console.error(e)};function Jd(e){this._internalRoot=e}vl.prototype.render=Jd.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(z(409));yl(e,t,null,null)};vl.prototype.unmount=Jd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Vr(function(){yl(null,e,null,null)}),t[En]=null}};function vl(e){this._internalRoot=e}vl.prototype.unstable_scheduleHydration=function(e){if(e){var t=y0();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Wn.length&&t!==0&&t<Wn[n].priority;n++);Wn.splice(n,0,e),n===0&&w0(e)}};function Xd(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function wl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Hf(){}function dw(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var d=Va(s);o.call(d)}}var s=Fg(t,r,e,0,null,!1,!1,"",Hf);return e._reactRootContainer=s,e[En]=s.current,qo(e.nodeType===8?e.parentNode:e),Vr(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var d=Va(c);l.call(d)}}var c=Gd(e,0,!1,null,null,!1,!1,"",Hf);return e._reactRootContainer=c,e[En]=c.current,qo(e.nodeType===8?e.parentNode:e),Vr(function(){yl(t,c,n,r)}),c}function jl(e,t,n,r,i){var o=n._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var l=i;i=function(){var c=Va(s);l.call(c)}}yl(t,s,e,i)}else s=dw(n,t,e,i,r);return Va(s)}g0=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ko(t.pendingLanes);n!==0&&(gd(t,n|1),Ct(t,ze()),!(ue&6)&&(Wi=ze()+500,dr()))}break;case 13:Vr(function(){var r=An(e,1);if(r!==null){var i=ft();Yt(r,e,1,i)}}),Kd(e,1)}};xd=function(e){if(e.tag===13){var t=An(e,134217728);if(t!==null){var n=ft();Yt(t,e,134217728,n)}Kd(e,134217728)}};x0=function(e){if(e.tag===13){var t=or(e),n=An(e,t);if(n!==null){var r=ft();Yt(n,e,t,r)}Kd(e,t)}};y0=function(){return ve};v0=function(e,t){var n=ve;try{return ve=e,t()}finally{ve=n}};su=function(e,t,n){switch(t){case"input":if(Zc(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=dl(r);if(!i)throw Error(z(90));Jm(r),Zc(r,i)}}}break;case"textarea":Ym(e,n);break;case"select":t=n.value,t!=null&&Ci(e,!!n.multiple,t,!1)}};o0=Qd;s0=Vr;var pw={usingClientEntryPoint:!1,Events:[fs,hi,dl,r0,i0,Qd]},mo={findFiberByHostInstance:Er,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},fw={bundleType:mo.bundleType,version:mo.version,rendererPackageName:mo.rendererPackageName,rendererConfig:mo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ln.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=c0(e),e===null?null:e.stateNode},findFiberByHostInstance:mo.findFiberByHostInstance||uw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var qs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!qs.isDisabled&&qs.supportsFiber)try{al=qs.inject(fw),pn=qs}catch{}}Nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=pw;Nt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Xd(t))throw Error(z(200));return cw(e,t,null,n)};Nt.createRoot=function(e,t){if(!Xd(e))throw Error(z(299));var n=!1,r="",i=Bg;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Gd(e,1,!1,null,null,n,!1,r,i),e[En]=t.current,qo(e.nodeType===8?e.parentNode:e),new Jd(t)};Nt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(z(188)):(e=Object.keys(e).join(","),Error(z(268,e)));return e=c0(t),e=e===null?null:e.stateNode,e};Nt.flushSync=function(e){return Vr(e)};Nt.hydrate=function(e,t,n){if(!wl(t))throw Error(z(200));return jl(null,e,t,!0,n)};Nt.hydrateRoot=function(e,t,n){if(!Xd(e))throw Error(z(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",s=Bg;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=Fg(t,null,e,1,n??null,i,!1,o,s),e[En]=t.current,qo(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new vl(t)};Nt.render=function(e,t,n){if(!wl(t))throw Error(z(200));return jl(null,e,t,!1,n)};Nt.unmountComponentAtNode=function(e){if(!wl(e))throw Error(z(40));return e._reactRootContainer?(Vr(function(){jl(null,null,e,!1,function(){e._reactRootContainer=null,e[En]=null})}),!0):!1};Nt.unstable_batchedUpdates=Qd;Nt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!wl(n))throw Error(z(200));if(e==null||e._reactInternals===void 0)throw Error(z(38));return jl(e,t,n,!1,r)};Nt.version="18.3.1-next-f1338f8080-20240426";function Ug(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ug)}catch(e){console.error(e)}}Ug(),Um.exports=Nt;var Yd=Um.exports;const hw=Lm(Yd),mw=Im({__proto__:null,default:hw},[Yd]);var Wg,Vf=Yd;Wg=Vf.createRoot,Vf.hydrateRoot;/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ee(){return Ee=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ee.apply(this,arguments)}var Me;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Me||(Me={}));const qf="popstate";function gw(e){e===void 0&&(e={});function t(r,i){let{pathname:o,search:s,hash:l}=r.location;return ns("",{pathname:o,search:s,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:qr(i)}return yw(t,n,null,e)}function ae(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Qi(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function xw(){return Math.random().toString(36).substr(2,8)}function Gf(e,t){return{usr:e.state,key:e.key,idx:t}}function ns(e,t,n,r){return n===void 0&&(n=null),Ee({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?pr(t):t,{state:n,key:t&&t.key||r||xw()})}function qr(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function pr(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function yw(e,t,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:o=!1}=r,s=i.history,l=Me.Pop,c=null,d=f();d==null&&(d=0,s.replaceState(Ee({},s.state,{idx:d}),""));function f(){return(s.state||{idx:null}).idx}function p(){l=Me.Pop;let C=f(),m=C==null?null:C-d;d=C,c&&c({action:l,location:y.location,delta:m})}function g(C,m){l=Me.Push;let h=ns(y.location,C,m);d=f()+1;let x=Gf(h,d),b=y.createHref(h);try{s.pushState(x,"",b)}catch(E){if(E instanceof DOMException&&E.name==="DataCloneError")throw E;i.location.assign(b)}o&&c&&c({action:l,location:y.location,delta:1})}function w(C,m){l=Me.Replace;let h=ns(y.location,C,m);d=f();let x=Gf(h,d),b=y.createHref(h);s.replaceState(x,"",b),o&&c&&c({action:l,location:y.location,delta:0})}function v(C){let m=i.location.origin!=="null"?i.location.origin:i.location.href,h=typeof C=="string"?C:qr(C);return h=h.replace(/ $/,"%20"),ae(m,"No window.location.(origin|href) available to create URL for href: "+h),new URL(h,m)}let y={get action(){return l},get location(){return e(i,s)},listen(C){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(qf,p),c=C,()=>{i.removeEventListener(qf,p),c=null}},createHref(C){return t(i,C)},createURL:v,encodeLocation(C){let m=v(C);return{pathname:m.pathname,search:m.search,hash:m.hash}},push:g,replace:w,go(C){return s.go(C)}};return y}var we;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(we||(we={}));const vw=new Set(["lazy","caseSensitive","path","id","index","children"]);function ww(e){return e.index===!0}function qa(e,t,n,r){return n===void 0&&(n=[]),r===void 0&&(r={}),e.map((i,o)=>{let s=[...n,String(o)],l=typeof i.id=="string"?i.id:s.join("-");if(ae(i.index!==!0||!i.children,"Cannot specify children on an index route"),ae(!r[l],'Found a route id collision on id "'+l+`".  Route id's must be globally unique within Data Router usages`),ww(i)){let c=Ee({},i,t(i),{id:l});return r[l]=c,c}else{let c=Ee({},i,t(i),{id:l,children:void 0});return r[l]=c,i.children&&(c.children=qa(i.children,t,s,r)),c}})}function kr(e,t,n){return n===void 0&&(n="/"),ma(e,t,n,!1)}function ma(e,t,n,r){let i=typeof t=="string"?pr(t):t,o=Zi(i.pathname||"/",n);if(o==null)return null;let s=Qg(e);Cw(s);let l=null;for(let c=0;l==null&&c<s.length;++c){let d=Dw(o);l=Rw(s[c],d,r)}return l}function jw(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],handle:n.handle}}function Qg(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(o,s,l)=>{let c={relativePath:l===void 0?o.path||"":l,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};c.relativePath.startsWith("/")&&(ae(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let d=kn([r,c.relativePath]),f=n.concat(c);o.children&&o.children.length>0&&(ae(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Qg(o.children,t,f,d)),!(o.path==null&&!o.index)&&t.push({path:d,score:Iw(d,o.index),routesMeta:f})};return e.forEach((o,s)=>{var l;if(o.path===""||!((l=o.path)!=null&&l.includes("?")))i(o,s);else for(let c of Hg(o.path))i(o,s,c)}),t}function Hg(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,i=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return i?[o,""]:[o];let s=Hg(r.join("/")),l=[];return l.push(...s.map(c=>c===""?o:[o,c].join("/"))),i&&l.push(...s),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Cw(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Lw(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Sw=/^:[\w-]+$/,bw=3,kw=2,Pw=1,Ew=10,Aw=-2,Kf=e=>e==="*";function Iw(e,t){let n=e.split("/"),r=n.length;return n.some(Kf)&&(r+=Aw),t&&(r+=kw),n.filter(i=>!Kf(i)).reduce((i,o)=>i+(Sw.test(o)?bw:o===""?Pw:Ew),r)}function Lw(e,t){return e.length===t.length&&e.slice(0,-1).every((r,i)=>r===t[i])?e[e.length-1]-t[t.length-1]:0}function Rw(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,i={},o="/",s=[];for(let l=0;l<r.length;++l){let c=r[l],d=l===r.length-1,f=o==="/"?t:t.slice(o.length)||"/",p=Jf({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},f),g=c.route;if(!p&&d&&n&&!r[r.length-1].route.index&&(p=Jf({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},f)),!p)return null;Object.assign(i,p.params),s.push({params:i,pathname:kn([o,p.pathname]),pathnameBase:zw(kn([o,p.pathnameBase])),route:g}),p.pathnameBase!=="/"&&(o=kn([o,p.pathnameBase]))}return s}function Jf(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Tw(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let o=i[0],s=o.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:r.reduce((d,f,p)=>{let{paramName:g,isOptional:w}=f;if(g==="*"){let y=l[p]||"";s=o.slice(0,o.length-y.length).replace(/(.)\/+$/,"$1")}const v=l[p];return w&&!v?d[g]=void 0:d[g]=(v||"").replace(/%2F/g,"/"),d},{}),pathname:o,pathnameBase:s,pattern:e}}function Tw(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Qi(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),r]}function Dw(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Qi(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Zi(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function Nw(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:i=""}=typeof e=="string"?pr(e):e;return{pathname:n?n.startsWith("/")?n:Ow(n,t):t,search:_w(r),hash:Mw(i)}}function Ow(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function fc(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Vg(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Zd(e,t){let n=Vg(e);return t?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function ep(e,t,n,r){r===void 0&&(r=!1);let i;typeof e=="string"?i=pr(e):(i=Ee({},e),ae(!i.pathname||!i.pathname.includes("?"),fc("?","pathname","search",i)),ae(!i.pathname||!i.pathname.includes("#"),fc("#","pathname","hash",i)),ae(!i.search||!i.search.includes("#"),fc("#","search","hash",i)));let o=e===""||i.pathname==="",s=o?"/":i.pathname,l;if(s==null)l=n;else{let p=t.length-1;if(!r&&s.startsWith("..")){let g=s.split("/");for(;g[0]==="..";)g.shift(),p-=1;i.pathname=g.join("/")}l=p>=0?t[p]:"/"}let c=Nw(i,l),d=s&&s!=="/"&&s.endsWith("/"),f=(o||s===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||f)&&(c.pathname+="/"),c}const kn=e=>e.join("/").replace(/\/\/+/g,"/"),zw=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),_w=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Mw=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;class Ga{constructor(t,n,r,i){i===void 0&&(i=!1),this.status=t,this.statusText=n||"",this.internal=i,r instanceof Error?(this.data=r.toString(),this.error=r):this.data=r}}function ms(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const qg=["post","put","patch","delete"],$w=new Set(qg),Fw=["get",...qg],Bw=new Set(Fw),Uw=new Set([301,302,303,307,308]),Ww=new Set([307,308]),hc={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},Qw={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},go={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},tp=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Hw=e=>({hasErrorBoundary:!!e.hasErrorBoundary}),Gg="remix-router-transitions";function Vw(e){const t=e.window?e.window:typeof window<"u"?window:void 0,n=typeof t<"u"&&typeof t.document<"u"&&typeof t.document.createElement<"u",r=!n;ae(e.routes.length>0,"You must provide a non-empty routes array to createRouter");let i;if(e.mapRouteProperties)i=e.mapRouteProperties;else if(e.detectErrorBoundary){let S=e.detectErrorBoundary;i=P=>({hasErrorBoundary:S(P)})}else i=Hw;let o={},s=qa(e.routes,i,void 0,o),l,c=e.basename||"/",d=e.dataStrategy||Jw,f=e.patchRoutesOnNavigation,p=Ee({v7_fetcherPersist:!1,v7_normalizeFormMethod:!1,v7_partialHydration:!1,v7_prependBasename:!1,v7_relativeSplatPath:!1,v7_skipActionErrorRevalidation:!1},e.future),g=null,w=new Set,v=null,y=null,C=null,m=e.hydrationData!=null,h=kr(s,e.history.location,c),x=null;if(h==null&&!f){let S=gt(404,{pathname:e.history.location.pathname}),{matches:P,route:A}=ah(s);h=P,x={[A.id]:S}}h&&!e.hydrationData&&Ps(h,s,e.history.location.pathname).active&&(h=null);let b;if(h)if(h.some(S=>S.route.lazy))b=!1;else if(!h.some(S=>S.route.loader))b=!0;else if(p.v7_partialHydration){let S=e.hydrationData?e.hydrationData.loaderData:null,P=e.hydrationData?e.hydrationData.errors:null;if(P){let A=h.findIndex(O=>P[O.route.id]!==void 0);b=h.slice(0,A+1).every(O=>!Fu(O.route,S,P))}else b=h.every(A=>!Fu(A.route,S,P))}else b=e.hydrationData!=null;else if(b=!1,h=[],p.v7_partialHydration){let S=Ps(null,s,e.history.location.pathname);S.active&&S.matches&&(h=S.matches)}let E,j={historyAction:e.history.action,location:e.history.location,matches:h,initialized:b,navigation:hc,restoreScrollPosition:e.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:e.hydrationData&&e.hydrationData.loaderData||{},actionData:e.hydrationData&&e.hydrationData.actionData||null,errors:e.hydrationData&&e.hydrationData.errors||x,fetchers:new Map,blockers:new Map},I=Me.Pop,R=!1,N,M=!1,ee=new Map,le=null,he=!1,me=!1,Ge=[],Ke=new Set,_=new Map,T=0,$=-1,H=new Map,Z=new Set,ne=new Map,Ue=new Map,ye=new Set,J=new Map,X=new Map,F;function q(){if(g=e.history.listen(S=>{let{action:P,location:A,delta:O}=S;if(F){F(),F=void 0;return}Qi(X.size===0||O!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let U=Tp({currentLocation:j.location,nextLocation:A,historyAction:P});if(U&&O!=null){let G=new Promise(Y=>{F=Y});e.history.go(O*-1),ks(U,{state:"blocked",location:A,proceed(){ks(U,{state:"proceeding",proceed:void 0,reset:void 0,location:A}),G.then(()=>e.history.go(O))},reset(){let Y=new Map(j.blockers);Y.set(U,go),je({blockers:Y})}});return}return mr(P,A)}),n){u2(t,ee);let S=()=>d2(t,ee);t.addEventListener("pagehide",S),le=()=>t.removeEventListener("pagehide",S)}return j.initialized||mr(Me.Pop,j.location,{initialHydration:!0}),E}function pe(){g&&g(),le&&le(),w.clear(),N&&N.abort(),j.fetchers.forEach((S,P)=>bs(P)),j.blockers.forEach((S,P)=>Rp(P))}function Je(S){return w.add(S),()=>w.delete(S)}function je(S,P){P===void 0&&(P={}),j=Ee({},j,S);let A=[],O=[];p.v7_fetcherPersist&&j.fetchers.forEach((U,G)=>{U.state==="idle"&&(ye.has(G)?O.push(G):A.push(G))}),[...w].forEach(U=>U(j,{deletedFetchers:O,viewTransitionOpts:P.viewTransitionOpts,flushSync:P.flushSync===!0})),p.v7_fetcherPersist&&(A.forEach(U=>j.fetchers.delete(U)),O.forEach(U=>bs(U)))}function ct(S,P,A){var O,U;let{flushSync:G}=A===void 0?{}:A,Y=j.actionData!=null&&j.navigation.formMethod!=null&&Kt(j.navigation.formMethod)&&j.navigation.state==="loading"&&((O=S.state)==null?void 0:O._isRedirect)!==!0,Q;P.actionData?Object.keys(P.actionData).length>0?Q=P.actionData:Q=null:Y?Q=j.actionData:Q=null;let V=P.loaderData?oh(j.loaderData,P.loaderData,P.matches||[],P.errors):j.loaderData,W=j.blockers;W.size>0&&(W=new Map(W),W.forEach((ce,Xe)=>W.set(Xe,go)));let K=R===!0||j.navigation.formMethod!=null&&Kt(j.navigation.formMethod)&&((U=S.state)==null?void 0:U._isRedirect)!==!0;l&&(s=l,l=void 0),he||I===Me.Pop||(I===Me.Push?e.history.push(S,S.state):I===Me.Replace&&e.history.replace(S,S.state));let se;if(I===Me.Pop){let ce=ee.get(j.location.pathname);ce&&ce.has(S.pathname)?se={currentLocation:j.location,nextLocation:S}:ee.has(S.pathname)&&(se={currentLocation:S,nextLocation:j.location})}else if(M){let ce=ee.get(j.location.pathname);ce?ce.add(S.pathname):(ce=new Set([S.pathname]),ee.set(j.location.pathname,ce)),se={currentLocation:j.location,nextLocation:S}}je(Ee({},P,{actionData:Q,loaderData:V,historyAction:I,location:S,initialized:!0,navigation:hc,revalidation:"idle",restoreScrollPosition:Np(S,P.matches||j.matches),preventScrollReset:K,blockers:W}),{viewTransitionOpts:se,flushSync:G===!0}),I=Me.Pop,R=!1,M=!1,he=!1,me=!1,Ge=[]}async function bp(S,P){if(typeof S=="number"){e.history.go(S);return}let A=$u(j.location,j.matches,c,p.v7_prependBasename,S,p.v7_relativeSplatPath,P==null?void 0:P.fromRouteId,P==null?void 0:P.relative),{path:O,submission:U,error:G}=Xf(p.v7_normalizeFormMethod,!1,A,P),Y=j.location,Q=ns(j.location,O,P&&P.state);Q=Ee({},Q,e.history.encodeLocation(Q));let V=P&&P.replace!=null?P.replace:void 0,W=Me.Push;V===!0?W=Me.Replace:V===!1||U!=null&&Kt(U.formMethod)&&U.formAction===j.location.pathname+j.location.search&&(W=Me.Replace);let K=P&&"preventScrollReset"in P?P.preventScrollReset===!0:void 0,se=(P&&P.flushSync)===!0,ce=Tp({currentLocation:Y,nextLocation:Q,historyAction:W});if(ce){ks(ce,{state:"blocked",location:Q,proceed(){ks(ce,{state:"proceeding",proceed:void 0,reset:void 0,location:Q}),bp(S,P)},reset(){let Xe=new Map(j.blockers);Xe.set(ce,go),je({blockers:Xe})}});return}return await mr(W,Q,{submission:U,pendingError:G,preventScrollReset:K,replace:P&&P.replace,enableViewTransition:P&&P.viewTransition,flushSync:se})}function A1(){if(zl(),je({revalidation:"loading"}),j.navigation.state!=="submitting"){if(j.navigation.state==="idle"){mr(j.historyAction,j.location,{startUninterruptedRevalidation:!0});return}mr(I||j.historyAction,j.navigation.location,{overrideNavigation:j.navigation,enableViewTransition:M===!0})}}async function mr(S,P,A){N&&N.abort(),N=null,I=S,he=(A&&A.startUninterruptedRevalidation)===!0,M1(j.location,j.matches),R=(A&&A.preventScrollReset)===!0,M=(A&&A.enableViewTransition)===!0;let O=l||s,U=A&&A.overrideNavigation,G=kr(O,P,c),Y=(A&&A.flushSync)===!0,Q=Ps(G,O,P.pathname);if(Q.active&&Q.matches&&(G=Q.matches),!G){let{error:Ce,notFoundMatches:fe,route:Te}=_l(P.pathname);ct(P,{matches:fe,loaderData:{},errors:{[Te.id]:Ce}},{flushSync:Y});return}if(j.initialized&&!me&&n2(j.location,P)&&!(A&&A.submission&&Kt(A.submission.formMethod))){ct(P,{matches:G},{flushSync:Y});return}N=new AbortController;let V=ri(e.history,P,N.signal,A&&A.submission),W;if(A&&A.pendingError)W=[Pr(G).route.id,{type:we.error,error:A.pendingError}];else if(A&&A.submission&&Kt(A.submission.formMethod)){let Ce=await I1(V,P,A.submission,G,Q.active,{replace:A.replace,flushSync:Y});if(Ce.shortCircuited)return;if(Ce.pendingActionResult){let[fe,Te]=Ce.pendingActionResult;if(At(Te)&&ms(Te.error)&&Te.error.status===404){N=null,ct(P,{matches:Ce.matches,loaderData:{},errors:{[fe]:Te.error}});return}}G=Ce.matches||G,W=Ce.pendingActionResult,U=mc(P,A.submission),Y=!1,Q.active=!1,V=ri(e.history,V.url,V.signal)}let{shortCircuited:K,matches:se,loaderData:ce,errors:Xe}=await L1(V,P,G,Q.active,U,A&&A.submission,A&&A.fetcherSubmission,A&&A.replace,A&&A.initialHydration===!0,Y,W);K||(N=null,ct(P,Ee({matches:se||G},sh(W),{loaderData:ce,errors:Xe})))}async function I1(S,P,A,O,U,G){G===void 0&&(G={}),zl();let Y=l2(P,A);if(je({navigation:Y},{flushSync:G.flushSync===!0}),U){let W=await Es(O,P.pathname,S.signal);if(W.type==="aborted")return{shortCircuited:!0};if(W.type==="error"){let K=Pr(W.partialMatches).route.id;return{matches:W.partialMatches,pendingActionResult:[K,{type:we.error,error:W.error}]}}else if(W.matches)O=W.matches;else{let{notFoundMatches:K,error:se,route:ce}=_l(P.pathname);return{matches:K,pendingActionResult:[ce.id,{type:we.error,error:se}]}}}let Q,V=Eo(O,P);if(!V.route.action&&!V.route.lazy)Q={type:we.error,error:gt(405,{method:S.method,pathname:P.pathname,routeId:V.route.id})};else if(Q=(await ro("action",j,S,[V],O,null))[V.route.id],S.signal.aborted)return{shortCircuited:!0};if(Lr(Q)){let W;return G&&G.replace!=null?W=G.replace:W=nh(Q.response.headers.get("Location"),new URL(S.url),c)===j.location.pathname+j.location.search,await gr(S,Q,!0,{submission:A,replace:W}),{shortCircuited:!0}}if(Yn(Q))throw gt(400,{type:"defer-action"});if(At(Q)){let W=Pr(O,V.route.id);return(G&&G.replace)!==!0&&(I=Me.Push),{matches:O,pendingActionResult:[W.route.id,Q]}}return{matches:O,pendingActionResult:[V.route.id,Q]}}async function L1(S,P,A,O,U,G,Y,Q,V,W,K){let se=U||mc(P,G),ce=G||Y||ch(se),Xe=!he&&(!p.v7_partialHydration||!V);if(O){if(Xe){let De=kp(K);je(Ee({navigation:se},De!==void 0?{actionData:De}:{}),{flushSync:W})}let de=await Es(A,P.pathname,S.signal);if(de.type==="aborted")return{shortCircuited:!0};if(de.type==="error"){let De=Pr(de.partialMatches).route.id;return{matches:de.partialMatches,loaderData:{},errors:{[De]:de.error}}}else if(de.matches)A=de.matches;else{let{error:De,notFoundMatches:ei,route:so}=_l(P.pathname);return{matches:ei,loaderData:{},errors:{[so.id]:De}}}}let Ce=l||s,[fe,Te]=Zf(e.history,j,A,ce,P,p.v7_partialHydration&&V===!0,p.v7_skipActionErrorRevalidation,me,Ge,Ke,ye,ne,Z,Ce,c,K);if(Ml(de=>!(A&&A.some(De=>De.route.id===de))||fe&&fe.some(De=>De.route.id===de)),$=++T,fe.length===0&&Te.length===0){let de=Ip();return ct(P,Ee({matches:A,loaderData:{},errors:K&&At(K[1])?{[K[0]]:K[1].error}:null},sh(K),de?{fetchers:new Map(j.fetchers)}:{}),{flushSync:W}),{shortCircuited:!0}}if(Xe){let de={};if(!O){de.navigation=se;let De=kp(K);De!==void 0&&(de.actionData=De)}Te.length>0&&(de.fetchers=R1(Te)),je(de,{flushSync:W})}Te.forEach(de=>{Nn(de.key),de.controller&&_.set(de.key,de.controller)});let Zr=()=>Te.forEach(de=>Nn(de.key));N&&N.signal.addEventListener("abort",Zr);let{loaderResults:io,fetcherResults:xn}=await Pp(j,A,fe,Te,S);if(S.signal.aborted)return{shortCircuited:!0};N&&N.signal.removeEventListener("abort",Zr),Te.forEach(de=>_.delete(de.key));let nn=Gs(io);if(nn)return await gr(S,nn.result,!0,{replace:Q}),{shortCircuited:!0};if(nn=Gs(xn),nn)return Z.add(nn.key),await gr(S,nn.result,!0,{replace:Q}),{shortCircuited:!0};let{loaderData:$l,errors:oo}=ih(j,A,io,K,Te,xn,J);J.forEach((de,De)=>{de.subscribe(ei=>{(ei||de.done)&&J.delete(De)})}),p.v7_partialHydration&&V&&j.errors&&(oo=Ee({},j.errors,oo));let xr=Ip(),As=Lp($),Is=xr||As||Te.length>0;return Ee({matches:A,loaderData:$l,errors:oo},Is?{fetchers:new Map(j.fetchers)}:{})}function kp(S){if(S&&!At(S[1]))return{[S[0]]:S[1].data};if(j.actionData)return Object.keys(j.actionData).length===0?null:j.actionData}function R1(S){return S.forEach(P=>{let A=j.fetchers.get(P.key),O=xo(void 0,A?A.data:void 0);j.fetchers.set(P.key,O)}),new Map(j.fetchers)}function T1(S,P,A,O){if(r)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");Nn(S);let U=(O&&O.flushSync)===!0,G=l||s,Y=$u(j.location,j.matches,c,p.v7_prependBasename,A,p.v7_relativeSplatPath,P,O==null?void 0:O.relative),Q=kr(G,Y,c),V=Ps(Q,G,Y);if(V.active&&V.matches&&(Q=V.matches),!Q){gn(S,P,gt(404,{pathname:Y}),{flushSync:U});return}let{path:W,submission:K,error:se}=Xf(p.v7_normalizeFormMethod,!0,Y,O);if(se){gn(S,P,se,{flushSync:U});return}let ce=Eo(Q,W),Xe=(O&&O.preventScrollReset)===!0;if(K&&Kt(K.formMethod)){D1(S,P,W,ce,Q,V.active,U,Xe,K);return}ne.set(S,{routeId:P,path:W}),N1(S,P,W,ce,Q,V.active,U,Xe,K)}async function D1(S,P,A,O,U,G,Y,Q,V){zl(),ne.delete(S);function W(_e){if(!_e.route.action&&!_e.route.lazy){let ti=gt(405,{method:V.formMethod,pathname:A,routeId:P});return gn(S,P,ti,{flushSync:Y}),!0}return!1}if(!G&&W(O))return;let K=j.fetchers.get(S);Dn(S,c2(V,K),{flushSync:Y});let se=new AbortController,ce=ri(e.history,A,se.signal,V);if(G){let _e=await Es(U,A,ce.signal);if(_e.type==="aborted")return;if(_e.type==="error"){gn(S,P,_e.error,{flushSync:Y});return}else if(_e.matches){if(U=_e.matches,O=Eo(U,A),W(O))return}else{gn(S,P,gt(404,{pathname:A}),{flushSync:Y});return}}_.set(S,se);let Xe=T,fe=(await ro("action",j,ce,[O],U,S))[O.route.id];if(ce.signal.aborted){_.get(S)===se&&_.delete(S);return}if(p.v7_fetcherPersist&&ye.has(S)){if(Lr(fe)||At(fe)){Dn(S,Mn(void 0));return}}else{if(Lr(fe))if(_.delete(S),$>Xe){Dn(S,Mn(void 0));return}else return Z.add(S),Dn(S,xo(V)),gr(ce,fe,!1,{fetcherSubmission:V,preventScrollReset:Q});if(At(fe)){gn(S,P,fe.error);return}}if(Yn(fe))throw gt(400,{type:"defer-action"});let Te=j.navigation.location||j.location,Zr=ri(e.history,Te,se.signal),io=l||s,xn=j.navigation.state!=="idle"?kr(io,j.navigation.location,c):j.matches;ae(xn,"Didn't find any matches after fetcher action");let nn=++T;H.set(S,nn);let $l=xo(V,fe.data);j.fetchers.set(S,$l);let[oo,xr]=Zf(e.history,j,xn,V,Te,!1,p.v7_skipActionErrorRevalidation,me,Ge,Ke,ye,ne,Z,io,c,[O.route.id,fe]);xr.filter(_e=>_e.key!==S).forEach(_e=>{let ti=_e.key,Op=j.fetchers.get(ti),B1=xo(void 0,Op?Op.data:void 0);j.fetchers.set(ti,B1),Nn(ti),_e.controller&&_.set(ti,_e.controller)}),je({fetchers:new Map(j.fetchers)});let As=()=>xr.forEach(_e=>Nn(_e.key));se.signal.addEventListener("abort",As);let{loaderResults:Is,fetcherResults:de}=await Pp(j,xn,oo,xr,Zr);if(se.signal.aborted)return;se.signal.removeEventListener("abort",As),H.delete(S),_.delete(S),xr.forEach(_e=>_.delete(_e.key));let De=Gs(Is);if(De)return gr(Zr,De.result,!1,{preventScrollReset:Q});if(De=Gs(de),De)return Z.add(De.key),gr(Zr,De.result,!1,{preventScrollReset:Q});let{loaderData:ei,errors:so}=ih(j,xn,Is,void 0,xr,de,J);if(j.fetchers.has(S)){let _e=Mn(fe.data);j.fetchers.set(S,_e)}Lp(nn),j.navigation.state==="loading"&&nn>$?(ae(I,"Expected pending action"),N&&N.abort(),ct(j.navigation.location,{matches:xn,loaderData:ei,errors:so,fetchers:new Map(j.fetchers)})):(je({errors:so,loaderData:oh(j.loaderData,ei,xn,so),fetchers:new Map(j.fetchers)}),me=!1)}async function N1(S,P,A,O,U,G,Y,Q,V){let W=j.fetchers.get(S);Dn(S,xo(V,W?W.data:void 0),{flushSync:Y});let K=new AbortController,se=ri(e.history,A,K.signal);if(G){let fe=await Es(U,A,se.signal);if(fe.type==="aborted")return;if(fe.type==="error"){gn(S,P,fe.error,{flushSync:Y});return}else if(fe.matches)U=fe.matches,O=Eo(U,A);else{gn(S,P,gt(404,{pathname:A}),{flushSync:Y});return}}_.set(S,K);let ce=T,Ce=(await ro("loader",j,se,[O],U,S))[O.route.id];if(Yn(Ce)&&(Ce=await np(Ce,se.signal,!0)||Ce),_.get(S)===K&&_.delete(S),!se.signal.aborted){if(ye.has(S)){Dn(S,Mn(void 0));return}if(Lr(Ce))if($>ce){Dn(S,Mn(void 0));return}else{Z.add(S),await gr(se,Ce,!1,{preventScrollReset:Q});return}if(At(Ce)){gn(S,P,Ce.error);return}ae(!Yn(Ce),"Unhandled fetcher deferred data"),Dn(S,Mn(Ce.data))}}async function gr(S,P,A,O){let{submission:U,fetcherSubmission:G,preventScrollReset:Y,replace:Q}=O===void 0?{}:O;P.response.headers.has("X-Remix-Revalidate")&&(me=!0);let V=P.response.headers.get("Location");ae(V,"Expected a Location header on the redirect Response"),V=nh(V,new URL(S.url),c);let W=ns(j.location,V,{_isRedirect:!0});if(n){let fe=!1;if(P.response.headers.has("X-Remix-Reload-Document"))fe=!0;else if(tp.test(V)){const Te=e.history.createURL(V);fe=Te.origin!==t.location.origin||Zi(Te.pathname,c)==null}if(fe){Q?t.location.replace(V):t.location.assign(V);return}}N=null;let K=Q===!0||P.response.headers.has("X-Remix-Replace")?Me.Replace:Me.Push,{formMethod:se,formAction:ce,formEncType:Xe}=j.navigation;!U&&!G&&se&&ce&&Xe&&(U=ch(j.navigation));let Ce=U||G;if(Ww.has(P.response.status)&&Ce&&Kt(Ce.formMethod))await mr(K,W,{submission:Ee({},Ce,{formAction:V}),preventScrollReset:Y||R,enableViewTransition:A?M:void 0});else{let fe=mc(W,U);await mr(K,W,{overrideNavigation:fe,fetcherSubmission:G,preventScrollReset:Y||R,enableViewTransition:A?M:void 0})}}async function ro(S,P,A,O,U,G){let Y,Q={};try{Y=await Xw(d,S,P,A,O,U,G,o,i)}catch(V){return O.forEach(W=>{Q[W.route.id]={type:we.error,error:V}}),Q}for(let[V,W]of Object.entries(Y))if(r2(W)){let K=W.result;Q[V]={type:we.redirect,response:e2(K,A,V,U,c,p.v7_relativeSplatPath)}}else Q[V]=await Zw(W);return Q}async function Pp(S,P,A,O,U){let G=S.matches,Y=ro("loader",S,U,A,P,null),Q=Promise.all(O.map(async K=>{if(K.matches&&K.match&&K.controller){let ce=(await ro("loader",S,ri(e.history,K.path,K.controller.signal),[K.match],K.matches,K.key))[K.match.route.id];return{[K.key]:ce}}else return Promise.resolve({[K.key]:{type:we.error,error:gt(404,{pathname:K.path})}})})),V=await Y,W=(await Q).reduce((K,se)=>Object.assign(K,se),{});return await Promise.all([s2(P,V,U.signal,G,S.loaderData),a2(P,W,O)]),{loaderResults:V,fetcherResults:W}}function zl(){me=!0,Ge.push(...Ml()),ne.forEach((S,P)=>{_.has(P)&&Ke.add(P),Nn(P)})}function Dn(S,P,A){A===void 0&&(A={}),j.fetchers.set(S,P),je({fetchers:new Map(j.fetchers)},{flushSync:(A&&A.flushSync)===!0})}function gn(S,P,A,O){O===void 0&&(O={});let U=Pr(j.matches,P);bs(S),je({errors:{[U.route.id]:A},fetchers:new Map(j.fetchers)},{flushSync:(O&&O.flushSync)===!0})}function Ep(S){return p.v7_fetcherPersist&&(Ue.set(S,(Ue.get(S)||0)+1),ye.has(S)&&ye.delete(S)),j.fetchers.get(S)||Qw}function bs(S){let P=j.fetchers.get(S);_.has(S)&&!(P&&P.state==="loading"&&H.has(S))&&Nn(S),ne.delete(S),H.delete(S),Z.delete(S),ye.delete(S),Ke.delete(S),j.fetchers.delete(S)}function O1(S){if(p.v7_fetcherPersist){let P=(Ue.get(S)||0)-1;P<=0?(Ue.delete(S),ye.add(S)):Ue.set(S,P)}else bs(S);je({fetchers:new Map(j.fetchers)})}function Nn(S){let P=_.get(S);P&&(P.abort(),_.delete(S))}function Ap(S){for(let P of S){let A=Ep(P),O=Mn(A.data);j.fetchers.set(P,O)}}function Ip(){let S=[],P=!1;for(let A of Z){let O=j.fetchers.get(A);ae(O,"Expected fetcher: "+A),O.state==="loading"&&(Z.delete(A),S.push(A),P=!0)}return Ap(S),P}function Lp(S){let P=[];for(let[A,O]of H)if(O<S){let U=j.fetchers.get(A);ae(U,"Expected fetcher: "+A),U.state==="loading"&&(Nn(A),H.delete(A),P.push(A))}return Ap(P),P.length>0}function z1(S,P){let A=j.blockers.get(S)||go;return X.get(S)!==P&&X.set(S,P),A}function Rp(S){j.blockers.delete(S),X.delete(S)}function ks(S,P){let A=j.blockers.get(S)||go;ae(A.state==="unblocked"&&P.state==="blocked"||A.state==="blocked"&&P.state==="blocked"||A.state==="blocked"&&P.state==="proceeding"||A.state==="blocked"&&P.state==="unblocked"||A.state==="proceeding"&&P.state==="unblocked","Invalid blocker state transition: "+A.state+" -> "+P.state);let O=new Map(j.blockers);O.set(S,P),je({blockers:O})}function Tp(S){let{currentLocation:P,nextLocation:A,historyAction:O}=S;if(X.size===0)return;X.size>1&&Qi(!1,"A router only supports one blocker at a time");let U=Array.from(X.entries()),[G,Y]=U[U.length-1],Q=j.blockers.get(G);if(!(Q&&Q.state==="proceeding")&&Y({currentLocation:P,nextLocation:A,historyAction:O}))return G}function _l(S){let P=gt(404,{pathname:S}),A=l||s,{matches:O,route:U}=ah(A);return Ml(),{notFoundMatches:O,route:U,error:P}}function Ml(S){let P=[];return J.forEach((A,O)=>{(!S||S(O))&&(A.cancel(),P.push(O),J.delete(O))}),P}function _1(S,P,A){if(v=S,C=P,y=A||null,!m&&j.navigation===hc){m=!0;let O=Np(j.location,j.matches);O!=null&&je({restoreScrollPosition:O})}return()=>{v=null,C=null,y=null}}function Dp(S,P){return y&&y(S,P.map(O=>jw(O,j.loaderData)))||S.key}function M1(S,P){if(v&&C){let A=Dp(S,P);v[A]=C()}}function Np(S,P){if(v){let A=Dp(S,P),O=v[A];if(typeof O=="number")return O}return null}function Ps(S,P,A){if(f)if(S){if(Object.keys(S[0].params).length>0)return{active:!0,matches:ma(P,A,c,!0)}}else return{active:!0,matches:ma(P,A,c,!0)||[]};return{active:!1,matches:null}}async function Es(S,P,A){if(!f)return{type:"success",matches:S};let O=S;for(;;){let U=l==null,G=l||s,Y=o;try{await f({path:P,matches:O,patch:(W,K)=>{A.aborted||th(W,K,G,Y,i)}})}catch(W){return{type:"error",error:W,partialMatches:O}}finally{U&&!A.aborted&&(s=[...s])}if(A.aborted)return{type:"aborted"};let Q=kr(G,P,c);if(Q)return{type:"success",matches:Q};let V=ma(G,P,c,!0);if(!V||O.length===V.length&&O.every((W,K)=>W.route.id===V[K].route.id))return{type:"success",matches:null};O=V}}function $1(S){o={},l=qa(S,i,void 0,o)}function F1(S,P){let A=l==null;th(S,P,l||s,o,i),A&&(s=[...s],je({}))}return E={get basename(){return c},get future(){return p},get state(){return j},get routes(){return s},get window(){return t},initialize:q,subscribe:Je,enableScrollRestoration:_1,navigate:bp,fetch:T1,revalidate:A1,createHref:S=>e.history.createHref(S),encodeLocation:S=>e.history.encodeLocation(S),getFetcher:Ep,deleteFetcher:O1,dispose:pe,getBlocker:z1,deleteBlocker:Rp,patchRoutes:F1,_internalFetchControllers:_,_internalActiveDeferreds:J,_internalSetRoutes:$1},E}function qw(e){return e!=null&&("formData"in e&&e.formData!=null||"body"in e&&e.body!==void 0)}function $u(e,t,n,r,i,o,s,l){let c,d;if(s){c=[];for(let p of t)if(c.push(p),p.route.id===s){d=p;break}}else c=t,d=t[t.length-1];let f=ep(i||".",Zd(c,o),Zi(e.pathname,n)||e.pathname,l==="path");if(i==null&&(f.search=e.search,f.hash=e.hash),(i==null||i===""||i===".")&&d){let p=rp(f.search);if(d.route.index&&!p)f.search=f.search?f.search.replace(/^\?/,"?index&"):"?index";else if(!d.route.index&&p){let g=new URLSearchParams(f.search),w=g.getAll("index");g.delete("index"),w.filter(y=>y).forEach(y=>g.append("index",y));let v=g.toString();f.search=v?"?"+v:""}}return r&&n!=="/"&&(f.pathname=f.pathname==="/"?n:kn([n,f.pathname])),qr(f)}function Xf(e,t,n,r){if(!r||!qw(r))return{path:n};if(r.formMethod&&!o2(r.formMethod))return{path:n,error:gt(405,{method:r.formMethod})};let i=()=>({path:n,error:gt(400,{type:"invalid-body"})}),o=r.formMethod||"get",s=e?o.toUpperCase():o.toLowerCase(),l=Xg(n);if(r.body!==void 0){if(r.formEncType==="text/plain"){if(!Kt(s))return i();let g=typeof r.body=="string"?r.body:r.body instanceof FormData||r.body instanceof URLSearchParams?Array.from(r.body.entries()).reduce((w,v)=>{let[y,C]=v;return""+w+y+"="+C+`
`},""):String(r.body);return{path:n,submission:{formMethod:s,formAction:l,formEncType:r.formEncType,formData:void 0,json:void 0,text:g}}}else if(r.formEncType==="application/json"){if(!Kt(s))return i();try{let g=typeof r.body=="string"?JSON.parse(r.body):r.body;return{path:n,submission:{formMethod:s,formAction:l,formEncType:r.formEncType,formData:void 0,json:g,text:void 0}}}catch{return i()}}}ae(typeof FormData=="function","FormData is not available in this environment");let c,d;if(r.formData)c=Bu(r.formData),d=r.formData;else if(r.body instanceof FormData)c=Bu(r.body),d=r.body;else if(r.body instanceof URLSearchParams)c=r.body,d=rh(c);else if(r.body==null)c=new URLSearchParams,d=new FormData;else try{c=new URLSearchParams(r.body),d=rh(c)}catch{return i()}let f={formMethod:s,formAction:l,formEncType:r&&r.formEncType||"application/x-www-form-urlencoded",formData:d,json:void 0,text:void 0};if(Kt(f.formMethod))return{path:n,submission:f};let p=pr(n);return t&&p.search&&rp(p.search)&&c.append("index",""),p.search="?"+c,{path:qr(p),submission:f}}function Yf(e,t,n){n===void 0&&(n=!1);let r=e.findIndex(i=>i.route.id===t);return r>=0?e.slice(0,n?r+1:r):e}function Zf(e,t,n,r,i,o,s,l,c,d,f,p,g,w,v,y){let C=y?At(y[1])?y[1].error:y[1].data:void 0,m=e.createURL(t.location),h=e.createURL(i),x=n;o&&t.errors?x=Yf(n,Object.keys(t.errors)[0],!0):y&&At(y[1])&&(x=Yf(n,y[0]));let b=y?y[1].statusCode:void 0,E=s&&b&&b>=400,j=x.filter((R,N)=>{let{route:M}=R;if(M.lazy)return!0;if(M.loader==null)return!1;if(o)return Fu(M,t.loaderData,t.errors);if(Gw(t.loaderData,t.matches[N],R)||c.some(he=>he===R.route.id))return!0;let ee=t.matches[N],le=R;return eh(R,Ee({currentUrl:m,currentParams:ee.params,nextUrl:h,nextParams:le.params},r,{actionResult:C,actionStatus:b,defaultShouldRevalidate:E?!1:l||m.pathname+m.search===h.pathname+h.search||m.search!==h.search||Kg(ee,le)}))}),I=[];return p.forEach((R,N)=>{if(o||!n.some(me=>me.route.id===R.routeId)||f.has(N))return;let M=kr(w,R.path,v);if(!M){I.push({key:N,routeId:R.routeId,path:R.path,matches:null,match:null,controller:null});return}let ee=t.fetchers.get(N),le=Eo(M,R.path),he=!1;g.has(N)?he=!1:d.has(N)?(d.delete(N),he=!0):ee&&ee.state!=="idle"&&ee.data===void 0?he=l:he=eh(le,Ee({currentUrl:m,currentParams:t.matches[t.matches.length-1].params,nextUrl:h,nextParams:n[n.length-1].params},r,{actionResult:C,actionStatus:b,defaultShouldRevalidate:E?!1:l})),he&&I.push({key:N,routeId:R.routeId,path:R.path,matches:M,match:le,controller:new AbortController})}),[j,I]}function Fu(e,t,n){if(e.lazy)return!0;if(!e.loader)return!1;let r=t!=null&&t[e.id]!==void 0,i=n!=null&&n[e.id]!==void 0;return!r&&i?!1:typeof e.loader=="function"&&e.loader.hydrate===!0?!0:!r&&!i}function Gw(e,t,n){let r=!t||n.route.id!==t.route.id,i=e[n.route.id]===void 0;return r||i}function Kg(e,t){let n=e.route.path;return e.pathname!==t.pathname||n!=null&&n.endsWith("*")&&e.params["*"]!==t.params["*"]}function eh(e,t){if(e.route.shouldRevalidate){let n=e.route.shouldRevalidate(t);if(typeof n=="boolean")return n}return t.defaultShouldRevalidate}function th(e,t,n,r,i){var o;let s;if(e){let d=r[e];ae(d,"No route found to patch children into: routeId = "+e),d.children||(d.children=[]),s=d.children}else s=n;let l=t.filter(d=>!s.some(f=>Jg(d,f))),c=qa(l,i,[e||"_","patch",String(((o=s)==null?void 0:o.length)||"0")],r);s.push(...c)}function Jg(e,t){return"id"in e&&"id"in t&&e.id===t.id?!0:e.index===t.index&&e.path===t.path&&e.caseSensitive===t.caseSensitive?(!e.children||e.children.length===0)&&(!t.children||t.children.length===0)?!0:e.children.every((n,r)=>{var i;return(i=t.children)==null?void 0:i.some(o=>Jg(n,o))}):!1}async function Kw(e,t,n){if(!e.lazy)return;let r=await e.lazy();if(!e.lazy)return;let i=n[e.id];ae(i,"No route found in manifest");let o={};for(let s in r){let c=i[s]!==void 0&&s!=="hasErrorBoundary";Qi(!c,'Route "'+i.id+'" has a static property "'+s+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+s+'" will be ignored.')),!c&&!vw.has(s)&&(o[s]=r[s])}Object.assign(i,o),Object.assign(i,Ee({},t(i),{lazy:void 0}))}async function Jw(e){let{matches:t}=e,n=t.filter(i=>i.shouldLoad);return(await Promise.all(n.map(i=>i.resolve()))).reduce((i,o,s)=>Object.assign(i,{[n[s].route.id]:o}),{})}async function Xw(e,t,n,r,i,o,s,l,c,d){let f=o.map(w=>w.route.lazy?Kw(w.route,c,l):void 0),p=o.map((w,v)=>{let y=f[v],C=i.some(h=>h.route.id===w.route.id);return Ee({},w,{shouldLoad:C,resolve:async h=>(h&&r.method==="GET"&&(w.route.lazy||w.route.loader)&&(C=!0),C?Yw(t,r,w,y,h,d):Promise.resolve({type:we.data,result:void 0}))})}),g=await e({matches:p,request:r,params:o[0].params,fetcherKey:s,context:d});try{await Promise.all(f)}catch{}return g}async function Yw(e,t,n,r,i,o){let s,l,c=d=>{let f,p=new Promise((v,y)=>f=y);l=()=>f(),t.signal.addEventListener("abort",l);let g=v=>typeof d!="function"?Promise.reject(new Error("You cannot call the handler for a route which defines a boolean "+('"'+e+'" [routeId: '+n.route.id+"]"))):d({request:t,params:n.params,context:o},...v!==void 0?[v]:[]),w=(async()=>{try{return{type:"data",result:await(i?i(y=>g(y)):g())}}catch(v){return{type:"error",result:v}}})();return Promise.race([w,p])};try{let d=n.route[e];if(r)if(d){let f,[p]=await Promise.all([c(d).catch(g=>{f=g}),r]);if(f!==void 0)throw f;s=p}else if(await r,d=n.route[e],d)s=await c(d);else if(e==="action"){let f=new URL(t.url),p=f.pathname+f.search;throw gt(405,{method:t.method,pathname:p,routeId:n.route.id})}else return{type:we.data,result:void 0};else if(d)s=await c(d);else{let f=new URL(t.url),p=f.pathname+f.search;throw gt(404,{pathname:p})}ae(s.result!==void 0,"You defined "+(e==="action"?"an action":"a loader")+" for route "+('"'+n.route.id+"\" but didn't return anything from your `"+e+"` ")+"function. Please return a value or `null`.")}catch(d){return{type:we.error,result:d}}finally{l&&t.signal.removeEventListener("abort",l)}return s}async function Zw(e){let{result:t,type:n}=e;if(Yg(t)){let d;try{let f=t.headers.get("Content-Type");f&&/\bapplication\/json\b/.test(f)?t.body==null?d=null:d=await t.json():d=await t.text()}catch(f){return{type:we.error,error:f}}return n===we.error?{type:we.error,error:new Ga(t.status,t.statusText,d),statusCode:t.status,headers:t.headers}:{type:we.data,data:d,statusCode:t.status,headers:t.headers}}if(n===we.error){if(lh(t)){var r;if(t.data instanceof Error){var i;return{type:we.error,error:t.data,statusCode:(i=t.init)==null?void 0:i.status}}t=new Ga(((r=t.init)==null?void 0:r.status)||500,void 0,t.data)}return{type:we.error,error:t,statusCode:ms(t)?t.status:void 0}}if(i2(t)){var o,s;return{type:we.deferred,deferredData:t,statusCode:(o=t.init)==null?void 0:o.status,headers:((s=t.init)==null?void 0:s.headers)&&new Headers(t.init.headers)}}if(lh(t)){var l,c;return{type:we.data,data:t.data,statusCode:(l=t.init)==null?void 0:l.status,headers:(c=t.init)!=null&&c.headers?new Headers(t.init.headers):void 0}}return{type:we.data,data:t}}function e2(e,t,n,r,i,o){let s=e.headers.get("Location");if(ae(s,"Redirects returned/thrown from loaders/actions must have a Location header"),!tp.test(s)){let l=r.slice(0,r.findIndex(c=>c.route.id===n)+1);s=$u(new URL(t.url),l,i,!0,s,o),e.headers.set("Location",s)}return e}function nh(e,t,n){if(tp.test(e)){let r=e,i=r.startsWith("//")?new URL(t.protocol+r):new URL(r),o=Zi(i.pathname,n)!=null;if(i.origin===t.origin&&o)return i.pathname+i.search+i.hash}return e}function ri(e,t,n,r){let i=e.createURL(Xg(t)).toString(),o={signal:n};if(r&&Kt(r.formMethod)){let{formMethod:s,formEncType:l}=r;o.method=s.toUpperCase(),l==="application/json"?(o.headers=new Headers({"Content-Type":l}),o.body=JSON.stringify(r.json)):l==="text/plain"?o.body=r.text:l==="application/x-www-form-urlencoded"&&r.formData?o.body=Bu(r.formData):o.body=r.formData}return new Request(i,o)}function Bu(e){let t=new URLSearchParams;for(let[n,r]of e.entries())t.append(n,typeof r=="string"?r:r.name);return t}function rh(e){let t=new FormData;for(let[n,r]of e.entries())t.append(n,r);return t}function t2(e,t,n,r,i){let o={},s=null,l,c=!1,d={},f=n&&At(n[1])?n[1].error:void 0;return e.forEach(p=>{if(!(p.route.id in t))return;let g=p.route.id,w=t[g];if(ae(!Lr(w),"Cannot handle redirect results in processLoaderData"),At(w)){let v=w.error;f!==void 0&&(v=f,f=void 0),s=s||{};{let y=Pr(e,g);s[y.route.id]==null&&(s[y.route.id]=v)}o[g]=void 0,c||(c=!0,l=ms(w.error)?w.error.status:500),w.headers&&(d[g]=w.headers)}else Yn(w)?(r.set(g,w.deferredData),o[g]=w.deferredData.data,w.statusCode!=null&&w.statusCode!==200&&!c&&(l=w.statusCode),w.headers&&(d[g]=w.headers)):(o[g]=w.data,w.statusCode&&w.statusCode!==200&&!c&&(l=w.statusCode),w.headers&&(d[g]=w.headers))}),f!==void 0&&n&&(s={[n[0]]:f},o[n[0]]=void 0),{loaderData:o,errors:s,statusCode:l||200,loaderHeaders:d}}function ih(e,t,n,r,i,o,s){let{loaderData:l,errors:c}=t2(t,n,r,s);return i.forEach(d=>{let{key:f,match:p,controller:g}=d,w=o[f];if(ae(w,"Did not find corresponding fetcher result"),!(g&&g.signal.aborted))if(At(w)){let v=Pr(e.matches,p==null?void 0:p.route.id);c&&c[v.route.id]||(c=Ee({},c,{[v.route.id]:w.error})),e.fetchers.delete(f)}else if(Lr(w))ae(!1,"Unhandled fetcher revalidation redirect");else if(Yn(w))ae(!1,"Unhandled fetcher deferred data");else{let v=Mn(w.data);e.fetchers.set(f,v)}}),{loaderData:l,errors:c}}function oh(e,t,n,r){let i=Ee({},t);for(let o of n){let s=o.route.id;if(t.hasOwnProperty(s)?t[s]!==void 0&&(i[s]=t[s]):e[s]!==void 0&&o.route.loader&&(i[s]=e[s]),r&&r.hasOwnProperty(s))break}return i}function sh(e){return e?At(e[1])?{actionData:{}}:{actionData:{[e[0]]:e[1].data}}:{}}function Pr(e,t){return(t?e.slice(0,e.findIndex(r=>r.route.id===t)+1):[...e]).reverse().find(r=>r.route.hasErrorBoundary===!0)||e[0]}function ah(e){let t=e.length===1?e[0]:e.find(n=>n.index||!n.path||n.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:t}],route:t}}function gt(e,t){let{pathname:n,routeId:r,method:i,type:o,message:s}=t===void 0?{}:t,l="Unknown Server Error",c="Unknown @remix-run/router error";return e===400?(l="Bad Request",i&&n&&r?c="You made a "+i+' request to "'+n+'" but '+('did not provide a `loader` for route "'+r+'", ')+"so there is no way to handle the request.":o==="defer-action"?c="defer() is not supported in actions":o==="invalid-body"&&(c="Unable to encode submission body")):e===403?(l="Forbidden",c='Route "'+r+'" does not match URL "'+n+'"'):e===404?(l="Not Found",c='No route matches URL "'+n+'"'):e===405&&(l="Method Not Allowed",i&&n&&r?c="You made a "+i.toUpperCase()+' request to "'+n+'" but '+('did not provide an `action` for route "'+r+'", ')+"so there is no way to handle the request.":i&&(c='Invalid request method "'+i.toUpperCase()+'"')),new Ga(e||500,l,new Error(c),!0)}function Gs(e){let t=Object.entries(e);for(let n=t.length-1;n>=0;n--){let[r,i]=t[n];if(Lr(i))return{key:r,result:i}}}function Xg(e){let t=typeof e=="string"?pr(e):e;return qr(Ee({},t,{hash:""}))}function n2(e,t){return e.pathname!==t.pathname||e.search!==t.search?!1:e.hash===""?t.hash!=="":e.hash===t.hash?!0:t.hash!==""}function r2(e){return Yg(e.result)&&Uw.has(e.result.status)}function Yn(e){return e.type===we.deferred}function At(e){return e.type===we.error}function Lr(e){return(e&&e.type)===we.redirect}function lh(e){return typeof e=="object"&&e!=null&&"type"in e&&"data"in e&&"init"in e&&e.type==="DataWithResponseInit"}function i2(e){let t=e;return t&&typeof t=="object"&&typeof t.data=="object"&&typeof t.subscribe=="function"&&typeof t.cancel=="function"&&typeof t.resolveData=="function"}function Yg(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.headers=="object"&&typeof e.body<"u"}function o2(e){return Bw.has(e.toLowerCase())}function Kt(e){return $w.has(e.toLowerCase())}async function s2(e,t,n,r,i){let o=Object.entries(t);for(let s=0;s<o.length;s++){let[l,c]=o[s],d=e.find(g=>(g==null?void 0:g.route.id)===l);if(!d)continue;let f=r.find(g=>g.route.id===d.route.id),p=f!=null&&!Kg(f,d)&&(i&&i[d.route.id])!==void 0;Yn(c)&&p&&await np(c,n,!1).then(g=>{g&&(t[l]=g)})}}async function a2(e,t,n){for(let r=0;r<n.length;r++){let{key:i,routeId:o,controller:s}=n[r],l=t[i];e.find(d=>(d==null?void 0:d.route.id)===o)&&Yn(l)&&(ae(s,"Expected an AbortController for revalidating fetcher deferred result"),await np(l,s.signal,!0).then(d=>{d&&(t[i]=d)}))}}async function np(e,t,n){if(n===void 0&&(n=!1),!await e.deferredData.resolveData(t)){if(n)try{return{type:we.data,data:e.deferredData.unwrappedData}}catch(i){return{type:we.error,error:i}}return{type:we.data,data:e.deferredData.data}}}function rp(e){return new URLSearchParams(e).getAll("index").some(t=>t==="")}function Eo(e,t){let n=typeof t=="string"?pr(t).search:t.search;if(e[e.length-1].route.index&&rp(n||""))return e[e.length-1];let r=Vg(e);return r[r.length-1]}function ch(e){let{formMethod:t,formAction:n,formEncType:r,text:i,formData:o,json:s}=e;if(!(!t||!n||!r)){if(i!=null)return{formMethod:t,formAction:n,formEncType:r,formData:void 0,json:void 0,text:i};if(o!=null)return{formMethod:t,formAction:n,formEncType:r,formData:o,json:void 0,text:void 0};if(s!==void 0)return{formMethod:t,formAction:n,formEncType:r,formData:void 0,json:s,text:void 0}}}function mc(e,t){return t?{state:"loading",location:e,formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text}:{state:"loading",location:e,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function l2(e,t){return{state:"submitting",location:e,formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text}}function xo(e,t){return e?{state:"loading",formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text,data:t}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:t}}function c2(e,t){return{state:"submitting",formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text,data:t?t.data:void 0}}function Mn(e){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:e}}function u2(e,t){try{let n=e.sessionStorage.getItem(Gg);if(n){let r=JSON.parse(n);for(let[i,o]of Object.entries(r||{}))o&&Array.isArray(o)&&t.set(i,new Set(o||[]))}}catch{}}function d2(e,t){if(t.size>0){let n={};for(let[r,i]of t)n[r]=[...i];try{e.sessionStorage.setItem(Gg,JSON.stringify(n))}catch(r){Qi(!1,"Failed to save applied view transitions in sessionStorage ("+r+").")}}}/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ka(){return Ka=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ka.apply(this,arguments)}const Cl=k.createContext(null),Zg=k.createContext(null),Yr=k.createContext(null),ip=k.createContext(null),Rn=k.createContext({outlet:null,matches:[],isDataRoute:!1}),ex=k.createContext(null);function p2(e,t){let{relative:n}=t===void 0?{}:t;gs()||ae(!1);let{basename:r,navigator:i}=k.useContext(Yr),{hash:o,pathname:s,search:l}=nx(e,{relative:n}),c=s;return r!=="/"&&(c=s==="/"?r:kn([r,s])),i.createHref({pathname:c,search:l,hash:o})}function gs(){return k.useContext(ip)!=null}function Tn(){return gs()||ae(!1),k.useContext(ip).location}function tx(e){k.useContext(Yr).static||k.useLayoutEffect(e)}function tt(){let{isDataRoute:e}=k.useContext(Rn);return e?k2():f2()}function f2(){gs()||ae(!1);let e=k.useContext(Cl),{basename:t,future:n,navigator:r}=k.useContext(Yr),{matches:i}=k.useContext(Rn),{pathname:o}=Tn(),s=JSON.stringify(Zd(i,n.v7_relativeSplatPath)),l=k.useRef(!1);return tx(()=>{l.current=!0}),k.useCallback(function(d,f){if(f===void 0&&(f={}),!l.current)return;if(typeof d=="number"){r.go(d);return}let p=ep(d,JSON.parse(s),o,f.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:kn([t,p.pathname])),(f.replace?r.replace:r.push)(p,f.state,f)},[t,r,s,o,e])}const h2=k.createContext(null);function m2(e){let t=k.useContext(Rn).outlet;return t&&k.createElement(h2.Provider,{value:e},t)}function xs(){let{matches:e}=k.useContext(Rn),t=e[e.length-1];return t?t.params:{}}function nx(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=k.useContext(Yr),{matches:i}=k.useContext(Rn),{pathname:o}=Tn(),s=JSON.stringify(Zd(i,r.v7_relativeSplatPath));return k.useMemo(()=>ep(e,JSON.parse(s),o,n==="path"),[e,s,o,n])}function g2(e,t,n,r){gs()||ae(!1);let{navigator:i}=k.useContext(Yr),{matches:o}=k.useContext(Rn),s=o[o.length-1],l=s?s.params:{};s&&s.pathname;let c=s?s.pathnameBase:"/";s&&s.route;let d=Tn(),f;f=d;let p=f.pathname||"/",g=p;if(c!=="/"){let y=c.replace(/^\//,"").split("/");g="/"+p.replace(/^\//,"").split("/").slice(y.length).join("/")}let w=kr(e,{pathname:g});return j2(w&&w.map(y=>Object.assign({},y,{params:Object.assign({},l,y.params),pathname:kn([c,i.encodeLocation?i.encodeLocation(y.pathname).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?c:kn([c,i.encodeLocation?i.encodeLocation(y.pathnameBase).pathname:y.pathnameBase])})),o,n,r)}function x2(){let e=ox(),t=ms(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return k.createElement(k.Fragment,null,k.createElement("h2",null,"Unexpected Application Error!"),k.createElement("h3",{style:{fontStyle:"italic"}},t),n?k.createElement("pre",{style:i},n):null,null)}const y2=k.createElement(x2,null);class v2 extends k.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?k.createElement(Rn.Provider,{value:this.props.routeContext},k.createElement(ex.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function w2(e){let{routeContext:t,match:n,children:r}=e,i=k.useContext(Cl);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),k.createElement(Rn.Provider,{value:t},r)}function j2(e,t,n,r){var i;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var o;if(!n)return null;if(n.errors)e=n.matches;else if((o=r)!=null&&o.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let s=e,l=(i=n)==null?void 0:i.errors;if(l!=null){let f=s.findIndex(p=>p.route.id&&(l==null?void 0:l[p.route.id])!==void 0);f>=0||ae(!1),s=s.slice(0,Math.min(s.length,f+1))}let c=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<s.length;f++){let p=s[f];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(d=f),p.route.id){let{loaderData:g,errors:w}=n,v=p.route.loader&&g[p.route.id]===void 0&&(!w||w[p.route.id]===void 0);if(p.route.lazy||v){c=!0,d>=0?s=s.slice(0,d+1):s=[s[0]];break}}}return s.reduceRight((f,p,g)=>{let w,v=!1,y=null,C=null;n&&(w=l&&p.route.id?l[p.route.id]:void 0,y=p.route.errorElement||y2,c&&(d<0&&g===0?(P2("route-fallback"),v=!0,C=null):d===g&&(v=!0,C=p.route.hydrateFallbackElement||null)));let m=t.concat(s.slice(0,g+1)),h=()=>{let x;return w?x=y:v?x=C:p.route.Component?x=k.createElement(p.route.Component,null):p.route.element?x=p.route.element:x=f,k.createElement(w2,{match:p,routeContext:{outlet:f,matches:m,isDataRoute:n!=null},children:x})};return n&&(p.route.ErrorBoundary||p.route.errorElement||g===0)?k.createElement(v2,{location:n.location,revalidation:n.revalidation,component:y,error:w,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0}}):h()},null)}var rx=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(rx||{}),Ja=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Ja||{});function C2(e){let t=k.useContext(Cl);return t||ae(!1),t}function S2(e){let t=k.useContext(Zg);return t||ae(!1),t}function b2(e){let t=k.useContext(Rn);return t||ae(!1),t}function ix(e){let t=b2(),n=t.matches[t.matches.length-1];return n.route.id||ae(!1),n.route.id}function ox(){var e;let t=k.useContext(ex),n=S2(Ja.UseRouteError),r=ix(Ja.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function k2(){let{router:e}=C2(rx.UseNavigateStable),t=ix(Ja.UseNavigateStable),n=k.useRef(!1);return tx(()=>{n.current=!0}),k.useCallback(function(i,o){o===void 0&&(o={}),n.current&&(typeof i=="number"?e.navigate(i):e.navigate(i,Ka({fromRouteId:t},o)))},[e,t])}const uh={};function P2(e,t,n){uh[e]||(uh[e]=!0)}const dh={};function E2(e,t){dh[t]||(dh[t]=!0,console.warn(t))}const ii=(e,t,n)=>E2(e,"⚠️ React Router Future Flag Warning: "+t+". "+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+n+"."));function A2(e,t){e!=null&&e.v7_startTransition||ii("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),!(e!=null&&e.v7_relativeSplatPath)&&(!t||!t.v7_relativeSplatPath)&&ii("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"),t&&(t.v7_fetcherPersist||ii("v7_fetcherPersist","The persistence behavior of fetchers is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"),t.v7_normalizeFormMethod||ii("v7_normalizeFormMethod","Casing of `formMethod` fields is being normalized to uppercase in v7","https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"),t.v7_partialHydration||ii("v7_partialHydration","`RouterProvider` hydration behavior is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_partialhydration"),t.v7_skipActionErrorRevalidation||ii("v7_skipActionErrorRevalidation","The revalidation behavior after 4xx/5xx `action` responses is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"))}function I2(e){return m2(e.context)}function L2(e){let{basename:t="/",children:n=null,location:r,navigationType:i=Me.Pop,navigator:o,static:s=!1,future:l}=e;gs()&&ae(!1);let c=t.replace(/^\/*/,"/"),d=k.useMemo(()=>({basename:c,navigator:o,static:s,future:Ka({v7_relativeSplatPath:!1},l)}),[c,l,o,s]);typeof r=="string"&&(r=pr(r));let{pathname:f="/",search:p="",hash:g="",state:w=null,key:v="default"}=r,y=k.useMemo(()=>{let C=Zi(f,c);return C==null?null:{location:{pathname:C,search:p,hash:g,state:w,key:v},navigationType:i}},[c,f,p,g,w,v,i]);return y==null?null:k.createElement(Yr.Provider,{value:d},k.createElement(ip.Provider,{children:n,value:y}))}new Promise(()=>{});function R2(e){let t={hasErrorBoundary:e.ErrorBoundary!=null||e.errorElement!=null};return e.Component&&Object.assign(t,{element:k.createElement(e.Component),Component:void 0}),e.HydrateFallback&&Object.assign(t,{hydrateFallbackElement:k.createElement(e.HydrateFallback),HydrateFallback:void 0}),e.ErrorBoundary&&Object.assign(t,{errorElement:k.createElement(e.ErrorBoundary),ErrorBoundary:void 0}),t}/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function rs(){return rs=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},rs.apply(this,arguments)}function T2(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,o;for(o=0;o<r.length;o++)i=r[o],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function D2(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function N2(e,t){return e.button===0&&(!t||t==="_self")&&!D2(e)}const O2=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],z2="6";try{window.__reactRouterVersion=z2}catch{}function _2(e,t){return Vw({basename:void 0,future:rs({},void 0,{v7_prependBasename:!0}),history:gw({window:void 0}),hydrationData:M2(),routes:e,mapRouteProperties:R2,dataStrategy:void 0,patchRoutesOnNavigation:void 0,window:void 0}).initialize()}function M2(){var e;let t=(e=window)==null?void 0:e.__staticRouterHydrationData;return t&&t.errors&&(t=rs({},t,{errors:$2(t.errors)})),t}function $2(e){if(!e)return null;let t=Object.entries(e),n={};for(let[r,i]of t)if(i&&i.__type==="RouteErrorResponse")n[r]=new Ga(i.status,i.statusText,i.data,i.internal===!0);else if(i&&i.__type==="Error"){if(i.__subType){let o=window[i.__subType];if(typeof o=="function")try{let s=new o(i.message);s.stack="",n[r]=s}catch{}}if(n[r]==null){let o=new Error(i.message);o.stack="",n[r]=o}}else n[r]=i;return n}const F2=k.createContext({isTransitioning:!1}),B2=k.createContext(new Map),U2="startTransition",ph=ry[U2],W2="flushSync",fh=mw[W2];function Q2(e){ph?ph(e):e()}function yo(e){fh?fh(e):e()}class H2{constructor(){this.status="pending",this.promise=new Promise((t,n)=>{this.resolve=r=>{this.status==="pending"&&(this.status="resolved",t(r))},this.reject=r=>{this.status==="pending"&&(this.status="rejected",n(r))}})}}function V2(e){let{fallbackElement:t,router:n,future:r}=e,[i,o]=k.useState(n.state),[s,l]=k.useState(),[c,d]=k.useState({isTransitioning:!1}),[f,p]=k.useState(),[g,w]=k.useState(),[v,y]=k.useState(),C=k.useRef(new Map),{v7_startTransition:m}=r||{},h=k.useCallback(R=>{m?Q2(R):R()},[m]),x=k.useCallback((R,N)=>{let{deletedFetchers:M,flushSync:ee,viewTransitionOpts:le}=N;M.forEach(me=>C.current.delete(me)),R.fetchers.forEach((me,Ge)=>{me.data!==void 0&&C.current.set(Ge,me.data)});let he=n.window==null||n.window.document==null||typeof n.window.document.startViewTransition!="function";if(!le||he){ee?yo(()=>o(R)):h(()=>o(R));return}if(ee){yo(()=>{g&&(f&&f.resolve(),g.skipTransition()),d({isTransitioning:!0,flushSync:!0,currentLocation:le.currentLocation,nextLocation:le.nextLocation})});let me=n.window.document.startViewTransition(()=>{yo(()=>o(R))});me.finished.finally(()=>{yo(()=>{p(void 0),w(void 0),l(void 0),d({isTransitioning:!1})})}),yo(()=>w(me));return}g?(f&&f.resolve(),g.skipTransition(),y({state:R,currentLocation:le.currentLocation,nextLocation:le.nextLocation})):(l(R),d({isTransitioning:!0,flushSync:!1,currentLocation:le.currentLocation,nextLocation:le.nextLocation}))},[n.window,g,f,C,h]);k.useLayoutEffect(()=>n.subscribe(x),[n,x]),k.useEffect(()=>{c.isTransitioning&&!c.flushSync&&p(new H2)},[c]),k.useEffect(()=>{if(f&&s&&n.window){let R=s,N=f.promise,M=n.window.document.startViewTransition(async()=>{h(()=>o(R)),await N});M.finished.finally(()=>{p(void 0),w(void 0),l(void 0),d({isTransitioning:!1})}),w(M)}},[h,s,f,n.window]),k.useEffect(()=>{f&&s&&i.location.key===s.location.key&&f.resolve()},[f,g,i.location,s]),k.useEffect(()=>{!c.isTransitioning&&v&&(l(v.state),d({isTransitioning:!0,flushSync:!1,currentLocation:v.currentLocation,nextLocation:v.nextLocation}),y(void 0))},[c.isTransitioning,v]),k.useEffect(()=>{},[]);let b=k.useMemo(()=>({createHref:n.createHref,encodeLocation:n.encodeLocation,go:R=>n.navigate(R),push:(R,N,M)=>n.navigate(R,{state:N,preventScrollReset:M==null?void 0:M.preventScrollReset}),replace:(R,N,M)=>n.navigate(R,{replace:!0,state:N,preventScrollReset:M==null?void 0:M.preventScrollReset})}),[n]),E=n.basename||"/",j=k.useMemo(()=>({router:n,navigator:b,static:!1,basename:E}),[n,b,E]),I=k.useMemo(()=>({v7_relativeSplatPath:n.future.v7_relativeSplatPath}),[n.future.v7_relativeSplatPath]);return k.useEffect(()=>A2(r,n.future),[r,n.future]),k.createElement(k.Fragment,null,k.createElement(Cl.Provider,{value:j},k.createElement(Zg.Provider,{value:i},k.createElement(B2.Provider,{value:C.current},k.createElement(F2.Provider,{value:c},k.createElement(L2,{basename:E,location:i.location,navigationType:i.historyAction,navigator:b,future:I},i.initialized||n.future.v7_partialHydration?k.createElement(q2,{routes:n.routes,future:n.future,state:i}):t))))),null)}const q2=k.memo(G2);function G2(e){let{routes:t,future:n,state:r}=e;return g2(t,void 0,r,n)}const K2=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",J2=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,hn=k.forwardRef(function(t,n){let{onClick:r,relative:i,reloadDocument:o,replace:s,state:l,target:c,to:d,preventScrollReset:f,viewTransition:p}=t,g=T2(t,O2),{basename:w}=k.useContext(Yr),v,y=!1;if(typeof d=="string"&&J2.test(d)&&(v=d,K2))try{let x=new URL(window.location.href),b=d.startsWith("//")?new URL(x.protocol+d):new URL(d),E=Zi(b.pathname,w);b.origin===x.origin&&E!=null?d=E+b.search+b.hash:y=!0}catch{}let C=p2(d,{relative:i}),m=X2(d,{replace:s,state:l,target:c,preventScrollReset:f,relative:i,viewTransition:p});function h(x){r&&r(x),x.defaultPrevented||m(x)}return k.createElement("a",rs({},g,{href:v||C,onClick:y||o?r:h,ref:n,target:c}))});var hh;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(hh||(hh={}));var mh;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(mh||(mh={}));function X2(e,t){let{target:n,replace:r,state:i,preventScrollReset:o,relative:s,viewTransition:l}=t===void 0?{}:t,c=tt(),d=Tn(),f=nx(e,{relative:s});return k.useCallback(p=>{if(N2(p,n)){p.preventDefault();let g=r!==void 0?r:qr(d)===qr(f);c(e,{replace:g,state:i,preventScrollReset:o,relative:s,viewTransition:l})}},[d,c,f,r,i,n,e,o,s,l])}const Y2=()=>{var t;const e=ox();return ms(e)?a.jsxs("div",{children:[a.jsx("h1",{children:"Oops! something is wrong"}),a.jsx("h2",{children:e.status}),a.jsx("p",{children:e.statusText}),((t=e.data)==null?void 0:t.message)&&a.jsx("p",{children:e.data.message})]}):a.jsx("h1",{children:"Oops! something is wrong"})},Z2=()=>a.jsx("h1",{children:"NotFoundPage"});var vt=function(){return vt=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++){n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},vt.apply(this,arguments)};function Xa(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,o;r<i;r++)(o||!(r in t))&&(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))}var ke="-ms-",Mo="-moz-",xe="-webkit-",sx="comm",Sl="rule",op="decl",ej="@import",ax="@keyframes",tj="@layer",lx=Math.abs,sp=String.fromCharCode,Uu=Object.assign;function nj(e,t){return Ve(e,0)^45?(((t<<2^Ve(e,0))<<2^Ve(e,1))<<2^Ve(e,2))<<2^Ve(e,3):0}function cx(e){return e.trim()}function wn(e,t){return(e=t.exec(e))?e[0]:e}function ie(e,t,n){return e.replace(t,n)}function ga(e,t,n){return e.indexOf(t,n)}function Ve(e,t){return e.charCodeAt(t)|0}function Hi(e,t,n){return e.slice(t,n)}function un(e){return e.length}function ux(e){return e.length}function Ao(e,t){return t.push(e),e}function rj(e,t){return e.map(t).join("")}function gh(e,t){return e.filter(function(n){return!wn(n,t)})}var bl=1,Vi=1,dx=0,Wt=0,$e=0,eo="";function kl(e,t,n,r,i,o,s,l){return{value:e,root:t,parent:n,type:r,props:i,children:o,line:bl,column:Vi,length:s,return:"",siblings:l}}function $n(e,t){return Uu(kl("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function oi(e){for(;e.root;)e=$n(e.root,{children:[e]});Ao(e,e.siblings)}function ij(){return $e}function oj(){return $e=Wt>0?Ve(eo,--Wt):0,Vi--,$e===10&&(Vi=1,bl--),$e}function Zt(){return $e=Wt<dx?Ve(eo,Wt++):0,Vi++,$e===10&&(Vi=1,bl++),$e}function $r(){return Ve(eo,Wt)}function xa(){return Wt}function Pl(e,t){return Hi(eo,e,t)}function Wu(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function sj(e){return bl=Vi=1,dx=un(eo=e),Wt=0,[]}function aj(e){return eo="",e}function gc(e){return cx(Pl(Wt-1,Qu(e===91?e+2:e===40?e+1:e)))}function lj(e){for(;($e=$r())&&$e<33;)Zt();return Wu(e)>2||Wu($e)>3?"":" "}function cj(e,t){for(;--t&&Zt()&&!($e<48||$e>102||$e>57&&$e<65||$e>70&&$e<97););return Pl(e,xa()+(t<6&&$r()==32&&Zt()==32))}function Qu(e){for(;Zt();)switch($e){case e:return Wt;case 34:case 39:e!==34&&e!==39&&Qu($e);break;case 40:e===41&&Qu(e);break;case 92:Zt();break}return Wt}function uj(e,t){for(;Zt()&&e+$e!==57;)if(e+$e===84&&$r()===47)break;return"/*"+Pl(t,Wt-1)+"*"+sp(e===47?e:Zt())}function dj(e){for(;!Wu($r());)Zt();return Pl(e,Wt)}function pj(e){return aj(ya("",null,null,null,[""],e=sj(e),0,[0],e))}function ya(e,t,n,r,i,o,s,l,c){for(var d=0,f=0,p=s,g=0,w=0,v=0,y=1,C=1,m=1,h=0,x="",b=i,E=o,j=r,I=x;C;)switch(v=h,h=Zt()){case 40:if(v!=108&&Ve(I,p-1)==58){ga(I+=ie(gc(h),"&","&\f"),"&\f",lx(d?l[d-1]:0))!=-1&&(m=-1);break}case 34:case 39:case 91:I+=gc(h);break;case 9:case 10:case 13:case 32:I+=lj(v);break;case 92:I+=cj(xa()-1,7);continue;case 47:switch($r()){case 42:case 47:Ao(fj(uj(Zt(),xa()),t,n,c),c);break;default:I+="/"}break;case 123*y:l[d++]=un(I)*m;case 125*y:case 59:case 0:switch(h){case 0:case 125:C=0;case 59+f:m==-1&&(I=ie(I,/\f/g,"")),w>0&&un(I)-p&&Ao(w>32?yh(I+";",r,n,p-1,c):yh(ie(I," ","")+";",r,n,p-2,c),c);break;case 59:I+=";";default:if(Ao(j=xh(I,t,n,d,f,i,l,x,b=[],E=[],p,o),o),h===123)if(f===0)ya(I,t,j,j,b,o,p,l,E);else switch(g===99&&Ve(I,3)===110?100:g){case 100:case 108:case 109:case 115:ya(e,j,j,r&&Ao(xh(e,j,j,0,0,i,l,x,i,b=[],p,E),E),i,E,p,l,r?b:E);break;default:ya(I,j,j,j,[""],E,0,l,E)}}d=f=w=0,y=m=1,x=I="",p=s;break;case 58:p=1+un(I),w=v;default:if(y<1){if(h==123)--y;else if(h==125&&y++==0&&oj()==125)continue}switch(I+=sp(h),h*y){case 38:m=f>0?1:(I+="\f",-1);break;case 44:l[d++]=(un(I)-1)*m,m=1;break;case 64:$r()===45&&(I+=gc(Zt())),g=$r(),f=p=un(x=I+=dj(xa())),h++;break;case 45:v===45&&un(I)==2&&(y=0)}}return o}function xh(e,t,n,r,i,o,s,l,c,d,f,p){for(var g=i-1,w=i===0?o:[""],v=ux(w),y=0,C=0,m=0;y<r;++y)for(var h=0,x=Hi(e,g+1,g=lx(C=s[y])),b=e;h<v;++h)(b=cx(C>0?w[h]+" "+x:ie(x,/&\f/g,w[h])))&&(c[m++]=b);return kl(e,t,n,i===0?Sl:l,c,d,f,p)}function fj(e,t,n,r){return kl(e,t,n,sx,sp(ij()),Hi(e,2,-2),0,r)}function yh(e,t,n,r,i){return kl(e,t,n,op,Hi(e,0,r),Hi(e,r+1,-1),r,i)}function px(e,t,n){switch(nj(e,t)){case 5103:return xe+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return xe+e+e;case 4789:return Mo+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return xe+e+Mo+e+ke+e+e;case 5936:switch(Ve(e,t+11)){case 114:return xe+e+ke+ie(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return xe+e+ke+ie(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return xe+e+ke+ie(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return xe+e+ke+e+e;case 6165:return xe+e+ke+"flex-"+e+e;case 5187:return xe+e+ie(e,/(\w+).+(:[^]+)/,xe+"box-$1$2"+ke+"flex-$1$2")+e;case 5443:return xe+e+ke+"flex-item-"+ie(e,/flex-|-self/g,"")+(wn(e,/flex-|baseline/)?"":ke+"grid-row-"+ie(e,/flex-|-self/g,""))+e;case 4675:return xe+e+ke+"flex-line-pack"+ie(e,/align-content|flex-|-self/g,"")+e;case 5548:return xe+e+ke+ie(e,"shrink","negative")+e;case 5292:return xe+e+ke+ie(e,"basis","preferred-size")+e;case 6060:return xe+"box-"+ie(e,"-grow","")+xe+e+ke+ie(e,"grow","positive")+e;case 4554:return xe+ie(e,/([^-])(transform)/g,"$1"+xe+"$2")+e;case 6187:return ie(ie(ie(e,/(zoom-|grab)/,xe+"$1"),/(image-set)/,xe+"$1"),e,"")+e;case 5495:case 3959:return ie(e,/(image-set\([^]*)/,xe+"$1$`$1");case 4968:return ie(ie(e,/(.+:)(flex-)?(.*)/,xe+"box-pack:$3"+ke+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+xe+e+e;case 4200:if(!wn(e,/flex-|baseline/))return ke+"grid-column-align"+Hi(e,t)+e;break;case 2592:case 3360:return ke+ie(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,i){return t=i,wn(r.props,/grid-\w+-end/)})?~ga(e+(n=n[t].value),"span",0)?e:ke+ie(e,"-start","")+e+ke+"grid-row-span:"+(~ga(n,"span",0)?wn(n,/\d+/):+wn(n,/\d+/)-+wn(e,/\d+/))+";":ke+ie(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return wn(r.props,/grid-\w+-start/)})?e:ke+ie(ie(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return ie(e,/(.+)-inline(.+)/,xe+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(un(e)-1-t>6)switch(Ve(e,t+1)){case 109:if(Ve(e,t+4)!==45)break;case 102:return ie(e,/(.+:)(.+)-([^]+)/,"$1"+xe+"$2-$3$1"+Mo+(Ve(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ga(e,"stretch",0)?px(ie(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return ie(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,i,o,s,l,c,d){return ke+i+":"+o+d+(s?ke+i+"-span:"+(l?c:+c-+o)+d:"")+e});case 4949:if(Ve(e,t+6)===121)return ie(e,":",":"+xe)+e;break;case 6444:switch(Ve(e,Ve(e,14)===45?18:11)){case 120:return ie(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+xe+(Ve(e,14)===45?"inline-":"")+"box$3$1"+xe+"$2$3$1"+ke+"$2box$3")+e;case 100:return ie(e,":",":"+ke)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return ie(e,"scroll-","scroll-snap-")+e}return e}function Ya(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function hj(e,t,n,r){switch(e.type){case tj:if(e.children.length)break;case ej:case op:return e.return=e.return||e.value;case sx:return"";case ax:return e.return=e.value+"{"+Ya(e.children,r)+"}";case Sl:if(!un(e.value=e.props.join(",")))return""}return un(n=Ya(e.children,r))?e.return=e.value+"{"+n+"}":""}function mj(e){var t=ux(e);return function(n,r,i,o){for(var s="",l=0;l<t;l++)s+=e[l](n,r,i,o)||"";return s}}function gj(e){return function(t){t.root||(t=t.return)&&e(t)}}function xj(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case op:e.return=px(e.value,e.length,n);return;case ax:return Ya([$n(e,{value:ie(e.value,"@","@"+xe)})],r);case Sl:if(e.length)return rj(n=e.props,function(i){switch(wn(i,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":oi($n(e,{props:[ie(i,/:(read-\w+)/,":"+Mo+"$1")]})),oi($n(e,{props:[i]})),Uu(e,{props:gh(n,r)});break;case"::placeholder":oi($n(e,{props:[ie(i,/:(plac\w+)/,":"+xe+"input-$1")]})),oi($n(e,{props:[ie(i,/:(plac\w+)/,":"+Mo+"$1")]})),oi($n(e,{props:[ie(i,/:(plac\w+)/,ke+"input-$1")]})),oi($n(e,{props:[i]})),Uu(e,{props:gh(n,r)});break}return""})}}var yj={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},kt={ALLUSERSPROFILE:"C:\\ProgramData",APPDATA:"C:\\Users\\yscho\\AppData\\Roaming",ChocolateyInstall:"C:\\ProgramData\\chocolatey",ChocolateyLastPathUpdate:"133643746293195846",CHROME_CRASHPAD_PIPE_NAME:"\\\\.\\pipe\\crashpad_37964_BBBNJMOEQMTIBSNQ",COLOR:"1",COLORTERM:"truecolor",CommonProgramFiles:"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files",CommonProgramW6432:"C:\\Program Files\\Common Files",COMPUTERNAME:"LAPTOP-1U9BALFB",ComSpec:"C:\\WINDOWS\\system32\\cmd.exe",DriverData:"C:\\Windows\\System32\\Drivers\\DriverData",EDITOR:"C:\\WINDOWS\\notepad.exe",EFC_2284:"1",FPS_BROWSER_APP_PROFILE_STRING:"Internet Explorer",FPS_BROWSER_USER_PROFILE_STRING:"Default",GIT_ASKPASS:"c:\\Users\\yscho\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh",HOME:"C:\\Users\\yscho",HOMEDRIVE:"C:",HOMEPATH:"\\Users\\yscho",INIT_CWD:"C:\\Users\\yscho\\Desktop\\Good Buy Us\\WEB1_2_LinkUP_FE",LANG:"ko_KR.UTF-8",LOCALAPPDATA:"C:\\Users\\yscho\\AppData\\Local",LOGONSERVER:"\\\\LAPTOP-1U9BALFB",NODE:"C:\\Program Files\\nodejs\\node.exe",NODE_ENV:"production",NODE_EXE:"C:\\Program Files\\nodejs\\\\node.exe",NPM_CLI_JS:"C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js",npm_command:"run-script",npm_config_cache:"C:\\Users\\yscho\\AppData\\Local\\npm-cache",npm_config_globalconfig:"C:\\Program Files\\nodejs\\etc\\npmrc",npm_config_global_prefix:"C:\\Program Files\\nodejs",npm_config_init_module:"C:\\Users\\yscho\\.npm-init.js",npm_config_local_prefix:"C:\\Users\\yscho\\Desktop\\Good Buy Us\\WEB1_2_LinkUP_FE",npm_config_metrics_registry:"https://registry.npmjs.org/",npm_config_node_gyp:"C:\\Users\\yscho\\AppData\\Roaming\\nvm\\v18.18.2\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js",npm_config_noproxy:"",npm_config_npm_version:"9.8.1",npm_config_prefix:"C:\\Program Files\\nodejs",npm_config_userconfig:"C:\\Users\\yscho\\.npmrc",npm_config_user_agent:"npm/9.8.1 node/v18.18.2 win32 x64 workspaces/false",npm_execpath:"C:\\Users\\yscho\\AppData\\Roaming\\nvm\\v18.18.2\\node_modules\\npm\\bin\\npm-cli.js",npm_lifecycle_event:"build",npm_lifecycle_script:"vite build",npm_node_execpath:"C:\\Program Files\\nodejs\\node.exe",npm_package_json:"C:\\Users\\yscho\\Desktop\\Good Buy Us\\WEB1_2_LinkUP_FE\\package.json",npm_package_name:"goodbuyus",npm_package_version:"0.1.0",NPM_PREFIX_NPM_CLI_JS:"C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js",NUMBER_OF_PROCESSORS:"8",NVM_HOME:"C:\\Users\\yscho\\AppData\\Roaming\\nvm",NVM_SYMLINK:"C:\\Program Files\\nodejs",OneDrive:"C:\\Users\\yscho\\OneDrive",ORIGINAL_XDG_CURRENT_DESKTOP:"undefined",OS:"Windows_NT",Path:"C:\\Users\\yscho\\Desktop\\Good Buy Us\\WEB1_2_LinkUP_FE\\node_modules\\.bin;C:\\Users\\yscho\\Desktop\\Good Buy Us\\node_modules\\.bin;C:\\Users\\yscho\\Desktop\\node_modules\\.bin;C:\\Users\\yscho\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\yscho\\AppData\\Roaming\\nvm\\v18.18.2\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Python312\\Scripts\\;C:\\Python312\\;C:\\Program Files\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\NAT Service;C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\iCLS\\;C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\iCLS\\;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\DAL;C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\DAL;C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\IPT;C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\IPT;C:\\Program Files\\dotnet\\;C:\\Python27\\Scripts;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\WINDOWS\\System32\\OpenSSH\\;C:\\ProgramData\\chocolatey\\bin;C:\\Users\\yscho\\AppData\\Roaming\\nvm;C:\\Program Files\\nodejs;C:\\Program Files\\Git\\cmd;C:\\Users\\yscho\\AppData\\Local\\Programs\\Python\\Launcher\\;C:\\Users\\yscho\\AppData\\Local\\Programs\\Python\\Python36\\Scripts\\;C:\\Users\\yscho\\AppData\\Local\\Programs\\Python\\Python36\\;C:\\Users\\yscho\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\yscho\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\yscho\\AppData\\Roaming\\npm;C:\\Users\\yscho\\AppData\\Roaming\\nvm;C:\\Program Files\\nodejs;C:\\Users\\yscho\\AppData\\Local\\SOOP",PATHEXT:".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.PY;.PYW;.CPL",PROCESSOR_ARCHITECTURE:"AMD64",PROCESSOR_IDENTIFIER:"Intel64 Family 6 Model 142 Stepping 10, GenuineIntel",PROCESSOR_LEVEL:"6",PROCESSOR_REVISION:"8e0a",ProgramData:"C:\\ProgramData",ProgramFiles:"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)",ProgramW6432:"C:\\Program Files",PROMPT:"$P$G",PSModulePath:"C:\\Users\\yscho\\Documents\\WindowsPowerShell\\Modules;C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules",PUBLIC:"C:\\Users\\Public",SESSIONNAME:"Console",SystemDrive:"C:",SystemRoot:"C:\\WINDOWS",TEMP:"C:\\Users\\yscho\\AppData\\Local\\Temp",TERM_PROGRAM:"vscode",TERM_PROGRAM_VERSION:"1.95.3",TMP:"C:\\Users\\yscho\\AppData\\Local\\Temp",USERDOMAIN:"LAPTOP-1U9BALFB",USERDOMAIN_ROAMINGPROFILE:"LAPTOP-1U9BALFB",USERNAME:"yunsung",USERPROFILE:"C:\\Users\\yscho",VSCODE_GIT_ASKPASS_EXTRA_ARGS:"",VSCODE_GIT_ASKPASS_MAIN:"c:\\Users\\yscho\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js",VSCODE_GIT_ASKPASS_NODE:"C:\\Users\\yscho\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe",VSCODE_GIT_IPC_HANDLE:"\\\\.\\pipe\\vscode-git-ee27cb4a5d-sock",VSCODE_INJECTION:"1",windir:"C:\\WINDOWS"},qi=typeof process<"u"&&kt!==void 0&&(kt.REACT_APP_SC_ATTR||kt.SC_ATTR)||"data-styled",fx="active",hx="data-styled-version",El="6.1.13",ap=`/*!sc*/
`,Za=typeof window<"u"&&"HTMLElement"in window,vj=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&kt!==void 0&&kt.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&kt.REACT_APP_SC_DISABLE_SPEEDY!==""?kt.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&kt.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&kt!==void 0&&kt.SC_DISABLE_SPEEDY!==void 0&&kt.SC_DISABLE_SPEEDY!==""&&kt.SC_DISABLE_SPEEDY!=="false"&&kt.SC_DISABLE_SPEEDY),Al=Object.freeze([]),Gi=Object.freeze({});function wj(e,t,n){return n===void 0&&(n=Gi),e.theme!==n.theme&&e.theme||t||n.theme}var mx=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),jj=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Cj=/(^-|-$)/g;function vh(e){return e.replace(jj,"-").replace(Cj,"")}var Sj=/(a)(d)/gi,Ks=52,wh=function(e){return String.fromCharCode(e+(e>25?39:97))};function Hu(e){var t,n="";for(t=Math.abs(e);t>Ks;t=t/Ks|0)n=wh(t%Ks)+n;return(wh(t%Ks)+n).replace(Sj,"$1-$2")}var xc,gx=5381,ji=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},xx=function(e){return ji(gx,e)};function bj(e){return Hu(xx(e)>>>0)}function kj(e){return e.displayName||e.name||"Component"}function yc(e){return typeof e=="string"&&!0}var yx=typeof Symbol=="function"&&Symbol.for,vx=yx?Symbol.for("react.memo"):60115,Pj=yx?Symbol.for("react.forward_ref"):60112,Ej={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Aj={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},wx={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Ij=((xc={})[Pj]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},xc[vx]=wx,xc);function jh(e){return("type"in(t=e)&&t.type.$$typeof)===vx?wx:"$$typeof"in e?Ij[e.$$typeof]:Ej;var t}var Lj=Object.defineProperty,Rj=Object.getOwnPropertyNames,Ch=Object.getOwnPropertySymbols,Tj=Object.getOwnPropertyDescriptor,Dj=Object.getPrototypeOf,Sh=Object.prototype;function jx(e,t,n){if(typeof t!="string"){if(Sh){var r=Dj(t);r&&r!==Sh&&jx(e,r,n)}var i=Rj(t);Ch&&(i=i.concat(Ch(t)));for(var o=jh(e),s=jh(t),l=0;l<i.length;++l){var c=i[l];if(!(c in Aj||n&&n[c]||s&&c in s||o&&c in o)){var d=Tj(t,c);try{Lj(e,c,d)}catch{}}}}return e}function Ki(e){return typeof e=="function"}function lp(e){return typeof e=="object"&&"styledComponentId"in e}function Rr(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function bh(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function is(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Vu(e,t,n){if(n===void 0&&(n=!1),!n&&!is(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Vu(e[r],t[r]);else if(is(t))for(var r in t)e[r]=Vu(e[r],t[r]);return e}function cp(e,t){Object.defineProperty(e,"toString",{value:t})}function ys(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Nj=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,i=r.length,o=i;t>=o;)if((o<<=1)<0)throw ys(16,"".concat(t));this.groupSizes=new Uint32Array(o),this.groupSizes.set(r),this.length=o;for(var s=i;s<o;s++)this.groupSizes[s]=0}for(var l=this.indexOfGroup(t+1),c=(s=0,n.length);s<c;s++)this.tag.insertRule(l,n[s])&&(this.groupSizes[t]++,l++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),i=r+n;this.groupSizes[t]=0;for(var o=r;o<i;o++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],i=this.indexOfGroup(t),o=i+r,s=i;s<o;s++)n+="".concat(this.tag.getRule(s)).concat(ap);return n},e}(),va=new Map,el=new Map,wa=1,Js=function(e){if(va.has(e))return va.get(e);for(;el.has(wa);)wa++;var t=wa++;return va.set(e,t),el.set(t,e),t},Oj=function(e,t){wa=t+1,va.set(e,t),el.set(t,e)},zj="style[".concat(qi,"][").concat(hx,'="').concat(El,'"]'),_j=new RegExp("^".concat(qi,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Mj=function(e,t,n){for(var r,i=n.split(","),o=0,s=i.length;o<s;o++)(r=i[o])&&e.registerName(t,r)},$j=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(ap),i=[],o=0,s=r.length;o<s;o++){var l=r[o].trim();if(l){var c=l.match(_j);if(c){var d=0|parseInt(c[1],10),f=c[2];d!==0&&(Oj(f,d),Mj(e,f,c[3]),e.getTag().insertRules(d,i)),i.length=0}else i.push(l)}}},kh=function(e){for(var t=document.querySelectorAll(zj),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(qi)!==fx&&($j(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function Fj(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Cx=function(e){var t=document.head,n=e||t,r=document.createElement("style"),i=function(l){var c=Array.from(l.querySelectorAll("style[".concat(qi,"]")));return c[c.length-1]}(n),o=i!==void 0?i.nextSibling:null;r.setAttribute(qi,fx),r.setAttribute(hx,El);var s=Fj();return s&&r.setAttribute("nonce",s),n.insertBefore(r,o),r},Bj=function(){function e(t){this.element=Cx(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,i=0,o=r.length;i<o;i++){var s=r[i];if(s.ownerNode===n)return s}throw ys(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),Uj=function(){function e(t){this.element=Cx(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Wj=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Ph=Za,Qj={isServer:!Za,useCSSOMInjection:!vj},Sx=function(){function e(t,n,r){t===void 0&&(t=Gi),n===void 0&&(n={});var i=this;this.options=vt(vt({},Qj),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&Za&&Ph&&(Ph=!1,kh(this)),cp(this,function(){return function(o){for(var s=o.getTag(),l=s.length,c="",d=function(p){var g=function(m){return el.get(m)}(p);if(g===void 0)return"continue";var w=o.names.get(g),v=s.getGroup(p);if(w===void 0||!w.size||v.length===0)return"continue";var y="".concat(qi,".g").concat(p,'[id="').concat(g,'"]'),C="";w!==void 0&&w.forEach(function(m){m.length>0&&(C+="".concat(m,","))}),c+="".concat(v).concat(y,'{content:"').concat(C,'"}').concat(ap)},f=0;f<l;f++)d(f);return c}(i)})}return e.registerId=function(t){return Js(t)},e.prototype.rehydrate=function(){!this.server&&Za&&kh(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(vt(vt({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,i=n.target;return n.isServer?new Wj(i):r?new Bj(i):new Uj(i)}(this.options),new Nj(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(Js(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(Js(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Js(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Hj=/&/g,Vj=/^\s*\/\/.*$/gm;function bx(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=bx(n.children,t)),n})}function qj(e){var t,n,r,i=Gi,o=i.options,s=o===void 0?Gi:o,l=i.plugins,c=l===void 0?Al:l,d=function(g,w,v){return v.startsWith(n)&&v.endsWith(n)&&v.replaceAll(n,"").length>0?".".concat(t):g},f=c.slice();f.push(function(g){g.type===Sl&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(Hj,n).replace(r,d))}),s.prefix&&f.push(xj),f.push(hj);var p=function(g,w,v,y){w===void 0&&(w=""),v===void 0&&(v=""),y===void 0&&(y="&"),t=y,n=w,r=new RegExp("\\".concat(n,"\\b"),"g");var C=g.replace(Vj,""),m=pj(v||w?"".concat(v," ").concat(w," { ").concat(C," }"):C);s.namespace&&(m=bx(m,s.namespace));var h=[];return Ya(m,mj(f.concat(gj(function(x){return h.push(x)})))),h};return p.hash=c.length?c.reduce(function(g,w){return w.name||ys(15),ji(g,w.name)},gx).toString():"",p}var Gj=new Sx,qu=qj(),kx=Lt.createContext({shouldForwardProp:void 0,styleSheet:Gj,stylis:qu});kx.Consumer;Lt.createContext(void 0);function Eh(){return k.useContext(kx)}var Kj=function(){function e(t,n){var r=this;this.inject=function(i,o){o===void 0&&(o=qu);var s=r.name+o.hash;i.hasNameForId(r.id,s)||i.insertRules(r.id,s,o(r.rules,s,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,cp(this,function(){throw ys(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=qu),this.name+t.hash},e}(),Jj=function(e){return e>="A"&&e<="Z"};function Ah(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;Jj(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Px=function(e){return e==null||e===!1||e===""},Ex=function(e){var t,n,r=[];for(var i in e){var o=e[i];e.hasOwnProperty(i)&&!Px(o)&&(Array.isArray(o)&&o.isCss||Ki(o)?r.push("".concat(Ah(i),":"),o,";"):is(o)?r.push.apply(r,Xa(Xa(["".concat(i," {")],Ex(o),!1),["}"],!1)):r.push("".concat(Ah(i),": ").concat((t=i,(n=o)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in yj||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Fr(e,t,n,r){if(Px(e))return[];if(lp(e))return[".".concat(e.styledComponentId)];if(Ki(e)){if(!Ki(o=e)||o.prototype&&o.prototype.isReactComponent||!t)return[e];var i=e(t);return Fr(i,t,n,r)}var o;return e instanceof Kj?n?(e.inject(n,r),[e.getName(r)]):[e]:is(e)?Ex(e):Array.isArray(e)?Array.prototype.concat.apply(Al,e.map(function(s){return Fr(s,t,n,r)})):[e.toString()]}function Xj(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ki(n)&&!lp(n))return!1}return!0}var Yj=xx(El),Zj=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&Xj(t),this.componentId=n,this.baseHash=ji(Yj,n),this.baseStyle=r,Sx.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var i=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))i=Rr(i,this.staticRulesId);else{var o=bh(Fr(this.rules,t,n,r)),s=Hu(ji(this.baseHash,o)>>>0);if(!n.hasNameForId(this.componentId,s)){var l=r(o,".".concat(s),void 0,this.componentId);n.insertRules(this.componentId,s,l)}i=Rr(i,s),this.staticRulesId=s}else{for(var c=ji(this.baseHash,r.hash),d="",f=0;f<this.rules.length;f++){var p=this.rules[f];if(typeof p=="string")d+=p;else if(p){var g=bh(Fr(p,t,n,r));c=ji(c,g+f),d+=g}}if(d){var w=Hu(c>>>0);n.hasNameForId(this.componentId,w)||n.insertRules(this.componentId,w,r(d,".".concat(w),void 0,this.componentId)),i=Rr(i,w)}}return i},e}(),Ax=Lt.createContext(void 0);Ax.Consumer;var vc={};function eC(e,t,n){var r=lp(e),i=e,o=!yc(e),s=t.attrs,l=s===void 0?Al:s,c=t.componentId,d=c===void 0?function(b,E){var j=typeof b!="string"?"sc":vh(b);vc[j]=(vc[j]||0)+1;var I="".concat(j,"-").concat(bj(El+j+vc[j]));return E?"".concat(E,"-").concat(I):I}(t.displayName,t.parentComponentId):c,f=t.displayName,p=f===void 0?function(b){return yc(b)?"styled.".concat(b):"Styled(".concat(kj(b),")")}(e):f,g=t.displayName&&t.componentId?"".concat(vh(t.displayName),"-").concat(t.componentId):t.componentId||d,w=r&&i.attrs?i.attrs.concat(l).filter(Boolean):l,v=t.shouldForwardProp;if(r&&i.shouldForwardProp){var y=i.shouldForwardProp;if(t.shouldForwardProp){var C=t.shouldForwardProp;v=function(b,E){return y(b,E)&&C(b,E)}}else v=y}var m=new Zj(n,g,r?i.componentStyle:void 0);function h(b,E){return function(j,I,R){var N=j.attrs,M=j.componentStyle,ee=j.defaultProps,le=j.foldedComponentIds,he=j.styledComponentId,me=j.target,Ge=Lt.useContext(Ax),Ke=Eh(),_=j.shouldForwardProp||Ke.shouldForwardProp,T=wj(I,Ge,ee)||Gi,$=function(J,X,F){for(var q,pe=vt(vt({},X),{className:void 0,theme:F}),Je=0;Je<J.length;Je+=1){var je=Ki(q=J[Je])?q(pe):q;for(var ct in je)pe[ct]=ct==="className"?Rr(pe[ct],je[ct]):ct==="style"?vt(vt({},pe[ct]),je[ct]):je[ct]}return X.className&&(pe.className=Rr(pe.className,X.className)),pe}(N,I,T),H=$.as||me,Z={};for(var ne in $)$[ne]===void 0||ne[0]==="$"||ne==="as"||ne==="theme"&&$.theme===T||(ne==="forwardedAs"?Z.as=$.forwardedAs:_&&!_(ne,H)||(Z[ne]=$[ne]));var Ue=function(J,X){var F=Eh(),q=J.generateAndInjectStyles(X,F.styleSheet,F.stylis);return q}(M,$),ye=Rr(le,he);return Ue&&(ye+=" "+Ue),$.className&&(ye+=" "+$.className),Z[yc(H)&&!mx.has(H)?"class":"className"]=ye,Z.ref=R,k.createElement(H,Z)}(x,b,E)}h.displayName=p;var x=Lt.forwardRef(h);return x.attrs=w,x.componentStyle=m,x.displayName=p,x.shouldForwardProp=v,x.foldedComponentIds=r?Rr(i.foldedComponentIds,i.styledComponentId):"",x.styledComponentId=g,x.target=r?i.target:e,Object.defineProperty(x,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(b){this._foldedDefaultProps=r?function(E){for(var j=[],I=1;I<arguments.length;I++)j[I-1]=arguments[I];for(var R=0,N=j;R<N.length;R++)Vu(E,N[R],!0);return E}({},i.defaultProps,b):b}}),cp(x,function(){return".".concat(x.styledComponentId)}),o&&jx(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),x}function Ih(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Lh=function(e){return Object.assign(e,{isCss:!0})};function tC(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Ki(e)||is(e))return Lh(Fr(Ih(Al,Xa([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?Fr(r):Lh(Fr(Ih(r,t)))}function Gu(e,t,n){if(n===void 0&&(n=Gi),!t)throw ys(1,t);var r=function(i){for(var o=[],s=1;s<arguments.length;s++)o[s-1]=arguments[s];return e(t,n,tC.apply(void 0,Xa([i],o,!1)))};return r.attrs=function(i){return Gu(e,t,vt(vt({},n),{attrs:Array.prototype.concat(n.attrs,i).filter(Boolean)}))},r.withConfig=function(i){return Gu(e,t,vt(vt({},n),i))},r}var Ix=function(e){return Gu(eC,e)},u=Ix;mx.forEach(function(e){u[e]=Ix(e)});const vs=({rating:e})=>{const t=()=>{const n=[],r=Math.floor(e),i=e%1>=.3&&e%1<=.7,o=e%1<.3&&e%1>0,s=e%1>.7;for(let c=0;c<r;c++)n.push(a.jsx(rC,{children:"⭐"},`full-${c}`));o?n.push(a.jsx(oC,{children:"⭐"},"quarter")):i?n.push(a.jsx(sC,{children:"⭐"},"half")):s&&n.push(a.jsx(aC,{children:"⭐"},"three-quarter"));const l=5-n.length;for(let c=0;c<l;c++)n.push(a.jsx(iC,{children:"⭐"},`empty-${c}`));return n};return a.jsx(nC,{children:t()})},nC=u.div`
  display: inline-flex;
  align-items: center;
`,ws=u.span`
  font-size: 20px;
  position: relative;
`,rC=u(ws)`
  color: #ffd700;
`,iC=u(ws)`
  color: #e0e0e0;
`,oC=u(ws)`
  background: linear-gradient(90deg, #ffd700 25%, #e0e0e0 25%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,sC=u(ws)`
  background: linear-gradient(90deg, #ffd700 50%, #e0e0e0 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,aC=u(ws)`
  background: linear-gradient(90deg, #ffd700 75%, #e0e0e0 75%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Lx="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAACuFJREFUeF7tnHtwFfUVx7/ndxMwEVBkdKxtUSoOrW2d0VJQLAJacGppqdV0QMl97A33blA66nSqaKmx9dnHUCskdy/szd2FghqtpS9mcOTRkQJWZ6pOqxYfCJ3C+MTEhlfunrp5QKDZ3d8+EpKZe//dc77n/D45v9/+9vcIofwLRYBCeZedUQYYsgjKAMsAQxII6V6uwDLAkARCupcrcLABvLGu7jMxjl1HjPMAOp2JR4PpVAL/B4RdsLDLIt65qpB/NmTux7kn69TpFtN4Ap/HwDgwzgLQRuD9DHzIwM6OCn5ibT7/XpRxI6nAmoULR1Qd4rkEjgOYKpMgM94HYR2x9ZhRyG+Q8TnRJp7KziGiGoC/DaKRchr8NEP8xtSbDDl7d6tQAFOp1JklGn4bgVUQnR40IQbvBnixqefXeGnU1NTEqkeMyYBwDwhnetk7Pme8y8AjHQdp2Zo1TR8G1QkMsFbJ3CJILA0auC8/Zt4B4FazoG3r63ltSr2aBJYS8IXI4jIfBHCzUdD0IJqBAMYV9T4i3BkkoJcPMzNA95iF3D09tnbVVY0akyOgzss/6HMG32Lq2sN+/X0DjCvZPBEt8BvIrz2D1x1orZ43alRrVQcq/wTgUr8a/u35AUPXfBWGL4CJtHovgLv8JxbMg4GXiDEahM8GUwjixUsMXbPbKfWTBlhbl/2uYHpSSnUIG3UOIYxrzWZtnUwzpADWKtmJguhvMoJHbZjbGLSDwHsYtBeEMQQ+B0xfAeEcX1qyxsyvMugVIuxjxocgfBrMYwFMIqJTZWXAfJAsnlQs5l/28pECGFfUV4kwwUus8znjcbJKvygWVzgCj6fU2SBkiTBbStPDiMGrmVlzm5wn6+ovtSz+IRGulYvJfzd07WIvW0+A8bSqEOD5imfwe2zx7FXNeXsqIvVLKJlZTLSCQHaV+P/ZFUeUMPXcc7LOibR6OQN/IGC0lw8TzzVXao+52XkCTCjqbq9BnIG3mTpmrFq58i2vpE58XlNza1XVyHadiOb58mXOGwUt68un2ziRyJzPFeIZAs519+c3DF0bHxig3IuD20ssLlldaHotSGN6fOKK+gAR7pDSsPAjozl3n5Stg9F8pX6CIH6egBHuOtZsQ8/b06g+f64VmFDU5k8WAJJuAdjiWrNZWx2mMUchprM/J9APXOMxfmwWcj+NIl4yrc5lYK1rPEAz9ZwaCGBcUd8jwhiXANsNPXdZFI3p1qC4oq4nwtUOmi2GnvtehPEQV9TNRJjmpGmP7aauOX5zO1bg/NSCKTER2+peDXSNWWhaH2WD7JWd6oOlHSC6sLcuMz8vrENTi8Wi/e0a2a82pV4pBJ7xqMLJTi8qR4AJJXMTSCxzE25vrapuaVl6ILLWdAvV1tWNI6si0Vs3xoeWNzc3vxt1LFsvnlbb3MZCBlRTz2l9xXYEGFfUu4nQ4JLwC4aem9gfDRpozbiibiXCFMe4Li8tF4DZXxPRIkdRxpNGIXf9QDe2P+IlFHUtCHNdtJcaeu42fxWYVosEHNeNjhNgXm4UtJv7o0EDrRlXsr8koj4B2bkwUDD1XNoXwISiPgzC910q8FGjkPM3+R1oMpLx4h7FwuCHTV27xRfAuKIuIcJPXHLYbOi5GZI5DmqzuKI+TYSvRzoGJlJqPQQanSuQ9xsFzfN7clCT604ukc7uB+g0p1wDvYXtbUJmbHIFQDTRWNn0wlCA5JRjPK1OIsBjAYSnGbr2F19d+BuLFg0/s/3IxwRUOAPiOw1de2BIA1TUBiLc7VJ9He9WV45Y/8gjh3wBtI3jSvavROT8qcZ4c9zYsy9oaGiwhiLE6dMbKsZ+bt8ushdenX9bDT33NafHrosJcSX7IBHd7grHsrJGcz4/FAHKbc26bzS5AkwmM1/mmHjJFQ5j3/AKa2w+nz8ylCBmMpnqQyXaA9AZjt2XmTuoYtwaffnbgSqwqxt7vOJtI+ZfGQXt1qEEMJ5WdQIUt5wZ/FtT165zs/FckZ5fl50ZY/I+u8I0xyg0/X4oQKxNZ2oExOOeuUrMMjwBdlZhWn2RgIvcuzK3ocQXG0b+Dc/ETqLBDembzq1Exz8BqnatPuYnzIJW45WqFMBksn4qx7jPeVDvAMx4reMgXRbmsI5XwmGeK4oysoOGPetVDMxoFZaYUCw27vOKJwXQFvH8Nu6OxMzbDrR9ML2lpeWwV/CBfN55vmbkGZuJyHFKcjQfHzMLaYD2xPqs9sP/AOh8z4YPwqWuRFq1xzzPLmmfEDMLmvQ5HGmANrTaVGayEGK7J8Aug58Zes59DikpFNYskc7eD9BiLx1m/i9i1iXmihX/8rLtee4LYFdX9l7q7xFn8B2mrj0km0x/2MXT2dsJ9KCXtn0mhoi/5baF2ZeGb4BdELMaiDJeSdnPg567k9H2spGF151noD92IIANDQ3izd17t0gNyCcJoj94WGPquRu9/iCRVaAtdMMN9aMrT+EXvY599OrOgU6ABmmUL3jM23a/+akrNm9u6AgSK1AF9gRKJrMXcAzb3b4neydlMRavKuQ8x6MgDenxSaSziwG6X0qD+eUK6piu6/oHUvZ9GIUCaOvF6+ovIsvaIntK3wLfu0rXlgRN2M3P19lt5p2HK3hK2HsjoQHaDeo6gIktXp9Hx7ozlpl6znnLNADdRFq1tx/qpVwZe8gSk2S+NLz0IgHYCTFVP43I2kBEw7yCdr31nLcKZfx72VBCUdd47OseNWfwXlGiKcVibpfPOH2aRwbQVk+kM99kpnVEFJNMrqW99f15LS0tJUn748y6V5Sfkj/pyh+UEJu8Wm98PUi8vnwiBdgJMZWdB0GeN46OdmfG+gNtVdf5PWNjH8ysHtW+DqCZcjD4IyZxhbmyyX2BWE7sqFXkAG3lZDrzHQuixX1D6limDDx3YLi4qqWx8WOZ/GsymdOqSmIDAZNk7O17eSzE1FUrG1+Rsfdj0y8AO8fEuuw1gvE7gCqlEmJ+WfDhq7xOYCWTC89mUdoEos/L6DLjHYvE5VF2295x+w1g14tFvZIIfyRClUxjwdh1hGLTnfYg7LPNiIlNPibvu0WJpkX1whiQMfDEIPYKDpHYQIRRMhCdKqY2rX6JGPZpUrcTs73GBd5ZquBpq/P5vTJxg9r0awX2JGXv7llCbJJtvD1mCcua0XPRJZlc8NVPxrBnZO8E21fEKnFkRpgvDFmgAwLQTmZ+euH4GFsbpbsfo5UEXVmCdYaw7KmR3DDg94UkC8rJbsAA2gkoinJOiSo3APRFmcTtBU4/V7QY/OcDrdXX+50SyeQyKADaSfidgkg3jvFoe9v784NOyqXjnGA4oBV4bExMnsJi+DoQzQqaeG8/Zl5hFjSpBd4o4g3YNMYtWXtR9q09+x6V2ehx0ulahsddJ/OE2EmpwN5AfF3x6uXIzIcBmmsWck9FXVV+9E46wM4Jt5JVCWgk+uRihdSPP2LQLD+3NKVkAxhJJhxA2aeL3MXGzk2qf4sSzywW86/6DNEv5oMGoN06+1I0W9YGpwkzA6+LkpgaxUJoVDQHFUC7UTemshdWEG3+v3+qE8H+RVTQBsVb2K0xtbWZsWIYbew5RjLQXxd+QA+6CuxJvnPbtMraCMY7ZB2aE/UtTT+Q3GwHLUA7afs4WqFQaIuqsf2hM6gB9keDo9YsAwxJtAywDDAkgZDu5QosAwxJIKR7uQLLAEMSCOlersCQAP8HXEQPjfVJRIAAAAAASUVORK5CYII=",Rx="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAB1tJREFUeF7tnGlsHOUdxp9nNo4dSuJE8Y4rFaI9wtFIRPYOCmlKSCiXBIIgIBKUqJUAcRSEyBdKS6s2lWjKJ4gICAoI+EDEfQj4EiRCEDQt1YzjIM54Zx2KgN11AklaxXG8829n7aASvDvvHLv2Drtf5/lfv3nfmXmvJdq/UAQYyrptjDbAkI2gDbANMCSBkObtFtgGGJJASPN2C5xpAPcu/dEJlY7OyyFIAZgv5AKI/IDk5+LIMIlhELt10347ZO7fMi/3pVYjwcUiWkooaQh0AAcJfCXE15rwk04een6e+flIlHEjaYGlJcnj2TXv5wJZB3KlSoIC7KXIy0J5utcsbFWxOVYz0pdaU9G0tSQvATBXxYdAXif4pG7mn1DRe2lCASwtSf2QXdp6IW4A2O0VrNZ1gXyqAb9JmvYWLx8CJEpG5noIN5BIeulrxhSUNeK+jrEjm+e/9+lXQf0EBljMZW8ncXfQwFPZCeQfs5zK+oUDe3ZMdb2YS11AJO4B8eOo4gpklI7cog8UHg3iMxDAUi57H4hbggT0tBERAhuSlr3hqNZtdWUj+yCA6zztAwvkNt20N/k19w2wZGQfB/BLv4H86gV4WS8evupAN+aMdna+RmK5Xx++9Y5s1Afs3/qx8wWwZGQ2ArzDT4AwWhHZRfctDpwYxo8vW3F+p1uFu1RtlAGW+tNXQNOeVXXcsrrqI0TWJK3CKyo1KAEs92dOd8i3SXSqOG11jUAOJaRi9Fh7PvSqxROgACwZmTzBtJezWF0XGdQtu8+rJk+Apf70tdC0R7wcxfE6IVd7fZvWBSjArLKRLQA4IY6AvGoSwNbN/EkEnFraugBLRnotoD3jFSjO1ylycdKyXw0IMOuOF38RZ0BetYng4V4rf30ggEUjO0JgoVeQOF8XYKTXzNccc9fswsW+7Aom8E6c4ajWplVkWc9O+59T6WsDNDK/Ini/apA46yi4IWnl/+oLYDmX+YOQf4wzGOXaxLlTtwp/9gWwlMtsBnmzcpA4C0Xu1S17vT+ARvsN/A0wkcd0y77GJ8D0JkC7Nc4NS7k2kU26Zd/mC2DZyP5egD8pB4mzsM4UV7238E0EH4gzF9XaKLgxaeUf8tcC+1KrJZHYphok1jrHWaUPFN7yBVAWL+4sd8u/AcyKNRzv4saT+3k8h4YO+wLoiou57N9I/MQ7RpwV8o5u2mfWqtBjNibzF4C/jjMez9o8FprqAtxnZE4bB3d5BomrQEQ6RNILBgp7ArXAiW6ceZ3kuXFlVLcukRd0y768nsZzSr/Ylz6PCS3Q3pVWh07B6Ukrb4YCONkKB0kubXUg/vKX53TTXutl49kCqwC/d3ODsn/OEZ48d1e+FAlA10nJ+P6MjevN/x0LVKkFukaTH9bvA8h63ZVWvu7uEOs1beV9OMoAXSgjRuoMB4m/tzKgermLyH+0CnLJQfsT1Rp9Aax25Vz6ZlDbrBqgZXTunhji4qRpv+YnZ98AJ97K2YdI1Fzq85PAjNE6coc+YPveMBoI4P/mCbWykdkOsOYYccaAUUhEIFt6TftqBel3JIEAul6+Pm3RgrHZHYNN3bsXpEIPGxHs0K38WQTGg7gPDLD6POzLnCQJ7mjZxXfBh4kDXL5waOhAEHiuTSiAE8/D9FKC20HOD5rEtNiJ7O7i6Iqw50ZCA3SLr27A1LCd4HHTAsN/0H/hUGWZ/sHwl/5Nv20RCcAJiKlVDhNbScwOm1Rj7eWLjoqzYsHO4eEo4kQGsArRyFzk7q4HmIgiuah9CGQfhWfoVn4oKt+RApzszleJRs8TR1EVoO5H9ovIWb1WIdIJ4sgBugWNGNlLHcDd0T8jFqTcc3kJGV+psmlc/YZMKBsCcPIT50Ik+BKADr9JRakXkRLBn0bZbf8/v4YBrLbEXPZnFcqrBOdECUXVl3uIcXbFWRXVC2OquA0FONGdqzM47pLAPNXCI9GJ7CYrq5Lmni8i8VfDScMBunHd1b0j4LZmjVjcI2Jdh8fO7n7/s32NhNfQZ+CxiReNE7PEbHerSEPPvQnkXR46eI7+QdndVdHwX1Na4NEq3APamKNtA3hqYyqTrcm9zhoOD482xv93vTYV4GR37j4CbCW4LNIiRZ5KWvY6ApVI/Xo4azpANx9JpbrKCzV3xHJ+FMV6neWIIkYtH9MCsAqxOimbfQqA59prTQAiAuJO3bQ3NhJSPd/TBvCb52LAQ9wiGANwZa+Vf3G64DX1LVyvyGJ/5kYSD4BUvKGyXxuX83sGC+9OJ7wZA9BNpJjLXEbyeQUgn2monNdjDn+koG24RPGONzyPaoC9udTyCqujlqn/REcwhNHKyigmQqOqaEYBrELsX7RknB1vHvunOgJ5r2t0bHUzRhd+4M44gJPfiovGwTeObiNp9uii5QG6BUwsm85yIZaaPbqIBUC3iPIpPXOTH48c9FNQs7Uzsgs3G0KYeG2AYeg1cko/ZF4tY95ugSFvVRtgG2BIAiHN2y2wDTAkgZDm7RYYEuB/AT5vX2/VuCtzAAAAAElFTkSuQmCC",lC=u.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
  margin: 0 auto;
`,cC=u.h2`
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`,Tx=u.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 20px;
  margin-top: 20px;
  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 5px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
    max-width: 400px;
  }
`,Dx=u.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  margin: 10px;
  width: 200px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
    transform: translateY(-5px);
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 130px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 200px;
  }
`,Nx=u(hn)`
  text-decoration: none;
  &:link {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
  &:active {
    color: inherit;
  }
`,Ox=u.img`
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
  object-fit: cover;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 130px;
    height: 140px;
  }
`,zx=u.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`,_x=u.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
`,Mx=u.div`
  font-size: 20px;
  color: #ffaa00;
  text-align: left;
  margin-left: -5px;
  margin-top: 5px;
`,$x=u.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  text-align: left;
`,Fx=u.div`
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
`,Bx=u.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff4d4f;
`,Ux=u.img`
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  content: ${({likes:e})=>`url(${e?Rx:Lx})`};
  color: ${({likes:e})=>e?"red ":"transparent"};

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
  }
`,uC=u.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`,dC=u.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  position: absolute;
  top: 15px;
  left: 190px;
  padding: 10px 20px;
  z-index: 10;
  visibility: ${e=>e.isExpanded?"visible":"hidden"};
  opacity: ${e=>e.isExpanded?1:0};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`,pC=u.div`
  padding: 5px 10px;
  border-radius: 5px;
  width: 120px;
  font-weight: ${e=>e.isSelected?"bold":"normal"};
  text-decoration: ${e=>e.isSelected?"underline":"none"};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`,Wx=u.div`
  position: relative;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`,Qx=u(hn)`
  position: absolute;
  right: 20px;
  display: inline-block;
  padding: 10px 30px;
  background-color: black;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;
    background-color: gray;
  }
`,fC=({products:e})=>{const t=i=>[...i].sort((s,l)=>l.reviews.length-s.reviews.length).slice(0,8),n=k.useMemo(()=>t(e),[e]),r=()=>{};return a.jsxs(lC,{children:[a.jsx(cC,{children:"실시간 인기 상품"}),a.jsx(Tx,{children:n.map(i=>a.jsxs(Dx,{children:[a.jsxs(Nx,{to:`/products/${i.id}`,children:[a.jsx(Ox,{src:i.url,alt:i.name}),a.jsxs(zx,{children:[a.jsx(_x,{children:i.name}),a.jsx(Mx,{children:a.jsx(vs,{rating:i.rating})}),a.jsxs($x,{children:[a.jsxs(Fx,{children:["$",i.originalPrice.toFixed(2)]}),a.jsxs(Bx,{children:["$",i.discountPrice.toFixed(2)]})]})]})]}),a.jsx(Ux,{likes:i.available,onClick:r})]},i.id))}),a.jsx(Wx,{children:a.jsx(Qx,{to:"/products",children:"더보기"})})]})},hC=({product:e})=>a.jsx(mC,{to:`/products/${e.id}`,children:a.jsxs(gC,{children:[a.jsx(xC,{children:a.jsx(yC,{src:e.url,alt:e.name})}),a.jsxs(vC,{children:[a.jsx(wC,{children:a.jsx(vs,{rating:e.rating})}),a.jsxs(jC,{children:[a.jsxs(CC,{children:[a.jsx(SC,{children:e.name}),a.jsx(bC,{children:e.category})]}),a.jsx(kC,{children:" 상품설명- 추후 추가 예정"})]})]})]})}),mC=u(hn)`
  width: 80%;
  margin: 0 auto;
  display: block;
  text-decoration: none;
  color: inherit;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`,gC=u.div`
  height: 300px;
  width: 1100px;
  display: flex;
  background-color: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 750px;
    height: 300px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 550px;
    height: 200px;
  }
`,xC=u.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  @media (min-width: 576px) and (max-width: 767px) {
    width: 200px;
    height: 200px;
  }
`,yC=u.img`
  height: 300px;
  width: auto;
  object-fit: contain;
`,vC=u.div`
  background: linear-gradient(to top, rgba(155, 155, 155, 0.7), transparent);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
  background-color: #f5f5f5;
  position: relative;
`,wC=u.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 15px;
    top: 10px;
  }
`,jC=u.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,CC=u.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 15px;
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    flex-direction: column;
  }
`,SC=u.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-right: 15px;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 19px;
  }
`,bC=u.p`
  font-size: 16px;
  color: #666;
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: -10px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
  }
`,kC=u.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    display: none;
  }
`,PC=({categories:e,products:t})=>{const[n,r]=k.useState(!1),[i,o]=k.useState("생활용품"),s=()=>r(!n),l=p=>{o(p),r(!1)},c=t.filter(p=>p.category.toLowerCase().includes(i.toLowerCase())),d=p=>[...p].sort(()=>.5-Math.random()).slice(0,8),f=k.useMemo(()=>d(c),[c]);return k.useEffect(()=>{},[i]),a.jsxs(EC,{children:[a.jsxs(uC,{children:[a.jsx(AC,{onClick:s,children:i}),a.jsx(dC,{isExpanded:n,children:e.map(p=>a.jsx(pC,{isSelected:p==i,onClick:()=>l(p),children:p},p))})]}),a.jsx(Tx,{children:f.map(p=>a.jsxs(Dx,{children:[a.jsxs(Nx,{to:`/products/${p.id}`,children:[a.jsx(Ox,{src:p.url,alt:p.name}),a.jsxs(zx,{children:[a.jsx(_x,{children:p.name}),a.jsxs(Mx,{children:[" ",a.jsx(vs,{rating:p.rating})]}),a.jsxs($x,{children:[a.jsxs(Fx,{children:["$",p.originalPrice.toFixed(2)]}),a.jsxs(Bx,{children:["$",p.discountPrice.toFixed(2)]})]})]})]}),a.jsx(Ux,{likes:p.available})]},p.id))}),a.jsx(Wx,{children:a.jsx(Qx,{to:`/products?category=${i}`,children:"더보기"})})]})},EC=u.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
  margin: 0 auto;
`,AC=u.h2`
  text-decoration: underline;
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
  &:hover {
    cursor: pointer;
  }
`;var Hx={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Rh=Lt.createContext&&Lt.createContext(Hx),IC=["attr","size","title"];function LC(e,t){if(e==null)return{};var n=RC(e,t),r,i;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)r=o[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function RC(e,t){if(e==null)return{};var n={};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}function tl(){return tl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},tl.apply(this,arguments)}function Th(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function nl(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Th(Object(n),!0).forEach(function(r){TC(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Th(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function TC(e,t,n){return t=DC(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function DC(e){var t=NC(e,"string");return typeof t=="symbol"?t:t+""}function NC(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Vx(e){return e&&e.map((t,n)=>Lt.createElement(t.tag,nl({key:n},t.attr),Vx(t.child)))}function mn(e){return t=>Lt.createElement(OC,tl({attr:nl({},e.attr)},t),Vx(e.child))}function OC(e){var t=n=>{var{attr:r,size:i,title:o}=e,s=LC(e,IC),l=i||n.size||"1em",c;return n.className&&(c=n.className),e.className&&(c=(c?c+" ":"")+e.className),Lt.createElement("svg",tl({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,r,s,{className:c,style:nl(nl({color:e.color||n.color},n.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),o&&Lt.createElement("title",null,o),e.children)};return Rh!==void 0?Lt.createElement(Rh.Consumer,null,n=>t(n)):t(Hx)}function zC(e){return mn({tag:"svg",attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"},child:[]}]})(e)}function up(e){return mn({tag:"svg",attr:{viewBox:"0 0 256 512"},child:[{tag:"path",attr:{d:"M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"},child:[]}]})(e)}function dp(e){return mn({tag:"svg",attr:{viewBox:"0 0 256 512"},child:[{tag:"path",attr:{d:"M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"},child:[]}]})(e)}function _C(e){return mn({tag:"svg",attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M576 64H205.26A63.97 63.97 0 0 0 160 82.75L9.37 233.37c-12.5 12.5-12.5 32.76 0 45.25L160 429.25c12 12 28.28 18.75 45.25 18.75H576c35.35 0 64-28.65 64-64V128c0-35.35-28.65-64-64-64zm-84.69 254.06c6.25 6.25 6.25 16.38 0 22.63l-22.62 22.62c-6.25 6.25-16.38 6.25-22.63 0L384 301.25l-62.06 62.06c-6.25 6.25-16.38 6.25-22.63 0l-22.62-22.62c-6.25-6.25-6.25-16.38 0-22.63L338.75 256l-62.06-62.06c-6.25-6.25-6.25-16.38 0-22.63l22.62-22.62c6.25-6.25 16.38-6.25 22.63 0L384 210.75l62.06-62.06c6.25-6.25 16.38-6.25 22.63 0l22.62 22.62c6.25 6.25 6.25 16.38 0 22.63L429.25 256l62.06 62.06z"},child:[]}]})(e)}function qx(e){return mn({tag:"svg",attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"},child:[]}]})(e)}function MC(e){return mn({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"},child:[]}]})(e)}function pp(e){return mn({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"},child:[]}]})(e)}function $C(e){return mn({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"},child:[]}]})(e)}function fp(e){return mn({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"},child:[]}]})(e)}function FC(e){return mn({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}const js=()=>{const[e,t]=k.useState(!1);k.useEffect(()=>{const r=()=>{window.scrollY>200?t(!0):t(!1)};return window.addEventListener("scroll",r),()=>window.removeEventListener("scroll",r)},[]);const n=()=>{window.scrollTo({top:0,behavior:"smooth"})};return e?a.jsx(BC,{onClick:n,children:a.jsx(zC,{})}):null},BC=u.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
`,UC=["식료품","생활용품","패션/의류","전자제품","가구/인테리어","유아/아동용품","스포츠"],WC={id:16,name:"키친타올 세트",rating:4,originalPrice:12,discountPrice:9.99,url:"https://via.placeholder.com/200",category:"생활용품",description:"흡수력이 뛰어난 고품질 키친타올입니다.",minamount:6,now:12,currentStock:20,deadline:"2024-12-08",reviews:[{review:"가성비 최고입니다.",rating:4},{review:"흡수력이 강해서 만족스럽습니다.",rating:4}],available:!1},Gr=[{id:1,name:"LG 올레드 TV",rating:5,originalPrice:2500,discountPrice:2199.99,url:"https://via.placeholder.com/200",category:"전자제품",description:"선명한 화질을 제공하는 최신형 올레드 TV입니다.",minamount:8,now:12,currentStock:20,deadline:"2024-12-31",reviews:[{review:"화질이 정말 선명하고 만족스럽습니다.",rating:5},{review:"디자인도 훌륭합니다.",rating:5}],available:!0},{id:2,name:"다이슨 무선 청소기",rating:4.5,originalPrice:500,discountPrice:449.99,url:"https://via.placeholder.com/200",category:"가전제품",description:"강력한 흡입력을 자랑하는 프리미엄 무선 청소기입니다.",minamount:10,now:15,currentStock:20,deadline:"2024-12-15",reviews:[{review:"청소가 훨씬 쉬워졌습니다.",rating:4},{review:"흡입력이 강해서 만족합니다.",rating:5}],available:!1},{id:3,name:"BOSE 스피커",rating:5,originalPrice:300,discountPrice:249.99,url:"https://via.placeholder.com/200",category:"음향기기",description:"뛰어난 음질을 제공하는 고급 블루투스 스피커입니다.",minamount:9,now:8,currentStock:20,deadline:"2024-12-20",reviews:[{review:"음질이 놀랍도록 좋습니다.",rating:5},{review:"디자인도 세련되고 멋집니다.",rating:4}],available:!0},{id:4,name:"나이키 에어포스",rating:4.5,originalPrice:150,discountPrice:129.99,url:"https://via.placeholder.com/200",category:"패션",description:"편안한 착용감을 제공하는 인기 운동화입니다.",minamount:7,now:14,currentStock:20,deadline:"2024-11-28",reviews:[{review:"신발이 편안하고 스타일리시합니다.",rating:5},{review:"가성비가 좋습니다.",rating:4}],available:!1},{id:5,name:"스타벅스 머그컵",rating:4,originalPrice:30,discountPrice:24.99,url:"https://via.placeholder.com/200",category:"생활용품",description:"스타벅스 공식 디자인의 인기 머그컵입니다.",minamount:6,now:18,currentStock:20,deadline:"2024-12-08",reviews:[{review:"디자인이 정말 예쁩니다.",rating:4},{review:"사용하기 편리합니다.",rating:4}],available:!0},{id:6,name:"애플 에어팟",rating:4.5,originalPrice:200,discountPrice:179.99,url:"https://via.placeholder.com/200",category:"음향기기",description:"뛰어난 연결성과 음질을 자랑하는 무선 이어폰입니다.",minamount:9,now:10,currentStock:20,deadline:"2024-12-12",reviews:[{review:"음질이 탁월하고 사용이 편리합니다.",rating:5},{review:"배터리 성능이 아쉽지만 만족합니다.",rating:4}],available:!1},{id:7,name:"소니 미러리스 카메라",rating:5,originalPrice:1200,discountPrice:999.99,url:"https://via.placeholder.com/200",category:"전자제품",description:"선명한 사진 촬영이 가능한 고성능 미러리스 카메라입니다.",minamount:8,now:11,currentStock:20,deadline:"2024-11-28",reviews:[{review:"화질이 뛰어나서 만족스럽습니다.",rating:5},{review:"조작이 쉬워서 초보자에게도 추천합니다.",rating:5}],available:!0},{id:8,name:"아디다스 트레이닝복 세트",rating:4.5,originalPrice:120,discountPrice:99.99,url:"https://via.placeholder.com/200",category:"패션",description:"편안하고 활동적인 착용감을 제공하는 트레이닝복입니다.",minamount:7,now:13,currentStock:20,deadline:"2024-12-09",reviews:[{review:"운동할 때 정말 편안합니다.",rating:4},{review:"디자인도 마음에 듭니다.",rating:5}],available:!1},{id:9,name:"HP 게이밍 노트북",rating:5,originalPrice:1500,discountPrice:1299.99,url:"https://via.placeholder.com/200",category:"전자제품",description:"최고의 성능을 제공하는 고성능 게이밍 노트북입니다.",minamount:12,now:7,currentStock:20,deadline:"2024-12-22",reviews:[{review:"게임 성능이 정말 탁월합니다.",rating:5},{review:"발열이 조금 있지만 만족합니다.",rating:4}],available:!0},{id:10,name:"브리타 정수기",rating:4,originalPrice:100,discountPrice:89.99,url:"https://via.placeholder.com/200",category:"생활용품",description:"깨끗한 물을 제공하는 브리타 정수기입니다.",minamount:5,now:9,currentStock:20,deadline:"2024-12-05",reviews:[{review:"물맛이 정말 좋아졌습니다.",rating:5},{review:"디자인도 깔끔하고 만족합니다.",rating:4}],available:!1},{id:11,name:"샤오미 로봇 청소기",rating:5,originalPrice:400,discountPrice:349.99,url:"https://via.placeholder.com/200",category:"생활용품",description:"자율 주행 기술이 탑재된 고성능 로봇 청소기입니다.",minamount:9,now:10,currentStock:20,deadline:"2024-11-28",reviews:[{review:"청소가 훨씬 수월해졌어요!",rating:5},{review:"소음이 적어서 만족합니다.",rating:4}],available:!0},{id:12,name:"삼성 냉장고",rating:4.5,originalPrice:1500,discountPrice:1299.99,url:"https://via.placeholder.com/200",category:"전자제품",description:"에너지 효율이 뛰어난 대용량 냉장고입니다.",minamount:11,now:7,currentStock:20,deadline:"2024-12-28",reviews:[{review:"냉장 성능이 정말 좋아요.",rating:5},{review:"공간이 넉넉해서 편리합니다.",rating:4}],available:!1},{id:13,name:"맥북 프로",rating:5,originalPrice:2e3,discountPrice:1799.99,url:"https://via.placeholder.com/200",category:"전자제품",description:"전문가용 고성능 노트북으로 최고의 성능을 제공합니다.",minamount:10,now:5,currentStock:20,deadline:"2024-11-28",reviews:[{review:"디자인이 고급스럽고 성능이 대단해요.",rating:5},{review:"가격이 비싸지만 값어치를 합니다.",rating:4}],available:!0},{id:14,name:"갤럭시 워치",rating:4.5,originalPrice:300,discountPrice:249.99,url:"https://via.placeholder.com/200",category:"전자제품",description:"운동과 건강 관리를 돕는 스마트워치입니다.",minamount:8,now:14,currentStock:20,deadline:"2024-11-28",reviews:[{review:"운동할 때 정말 유용해요!",rating:4},{review:"디자인이 멋지고 배터리 성능이 훌륭합니다.",rating:5}],available:!1},{id:15,name:"필립스 에어프라이어",rating:5,originalPrice:180,discountPrice:149.99,url:"https://via.placeholder.com/200",category:"주방용품",description:"기름 없이도 맛있는 튀김 요리를 만들 수 있습니다.",minamount:7,now:16,currentStock:20,deadline:"2024-12-20",reviews:[{review:"건강하게 요리할 수 있어서 좋아요.",rating:5},{review:"작동이 간편해서 자주 사용합니다.",rating:4}],available:!0},{id:16,name:"키친타올 세트",rating:4,originalPrice:12,discountPrice:9.99,url:"https://via.placeholder.com/200",category:"생활용품",description:"흡수력이 뛰어난 고품질 키친타올입니다.",minamount:6,now:12,currentStock:20,deadline:"2024-12-08",reviews:[{review:"가성비 최고입니다.",rating:4},{review:"흡수력이 강해서 만족스럽습니다.",rating:4}],available:!1},{id:17,name:"샤넬 No.5 향수",rating:5,originalPrice:120,discountPrice:99.99,url:"https://via.placeholder.com/200",category:"화장품",description:"우아하고 세련된 향을 지닌 고급 향수입니다.",minamount:9,now:10,currentStock:20,deadline:"2024-11-28",reviews:[{review:"선물용으로 딱 좋아요.",rating:5},{review:"향이 오래 지속됩니다.",rating:4}],available:!0},{id:18,name:"아이폰 15",rating:5,originalPrice:1200,discountPrice:1099.99,url:"https://via.placeholder.com/200",category:"전자제품",description:"최신 기술이 탑재된 고성능 스마트폰입니다.",minamount:12,now:8,currentStock:20,deadline:"2024-12-29",reviews:[{review:"화면이 정말 선명해요.",rating:5},{review:"카메라가 최고입니다.",rating:5}],available:!1},{id:19,name:"아디다스 운동화",rating:4.5,originalPrice:150,discountPrice:129.99,url:"https://via.placeholder.com/200",category:"패션",description:"편안하고 스타일리시한 운동화입니다.",minamount:7,now:15,currentStock:20,deadline:"2024-12-18",reviews:[{review:"착용감이 아주 편안합니다.",rating:5},{review:"오랜 시간 신어도 발이 아프지 않아요.",rating:4}],available:!0},{id:20,name:"소니 헤드폰",rating:4.5,originalPrice:400,discountPrice:349.99,url:"https://via.placeholder.com/200",category:"전자제품",description:"노이즈 캔슬링과 뛰어난 음질을 자랑하는 헤드폰입니다.",minamount:10,now:6,currentStock:20,deadline:"2024-12-25",reviews:[{review:"음질이 정말 좋습니다.",rating:5},{review:"장시간 착용에도 편안합니다.",rating:4}],available:!1}],QC=()=>a.jsxs(a.Fragment,{children:[a.jsx(wc,{children:a.jsx(jc,{children:a.jsx(hC,{product:WC})})}),a.jsx(wc,{children:a.jsx(jc,{children:a.jsx(fC,{products:Gr})})}),a.jsxs(wc,{children:[a.jsx(jc,{children:a.jsx(PC,{categories:UC,products:Gr})}),a.jsx(js,{})]})]}),wc=u.div`
  display: flex;
  margin-top: 5vh;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`,jc=u.div`
  display: flex;
  align-items: center;
  width: 100%;
`,hp=({selectedCategory:e,onCategoryChange:t})=>{const[n,r]=k.useState(e);k.useEffect(()=>{r(e)},[e]);const i=["생활용품","식료품","패션/의류","전자제품","가구/인테리어","유아/아동용품","스포츠"],o=s=>{r(s),t(s)};return a.jsx(HC,{children:i.map(s=>a.jsx(VC,{active:s===n,onClick:()=>o(s),children:s},s))})},HC=u.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 10px;
  width: 100%;
  justify-content: center;
`,VC=u.div`
  padding: 1rem 1rem;
  font-weight: ${({active:e})=>e?"bold":"normal"};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    display: ${({active:e})=>e?"block":"none"};
    height: 2px;
    background-color: black;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`,mp=[{postId:"communityPost-00001",title:"생활용품 관련 공구 글 1 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00001",authorNickname:"사용자 A",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T00:00:00",updatedAt:"2024-11-01T00:00:00",closeAt:"2024-11-08T00:00:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[],comments:[]},{postId:"communityPost-00002",title:"생활용품 관련 공구 글 2 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00001",authorNickname:"사용자 A",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T01:00:00",updatedAt:"2024-11-01T01:00:00",closeAt:"2024-11-08T01:00:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[],comments:[]},{postId:"communityPost-00003",title:"생활용품 관련 공구 글 3 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00001",authorNickname:"사용자 A",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T02:00:00",updatedAt:"2024-11-01T02:00:00",closeAt:"2024-11-08T02:00:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[],comments:[]},{postId:"communityPost-00004",title:"생활용품 관련 공구 글 4 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00002",authorNickname:"사용자 B",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T03:00:00",updatedAt:"2024-11-01T03:00:00",closeAt:"2024-11-08T03:00:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[],comments:[]},{postId:"communityPost-00005",title:"생활용품 관련 공구 글 5 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00002",authorNickname:"사용자 B",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T04:00:00",updatedAt:"2024-11-01T04:00:00",closeAt:"2024-11-08T04:00:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[],comments:[]},{postId:"communityPost-00006",title:"생활용품 관련 공구 글 6 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00002",authorNickname:"사용자 B",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T05:00:00",updatedAt:"2024-11-01T05:00:00",closeAt:"2024-11-08T05:00:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[],comments:[]},{postId:"communityPost-00007",title:"생활용품 관련 공구 글 7 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00002",authorNickname:"사용자 B",currentQuantity:5,requiredQuantity:5,createdAt:"2024-11-25T06:00:00",updatedAt:"2024-11-25T06:00:00",closeAt:"2024-11-02T06:00:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[{userId:"user-00002",quantity:2,isCancelled:!1},{userId:"user-00001",quantity:2,isCancelled:!1},{userId:"user-00003",quantity:1,isCancelled:!0},{userId:"user-00004",quantity:1,isCancelled:!1}],comments:[]},{postId:"communityPost-00008",title:"생활용품 관련 공구 글 8 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00003",authorNickname:"사용자 C",currentQuantity:2,requiredQuantity:5,createdAt:"2024-11-25T07:50:00",updatedAt:"2024-11-25T07:50:00",closeAt:"2024-12-02T07:50:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[{userId:"user-00001",quantity:2,isCancelled:!1},{userId:"user-00003",quantity:1,isCancelled:!0}],comments:[{userId:"user-00002",createdAt:"2024-11-26T10:08:10",content:"댓글 내용을 이런식으로 입력했을거라고 가정한다.",commentId:"comment-00001"},{userId:"user-00001",createdAt:"2024-11-26T10:10:10",content:"로그인한 사용자가 댓글 내용을 이런식으로 입력했을거라고 가정한다.",commentId:"comment-00002"}]},{postId:"communityPost-00009",title:"생활용품 관련 공구 글 9 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300","https://picsum.photos/id/39/200/300","https://picsum.photos/id/40/200/300"],url:"https://www.naver.com",authorId:"user-00003",authorNickname:"사용자 C",currentQuantity:2,requiredQuantity:5,createdAt:"2024-11-25T08:00:00",updatedAt:"2024-11-25T08:00:00",closeAt:"2024-12-02T08:00:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[{userId:"user-00002",quantity:2,isCancelled:!1},{userId:"user-00003",quantity:1,isCancelled:!0}],comments:[{userId:"user-00002",createdAt:"2024-11-26T10:08:10",content:"댓글 내용을 이런식으로 입력했을거라고 가정한다.",commentId:"comment-00001"},{userId:"user-00001",createdAt:"2024-11-26T10:10:10",content:"로그인한 사용자가 댓글 내용을 이런식으로 입력했을거라고 가정한다.",commentId:"comment-00002"}]},{postId:"communityPost-000010",title:"식료품 관련 공구 글 1 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00003",authorNickname:"사용자 C",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T00:00:00",updatedAt:"2024-11-01T00:00:00",closeAt:"2024-11-08T00:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-000011",title:"식료품 관련 공구 글 2 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00003",authorNickname:"사용자 C",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T01:00:00",updatedAt:"2024-11-01T01:00:00",closeAt:"2024-11-08T01:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-000012",title:"식료품 관련 공구 글 3 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00003",authorNickname:"사용자 C",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T02:00:00",updatedAt:"2024-11-01T02:00:00",closeAt:"2024-11-08T02:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00013",title:"식료품 관련 공구 글 4 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00004",authorNickname:"사용자 D",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T03:00:00",updatedAt:"2024-11-01T03:00:00",closeAt:"2024-11-08T03:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00014",title:"식료품 관련 공구 글 5 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00005",authorNickname:"사용자 E",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T04:00:00",updatedAt:"2024-11-01T04:00:00",closeAt:"2024-11-08T04:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00015",title:"식료품 관련 공구 글 6 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00005",authorNickname:"사용자 E",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T05:00:00",updatedAt:"2024-11-01T05:00:00",closeAt:"2024-11-08T05:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00016",title:"식료품 관련 공구 글 7 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00005",authorNickname:"사용자 E",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T06:00:00",updatedAt:"2024-11-01T06:00:00",closeAt:"2024-11-08T06:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00017",title:"식료품 관련 공구 글 8 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00006",authorNickname:"사용자 F",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T07:00:00",updatedAt:"2024-11-01T07:00:00",closeAt:"2024-11-08T07:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00018",title:"식료품 관련 공구 글 9 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00007",authorNickname:"사용자 G",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T08:00:00",updatedAt:"2024-11-01T08:00:00",closeAt:"2024-11-08T08:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00019",title:"식료품 관련 공구 글 10 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00007",authorNickname:"사용자 G",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T09:00:00",updatedAt:"2024-11-01T09:00:00",closeAt:"2024-11-08T09:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00020",title:"식료품 관련 공구 글 11 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00008",authorNickname:"사용자 H",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T10:00:00",updatedAt:"2024-11-01T10:00:00",closeAt:"2024-11-08T10:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00021",title:"식료품 관련 공구 글 12 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00009",authorNickname:"사용자 I",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T11:00:00",updatedAt:"2024-11-01T11:00:00",closeAt:"2024-11-08T11:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00022",title:"식료품 관련 공구 글 13 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00009",authorNickname:"사용자 I",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T12:00:00",updatedAt:"2024-11-01T12:00:00",closeAt:"2024-11-08T12:00:00",totalPrice:1e4,unitPrice:2e3,category:"식료품",participants:[],comments:[]},{postId:"communityPost-00023",title:"패션/의류 관련 공구 글 1 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00009",authorNickname:"사용자 I",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T00:00:00",updatedAt:"2024-11-01T00:00:00",closeAt:"2024-11-08T00:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00024",title:"패션/의류 관련 공구 글 2 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00010",authorNickname:"사용자 J",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T01:00:00",updatedAt:"2024-11-01T0100:00",closeAt:"2024-11-08T01:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00025",title:"패션/의류 관련 공구 글 3 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00010",authorNickname:"사용자 J",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T02:00:00",updatedAt:"2024-11-01T02:00:00",closeAt:"2024-11-08T02:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00026",title:"패션/의류 관련 공구 글 4 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00011",authorNickname:"사용자 K",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T03:00:00",updatedAt:"2024-11-01T03:00:00",closeAt:"2024-11-08T03:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00027",title:"패션/의류 관련 공구 글 5 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00011",authorNickname:"사용자 K",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T04:00:00",updatedAt:"2024-11-01T04:00:00",closeAt:"2024-11-08T04:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00028",title:"패션/의류 관련 공구 글 6 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00011",authorNickname:"사용자 K",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T05:00:00",updatedAt:"2024-11-01T05:00:00",closeAt:"2024-11-08T05:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00029",title:"패션/의류 관련 공구 글 7 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00012",authorNickname:"사용자 L",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T06:00:00",updatedAt:"2024-11-01T06:00:00",closeAt:"2024-11-08T06:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00030",title:"패션/의류 관련 공구 글 8 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00012",authorNickname:"사용자 L",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T07:00:00",updatedAt:"2024-11-01T07:00:00",closeAt:"2024-11-08T07:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00031",title:"패션/의류 관련 공구 글 9 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00013",authorNickname:"사용자 M",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T08:00:00",updatedAt:"2024-11-01T08:00:00",closeAt:"2024-11-08T08:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00032",title:"패션/의류 관련 공구 글 10 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00013",authorNickname:"사용자 M",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T09:00:00",updatedAt:"2024-11-01T09:00:00",closeAt:"2024-11-08T09:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00033",title:"패션/의류 관련 공구 글 11 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00014",authorNickname:"사용자 N",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T10:00:00",updatedAt:"2024-11-01T10:00:00",closeAt:"2024-11-08T10:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00034",title:"패션/의류 관련 공구 글 12 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00014",authorNickname:"사용자 N",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T11:00:00",updatedAt:"2024-11-01T11:00:00",closeAt:"2024-11-08T11:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00035",title:"패션/의류 관련 공구 글 13 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00014",authorNickname:"사용자 N",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T12:00:00",updatedAt:"2024-11-01T12:00:00",closeAt:"2024-11-08T12:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00036",title:"패션/의류 관련 공구 글 14 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300"],url:"https://www.naver.com",authorId:"user-00014",authorNickname:"사용자 N",currentQuantity:0,requiredQuantity:5,createdAt:"2024-11-01T13:00:00",updatedAt:"2024-11-01T13:00:00",closeAt:"2024-11-08T13:00:00",totalPrice:1e4,unitPrice:2e3,category:"패션/의류",participants:[],comments:[]},{postId:"communityPost-00037",title:"생활용품 관련 공구 글 10 제목이 아주 길어질 거야 테스트를 해보자",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",images:["https://picsum.photos/id/38/200/300","https://picsum.photos/id/39/200/300","https://picsum.photos/id/40/200/300"],url:"https://www.naver.com",authorId:"user-00001",authorNickname:"사용자 A",currentQuantity:2,requiredQuantity:5,createdAt:"2024-11-27T08:00:00",updatedAt:"2024-11-27T08:00:00",closeAt:"2024-12-04T08:00:00",totalPrice:1e4,unitPrice:2e3,category:"생활용품",participants:[{userId:"user-00002",quantity:2,isCancelled:!1},{userId:"user-00003",quantity:1,isCancelled:!0}],comments:[{userId:"user-00002",createdAt:"2024-11-27T10:08:10",content:"댓글 내용을 이런식으로 입력했을거라고 가정한다.",commentId:"comment-00001"},{userId:"user-00001",createdAt:"2024-11-27T10:10:10",content:"로그인한 사용자가 댓글 내용을 이런식으로 입력했을거라고 가정한다.",commentId:"comment-00002"}]}],qC=({onClick:e})=>a.jsxs(GC,{onClick:e,children:[a.jsx($C,{})," 글 작성"]}),GC=u.button`
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`,KC=({placeholder:e="검색어를 입력해주세요.",value:t,onChange:n,onSearch:r})=>{const i=o=>{o.key==="Enter"&&r()};return a.jsxs(JC,{children:[a.jsx(XC,{type:"text",placeholder:e,value:t,onChange:n,onKeyDown:i}),a.jsx(YC,{onClick:r})," "]})},JC=u.div`
  display: flex;
  align-items: center;
  padding: 1.5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  width: 100%;
  max-width: 280px;

  &:focus-within {
    border-color: #000;
  }
`,XC=u.input`
  flex: 1;
  border: none;
  font-size: 1rem;
  padding: 8px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`,YC=u(FC)`
  color: #333;
  margin: 0 8px;
  font-size: 1.2rem;
  cursor: pointer; /* 클릭 가능 */
`,Gx=({currentPage:e,totalPages:t,onPageChange:n})=>t<=1?null:a.jsx(ZC,{children:Array.from({length:t},(r,i)=>a.jsx(eS,{active:e===i+1,onClick:()=>n(i+1),children:i+1},i+1))}),ZC=u.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
`,eS=u.button`
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid #fff;
  background-color: ${({active:e})=>e?"#000":"#fff"};
  color: ${({active:e})=>e?"#fff":"#333"};
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`,Cc=6,tS=({selectedCategory:e})=>{const t=tt(),[n,r]=k.useState(1),[i,o]=k.useState(""),[s,l]=k.useState(""),c=mp.filter(C=>C.category===e).sort((C,m)=>new Date(m.createdAt).getTime()-new Date(C.createdAt).getTime()),d=c.filter(C=>C.title.toLowerCase().includes(s.toLowerCase())).sort((C,m)=>new Date(m.createdAt).getTime()-new Date(C.createdAt).getTime()),f=Math.ceil(d.length/Cc),p=(n-1)*Cc,g=d.slice(p,p+Cc),w=()=>{l(i),r(1)};k.useEffect(()=>{l(""),o(""),r(1)},[e]);const v=()=>{t("/community/create",{state:{selectedCategory:e}})},y=C=>{t(`/community/posts/${C}`)};return a.jsxs(nS,{children:[a.jsxs(rS,{children:[a.jsx(qC,{onClick:v}),a.jsx(KC,{value:i,onChange:C=>o(C.target.value),onSearch:w})]}),c.length===0?a.jsx(Dh,{children:"선택된 카테고리에 해당하는 게시글이 없습니다."}):d.length===0?a.jsxs(Dh,{children:["'",s,"'의 검색 결과가 존재하지 않습니다."]}):g.map(C=>a.jsxs(iS,{onClick:()=>y(C.postId),children:[a.jsx(oS,{src:C.images[0],alt:C.title}),a.jsxs(sS,{children:[a.jsx(aS,{children:C.title}),a.jsxs(cS,{children:[a.jsx(uS,{children:C.authorNickname}),a.jsxs(dS,{children:[a.jsx(pS,{children:new Date(C.createdAt).toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1})}),"~",a.jsx(fS,{children:new Date(C.closeAt).toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1})})]}),a.jsxs(hS,{children:["참여 현황: ",C.currentQuantity," / ",C.requiredQuantity]})]}),a.jsx(lS,{children:C.content})]})]},C.postId)),f>1&&a.jsx(Gx,{currentPage:n,totalPages:f,onPageChange:C=>r(C)})]})},nS=u.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  max-width: 800px;
`,rS=u.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: center;
  margin-bottom: 16px;
  gap: 20px; /* 버튼과 검색바 사이의 간격 */
`,iS=u.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`,oS=u.img`
  width: 172px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
`,sS=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  padding: 4px 0;
`,aS=u.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 8px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,lS=u.p`
  font-size: 0.9rem;
  margin-bottom: 0;
  color: #555;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,cS=u.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 0.9rem;
  color: #777;
`,uS=u.span`
  font-weight: 400;
`,dS=u.span`
  font-weight: 400;
`,pS=u.span`
  font-weight: 400;
  margin-right: 10px;
`,fS=u.span`
  font-weight: 400;
  margin-left: 10px;
`,hS=u.div`
  font-weight: 400;
`,Dh=u.p`
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  padding: 20px;
`,mS=()=>{var i;const t=((i=Tn().state)==null?void 0:i.selectedCategory)||"생활용품",[n,r]=k.useState(t);return a.jsxs("div",{children:[a.jsx(gS,{children:a.jsxs(xS,{children:[a.jsx(yS,{children:"공구 모집 및 진행"}),a.jsx(hp,{selectedCategory:n,onCategoryChange:o=>r(o)}),a.jsx(tS,{selectedCategory:n})]})}),a.jsx(js,{})]})},gS=u.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`,xS=u.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`,yS=u.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: left;
`;function Kx(e,t){return function(){return e.apply(t,arguments)}}const{toString:vS}=Object.prototype,{getPrototypeOf:gp}=Object,Il=(e=>t=>{const n=vS.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),tn=e=>(e=e.toLowerCase(),t=>Il(t)===e),Ll=e=>t=>typeof t===e,{isArray:to}=Array,os=Ll("undefined");function wS(e){return e!==null&&!os(e)&&e.constructor!==null&&!os(e.constructor)&&Tt(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Jx=tn("ArrayBuffer");function jS(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Jx(e.buffer),t}const CS=Ll("string"),Tt=Ll("function"),Xx=Ll("number"),Rl=e=>e!==null&&typeof e=="object",SS=e=>e===!0||e===!1,ja=e=>{if(Il(e)!=="object")return!1;const t=gp(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},bS=tn("Date"),kS=tn("File"),PS=tn("Blob"),ES=tn("FileList"),AS=e=>Rl(e)&&Tt(e.pipe),IS=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||Tt(e.append)&&((t=Il(e))==="formdata"||t==="object"&&Tt(e.toString)&&e.toString()==="[object FormData]"))},LS=tn("URLSearchParams"),[RS,TS,DS,NS]=["ReadableStream","Request","Response","Headers"].map(tn),OS=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Cs(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,i;if(typeof e!="object"&&(e=[e]),to(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let l;for(r=0;r<s;r++)l=o[r],t.call(null,e[l],l,e)}}function Yx(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,i;for(;r-- >0;)if(i=n[r],t===i.toLowerCase())return i;return null}const Tr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Zx=e=>!os(e)&&e!==Tr;function Ku(){const{caseless:e}=Zx(this)&&this||{},t={},n=(r,i)=>{const o=e&&Yx(t,i)||i;ja(t[o])&&ja(r)?t[o]=Ku(t[o],r):ja(r)?t[o]=Ku({},r):to(r)?t[o]=r.slice():t[o]=r};for(let r=0,i=arguments.length;r<i;r++)arguments[r]&&Cs(arguments[r],n);return t}const zS=(e,t,n,{allOwnKeys:r}={})=>(Cs(t,(i,o)=>{n&&Tt(i)?e[o]=Kx(i,n):e[o]=i},{allOwnKeys:r}),e),_S=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),MS=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},$S=(e,t,n,r)=>{let i,o,s;const l={};if(t=t||{},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),o=i.length;o-- >0;)s=i[o],(!r||r(s,e,t))&&!l[s]&&(t[s]=e[s],l[s]=!0);e=n!==!1&&gp(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},FS=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},BS=e=>{if(!e)return null;if(to(e))return e;let t=e.length;if(!Xx(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},US=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&gp(Uint8Array)),WS=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let i;for(;(i=r.next())&&!i.done;){const o=i.value;t.call(e,o[0],o[1])}},QS=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},HS=tn("HTMLFormElement"),VS=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,i){return r.toUpperCase()+i}),Nh=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),qS=tn("RegExp"),e1=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Cs(n,(i,o)=>{let s;(s=t(i,o,e))!==!1&&(r[o]=s||i)}),Object.defineProperties(e,r)},GS=e=>{e1(e,(t,n)=>{if(Tt(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(Tt(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},KS=(e,t)=>{const n={},r=i=>{i.forEach(o=>{n[o]=!0})};return to(e)?r(e):r(String(e).split(t)),n},JS=()=>{},XS=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t,Sc="abcdefghijklmnopqrstuvwxyz",Oh="0123456789",t1={DIGIT:Oh,ALPHA:Sc,ALPHA_DIGIT:Sc+Sc.toUpperCase()+Oh},YS=(e=16,t=t1.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function ZS(e){return!!(e&&Tt(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const eb=e=>{const t=new Array(10),n=(r,i)=>{if(Rl(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[i]=r;const o=to(r)?[]:{};return Cs(r,(s,l)=>{const c=n(s,i+1);!os(c)&&(o[l]=c)}),t[i]=void 0,o}}return r};return n(e,0)},tb=tn("AsyncFunction"),nb=e=>e&&(Rl(e)||Tt(e))&&Tt(e.then)&&Tt(e.catch),n1=((e,t)=>e?setImmediate:t?((n,r)=>(Tr.addEventListener("message",({source:i,data:o})=>{i===Tr&&o===n&&r.length&&r.shift()()},!1),i=>{r.push(i),Tr.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Tt(Tr.postMessage)),rb=typeof queueMicrotask<"u"?queueMicrotask.bind(Tr):typeof process<"u"&&process.nextTick||n1,L={isArray:to,isArrayBuffer:Jx,isBuffer:wS,isFormData:IS,isArrayBufferView:jS,isString:CS,isNumber:Xx,isBoolean:SS,isObject:Rl,isPlainObject:ja,isReadableStream:RS,isRequest:TS,isResponse:DS,isHeaders:NS,isUndefined:os,isDate:bS,isFile:kS,isBlob:PS,isRegExp:qS,isFunction:Tt,isStream:AS,isURLSearchParams:LS,isTypedArray:US,isFileList:ES,forEach:Cs,merge:Ku,extend:zS,trim:OS,stripBOM:_S,inherits:MS,toFlatObject:$S,kindOf:Il,kindOfTest:tn,endsWith:FS,toArray:BS,forEachEntry:WS,matchAll:QS,isHTMLForm:HS,hasOwnProperty:Nh,hasOwnProp:Nh,reduceDescriptors:e1,freezeMethods:GS,toObjectSet:KS,toCamelCase:VS,noop:JS,toFiniteNumber:XS,findKey:Yx,global:Tr,isContextDefined:Zx,ALPHABET:t1,generateString:YS,isSpecCompliantForm:ZS,toJSONObject:eb,isAsyncFn:tb,isThenable:nb,setImmediate:n1,asap:rb};function te(e,t,n,r,i){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i,this.status=i.status?i.status:null)}L.inherits(te,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:L.toJSONObject(this.config),code:this.code,status:this.status}}});const r1=te.prototype,i1={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{i1[e]={value:e}});Object.defineProperties(te,i1);Object.defineProperty(r1,"isAxiosError",{value:!0});te.from=(e,t,n,r,i,o)=>{const s=Object.create(r1);return L.toFlatObject(e,s,function(c){return c!==Error.prototype},l=>l!=="isAxiosError"),te.call(s,e.message,t,n,r,i),s.cause=e,s.name=e.name,o&&Object.assign(s,o),s};const ib=null;function Ju(e){return L.isPlainObject(e)||L.isArray(e)}function o1(e){return L.endsWith(e,"[]")?e.slice(0,-2):e}function zh(e,t,n){return e?e.concat(t).map(function(i,o){return i=o1(i),!n&&o?"["+i+"]":i}).join(n?".":""):t}function ob(e){return L.isArray(e)&&!e.some(Ju)}const sb=L.toFlatObject(L,{},null,function(t){return/^is[A-Z]/.test(t)});function Tl(e,t,n){if(!L.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=L.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(y,C){return!L.isUndefined(C[y])});const r=n.metaTokens,i=n.visitor||f,o=n.dots,s=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&L.isSpecCompliantForm(t);if(!L.isFunction(i))throw new TypeError("visitor must be a function");function d(v){if(v===null)return"";if(L.isDate(v))return v.toISOString();if(!c&&L.isBlob(v))throw new te("Blob is not supported. Use a Buffer instead.");return L.isArrayBuffer(v)||L.isTypedArray(v)?c&&typeof Blob=="function"?new Blob([v]):Buffer.from(v):v}function f(v,y,C){let m=v;if(v&&!C&&typeof v=="object"){if(L.endsWith(y,"{}"))y=r?y:y.slice(0,-2),v=JSON.stringify(v);else if(L.isArray(v)&&ob(v)||(L.isFileList(v)||L.endsWith(y,"[]"))&&(m=L.toArray(v)))return y=o1(y),m.forEach(function(x,b){!(L.isUndefined(x)||x===null)&&t.append(s===!0?zh([y],b,o):s===null?y:y+"[]",d(x))}),!1}return Ju(v)?!0:(t.append(zh(C,y,o),d(v)),!1)}const p=[],g=Object.assign(sb,{defaultVisitor:f,convertValue:d,isVisitable:Ju});function w(v,y){if(!L.isUndefined(v)){if(p.indexOf(v)!==-1)throw Error("Circular reference detected in "+y.join("."));p.push(v),L.forEach(v,function(m,h){(!(L.isUndefined(m)||m===null)&&i.call(t,m,L.isString(h)?h.trim():h,y,g))===!0&&w(m,y?y.concat(h):[h])}),p.pop()}}if(!L.isObject(e))throw new TypeError("data must be an object");return w(e),t}function _h(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function xp(e,t){this._pairs=[],e&&Tl(e,this,t)}const s1=xp.prototype;s1.append=function(t,n){this._pairs.push([t,n])};s1.toString=function(t){const n=t?function(r){return t.call(this,r,_h)}:_h;return this._pairs.map(function(i){return n(i[0])+"="+n(i[1])},"").join("&")};function ab(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function a1(e,t,n){if(!t)return e;const r=n&&n.encode||ab,i=n&&n.serialize;let o;if(i?o=i(t,n):o=L.isURLSearchParams(t)?t.toString():new xp(t,n).toString(r),o){const s=e.indexOf("#");s!==-1&&(e=e.slice(0,s)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class Mh{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){L.forEach(this.handlers,function(r){r!==null&&t(r)})}}const l1={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},lb=typeof URLSearchParams<"u"?URLSearchParams:xp,cb=typeof FormData<"u"?FormData:null,ub=typeof Blob<"u"?Blob:null,db={isBrowser:!0,classes:{URLSearchParams:lb,FormData:cb,Blob:ub},protocols:["http","https","file","blob","url","data"]},yp=typeof window<"u"&&typeof document<"u",Xu=typeof navigator=="object"&&navigator||void 0,pb=yp&&(!Xu||["ReactNative","NativeScript","NS"].indexOf(Xu.product)<0),fb=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",hb=yp&&window.location.href||"http://localhost",mb=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:yp,hasStandardBrowserEnv:pb,hasStandardBrowserWebWorkerEnv:fb,navigator:Xu,origin:hb},Symbol.toStringTag,{value:"Module"})),St={...mb,...db};function gb(e,t){return Tl(e,new St.classes.URLSearchParams,Object.assign({visitor:function(n,r,i,o){return St.isNode&&L.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}function xb(e){return L.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function yb(e){const t={},n=Object.keys(e);let r;const i=n.length;let o;for(r=0;r<i;r++)o=n[r],t[o]=e[o];return t}function c1(e){function t(n,r,i,o){let s=n[o++];if(s==="__proto__")return!0;const l=Number.isFinite(+s),c=o>=n.length;return s=!s&&L.isArray(i)?i.length:s,c?(L.hasOwnProp(i,s)?i[s]=[i[s],r]:i[s]=r,!l):((!i[s]||!L.isObject(i[s]))&&(i[s]=[]),t(n,r,i[s],o)&&L.isArray(i[s])&&(i[s]=yb(i[s])),!l)}if(L.isFormData(e)&&L.isFunction(e.entries)){const n={};return L.forEachEntry(e,(r,i)=>{t(xb(r),i,n,0)}),n}return null}function vb(e,t,n){if(L.isString(e))try{return(t||JSON.parse)(e),L.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(0,JSON.stringify)(e)}const Ss={transitional:l1,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",i=r.indexOf("application/json")>-1,o=L.isObject(t);if(o&&L.isHTMLForm(t)&&(t=new FormData(t)),L.isFormData(t))return i?JSON.stringify(c1(t)):t;if(L.isArrayBuffer(t)||L.isBuffer(t)||L.isStream(t)||L.isFile(t)||L.isBlob(t)||L.isReadableStream(t))return t;if(L.isArrayBufferView(t))return t.buffer;if(L.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return gb(t,this.formSerializer).toString();if((l=L.isFileList(t))||r.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return Tl(l?{"files[]":t}:t,c&&new c,this.formSerializer)}}return o||i?(n.setContentType("application/json",!1),vb(t)):t}],transformResponse:[function(t){const n=this.transitional||Ss.transitional,r=n&&n.forcedJSONParsing,i=this.responseType==="json";if(L.isResponse(t)||L.isReadableStream(t))return t;if(t&&L.isString(t)&&(r&&!this.responseType||i)){const s=!(n&&n.silentJSONParsing)&&i;try{return JSON.parse(t)}catch(l){if(s)throw l.name==="SyntaxError"?te.from(l,te.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:St.classes.FormData,Blob:St.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};L.forEach(["delete","get","head","post","put","patch"],e=>{Ss.headers[e]={}});const wb=L.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),jb=e=>{const t={};let n,r,i;return e&&e.split(`
`).forEach(function(s){i=s.indexOf(":"),n=s.substring(0,i).trim().toLowerCase(),r=s.substring(i+1).trim(),!(!n||t[n]&&wb[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},$h=Symbol("internals");function vo(e){return e&&String(e).trim().toLowerCase()}function Ca(e){return e===!1||e==null?e:L.isArray(e)?e.map(Ca):String(e)}function Cb(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Sb=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function bc(e,t,n,r,i){if(L.isFunction(r))return r.call(this,t,n);if(i&&(t=n),!!L.isString(t)){if(L.isString(r))return t.indexOf(r)!==-1;if(L.isRegExp(r))return r.test(t)}}function bb(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function kb(e,t){const n=L.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(i,o,s){return this[r].call(this,t,i,o,s)},configurable:!0})})}class bt{constructor(t){t&&this.set(t)}set(t,n,r){const i=this;function o(l,c,d){const f=vo(c);if(!f)throw new Error("header name must be a non-empty string");const p=L.findKey(i,f);(!p||i[p]===void 0||d===!0||d===void 0&&i[p]!==!1)&&(i[p||c]=Ca(l))}const s=(l,c)=>L.forEach(l,(d,f)=>o(d,f,c));if(L.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(L.isString(t)&&(t=t.trim())&&!Sb(t))s(jb(t),n);else if(L.isHeaders(t))for(const[l,c]of t.entries())o(c,l,r);else t!=null&&o(n,t,r);return this}get(t,n){if(t=vo(t),t){const r=L.findKey(this,t);if(r){const i=this[r];if(!n)return i;if(n===!0)return Cb(i);if(L.isFunction(n))return n.call(this,i,r);if(L.isRegExp(n))return n.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=vo(t),t){const r=L.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||bc(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let i=!1;function o(s){if(s=vo(s),s){const l=L.findKey(r,s);l&&(!n||bc(r,r[l],l,n))&&(delete r[l],i=!0)}}return L.isArray(t)?t.forEach(o):o(t),i}clear(t){const n=Object.keys(this);let r=n.length,i=!1;for(;r--;){const o=n[r];(!t||bc(this,this[o],o,t,!0))&&(delete this[o],i=!0)}return i}normalize(t){const n=this,r={};return L.forEach(this,(i,o)=>{const s=L.findKey(r,o);if(s){n[s]=Ca(i),delete n[o];return}const l=t?bb(o):String(o).trim();l!==o&&delete n[o],n[l]=Ca(i),r[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return L.forEach(this,(r,i)=>{r!=null&&r!==!1&&(n[i]=t&&L.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(i=>r.set(i)),r}static accessor(t){const r=(this[$h]=this[$h]={accessors:{}}).accessors,i=this.prototype;function o(s){const l=vo(s);r[l]||(kb(i,s),r[l]=!0)}return L.isArray(t)?t.forEach(o):o(t),this}}bt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);L.reduceDescriptors(bt.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});L.freezeMethods(bt);function kc(e,t){const n=this||Ss,r=t||n,i=bt.from(r.headers);let o=r.data;return L.forEach(e,function(l){o=l.call(n,o,i.normalize(),t?t.status:void 0)}),i.normalize(),o}function u1(e){return!!(e&&e.__CANCEL__)}function no(e,t,n){te.call(this,e??"canceled",te.ERR_CANCELED,t,n),this.name="CanceledError"}L.inherits(no,te,{__CANCEL__:!0});function d1(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new te("Request failed with status code "+n.status,[te.ERR_BAD_REQUEST,te.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Pb(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Eb(e,t){e=e||10;const n=new Array(e),r=new Array(e);let i=0,o=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),f=r[o];s||(s=d),n[i]=c,r[i]=d;let p=o,g=0;for(;p!==i;)g+=n[p++],p=p%e;if(i=(i+1)%e,i===o&&(o=(o+1)%e),d-s<t)return;const w=f&&d-f;return w?Math.round(g*1e3/w):void 0}}function Ab(e,t){let n=0,r=1e3/t,i,o;const s=(d,f=Date.now())=>{n=f,i=null,o&&(clearTimeout(o),o=null),e.apply(null,d)};return[(...d)=>{const f=Date.now(),p=f-n;p>=r?s(d,f):(i=d,o||(o=setTimeout(()=>{o=null,s(i)},r-p)))},()=>i&&s(i)]}const rl=(e,t,n=3)=>{let r=0;const i=Eb(50,250);return Ab(o=>{const s=o.loaded,l=o.lengthComputable?o.total:void 0,c=s-r,d=i(c),f=s<=l;r=s;const p={loaded:s,total:l,progress:l?s/l:void 0,bytes:c,rate:d||void 0,estimated:d&&l&&f?(l-s)/d:void 0,event:o,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(p)},n)},Fh=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Bh=e=>(...t)=>L.asap(()=>e(...t)),Ib=St.hasStandardBrowserEnv?function(){const t=St.navigator&&/(msie|trident)/i.test(St.navigator.userAgent),n=document.createElement("a");let r;function i(o){let s=o;return t&&(n.setAttribute("href",s),s=n.href),n.setAttribute("href",s),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=i(window.location.href),function(s){const l=L.isString(s)?i(s):s;return l.protocol===r.protocol&&l.host===r.host}}():function(){return function(){return!0}}(),Lb=St.hasStandardBrowserEnv?{write(e,t,n,r,i,o){const s=[e+"="+encodeURIComponent(t)];L.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),L.isString(r)&&s.push("path="+r),L.isString(i)&&s.push("domain="+i),o===!0&&s.push("secure"),document.cookie=s.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Rb(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Tb(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function p1(e,t){return e&&!Rb(t)?Tb(e,t):t}const Uh=e=>e instanceof bt?{...e}:e;function Kr(e,t){t=t||{};const n={};function r(d,f,p){return L.isPlainObject(d)&&L.isPlainObject(f)?L.merge.call({caseless:p},d,f):L.isPlainObject(f)?L.merge({},f):L.isArray(f)?f.slice():f}function i(d,f,p){if(L.isUndefined(f)){if(!L.isUndefined(d))return r(void 0,d,p)}else return r(d,f,p)}function o(d,f){if(!L.isUndefined(f))return r(void 0,f)}function s(d,f){if(L.isUndefined(f)){if(!L.isUndefined(d))return r(void 0,d)}else return r(void 0,f)}function l(d,f,p){if(p in t)return r(d,f);if(p in e)return r(void 0,d)}const c={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:l,headers:(d,f)=>i(Uh(d),Uh(f),!0)};return L.forEach(Object.keys(Object.assign({},e,t)),function(f){const p=c[f]||i,g=p(e[f],t[f],f);L.isUndefined(g)&&p!==l||(n[f]=g)}),n}const f1=e=>{const t=Kr({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:i,xsrfCookieName:o,headers:s,auth:l}=t;t.headers=s=bt.from(s),t.url=a1(p1(t.baseURL,t.url),e.params,e.paramsSerializer),l&&s.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):"")));let c;if(L.isFormData(n)){if(St.hasStandardBrowserEnv||St.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if((c=s.getContentType())!==!1){const[d,...f]=c?c.split(";").map(p=>p.trim()).filter(Boolean):[];s.setContentType([d||"multipart/form-data",...f].join("; "))}}if(St.hasStandardBrowserEnv&&(r&&L.isFunction(r)&&(r=r(t)),r||r!==!1&&Ib(t.url))){const d=i&&o&&Lb.read(o);d&&s.set(i,d)}return t},Db=typeof XMLHttpRequest<"u",Nb=Db&&function(e){return new Promise(function(n,r){const i=f1(e);let o=i.data;const s=bt.from(i.headers).normalize();let{responseType:l,onUploadProgress:c,onDownloadProgress:d}=i,f,p,g,w,v;function y(){w&&w(),v&&v(),i.cancelToken&&i.cancelToken.unsubscribe(f),i.signal&&i.signal.removeEventListener("abort",f)}let C=new XMLHttpRequest;C.open(i.method.toUpperCase(),i.url,!0),C.timeout=i.timeout;function m(){if(!C)return;const x=bt.from("getAllResponseHeaders"in C&&C.getAllResponseHeaders()),E={data:!l||l==="text"||l==="json"?C.responseText:C.response,status:C.status,statusText:C.statusText,headers:x,config:e,request:C};d1(function(I){n(I),y()},function(I){r(I),y()},E),C=null}"onloadend"in C?C.onloadend=m:C.onreadystatechange=function(){!C||C.readyState!==4||C.status===0&&!(C.responseURL&&C.responseURL.indexOf("file:")===0)||setTimeout(m)},C.onabort=function(){C&&(r(new te("Request aborted",te.ECONNABORTED,e,C)),C=null)},C.onerror=function(){r(new te("Network Error",te.ERR_NETWORK,e,C)),C=null},C.ontimeout=function(){let b=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded";const E=i.transitional||l1;i.timeoutErrorMessage&&(b=i.timeoutErrorMessage),r(new te(b,E.clarifyTimeoutError?te.ETIMEDOUT:te.ECONNABORTED,e,C)),C=null},o===void 0&&s.setContentType(null),"setRequestHeader"in C&&L.forEach(s.toJSON(),function(b,E){C.setRequestHeader(E,b)}),L.isUndefined(i.withCredentials)||(C.withCredentials=!!i.withCredentials),l&&l!=="json"&&(C.responseType=i.responseType),d&&([g,v]=rl(d,!0),C.addEventListener("progress",g)),c&&C.upload&&([p,w]=rl(c),C.upload.addEventListener("progress",p),C.upload.addEventListener("loadend",w)),(i.cancelToken||i.signal)&&(f=x=>{C&&(r(!x||x.type?new no(null,e,C):x),C.abort(),C=null)},i.cancelToken&&i.cancelToken.subscribe(f),i.signal&&(i.signal.aborted?f():i.signal.addEventListener("abort",f)));const h=Pb(i.url);if(h&&St.protocols.indexOf(h)===-1){r(new te("Unsupported protocol "+h+":",te.ERR_BAD_REQUEST,e));return}C.send(o||null)})},Ob=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,i;const o=function(d){if(!i){i=!0,l();const f=d instanceof Error?d:this.reason;r.abort(f instanceof te?f:new no(f instanceof Error?f.message:f))}};let s=t&&setTimeout(()=>{s=null,o(new te(`timeout ${t} of ms exceeded`,te.ETIMEDOUT))},t);const l=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:c}=r;return c.unsubscribe=()=>L.asap(l),c}},zb=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},_b=async function*(e,t){for await(const n of Mb(e))yield*zb(n,t)},Mb=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},Wh=(e,t,n,r)=>{const i=_b(e,t);let o=0,s,l=c=>{s||(s=!0,r&&r(c))};return new ReadableStream({async pull(c){try{const{done:d,value:f}=await i.next();if(d){l(),c.close();return}let p=f.byteLength;if(n){let g=o+=p;n(g)}c.enqueue(new Uint8Array(f))}catch(d){throw l(d),d}},cancel(c){return l(c),i.return()}},{highWaterMark:2})},Dl=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",h1=Dl&&typeof ReadableStream=="function",$b=Dl&&(typeof TextEncoder=="function"?(e=>t=>e.encode(t))(new TextEncoder):async e=>new Uint8Array(await new Response(e).arrayBuffer())),m1=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Fb=h1&&m1(()=>{let e=!1;const t=new Request(St.origin,{body:new ReadableStream,method:"POST",get duplex(){return e=!0,"half"}}).headers.has("Content-Type");return e&&!t}),Qh=64*1024,Yu=h1&&m1(()=>L.isReadableStream(new Response("").body)),il={stream:Yu&&(e=>e.body)};Dl&&(e=>{["text","arrayBuffer","blob","formData","stream"].forEach(t=>{!il[t]&&(il[t]=L.isFunction(e[t])?n=>n[t]():(n,r)=>{throw new te(`Response type '${t}' is not supported`,te.ERR_NOT_SUPPORT,r)})})})(new Response);const Bb=async e=>{if(e==null)return 0;if(L.isBlob(e))return e.size;if(L.isSpecCompliantForm(e))return(await new Request(St.origin,{method:"POST",body:e}).arrayBuffer()).byteLength;if(L.isArrayBufferView(e)||L.isArrayBuffer(e))return e.byteLength;if(L.isURLSearchParams(e)&&(e=e+""),L.isString(e))return(await $b(e)).byteLength},Ub=async(e,t)=>{const n=L.toFiniteNumber(e.getContentLength());return n??Bb(t)},Wb=Dl&&(async e=>{let{url:t,method:n,data:r,signal:i,cancelToken:o,timeout:s,onDownloadProgress:l,onUploadProgress:c,responseType:d,headers:f,withCredentials:p="same-origin",fetchOptions:g}=f1(e);d=d?(d+"").toLowerCase():"text";let w=Ob([i,o&&o.toAbortSignal()],s),v;const y=w&&w.unsubscribe&&(()=>{w.unsubscribe()});let C;try{if(c&&Fb&&n!=="get"&&n!=="head"&&(C=await Ub(f,r))!==0){let E=new Request(t,{method:"POST",body:r,duplex:"half"}),j;if(L.isFormData(r)&&(j=E.headers.get("content-type"))&&f.setContentType(j),E.body){const[I,R]=Fh(C,rl(Bh(c)));r=Wh(E.body,Qh,I,R)}}L.isString(p)||(p=p?"include":"omit");const m="credentials"in Request.prototype;v=new Request(t,{...g,signal:w,method:n.toUpperCase(),headers:f.normalize().toJSON(),body:r,duplex:"half",credentials:m?p:void 0});let h=await fetch(v);const x=Yu&&(d==="stream"||d==="response");if(Yu&&(l||x&&y)){const E={};["status","statusText","headers"].forEach(N=>{E[N]=h[N]});const j=L.toFiniteNumber(h.headers.get("content-length")),[I,R]=l&&Fh(j,rl(Bh(l),!0))||[];h=new Response(Wh(h.body,Qh,I,()=>{R&&R(),y&&y()}),E)}d=d||"text";let b=await il[L.findKey(il,d)||"text"](h,e);return!x&&y&&y(),await new Promise((E,j)=>{d1(E,j,{data:b,headers:bt.from(h.headers),status:h.status,statusText:h.statusText,config:e,request:v})})}catch(m){throw y&&y(),m&&m.name==="TypeError"&&/fetch/i.test(m.message)?Object.assign(new te("Network Error",te.ERR_NETWORK,e,v),{cause:m.cause||m}):te.from(m,m&&m.code,e,v)}}),Zu={http:ib,xhr:Nb,fetch:Wb};L.forEach(Zu,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Hh=e=>`- ${e}`,Qb=e=>L.isFunction(e)||e===null||e===!1,g1={getAdapter:e=>{e=L.isArray(e)?e:[e];const{length:t}=e;let n,r;const i={};for(let o=0;o<t;o++){n=e[o];let s;if(r=n,!Qb(n)&&(r=Zu[(s=String(n)).toLowerCase()],r===void 0))throw new te(`Unknown adapter '${s}'`);if(r)break;i[s||"#"+o]=r}if(!r){const o=Object.entries(i).map(([l,c])=>`adapter ${l} `+(c===!1?"is not supported by the environment":"is not available in the build"));let s=t?o.length>1?`since :
`+o.map(Hh).join(`
`):" "+Hh(o[0]):"as no adapter specified";throw new te("There is no suitable adapter to dispatch the request "+s,"ERR_NOT_SUPPORT")}return r},adapters:Zu};function Pc(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new no(null,e)}function Vh(e){return Pc(e),e.headers=bt.from(e.headers),e.data=kc.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),g1.getAdapter(e.adapter||Ss.adapter)(e).then(function(r){return Pc(e),r.data=kc.call(e,e.transformResponse,r),r.headers=bt.from(r.headers),r},function(r){return u1(r)||(Pc(e),r&&r.response&&(r.response.data=kc.call(e,e.transformResponse,r.response),r.response.headers=bt.from(r.response.headers))),Promise.reject(r)})}const x1="1.7.7",vp={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{vp[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const qh={};vp.transitional=function(t,n,r){function i(o,s){return"[Axios v"+x1+"] Transitional option '"+o+"'"+s+(r?". "+r:"")}return(o,s,l)=>{if(t===!1)throw new te(i(s," has been removed"+(n?" in "+n:"")),te.ERR_DEPRECATED);return n&&!qh[s]&&(qh[s]=!0,console.warn(i(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,l):!0}};function Hb(e,t,n){if(typeof e!="object")throw new te("options must be an object",te.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let i=r.length;for(;i-- >0;){const o=r[i],s=t[o];if(s){const l=e[o],c=l===void 0||s(l,o,e);if(c!==!0)throw new te("option "+o+" must be "+c,te.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new te("Unknown option "+o,te.ERR_BAD_OPTION)}}const ed={assertOptions:Hb,validators:vp},zn=ed.validators;class Br{constructor(t){this.defaults=t,this.interceptors={request:new Mh,response:new Mh}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let i;Error.captureStackTrace?Error.captureStackTrace(i={}):i=new Error;const o=i.stack?i.stack.replace(/^.+\n/,""):"";try{r.stack?o&&!String(r.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+o):r.stack=o}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Kr(this.defaults,n);const{transitional:r,paramsSerializer:i,headers:o}=n;r!==void 0&&ed.assertOptions(r,{silentJSONParsing:zn.transitional(zn.boolean),forcedJSONParsing:zn.transitional(zn.boolean),clarifyTimeoutError:zn.transitional(zn.boolean)},!1),i!=null&&(L.isFunction(i)?n.paramsSerializer={serialize:i}:ed.assertOptions(i,{encode:zn.function,serialize:zn.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&L.merge(o.common,o[n.method]);o&&L.forEach(["delete","get","head","post","put","patch","common"],v=>{delete o[v]}),n.headers=bt.concat(s,o);const l=[];let c=!0;this.interceptors.request.forEach(function(y){typeof y.runWhen=="function"&&y.runWhen(n)===!1||(c=c&&y.synchronous,l.unshift(y.fulfilled,y.rejected))});const d=[];this.interceptors.response.forEach(function(y){d.push(y.fulfilled,y.rejected)});let f,p=0,g;if(!c){const v=[Vh.bind(this),void 0];for(v.unshift.apply(v,l),v.push.apply(v,d),g=v.length,f=Promise.resolve(n);p<g;)f=f.then(v[p++],v[p++]);return f}g=l.length;let w=n;for(p=0;p<g;){const v=l[p++],y=l[p++];try{w=v(w)}catch(C){y.call(this,C);break}}try{f=Vh.call(this,w)}catch(v){return Promise.reject(v)}for(p=0,g=d.length;p<g;)f=f.then(d[p++],d[p++]);return f}getUri(t){t=Kr(this.defaults,t);const n=p1(t.baseURL,t.url);return a1(n,t.params,t.paramsSerializer)}}L.forEach(["delete","get","head","options"],function(t){Br.prototype[t]=function(n,r){return this.request(Kr(r||{},{method:t,url:n,data:(r||{}).data}))}});L.forEach(["post","put","patch"],function(t){function n(r){return function(o,s,l){return this.request(Kr(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}Br.prototype[t]=n(),Br.prototype[t+"Form"]=n(!0)});class wp{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(i=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](i);r._listeners=null}),this.promise.then=i=>{let o;const s=new Promise(l=>{r.subscribe(l),o=l}).then(i);return s.cancel=function(){r.unsubscribe(o)},s},t(function(o,s,l){r.reason||(r.reason=new no(o,s,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new wp(function(i){t=i}),cancel:t}}}function Vb(e){return function(n){return e.apply(null,n)}}function qb(e){return L.isObject(e)&&e.isAxiosError===!0}const td={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(td).forEach(([e,t])=>{td[t]=e});function y1(e){const t=new Br(e),n=Kx(Br.prototype.request,t);return L.extend(n,Br.prototype,t,{allOwnKeys:!0}),L.extend(n,t,null,{allOwnKeys:!0}),n.create=function(i){return y1(Kr(e,i))},n}const Be=y1(Ss);Be.Axios=Br;Be.CanceledError=no;Be.CancelToken=wp;Be.isCancel=u1;Be.VERSION=x1;Be.toFormData=Tl;Be.AxiosError=te;Be.Cancel=Be.CanceledError;Be.all=function(t){return Promise.all(t)};Be.spread=Vb;Be.isAxiosError=qb;Be.mergeConfig=Kr;Be.AxiosHeaders=bt;Be.formToJSON=e=>c1(L.isHTMLForm(e)?new FormData(e):e);Be.getAdapter=g1.getAdapter;Be.HttpStatusCode=td;Be.default=Be;const fr=Be.create({baseURL:void 0,timeout:5e3,headers:{"Content-Type":"application/json"}});fr.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e});const Gb={postId:"",title:"",content:"",images:[],category:"",createdAt:"",closeAt:"",requiredQuantity:0,totalPrice:0,unitPrice:0,url:"",authorId:"",authorNickname:"",updatedAt:"",currentQuantity:0,participants:[],comments:[]},Kb=async e=>{try{return(await fr.post("/api/posts",e)).data}catch(t){throw console.error("게시물 생성 중 오류 발생:",t),new Error("게시물 생성에 실패했습니다.")}},Jb=async e=>{try{await fr.delete(`/api/posts/${e}`),console.log(`게시물 ${e} 삭제 성공`)}catch(t){throw console.error(`게시물 ${e} 삭제 중 오류 발생:`,t),new Error("게시물 삭제에 실패했습니다.")}},Xb=async(e,t)=>{try{await fr.put(`/api/posts/${e}`,t),console.log(`게시물 ${e} 수정 성공`)}catch(n){throw console.error(`게시물 ${e} 수정 중 오류 발생:`,n),new Error("게시물 수정에 실패했습니다.")}},Yb=()=>{var ye;const e=tt(),n=((ye=Tn().state)==null?void 0:ye.selectedCategory)||"생활용품",[r,i]=k.useState(n),[o,s]=k.useState(""),[l,c]=k.useState(""),[d,f]=k.useState(!1),[p,g]=k.useState("마감 기한  "),[w,v]=k.useState(""),[y,C]=k.useState(""),[m,h]=k.useState([]),[x,b]=k.useState(-1),[E,j]=k.useState(""),[I,R]=k.useState(!1),N=()=>{f(!d)},M=J=>{g(J),f(!1)},ee=async()=>{if(!w||!o||!l||p==="마감 기한"||m.length===0||!E||!y){alert("모든 필수 정보를 입력하세요.");return}if(!ne(E)){R(!0);return}const J=parseInt(l.replace(/,/g,""),10),X=parseInt(o,10),F=new Date,q=new Date,pe=new Date;if(p!=="마감 기한"){const je=parseInt(p.replace(/[^0-9]/g,""),10);pe.setDate(F.getDate()+je)}const Je={title:w,content:y,images:m,category:r,createdAt:F.toISOString(),updatedAt:q.toISOString(),closeAt:pe.toISOString(),requiredQuantity:X,totalPrice:J,unitPrice:Math.floor(J/X),url:E};try{const{postId:je}=await Kb(Je);e(`/community/posts/${je}`,{state:Je})}catch(je){console.error("게시물 생성 중 오류 발생:",je),alert("게시물 생성 중 오류가 발생했습니다. 다시 시도해주세요.")}},le=J=>{const X=J.target.value.replace(/[^0-9]/g,""),F=Number(X);X===""||F<=0?s(""):s(X)},he=J=>{const X=J.target.value.replace(/[^0-9]/g,""),F=Number(X);X===""||F<=0?c(""):c(Ge(X))},me=()=>{e("/community",{state:{selectedCategory:r}})},Ge=J=>{const X=J.replace(/\D/g,"");return new Intl.NumberFormat().format(Number(X))},Ke=l&&o?Ge(String(Math.floor(parseInt(l.replace(/,/g,""),10)/parseInt(o,10)))):"자동 계산",_=J=>{if(J.target.files){const X=Array.from(J.target.files).map(F=>URL.createObjectURL(F));h(F=>[...F,...X]),b(m.length)}},T=()=>{x>=0&&h(J=>{const X=J.filter((F,q)=>q!==x);if(X.length>0){const F=x>=X.length?x-1:x;b(F)}else b(-1);return X})},$=()=>{x<m.length-1?b(J=>J+1):x===m.length-1&&b(-1)},H=()=>{b(x===-1?m.length-1:J=>Math.max(J-1,0))},Z=J=>{b(J)},ne=J=>!!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(J),Ue=J=>{j(J.target.value),R(!ne(J.target.value))};return a.jsxs("div",{children:[a.jsx(Zb,{children:a.jsxs(e4,{children:[a.jsx(t4,{children:"공구 모집 및 진행"}),a.jsxs(n4,{children:[a.jsxs(r4,{children:[a.jsxs(i4,{children:[a.jsxs(o4,{children:[a.jsx(c4,{children:m.length>0&&(x>0||x===-1)&&a.jsx(d4,{onClick:H,children:a.jsx(up,{size:20})})}),x===-1?a.jsxs(a4,{children:[a.jsx(fp,{size:30}),"이미지 추가",a.jsx("input",{type:"file",multiple:!0,accept:"image/*",onChange:_})]}):a.jsxs(s4,{children:[a.jsx("img",{src:m[x],alt:"이미지 미리보기"}),a.jsx(l4,{onClick:T,children:a.jsx(pp,{size:30})})]}),a.jsx(u4,{children:m.length>0&&x!==-1&&a.jsx(p4,{onClick:$,children:a.jsx(dp,{size:20})})})]}),a.jsx(f4,{children:m.length>0&&a.jsx(h4,{children:m.map((J,X)=>a.jsx("span",{className:x===X?"active":"",onClick:()=>Z(X)},X))})}),a.jsxs(m4,{children:[a.jsxs(g4,{children:[a.jsx(si,{htmlFor:"urlInput",children:"URL 주소"}),a.jsx(x4,{id:"urlInput",type:"text",placeholder:"상품 관련 URL 주소를 입력해주세요.",value:E,onChange:Ue,isError:I,spellCheck:!1})]}),I&&a.jsx(y4,{children:"올바른 URL을 입력해주세요."})]})]}),a.jsxs(v4,{children:[a.jsxs(w4,{children:[a.jsxs(wo,{children:[a.jsx(si,{children:"제목"}),a.jsx(j4,{placeholder:"제목을 입력해주세요.",value:w,onChange:J=>v(J.target.value),spellCheck:!1})]}),a.jsxs(C4,{children:[a.jsx(S4,{children:"카테고리 선택"}),a.jsx(b4,{selectedCategory:r,onCategoryChange:J=>i(J)})]})]}),a.jsxs(k4,{children:[a.jsxs(wo,{children:[a.jsx(si,{children:"참여 필요 수량 선택"}),a.jsx(Ec,{type:"text",placeholder:"수량 입력",value:o,onChange:le})]}),a.jsxs(wo,{children:[a.jsx(si,{children:"모집 마감 기한 설정"}),a.jsxs(P4,{children:[a.jsxs(E4,{onClick:N,children:[p,a.jsx(qx,{})]}),d&&a.jsx(A4,{children:Array.from({length:7},(J,X)=>a.jsxs(I4,{onClick:()=>M(`${X+1}일  `),isSelected:p===`${X+1}일  `,children:[X+1,"일"]},X))})]})]}),a.jsxs(L4,{children:[a.jsxs(wo,{children:[a.jsx(si,{children:"총 가격 설정"}),a.jsx(Ec,{type:"text",placeholder:"총 가격 입력",value:l,onChange:he})," 원"]}),a.jsxs(wo,{children:[a.jsx(si,{children:"개당 가격"}),a.jsx(Ec,{disabled:!0,value:Ke})," 원"]})]})]})]})]}),a.jsx(R4,{children:a.jsx(T4,{placeholder:"내용을 입력해주세요.",value:y,onChange:J=>C(J.target.value),spellCheck:!1})}),a.jsxs(D4,{children:[a.jsx(Gh,{onClick:ee,children:"확인"}),a.jsx(Gh,{onClick:me,children:"취소"})]})]})]})}),a.jsx(js,{})]})},Zb=u.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`,e4=u.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`,t4=u.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: left;
`,n4=u.div`
  display: flex;
  flex-direction: column; /* 내부 요소를 세로로 정렬 */
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,r4=u.div`
  display: flex; /* 가로 정렬 */
  flex-direction: row; /* 기본값이므로 명시적으로 추가 */
  align-items: stretch; /* 양쪽 요소의 높이를 동일하게 */
  justify-content: center; /* 양쪽 여백 균등 배치 */
  gap: 20px; /* 두 컨테이너 사이 간격 */
  margin-bottom: 20px; /* 아래 요소와의 간격 */
`,i4=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 495px; /* 고정된 높이 설정 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 11px;
  position: relative;
  box-sizing: border-box; /* 패딩과 보더 포함한 크기 계산 */
`,o4=u.div`
  display: flex;
  justify-content: space-between; /* 좌우 버튼 공간 확보 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  height: 320px; /* 기준 높이 */
  position: relative; /* 자식 요소 위치 기준 */
  overflow: hidden; /* 높이를 벗어난 콘텐츠 숨김 */
`,s4=u.div`
  flex: 1; /* 이미지 영역이 버튼 사이에 위치 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden; /* 콘텐츠가 영역을 벗어나지 않도록 */

  img {
    max-width: 100%; /* 부모 너비를 넘지 않도록 */
    max-height: 100%; /* 부모 높이를 넘지 않도록 */
    object-fit: contain; /* 비율을 유지하며 부모 크기 안에 맞춤 */
  }
`,a4=u.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
  border-radius: 10px;
  width: 400px; /* img의 크기와 동일하게 설정 */
  height: 100%; /* img의 높이와 동일하게 설정 */
  background-color: #ececec; /* 요구된 배경색 추가 */

  input {
    display: none;
  }
`,l4=u.button`
  position: absolute;
  top: 0px;
  right: 45px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 1;
`,c4=u.div`
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
`,u4=u.div`
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
`,d4=u.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`,p4=u.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`,f4=u.div`
  width: 100%;
  height: 54px; /* 높이 설정 */
  display: flex; /* 플렉스 박스로 변경 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
`,h4=u.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
  }

  span.active {
    background: #000;
  }
`,m4=u.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 세로로 가운데 정렬 */
  width: 100%;
`,g4=u.div`
  margin-left: 20px;
  display: flex;
  align-items: center; /* Label과 Url을 같은 높이에 배치 */
  gap: 10px; /* Label과 Url 사이 간격 */
  padding: 10px;
  border: none;
`,x4=u.input`
  width: 285px;
  flex: 1;
  padding: 10px;
  background-color: #ececec;
  border: 1px solid ${({isError:e})=>e?"red":"#ccc"};
  border-radius: 5px;
`,y4=u.span`
  margin-left: 125px;
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`,v4=u.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: space-between; /* 위아래 요소 간격 균등 */
  width: 490px;
  height: 495px; /* ImageUploadContainer와 동일한 고정 높이 */
  flex-grow: 1; /* 가로 공간을 균등 분배 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`,w4=u.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 50px; /* 컴포넌트 간 간격 */
  width: 100%;
`,wo=u.div`
  display: flex;
  flex-direction: row; /* 가로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px; /* 컴포넌트 간 간격 */
  width: 100%;
`,si=u.label`
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0; /* 라벨 크기를 고정 */
  text-align: left; /* 라벨 텍스트 왼쪽 정렬 */
`,j4=u.input`
  width: 80%;
  padding: 10px;
  background-color: #ececec;
  border: 1px solid #ccc;
  border-radius: 5px;
`,C4=u.div`
  display: flex;
  flex-direction: column; /* 라벨과 카테고리를 세로로 배치 */
`,S4=u.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px; /* 라벨과 카테고리 사이 간격 */
`,b4=u(hp)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 0;

  div {
    padding: 12px !important; /* 강제로 적용 */
    flex: 1 1 calc(25% - 8px);
    box-sizing: border-box;

    &:hover {
      background-color: #f0f0f0 !important; /* 호버 스타일도 강제 */
    }

    &.active {
      font-weight: bold !important; /* 활성 상태 스타일 강제 */
      border-bottom: 2px solid black !important;
    }
  }
`,k4=u.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 20px; /* 컴포넌트 간 간격 */
  width: 100%;
`,Ec=u.input`
  width: 100px;
  padding: 10px 0px;
  text-align: center;
  background-color: #ececec;
  border: 1px solid #ccc;
  border-radius: 5px;
`,P4=u.div`
  position: relative;
`,E4=u.button`
  width: 120px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`,A4=u.div`
  position: absolute;
  width: 120px;
  top: 100%;
  left: 0;
  right: 0;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  z-index: 1000;
  box-sizing: border-box;
`,I4=u.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background: ${({isSelected:e})=>e?"#f0f0f0":"#fff"};
  font-weight: ${({isSelected:e})=>e?"bold":"normal"};

  &:hover {
    background: #eaeaea;
  }
`,L4=u.div`
  display: flex;
  flex-direction: row; /* 가로 배치 */
  gap: 20px; /* 두 요소 간 간격 */
  width: 100%; /* 부모 컨테이너에 맞게 확장 */
  align-items: center; /* 세로 중앙 정렬 */
`,R4=u.div`
  width: 100%; /* Wrapper 크기는 기존 유지 */
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px; /* 내부 여백 */
  margin-bottom: 20px;
  box-sizing: border-box;
`,T4=u.textarea`
  width: 100%;
  height: 460px; /* 고정된 높이 */
  background-color: #ececec;
  border: none; /* 테두리 제거 */
  border-radius: 10px;
  padding: 20px;
  outline: none; /* 포커스 시 외곽선 제거 */
  resize: none; /* 크기 조절 비활성화 */
  font-size: 1rem; /* 텍스트 크기 */
  line-height: 1.5;
  color: #333; /* 텍스트 색상 */
  box-sizing: border-box;
`,D4=u.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`,Gh=u.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`,yr="user-00001",N4=()=>{var Ke;const{postId:e}=xs(),t=tt(),[n,r]=k.useState(Gb),[i,o]=k.useState(1),[s,l]=k.useState(!1),[c,d]=k.useState(0),[f,p]=k.useState(""),[g,w]=k.useState(""),[v,y]=k.useState(null),[C,m]=k.useState("");k.useEffect(()=>{if(!e){t("/community");return}(async()=>{try{const T=mp.find($=>$.postId===e);if(T)r(T),o(Math.max(1,T.currentQuantity)),l(T.authorId===yr);else throw new Error("게시물이 존재하지 않습니다.")}catch(T){console.error("게시물 조회 중 오류 발생:",T),alert("게시물을 불러오는 데 실패했습니다."),t("/community")}})()},[e,t]),k.useEffect(()=>{n&&n.participants.some(T=>T.userId===yr&&T.isCancelled)&&(alert("참여를 취소한 게시물에는 접근할 수 없습니다."),t("/community"))},[n,t]);const h=async()=>{if(window.confirm("정말 이 게시물을 삭제하시겠습니까?"))try{alert("게시물이 성공적으로 삭제되었습니다."),t("/community")}catch(_){console.error(`게시물 ${e} 삭제 중 오류 발생:`,_),alert("게시물 삭제 중 문제가 발생했습니다. 다시 시도해주세요.")}},x=()=>{n&&d(_=>(_+1)%n.images.length)},b=()=>{n&&d(_=>(_-1+n.images.length)%n.images.length)},E=_=>{d(_)},j=_=>{const T=new Date().getTime(),H=new Date(_).getTime()-T;if(H<=0)return"마감되었습니다.";const Z=Math.floor(H/(1e3*60*60*24)),ne=Math.floor(H%(1e3*60*60*24)/(1e3*60*60)),Ue=Math.floor(H%(1e3*60*60)/(1e3*60)),ye=Math.floor(H%(1e3*60)/1e3);return`${Z}일 ${ne}시간 ${Ue}분 ${ye}초 남음`};k.useEffect(()=>{const _=n==null?void 0:n.closeAt;if(!_)return;const T=()=>{const H=j(_);p(H)};T();const $=setInterval(T,1e3);return()=>clearInterval($)},[n]);const I=async()=>{if(window.confirm("참여를 확정하시겠습니까? 이후에는 수정이 불가능합니다."))try{const _=n.currentQuantity+i;alert("참여가 완료되었습니다."),r(T=>T&&{...T,currentQuantity:_,participants:[...T.participants,{userId:yr,quantity:i,isCancelled:!1}]}),t(0)}catch(_){console.error("참여 중 오류 발생:",_),alert("참여 중 문제가 발생했습니다. 다시 시도해주세요.")}},R=async()=>{if(window.confirm("취소 후 다시 참여할 수 없습니다. 정말 취소하시겠습니까?"))try{const _=n.currentQuantity-i;alert("참여가 취소되었습니다."),r(T=>T&&{...T,currentQuantity:_,participants:T.participants.map($=>$.userId===yr?{...$,isCancelled:!0}:$)}),t(0)}catch(_){console.error("참여 취소 중 오류 발생:",_),alert("참여 취소 중 문제가 발생했습니다. 다시 시도해주세요.")}},N=((Ke=n==null?void 0:n.participants)==null?void 0:Ke.some(_=>_.userId===yr&&!_.isCancelled))||!1,M=()=>{t(`/community/posts/${e}/report`)},ee=_=>{if(n){const T=i+_;T>=1&&T<=n.requiredQuantity-n.currentQuantity&&o(T)}},le=async()=>{if(!g.trim()){alert("댓글을 입력해주세요.");return}if(g.length>300){alert("댓글은 최대 300자까지만 입력 가능합니다.");return}try{const _={userId:yr,createdAt:new Date().toISOString(),content:g};r(T=>({...T,comments:[...T.comments,_]})),w("")}catch(_){console.error("댓글 추가 중 오류:",_),alert("댓글 추가에 실패했습니다.")}},he=async _=>{if(window.confirm("이 댓글을 삭제하시겠습니까?"))try{r(T=>({...T,comments:T.comments.filter($=>$.commentId!==_)}))}catch(T){console.error("댓글 삭제 중 오류:",T),alert("댓글 삭제에 실패했습니다.")}},me=(_,T)=>{y(_),m(T)},Ge=async()=>{if(!C.trim()){alert("수정할 댓글 내용을 입력하세요.");return}if(C.length>300){alert("댓글은 최대 300자까지만 입력 가능합니다.");return}try{r(_=>({..._,comments:_.comments.map(T=>T.commentId===v?{...T,content:C}:T)})),y(null),m("")}catch(_){console.error("댓글 수정 중 오류:",_),alert("댓글 수정에 실패했습니다.")}};return n?a.jsx(O4,{children:a.jsxs(z4,{children:[a.jsxs(_4,{children:[a.jsx(B4,{children:"공구 모집 및 진행"}),a.jsxs(M4,{children:[a.jsx($4,{onClick:()=>t(-1),children:a.jsx(_C,{size:24})}),a.jsx(F4,{children:s?a.jsxs(a.Fragment,{children:[a.jsx(Ac,{onClick:()=>t(`/community/posts/${e}/edit`),children:"글 수정"}),a.jsx(Ac,{onClick:h,children:"글 삭제"})]}):a.jsx(Ac,{onClick:M,children:"글 신고"})})]})]}),a.jsxs(U4,{children:[a.jsxs(W4,{children:[a.jsxs(Q4,{children:[a.jsxs(H4,{children:[a.jsx(q4,{children:n.images.length>1&&c>0&&a.jsx(K4,{onClick:b,children:a.jsx(up,{size:20})})}),a.jsx(V4,{children:a.jsx("img",{src:n.images[c],alt:`이미지 ${c+1}`})}),a.jsx(G4,{children:n.images.length>1&&c<n.images.length-1&&a.jsx(J4,{onClick:x,children:a.jsx(dp,{size:20})})})]}),a.jsx(X4,{children:n.images.length>1&&a.jsx(Y4,{children:n.images.map((_,T)=>a.jsx("span",{className:c===T?"active":"",onClick:()=>E(T)},T))})}),a.jsx(Z4,{children:a.jsxs(ek,{children:[a.jsx(on,{htmlFor:"urlInput",children:"URL 주소"}),a.jsx(tk,{children:n.url})]})})]}),a.jsx(nk,{children:a.jsxs(rk,{children:[a.jsxs(vr,{children:[a.jsx(on,{children:"제목"}),a.jsx(ik,{children:n.title})]}),a.jsxs(Xs,{children:[a.jsxs(ok,{children:[a.jsx(on,{children:"작성자"}),a.jsxs(sk,{children:[n.authorNickname," ",a.jsx(lk,{onClick:()=>alert("작성자와 1:1 채팅방 생성"),children:a.jsx(MC,{})})]})]}),a.jsxs(ak,{children:[a.jsx(on,{children:"작성일"})," ",new Date(n.createdAt).toLocaleString()]})]}),a.jsxs(Xs,{children:[a.jsxs(vr,{children:[a.jsx(on,{children:"카테고리"})," ",n.category]}),a.jsxs(vr,{children:[a.jsx(on,{children:"참여 현황"})," ",n.currentQuantity," / ",n.requiredQuantity]})]}),a.jsxs(vr,{children:[a.jsx(on,{children:"모집 마감"})," ",f]}),a.jsxs(Xs,{children:[a.jsxs(vr,{children:[a.jsx(on,{children:"총 가격"})," ",n.totalPrice.toLocaleString()," 원"]}),a.jsxs(vr,{children:[a.jsx(on,{children:"개당 가격"})," ",n.unitPrice.toLocaleString()," ","원"]})]}),a.jsxs(Xs,{children:[a.jsxs(vr,{children:[a.jsx(on,{children:"수량"})," ",a.jsxs(ck,{children:[a.jsx(pp,{onClick:()=>ee(-1)}),a.jsx("span",{children:i}),a.jsx(fp,{onClick:()=>ee(1)})]})]}),a.jsx(pk,{children:N?a.jsx(Ys,{onClick:R,children:"취소하기"}):a.jsx(Ys,{primary:!0,onClick:I,children:"참여하기"})})]})]})})]}),a.jsx(uk,{children:a.jsx(dk,{readOnly:!0,value:n.content})}),a.jsxs(fk,{children:[a.jsx(hk,{children:"댓글"}),a.jsxs(mk,{children:[n.comments.map(_=>a.jsxs(gk,{children:[a.jsxs(xk,{children:[a.jsx(yk,{children:_.userId}),a.jsx(vk,{children:new Date(_.createdAt).toLocaleString()})]}),v===_.commentId?a.jsxs(Ck,{children:[a.jsx(Sk,{value:C,onChange:T=>m(T.target.value),maxLength:300}),a.jsxs(Jh,{children:[a.jsxs(Kh,{overLimit:C.length>300,children:["(",C.length,"/300)"]}),a.jsx(Ys,{onClick:Ge,children:"확인"}),a.jsx(Ys,{onClick:()=>y(null),children:"취소"})]})]}):a.jsxs(a.Fragment,{children:[a.jsx(wk,{children:_.content}),_.userId===yr&&a.jsxs(jk,{children:[a.jsx(bk,{onClick:()=>me(_.commentId,_.content),children:"수정"}),a.jsx(kk,{onClick:()=>he(_.commentId),children:"삭제"})]})]})]},_.commentId)),a.jsxs(Pk,{children:[a.jsx(Ek,{value:g,onChange:_=>w(_.target.value),placeholder:"댓글 내용을 입력해주세요.",maxLength:300}),a.jsxs(Jh,{children:[a.jsxs(Kh,{overLimit:g.length>300,children:["(",g.length,"/300)"]}),a.jsx(Ak,{onClick:le,children:"작성"})]})]})]})]})]})]})}):a.jsx("div",{children:"Loading..."})},O4=u.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`,z4=u.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`,_4=u.div`
  display: flex;
  flex-direction: column; /* Title과 HeaderWrapper를 세로로 배치 */
  gap: 10px; /* Title과 HeaderWrapper 사이 간격 */
  margin-bottom: 1.5rem;
`,M4=u.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$4=u.button`
  background: none;
  border: none;
  cursor: pointer;
`,F4=u.div`
  display: flex;
  gap: 10px;
`,Ac=u.button`
  padding: 10px 15px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`,B4=u.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: left;
  margin: 0; /* Title의 기본 마진 제거 */
`,U4=u.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,W4=u.div`
  display: flex; /* 가로 정렬 */
  flex-direction: row; /* 기본값이므로 명시적으로 추가 */
  align-items: stretch; /* 양쪽 요소의 높이를 동일하게 */
  justify-content: center; /* 양쪽 여백 균등 배치 */
  gap: 20px; /* 두 컨테이너 사이 간격 */
  margin-bottom: 20px; /* 아래 요소와의 간격 */
`,Q4=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 470px; /* 고정된 높이 설정 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 11px;
  position: relative;
  box-sizing: border-box; /* 패딩과 보더 포함한 크기 계산 */
`,H4=u.div`
  display: flex;
  justify-content: space-between; /* 좌우 버튼 공간 확보 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  height: 320px; /* 기준 높이 */
  position: relative; /* 자식 요소 위치 기준 */
  overflow: hidden; /* 높이를 벗어난 콘텐츠 숨김 */
`,V4=u.div`
  flex: 1; /* 이미지 영역이 버튼 사이에 위치 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden; /* 콘텐츠가 영역을 벗어나지 않도록 */

  img {
    max-width: 100%; /* 부모 너비를 넘지 않도록 */
    max-height: 100%; /* 부모 높이를 넘지 않도록 */
    object-fit: contain; /* 비율을 유지하며 부모 크기 안에 맞춤 */
  }
`,q4=u.div`
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
`,G4=u.div`
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
`,K4=u.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`,J4=u.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`,X4=u.div`
  width: 100%;
  height: 54px; /* 높이 설정 */
  display: flex; /* 플렉스 박스로 변경 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
`,Y4=u.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
  }

  span.active {
    background: #000;
  }
`,Z4=u.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 세로로 가운데 정렬 */
  width: 100%;
`,ek=u.div`
  margin-left: 20px;
  display: flex;
  align-items: center; /* Label과 Url을 같은 높이에 배치 */
  gap: 10px; /* Label과 Url 사이 간격 */
  padding: 10px;
  border: none;
`,tk=u.div`
  width: 285px;
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
`,nk=u.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: space-between; /* 위아래 요소 간격 균등 */
  width: 490px;
  max-width: 490px; /* 최대 너비 고정 */
  height: 470px; /* ImageUploadContainer와 동일한 고정 높이 */
  flex-grow: 1; /* 가로 공간을 균등 분배 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`,rk=u.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 컴포넌트 간 간격 */
  width: 100%;
`,vr=u.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`,on=u.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px; /* Label과 텍스트 사이 간격 */
`,ik=u.span`
  display: -webkit-box; /* Flexbox 기반으로 동작 */
  -webkit-line-clamp: 2; /* 두 줄까지만 표시 */
  -webkit-box-orient: vertical; /* 수직 방향 박스 정렬 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
  white-space: normal; /* 줄바꿈 허용 */
  color: #333; /* 텍스트 색상 */
`,Xs=u.div`
  display: flex; /* 한 줄로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; /* 양쪽 여백 균등 배치 */
  width: 100%; /* 부모 컨테이너 너비 */

  & > div {
    flex: 1; /* 내부 요소들이 동일한 크기로 영역 나눔 */
  }
`,ok=u.div`
  display: flex; /* 가로 배치 */
  flex-direction: column; /* 내부 요소가 한 줄씩 배치되도록 */
  gap: 5px; /* 내부 요소 간 간격 */
`,sk=u.div`
  display: flex; /* 한 줄로 배치 */
  align-items: center; /* 세로로 가운데 정렬 */
  gap: 8px; /* 닉네임과 ChatIcon 사이 간격 */
  font-size: 1rem; /* 텍스트 크기 설정 */
`,ak=u.div`
  display: flex; /* 가로 배치 */
  flex-direction: column; /* 내부 요소가 한 줄씩 배치되도록 */
  gap: 5px; /* 내부 요소 간 간격 */
`,lk=u.span`
  cursor: pointer;
  margin-left: 10px;
`,ck=u.div`
  display: flex;
  gap: 10px;
  align-items: center;

  svg {
    cursor: pointer;
  }
`,uk=u.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
`,dk=u.textarea`
  width: 100%;
  height: 460px; /* 고정된 높이 */
  border: none; /* 테두리 제거 */
  border-radius: 10px;
  padding: 20px;
  outline: none; /* 포커스 시 외곽선 제거 */
  resize: none; /* 크기 조절 비활성화 */
  font-size: 1rem; /* 텍스트 크기 */
  line-height: 1.5;
  color: #333; /* 텍스트 색상 */
  box-sizing: border-box;
`,pk=u.div`
  display: flex;
  justify-content: right; /* 버튼을 가운데 정렬 */
  align-items: center; /* 세로 정렬 */
  gap: 10px; /* 버튼 간 간격 */
`,Ys=u.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`,fk=u.div`
  width: 1000px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
`,hk=u.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 40px;
  margin-bottom: 0;
`,mk=u.ul`
  list-style: none;
  padding: 20px;
  margin: 0;
`,gk=u.li`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`,xk=u.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
`,yk=u.div`
  display: flex;
  align-items: center;
  font-weight: bold;

  &::before {
    content: '';
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 8px;
  }
`,vk=u.span`
  margin-left: 20px;
  font-size: 0.9rem;
  color: #666;
`,wk=u.p`
  margin: 10px 0;
  font-size: 1rem;
  color: #333;
  word-wrap: break-word;
`,jk=u.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`,Ck=u.div`
  display: flex;
  flex-direction: column; /* 세로 배치 */
  gap: 10px; /* EditCommentInput과 ActionButtonsWrapper 간격 */
`,Kh=u.span`
  font-size: 0.9rem;
  color: ${e=>e.overLimit?"red":"#666"}; /* 300자를 초과하면 빨간색 */
  margin-right: 10px; /* 버튼과 간격 */
`,Sk=u.textarea`
  width: 100%; /* CommentContent와 동일한 너비 */
  min-height: 60px; /* 기본 높이 */
  max-height: 120px; /* 최대 높이 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ececec; /* 배경색 설정 */
  font-size: 1rem; /* 글씨 크기 */
  line-height: 1.5; /* 줄 간격 */
  color: #333; /* 글씨 색상 */
  resize: none; /* 크기 조절 비활성화 */
  font-family: inherit; /* 기본 글꼴 사용 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
`,bk=u.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`,kk=u.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`,Pk=u.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 10px; /* 요소 간 간격 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
`,Ek=u.textarea`
  width: 100%;
  min-height: 60px;
  max-height: 120px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ececec;
  font-size: 1rem; /* CommentContent와 동일한 글꼴 크기 */
  color: #333; /* CommentContent와 동일한 텍스트 색상 */
  resize: none; /* 크기 조절 비활성화 */
  font-family: inherit;
  box-sizing: border-box; /* 패딩과 보더를 포함한 너비 계산 */
`,Ak=u.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end; /* 오른쪽 정렬 */
`,Jh=u.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`,Ik="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAATCAYAAACKsM07AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD8SURBVHgBtZXtDcIgEIZfSP/bEToCG8gIdYK6ihu4gSMYJ5BuUCeoG6gT4F0osSX9SKE+yZuWAncH1wNhrT0CqPDjIIR4YyMkKe+1NanEv6DVvEhnbEgWtBtSRU522IZb6KCG2yaNdArSZ/CFItfWkZQHmq+8HRn0Nd1TIw0d2Bt4v7OQAM2/klp+lyP9DxIvMUc8qrMz6sDA1YZCBBRYAZdgM+fARxGDCuyMRtHG5oELlQvWt+XEuBrxK9ij9/dkE4MMXEXzsbH24OPATrMjOFE2Hj7Pllff5eGCRLKZPs5DSU5qrIO31CzeKXwR2Xi0tyMWnBSIgKJ/+vcviL7xJoSwybgAAAAASUVORK5CYII=",Lk="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNDAwIiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7Ij4NCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAwLCA1MCkiPg0KICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iNTAiIGZpbGw9IiM0MkE1RjUiIG9wYWNpdHk9IjAuMyIvPg0KICAgIDxjaXJjbGUgY3g9IjI1MCIgY3k9IjEyMCIgcj0iNTAiIGZpbGw9IiM2NEI1RjYiIG9wYWNpdHk9IjAuMyIvPg0KICAgIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjIyMCIgcj0iNTAiIGZpbGw9IiMyMTk2RjMiIG9wYWNpdHk9IjAuMyIvPg0KICAgIA0KICAgIDxwYXRoIGQ9Ik0xNTAsMTIwIEwyNTAsMTIwIE0yMDAsMjIwIEwxNTAsMTIwIE0yMDAsMjIwIEwyNTAsMTIwIiANCiAgICAgICAgICBzdHJva2U9IiMxRTg4RTUiIA0KICAgICAgICAgIHN0cm9rZS13aWR0aD0iNCIgDQogICAgICAgICAgc3Ryb2tlLWRhc2hhcnJheT0iMTAsMTAiLz4NCiAgICANCiAgICA8dGV4dCB4PSIzNTAiIHk9IjIwMCIgDQogICAgICAgICAgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiANCiAgICAgICAgICBmb250LXNpemU9IjcwIiANCiAgICAgICAgICBmb250LXdlaWdodD0iOTAwIj4NCiAgICAgIDx0c3BhbiB4PSIyNTAiIGR5PSItMjAiIGZpbGw9IiMxNTY1QzAiPkdvb2Q8L3RzcGFuPg0KICAgICAgPHRzcGFuIHg9IjMwMCIgZHk9IjcwIiBmaWxsPSIjMjE5NkYzIj5CdXlVczwvdHNwYW4+DQogICAgPC90ZXh0Pg0KICA8L2c+DQo8L3N2Zz4=",Rk="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='30px'%20viewBox='0%20-960%20960%20960'%20width='30px'%20fill='%23434343'%3e%3cpath%20d='M144-264v-72h672v72H144Zm0-180v-72h672v72H144Zm0-180v-72h672v72H144Z'/%3e%3c/svg%3e",Tk=()=>{const[e,t]=k.useState(!1),[n,r]=k.useState(!1);k.useEffect(()=>{const o=localStorage.getItem("jwt");t(!!o)},[]);const i=()=>{r(!n)};return a.jsx(Dk,{children:a.jsxs(Nk,{children:[a.jsx(Ok,{children:a.jsx(hn,{to:"/",children:a.jsx("img",{src:Lk,alt:"로고"})})}),a.jsx(zk,{onClick:i,children:a.jsx("img",{src:Rk,alt:"메뉴버튼"})}),a.jsx(_k,{$isOpen:n,children:a.jsxs(Mk,{children:[a.jsx(jo,{children:a.jsx(wr,{to:"/",onClick:i,children:"Home"})}),a.jsx(jo,{children:a.jsx(wr,{to:"/products",onClick:i,children:"Products"})}),a.jsx(jo,{children:a.jsx(wr,{to:"/mypage/notification",onClick:i,children:"Notifications"})}),a.jsx(jo,{children:a.jsx(wr,{to:"/community",onClick:i,children:"Community"})}),a.jsx(jo,{children:a.jsx(wr,{to:"/mypage/setting",onClick:i,children:"My Page"})}),e?a.jsxs(a.Fragment,{children:[a.jsx(Xh,{children:a.jsx(wr,{to:"/signout",onClick:i,children:"LogOut"})}),a.jsx(Xh,{children:a.jsx(Fk,{children:a.jsx(wr,{to:"/cart",onClick:i,children:a.jsx("img",{src:Ik,alt:"장바구니 아이콘"})})})})]}):a.jsx($k,{children:a.jsx(hn,{to:"/signin",onClick:i,children:"Login"})})," "]})})]})})},Dk=u.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  position: relative;
`,Nk=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`,Ok=u.div`
  img {
    margin-top: -10%;
    margin-left: -25%;
    height: auto;
    width: 250px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    img {
      margin-top: 0;
      margin-left: 0;
      width: 150px;
    }
  }
`,zk=u.button`
  display: none;

  @media (min-width: 576px) and (max-width: 767px) {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
  }
`,_k=u.nav`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;

  @media (min-width: 576px) and (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    z-index: 10;
    display: ${({$isOpen:e})=>e?"flex":"none"};
    align-items: center;
    justify-content: center;
  }
`,Mk=u.ul`
  display: flex;
  list-style: none;
  gap: 10px;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (min-width: 576px) and (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: center;
  }
`,jo=u.li`
  margin: 0;

  a {
    display: block;
    padding-bottom: 15px;
    text-decoration: none;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
  }

  &:hover {
    background-color: #f4f4f4;
    border-radius: 8px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 100%;
    text-align: center;

    a {
      padding: 10px;
      width: 100%;
    }
  }
`,$k=u.li`
  background-color: black;
  height: 30px;
  width: 70px;
  border-radius: 5px;
  overflow: hidden;

  a {
    color: white;
    text-decoration: none;
    display: block;
    text-align: center;
    margin-top: 4px;
    font-weight: bold;
  }

  &:hover {
    background-color: #333;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 130px;
    height: 40px;
    margin-left: 10px;
    a {
      margin-top: 10px;
      font-size: 16px;
    }
  }
`,Xh=u.li`
  background-color: black;
  height: 30px;
  border-radius: 5px;
  overflow: hidden;

  a {
    color: white;
    text-decoration: none;
    display: block;
    text-align: center;
    margin-top: -1px;
    font-weight: bold;
  }

  &:hover {
    background-color: #333;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 130px;
    height: 40px;
    margin-left: 10px;

    a {
      margin-top: -1px;
      margin-left: -8px;
      font-size: 16px;
    }
  }
`,wr=u(hn)`
  text-decoration: none;
  color: #000;
  padding: 5px 12px;
  margin-top: 10px;
  transition: background-color 0.2s;
  border-radius: 5px;

  @media (min-width: 576px) and (max-width: 767px) {
    color: black;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`,Fk=u.div`
  img {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    img {
      width: 25px;
      height: 25px;
    }
  }
`,Bk=()=>a.jsx(Uk,{children:a.jsx(Wk,{children:"© 2024 LinkUp. All Rights Reserved."})}),Uk=u.footer`
  width: 100%;

  color: white;
  background-color: black;
  text-align: center;
  padding: 1rem 0;
  margin-top: auto;
`,Wk=u.p`
  margin: 0;
  font-size: 1rem;
`,Qk=()=>a.jsxs(Hk,{children:[a.jsx(Tk,{}),a.jsx(Vk,{children:a.jsx(I2,{})}),a.jsx(Bk,{})]}),Hk=u.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`,Vk=u.main`
  flex: 1; /* 남은 공간을 모두 차지 */
  padding: 1rem;
  margin-bottom: 150px;
`,qk=()=>{const e=tt();return a.jsxs(eP,{children:[a.jsx(Yk,{children:"Image"}),a.jsxs(Zk,{children:[a.jsx(Xk,{children:"Welcome 👋🏼"}),a.jsx(em,{children:"email address"}),a.jsx(Zh,{placeholder:"이메일 입력"}),a.jsx(em,{children:"password"}),a.jsx(Zh,{placeholder:"비밀번호 입력 (8 ~ 16자리)"}),a.jsx(Jk,{children:"Login"}),a.jsx(Kk,{children:"계정으로 로그인"}),a.jsxs(Gk,{children:[a.jsx(Yh,{onClick:()=>{e("/signup")},children:"회원가입 하기"}),a.jsx(Yh,{onClick:()=>{e("/findpassword")},children:"비밀번호 찾기"})]})]})]})},Yh=u.div`
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
`,Gk=u.div`
  margin-top: 35px;
  width: calc(100% - 20px);
  display: inline-flex;
  justify-content: space-around;
`,Kk=u.div`
  border: 1px solid #000;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
`,Jk=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  cursor: pointer;
`,Zh=u.input`
  width: calc(100% - 20px);
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  padding: 5px 10px;
  box-shadow: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
  }
`,em=u.div`
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
`,Xk=u.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`,Yk=u.div`
  flex: 6;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
`,Zk=u.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`,eP=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;function tP(){const e=tt();return a.jsxs(sP,{children:[a.jsx(iP,{children:"Image"}),a.jsxs(oP,{children:[a.jsx(rP,{children:"회원가입"}),a.jsx(Lc,{children:"email address"}),a.jsx(Ic,{placeholder:"이메일 입력"}),a.jsx(Lc,{children:"password"}),a.jsx(Ic,{placeholder:"비밀번호 입력 (8 ~ 16자리)"}),a.jsx(Lc,{children:"confirm password"}),a.jsx(Ic,{placeholder:"비밀번호 확인"}),a.jsx(nP,{onClick:()=>{e("/termsandservice")},children:"Signup"})]})]})}const nP=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  cursor: pointer;
`,Ic=u.input`
  width: calc(100% - 20px);
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  padding: 5px 10px;
  box-shadow: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
  }
`,Lc=u.div`
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
`,rP=u.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`,iP=u.div`
  flex: 6;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
`,oP=u.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`,sP=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
`,aP=()=>{const e=tt();return a.jsxs(gP,{children:[a.jsx(hP,{children:"Image"}),a.jsxs(mP,{children:[a.jsx(lP,{onClick:()=>{e(-1)},children:"Back"}),a.jsx(fP,{children:"비밀번호 찾기"}),a.jsx(cP,{children:"등록된 이메일 주소를 입력하고 비밀번호 재설정을 위한 코드를 확인해주세요"}),a.jsx(pP,{children:"email address"}),a.jsx(dP,{placeholder:"이메일 입력"}),a.jsx(uP,{children:"Send OTP"})]})]})},lP=u.div`
  margin-bottom: 35px;
`,cP=u.div`
  margin-bottom: 20px;
  color: #a4a1aa;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
`,uP=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  cursor: pointer;
`,dP=u.input`
  width: calc(100% - 20px);
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  padding: 5px 10px;
  box-shadow: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
  }
`,pP=u.div`
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
`,fP=u.div`
  font-size: 30px;
  font-weight: 900;
`,hP=u.div`
  flex: 6;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
`,mP=u.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`,gP=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
`,xP=()=>{const e=tt(),[t,n]=k.useState(""),[r,i]=k.useState(""),[o,s]=k.useState(!1),l=()=>{t===r&&t.length>=8?s(!0):alert("비밀번호가 일치하지 않거나 유효하지 않습니다.")};return a.jsxs(a.Fragment,{children:[a.jsxs(PP,{children:[a.jsx(bP,{children:"Image"}),a.jsxs(kP,{children:[a.jsx(SP,{children:"비밀번호 재설정"}),a.jsx(nm,{children:"password"}),a.jsx(tm,{type:"password",placeholder:"비밀번호 입력 (8 ~ 16자리)",value:t,onChange:c=>n(c.target.value)}),a.jsx(nm,{children:"confirm password"}),a.jsx(tm,{type:"password",placeholder:"비밀번호 확인",value:r,onChange:c=>i(c.target.value)}),a.jsx(CP,{onClick:l,children:"Confirm"})]})]}),o&&a.jsx(vP,{children:a.jsxs(wP,{children:[a.jsx(jP,{children:"비밀번호가 변경되었습니다."}),a.jsx(yP,{onClick:()=>{e("/signin")},children:"Back to Login"})]})})]})},yP=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 40px);
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  cursor: pointer;
`,vP=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,wP=u.div`
  width: 432px;
  height: 332px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  z-index: 1001;
`,jP=u.div`
  font-size: 18px;
  font-weight: 800;
  color: #333;
`,CP=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  cursor: pointer;
`,tm=u.input`
  width: calc(100% - 20px);
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  padding: 5px 10px;
  box-shadow: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
  }
`,nm=u.div`
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
`,SP=u.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`,bP=u.div`
  flex: 6;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
`,kP=u.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`,PP=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
`,EP=()=>{const e=tt(),[t,n]=k.useState({all:!1,age:!1,service:!1,finance:!1,privacy:!1,marketing:!1}),r=()=>{const o=!t.all;n({all:o,age:o,service:o,finance:o,privacy:o,marketing:o})},i=o=>{n(s=>{const l={...s,[o]:!s[o]};return l.all=l.age&&l.service&&l.finance&&l.privacy&&l.marketing,l})};return a.jsxs(NP,{children:[a.jsx(TP,{children:"Image"}),a.jsxs(DP,{children:[a.jsxs(RP,{children:["서비스 약관에",a.jsx("br",{}),"동의해주세요."]}),a.jsxs(AP,{children:[a.jsxs(ai,{children:[a.jsx("input",{type:"checkbox",checked:t.all,onChange:r}),"약관에 모두 동의"]}),a.jsx(IP,{}),a.jsxs(ea,{children:[a.jsxs(ai,{children:[a.jsx("input",{type:"checkbox",checked:t.age,onChange:()=>i("age")}),"(필수) 만 14세 이상입니다."]}),a.jsx(Zs,{children:"보기"})]}),a.jsxs(ea,{children:[a.jsxs(ai,{children:[a.jsx("input",{type:"checkbox",checked:t.service,onChange:()=>i("service")}),"(필수) 서비스 이용약관 동의"]}),a.jsx(Zs,{children:"보기"})]}),a.jsxs(ea,{children:[a.jsxs(ai,{children:[a.jsx("input",{type:"checkbox",checked:t.finance,onChange:()=>i("finance")}),"(필수) 전자 금융거래 이용약관 동의"]}),a.jsx(Zs,{children:"보기"})]}),a.jsxs(ea,{children:[a.jsxs(ai,{children:[a.jsx("input",{type:"checkbox",checked:t.privacy,onChange:()=>i("privacy")}),"(필수) 개인정보 제공 동의"]}),a.jsx(Zs,{children:"보기"})]}),a.jsxs(ai,{children:[a.jsx("input",{type:"checkbox",checked:t.marketing,onChange:()=>i("marketing")}),"(선택) 마케팅 수신 동의"]})]}),a.jsx(LP,{onClick:()=>{t.age&&t.service&&t.finance&&t.privacy?e("/neighborhood"):alert("필수 항목을 모두 동의해주세요.")},children:"Next"})]})]})},Zs=u.div`
  font-size: 10px;
  color: #737171;
  cursor: pointer;
`,AP=u.div`
  margin-top: 20px;
  width: calc(100% - 20px);
`,ea=u.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
`,ai=u.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;

  input {
    margin-right: 10px;
  }
`,IP=u.div`
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
`,LP=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  cursor: pointer;
`,RP=u.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`,TP=u.div`
  flex: 6;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
`,DP=u.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`,NP=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
`,OP=({input:e,setInput:t})=>a.jsx(zP,{children:a.jsx(_P,{type:"text",value:e,onChange:n=>t(n.target.value),placeholder:"검색어를 입력하세요"})}),zP=u.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 2rem;
`,_P=u.input`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  width: 60%;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4f86e6;
    box-shadow: 0 0 10px rgba(79, 134, 230, 0.3);
  }

  ::placeholder {
    color: #888;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 1rem;
  }
`,MP=({input:e,products:t})=>{const[n,r]=k.useState(1),[i,o]=k.useState("판매 상품"),s=16,l=(n-1)*s,c=i==="마감 상품"?t.filter(p=>new Date(p.deadline)<new Date):t.filter(p=>new Date(p.deadline)>new Date),d=Math.ceil(c.length/s);k.useEffect(()=>{r(1)},[i]);const f=c.slice(l,l+s);return a.jsxs($P,{children:[a.jsxs(FP,{children:[a.jsxs(BP,{children:[a.jsx(rm,{isSelected:i==="판매 상품",onClick:()=>o("판매 상품"),children:"판매 상품"}),a.jsx(rm,{isSelected:i==="마감 상품",onClick:()=>o("마감 상품"),children:"마감 상품"})]}),e?`${e}에 대한 검색 결과`:""]}),a.jsx(UP,{children:f.map(p=>a.jsxs(WP,{isSelected:i==="판매 상품",children:[a.jsxs(QP,{to:`/products/${p.id}`,children:[a.jsx(HP,{src:p.url,alt:p.name}),a.jsxs(VP,{children:[a.jsx(qP,{children:p.name}),a.jsxs(GP,{children:[" ",a.jsx(vs,{rating:p.rating})]}),a.jsxs(KP,{children:[a.jsxs(JP,{children:["$",p.originalPrice.toFixed(2)]}),a.jsxs(XP,{children:["$",p.discountPrice.toFixed(2)]})]})]})]}),a.jsx(YP,{likes:p.available})]},p.id))}),d>1&&a.jsx(ZP,{children:a.jsx(Gx,{currentPage:n,totalPages:d,onPageChange:p=>r(p)})})]})},$P=u.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
  margin: 0 auto;
`,FP=u.h2`
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`,BP=u.div`
  width: 200px;
  display: flex;
  gap: 25px;
  margin-top: -15%;
  margin-bottom: 5%;
`,rm=u.h2`
  cursor: pointer;
  text-decoration: ${({isSelected:e})=>e?"underline":"none"};
  font-size: 16px;
`,UP=u.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 20px;
  margin-top: 20px;
  @media (min-width: 576px) and (max-width: 767px) {
    gap: 5px;
  }
`,WP=u.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  margin: 10px;
  width: 200px;
  background-color: ${({isSelected:e})=>e?"white":"#f0f0f0"};
  border-radius: 8px;
  box-shadow: ${({isSelected:e})=>e?"0 4px 6px rgba(0, 0, 0, 0.1)":"none"};
  opacity: ${({isSelected:e})=>e?1:.6};
  align-items: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  &::after {
    content: ${({isSelected:e})=>e?'""':'"판매 종료"'};
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
    transform: translateY(-5px);
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 130px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 90px;
  }
`,QP=u(hn)`
  text-decoration: none;
  &:link {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
  &:active {
    color: inherit;
  }
`,HP=u.img`
  width: 90%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
  object-fit: cover;
  @media (min-width: 576px) and (max-width: 767px) {
    width: 110px;
    height: 110px;
  }
`,VP=u.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`,qP=u.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
  }
`,GP=u.div`
  font-size: 20px;
  color: #ffaa00;
  text-align: left;
  margin-left: -5px;
  margin-top: 5px;
  @media (min-width: 576px) and (max-width: 767px) {
    display: none;
  }
`,KP=u.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  text-align: left;
`,JP=u.div`
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 10px;
    position: absolute;
    bottom: 25px;
  }
`,XP=u.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff4d4f;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
  }
`,YP=u.img`
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  content: ${({likes:e})=>`url(${e?Rx:Lx})`};
  color: ${({likes:e})=>e?"red ":"transparent"};

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    bottom: 10px;
    right: 10px;
    width: 18px;
    height: 18px;
  }
`,ZP=u.div`
  margin-top: 20px;
  margin-left: 46%;
`,e3=()=>{const[e,t]=k.useState(""),n=Tn();k.useEffect(()=>{const l=new URLSearchParams(n.search).get("category");l&&t(l)},[]);const r=s=>[...s].sort((c,d)=>d.reviews.length-c.reviews.length),o=k.useMemo(()=>r(Gr),[Gr]).filter(s=>s.name.toLowerCase().includes(e.toLowerCase())||s.category.toLowerCase().includes(e.toLowerCase()));return a.jsxs(a.Fragment,{children:[a.jsx(im,{children:a.jsx(om,{children:a.jsx(OP,{input:e,setInput:t})})}),a.jsxs(im,{children:[a.jsx(om,{children:a.jsx(MP,{input:e,products:o})}),a.jsx(js,{})]})]})},im=u.div`
  display: flex;
  margin-top: 5vh;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`,om=u.div`
  display: flex;
  align-items: center;
  width: 100%;
`,t3=async e=>{try{const t="/products/wishlist",{data:n}=await fr.post(t,e);return n}catch{throw new Error("위시리스트 추가에 실패하였습니다.")}},n3=async(e,t)=>{try{const n=`/review/${e}`,{data:r}=await fr.post(n,t);return r}catch{throw new Error("댓글 작성에 실패하였습니다.")}},r3=async(e,t)=>{try{const n=`/goodbuyUs/orders/${e}`,{data:r}=await fr.post(n,t);return r}catch{throw new Error("주문에 실패하였습니다.")}},i3=()=>{const{id:e}=xs();if(!e)return a.jsx("p",{children:"상품 번호가 유실되었습니다."});const t=Number(e),n=Gr.find(N=>N.id===t);if(!n)return a.jsx("p",{children:"해당 상품을 찾을 수 없습니다."});const[r,i]=k.useState(1),[o,s]=k.useState(""),[l,c]=k.useState(5),[d,f]=k.useState(""),[p,g]=k.useState(10),[w,v]=k.useState({}),y=()=>{r3(n.id,r).then(N=>{v(N)})},C=()=>{g(N=>N+10)},m=()=>{const N=new Date,ee=new Date(n.deadline).getTime()-N.getTime();if(ee<=0){f("마감되었습니다.");return}const le=Math.floor(ee/(1e3*60*60*24)),he=Math.floor(ee%(1e3*60*60*24)/(1e3*60*60)),me=Math.floor(ee%(1e3*60*60)/(1e3*60));f(`${le}일 ${he}시간 ${me}분 남음`)};k.useEffect(()=>{m();const N=setInterval(m,6e4);return()=>clearInterval(N)},[]);const b=n.now>=n.currentStock||d==="마감되었습니다.",E=Math.min(n.now/n.currentStock*100,100),j=N=>{const M=parseInt(N.target.value);M>0&&i(M)},I=N=>{N.preventDefault(),n3(n.id,{review:o,rating:l}),s("")},R=n.minamount-n.now;return a.jsx(a.Fragment,{children:a.jsxs(o3,{children:[a.jsxs(s3,{children:[a.jsxs(a3,{children:[a.jsx(c3,{src:n.url,alt:n.name}),a.jsx(d3,{children:a.jsx(vs,{rating:n.rating})})]}),a.jsxs(l3,{children:[a.jsx(u3,{children:n.name}),a.jsxs(p3,{children:[a.jsxs(m3,{children:["$",n.originalPrice.toFixed(2)]}),a.jsxs(f3,{children:[a.jsxs(g3,{children:["$",n.discountPrice.toFixed(2)]}),a.jsxs(h3,{children:[n.minamount,"개 부터 할인 적용"]})]}),R>0&&a.jsxs(x3,{children:["할인 적용까지 ",R,"개 남음"]})]}),a.jsx(y3,{children:n.description}),a.jsx(v3,{children:d}),a.jsxs(w3,{children:[a.jsx(j3,{children:"현재 구매 현황"}),a.jsx(C3,{children:a.jsx(S3,{style:{width:`${E}%`}})}),a.jsxs(b3,{children:[n.now," / ",n.currentStock," 구매됨"]})]}),a.jsxs(k3,{children:[a.jsxs(P3,{children:[a.jsx(E3,{children:"수량"}),a.jsx(A3,{type:"number",min:"1",value:r,onChange:j})]}),a.jsxs(I3,{children:[a.jsx(L3,{to:`/products/payment/${n.id}?data =${encodeURIComponent(JSON.stringify(w))} `,disabled:b,onClick:y,children:"구매하기"}),a.jsx(R3,{type:"button",onClick:()=>{t3(n.id)},children:"찜하기"})]})]})]})]}),a.jsxs(T3,{children:[a.jsx(D3,{onSubmit:I,children:a.jsxs(N3,{children:[a.jsx(O3,{value:o,onChange:N=>s(N.target.value),placeholder:"댓글을 입력하세요"}),a.jsx(z3,{value:l,onChange:N=>c(Number(N.target.value)),children:[1,2,3,4,5].map(N=>a.jsx("option",{value:N,children:"⭐".repeat(N)},N))}),a.jsx(_3,{type:"submit",children:"댓글 달기"})]})})," ",a.jsxs("div",{children:[n.reviews.slice(0,p).map((N,M)=>a.jsxs(M3,{children:[N.review,a.jsx($3,{children:"⭐".repeat(N.rating)})]},M)),a.jsx(F3,{children:p<n.reviews.length&&a.jsx(B3,{onClick:C,children:"더보기"})})]})]})]})})},o3=u.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`,s3=u.div`
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
`,a3=u.div`
  position: relative;
  flex: 1;
  @media (min-width: 576px) and (max-width: 767px) {
    height: 300px;
    width: 300px;
  }
`,l3=u.div`
  flex: 1;
`,c3=u.img`
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  object-fit: cover;
  @media (min-width: 576px) and (max-width: 767px) {
    height: 300px;
    width: 300px;
  }
`,u3=u.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`,d3=u.div`
  position: absolute;
  font-size: 20px;
  color: #ffaa00;
  bottom: 80px;
  right: 2%;

  @media (min-width: 768px) and (max-width: 1024px) {
    bottom: 80px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    bottom: 10px;
  }
`,p3=u.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  @media (min-width: 576px) and (max-width: 767px) {
    flex-direction: column;
  }
`,f3=u.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,h3=u.div`
  font-size: 14px;
  color: #888;
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-left: -50%;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
  }
`,m3=u.div`
  text-decoration: line-through;
  color: #999;
  font-size: 18px;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
  }
`,g3=u.div`
  font-weight: bold;
  color: #ff4d4f;
  font-size: 24px;
  @media (min-width: 576px) and (max-width: 767px) {
    margin-top: -10px;
    font-size: 18px;
  }
`,x3=u.div`
  display: inline-flex;
  align-items: center;
  background-color: #fff3f3;
  border: 1px solid #ffcdd2;
  border-radius: 20px;
  padding: 8px 16px;
  color: #ff4d4f;
  font-size: 14px;
  font-weight: 600;
  &::before {
    content: '🏷️';
    margin-right: 8px;
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 220px;
  }
`,y3=u.p`
  margin-bottom: 30px;
  line-height: 1.6;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 576px) and (max-width: 767px) {
    -webkit-line-clamp: 2;
  }
`,v3=u.div`
  font-size: 16px;
  color: #ff4d4f;
  margin-bottom: 20px;
`,w3=u.div`
  margin-bottom: 20px;
`,j3=u.div`
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
`,C3=u.div`
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
`,S3=u.div`
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
`,b3=u.div`
  margin-top: 5px;
  font-size: 14px;
  color: #555;
`,k3=u.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: 576px) and (max-width: 767px) {
    margin-top: -40px;
    margin-left: -340px;
  }
`,P3=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 120px;
  font-size: 16px;
  border-radius: 8px;
  padding: 10px 15px;
`,E3=u.span`
  font-weight: bold;
  color: #333;
`,A3=u.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`,I3=u.div`
  display: flex;
  gap: 10px;
`,L3=u(hn)`
  flex: 2;
  padding: 15px;
  background-color: ${({disabled:e})=>e?"#d1d5db":"#2563eb"};
  color: ${({disabled:e})=>e?"#9ca3af":"white"};
  border: none;
  border-radius: 5px;
  cursor: ${({disabled:e})=>e?"not-allowed":"pointer"};
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  pointer-events: ${({disabled:e})=>e?"none":"auto"}; /* 비활성화 시 클릭 불가 */

  &:hover {
    cursor: ${({disabled:e})=>e?"not-allowed":"pointer"}; /* 비활성화 상태에서 hover 시 커서 변경 */
    background-color: ${({disabled:e})=>e?"#d1d5db":"white"};
    color: ${({disabled:e})=>e?"#9ca3af":"#2563eb"};
    border: ${({disabled:e})=>e?"none":"1px solid #2563eb"};
  }
`,R3=u.button`
  flex: 1;
  padding: 15px;
  background-color: white;
  color: #2563eb;
  border: 1px solid #2563eb;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #2563eb;
    color: white;
  }
`,T3=u.div`
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
`,D3=u.form`
  margin-bottom: 20px;
`,N3=u.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`,O3=u.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`,z3=u.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`,_3=u.button`
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`,M3=u.div`
  margin-top: 10px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$3=u.div`
  font-size: 16px;
  color: #ffaa00;
`,F3=u.div`
  display: flex;
  justify-content: center;
`,B3=u.button`
  margin-top: 20px;
  border: 1px solid black;
  background-color: transparent;
  border-radius: 8px;
  width: 200px;
  height: 40px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background-color: #2563eb;
    color: white;
  }
`,U3=u.div`
  display: inline-flex;
  gap: 20px;
  width: 100%;
`,W3=u.div`
  width: 100%;
  padding: 0px 20px;
`,lt={Wrapper:U3,Content:W3},hr=()=>{const e=tt(),t=Tn(),n=r=>t.pathname===r;return a.jsxs(H3,{children:[a.jsxs(V3,{children:[a.jsx(q3,{src:"/images/origin.png",alt:"Profile"}),a.jsxs(G3,{children:[a.jsx(K3,{children:"Hello 👋"}),a.jsx(J3,{children:"Robert Fox"})]})]}),a.jsx(Q3,{}),a.jsxs(X3,{children:[a.jsxs(_n,{isActive:n("/mypage/setting"),onClick:()=>e("/mypage/setting"),children:[a.jsx("img",{src:`/images/setting${n("/mypage/setting")?"_on":""}.png`,width:24,height:24,alt:"Icon"}),"설정"]}),a.jsxs(_n,{isActive:n("/mypage/orderlist"),onClick:()=>e("/mypage/orderlist"),children:[a.jsx("img",{src:`/images/orderlist${n("/mypage/orderlist")?"_on":""}.png`,width:24,height:24,alt:"Icon"}),"주문 내역"]}),a.jsxs(_n,{isActive:n("/mypage/wishlist"),onClick:()=>e("/mypage/wishlist"),children:[a.jsx("img",{src:`/images/wishlist${n("/mypage/wishlist")?"_on":""}.png`,width:24,height:24,alt:"Icon"}),"찜한 상품"]}),a.jsxs(_n,{isActive:n("/mypage/location"),onClick:()=>e("/mypage/location"),children:[a.jsx("img",{src:`/images/location${n("/mypage/location")?"_on":""}.png`,width:24,height:24,alt:"Icon"}),"동네인증"]}),a.jsxs(_n,{isActive:n("/mypage/refund"),onClick:()=>e("/mypage/refund"),children:[a.jsx("img",{src:`/images/refund${n("/mypage/refund")?"_on":""}.png`,width:24,height:24,alt:"Icon"}),"환불계좌 관리"]}),a.jsxs(_n,{isActive:n("/mypage/notification"),onClick:()=>e("/mypage/notification"),children:[a.jsx("img",{src:`/images/notification${n("/mypage/notification")?"_on":""}.png`,width:24,height:24,alt:"Icon"}),"알림내역"]}),a.jsxs(_n,{isActive:n("/mypage/myposts"),onClick:()=>e("/mypage/myposts"),children:[a.jsx("img",{src:`/images/myposts${n("/mypage/myposts")?"_on":""}.png`,width:24,height:24,alt:"Icon"}),"나의 게시글"]}),a.jsxs(_n,{isActive:n("/mypage/chatlist"),onClick:()=>e("/mypage/chatlist"),children:[a.jsx("img",{src:`/images/chatlist${n("/mypage/chatlist")?"_on":""}.png`,width:24,height:24,alt:"Icon"}),"나의 채팅방 목록"]})]})]})},Q3=u.div`
  width: 100%;
  border: 0.5px solid #888;
`,H3=u.div`
  width: 260px;
  min-width: 260px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,V3=u.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`,q3=u.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`,G3=u.div`
  display: flex;
  flex-direction: column;
`,K3=u.div`
  font-size: 14px;
  color: #888;
`,J3=u.div`
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
`,X3=u.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 20px;
`,_n=u.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({isActive:e})=>e?"#fff":"#333"};
  cursor: pointer;
  height: 30px;
  gap: 10px;
  background-color: ${({isActive:e})=>e?"#000":"transparent"};
  border-radius: 5px;
  padding: 5px 10px;

  &:hover {
    background-color: ${({isActive:e})=>e?"#000":"#f1f1f1"};
    color: ${({isActive:e})=>e?"#fff":"#000"};
  }
`,Y3={addressList:[{id:1,name:"Robert Fox",address:"4517 Washington Ave. Manchester, Kentucky 39495",phone:"(209) 555-0104"},{id:2,name:"John Willions",address:"3891 Ranchview Dr. Richardson, California 62639",phone:"(270) 555-0117"},{id:3,name:"Alexa Johnson",address:"4517 Washington Ave. Manchester, Kentucky 39495",phone:"(208) 555-0112"}]},Z3=[{id:1,name:"Women Textured Handheld Bag",quantity:1,price:"$80.00",status:"배송 준비 중",thumb:""},{id:2,name:"Tailored Cotton Casual Shirt",quantity:1,price:"$40.00",status:"배송 중",thumb:""},{id:3,name:"Tailored Cotton Casual Shirt",quantity:1,price:"$40.00",status:"배송 완료",thumb:""},{id:4,name:"Tailored Cotton Casual Shirt",quantity:1,price:"$40.00",status:"주문 취소",thumb:""}],eE=[{id:1,name:"Women Textured Handheld Bag",quantity:1,price:"$80.00",status:"환불 처리 중",thumb:""},{id:2,name:"Tailored Cotton Casual Shirt",quantity:1,price:"$40.00",status:"환불 완료",thumb:""}],tE=[{id:1,name:"Women Textured Handheld Bag",quantity:1,price:"$80.00",status:"공구 모집중",thumb:""},{id:2,name:"Tailored Cotton Casual Shirt",quantity:1,price:"$40.00",status:"공구 완료",thumb:""}],sm=[{id:1,name:"Women Textured Handheld Bag",quantity:1,price:"$80.00",thumb:""},{id:2,name:"Tailored Cotton Casual Shirt",quantity:1,price:"$40.00",thumb:""}],nE=[{id:1,icon:"bell",title:"{제목} 공동구매 모집이 완료되었습니다.",time:"2024-11-20 13:30"},{id:2,icon:"bell",title:"{제목} 인원 부족으로 모집이 취소되었습니다.",time:"2024-11-19 11:30"},{id:3,icon:"chat",title:"{닉네임}님과 채팅을 시작했습니다.",time:"2024-11-17 15:00"},{id:4,icon:"comment",title:"{닉네임}님이 댓글을 남겼습니다.",time:"2024-11-16 11:10"}],rE=({onClose:e})=>{const[t,n]=k.useState(1),[r,i]=k.useState(""),[o,s]=k.useState(""),[l,c]=k.useState(""),d=()=>{t===1?n(2):t===2&&(o===l?e():alert("비밀번호가 일치하지 않습니다."))};return a.jsx(iE,{onClick:e,children:a.jsx(oE,{onClick:f=>f.stopPropagation(),children:a.jsxs(sE,{children:[t===1&&a.jsxs(a.Fragment,{children:[a.jsx(Rc,{children:"현재 비밀번호"}),a.jsxs(Tc,{children:[a.jsx(Dc,{type:"password",placeholder:"현재 비밀번호를 입력하세요",value:r,onChange:f=>i(f.target.value)}),a.jsx(am,{onClick:d,children:"확인"})]})]}),t===2&&a.jsxs(a.Fragment,{children:[a.jsx(Rc,{children:"변경할 비밀번호"}),a.jsx(Tc,{children:a.jsx(Dc,{type:"password",placeholder:"새 비밀번호를 입력하세요",value:o,onChange:f=>s(f.target.value)})}),a.jsx(Rc,{children:"비밀번호 확인"}),a.jsxs(Tc,{children:[a.jsx(Dc,{type:"password",placeholder:"비밀번호를 다시 입력하세요",value:l,onChange:f=>c(f.target.value)}),a.jsx(am,{onClick:d,children:"변경"})]})]})]})})})},iE=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,oE=u.div`
  background-color: #fff;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`,sE=u.div`
  font-size: 16px;
  margin-bottom: 20px;
`,Rc=u.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`,Tc=u.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`,Dc=u.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`,am=u.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`,aE=({onClose:e})=>{const t=tt();return a.jsx(lE,{onClick:e,children:a.jsx(cE,{onClick:n=>n.stopPropagation(),children:a.jsxs(uE,{children:[a.jsx(dE,{children:"로그아웃 하시겠습니까?"}),a.jsx(pE,{onClick:()=>{t("/")},children:"확인"})]})})})},lE=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,cE=u.div`
  background-color: #fff;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`,uE=u.div`
  font-size: 16px;
`,dE=u.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`,pE=u.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`,fE=({onClose:e})=>{const t=tt();return a.jsx(hE,{onClick:e,children:a.jsx(mE,{onClick:n=>n.stopPropagation(),children:a.jsxs(gE,{children:[a.jsx(xE,{children:"회원탈퇴 하시겠습니까?"}),a.jsx(yE,{onClick:()=>{t("/")},children:"확인"})]})})})},hE=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,mE=u.div`
  background-color: #fff;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`,gE=u.div`
  font-size: 16px;
`,xE=u.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`,yE=u.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`,vE=()=>{const{addressList:e}=Y3,[t,n]=k.useState(!1),[r,i]=k.useState(!1),[o,s]=k.useState(!1);return a.jsxs(lt.Wrapper,{children:[a.jsx(hr,{}),a.jsxs(lt.Content,{children:[a.jsxs(ME,{children:[a.jsx("img",{src:"/images/origin.png",width:80,height:80}),a.jsx(_E,{children:"Edit Profile"})]}),a.jsxs(zE,{children:[a.jsx(Nc,{children:"닉네임 변경"}),a.jsx(NE,{placeholder:"최소 2자 이상 ~ 15자 이내, 띄어쓰기 및 특수문자 사용 불가"}),a.jsx(OE,{children:"변경하기"})]}),a.jsxs(DE,{children:[a.jsx(Nc,{children:"배송지 주소 변경"}),a.jsx(TE,{children:"Add New Address"}),a.jsx(CE,{children:e.map(l=>a.jsxs(SE,{children:[a.jsxs(bE,{children:[a.jsx(kE,{children:l.name}),a.jsx(PE,{children:l.address}),a.jsx(EE,{children:l.phone})]}),a.jsxs(AE,{children:[a.jsx(wE,{children:"Edit"}),a.jsx(jE,{children:"Delete"})]})]},l.id))})]}),a.jsxs(RE,{children:[a.jsx(Nc,{children:"비밀번호 변경"}),a.jsx(LE,{onClick:()=>{n(!0)},children:"비밀번호 변경하기"})]}),a.jsxs(IE,{children:[a.jsx(lm,{onClick:()=>{i(!0)},children:"로그아웃"}),a.jsx(lm,{onClick:()=>{s(!0)},children:"회원탈퇴"})]}),t&&a.jsx(rE,{onClose:()=>{n(!1)}}),r&&a.jsx(aE,{onClose:()=>{i(!1)}}),o&&a.jsx(fE,{onClose:()=>{s(!1)}})]})]})},wE=u.div`
  display: inline-flex;
  justify-content: center;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`,jE=u.div`
  display: inline-flex;
  justify-content: center;
  background-color: #ffeded;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: #d9534f;

  &:hover {
    background-color: #f8d7da;
  }
`,CE=u.div`
  margin-top: 20px;
`,SE=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`,bE=u.div`
  display: flex;
  flex-direction: column;
`,kE=u.div`
  font-size: 14px;
  font-weight: bold;
`,PE=u.div`
  font-size: 12px;
  color: #555;
  margin-top: 5px;
`,EE=u.div`
  font-size: 12px;
  color: #555;
  margin-top: 5px;
`,AE=u.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`,lm=u.div`
  margin-top: 20px;
  cursor: pointer;
`,IE=u.div`
  margin-top: 10px;
`,LE=u.div`
  margin-top: 10px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,RE=u.div`
  margin-top: 30px;
`,TE=u.div`
  margin-top: 10px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 10px 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,DE=u.div`
  margin-top: 30px;
`,NE=u.input`
  margin-top: 10px;
  width: 350px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  padding: 5px 10px;
  box-shadow: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
  }
`,OE=u.div`
  margin-top: 10px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 10px 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 15px;
`,Nc=u.div`
  font-size: 12px;
  color: #131118;
`,zE=u.div`
  margin-top: 20px;
`,_E=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,ME=u.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,$E=()=>{const[e,t]=k.useState(!1),n=()=>{t(!0)},r=()=>{t(!1)},i=()=>{t(!1)};return a.jsxs(BE,{children:[a.jsx(UE,{children:Z3.map(o=>a.jsxs(WE,{children:[a.jsxs(FE,{children:[a.jsx(QE,{children:a.jsx(HE,{})}),a.jsxs(VE,{children:[a.jsx(qE,{children:o.name}),a.jsxs(GE,{children:["Quantity: ",o.quantity]}),a.jsx(KE,{status:o.status,children:o.status})]})]}),a.jsx(JE,{children:o.price}),a.jsxs(XE,{children:[a.jsx(YE,{children:"상품 페이지 이동"}),a.jsx(ZE,{onClick:n,children:"주문 취소/환불"}),o.status==="배송 완료"&&a.jsxs(e5,{children:[a.jsx(t5,{src:"/images/qricon.png",alt:"review icon"}),a.jsx("span",{children:"리뷰 작성하기"})]})]})]},o.id))}),e&&a.jsx(n5,{children:a.jsxs(r5,{children:[a.jsx(i5,{children:"주문을 취소/환불하시겠습니까?"}),a.jsxs(o5,{children:[a.jsx(v1,{onClick:r,children:"Yes"}),a.jsx(s5,{onClick:i,children:"No"})]})]})})]})},FE=u.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`,BE=u.div`
  width: 100%;
  margin: 20px 0;
`,UE=u.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,WE=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`,QE=u.div`
  flex-shrink: 0;
`,HE=u.div`
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,VE=u.div`
  margin-left: 20px;
`,qE=u.div`
  font-size: 16px;
  font-weight: bold;
`,GE=u.div`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`,KE=u.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  color: ${e=>e.status==="배송 완료"?"#28a745":e.status==="배송 준비 중"?"#ffc107":e.status==="주문 취소"?"#dc3545":"#007bff"};
`,JE=u.div`
  font-size: 16px;
  font-weight: bold;
`,XE=u.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,YE=u.div`
  background: #fff;
  color: #131118;
  border: 1px solid #131118;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #131118;
    color: #fff;
  }
`,ZE=u.div`
  background: #fff;
  color: #ff7262;
  border: 1px solid #ff7262;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #ff7262;
    color: #fff;
  }
`,e5=u.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  margin-top: 8px;

  span {
    border-bottom: 1px solid #131118;
  }
`,t5=u.img`
  width: 16px;
  height: 16px;
`,n5=u.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,r5=u.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`,i5=u.p`
  margin-bottom: 20px;
  font-size: 16px;
`,o5=u.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`,v1=u.button`
  padding: 8px 24px;
  border-radius: 4px;
  border: 1px solid #ff7262;
  background-color: #fff;
  color: #ff7262;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff7262;
    color: #fff;
  }
`,s5=u(v1)`
  border: 1px solid #131118;
  color: #131118;

  &:hover {
    background-color: #131118;
    color: #fff;
  }
`,a5=()=>a.jsx(c5,{children:a.jsx(u5,{children:eE.map(e=>a.jsxs(d5,{children:[a.jsxs(l5,{children:[a.jsx(p5,{children:a.jsx(f5,{})}),a.jsxs(h5,{children:[a.jsx(m5,{children:e.name}),a.jsxs(g5,{children:["Quantity: ",e.quantity]}),a.jsx(x5,{status:e.status,children:e.status})]})]}),a.jsx(y5,{children:e.price}),a.jsx(w5,{children:a.jsx(v5,{children:"상품 페이지 이동"})})]},e.id))})}),l5=u.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`,c5=u.div`
  width: 100%;
  margin: 20px 0;
`,u5=u.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,d5=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`,p5=u.div`
  flex-shrink: 0;
`,f5=u.div`
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,h5=u.div`
  margin-left: 20px;
`,m5=u.div`
  font-size: 16px;
  font-weight: bold;
`,g5=u.div`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`,x5=u.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  color: ${e=>e.status==="환불 처리 중"?"#dc3545":"#007bff"};
`,y5=u.div`
  font-size: 16px;
  font-weight: bold;
`,v5=u.div`
  background: #fff;
  color: #131118;
  border: 1px solid #131118;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #131118;
    color: #fff;
  }
`,w5=u.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,j5=()=>a.jsx(S5,{children:a.jsx(b5,{children:tE.map(e=>a.jsxs(k5,{children:[a.jsxs(C5,{children:[a.jsx(P5,{children:a.jsx(E5,{})}),a.jsxs(A5,{children:[a.jsx(I5,{children:e.name}),a.jsxs(L5,{children:["Quantity: ",e.quantity]}),a.jsx(R5,{status:e.status,children:e.status})]})]}),a.jsx(T5,{children:e.price}),a.jsxs(D5,{children:[a.jsx(N5,{children:"상품 페이지 이동"}),e.status==="공구 완료"&&a.jsxs(a.Fragment,{children:[a.jsx(M5,{children:"QR 코드 확인"}),a.jsxs(z5,{children:[a.jsx(_5,{src:"/images/qricon.png",alt:"review icon"}),a.jsx("span",{children:"리뷰 작성하기"})]})]}),e.status==="공구 모집중"&&a.jsx(a.Fragment,{children:a.jsx(O5,{children:"주문 취소하기"})})]})]},e.id))})}),C5=u.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`,S5=u.div`
  width: 100%;
  margin: 20px 0;
`,b5=u.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,k5=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`,P5=u.div`
  flex-shrink: 0;
`,E5=u.div`
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,A5=u.div`
  margin-left: 20px;
`,I5=u.div`
  font-size: 16px;
  font-weight: bold;
`,L5=u.div`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`,R5=u.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  color: ${e=>e.status==="공구 모집중"?"#28a745":"#007bff"};
`,T5=u.div`
  font-size: 16px;
  font-weight: bold;
`,D5=u.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,N5=u.div`
  background: #fff;
  color: #131118;
  border: 1px solid #131118;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #131118;
    color: #fff;
  }
`,O5=u.div`
  background: #fff;
  color: #ff7262;
  border: 1px solid #ff7262;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #ff7262;
    color: #fff;
  }
`,z5=u.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  margin-top: 8px;

  span {
    border-bottom: 1px solid #000;
  }
`,_5=u.img`
  width: 16px;
  height: 16px;
`,M5=u.div`
  background: #fff;
  color: #131118;
  border: 1px solid #131118;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  &:hover {
    background: #131118;
    color: #fff;
  }
`;function $5(){const[e,t]=k.useState("order"),n=()=>{switch(e){case"order":return a.jsx($E,{});case"refund":return a.jsx(a5,{});case"group":return a.jsx(j5,{});default:return null}};return a.jsxs(lt.Wrapper,{children:[a.jsx(hr,{}),a.jsxs(lt.Content,{children:[a.jsxs(F5,{children:[a.jsx(Oc,{isActive:e==="order",onClick:()=>t("order"),children:"주문내역"}),a.jsx(Oc,{isActive:e==="refund",onClick:()=>t("refund"),children:"환불내역"}),a.jsx(Oc,{isActive:e==="group",onClick:()=>t("group"),children:"공동구매 참여내역"})]}),n()]})]})}const F5=u.div`
  display: flex;
`,Oc=u.div`
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${e=>e.isActive?"bold":"500"};
  color: ${e=>e.isActive?"#000":"#555"};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: ${e=>e.isActive?"2px":"0"};
    background-color: #000;
    transition: height 0.3s ease;
  }
`;function B5(){const[e,t]=k.useState(()=>sm.reduce((r,i)=>(r[i.id]=!0,r),{})),n=r=>{t(i=>({...i,[r]:!i[r]}))};return a.jsxs(lt.Wrapper,{children:[a.jsx(hr,{}),a.jsxs(lt.Content,{children:[a.jsx(W5,{children:"찜한 상품"}),a.jsx(H5,{children:a.jsx(V5,{children:sm.map(r=>a.jsxs(q5,{children:[a.jsxs(Q5,{children:[a.jsx(G5,{children:a.jsx(K5,{})}),a.jsxs(J5,{children:[a.jsx(X5,{children:r.name}),a.jsxs(Y5,{children:["Quantity: ",r.quantity]})]})]}),a.jsx(Z5,{children:r.price}),a.jsx(eA,{children:a.jsx(U5,{src:e[r.id]?"/images/wish_on.png":"/images/wish.png",onClick:()=>n(r.id),alt:"찜하기"})})]},r.id))})})]})]})}const U5=u.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`,W5=u.div`
  font-size: 16px;
  font-weight: bold;
`,Q5=u.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`,H5=u.div`
  width: 100%;
  margin: 20px 0;
`,V5=u.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,q5=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`,G5=u.div`
  flex-shrink: 0;
`,K5=u.div`
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,J5=u.div`
  margin-left: 20px;
`,X5=u.div`
  font-size: 16px;
  font-weight: bold;
`,Y5=u.div`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`,Z5=u.div`
  font-size: 16px;
  font-weight: bold;
`,eA=u.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,tA=e=>new Promise((t,n)=>{if(document.getElementById("kakao-map-script")){t(window.kakao);return}const r=document.createElement("script");r.id="kakao-map-script",r.src=`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${e}&autoload=false`,r.onload=()=>{window.kakao.maps.load(()=>t(window.kakao))},r.onerror=()=>n(new Error("카카오맵 스크립트를 로드할 수 없습니다.")),document.head.appendChild(r)}),nA=({latitude:e,longitude:t,appKey:n})=>{const r=k.useRef(null);return k.useEffect(()=>{(async()=>{try{const o=await tA(n);if(!r.current)return;const s={center:new o.maps.LatLng(e,t),level:3},l=new o.maps.Map(r.current,s),c=new o.maps.LatLng(e,t);new o.maps.Marker({position:c}).setMap(l)}catch(o){console.error("카카오맵 초기화 중 오류 발생:",o)}})()},[e,t,n]),a.jsx("div",{ref:r,style:{width:"600px",height:"350px"}})};function rA(){const[e,t]=k.useState(null);return k.useEffect(()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(n=>{const{latitude:r,longitude:i}=n.coords;t({latitude:r,longitude:i})},n=>{console.error("위치 정보를 가져올 수 없습니다:",n)})},[]),a.jsxs(lt.Wrapper,{children:[a.jsx(hr,{}),a.jsxs(lt.Content,{children:[a.jsx(aA,{children:"동네 인증"}),a.jsxs(sA,{children:[e?a.jsx(nA,{latitude:e.latitude,longitude:e.longitude,appKey:void 0}):a.jsx("p",{children:"위치 정보를 불러오는 중..."}),a.jsx(oA,{children:"현재 위치가 내 동네로 설정한 00동에 있습니다."}),a.jsx(iA,{children:"동네인증 완료하기"})]})]})]})}const iA=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: 445px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,oA=u.div`
  color: #88868c;
`,sA=u.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`,aA=u.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;function lA(){const[e,t]=k.useState(!1),n=()=>{t(!0)},r=()=>{t(!1)};return a.jsxs(lt.Wrapper,{children:[a.jsx(hr,{}),a.jsxs(lt.Content,{children:[a.jsx(uA,{children:"환불계좌 관리"}),a.jsxs(cA,{children:["계좌는 1개만 등록 가능하며 본인명의 계좌만 등록/변경 가능합니다.",a.jsx("br",{}),"등록된 계좌는 현금결제 주문 취소 시 해당 계좌로 환불 금액이 입금되오니 정확하게 기입해 주시기 바랍니다."]}),a.jsx(dA,{children:a.jsxs(pA,{children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx(jr,{children:"은행명"}),a.jsx(jr,{children:"예금주"}),a.jsx(jr,{children:"계좌번호"}),a.jsx(jr,{children:" "})]})}),a.jsx("tbody",{children:a.jsxs("tr",{children:[a.jsx(Cr,{children:"00은행"}),a.jsx(Cr,{children:"굿바이어"}),a.jsx(Cr,{children:"012********"}),a.jsx(Cr,{children:a.jsxs(fA,{children:[a.jsx(hA,{onClick:n,children:"수정"}),a.jsx(mA,{children:"삭제"})]})})]})})]})}),e&&a.jsx(gA,{children:a.jsxs(xA,{children:[a.jsxs(yA,{children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx(jr,{children:"은행명"}),a.jsx(jr,{children:"예금주"}),a.jsx(jr,{children:"계좌번호"})]})}),a.jsx("tbody",{children:a.jsxs("tr",{children:[a.jsx(Cr,{children:a.jsx(zc,{type:"text",defaultValue:"00은행"})}),a.jsx(Cr,{children:a.jsx(zc,{type:"text",defaultValue:"굿바이어"})}),a.jsx(Cr,{children:a.jsx(zc,{type:"text",defaultValue:"012********"})})]})})]}),a.jsxs(vA,{children:[a.jsx(wA,{children:"등록"}),a.jsx(jA,{onClick:r,children:"취소"})]})]})})]})]})}const cA=u.div`
  color: #88868c;
  margin-bottom: 20px;
`,uA=u.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`,dA=u.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`,pA=u.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`,jr=u.th`
  padding: 12px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
`,Cr=u.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #555;
  text-align: center;
`,fA=u.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`,hA=u.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`,mA=u.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
`,gA=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,xA=u.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  text-align: center;
`,yA=u.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`,zc=u.input`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
`,vA=u.div`
  display: flex;
  justify-content: space-evenly;
`,wA=u.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`,jA=u.button`
  padding: 10px 20px;
  background-color: #fff;
  color: #333;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
`;function CA(){return a.jsxs(lt.Wrapper,{children:[a.jsx(hr,{}),a.jsxs(lt.Content,{children:[a.jsx(IA,{children:"알림내역"}),a.jsx(bA,{children:nE.map(e=>a.jsxs(kA,{children:[a.jsxs(SA,{children:[a.jsx(PA,{children:a.jsx("img",{src:"/images/"+e.icon+".png"})}),a.jsx(EA,{children:e.title})]}),a.jsx(AA,{children:e.time})]},e.id))})]})]})}const SA=u.div`
  display: inline-flex;
  align-items: center;
`,bA=u.div`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 16px;
  background: #fff;
  height: 450px;
`,kA=u.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
`,PA=u.div`
  font-size: 20px;
  margin-right: 12px;

  img {
    width: 22px;
    height: 22px;
  }
`,EA=u.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  display: inline-flex;
  align-items: center;
`,AA=u.div`
  font-size: 12px;
  color: #000;
`,IA=u.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;function LA(){const[e,t]=k.useState(!1),n=()=>{t(!0)},r=()=>{t(!1)};return a.jsxs(lt.Wrapper,{children:[a.jsx(hr,{}),a.jsxs(lt.Content,{children:[a.jsx(zA,{children:"나의 게시글"}),a.jsx(RA,{children:a.jsxs(TA,{children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx(_c,{children:"제목"}),a.jsx(_c,{children:"날짜"}),a.jsx(_c,{children:" "})]})}),a.jsx("tbody",{children:a.jsxs("tr",{children:[a.jsx(Mc,{children:"titititititititi"}),a.jsx(Mc,{children:"2024-11-18"}),a.jsx(Mc,{children:a.jsxs(DA,{children:[a.jsx(NA,{children:"수정"}),a.jsx(OA,{onClick:n,children:"삭제"})]})})]})})]})}),e&&a.jsx(_A,{children:a.jsxs(MA,{children:["삭제하시겠습니까?",a.jsxs($A,{children:[a.jsx(FA,{children:"예"}),a.jsx(BA,{onClick:r,children:"아니요"})]})]})})]})]})}const RA=u.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`,TA=u.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`,_c=u.th`
  padding: 12px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
`,Mc=u.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #555;
  text-align: center;
`,DA=u.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`,NA=u.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`,OA=u.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
`,zA=u.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`,_A=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,MA=u.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 250px;
  max-width: 90%;
  text-align: center;
`,$A=u.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
`,FA=u.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`,BA=u.button`
  padding: 10px 20px;
  background-color: #fff;
  color: #333;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
`;function UA(){return a.jsxs(lt.Wrapper,{children:[a.jsx(hr,{}),a.jsx(lt.Content,{children:"asd"})]})}const WA=()=>{const e=tt(),[t,n]=k.useState(""),[r,i]=k.useState(!0),[o,s]=k.useState(!0),l=d=>{i(d.length>=2&&d.length<=15),s(/^[가-힣a-zA-Z0-9]+$/.test(d))},c=d=>{const f=d.target.value;n(f),l(f)};return a.jsxs(KA,{children:[a.jsx(qA,{children:"Image"}),a.jsxs(GA,{children:[a.jsxs(VA,{children:["굿바이어스에서 사용할",a.jsx("br",{}),"닉네임을 정해주세요"]}),a.jsx(HA,{placeholder:"닉네임을 입력해주세요",value:t,onChange:c}),a.jsx(cm,{isValid:r,children:"최소 2자 이상 ~ 15자 이내"}),a.jsx(cm,{isValid:o,children:"띄어쓰기 및 특수문자 사용 불가"}),a.jsx(QA,{onClick:()=>{r&&o?e("/setprofile"):alert("닉네임 조건을 만족시켜 주세요.")},children:"Next"})]})]})},cm=u.div`
  color: ${({isValid:e})=>e?"#858282":"#EF2626"};
  margin-top: 20px;
  font-size: 12px;
`,QA=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 235px;
  cursor: pointer;
`,HA=u.input`
  width: calc(100% - 42px);
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  padding: 5px 10px;
  box-shadow: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
  }
`,VA=u.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`,qA=u.div`
  flex: 6;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
`,GA=u.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`,KA=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
`,JA=()=>{const e=tt(),[t,n]=k.useState(null),r=i=>{var s;const o=(s=i.target.files)==null?void 0:s[0];if(o){const l=new FileReader;l.onload=()=>{n(l.result)},l.readAsDataURL(o)}};return a.jsxs(oI,{children:[a.jsx(rI,{children:"Image"}),a.jsxs(iI,{children:[a.jsxs(nI,{children:["프로필 사진을",a.jsx("br",{}),"추가해주세요"]}),a.jsxs(YA,{children:[a.jsx(XA,{htmlFor:"file-input",children:a.jsx("img",{src:t||"/images/origin.png",alt:"Profile Preview",width:217,height:217})}),a.jsx("input",{type:"file",id:"file-input",accept:"image/*",onChange:r,style:{display:"none"}}),"사진 추가하기"]}),a.jsx(tI,{onClick:()=>{e("/logincomplete")},children:"Next"}),a.jsx(ZA,{children:a.jsx(eI,{onClick:()=>{e("/logincomplete")},children:"건너뛰기"})})]})]})},XA=u.label`
  cursor: pointer;
`,YA=u.div`
  display: inline-flex;
  justify-content: center;
  width: calc(100% - 10px);
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #858282;
`,ZA=u.div`
  display: inline-flex;
  justify-content: center;
  width: calc(100% - 20px);
`,eI=u.div`
  color: #858282;
  font-size: 12px;
  margin-top: 30px;
`,tI=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  cursor: pointer;
`,nI=u.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`,rI=u.div`
  flex: 6;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
`,iI=u.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`,oI=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
`,sI=()=>{const e=tt();return a.jsxs(fI,{children:[a.jsx(dI,{children:"Image"}),a.jsxs(pI,{children:[a.jsx(uI,{children:"회원가입 완료!"}),a.jsx(lI,{children:a.jsx("img",{src:"/images/check.png",alt:"check",width:120,height:120})}),a.jsxs(aI,{children:[a.jsx(um,{children:"굿바이어스에 오신것을 환영합니다."}),a.jsx(um,{children:"공동구매를 시작해보세요."})]}),a.jsx(cI,{onClick:()=>{e("/")},children:"메인으로 가기"})]})]})},um=u.div`
  color: #302f2f;
`,aI=u.div`
  margin-top: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 20px);
  flex-direction: column;
  gap: 10px;
`,lI=u.div`
  display: inline-flex;
  justify-content: center;
  width: calc(100% - 10px);
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #858282;
  margin-top: 50px;
`,cI=u.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  cursor: pointer;
`,uI=u.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`,dI=u.div`
  flex: 6;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
`,pI=u.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`,fI=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
`,hI=async(e,t)=>{try{const n=`goodbuyUs/orders/${e}/payment`,{data:r}=await fr.post(n,t);return r.data.paymentStatus}catch{throw new Error("결제에 실패하였습니다.")}},mI=()=>{const{id:e}=xs();if(!e)return a.jsx("p",{children:"상품 번호가 유실되었습니다."});const t=Number(e),n=Gr.find(m=>m.id===t);if(!n)return a.jsx("p",{children:"해당 상품을 찾을 수 없습니다."});const r=tt(),[i,o]=k.useState(""),[s,l]=k.useState(""),[c,d]=k.useState(""),[f,p]=k.useState(""),[g,w]=k.useState(""),v={productName:n.name,url:n.url,price:n.discountPrice,quantity:1,payMethod:g,deliveryRequestDTO:{name:i,address:{street:s,detail:c},needed:f}},y=m=>{w(m.target.value)},C=async()=>{try{await hI(n.id,v)=="success"&&r("/payment-success")}catch(m){alert(`결제에 실패하였습니다 ${m}`)}};return a.jsx(a.Fragment,{children:a.jsxs(gI,{children:[a.jsxs($c,{children:[a.jsx(Bc,{children:"주문 상품 정보"}),a.jsxs(Fc,{children:[a.jsxs(nd,{children:[a.jsx(yI,{children:n.name}),a.jsxs(vI,{children:["₩",n.discountPrice.toLocaleString()]})]}),a.jsx(nd,{children:a.jsx(jI,{children:"수량: 1개"})}),a.jsxs(xI,{children:[a.jsx("span",{children:"합계:"}),a.jsxs(wI,{children:["₩",n.discountPrice.toLocaleString()]})]})]})]}),a.jsxs($c,{children:[a.jsx(Bc,{children:"배송 정보 확인"}),a.jsxs(Fc,{children:[a.jsx(Uc,{children:a.jsxs(Wc,{children:["수령인",a.jsx(ta,{children:a.jsx(jp,{type:"text",placeholder:"이름 입력",value:i,onChange:m=>o(m.target.value)})})]})}),a.jsxs(Uc,{children:[a.jsx(Wc,{children:"배송지"}),a.jsx(ta,{children:a.jsx(CI,{type:"text",placeholder:"기본 주소를 입력해주세요",value:s,onChange:m=>l(m.target.value)})}),a.jsx(ta,{children:a.jsx(SI,{type:"text",placeholder:"상세 주소를 입력해주세요",value:c,onChange:m=>d(m.target.value)})})]}),a.jsx(Uc,{children:a.jsxs(Wc,{children:["배송 시 요청사항",a.jsx(ta,{children:a.jsx(bI,{rows:2,placeholder:"요청사항 입력",value:f,onChange:m=>p(m.target.value)})})]})})]})]}),a.jsxs($c,{children:[a.jsx(Bc,{children:"결제 정보 확인"}),a.jsx(Fc,{children:a.jsx(kI,{children:a.jsxs(PI,{children:[a.jsx(EI,{type:"radio",name:"payment-method",value:"card",onChange:y}),a.jsx(AI,{children:"카드 결제"})]})})})]}),a.jsxs(II,{children:[a.jsx(TI,{onClick:()=>{C()},children:"결제하기"}),a.jsx(RI,{to:`/products/${n.id}`,children:"뒤로 가기"})]})]})})},gI=u.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
`,$c=u.div`
  margin-bottom: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`,Fc=u.div`
  padding: 20px;
`,Bc=u.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  margin: 0;
`,nd=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,xI=u(nd)`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  font-weight: 600;
  color: #1e293b;
`,yI=u.span`
  font-weight: 500;
  color: #1e293b;
`,vI=u.span`
  color: #1e293b;
  font-weight: 500;
`,wI=u.span`
  color: #2563eb;
  font-weight: 600;
  font-size: 1.125rem;
`,jI=u.span`
  color: #64748b;
  font-size: 0.875rem;
`,Uc=u.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`,Wc=u.label`
  display: block;
  color: #475569;
  font-size: 0.875rem;
  margin-bottom: 4px;
`,jp=u.input`
  width: 100%;
  padding: 10px 12px;
  margin-top: 4px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`,ta=u.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`,CI=u(jp)`
  flex-grow: 1;
  cursor: pointer;
`,SI=u(jp)`
  margin-top: 8px;
`,bI=u.textarea`
  width: 100%;
  padding: 10px 12px;
  margin-top: 4px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`,kI=u.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,PI=u.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`,EI=u.input`
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;

  &:checked {
    accent-color: #2563eb;
  }
`,AI=u.span`
  margin-left: 8px;
  color: #1e293b;
  font-size: 0.875rem;
`,II=u.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`,LI=u.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
`,RI=u(hn)`
  text-decoration: none; /* 링크의 기본 밑줄 제거 */
  display: flex; /* 버튼 스타일 유지 */
  justify-content: center;
  align-items: center;

  background-color: white;
  border: 1px solid #e2e8f0;
  color: #475569;
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #f8fafc;
  }
`,TI=u(LI)`
  background-color: #2563eb;
  border: none;
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #1d4ed8;
  }
`,DI=()=>{const{id:e}=xs();if(!e)return a.jsx("p",{children:"상품 번호가 유실되었습니다."});const t=Number(e),n=Gr.find(r=>r.id===t);return n?a.jsx(a.Fragment,{children:a.jsxs(NI,{children:[a.jsxs(OI,{children:[a.jsx(zI,{children:"결제 완료"}),a.jsx(_I,{children:"주문해주셔서 감사합니다!"}),a.jsxs(MI,{children:[a.jsxs(dm,{children:[a.jsx(pm,{children:"상품명"}),a.jsx(fm,{children:n==null?void 0:n.name})]}),a.jsxs(dm,{children:[a.jsx(pm,{children:"결제 금액"}),a.jsxs(fm,{children:["₩",n==null?void 0:n.discountPrice.toLocaleString()]})]})]})]}),a.jsxs($I,{children:[a.jsx(FI,{to:`/orders/${n==null?void 0:n.id}`,children:"주문 내역 보기"}),a.jsx(BI,{to:"/",children:"메인으로 돌아가기"})]})]})}):a.jsx("p",{children:"해당 상품을 찾을 수 없습니다."})},NI=u.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
`,OI=u.div`
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 32px 20px;
  text-align: center;
  margin-bottom: 24px;
`,zI=u.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
`,_I=u.p`
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 24px;
`,MI=u.div`
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
`,dm=u.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,pm=u.span`
  color: #64748b;
  font-size: 0.875rem;
`,fm=u.span`
  color: #1e293b;
  font-weight: 500;
`,$I=u.div`
  display: flex;
  gap: 12px;
  width: 100%;
`,w1=u(hn)`
  flex: 1;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
`,FI=u(w1)`
  background-color: #2563eb;
  border: none;
  color: white;

  &:hover {
    background-color: #1d4ed8;
  }
`,BI=u(w1)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #475569;

  &:hover {
    background-color: #f8fafc;
  }
`,UI=()=>{const{pathname:e}=Tn();return k.useEffect(()=>{window.scrollTo(0,0)},[e]),null},WI=()=>{const e=tt(),{postId:t}=xs(),[n,r]=k.useState(null),[i,o]=k.useState(""),[s,l]=k.useState(""),[c,d]=k.useState(""),[f,p]=k.useState(!1),[g,w]=k.useState("마감 기한  "),[v,y]=k.useState(""),[C,m]=k.useState(""),[h,x]=k.useState([]),[b,E]=k.useState(-1),[j,I]=k.useState(""),[R,N]=k.useState(!1);k.useEffect(()=>{if(!t){alert("유효하지 않은 접근입니다."),e("/community");return}(async()=>{try{const q=mp.find(pe=>pe.postId===t);if(q)r(q),y(q.title),m(q.content),x(q.images||[]),o(q.category),l(q.requiredQuantity.toString()),d(q.totalPrice.toString()),I(q.url),w(M(q.createdAt,q.closeAt));else throw new Error("게시물이 존재하지 않습니다.")}catch(q){console.error("게시글 불러오기 실패:",q),alert("게시글 정보를 불러오는 데 실패했습니다."),e("/community")}})()},[t,e]);const M=(F,q)=>{const pe=new Date(F),Je=new Date(q);return`${Math.ceil((Je.getTime()-pe.getTime())/(1e3*60*60*24))}일`},ee=()=>{p(!f)},le=F=>{if(w(F),n){const q=new Date(n.createdAt),pe=parseInt(F.replace(/[^0-9]/g,""),10),Je=new Date(q);Je.setDate(q.getDate()+pe),r({...n,closeAt:Je.toISOString()})}p(!1)},he=async()=>{if(!v||!s||!c||g==="마감 기한"||h.length===0||!j||!C){alert("모든 필수 정보를 입력하세요.");return}if(!ye(j)){N(!0);return}if(!n){alert("게시글 정보를 로드하는 데 실패했습니다.");return}const F=parseInt(c.replace(/,/g,""),10),q=parseInt(s,10),pe={...n,title:v,content:C,images:h,category:i,closeAt:n.closeAt,requiredQuantity:q,totalPrice:F,unitPrice:Math.floor(F/q),url:j,updatedAt:new Date().toISOString()};try{await Xb(t,pe),alert("게시글이 성공적으로 수정되었습니다."),e(`/community/posts/${t}`)}catch(Je){console.error("게시글 수정 중 오류 발생:",Je),alert("게시글 수정에 실패했습니다. 다시 시도해주세요.")}},me=F=>{const q=F.target.value.replace(/[^0-9]/g,""),pe=Number(q);q===""||pe<=0?l(""):l(q)},Ge=F=>{const q=F.target.value.replace(/[^0-9]/g,""),pe=Number(q);q===""||pe<=0?d(""):d(_(q))},Ke=()=>{e(`/community/posts/${t}`)},_=F=>{const q=F.replace(/\D/g,"");return new Intl.NumberFormat().format(Number(q))},T=c&&s?_(String(Math.floor(parseInt(c.replace(/,/g,""),10)/parseInt(s,10)))):"자동 계산",$=F=>{if(F.target.files){const q=Array.from(F.target.files).map(pe=>URL.createObjectURL(pe));x(pe=>[...pe,...q]),E(h.length)}},H=()=>{b>=0&&x(F=>{const q=F.filter((pe,Je)=>Je!==b);if(q.length>0){const pe=b>=q.length?b-1:b;E(pe)}else E(-1);return q})},Z=()=>{b<h.length-1?E(F=>F+1):b===h.length-1&&E(-1)},ne=()=>{E(b===-1?h.length-1:F=>Math.max(F-1,0))},Ue=F=>{E(F)},ye=F=>!!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(F),J=F=>{I(F.target.value),N(!ye(F.target.value))},X=async()=>{if(!n){alert("삭제할 게시글이 존재하지 않습니다.");return}if(window.confirm("정말 이 게시글을 삭제하시겠습니까?"))try{await Jb(t),alert("게시글이 성공적으로 삭제되었습니다."),e(`/community/posts?category=${i}`)}catch(q){console.error("게시글 삭제 중 오류 발생:",q),alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.")}};return a.jsxs("div",{children:[a.jsx(QI,{children:a.jsxs(HI,{children:[a.jsx(VI,{children:"공구 모집 및 진행"}),a.jsxs(qI,{children:[a.jsxs(GI,{children:[a.jsxs(KI,{children:[a.jsxs(JI,{children:[a.jsx(eL,{children:h.length>0&&(b>0||b===-1)&&a.jsx(nL,{onClick:ne,children:a.jsx(up,{size:20})})}),b===-1?a.jsxs(YI,{children:[a.jsx(fp,{size:30}),"이미지 추가",a.jsx("input",{type:"file",multiple:!0,accept:"image/*",onChange:$})]}):a.jsxs(XI,{children:[a.jsx("img",{src:h[b],alt:"이미지 미리보기"}),a.jsx(ZI,{onClick:H,children:a.jsx(pp,{size:30})})]}),a.jsx(tL,{children:h.length>0&&b!==-1&&a.jsx(rL,{onClick:Z,children:a.jsx(dp,{size:20})})})]}),a.jsx(iL,{children:h.length>0&&a.jsx(oL,{children:h.map((F,q)=>a.jsx("span",{className:b===q?"active":"",onClick:()=>Ue(q)},q))})}),a.jsxs(sL,{children:[a.jsxs(aL,{children:[a.jsx(li,{htmlFor:"urlInput",children:"URL 주소"}),a.jsx(lL,{id:"urlInput",type:"text",placeholder:"상품 관련 URL 주소를 입력해주세요.",value:j,onChange:J,isError:R,spellCheck:!1})]}),R&&a.jsx(cL,{children:"올바른 URL을 입력해주세요."})]})]}),a.jsxs(uL,{children:[a.jsxs(dL,{children:[a.jsxs(Co,{children:[a.jsx(li,{children:"제목"}),a.jsx(pL,{placeholder:"제목을 입력해주세요.",value:v,onChange:F=>y(F.target.value),spellCheck:!1})]}),a.jsxs(fL,{children:[a.jsx(hL,{children:"카테고리 선택"}),a.jsx(mL,{selectedCategory:i,onCategoryChange:F=>o(F)})]})]}),a.jsxs(gL,{children:[a.jsxs(Co,{children:[a.jsx(li,{children:"참여 필요 수량 선택"}),a.jsx(Qc,{type:"text",placeholder:"수량 입력",value:s,onChange:me})]}),a.jsxs(Co,{children:[a.jsx(li,{children:"모집 마감 기한 설정"}),a.jsxs(xL,{children:[a.jsxs(yL,{onClick:ee,children:[g,a.jsx(qx,{})]}),f&&a.jsx(vL,{children:Array.from({length:7},(F,q)=>a.jsxs(wL,{onClick:()=>le(`${q+1}일  `),isSelected:g===`${q+1}일  `,children:[q+1,"일"]},q))})]})]}),a.jsxs(jL,{children:[a.jsxs(Co,{children:[a.jsx(li,{children:"총 가격 설정"}),a.jsx(Qc,{type:"text",placeholder:"총 가격 입력",value:c,onChange:Ge})," 원"]}),a.jsxs(Co,{children:[a.jsx(li,{children:"개당 가격"}),a.jsx(Qc,{disabled:!0,value:T})," 원"]})]})]})]})]}),a.jsx(CL,{children:a.jsx(SL,{placeholder:"내용을 입력해주세요.",value:C,onChange:F=>m(F.target.value),spellCheck:!1})}),a.jsxs(bL,{children:[a.jsx(Hc,{onClick:he,children:"확인"}),a.jsx(Hc,{onClick:Ke,children:"취소"}),a.jsx(Hc,{onClick:X,children:"삭제"})]})]})]})}),a.jsx(js,{})]})},QI=u.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`,HI=u.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`,VI=u.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: left;
`,qI=u.div`
  display: flex;
  flex-direction: column; /* 내부 요소를 세로로 정렬 */
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,GI=u.div`
  display: flex; /* 가로 정렬 */
  flex-direction: row; /* 기본값이므로 명시적으로 추가 */
  align-items: stretch; /* 양쪽 요소의 높이를 동일하게 */
  justify-content: center; /* 양쪽 여백 균등 배치 */
  gap: 20px; /* 두 컨테이너 사이 간격 */
  margin-bottom: 20px; /* 아래 요소와의 간격 */
`,KI=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 495px; /* 고정된 높이 설정 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 11px;
  position: relative;
  box-sizing: border-box; /* 패딩과 보더 포함한 크기 계산 */
`,JI=u.div`
  display: flex;
  justify-content: space-between; /* 좌우 버튼 공간 확보 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  height: 320px; /* 기준 높이 */
  position: relative; /* 자식 요소 위치 기준 */
  overflow: hidden; /* 높이를 벗어난 콘텐츠 숨김 */
`,XI=u.div`
  flex: 1; /* 이미지 영역이 버튼 사이에 위치 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden; /* 콘텐츠가 영역을 벗어나지 않도록 */

  img {
    max-width: 100%; /* 부모 너비를 넘지 않도록 */
    max-height: 100%; /* 부모 높이를 넘지 않도록 */
    object-fit: contain; /* 비율을 유지하며 부모 크기 안에 맞춤 */
  }
`,YI=u.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
  border-radius: 10px;
  width: 400px; /* img의 크기와 동일하게 설정 */
  height: 100%; /* img의 높이와 동일하게 설정 */
  background-color: #ececec; /* 요구된 배경색 추가 */

  input {
    display: none;
  }
`,ZI=u.button`
  position: absolute;
  top: 0px;
  right: 45px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 1;
`,eL=u.div`
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
`,tL=u.div`
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
`,nL=u.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`,rL=u.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`,iL=u.div`
  width: 100%;
  height: 54px; /* 높이 설정 */
  display: flex; /* 플렉스 박스로 변경 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
`,oL=u.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
  }

  span.active {
    background: #000;
  }
`,sL=u.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 세로로 가운데 정렬 */
  width: 100%;
`,aL=u.div`
  margin-left: 20px;
  display: flex;
  align-items: center; /* Label과 Url을 같은 높이에 배치 */
  gap: 10px; /* Label과 Url 사이 간격 */
  padding: 10px;
  border: none;
`,lL=u.input`
  width: 285px;
  flex: 1;
  padding: 10px;
  background-color: #ececec;
  border: 1px solid ${({isError:e})=>e?"red":"#ccc"};
  border-radius: 5px;
`,cL=u.span`
  margin-left: 125px;
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`,uL=u.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: space-between; /* 위아래 요소 간격 균등 */
  width: 490px;
  height: 495px; /* ImageUploadContainer와 동일한 고정 높이 */
  flex-grow: 1; /* 가로 공간을 균등 분배 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`,dL=u.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 50px; /* 컴포넌트 간 간격 */
  width: 100%;
`,Co=u.div`
  display: flex;
  flex-direction: row; /* 가로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px; /* 컴포넌트 간 간격 */
  width: 100%;
`,li=u.label`
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0; /* 라벨 크기를 고정 */
  text-align: left; /* 라벨 텍스트 왼쪽 정렬 */
`,pL=u.input`
  width: 80%;
  padding: 10px;
  background-color: #ececec;
  border: 1px solid #ccc;
  border-radius: 5px;
`,fL=u.div`
  display: flex;
  flex-direction: column; /* 라벨과 카테고리를 세로로 배치 */
`,hL=u.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px; /* 라벨과 카테고리 사이 간격 */
`,mL=u(hp)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 0;

  div {
    padding: 12px !important; /* 강제로 적용 */
    flex: 1 1 calc(25% - 8px);
    box-sizing: border-box;

    &:hover {
      background-color: #f0f0f0 !important; /* 호버 스타일도 강제 */
    }

    &.active {
      font-weight: bold !important; /* 활성 상태 스타일 강제 */
      border-bottom: 2px solid black !important;
    }
  }
`,gL=u.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 20px; /* 컴포넌트 간 간격 */
  width: 100%;
`,Qc=u.input`
  width: 100px;
  padding: 10px 0px;
  text-align: center;
  background-color: #ececec;
  border: 1px solid #ccc;
  border-radius: 5px;
`,xL=u.div`
  position: relative;
`,yL=u.button`
  width: 120px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`,vL=u.div`
  position: absolute;
  width: 120px;
  top: 100%;
  left: 0;
  right: 0;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  z-index: 1000;
  box-sizing: border-box;
`,wL=u.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background: ${({isSelected:e})=>e?"#f0f0f0":"#fff"};
  font-weight: ${({isSelected:e})=>e?"bold":"normal"};

  &:hover {
    background: #eaeaea;
  }
`,jL=u.div`
  display: flex;
  flex-direction: row; /* 가로 배치 */
  gap: 20px; /* 두 요소 간 간격 */
  width: 100%; /* 부모 컨테이너에 맞게 확장 */
  align-items: center; /* 세로 중앙 정렬 */
`,CL=u.div`
  width: 100%; /* Wrapper 크기는 기존 유지 */
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px; /* 내부 여백 */
  margin-bottom: 20px;
  box-sizing: border-box;
`,SL=u.textarea`
  width: 100%;
  height: 460px; /* 고정된 높이 */
  background-color: #ececec;
  border: none; /* 테두리 제거 */
  border-radius: 10px;
  padding: 20px;
  outline: none; /* 포커스 시 외곽선 제거 */
  resize: none; /* 크기 조절 비활성화 */
  font-size: 1rem; /* 텍스트 크기 */
  line-height: 1.5;
  color: #333; /* 텍스트 색상 */
  box-sizing: border-box;
`,bL=u.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`,Hc=u.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`,kL=_2([{path:"/",element:a.jsxs(a.Fragment,{children:[a.jsx(Qk,{}),a.jsx(UI,{})]}),errorElement:a.jsx(Y2,{}),children:[{path:"/",element:a.jsx(QC,{})},{path:"/products",element:a.jsx(e3,{})},{path:"/products/:id",element:a.jsx(i3,{})},{path:"/products/payment/:id",element:a.jsx(mI,{})},{path:"/products/payment-success/:id",element:a.jsx(DI,{})},{path:"/community",element:a.jsx(mS,{})},{path:"/community/create",element:a.jsx(Yb,{})},{path:"/community/posts/:postId",element:a.jsx(N4,{})},{path:"/community/posts/:postId/edit",element:a.jsx(WI,{})},{path:"/mypage",children:[{path:"setting",element:a.jsx(vE,{})},{path:"orderlist",element:a.jsx($5,{})},{path:"wishlist",element:a.jsx(B5,{})},{path:"location",element:a.jsx(rA,{})},{path:"refund",element:a.jsx(lA,{})},{path:"notification",element:a.jsx(CA,{})},{path:"myposts",element:a.jsx(LA,{})},{path:"chatlist",element:a.jsx(UA,{})}]}]},{path:"/signin",element:a.jsx(qk,{})},{path:"/signup",element:a.jsx(tP,{})},{path:"/findpassword",element:a.jsx(aP,{})},{path:"/resetpassword",element:a.jsx(xP,{})},{path:"/termsandservice",element:a.jsx(EP,{})},{path:"/setnickname",element:a.jsx(WA,{})},{path:"/setprofile",element:a.jsx(JA,{})},{path:"/logincomplete",element:a.jsx(sI,{})},{path:"*",element:a.jsx(Z2,{})}]);var Nl=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},Ol=typeof window>"u"||"Deno"in globalThis;function Vt(){}function PL(e,t){return typeof e=="function"?e(t):e}function EL(e){return typeof e=="number"&&e>=0&&e!==1/0}function AL(e,t){return Math.max(e+(t||0)-Date.now(),0)}function hm(e,t){return typeof e=="function"?e(t):e}function IL(e,t){return typeof e=="function"?e(t):e}function mm(e,t){const{type:n="all",exact:r,fetchStatus:i,predicate:o,queryKey:s,stale:l}=e;if(s){if(r){if(t.queryHash!==Cp(s,t.options))return!1}else if(!as(t.queryKey,s))return!1}if(n!=="all"){const c=t.isActive();if(n==="active"&&!c||n==="inactive"&&c)return!1}return!(typeof l=="boolean"&&t.isStale()!==l||i&&i!==t.state.fetchStatus||o&&!o(t))}function gm(e,t){const{exact:n,status:r,predicate:i,mutationKey:o}=e;if(o){if(!t.options.mutationKey)return!1;if(n){if(ss(t.options.mutationKey)!==ss(o))return!1}else if(!as(t.options.mutationKey,o))return!1}return!(r&&t.state.status!==r||i&&!i(t))}function Cp(e,t){return((t==null?void 0:t.queryKeyHashFn)||ss)(e)}function ss(e){return JSON.stringify(e,(t,n)=>rd(n)?Object.keys(n).sort().reduce((r,i)=>(r[i]=n[i],r),{}):n)}function as(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?!Object.keys(t).some(n=>!as(e[n],t[n])):!1}function j1(e,t){if(e===t)return e;const n=xm(e)&&xm(t);if(n||rd(e)&&rd(t)){const r=n?e:Object.keys(e),i=r.length,o=n?t:Object.keys(t),s=o.length,l=n?[]:{};let c=0;for(let d=0;d<s;d++){const f=n?d:o[d];(!n&&r.includes(f)||n)&&e[f]===void 0&&t[f]===void 0?(l[f]=void 0,c++):(l[f]=j1(e[f],t[f]),l[f]===e[f]&&e[f]!==void 0&&c++)}return i===s&&c===i?e:l}return t}function xm(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function rd(e){if(!ym(e))return!1;const t=e.constructor;if(t===void 0)return!0;const n=t.prototype;return!(!ym(n)||!n.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function ym(e){return Object.prototype.toString.call(e)==="[object Object]"}function LL(e){return new Promise(t=>{setTimeout(t,e)})}function RL(e,t,n){return typeof n.structuralSharing=="function"?n.structuralSharing(e,t):n.structuralSharing!==!1?j1(e,t):t}function TL(e,t,n=0){const r=[...e,t];return n&&r.length>n?r.slice(1):r}function DL(e,t,n=0){const r=[t,...e];return n&&r.length>n?r.slice(0,-1):r}var Sp=Symbol();function C1(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===Sp?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}var Dr,Hn,Ai,jm,NL=(jm=class extends Nl{constructor(){super();ge(this,Dr);ge(this,Hn);ge(this,Ai);re(this,Ai,t=>{if(!Ol&&window.addEventListener){const n=()=>t();return window.addEventListener("visibilitychange",n,!1),()=>{window.removeEventListener("visibilitychange",n)}}})}onSubscribe(){D(this,Hn)||this.setEventListener(D(this,Ai))}onUnsubscribe(){var t;this.hasListeners()||((t=D(this,Hn))==null||t.call(this),re(this,Hn,void 0))}setEventListener(t){var n;re(this,Ai,t),(n=D(this,Hn))==null||n.call(this),re(this,Hn,t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(t){D(this,Dr)!==t&&(re(this,Dr,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(n=>{n(t)})}isFocused(){var t;return typeof D(this,Dr)=="boolean"?D(this,Dr):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},Dr=new WeakMap,Hn=new WeakMap,Ai=new WeakMap,jm),S1=new NL,Ii,Vn,Li,Cm,OL=(Cm=class extends Nl{constructor(){super();ge(this,Ii,!0);ge(this,Vn);ge(this,Li);re(this,Li,t=>{if(!Ol&&window.addEventListener){const n=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",n,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",r)}}})}onSubscribe(){D(this,Vn)||this.setEventListener(D(this,Li))}onUnsubscribe(){var t;this.hasListeners()||((t=D(this,Vn))==null||t.call(this),re(this,Vn,void 0))}setEventListener(t){var n;re(this,Li,t),(n=D(this,Vn))==null||n.call(this),re(this,Vn,t(this.setOnline.bind(this)))}setOnline(t){D(this,Ii)!==t&&(re(this,Ii,t),this.listeners.forEach(r=>{r(t)}))}isOnline(){return D(this,Ii)}},Ii=new WeakMap,Vn=new WeakMap,Li=new WeakMap,Cm),ol=new OL;function zL(){let e,t;const n=new Promise((i,o)=>{e=i,t=o});n.status="pending",n.catch(()=>{});function r(i){Object.assign(n,i),delete n.resolve,delete n.reject}return n.resolve=i=>{r({status:"fulfilled",value:i}),e(i)},n.reject=i=>{r({status:"rejected",reason:i}),t(i)},n}function _L(e){return Math.min(1e3*2**e,3e4)}function b1(e){return(e??"online")==="online"?ol.isOnline():!0}var k1=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function Vc(e){return e instanceof k1}function P1(e){let t=!1,n=0,r=!1,i;const o=zL(),s=y=>{var C;r||(g(new k1(y)),(C=e.abort)==null||C.call(e))},l=()=>{t=!0},c=()=>{t=!1},d=()=>S1.isFocused()&&(e.networkMode==="always"||ol.isOnline())&&e.canRun(),f=()=>b1(e.networkMode)&&e.canRun(),p=y=>{var C;r||(r=!0,(C=e.onSuccess)==null||C.call(e,y),i==null||i(),o.resolve(y))},g=y=>{var C;r||(r=!0,(C=e.onError)==null||C.call(e,y),i==null||i(),o.reject(y))},w=()=>new Promise(y=>{var C;i=m=>{(r||d())&&y(m)},(C=e.onPause)==null||C.call(e)}).then(()=>{var y;i=void 0,r||(y=e.onContinue)==null||y.call(e)}),v=()=>{if(r)return;let y;const C=n===0?e.initialPromise:void 0;try{y=C??e.fn()}catch(m){y=Promise.reject(m)}Promise.resolve(y).then(p).catch(m=>{var j;if(r)return;const h=e.retry??(Ol?0:3),x=e.retryDelay??_L,b=typeof x=="function"?x(n,m):x,E=h===!0||typeof h=="number"&&n<h||typeof h=="function"&&h(n,m);if(t||!E){g(m);return}n++,(j=e.onFail)==null||j.call(e,n,m),LL(b).then(()=>d()?void 0:w()).then(()=>{t?g(m):v()})})};return{promise:o,cancel:s,continue:()=>(i==null||i(),o),cancelRetry:l,continueRetry:c,canStart:f,start:()=>(f()?v():w().then(v),o)}}function ML(){let e=[],t=0,n=l=>{l()},r=l=>{l()},i=l=>setTimeout(l,0);const o=l=>{t?e.push(l):i(()=>{n(l)})},s=()=>{const l=e;e=[],l.length&&i(()=>{r(()=>{l.forEach(c=>{n(c)})})})};return{batch:l=>{let c;t++;try{c=l()}finally{t--,t||s()}return c},batchCalls:l=>(...c)=>{o(()=>{l(...c)})},schedule:o,setNotifyFunction:l=>{n=l},setBatchNotifyFunction:l=>{r=l},setScheduler:l=>{i=l}}}var pt=ML(),Nr,Sm,E1=(Sm=class{constructor(){ge(this,Nr)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),EL(this.gcTime)&&re(this,Nr,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(Ol?1/0:5*60*1e3))}clearGcTimeout(){D(this,Nr)&&(clearTimeout(D(this,Nr)),re(this,Nr,void 0))}},Nr=new WeakMap,Sm),Ri,Ti,zt,ot,ls,Or,qt,yn,bm,$L=(bm=class extends E1{constructor(t){super();ge(this,qt);ge(this,Ri);ge(this,Ti);ge(this,zt);ge(this,ot);ge(this,ls);ge(this,Or);re(this,Or,!1),re(this,ls,t.defaultOptions),this.setOptions(t.options),this.observers=[],re(this,zt,t.cache),this.queryKey=t.queryKey,this.queryHash=t.queryHash,re(this,Ri,BL(this.options)),this.state=t.state??D(this,Ri),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=D(this,ot))==null?void 0:t.promise}setOptions(t){this.options={...D(this,ls),...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&D(this,zt).remove(this)}setData(t,n){const r=RL(this.state.data,t,this.options);return nt(this,qt,yn).call(this,{data:r,type:"success",dataUpdatedAt:n==null?void 0:n.updatedAt,manual:n==null?void 0:n.manual}),r}setState(t,n){nt(this,qt,yn).call(this,{type:"setState",state:t,setStateOptions:n})}cancel(t){var r,i;const n=(r=D(this,ot))==null?void 0:r.promise;return(i=D(this,ot))==null||i.cancel(t),n?n.then(Vt).catch(Vt):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(D(this,Ri))}isActive(){return this.observers.some(t=>IL(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Sp||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return this.state.isInvalidated?!0:this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0}isStaleByTime(t=0){return this.state.isInvalidated||this.state.data===void 0||!AL(this.state.dataUpdatedAt,t)}onFocus(){var n;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(n=D(this,ot))==null||n.continue()}onOnline(){var n;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(n=D(this,ot))==null||n.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),D(this,zt).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(n=>n!==t),this.observers.length||(D(this,ot)&&(D(this,Or)?D(this,ot).cancel({revert:!0}):D(this,ot).cancelRetry()),this.scheduleGc()),D(this,zt).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||nt(this,qt,yn).call(this,{type:"invalidate"})}fetch(t,n){var c,d,f;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(n!=null&&n.cancelRefetch))this.cancel({silent:!0});else if(D(this,ot))return D(this,ot).continueRetry(),D(this,ot).promise}if(t&&this.setOptions(t),!this.options.queryFn){const p=this.observers.find(g=>g.options.queryFn);p&&this.setOptions(p.options)}const r=new AbortController,i=p=>{Object.defineProperty(p,"signal",{enumerable:!0,get:()=>(re(this,Or,!0),r.signal)})},o=()=>{const p=C1(this.options,n),g={queryKey:this.queryKey,meta:this.meta};return i(g),re(this,Or,!1),this.options.persister?this.options.persister(p,g,this):p(g)},s={fetchOptions:n,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:o};i(s),(c=this.options.behavior)==null||c.onFetch(s,this),re(this,Ti,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((d=s.fetchOptions)==null?void 0:d.meta))&&nt(this,qt,yn).call(this,{type:"fetch",meta:(f=s.fetchOptions)==null?void 0:f.meta});const l=p=>{var g,w,v,y;Vc(p)&&p.silent||nt(this,qt,yn).call(this,{type:"error",error:p}),Vc(p)||((w=(g=D(this,zt).config).onError)==null||w.call(g,p,this),(y=(v=D(this,zt).config).onSettled)==null||y.call(v,this.state.data,p,this)),this.scheduleGc()};return re(this,ot,P1({initialPromise:n==null?void 0:n.initialPromise,fn:s.fetchFn,abort:r.abort.bind(r),onSuccess:p=>{var g,w,v,y;if(p===void 0){l(new Error(`${this.queryHash} data is undefined`));return}try{this.setData(p)}catch(C){l(C);return}(w=(g=D(this,zt).config).onSuccess)==null||w.call(g,p,this),(y=(v=D(this,zt).config).onSettled)==null||y.call(v,p,this.state.error,this),this.scheduleGc()},onError:l,onFail:(p,g)=>{nt(this,qt,yn).call(this,{type:"failed",failureCount:p,error:g})},onPause:()=>{nt(this,qt,yn).call(this,{type:"pause"})},onContinue:()=>{nt(this,qt,yn).call(this,{type:"continue"})},retry:s.options.retry,retryDelay:s.options.retryDelay,networkMode:s.options.networkMode,canRun:()=>!0})),D(this,ot).start()}},Ri=new WeakMap,Ti=new WeakMap,zt=new WeakMap,ot=new WeakMap,ls=new WeakMap,Or=new WeakMap,qt=new WeakSet,yn=function(t){const n=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...FL(r.data,this.options),fetchMeta:t.meta??null};case"success":return{...r,data:t.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const i=t.error;return Vc(i)&&i.revert&&D(this,Ti)?{...D(this,Ti),fetchStatus:"idle"}:{...r,error:i,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:i,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=n(this.state),pt.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),D(this,zt).notify({query:this,type:"updated",action:t})})},bm);function FL(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:b1(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function BL(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,n=t!==void 0,r=n?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:n?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}var an,km,UL=(km=class extends Nl{constructor(t={}){super();ge(this,an);this.config=t,re(this,an,new Map)}build(t,n,r){const i=n.queryKey,o=n.queryHash??Cp(i,n);let s=this.get(o);return s||(s=new $L({cache:this,queryKey:i,queryHash:o,options:t.defaultQueryOptions(n),state:r,defaultOptions:t.getQueryDefaults(i)}),this.add(s)),s}add(t){D(this,an).has(t.queryHash)||(D(this,an).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const n=D(this,an).get(t.queryHash);n&&(t.destroy(),n===t&&D(this,an).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){pt.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return D(this,an).get(t)}getAll(){return[...D(this,an).values()]}find(t){const n={exact:!0,...t};return this.getAll().find(r=>mm(n,r))}findAll(t={}){const n=this.getAll();return Object.keys(t).length>0?n.filter(r=>mm(t,r)):n}notify(t){pt.batch(()=>{this.listeners.forEach(n=>{n(t)})})}onFocus(){pt.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){pt.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},an=new WeakMap,km),ln,ut,zr,cn,Fn,Pm,WL=(Pm=class extends E1{constructor(t){super();ge(this,cn);ge(this,ln);ge(this,ut);ge(this,zr);this.mutationId=t.mutationId,re(this,ut,t.mutationCache),re(this,ln,[]),this.state=t.state||QL(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){D(this,ln).includes(t)||(D(this,ln).push(t),this.clearGcTimeout(),D(this,ut).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){re(this,ln,D(this,ln).filter(n=>n!==t)),this.scheduleGc(),D(this,ut).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){D(this,ln).length||(this.state.status==="pending"?this.scheduleGc():D(this,ut).remove(this))}continue(){var t;return((t=D(this,zr))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var i,o,s,l,c,d,f,p,g,w,v,y,C,m,h,x,b,E,j,I;re(this,zr,P1({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(R,N)=>{nt(this,cn,Fn).call(this,{type:"failed",failureCount:R,error:N})},onPause:()=>{nt(this,cn,Fn).call(this,{type:"pause"})},onContinue:()=>{nt(this,cn,Fn).call(this,{type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>D(this,ut).canRun(this)}));const n=this.state.status==="pending",r=!D(this,zr).canStart();try{if(!n){nt(this,cn,Fn).call(this,{type:"pending",variables:t,isPaused:r}),await((o=(i=D(this,ut).config).onMutate)==null?void 0:o.call(i,t,this));const N=await((l=(s=this.options).onMutate)==null?void 0:l.call(s,t));N!==this.state.context&&nt(this,cn,Fn).call(this,{type:"pending",context:N,variables:t,isPaused:r})}const R=await D(this,zr).start();return await((d=(c=D(this,ut).config).onSuccess)==null?void 0:d.call(c,R,t,this.state.context,this)),await((p=(f=this.options).onSuccess)==null?void 0:p.call(f,R,t,this.state.context)),await((w=(g=D(this,ut).config).onSettled)==null?void 0:w.call(g,R,null,this.state.variables,this.state.context,this)),await((y=(v=this.options).onSettled)==null?void 0:y.call(v,R,null,t,this.state.context)),nt(this,cn,Fn).call(this,{type:"success",data:R}),R}catch(R){try{throw await((m=(C=D(this,ut).config).onError)==null?void 0:m.call(C,R,t,this.state.context,this)),await((x=(h=this.options).onError)==null?void 0:x.call(h,R,t,this.state.context)),await((E=(b=D(this,ut).config).onSettled)==null?void 0:E.call(b,void 0,R,this.state.variables,this.state.context,this)),await((I=(j=this.options).onSettled)==null?void 0:I.call(j,void 0,R,t,this.state.context)),R}finally{nt(this,cn,Fn).call(this,{type:"error",error:R})}}finally{D(this,ut).runNext(this)}}},ln=new WeakMap,ut=new WeakMap,zr=new WeakMap,cn=new WeakSet,Fn=function(t){const n=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=n(this.state),pt.batch(()=>{D(this,ln).forEach(r=>{r.onMutationUpdate(t)}),D(this,ut).notify({mutation:this,type:"updated",action:t})})},Pm);function QL(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var Pt,cs,Em,HL=(Em=class extends Nl{constructor(t={}){super();ge(this,Pt);ge(this,cs);this.config=t,re(this,Pt,new Map),re(this,cs,Date.now())}build(t,n,r){const i=new WL({mutationCache:this,mutationId:++Ls(this,cs)._,options:t.defaultMutationOptions(n),state:r});return this.add(i),i}add(t){const n=na(t),r=D(this,Pt).get(n)??[];r.push(t),D(this,Pt).set(n,r),this.notify({type:"added",mutation:t})}remove(t){var r;const n=na(t);if(D(this,Pt).has(n)){const i=(r=D(this,Pt).get(n))==null?void 0:r.filter(o=>o!==t);i&&(i.length===0?D(this,Pt).delete(n):D(this,Pt).set(n,i))}this.notify({type:"removed",mutation:t})}canRun(t){var r;const n=(r=D(this,Pt).get(na(t)))==null?void 0:r.find(i=>i.state.status==="pending");return!n||n===t}runNext(t){var r;const n=(r=D(this,Pt).get(na(t)))==null?void 0:r.find(i=>i!==t&&i.state.isPaused);return(n==null?void 0:n.continue())??Promise.resolve()}clear(){pt.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}getAll(){return[...D(this,Pt).values()].flat()}find(t){const n={exact:!0,...t};return this.getAll().find(r=>gm(n,r))}findAll(t={}){return this.getAll().filter(n=>gm(t,n))}notify(t){pt.batch(()=>{this.listeners.forEach(n=>{n(t)})})}resumePausedMutations(){const t=this.getAll().filter(n=>n.state.isPaused);return pt.batch(()=>Promise.all(t.map(n=>n.continue().catch(Vt))))}},Pt=new WeakMap,cs=new WeakMap,Em);function na(e){var t;return((t=e.options.scope)==null?void 0:t.id)??String(e.mutationId)}function vm(e){return{onFetch:(t,n)=>{var f,p,g,w,v;const r=t.options,i=(g=(p=(f=t.fetchOptions)==null?void 0:f.meta)==null?void 0:p.fetchMore)==null?void 0:g.direction,o=((w=t.state.data)==null?void 0:w.pages)||[],s=((v=t.state.data)==null?void 0:v.pageParams)||[];let l={pages:[],pageParams:[]},c=0;const d=async()=>{let y=!1;const C=x=>{Object.defineProperty(x,"signal",{enumerable:!0,get:()=>(t.signal.aborted?y=!0:t.signal.addEventListener("abort",()=>{y=!0}),t.signal)})},m=C1(t.options,t.fetchOptions),h=async(x,b,E)=>{if(y)return Promise.reject();if(b==null&&x.pages.length)return Promise.resolve(x);const j={queryKey:t.queryKey,pageParam:b,direction:E?"backward":"forward",meta:t.options.meta};C(j);const I=await m(j),{maxPages:R}=t.options,N=E?DL:TL;return{pages:N(x.pages,I,R),pageParams:N(x.pageParams,b,R)}};if(i&&o.length){const x=i==="backward",b=x?VL:wm,E={pages:o,pageParams:s},j=b(r,E);l=await h(E,j,x)}else{const x=e??o.length;do{const b=c===0?s[0]??r.initialPageParam:wm(r,l);if(c>0&&b==null)break;l=await h(l,b),c++}while(c<x)}return l};t.options.persister?t.fetchFn=()=>{var y,C;return(C=(y=t.options).persister)==null?void 0:C.call(y,d,{queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},n)}:t.fetchFn=d}}}function wm(e,{pages:t,pageParams:n}){const r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,n[r],n):void 0}function VL(e,{pages:t,pageParams:n}){var r;return t.length>0?(r=e.getPreviousPageParam)==null?void 0:r.call(e,t[0],t,n[0],n):void 0}var Ne,qn,Gn,Di,Ni,Kn,Oi,zi,Am,qL=(Am=class{constructor(e={}){ge(this,Ne);ge(this,qn);ge(this,Gn);ge(this,Di);ge(this,Ni);ge(this,Kn);ge(this,Oi);ge(this,zi);re(this,Ne,e.queryCache||new UL),re(this,qn,e.mutationCache||new HL),re(this,Gn,e.defaultOptions||{}),re(this,Di,new Map),re(this,Ni,new Map),re(this,Kn,0)}mount(){Ls(this,Kn)._++,D(this,Kn)===1&&(re(this,Oi,S1.subscribe(async e=>{e&&(await this.resumePausedMutations(),D(this,Ne).onFocus())})),re(this,zi,ol.subscribe(async e=>{e&&(await this.resumePausedMutations(),D(this,Ne).onOnline())})))}unmount(){var e,t;Ls(this,Kn)._--,D(this,Kn)===0&&((e=D(this,Oi))==null||e.call(this),re(this,Oi,void 0),(t=D(this,zi))==null||t.call(this),re(this,zi,void 0))}isFetching(e){return D(this,Ne).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return D(this,qn).findAll({...e,status:"pending"}).length}getQueryData(e){var n;const t=this.defaultQueryOptions({queryKey:e});return(n=D(this,Ne).get(t.queryHash))==null?void 0:n.state.data}ensureQueryData(e){const t=this.getQueryData(e.queryKey);if(t===void 0)return this.fetchQuery(e);{const n=this.defaultQueryOptions(e),r=D(this,Ne).build(this,n);return e.revalidateIfStale&&r.isStaleByTime(hm(n.staleTime,r))&&this.prefetchQuery(n),Promise.resolve(t)}}getQueriesData(e){return D(this,Ne).findAll(e).map(({queryKey:t,state:n})=>{const r=n.data;return[t,r]})}setQueryData(e,t,n){const r=this.defaultQueryOptions({queryKey:e}),i=D(this,Ne).get(r.queryHash),o=i==null?void 0:i.state.data,s=PL(t,o);if(s!==void 0)return D(this,Ne).build(this,r).setData(s,{...n,manual:!0})}setQueriesData(e,t,n){return pt.batch(()=>D(this,Ne).findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,n)]))}getQueryState(e){var n;const t=this.defaultQueryOptions({queryKey:e});return(n=D(this,Ne).get(t.queryHash))==null?void 0:n.state}removeQueries(e){const t=D(this,Ne);pt.batch(()=>{t.findAll(e).forEach(n=>{t.remove(n)})})}resetQueries(e,t){const n=D(this,Ne),r={type:"active",...e};return pt.batch(()=>(n.findAll(e).forEach(i=>{i.reset()}),this.refetchQueries(r,t)))}cancelQueries(e={},t={}){const n={revert:!0,...t},r=pt.batch(()=>D(this,Ne).findAll(e).map(i=>i.cancel(n)));return Promise.all(r).then(Vt).catch(Vt)}invalidateQueries(e={},t={}){return pt.batch(()=>{if(D(this,Ne).findAll(e).forEach(r=>{r.invalidate()}),e.refetchType==="none")return Promise.resolve();const n={...e,type:e.refetchType??e.type??"active"};return this.refetchQueries(n,t)})}refetchQueries(e={},t){const n={...t,cancelRefetch:(t==null?void 0:t.cancelRefetch)??!0},r=pt.batch(()=>D(this,Ne).findAll(e).filter(i=>!i.isDisabled()).map(i=>{let o=i.fetch(void 0,n);return n.throwOnError||(o=o.catch(Vt)),i.state.fetchStatus==="paused"?Promise.resolve():o}));return Promise.all(r).then(Vt)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const n=D(this,Ne).build(this,t);return n.isStaleByTime(hm(t.staleTime,n))?n.fetch(t):Promise.resolve(n.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(Vt).catch(Vt)}fetchInfiniteQuery(e){return e.behavior=vm(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(Vt).catch(Vt)}ensureInfiniteQueryData(e){return e.behavior=vm(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return ol.isOnline()?D(this,qn).resumePausedMutations():Promise.resolve()}getQueryCache(){return D(this,Ne)}getMutationCache(){return D(this,qn)}getDefaultOptions(){return D(this,Gn)}setDefaultOptions(e){re(this,Gn,e)}setQueryDefaults(e,t){D(this,Di).set(ss(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...D(this,Di).values()];let n={};return t.forEach(r=>{as(e,r.queryKey)&&(n={...n,...r.defaultOptions})}),n}setMutationDefaults(e,t){D(this,Ni).set(ss(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...D(this,Ni).values()];let n={};return t.forEach(r=>{as(e,r.mutationKey)&&(n={...n,...r.defaultOptions})}),n}defaultQueryOptions(e){if(e._defaulted)return e;const t={...D(this,Gn).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=Cp(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.enabled!==!0&&t.queryFn===Sp&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...D(this,Gn).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){D(this,Ne).clear(),D(this,qn).clear()}},Ne=new WeakMap,qn=new WeakMap,Gn=new WeakMap,Di=new WeakMap,Ni=new WeakMap,Kn=new WeakMap,Oi=new WeakMap,zi=new WeakMap,Am),GL=k.createContext(void 0),KL=({client:e,children:t})=>(k.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),a.jsx(GL.Provider,{value:e,children:t}));const JL=new qL({defaultOptions:{queries:{refetchOnWindowFocus:!1}}});Wg(document.getElementById("root")).render(a.jsx(KL,{client:JL,children:a.jsx(V2,{router:kL})}));
