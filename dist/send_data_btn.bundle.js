/*! For license information please see send_data_btn.bundle.js.LICENSE.txt */
(()=>{"use strict";!function(){if("object"==typeof globalThis)return globalThis;try{this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();class e{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,i))}}}class t extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name="FirebaseError",Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,i.prototype.create)}}class i{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...i){const s=i[0]||{},r=`${this.service}/${e}`,a=this.errors[e],o=a?function(e,t){return e.replace(n,((e,i)=>{const n=t[i];return null!=n?String(n):`<${i}?>`}))}(a,s):"Error",c=`${this.serviceName}: ${o} (${r}).`;return new t(r,c,s)}}const n=/\{\$([^}]+)}/g;function s(e,t){if(e===t)return!0;const i=Object.keys(e),n=Object.keys(t);for(const a of i){if(!n.includes(a))return!1;const i=e[a],o=t[a];if(r(i)&&r(o)){if(!s(i,o))return!1}else if(i!==o)return!1}for(const e of n)if(!i.includes(e))return!1;return!0}function r(e){return null!==e&&"object"==typeof e}class a{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const o="[DEFAULT]";class c{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const i=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(i)){const t=new e;if(this.instancesDeferred.set(i,t),this.isInitialized(i)||this.shouldAutoInitialize())try{const e=this.getOrInitializeService({instanceIdentifier:i});e&&t.resolve(e)}catch(e){}}return this.instancesDeferred.get(i).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(i)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:i})}catch(e){if(n)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}(e))try{this.getOrInitializeService({instanceIdentifier:o})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:i});t.resolve(e)}catch(e){}}}}clearInstance(e="[DEFAULT]"){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e="[DEFAULT]"){return this.instances.has(e)}getOptions(e="[DEFAULT]"){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const n=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[e,t]of this.instancesDeferred.entries())i===this.normalizeInstanceIdentifier(e)&&t.resolve(n);return n}onInit(e,t){var i;const n=this.normalizeInstanceIdentifier(t),s=null!==(i=this.onInitCallbacks.get(n))&&void 0!==i?i:new Set;s.add(e),this.onInitCallbacks.set(n,s);const r=this.instances.get(n);return r&&e(r,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const n of i)try{n(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:(n=e,n===o?void 0:n),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch(e){}var n;return i||null}normalizeInstanceIdentifier(e="[DEFAULT]"){return this.component?this.component.multipleInstances?e:o:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class l{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new c(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}const h=[];var p;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(p||(p={}));const f={debug:p.DEBUG,verbose:p.VERBOSE,info:p.INFO,warn:p.WARN,error:p.ERROR,silent:p.SILENT},d=p.INFO,u={[p.DEBUG]:"log",[p.VERBOSE]:"log",[p.INFO]:"info",[p.WARN]:"warn",[p.ERROR]:"error"},m=(e,t,...i)=>{if(t<e.logLevel)return;const n=(new Date).toISOString(),s=u[t];if(!s)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[s](`[${n}]  ${e.name}:`,...i)};class g{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const b="@firebase/app",I="0.7.8",v=new class{constructor(e){this.name=e,this._logLevel=d,this._logHandler=m,this._userLogHandler=null,h.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in p))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?f[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,p.DEBUG,...e),this._logHandler(this,p.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,p.VERBOSE,...e),this._logHandler(this,p.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,p.INFO,...e),this._logHandler(this,p.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,p.WARN,...e),this._logHandler(this,p.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,p.ERROR,...e),this._logHandler(this,p.ERROR,...e)}}("@firebase/app"),E={[b]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},w=new Map,y=new Map;function O(e,t){try{e.container.addComponent(t)}catch(i){v.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,i)}}function _(e){const t=e.name;if(y.has(t))return v.debug(`There were multiple attempts to register component ${t}.`),!1;y.set(t,e);for(const t of w.values())O(t,e);return!0}const C=new i("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."});class D{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new a("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw C.create("app-deleted",{appName:this._name})}}function L(e,t,i){var n;let s=null!==(n=E[e])&&void 0!==n?n:e;i&&(s+=`-${i}`);const r=s.match(/\s|\//),o=t.match(/\s|\//);if(r||o){const e=[`Unable to register library "${s}" with version "${t}":`];return r&&e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void v.warn(e.join(" "))}_(new a(`${s}-version`,(()=>({library:s,version:t})),"VERSION"))}_(new a("platform-logger",(e=>new g(e)),"PRIVATE")),L(b,I,""),L(b,I,"esm2017"),L("fire-js",""),L("firebase","9.4.1","app"),console.log((function(e,t={}){"object"!=typeof t&&(t={name:t});const i=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},t),n=i.name;if("string"!=typeof n||!n)throw C.create("bad-app-name",{appName:String(n)});const r=w.get(n);if(r){if(s(e,r.options)&&s(i,r.config))return r;throw C.create("duplicate-app",{appName:n})}const a=new l(n);for(const e of y.values())a.addComponent(e);const o=new D(e,i,a);return w.set(n,o),o})),console.log("Next page")})();