var TropicBirdModule = (function (exports, sargasso) {
    'use strict';

    /**
     * Stores result from supportsCssVariables to avoid redundant processing to
     * detect CSS custom variable support.
     */
    var supportsCssVariables_;
    function supportsCssVariables(windowObj, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        var CSS = windowObj.CSS;
        var supportsCssVars = supportsCssVariables_;
        if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
            return supportsCssVariables_;
        }
        var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
        if (!supportsFunctionPresent) {
            return false;
        }
        var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
        // See: https://bugs.webkit.org/show_bug.cgi?id=154669
        // See: README section on Safari
        var weAreFeatureDetectingSafari10plus = (CSS.supports('(--css-vars: yes)') &&
            CSS.supports('color', '#00000000'));
        supportsCssVars =
            explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
        if (!forceRefresh) {
            supportsCssVariables_ = supportsCssVars;
        }
        return supportsCssVars;
    }
    function getNormalizedEventCoords(evt, pageOffset, clientRect) {
        if (!evt) {
            return { x: 0, y: 0 };
        }
        var x = pageOffset.x, y = pageOffset.y;
        var documentX = x + clientRect.left;
        var documentY = y + clientRect.top;
        var normalizedX;
        var normalizedY;
        // Determine touch point relative to the ripple container.
        if (evt.type === 'touchstart') {
            var touchEvent = evt;
            normalizedX = touchEvent.changedTouches[0].pageX - documentX;
            normalizedY = touchEvent.changedTouches[0].pageY - documentY;
        }
        else {
            var mouseEvent = evt;
            normalizedX = mouseEvent.pageX - documentX;
            normalizedY = mouseEvent.pageY - documentY;
        }
        return { x: normalizedX, y: normalizedY };
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFoundation = /** @class */ (function () {
        function MDCFoundation(adapter) {
            if (adapter === void 0) { adapter = {}; }
            this.adapter = adapter;
        }
        Object.defineProperty(MDCFoundation, "cssClasses", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports every
                // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
                return {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "strings", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
                return {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "numbers", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
                return {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "defaultAdapter", {
            get: function () {
                // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
                // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
                // validation.
                return {};
            },
            enumerable: true,
            configurable: true
        });
        MDCFoundation.prototype.init = function () {
            // Subclasses should override this method to perform initialization routines (registering events, etc.)
        };
        MDCFoundation.prototype.destroy = function () {
            // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
        };
        return MDCFoundation;
    }());

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCComponent = /** @class */ (function () {
        function MDCComponent(root, foundation) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.root = root;
            this.initialize.apply(this, __spread(args));
            // Note that we initialize foundation here and not within the constructor's default param so that
            // this.root_ is defined and can be used within the foundation class.
            this.foundation =
                foundation === undefined ? this.getDefaultFoundation() : foundation;
            this.foundation.init();
            this.initialSyncWithDOM();
        }
        MDCComponent.attachTo = function (root) {
            // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
            // returns an instantiated component with its root set to that element. Also note that in the cases of
            // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
            // from getDefaultFoundation().
            return new MDCComponent(root, new MDCFoundation({}));
        };
        /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */
        MDCComponent.prototype.initialize = function () {
            var _args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _args[_i] = arguments[_i];
            }
            // Subclasses can override this to do any additional setup work that would be considered part of a
            // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
            // initialized. Any additional arguments besides root and foundation will be passed in here.
        };
        MDCComponent.prototype.getDefaultFoundation = function () {
            // Subclasses must override this method to return a properly configured foundation class for the
            // component.
            throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' +
                'foundation class');
        };
        MDCComponent.prototype.initialSyncWithDOM = function () {
            // Subclasses should override this method if they need to perform work to synchronize with a host DOM
            // object. An example of this would be a form control wrapper that needs to synchronize its internal state
            // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
            // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
        };
        MDCComponent.prototype.destroy = function () {
            // Subclasses may implement this method to release any resources / deregister any listeners they have
            // attached. An example of this might be deregistering a resize event from the window object.
            this.foundation.destroy();
        };
        MDCComponent.prototype.listen = function (evtType, handler, options) {
            this.root.addEventListener(evtType, handler, options);
        };
        MDCComponent.prototype.unlisten = function (evtType, handler, options) {
            this.root.removeEventListener(evtType, handler, options);
        };
        /**
         * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
         */
        MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
            if (shouldBubble === void 0) { shouldBubble = false; }
            var evt;
            if (typeof CustomEvent === 'function') {
                evt = new CustomEvent(evtType, {
                    bubbles: shouldBubble,
                    detail: evtData,
                });
            }
            else {
                evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(evtType, shouldBubble, false, evtData);
            }
            this.root.dispatchEvent(evt);
        };
        return MDCComponent;
    }());

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * Determine whether the current browser supports passive event listeners, and
     * if so, use them.
     */
    function applyPassive(globalObj) {
        if (globalObj === void 0) { globalObj = window; }
        return supportsPassiveOption(globalObj) ?
            { passive: true } :
            false;
    }
    function supportsPassiveOption(globalObj) {
        if (globalObj === void 0) { globalObj = window; }
        // See
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        var passiveSupported = false;
        try {
            var options = {
                // This function will be called when the browser
                // attempts to access the passive property.
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            var handler = function () { };
            globalObj.document.addEventListener('test', handler, options);
            globalObj.document.removeEventListener('test', handler, options);
        }
        catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    }

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
     * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
     */
    function closest(element, selector) {
        if (element.closest) {
            return element.closest(selector);
        }
        var el = element;
        while (el) {
            if (matches(el, selector)) {
                return el;
            }
            el = el.parentElement;
        }
        return null;
    }
    function matches(element, selector) {
        var nativeMatches = element.matches
            || element.webkitMatchesSelector
            || element.msMatchesSelector;
        return nativeMatches.call(element, selector);
    }
    /**
     * Used to compute the estimated scroll width of elements. When an element is
     * hidden due to display: none; being applied to a parent element, the width is
     * returned as 0. However, the element will have a true width once no longer
     * inside a display: none context. This method computes an estimated width when
     * the element is hidden or returns the true width when the element is visble.
     * @param {Element} element the element whose width to estimate
     */
    function estimateScrollWidth(element) {
        // Check the offsetParent. If the element inherits display: none from any
        // parent, the offsetParent property will be null (see
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
        // This check ensures we only clone the node when necessary.
        var htmlEl = element;
        if (htmlEl.offsetParent !== null) {
            return htmlEl.scrollWidth;
        }
        var clone = htmlEl.cloneNode(true);
        clone.style.setProperty('position', 'absolute');
        clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
        document.documentElement.appendChild(clone);
        var scrollWidth = clone.scrollWidth;
        document.documentElement.removeChild(clone);
        return scrollWidth;
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$q = {
        // Ripple is a special case where the "root" component is really a "mixin" of sorts,
        // given that it's an 'upgrade' to an existing component. That being said it is the root
        // CSS class that all other CSS classes derive from.
        BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
        FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
        FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
        ROOT: 'mdc-ripple-upgraded',
        UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    };
    var strings$t = {
        VAR_FG_SCALE: '--mdc-ripple-fg-scale',
        VAR_FG_SIZE: '--mdc-ripple-fg-size',
        VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
        VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
        VAR_LEFT: '--mdc-ripple-left',
        VAR_TOP: '--mdc-ripple-top',
    };
    var numbers$b = {
        DEACTIVATION_TIMEOUT_MS: 225,
        FG_DEACTIVATION_MS: 150,
        INITIAL_ORIGIN_SCALE: 0.6,
        PADDING: 10,
        TAP_DELAY_MS: 300,
    };

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    // Activation events registered on the root element of each instance for activation
    var ACTIVATION_EVENT_TYPES = [
        'touchstart', 'pointerdown', 'mousedown', 'keydown',
    ];
    // Deactivation events registered on documentElement when a pointer-related down event occurs
    var POINTER_DEACTIVATION_EVENT_TYPES = [
        'touchend', 'pointerup', 'mouseup', 'contextmenu',
    ];
    // simultaneous nested activations
    var activatedTargets = [];
    var MDCRippleFoundation = /** @class */ (function (_super) {
        __extends(MDCRippleFoundation, _super);
        function MDCRippleFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation.defaultAdapter), adapter)) || this;
            _this.activationAnimationHasEnded_ = false;
            _this.activationTimer_ = 0;
            _this.fgDeactivationRemovalTimer_ = 0;
            _this.fgScale_ = '0';
            _this.frame_ = { width: 0, height: 0 };
            _this.initialSize_ = 0;
            _this.layoutFrame_ = 0;
            _this.maxRadius_ = 0;
            _this.unboundedCoords_ = { left: 0, top: 0 };
            _this.activationState_ = _this.defaultActivationState_();
            _this.activationTimerCallback_ = function () {
                _this.activationAnimationHasEnded_ = true;
                _this.runDeactivationUXLogicIfReady_();
            };
            _this.activateHandler_ = function (e) { return _this.activate_(e); };
            _this.deactivateHandler_ = function () { return _this.deactivate_(); };
            _this.focusHandler_ = function () { return _this.handleFocus(); };
            _this.blurHandler_ = function () { return _this.handleBlur(); };
            _this.resizeHandler_ = function () { return _this.layout(); };
            return _this;
        }
        Object.defineProperty(MDCRippleFoundation, "cssClasses", {
            get: function () {
                return cssClasses$q;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "strings", {
            get: function () {
                return strings$t;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "numbers", {
            get: function () {
                return numbers$b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    browserSupportsCssVars: function () { return true; },
                    computeBoundingRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    containsEventTarget: function () { return true; },
                    deregisterDocumentInteractionHandler: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                    deregisterResizeHandler: function () { return undefined; },
                    getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                    isSurfaceActive: function () { return true; },
                    isSurfaceDisabled: function () { return true; },
                    isUnbounded: function () { return true; },
                    registerDocumentInteractionHandler: function () { return undefined; },
                    registerInteractionHandler: function () { return undefined; },
                    registerResizeHandler: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    updateCssVariable: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCRippleFoundation.prototype.init = function () {
            var _this = this;
            var supportsPressRipple = this.supportsPressRipple_();
            this.registerRootHandlers_(supportsPressRipple);
            if (supportsPressRipple) {
                var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter.addClass(ROOT_1);
                    if (_this.adapter.isUnbounded()) {
                        _this.adapter.addClass(UNBOUNDED_1);
                        // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                        _this.layoutInternal_();
                    }
                });
            }
        };
        MDCRippleFoundation.prototype.destroy = function () {
            var _this = this;
            if (this.supportsPressRipple_()) {
                if (this.activationTimer_) {
                    clearTimeout(this.activationTimer_);
                    this.activationTimer_ = 0;
                    this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
                }
                if (this.fgDeactivationRemovalTimer_) {
                    clearTimeout(this.fgDeactivationRemovalTimer_);
                    this.fgDeactivationRemovalTimer_ = 0;
                    this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
                }
                var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter.removeClass(ROOT_2);
                    _this.adapter.removeClass(UNBOUNDED_2);
                    _this.removeCssVars_();
                });
            }
            this.deregisterRootHandlers_();
            this.deregisterDeactivationHandlers_();
        };
        /**
         * @param evt Optional event containing position information.
         */
        MDCRippleFoundation.prototype.activate = function (evt) {
            this.activate_(evt);
        };
        MDCRippleFoundation.prototype.deactivate = function () {
            this.deactivate_();
        };
        MDCRippleFoundation.prototype.layout = function () {
            var _this = this;
            if (this.layoutFrame_) {
                cancelAnimationFrame(this.layoutFrame_);
            }
            this.layoutFrame_ = requestAnimationFrame(function () {
                _this.layoutInternal_();
                _this.layoutFrame_ = 0;
            });
        };
        MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
            var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
            if (unbounded) {
                this.adapter.addClass(UNBOUNDED);
            }
            else {
                this.adapter.removeClass(UNBOUNDED);
            }
        };
        MDCRippleFoundation.prototype.handleFocus = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
        };
        MDCRippleFoundation.prototype.handleBlur = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
        };
        /**
         * We compute this property so that we are not querying information about the client
         * until the point in time where the foundation requests it. This prevents scenarios where
         * client-side feature-detection may happen too early, such as when components are rendered on the server
         * and then initialized at mount time on the client.
         */
        MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
            return this.adapter.browserSupportsCssVars();
        };
        MDCRippleFoundation.prototype.defaultActivationState_ = function () {
            return {
                activationEvent: undefined,
                hasDeactivationUXRun: false,
                isActivated: false,
                isProgrammatic: false,
                wasActivatedByPointer: false,
                wasElementMadeActive: false,
            };
        };
        /**
         * supportsPressRipple Passed from init to save a redundant function call
         */
        MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
            var _this = this;
            if (supportsPressRipple) {
                ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                    _this.adapter.registerInteractionHandler(evtType, _this.activateHandler_);
                });
                if (this.adapter.isUnbounded()) {
                    this.adapter.registerResizeHandler(this.resizeHandler_);
                }
            }
            this.adapter.registerInteractionHandler('focus', this.focusHandler_);
            this.adapter.registerInteractionHandler('blur', this.blurHandler_);
        };
        MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
            var _this = this;
            if (evt.type === 'keydown') {
                this.adapter.registerInteractionHandler('keyup', this.deactivateHandler_);
            }
            else {
                POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                    _this.adapter.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
                });
            }
        };
        MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
            var _this = this;
            ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter.deregisterInteractionHandler(evtType, _this.activateHandler_);
            });
            this.adapter.deregisterInteractionHandler('focus', this.focusHandler_);
            this.adapter.deregisterInteractionHandler('blur', this.blurHandler_);
            if (this.adapter.isUnbounded()) {
                this.adapter.deregisterResizeHandler(this.resizeHandler_);
            }
        };
        MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
            var _this = this;
            this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler_);
            POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
            });
        };
        MDCRippleFoundation.prototype.removeCssVars_ = function () {
            var _this = this;
            var rippleStrings = MDCRippleFoundation.strings;
            var keys = Object.keys(rippleStrings);
            keys.forEach(function (key) {
                if (key.indexOf('VAR_') === 0) {
                    _this.adapter.updateCssVariable(rippleStrings[key], null);
                }
            });
        };
        MDCRippleFoundation.prototype.activate_ = function (evt) {
            var _this = this;
            if (this.adapter.isSurfaceDisabled()) {
                return;
            }
            var activationState = this.activationState_;
            if (activationState.isActivated) {
                return;
            }
            // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
            var previousActivationEvent = this.previousActivationEvent_;
            var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
            if (isSameInteraction) {
                return;
            }
            activationState.isActivated = true;
            activationState.isProgrammatic = evt === undefined;
            activationState.activationEvent = evt;
            activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
            var hasActivatedChild = evt !== undefined &&
                activatedTargets.length > 0 &&
                activatedTargets.some(function (target) { return _this.adapter.containsEventTarget(target); });
            if (hasActivatedChild) {
                // Immediately reset activation state, while preserving logic that prevents touch follow-on events
                this.resetActivationState_();
                return;
            }
            if (evt !== undefined) {
                activatedTargets.push(evt.target);
                this.registerDeactivationHandlers_(evt);
            }
            activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
            if (activationState.wasElementMadeActive) {
                this.animateActivation_();
            }
            requestAnimationFrame(function () {
                // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
                activatedTargets = [];
                if (!activationState.wasElementMadeActive
                    && evt !== undefined
                    && (evt.key === ' ' || evt.keyCode === 32)) {
                    // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                    // active states inconsistently when they're called within event handling code:
                    // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                    // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                    // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                    // variable is set within a rAF callback for a submit button interaction (#2241).
                    activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
                    if (activationState.wasElementMadeActive) {
                        _this.animateActivation_();
                    }
                }
                if (!activationState.wasElementMadeActive) {
                    // Reset activation state immediately if element was not made active.
                    _this.activationState_ = _this.defaultActivationState_();
                }
            });
        };
        MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
            return (evt !== undefined && evt.type === 'keydown') ?
                this.adapter.isSurfaceActive() :
                true;
        };
        MDCRippleFoundation.prototype.animateActivation_ = function () {
            var _this = this;
            var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
            var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
            var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
            this.layoutInternal_();
            var translateStart = '';
            var translateEnd = '';
            if (!this.adapter.isUnbounded()) {
                var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
                translateStart = startPoint.x + "px, " + startPoint.y + "px";
                translateEnd = endPoint.x + "px, " + endPoint.y + "px";
            }
            this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
            this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
            // Cancel any ongoing activation/deactivation animations
            clearTimeout(this.activationTimer_);
            clearTimeout(this.fgDeactivationRemovalTimer_);
            this.rmBoundedActivationClasses_();
            this.adapter.removeClass(FG_DEACTIVATION);
            // Force layout in order to re-trigger the animation.
            this.adapter.computeBoundingRect();
            this.adapter.addClass(FG_ACTIVATION);
            this.activationTimer_ = setTimeout(function () { return _this.activationTimerCallback_(); }, DEACTIVATION_TIMEOUT_MS);
        };
        MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
            var _a = this.activationState_, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
            var startPoint;
            if (wasActivatedByPointer) {
                startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
            }
            else {
                startPoint = {
                    x: this.frame_.width / 2,
                    y: this.frame_.height / 2,
                };
            }
            // Center the element around the start point.
            startPoint = {
                x: startPoint.x - (this.initialSize_ / 2),
                y: startPoint.y - (this.initialSize_ / 2),
            };
            var endPoint = {
                x: (this.frame_.width / 2) - (this.initialSize_ / 2),
                y: (this.frame_.height / 2) - (this.initialSize_ / 2),
            };
            return { startPoint: startPoint, endPoint: endPoint };
        };
        MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
            var _this = this;
            // This method is called both when a pointing device is released, and when the activation animation ends.
            // The deactivation animation should only run after both of those occur.
            var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
            var _a = this.activationState_, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
            var activationHasEnded = hasDeactivationUXRun || !isActivated;
            if (activationHasEnded && this.activationAnimationHasEnded_) {
                this.rmBoundedActivationClasses_();
                this.adapter.addClass(FG_DEACTIVATION);
                this.fgDeactivationRemovalTimer_ = setTimeout(function () {
                    _this.adapter.removeClass(FG_DEACTIVATION);
                }, numbers$b.FG_DEACTIVATION_MS);
            }
        };
        MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
            var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
            this.adapter.removeClass(FG_ACTIVATION);
            this.activationAnimationHasEnded_ = false;
            this.adapter.computeBoundingRect();
        };
        MDCRippleFoundation.prototype.resetActivationState_ = function () {
            var _this = this;
            this.previousActivationEvent_ = this.activationState_.activationEvent;
            this.activationState_ = this.defaultActivationState_();
            // Touch devices may fire additional events for the same interaction within a short time.
            // Store the previous event until it's safe to assume that subsequent events are for new interactions.
            setTimeout(function () { return _this.previousActivationEvent_ = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
        };
        MDCRippleFoundation.prototype.deactivate_ = function () {
            var _this = this;
            var activationState = this.activationState_;
            // This can happen in scenarios such as when you have a keyup event that blurs the element.
            if (!activationState.isActivated) {
                return;
            }
            var state = __assign({}, activationState);
            if (activationState.isProgrammatic) {
                requestAnimationFrame(function () { return _this.animateDeactivation_(state); });
                this.resetActivationState_();
            }
            else {
                this.deregisterDeactivationHandlers_();
                requestAnimationFrame(function () {
                    _this.activationState_.hasDeactivationUXRun = true;
                    _this.animateDeactivation_(state);
                    _this.resetActivationState_();
                });
            }
        };
        MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
            var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
            if (wasActivatedByPointer || wasElementMadeActive) {
                this.runDeactivationUXLogicIfReady_();
            }
        };
        MDCRippleFoundation.prototype.layoutInternal_ = function () {
            var _this = this;
            this.frame_ = this.adapter.computeBoundingRect();
            var maxDim = Math.max(this.frame_.height, this.frame_.width);
            // Surface diameter is treated differently for unbounded vs. bounded ripples.
            // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
            // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
            // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
            // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
            // `overflow: hidden`.
            var getBoundedRadius = function () {
                var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
                return hypotenuse + MDCRippleFoundation.numbers.PADDING;
            };
            this.maxRadius_ = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
            // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
            var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
            // Unbounded ripple size should always be even number to equally center align.
            if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
                this.initialSize_ = initialSize - 1;
            }
            else {
                this.initialSize_ = initialSize;
            }
            this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
            this.updateLayoutCssVars_();
        };
        MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
            var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
            this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
            this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
            if (this.adapter.isUnbounded()) {
                this.unboundedCoords_ = {
                    left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
                    top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
                };
                this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
                this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
            }
        };
        return MDCRippleFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCRipple = /** @class */ (function (_super) {
        __extends(MDCRipple, _super);
        function MDCRipple() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.disabled = false;
            return _this;
        }
        MDCRipple.attachTo = function (root, opts) {
            if (opts === void 0) { opts = { isUnbounded: undefined }; }
            var ripple = new MDCRipple(root);
            // Only override unbounded behavior if option is explicitly specified
            if (opts.isUnbounded !== undefined) {
                ripple.unbounded = opts.isUnbounded;
            }
            return ripple;
        };
        MDCRipple.createAdapter = function (instance) {
            return {
                addClass: function (className) { return instance.root.classList.add(className); },
                browserSupportsCssVars: function () { return supportsCssVariables(window); },
                computeBoundingRect: function () { return instance.root.getBoundingClientRect(); },
                containsEventTarget: function (target) { return instance.root.contains(target); },
                deregisterDocumentInteractionHandler: function (evtType, handler) {
                    return document.documentElement.removeEventListener(evtType, handler, applyPassive());
                },
                deregisterInteractionHandler: function (evtType, handler) {
                    return instance.root
                        .removeEventListener(evtType, handler, applyPassive());
                },
                deregisterResizeHandler: function (handler) {
                    return window.removeEventListener('resize', handler);
                },
                getWindowPageOffset: function () {
                    return ({ x: window.pageXOffset, y: window.pageYOffset });
                },
                isSurfaceActive: function () { return matches(instance.root, ':active'); },
                isSurfaceDisabled: function () { return Boolean(instance.disabled); },
                isUnbounded: function () { return Boolean(instance.unbounded); },
                registerDocumentInteractionHandler: function (evtType, handler) {
                    return document.documentElement.addEventListener(evtType, handler, applyPassive());
                },
                registerInteractionHandler: function (evtType, handler) {
                    return instance.root
                        .addEventListener(evtType, handler, applyPassive());
                },
                registerResizeHandler: function (handler) {
                    return window.addEventListener('resize', handler);
                },
                removeClass: function (className) { return instance.root.classList.remove(className); },
                updateCssVariable: function (varName, value) {
                    return instance.root.style.setProperty(varName, value);
                },
            };
        };
        Object.defineProperty(MDCRipple.prototype, "unbounded", {
            get: function () {
                return Boolean(this.unbounded_);
            },
            set: function (unbounded) {
                this.unbounded_ = Boolean(unbounded);
                this.setUnbounded_();
            },
            enumerable: true,
            configurable: true
        });
        MDCRipple.prototype.activate = function () {
            this.foundation.activate();
        };
        MDCRipple.prototype.deactivate = function () {
            this.foundation.deactivate();
        };
        MDCRipple.prototype.layout = function () {
            this.foundation.layout();
        };
        MDCRipple.prototype.getDefaultFoundation = function () {
            return new MDCRippleFoundation(MDCRipple.createAdapter(this));
        };
        MDCRipple.prototype.initialSyncWithDOM = function () {
            var root = this.root;
            this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
        };
        /**
         * Closure Compiler throws an access control error when directly accessing a
         * protected or private property inside a getter/setter, like unbounded above.
         * By accessing the protected property inside a method, we solve that problem.
         * That's why this function exists.
         */
        MDCRipple.prototype.setUnbounded_ = function () {
            this.foundation.setUnbounded(Boolean(this.unbounded_));
        };
        return MDCRipple;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$p = {
        LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
        LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCLineRippleFoundation = /** @class */ (function (_super) {
        __extends(MDCLineRippleFoundation, _super);
        function MDCLineRippleFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCLineRippleFoundation.defaultAdapter), adapter)) || this;
            _this.transitionEndHandler_ = function (evt) { return _this.handleTransitionEnd(evt); };
            return _this;
        }
        Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
            get: function () {
                return cssClasses$p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
            /**
             * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    setStyle: function () { return undefined; },
                    registerEventHandler: function () { return undefined; },
                    deregisterEventHandler: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCLineRippleFoundation.prototype.init = function () {
            this.adapter.registerEventHandler('transitionend', this.transitionEndHandler_);
        };
        MDCLineRippleFoundation.prototype.destroy = function () {
            this.adapter.deregisterEventHandler('transitionend', this.transitionEndHandler_);
        };
        MDCLineRippleFoundation.prototype.activate = function () {
            this.adapter.removeClass(cssClasses$p.LINE_RIPPLE_DEACTIVATING);
            this.adapter.addClass(cssClasses$p.LINE_RIPPLE_ACTIVE);
        };
        MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
            this.adapter.setStyle('transform-origin', xCoordinate + "px center");
        };
        MDCLineRippleFoundation.prototype.deactivate = function () {
            this.adapter.addClass(cssClasses$p.LINE_RIPPLE_DEACTIVATING);
        };
        MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
            // Wait for the line ripple to be either transparent or opaque
            // before emitting the animation end event
            var isDeactivating = this.adapter.hasClass(cssClasses$p.LINE_RIPPLE_DEACTIVATING);
            if (evt.propertyName === 'opacity') {
                if (isDeactivating) {
                    this.adapter.removeClass(cssClasses$p.LINE_RIPPLE_ACTIVE);
                    this.adapter.removeClass(cssClasses$p.LINE_RIPPLE_DEACTIVATING);
                }
            }
        };
        return MDCLineRippleFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCLineRipple = /** @class */ (function (_super) {
        __extends(MDCLineRipple, _super);
        function MDCLineRipple() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCLineRipple.attachTo = function (root) {
            return new MDCLineRipple(root);
        };
        /**
         * Activates the line ripple
         */
        MDCLineRipple.prototype.activate = function () {
            this.foundation.activate();
        };
        /**
         * Deactivates the line ripple
         */
        MDCLineRipple.prototype.deactivate = function () {
            this.foundation.deactivate();
        };
        /**
         * Sets the transform origin given a user's click location.
         * The `rippleCenter` is the x-coordinate of the middle of the ripple.
         */
        MDCLineRipple.prototype.setRippleCenter = function (xCoordinate) {
            this.foundation.setRippleCenter(xCoordinate);
        };
        MDCLineRipple.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                setStyle: function (propertyName, value) { return _this.root.style.setProperty(propertyName, value); },
                registerEventHandler: function (evtType, handler) { return _this.listen(evtType, handler); },
                deregisterEventHandler: function (evtType, handler) { return _this.unlisten(evtType, handler); },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCLineRippleFoundation(adapter);
        };
        return MDCLineRipple;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$o = {
        FIXED_CLASS: 'mdc-top-app-bar--fixed',
        FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
        SHORT_CLASS: 'mdc-top-app-bar--short',
        SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed',
        SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
    };
    var numbers$a = {
        DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
        MAX_TOP_APP_BAR_HEIGHT: 128,
    };
    var strings$s = {
        ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
        NAVIGATION_EVENT: 'MDCTopAppBar:nav',
        NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
        ROOT_SELECTOR: '.mdc-top-app-bar',
        TITLE_SELECTOR: '.mdc-top-app-bar__title',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTopAppBarBaseFoundation = /** @class */ (function (_super) {
        __extends(MDCTopAppBarBaseFoundation, _super);
        /* istanbul ignore next: optional argument is not a branch statement */
        function MDCTopAppBarBaseFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCTopAppBarBaseFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCTopAppBarBaseFoundation, "strings", {
            get: function () {
                return strings$s;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTopAppBarBaseFoundation, "cssClasses", {
            get: function () {
                return cssClasses$o;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTopAppBarBaseFoundation, "numbers", {
            get: function () {
                return numbers$a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTopAppBarBaseFoundation, "defaultAdapter", {
            /**
             * See {@link MDCTopAppBarAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    setStyle: function () { return undefined; },
                    getTopAppBarHeight: function () { return 0; },
                    notifyNavigationIconClicked: function () { return undefined; },
                    getViewportScrollY: function () { return 0; },
                    getTotalActionItems: function () { return 0; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        /** Other variants of TopAppBar foundation overrides this method */
        MDCTopAppBarBaseFoundation.prototype.handleTargetScroll = function () { }; // tslint:disable-line:no-empty
        /** Other variants of TopAppBar foundation overrides this method */
        MDCTopAppBarBaseFoundation.prototype.handleWindowResize = function () { }; // tslint:disable-line:no-empty
        MDCTopAppBarBaseFoundation.prototype.handleNavigationClick = function () {
            this.adapter.notifyNavigationIconClicked();
        };
        return MDCTopAppBarBaseFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var INITIAL_VALUE = 0;
    var MDCTopAppBarFoundation = /** @class */ (function (_super) {
        __extends(MDCTopAppBarFoundation, _super);
        /* istanbul ignore next: optional argument is not a branch statement */
        function MDCTopAppBarFoundation(adapter) {
            var _this = _super.call(this, adapter) || this;
            /**
             * Indicates if the top app bar was docked in the previous scroll handler iteration.
             */
            _this.wasDocked_ = true;
            /**
             * Indicates if the top app bar is docked in the fully shown position.
             */
            _this.isDockedShowing_ = true;
            /**
             * Variable for current scroll position of the top app bar
             */
            _this.currentAppBarOffsetTop_ = 0;
            /**
             * Used to prevent the top app bar from being scrolled out of view during resize events
             */
            _this.isCurrentlyBeingResized_ = false;
            /**
             * The timeout that's used to throttle the resize events
             */
            _this.resizeThrottleId_ = INITIAL_VALUE;
            /**
             * The timeout that's used to debounce toggling the isCurrentlyBeingResized_ variable after a resize
             */
            _this.resizeDebounceId_ = INITIAL_VALUE;
            _this.lastScrollPosition_ = _this.adapter.getViewportScrollY();
            _this.topAppBarHeight_ = _this.adapter.getTopAppBarHeight();
            return _this;
        }
        MDCTopAppBarFoundation.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.adapter.setStyle('top', '');
        };
        /**
         * Scroll handler for the default scroll behavior of the top app bar.
         * @override
         */
        MDCTopAppBarFoundation.prototype.handleTargetScroll = function () {
            var currentScrollPosition = Math.max(this.adapter.getViewportScrollY(), 0);
            var diff = currentScrollPosition - this.lastScrollPosition_;
            this.lastScrollPosition_ = currentScrollPosition;
            // If the window is being resized the lastScrollPosition_ needs to be updated but the
            // current scroll of the top app bar should stay in the same position.
            if (!this.isCurrentlyBeingResized_) {
                this.currentAppBarOffsetTop_ -= diff;
                if (this.currentAppBarOffsetTop_ > 0) {
                    this.currentAppBarOffsetTop_ = 0;
                }
                else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
                    this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
                }
                this.moveTopAppBar_();
            }
        };
        /**
         * Top app bar resize handler that throttle/debounce functions that execute updates.
         * @override
         */
        MDCTopAppBarFoundation.prototype.handleWindowResize = function () {
            var _this = this;
            // Throttle resize events 10 p/s
            if (!this.resizeThrottleId_) {
                this.resizeThrottleId_ = setTimeout(function () {
                    _this.resizeThrottleId_ = INITIAL_VALUE;
                    _this.throttledResizeHandler_();
                }, numbers$a.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
            }
            this.isCurrentlyBeingResized_ = true;
            if (this.resizeDebounceId_) {
                clearTimeout(this.resizeDebounceId_);
            }
            this.resizeDebounceId_ = setTimeout(function () {
                _this.handleTargetScroll();
                _this.isCurrentlyBeingResized_ = false;
                _this.resizeDebounceId_ = INITIAL_VALUE;
            }, numbers$a.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
        };
        /**
         * Function to determine if the DOM needs to update.
         */
        MDCTopAppBarFoundation.prototype.checkForUpdate_ = function () {
            var offscreenBoundaryTop = -this.topAppBarHeight_;
            var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
            var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
            var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
            // If it's partially showing, it can't be docked.
            if (partiallyShowing) {
                this.wasDocked_ = false;
            }
            else {
                // Not previously docked and not partially showing, it's now docked.
                if (!this.wasDocked_) {
                    this.wasDocked_ = true;
                    return true;
                }
                else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
                    this.isDockedShowing_ = hasAnyPixelsOnscreen;
                    return true;
                }
            }
            return partiallyShowing;
        };
        /**
         * Function to move the top app bar if needed.
         */
        MDCTopAppBarFoundation.prototype.moveTopAppBar_ = function () {
            if (this.checkForUpdate_()) {
                // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
                // so the top app bar doesn't show if the window resizes and the new height > the old height.
                var offset = this.currentAppBarOffsetTop_;
                if (Math.abs(offset) >= this.topAppBarHeight_) {
                    offset = -numbers$a.MAX_TOP_APP_BAR_HEIGHT;
                }
                this.adapter.setStyle('top', offset + 'px');
            }
        };
        /**
         * Throttled function that updates the top app bar scrolled values if the
         * top app bar height changes.
         */
        MDCTopAppBarFoundation.prototype.throttledResizeHandler_ = function () {
            var currentHeight = this.adapter.getTopAppBarHeight();
            if (this.topAppBarHeight_ !== currentHeight) {
                this.wasDocked_ = false;
                // Since the top app bar has a different height depending on the screen width, this
                // will ensure that the top app bar remains in the correct location if
                // completely hidden and a resize makes the top app bar a different height.
                this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
                this.topAppBarHeight_ = currentHeight;
            }
            this.handleTargetScroll();
        };
        return MDCTopAppBarFoundation;
    }(MDCTopAppBarBaseFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFixedTopAppBarFoundation = /** @class */ (function (_super) {
        __extends(MDCFixedTopAppBarFoundation, _super);
        function MDCFixedTopAppBarFoundation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * State variable for the previous scroll iteration top app bar state
             */
            _this.wasScrolled_ = false;
            return _this;
        }
        /**
         * Scroll handler for applying/removing the modifier class on the fixed top app bar.
         * @override
         */
        MDCFixedTopAppBarFoundation.prototype.handleTargetScroll = function () {
            var currentScroll = this.adapter.getViewportScrollY();
            if (currentScroll <= 0) {
                if (this.wasScrolled_) {
                    this.adapter.removeClass(cssClasses$o.FIXED_SCROLLED_CLASS);
                    this.wasScrolled_ = false;
                }
            }
            else {
                if (!this.wasScrolled_) {
                    this.adapter.addClass(cssClasses$o.FIXED_SCROLLED_CLASS);
                    this.wasScrolled_ = true;
                }
            }
        };
        return MDCFixedTopAppBarFoundation;
    }(MDCTopAppBarFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCShortTopAppBarFoundation = /** @class */ (function (_super) {
        __extends(MDCShortTopAppBarFoundation, _super);
        /* istanbul ignore next: optional argument is not a branch statement */
        function MDCShortTopAppBarFoundation(adapter) {
            var _this = _super.call(this, adapter) || this;
            _this.isCollapsed_ = false;
            _this.isAlwaysCollapsed_ = false;
            return _this;
        }
        Object.defineProperty(MDCShortTopAppBarFoundation.prototype, "isCollapsed", {
            // Public visibility for backward compatibility.
            get: function () {
                return this.isCollapsed_;
            },
            enumerable: true,
            configurable: true
        });
        MDCShortTopAppBarFoundation.prototype.init = function () {
            _super.prototype.init.call(this);
            if (this.adapter.getTotalActionItems() > 0) {
                this.adapter.addClass(cssClasses$o.SHORT_HAS_ACTION_ITEM_CLASS);
            }
            // If initialized with SHORT_COLLAPSED_CLASS, the bar should always be collapsed
            this.setAlwaysCollapsed(this.adapter.hasClass(cssClasses$o.SHORT_COLLAPSED_CLASS));
        };
        /**
         * Set if the short top app bar should always be collapsed.
         *
         * @param value When `true`, bar will always be collapsed. When `false`, bar may collapse or expand based on scroll.
         */
        MDCShortTopAppBarFoundation.prototype.setAlwaysCollapsed = function (value) {
            this.isAlwaysCollapsed_ = !!value;
            if (this.isAlwaysCollapsed_) {
                this.collapse_();
            }
            else {
                // let maybeCollapseBar_ determine if the bar should be collapsed
                this.maybeCollapseBar_();
            }
        };
        MDCShortTopAppBarFoundation.prototype.getAlwaysCollapsed = function () {
            return this.isAlwaysCollapsed_;
        };
        /**
         * Scroll handler for applying/removing the collapsed modifier class on the short top app bar.
         * @override
         */
        MDCShortTopAppBarFoundation.prototype.handleTargetScroll = function () {
            this.maybeCollapseBar_();
        };
        MDCShortTopAppBarFoundation.prototype.maybeCollapseBar_ = function () {
            if (this.isAlwaysCollapsed_) {
                return;
            }
            var currentScroll = this.adapter.getViewportScrollY();
            if (currentScroll <= 0) {
                if (this.isCollapsed_) {
                    this.uncollapse_();
                }
            }
            else {
                if (!this.isCollapsed_) {
                    this.collapse_();
                }
            }
        };
        MDCShortTopAppBarFoundation.prototype.uncollapse_ = function () {
            this.adapter.removeClass(cssClasses$o.SHORT_COLLAPSED_CLASS);
            this.isCollapsed_ = false;
        };
        MDCShortTopAppBarFoundation.prototype.collapse_ = function () {
            this.adapter.addClass(cssClasses$o.SHORT_COLLAPSED_CLASS);
            this.isCollapsed_ = true;
        };
        return MDCShortTopAppBarFoundation;
    }(MDCTopAppBarBaseFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTopAppBar = /** @class */ (function (_super) {
        __extends(MDCTopAppBar, _super);
        function MDCTopAppBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTopAppBar.attachTo = function (root) {
            return new MDCTopAppBar(root);
        };
        MDCTopAppBar.prototype.initialize = function (rippleFactory) {
            if (rippleFactory === void 0) { rippleFactory = function (el) { return MDCRipple.attachTo(el); }; }
            this.navIcon_ = this.root.querySelector(strings$s.NAVIGATION_ICON_SELECTOR);
            // Get all icons in the toolbar and instantiate the ripples
            var icons = [].slice.call(this.root.querySelectorAll(strings$s.ACTION_ITEM_SELECTOR));
            if (this.navIcon_) {
                icons.push(this.navIcon_);
            }
            this.iconRipples_ = icons.map(function (icon) {
                var ripple = rippleFactory(icon);
                ripple.unbounded = true;
                return ripple;
            });
            this.scrollTarget_ = window;
        };
        MDCTopAppBar.prototype.initialSyncWithDOM = function () {
            this.handleNavigationClick_ =
                this.foundation.handleNavigationClick.bind(this.foundation);
            this.handleWindowResize_ =
                this.foundation.handleWindowResize.bind(this.foundation);
            this.handleTargetScroll_ =
                this.foundation.handleTargetScroll.bind(this.foundation);
            this.scrollTarget_.addEventListener('scroll', this.handleTargetScroll_);
            if (this.navIcon_) {
                this.navIcon_.addEventListener('click', this.handleNavigationClick_);
            }
            var isFixed = this.root.classList.contains(cssClasses$o.FIXED_CLASS);
            var isShort = this.root.classList.contains(cssClasses$o.SHORT_CLASS);
            if (!isShort && !isFixed) {
                window.addEventListener('resize', this.handleWindowResize_);
            }
        };
        MDCTopAppBar.prototype.destroy = function () {
            this.iconRipples_.forEach(function (iconRipple) { return iconRipple.destroy(); });
            this.scrollTarget_.removeEventListener('scroll', this.handleTargetScroll_);
            if (this.navIcon_) {
                this.navIcon_.removeEventListener('click', this.handleNavigationClick_);
            }
            var isFixed = this.root.classList.contains(cssClasses$o.FIXED_CLASS);
            var isShort = this.root.classList.contains(cssClasses$o.SHORT_CLASS);
            if (!isShort && !isFixed) {
                window.removeEventListener('resize', this.handleWindowResize_);
            }
            _super.prototype.destroy.call(this);
        };
        MDCTopAppBar.prototype.setScrollTarget = function (target) {
            // Remove scroll handler from the previous scroll target
            this.scrollTarget_.removeEventListener('scroll', this.handleTargetScroll_);
            this.scrollTarget_ = target;
            // Initialize scroll handler on the new scroll target
            this.handleTargetScroll_ =
                this.foundation.handleTargetScroll.bind(this.foundation);
            this.scrollTarget_.addEventListener('scroll', this.handleTargetScroll_);
        };
        MDCTopAppBar.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                hasClass: function (className) { return _this.root.classList.contains(className); },
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                setStyle: function (property, value) {
                    return _this.root.style.setProperty(property, value);
                },
                getTopAppBarHeight: function () { return _this.root.clientHeight; },
                notifyNavigationIconClicked: function () {
                    return _this.emit(strings$s.NAVIGATION_EVENT, {});
                },
                getViewportScrollY: function () {
                    var win = _this.scrollTarget_;
                    var el = _this.scrollTarget_;
                    return win.pageYOffset !== undefined ? win.pageYOffset : el.scrollTop;
                },
                getTotalActionItems: function () {
                    return _this.root.querySelectorAll(strings$s.ACTION_ITEM_SELECTOR).length;
                },
            };
            // tslint:enable:object-literal-sort-keys
            var foundation;
            if (this.root.classList.contains(cssClasses$o.SHORT_CLASS)) {
                foundation = new MDCShortTopAppBarFoundation(adapter);
            }
            else if (this.root.classList.contains(cssClasses$o.FIXED_CLASS)) {
                foundation = new MDCFixedTopAppBarFoundation(adapter);
            }
            else {
                foundation = new MDCTopAppBarFoundation(adapter);
            }
            return foundation;
        };
        return MDCTopAppBar;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    function createFocusTrapInstance$1(surfaceEl, focusTrapFactory) {
        return focusTrapFactory(surfaceEl, {
            // Component handles focusing on active nav item.
            skipInitialFocus: true,
        });
    }

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var FOCUS_SENTINEL_CLASS = 'mdc-dom-focus-sentinel';
    /**
     * Utility to trap focus in a given root element, e.g. for modal components such
     * as dialogs. The root should have at least one focusable child element,
     * for setting initial focus when trapping focus.
     * Also tracks the previously focused element, and restores focus to that
     * element when releasing focus.
     */
    var FocusTrap = /** @class */ (function () {
        function FocusTrap(root, options) {
            if (options === void 0) { options = {}; }
            this.root = root;
            this.options = options;
            // Previously focused element before trapping focus.
            this.elFocusedBeforeTrapFocus = null;
        }
        /**
         * Traps focus in `root`. Also focuses on either `initialFocusEl` if set;
         * otherwises sets initial focus to the first focusable child element.
         */
        FocusTrap.prototype.trapFocus = function () {
            var focusableEls = this.getFocusableElements(this.root);
            if (focusableEls.length === 0) {
                throw new Error('FocusTrap: Element must have at least one focusable child.');
            }
            this.elFocusedBeforeTrapFocus =
                document.activeElement instanceof HTMLElement ? document.activeElement :
                    null;
            this.wrapTabFocus(this.root, focusableEls);
            if (!this.options.skipInitialFocus) {
                this.focusInitialElement(focusableEls, this.options.initialFocusEl);
            }
        };
        /**
         * Releases focus from `root`. Also restores focus to the previously focused
         * element.
         */
        FocusTrap.prototype.releaseFocus = function () {
            [].slice.call(this.root.querySelectorAll("." + FOCUS_SENTINEL_CLASS))
                .forEach(function (sentinelEl) {
                sentinelEl.parentElement.removeChild(sentinelEl);
            });
            if (this.elFocusedBeforeTrapFocus) {
                this.elFocusedBeforeTrapFocus.focus();
            }
        };
        /**
         * Wraps tab focus within `el` by adding two hidden sentinel divs which are
         * used to mark the beginning and the end of the tabbable region. When
         * focused, these sentinel elements redirect focus to the first/last
         * children elements of the tabbable region, ensuring that focus is trapped
         * within that region.
         */
        FocusTrap.prototype.wrapTabFocus = function (el, focusableEls) {
            var sentinelStart = this.createSentinel();
            var sentinelEnd = this.createSentinel();
            sentinelStart.addEventListener('focus', function () {
                if (focusableEls.length > 0) {
                    focusableEls[focusableEls.length - 1].focus();
                }
            });
            sentinelEnd.addEventListener('focus', function () {
                if (focusableEls.length > 0) {
                    focusableEls[0].focus();
                }
            });
            el.insertBefore(sentinelStart, el.children[0]);
            el.appendChild(sentinelEnd);
        };
        /**
         * Focuses on `initialFocusEl` if defined and a child of the root element.
         * Otherwise, focuses on the first focusable child element of the root.
         */
        FocusTrap.prototype.focusInitialElement = function (focusableEls, initialFocusEl) {
            var focusIndex = 0;
            if (initialFocusEl) {
                focusIndex = Math.max(focusableEls.indexOf(initialFocusEl), 0);
            }
            focusableEls[focusIndex].focus();
        };
        FocusTrap.prototype.getFocusableElements = function (root) {
            var focusableEls = [].slice.call(root.querySelectorAll('[autofocus], [tabindex], a, input, textarea, select, button'));
            return focusableEls.filter(function (el) {
                var isDisabledOrHidden = el.getAttribute('aria-disabled') === 'true' ||
                    el.getAttribute('disabled') != null ||
                    el.getAttribute('hidden') != null ||
                    el.getAttribute('aria-hidden') === 'true';
                var isTabbableAndVisible = el.tabIndex >= 0 &&
                    el.getBoundingClientRect().width > 0 &&
                    !el.classList.contains(FOCUS_SENTINEL_CLASS) && !isDisabledOrHidden;
                var isProgrammaticallyHidden = false;
                if (isTabbableAndVisible) {
                    var style = getComputedStyle(el);
                    isProgrammaticallyHidden =
                        style.display === 'none' || style.visibility === 'hidden';
                }
                return isTabbableAndVisible && !isProgrammaticallyHidden;
            });
        };
        FocusTrap.prototype.createSentinel = function () {
            var sentinel = document.createElement('div');
            sentinel.setAttribute('tabindex', '0');
            // Don't announce in screen readers.
            sentinel.setAttribute('aria-hidden', 'true');
            sentinel.classList.add(FOCUS_SENTINEL_CLASS);
            return sentinel;
        };
        return FocusTrap;
    }());

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var _a$1;
    var cssClasses$n = {
        LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
        LIST_ITEM_CLASS: 'mdc-list-item',
        LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
        LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
        LIST_ITEM_TEXT_CLASS: 'mdc-list-item__text',
        LIST_ITEM_PRIMARY_TEXT_CLASS: 'mdc-list-item__primary-text',
        ROOT: 'mdc-list',
    };
    var strings$r = {
        ACTION_EVENT: 'MDCList:action',
        ARIA_CHECKED: 'aria-checked',
        ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
        ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
        ARIA_CURRENT: 'aria-current',
        ARIA_DISABLED: 'aria-disabled',
        ARIA_ORIENTATION: 'aria-orientation',
        ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
        ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
        ARIA_SELECTED: 'aria-selected',
        ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
        ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
        CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
        CHECKBOX_SELECTOR: 'input[type="checkbox"]',
        CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: 'button:not(:disabled), a',
        FOCUSABLE_CHILD_ELEMENTS: 'button:not(:disabled), a, input[type="radio"]:not(:disabled), input[type="checkbox"]:not(:disabled)',
        RADIO_SELECTOR: 'input[type="radio"]',
        SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    };
    var numbers$9 = {
        UNSET_INDEX: -1,
        TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
    };
    var evolutionClassNameMap = (_a$1 = {},
        _a$1["" + cssClasses$n.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-evolution-list-item--activated',
        _a$1["" + cssClasses$n.LIST_ITEM_CLASS] = 'mdc-evolution-list-item',
        _a$1["" + cssClasses$n.LIST_ITEM_DISABLED_CLASS] = 'mdc-evolution-list-item--disabled',
        _a$1["" + cssClasses$n.LIST_ITEM_SELECTED_CLASS] = 'mdc-evolution-list-item--selected',
        _a$1["" + cssClasses$n.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-evolution-list-item__primary-text',
        _a$1["" + cssClasses$n.ROOT] = 'mdc-evolution-list',
        _a$1);
    var evolutionAttribute = 'evolution';

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * KEY provides normalized string values for keys.
     */
    var KEY = {
        UNKNOWN: 'Unknown',
        BACKSPACE: 'Backspace',
        ENTER: 'Enter',
        SPACEBAR: 'Spacebar',
        PAGE_UP: 'PageUp',
        PAGE_DOWN: 'PageDown',
        END: 'End',
        HOME: 'Home',
        ARROW_LEFT: 'ArrowLeft',
        ARROW_UP: 'ArrowUp',
        ARROW_RIGHT: 'ArrowRight',
        ARROW_DOWN: 'ArrowDown',
        DELETE: 'Delete',
        ESCAPE: 'Escape',
    };
    var normalizedKeys = new Set();
    // IE11 has no support for new Map with iterable so we need to initialize this
    // by hand.
    normalizedKeys.add(KEY.BACKSPACE);
    normalizedKeys.add(KEY.ENTER);
    normalizedKeys.add(KEY.SPACEBAR);
    normalizedKeys.add(KEY.PAGE_UP);
    normalizedKeys.add(KEY.PAGE_DOWN);
    normalizedKeys.add(KEY.END);
    normalizedKeys.add(KEY.HOME);
    normalizedKeys.add(KEY.ARROW_LEFT);
    normalizedKeys.add(KEY.ARROW_UP);
    normalizedKeys.add(KEY.ARROW_RIGHT);
    normalizedKeys.add(KEY.ARROW_DOWN);
    normalizedKeys.add(KEY.DELETE);
    normalizedKeys.add(KEY.ESCAPE);
    var KEY_CODE = {
        BACKSPACE: 8,
        ENTER: 13,
        SPACEBAR: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        DELETE: 46,
        ESCAPE: 27,
    };
    var mappedKeyCodes = new Map();
    // IE11 has no support for new Map with iterable so we need to initialize this
    // by hand.
    mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
    mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
    mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
    mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
    mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
    mappedKeyCodes.set(KEY_CODE.END, KEY.END);
    mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
    mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
    mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
    mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
    mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
    mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
    mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
    var navigationKeys$1 = new Set();
    // IE11 has no support for new Set with iterable so we need to initialize this
    // by hand.
    navigationKeys$1.add(KEY.PAGE_UP);
    navigationKeys$1.add(KEY.PAGE_DOWN);
    navigationKeys$1.add(KEY.END);
    navigationKeys$1.add(KEY.HOME);
    navigationKeys$1.add(KEY.ARROW_LEFT);
    navigationKeys$1.add(KEY.ARROW_UP);
    navigationKeys$1.add(KEY.ARROW_RIGHT);
    navigationKeys$1.add(KEY.ARROW_DOWN);
    /**
     * normalizeKey returns the normalized string for a navigational action.
     */
    function normalizeKey(evt) {
        var key = evt.key;
        // If the event already has a normalized key, return it
        if (normalizedKeys.has(key)) {
            return key;
        }
        // tslint:disable-next-line:deprecation
        var mappedKey = mappedKeyCodes.get(evt.keyCode);
        if (mappedKey) {
            return mappedKey;
        }
        return KEY.UNKNOWN;
    }
    /**
     * isNavigationEvent returns whether the event is a navigation event
     */
    function isNavigationEvent(evt) {
        return navigationKeys$1.has(normalizeKey(evt));
    }

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];
    /**
     * Ensures that preventDefault is only called if the containing element
     * doesn't consume the event, and it will cause an unintended scroll.
     *
     * @param evt keyboard event to be prevented.
     */
    var preventDefaultEvent = function (evt) {
        var target = evt.target;
        if (!target) {
            return;
        }
        var tagName = ("" + target.tagName).toLowerCase();
        if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
            evt.preventDefault();
        }
    };

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * Initializes a state object for typeahead. Use the same reference for calls to
     * typeahead functions.
     *
     * @return The current state of the typeahead process. Each state reference
     *     represents a typeahead instance as the reference is typically mutated
     *     in-place.
     */
    function initState() {
        var state = {
            bufferClearTimeout: 0,
            currentFirstChar: '',
            sortedIndexCursor: 0,
            typeaheadBuffer: '',
        };
        return state;
    }
    /**
     * Initializes typeahead state by indexing the current list items by primary
     * text into the sortedIndexByFirstChar data structure.
     *
     * @param listItemCount numer of items in the list
     * @param getPrimaryTextByItemIndex function that returns the primary text at a
     *     given index
     *
     * @return Map that maps the first character of the primary text to the full
     *     list text and it's index
     */
    function initSortedIndex(listItemCount, getPrimaryTextByItemIndex) {
        var sortedIndexByFirstChar = new Map();
        // Aggregate item text to index mapping
        for (var i = 0; i < listItemCount; i++) {
            var primaryText = getPrimaryTextByItemIndex(i).trim();
            if (!primaryText) {
                continue;
            }
            var firstChar = primaryText[0].toLowerCase();
            if (!sortedIndexByFirstChar.has(firstChar)) {
                sortedIndexByFirstChar.set(firstChar, []);
            }
            sortedIndexByFirstChar.get(firstChar).push({ text: primaryText.toLowerCase(), index: i });
        }
        // Sort the mapping
        // TODO(b/157162694): Investigate replacing forEach with Map.values()
        sortedIndexByFirstChar.forEach(function (values) {
            values.sort(function (first, second) {
                return first.index - second.index;
            });
        });
        return sortedIndexByFirstChar;
    }
    /**
     * Given the next desired character from the user, it attempts to find the next
     * list option matching the buffer. Wraps around if at the end of options.
     *
     * @param opts Options and accessors
     *   - nextChar - the next character to match against items
     *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
     *   - focusedItemIndex - the index of the currently focused item
     *   - focusItemAtIndex - function that focuses a list item at given index
     *   - skipFocus - whether or not to focus the matched item
     *   - isItemAtIndexDisabled - function that determines whether an item at a
     *        given index is disabled
     * @param state The typeahead state instance. See `initState`.
     *
     * @return The index of the matched item, or -1 if no match.
     */
    function matchItem(opts, state) {
        var nextChar = opts.nextChar, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, focusedItemIndex = opts.focusedItemIndex, skipFocus = opts.skipFocus, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
        clearTimeout(state.bufferClearTimeout);
        state.bufferClearTimeout = setTimeout(function () {
            clearBuffer(state);
        }, numbers$9.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS);
        state.typeaheadBuffer = state.typeaheadBuffer + nextChar;
        var index;
        if (state.typeaheadBuffer.length === 1) {
            index = matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state);
        }
        else {
            index = matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state);
        }
        if (index !== -1 && !skipFocus) {
            focusItemAtIndex(index);
        }
        return index;
    }
    /**
     * Matches the user's single input character in the buffer to the
     * next option that begins with such character. Wraps around if at
     * end of options. Returns -1 if no match is found.
     */
    function matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state) {
        var firstChar = state.typeaheadBuffer[0];
        var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
        if (!itemsMatchingFirstChar) {
            return -1;
        }
        // Has the same firstChar been recently matched?
        // Also, did starting index remain the same between key presses?
        // If both hold true, simply increment index.
        if (firstChar === state.currentFirstChar &&
            itemsMatchingFirstChar[state.sortedIndexCursor].index ===
                focusedItemIndex) {
            state.sortedIndexCursor =
                (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
            var newIndex = itemsMatchingFirstChar[state.sortedIndexCursor].index;
            if (!isItemAtIndexDisabled(newIndex)) {
                return newIndex;
            }
        }
        // If we're here, it means one of the following happened:
        // - either firstChar or startingIndex has changed, invalidating the
        // cursor.
        // - The next item of typeahead is disabled, so we have to look further.
        state.currentFirstChar = firstChar;
        var newCursorPosition = -1;
        var cursorPosition;
        // Find the first non-disabled item as a fallback.
        for (cursorPosition = 0; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
            if (!isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
                newCursorPosition = cursorPosition;
                break;
            }
        }
        // Advance cursor to first item matching the firstChar that is positioned
        // after starting item. Cursor is unchanged from fallback if there's no
        // such item.
        for (; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
            if (itemsMatchingFirstChar[cursorPosition].index > focusedItemIndex &&
                !isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
                newCursorPosition = cursorPosition;
                break;
            }
        }
        if (newCursorPosition !== -1) {
            state.sortedIndexCursor = newCursorPosition;
            return itemsMatchingFirstChar[state.sortedIndexCursor].index;
        }
        return -1;
    }
    /**
     * Attempts to find the next item that matches all of the typeahead buffer.
     * Wraps around if at end of options. Returns -1 if no match is found.
     */
    function matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state) {
        var firstChar = state.typeaheadBuffer[0];
        var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
        if (!itemsMatchingFirstChar) {
            return -1;
        }
        // Do nothing if text already matches
        var startingItem = itemsMatchingFirstChar[state.sortedIndexCursor];
        if (startingItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0 &&
            !isItemAtIndexDisabled(startingItem.index)) {
            return startingItem.index;
        }
        // Find next item that matches completely; if no match, we'll eventually
        // loop around to same position
        var cursorPosition = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
        var nextCursorPosition = -1;
        while (cursorPosition !== state.sortedIndexCursor) {
            var currentItem = itemsMatchingFirstChar[cursorPosition];
            var matches = currentItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0;
            var isEnabled = !isItemAtIndexDisabled(currentItem.index);
            if (matches && isEnabled) {
                nextCursorPosition = cursorPosition;
                break;
            }
            cursorPosition = (cursorPosition + 1) % itemsMatchingFirstChar.length;
        }
        if (nextCursorPosition !== -1) {
            state.sortedIndexCursor = nextCursorPosition;
            return itemsMatchingFirstChar[state.sortedIndexCursor].index;
        }
        return -1;
    }
    /**
     * Whether or not the given typeahead instaance state is currently typing.
     *
     * @param state The typeahead state instance. See `initState`.
     */
    function isTypingInProgress(state) {
        return state.typeaheadBuffer.length > 0;
    }
    /**
     * Clears the typeahaed buffer so that it resets item matching to the first
     * character.
     *
     * @param state The typeahead state instance. See `initState`.
     */
    function clearBuffer(state) {
        state.typeaheadBuffer = '';
    }
    /**
     * Given a keydown event, it calculates whether or not to automatically focus a
     * list item depending on what was typed mimicing the typeahead functionality of
     * a standard <select> element that is open.
     *
     * @param opts Options and accessors
     *   - event - the KeyboardEvent to handle and parse
     *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
     *   - focusedItemIndex - the index of the currently focused item
     *   - focusItemAtIndex - function that focuses a list item at given index
     *   - isItemAtFocusedIndexDisabled - whether or not the currently focused item
     *      is disabled
     *   - isTargetListItem - whether or not the event target is a list item
     * @param state The typeahead state instance. See `initState`.
     *
     * @returns index of the item matched by the keydown. -1 if not matched.
     */
    function handleKeydown(opts, state) {
        var event = opts.event, isTargetListItem = opts.isTargetListItem, focusedItemIndex = opts.focusedItemIndex, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
        var isArrowLeft = normalizeKey(event) === 'ArrowLeft';
        var isArrowUp = normalizeKey(event) === 'ArrowUp';
        var isArrowRight = normalizeKey(event) === 'ArrowRight';
        var isArrowDown = normalizeKey(event) === 'ArrowDown';
        var isHome = normalizeKey(event) === 'Home';
        var isEnd = normalizeKey(event) === 'End';
        var isEnter = normalizeKey(event) === 'Enter';
        var isSpace = normalizeKey(event) === 'Spacebar';
        if (isArrowLeft || isArrowUp || isArrowRight || isArrowDown || isHome ||
            isEnd || isEnter) {
            return -1;
        }
        var isCharacterKey = !isSpace && event.key.length === 1;
        if (isCharacterKey) {
            preventDefaultEvent(event);
            var matchItemOpts = {
                focusItemAtIndex: focusItemAtIndex,
                focusedItemIndex: focusedItemIndex,
                nextChar: event.key.toLowerCase(),
                sortedIndexByFirstChar: sortedIndexByFirstChar,
                skipFocus: false,
                isItemAtIndexDisabled: isItemAtIndexDisabled,
            };
            return matchItem(matchItemOpts, state);
        }
        if (!isSpace) {
            return -1;
        }
        if (isTargetListItem) {
            preventDefaultEvent(event);
        }
        var typeaheadOnListItem = isTargetListItem && isTypingInProgress(state);
        if (typeaheadOnListItem) {
            var matchItemOpts = {
                focusItemAtIndex: focusItemAtIndex,
                focusedItemIndex: focusedItemIndex,
                nextChar: ' ',
                sortedIndexByFirstChar: sortedIndexByFirstChar,
                skipFocus: false,
                isItemAtIndexDisabled: isItemAtIndexDisabled,
            };
            // space participates in typeahead matching if in rapid typing mode
            return matchItem(matchItemOpts, state);
        }
        return -1;
    }

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    function isNumberArray(selectedIndex) {
        return selectedIndex instanceof Array;
    }
    var MDCListFoundation = /** @class */ (function (_super) {
        __extends(MDCListFoundation, _super);
        function MDCListFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCListFoundation.defaultAdapter), adapter)) || this;
            _this.wrapFocus_ = false;
            _this.isVertical_ = true;
            _this.isSingleSelectionList_ = false;
            _this.selectedIndex_ = numbers$9.UNSET_INDEX;
            _this.focusedItemIndex = numbers$9.UNSET_INDEX;
            _this.useActivatedClass_ = false;
            _this.useSelectedAttr_ = false;
            _this.ariaCurrentAttrValue_ = null;
            _this.isCheckboxList_ = false;
            _this.isRadioList_ = false;
            _this.hasTypeahead = false;
            // Transiently holds current typeahead prefix from user.
            _this.typeaheadState = initState();
            _this.sortedIndexByFirstChar = new Map();
            return _this;
        }
        Object.defineProperty(MDCListFoundation, "strings", {
            get: function () {
                return strings$r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCListFoundation, "cssClasses", {
            get: function () {
                return cssClasses$n;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCListFoundation, "numbers", {
            get: function () {
                return numbers$9;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCListFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClassForElementIndex: function () { return undefined; },
                    focusItemAtIndex: function () { return undefined; },
                    getAttributeForElementIndex: function () { return null; },
                    getFocusedElementIndex: function () { return 0; },
                    getListItemCount: function () { return 0; },
                    hasCheckboxAtIndex: function () { return false; },
                    hasRadioAtIndex: function () { return false; },
                    isCheckboxCheckedAtIndex: function () { return false; },
                    isFocusInsideList: function () { return false; },
                    isRootFocused: function () { return false; },
                    listItemAtIndexHasClass: function () { return false; },
                    notifyAction: function () { return undefined; },
                    removeClassForElementIndex: function () { return undefined; },
                    setAttributeForElementIndex: function () { return undefined; },
                    setCheckedCheckboxOrRadioAtIndex: function () { return undefined; },
                    setTabIndexForListItemChildren: function () { return undefined; },
                    getPrimaryTextAtIndex: function () { return ''; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCListFoundation.prototype.layout = function () {
            if (this.adapter.getListItemCount() === 0) {
                return;
            }
            // TODO(b/172274142): consider all items when determining the list's type.
            if (this.adapter.hasCheckboxAtIndex(0)) {
                this.isCheckboxList_ = true;
            }
            else if (this.adapter.hasRadioAtIndex(0)) {
                this.isRadioList_ = true;
            }
            else {
                this.maybeInitializeSingleSelection();
            }
            if (this.hasTypeahead) {
                this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
            }
        };
        /**
         * Sets the private wrapFocus_ variable.
         */
        MDCListFoundation.prototype.setWrapFocus = function (value) {
            this.wrapFocus_ = value;
        };
        /**
         * Sets the isVertical_ private variable.
         */
        MDCListFoundation.prototype.setVerticalOrientation = function (value) {
            this.isVertical_ = value;
        };
        /**
         * Sets the isSingleSelectionList_ private variable.
         */
        MDCListFoundation.prototype.setSingleSelection = function (value) {
            this.isSingleSelectionList_ = value;
            if (value) {
                this.maybeInitializeSingleSelection();
            }
        };
        /**
         * Automatically determines whether the list is single selection list. If so,
         * initializes the internal state to match the selected item.
         */
        MDCListFoundation.prototype.maybeInitializeSingleSelection = function () {
            var listItemsCount = this.adapter.getListItemCount();
            for (var i = 0; i < listItemsCount; i++) {
                var hasSelectedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$n.LIST_ITEM_SELECTED_CLASS);
                var hasActivatedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$n.LIST_ITEM_ACTIVATED_CLASS);
                if (!(hasSelectedClass || hasActivatedClass)) {
                    continue;
                }
                if (hasActivatedClass) {
                    this.setUseActivatedClass(true);
                }
                this.isSingleSelectionList_ = true;
                this.selectedIndex_ = i;
                return;
            }
        };
        /**
         * Sets whether typeahead is enabled on the list.
         * @param hasTypeahead Whether typeahead is enabled.
         */
        MDCListFoundation.prototype.setHasTypeahead = function (hasTypeahead) {
            this.hasTypeahead = hasTypeahead;
            if (hasTypeahead) {
                this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
            }
        };
        /**
         * @return Whether typeahead is currently matching a user-specified prefix.
         */
        MDCListFoundation.prototype.isTypeaheadInProgress = function () {
            return this.hasTypeahead &&
                isTypingInProgress(this.typeaheadState);
        };
        /**
         * Sets the useActivatedClass_ private variable.
         */
        MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
            this.useActivatedClass_ = useActivated;
        };
        /**
         * Sets the useSelectedAttr_ private variable.
         */
        MDCListFoundation.prototype.setUseSelectedAttribute = function (useSelected) {
            this.useSelectedAttr_ = useSelected;
        };
        MDCListFoundation.prototype.getSelectedIndex = function () {
            return this.selectedIndex_;
        };
        MDCListFoundation.prototype.setSelectedIndex = function (index) {
            if (!this.isIndexValid_(index)) {
                return;
            }
            if (this.isCheckboxList_) {
                this.setCheckboxAtIndex_(index);
            }
            else if (this.isRadioList_) {
                this.setRadioAtIndex_(index);
            }
            else {
                this.setSingleSelectionAtIndex_(index);
            }
        };
        /**
         * Focus in handler for the list items.
         */
        MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
            if (listItemIndex >= 0) {
                this.focusedItemIndex = listItemIndex;
                this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '0');
                this.adapter.setTabIndexForListItemChildren(listItemIndex, '0');
            }
        };
        /**
         * Focus out handler for the list items.
         */
        MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
            var _this = this;
            if (listItemIndex >= 0) {
                this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '-1');
                this.adapter.setTabIndexForListItemChildren(listItemIndex, '-1');
            }
            /**
             * Between Focusout & Focusin some browsers do not have focus on any
             * element. Setting a delay to wait till the focus is moved to next element.
             */
            setTimeout(function () {
                if (!_this.adapter.isFocusInsideList()) {
                    _this.setTabindexToFirstSelectedOrFocusedItem();
                }
            }, 0);
        };
        /**
         * Key handler for the list.
         */
        MDCListFoundation.prototype.handleKeydown = function (event, isRootListItem, listItemIndex) {
            var _this = this;
            var isArrowLeft = normalizeKey(event) === 'ArrowLeft';
            var isArrowUp = normalizeKey(event) === 'ArrowUp';
            var isArrowRight = normalizeKey(event) === 'ArrowRight';
            var isArrowDown = normalizeKey(event) === 'ArrowDown';
            var isHome = normalizeKey(event) === 'Home';
            var isEnd = normalizeKey(event) === 'End';
            var isEnter = normalizeKey(event) === 'Enter';
            var isSpace = normalizeKey(event) === 'Spacebar';
            // Have to check both upper and lower case, because having caps lock on affects the value.
            var isLetterA = event.key === 'A' || event.key === 'a';
            if (this.adapter.isRootFocused()) {
                if (isArrowUp || isEnd) {
                    event.preventDefault();
                    this.focusLastElement();
                }
                else if (isArrowDown || isHome) {
                    event.preventDefault();
                    this.focusFirstElement();
                }
                if (this.hasTypeahead) {
                    var handleKeydownOpts = {
                        event: event,
                        focusItemAtIndex: function (index) {
                            _this.focusItemAtIndex(index);
                        },
                        focusedItemIndex: -1,
                        isTargetListItem: isRootListItem,
                        sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                        isItemAtIndexDisabled: function (index) {
                            return _this.adapter.listItemAtIndexHasClass(index, cssClasses$n.LIST_ITEM_DISABLED_CLASS);
                        },
                    };
                    handleKeydown(handleKeydownOpts, this.typeaheadState);
                }
                return;
            }
            var currentIndex = this.adapter.getFocusedElementIndex();
            if (currentIndex === -1) {
                currentIndex = listItemIndex;
                if (currentIndex < 0) {
                    // If this event doesn't have a mdc-list-item ancestor from the
                    // current list (not from a sublist), return early.
                    return;
                }
            }
            if ((this.isVertical_ && isArrowDown) ||
                (!this.isVertical_ && isArrowRight)) {
                preventDefaultEvent(event);
                this.focusNextElement(currentIndex);
            }
            else if ((this.isVertical_ && isArrowUp) || (!this.isVertical_ && isArrowLeft)) {
                preventDefaultEvent(event);
                this.focusPrevElement(currentIndex);
            }
            else if (isHome) {
                preventDefaultEvent(event);
                this.focusFirstElement();
            }
            else if (isEnd) {
                preventDefaultEvent(event);
                this.focusLastElement();
            }
            else if (isLetterA && event.ctrlKey && this.isCheckboxList_) {
                event.preventDefault();
                this.toggleAll(this.selectedIndex_ === numbers$9.UNSET_INDEX ? [] : this.selectedIndex_);
            }
            else if (isEnter || isSpace) {
                if (isRootListItem) {
                    // Return early if enter key is pressed on anchor element which triggers
                    // synthetic MouseEvent event.
                    var target = event.target;
                    if (target && target.tagName === 'A' && isEnter) {
                        return;
                    }
                    preventDefaultEvent(event);
                    if (this.adapter.listItemAtIndexHasClass(currentIndex, cssClasses$n.LIST_ITEM_DISABLED_CLASS)) {
                        return;
                    }
                    if (!this.isTypeaheadInProgress()) {
                        if (this.isSelectableList_()) {
                            this.setSelectedIndexOnAction_(currentIndex);
                        }
                        this.adapter.notifyAction(currentIndex);
                    }
                }
            }
            if (this.hasTypeahead) {
                var handleKeydownOpts = {
                    event: event,
                    focusItemAtIndex: function (index) {
                        _this.focusItemAtIndex(index);
                    },
                    focusedItemIndex: this.focusedItemIndex,
                    isTargetListItem: isRootListItem,
                    sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                    isItemAtIndexDisabled: function (index) { return _this.adapter.listItemAtIndexHasClass(index, cssClasses$n.LIST_ITEM_DISABLED_CLASS); },
                };
                handleKeydown(handleKeydownOpts, this.typeaheadState);
            }
        };
        /**
         * Click handler for the list.
         */
        MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
            if (index === numbers$9.UNSET_INDEX) {
                return;
            }
            if (this.adapter.listItemAtIndexHasClass(index, cssClasses$n.LIST_ITEM_DISABLED_CLASS)) {
                return;
            }
            if (this.isSelectableList_()) {
                this.setSelectedIndexOnAction_(index, toggleCheckbox);
            }
            this.adapter.notifyAction(index);
        };
        /**
         * Focuses the next element on the list.
         */
        MDCListFoundation.prototype.focusNextElement = function (index) {
            var count = this.adapter.getListItemCount();
            var nextIndex = index + 1;
            if (nextIndex >= count) {
                if (this.wrapFocus_) {
                    nextIndex = 0;
                }
                else {
                    // Return early because last item is already focused.
                    return index;
                }
            }
            this.focusItemAtIndex(nextIndex);
            return nextIndex;
        };
        /**
         * Focuses the previous element on the list.
         */
        MDCListFoundation.prototype.focusPrevElement = function (index) {
            var prevIndex = index - 1;
            if (prevIndex < 0) {
                if (this.wrapFocus_) {
                    prevIndex = this.adapter.getListItemCount() - 1;
                }
                else {
                    // Return early because first item is already focused.
                    return index;
                }
            }
            this.focusItemAtIndex(prevIndex);
            return prevIndex;
        };
        MDCListFoundation.prototype.focusFirstElement = function () {
            this.focusItemAtIndex(0);
            return 0;
        };
        MDCListFoundation.prototype.focusLastElement = function () {
            var lastIndex = this.adapter.getListItemCount() - 1;
            this.focusItemAtIndex(lastIndex);
            return lastIndex;
        };
        MDCListFoundation.prototype.focusInitialElement = function () {
            var initialIndex = this.getFirstSelectedOrFocusedItemIndex();
            this.focusItemAtIndex(initialIndex);
            return initialIndex;
        };
        /**
         * @param itemIndex Index of the list item
         * @param isEnabled Sets the list item to enabled or disabled.
         */
        MDCListFoundation.prototype.setEnabled = function (itemIndex, isEnabled) {
            if (!this.isIndexValid_(itemIndex)) {
                return;
            }
            if (isEnabled) {
                this.adapter.removeClassForElementIndex(itemIndex, cssClasses$n.LIST_ITEM_DISABLED_CLASS);
                this.adapter.setAttributeForElementIndex(itemIndex, strings$r.ARIA_DISABLED, 'false');
            }
            else {
                this.adapter.addClassForElementIndex(itemIndex, cssClasses$n.LIST_ITEM_DISABLED_CLASS);
                this.adapter.setAttributeForElementIndex(itemIndex, strings$r.ARIA_DISABLED, 'true');
            }
        };
        MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
            if (this.selectedIndex_ === index) {
                return;
            }
            var selectedClassName = cssClasses$n.LIST_ITEM_SELECTED_CLASS;
            if (this.useActivatedClass_) {
                selectedClassName = cssClasses$n.LIST_ITEM_ACTIVATED_CLASS;
            }
            if (this.selectedIndex_ !== numbers$9.UNSET_INDEX) {
                this.adapter.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
            }
            this.setAriaForSingleSelectionAtIndex_(index);
            this.setTabindexAtIndex(index);
            if (index !== numbers$9.UNSET_INDEX) {
                this.adapter.addClassForElementIndex(index, selectedClassName);
            }
            this.selectedIndex_ = index;
        };
        /**
         * Sets aria attribute for single selection at given index.
         */
        MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
            // Detect the presence of aria-current and get the value only during list
            // initialization when it is in unset state.
            if (this.selectedIndex_ === numbers$9.UNSET_INDEX) {
                this.ariaCurrentAttrValue_ =
                    this.adapter.getAttributeForElementIndex(index, strings$r.ARIA_CURRENT);
            }
            var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
            var ariaAttribute = isAriaCurrent ? strings$r.ARIA_CURRENT : strings$r.ARIA_SELECTED;
            if (this.selectedIndex_ !== numbers$9.UNSET_INDEX) {
                this.adapter.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
            }
            if (index !== numbers$9.UNSET_INDEX) {
                var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
                this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
            }
        };
        /**
         * Returns the attribute to use for indicating selection status.
         */
        MDCListFoundation.prototype.getSelectionAttribute = function () {
            return this.useSelectedAttr_ ? strings$r.ARIA_SELECTED : strings$r.ARIA_CHECKED;
        };
        /**
         * Toggles radio at give index. Radio doesn't change the checked state if it
         * is already checked.
         */
        MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
            var selectionAttribute = this.getSelectionAttribute();
            this.adapter.setCheckedCheckboxOrRadioAtIndex(index, true);
            if (this.selectedIndex_ !== numbers$9.UNSET_INDEX) {
                this.adapter.setAttributeForElementIndex(this.selectedIndex_, selectionAttribute, 'false');
            }
            this.adapter.setAttributeForElementIndex(index, selectionAttribute, 'true');
            this.selectedIndex_ = index;
        };
        MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
            var selectionAttribute = this.getSelectionAttribute();
            for (var i = 0; i < this.adapter.getListItemCount(); i++) {
                var isChecked = false;
                if (index.indexOf(i) >= 0) {
                    isChecked = true;
                }
                this.adapter.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
                this.adapter.setAttributeForElementIndex(i, selectionAttribute, isChecked ? 'true' : 'false');
            }
            this.selectedIndex_ = index;
        };
        MDCListFoundation.prototype.setTabindexAtIndex = function (index) {
            if (this.focusedItemIndex === numbers$9.UNSET_INDEX && index !== 0) {
                // If some list item was selected set first list item's tabindex to -1.
                // Generally, tabindex is set to 0 on first list item of list that has no
                // preselected items.
                this.adapter.setAttributeForElementIndex(0, 'tabindex', '-1');
            }
            else if (this.focusedItemIndex >= 0 && this.focusedItemIndex !== index) {
                this.adapter.setAttributeForElementIndex(this.focusedItemIndex, 'tabindex', '-1');
            }
            // Set the previous selection's tabindex to -1. We need this because
            // in selection menus that are not visible, programmatically setting an
            // option will not change focus but will change where tabindex should be 0.
            if (!(this.selectedIndex_ instanceof Array) &&
                this.selectedIndex_ !== index) {
                this.adapter.setAttributeForElementIndex(this.selectedIndex_, 'tabindex', '-1');
            }
            if (index !== numbers$9.UNSET_INDEX) {
                this.adapter.setAttributeForElementIndex(index, 'tabindex', '0');
            }
        };
        /**
         * @return Return true if it is single selectin list, checkbox list or radio
         *     list.
         */
        MDCListFoundation.prototype.isSelectableList_ = function () {
            return this.isSingleSelectionList_ || this.isCheckboxList_ ||
                this.isRadioList_;
        };
        MDCListFoundation.prototype.setTabindexToFirstSelectedOrFocusedItem = function () {
            var targetIndex = this.getFirstSelectedOrFocusedItemIndex();
            this.setTabindexAtIndex(targetIndex);
        };
        MDCListFoundation.prototype.getFirstSelectedOrFocusedItemIndex = function () {
            var targetIndex = this.focusedItemIndex >= 0 ? this.focusedItemIndex : 0;
            if (this.isSelectableList_()) {
                if (typeof this.selectedIndex_ === 'number' &&
                    this.selectedIndex_ !== numbers$9.UNSET_INDEX) {
                    targetIndex = this.selectedIndex_;
                }
                else if (isNumberArray(this.selectedIndex_) &&
                    this.selectedIndex_.length > 0) {
                    targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) { return Math.min(currentIndex, minIndex); });
                }
            }
            return targetIndex;
        };
        MDCListFoundation.prototype.isIndexValid_ = function (index) {
            var _this = this;
            if (index instanceof Array) {
                if (!this.isCheckboxList_) {
                    throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
                }
                if (index.length === 0) {
                    return true;
                }
                else {
                    return index.some(function (i) { return _this.isIndexInRange_(i); });
                }
            }
            else if (typeof index === 'number') {
                if (this.isCheckboxList_) {
                    throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
                }
                return this.isIndexInRange_(index) ||
                    this.isSingleSelectionList_ && index === numbers$9.UNSET_INDEX;
            }
            else {
                return false;
            }
        };
        MDCListFoundation.prototype.isIndexInRange_ = function (index) {
            var listSize = this.adapter.getListItemCount();
            return index >= 0 && index < listSize;
        };
        /**
         * Sets selected index on user action, toggles checkbox / radio based on
         * toggleCheckbox value. User interaction should not toggle list item(s) when
         * disabled.
         */
        MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
            if (toggleCheckbox === void 0) { toggleCheckbox = true; }
            if (this.isCheckboxList_) {
                this.toggleCheckboxAtIndex_(index, toggleCheckbox);
            }
            else {
                this.setSelectedIndex(index);
            }
        };
        MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
            var selectionAttribute = this.getSelectionAttribute();
            var isChecked = this.adapter.isCheckboxCheckedAtIndex(index);
            if (toggleCheckbox) {
                isChecked = !isChecked;
                this.adapter.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
            }
            this.adapter.setAttributeForElementIndex(index, selectionAttribute, isChecked ? 'true' : 'false');
            // If none of the checkbox items are selected and selectedIndex is not
            // initialized then provide a default value.
            var selectedIndexes = this.selectedIndex_ === numbers$9.UNSET_INDEX ?
                [] :
                this.selectedIndex_.slice();
            if (isChecked) {
                selectedIndexes.push(index);
            }
            else {
                selectedIndexes = selectedIndexes.filter(function (i) { return i !== index; });
            }
            this.selectedIndex_ = selectedIndexes;
        };
        MDCListFoundation.prototype.focusItemAtIndex = function (index) {
            this.adapter.focusItemAtIndex(index);
            this.focusedItemIndex = index;
        };
        MDCListFoundation.prototype.toggleAll = function (currentlySelectedIndexes) {
            var count = this.adapter.getListItemCount();
            // If all items are selected, deselect everything.
            if (currentlySelectedIndexes.length === count) {
                this.setCheckboxAtIndex_([]);
            }
            else {
                // Otherwise select all enabled options.
                var allIndexes = [];
                for (var i = 0; i < count; i++) {
                    if (!this.adapter.listItemAtIndexHasClass(i, cssClasses$n.LIST_ITEM_DISABLED_CLASS) ||
                        currentlySelectedIndexes.indexOf(i) > -1) {
                        allIndexes.push(i);
                    }
                }
                this.setCheckboxAtIndex_(allIndexes);
            }
        };
        /**
         * Given the next desired character from the user, adds it to the typeahead
         * buffer. Then, attempts to find the next option matching the buffer. Wraps
         * around if at the end of options.
         *
         * @param nextChar The next character to add to the prefix buffer.
         * @param startingIndex The index from which to start matching. Only relevant
         *     when starting a new match sequence. To start a new match sequence,
         *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
         *     to clear after a set interval defined in list foundation. Defaults to
         *     the currently focused index.
         * @return The index of the matched item, or -1 if no match.
         */
        MDCListFoundation.prototype.typeaheadMatchItem = function (nextChar, startingIndex, skipFocus) {
            var _this = this;
            if (skipFocus === void 0) { skipFocus = false; }
            var opts = {
                focusItemAtIndex: function (index) {
                    _this.focusItemAtIndex(index);
                },
                focusedItemIndex: startingIndex ? startingIndex : this.focusedItemIndex,
                nextChar: nextChar,
                sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                skipFocus: skipFocus,
                isItemAtIndexDisabled: function (index) { return _this.adapter.listItemAtIndexHasClass(index, cssClasses$n.LIST_ITEM_DISABLED_CLASS); }
            };
            return matchItem(opts, this.typeaheadState);
        };
        /**
         * Initializes the MDCListTextAndIndex data structure by indexing the current
         * list items by primary text.
         *
         * @return The primary texts of all the list items sorted by first character.
         */
        MDCListFoundation.prototype.typeaheadInitSortedIndex = function () {
            return initSortedIndex(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
        };
        /**
         * Clears the typeahead buffer.
         */
        MDCListFoundation.prototype.clearTypeaheadBuffer = function () {
            clearBuffer(this.typeaheadState);
        };
        return MDCListFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCList = /** @class */ (function (_super) {
        __extends(MDCList, _super);
        function MDCList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MDCList.prototype, "vertical", {
            set: function (value) {
                this.foundation.setVerticalOrientation(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCList.prototype, "listElements", {
            get: function () {
                return Array.from(this.root.querySelectorAll("." + this.classNameMap[cssClasses$n.LIST_ITEM_CLASS]));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCList.prototype, "wrapFocus", {
            set: function (value) {
                this.foundation.setWrapFocus(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCList.prototype, "typeaheadInProgress", {
            /**
             * @return Whether typeahead is currently matching a user-specified prefix.
             */
            get: function () {
                return this.foundation.isTypeaheadInProgress();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCList.prototype, "hasTypeahead", {
            /**
             * Sets whether typeahead functionality is enabled on the list.
             * @param hasTypeahead Whether typeahead is enabled.
             */
            set: function (hasTypeahead) {
                this.foundation.setHasTypeahead(hasTypeahead);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCList.prototype, "singleSelection", {
            set: function (isSingleSelectionList) {
                this.foundation.setSingleSelection(isSingleSelectionList);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCList.prototype, "selectedIndex", {
            get: function () {
                return this.foundation.getSelectedIndex();
            },
            set: function (index) {
                this.foundation.setSelectedIndex(index);
            },
            enumerable: true,
            configurable: true
        });
        MDCList.attachTo = function (root) {
            return new MDCList(root);
        };
        MDCList.prototype.initialSyncWithDOM = function () {
            this.isEvolutionEnabled =
                evolutionAttribute in this.root.dataset;
            this.classNameMap = this.isEvolutionEnabled ?
                evolutionClassNameMap :
                Object.values(cssClasses$n)
                    .reduce(function (obj, className) {
                    obj[className] = className;
                    return obj;
                }, {});
            this.handleClick = this.handleClickEvent.bind(this);
            this.handleKeydown = this.handleKeydownEvent.bind(this);
            this.focusInEventListener = this.handleFocusInEvent.bind(this);
            this.focusOutEventListener = this.handleFocusOutEvent.bind(this);
            this.listen('keydown', this.handleKeydown);
            this.listen('click', this.handleClick);
            this.listen('focusin', this.focusInEventListener);
            this.listen('focusout', this.focusOutEventListener);
            this.layout();
            this.initializeListType();
            this.ensureFocusable();
        };
        MDCList.prototype.destroy = function () {
            this.unlisten('keydown', this.handleKeydown);
            this.unlisten('click', this.handleClick);
            this.unlisten('focusin', this.focusInEventListener);
            this.unlisten('focusout', this.focusOutEventListener);
        };
        MDCList.prototype.layout = function () {
            var direction = this.root.getAttribute(strings$r.ARIA_ORIENTATION);
            this.vertical = direction !== strings$r.ARIA_ORIENTATION_HORIZONTAL;
            var itemSelector = "." + this.classNameMap[cssClasses$n.LIST_ITEM_CLASS] + ":not([tabindex])";
            var childSelector = "." + this.classNameMap[cssClasses$n.LIST_ITEM_CLASS] + " " + strings$r.FOCUSABLE_CHILD_ELEMENTS;
            // List items need to have at least tabindex=-1 to be focusable.
            Array.prototype.forEach.call(this.root.querySelectorAll(itemSelector), function (el) {
                el.setAttribute('tabindex', '-1');
            });
            // Child button/a elements are not tabbable until the list item is focused.
            Array.prototype.forEach.call(this.root.querySelectorAll(childSelector), function (el) {
                el.setAttribute('tabindex', '-1');
            });
            if (this.isEvolutionEnabled) {
                this.foundation.setUseSelectedAttribute(true);
            }
            this.foundation.layout();
        };
        /**
         * Extracts the primary text from a list item.
         * @param item The list item element.
         * @return The primary text in the element.
         */
        MDCList.prototype.getPrimaryText = function (item) {
            var _a;
            var primaryText = item.querySelector("." + this.classNameMap[cssClasses$n.LIST_ITEM_PRIMARY_TEXT_CLASS]);
            if (this.isEvolutionEnabled || primaryText) {
                return (_a = primaryText === null || primaryText === void 0 ? void 0 : primaryText.textContent) !== null && _a !== void 0 ? _a : '';
            }
            var singleLineText = item.querySelector("." + this.classNameMap[cssClasses$n.LIST_ITEM_TEXT_CLASS]);
            return (singleLineText && singleLineText.textContent) || '';
        };
        /**
         * Initialize selectedIndex value based on pre-selected list items.
         */
        MDCList.prototype.initializeListType = function () {
            var _this = this;
            this.isInteractive =
                matches(this.root, strings$r.ARIA_INTERACTIVE_ROLES_SELECTOR);
            if (this.isEvolutionEnabled && this.isInteractive) {
                var selection = Array.from(this.root.querySelectorAll(strings$r.SELECTED_ITEM_SELECTOR), function (listItem) { return _this.listElements.indexOf(listItem); });
                if (matches(this.root, strings$r.ARIA_MULTI_SELECTABLE_SELECTOR)) {
                    this.selectedIndex = selection;
                }
                else if (selection.length > 0) {
                    this.selectedIndex = selection[0];
                }
                return;
            }
            var checkboxListItems = this.root.querySelectorAll(strings$r.ARIA_ROLE_CHECKBOX_SELECTOR);
            var radioSelectedListItem = this.root.querySelector(strings$r.ARIA_CHECKED_RADIO_SELECTOR);
            if (checkboxListItems.length) {
                var preselectedItems = this.root.querySelectorAll(strings$r.ARIA_CHECKED_CHECKBOX_SELECTOR);
                this.selectedIndex = Array.from(preselectedItems, function (listItem) { return _this.listElements.indexOf(listItem); });
            }
            else if (radioSelectedListItem) {
                this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
            }
        };
        /**
         * Updates the list item at itemIndex to the desired isEnabled state.
         * @param itemIndex Index of the list item
         * @param isEnabled Sets the list item to enabled or disabled.
         */
        MDCList.prototype.setEnabled = function (itemIndex, isEnabled) {
            this.foundation.setEnabled(itemIndex, isEnabled);
        };
        /**
         * Given the next desired character from the user, adds it to the typeahead
         * buffer. Then, attempts to find the next option matching the buffer. Wraps
         * around if at the end of options.
         *
         * @param nextChar The next character to add to the prefix buffer.
         * @param startingIndex The index from which to start matching. Defaults to
         *     the currently focused index.
         * @return The index of the matched item.
         */
        MDCList.prototype.typeaheadMatchItem = function (nextChar, startingIndex) {
            return this.foundation.typeaheadMatchItem(nextChar, startingIndex, /** skipFocus */ true);
        };
        MDCList.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take
            // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
            // methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                addClassForElementIndex: function (index, className) {
                    var element = _this.listElements[index];
                    if (element) {
                        element.classList.add(_this.classNameMap[className]);
                    }
                },
                focusItemAtIndex: function (index) {
                    var element = _this.listElements[index];
                    if (element) {
                        element.focus();
                    }
                },
                getAttributeForElementIndex: function (index, attr) {
                    return _this.listElements[index].getAttribute(attr);
                },
                getFocusedElementIndex: function () {
                    return _this.listElements.indexOf(document.activeElement);
                },
                getListItemCount: function () { return _this.listElements.length; },
                getPrimaryTextAtIndex: function (index) {
                    return _this.getPrimaryText(_this.listElements[index]);
                },
                hasCheckboxAtIndex: function (index) {
                    var listItem = _this.listElements[index];
                    return !!listItem.querySelector(strings$r.CHECKBOX_SELECTOR);
                },
                hasRadioAtIndex: function (index) {
                    var listItem = _this.listElements[index];
                    return !!listItem.querySelector(strings$r.RADIO_SELECTOR);
                },
                isCheckboxCheckedAtIndex: function (index) {
                    var listItem = _this.listElements[index];
                    var toggleEl = listItem.querySelector(strings$r.CHECKBOX_SELECTOR);
                    return toggleEl.checked;
                },
                isFocusInsideList: function () {
                    return _this.root !== document.activeElement &&
                        _this.root.contains(document.activeElement);
                },
                isRootFocused: function () { return document.activeElement === _this.root; },
                listItemAtIndexHasClass: function (index, className) {
                    return _this.listElements[index].classList.contains(_this.classNameMap[className]);
                },
                notifyAction: function (index) {
                    _this.emit(strings$r.ACTION_EVENT, { index: index }, /** shouldBubble */ true);
                },
                removeClassForElementIndex: function (index, className) {
                    var element = _this.listElements[index];
                    if (element) {
                        element.classList.remove(_this.classNameMap[className]);
                    }
                },
                setAttributeForElementIndex: function (index, attr, value) {
                    var element = _this.listElements[index];
                    if (element) {
                        element.setAttribute(attr, value);
                    }
                },
                setCheckedCheckboxOrRadioAtIndex: function (index, isChecked) {
                    var listItem = _this.listElements[index];
                    var toggleEl = listItem.querySelector(strings$r.CHECKBOX_RADIO_SELECTOR);
                    toggleEl.checked = isChecked;
                    var event = document.createEvent('Event');
                    event.initEvent('change', true, true);
                    toggleEl.dispatchEvent(event);
                },
                setTabIndexForListItemChildren: function (listItemIndex, tabIndexValue) {
                    var element = _this.listElements[listItemIndex];
                    var selector = "." + _this.classNameMap[cssClasses$n.LIST_ITEM_CLASS] + " " + strings$r.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX;
                    Array.prototype.forEach.call(element.querySelectorAll(selector), function (el) {
                        el.setAttribute('tabindex', tabIndexValue);
                    });
                },
            };
            return new MDCListFoundation(adapter);
        };
        /**
         * Ensures that at least one item is focusable if the list is interactive and
         * doesn't specify a suitable tabindex.
         */
        MDCList.prototype.ensureFocusable = function () {
            if (this.isEvolutionEnabled && this.isInteractive) {
                if (!this.root.querySelector("." + this.classNameMap[cssClasses$n.LIST_ITEM_CLASS] + "[tabindex=\"0\"]")) {
                    var index = this.initialFocusIndex();
                    if (index !== -1) {
                        this.listElements[index].tabIndex = 0;
                    }
                }
            }
        };
        MDCList.prototype.initialFocusIndex = function () {
            if (this.selectedIndex instanceof Array && this.selectedIndex.length > 0) {
                return this.selectedIndex[0];
            }
            if (typeof this.selectedIndex === 'number' &&
                this.selectedIndex !== numbers$9.UNSET_INDEX) {
                return this.selectedIndex;
            }
            var el = this.root.querySelector("." + this.classNameMap[cssClasses$n.LIST_ITEM_CLASS] + ":not(." + this.classNameMap[cssClasses$n.LIST_ITEM_DISABLED_CLASS] + ")");
            if (el === null) {
                return -1;
            }
            return this.getListItemIndex(el);
        };
        /**
         * Used to figure out which list item this event is targetting. Or returns -1
         * if there is no list item
         */
        MDCList.prototype.getListItemIndex = function (el) {
            var nearestParent = closest(el, "." + this.classNameMap[cssClasses$n.LIST_ITEM_CLASS] + ", ." + this.classNameMap[cssClasses$n.ROOT]);
            // Get the index of the element if it is a list item.
            if (nearestParent &&
                matches(nearestParent, "." + this.classNameMap[cssClasses$n.LIST_ITEM_CLASS])) {
                return this.listElements.indexOf(nearestParent);
            }
            return -1;
        };
        /**
         * Used to figure out which element was clicked before sending the event to
         * the foundation.
         */
        MDCList.prototype.handleFocusInEvent = function (evt) {
            var index = this.getListItemIndex(evt.target);
            this.foundation.handleFocusIn(evt, index);
        };
        /**
         * Used to figure out which element was clicked before sending the event to
         * the foundation.
         */
        MDCList.prototype.handleFocusOutEvent = function (evt) {
            var index = this.getListItemIndex(evt.target);
            this.foundation.handleFocusOut(evt, index);
        };
        /**
         * Used to figure out which element was focused when keydown event occurred
         * before sending the event to the foundation.
         */
        MDCList.prototype.handleKeydownEvent = function (evt) {
            var index = this.getListItemIndex(evt.target);
            var target = evt.target;
            this.foundation.handleKeydown(evt, target.classList.contains(this.classNameMap[cssClasses$n.LIST_ITEM_CLASS]), index);
        };
        /**
         * Used to figure out which element was clicked before sending the event to
         * the foundation.
         */
        MDCList.prototype.handleClickEvent = function (evt) {
            var index = this.getListItemIndex(evt.target);
            var target = evt.target;
            // Toggle the checkbox only if it's not the target of the event, or the
            // checkbox will have 2 change events.
            var toggleCheckbox = !matches(target, strings$r.CHECKBOX_RADIO_SELECTOR);
            this.foundation.handleClick(index, toggleCheckbox);
        };
        return MDCList;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$m = {
        ANIMATE: 'mdc-drawer--animate',
        CLOSING: 'mdc-drawer--closing',
        DISMISSIBLE: 'mdc-drawer--dismissible',
        MODAL: 'mdc-drawer--modal',
        OPEN: 'mdc-drawer--open',
        OPENING: 'mdc-drawer--opening',
        ROOT: 'mdc-drawer',
    };
    var strings$q = {
        APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
        CLOSE_EVENT: 'MDCDrawer:closed',
        OPEN_EVENT: 'MDCDrawer:opened',
        SCRIM_SELECTOR: '.mdc-drawer-scrim',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCDismissibleDrawerFoundation = /** @class */ (function (_super) {
        __extends(MDCDismissibleDrawerFoundation, _super);
        function MDCDismissibleDrawerFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCDismissibleDrawerFoundation.defaultAdapter), adapter)) || this;
            _this.animationFrame_ = 0;
            _this.animationTimer_ = 0;
            return _this;
        }
        Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
            get: function () {
                return strings$q;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
            get: function () {
                return cssClasses$m;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    elementHasClass: function () { return false; },
                    notifyClose: function () { return undefined; },
                    notifyOpen: function () { return undefined; },
                    saveFocus: function () { return undefined; },
                    restoreFocus: function () { return undefined; },
                    focusActiveNavigationItem: function () { return undefined; },
                    trapFocus: function () { return undefined; },
                    releaseFocus: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCDismissibleDrawerFoundation.prototype.destroy = function () {
            if (this.animationFrame_) {
                cancelAnimationFrame(this.animationFrame_);
            }
            if (this.animationTimer_) {
                clearTimeout(this.animationTimer_);
            }
        };
        /**
         * Opens the drawer from the closed state.
         */
        MDCDismissibleDrawerFoundation.prototype.open = function () {
            var _this = this;
            if (this.isOpen() || this.isOpening() || this.isClosing()) {
                return;
            }
            this.adapter.addClass(cssClasses$m.OPEN);
            this.adapter.addClass(cssClasses$m.ANIMATE);
            // Wait a frame once display is no longer "none", to establish basis for animation
            this.runNextAnimationFrame_(function () {
                _this.adapter.addClass(cssClasses$m.OPENING);
            });
            this.adapter.saveFocus();
        };
        /**
         * Closes the drawer from the open state.
         */
        MDCDismissibleDrawerFoundation.prototype.close = function () {
            if (!this.isOpen() || this.isOpening() || this.isClosing()) {
                return;
            }
            this.adapter.addClass(cssClasses$m.CLOSING);
        };
        /**
         * Returns true if the drawer is in the open position.
         * @return true if drawer is in open state.
         */
        MDCDismissibleDrawerFoundation.prototype.isOpen = function () {
            return this.adapter.hasClass(cssClasses$m.OPEN);
        };
        /**
         * Returns true if the drawer is animating open.
         * @return true if drawer is animating open.
         */
        MDCDismissibleDrawerFoundation.prototype.isOpening = function () {
            return this.adapter.hasClass(cssClasses$m.OPENING) ||
                this.adapter.hasClass(cssClasses$m.ANIMATE);
        };
        /**
         * Returns true if the drawer is animating closed.
         * @return true if drawer is animating closed.
         */
        MDCDismissibleDrawerFoundation.prototype.isClosing = function () {
            return this.adapter.hasClass(cssClasses$m.CLOSING);
        };
        /**
         * Keydown handler to close drawer when key is escape.
         */
        MDCDismissibleDrawerFoundation.prototype.handleKeydown = function (evt) {
            var keyCode = evt.keyCode, key = evt.key;
            var isEscape = key === 'Escape' || keyCode === 27;
            if (isEscape) {
                this.close();
            }
        };
        /**
         * Handles the `transitionend` event when the drawer finishes opening/closing.
         */
        MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function (evt) {
            var OPENING = cssClasses$m.OPENING, CLOSING = cssClasses$m.CLOSING, OPEN = cssClasses$m.OPEN, ANIMATE = cssClasses$m.ANIMATE, ROOT = cssClasses$m.ROOT;
            // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.
            var isRootElement = this.isElement_(evt.target) &&
                this.adapter.elementHasClass(evt.target, ROOT);
            if (!isRootElement) {
                return;
            }
            if (this.isClosing()) {
                this.adapter.removeClass(OPEN);
                this.closed_();
                this.adapter.restoreFocus();
                this.adapter.notifyClose();
            }
            else {
                this.adapter.focusActiveNavigationItem();
                this.opened_();
                this.adapter.notifyOpen();
            }
            this.adapter.removeClass(ANIMATE);
            this.adapter.removeClass(OPENING);
            this.adapter.removeClass(CLOSING);
        };
        /**
         * Extension point for when drawer finishes open animation.
         */
        MDCDismissibleDrawerFoundation.prototype.opened_ = function () { }; // tslint:disable-line:no-empty
        /**
         * Extension point for when drawer finishes close animation.
         */
        MDCDismissibleDrawerFoundation.prototype.closed_ = function () { }; // tslint:disable-line:no-empty
        /**
         * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
         */
        MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame_ = function (callback) {
            var _this = this;
            cancelAnimationFrame(this.animationFrame_);
            this.animationFrame_ = requestAnimationFrame(function () {
                _this.animationFrame_ = 0;
                clearTimeout(_this.animationTimer_);
                _this.animationTimer_ = setTimeout(callback, 0);
            });
        };
        MDCDismissibleDrawerFoundation.prototype.isElement_ = function (element) {
            // In Edge, transitionend on ripple pseudo-elements yields a target without classList.
            return Boolean(element.classList);
        };
        return MDCDismissibleDrawerFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /* istanbul ignore next: subclass is not a branch statement */
    var MDCModalDrawerFoundation = /** @class */ (function (_super) {
        __extends(MDCModalDrawerFoundation, _super);
        function MDCModalDrawerFoundation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Handles click event on scrim.
         */
        MDCModalDrawerFoundation.prototype.handleScrimClick = function () {
            this.close();
        };
        /**
         * Called when drawer finishes open animation.
         */
        MDCModalDrawerFoundation.prototype.opened_ = function () {
            this.adapter.trapFocus();
        };
        /**
         * Called when drawer finishes close animation.
         */
        MDCModalDrawerFoundation.prototype.closed_ = function () {
            this.adapter.releaseFocus();
        };
        return MDCModalDrawerFoundation;
    }(MDCDismissibleDrawerFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$l = MDCDismissibleDrawerFoundation.cssClasses, strings$p = MDCDismissibleDrawerFoundation.strings;
    /**
     * @events `MDCDrawer:closed {}` Emits when the navigation drawer has closed.
     * @events `MDCDrawer:opened {}` Emits when the navigation drawer has opened.
     */
    var MDCDrawer = /** @class */ (function (_super) {
        __extends(MDCDrawer, _super);
        function MDCDrawer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCDrawer.attachTo = function (root) {
            return new MDCDrawer(root);
        };
        Object.defineProperty(MDCDrawer.prototype, "open", {
            /**
             * @return boolean Proxies to the foundation's `open`/`close` methods.
             * Also returns true if drawer is in the open position.
             */
            get: function () {
                return this.foundation.isOpen();
            },
            /**
             * Toggles the drawer open and closed.
             */
            set: function (isOpen) {
                if (isOpen) {
                    this.foundation.open();
                }
                else {
                    this.foundation.close();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCDrawer.prototype, "list", {
            get: function () {
                return this.list_;
            },
            enumerable: true,
            configurable: true
        });
        MDCDrawer.prototype.initialize = function (focusTrapFactory, listFactory) {
            if (focusTrapFactory === void 0) { focusTrapFactory = function (el) { return new FocusTrap(el); }; }
            if (listFactory === void 0) { listFactory = function (el) { return new MDCList(el); }; }
            var listEl = this.root.querySelector("." + MDCListFoundation.cssClasses.ROOT);
            if (listEl) {
                this.list_ = listFactory(listEl);
                this.list_.wrapFocus = true;
            }
            this.focusTrapFactory_ = focusTrapFactory;
        };
        MDCDrawer.prototype.initialSyncWithDOM = function () {
            var _this = this;
            var MODAL = cssClasses$l.MODAL;
            var SCRIM_SELECTOR = strings$p.SCRIM_SELECTOR;
            this.scrim_ = this.root.parentNode
                .querySelector(SCRIM_SELECTOR);
            if (this.scrim_ && this.root.classList.contains(MODAL)) {
                this.handleScrimClick_ = function () {
                    return _this.foundation.handleScrimClick();
                };
                this.scrim_.addEventListener('click', this.handleScrimClick_);
                this.focusTrap_ = createFocusTrapInstance$1(this.root, this.focusTrapFactory_);
            }
            this.handleKeydown_ = function (evt) { return _this.foundation.handleKeydown(evt); };
            this.handleTransitionEnd_ = function (evt) {
                return _this.foundation.handleTransitionEnd(evt);
            };
            this.listen('keydown', this.handleKeydown_);
            this.listen('transitionend', this.handleTransitionEnd_);
        };
        MDCDrawer.prototype.destroy = function () {
            this.unlisten('keydown', this.handleKeydown_);
            this.unlisten('transitionend', this.handleTransitionEnd_);
            if (this.list_) {
                this.list_.destroy();
            }
            var MODAL = cssClasses$l.MODAL;
            if (this.scrim_ && this.handleScrimClick_ &&
                this.root.classList.contains(MODAL)) {
                this.scrim_.removeEventListener('click', this.handleScrimClick_);
                // Ensure drawer is closed to hide scrim and release focus
                this.open = false;
            }
        };
        MDCDrawer.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                elementHasClass: function (element, className) {
                    return element.classList.contains(className);
                },
                saveFocus: function () { return _this.previousFocus_ = document.activeElement; },
                restoreFocus: function () {
                    var previousFocus = _this.previousFocus_;
                    if (previousFocus && previousFocus.focus &&
                        _this.root.contains(document.activeElement)) {
                        previousFocus.focus();
                    }
                },
                focusActiveNavigationItem: function () {
                    var activeNavItemEl = _this.root.querySelector("." + MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS);
                    if (activeNavItemEl) {
                        activeNavItemEl.focus();
                    }
                },
                notifyClose: function () {
                    return _this.emit(strings$p.CLOSE_EVENT, {}, true /* shouldBubble */);
                },
                notifyOpen: function () {
                    return _this.emit(strings$p.OPEN_EVENT, {}, true /* shouldBubble */);
                },
                trapFocus: function () { return _this.focusTrap_.trapFocus(); },
                releaseFocus: function () { return _this.focusTrap_.releaseFocus(); },
            };
            // tslint:enable:object-literal-sort-keys
            var DISMISSIBLE = cssClasses$l.DISMISSIBLE, MODAL = cssClasses$l.MODAL;
            if (this.root.classList.contains(DISMISSIBLE)) {
                return new MDCDismissibleDrawerFoundation(adapter);
            }
            else if (this.root.classList.contains(MODAL)) {
                return new MDCModalDrawerFoundation(adapter);
            }
            else {
                throw new Error("MDCDrawer: Failed to instantiate component. Supported variants are " + DISMISSIBLE + " and " + MODAL + ".");
            }
        };
        return MDCDrawer;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    function createFocusTrapInstance(surfaceEl, focusTrapFactory, initialFocusEl) {
        return focusTrapFactory(surfaceEl, { initialFocusEl: initialFocusEl });
    }
    function isScrollable(el) {
        return el ? el.scrollHeight > el.offsetHeight : false;
    }
    /**
     * For scrollable content, returns true if the content has not been scrolled
     * (that is, the scroll content is as the "top"). This is used in full-screen
     * dialogs, where the scroll divider is expected only to appear once the
     * content has been scrolled "underneath" the header bar.
     */
    function isScrollAtTop(el) {
        return el ? el.scrollTop === 0 : false;
    }
    /**
     * For scrollable content, returns true if the content has been scrolled all the
     * way to the bottom. This is used in full-screen dialogs, where the footer
     * scroll divider is expected only to appear when the content is "cut-off" by
     * the footer bar.
     */
    function isScrollAtBottom(el) {
        return el ? Math.ceil(el.scrollHeight - el.scrollTop) === el.clientHeight :
            false;
    }
    function areTopsMisaligned(els) {
        var tops = new Set();
        [].forEach.call(els, function (el) { return tops.add(el.offsetTop); });
        return tops.size > 1;
    }

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * AnimationFrame provides a user-friendly abstraction around requesting
     * and canceling animation frames.
     */
    var AnimationFrame = /** @class */ (function () {
        function AnimationFrame() {
            this.rafIDs = new Map();
        }
        /**
         * Requests an animation frame. Cancels any existing frame with the same key.
         * @param {string} key The key for this callback.
         * @param {FrameRequestCallback} callback The callback to be executed.
         */
        AnimationFrame.prototype.request = function (key, callback) {
            var _this = this;
            this.cancel(key);
            var frameID = requestAnimationFrame(function (frame) {
                _this.rafIDs.delete(key);
                // Callback must come *after* the key is deleted so that nested calls to
                // request with the same key are not deleted.
                callback(frame);
            });
            this.rafIDs.set(key, frameID);
        };
        /**
         * Cancels a queued callback with the given key.
         * @param {string} key The key for this callback.
         */
        AnimationFrame.prototype.cancel = function (key) {
            var rafID = this.rafIDs.get(key);
            if (rafID) {
                cancelAnimationFrame(rafID);
                this.rafIDs.delete(key);
            }
        };
        /**
         * Cancels all queued callback.
         */
        AnimationFrame.prototype.cancelAll = function () {
            var _this = this;
            // Need to use forEach because it's the only iteration method supported
            // by IE11. Suppress the underscore because we don't need it.
            // tslint:disable-next-line:enforce-name-casing
            this.rafIDs.forEach(function (_, key) {
                _this.cancel(key);
            });
        };
        /**
         * Returns the queue of unexecuted callback keys.
         */
        AnimationFrame.prototype.getQueue = function () {
            var queue = [];
            // Need to use forEach because it's the only iteration method supported
            // by IE11. Suppress the underscore because we don't need it.
            // tslint:disable-next-line:enforce-name-casing
            this.rafIDs.forEach(function (_, key) {
                queue.push(key);
            });
            return queue;
        };
        return AnimationFrame;
    }());

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$k = {
        CLOSING: 'mdc-dialog--closing',
        OPEN: 'mdc-dialog--open',
        OPENING: 'mdc-dialog--opening',
        SCROLLABLE: 'mdc-dialog--scrollable',
        SCROLL_LOCK: 'mdc-dialog-scroll-lock',
        STACKED: 'mdc-dialog--stacked',
        FULLSCREEN: 'mdc-dialog--fullscreen',
        // Class for showing a scroll divider on full-screen dialog header element.
        // Should only be displayed on scrollable content, when the dialog content is
        // scrolled "underneath" the header.
        SCROLL_DIVIDER_HEADER: 'mdc-dialog-scroll-divider-header',
        // Class for showing a scroll divider on a full-screen dialog footer element.
        // Should only be displayed on scrolalble content, when the dialog content is
        // obscured "underneath" the footer.
        SCROLL_DIVIDER_FOOTER: 'mdc-dialog-scroll-divider-footer',
    };
    var strings$o = {
        ACTION_ATTRIBUTE: 'data-mdc-dialog-action',
        BUTTON_DEFAULT_ATTRIBUTE: 'data-mdc-dialog-button-default',
        BUTTON_SELECTOR: '.mdc-dialog__button',
        CLOSED_EVENT: 'MDCDialog:closed',
        CLOSE_ACTION: 'close',
        CLOSING_EVENT: 'MDCDialog:closing',
        CONTAINER_SELECTOR: '.mdc-dialog__container',
        CONTENT_SELECTOR: '.mdc-dialog__content',
        DESTROY_ACTION: 'destroy',
        INITIAL_FOCUS_ATTRIBUTE: 'data-mdc-dialog-initial-focus',
        OPENED_EVENT: 'MDCDialog:opened',
        OPENING_EVENT: 'MDCDialog:opening',
        SCRIM_SELECTOR: '.mdc-dialog__scrim',
        SUPPRESS_DEFAULT_PRESS_SELECTOR: [
            'textarea',
            '.mdc-menu .mdc-list-item',
        ].join(', '),
        SURFACE_SELECTOR: '.mdc-dialog__surface',
    };
    var numbers$8 = {
        DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
        DIALOG_ANIMATION_OPEN_TIME_MS: 150,
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var AnimationKeys;
    (function (AnimationKeys) {
        AnimationKeys["POLL_SCROLL_POS"] = "poll_scroll_position";
    })(AnimationKeys || (AnimationKeys = {}));
    var MDCDialogFoundation = /** @class */ (function (_super) {
        __extends(MDCDialogFoundation, _super);
        function MDCDialogFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCDialogFoundation.defaultAdapter), adapter)) || this;
            _this.dialogOpen = false;
            _this.isFullscreen = false;
            _this.animationFrame = 0;
            _this.animationTimer = 0;
            _this.layoutFrame = 0;
            _this.escapeKeyAction = strings$o.CLOSE_ACTION;
            _this.scrimClickAction = strings$o.CLOSE_ACTION;
            _this.autoStackButtons = true;
            _this.areButtonsStacked = false;
            _this.suppressDefaultPressSelector = strings$o.SUPPRESS_DEFAULT_PRESS_SELECTOR;
            _this.animFrame = new AnimationFrame();
            _this.contentScrollHandler = function () {
                _this.handleScrollEvent();
            };
            return _this;
        }
        Object.defineProperty(MDCDialogFoundation, "cssClasses", {
            get: function () {
                return cssClasses$k;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCDialogFoundation, "strings", {
            get: function () {
                return strings$o;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCDialogFoundation, "numbers", {
            get: function () {
                return numbers$8;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCDialogFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addBodyClass: function () { return undefined; },
                    addClass: function () { return undefined; },
                    areButtonsStacked: function () { return false; },
                    clickDefaultButton: function () { return undefined; },
                    eventTargetMatches: function () { return false; },
                    getActionFromEvent: function () { return ''; },
                    getInitialFocusEl: function () { return null; },
                    hasClass: function () { return false; },
                    isContentScrollable: function () { return false; },
                    notifyClosed: function () { return undefined; },
                    notifyClosing: function () { return undefined; },
                    notifyOpened: function () { return undefined; },
                    notifyOpening: function () { return undefined; },
                    releaseFocus: function () { return undefined; },
                    removeBodyClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    reverseButtons: function () { return undefined; },
                    trapFocus: function () { return undefined; },
                    registerContentEventHandler: function () { return undefined; },
                    deregisterContentEventHandler: function () { return undefined; },
                    isScrollableContentAtTop: function () { return false; },
                    isScrollableContentAtBottom: function () { return false; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCDialogFoundation.prototype.init = function () {
            if (this.adapter.hasClass(cssClasses$k.STACKED)) {
                this.setAutoStackButtons(false);
            }
            this.isFullscreen = this.adapter.hasClass(cssClasses$k.FULLSCREEN);
        };
        MDCDialogFoundation.prototype.destroy = function () {
            if (this.dialogOpen) {
                this.close(strings$o.DESTROY_ACTION);
            }
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
                this.handleAnimationTimerEnd();
            }
            if (this.layoutFrame) {
                cancelAnimationFrame(this.layoutFrame);
                this.layoutFrame = 0;
            }
            if (this.isFullscreen && this.adapter.isContentScrollable()) {
                this.adapter.deregisterContentEventHandler('scroll', this.contentScrollHandler);
            }
        };
        MDCDialogFoundation.prototype.open = function () {
            var _this = this;
            this.dialogOpen = true;
            this.adapter.notifyOpening();
            this.adapter.addClass(cssClasses$k.OPENING);
            if (this.isFullscreen && this.adapter.isContentScrollable()) {
                this.adapter.registerContentEventHandler('scroll', this.contentScrollHandler);
            }
            // Wait a frame once display is no longer "none", to establish basis for
            // animation
            this.runNextAnimationFrame(function () {
                _this.adapter.addClass(cssClasses$k.OPEN);
                _this.adapter.addBodyClass(cssClasses$k.SCROLL_LOCK);
                _this.layout();
                _this.animationTimer = setTimeout(function () {
                    _this.handleAnimationTimerEnd();
                    _this.adapter.trapFocus(_this.adapter.getInitialFocusEl());
                    _this.adapter.notifyOpened();
                }, numbers$8.DIALOG_ANIMATION_OPEN_TIME_MS);
            });
        };
        MDCDialogFoundation.prototype.close = function (action) {
            var _this = this;
            if (action === void 0) { action = ''; }
            if (!this.dialogOpen) {
                // Avoid redundant close calls (and events), e.g. from keydown on elements
                // that inherently emit click
                return;
            }
            this.dialogOpen = false;
            this.adapter.notifyClosing(action);
            this.adapter.addClass(cssClasses$k.CLOSING);
            this.adapter.removeClass(cssClasses$k.OPEN);
            this.adapter.removeBodyClass(cssClasses$k.SCROLL_LOCK);
            if (this.isFullscreen && this.adapter.isContentScrollable()) {
                this.adapter.deregisterContentEventHandler('scroll', this.contentScrollHandler);
            }
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = 0;
            clearTimeout(this.animationTimer);
            this.animationTimer = setTimeout(function () {
                _this.adapter.releaseFocus();
                _this.handleAnimationTimerEnd();
                _this.adapter.notifyClosed(action);
            }, numbers$8.DIALOG_ANIMATION_CLOSE_TIME_MS);
        };
        MDCDialogFoundation.prototype.isOpen = function () {
            return this.dialogOpen;
        };
        MDCDialogFoundation.prototype.getEscapeKeyAction = function () {
            return this.escapeKeyAction;
        };
        MDCDialogFoundation.prototype.setEscapeKeyAction = function (action) {
            this.escapeKeyAction = action;
        };
        MDCDialogFoundation.prototype.getScrimClickAction = function () {
            return this.scrimClickAction;
        };
        MDCDialogFoundation.prototype.setScrimClickAction = function (action) {
            this.scrimClickAction = action;
        };
        MDCDialogFoundation.prototype.getAutoStackButtons = function () {
            return this.autoStackButtons;
        };
        MDCDialogFoundation.prototype.setAutoStackButtons = function (autoStack) {
            this.autoStackButtons = autoStack;
        };
        MDCDialogFoundation.prototype.getSuppressDefaultPressSelector = function () {
            return this.suppressDefaultPressSelector;
        };
        MDCDialogFoundation.prototype.setSuppressDefaultPressSelector = function (selector) {
            this.suppressDefaultPressSelector = selector;
        };
        MDCDialogFoundation.prototype.layout = function () {
            var _this = this;
            if (this.layoutFrame) {
                cancelAnimationFrame(this.layoutFrame);
            }
            this.layoutFrame = requestAnimationFrame(function () {
                _this.layoutInternal();
                _this.layoutFrame = 0;
            });
        };
        /** Handles click on the dialog root element. */
        MDCDialogFoundation.prototype.handleClick = function (evt) {
            var isScrim = this.adapter.eventTargetMatches(evt.target, strings$o.SCRIM_SELECTOR);
            // Check for scrim click first since it doesn't require querying ancestors.
            if (isScrim && this.scrimClickAction !== '') {
                this.close(this.scrimClickAction);
            }
            else {
                var action = this.adapter.getActionFromEvent(evt);
                if (action) {
                    this.close(action);
                }
            }
        };
        /** Handles keydown on the dialog root element. */
        MDCDialogFoundation.prototype.handleKeydown = function (evt) {
            var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
            if (!isEnter) {
                return;
            }
            var action = this.adapter.getActionFromEvent(evt);
            if (action) {
                // Action button callback is handled in `handleClick`,
                // since space/enter keydowns on buttons trigger click events.
                return;
            }
            // `composedPath` is used here, when available, to account for use cases
            // where a target meant to suppress the default press behaviour
            // may exist in a shadow root.
            // For example, a textarea inside a web component:
            // <mwc-dialog>
            //   <horizontal-layout>
            //     #shadow-root (open)
            //       <mwc-textarea>
            //         #shadow-root (open)
            //           <textarea></textarea>
            //       </mwc-textarea>
            //   </horizontal-layout>
            // </mwc-dialog>
            var target = evt.composedPath ? evt.composedPath()[0] : evt.target;
            var isDefault = this.suppressDefaultPressSelector ?
                !this.adapter.eventTargetMatches(target, this.suppressDefaultPressSelector) :
                true;
            if (isEnter && isDefault) {
                this.adapter.clickDefaultButton();
            }
        };
        /** Handles keydown on the document. */
        MDCDialogFoundation.prototype.handleDocumentKeydown = function (evt) {
            var isEscape = evt.key === 'Escape' || evt.keyCode === 27;
            if (isEscape && this.escapeKeyAction !== '') {
                this.close(this.escapeKeyAction);
            }
        };
        /**
         * Handles scroll event on the dialog's content element -- showing a scroll
         * divider on the header or footer based on the scroll position. This handler
         * should only be registered on full-screen dialogs with scrollable content.
         */
        MDCDialogFoundation.prototype.handleScrollEvent = function () {
            var _this = this;
            // Since scroll events can fire at a high rate, we throttle these events by
            // using requestAnimationFrame.
            this.animFrame.request(AnimationKeys.POLL_SCROLL_POS, function () {
                _this.toggleScrollDividerHeader();
                _this.toggleScrollDividerFooter();
            });
        };
        MDCDialogFoundation.prototype.layoutInternal = function () {
            if (this.autoStackButtons) {
                this.detectStackedButtons();
            }
            this.toggleScrollableClasses();
        };
        MDCDialogFoundation.prototype.handleAnimationTimerEnd = function () {
            this.animationTimer = 0;
            this.adapter.removeClass(cssClasses$k.OPENING);
            this.adapter.removeClass(cssClasses$k.CLOSING);
        };
        /**
         * Runs the given logic on the next animation frame, using setTimeout to
         * factor in Firefox reflow behavior.
         */
        MDCDialogFoundation.prototype.runNextAnimationFrame = function (callback) {
            var _this = this;
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = requestAnimationFrame(function () {
                _this.animationFrame = 0;
                clearTimeout(_this.animationTimer);
                _this.animationTimer = setTimeout(callback, 0);
            });
        };
        MDCDialogFoundation.prototype.detectStackedButtons = function () {
            // Remove the class first to let us measure the buttons' natural positions.
            this.adapter.removeClass(cssClasses$k.STACKED);
            var areButtonsStacked = this.adapter.areButtonsStacked();
            if (areButtonsStacked) {
                this.adapter.addClass(cssClasses$k.STACKED);
            }
            if (areButtonsStacked !== this.areButtonsStacked) {
                this.adapter.reverseButtons();
                this.areButtonsStacked = areButtonsStacked;
            }
        };
        MDCDialogFoundation.prototype.toggleScrollableClasses = function () {
            // Remove the class first to let us measure the natural height of the
            // content.
            this.adapter.removeClass(cssClasses$k.SCROLLABLE);
            if (this.adapter.isContentScrollable()) {
                this.adapter.addClass(cssClasses$k.SCROLLABLE);
                if (this.isFullscreen) {
                    // If dialog is full-screen and scrollable, check if a scroll divider
                    // should be shown.
                    this.toggleScrollDividerHeader();
                    this.toggleScrollDividerFooter();
                }
            }
        };
        MDCDialogFoundation.prototype.toggleScrollDividerHeader = function () {
            if (!this.adapter.isScrollableContentAtTop()) {
                this.adapter.addClass(cssClasses$k.SCROLL_DIVIDER_HEADER);
            }
            else if (this.adapter.hasClass(cssClasses$k.SCROLL_DIVIDER_HEADER)) {
                this.adapter.removeClass(cssClasses$k.SCROLL_DIVIDER_HEADER);
            }
        };
        MDCDialogFoundation.prototype.toggleScrollDividerFooter = function () {
            if (!this.adapter.isScrollableContentAtBottom()) {
                this.adapter.addClass(cssClasses$k.SCROLL_DIVIDER_FOOTER);
            }
            else if (this.adapter.hasClass(cssClasses$k.SCROLL_DIVIDER_FOOTER)) {
                this.adapter.removeClass(cssClasses$k.SCROLL_DIVIDER_FOOTER);
            }
        };
        return MDCDialogFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$n = MDCDialogFoundation.strings;
    var MDCDialog = /** @class */ (function (_super) {
        __extends(MDCDialog, _super);
        function MDCDialog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MDCDialog.prototype, "isOpen", {
            get: function () {
                return this.foundation.isOpen();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCDialog.prototype, "escapeKeyAction", {
            get: function () {
                return this.foundation.getEscapeKeyAction();
            },
            set: function (action) {
                this.foundation.setEscapeKeyAction(action);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCDialog.prototype, "scrimClickAction", {
            get: function () {
                return this.foundation.getScrimClickAction();
            },
            set: function (action) {
                this.foundation.setScrimClickAction(action);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCDialog.prototype, "autoStackButtons", {
            get: function () {
                return this.foundation.getAutoStackButtons();
            },
            set: function (autoStack) {
                this.foundation.setAutoStackButtons(autoStack);
            },
            enumerable: true,
            configurable: true
        });
        MDCDialog.attachTo = function (root) {
            return new MDCDialog(root);
        };
        MDCDialog.prototype.initialize = function (focusTrapFactory) {
            var e_1, _a;
            if (focusTrapFactory === void 0) { focusTrapFactory = function (el, focusOptions) { return new FocusTrap(el, focusOptions); }; }
            var container = this.root.querySelector(strings$n.CONTAINER_SELECTOR);
            if (!container) {
                throw new Error("Dialog component requires a " + strings$n.CONTAINER_SELECTOR + " container element");
            }
            this.container = container;
            this.content =
                this.root.querySelector(strings$n.CONTENT_SELECTOR);
            this.buttons = [].slice.call(this.root.querySelectorAll(strings$n.BUTTON_SELECTOR));
            this.defaultButton = this.root.querySelector("[" + strings$n.BUTTON_DEFAULT_ATTRIBUTE + "]");
            this.focusTrapFactory = focusTrapFactory;
            this.buttonRipples = [];
            try {
                for (var _b = __values(this.buttons), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var buttonEl = _c.value;
                    this.buttonRipples.push(new MDCRipple(buttonEl));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        MDCDialog.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.focusTrap = createFocusTrapInstance(this.container, this.focusTrapFactory, this.getInitialFocusEl() || undefined);
            this.handleClick = this.foundation.handleClick.bind(this.foundation);
            this.handleKeydown = this.foundation.handleKeydown.bind(this.foundation);
            this.handleDocumentKeydown =
                this.foundation.handleDocumentKeydown.bind(this.foundation);
            this.handleLayout = this.layout.bind(this);
            var LAYOUT_EVENTS = ['resize', 'orientationchange'];
            this.handleOpening = function () {
                LAYOUT_EVENTS.forEach(function (evtType) {
                    window.addEventListener(evtType, _this.handleLayout);
                });
                document.addEventListener('keydown', _this.handleDocumentKeydown);
            };
            this.handleClosing = function () {
                LAYOUT_EVENTS.forEach(function (evtType) {
                    window.removeEventListener(evtType, _this.handleLayout);
                });
                document.removeEventListener('keydown', _this.handleDocumentKeydown);
            };
            this.listen('click', this.handleClick);
            this.listen('keydown', this.handleKeydown);
            this.listen(strings$n.OPENING_EVENT, this.handleOpening);
            this.listen(strings$n.CLOSING_EVENT, this.handleClosing);
        };
        MDCDialog.prototype.destroy = function () {
            this.unlisten('click', this.handleClick);
            this.unlisten('keydown', this.handleKeydown);
            this.unlisten(strings$n.OPENING_EVENT, this.handleOpening);
            this.unlisten(strings$n.CLOSING_EVENT, this.handleClosing);
            this.handleClosing();
            this.buttonRipples.forEach(function (ripple) {
                ripple.destroy();
            });
            _super.prototype.destroy.call(this);
        };
        MDCDialog.prototype.layout = function () {
            this.foundation.layout();
        };
        MDCDialog.prototype.open = function () {
            this.foundation.open();
        };
        MDCDialog.prototype.close = function (action) {
            if (action === void 0) { action = ''; }
            this.foundation.close(action);
        };
        MDCDialog.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                addBodyClass: function (className) { return document.body.classList.add(className); },
                addClass: function (className) { return _this.root.classList.add(className); },
                areButtonsStacked: function () { return areTopsMisaligned(_this.buttons); },
                clickDefaultButton: function () {
                    if (_this.defaultButton) {
                        _this.defaultButton.click();
                    }
                },
                eventTargetMatches: function (target, selector) {
                    return target ? matches(target, selector) : false;
                },
                getActionFromEvent: function (evt) {
                    if (!evt.target) {
                        return '';
                    }
                    var element = closest(evt.target, "[" + strings$n.ACTION_ATTRIBUTE + "]");
                    return element && element.getAttribute(strings$n.ACTION_ATTRIBUTE);
                },
                getInitialFocusEl: function () { return _this.getInitialFocusEl(); },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                isContentScrollable: function () { return isScrollable(_this.content); },
                notifyClosed: function (action) { return _this.emit(strings$n.CLOSED_EVENT, action ? { action: action } : {}); },
                notifyClosing: function (action) { return _this.emit(strings$n.CLOSING_EVENT, action ? { action: action } : {}); },
                notifyOpened: function () { return _this.emit(strings$n.OPENED_EVENT, {}); },
                notifyOpening: function () { return _this.emit(strings$n.OPENING_EVENT, {}); },
                releaseFocus: function () {
                    _this.focusTrap.releaseFocus();
                },
                removeBodyClass: function (className) { return document.body.classList.remove(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                reverseButtons: function () {
                    _this.buttons.reverse();
                    _this.buttons.forEach(function (button) {
                        button.parentElement.appendChild(button);
                    });
                },
                trapFocus: function () {
                    _this.focusTrap.trapFocus();
                },
                registerContentEventHandler: function (evt, handler) {
                    if (_this.content instanceof HTMLElement) {
                        _this.content.addEventListener(evt, handler);
                    }
                },
                deregisterContentEventHandler: function (evt, handler) {
                    if (_this.content instanceof HTMLElement) {
                        _this.content.removeEventListener(evt, handler);
                    }
                },
                isScrollableContentAtTop: function () {
                    return isScrollAtTop(_this.content);
                },
                isScrollableContentAtBottom: function () {
                    return isScrollAtBottom(_this.content);
                },
            };
            return new MDCDialogFoundation(adapter);
        };
        MDCDialog.prototype.getInitialFocusEl = function () {
            return this.root.querySelector("[" + strings$n.INITIAL_FOCUS_ATTRIBUTE + "]");
        };
        return MDCDialog;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$j = {
        LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
        LABEL_REQUIRED: 'mdc-floating-label--required',
        LABEL_SHAKE: 'mdc-floating-label--shake',
        ROOT: 'mdc-floating-label',
    };

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFloatingLabelFoundation = /** @class */ (function (_super) {
        __extends(MDCFloatingLabelFoundation, _super);
        function MDCFloatingLabelFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCFloatingLabelFoundation.defaultAdapter), adapter)) || this;
            _this.shakeAnimationEndHandler_ = function () { return _this.handleShakeAnimationEnd_(); };
            return _this;
        }
        Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
            get: function () {
                return cssClasses$j;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
            /**
             * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    getWidth: function () { return 0; },
                    registerInteractionHandler: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCFloatingLabelFoundation.prototype.init = function () {
            this.adapter.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
        };
        MDCFloatingLabelFoundation.prototype.destroy = function () {
            this.adapter.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
        };
        /**
         * Returns the width of the label element.
         */
        MDCFloatingLabelFoundation.prototype.getWidth = function () {
            return this.adapter.getWidth();
        };
        /**
         * Styles the label to produce a shake animation to indicate an error.
         * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
         */
        MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
            var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
            if (shouldShake) {
                this.adapter.addClass(LABEL_SHAKE);
            }
            else {
                this.adapter.removeClass(LABEL_SHAKE);
            }
        };
        /**
         * Styles the label to float or dock.
         * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
         */
        MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
            var _a = MDCFloatingLabelFoundation.cssClasses, LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE, LABEL_SHAKE = _a.LABEL_SHAKE;
            if (shouldFloat) {
                this.adapter.addClass(LABEL_FLOAT_ABOVE);
            }
            else {
                this.adapter.removeClass(LABEL_FLOAT_ABOVE);
                this.adapter.removeClass(LABEL_SHAKE);
            }
        };
        /**
         * Styles the label as required.
         * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
         */
        MDCFloatingLabelFoundation.prototype.setRequired = function (isRequired) {
            var LABEL_REQUIRED = MDCFloatingLabelFoundation.cssClasses.LABEL_REQUIRED;
            if (isRequired) {
                this.adapter.addClass(LABEL_REQUIRED);
            }
            else {
                this.adapter.removeClass(LABEL_REQUIRED);
            }
        };
        MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
            var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
            this.adapter.removeClass(LABEL_SHAKE);
        };
        return MDCFloatingLabelFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFloatingLabel = /** @class */ (function (_super) {
        __extends(MDCFloatingLabel, _super);
        function MDCFloatingLabel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCFloatingLabel.attachTo = function (root) {
            return new MDCFloatingLabel(root);
        };
        /**
         * Styles the label to produce the label shake for errors.
         * @param shouldShake If true, shakes the label by adding a CSS class; otherwise, stops shaking by removing the class.
         */
        MDCFloatingLabel.prototype.shake = function (shouldShake) {
            this.foundation.shake(shouldShake);
        };
        /**
         * Styles the label to float/dock.
         * @param shouldFloat If true, floats the label by adding a CSS class; otherwise, docks it by removing the class.
         */
        MDCFloatingLabel.prototype.float = function (shouldFloat) {
            this.foundation.float(shouldFloat);
        };
        /**
         * Styles the label as required.
         * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
         */
        MDCFloatingLabel.prototype.setRequired = function (isRequired) {
            this.foundation.setRequired(isRequired);
        };
        MDCFloatingLabel.prototype.getWidth = function () {
            return this.foundation.getWidth();
        };
        MDCFloatingLabel.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                getWidth: function () { return estimateScrollWidth(_this.root); },
                registerInteractionHandler: function (evtType, handler) {
                    return _this.listen(evtType, handler);
                },
                deregisterInteractionHandler: function (evtType, handler) {
                    return _this.unlisten(evtType, handler);
                },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCFloatingLabelFoundation(adapter);
        };
        return MDCFloatingLabel;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$m = {
        NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch',
    };
    var numbers$7 = {
        // This should stay in sync with $mdc-notched-outline-padding * 2.
        NOTCH_ELEMENT_PADDING: 8,
    };
    var cssClasses$i = {
        NO_LABEL: 'mdc-notched-outline--no-label',
        OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
        OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded',
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCNotchedOutlineFoundation = /** @class */ (function (_super) {
        __extends(MDCNotchedOutlineFoundation, _super);
        function MDCNotchedOutlineFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCNotchedOutlineFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
            get: function () {
                return strings$m;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
            get: function () {
                return cssClasses$i;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
            get: function () {
                return numbers$7;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
            /**
             * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    setNotchWidthProperty: function () { return undefined; },
                    removeNotchWidthProperty: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
         */
        MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
            var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
            if (notchWidth > 0) {
                notchWidth += numbers$7.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
            }
            this.adapter.setNotchWidthProperty(notchWidth);
            this.adapter.addClass(OUTLINE_NOTCHED);
        };
        /**
         * Removes notched outline selector to close the notch in the outline.
         */
        MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
            var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
            this.adapter.removeClass(OUTLINE_NOTCHED);
            this.adapter.removeNotchWidthProperty();
        };
        return MDCNotchedOutlineFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCNotchedOutline = /** @class */ (function (_super) {
        __extends(MDCNotchedOutline, _super);
        function MDCNotchedOutline() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCNotchedOutline.attachTo = function (root) {
            return new MDCNotchedOutline(root);
        };
        MDCNotchedOutline.prototype.initialSyncWithDOM = function () {
            this.notchElement_ =
                this.root.querySelector(strings$m.NOTCH_ELEMENT_SELECTOR);
            var label = this.root.querySelector('.' + MDCFloatingLabelFoundation.cssClasses.ROOT);
            if (label) {
                label.style.transitionDuration = '0s';
                this.root.classList.add(cssClasses$i.OUTLINE_UPGRADED);
                requestAnimationFrame(function () {
                    label.style.transitionDuration = '';
                });
            }
            else {
                this.root.classList.add(cssClasses$i.NO_LABEL);
            }
        };
        /**
         * Updates classes and styles to open the notch to the specified width.
         * @param notchWidth The notch width in the outline.
         */
        MDCNotchedOutline.prototype.notch = function (notchWidth) {
            this.foundation.notch(notchWidth);
        };
        /**
         * Updates classes and styles to close the notch.
         */
        MDCNotchedOutline.prototype.closeNotch = function () {
            this.foundation.closeNotch();
        };
        MDCNotchedOutline.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                setNotchWidthProperty: function (width) {
                    return _this.notchElement_.style.setProperty('width', width + 'px');
                },
                removeNotchWidthProperty: function () {
                    return _this.notchElement_.style.removeProperty('width');
                },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCNotchedOutlineFoundation(adapter);
        };
        return MDCNotchedOutline;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$h = {
        ROOT: 'mdc-text-field-character-counter',
    };
    var strings$l = {
        ROOT_SELECTOR: "." + cssClasses$h.ROOT,
    };

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTextFieldCharacterCounterFoundation = /** @class */ (function (_super) {
        __extends(MDCTextFieldCharacterCounterFoundation, _super);
        function MDCTextFieldCharacterCounterFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCTextFieldCharacterCounterFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "cssClasses", {
            get: function () {
                return cssClasses$h;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "strings", {
            get: function () {
                return strings$l;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "defaultAdapter", {
            /**
             * See {@link MDCTextFieldCharacterCounterAdapter} for typing information on parameters and return types.
             */
            get: function () {
                return {
                    setContent: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCTextFieldCharacterCounterFoundation.prototype.setCounterValue = function (currentLength, maxLength) {
            currentLength = Math.min(currentLength, maxLength);
            this.adapter.setContent(currentLength + " / " + maxLength);
        };
        return MDCTextFieldCharacterCounterFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTextFieldCharacterCounter = /** @class */ (function (_super) {
        __extends(MDCTextFieldCharacterCounter, _super);
        function MDCTextFieldCharacterCounter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTextFieldCharacterCounter.attachTo = function (root) {
            return new MDCTextFieldCharacterCounter(root);
        };
        Object.defineProperty(MDCTextFieldCharacterCounter.prototype, "foundationForTextField", {
            // Provided for access by MDCTextField component
            get: function () {
                return this.foundation;
            },
            enumerable: true,
            configurable: true
        });
        MDCTextFieldCharacterCounter.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                setContent: function (content) {
                    _this.root.textContent = content;
                },
            };
            return new MDCTextFieldCharacterCounterFoundation(adapter);
        };
        return MDCTextFieldCharacterCounter;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$k = {
        ARIA_CONTROLS: 'aria-controls',
        ARIA_DESCRIBEDBY: 'aria-describedby',
        INPUT_SELECTOR: '.mdc-text-field__input',
        LABEL_SELECTOR: '.mdc-floating-label',
        LEADING_ICON_SELECTOR: '.mdc-text-field__icon--leading',
        LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
        OUTLINE_SELECTOR: '.mdc-notched-outline',
        PREFIX_SELECTOR: '.mdc-text-field__affix--prefix',
        SUFFIX_SELECTOR: '.mdc-text-field__affix--suffix',
        TRAILING_ICON_SELECTOR: '.mdc-text-field__icon--trailing'
    };
    var cssClasses$g = {
        DISABLED: 'mdc-text-field--disabled',
        FOCUSED: 'mdc-text-field--focused',
        HELPER_LINE: 'mdc-text-field-helper-line',
        INVALID: 'mdc-text-field--invalid',
        LABEL_FLOATING: 'mdc-text-field--label-floating',
        NO_LABEL: 'mdc-text-field--no-label',
        OUTLINED: 'mdc-text-field--outlined',
        ROOT: 'mdc-text-field',
        TEXTAREA: 'mdc-text-field--textarea',
        WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon',
        WITH_TRAILING_ICON: 'mdc-text-field--with-trailing-icon',
    };
    var numbers$6 = {
        LABEL_SCALE: 0.75,
    };
    /**
     * Whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
     * under the "Validation-related attributes" section.
     */
    var VALIDATION_ATTR_WHITELIST = [
        'pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength',
    ];
    /**
     * Label should always float for these types as they show some UI even if value is empty.
     */
    var ALWAYS_FLOAT_TYPES = [
        'color', 'date', 'datetime-local', 'month', 'range', 'time', 'week',
    ];

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var POINTERDOWN_EVENTS = ['mousedown', 'touchstart'];
    var INTERACTION_EVENTS$2 = ['click', 'keydown'];
    var MDCTextFieldFoundation = /** @class */ (function (_super) {
        __extends(MDCTextFieldFoundation, _super);
        /**
         * @param adapter
         * @param foundationMap Map from subcomponent names to their subfoundations.
         */
        function MDCTextFieldFoundation(adapter, foundationMap) {
            if (foundationMap === void 0) { foundationMap = {}; }
            var _this = _super.call(this, __assign(__assign({}, MDCTextFieldFoundation.defaultAdapter), adapter)) || this;
            _this.isFocused_ = false;
            _this.receivedUserInput_ = false;
            _this.isValid_ = true;
            _this.useNativeValidation_ = true;
            _this.validateOnValueChange_ = true;
            _this.helperText_ = foundationMap.helperText;
            _this.characterCounter_ = foundationMap.characterCounter;
            _this.leadingIcon_ = foundationMap.leadingIcon;
            _this.trailingIcon_ = foundationMap.trailingIcon;
            _this.inputFocusHandler_ = function () { return _this.activateFocus(); };
            _this.inputBlurHandler_ = function () { return _this.deactivateFocus(); };
            _this.inputInputHandler_ = function () { return _this.handleInput(); };
            _this.setPointerXOffset_ = function (evt) { return _this.setTransformOrigin(evt); };
            _this.textFieldInteractionHandler_ = function () { return _this.handleTextFieldInteraction(); };
            _this.validationAttributeChangeHandler_ = function (attributesList) {
                return _this.handleValidationAttributeChange(attributesList);
            };
            return _this;
        }
        Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
            get: function () {
                return cssClasses$g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation, "strings", {
            get: function () {
                return strings$k;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation, "numbers", {
            get: function () {
                return numbers$6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat_", {
            get: function () {
                var type = this.getNativeInput_().type;
                return ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
            get: function () {
                return this.shouldAlwaysFloat_ || this.isFocused_ || !!this.getValue() ||
                    this.isBadInput_();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
            get: function () {
                return !this.isFocused_ && !this.isValid() && !!this.getValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
            /**
             * See {@link MDCTextFieldAdapter} for typing information on parameters and
             * return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return true; },
                    setInputAttr: function () { return undefined; },
                    removeInputAttr: function () { return undefined; },
                    registerTextFieldInteractionHandler: function () { return undefined; },
                    deregisterTextFieldInteractionHandler: function () { return undefined; },
                    registerInputInteractionHandler: function () { return undefined; },
                    deregisterInputInteractionHandler: function () { return undefined; },
                    registerValidationAttributeChangeHandler: function () {
                        return new MutationObserver(function () { return undefined; });
                    },
                    deregisterValidationAttributeChangeHandler: function () { return undefined; },
                    getNativeInput: function () { return null; },
                    isFocused: function () { return false; },
                    activateLineRipple: function () { return undefined; },
                    deactivateLineRipple: function () { return undefined; },
                    setLineRippleTransformOrigin: function () { return undefined; },
                    shakeLabel: function () { return undefined; },
                    floatLabel: function () { return undefined; },
                    setLabelRequired: function () { return undefined; },
                    hasLabel: function () { return false; },
                    getLabelWidth: function () { return 0; },
                    hasOutline: function () { return false; },
                    notchOutline: function () { return undefined; },
                    closeOutline: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCTextFieldFoundation.prototype.init = function () {
            var _this = this;
            if (this.adapter.hasLabel() && this.getNativeInput_().required) {
                this.adapter.setLabelRequired(true);
            }
            if (this.adapter.isFocused()) {
                this.inputFocusHandler_();
            }
            else if (this.adapter.hasLabel() && this.shouldFloat) {
                this.notchOutline(true);
                this.adapter.floatLabel(true);
                this.styleFloating_(true);
            }
            this.adapter.registerInputInteractionHandler('focus', this.inputFocusHandler_);
            this.adapter.registerInputInteractionHandler('blur', this.inputBlurHandler_);
            this.adapter.registerInputInteractionHandler('input', this.inputInputHandler_);
            POINTERDOWN_EVENTS.forEach(function (evtType) {
                _this.adapter.registerInputInteractionHandler(evtType, _this.setPointerXOffset_);
            });
            INTERACTION_EVENTS$2.forEach(function (evtType) {
                _this.adapter.registerTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
            });
            this.validationObserver_ =
                this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
            this.setCharacterCounter_(this.getValue().length);
        };
        MDCTextFieldFoundation.prototype.destroy = function () {
            var _this = this;
            this.adapter.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
            this.adapter.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
            this.adapter.deregisterInputInteractionHandler('input', this.inputInputHandler_);
            POINTERDOWN_EVENTS.forEach(function (evtType) {
                _this.adapter.deregisterInputInteractionHandler(evtType, _this.setPointerXOffset_);
            });
            INTERACTION_EVENTS$2.forEach(function (evtType) {
                _this.adapter.deregisterTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
            });
            this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver_);
        };
        /**
         * Handles user interactions with the Text Field.
         */
        MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function () {
            var nativeInput = this.adapter.getNativeInput();
            if (nativeInput && nativeInput.disabled) {
                return;
            }
            this.receivedUserInput_ = true;
        };
        /**
         * Handles validation attribute changes
         */
        MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function (attributesList) {
            var _this = this;
            attributesList.some(function (attributeName) {
                if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
                    _this.styleValidity_(true);
                    _this.adapter.setLabelRequired(_this.getNativeInput_().required);
                    return true;
                }
                return false;
            });
            if (attributesList.indexOf('maxlength') > -1) {
                this.setCharacterCounter_(this.getValue().length);
            }
        };
        /**
         * Opens/closes the notched outline.
         */
        MDCTextFieldFoundation.prototype.notchOutline = function (openNotch) {
            if (!this.adapter.hasOutline() || !this.adapter.hasLabel()) {
                return;
            }
            if (openNotch) {
                var labelWidth = this.adapter.getLabelWidth() * numbers$6.LABEL_SCALE;
                this.adapter.notchOutline(labelWidth);
            }
            else {
                this.adapter.closeOutline();
            }
        };
        /**
         * Activates the text field focus state.
         */
        MDCTextFieldFoundation.prototype.activateFocus = function () {
            this.isFocused_ = true;
            this.styleFocused_(this.isFocused_);
            this.adapter.activateLineRipple();
            if (this.adapter.hasLabel()) {
                this.notchOutline(this.shouldFloat);
                this.adapter.floatLabel(this.shouldFloat);
                this.styleFloating_(this.shouldFloat);
                this.adapter.shakeLabel(this.shouldShake);
            }
            if (this.helperText_ &&
                (this.helperText_.isPersistent() || !this.helperText_.isValidation() ||
                    !this.isValid_)) {
                this.helperText_.showToScreenReader();
            }
        };
        /**
         * Sets the line ripple's transform origin, so that the line ripple activate
         * animation will animate out from the user's click location.
         */
        MDCTextFieldFoundation.prototype.setTransformOrigin = function (evt) {
            if (this.isDisabled() || this.adapter.hasOutline()) {
                return;
            }
            var touches = evt.touches;
            var targetEvent = touches ? touches[0] : evt;
            var targetClientRect = targetEvent.target.getBoundingClientRect();
            var normalizedX = targetEvent.clientX - targetClientRect.left;
            this.adapter.setLineRippleTransformOrigin(normalizedX);
        };
        /**
         * Handles input change of text input and text area.
         */
        MDCTextFieldFoundation.prototype.handleInput = function () {
            this.autoCompleteFocus();
            this.setCharacterCounter_(this.getValue().length);
        };
        /**
         * Activates the Text Field's focus state in cases when the input value
         * changes without user input (e.g. programmatically).
         */
        MDCTextFieldFoundation.prototype.autoCompleteFocus = function () {
            if (!this.receivedUserInput_) {
                this.activateFocus();
            }
        };
        /**
         * Deactivates the Text Field's focus state.
         */
        MDCTextFieldFoundation.prototype.deactivateFocus = function () {
            this.isFocused_ = false;
            this.adapter.deactivateLineRipple();
            var isValid = this.isValid();
            this.styleValidity_(isValid);
            this.styleFocused_(this.isFocused_);
            if (this.adapter.hasLabel()) {
                this.notchOutline(this.shouldFloat);
                this.adapter.floatLabel(this.shouldFloat);
                this.styleFloating_(this.shouldFloat);
                this.adapter.shakeLabel(this.shouldShake);
            }
            if (!this.shouldFloat) {
                this.receivedUserInput_ = false;
            }
        };
        MDCTextFieldFoundation.prototype.getValue = function () {
            return this.getNativeInput_().value;
        };
        /**
         * @param value The value to set on the input Element.
         */
        MDCTextFieldFoundation.prototype.setValue = function (value) {
            // Prevent Safari from moving the caret to the end of the input when the
            // value has not changed.
            if (this.getValue() !== value) {
                this.getNativeInput_().value = value;
            }
            this.setCharacterCounter_(value.length);
            if (this.validateOnValueChange_) {
                var isValid = this.isValid();
                this.styleValidity_(isValid);
            }
            if (this.adapter.hasLabel()) {
                this.notchOutline(this.shouldFloat);
                this.adapter.floatLabel(this.shouldFloat);
                this.styleFloating_(this.shouldFloat);
                if (this.validateOnValueChange_) {
                    this.adapter.shakeLabel(this.shouldShake);
                }
            }
        };
        /**
         * @return The custom validity state, if set; otherwise, the result of a
         *     native validity check.
         */
        MDCTextFieldFoundation.prototype.isValid = function () {
            return this.useNativeValidation_ ? this.isNativeInputValid_() :
                this.isValid_;
        };
        /**
         * @param isValid Sets the custom validity state of the Text Field.
         */
        MDCTextFieldFoundation.prototype.setValid = function (isValid) {
            this.isValid_ = isValid;
            this.styleValidity_(isValid);
            var shouldShake = !isValid && !this.isFocused_ && !!this.getValue();
            if (this.adapter.hasLabel()) {
                this.adapter.shakeLabel(shouldShake);
            }
        };
        /**
         * @param shouldValidate Whether or not validity should be updated on
         *     value change.
         */
        MDCTextFieldFoundation.prototype.setValidateOnValueChange = function (shouldValidate) {
            this.validateOnValueChange_ = shouldValidate;
        };
        /**
         * @return Whether or not validity should be updated on value change. `true`
         *     by default.
         */
        MDCTextFieldFoundation.prototype.getValidateOnValueChange = function () {
            return this.validateOnValueChange_;
        };
        /**
         * Enables or disables the use of native validation. Use this for custom
         * validation.
         * @param useNativeValidation Set this to false to ignore native input
         *     validation.
         */
        MDCTextFieldFoundation.prototype.setUseNativeValidation = function (useNativeValidation) {
            this.useNativeValidation_ = useNativeValidation;
        };
        MDCTextFieldFoundation.prototype.isDisabled = function () {
            return this.getNativeInput_().disabled;
        };
        /**
         * @param disabled Sets the text-field disabled or enabled.
         */
        MDCTextFieldFoundation.prototype.setDisabled = function (disabled) {
            this.getNativeInput_().disabled = disabled;
            this.styleDisabled_(disabled);
        };
        /**
         * @param content Sets the content of the helper text.
         */
        MDCTextFieldFoundation.prototype.setHelperTextContent = function (content) {
            if (this.helperText_) {
                this.helperText_.setContent(content);
            }
        };
        /**
         * Sets the aria label of the leading icon.
         */
        MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function (label) {
            if (this.leadingIcon_) {
                this.leadingIcon_.setAriaLabel(label);
            }
        };
        /**
         * Sets the text content of the leading icon.
         */
        MDCTextFieldFoundation.prototype.setLeadingIconContent = function (content) {
            if (this.leadingIcon_) {
                this.leadingIcon_.setContent(content);
            }
        };
        /**
         * Sets the aria label of the trailing icon.
         */
        MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function (label) {
            if (this.trailingIcon_) {
                this.trailingIcon_.setAriaLabel(label);
            }
        };
        /**
         * Sets the text content of the trailing icon.
         */
        MDCTextFieldFoundation.prototype.setTrailingIconContent = function (content) {
            if (this.trailingIcon_) {
                this.trailingIcon_.setContent(content);
            }
        };
        /**
         * Sets character counter values that shows characters used and the total
         * character limit.
         */
        MDCTextFieldFoundation.prototype.setCharacterCounter_ = function (currentLength) {
            if (!this.characterCounter_) {
                return;
            }
            var maxLength = this.getNativeInput_().maxLength;
            if (maxLength === -1) {
                throw new Error('MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.');
            }
            this.characterCounter_.setCounterValue(currentLength, maxLength);
        };
        /**
         * @return True if the Text Field input fails in converting the user-supplied
         *     value.
         */
        MDCTextFieldFoundation.prototype.isBadInput_ = function () {
            // The badInput property is not supported in IE 11 💩.
            return this.getNativeInput_().validity.badInput || false;
        };
        /**
         * @return The result of native validity checking (ValidityState.valid).
         */
        MDCTextFieldFoundation.prototype.isNativeInputValid_ = function () {
            return this.getNativeInput_().validity.valid;
        };
        /**
         * Styles the component based on the validity state.
         */
        MDCTextFieldFoundation.prototype.styleValidity_ = function (isValid) {
            var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;
            if (isValid) {
                this.adapter.removeClass(INVALID);
            }
            else {
                this.adapter.addClass(INVALID);
            }
            if (this.helperText_) {
                this.helperText_.setValidity(isValid);
                // We dynamically set or unset aria-describedby for validation helper text
                // only, based on whether the field is valid
                var helperTextValidation = this.helperText_.isValidation();
                if (!helperTextValidation) {
                    return;
                }
                var helperTextVisible = this.helperText_.isVisible();
                var helperTextId = this.helperText_.getId();
                if (helperTextVisible && helperTextId) {
                    this.adapter.setInputAttr(strings$k.ARIA_DESCRIBEDBY, helperTextId);
                }
                else {
                    this.adapter.removeInputAttr(strings$k.ARIA_DESCRIBEDBY);
                }
            }
        };
        /**
         * Styles the component based on the focused state.
         */
        MDCTextFieldFoundation.prototype.styleFocused_ = function (isFocused) {
            var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;
            if (isFocused) {
                this.adapter.addClass(FOCUSED);
            }
            else {
                this.adapter.removeClass(FOCUSED);
            }
        };
        /**
         * Styles the component based on the disabled state.
         */
        MDCTextFieldFoundation.prototype.styleDisabled_ = function (isDisabled) {
            var _a = MDCTextFieldFoundation.cssClasses, DISABLED = _a.DISABLED, INVALID = _a.INVALID;
            if (isDisabled) {
                this.adapter.addClass(DISABLED);
                this.adapter.removeClass(INVALID);
            }
            else {
                this.adapter.removeClass(DISABLED);
            }
            if (this.leadingIcon_) {
                this.leadingIcon_.setDisabled(isDisabled);
            }
            if (this.trailingIcon_) {
                this.trailingIcon_.setDisabled(isDisabled);
            }
        };
        /**
         * Styles the component based on the label floating state.
         */
        MDCTextFieldFoundation.prototype.styleFloating_ = function (isFloating) {
            var LABEL_FLOATING = MDCTextFieldFoundation.cssClasses.LABEL_FLOATING;
            if (isFloating) {
                this.adapter.addClass(LABEL_FLOATING);
            }
            else {
                this.adapter.removeClass(LABEL_FLOATING);
            }
        };
        /**
         * @return The native text input element from the host environment, or an
         *     object with the same shape for unit tests.
         */
        MDCTextFieldFoundation.prototype.getNativeInput_ = function () {
            // this.adapter may be undefined in foundation unit tests. This happens when
            // testdouble is creating a mock object and invokes the
            // shouldShake/shouldFloat getters (which in turn call getValue(), which
            // calls this method) before init() has been called from the MDCTextField
            // constructor. To work around that issue, we return a dummy object.
            var nativeInput = this.adapter ? this.adapter.getNativeInput() : null;
            return nativeInput || {
                disabled: false,
                maxLength: -1,
                required: false,
                type: 'input',
                validity: {
                    badInput: false,
                    valid: true,
                },
                value: '',
            };
        };
        return MDCTextFieldFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$f = {
        HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
        HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg',
        ROOT: 'mdc-text-field-helper-text',
    };
    var strings$j = {
        ARIA_HIDDEN: 'aria-hidden',
        ROLE: 'role',
        ROOT_SELECTOR: "." + cssClasses$f.ROOT,
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTextFieldHelperTextFoundation = /** @class */ (function (_super) {
        __extends(MDCTextFieldHelperTextFoundation, _super);
        function MDCTextFieldHelperTextFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCTextFieldHelperTextFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCTextFieldHelperTextFoundation, "cssClasses", {
            get: function () {
                return cssClasses$f;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldHelperTextFoundation, "strings", {
            get: function () {
                return strings$j;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldHelperTextFoundation, "defaultAdapter", {
            /**
             * See {@link MDCTextFieldHelperTextAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    getAttr: function () { return null; },
                    setAttr: function () { return undefined; },
                    removeAttr: function () { return undefined; },
                    setContent: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCTextFieldHelperTextFoundation.prototype.getId = function () {
            return this.adapter.getAttr('id');
        };
        MDCTextFieldHelperTextFoundation.prototype.isVisible = function () {
            return this.adapter.getAttr(strings$j.ARIA_HIDDEN) !== 'true';
        };
        /**
         * Sets the content of the helper text field.
         */
        MDCTextFieldHelperTextFoundation.prototype.setContent = function (content) {
            this.adapter.setContent(content);
        };
        MDCTextFieldHelperTextFoundation.prototype.isPersistent = function () {
            return this.adapter.hasClass(cssClasses$f.HELPER_TEXT_PERSISTENT);
        };
        /**
         * @param isPersistent Sets the persistency of the helper text.
         */
        MDCTextFieldHelperTextFoundation.prototype.setPersistent = function (isPersistent) {
            if (isPersistent) {
                this.adapter.addClass(cssClasses$f.HELPER_TEXT_PERSISTENT);
            }
            else {
                this.adapter.removeClass(cssClasses$f.HELPER_TEXT_PERSISTENT);
            }
        };
        /**
         * @return whether the helper text acts as an error validation message.
         */
        MDCTextFieldHelperTextFoundation.prototype.isValidation = function () {
            return this.adapter.hasClass(cssClasses$f.HELPER_TEXT_VALIDATION_MSG);
        };
        /**
         * @param isValidation True to make the helper text act as an error validation message.
         */
        MDCTextFieldHelperTextFoundation.prototype.setValidation = function (isValidation) {
            if (isValidation) {
                this.adapter.addClass(cssClasses$f.HELPER_TEXT_VALIDATION_MSG);
            }
            else {
                this.adapter.removeClass(cssClasses$f.HELPER_TEXT_VALIDATION_MSG);
            }
        };
        /**
         * Makes the helper text visible to the screen reader.
         */
        MDCTextFieldHelperTextFoundation.prototype.showToScreenReader = function () {
            this.adapter.removeAttr(strings$j.ARIA_HIDDEN);
        };
        /**
         * Sets the validity of the helper text based on the input validity.
         */
        MDCTextFieldHelperTextFoundation.prototype.setValidity = function (inputIsValid) {
            var helperTextIsPersistent = this.adapter.hasClass(cssClasses$f.HELPER_TEXT_PERSISTENT);
            var helperTextIsValidationMsg = this.adapter.hasClass(cssClasses$f.HELPER_TEXT_VALIDATION_MSG);
            var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;
            if (validationMsgNeedsDisplay) {
                this.showToScreenReader();
                this.adapter.setAttr(strings$j.ROLE, 'alert');
            }
            else {
                this.adapter.removeAttr(strings$j.ROLE);
            }
            if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
                this.hide_();
            }
        };
        /**
         * Hides the help text from screen readers.
         */
        MDCTextFieldHelperTextFoundation.prototype.hide_ = function () {
            this.adapter.setAttr(strings$j.ARIA_HIDDEN, 'true');
        };
        return MDCTextFieldHelperTextFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTextFieldHelperText = /** @class */ (function (_super) {
        __extends(MDCTextFieldHelperText, _super);
        function MDCTextFieldHelperText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTextFieldHelperText.attachTo = function (root) {
            return new MDCTextFieldHelperText(root);
        };
        Object.defineProperty(MDCTextFieldHelperText.prototype, "foundationForTextField", {
            // Provided for access by MDCTextField component
            get: function () {
                return this.foundation;
            },
            enumerable: true,
            configurable: true
        });
        MDCTextFieldHelperText.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                getAttr: function (attr) { return _this.root.getAttribute(attr); },
                setAttr: function (attr, value) { return _this.root.setAttribute(attr, value); },
                removeAttr: function (attr) { return _this.root.removeAttribute(attr); },
                setContent: function (content) {
                    _this.root.textContent = content;
                },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCTextFieldHelperTextFoundation(adapter);
        };
        return MDCTextFieldHelperText;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$i = {
        ICON_EVENT: 'MDCTextField:icon',
        ICON_ROLE: 'button',
    };
    var cssClasses$e = {
        ROOT: 'mdc-text-field__icon',
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var INTERACTION_EVENTS$1 = ['click', 'keydown'];
    var MDCTextFieldIconFoundation = /** @class */ (function (_super) {
        __extends(MDCTextFieldIconFoundation, _super);
        function MDCTextFieldIconFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCTextFieldIconFoundation.defaultAdapter), adapter)) || this;
            _this.savedTabIndex_ = null;
            _this.interactionHandler_ = function (evt) { return _this.handleInteraction(evt); };
            return _this;
        }
        Object.defineProperty(MDCTextFieldIconFoundation, "strings", {
            get: function () {
                return strings$i;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldIconFoundation, "cssClasses", {
            get: function () {
                return cssClasses$e;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldIconFoundation, "defaultAdapter", {
            /**
             * See {@link MDCTextFieldIconAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    getAttr: function () { return null; },
                    setAttr: function () { return undefined; },
                    removeAttr: function () { return undefined; },
                    setContent: function () { return undefined; },
                    registerInteractionHandler: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                    notifyIconAction: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCTextFieldIconFoundation.prototype.init = function () {
            var _this = this;
            this.savedTabIndex_ = this.adapter.getAttr('tabindex');
            INTERACTION_EVENTS$1.forEach(function (evtType) {
                _this.adapter.registerInteractionHandler(evtType, _this.interactionHandler_);
            });
        };
        MDCTextFieldIconFoundation.prototype.destroy = function () {
            var _this = this;
            INTERACTION_EVENTS$1.forEach(function (evtType) {
                _this.adapter.deregisterInteractionHandler(evtType, _this.interactionHandler_);
            });
        };
        MDCTextFieldIconFoundation.prototype.setDisabled = function (disabled) {
            if (!this.savedTabIndex_) {
                return;
            }
            if (disabled) {
                this.adapter.setAttr('tabindex', '-1');
                this.adapter.removeAttr('role');
            }
            else {
                this.adapter.setAttr('tabindex', this.savedTabIndex_);
                this.adapter.setAttr('role', strings$i.ICON_ROLE);
            }
        };
        MDCTextFieldIconFoundation.prototype.setAriaLabel = function (label) {
            this.adapter.setAttr('aria-label', label);
        };
        MDCTextFieldIconFoundation.prototype.setContent = function (content) {
            this.adapter.setContent(content);
        };
        MDCTextFieldIconFoundation.prototype.handleInteraction = function (evt) {
            var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;
            if (evt.type === 'click' || isEnterKey) {
                evt.preventDefault(); // stop click from causing host label to focus
                // input
                this.adapter.notifyIconAction();
            }
        };
        return MDCTextFieldIconFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTextFieldIcon = /** @class */ (function (_super) {
        __extends(MDCTextFieldIcon, _super);
        function MDCTextFieldIcon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTextFieldIcon.attachTo = function (root) {
            return new MDCTextFieldIcon(root);
        };
        Object.defineProperty(MDCTextFieldIcon.prototype, "foundationForTextField", {
            // Provided for access by MDCTextField component
            get: function () {
                return this.foundation;
            },
            enumerable: true,
            configurable: true
        });
        MDCTextFieldIcon.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                getAttr: function (attr) { return _this.root.getAttribute(attr); },
                setAttr: function (attr, value) { return _this.root.setAttribute(attr, value); },
                removeAttr: function (attr) { return _this.root.removeAttribute(attr); },
                setContent: function (content) {
                    _this.root.textContent = content;
                },
                registerInteractionHandler: function (evtType, handler) { return _this.listen(evtType, handler); },
                deregisterInteractionHandler: function (evtType, handler) { return _this.unlisten(evtType, handler); },
                notifyIconAction: function () { return _this.emit(MDCTextFieldIconFoundation.strings.ICON_EVENT, {} /* evtData */, true /* shouldBubble */); },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCTextFieldIconFoundation(adapter);
        };
        return MDCTextFieldIcon;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTextField = /** @class */ (function (_super) {
        __extends(MDCTextField, _super);
        function MDCTextField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTextField.attachTo = function (root) {
            return new MDCTextField(root);
        };
        MDCTextField.prototype.initialize = function (rippleFactory, lineRippleFactory, helperTextFactory, characterCounterFactory, iconFactory, labelFactory, outlineFactory) {
            if (rippleFactory === void 0) { rippleFactory = function (el, foundation) { return new MDCRipple(el, foundation); }; }
            if (lineRippleFactory === void 0) { lineRippleFactory = function (el) { return new MDCLineRipple(el); }; }
            if (helperTextFactory === void 0) { helperTextFactory = function (el) { return new MDCTextFieldHelperText(el); }; }
            if (characterCounterFactory === void 0) { characterCounterFactory = function (el) { return new MDCTextFieldCharacterCounter(el); }; }
            if (iconFactory === void 0) { iconFactory = function (el) { return new MDCTextFieldIcon(el); }; }
            if (labelFactory === void 0) { labelFactory = function (el) { return new MDCFloatingLabel(el); }; }
            if (outlineFactory === void 0) { outlineFactory = function (el) { return new MDCNotchedOutline(el); }; }
            this.input_ = this.root.querySelector(strings$k.INPUT_SELECTOR);
            var labelElement = this.root.querySelector(strings$k.LABEL_SELECTOR);
            this.label_ = labelElement ? labelFactory(labelElement) : null;
            var lineRippleElement = this.root.querySelector(strings$k.LINE_RIPPLE_SELECTOR);
            this.lineRipple_ = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
            var outlineElement = this.root.querySelector(strings$k.OUTLINE_SELECTOR);
            this.outline_ = outlineElement ? outlineFactory(outlineElement) : null;
            // Helper text
            var helperTextStrings = MDCTextFieldHelperTextFoundation.strings;
            var nextElementSibling = this.root.nextElementSibling;
            var hasHelperLine = (nextElementSibling && nextElementSibling.classList.contains(cssClasses$g.HELPER_LINE));
            var helperTextEl = hasHelperLine && nextElementSibling && nextElementSibling.querySelector(helperTextStrings.ROOT_SELECTOR);
            this.helperText_ = helperTextEl ? helperTextFactory(helperTextEl) : null;
            // Character counter
            var characterCounterStrings = MDCTextFieldCharacterCounterFoundation.strings;
            var characterCounterEl = this.root.querySelector(characterCounterStrings.ROOT_SELECTOR);
            // If character counter is not found in root element search in sibling element.
            if (!characterCounterEl && hasHelperLine && nextElementSibling) {
                characterCounterEl = nextElementSibling.querySelector(characterCounterStrings.ROOT_SELECTOR);
            }
            this.characterCounter_ = characterCounterEl ? characterCounterFactory(characterCounterEl) : null;
            // Leading icon
            var leadingIconEl = this.root.querySelector(strings$k.LEADING_ICON_SELECTOR);
            this.leadingIcon_ = leadingIconEl ? iconFactory(leadingIconEl) : null;
            // Trailing icon
            var trailingIconEl = this.root.querySelector(strings$k.TRAILING_ICON_SELECTOR);
            this.trailingIcon_ = trailingIconEl ? iconFactory(trailingIconEl) : null;
            // Prefix and Suffix
            this.prefix_ = this.root.querySelector(strings$k.PREFIX_SELECTOR);
            this.suffix_ = this.root.querySelector(strings$k.SUFFIX_SELECTOR);
            this.ripple = this.createRipple_(rippleFactory);
        };
        MDCTextField.prototype.destroy = function () {
            if (this.ripple) {
                this.ripple.destroy();
            }
            if (this.lineRipple_) {
                this.lineRipple_.destroy();
            }
            if (this.helperText_) {
                this.helperText_.destroy();
            }
            if (this.characterCounter_) {
                this.characterCounter_.destroy();
            }
            if (this.leadingIcon_) {
                this.leadingIcon_.destroy();
            }
            if (this.trailingIcon_) {
                this.trailingIcon_.destroy();
            }
            if (this.label_) {
                this.label_.destroy();
            }
            if (this.outline_) {
                this.outline_.destroy();
            }
            _super.prototype.destroy.call(this);
        };
        /**
         * Initializes the Text Field's internal state based on the environment's
         * state.
         */
        MDCTextField.prototype.initialSyncWithDOM = function () {
            this.disabled = this.input_.disabled;
        };
        Object.defineProperty(MDCTextField.prototype, "value", {
            get: function () {
                return this.foundation.getValue();
            },
            /**
             * @param value The value to set on the input.
             */
            set: function (value) {
                this.foundation.setValue(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "disabled", {
            get: function () {
                return this.foundation.isDisabled();
            },
            /**
             * @param disabled Sets the Text Field disabled or enabled.
             */
            set: function (disabled) {
                this.foundation.setDisabled(disabled);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "valid", {
            get: function () {
                return this.foundation.isValid();
            },
            /**
             * @param valid Sets the Text Field valid or invalid.
             */
            set: function (valid) {
                this.foundation.setValid(valid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "required", {
            get: function () {
                return this.input_.required;
            },
            /**
             * @param required Sets the Text Field to required.
             */
            set: function (required) {
                this.input_.required = required;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "pattern", {
            get: function () {
                return this.input_.pattern;
            },
            /**
             * @param pattern Sets the input element's validation pattern.
             */
            set: function (pattern) {
                this.input_.pattern = pattern;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "minLength", {
            get: function () {
                return this.input_.minLength;
            },
            /**
             * @param minLength Sets the input element's minLength.
             */
            set: function (minLength) {
                this.input_.minLength = minLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "maxLength", {
            get: function () {
                return this.input_.maxLength;
            },
            /**
             * @param maxLength Sets the input element's maxLength.
             */
            set: function (maxLength) {
                // Chrome throws exception if maxLength is set to a value less than zero
                if (maxLength < 0) {
                    this.input_.removeAttribute('maxLength');
                }
                else {
                    this.input_.maxLength = maxLength;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "min", {
            get: function () {
                return this.input_.min;
            },
            /**
             * @param min Sets the input element's min.
             */
            set: function (min) {
                this.input_.min = min;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "max", {
            get: function () {
                return this.input_.max;
            },
            /**
             * @param max Sets the input element's max.
             */
            set: function (max) {
                this.input_.max = max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "step", {
            get: function () {
                return this.input_.step;
            },
            /**
             * @param step Sets the input element's step.
             */
            set: function (step) {
                this.input_.step = step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "helperTextContent", {
            /**
             * Sets the helper text element content.
             */
            set: function (content) {
                this.foundation.setHelperTextContent(content);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "leadingIconAriaLabel", {
            /**
             * Sets the aria label of the leading icon.
             */
            set: function (label) {
                this.foundation.setLeadingIconAriaLabel(label);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "leadingIconContent", {
            /**
             * Sets the text content of the leading icon.
             */
            set: function (content) {
                this.foundation.setLeadingIconContent(content);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "trailingIconAriaLabel", {
            /**
             * Sets the aria label of the trailing icon.
             */
            set: function (label) {
                this.foundation.setTrailingIconAriaLabel(label);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "trailingIconContent", {
            /**
             * Sets the text content of the trailing icon.
             */
            set: function (content) {
                this.foundation.setTrailingIconContent(content);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "useNativeValidation", {
            /**
             * Enables or disables the use of native validation. Use this for custom validation.
             * @param useNativeValidation Set this to false to ignore native input validation.
             */
            set: function (useNativeValidation) {
                this.foundation.setUseNativeValidation(useNativeValidation);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "prefixText", {
            /**
             * Gets the text content of the prefix, or null if it does not exist.
             */
            get: function () {
                return this.prefix_ ? this.prefix_.textContent : null;
            },
            /**
             * Sets the text content of the prefix, if it exists.
             */
            set: function (prefixText) {
                if (this.prefix_) {
                    this.prefix_.textContent = prefixText;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTextField.prototype, "suffixText", {
            /**
             * Gets the text content of the suffix, or null if it does not exist.
             */
            get: function () {
                return this.suffix_ ? this.suffix_.textContent : null;
            },
            /**
             * Sets the text content of the suffix, if it exists.
             */
            set: function (suffixText) {
                if (this.suffix_) {
                    this.suffix_.textContent = suffixText;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Focuses the input element.
         */
        MDCTextField.prototype.focus = function () {
            this.input_.focus();
        };
        /**
         * Recomputes the outline SVG path for the outline element.
         */
        MDCTextField.prototype.layout = function () {
            var openNotch = this.foundation.shouldFloat;
            this.foundation.notchOutline(openNotch);
        };
        MDCTextField.prototype.getDefaultFoundation = function () {
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = __assign(__assign(__assign(__assign(__assign({}, this.getRootAdapterMethods_()), this.getInputAdapterMethods_()), this.getLabelAdapterMethods_()), this.getLineRippleAdapterMethods_()), this.getOutlineAdapterMethods_());
            // tslint:enable:object-literal-sort-keys
            return new MDCTextFieldFoundation(adapter, this.getFoundationMap_());
        };
        MDCTextField.prototype.getRootAdapterMethods_ = function () {
            var _this = this;
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                registerTextFieldInteractionHandler: function (evtType, handler) {
                    _this.listen(evtType, handler);
                },
                deregisterTextFieldInteractionHandler: function (evtType, handler) {
                    _this.unlisten(evtType, handler);
                },
                registerValidationAttributeChangeHandler: function (handler) {
                    var getAttributesList = function (mutationsList) {
                        return mutationsList
                            .map(function (mutation) { return mutation.attributeName; })
                            .filter(function (attributeName) { return attributeName; });
                    };
                    var observer = new MutationObserver(function (mutationsList) { return handler(getAttributesList(mutationsList)); });
                    var config = { attributes: true };
                    observer.observe(_this.input_, config);
                    return observer;
                },
                deregisterValidationAttributeChangeHandler: function (observer) {
                    observer.disconnect();
                },
            };
            // tslint:enable:object-literal-sort-keys
        };
        MDCTextField.prototype.getInputAdapterMethods_ = function () {
            var _this = this;
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                getNativeInput: function () { return _this.input_; },
                setInputAttr: function (attr, value) {
                    _this.input_.setAttribute(attr, value);
                },
                removeInputAttr: function (attr) {
                    _this.input_.removeAttribute(attr);
                },
                isFocused: function () { return document.activeElement === _this.input_; },
                registerInputInteractionHandler: function (evtType, handler) {
                    _this.input_.addEventListener(evtType, handler, applyPassive());
                },
                deregisterInputInteractionHandler: function (evtType, handler) {
                    _this.input_.removeEventListener(evtType, handler, applyPassive());
                },
            };
            // tslint:enable:object-literal-sort-keys
        };
        MDCTextField.prototype.getLabelAdapterMethods_ = function () {
            var _this = this;
            return {
                floatLabel: function (shouldFloat) { return _this.label_ && _this.label_.float(shouldFloat); },
                getLabelWidth: function () { return _this.label_ ? _this.label_.getWidth() : 0; },
                hasLabel: function () { return Boolean(_this.label_); },
                shakeLabel: function (shouldShake) { return _this.label_ && _this.label_.shake(shouldShake); },
                setLabelRequired: function (isRequired) { return _this.label_ && _this.label_.setRequired(isRequired); },
            };
        };
        MDCTextField.prototype.getLineRippleAdapterMethods_ = function () {
            var _this = this;
            return {
                activateLineRipple: function () {
                    if (_this.lineRipple_) {
                        _this.lineRipple_.activate();
                    }
                },
                deactivateLineRipple: function () {
                    if (_this.lineRipple_) {
                        _this.lineRipple_.deactivate();
                    }
                },
                setLineRippleTransformOrigin: function (normalizedX) {
                    if (_this.lineRipple_) {
                        _this.lineRipple_.setRippleCenter(normalizedX);
                    }
                },
            };
        };
        MDCTextField.prototype.getOutlineAdapterMethods_ = function () {
            var _this = this;
            return {
                closeOutline: function () { return _this.outline_ && _this.outline_.closeNotch(); },
                hasOutline: function () { return Boolean(_this.outline_); },
                notchOutline: function (labelWidth) { return _this.outline_ && _this.outline_.notch(labelWidth); },
            };
        };
        /**
         * @return A map of all subcomponents to subfoundations.
         */
        MDCTextField.prototype.getFoundationMap_ = function () {
            return {
                characterCounter: this.characterCounter_ ?
                    this.characterCounter_.foundationForTextField :
                    undefined,
                helperText: this.helperText_ ? this.helperText_.foundationForTextField :
                    undefined,
                leadingIcon: this.leadingIcon_ ?
                    this.leadingIcon_.foundationForTextField :
                    undefined,
                trailingIcon: this.trailingIcon_ ?
                    this.trailingIcon_.foundationForTextField :
                    undefined,
            };
        };
        MDCTextField.prototype.createRipple_ = function (rippleFactory) {
            var _this = this;
            var isTextArea = this.root.classList.contains(cssClasses$g.TEXTAREA);
            var isOutlined = this.root.classList.contains(cssClasses$g.OUTLINED);
            if (isTextArea || isOutlined) {
                return null;
            }
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = __assign(__assign({}, MDCRipple.createAdapter(this)), { isSurfaceActive: function () { return matches(_this.input_, ':active'); }, registerInteractionHandler: function (evtType, handler) { return _this.input_.addEventListener(evtType, handler, applyPassive()); }, deregisterInteractionHandler: function (evtType, handler) {
                    return _this.input_.removeEventListener(evtType, handler, applyPassive());
                } });
            // tslint:enable:object-literal-sort-keys
            return rippleFactory(this.root, new MDCRippleFoundation(adapter));
        };
        return MDCTextField;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$d = {
        ANCHOR: 'mdc-menu-surface--anchor',
        ANIMATING_CLOSED: 'mdc-menu-surface--animating-closed',
        ANIMATING_OPEN: 'mdc-menu-surface--animating-open',
        FIXED: 'mdc-menu-surface--fixed',
        IS_OPEN_BELOW: 'mdc-menu-surface--is-open-below',
        OPEN: 'mdc-menu-surface--open',
        ROOT: 'mdc-menu-surface',
    };
    // tslint:disable:object-literal-sort-keys
    var strings$h = {
        CLOSED_EVENT: 'MDCMenuSurface:closed',
        CLOSING_EVENT: 'MDCMenuSurface:closing',
        OPENED_EVENT: 'MDCMenuSurface:opened',
        FOCUSABLE_ELEMENTS: [
            'button:not(:disabled)',
            '[href]:not([aria-disabled="true"])',
            'input:not(:disabled)',
            'select:not(:disabled)',
            'textarea:not(:disabled)',
            '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
        ].join(', '),
    };
    // tslint:enable:object-literal-sort-keys
    var numbers$5 = {
        /** Total duration of menu-surface open animation. */
        TRANSITION_OPEN_DURATION: 120,
        /** Total duration of menu-surface close animation. */
        TRANSITION_CLOSE_DURATION: 75,
        /** Margin left to the edge of the viewport when menu-surface is at maximum possible height. Also used as a viewport margin. */
        MARGIN_TO_EDGE: 32,
        /** Ratio of anchor width to menu-surface width for switching from corner positioning to center positioning. */
        ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67,
    };
    /**
     * Enum for bits in the {@see Corner) bitmap.
     */
    var CornerBit;
    (function (CornerBit) {
        CornerBit[CornerBit["BOTTOM"] = 1] = "BOTTOM";
        CornerBit[CornerBit["CENTER"] = 2] = "CENTER";
        CornerBit[CornerBit["RIGHT"] = 4] = "RIGHT";
        CornerBit[CornerBit["FLIP_RTL"] = 8] = "FLIP_RTL";
    })(CornerBit || (CornerBit = {}));
    /**
     * Enum for representing an element corner for positioning the menu-surface.
     *
     * The START constants map to LEFT if element directionality is left
     * to right and RIGHT if the directionality is right to left.
     * Likewise END maps to RIGHT or LEFT depending on the directionality.
     */
    var Corner;
    (function (Corner) {
        Corner[Corner["TOP_LEFT"] = 0] = "TOP_LEFT";
        Corner[Corner["TOP_RIGHT"] = 4] = "TOP_RIGHT";
        Corner[Corner["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
        Corner[Corner["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
        Corner[Corner["TOP_START"] = 8] = "TOP_START";
        Corner[Corner["TOP_END"] = 12] = "TOP_END";
        Corner[Corner["BOTTOM_START"] = 9] = "BOTTOM_START";
        Corner[Corner["BOTTOM_END"] = 13] = "BOTTOM_END";
    })(Corner || (Corner = {}));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCMenuSurfaceFoundation = /** @class */ (function (_super) {
        __extends(MDCMenuSurfaceFoundation, _super);
        function MDCMenuSurfaceFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCMenuSurfaceFoundation.defaultAdapter), adapter)) || this;
            _this.isSurfaceOpen = false;
            _this.isQuickOpen = false;
            _this.isHoistedElement = false;
            _this.isFixedPosition = false;
            _this.openAnimationEndTimerId = 0;
            _this.closeAnimationEndTimerId = 0;
            _this.animationRequestId = 0;
            _this.anchorCorner = Corner.TOP_START;
            /**
             * Corner of the menu surface to which menu surface is attached to anchor.
             *
             *  Anchor corner --->+----------+
             *                    |  ANCHOR  |
             *                    +----------+
             *  Origin corner --->+--------------+
             *                    |              |
             *                    |              |
             *                    | MENU SURFACE |
             *                    |              |
             *                    |              |
             *                    +--------------+
             */
            _this.originCorner = Corner.TOP_START;
            _this.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 };
            _this.position = { x: 0, y: 0 };
            return _this;
        }
        Object.defineProperty(MDCMenuSurfaceFoundation, "cssClasses", {
            get: function () {
                return cssClasses$d;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenuSurfaceFoundation, "strings", {
            get: function () {
                return strings$h;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenuSurfaceFoundation, "numbers", {
            get: function () {
                return numbers$5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenuSurfaceFoundation, "Corner", {
            get: function () {
                return Corner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenuSurfaceFoundation, "defaultAdapter", {
            /**
             * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    hasAnchor: function () { return false; },
                    isElementInContainer: function () { return false; },
                    isFocused: function () { return false; },
                    isRtl: function () { return false; },
                    getInnerDimensions: function () { return ({ height: 0, width: 0 }); },
                    getAnchorDimensions: function () { return null; },
                    getWindowDimensions: function () { return ({ height: 0, width: 0 }); },
                    getBodyDimensions: function () { return ({ height: 0, width: 0 }); },
                    getWindowScroll: function () { return ({ x: 0, y: 0 }); },
                    setPosition: function () { return undefined; },
                    setMaxHeight: function () { return undefined; },
                    setTransformOrigin: function () { return undefined; },
                    saveFocus: function () { return undefined; },
                    restoreFocus: function () { return undefined; },
                    notifyClose: function () { return undefined; },
                    notifyOpen: function () { return undefined; },
                    notifyClosing: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCMenuSurfaceFoundation.prototype.init = function () {
            var _a = MDCMenuSurfaceFoundation.cssClasses, ROOT = _a.ROOT, OPEN = _a.OPEN;
            if (!this.adapter.hasClass(ROOT)) {
                throw new Error(ROOT + " class required in root element.");
            }
            if (this.adapter.hasClass(OPEN)) {
                this.isSurfaceOpen = true;
            }
        };
        MDCMenuSurfaceFoundation.prototype.destroy = function () {
            clearTimeout(this.openAnimationEndTimerId);
            clearTimeout(this.closeAnimationEndTimerId);
            // Cancel any currently running animations.
            cancelAnimationFrame(this.animationRequestId);
        };
        /**
         * @param corner Default anchor corner alignment of top-left menu surface corner.
         */
        MDCMenuSurfaceFoundation.prototype.setAnchorCorner = function (corner) {
            this.anchorCorner = corner;
        };
        /**
         * Flip menu corner horizontally.
         */
        MDCMenuSurfaceFoundation.prototype.flipCornerHorizontally = function () {
            this.originCorner = this.originCorner ^ CornerBit.RIGHT;
        };
        /**
         * @param margin Set of margin values from anchor.
         */
        MDCMenuSurfaceFoundation.prototype.setAnchorMargin = function (margin) {
            this.anchorMargin.top = margin.top || 0;
            this.anchorMargin.right = margin.right || 0;
            this.anchorMargin.bottom = margin.bottom || 0;
            this.anchorMargin.left = margin.left || 0;
        };
        /** Used to indicate if the menu-surface is hoisted to the body. */
        MDCMenuSurfaceFoundation.prototype.setIsHoisted = function (isHoisted) {
            this.isHoistedElement = isHoisted;
        };
        /** Used to set the menu-surface calculations based on a fixed position menu. */
        MDCMenuSurfaceFoundation.prototype.setFixedPosition = function (isFixedPosition) {
            this.isFixedPosition = isFixedPosition;
        };
        /** Sets the menu-surface position on the page. */
        MDCMenuSurfaceFoundation.prototype.setAbsolutePosition = function (x, y) {
            this.position.x = this.isFinite(x) ? x : 0;
            this.position.y = this.isFinite(y) ? y : 0;
        };
        MDCMenuSurfaceFoundation.prototype.setQuickOpen = function (quickOpen) {
            this.isQuickOpen = quickOpen;
        };
        MDCMenuSurfaceFoundation.prototype.isOpen = function () {
            return this.isSurfaceOpen;
        };
        /**
         * Open the menu surface.
         */
        MDCMenuSurfaceFoundation.prototype.open = function () {
            var _this = this;
            if (this.isSurfaceOpen) {
                return;
            }
            this.adapter.saveFocus();
            if (this.isQuickOpen) {
                this.isSurfaceOpen = true;
                this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                this.dimensions = this.adapter.getInnerDimensions();
                this.autoposition();
                this.adapter.notifyOpen();
            }
            else {
                this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
                this.animationRequestId = requestAnimationFrame(function () {
                    _this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                    _this.dimensions = _this.adapter.getInnerDimensions();
                    _this.autoposition();
                    _this.openAnimationEndTimerId = setTimeout(function () {
                        _this.openAnimationEndTimerId = 0;
                        _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
                        _this.adapter.notifyOpen();
                    }, numbers$5.TRANSITION_OPEN_DURATION);
                });
                this.isSurfaceOpen = true;
            }
        };
        /**
         * Closes the menu surface.
         */
        MDCMenuSurfaceFoundation.prototype.close = function (skipRestoreFocus) {
            var _this = this;
            if (skipRestoreFocus === void 0) { skipRestoreFocus = false; }
            if (!this.isSurfaceOpen) {
                return;
            }
            this.adapter.notifyClosing();
            if (this.isQuickOpen) {
                this.isSurfaceOpen = false;
                if (!skipRestoreFocus) {
                    this.maybeRestoreFocus();
                }
                this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
                this.adapter.notifyClose();
                return;
            }
            this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
            requestAnimationFrame(function () {
                _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
                _this.closeAnimationEndTimerId = setTimeout(function () {
                    _this.closeAnimationEndTimerId = 0;
                    _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
                    _this.adapter.notifyClose();
                }, numbers$5.TRANSITION_CLOSE_DURATION);
            });
            this.isSurfaceOpen = false;
            if (!skipRestoreFocus) {
                this.maybeRestoreFocus();
            }
        };
        /** Handle clicks and close if not within menu-surface element. */
        MDCMenuSurfaceFoundation.prototype.handleBodyClick = function (evt) {
            var el = evt.target;
            if (this.adapter.isElementInContainer(el)) {
                return;
            }
            this.close();
        };
        /** Handle keys that close the surface. */
        MDCMenuSurfaceFoundation.prototype.handleKeydown = function (evt) {
            var keyCode = evt.keyCode, key = evt.key;
            var isEscape = key === 'Escape' || keyCode === 27;
            if (isEscape) {
                this.close();
            }
        };
        MDCMenuSurfaceFoundation.prototype.autoposition = function () {
            var _a;
            // Compute measurements for autoposition methods reuse.
            this.measurements = this.getAutoLayoutmeasurements();
            var corner = this.getoriginCorner();
            var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight(corner);
            var verticalAlignment = this.hasBit(corner, CornerBit.BOTTOM) ? 'bottom' : 'top';
            var horizontalAlignment = this.hasBit(corner, CornerBit.RIGHT) ? 'right' : 'left';
            var horizontalOffset = this.getHorizontalOriginOffset(corner);
            var verticalOffset = this.getVerticalOriginOffset(corner);
            var _b = this.measurements, anchorSize = _b.anchorSize, surfaceSize = _b.surfaceSize;
            var position = (_a = {},
                _a[horizontalAlignment] = horizontalOffset,
                _a[verticalAlignment] = verticalOffset,
                _a);
            // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.
            if (anchorSize.width / surfaceSize.width > numbers$5.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
                horizontalAlignment = 'center';
            }
            // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element
            if (this.isHoistedElement || this.isFixedPosition) {
                this.adjustPositionForHoistedElement(position);
            }
            this.adapter.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
            this.adapter.setPosition(position);
            this.adapter.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '');
            // If it is opened from the top then add is-open-below class
            if (!this.hasBit(corner, CornerBit.BOTTOM)) {
                this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
            }
        };
        /**
         * @return Measurements used to position menu surface popup.
         */
        MDCMenuSurfaceFoundation.prototype.getAutoLayoutmeasurements = function () {
            var anchorRect = this.adapter.getAnchorDimensions();
            var bodySize = this.adapter.getBodyDimensions();
            var viewportSize = this.adapter.getWindowDimensions();
            var windowScroll = this.adapter.getWindowScroll();
            if (!anchorRect) {
                // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
                anchorRect = {
                    top: this.position.y,
                    right: this.position.x,
                    bottom: this.position.y,
                    left: this.position.x,
                    width: 0,
                    height: 0,
                };
                // tslint:enable:object-literal-sort-keys
            }
            return {
                anchorSize: anchorRect,
                bodySize: bodySize,
                surfaceSize: this.dimensions,
                viewportDistance: {
                    // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
                    top: anchorRect.top,
                    right: viewportSize.width - anchorRect.right,
                    bottom: viewportSize.height - anchorRect.bottom,
                    left: anchorRect.left,
                },
                viewportSize: viewportSize,
                windowScroll: windowScroll,
            };
        };
        /**
         * Computes the corner of the anchor from which to animate and position the
         * menu surface.
         *
         * Only LEFT or RIGHT bit is used to position the menu surface ignoring RTL
         * context. E.g., menu surface will be positioned from right side on TOP_END.
         */
        MDCMenuSurfaceFoundation.prototype.getoriginCorner = function () {
            var corner = this.originCorner;
            var _a = this.measurements, viewportDistance = _a.viewportDistance, anchorSize = _a.anchorSize, surfaceSize = _a.surfaceSize;
            var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE;
            var isAnchoredToBottom = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
            var availableTop;
            var availableBottom;
            if (isAnchoredToBottom) {
                availableTop =
                    viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.bottom;
                availableBottom =
                    viewportDistance.bottom - MARGIN_TO_EDGE - this.anchorMargin.bottom;
            }
            else {
                availableTop =
                    viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.top;
                availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE +
                    anchorSize.height - this.anchorMargin.top;
            }
            var isAvailableBottom = availableBottom - surfaceSize.height > 0;
            if (!isAvailableBottom && availableTop > availableBottom) {
                // Attach bottom side of surface to the anchor.
                corner = this.setBit(corner, CornerBit.BOTTOM);
            }
            var isRtl = this.adapter.isRtl();
            var isFlipRtl = this.hasBit(this.anchorCorner, CornerBit.FLIP_RTL);
            var hasRightBit = this.hasBit(this.anchorCorner, CornerBit.RIGHT) ||
                this.hasBit(corner, CornerBit.RIGHT);
            // Whether surface attached to right side of anchor element.
            var isAnchoredToRight = false;
            // Anchored to start
            if (isRtl && isFlipRtl) {
                isAnchoredToRight = !hasRightBit;
            }
            else {
                // Anchored to right
                isAnchoredToRight = hasRightBit;
            }
            var availableLeft;
            var availableRight;
            if (isAnchoredToRight) {
                availableLeft =
                    viewportDistance.left + anchorSize.width + this.anchorMargin.right;
                availableRight = viewportDistance.right - this.anchorMargin.right;
            }
            else {
                availableLeft = viewportDistance.left + this.anchorMargin.left;
                availableRight =
                    viewportDistance.right + anchorSize.width - this.anchorMargin.left;
            }
            var isAvailableLeft = availableLeft - surfaceSize.width > 0;
            var isAvailableRight = availableRight - surfaceSize.width > 0;
            var isOriginCornerAlignedToEnd = this.hasBit(corner, CornerBit.FLIP_RTL) &&
                this.hasBit(corner, CornerBit.RIGHT);
            if (isAvailableRight && isOriginCornerAlignedToEnd && isRtl ||
                !isAvailableLeft && isOriginCornerAlignedToEnd) {
                // Attach left side of surface to the anchor.
                corner = this.unsetBit(corner, CornerBit.RIGHT);
            }
            else if (isAvailableLeft && isAnchoredToRight && isRtl ||
                (isAvailableLeft && !isAnchoredToRight && hasRightBit) ||
                (!isAvailableRight && availableLeft >= availableRight)) {
                // Attach right side of surface to the anchor.
                corner = this.setBit(corner, CornerBit.RIGHT);
            }
            return corner;
        };
        /**
         * @param corner Origin corner of the menu surface.
         * @return Maximum height of the menu surface, based on available space. 0 indicates should not be set.
         */
        MDCMenuSurfaceFoundation.prototype.getMenuSurfaceMaxHeight = function (corner) {
            var viewportDistance = this.measurements.viewportDistance;
            var maxHeight = 0;
            var isBottomAligned = this.hasBit(corner, CornerBit.BOTTOM);
            var isBottomAnchored = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
            var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE;
            // When maximum height is not specified, it is handled from CSS.
            if (isBottomAligned) {
                maxHeight = viewportDistance.top + this.anchorMargin.top - MARGIN_TO_EDGE;
                if (!isBottomAnchored) {
                    maxHeight += this.measurements.anchorSize.height;
                }
            }
            else {
                maxHeight = viewportDistance.bottom - this.anchorMargin.bottom +
                    this.measurements.anchorSize.height - MARGIN_TO_EDGE;
                if (isBottomAnchored) {
                    maxHeight -= this.measurements.anchorSize.height;
                }
            }
            return maxHeight;
        };
        /**
         * @param corner Origin corner of the menu surface.
         * @return Horizontal offset of menu surface origin corner from corresponding anchor corner.
         */
        MDCMenuSurfaceFoundation.prototype.getHorizontalOriginOffset = function (corner) {
            var anchorSize = this.measurements.anchorSize;
            // isRightAligned corresponds to using the 'right' property on the surface.
            var isRightAligned = this.hasBit(corner, CornerBit.RIGHT);
            var avoidHorizontalOverlap = this.hasBit(this.anchorCorner, CornerBit.RIGHT);
            if (isRightAligned) {
                var rightOffset = avoidHorizontalOverlap ?
                    anchorSize.width - this.anchorMargin.left :
                    this.anchorMargin.right;
                // For hoisted or fixed elements, adjust the offset by the difference
                // between viewport width and body width so when we calculate the right
                // value (`adjustPositionForHoistedElement`) based on the element
                // position, the right property is correct.
                if (this.isHoistedElement || this.isFixedPosition) {
                    return rightOffset -
                        (this.measurements.viewportSize.width -
                            this.measurements.bodySize.width);
                }
                return rightOffset;
            }
            return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.right :
                this.anchorMargin.left;
        };
        /**
         * @param corner Origin corner of the menu surface.
         * @return Vertical offset of menu surface origin corner from corresponding anchor corner.
         */
        MDCMenuSurfaceFoundation.prototype.getVerticalOriginOffset = function (corner) {
            var anchorSize = this.measurements.anchorSize;
            var isBottomAligned = this.hasBit(corner, CornerBit.BOTTOM);
            var avoidVerticalOverlap = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
            var y = 0;
            if (isBottomAligned) {
                y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin.top :
                    -this.anchorMargin.bottom;
            }
            else {
                y = avoidVerticalOverlap ?
                    (anchorSize.height + this.anchorMargin.bottom) :
                    this.anchorMargin.top;
            }
            return y;
        };
        /** Calculates the offsets for positioning the menu-surface when the menu-surface has been hoisted to the body. */
        MDCMenuSurfaceFoundation.prototype.adjustPositionForHoistedElement = function (position) {
            var e_1, _a;
            var _b = this.measurements, windowScroll = _b.windowScroll, viewportDistance = _b.viewportDistance;
            var props = Object.keys(position);
            try {
                for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                    var prop = props_1_1.value;
                    var value = position[prop] || 0;
                    // Hoisted surfaces need to have the anchor elements location on the page added to the
                    // position properties for proper alignment on the body.
                    value += viewportDistance[prop];
                    // Surfaces that are absolutely positioned need to have additional calculations for scroll
                    // and bottom positioning.
                    if (!this.isFixedPosition) {
                        if (prop === 'top') {
                            value += windowScroll.y;
                        }
                        else if (prop === 'bottom') {
                            value -= windowScroll.y;
                        }
                        else if (prop === 'left') {
                            value += windowScroll.x;
                        }
                        else { // prop === 'right'
                            value -= windowScroll.x;
                        }
                    }
                    position[prop] = value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * The last focused element when the menu surface was opened should regain focus, if the user is
         * focused on or within the menu surface when it is closed.
         */
        MDCMenuSurfaceFoundation.prototype.maybeRestoreFocus = function () {
            var isRootFocused = this.adapter.isFocused();
            var childHasFocus = document.activeElement &&
                this.adapter.isElementInContainer(document.activeElement);
            if (isRootFocused || childHasFocus) {
                this.adapter.restoreFocus();
            }
        };
        MDCMenuSurfaceFoundation.prototype.hasBit = function (corner, bit) {
            return Boolean(corner & bit); // tslint:disable-line:no-bitwise
        };
        MDCMenuSurfaceFoundation.prototype.setBit = function (corner, bit) {
            return corner | bit; // tslint:disable-line:no-bitwise
        };
        MDCMenuSurfaceFoundation.prototype.unsetBit = function (corner, bit) {
            return corner ^ bit;
        };
        /**
         * isFinite that doesn't force conversion to number type.
         * Equivalent to Number.isFinite in ES2015, which is not supported in IE.
         */
        MDCMenuSurfaceFoundation.prototype.isFinite = function (num) {
            return typeof num === 'number' && isFinite(num);
        };
        return MDCMenuSurfaceFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssPropertyNameMap = {
        animation: {
            prefixed: '-webkit-animation',
            standard: 'animation',
        },
        transform: {
            prefixed: '-webkit-transform',
            standard: 'transform',
        },
        transition: {
            prefixed: '-webkit-transition',
            standard: 'transition',
        },
    };
    var jsEventTypeMap = {
        animationend: {
            cssProperty: 'animation',
            prefixed: 'webkitAnimationEnd',
            standard: 'animationend',
        },
        animationiteration: {
            cssProperty: 'animation',
            prefixed: 'webkitAnimationIteration',
            standard: 'animationiteration',
        },
        animationstart: {
            cssProperty: 'animation',
            prefixed: 'webkitAnimationStart',
            standard: 'animationstart',
        },
        transitionend: {
            cssProperty: 'transition',
            prefixed: 'webkitTransitionEnd',
            standard: 'transitionend',
        },
    };
    function isWindow(windowObj) {
        return Boolean(windowObj.document) && typeof windowObj.document.createElement === 'function';
    }
    function getCorrectPropertyName(windowObj, cssProperty) {
        if (isWindow(windowObj) && cssProperty in cssPropertyNameMap) {
            var el = windowObj.document.createElement('div');
            var _a = cssPropertyNameMap[cssProperty], standard = _a.standard, prefixed = _a.prefixed;
            var isStandard = standard in el.style;
            return isStandard ? standard : prefixed;
        }
        return cssProperty;
    }
    function getCorrectEventName(windowObj, eventType) {
        if (isWindow(windowObj) && eventType in jsEventTypeMap) {
            var el = windowObj.document.createElement('div');
            var _a = jsEventTypeMap[eventType], standard = _a.standard, prefixed = _a.prefixed, cssProperty = _a.cssProperty;
            var isStandard = cssProperty in el.style;
            return isStandard ? standard : prefixed;
        }
        return eventType;
    }

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCMenuSurface = /** @class */ (function (_super) {
        __extends(MDCMenuSurface, _super);
        function MDCMenuSurface() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCMenuSurface.attachTo = function (root) {
            return new MDCMenuSurface(root);
        };
        MDCMenuSurface.prototype.initialSyncWithDOM = function () {
            var _this = this;
            var parentEl = this.root.parentElement;
            this.anchorElement = parentEl && parentEl.classList.contains(cssClasses$d.ANCHOR) ? parentEl : null;
            if (this.root.classList.contains(cssClasses$d.FIXED)) {
                this.setFixedPosition(true);
            }
            this.handleKeydown = function (event) {
                _this.foundation.handleKeydown(event);
            };
            this.handleBodyClick = function (event) {
                _this.foundation.handleBodyClick(event);
            };
            // capture so that no race between handleBodyClick and quickOpen when
            // menusurface opened on button click which registers this listener
            this.registerBodyClickListener = function () {
                document.body.addEventListener('click', _this.handleBodyClick, { capture: true });
            };
            this.deregisterBodyClickListener = function () {
                document.body.removeEventListener('click', _this.handleBodyClick, { capture: true });
            };
            this.listen('keydown', this.handleKeydown);
            this.listen(strings$h.OPENED_EVENT, this.registerBodyClickListener);
            this.listen(strings$h.CLOSED_EVENT, this.deregisterBodyClickListener);
        };
        MDCMenuSurface.prototype.destroy = function () {
            this.unlisten('keydown', this.handleKeydown);
            this.unlisten(strings$h.OPENED_EVENT, this.registerBodyClickListener);
            this.unlisten(strings$h.CLOSED_EVENT, this.deregisterBodyClickListener);
            _super.prototype.destroy.call(this);
        };
        MDCMenuSurface.prototype.isOpen = function () {
            return this.foundation.isOpen();
        };
        MDCMenuSurface.prototype.open = function () {
            this.foundation.open();
        };
        MDCMenuSurface.prototype.close = function (skipRestoreFocus) {
            if (skipRestoreFocus === void 0) { skipRestoreFocus = false; }
            this.foundation.close(skipRestoreFocus);
        };
        Object.defineProperty(MDCMenuSurface.prototype, "quickOpen", {
            set: function (quickOpen) {
                this.foundation.setQuickOpen(quickOpen);
            },
            enumerable: true,
            configurable: true
        });
        /** Sets the foundation to use page offsets for an positioning when the menu is hoisted to the body. */
        MDCMenuSurface.prototype.setIsHoisted = function (isHoisted) {
            this.foundation.setIsHoisted(isHoisted);
        };
        /** Sets the element that the menu-surface is anchored to. */
        MDCMenuSurface.prototype.setMenuSurfaceAnchorElement = function (element) {
            this.anchorElement = element;
        };
        /** Sets the menu-surface to position: fixed. */
        MDCMenuSurface.prototype.setFixedPosition = function (isFixed) {
            if (isFixed) {
                this.root.classList.add(cssClasses$d.FIXED);
            }
            else {
                this.root.classList.remove(cssClasses$d.FIXED);
            }
            this.foundation.setFixedPosition(isFixed);
        };
        /** Sets the absolute x/y position to position based on. Requires the menu to be hoisted. */
        MDCMenuSurface.prototype.setAbsolutePosition = function (x, y) {
            this.foundation.setAbsolutePosition(x, y);
            this.setIsHoisted(true);
        };
        /**
         * @param corner Default anchor corner alignment of top-left surface corner.
         */
        MDCMenuSurface.prototype.setAnchorCorner = function (corner) {
            this.foundation.setAnchorCorner(corner);
        };
        MDCMenuSurface.prototype.setAnchorMargin = function (margin) {
            this.foundation.setAnchorMargin(margin);
        };
        MDCMenuSurface.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                hasAnchor: function () { return !!_this.anchorElement; },
                notifyClose: function () {
                    return _this.emit(MDCMenuSurfaceFoundation.strings.CLOSED_EVENT, {});
                },
                notifyClosing: function () {
                    _this.emit(MDCMenuSurfaceFoundation.strings.CLOSING_EVENT, {});
                },
                notifyOpen: function () {
                    return _this.emit(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, {});
                },
                isElementInContainer: function (el) { return _this.root.contains(el); },
                isRtl: function () {
                    return getComputedStyle(_this.root).getPropertyValue('direction') === 'rtl';
                },
                setTransformOrigin: function (origin) {
                    var propertyName = getCorrectPropertyName(window, 'transform') + "-origin";
                    _this.root.style.setProperty(propertyName, origin);
                },
                isFocused: function () { return document.activeElement === _this.root; },
                saveFocus: function () {
                    _this.previousFocus =
                        document.activeElement;
                },
                restoreFocus: function () {
                    if (_this.root.contains(document.activeElement)) {
                        if (_this.previousFocus && _this.previousFocus.focus) {
                            _this.previousFocus.focus();
                        }
                    }
                },
                getInnerDimensions: function () {
                    return {
                        width: _this.root.offsetWidth,
                        height: _this.root.offsetHeight
                    };
                },
                getAnchorDimensions: function () { return _this.anchorElement ?
                    _this.anchorElement.getBoundingClientRect() :
                    null; },
                getWindowDimensions: function () {
                    return { width: window.innerWidth, height: window.innerHeight };
                },
                getBodyDimensions: function () {
                    return { width: document.body.clientWidth, height: document.body.clientHeight };
                },
                getWindowScroll: function () {
                    return { x: window.pageXOffset, y: window.pageYOffset };
                },
                setPosition: function (position) {
                    var rootHTML = _this.root;
                    rootHTML.style.left = 'left' in position ? position.left + "px" : '';
                    rootHTML.style.right = 'right' in position ? position.right + "px" : '';
                    rootHTML.style.top = 'top' in position ? position.top + "px" : '';
                    rootHTML.style.bottom =
                        'bottom' in position ? position.bottom + "px" : '';
                },
                setMaxHeight: function (height) {
                    _this.root.style.maxHeight = height;
                },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCMenuSurfaceFoundation(adapter);
        };
        return MDCMenuSurface;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$c = {
        MENU_SELECTED_LIST_ITEM: 'mdc-menu-item--selected',
        MENU_SELECTION_GROUP: 'mdc-menu__selection-group',
        ROOT: 'mdc-menu',
    };
    var strings$g = {
        ARIA_CHECKED_ATTR: 'aria-checked',
        ARIA_DISABLED_ATTR: 'aria-disabled',
        CHECKBOX_SELECTOR: 'input[type="checkbox"]',
        LIST_SELECTOR: '.mdc-list',
        SELECTED_EVENT: 'MDCMenu:selected',
    };
    var numbers$4 = {
        FOCUS_ROOT_INDEX: -1,
    };
    var DefaultFocusState;
    (function (DefaultFocusState) {
        DefaultFocusState[DefaultFocusState["NONE"] = 0] = "NONE";
        DefaultFocusState[DefaultFocusState["LIST_ROOT"] = 1] = "LIST_ROOT";
        DefaultFocusState[DefaultFocusState["FIRST_ITEM"] = 2] = "FIRST_ITEM";
        DefaultFocusState[DefaultFocusState["LAST_ITEM"] = 3] = "LAST_ITEM";
    })(DefaultFocusState || (DefaultFocusState = {}));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCMenuFoundation = /** @class */ (function (_super) {
        __extends(MDCMenuFoundation, _super);
        function MDCMenuFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCMenuFoundation.defaultAdapter), adapter)) || this;
            _this.closeAnimationEndTimerId_ = 0;
            _this.defaultFocusState_ = DefaultFocusState.LIST_ROOT;
            return _this;
        }
        Object.defineProperty(MDCMenuFoundation, "cssClasses", {
            get: function () {
                return cssClasses$c;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenuFoundation, "strings", {
            get: function () {
                return strings$g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenuFoundation, "numbers", {
            get: function () {
                return numbers$4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenuFoundation, "defaultAdapter", {
            /**
             * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClassToElementAtIndex: function () { return undefined; },
                    removeClassFromElementAtIndex: function () { return undefined; },
                    addAttributeToElementAtIndex: function () { return undefined; },
                    removeAttributeFromElementAtIndex: function () { return undefined; },
                    elementContainsClass: function () { return false; },
                    closeSurface: function () { return undefined; },
                    getElementIndex: function () { return -1; },
                    notifySelected: function () { return undefined; },
                    getMenuItemCount: function () { return 0; },
                    focusItemAtIndex: function () { return undefined; },
                    focusListRoot: function () { return undefined; },
                    getSelectedSiblingOfItemAtIndex: function () { return -1; },
                    isSelectableItemAtIndex: function () { return false; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCMenuFoundation.prototype.destroy = function () {
            if (this.closeAnimationEndTimerId_) {
                clearTimeout(this.closeAnimationEndTimerId_);
            }
            this.adapter.closeSurface();
        };
        MDCMenuFoundation.prototype.handleKeydown = function (evt) {
            var key = evt.key, keyCode = evt.keyCode;
            var isTab = key === 'Tab' || keyCode === 9;
            if (isTab) {
                this.adapter.closeSurface(/** skipRestoreFocus */ true);
            }
        };
        MDCMenuFoundation.prototype.handleItemAction = function (listItem) {
            var _this = this;
            var index = this.adapter.getElementIndex(listItem);
            if (index < 0) {
                return;
            }
            this.adapter.notifySelected({ index: index });
            this.adapter.closeSurface();
            // Wait for the menu to close before adding/removing classes that affect styles.
            this.closeAnimationEndTimerId_ = setTimeout(function () {
                // Recompute the index in case the menu contents have changed.
                var recomputedIndex = _this.adapter.getElementIndex(listItem);
                if (recomputedIndex >= 0 &&
                    _this.adapter.isSelectableItemAtIndex(recomputedIndex)) {
                    _this.setSelectedIndex(recomputedIndex);
                }
            }, MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION);
        };
        MDCMenuFoundation.prototype.handleMenuSurfaceOpened = function () {
            switch (this.defaultFocusState_) {
                case DefaultFocusState.FIRST_ITEM:
                    this.adapter.focusItemAtIndex(0);
                    break;
                case DefaultFocusState.LAST_ITEM:
                    this.adapter.focusItemAtIndex(this.adapter.getMenuItemCount() - 1);
                    break;
                case DefaultFocusState.NONE:
                    // Do nothing.
                    break;
                default:
                    this.adapter.focusListRoot();
                    break;
            }
        };
        /**
         * Sets default focus state where the menu should focus every time when menu
         * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
         * default.
         */
        MDCMenuFoundation.prototype.setDefaultFocusState = function (focusState) {
            this.defaultFocusState_ = focusState;
        };
        /**
         * Selects the list item at `index` within the menu.
         * @param index Index of list item within the menu.
         */
        MDCMenuFoundation.prototype.setSelectedIndex = function (index) {
            this.validatedIndex_(index);
            if (!this.adapter.isSelectableItemAtIndex(index)) {
                throw new Error('MDCMenuFoundation: No selection group at specified index.');
            }
            var prevSelectedIndex = this.adapter.getSelectedSiblingOfItemAtIndex(index);
            if (prevSelectedIndex >= 0) {
                this.adapter.removeAttributeFromElementAtIndex(prevSelectedIndex, strings$g.ARIA_CHECKED_ATTR);
                this.adapter.removeClassFromElementAtIndex(prevSelectedIndex, cssClasses$c.MENU_SELECTED_LIST_ITEM);
            }
            this.adapter.addClassToElementAtIndex(index, cssClasses$c.MENU_SELECTED_LIST_ITEM);
            this.adapter.addAttributeToElementAtIndex(index, strings$g.ARIA_CHECKED_ATTR, 'true');
        };
        /**
         * Sets the enabled state to isEnabled for the menu item at the given index.
         * @param index Index of the menu item
         * @param isEnabled The desired enabled state of the menu item.
         */
        MDCMenuFoundation.prototype.setEnabled = function (index, isEnabled) {
            this.validatedIndex_(index);
            if (isEnabled) {
                this.adapter.removeClassFromElementAtIndex(index, cssClasses$n.LIST_ITEM_DISABLED_CLASS);
                this.adapter.addAttributeToElementAtIndex(index, strings$g.ARIA_DISABLED_ATTR, 'false');
            }
            else {
                this.adapter.addClassToElementAtIndex(index, cssClasses$n.LIST_ITEM_DISABLED_CLASS);
                this.adapter.addAttributeToElementAtIndex(index, strings$g.ARIA_DISABLED_ATTR, 'true');
            }
        };
        MDCMenuFoundation.prototype.validatedIndex_ = function (index) {
            var menuSize = this.adapter.getMenuItemCount();
            var isIndexInRange = index >= 0 && index < menuSize;
            if (!isIndexInRange) {
                throw new Error('MDCMenuFoundation: No list item at specified index.');
            }
        };
        return MDCMenuFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCMenu = /** @class */ (function (_super) {
        __extends(MDCMenu, _super);
        function MDCMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCMenu.attachTo = function (root) {
            return new MDCMenu(root);
        };
        MDCMenu.prototype.initialize = function (menuSurfaceFactory, listFactory) {
            if (menuSurfaceFactory === void 0) { menuSurfaceFactory = function (el) { return new MDCMenuSurface(el); }; }
            if (listFactory === void 0) { listFactory = function (el) { return new MDCList(el); }; }
            this.menuSurfaceFactory_ = menuSurfaceFactory;
            this.listFactory_ = listFactory;
        };
        MDCMenu.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.menuSurface_ = this.menuSurfaceFactory_(this.root);
            var list = this.root.querySelector(strings$g.LIST_SELECTOR);
            if (list) {
                this.list_ = this.listFactory_(list);
                this.list_.wrapFocus = true;
            }
            else {
                this.list_ = null;
            }
            this.handleKeydown_ = function (evt) { return _this.foundation.handleKeydown(evt); };
            this.handleItemAction_ = function (evt) {
                return _this.foundation.handleItemAction(_this.items[evt.detail.index]);
            };
            this.handleMenuSurfaceOpened_ = function () {
                return _this.foundation.handleMenuSurfaceOpened();
            };
            this.menuSurface_.listen(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
            this.listen('keydown', this.handleKeydown_);
            this.listen(MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);
        };
        MDCMenu.prototype.destroy = function () {
            if (this.list_) {
                this.list_.destroy();
            }
            this.menuSurface_.destroy();
            this.menuSurface_.unlisten(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
            this.unlisten('keydown', this.handleKeydown_);
            this.unlisten(MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(MDCMenu.prototype, "open", {
            get: function () {
                return this.menuSurface_.isOpen();
            },
            set: function (value) {
                if (value) {
                    this.menuSurface_.open();
                }
                else {
                    this.menuSurface_.close();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenu.prototype, "wrapFocus", {
            get: function () {
                return this.list_ ? this.list_.wrapFocus : false;
            },
            set: function (value) {
                if (this.list_) {
                    this.list_.wrapFocus = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenu.prototype, "hasTypeahead", {
            /**
             * Sets whether the menu has typeahead functionality.
             * @param value Whether typeahead is enabled.
             */
            set: function (value) {
                if (this.list_) {
                    this.list_.hasTypeahead = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenu.prototype, "typeaheadInProgress", {
            /**
             * @return Whether typeahead logic is currently matching some user prefix.
             */
            get: function () {
                return this.list_ ? this.list_.typeaheadInProgress : false;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Given the next desired character from the user, adds it to the typeahead
         * buffer. Then, attempts to find the next option matching the buffer. Wraps
         * around if at the end of options.
         *
         * @param nextChar The next character to add to the prefix buffer.
         * @param startingIndex The index from which to start matching. Only relevant
         *     when starting a new match sequence. To start a new match sequence,
         *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
         *     to clear after a set interval defined in list foundation. Defaults to
         *     the currently focused index.
         * @return The index of the matched item, or -1 if no match.
         */
        MDCMenu.prototype.typeaheadMatchItem = function (nextChar, startingIndex) {
            if (this.list_) {
                return this.list_.typeaheadMatchItem(nextChar, startingIndex);
            }
            return -1;
        };
        /**
         * Layout the underlying list element in the case of any dynamic updates
         * to its structure.
         */
        MDCMenu.prototype.layout = function () {
            if (this.list_) {
                this.list_.layout();
            }
        };
        Object.defineProperty(MDCMenu.prototype, "items", {
            /**
             * Return the items within the menu. Note that this only contains the set of elements within
             * the items container that are proper list items, and not supplemental / presentational DOM
             * elements.
             */
            get: function () {
                return this.list_ ? this.list_.listElements : [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenu.prototype, "singleSelection", {
            /**
             * Turns on/off the underlying list's single selection mode. Used mainly
             * by select menu.
             *
             * @param singleSelection Whether to enable single selection mode.
             */
            set: function (singleSelection) {
                if (this.list_) {
                    this.list_.singleSelection = singleSelection;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenu.prototype, "selectedIndex", {
            /**
             * Retrieves the selected index. Only applicable to select menus.
             * @return The selected index, which is a number for single selection and
             *     radio lists, and an array of numbers for checkbox lists.
             */
            get: function () {
                return this.list_ ? this.list_.selectedIndex : numbers$9.UNSET_INDEX;
            },
            /**
             * Sets the selected index of the list. Only applicable to select menus.
             * @param index The selected index, which is a number for single selection and
             *     radio lists, and an array of numbers for checkbox lists.
             */
            set: function (index) {
                if (this.list_) {
                    this.list_.selectedIndex = index;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCMenu.prototype, "quickOpen", {
            set: function (quickOpen) {
                this.menuSurface_.quickOpen = quickOpen;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets default focus state where the menu should focus every time when menu
         * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
         * default.
         * @param focusState Default focus state.
         */
        MDCMenu.prototype.setDefaultFocusState = function (focusState) {
            this.foundation.setDefaultFocusState(focusState);
        };
        /**
         * @param corner Default anchor corner alignment of top-left menu corner.
         */
        MDCMenu.prototype.setAnchorCorner = function (corner) {
            this.menuSurface_.setAnchorCorner(corner);
        };
        MDCMenu.prototype.setAnchorMargin = function (margin) {
            this.menuSurface_.setAnchorMargin(margin);
        };
        /**
         * Sets the list item as the selected row at the specified index.
         * @param index Index of list item within menu.
         */
        MDCMenu.prototype.setSelectedIndex = function (index) {
            this.foundation.setSelectedIndex(index);
        };
        /**
         * Sets the enabled state to isEnabled for the menu item at the given index.
         * @param index Index of the menu item
         * @param isEnabled The desired enabled state of the menu item.
         */
        MDCMenu.prototype.setEnabled = function (index, isEnabled) {
            this.foundation.setEnabled(index, isEnabled);
        };
        /**
         * @return The item within the menu at the index specified.
         */
        MDCMenu.prototype.getOptionByIndex = function (index) {
            var items = this.items;
            if (index < items.length) {
                return this.items[index];
            }
            else {
                return null;
            }
        };
        /**
         * @param index A menu item's index.
         * @return The primary text within the menu at the index specified.
         */
        MDCMenu.prototype.getPrimaryTextAtIndex = function (index) {
            var item = this.getOptionByIndex(index);
            if (item && this.list_) {
                return this.list_.getPrimaryText(item) || '';
            }
            return '';
        };
        MDCMenu.prototype.setFixedPosition = function (isFixed) {
            this.menuSurface_.setFixedPosition(isFixed);
        };
        MDCMenu.prototype.setIsHoisted = function (isHoisted) {
            this.menuSurface_.setIsHoisted(isHoisted);
        };
        MDCMenu.prototype.setAbsolutePosition = function (x, y) {
            this.menuSurface_.setAbsolutePosition(x, y);
        };
        /**
         * Sets the element that the menu-surface is anchored to.
         */
        MDCMenu.prototype.setAnchorElement = function (element) {
            this.menuSurface_.anchorElement = element;
        };
        MDCMenu.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClassToElementAtIndex: function (index, className) {
                    var list = _this.items;
                    list[index].classList.add(className);
                },
                removeClassFromElementAtIndex: function (index, className) {
                    var list = _this.items;
                    list[index].classList.remove(className);
                },
                addAttributeToElementAtIndex: function (index, attr, value) {
                    var list = _this.items;
                    list[index].setAttribute(attr, value);
                },
                removeAttributeFromElementAtIndex: function (index, attr) {
                    var list = _this.items;
                    list[index].removeAttribute(attr);
                },
                elementContainsClass: function (element, className) {
                    return element.classList.contains(className);
                },
                closeSurface: function (skipRestoreFocus) {
                    return _this.menuSurface_.close(skipRestoreFocus);
                },
                getElementIndex: function (element) { return _this.items.indexOf(element); },
                notifySelected: function (evtData) {
                    return _this.emit(strings$g.SELECTED_EVENT, {
                        index: evtData.index,
                        item: _this.items[evtData.index],
                    });
                },
                getMenuItemCount: function () { return _this.items.length; },
                focusItemAtIndex: function (index) { return _this.items[index].focus(); },
                focusListRoot: function () {
                    return _this.root.querySelector(strings$g.LIST_SELECTOR)
                        .focus();
                },
                isSelectableItemAtIndex: function (index) {
                    return !!closest(_this.items[index], "." + cssClasses$c.MENU_SELECTION_GROUP);
                },
                getSelectedSiblingOfItemAtIndex: function (index) {
                    var selectionGroupEl = closest(_this.items[index], "." + cssClasses$c.MENU_SELECTION_GROUP);
                    var selectedItemEl = selectionGroupEl.querySelector("." + cssClasses$c.MENU_SELECTED_LIST_ITEM);
                    return selectedItemEl ? _this.items.indexOf(selectedItemEl) : -1;
                },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCMenuFoundation(adapter);
        };
        return MDCMenu;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$b = {
        ACTIVATED: 'mdc-select--activated',
        DISABLED: 'mdc-select--disabled',
        FOCUSED: 'mdc-select--focused',
        INVALID: 'mdc-select--invalid',
        MENU_INVALID: 'mdc-select__menu--invalid',
        OUTLINED: 'mdc-select--outlined',
        REQUIRED: 'mdc-select--required',
        ROOT: 'mdc-select',
        WITH_LEADING_ICON: 'mdc-select--with-leading-icon',
    };
    var strings$f = {
        ARIA_CONTROLS: 'aria-controls',
        ARIA_DESCRIBEDBY: 'aria-describedby',
        ARIA_SELECTED_ATTR: 'aria-selected',
        CHANGE_EVENT: 'MDCSelect:change',
        HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
        LABEL_SELECTOR: '.mdc-floating-label',
        LEADING_ICON_SELECTOR: '.mdc-select__icon',
        LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
        MENU_SELECTOR: '.mdc-select__menu',
        OUTLINE_SELECTOR: '.mdc-notched-outline',
        SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text',
        SELECT_ANCHOR_SELECTOR: '.mdc-select__anchor',
        VALUE_ATTR: 'data-value',
    };
    var numbers$3 = {
        LABEL_SCALE: 0.75,
        UNSET_INDEX: -1,
        CLICK_DEBOUNCE_TIMEOUT_MS: 330,
    };

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCSelectFoundation = /** @class */ (function (_super) {
        __extends(MDCSelectFoundation, _super);
        /* istanbul ignore next: optional argument is not a branch statement */
        /**
         * @param adapter
         * @param foundationMap Map from subcomponent names to their subfoundations.
         */
        function MDCSelectFoundation(adapter, foundationMap) {
            if (foundationMap === void 0) { foundationMap = {}; }
            var _this = _super.call(this, __assign(__assign({}, MDCSelectFoundation.defaultAdapter), adapter)) || this;
            // Disabled state
            _this.disabled = false;
            // isMenuOpen is used to track the state of the menu by listening to the
            // MDCMenuSurface:closed event For reference, menu.open will return false if
            // the menu is still closing, but isMenuOpen returns false only after the menu
            // has closed
            _this.isMenuOpen = false;
            // By default, select is invalid if it is required but no value is selected.
            _this.useDefaultValidation = true;
            _this.customValidity = true;
            _this.lastSelectedIndex = numbers$3.UNSET_INDEX;
            _this.clickDebounceTimeout = 0;
            _this.recentlyClicked = false;
            _this.leadingIcon = foundationMap.leadingIcon;
            _this.helperText = foundationMap.helperText;
            return _this;
        }
        Object.defineProperty(MDCSelectFoundation, "cssClasses", {
            get: function () {
                return cssClasses$b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelectFoundation, "numbers", {
            get: function () {
                return numbers$3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelectFoundation, "strings", {
            get: function () {
                return strings$f;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelectFoundation, "defaultAdapter", {
            /**
             * See {@link MDCSelectAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    activateBottomLine: function () { return undefined; },
                    deactivateBottomLine: function () { return undefined; },
                    getSelectedIndex: function () { return -1; },
                    setSelectedIndex: function () { return undefined; },
                    hasLabel: function () { return false; },
                    floatLabel: function () { return undefined; },
                    getLabelWidth: function () { return 0; },
                    setLabelRequired: function () { return undefined; },
                    hasOutline: function () { return false; },
                    notchOutline: function () { return undefined; },
                    closeOutline: function () { return undefined; },
                    setRippleCenter: function () { return undefined; },
                    notifyChange: function () { return undefined; },
                    setSelectedText: function () { return undefined; },
                    isSelectAnchorFocused: function () { return false; },
                    getSelectAnchorAttr: function () { return ''; },
                    setSelectAnchorAttr: function () { return undefined; },
                    removeSelectAnchorAttr: function () { return undefined; },
                    addMenuClass: function () { return undefined; },
                    removeMenuClass: function () { return undefined; },
                    openMenu: function () { return undefined; },
                    closeMenu: function () { return undefined; },
                    getAnchorElement: function () { return null; },
                    setMenuAnchorElement: function () { return undefined; },
                    setMenuAnchorCorner: function () { return undefined; },
                    setMenuWrapFocus: function () { return undefined; },
                    focusMenuItemAtIndex: function () { return undefined; },
                    getMenuItemCount: function () { return 0; },
                    getMenuItemValues: function () { return []; },
                    getMenuItemTextAtIndex: function () { return ''; },
                    isTypeaheadInProgress: function () { return false; },
                    typeaheadMatchItem: function () { return -1; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        /** Returns the index of the currently selected menu item, or -1 if none. */
        MDCSelectFoundation.prototype.getSelectedIndex = function () {
            return this.adapter.getSelectedIndex();
        };
        MDCSelectFoundation.prototype.setSelectedIndex = function (index, closeMenu, skipNotify) {
            if (closeMenu === void 0) { closeMenu = false; }
            if (skipNotify === void 0) { skipNotify = false; }
            if (index >= this.adapter.getMenuItemCount()) {
                return;
            }
            if (index === numbers$3.UNSET_INDEX) {
                this.adapter.setSelectedText('');
            }
            else {
                this.adapter.setSelectedText(this.adapter.getMenuItemTextAtIndex(index).trim());
            }
            this.adapter.setSelectedIndex(index);
            if (closeMenu) {
                this.adapter.closeMenu();
            }
            if (!skipNotify && this.lastSelectedIndex !== index) {
                this.handleChange();
            }
            this.lastSelectedIndex = index;
        };
        MDCSelectFoundation.prototype.setValue = function (value, skipNotify) {
            if (skipNotify === void 0) { skipNotify = false; }
            var index = this.adapter.getMenuItemValues().indexOf(value);
            this.setSelectedIndex(index, /** closeMenu */ false, skipNotify);
        };
        MDCSelectFoundation.prototype.getValue = function () {
            var index = this.adapter.getSelectedIndex();
            var menuItemValues = this.adapter.getMenuItemValues();
            return index !== numbers$3.UNSET_INDEX ? menuItemValues[index] : '';
        };
        MDCSelectFoundation.prototype.getDisabled = function () {
            return this.disabled;
        };
        MDCSelectFoundation.prototype.setDisabled = function (isDisabled) {
            this.disabled = isDisabled;
            if (this.disabled) {
                this.adapter.addClass(cssClasses$b.DISABLED);
                this.adapter.closeMenu();
            }
            else {
                this.adapter.removeClass(cssClasses$b.DISABLED);
            }
            if (this.leadingIcon) {
                this.leadingIcon.setDisabled(this.disabled);
            }
            if (this.disabled) {
                // Prevent click events from focusing select. Simply pointer-events: none
                // is not enough since screenreader clicks may bypass this.
                this.adapter.removeSelectAnchorAttr('tabindex');
            }
            else {
                this.adapter.setSelectAnchorAttr('tabindex', '0');
            }
            this.adapter.setSelectAnchorAttr('aria-disabled', this.disabled.toString());
        };
        /** Opens the menu. */
        MDCSelectFoundation.prototype.openMenu = function () {
            this.adapter.addClass(cssClasses$b.ACTIVATED);
            this.adapter.openMenu();
            this.isMenuOpen = true;
            this.adapter.setSelectAnchorAttr('aria-expanded', 'true');
        };
        /**
         * @param content Sets the content of the helper text.
         */
        MDCSelectFoundation.prototype.setHelperTextContent = function (content) {
            if (this.helperText) {
                this.helperText.setContent(content);
            }
        };
        /**
         * Re-calculates if the notched outline should be notched and if the label
         * should float.
         */
        MDCSelectFoundation.prototype.layout = function () {
            if (this.adapter.hasLabel()) {
                var optionHasValue = this.getValue().length > 0;
                var isFocused = this.adapter.hasClass(cssClasses$b.FOCUSED);
                var shouldFloatAndNotch = optionHasValue || isFocused;
                var isRequired = this.adapter.hasClass(cssClasses$b.REQUIRED);
                this.notchOutline(shouldFloatAndNotch);
                this.adapter.floatLabel(shouldFloatAndNotch);
                this.adapter.setLabelRequired(isRequired);
            }
        };
        /**
         * Synchronizes the list of options with the state of the foundation. Call
         * this whenever menu options are dynamically updated.
         */
        MDCSelectFoundation.prototype.layoutOptions = function () {
            var menuItemValues = this.adapter.getMenuItemValues();
            var selectedIndex = menuItemValues.indexOf(this.getValue());
            this.setSelectedIndex(selectedIndex, /** closeMenu */ false, /** skipNotify */ true);
        };
        MDCSelectFoundation.prototype.handleMenuOpened = function () {
            if (this.adapter.getMenuItemValues().length === 0) {
                return;
            }
            // Menu should open to the last selected element, should open to first menu item otherwise.
            var selectedIndex = this.getSelectedIndex();
            var focusItemIndex = selectedIndex >= 0 ? selectedIndex : 0;
            this.adapter.focusMenuItemAtIndex(focusItemIndex);
        };
        MDCSelectFoundation.prototype.handleMenuClosing = function () {
            this.adapter.setSelectAnchorAttr('aria-expanded', 'false');
        };
        MDCSelectFoundation.prototype.handleMenuClosed = function () {
            this.adapter.removeClass(cssClasses$b.ACTIVATED);
            this.isMenuOpen = false;
            // Unfocus the select if menu is closed without a selection
            if (!this.adapter.isSelectAnchorFocused()) {
                this.blur();
            }
        };
        /**
         * Handles value changes, via change event or programmatic updates.
         */
        MDCSelectFoundation.prototype.handleChange = function () {
            this.layout();
            this.adapter.notifyChange(this.getValue());
            var isRequired = this.adapter.hasClass(cssClasses$b.REQUIRED);
            if (isRequired && this.useDefaultValidation) {
                this.setValid(this.isValid());
            }
        };
        MDCSelectFoundation.prototype.handleMenuItemAction = function (index) {
            this.setSelectedIndex(index, /** closeMenu */ true);
        };
        /**
         * Handles focus events from select element.
         */
        MDCSelectFoundation.prototype.handleFocus = function () {
            this.adapter.addClass(cssClasses$b.FOCUSED);
            this.layout();
            this.adapter.activateBottomLine();
        };
        /**
         * Handles blur events from select element.
         */
        MDCSelectFoundation.prototype.handleBlur = function () {
            if (this.isMenuOpen) {
                return;
            }
            this.blur();
        };
        MDCSelectFoundation.prototype.handleClick = function (normalizedX) {
            if (this.disabled || this.recentlyClicked) {
                return;
            }
            this.setClickDebounceTimeout();
            if (this.isMenuOpen) {
                this.adapter.closeMenu();
                return;
            }
            this.adapter.setRippleCenter(normalizedX);
            this.openMenu();
        };
        /**
         * Handles keydown events on select element. Depending on the type of
         * character typed, does typeahead matching or opens menu.
         */
        MDCSelectFoundation.prototype.handleKeydown = function (event) {
            if (this.isMenuOpen || !this.adapter.hasClass(cssClasses$b.FOCUSED)) {
                return;
            }
            var isEnter = normalizeKey(event) === KEY.ENTER;
            var isSpace = normalizeKey(event) === KEY.SPACEBAR;
            var arrowUp = normalizeKey(event) === KEY.ARROW_UP;
            var arrowDown = normalizeKey(event) === KEY.ARROW_DOWN;
            // Typeahead
            if (!isSpace && event.key && event.key.length === 1 ||
                isSpace && this.adapter.isTypeaheadInProgress()) {
                var key = isSpace ? ' ' : event.key;
                var typeaheadNextIndex = this.adapter.typeaheadMatchItem(key, this.getSelectedIndex());
                if (typeaheadNextIndex >= 0) {
                    this.setSelectedIndex(typeaheadNextIndex);
                }
                event.preventDefault();
                return;
            }
            if (!isEnter && !isSpace && !arrowUp && !arrowDown) {
                return;
            }
            // Increment/decrement index as necessary and open menu.
            if (arrowUp && this.getSelectedIndex() > 0) {
                this.setSelectedIndex(this.getSelectedIndex() - 1);
            }
            else if (arrowDown &&
                this.getSelectedIndex() < this.adapter.getMenuItemCount() - 1) {
                this.setSelectedIndex(this.getSelectedIndex() + 1);
            }
            this.openMenu();
            event.preventDefault();
        };
        /**
         * Opens/closes the notched outline.
         */
        MDCSelectFoundation.prototype.notchOutline = function (openNotch) {
            if (!this.adapter.hasOutline()) {
                return;
            }
            var isFocused = this.adapter.hasClass(cssClasses$b.FOCUSED);
            if (openNotch) {
                var labelScale = numbers$3.LABEL_SCALE;
                var labelWidth = this.adapter.getLabelWidth() * labelScale;
                this.adapter.notchOutline(labelWidth);
            }
            else if (!isFocused) {
                this.adapter.closeOutline();
            }
        };
        /**
         * Sets the aria label of the leading icon.
         */
        MDCSelectFoundation.prototype.setLeadingIconAriaLabel = function (label) {
            if (this.leadingIcon) {
                this.leadingIcon.setAriaLabel(label);
            }
        };
        /**
         * Sets the text content of the leading icon.
         */
        MDCSelectFoundation.prototype.setLeadingIconContent = function (content) {
            if (this.leadingIcon) {
                this.leadingIcon.setContent(content);
            }
        };
        MDCSelectFoundation.prototype.setUseDefaultValidation = function (useDefaultValidation) {
            this.useDefaultValidation = useDefaultValidation;
        };
        MDCSelectFoundation.prototype.setValid = function (isValid) {
            if (!this.useDefaultValidation) {
                this.customValidity = isValid;
            }
            this.adapter.setSelectAnchorAttr('aria-invalid', (!isValid).toString());
            if (isValid) {
                this.adapter.removeClass(cssClasses$b.INVALID);
                this.adapter.removeMenuClass(cssClasses$b.MENU_INVALID);
            }
            else {
                this.adapter.addClass(cssClasses$b.INVALID);
                this.adapter.addMenuClass(cssClasses$b.MENU_INVALID);
            }
            this.syncHelperTextValidity(isValid);
        };
        MDCSelectFoundation.prototype.isValid = function () {
            if (this.useDefaultValidation &&
                this.adapter.hasClass(cssClasses$b.REQUIRED) &&
                !this.adapter.hasClass(cssClasses$b.DISABLED)) {
                // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
                // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
                return this.getSelectedIndex() !== numbers$3.UNSET_INDEX &&
                    (this.getSelectedIndex() !== 0 || Boolean(this.getValue()));
            }
            return this.customValidity;
        };
        MDCSelectFoundation.prototype.setRequired = function (isRequired) {
            if (isRequired) {
                this.adapter.addClass(cssClasses$b.REQUIRED);
            }
            else {
                this.adapter.removeClass(cssClasses$b.REQUIRED);
            }
            this.adapter.setSelectAnchorAttr('aria-required', isRequired.toString());
            this.adapter.setLabelRequired(isRequired);
        };
        MDCSelectFoundation.prototype.getRequired = function () {
            return this.adapter.getSelectAnchorAttr('aria-required') === 'true';
        };
        MDCSelectFoundation.prototype.init = function () {
            var anchorEl = this.adapter.getAnchorElement();
            if (anchorEl) {
                this.adapter.setMenuAnchorElement(anchorEl);
                this.adapter.setMenuAnchorCorner(Corner.BOTTOM_START);
            }
            this.adapter.setMenuWrapFocus(false);
            this.setDisabled(this.adapter.hasClass(cssClasses$b.DISABLED));
            this.syncHelperTextValidity(!this.adapter.hasClass(cssClasses$b.INVALID));
            this.layout();
            this.layoutOptions();
        };
        /**
         * Unfocuses the select component.
         */
        MDCSelectFoundation.prototype.blur = function () {
            this.adapter.removeClass(cssClasses$b.FOCUSED);
            this.layout();
            this.adapter.deactivateBottomLine();
            var isRequired = this.adapter.hasClass(cssClasses$b.REQUIRED);
            if (isRequired && this.useDefaultValidation) {
                this.setValid(this.isValid());
            }
        };
        MDCSelectFoundation.prototype.syncHelperTextValidity = function (isValid) {
            if (!this.helperText) {
                return;
            }
            this.helperText.setValidity(isValid);
            var helperTextVisible = this.helperText.isVisible();
            var helperTextId = this.helperText.getId();
            if (helperTextVisible && helperTextId) {
                this.adapter.setSelectAnchorAttr(strings$f.ARIA_DESCRIBEDBY, helperTextId);
            }
            else {
                // Needed because screenreaders will read labels pointed to by
                // `aria-describedby` even if they are `aria-hidden`.
                this.adapter.removeSelectAnchorAttr(strings$f.ARIA_DESCRIBEDBY);
            }
        };
        MDCSelectFoundation.prototype.setClickDebounceTimeout = function () {
            var _this = this;
            clearTimeout(this.clickDebounceTimeout);
            this.clickDebounceTimeout = setTimeout(function () {
                _this.recentlyClicked = false;
            }, numbers$3.CLICK_DEBOUNCE_TIMEOUT_MS);
            this.recentlyClicked = true;
        };
        return MDCSelectFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$e = {
        ARIA_HIDDEN: 'aria-hidden',
        ROLE: 'role',
    };
    var cssClasses$a = {
        HELPER_TEXT_VALIDATION_MSG: 'mdc-select-helper-text--validation-msg',
        HELPER_TEXT_VALIDATION_MSG_PERSISTENT: 'mdc-select-helper-text--validation-msg-persistent',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCSelectHelperTextFoundation = /** @class */ (function (_super) {
        __extends(MDCSelectHelperTextFoundation, _super);
        function MDCSelectHelperTextFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCSelectHelperTextFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCSelectHelperTextFoundation, "cssClasses", {
            get: function () {
                return cssClasses$a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelectHelperTextFoundation, "strings", {
            get: function () {
                return strings$e;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelectHelperTextFoundation, "defaultAdapter", {
            /**
             * See {@link MDCSelectHelperTextAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    setAttr: function () { return undefined; },
                    getAttr: function () { return null; },
                    removeAttr: function () { return undefined; },
                    setContent: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return The ID of the helper text, or null if none is set.
         */
        MDCSelectHelperTextFoundation.prototype.getId = function () {
            return this.adapter.getAttr('id');
        };
        /**
         * @return Whether the helper text is currently visible.
         */
        MDCSelectHelperTextFoundation.prototype.isVisible = function () {
            return this.adapter.getAttr(strings$e.ARIA_HIDDEN) !== 'true';
        };
        /**
         * Sets the content of the helper text field.
         */
        MDCSelectHelperTextFoundation.prototype.setContent = function (content) {
            this.adapter.setContent(content);
        };
        /**
         * Sets the helper text to act as a validation message.
         * By default, validation messages are hidden when the select is valid and
         * visible when the select is invalid.
         *
         * @param isValidation True to make the helper text act as an error validation
         *     message.
         */
        MDCSelectHelperTextFoundation.prototype.setValidation = function (isValidation) {
            if (isValidation) {
                this.adapter.addClass(cssClasses$a.HELPER_TEXT_VALIDATION_MSG);
            }
            else {
                this.adapter.removeClass(cssClasses$a.HELPER_TEXT_VALIDATION_MSG);
            }
        };
        /**
         * Sets the persistency of the validation helper text.
         * This keeps the validation message visible even if the select is valid,
         * though it will be displayed in the normal (grey) color.
         */
        MDCSelectHelperTextFoundation.prototype.setValidationMsgPersistent = function (isPersistent) {
            if (isPersistent) {
                this.adapter.addClass(cssClasses$a.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
            }
            else {
                this.adapter.removeClass(cssClasses$a.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
            }
        };
        /**
         * When acting as a validation message, shows/hides the helper text and
         * triggers alerts as necessary based on the select's validity.
         */
        MDCSelectHelperTextFoundation.prototype.setValidity = function (selectIsValid) {
            var isValidationMsg = this.adapter.hasClass(cssClasses$a.HELPER_TEXT_VALIDATION_MSG);
            if (!isValidationMsg) {
                // Non-validating helper-text is always displayed and does not participate
                // in validation logic.
                return;
            }
            var isPersistentValidationMsg = this.adapter.hasClass(cssClasses$a.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
            // Validating helper text is displayed if select is invalid, unless it is
            // set as persistent, in which case it always displays.
            var msgShouldDisplay = !selectIsValid || isPersistentValidationMsg;
            if (msgShouldDisplay) {
                this.showToScreenReader();
                // In addition to displaying, also trigger an alert if the select
                // has become invalid.
                if (!selectIsValid) {
                    this.adapter.setAttr(strings$e.ROLE, 'alert');
                }
                else {
                    this.adapter.removeAttr(strings$e.ROLE);
                }
                return;
            }
            // Hide everything.
            this.adapter.removeAttr(strings$e.ROLE);
            this.hide();
        };
        /**
         * Makes the helper text visible to screen readers.
         */
        MDCSelectHelperTextFoundation.prototype.showToScreenReader = function () {
            this.adapter.removeAttr(strings$e.ARIA_HIDDEN);
        };
        /**
         * Hides the help text from screen readers.
         */
        MDCSelectHelperTextFoundation.prototype.hide = function () {
            this.adapter.setAttr(strings$e.ARIA_HIDDEN, 'true');
        };
        return MDCSelectHelperTextFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCSelectHelperText = /** @class */ (function (_super) {
        __extends(MDCSelectHelperText, _super);
        function MDCSelectHelperText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCSelectHelperText.attachTo = function (root) {
            return new MDCSelectHelperText(root);
        };
        Object.defineProperty(MDCSelectHelperText.prototype, "foundationForSelect", {
            // Provided for access by MDCSelect component
            get: function () {
                return this.foundation;
            },
            enumerable: true,
            configurable: true
        });
        MDCSelectHelperText.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                getAttr: function (attr) { return _this.root.getAttribute(attr); },
                setAttr: function (attr, value) { return _this.root.setAttribute(attr, value); },
                removeAttr: function (attr) { return _this.root.removeAttribute(attr); },
                setContent: function (content) {
                    _this.root.textContent = content;
                },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCSelectHelperTextFoundation(adapter);
        };
        return MDCSelectHelperText;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$d = {
        ICON_EVENT: 'MDCSelect:icon',
        ICON_ROLE: 'button',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var INTERACTION_EVENTS = ['click', 'keydown'];
    var MDCSelectIconFoundation = /** @class */ (function (_super) {
        __extends(MDCSelectIconFoundation, _super);
        function MDCSelectIconFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCSelectIconFoundation.defaultAdapter), adapter)) || this;
            _this.savedTabIndex_ = null;
            _this.interactionHandler_ = function (evt) { return _this.handleInteraction(evt); };
            return _this;
        }
        Object.defineProperty(MDCSelectIconFoundation, "strings", {
            get: function () {
                return strings$d;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelectIconFoundation, "defaultAdapter", {
            /**
             * See {@link MDCSelectIconAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    getAttr: function () { return null; },
                    setAttr: function () { return undefined; },
                    removeAttr: function () { return undefined; },
                    setContent: function () { return undefined; },
                    registerInteractionHandler: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                    notifyIconAction: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCSelectIconFoundation.prototype.init = function () {
            var _this = this;
            this.savedTabIndex_ = this.adapter.getAttr('tabindex');
            INTERACTION_EVENTS.forEach(function (evtType) {
                _this.adapter.registerInteractionHandler(evtType, _this.interactionHandler_);
            });
        };
        MDCSelectIconFoundation.prototype.destroy = function () {
            var _this = this;
            INTERACTION_EVENTS.forEach(function (evtType) {
                _this.adapter.deregisterInteractionHandler(evtType, _this.interactionHandler_);
            });
        };
        MDCSelectIconFoundation.prototype.setDisabled = function (disabled) {
            if (!this.savedTabIndex_) {
                return;
            }
            if (disabled) {
                this.adapter.setAttr('tabindex', '-1');
                this.adapter.removeAttr('role');
            }
            else {
                this.adapter.setAttr('tabindex', this.savedTabIndex_);
                this.adapter.setAttr('role', strings$d.ICON_ROLE);
            }
        };
        MDCSelectIconFoundation.prototype.setAriaLabel = function (label) {
            this.adapter.setAttr('aria-label', label);
        };
        MDCSelectIconFoundation.prototype.setContent = function (content) {
            this.adapter.setContent(content);
        };
        MDCSelectIconFoundation.prototype.handleInteraction = function (evt) {
            var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;
            if (evt.type === 'click' || isEnterKey) {
                this.adapter.notifyIconAction();
            }
        };
        return MDCSelectIconFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCSelectIcon = /** @class */ (function (_super) {
        __extends(MDCSelectIcon, _super);
        function MDCSelectIcon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCSelectIcon.attachTo = function (root) {
            return new MDCSelectIcon(root);
        };
        Object.defineProperty(MDCSelectIcon.prototype, "foundationForSelect", {
            // Provided for access by MDCSelect component
            get: function () {
                return this.foundation;
            },
            enumerable: true,
            configurable: true
        });
        MDCSelectIcon.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                getAttr: function (attr) { return _this.root.getAttribute(attr); },
                setAttr: function (attr, value) { return _this.root.setAttribute(attr, value); },
                removeAttr: function (attr) { return _this.root.removeAttribute(attr); },
                setContent: function (content) {
                    _this.root.textContent = content;
                },
                registerInteractionHandler: function (evtType, handler) {
                    return _this.listen(evtType, handler);
                },
                deregisterInteractionHandler: function (evtType, handler) {
                    return _this.unlisten(evtType, handler);
                },
                notifyIconAction: function () { return _this.emit(MDCSelectIconFoundation.strings.ICON_EVENT, {} /* evtData */, true /* shouldBubble */); },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCSelectIconFoundation(adapter);
        };
        return MDCSelectIcon;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCSelect = /** @class */ (function (_super) {
        __extends(MDCSelect, _super);
        function MDCSelect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCSelect.attachTo = function (root) {
            return new MDCSelect(root);
        };
        MDCSelect.prototype.initialize = function (labelFactory, lineRippleFactory, outlineFactory, menuFactory, iconFactory, helperTextFactory) {
            if (labelFactory === void 0) { labelFactory = function (el) { return new MDCFloatingLabel(el); }; }
            if (lineRippleFactory === void 0) { lineRippleFactory = function (el) { return new MDCLineRipple(el); }; }
            if (outlineFactory === void 0) { outlineFactory = function (el) { return new MDCNotchedOutline(el); }; }
            if (menuFactory === void 0) { menuFactory = function (el) { return new MDCMenu(el); }; }
            if (iconFactory === void 0) { iconFactory = function (el) { return new MDCSelectIcon(el); }; }
            if (helperTextFactory === void 0) { helperTextFactory = function (el) { return new MDCSelectHelperText(el); }; }
            this.selectAnchor =
                this.root.querySelector(strings$f.SELECT_ANCHOR_SELECTOR);
            this.selectedText =
                this.root.querySelector(strings$f.SELECTED_TEXT_SELECTOR);
            this.hiddenInput = this.root.querySelector(strings$f.HIDDEN_INPUT_SELECTOR);
            if (!this.selectedText) {
                throw new Error('MDCSelect: Missing required element: The following selector must be present: ' +
                    ("'" + strings$f.SELECTED_TEXT_SELECTOR + "'"));
            }
            if (this.selectAnchor.hasAttribute(strings$f.ARIA_CONTROLS)) {
                var helperTextElement = document.getElementById(this.selectAnchor.getAttribute(strings$f.ARIA_CONTROLS));
                if (helperTextElement) {
                    this.helperText = helperTextFactory(helperTextElement);
                }
            }
            this.menuSetup(menuFactory);
            var labelElement = this.root.querySelector(strings$f.LABEL_SELECTOR);
            this.label = labelElement ? labelFactory(labelElement) : null;
            var lineRippleElement = this.root.querySelector(strings$f.LINE_RIPPLE_SELECTOR);
            this.lineRipple =
                lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
            var outlineElement = this.root.querySelector(strings$f.OUTLINE_SELECTOR);
            this.outline = outlineElement ? outlineFactory(outlineElement) : null;
            var leadingIcon = this.root.querySelector(strings$f.LEADING_ICON_SELECTOR);
            if (leadingIcon) {
                this.leadingIcon = iconFactory(leadingIcon);
            }
            if (!this.root.classList.contains(cssClasses$b.OUTLINED)) {
                this.ripple = this.createRipple();
            }
        };
        /**
         * Initializes the select's event listeners and internal state based
         * on the environment's state.
         */
        MDCSelect.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.handleFocus = function () {
                _this.foundation.handleFocus();
            };
            this.handleBlur = function () {
                _this.foundation.handleBlur();
            };
            this.handleClick = function (evt) {
                _this.selectAnchor.focus();
                _this.foundation.handleClick(_this.getNormalizedXCoordinate(evt));
            };
            this.handleKeydown = function (evt) {
                _this.foundation.handleKeydown(evt);
            };
            this.handleMenuItemAction = function (evt) {
                _this.foundation.handleMenuItemAction(evt.detail.index);
            };
            this.handleMenuOpened = function () {
                _this.foundation.handleMenuOpened();
            };
            this.handleMenuClosed = function () {
                _this.foundation.handleMenuClosed();
            };
            this.handleMenuClosing = function () {
                _this.foundation.handleMenuClosing();
            };
            this.selectAnchor.addEventListener('focus', this.handleFocus);
            this.selectAnchor.addEventListener('blur', this.handleBlur);
            this.selectAnchor.addEventListener('click', this.handleClick);
            this.selectAnchor.addEventListener('keydown', this.handleKeydown);
            this.menu.listen(strings$h.CLOSED_EVENT, this.handleMenuClosed);
            this.menu.listen(strings$h.CLOSING_EVENT, this.handleMenuClosing);
            this.menu.listen(strings$h.OPENED_EVENT, this.handleMenuOpened);
            this.menu.listen(strings$g.SELECTED_EVENT, this.handleMenuItemAction);
            if (this.hiddenInput) {
                if (this.hiddenInput.value) {
                    // If the hidden input already has a value, use it to restore the
                    // select's value. This can happen e.g. if the user goes back or (in
                    // some browsers) refreshes the page.
                    this.foundation.setValue(this.hiddenInput.value, /** skipNotify */ true);
                    this.foundation.layout();
                    return;
                }
                this.hiddenInput.value = this.value;
            }
        };
        MDCSelect.prototype.destroy = function () {
            this.selectAnchor.removeEventListener('focus', this.handleFocus);
            this.selectAnchor.removeEventListener('blur', this.handleBlur);
            this.selectAnchor.removeEventListener('keydown', this.handleKeydown);
            this.selectAnchor.removeEventListener('click', this.handleClick);
            this.menu.unlisten(strings$h.CLOSED_EVENT, this.handleMenuClosed);
            this.menu.unlisten(strings$h.OPENED_EVENT, this.handleMenuOpened);
            this.menu.unlisten(strings$g.SELECTED_EVENT, this.handleMenuItemAction);
            this.menu.destroy();
            if (this.ripple) {
                this.ripple.destroy();
            }
            if (this.outline) {
                this.outline.destroy();
            }
            if (this.leadingIcon) {
                this.leadingIcon.destroy();
            }
            if (this.helperText) {
                this.helperText.destroy();
            }
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(MDCSelect.prototype, "value", {
            get: function () {
                return this.foundation.getValue();
            },
            set: function (value) {
                this.foundation.setValue(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelect.prototype, "selectedIndex", {
            get: function () {
                return this.foundation.getSelectedIndex();
            },
            set: function (selectedIndex) {
                this.foundation.setSelectedIndex(selectedIndex, /** closeMenu */ true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelect.prototype, "disabled", {
            get: function () {
                return this.foundation.getDisabled();
            },
            set: function (disabled) {
                this.foundation.setDisabled(disabled);
                if (this.hiddenInput) {
                    this.hiddenInput.disabled = disabled;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelect.prototype, "leadingIconAriaLabel", {
            set: function (label) {
                this.foundation.setLeadingIconAriaLabel(label);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelect.prototype, "leadingIconContent", {
            /**
             * Sets the text content of the leading icon.
             */
            set: function (content) {
                this.foundation.setLeadingIconContent(content);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelect.prototype, "helperTextContent", {
            /**
             * Sets the text content of the helper text.
             */
            set: function (content) {
                this.foundation.setHelperTextContent(content);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelect.prototype, "useDefaultValidation", {
            /**
             * Enables or disables the default validation scheme where a required select
             * must be non-empty. Set to false for custom validation.
             * @param useDefaultValidation Set this to false to ignore default
             *     validation scheme.
             */
            set: function (useDefaultValidation) {
                this.foundation.setUseDefaultValidation(useDefaultValidation);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelect.prototype, "valid", {
            /**
             * Checks if the select is in a valid state.
             */
            get: function () {
                return this.foundation.isValid();
            },
            /**
             * Sets the current invalid state of the select.
             */
            set: function (isValid) {
                this.foundation.setValid(isValid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSelect.prototype, "required", {
            /**
             * Returns whether the select is required.
             */
            get: function () {
                return this.foundation.getRequired();
            },
            /**
             * Sets the control to the required state.
             */
            set: function (isRequired) {
                this.foundation.setRequired(isRequired);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Re-calculates if the notched outline should be notched and if the label
         * should float.
         */
        MDCSelect.prototype.layout = function () {
            this.foundation.layout();
        };
        /**
         * Synchronizes the list of options with the state of the foundation. Call
         * this whenever menu options are dynamically updated.
         */
        MDCSelect.prototype.layoutOptions = function () {
            this.foundation.layoutOptions();
            this.menu.layout();
            // Update cached menuItemValues for adapter.
            this.menuItemValues =
                this.menu.items.map(function (el) { return el.getAttribute(strings$f.VALUE_ATTR) || ''; });
            if (this.hiddenInput) {
                this.hiddenInput.value = this.value;
            }
        };
        MDCSelect.prototype.getDefaultFoundation = function () {
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = __assign(__assign(__assign(__assign({}, this.getSelectAdapterMethods()), this.getCommonAdapterMethods()), this.getOutlineAdapterMethods()), this.getLabelAdapterMethods());
            return new MDCSelectFoundation(adapter, this.getFoundationMap());
        };
        /**
         * Handles setup for the menu.
         */
        MDCSelect.prototype.menuSetup = function (menuFactory) {
            this.menuElement = this.root.querySelector(strings$f.MENU_SELECTOR);
            this.menu = menuFactory(this.menuElement);
            this.menu.hasTypeahead = true;
            this.menu.singleSelection = true;
            this.menuItemValues =
                this.menu.items.map(function (el) { return el.getAttribute(strings$f.VALUE_ATTR) || ''; });
        };
        MDCSelect.prototype.createRipple = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = __assign(__assign({}, MDCRipple.createAdapter({ root: this.selectAnchor })), { registerInteractionHandler: function (evtType, handler) {
                    _this.selectAnchor.addEventListener(evtType, handler);
                }, deregisterInteractionHandler: function (evtType, handler) {
                    _this.selectAnchor.removeEventListener(evtType, handler);
                } });
            // tslint:enable:object-literal-sort-keys
            return new MDCRipple(this.selectAnchor, new MDCRippleFoundation(adapter));
        };
        MDCSelect.prototype.getSelectAdapterMethods = function () {
            var _this = this;
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                getMenuItemAttr: function (menuItem, attr) {
                    return menuItem.getAttribute(attr);
                },
                setSelectedText: function (text) {
                    _this.selectedText.textContent = text;
                },
                isSelectAnchorFocused: function () { return document.activeElement === _this.selectAnchor; },
                getSelectAnchorAttr: function (attr) {
                    return _this.selectAnchor.getAttribute(attr);
                },
                setSelectAnchorAttr: function (attr, value) {
                    _this.selectAnchor.setAttribute(attr, value);
                },
                removeSelectAnchorAttr: function (attr) {
                    _this.selectAnchor.removeAttribute(attr);
                },
                addMenuClass: function (className) {
                    _this.menuElement.classList.add(className);
                },
                removeMenuClass: function (className) {
                    _this.menuElement.classList.remove(className);
                },
                openMenu: function () {
                    _this.menu.open = true;
                },
                closeMenu: function () {
                    _this.menu.open = false;
                },
                getAnchorElement: function () {
                    return _this.root.querySelector(strings$f.SELECT_ANCHOR_SELECTOR);
                },
                setMenuAnchorElement: function (anchorEl) {
                    _this.menu.setAnchorElement(anchorEl);
                },
                setMenuAnchorCorner: function (anchorCorner) {
                    _this.menu.setAnchorCorner(anchorCorner);
                },
                setMenuWrapFocus: function (wrapFocus) {
                    _this.menu.wrapFocus = wrapFocus;
                },
                getSelectedIndex: function () {
                    var index = _this.menu.selectedIndex;
                    return index instanceof Array ? index[0] : index;
                },
                setSelectedIndex: function (index) {
                    _this.menu.selectedIndex = index;
                },
                focusMenuItemAtIndex: function (index) {
                    _this.menu.items[index].focus();
                },
                getMenuItemCount: function () { return _this.menu.items.length; },
                // Cache menu item values. layoutOptions() updates this cache.
                getMenuItemValues: function () { return _this.menuItemValues; },
                getMenuItemTextAtIndex: function (index) {
                    return _this.menu.getPrimaryTextAtIndex(index);
                },
                isTypeaheadInProgress: function () { return _this.menu.typeaheadInProgress; },
                typeaheadMatchItem: function (nextChar, startingIndex) {
                    return _this.menu.typeaheadMatchItem(nextChar, startingIndex);
                },
            };
            // tslint:enable:object-literal-sort-keys
        };
        MDCSelect.prototype.getCommonAdapterMethods = function () {
            var _this = this;
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function (className) {
                    _this.root.classList.add(className);
                },
                removeClass: function (className) {
                    _this.root.classList.remove(className);
                },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                setRippleCenter: function (normalizedX) {
                    _this.lineRipple && _this.lineRipple.setRippleCenter(normalizedX);
                },
                activateBottomLine: function () {
                    _this.lineRipple && _this.lineRipple.activate();
                },
                deactivateBottomLine: function () {
                    _this.lineRipple && _this.lineRipple.deactivate();
                },
                notifyChange: function (value) {
                    var index = _this.selectedIndex;
                    _this.emit(strings$f.CHANGE_EVENT, { value: value, index: index }, true /* shouldBubble  */);
                    if (_this.hiddenInput) {
                        _this.hiddenInput.value = value;
                    }
                },
            };
            // tslint:enable:object-literal-sort-keys
        };
        MDCSelect.prototype.getOutlineAdapterMethods = function () {
            var _this = this;
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                hasOutline: function () { return Boolean(_this.outline); },
                notchOutline: function (labelWidth) {
                    _this.outline && _this.outline.notch(labelWidth);
                },
                closeOutline: function () {
                    _this.outline && _this.outline.closeNotch();
                },
            };
            // tslint:enable:object-literal-sort-keys
        };
        MDCSelect.prototype.getLabelAdapterMethods = function () {
            var _this = this;
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                hasLabel: function () { return !!_this.label; },
                floatLabel: function (shouldFloat) {
                    _this.label && _this.label.float(shouldFloat);
                },
                getLabelWidth: function () { return _this.label ? _this.label.getWidth() : 0; },
                setLabelRequired: function (isRequired) {
                    _this.label && _this.label.setRequired(isRequired);
                },
            };
            // tslint:enable:object-literal-sort-keys
        };
        /**
         * Calculates where the line ripple should start based on the x coordinate within the component.
         */
        MDCSelect.prototype.getNormalizedXCoordinate = function (evt) {
            var targetClientRect = evt.target.getBoundingClientRect();
            var xCoordinate = this.isTouchEvent(evt) ? evt.touches[0].clientX : evt.clientX;
            return xCoordinate - targetClientRect.left;
        };
        MDCSelect.prototype.isTouchEvent = function (evt) {
            return Boolean(evt.touches);
        };
        /**
         * Returns a map of all subcomponents to subfoundations.
         */
        MDCSelect.prototype.getFoundationMap = function () {
            return {
                helperText: this.helperText ? this.helperText.foundationForSelect :
                    undefined,
                leadingIcon: this.leadingIcon ? this.leadingIcon.foundationForSelect :
                    undefined,
            };
        };
        return MDCSelect;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /** CSS classes used by the switch. */
    var cssClasses$9 = {
        /** Class used for a switch that is in the "checked" (on) position. */
        CHECKED: 'mdc-switch--checked',
        /** Class used for a switch that is disabled. */
        DISABLED: 'mdc-switch--disabled',
    };
    /** String constants used by the switch. */
    var strings$c = {
        /** Aria attribute for checked or unchecked state of switch */
        ARIA_CHECKED_ATTR: 'aria-checked',
        /** A CSS selector used to locate the native HTML control for the switch.  */
        NATIVE_CONTROL_SELECTOR: '.mdc-switch__native-control',
        /** A CSS selector used to locate the ripple surface element for the switch. */
        RIPPLE_SURFACE_SELECTOR: '.mdc-switch__thumb-underlay',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCSwitchFoundation = /** @class */ (function (_super) {
        __extends(MDCSwitchFoundation, _super);
        function MDCSwitchFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCSwitchFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCSwitchFoundation, "strings", {
            /** The string constants used by the switch. */
            get: function () {
                return strings$c;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSwitchFoundation, "cssClasses", {
            /** The CSS classes used by the switch. */
            get: function () {
                return cssClasses$9;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSwitchFoundation, "defaultAdapter", {
            /** The default Adapter for the switch. */
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    setNativeControlChecked: function () { return undefined; },
                    setNativeControlDisabled: function () { return undefined; },
                    setNativeControlAttr: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        /** Sets the checked state of the switch. */
        MDCSwitchFoundation.prototype.setChecked = function (checked) {
            this.adapter.setNativeControlChecked(checked);
            this.updateAriaChecked_(checked);
            this.updateCheckedStyling_(checked);
        };
        /** Sets the disabled state of the switch. */
        MDCSwitchFoundation.prototype.setDisabled = function (disabled) {
            this.adapter.setNativeControlDisabled(disabled);
            if (disabled) {
                this.adapter.addClass(cssClasses$9.DISABLED);
            }
            else {
                this.adapter.removeClass(cssClasses$9.DISABLED);
            }
        };
        /** Handles the change event for the switch native control. */
        MDCSwitchFoundation.prototype.handleChange = function (evt) {
            var nativeControl = evt.target;
            this.updateAriaChecked_(nativeControl.checked);
            this.updateCheckedStyling_(nativeControl.checked);
        };
        /** Updates the styling of the switch based on its checked state. */
        MDCSwitchFoundation.prototype.updateCheckedStyling_ = function (checked) {
            if (checked) {
                this.adapter.addClass(cssClasses$9.CHECKED);
            }
            else {
                this.adapter.removeClass(cssClasses$9.CHECKED);
            }
        };
        MDCSwitchFoundation.prototype.updateAriaChecked_ = function (checked) {
            this.adapter.setNativeControlAttr(strings$c.ARIA_CHECKED_ATTR, "" + !!checked);
        };
        return MDCSwitchFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCSwitch = /** @class */ (function (_super) {
        __extends(MDCSwitch, _super);
        function MDCSwitch() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ripple_ = _this.createRipple_();
            return _this;
        }
        MDCSwitch.attachTo = function (root) {
            return new MDCSwitch(root);
        };
        MDCSwitch.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.ripple_.destroy();
            this.nativeControl_.removeEventListener('change', this.changeHandler_);
        };
        MDCSwitch.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.changeHandler_ = function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.foundation).handleChange.apply(_a, __spread(args));
            };
            this.nativeControl_.addEventListener('change', this.changeHandler_);
            // Sometimes the checked state of the input element is saved in the history.
            // The switch styling should match the checked state of the input element.
            // Do an initial sync between the native control and the foundation.
            this.checked = this.checked;
        };
        MDCSwitch.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                setNativeControlChecked: function (checked) { return _this.nativeControl_.checked =
                    checked; },
                setNativeControlDisabled: function (disabled) { return _this.nativeControl_.disabled =
                    disabled; },
                setNativeControlAttr: function (attr, value) {
                    return _this.nativeControl_.setAttribute(attr, value);
                },
            };
            return new MDCSwitchFoundation(adapter);
        };
        Object.defineProperty(MDCSwitch.prototype, "ripple", {
            get: function () {
                return this.ripple_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSwitch.prototype, "checked", {
            get: function () {
                return this.nativeControl_.checked;
            },
            set: function (checked) {
                this.foundation.setChecked(checked);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSwitch.prototype, "disabled", {
            get: function () {
                return this.nativeControl_.disabled;
            },
            set: function (disabled) {
                this.foundation.setDisabled(disabled);
            },
            enumerable: true,
            configurable: true
        });
        MDCSwitch.prototype.createRipple_ = function () {
            var _this = this;
            var RIPPLE_SURFACE_SELECTOR = MDCSwitchFoundation.strings.RIPPLE_SURFACE_SELECTOR;
            var rippleSurface = this.root.querySelector(RIPPLE_SURFACE_SELECTOR);
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = __assign(__assign({}, MDCRipple.createAdapter(this)), { addClass: function (className) { return rippleSurface.classList.add(className); }, computeBoundingRect: function () { return rippleSurface.getBoundingClientRect(); }, deregisterInteractionHandler: function (evtType, handler) {
                    _this.nativeControl_.removeEventListener(evtType, handler, applyPassive());
                }, isSurfaceActive: function () { return matches(_this.nativeControl_, ':active'); }, isUnbounded: function () { return true; }, registerInteractionHandler: function (evtType, handler) {
                    _this.nativeControl_.addEventListener(evtType, handler, applyPassive());
                }, removeClass: function (className) {
                    rippleSurface.classList.remove(className);
                }, updateCssVariable: function (varName, value) {
                    rippleSurface.style.setProperty(varName, value);
                } });
            return new MDCRipple(this.root, new MDCRippleFoundation(adapter));
        };
        Object.defineProperty(MDCSwitch.prototype, "nativeControl_", {
            get: function () {
                var NATIVE_CONTROL_SELECTOR = MDCSwitchFoundation.strings.NATIVE_CONTROL_SELECTOR;
                return this.root.querySelector(NATIVE_CONTROL_SELECTOR);
            },
            enumerable: true,
            configurable: true
        });
        return MDCSwitch;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$8 = {
        CLOSING: 'mdc-snackbar--closing',
        OPEN: 'mdc-snackbar--open',
        OPENING: 'mdc-snackbar--opening',
    };
    var strings$b = {
        ACTION_SELECTOR: '.mdc-snackbar__action',
        ARIA_LIVE_LABEL_TEXT_ATTR: 'data-mdc-snackbar-label-text',
        CLOSED_EVENT: 'MDCSnackbar:closed',
        CLOSING_EVENT: 'MDCSnackbar:closing',
        DISMISS_SELECTOR: '.mdc-snackbar__dismiss',
        LABEL_SELECTOR: '.mdc-snackbar__label',
        OPENED_EVENT: 'MDCSnackbar:opened',
        OPENING_EVENT: 'MDCSnackbar:opening',
        REASON_ACTION: 'action',
        REASON_DISMISS: 'dismiss',
        SURFACE_SELECTOR: '.mdc-snackbar__surface',
    };
    var numbers$2 = {
        DEFAULT_AUTO_DISMISS_TIMEOUT_MS: 5000,
        INDETERMINATE: -1,
        MAX_AUTO_DISMISS_TIMEOUT_MS: 10000,
        MIN_AUTO_DISMISS_TIMEOUT_MS: 4000,
        // These variables need to be kept in sync with the values in _variables.scss.
        SNACKBAR_ANIMATION_CLOSE_TIME_MS: 75,
        SNACKBAR_ANIMATION_OPEN_TIME_MS: 150,
        /**
         * Number of milliseconds to wait between temporarily clearing the label text
         * in the DOM and subsequently restoring it. This is necessary to force IE 11
         * to pick up the `aria-live` content change and announce it to the user.
         */
        ARIA_LIVE_DELAY_MS: 1000,
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var ARIA_LIVE_DELAY_MS = numbers$2.ARIA_LIVE_DELAY_MS;
    var ARIA_LIVE_LABEL_TEXT_ATTR = strings$b.ARIA_LIVE_LABEL_TEXT_ATTR;
    function announce$1(ariaEl, labelEl) {
        if (labelEl === void 0) { labelEl = ariaEl; }
        var priority = ariaEl.getAttribute('aria-live');
        // Trim text to ignore `&nbsp;` (see below).
        // textContent is only null if the node is a document, DOCTYPE, or notation.
        var labelText = labelEl.textContent.trim();
        if (!labelText || !priority) {
            return;
        }
        // Temporarily disable `aria-live` to prevent JAWS+Firefox from announcing the message twice.
        ariaEl.setAttribute('aria-live', 'off');
        // Temporarily clear `textContent` to force a DOM mutation event that will be detected by screen readers.
        // `aria-live` elements are only announced when the element's `textContent` *changes*, so snackbars
        // sent to the browser in the initial HTML response won't be read unless we clear the element's `textContent` first.
        // Similarly, displaying the same snackbar message twice in a row doesn't trigger a DOM mutation event,
        // so screen readers won't announce the second message unless we first clear `textContent`.
        //
        // We have to clear the label text two different ways to make it work in all browsers and screen readers:
        //
        //   1. `textContent = ''` is required for IE11 + JAWS
        //   2. `innerHTML = '&nbsp;'` is required for Chrome + JAWS and NVDA
        //
        // All other browser/screen reader combinations support both methods.
        //
        // The wrapper `<span>` visually hides the space character so that it doesn't cause jank when added/removed.
        // N.B.: Setting `position: absolute`, `opacity: 0`, or `height: 0` prevents Chrome from detecting the DOM change.
        //
        // This technique has been tested in:
        //
        //   * JAWS 2019:
        //       - Chrome 70
        //       - Firefox 60 (ESR)
        //       - IE 11
        //   * NVDA 2018:
        //       - Chrome 70
        //       - Firefox 60 (ESR)
        //       - IE 11
        //   * ChromeVox 53
        labelEl.textContent = '';
        labelEl.innerHTML = '<span style="display: inline-block; width: 0; height: 1px;">&nbsp;</span>';
        // Prevent visual jank by temporarily displaying the label text in the ::before pseudo-element.
        // CSS generated content is normally announced by screen readers
        // (except in IE 11; see https://tink.uk/accessibility-support-for-css-generated-content/);
        // however, `aria-live` is turned off, so this DOM update will be ignored by screen readers.
        labelEl.setAttribute(ARIA_LIVE_LABEL_TEXT_ATTR, labelText);
        setTimeout(function () {
            // Allow screen readers to announce changes to the DOM again.
            ariaEl.setAttribute('aria-live', priority);
            // Remove the message from the ::before pseudo-element.
            labelEl.removeAttribute(ARIA_LIVE_LABEL_TEXT_ATTR);
            // Restore the original label text, which will be announced by screen readers.
            labelEl.textContent = labelText;
        }, ARIA_LIVE_DELAY_MS);
    }

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var OPENING = cssClasses$8.OPENING, OPEN = cssClasses$8.OPEN, CLOSING = cssClasses$8.CLOSING;
    var REASON_ACTION = strings$b.REASON_ACTION, REASON_DISMISS = strings$b.REASON_DISMISS;
    var MDCSnackbarFoundation = /** @class */ (function (_super) {
        __extends(MDCSnackbarFoundation, _super);
        function MDCSnackbarFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCSnackbarFoundation.defaultAdapter), adapter)) || this;
            _this.isOpen_ = false;
            _this.animationFrame_ = 0;
            _this.animationTimer_ = 0;
            _this.autoDismissTimer_ = 0;
            _this.autoDismissTimeoutMs_ = numbers$2.DEFAULT_AUTO_DISMISS_TIMEOUT_MS;
            _this.closeOnEscape_ = true;
            return _this;
        }
        Object.defineProperty(MDCSnackbarFoundation, "cssClasses", {
            get: function () {
                return cssClasses$8;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSnackbarFoundation, "strings", {
            get: function () {
                return strings$b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSnackbarFoundation, "numbers", {
            get: function () {
                return numbers$2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSnackbarFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    announce: function () { return undefined; },
                    notifyClosed: function () { return undefined; },
                    notifyClosing: function () { return undefined; },
                    notifyOpened: function () { return undefined; },
                    notifyOpening: function () { return undefined; },
                    removeClass: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCSnackbarFoundation.prototype.destroy = function () {
            this.clearAutoDismissTimer_();
            cancelAnimationFrame(this.animationFrame_);
            this.animationFrame_ = 0;
            clearTimeout(this.animationTimer_);
            this.animationTimer_ = 0;
            this.adapter.removeClass(OPENING);
            this.adapter.removeClass(OPEN);
            this.adapter.removeClass(CLOSING);
        };
        MDCSnackbarFoundation.prototype.open = function () {
            var _this = this;
            this.clearAutoDismissTimer_();
            this.isOpen_ = true;
            this.adapter.notifyOpening();
            this.adapter.removeClass(CLOSING);
            this.adapter.addClass(OPENING);
            this.adapter.announce();
            // Wait a frame once display is no longer "none", to establish basis for animation
            this.runNextAnimationFrame_(function () {
                _this.adapter.addClass(OPEN);
                _this.animationTimer_ = setTimeout(function () {
                    var timeoutMs = _this.getTimeoutMs();
                    _this.handleAnimationTimerEnd_();
                    _this.adapter.notifyOpened();
                    if (timeoutMs !== numbers$2.INDETERMINATE) {
                        _this.autoDismissTimer_ = setTimeout(function () {
                            _this.close(REASON_DISMISS);
                        }, timeoutMs);
                    }
                }, numbers$2.SNACKBAR_ANIMATION_OPEN_TIME_MS);
            });
        };
        /**
         * @param reason Why the snackbar was closed. Value will be passed to CLOSING_EVENT and CLOSED_EVENT via the
         *     `event.detail.reason` property. Standard values are REASON_ACTION and REASON_DISMISS, but custom
         *     client-specific values may also be used if desired.
         */
        MDCSnackbarFoundation.prototype.close = function (reason) {
            var _this = this;
            if (reason === void 0) { reason = ''; }
            if (!this.isOpen_) {
                // Avoid redundant close calls (and events), e.g. repeated interactions as the snackbar is animating closed
                return;
            }
            cancelAnimationFrame(this.animationFrame_);
            this.animationFrame_ = 0;
            this.clearAutoDismissTimer_();
            this.isOpen_ = false;
            this.adapter.notifyClosing(reason);
            this.adapter.addClass(cssClasses$8.CLOSING);
            this.adapter.removeClass(cssClasses$8.OPEN);
            this.adapter.removeClass(cssClasses$8.OPENING);
            clearTimeout(this.animationTimer_);
            this.animationTimer_ = setTimeout(function () {
                _this.handleAnimationTimerEnd_();
                _this.adapter.notifyClosed(reason);
            }, numbers$2.SNACKBAR_ANIMATION_CLOSE_TIME_MS);
        };
        MDCSnackbarFoundation.prototype.isOpen = function () {
            return this.isOpen_;
        };
        MDCSnackbarFoundation.prototype.getTimeoutMs = function () {
            return this.autoDismissTimeoutMs_;
        };
        MDCSnackbarFoundation.prototype.setTimeoutMs = function (timeoutMs) {
            // Use shorter variable names to make the code more readable
            var minValue = numbers$2.MIN_AUTO_DISMISS_TIMEOUT_MS;
            var maxValue = numbers$2.MAX_AUTO_DISMISS_TIMEOUT_MS;
            var indeterminateValue = numbers$2.INDETERMINATE;
            if (timeoutMs === numbers$2.INDETERMINATE || (timeoutMs <= maxValue && timeoutMs >= minValue)) {
                this.autoDismissTimeoutMs_ = timeoutMs;
            }
            else {
                throw new Error("\n        timeoutMs must be an integer in the range " + minValue + "\u2013" + maxValue + "\n        (or " + indeterminateValue + " to disable), but got '" + timeoutMs + "'");
            }
        };
        MDCSnackbarFoundation.prototype.getCloseOnEscape = function () {
            return this.closeOnEscape_;
        };
        MDCSnackbarFoundation.prototype.setCloseOnEscape = function (closeOnEscape) {
            this.closeOnEscape_ = closeOnEscape;
        };
        MDCSnackbarFoundation.prototype.handleKeyDown = function (evt) {
            var isEscapeKey = evt.key === 'Escape' || evt.keyCode === 27;
            if (isEscapeKey && this.getCloseOnEscape()) {
                this.close(REASON_DISMISS);
            }
        };
        MDCSnackbarFoundation.prototype.handleActionButtonClick = function (_evt) {
            this.close(REASON_ACTION);
        };
        MDCSnackbarFoundation.prototype.handleActionIconClick = function (_evt) {
            this.close(REASON_DISMISS);
        };
        MDCSnackbarFoundation.prototype.clearAutoDismissTimer_ = function () {
            clearTimeout(this.autoDismissTimer_);
            this.autoDismissTimer_ = 0;
        };
        MDCSnackbarFoundation.prototype.handleAnimationTimerEnd_ = function () {
            this.animationTimer_ = 0;
            this.adapter.removeClass(cssClasses$8.OPENING);
            this.adapter.removeClass(cssClasses$8.CLOSING);
        };
        /**
         * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
         */
        MDCSnackbarFoundation.prototype.runNextAnimationFrame_ = function (callback) {
            var _this = this;
            cancelAnimationFrame(this.animationFrame_);
            this.animationFrame_ = requestAnimationFrame(function () {
                _this.animationFrame_ = 0;
                clearTimeout(_this.animationTimer_);
                _this.animationTimer_ = setTimeout(callback, 0);
            });
        };
        return MDCSnackbarFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var SURFACE_SELECTOR = strings$b.SURFACE_SELECTOR, LABEL_SELECTOR = strings$b.LABEL_SELECTOR, ACTION_SELECTOR = strings$b.ACTION_SELECTOR, DISMISS_SELECTOR = strings$b.DISMISS_SELECTOR, OPENING_EVENT = strings$b.OPENING_EVENT, OPENED_EVENT = strings$b.OPENED_EVENT, CLOSING_EVENT = strings$b.CLOSING_EVENT, CLOSED_EVENT = strings$b.CLOSED_EVENT;
    var MDCSnackbar = /** @class */ (function (_super) {
        __extends(MDCSnackbar, _super);
        function MDCSnackbar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCSnackbar.attachTo = function (root) {
            return new MDCSnackbar(root);
        };
        MDCSnackbar.prototype.initialize = function (announcerFactory) {
            if (announcerFactory === void 0) { announcerFactory = function () { return announce$1; }; }
            this.announce_ = announcerFactory();
        };
        MDCSnackbar.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.surfaceEl_ = this.root.querySelector(SURFACE_SELECTOR);
            this.labelEl_ = this.root.querySelector(LABEL_SELECTOR);
            this.actionEl_ = this.root.querySelector(ACTION_SELECTOR);
            this.handleKeyDown_ = function (evt) { return _this.foundation.handleKeyDown(evt); };
            this.handleSurfaceClick_ = function (evt) {
                var target = evt.target;
                if (_this.isActionButton_(target)) {
                    _this.foundation.handleActionButtonClick(evt);
                }
                else if (_this.isActionIcon_(target)) {
                    _this.foundation.handleActionIconClick(evt);
                }
            };
            this.registerKeyDownHandler_(this.handleKeyDown_);
            this.registerSurfaceClickHandler_(this.handleSurfaceClick_);
        };
        MDCSnackbar.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.deregisterKeyDownHandler_(this.handleKeyDown_);
            this.deregisterSurfaceClickHandler_(this.handleSurfaceClick_);
        };
        MDCSnackbar.prototype.open = function () {
            this.foundation.open();
        };
        /**
         * @param reason Why the snackbar was closed. Value will be passed to CLOSING_EVENT and CLOSED_EVENT via the
         *     `event.detail.reason` property. Standard values are REASON_ACTION and REASON_DISMISS, but custom
         *     client-specific values may also be used if desired.
         */
        MDCSnackbar.prototype.close = function (reason) {
            if (reason === void 0) { reason = ''; }
            this.foundation.close(reason);
        };
        MDCSnackbar.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                announce: function () { return _this.announce_(_this.labelEl_); },
                notifyClosed: function (reason) { return _this.emit(CLOSED_EVENT, reason ? { reason: reason } : {}); },
                notifyClosing: function (reason) { return _this.emit(CLOSING_EVENT, reason ? { reason: reason } : {}); },
                notifyOpened: function () { return _this.emit(OPENED_EVENT, {}); },
                notifyOpening: function () { return _this.emit(OPENING_EVENT, {}); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
            };
            return new MDCSnackbarFoundation(adapter);
        };
        Object.defineProperty(MDCSnackbar.prototype, "timeoutMs", {
            get: function () {
                return this.foundation.getTimeoutMs();
            },
            set: function (timeoutMs) {
                this.foundation.setTimeoutMs(timeoutMs);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSnackbar.prototype, "closeOnEscape", {
            get: function () {
                return this.foundation.getCloseOnEscape();
            },
            set: function (closeOnEscape) {
                this.foundation.setCloseOnEscape(closeOnEscape);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSnackbar.prototype, "isOpen", {
            get: function () {
                return this.foundation.isOpen();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSnackbar.prototype, "labelText", {
            get: function () {
                // This property only returns null if the node is a document, DOCTYPE, or notation.
                // On Element nodes, it always returns a string.
                return this.labelEl_.textContent;
            },
            set: function (labelText) {
                this.labelEl_.textContent = labelText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCSnackbar.prototype, "actionButtonText", {
            get: function () {
                return this.actionEl_.textContent;
            },
            set: function (actionButtonText) {
                this.actionEl_.textContent = actionButtonText;
            },
            enumerable: true,
            configurable: true
        });
        MDCSnackbar.prototype.registerKeyDownHandler_ = function (handler) {
            this.listen('keydown', handler);
        };
        MDCSnackbar.prototype.deregisterKeyDownHandler_ = function (handler) {
            this.unlisten('keydown', handler);
        };
        MDCSnackbar.prototype.registerSurfaceClickHandler_ = function (handler) {
            this.surfaceEl_.addEventListener('click', handler);
        };
        MDCSnackbar.prototype.deregisterSurfaceClickHandler_ = function (handler) {
            this.surfaceEl_.removeEventListener('click', handler);
        };
        MDCSnackbar.prototype.isActionButton_ = function (target) {
            return Boolean(closest(target, ACTION_SELECTOR));
        };
        MDCSnackbar.prototype.isActionIcon_ = function (target) {
            return Boolean(closest(target, DISMISS_SELECTOR));
        };
        return MDCSnackbar;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$7 = {
        ROOT: 'mdc-form-field',
    };
    var strings$a = {
        LABEL_SELECTOR: '.mdc-form-field > label',
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFormFieldFoundation = /** @class */ (function (_super) {
        __extends(MDCFormFieldFoundation, _super);
        function MDCFormFieldFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCFormFieldFoundation.defaultAdapter), adapter)) || this;
            _this.click = function () {
                _this.handleClick();
            };
            return _this;
        }
        Object.defineProperty(MDCFormFieldFoundation, "cssClasses", {
            get: function () {
                return cssClasses$7;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCFormFieldFoundation, "strings", {
            get: function () {
                return strings$a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCFormFieldFoundation, "defaultAdapter", {
            get: function () {
                return {
                    activateInputRipple: function () { return undefined; },
                    deactivateInputRipple: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                    registerInteractionHandler: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCFormFieldFoundation.prototype.init = function () {
            this.adapter.registerInteractionHandler('click', this.click);
        };
        MDCFormFieldFoundation.prototype.destroy = function () {
            this.adapter.deregisterInteractionHandler('click', this.click);
        };
        MDCFormFieldFoundation.prototype.handleClick = function () {
            var _this = this;
            this.adapter.activateInputRipple();
            requestAnimationFrame(function () {
                _this.adapter.deactivateInputRipple();
            });
        };
        return MDCFormFieldFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFormField = /** @class */ (function (_super) {
        __extends(MDCFormField, _super);
        function MDCFormField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCFormField.attachTo = function (root) {
            return new MDCFormField(root);
        };
        MDCFormField.prototype.labelEl = function () {
            var LABEL_SELECTOR = MDCFormFieldFoundation.strings.LABEL_SELECTOR;
            return this.root.querySelector(LABEL_SELECTOR);
        };
        MDCFormField.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                activateInputRipple: function () {
                    if (_this.input && _this.input.ripple) {
                        _this.input.ripple.activate();
                    }
                },
                deactivateInputRipple: function () {
                    if (_this.input && _this.input.ripple) {
                        _this.input.ripple.deactivate();
                    }
                },
                deregisterInteractionHandler: function (evtType, handler) {
                    var labelEl = _this.labelEl();
                    if (labelEl) {
                        labelEl.removeEventListener(evtType, handler);
                    }
                },
                registerInteractionHandler: function (evtType, handler) {
                    var labelEl = _this.labelEl();
                    if (labelEl) {
                        labelEl.addEventListener(evtType, handler);
                    }
                },
            };
            return new MDCFormFieldFoundation(adapter);
        };
        return MDCFormField;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$6 = {
        ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
        ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
        ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
        ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked',
        ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
        ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
        BACKGROUND: 'mdc-checkbox__background',
        CHECKED: 'mdc-checkbox--checked',
        CHECKMARK: 'mdc-checkbox__checkmark',
        CHECKMARK_PATH: 'mdc-checkbox__checkmark-path',
        DISABLED: 'mdc-checkbox--disabled',
        INDETERMINATE: 'mdc-checkbox--indeterminate',
        MIXEDMARK: 'mdc-checkbox__mixedmark',
        NATIVE_CONTROL: 'mdc-checkbox__native-control',
        ROOT: 'mdc-checkbox',
        SELECTED: 'mdc-checkbox--selected',
        UPGRADED: 'mdc-checkbox--upgraded',
    };
    var strings$9 = {
        ARIA_CHECKED_ATTR: 'aria-checked',
        ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed',
        DATA_INDETERMINATE_ATTR: 'data-indeterminate',
        NATIVE_CONTROL_SELECTOR: '.mdc-checkbox__native-control',
        TRANSITION_STATE_CHECKED: 'checked',
        TRANSITION_STATE_INDETERMINATE: 'indeterminate',
        TRANSITION_STATE_INIT: 'init',
        TRANSITION_STATE_UNCHECKED: 'unchecked',
    };
    var numbers$1 = {
        ANIM_END_LATCH_MS: 250,
    };

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCCheckboxFoundation = /** @class */ (function (_super) {
        __extends(MDCCheckboxFoundation, _super);
        function MDCCheckboxFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCCheckboxFoundation.defaultAdapter), adapter)) || this;
            _this.currentCheckState_ = strings$9.TRANSITION_STATE_INIT;
            _this.currentAnimationClass_ = '';
            _this.animEndLatchTimer_ = 0;
            _this.enableAnimationEndHandler_ = false;
            return _this;
        }
        Object.defineProperty(MDCCheckboxFoundation, "cssClasses", {
            get: function () {
                return cssClasses$6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckboxFoundation, "strings", {
            get: function () {
                return strings$9;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckboxFoundation, "numbers", {
            get: function () {
                return numbers$1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckboxFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    forceLayout: function () { return undefined; },
                    hasNativeControl: function () { return false; },
                    isAttachedToDOM: function () { return false; },
                    isChecked: function () { return false; },
                    isIndeterminate: function () { return false; },
                    removeClass: function () { return undefined; },
                    removeNativeControlAttr: function () { return undefined; },
                    setNativeControlAttr: function () { return undefined; },
                    setNativeControlDisabled: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCCheckboxFoundation.prototype.init = function () {
            this.currentCheckState_ = this.determineCheckState_();
            this.updateAriaChecked_();
            this.adapter.addClass(cssClasses$6.UPGRADED);
        };
        MDCCheckboxFoundation.prototype.destroy = function () {
            clearTimeout(this.animEndLatchTimer_);
        };
        MDCCheckboxFoundation.prototype.setDisabled = function (disabled) {
            this.adapter.setNativeControlDisabled(disabled);
            if (disabled) {
                this.adapter.addClass(cssClasses$6.DISABLED);
            }
            else {
                this.adapter.removeClass(cssClasses$6.DISABLED);
            }
        };
        /**
         * Handles the animationend event for the checkbox
         */
        MDCCheckboxFoundation.prototype.handleAnimationEnd = function () {
            var _this = this;
            if (!this.enableAnimationEndHandler_) {
                return;
            }
            clearTimeout(this.animEndLatchTimer_);
            this.animEndLatchTimer_ = setTimeout(function () {
                _this.adapter.removeClass(_this.currentAnimationClass_);
                _this.enableAnimationEndHandler_ = false;
            }, numbers$1.ANIM_END_LATCH_MS);
        };
        /**
         * Handles the change event for the checkbox
         */
        MDCCheckboxFoundation.prototype.handleChange = function () {
            this.transitionCheckState_();
        };
        MDCCheckboxFoundation.prototype.transitionCheckState_ = function () {
            if (!this.adapter.hasNativeControl()) {
                return;
            }
            var oldState = this.currentCheckState_;
            var newState = this.determineCheckState_();
            if (oldState === newState) {
                return;
            }
            this.updateAriaChecked_();
            var TRANSITION_STATE_UNCHECKED = strings$9.TRANSITION_STATE_UNCHECKED;
            var SELECTED = cssClasses$6.SELECTED;
            if (newState === TRANSITION_STATE_UNCHECKED) {
                this.adapter.removeClass(SELECTED);
            }
            else {
                this.adapter.addClass(SELECTED);
            }
            // Check to ensure that there isn't a previously existing animation class, in case for example
            // the user interacted with the checkbox before the animation was finished.
            if (this.currentAnimationClass_.length > 0) {
                clearTimeout(this.animEndLatchTimer_);
                this.adapter.forceLayout();
                this.adapter.removeClass(this.currentAnimationClass_);
            }
            this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
            this.currentCheckState_ = newState;
            // Check for parentNode so that animations are only run when the element is attached
            // to the DOM.
            if (this.adapter.isAttachedToDOM() &&
                this.currentAnimationClass_.length > 0) {
                this.adapter.addClass(this.currentAnimationClass_);
                this.enableAnimationEndHandler_ = true;
            }
        };
        MDCCheckboxFoundation.prototype.determineCheckState_ = function () {
            var TRANSITION_STATE_INDETERMINATE = strings$9.TRANSITION_STATE_INDETERMINATE, TRANSITION_STATE_CHECKED = strings$9.TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED = strings$9.TRANSITION_STATE_UNCHECKED;
            if (this.adapter.isIndeterminate()) {
                return TRANSITION_STATE_INDETERMINATE;
            }
            return this.adapter.isChecked() ? TRANSITION_STATE_CHECKED :
                TRANSITION_STATE_UNCHECKED;
        };
        MDCCheckboxFoundation.prototype.getTransitionAnimationClass_ = function (oldState, newState) {
            var TRANSITION_STATE_INIT = strings$9.TRANSITION_STATE_INIT, TRANSITION_STATE_CHECKED = strings$9.TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED = strings$9.TRANSITION_STATE_UNCHECKED;
            var _a = MDCCheckboxFoundation.cssClasses, ANIM_UNCHECKED_CHECKED = _a.ANIM_UNCHECKED_CHECKED, ANIM_UNCHECKED_INDETERMINATE = _a.ANIM_UNCHECKED_INDETERMINATE, ANIM_CHECKED_UNCHECKED = _a.ANIM_CHECKED_UNCHECKED, ANIM_CHECKED_INDETERMINATE = _a.ANIM_CHECKED_INDETERMINATE, ANIM_INDETERMINATE_CHECKED = _a.ANIM_INDETERMINATE_CHECKED, ANIM_INDETERMINATE_UNCHECKED = _a.ANIM_INDETERMINATE_UNCHECKED;
            switch (oldState) {
                case TRANSITION_STATE_INIT:
                    if (newState === TRANSITION_STATE_UNCHECKED) {
                        return '';
                    }
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
                case TRANSITION_STATE_UNCHECKED:
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
                case TRANSITION_STATE_CHECKED:
                    return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
                default: // TRANSITION_STATE_INDETERMINATE
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
            }
        };
        MDCCheckboxFoundation.prototype.updateAriaChecked_ = function () {
            // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
            if (this.adapter.isIndeterminate()) {
                this.adapter.setNativeControlAttr(strings$9.ARIA_CHECKED_ATTR, strings$9.ARIA_CHECKED_INDETERMINATE_VALUE);
            }
            else {
                // The on/off state does not need to keep track of aria-checked, since
                // the screenreader uses the checked property on the checkbox element.
                this.adapter.removeNativeControlAttr(strings$9.ARIA_CHECKED_ATTR);
            }
        };
        return MDCCheckboxFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var CB_PROTO_PROPS = ['checked', 'indeterminate'];
    var MDCCheckbox = /** @class */ (function (_super) {
        __extends(MDCCheckbox, _super);
        function MDCCheckbox() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ripple_ = _this.createRipple_();
            return _this;
        }
        MDCCheckbox.attachTo = function (root) {
            return new MDCCheckbox(root);
        };
        Object.defineProperty(MDCCheckbox.prototype, "ripple", {
            get: function () {
                return this.ripple_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckbox.prototype, "checked", {
            get: function () {
                return this.nativeControl_.checked;
            },
            set: function (checked) {
                this.nativeControl_.checked = checked;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckbox.prototype, "indeterminate", {
            get: function () {
                return this.nativeControl_.indeterminate;
            },
            set: function (indeterminate) {
                this.nativeControl_.indeterminate = indeterminate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckbox.prototype, "disabled", {
            get: function () {
                return this.nativeControl_.disabled;
            },
            set: function (disabled) {
                this.foundation.setDisabled(disabled);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckbox.prototype, "value", {
            get: function () {
                return this.nativeControl_.value;
            },
            set: function (value) {
                this.nativeControl_.value = value;
            },
            enumerable: true,
            configurable: true
        });
        MDCCheckbox.prototype.initialize = function () {
            var DATA_INDETERMINATE_ATTR = strings$9.DATA_INDETERMINATE_ATTR;
            this.nativeControl_.indeterminate =
                this.nativeControl_.getAttribute(DATA_INDETERMINATE_ATTR) === 'true';
            this.nativeControl_.removeAttribute(DATA_INDETERMINATE_ATTR);
        };
        MDCCheckbox.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.handleChange_ = function () { return _this.foundation.handleChange(); };
            this.handleAnimationEnd_ = function () { return _this.foundation.handleAnimationEnd(); };
            this.nativeControl_.addEventListener('change', this.handleChange_);
            this.listen(getCorrectEventName(window, 'animationend'), this.handleAnimationEnd_);
            this.installPropertyChangeHooks_();
        };
        MDCCheckbox.prototype.destroy = function () {
            this.ripple_.destroy();
            this.nativeControl_.removeEventListener('change', this.handleChange_);
            this.unlisten(getCorrectEventName(window, 'animationend'), this.handleAnimationEnd_);
            this.uninstallPropertyChangeHooks_();
            _super.prototype.destroy.call(this);
        };
        MDCCheckbox.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                forceLayout: function () { return _this.root.offsetWidth; },
                hasNativeControl: function () { return !!_this.nativeControl_; },
                isAttachedToDOM: function () { return Boolean(_this.root.parentNode); },
                isChecked: function () { return _this.checked; },
                isIndeterminate: function () { return _this.indeterminate; },
                removeClass: function (className) {
                    _this.root.classList.remove(className);
                },
                removeNativeControlAttr: function (attr) {
                    _this.nativeControl_.removeAttribute(attr);
                },
                setNativeControlAttr: function (attr, value) {
                    _this.nativeControl_.setAttribute(attr, value);
                },
                setNativeControlDisabled: function (disabled) {
                    _this.nativeControl_.disabled = disabled;
                },
            };
            return new MDCCheckboxFoundation(adapter);
        };
        MDCCheckbox.prototype.createRipple_ = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = __assign(__assign({}, MDCRipple.createAdapter(this)), { deregisterInteractionHandler: function (evtType, handler) { return _this.nativeControl_.removeEventListener(evtType, handler, applyPassive()); }, isSurfaceActive: function () { return matches(_this.nativeControl_, ':active'); }, isUnbounded: function () { return true; }, registerInteractionHandler: function (evtType, handler) { return _this.nativeControl_.addEventListener(evtType, handler, applyPassive()); } });
            return new MDCRipple(this.root, new MDCRippleFoundation(adapter));
        };
        MDCCheckbox.prototype.installPropertyChangeHooks_ = function () {
            var _this = this;
            var nativeCb = this.nativeControl_;
            var cbProto = Object.getPrototypeOf(nativeCb);
            CB_PROTO_PROPS.forEach(function (controlState) {
                var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
                // We have to check for this descriptor, since some browsers (Safari) don't support its return.
                // See: https://bugs.webkit.org/show_bug.cgi?id=49739
                if (!validDescriptor(desc)) {
                    return;
                }
                // Type cast is needed for compatibility with Closure Compiler.
                var nativeGetter = desc.get;
                var nativeCbDesc = {
                    configurable: desc.configurable,
                    enumerable: desc.enumerable,
                    get: nativeGetter,
                    set: function (state) {
                        desc.set.call(nativeCb, state);
                        _this.foundation.handleChange();
                    },
                };
                Object.defineProperty(nativeCb, controlState, nativeCbDesc);
            });
        };
        MDCCheckbox.prototype.uninstallPropertyChangeHooks_ = function () {
            var nativeCb = this.nativeControl_;
            var cbProto = Object.getPrototypeOf(nativeCb);
            CB_PROTO_PROPS.forEach(function (controlState) {
                var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
                if (!validDescriptor(desc)) {
                    return;
                }
                Object.defineProperty(nativeCb, controlState, desc);
            });
        };
        Object.defineProperty(MDCCheckbox.prototype, "nativeControl_", {
            get: function () {
                var NATIVE_CONTROL_SELECTOR = strings$9.NATIVE_CONTROL_SELECTOR;
                var el = this.root.querySelector(NATIVE_CONTROL_SELECTOR);
                if (!el) {
                    throw new Error("Checkbox component requires a " + NATIVE_CONTROL_SELECTOR + " element");
                }
                return el;
            },
            enumerable: true,
            configurable: true
        });
        return MDCCheckbox;
    }(MDCComponent));
    function validDescriptor(inputPropDesc) {
        return !!inputPropDesc && typeof inputPropDesc.set === 'function';
    }

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$5 = {
        CLOSED_CLASS: 'mdc-linear-progress--closed',
        CLOSED_ANIMATION_OFF_CLASS: 'mdc-linear-progress--closed-animation-off',
        INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
        REVERSED_CLASS: 'mdc-linear-progress--reversed',
        ANIMATION_READY_CLASS: 'mdc-linear-progress--animation-ready',
    };
    var strings$8 = {
        ARIA_VALUEMAX: 'aria-valuemax',
        ARIA_VALUEMIN: 'aria-valuemin',
        ARIA_VALUENOW: 'aria-valuenow',
        BUFFER_BAR_SELECTOR: '.mdc-linear-progress__buffer-bar',
        FLEX_BASIS: 'flex-basis',
        PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar',
    };
    // these are percentages pulled from keyframes.scss
    var animationDimensionPercentages = {
        PRIMARY_HALF: .8367142,
        PRIMARY_FULL: 2.00611057,
        SECONDARY_QUARTER: .37651913,
        SECONDARY_HALF: .84386165,
        SECONDARY_FULL: 1.60277782,
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCLinearProgressFoundation = /** @class */ (function (_super) {
        __extends(MDCLinearProgressFoundation, _super);
        function MDCLinearProgressFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCLinearProgressFoundation.defaultAdapter), adapter)) || this;
            _this.observer = null;
            return _this;
        }
        Object.defineProperty(MDCLinearProgressFoundation, "cssClasses", {
            get: function () {
                return cssClasses$5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCLinearProgressFoundation, "strings", {
            get: function () {
                return strings$8;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCLinearProgressFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    attachResizeObserver: function () { return null; },
                    forceLayout: function () { return undefined; },
                    getWidth: function () { return 0; },
                    hasClass: function () { return false; },
                    setBufferBarStyle: function () { return null; },
                    setPrimaryBarStyle: function () { return null; },
                    setStyle: function () { return undefined; },
                    removeAttribute: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    setAttribute: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCLinearProgressFoundation.prototype.init = function () {
            var _this = this;
            this.isDeterminate = !this.adapter.hasClass(cssClasses$5.INDETERMINATE_CLASS);
            this.adapter.addClass(cssClasses$5.ANIMATION_READY_CLASS);
            this.progress = 0;
            this.buffer = 1;
            this.observer = this.adapter.attachResizeObserver(function (entries) {
                var e_1, _a;
                if (_this.isDeterminate) {
                    return;
                }
                try {
                    for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                        var entry = entries_1_1.value;
                        if (entry.contentRect) {
                            _this.calculateAndSetDimensions(entry.contentRect.width);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
            if (!this.isDeterminate && this.observer) {
                this.calculateAndSetDimensions(this.adapter.getWidth());
            }
        };
        MDCLinearProgressFoundation.prototype.setDeterminate = function (isDeterminate) {
            this.isDeterminate = isDeterminate;
            if (this.isDeterminate) {
                this.adapter.removeClass(cssClasses$5.INDETERMINATE_CLASS);
                this.adapter.setAttribute(strings$8.ARIA_VALUENOW, this.progress.toString());
                this.adapter.setAttribute(strings$8.ARIA_VALUEMAX, '1');
                this.adapter.setAttribute(strings$8.ARIA_VALUEMIN, '0');
                this.setPrimaryBarProgress(this.progress);
                this.setBufferBarProgress(this.buffer);
                return;
            }
            if (this.observer) {
                this.calculateAndSetDimensions(this.adapter.getWidth());
            }
            this.adapter.addClass(cssClasses$5.INDETERMINATE_CLASS);
            this.adapter.removeAttribute(strings$8.ARIA_VALUENOW);
            this.adapter.removeAttribute(strings$8.ARIA_VALUEMAX);
            this.adapter.removeAttribute(strings$8.ARIA_VALUEMIN);
            this.setPrimaryBarProgress(1);
            this.setBufferBarProgress(1);
        };
        MDCLinearProgressFoundation.prototype.getDeterminate = function () {
            return this.isDeterminate;
        };
        MDCLinearProgressFoundation.prototype.setProgress = function (value) {
            this.progress = value;
            if (this.isDeterminate) {
                this.setPrimaryBarProgress(value);
                this.adapter.setAttribute(strings$8.ARIA_VALUENOW, value.toString());
            }
        };
        MDCLinearProgressFoundation.prototype.getProgress = function () {
            return this.progress;
        };
        MDCLinearProgressFoundation.prototype.setBuffer = function (value) {
            this.buffer = value;
            if (this.isDeterminate) {
                this.setBufferBarProgress(value);
            }
        };
        MDCLinearProgressFoundation.prototype.open = function () {
            this.adapter.removeClass(cssClasses$5.CLOSED_CLASS);
            this.adapter.removeClass(cssClasses$5.CLOSED_ANIMATION_OFF_CLASS);
        };
        MDCLinearProgressFoundation.prototype.close = function () {
            this.adapter.addClass(cssClasses$5.CLOSED_CLASS);
        };
        /**
         * Handles the transitionend event emitted after `close()` is called and the
         * opacity fades out. This is so that animations are removed only after the
         * progress indicator is completely hidden.
         */
        MDCLinearProgressFoundation.prototype.handleTransitionEnd = function () {
            if (this.adapter.hasClass(cssClasses$5.CLOSED_CLASS)) {
                this.adapter.addClass(cssClasses$5.CLOSED_ANIMATION_OFF_CLASS);
            }
        };
        MDCLinearProgressFoundation.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this.observer) {
                this.observer.disconnect();
            }
        };
        MDCLinearProgressFoundation.prototype.restartAnimation = function () {
            this.adapter.removeClass(cssClasses$5.ANIMATION_READY_CLASS);
            this.adapter.forceLayout();
            this.adapter.addClass(cssClasses$5.ANIMATION_READY_CLASS);
        };
        MDCLinearProgressFoundation.prototype.setPrimaryBarProgress = function (progressValue) {
            var value = "scaleX(" + progressValue + ")";
            // Accessing `window` without a `typeof` check will throw on Node
            // environments.
            var transformProp = typeof window !== 'undefined' ?
                getCorrectPropertyName(window, 'transform') :
                'transform';
            this.adapter.setPrimaryBarStyle(transformProp, value);
        };
        MDCLinearProgressFoundation.prototype.setBufferBarProgress = function (progressValue) {
            var value = progressValue * 100 + "%";
            this.adapter.setBufferBarStyle(strings$8.FLEX_BASIS, value);
        };
        MDCLinearProgressFoundation.prototype.calculateAndSetDimensions = function (width) {
            var primaryHalf = width * animationDimensionPercentages.PRIMARY_HALF;
            var primaryFull = width * animationDimensionPercentages.PRIMARY_FULL;
            var secondaryQuarter = width * animationDimensionPercentages.SECONDARY_QUARTER;
            var secondaryHalf = width * animationDimensionPercentages.SECONDARY_HALF;
            var secondaryFull = width * animationDimensionPercentages.SECONDARY_FULL;
            this.adapter.setStyle('--mdc-linear-progress-primary-half', primaryHalf + "px");
            this.adapter.setStyle('--mdc-linear-progress-primary-half-neg', -primaryHalf + "px");
            this.adapter.setStyle('--mdc-linear-progress-primary-full', primaryFull + "px");
            this.adapter.setStyle('--mdc-linear-progress-primary-full-neg', -primaryFull + "px");
            this.adapter.setStyle('--mdc-linear-progress-secondary-quarter', secondaryQuarter + "px");
            this.adapter.setStyle('--mdc-linear-progress-secondary-quarter-neg', -secondaryQuarter + "px");
            this.adapter.setStyle('--mdc-linear-progress-secondary-half', secondaryHalf + "px");
            this.adapter.setStyle('--mdc-linear-progress-secondary-half-neg', -secondaryHalf + "px");
            this.adapter.setStyle('--mdc-linear-progress-secondary-full', secondaryFull + "px");
            this.adapter.setStyle('--mdc-linear-progress-secondary-full-neg', -secondaryFull + "px");
            // need to restart animation for custom props to apply to keyframes
            this.restartAnimation();
        };
        return MDCLinearProgressFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCLinearProgress = /** @class */ (function (_super) {
        __extends(MDCLinearProgress, _super);
        function MDCLinearProgress() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCLinearProgress.attachTo = function (root) {
            return new MDCLinearProgress(root);
        };
        Object.defineProperty(MDCLinearProgress.prototype, "determinate", {
            set: function (value) {
                this.foundation.setDeterminate(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCLinearProgress.prototype, "progress", {
            set: function (value) {
                this.foundation.setProgress(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCLinearProgress.prototype, "buffer", {
            set: function (value) {
                this.foundation.setBuffer(value);
            },
            enumerable: true,
            configurable: true
        });
        MDCLinearProgress.prototype.open = function () {
            this.foundation.open();
        };
        MDCLinearProgress.prototype.close = function () {
            this.foundation.close();
        };
        MDCLinearProgress.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.root.addEventListener('transitionend', function () {
                _this.foundation.handleTransitionEnd();
            });
        };
        MDCLinearProgress.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take
            // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
            // methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                addClass: function (className) {
                    _this.root.classList.add(className);
                },
                forceLayout: function () {
                    _this.root.getBoundingClientRect();
                },
                setBufferBarStyle: function (styleProperty, value) {
                    var bufferBar = _this.root.querySelector(MDCLinearProgressFoundation.strings.BUFFER_BAR_SELECTOR);
                    if (bufferBar) {
                        bufferBar.style.setProperty(styleProperty, value);
                    }
                },
                setPrimaryBarStyle: function (styleProperty, value) {
                    var primaryBar = _this.root.querySelector(MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR);
                    if (primaryBar) {
                        primaryBar.style.setProperty(styleProperty, value);
                    }
                },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                removeAttribute: function (attributeName) {
                    _this.root.removeAttribute(attributeName);
                },
                removeClass: function (className) {
                    _this.root.classList.remove(className);
                },
                setAttribute: function (attributeName, value) {
                    _this.root.setAttribute(attributeName, value);
                },
                setStyle: function (name, value) {
                    _this.root.style.setProperty(name, value);
                },
                attachResizeObserver: function (callback) {
                    var RO = window.ResizeObserver;
                    if (RO) {
                        var ro = new RO(callback);
                        ro.observe(_this.root);
                        return ro;
                    }
                    return null;
                },
                getWidth: function () { return _this.root.offsetWidth; },
            };
            return new MDCLinearProgressFoundation(adapter);
        };
        return MDCLinearProgress;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var InteractionTrigger;
    (function (InteractionTrigger) {
        InteractionTrigger[InteractionTrigger["UNSPECIFIED"] = 0] = "UNSPECIFIED";
        InteractionTrigger[InteractionTrigger["CLICK"] = 1] = "CLICK";
        InteractionTrigger[InteractionTrigger["BACKSPACE_KEY"] = 2] = "BACKSPACE_KEY";
        InteractionTrigger[InteractionTrigger["DELETE_KEY"] = 3] = "DELETE_KEY";
        InteractionTrigger[InteractionTrigger["SPACEBAR_KEY"] = 4] = "SPACEBAR_KEY";
        InteractionTrigger[InteractionTrigger["ENTER_KEY"] = 5] = "ENTER_KEY";
    })(InteractionTrigger || (InteractionTrigger = {}));
    var strings$7 = {
        ARIA_HIDDEN: 'aria-hidden',
        INTERACTION_EVENT: 'MDCChipTrailingAction:interaction',
        NAVIGATION_EVENT: 'MDCChipTrailingAction:navigation',
        TAB_INDEX: 'tabindex',
    };

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCChipTrailingActionFoundation = /** @class */ (function (_super) {
        __extends(MDCChipTrailingActionFoundation, _super);
        function MDCChipTrailingActionFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCChipTrailingActionFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCChipTrailingActionFoundation, "strings", {
            get: function () {
                return strings$7;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChipTrailingActionFoundation, "defaultAdapter", {
            get: function () {
                return {
                    focus: function () { return undefined; },
                    getAttribute: function () { return null; },
                    setAttribute: function () { return undefined; },
                    notifyInteraction: function () { return undefined; },
                    notifyNavigation: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCChipTrailingActionFoundation.prototype.handleClick = function (evt) {
            evt.stopPropagation();
            this.adapter.notifyInteraction(InteractionTrigger.CLICK);
        };
        MDCChipTrailingActionFoundation.prototype.handleKeydown = function (evt) {
            evt.stopPropagation();
            var key = normalizeKey(evt);
            if (this.shouldNotifyInteractionFromKey_(key)) {
                var trigger = this.getTriggerFromKey_(key);
                this.adapter.notifyInteraction(trigger);
                return;
            }
            if (isNavigationEvent(evt)) {
                this.adapter.notifyNavigation(key);
                return;
            }
        };
        MDCChipTrailingActionFoundation.prototype.removeFocus = function () {
            this.adapter.setAttribute(strings$7.TAB_INDEX, '-1');
        };
        MDCChipTrailingActionFoundation.prototype.focus = function () {
            this.adapter.setAttribute(strings$7.TAB_INDEX, '0');
            this.adapter.focus();
        };
        MDCChipTrailingActionFoundation.prototype.isNavigable = function () {
            return this.adapter.getAttribute(strings$7.ARIA_HIDDEN) !== 'true';
        };
        MDCChipTrailingActionFoundation.prototype.shouldNotifyInteractionFromKey_ = function (key) {
            var isFromActionKey = key === KEY.ENTER || key === KEY.SPACEBAR;
            var isFromDeleteKey = key === KEY.BACKSPACE || key === KEY.DELETE;
            return isFromActionKey || isFromDeleteKey;
        };
        MDCChipTrailingActionFoundation.prototype.getTriggerFromKey_ = function (key) {
            if (key === KEY.SPACEBAR) {
                return InteractionTrigger.SPACEBAR_KEY;
            }
            if (key === KEY.ENTER) {
                return InteractionTrigger.ENTER_KEY;
            }
            if (key === KEY.DELETE) {
                return InteractionTrigger.DELETE_KEY;
            }
            if (key === KEY.BACKSPACE) {
                return InteractionTrigger.BACKSPACE_KEY;
            }
            // Default case, should never be returned
            return InteractionTrigger.UNSPECIFIED;
        };
        return MDCChipTrailingActionFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCChipTrailingAction = /** @class */ (function (_super) {
        __extends(MDCChipTrailingAction, _super);
        function MDCChipTrailingAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MDCChipTrailingAction.prototype, "ripple", {
            get: function () {
                return this.ripple_;
            },
            enumerable: true,
            configurable: true
        });
        MDCChipTrailingAction.attachTo = function (root) {
            return new MDCChipTrailingAction(root);
        };
        MDCChipTrailingAction.prototype.initialize = function (rippleFactory) {
            if (rippleFactory === void 0) { rippleFactory = function (el, foundation) {
                return new MDCRipple(el, foundation);
            }; }
            // DO NOT INLINE this variable. For backward compatibility, foundations take
            // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
            // methods, we need a separate, strongly typed adapter variable.
            var rippleAdapter = MDCRipple.createAdapter(this);
            this.ripple_ =
                rippleFactory(this.root, new MDCRippleFoundation(rippleAdapter));
        };
        MDCChipTrailingAction.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.handleClick_ = function (evt) {
                _this.foundation.handleClick(evt);
            };
            this.handleKeydown_ = function (evt) {
                _this.foundation.handleKeydown(evt);
            };
            this.listen('click', this.handleClick_);
            this.listen('keydown', this.handleKeydown_);
        };
        MDCChipTrailingAction.prototype.destroy = function () {
            this.ripple_.destroy();
            this.unlisten('click', this.handleClick_);
            this.unlisten('keydown', this.handleKeydown_);
            _super.prototype.destroy.call(this);
        };
        MDCChipTrailingAction.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take
            // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
            // methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                focus: function () {
                    // TODO(b/157231863): Migate MDCComponent#root to HTMLElement
                    _this.root.focus();
                },
                getAttribute: function (attr) { return _this.root.getAttribute(attr); },
                notifyInteraction: function (trigger) {
                    return _this.emit(strings$7.INTERACTION_EVENT, { trigger: trigger }, true /* shouldBubble */);
                },
                notifyNavigation: function (key) {
                    _this.emit(strings$7.NAVIGATION_EVENT, { key: key }, true /* shouldBubble */);
                },
                setAttribute: function (attr, value) {
                    _this.root.setAttribute(attr, value);
                },
            };
            return new MDCChipTrailingActionFoundation(adapter);
        };
        MDCChipTrailingAction.prototype.isNavigable = function () {
            return this.foundation.isNavigable();
        };
        MDCChipTrailingAction.prototype.focus = function () {
            this.foundation.focus();
        };
        MDCChipTrailingAction.prototype.removeFocus = function () {
            this.foundation.removeFocus();
        };
        return MDCChipTrailingAction;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var Direction;
    (function (Direction) {
        Direction["LEFT"] = "left";
        Direction["RIGHT"] = "right";
    })(Direction || (Direction = {}));
    var EventSource;
    (function (EventSource) {
        EventSource["PRIMARY"] = "primary";
        EventSource["TRAILING"] = "trailing";
        EventSource["NONE"] = "none";
    })(EventSource || (EventSource = {}));
    var strings$6 = {
        ADDED_ANNOUNCEMENT_ATTRIBUTE: 'data-mdc-chip-added-announcement',
        ARIA_CHECKED: 'aria-checked',
        ARROW_DOWN_KEY: 'ArrowDown',
        ARROW_LEFT_KEY: 'ArrowLeft',
        ARROW_RIGHT_KEY: 'ArrowRight',
        ARROW_UP_KEY: 'ArrowUp',
        BACKSPACE_KEY: 'Backspace',
        CHECKMARK_SELECTOR: '.mdc-chip__checkmark',
        DELETE_KEY: 'Delete',
        END_KEY: 'End',
        ENTER_KEY: 'Enter',
        ENTRY_ANIMATION_NAME: 'mdc-chip-entry',
        HOME_KEY: 'Home',
        IE_ARROW_DOWN_KEY: 'Down',
        IE_ARROW_LEFT_KEY: 'Left',
        IE_ARROW_RIGHT_KEY: 'Right',
        IE_ARROW_UP_KEY: 'Up',
        IE_DELETE_KEY: 'Del',
        INTERACTION_EVENT: 'MDCChip:interaction',
        LEADING_ICON_SELECTOR: '.mdc-chip__icon--leading',
        NAVIGATION_EVENT: 'MDCChip:navigation',
        PRIMARY_ACTION_SELECTOR: '.mdc-chip__primary-action',
        REMOVED_ANNOUNCEMENT_ATTRIBUTE: 'data-mdc-chip-removed-announcement',
        REMOVAL_EVENT: 'MDCChip:removal',
        SELECTION_EVENT: 'MDCChip:selection',
        SPACEBAR_KEY: ' ',
        TAB_INDEX: 'tabindex',
        TRAILING_ACTION_SELECTOR: '.mdc-chip-trailing-action',
        TRAILING_ICON_INTERACTION_EVENT: 'MDCChip:trailingIconInteraction',
        TRAILING_ICON_SELECTOR: '.mdc-chip__icon--trailing',
    };
    var cssClasses$4 = {
        CHECKMARK: 'mdc-chip__checkmark',
        CHIP_EXIT: 'mdc-chip--exit',
        DELETABLE: 'mdc-chip--deletable',
        EDITABLE: 'mdc-chip--editable',
        EDITING: 'mdc-chip--editing',
        HIDDEN_LEADING_ICON: 'mdc-chip__icon--leading-hidden',
        LEADING_ICON: 'mdc-chip__icon--leading',
        PRIMARY_ACTION: 'mdc-chip__primary-action',
        PRIMARY_ACTION_FOCUSED: 'mdc-chip--primary-action-focused',
        SELECTED: 'mdc-chip--selected',
        TEXT: 'mdc-chip__text',
        TRAILING_ACTION: 'mdc-chip__trailing-action',
        TRAILING_ICON: 'mdc-chip__icon--trailing',
    };
    var navigationKeys = new Set();
    // IE11 has no support for new Set with iterable so we need to initialize this by hand
    navigationKeys.add(strings$6.ARROW_LEFT_KEY);
    navigationKeys.add(strings$6.ARROW_RIGHT_KEY);
    navigationKeys.add(strings$6.ARROW_DOWN_KEY);
    navigationKeys.add(strings$6.ARROW_UP_KEY);
    navigationKeys.add(strings$6.END_KEY);
    navigationKeys.add(strings$6.HOME_KEY);
    navigationKeys.add(strings$6.IE_ARROW_LEFT_KEY);
    navigationKeys.add(strings$6.IE_ARROW_RIGHT_KEY);
    navigationKeys.add(strings$6.IE_ARROW_DOWN_KEY);
    navigationKeys.add(strings$6.IE_ARROW_UP_KEY);
    var jumpChipKeys = new Set();
    // IE11 has no support for new Set with iterable so we need to initialize this by hand
    jumpChipKeys.add(strings$6.ARROW_UP_KEY);
    jumpChipKeys.add(strings$6.ARROW_DOWN_KEY);
    jumpChipKeys.add(strings$6.HOME_KEY);
    jumpChipKeys.add(strings$6.END_KEY);
    jumpChipKeys.add(strings$6.IE_ARROW_UP_KEY);
    jumpChipKeys.add(strings$6.IE_ARROW_DOWN_KEY);

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var emptyClientRect = {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
    };
    var FocusBehavior;
    (function (FocusBehavior) {
        FocusBehavior[FocusBehavior["SHOULD_FOCUS"] = 0] = "SHOULD_FOCUS";
        FocusBehavior[FocusBehavior["SHOULD_NOT_FOCUS"] = 1] = "SHOULD_NOT_FOCUS";
    })(FocusBehavior || (FocusBehavior = {}));
    var MDCChipFoundation = /** @class */ (function (_super) {
        __extends(MDCChipFoundation, _super);
        function MDCChipFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCChipFoundation.defaultAdapter), adapter)) || this;
            /** Whether a trailing icon click should immediately trigger exit/removal of the chip. */
            _this.shouldRemoveOnTrailingIconClick_ = true;
            /**
             * Whether the primary action should receive focus on click. Should only be
             * set to true for clients who programmatically give focus to a different
             * element on the page when a chip is clicked (like a menu).
             */
            _this.shouldFocusPrimaryActionOnClick_ = true;
            return _this;
        }
        Object.defineProperty(MDCChipFoundation, "strings", {
            get: function () {
                return strings$6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChipFoundation, "cssClasses", {
            get: function () {
                return cssClasses$4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChipFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    addClassToLeadingIcon: function () { return undefined; },
                    eventTargetHasClass: function () { return false; },
                    focusPrimaryAction: function () { return undefined; },
                    focusTrailingAction: function () { return undefined; },
                    getAttribute: function () { return null; },
                    getCheckmarkBoundingClientRect: function () { return emptyClientRect; },
                    getComputedStyleValue: function () { return ''; },
                    getRootBoundingClientRect: function () { return emptyClientRect; },
                    hasClass: function () { return false; },
                    hasLeadingIcon: function () { return false; },
                    isRTL: function () { return false; },
                    isTrailingActionNavigable: function () { return false; },
                    notifyEditFinish: function () { return undefined; },
                    notifyEditStart: function () { return undefined; },
                    notifyInteraction: function () { return undefined; },
                    notifyNavigation: function () { return undefined; },
                    notifyRemoval: function () { return undefined; },
                    notifySelection: function () { return undefined; },
                    notifyTrailingIconInteraction: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    removeClassFromLeadingIcon: function () { return undefined; },
                    removeTrailingActionFocus: function () { return undefined; },
                    setPrimaryActionAttr: function () { return undefined; },
                    setStyleProperty: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCChipFoundation.prototype.isSelected = function () {
            return this.adapter.hasClass(cssClasses$4.SELECTED);
        };
        MDCChipFoundation.prototype.isEditable = function () {
            return this.adapter.hasClass(cssClasses$4.EDITABLE);
        };
        MDCChipFoundation.prototype.isEditing = function () {
            return this.adapter.hasClass(cssClasses$4.EDITING);
        };
        MDCChipFoundation.prototype.setSelected = function (selected) {
            this.setSelected_(selected);
            this.notifySelection_(selected);
        };
        MDCChipFoundation.prototype.setSelectedFromChipSet = function (selected, shouldNotifyClients) {
            this.setSelected_(selected);
            if (shouldNotifyClients) {
                this.notifyIgnoredSelection_(selected);
            }
        };
        MDCChipFoundation.prototype.getShouldRemoveOnTrailingIconClick = function () {
            return this.shouldRemoveOnTrailingIconClick_;
        };
        MDCChipFoundation.prototype.setShouldRemoveOnTrailingIconClick = function (shouldRemove) {
            this.shouldRemoveOnTrailingIconClick_ = shouldRemove;
        };
        MDCChipFoundation.prototype.setShouldFocusPrimaryActionOnClick = function (shouldFocus) {
            this.shouldFocusPrimaryActionOnClick_ = shouldFocus;
        };
        MDCChipFoundation.prototype.getDimensions = function () {
            var _this = this;
            var getRootRect = function () { return _this.adapter.getRootBoundingClientRect(); };
            var getCheckmarkRect = function () {
                return _this.adapter.getCheckmarkBoundingClientRect();
            };
            // When a chip has a checkmark and not a leading icon, the bounding rect changes in size depending on the current
            // size of the checkmark.
            if (!this.adapter.hasLeadingIcon()) {
                var checkmarkRect = getCheckmarkRect();
                if (checkmarkRect) {
                    var rootRect = getRootRect();
                    // Checkmark is a square, meaning the client rect's width and height are identical once the animation completes.
                    // However, the checkbox is initially hidden by setting the width to 0.
                    // To account for an initial width of 0, we use the checkbox's height instead (which equals the end-state width)
                    // when adding it to the root client rect's width.
                    return {
                        bottom: rootRect.bottom,
                        height: rootRect.height,
                        left: rootRect.left,
                        right: rootRect.right,
                        top: rootRect.top,
                        width: rootRect.width + checkmarkRect.height,
                    };
                }
            }
            return getRootRect();
        };
        /**
         * Begins the exit animation which leads to removal of the chip.
         */
        MDCChipFoundation.prototype.beginExit = function () {
            this.adapter.addClass(cssClasses$4.CHIP_EXIT);
        };
        MDCChipFoundation.prototype.handleClick = function () {
            this.adapter.notifyInteraction();
            this.setPrimaryActionFocusable_(this.getFocusBehavior_());
        };
        MDCChipFoundation.prototype.handleDoubleClick = function () {
            if (this.isEditable()) {
                this.startEditing();
            }
        };
        /**
         * Handles a transition end event on the root element.
         */
        MDCChipFoundation.prototype.handleTransitionEnd = function (evt) {
            var _this = this;
            // Handle transition end event on the chip when it is about to be removed.
            var shouldHandle = this.adapter.eventTargetHasClass(evt.target, cssClasses$4.CHIP_EXIT);
            var widthIsAnimating = evt.propertyName === 'width';
            var opacityIsAnimating = evt.propertyName === 'opacity';
            if (shouldHandle && opacityIsAnimating) {
                // See: https://css-tricks.com/using-css-transitions-auto-dimensions/#article-header-id-5
                var chipWidth_1 = this.adapter.getComputedStyleValue('width');
                // On the next frame (once we get the computed width), explicitly set the chip's width
                // to its current pixel width, so we aren't transitioning out of 'auto'.
                requestAnimationFrame(function () {
                    _this.adapter.setStyleProperty('width', chipWidth_1);
                    // To mitigate jitter, start transitioning padding and margin before width.
                    _this.adapter.setStyleProperty('padding', '0');
                    _this.adapter.setStyleProperty('margin', '0');
                    // On the next frame (once width is explicitly set), transition width to 0.
                    requestAnimationFrame(function () {
                        _this.adapter.setStyleProperty('width', '0');
                    });
                });
                return;
            }
            if (shouldHandle && widthIsAnimating) {
                this.removeFocus();
                var removedAnnouncement = this.adapter.getAttribute(strings$6.REMOVED_ANNOUNCEMENT_ATTRIBUTE);
                this.adapter.notifyRemoval(removedAnnouncement);
            }
            // Handle a transition end event on the leading icon or checkmark, since the transition end event bubbles.
            if (!opacityIsAnimating) {
                return;
            }
            var shouldHideLeadingIcon = this.adapter.eventTargetHasClass(evt.target, cssClasses$4.LEADING_ICON) &&
                this.adapter.hasClass(cssClasses$4.SELECTED);
            var shouldShowLeadingIcon = this.adapter.eventTargetHasClass(evt.target, cssClasses$4.CHECKMARK) &&
                !this.adapter.hasClass(cssClasses$4.SELECTED);
            if (shouldHideLeadingIcon) {
                this.adapter.addClassToLeadingIcon(cssClasses$4.HIDDEN_LEADING_ICON);
                return;
            }
            if (shouldShowLeadingIcon) {
                this.adapter.removeClassFromLeadingIcon(cssClasses$4.HIDDEN_LEADING_ICON);
                return;
            }
        };
        MDCChipFoundation.prototype.handleFocusIn = function (evt) {
            // Early exit if the event doesn't come from the primary action
            if (!this.eventFromPrimaryAction_(evt)) {
                return;
            }
            this.adapter.addClass(cssClasses$4.PRIMARY_ACTION_FOCUSED);
        };
        MDCChipFoundation.prototype.handleFocusOut = function (evt) {
            // Early exit if the event doesn't come from the primary action
            if (!this.eventFromPrimaryAction_(evt)) {
                return;
            }
            if (this.isEditing()) {
                this.finishEditing();
            }
            this.adapter.removeClass(cssClasses$4.PRIMARY_ACTION_FOCUSED);
        };
        /**
         * Handles an interaction event on the trailing icon element. This is used to
         * prevent the ripple from activating on interaction with the trailing icon.
         */
        MDCChipFoundation.prototype.handleTrailingActionInteraction = function () {
            this.adapter.notifyTrailingIconInteraction();
            this.removeChip_();
        };
        /**
         * Handles a keydown event from the root element.
         */
        MDCChipFoundation.prototype.handleKeydown = function (evt) {
            if (this.isEditing()) {
                if (this.shouldFinishEditing(evt)) {
                    evt.preventDefault();
                    this.finishEditing();
                }
                // When editing, the foundation should only handle key events that finish
                // the editing process.
                return;
            }
            if (this.isEditable()) {
                if (this.shouldStartEditing(evt)) {
                    evt.preventDefault();
                    this.startEditing();
                }
            }
            if (this.shouldNotifyInteraction_(evt)) {
                this.adapter.notifyInteraction();
                this.setPrimaryActionFocusable_(this.getFocusBehavior_());
                return;
            }
            if (this.isDeleteAction_(evt)) {
                evt.preventDefault();
                this.removeChip_();
                return;
            }
            // Early exit if the key is not usable
            if (!navigationKeys.has(evt.key)) {
                return;
            }
            // Prevent default behavior for movement keys which could include scrolling
            evt.preventDefault();
            this.focusNextAction_(evt.key, EventSource.PRIMARY);
        };
        MDCChipFoundation.prototype.handleTrailingActionNavigation = function (evt) {
            return this.focusNextAction_(evt.detail.key, EventSource.TRAILING);
        };
        /**
         * Called by the chip set to remove focus from the chip actions.
         */
        MDCChipFoundation.prototype.removeFocus = function () {
            this.adapter.setPrimaryActionAttr(strings$6.TAB_INDEX, '-1');
            this.adapter.removeTrailingActionFocus();
        };
        /**
         * Called by the chip set to focus the primary action.
         *
         */
        MDCChipFoundation.prototype.focusPrimaryAction = function () {
            this.setPrimaryActionFocusable_(FocusBehavior.SHOULD_FOCUS);
        };
        /**
         * Called by the chip set to focus the trailing action (if present), otherwise
         * gives focus to the trailing action.
         */
        MDCChipFoundation.prototype.focusTrailingAction = function () {
            var trailingActionIsNavigable = this.adapter.isTrailingActionNavigable();
            if (trailingActionIsNavigable) {
                this.adapter.setPrimaryActionAttr(strings$6.TAB_INDEX, '-1');
                this.adapter.focusTrailingAction();
                return;
            }
            this.focusPrimaryAction();
        };
        MDCChipFoundation.prototype.setPrimaryActionFocusable_ = function (focusBehavior) {
            this.adapter.setPrimaryActionAttr(strings$6.TAB_INDEX, '0');
            if (focusBehavior === FocusBehavior.SHOULD_FOCUS) {
                this.adapter.focusPrimaryAction();
            }
            this.adapter.removeTrailingActionFocus();
        };
        MDCChipFoundation.prototype.getFocusBehavior_ = function () {
            if (this.shouldFocusPrimaryActionOnClick_) {
                return FocusBehavior.SHOULD_FOCUS;
            }
            return FocusBehavior.SHOULD_NOT_FOCUS;
        };
        MDCChipFoundation.prototype.focusNextAction_ = function (key, source) {
            var isTrailingActionNavigable = this.adapter.isTrailingActionNavigable();
            var dir = this.getDirection_(key);
            // Early exit if the key should jump chips
            if (jumpChipKeys.has(key) || !isTrailingActionNavigable) {
                return this.adapter.notifyNavigation(key, source);
            }
            if (source === EventSource.PRIMARY && dir === Direction.RIGHT) {
                return this.focusTrailingAction();
            }
            if (source === EventSource.TRAILING && dir === Direction.LEFT) {
                return this.focusPrimaryAction();
            }
            this.adapter.notifyNavigation(key, EventSource.NONE);
        };
        MDCChipFoundation.prototype.getDirection_ = function (key) {
            var isRTL = this.adapter.isRTL();
            var isLeftKey = key === strings$6.ARROW_LEFT_KEY || key === strings$6.IE_ARROW_LEFT_KEY;
            var isRightKey = key === strings$6.ARROW_RIGHT_KEY || key === strings$6.IE_ARROW_RIGHT_KEY;
            if (!isRTL && isLeftKey || isRTL && isRightKey) {
                return Direction.LEFT;
            }
            return Direction.RIGHT;
        };
        MDCChipFoundation.prototype.removeChip_ = function () {
            if (this.shouldRemoveOnTrailingIconClick_) {
                this.beginExit();
            }
        };
        MDCChipFoundation.prototype.shouldStartEditing = function (evt) {
            return this.eventFromPrimaryAction_(evt) && evt.key === strings$6.ENTER_KEY;
        };
        MDCChipFoundation.prototype.shouldFinishEditing = function (evt) {
            return evt.key === strings$6.ENTER_KEY;
        };
        MDCChipFoundation.prototype.shouldNotifyInteraction_ = function (evt) {
            return evt.key === strings$6.ENTER_KEY || evt.key === strings$6.SPACEBAR_KEY;
        };
        MDCChipFoundation.prototype.isDeleteAction_ = function (evt) {
            var isDeletable = this.adapter.hasClass(cssClasses$4.DELETABLE);
            return isDeletable &&
                (evt.key === strings$6.BACKSPACE_KEY || evt.key === strings$6.DELETE_KEY ||
                    evt.key === strings$6.IE_DELETE_KEY);
        };
        MDCChipFoundation.prototype.setSelected_ = function (selected) {
            if (selected) {
                this.adapter.addClass(cssClasses$4.SELECTED);
                this.adapter.setPrimaryActionAttr(strings$6.ARIA_CHECKED, 'true');
            }
            else {
                this.adapter.removeClass(cssClasses$4.SELECTED);
                this.adapter.setPrimaryActionAttr(strings$6.ARIA_CHECKED, 'false');
            }
        };
        MDCChipFoundation.prototype.notifySelection_ = function (selected) {
            this.adapter.notifySelection(selected, false);
        };
        MDCChipFoundation.prototype.notifyIgnoredSelection_ = function (selected) {
            this.adapter.notifySelection(selected, true);
        };
        MDCChipFoundation.prototype.eventFromPrimaryAction_ = function (evt) {
            return this.adapter.eventTargetHasClass(evt.target, cssClasses$4.PRIMARY_ACTION);
        };
        MDCChipFoundation.prototype.startEditing = function () {
            this.adapter.addClass(cssClasses$4.EDITING);
            this.adapter.notifyEditStart();
        };
        MDCChipFoundation.prototype.finishEditing = function () {
            this.adapter.removeClass(cssClasses$4.EDITING);
            this.adapter.notifyEditFinish();
        };
        return MDCChipFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCChip = /** @class */ (function (_super) {
        __extends(MDCChip, _super);
        function MDCChip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MDCChip.prototype, "selected", {
            /**
             * @return Whether the chip is selected.
             */
            get: function () {
                return this.foundation.isSelected();
            },
            /**
             * Sets selected state on the chip.
             */
            set: function (selected) {
                this.foundation.setSelected(selected);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChip.prototype, "shouldRemoveOnTrailingIconClick", {
            /**
             * @return Whether a trailing icon click should trigger exit/removal of the chip.
             */
            get: function () {
                return this.foundation.getShouldRemoveOnTrailingIconClick();
            },
            /**
             * Sets whether a trailing icon click should trigger exit/removal of the chip.
             */
            set: function (shouldRemove) {
                this.foundation.setShouldRemoveOnTrailingIconClick(shouldRemove);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChip.prototype, "setShouldFocusPrimaryActionOnClick", {
            /**
             * Sets whether a clicking on the chip should focus the primary action.
             */
            set: function (shouldFocus) {
                this.foundation.setShouldFocusPrimaryActionOnClick(shouldFocus);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChip.prototype, "ripple", {
            get: function () {
                return this.ripple_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChip.prototype, "id", {
            get: function () {
                return this.root.id;
            },
            enumerable: true,
            configurable: true
        });
        MDCChip.attachTo = function (root) {
            return new MDCChip(root);
        };
        MDCChip.prototype.initialize = function (rippleFactory, trailingActionFactory) {
            var _this = this;
            if (rippleFactory === void 0) { rippleFactory = function (el, foundation) { return new MDCRipple(el, foundation); }; }
            if (trailingActionFactory === void 0) { trailingActionFactory = function (el) { return new MDCChipTrailingAction(el); }; }
            this.leadingIcon_ = this.root.querySelector(strings$6.LEADING_ICON_SELECTOR);
            this.checkmark_ = this.root.querySelector(strings$6.CHECKMARK_SELECTOR);
            this.primaryAction_ =
                this.root.querySelector(strings$6.PRIMARY_ACTION_SELECTOR);
            var trailingActionEl = this.root.querySelector(strings$6.TRAILING_ACTION_SELECTOR);
            if (trailingActionEl) {
                this.trailingAction_ = trailingActionFactory(trailingActionEl);
            }
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var rippleAdapter = __assign(__assign({}, MDCRipple.createAdapter(this)), { computeBoundingRect: function () { return _this.foundation.getDimensions(); } });
            this.ripple_ =
                rippleFactory(this.root, new MDCRippleFoundation(rippleAdapter));
        };
        MDCChip.prototype.initialSyncWithDOM = function () {
            var _this = this;
            // Custom events
            this.handleTrailingActionInteraction_ = function () {
                _this.foundation.handleTrailingActionInteraction();
            };
            this.handleTrailingActionNavigation_ =
                function (evt) {
                    _this.foundation.handleTrailingActionNavigation(evt);
                };
            // Native events
            this.handleClick_ = function () {
                _this.foundation.handleClick();
            };
            this.handleKeydown_ = function (evt) {
                _this.foundation.handleKeydown(evt);
            };
            this.handleTransitionEnd_ = function (evt) {
                _this.foundation.handleTransitionEnd(evt);
            };
            this.handleFocusIn_ = function (evt) {
                _this.foundation.handleFocusIn(evt);
            };
            this.handleFocusOut_ = function (evt) {
                _this.foundation.handleFocusOut(evt);
            };
            this.listen('transitionend', this.handleTransitionEnd_);
            this.listen('click', this.handleClick_);
            this.listen('keydown', this.handleKeydown_);
            this.listen('focusin', this.handleFocusIn_);
            this.listen('focusout', this.handleFocusOut_);
            if (this.trailingAction_) {
                this.listen(strings$7.INTERACTION_EVENT, this.handleTrailingActionInteraction_);
                this.listen(strings$7.NAVIGATION_EVENT, this.handleTrailingActionNavigation_);
            }
        };
        MDCChip.prototype.destroy = function () {
            this.ripple_.destroy();
            this.unlisten('transitionend', this.handleTransitionEnd_);
            this.unlisten('keydown', this.handleKeydown_);
            this.unlisten('click', this.handleClick_);
            this.unlisten('focusin', this.handleFocusIn_);
            this.unlisten('focusout', this.handleFocusOut_);
            if (this.trailingAction_) {
                this.unlisten(strings$7.INTERACTION_EVENT, this.handleTrailingActionInteraction_);
                this.unlisten(strings$7.NAVIGATION_EVENT, this.handleTrailingActionNavigation_);
            }
            _super.prototype.destroy.call(this);
        };
        /**
         * Begins the exit animation which leads to removal of the chip.
         */
        MDCChip.prototype.beginExit = function () {
            this.foundation.beginExit();
        };
        MDCChip.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                addClassToLeadingIcon: function (className) {
                    if (_this.leadingIcon_) {
                        _this.leadingIcon_.classList.add(className);
                    }
                },
                eventTargetHasClass: function (target, className) {
                    return target ? target.classList.contains(className) : false;
                },
                focusPrimaryAction: function () {
                    if (_this.primaryAction_) {
                        _this.primaryAction_.focus();
                    }
                },
                focusTrailingAction: function () {
                    if (_this.trailingAction_) {
                        _this.trailingAction_.focus();
                    }
                },
                getAttribute: function (attr) { return _this.root.getAttribute(attr); },
                getCheckmarkBoundingClientRect: function () {
                    return _this.checkmark_ ? _this.checkmark_.getBoundingClientRect() : null;
                },
                getComputedStyleValue: function (propertyName) {
                    return window.getComputedStyle(_this.root).getPropertyValue(propertyName);
                },
                getRootBoundingClientRect: function () { return _this.root.getBoundingClientRect(); },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                hasLeadingIcon: function () { return !!_this.leadingIcon_; },
                isRTL: function () { return window.getComputedStyle(_this.root).getPropertyValue('direction') === 'rtl'; },
                isTrailingActionNavigable: function () {
                    if (_this.trailingAction_) {
                        return _this.trailingAction_.isNavigable();
                    }
                    return false;
                },
                notifyInteraction: function () { return _this.emit(strings$6.INTERACTION_EVENT, { chipId: _this.id }, true /* shouldBubble */); },
                notifyNavigation: function (key, source) {
                    return _this.emit(strings$6.NAVIGATION_EVENT, { chipId: _this.id, key: key, source: source }, true /* shouldBubble */);
                },
                notifyRemoval: function (removedAnnouncement) {
                    _this.emit(strings$6.REMOVAL_EVENT, { chipId: _this.id, removedAnnouncement: removedAnnouncement }, true /* shouldBubble */);
                },
                notifySelection: function (selected, shouldIgnore) {
                    return _this.emit(strings$6.SELECTION_EVENT, { chipId: _this.id, selected: selected, shouldIgnore: shouldIgnore }, true /* shouldBubble */);
                },
                notifyTrailingIconInteraction: function () {
                    return _this.emit(strings$6.TRAILING_ICON_INTERACTION_EVENT, { chipId: _this.id }, true /* shouldBubble */);
                },
                notifyEditStart: function () { },
                notifyEditFinish: function () { },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                removeClassFromLeadingIcon: function (className) {
                    if (_this.leadingIcon_) {
                        _this.leadingIcon_.classList.remove(className);
                    }
                },
                removeTrailingActionFocus: function () {
                    if (_this.trailingAction_) {
                        _this.trailingAction_.removeFocus();
                    }
                },
                setPrimaryActionAttr: function (attr, value) {
                    if (_this.primaryAction_) {
                        _this.primaryAction_.setAttribute(attr, value);
                    }
                },
                setStyleProperty: function (propertyName, value) {
                    return _this.root.style.setProperty(propertyName, value);
                },
            };
            return new MDCChipFoundation(adapter);
        };
        MDCChip.prototype.setSelectedFromChipSet = function (selected, shouldNotifyClients) {
            this.foundation.setSelectedFromChipSet(selected, shouldNotifyClients);
        };
        MDCChip.prototype.focusPrimaryAction = function () {
            this.foundation.focusPrimaryAction();
        };
        MDCChip.prototype.focusTrailingAction = function () {
            this.foundation.focusTrailingAction();
        };
        MDCChip.prototype.removeFocus = function () {
            this.foundation.removeFocus();
        };
        MDCChip.prototype.remove = function () {
            var parent = this.root.parentNode;
            if (parent !== null) {
                parent.removeChild(this.root);
            }
        };
        return MDCChip;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * Priorities for the announce function
     */
    var AnnouncerPriority;
    (function (AnnouncerPriority) {
        AnnouncerPriority["POLITE"] = "polite";
        AnnouncerPriority["ASSERTIVE"] = "assertive";
    })(AnnouncerPriority || (AnnouncerPriority = {}));
    /**
     * Data attribute added to live region element.
     */
    var DATA_MDC_DOM_ANNOUNCE = 'data-mdc-dom-announce';
    /**
     * Announces the given message with optional priority, defaulting to "polite"
     */
    function announce(message, priority) {
        Announcer.getInstance().say(message, priority);
    }
    var Announcer = /** @class */ (function () {
        // Constructor made private to ensure only the singleton is used
        function Announcer() {
            this.liveRegions = new Map();
        }
        Announcer.getInstance = function () {
            if (!Announcer.instance) {
                Announcer.instance = new Announcer();
            }
            return Announcer.instance;
        };
        Announcer.prototype.say = function (message, priority) {
            if (priority === void 0) { priority = AnnouncerPriority.POLITE; }
            var liveRegion = this.getLiveRegion(priority);
            // Reset the region to pick up the message, even if the message is the
            // exact same as before.
            liveRegion.textContent = '';
            // Timeout is necessary for screen readers like NVDA and VoiceOver.
            setTimeout(function () {
                liveRegion.textContent = message;
                document.addEventListener('click', clearLiveRegion);
            }, 1);
            function clearLiveRegion() {
                liveRegion.textContent = '';
                document.removeEventListener('click', clearLiveRegion);
            }
        };
        Announcer.prototype.getLiveRegion = function (priority) {
            var existingLiveRegion = this.liveRegions.get(priority);
            if (existingLiveRegion &&
                document.body.contains(existingLiveRegion)) {
                return existingLiveRegion;
            }
            var liveRegion = this.createLiveRegion(priority);
            this.liveRegions.set(priority, liveRegion);
            return liveRegion;
        };
        Announcer.prototype.createLiveRegion = function (priority) {
            var el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.top = '-9999px';
            el.style.left = '-9999px';
            el.style.height = '1px';
            el.style.overflow = 'hidden';
            el.setAttribute('aria-atomic', 'true');
            el.setAttribute('aria-live', priority);
            el.setAttribute(DATA_MDC_DOM_ANNOUNCE, 'true');
            document.body.appendChild(el);
            return el;
        };
        return Announcer;
    }());

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$5 = {
        CHIP_SELECTOR: '.mdc-chip',
    };
    var cssClasses$3 = {
        CHOICE: 'mdc-chip-set--choice',
        FILTER: 'mdc-chip-set--filter',
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCChipSetFoundation = /** @class */ (function (_super) {
        __extends(MDCChipSetFoundation, _super);
        function MDCChipSetFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCChipSetFoundation.defaultAdapter), adapter)) || this;
            /**
             * The ids of the selected chips in the set. Only used for choice chip set or filter chip set.
             */
            _this.selectedChipIds_ = [];
            return _this;
        }
        Object.defineProperty(MDCChipSetFoundation, "strings", {
            get: function () {
                return strings$5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChipSetFoundation, "cssClasses", {
            get: function () {
                return cssClasses$3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChipSetFoundation, "defaultAdapter", {
            get: function () {
                return {
                    announceMessage: function () { return undefined; },
                    focusChipPrimaryActionAtIndex: function () { return undefined; },
                    focusChipTrailingActionAtIndex: function () { return undefined; },
                    getChipListCount: function () { return -1; },
                    getIndexOfChipById: function () { return -1; },
                    hasClass: function () { return false; },
                    isRTL: function () { return false; },
                    removeChipAtIndex: function () { return undefined; },
                    removeFocusFromChipAtIndex: function () { return undefined; },
                    selectChipAtIndex: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns an array of the IDs of all selected chips.
         */
        MDCChipSetFoundation.prototype.getSelectedChipIds = function () {
            return this.selectedChipIds_.slice();
        };
        /**
         * Selects the chip with the given id. Deselects all other chips if the chip set is of the choice variant.
         * Does not notify clients of the updated selection state.
         */
        MDCChipSetFoundation.prototype.select = function (chipId) {
            this.select_(chipId, false);
        };
        /**
         * Handles a chip interaction event
         */
        MDCChipSetFoundation.prototype.handleChipInteraction = function (_a) {
            var chipId = _a.chipId;
            var index = this.adapter.getIndexOfChipById(chipId);
            this.removeFocusFromChipsExcept_(index);
            if (this.adapter.hasClass(cssClasses$3.CHOICE) ||
                this.adapter.hasClass(cssClasses$3.FILTER)) {
                this.toggleSelect_(chipId);
            }
        };
        /**
         * Handles a chip selection event, used to handle discrepancy when selection state is set directly on the Chip.
         */
        MDCChipSetFoundation.prototype.handleChipSelection = function (_a) {
            var chipId = _a.chipId, selected = _a.selected, shouldIgnore = _a.shouldIgnore;
            // Early exit if we should ignore the event
            if (shouldIgnore) {
                return;
            }
            var chipIsSelected = this.selectedChipIds_.indexOf(chipId) >= 0;
            if (selected && !chipIsSelected) {
                this.select(chipId);
            }
            else if (!selected && chipIsSelected) {
                this.deselect_(chipId);
            }
        };
        /**
         * Handles the event when a chip is removed.
         */
        MDCChipSetFoundation.prototype.handleChipRemoval = function (_a) {
            var chipId = _a.chipId, removedAnnouncement = _a.removedAnnouncement;
            if (removedAnnouncement) {
                this.adapter.announceMessage(removedAnnouncement);
            }
            var index = this.adapter.getIndexOfChipById(chipId);
            this.deselectAndNotifyClients_(chipId);
            this.adapter.removeChipAtIndex(index);
            var maxIndex = this.adapter.getChipListCount() - 1;
            if (maxIndex < 0) {
                return;
            }
            var nextIndex = Math.min(index, maxIndex);
            this.removeFocusFromChipsExcept_(nextIndex);
            // After removing a chip, we should focus the trailing action for the next chip.
            this.adapter.focusChipTrailingActionAtIndex(nextIndex);
        };
        /**
         * Handles a chip navigation event.
         */
        MDCChipSetFoundation.prototype.handleChipNavigation = function (_a) {
            var chipId = _a.chipId, key = _a.key, source = _a.source;
            var maxIndex = this.adapter.getChipListCount() - 1;
            var index = this.adapter.getIndexOfChipById(chipId);
            // Early exit if the index is out of range or the key is unusable
            if (index === -1 || !navigationKeys.has(key)) {
                return;
            }
            var isRTL = this.adapter.isRTL();
            var isLeftKey = key === strings$6.ARROW_LEFT_KEY ||
                key === strings$6.IE_ARROW_LEFT_KEY;
            var isRightKey = key === strings$6.ARROW_RIGHT_KEY ||
                key === strings$6.IE_ARROW_RIGHT_KEY;
            var isDownKey = key === strings$6.ARROW_DOWN_KEY ||
                key === strings$6.IE_ARROW_DOWN_KEY;
            var shouldIncrement = !isRTL && isRightKey || isRTL && isLeftKey || isDownKey;
            var isHome = key === strings$6.HOME_KEY;
            var isEnd = key === strings$6.END_KEY;
            if (shouldIncrement) {
                index++;
            }
            else if (isHome) {
                index = 0;
            }
            else if (isEnd) {
                index = maxIndex;
            }
            else {
                index--;
            }
            // Early exit if the index is out of bounds
            if (index < 0 || index > maxIndex) {
                return;
            }
            this.removeFocusFromChipsExcept_(index);
            this.focusChipAction_(index, key, source);
        };
        MDCChipSetFoundation.prototype.focusChipAction_ = function (index, key, source) {
            var shouldJumpChips = jumpChipKeys.has(key);
            if (shouldJumpChips && source === EventSource.PRIMARY) {
                return this.adapter.focusChipPrimaryActionAtIndex(index);
            }
            if (shouldJumpChips && source === EventSource.TRAILING) {
                return this.adapter.focusChipTrailingActionAtIndex(index);
            }
            var dir = this.getDirection_(key);
            if (dir === Direction.LEFT) {
                return this.adapter.focusChipTrailingActionAtIndex(index);
            }
            if (dir === Direction.RIGHT) {
                return this.adapter.focusChipPrimaryActionAtIndex(index);
            }
        };
        MDCChipSetFoundation.prototype.getDirection_ = function (key) {
            var isRTL = this.adapter.isRTL();
            var isLeftKey = key === strings$6.ARROW_LEFT_KEY ||
                key === strings$6.IE_ARROW_LEFT_KEY;
            var isRightKey = key === strings$6.ARROW_RIGHT_KEY ||
                key === strings$6.IE_ARROW_RIGHT_KEY;
            if (!isRTL && isLeftKey || isRTL && isRightKey) {
                return Direction.LEFT;
            }
            return Direction.RIGHT;
        };
        /**
         * Deselects the chip with the given id and optionally notifies clients.
         */
        MDCChipSetFoundation.prototype.deselect_ = function (chipId, shouldNotifyClients) {
            if (shouldNotifyClients === void 0) { shouldNotifyClients = false; }
            var index = this.selectedChipIds_.indexOf(chipId);
            if (index >= 0) {
                this.selectedChipIds_.splice(index, 1);
                var chipIndex = this.adapter.getIndexOfChipById(chipId);
                this.adapter.selectChipAtIndex(chipIndex, /** isSelected */ false, shouldNotifyClients);
            }
        };
        /**
         * Deselects the chip with the given id and notifies clients.
         */
        MDCChipSetFoundation.prototype.deselectAndNotifyClients_ = function (chipId) {
            this.deselect_(chipId, true);
        };
        /**
         * Toggles selection of the chip with the given id.
         */
        MDCChipSetFoundation.prototype.toggleSelect_ = function (chipId) {
            if (this.selectedChipIds_.indexOf(chipId) >= 0) {
                this.deselectAndNotifyClients_(chipId);
            }
            else {
                this.selectAndNotifyClients_(chipId);
            }
        };
        MDCChipSetFoundation.prototype.removeFocusFromChipsExcept_ = function (index) {
            var chipCount = this.adapter.getChipListCount();
            for (var i = 0; i < chipCount; i++) {
                if (i !== index) {
                    this.adapter.removeFocusFromChipAtIndex(i);
                }
            }
        };
        MDCChipSetFoundation.prototype.selectAndNotifyClients_ = function (chipId) {
            this.select_(chipId, true);
        };
        MDCChipSetFoundation.prototype.select_ = function (chipId, shouldNotifyClients) {
            if (this.selectedChipIds_.indexOf(chipId) >= 0) {
                return;
            }
            if (this.adapter.hasClass(cssClasses$3.CHOICE) &&
                this.selectedChipIds_.length > 0) {
                var previouslySelectedChip = this.selectedChipIds_[0];
                var previouslySelectedIndex = this.adapter.getIndexOfChipById(previouslySelectedChip);
                this.selectedChipIds_ = [];
                this.adapter.selectChipAtIndex(previouslySelectedIndex, /** isSelected */ false, shouldNotifyClients);
            }
            this.selectedChipIds_.push(chipId);
            var index = this.adapter.getIndexOfChipById(chipId);
            this.adapter.selectChipAtIndex(index, /** isSelected */ true, shouldNotifyClients);
        };
        return MDCChipSetFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var _a = MDCChipFoundation.strings, INTERACTION_EVENT = _a.INTERACTION_EVENT, SELECTION_EVENT = _a.SELECTION_EVENT, REMOVAL_EVENT = _a.REMOVAL_EVENT, NAVIGATION_EVENT = _a.NAVIGATION_EVENT;
    var CHIP_SELECTOR = MDCChipSetFoundation.strings.CHIP_SELECTOR;
    var idCounter = 0;
    var MDCChipSet = /** @class */ (function (_super) {
        __extends(MDCChipSet, _super);
        function MDCChipSet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCChipSet.attachTo = function (root) {
            return new MDCChipSet(root);
        };
        Object.defineProperty(MDCChipSet.prototype, "chips", {
            get: function () {
                return this.chips_.slice();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCChipSet.prototype, "selectedChipIds", {
            /**
             * @return An array of the IDs of all selected chips.
             */
            get: function () {
                return this.foundation.getSelectedChipIds();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param chipFactory A function which creates a new MDCChip.
         */
        MDCChipSet.prototype.initialize = function (chipFactory) {
            if (chipFactory === void 0) { chipFactory = function (el) { return new MDCChip(el); }; }
            this.chipFactory_ = chipFactory;
            this.chips_ = this.instantiateChips_(this.chipFactory_);
        };
        MDCChipSet.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.chips_.forEach(function (chip) {
                if (chip.id && chip.selected) {
                    _this.foundation.select(chip.id);
                }
            });
            this.handleChipInteraction_ = function (evt) {
                return _this.foundation.handleChipInteraction(evt.detail);
            };
            this.handleChipSelection_ = function (evt) {
                return _this.foundation.handleChipSelection(evt.detail);
            };
            this.handleChipRemoval_ = function (evt) {
                return _this.foundation.handleChipRemoval(evt.detail);
            };
            this.handleChipNavigation_ = function (evt) {
                return _this.foundation.handleChipNavigation(evt.detail);
            };
            this.listen(INTERACTION_EVENT, this.handleChipInteraction_);
            this.listen(SELECTION_EVENT, this.handleChipSelection_);
            this.listen(REMOVAL_EVENT, this.handleChipRemoval_);
            this.listen(NAVIGATION_EVENT, this.handleChipNavigation_);
        };
        MDCChipSet.prototype.destroy = function () {
            this.chips_.forEach(function (chip) {
                chip.destroy();
            });
            this.unlisten(INTERACTION_EVENT, this.handleChipInteraction_);
            this.unlisten(SELECTION_EVENT, this.handleChipSelection_);
            this.unlisten(REMOVAL_EVENT, this.handleChipRemoval_);
            this.unlisten(NAVIGATION_EVENT, this.handleChipNavigation_);
            _super.prototype.destroy.call(this);
        };
        /**
         * Adds a new chip object to the chip set from the given chip element.
         */
        MDCChipSet.prototype.addChip = function (chipEl) {
            chipEl.id = chipEl.id || "mdc-chip-" + ++idCounter;
            this.chips_.push(this.chipFactory_(chipEl));
        };
        MDCChipSet.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                announceMessage: function (message) {
                    announce(message);
                },
                focusChipPrimaryActionAtIndex: function (index) {
                    _this.chips_[index].focusPrimaryAction();
                },
                focusChipTrailingActionAtIndex: function (index) {
                    _this.chips_[index].focusTrailingAction();
                },
                getChipListCount: function () { return _this.chips_.length; },
                getIndexOfChipById: function (chipId) {
                    return _this.findChipIndex_(chipId);
                },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                isRTL: function () { return window.getComputedStyle(_this.root).getPropertyValue('direction') === 'rtl'; },
                removeChipAtIndex: function (index) {
                    if (index >= 0 && index < _this.chips_.length) {
                        _this.chips_[index].destroy();
                        _this.chips_[index].remove();
                        _this.chips_.splice(index, 1);
                    }
                },
                removeFocusFromChipAtIndex: function (index) {
                    _this.chips_[index].removeFocus();
                },
                selectChipAtIndex: function (index, selected, shouldNotifyClients) {
                    if (index >= 0 && index < _this.chips_.length) {
                        _this.chips_[index].setSelectedFromChipSet(selected, shouldNotifyClients);
                    }
                },
            };
            return new MDCChipSetFoundation(adapter);
        };
        /**
         * Instantiates chip components on all of the chip set's child chip elements.
         */
        MDCChipSet.prototype.instantiateChips_ = function (chipFactory) {
            var chipElements = [].slice.call(this.root.querySelectorAll(CHIP_SELECTOR));
            return chipElements.map(function (el) {
                el.id = el.id || "mdc-chip-" + ++idCounter;
                return chipFactory(el);
            });
        };
        /**
         * Returns the index of the chip with the given id, or -1 if the chip does not exist.
         */
        MDCChipSet.prototype.findChipIndex_ = function (chipId) {
            for (var i = 0; i < this.chips_.length; i++) {
                if (this.chips_[i].id === chipId) {
                    return i;
                }
            }
            return -1;
        };
        return MDCChipSet;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$2 = {
        ANIMATING: 'mdc-tab-scroller--animating',
        SCROLL_AREA_SCROLL: 'mdc-tab-scroller__scroll-area--scroll',
        SCROLL_TEST: 'mdc-tab-scroller__test',
    };
    var strings$4 = {
        AREA_SELECTOR: '.mdc-tab-scroller__scroll-area',
        CONTENT_SELECTOR: '.mdc-tab-scroller__scroll-content',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerRTL = /** @class */ (function () {
        function MDCTabScrollerRTL(adapter) {
            this.adapter = adapter;
        }
        return MDCTabScrollerRTL;
    }());

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerRTLDefault = /** @class */ (function (_super) {
        __extends(MDCTabScrollerRTLDefault, _super);
        function MDCTabScrollerRTLDefault() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTabScrollerRTLDefault.prototype.getScrollPositionRTL = function () {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var right = this.calculateScrollEdges_().right;
            // Scroll values on most browsers are ints instead of floats so we round
            return Math.round(right - currentScrollLeft);
        };
        MDCTabScrollerRTLDefault.prototype.scrollToRTL = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(edges.right - scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: clampedScrollLeft - currentScrollLeft,
            };
        };
        MDCTabScrollerRTLDefault.prototype.incrementScrollRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: clampedScrollLeft - currentScrollLeft,
            };
        };
        MDCTabScrollerRTLDefault.prototype.getAnimatingScrollPosition = function (scrollX) {
            return scrollX;
        };
        MDCTabScrollerRTLDefault.prototype.calculateScrollEdges_ = function () {
            var contentWidth = this.adapter.getScrollContentOffsetWidth();
            var rootWidth = this.adapter.getScrollAreaOffsetWidth();
            return {
                left: 0,
                right: contentWidth - rootWidth,
            };
        };
        MDCTabScrollerRTLDefault.prototype.clampScrollValue_ = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            return Math.min(Math.max(edges.left, scrollX), edges.right);
        };
        return MDCTabScrollerRTLDefault;
    }(MDCTabScrollerRTL));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerRTLNegative = /** @class */ (function (_super) {
        __extends(MDCTabScrollerRTLNegative, _super);
        function MDCTabScrollerRTLNegative() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTabScrollerRTLNegative.prototype.getScrollPositionRTL = function (translateX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            return Math.round(translateX - currentScrollLeft);
        };
        MDCTabScrollerRTLNegative.prototype.scrollToRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(-scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: clampedScrollLeft - currentScrollLeft,
            };
        };
        MDCTabScrollerRTLNegative.prototype.incrementScrollRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: clampedScrollLeft - currentScrollLeft,
            };
        };
        MDCTabScrollerRTLNegative.prototype.getAnimatingScrollPosition = function (scrollX, translateX) {
            return scrollX - translateX;
        };
        MDCTabScrollerRTLNegative.prototype.calculateScrollEdges_ = function () {
            var contentWidth = this.adapter.getScrollContentOffsetWidth();
            var rootWidth = this.adapter.getScrollAreaOffsetWidth();
            return {
                left: rootWidth - contentWidth,
                right: 0,
            };
        };
        MDCTabScrollerRTLNegative.prototype.clampScrollValue_ = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            return Math.max(Math.min(edges.right, scrollX), edges.left);
        };
        return MDCTabScrollerRTLNegative;
    }(MDCTabScrollerRTL));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerRTLReverse = /** @class */ (function (_super) {
        __extends(MDCTabScrollerRTLReverse, _super);
        function MDCTabScrollerRTLReverse() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTabScrollerRTLReverse.prototype.getScrollPositionRTL = function (translateX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            // Scroll values on most browsers are ints instead of floats so we round
            return Math.round(currentScrollLeft - translateX);
        };
        MDCTabScrollerRTLReverse.prototype.scrollToRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: currentScrollLeft - clampedScrollLeft,
            };
        };
        MDCTabScrollerRTLReverse.prototype.incrementScrollRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft + scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: currentScrollLeft - clampedScrollLeft,
            };
        };
        MDCTabScrollerRTLReverse.prototype.getAnimatingScrollPosition = function (scrollX, translateX) {
            return scrollX + translateX;
        };
        MDCTabScrollerRTLReverse.prototype.calculateScrollEdges_ = function () {
            var contentWidth = this.adapter.getScrollContentOffsetWidth();
            var rootWidth = this.adapter.getScrollAreaOffsetWidth();
            return {
                left: contentWidth - rootWidth,
                right: 0,
            };
        };
        MDCTabScrollerRTLReverse.prototype.clampScrollValue_ = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            return Math.min(Math.max(edges.right, scrollX), edges.left);
        };
        return MDCTabScrollerRTLReverse;
    }(MDCTabScrollerRTL));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerFoundation = /** @class */ (function (_super) {
        __extends(MDCTabScrollerFoundation, _super);
        function MDCTabScrollerFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCTabScrollerFoundation.defaultAdapter), adapter)) || this;
            /**
             * Controls whether we should handle the transitionend and interaction events during the animation.
             */
            _this.isAnimating_ = false;
            return _this;
        }
        Object.defineProperty(MDCTabScrollerFoundation, "cssClasses", {
            get: function () {
                return cssClasses$2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTabScrollerFoundation, "strings", {
            get: function () {
                return strings$4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTabScrollerFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    eventTargetMatchesSelector: function () { return false; },
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    addScrollAreaClass: function () { return undefined; },
                    setScrollAreaStyleProperty: function () { return undefined; },
                    setScrollContentStyleProperty: function () { return undefined; },
                    getScrollContentStyleValue: function () { return ''; },
                    setScrollAreaScrollLeft: function () { return undefined; },
                    getScrollAreaScrollLeft: function () { return 0; },
                    getScrollContentOffsetWidth: function () { return 0; },
                    getScrollAreaOffsetWidth: function () { return 0; },
                    computeScrollAreaClientRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    computeScrollContentClientRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    computeHorizontalScrollbarHeight: function () { return 0; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCTabScrollerFoundation.prototype.init = function () {
            // Compute horizontal scrollbar height on scroller with overflow initially hidden, then update overflow to scroll
            // and immediately adjust bottom margin to avoid the scrollbar initially appearing before JS runs.
            var horizontalScrollbarHeight = this.adapter.computeHorizontalScrollbarHeight();
            this.adapter.setScrollAreaStyleProperty('margin-bottom', -horizontalScrollbarHeight + 'px');
            this.adapter.addScrollAreaClass(MDCTabScrollerFoundation.cssClasses.SCROLL_AREA_SCROLL);
        };
        /**
         * Computes the current visual scroll position
         */
        MDCTabScrollerFoundation.prototype.getScrollPosition = function () {
            if (this.isRTL_()) {
                return this.computeCurrentScrollPositionRTL_();
            }
            var currentTranslateX = this.calculateCurrentTranslateX_();
            var scrollLeft = this.adapter.getScrollAreaScrollLeft();
            return scrollLeft - currentTranslateX;
        };
        /**
         * Handles interaction events that occur during transition
         */
        MDCTabScrollerFoundation.prototype.handleInteraction = function () {
            // Early exit if we aren't animating
            if (!this.isAnimating_) {
                return;
            }
            // Prevent other event listeners from handling this event
            this.stopScrollAnimation_();
        };
        /**
         * Handles the transitionend event
         */
        MDCTabScrollerFoundation.prototype.handleTransitionEnd = function (evt) {
            // Early exit if we aren't animating or the event was triggered by a different element.
            var evtTarget = evt.target;
            if (!this.isAnimating_ ||
                !this.adapter.eventTargetMatchesSelector(evtTarget, MDCTabScrollerFoundation.strings.CONTENT_SELECTOR)) {
                return;
            }
            this.isAnimating_ = false;
            this.adapter.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
        };
        /**
         * Increment the scroll value by the scrollXIncrement using animation.
         * @param scrollXIncrement The value by which to increment the scroll position
         */
        MDCTabScrollerFoundation.prototype.incrementScroll = function (scrollXIncrement) {
            // Early exit for non-operational increment values
            if (scrollXIncrement === 0) {
                return;
            }
            this.animate_(this.getIncrementScrollOperation_(scrollXIncrement));
        };
        /**
         * Increment the scroll value by the scrollXIncrement without animation.
         * @param scrollXIncrement The value by which to increment the scroll position
         */
        MDCTabScrollerFoundation.prototype.incrementScrollImmediate = function (scrollXIncrement) {
            // Early exit for non-operational increment values
            if (scrollXIncrement === 0) {
                return;
            }
            var operation = this.getIncrementScrollOperation_(scrollXIncrement);
            if (operation.scrollDelta === 0) {
                return;
            }
            this.stopScrollAnimation_();
            this.adapter.setScrollAreaScrollLeft(operation.finalScrollPosition);
        };
        /**
         * Scrolls to the given scrollX value
         */
        MDCTabScrollerFoundation.prototype.scrollTo = function (scrollX) {
            if (this.isRTL_()) {
                return this.scrollToRTL_(scrollX);
            }
            this.scrollTo_(scrollX);
        };
        /**
         * @return Browser-specific {@link MDCTabScrollerRTL} instance.
         */
        MDCTabScrollerFoundation.prototype.getRTLScroller = function () {
            if (!this.rtlScrollerInstance_) {
                this.rtlScrollerInstance_ = this.rtlScrollerFactory_();
            }
            return this.rtlScrollerInstance_;
        };
        /**
         * @return translateX value from a CSS matrix transform function string.
         */
        MDCTabScrollerFoundation.prototype.calculateCurrentTranslateX_ = function () {
            var transformValue = this.adapter.getScrollContentStyleValue('transform');
            // Early exit if no transform is present
            if (transformValue === 'none') {
                return 0;
            }
            // The transform value comes back as a matrix transformation in the form
            // of `matrix(a, b, c, d, tx, ty)`. We only care about tx (translateX) so
            // we're going to grab all the parenthesized values, strip out tx, and
            // parse it.
            var match = /\((.+?)\)/.exec(transformValue);
            if (!match) {
                return 0;
            }
            var matrixParams = match[1];
            // tslint:disable-next-line:ban-ts-ignore "Unused vars" should be a linter warning, not a compiler error.
            // @ts-ignore These unused variables should retain their semantic names for clarity.
            var _a = __read(matrixParams.split(','), 6), a = _a[0], b = _a[1], c = _a[2], d = _a[3], tx = _a[4], ty = _a[5];
            return parseFloat(tx); // tslint:disable-line:ban
        };
        /**
         * Calculates a safe scroll value that is > 0 and < the max scroll value
         * @param scrollX The distance to scroll
         */
        MDCTabScrollerFoundation.prototype.clampScrollValue_ = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            return Math.min(Math.max(edges.left, scrollX), edges.right);
        };
        MDCTabScrollerFoundation.prototype.computeCurrentScrollPositionRTL_ = function () {
            var translateX = this.calculateCurrentTranslateX_();
            return this.getRTLScroller().getScrollPositionRTL(translateX);
        };
        MDCTabScrollerFoundation.prototype.calculateScrollEdges_ = function () {
            var contentWidth = this.adapter.getScrollContentOffsetWidth();
            var rootWidth = this.adapter.getScrollAreaOffsetWidth();
            return {
                left: 0,
                right: contentWidth - rootWidth,
            };
        };
        /**
         * Internal scroll method
         * @param scrollX The new scroll position
         */
        MDCTabScrollerFoundation.prototype.scrollTo_ = function (scrollX) {
            var currentScrollX = this.getScrollPosition();
            var safeScrollX = this.clampScrollValue_(scrollX);
            var scrollDelta = safeScrollX - currentScrollX;
            this.animate_({
                finalScrollPosition: safeScrollX,
                scrollDelta: scrollDelta,
            });
        };
        /**
         * Internal RTL scroll method
         * @param scrollX The new scroll position
         */
        MDCTabScrollerFoundation.prototype.scrollToRTL_ = function (scrollX) {
            var animation = this.getRTLScroller().scrollToRTL(scrollX);
            this.animate_(animation);
        };
        /**
         * Internal method to compute the increment scroll operation values.
         * @param scrollX The desired scroll position increment
         * @return MDCTabScrollerAnimation with the sanitized values for performing the scroll operation.
         */
        MDCTabScrollerFoundation.prototype.getIncrementScrollOperation_ = function (scrollX) {
            if (this.isRTL_()) {
                return this.getRTLScroller().incrementScrollRTL(scrollX);
            }
            var currentScrollX = this.getScrollPosition();
            var targetScrollX = scrollX + currentScrollX;
            var safeScrollX = this.clampScrollValue_(targetScrollX);
            var scrollDelta = safeScrollX - currentScrollX;
            return {
                finalScrollPosition: safeScrollX,
                scrollDelta: scrollDelta,
            };
        };
        /**
         * Animates the tab scrolling
         * @param animation The animation to apply
         */
        MDCTabScrollerFoundation.prototype.animate_ = function (animation) {
            var _this = this;
            // Early exit if translateX is 0, which means there's no animation to perform
            if (animation.scrollDelta === 0) {
                return;
            }
            this.stopScrollAnimation_();
            // This animation uses the FLIP approach.
            // Read more here: https://aerotwist.com/blog/flip-your-animations/
            this.adapter.setScrollAreaScrollLeft(animation.finalScrollPosition);
            this.adapter.setScrollContentStyleProperty('transform', "translateX(" + animation.scrollDelta + "px)");
            // Force repaint
            this.adapter.computeScrollAreaClientRect();
            requestAnimationFrame(function () {
                _this.adapter.addClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
                _this.adapter.setScrollContentStyleProperty('transform', 'none');
            });
            this.isAnimating_ = true;
        };
        /**
         * Stops scroll animation
         */
        MDCTabScrollerFoundation.prototype.stopScrollAnimation_ = function () {
            this.isAnimating_ = false;
            var currentScrollPosition = this.getAnimatingScrollPosition_();
            this.adapter.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
            this.adapter.setScrollContentStyleProperty('transform', 'translateX(0px)');
            this.adapter.setScrollAreaScrollLeft(currentScrollPosition);
        };
        /**
         * Gets the current scroll position during animation
         */
        MDCTabScrollerFoundation.prototype.getAnimatingScrollPosition_ = function () {
            var currentTranslateX = this.calculateCurrentTranslateX_();
            var scrollLeft = this.adapter.getScrollAreaScrollLeft();
            if (this.isRTL_()) {
                return this.getRTLScroller().getAnimatingScrollPosition(scrollLeft, currentTranslateX);
            }
            return scrollLeft - currentTranslateX;
        };
        /**
         * Determines the RTL Scroller to use
         */
        MDCTabScrollerFoundation.prototype.rtlScrollerFactory_ = function () {
            // Browsers have three different implementations of scrollLeft in RTL mode,
            // dependent on the browser. The behavior is based off the max LTR
            // scrollLeft value and 0.
            //
            // * Default scrolling in RTL *
            //    - Left-most value: 0
            //    - Right-most value: Max LTR scrollLeft value
            //
            // * Negative scrolling in RTL *
            //    - Left-most value: Negated max LTR scrollLeft value
            //    - Right-most value: 0
            //
            // * Reverse scrolling in RTL *
            //    - Left-most value: Max LTR scrollLeft value
            //    - Right-most value: 0
            //
            // We use those principles below to determine which RTL scrollLeft
            // behavior is implemented in the current browser.
            var initialScrollLeft = this.adapter.getScrollAreaScrollLeft();
            this.adapter.setScrollAreaScrollLeft(initialScrollLeft - 1);
            var newScrollLeft = this.adapter.getScrollAreaScrollLeft();
            // If the newScrollLeft value is negative,then we know that the browser has
            // implemented negative RTL scrolling, since all other implementations have
            // only positive values.
            if (newScrollLeft < 0) {
                // Undo the scrollLeft test check
                this.adapter.setScrollAreaScrollLeft(initialScrollLeft);
                return new MDCTabScrollerRTLNegative(this.adapter);
            }
            var rootClientRect = this.adapter.computeScrollAreaClientRect();
            var contentClientRect = this.adapter.computeScrollContentClientRect();
            var rightEdgeDelta = Math.round(contentClientRect.right - rootClientRect.right);
            // Undo the scrollLeft test check
            this.adapter.setScrollAreaScrollLeft(initialScrollLeft);
            // By calculating the clientRect of the root element and the clientRect of
            // the content element, we can determine how much the scroll value changed
            // when we performed the scrollLeft subtraction above.
            if (rightEdgeDelta === newScrollLeft) {
                return new MDCTabScrollerRTLReverse(this.adapter);
            }
            return new MDCTabScrollerRTLDefault(this.adapter);
        };
        MDCTabScrollerFoundation.prototype.isRTL_ = function () {
            return this.adapter.getScrollContentStyleValue('direction') === 'rtl';
        };
        return MDCTabScrollerFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * Stores result from computeHorizontalScrollbarHeight to avoid redundant processing.
     */
    var horizontalScrollbarHeight_;
    /**
     * Computes the height of browser-rendered horizontal scrollbars using a self-created test element.
     * May return 0 (e.g. on OS X browsers under default configuration).
     */
    function computeHorizontalScrollbarHeight(documentObj, shouldCacheResult) {
        if (shouldCacheResult === void 0) { shouldCacheResult = true; }
        if (shouldCacheResult && typeof horizontalScrollbarHeight_ !== 'undefined') {
            return horizontalScrollbarHeight_;
        }
        var el = documentObj.createElement('div');
        el.classList.add(cssClasses$2.SCROLL_TEST);
        documentObj.body.appendChild(el);
        var horizontalScrollbarHeight = el.offsetHeight - el.clientHeight;
        documentObj.body.removeChild(el);
        if (shouldCacheResult) {
            horizontalScrollbarHeight_ = horizontalScrollbarHeight;
        }
        return horizontalScrollbarHeight;
    }

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScroller = /** @class */ (function (_super) {
        __extends(MDCTabScroller, _super);
        function MDCTabScroller() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTabScroller.attachTo = function (root) {
            return new MDCTabScroller(root);
        };
        MDCTabScroller.prototype.initialize = function () {
            this.area_ = this.root.querySelector(MDCTabScrollerFoundation.strings.AREA_SELECTOR);
            this.content_ = this.root.querySelector(MDCTabScrollerFoundation.strings.CONTENT_SELECTOR);
        };
        MDCTabScroller.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.handleInteraction_ = function () { return _this.foundation.handleInteraction(); };
            this.handleTransitionEnd_ = function (evt) { return _this.foundation.handleTransitionEnd(evt); };
            this.area_.addEventListener('wheel', this.handleInteraction_, applyPassive());
            this.area_.addEventListener('touchstart', this.handleInteraction_, applyPassive());
            this.area_.addEventListener('pointerdown', this.handleInteraction_, applyPassive());
            this.area_.addEventListener('mousedown', this.handleInteraction_, applyPassive());
            this.area_.addEventListener('keydown', this.handleInteraction_, applyPassive());
            this.content_.addEventListener('transitionend', this.handleTransitionEnd_);
        };
        MDCTabScroller.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.area_.removeEventListener('wheel', this.handleInteraction_, applyPassive());
            this.area_.removeEventListener('touchstart', this.handleInteraction_, applyPassive());
            this.area_.removeEventListener('pointerdown', this.handleInteraction_, applyPassive());
            this.area_.removeEventListener('mousedown', this.handleInteraction_, applyPassive());
            this.area_.removeEventListener('keydown', this.handleInteraction_, applyPassive());
            this.content_.removeEventListener('transitionend', this.handleTransitionEnd_);
        };
        MDCTabScroller.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                eventTargetMatchesSelector: function (evtTarget, selector) {
                    return matches(evtTarget, selector);
                },
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                addScrollAreaClass: function (className) { return _this.area_.classList.add(className); },
                setScrollAreaStyleProperty: function (prop, value) {
                    return _this.area_.style.setProperty(prop, value);
                },
                setScrollContentStyleProperty: function (prop, value) {
                    return _this.content_.style.setProperty(prop, value);
                },
                getScrollContentStyleValue: function (propName) {
                    return window.getComputedStyle(_this.content_).getPropertyValue(propName);
                },
                setScrollAreaScrollLeft: function (scrollX) { return _this.area_.scrollLeft = scrollX; },
                getScrollAreaScrollLeft: function () { return _this.area_.scrollLeft; },
                getScrollContentOffsetWidth: function () { return _this.content_.offsetWidth; },
                getScrollAreaOffsetWidth: function () { return _this.area_.offsetWidth; },
                computeScrollAreaClientRect: function () { return _this.area_.getBoundingClientRect(); },
                computeScrollContentClientRect: function () {
                    return _this.content_.getBoundingClientRect();
                },
                computeHorizontalScrollbarHeight: function () {
                    return computeHorizontalScrollbarHeight(document);
                },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCTabScrollerFoundation(adapter);
        };
        /**
         * Returns the current visual scroll position
         */
        MDCTabScroller.prototype.getScrollPosition = function () {
            return this.foundation.getScrollPosition();
        };
        /**
         * Returns the width of the scroll content
         */
        MDCTabScroller.prototype.getScrollContentWidth = function () {
            return this.content_.offsetWidth;
        };
        /**
         * Increments the scroll value by the given amount
         * @param scrollXIncrement The pixel value by which to increment the scroll value
         */
        MDCTabScroller.prototype.incrementScroll = function (scrollXIncrement) {
            this.foundation.incrementScroll(scrollXIncrement);
        };
        /**
         * Scrolls to the given pixel position
         * @param scrollX The pixel value to scroll to
         */
        MDCTabScroller.prototype.scrollTo = function (scrollX) {
            this.foundation.scrollTo(scrollX);
        };
        return MDCTabScroller;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$1 = {
        ACTIVE: 'mdc-tab-indicator--active',
        FADE: 'mdc-tab-indicator--fade',
        NO_TRANSITION: 'mdc-tab-indicator--no-transition',
    };
    var strings$3 = {
        CONTENT_SELECTOR: '.mdc-tab-indicator__content',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabIndicatorFoundation = /** @class */ (function (_super) {
        __extends(MDCTabIndicatorFoundation, _super);
        function MDCTabIndicatorFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCTabIndicatorFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCTabIndicatorFoundation, "cssClasses", {
            get: function () {
                return cssClasses$1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTabIndicatorFoundation, "strings", {
            get: function () {
                return strings$3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTabIndicatorFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    computeContentClientRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    setContentStyleProperty: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCTabIndicatorFoundation.prototype.computeContentClientRect = function () {
            return this.adapter.computeContentClientRect();
        };
        return MDCTabIndicatorFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /* istanbul ignore next: subclass is not a branch statement */
    var MDCFadingTabIndicatorFoundation = /** @class */ (function (_super) {
        __extends(MDCFadingTabIndicatorFoundation, _super);
        function MDCFadingTabIndicatorFoundation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCFadingTabIndicatorFoundation.prototype.activate = function () {
            this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
        };
        MDCFadingTabIndicatorFoundation.prototype.deactivate = function () {
            this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
        };
        return MDCFadingTabIndicatorFoundation;
    }(MDCTabIndicatorFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /* istanbul ignore next: subclass is not a branch statement */
    var MDCSlidingTabIndicatorFoundation = /** @class */ (function (_super) {
        __extends(MDCSlidingTabIndicatorFoundation, _super);
        function MDCSlidingTabIndicatorFoundation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCSlidingTabIndicatorFoundation.prototype.activate = function (previousIndicatorClientRect) {
            // Early exit if no indicator is present to handle cases where an indicator
            // may be activated without a prior indicator state
            if (!previousIndicatorClientRect) {
                this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
                return;
            }
            // This animation uses the FLIP approach. You can read more about it at the link below:
            // https://aerotwist.com/blog/flip-your-animations/
            // Calculate the dimensions based on the dimensions of the previous indicator
            var currentClientRect = this.computeContentClientRect();
            var widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
            var xPosition = previousIndicatorClientRect.left - currentClientRect.left;
            this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
            this.adapter.setContentStyleProperty('transform', "translateX(" + xPosition + "px) scaleX(" + widthDelta + ")");
            // Force repaint before updating classes and transform to ensure the transform properly takes effect
            this.computeContentClientRect();
            this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
            this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
            this.adapter.setContentStyleProperty('transform', '');
        };
        MDCSlidingTabIndicatorFoundation.prototype.deactivate = function () {
            this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
        };
        return MDCSlidingTabIndicatorFoundation;
    }(MDCTabIndicatorFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabIndicator = /** @class */ (function (_super) {
        __extends(MDCTabIndicator, _super);
        function MDCTabIndicator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTabIndicator.attachTo = function (root) {
            return new MDCTabIndicator(root);
        };
        MDCTabIndicator.prototype.initialize = function () {
            this.content_ = this.root.querySelector(MDCTabIndicatorFoundation.strings.CONTENT_SELECTOR);
        };
        MDCTabIndicator.prototype.computeContentClientRect = function () {
            return this.foundation.computeContentClientRect();
        };
        MDCTabIndicator.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                computeContentClientRect: function () { return _this.content_.getBoundingClientRect(); },
                setContentStyleProperty: function (prop, value) {
                    return _this.content_.style.setProperty(prop, value);
                },
            };
            // tslint:enable:object-literal-sort-keys
            if (this.root.classList.contains(MDCTabIndicatorFoundation.cssClasses.FADE)) {
                return new MDCFadingTabIndicatorFoundation(adapter);
            }
            // Default to the sliding indicator
            return new MDCSlidingTabIndicatorFoundation(adapter);
        };
        MDCTabIndicator.prototype.activate = function (previousIndicatorClientRect) {
            this.foundation.activate(previousIndicatorClientRect);
        };
        MDCTabIndicator.prototype.deactivate = function () {
            this.foundation.deactivate();
        };
        return MDCTabIndicator;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses = {
        ACTIVE: 'mdc-tab--active',
    };
    var strings$2 = {
        ARIA_SELECTED: 'aria-selected',
        CONTENT_SELECTOR: '.mdc-tab__content',
        INTERACTED_EVENT: 'MDCTab:interacted',
        RIPPLE_SELECTOR: '.mdc-tab__ripple',
        TABINDEX: 'tabIndex',
        TAB_INDICATOR_SELECTOR: '.mdc-tab-indicator',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabFoundation = /** @class */ (function (_super) {
        __extends(MDCTabFoundation, _super);
        function MDCTabFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCTabFoundation.defaultAdapter), adapter)) || this;
            _this.focusOnActivate_ = true;
            return _this;
        }
        Object.defineProperty(MDCTabFoundation, "cssClasses", {
            get: function () {
                return cssClasses;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTabFoundation, "strings", {
            get: function () {
                return strings$2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTabFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    setAttr: function () { return undefined; },
                    activateIndicator: function () { return undefined; },
                    deactivateIndicator: function () { return undefined; },
                    notifyInteracted: function () { return undefined; },
                    getOffsetLeft: function () { return 0; },
                    getOffsetWidth: function () { return 0; },
                    getContentOffsetLeft: function () { return 0; },
                    getContentOffsetWidth: function () { return 0; },
                    focus: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        MDCTabFoundation.prototype.handleClick = function () {
            // It's up to the parent component to keep track of the active Tab and
            // ensure we don't activate a Tab that's already active.
            this.adapter.notifyInteracted();
        };
        MDCTabFoundation.prototype.isActive = function () {
            return this.adapter.hasClass(cssClasses.ACTIVE);
        };
        /**
         * Sets whether the tab should focus itself when activated
         */
        MDCTabFoundation.prototype.setFocusOnActivate = function (focusOnActivate) {
            this.focusOnActivate_ = focusOnActivate;
        };
        /**
         * Activates the Tab
         */
        MDCTabFoundation.prototype.activate = function (previousIndicatorClientRect) {
            this.adapter.addClass(cssClasses.ACTIVE);
            this.adapter.setAttr(strings$2.ARIA_SELECTED, 'true');
            this.adapter.setAttr(strings$2.TABINDEX, '0');
            this.adapter.activateIndicator(previousIndicatorClientRect);
            if (this.focusOnActivate_) {
                this.adapter.focus();
            }
        };
        /**
         * Deactivates the Tab
         */
        MDCTabFoundation.prototype.deactivate = function () {
            // Early exit
            if (!this.isActive()) {
                return;
            }
            this.adapter.removeClass(cssClasses.ACTIVE);
            this.adapter.setAttr(strings$2.ARIA_SELECTED, 'false');
            this.adapter.setAttr(strings$2.TABINDEX, '-1');
            this.adapter.deactivateIndicator();
        };
        /**
         * Returns the dimensions of the Tab
         */
        MDCTabFoundation.prototype.computeDimensions = function () {
            var rootWidth = this.adapter.getOffsetWidth();
            var rootLeft = this.adapter.getOffsetLeft();
            var contentWidth = this.adapter.getContentOffsetWidth();
            var contentLeft = this.adapter.getContentOffsetLeft();
            return {
                contentLeft: rootLeft + contentLeft,
                contentRight: rootLeft + contentLeft + contentWidth,
                rootLeft: rootLeft,
                rootRight: rootLeft + rootWidth,
            };
        };
        return MDCTabFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTab = /** @class */ (function (_super) {
        __extends(MDCTab, _super);
        function MDCTab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTab.attachTo = function (root) {
            return new MDCTab(root);
        };
        MDCTab.prototype.initialize = function (rippleFactory, tabIndicatorFactory) {
            if (rippleFactory === void 0) { rippleFactory = function (el, foundation) { return new MDCRipple(el, foundation); }; }
            if (tabIndicatorFactory === void 0) { tabIndicatorFactory = function (el) { return new MDCTabIndicator(el); }; }
            this.id = this.root.id;
            var rippleSurface = this.root.querySelector(MDCTabFoundation.strings.RIPPLE_SELECTOR);
            var rippleAdapter = __assign(__assign({}, MDCRipple.createAdapter(this)), { addClass: function (className) { return rippleSurface.classList.add(className); }, removeClass: function (className) { return rippleSurface.classList.remove(className); }, updateCssVariable: function (varName, value) { return rippleSurface.style.setProperty(varName, value); } });
            var rippleFoundation = new MDCRippleFoundation(rippleAdapter);
            this.ripple_ = rippleFactory(this.root, rippleFoundation);
            var tabIndicatorElement = this.root.querySelector(MDCTabFoundation.strings.TAB_INDICATOR_SELECTOR);
            this.tabIndicator_ = tabIndicatorFactory(tabIndicatorElement);
            this.content_ = this.root.querySelector(MDCTabFoundation.strings.CONTENT_SELECTOR);
        };
        MDCTab.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.handleClick_ = function () { return _this.foundation.handleClick(); };
            this.listen('click', this.handleClick_);
        };
        MDCTab.prototype.destroy = function () {
            this.unlisten('click', this.handleClick_);
            this.ripple_.destroy();
            _super.prototype.destroy.call(this);
        };
        MDCTab.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                setAttr: function (attr, value) { return _this.root.setAttribute(attr, value); },
                addClass: function (className) { return _this.root.classList.add(className); },
                removeClass: function (className) { return _this.root.classList.remove(className); },
                hasClass: function (className) { return _this.root.classList.contains(className); },
                activateIndicator: function (previousIndicatorClientRect) {
                    return _this.tabIndicator_.activate(previousIndicatorClientRect);
                },
                deactivateIndicator: function () { return _this.tabIndicator_.deactivate(); },
                notifyInteracted: function () { return _this.emit(MDCTabFoundation.strings.INTERACTED_EVENT, { tabId: _this.id }, true /* bubble */); },
                getOffsetLeft: function () { return _this.root.offsetLeft; },
                getOffsetWidth: function () { return _this.root.offsetWidth; },
                getContentOffsetLeft: function () { return _this.content_.offsetLeft; },
                getContentOffsetWidth: function () { return _this.content_.offsetWidth; },
                focus: function () { return _this.root.focus(); },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCTabFoundation(adapter);
        };
        Object.defineProperty(MDCTab.prototype, "active", {
            /**
             * Getter for the active state of the tab
             */
            get: function () {
                return this.foundation.isActive();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTab.prototype, "focusOnActivate", {
            set: function (focusOnActivate) {
                this.foundation.setFocusOnActivate(focusOnActivate);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Activates the tab
         */
        MDCTab.prototype.activate = function (computeIndicatorClientRect) {
            this.foundation.activate(computeIndicatorClientRect);
        };
        /**
         * Deactivates the tab
         */
        MDCTab.prototype.deactivate = function () {
            this.foundation.deactivate();
        };
        /**
         * Returns the indicator's client rect
         */
        MDCTab.prototype.computeIndicatorClientRect = function () {
            return this.tabIndicator_.computeContentClientRect();
        };
        MDCTab.prototype.computeDimensions = function () {
            return this.foundation.computeDimensions();
        };
        /**
         * Focuses the tab
         */
        MDCTab.prototype.focus = function () {
            this.root.focus();
        };
        return MDCTab;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$1 = {
        ARROW_LEFT_KEY: 'ArrowLeft',
        ARROW_RIGHT_KEY: 'ArrowRight',
        END_KEY: 'End',
        ENTER_KEY: 'Enter',
        HOME_KEY: 'Home',
        SPACE_KEY: 'Space',
        TAB_ACTIVATED_EVENT: 'MDCTabBar:activated',
        TAB_SCROLLER_SELECTOR: '.mdc-tab-scroller',
        TAB_SELECTOR: '.mdc-tab',
    };
    var numbers = {
        ARROW_LEFT_KEYCODE: 37,
        ARROW_RIGHT_KEYCODE: 39,
        END_KEYCODE: 35,
        ENTER_KEYCODE: 13,
        EXTRA_SCROLL_AMOUNT: 20,
        HOME_KEYCODE: 36,
        SPACE_KEYCODE: 32,
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var ACCEPTABLE_KEYS = new Set();
    // IE11 has no support for new Set with iterable so we need to initialize this by hand
    ACCEPTABLE_KEYS.add(strings$1.ARROW_LEFT_KEY);
    ACCEPTABLE_KEYS.add(strings$1.ARROW_RIGHT_KEY);
    ACCEPTABLE_KEYS.add(strings$1.END_KEY);
    ACCEPTABLE_KEYS.add(strings$1.HOME_KEY);
    ACCEPTABLE_KEYS.add(strings$1.ENTER_KEY);
    ACCEPTABLE_KEYS.add(strings$1.SPACE_KEY);
    var KEYCODE_MAP = new Map();
    // IE11 has no support for new Map with iterable so we need to initialize this by hand
    KEYCODE_MAP.set(numbers.ARROW_LEFT_KEYCODE, strings$1.ARROW_LEFT_KEY);
    KEYCODE_MAP.set(numbers.ARROW_RIGHT_KEYCODE, strings$1.ARROW_RIGHT_KEY);
    KEYCODE_MAP.set(numbers.END_KEYCODE, strings$1.END_KEY);
    KEYCODE_MAP.set(numbers.HOME_KEYCODE, strings$1.HOME_KEY);
    KEYCODE_MAP.set(numbers.ENTER_KEYCODE, strings$1.ENTER_KEY);
    KEYCODE_MAP.set(numbers.SPACE_KEYCODE, strings$1.SPACE_KEY);
    var MDCTabBarFoundation = /** @class */ (function (_super) {
        __extends(MDCTabBarFoundation, _super);
        function MDCTabBarFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCTabBarFoundation.defaultAdapter), adapter)) || this;
            _this.useAutomaticActivation_ = false;
            return _this;
        }
        Object.defineProperty(MDCTabBarFoundation, "strings", {
            get: function () {
                return strings$1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTabBarFoundation, "numbers", {
            get: function () {
                return numbers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTabBarFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    scrollTo: function () { return undefined; },
                    incrementScroll: function () { return undefined; },
                    getScrollPosition: function () { return 0; },
                    getScrollContentWidth: function () { return 0; },
                    getOffsetWidth: function () { return 0; },
                    isRTL: function () { return false; },
                    setActiveTab: function () { return undefined; },
                    activateTabAtIndex: function () { return undefined; },
                    deactivateTabAtIndex: function () { return undefined; },
                    focusTabAtIndex: function () { return undefined; },
                    getTabIndicatorClientRectAtIndex: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    getTabDimensionsAtIndex: function () { return ({ rootLeft: 0, rootRight: 0, contentLeft: 0, contentRight: 0 }); },
                    getPreviousActiveTabIndex: function () { return -1; },
                    getFocusedTabIndex: function () { return -1; },
                    getIndexOfTabById: function () { return -1; },
                    getTabListLength: function () { return 0; },
                    notifyTabActivated: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Switches between automatic and manual activation modes.
         * See https://www.w3.org/TR/wai-aria-practices/#tabpanel for examples.
         */
        MDCTabBarFoundation.prototype.setUseAutomaticActivation = function (useAutomaticActivation) {
            this.useAutomaticActivation_ = useAutomaticActivation;
        };
        MDCTabBarFoundation.prototype.activateTab = function (index) {
            var previousActiveIndex = this.adapter.getPreviousActiveTabIndex();
            if (!this.indexIsInRange_(index) || index === previousActiveIndex) {
                return;
            }
            var previousClientRect;
            if (previousActiveIndex !== -1) {
                this.adapter.deactivateTabAtIndex(previousActiveIndex);
                previousClientRect =
                    this.adapter.getTabIndicatorClientRectAtIndex(previousActiveIndex);
            }
            this.adapter.activateTabAtIndex(index, previousClientRect);
            this.scrollIntoView(index);
            this.adapter.notifyTabActivated(index);
        };
        MDCTabBarFoundation.prototype.handleKeyDown = function (evt) {
            // Get the key from the event
            var key = this.getKeyFromEvent_(evt);
            // Early exit if the event key isn't one of the keyboard navigation keys
            if (key === undefined) {
                return;
            }
            // Prevent default behavior for movement keys, but not for activation keys, since :active is used to apply ripple
            if (!this.isActivationKey_(key)) {
                evt.preventDefault();
            }
            if (this.useAutomaticActivation_) {
                if (this.isActivationKey_(key)) {
                    return;
                }
                var index = this.determineTargetFromKey_(this.adapter.getPreviousActiveTabIndex(), key);
                this.adapter.setActiveTab(index);
                this.scrollIntoView(index);
            }
            else {
                var focusedTabIndex = this.adapter.getFocusedTabIndex();
                if (this.isActivationKey_(key)) {
                    this.adapter.setActiveTab(focusedTabIndex);
                }
                else {
                    var index = this.determineTargetFromKey_(focusedTabIndex, key);
                    this.adapter.focusTabAtIndex(index);
                    this.scrollIntoView(index);
                }
            }
        };
        /**
         * Handles the MDCTab:interacted event
         */
        MDCTabBarFoundation.prototype.handleTabInteraction = function (evt) {
            this.adapter.setActiveTab(this.adapter.getIndexOfTabById(evt.detail.tabId));
        };
        /**
         * Scrolls the tab at the given index into view
         * @param index The tab index to make visible
         */
        MDCTabBarFoundation.prototype.scrollIntoView = function (index) {
            // Early exit if the index is out of range
            if (!this.indexIsInRange_(index)) {
                return;
            }
            // Always scroll to 0 if scrolling to the 0th index
            if (index === 0) {
                return this.adapter.scrollTo(0);
            }
            // Always scroll to the max value if scrolling to the Nth index
            // MDCTabScroller.scrollTo() will never scroll past the max possible value
            if (index === this.adapter.getTabListLength() - 1) {
                return this.adapter.scrollTo(this.adapter.getScrollContentWidth());
            }
            if (this.isRTL_()) {
                return this.scrollIntoViewRTL_(index);
            }
            this.scrollIntoView_(index);
        };
        /**
         * Private method for determining the index of the destination tab based on what key was pressed
         * @param origin The original index from which to determine the destination
         * @param key The name of the key
         */
        MDCTabBarFoundation.prototype.determineTargetFromKey_ = function (origin, key) {
            var isRTL = this.isRTL_();
            var maxIndex = this.adapter.getTabListLength() - 1;
            var shouldGoToEnd = key === strings$1.END_KEY;
            var shouldDecrement = key === strings$1.ARROW_LEFT_KEY && !isRTL || key === strings$1.ARROW_RIGHT_KEY && isRTL;
            var shouldIncrement = key === strings$1.ARROW_RIGHT_KEY && !isRTL || key === strings$1.ARROW_LEFT_KEY && isRTL;
            var index = origin;
            if (shouldGoToEnd) {
                index = maxIndex;
            }
            else if (shouldDecrement) {
                index -= 1;
            }
            else if (shouldIncrement) {
                index += 1;
            }
            else {
                index = 0;
            }
            if (index < 0) {
                index = maxIndex;
            }
            else if (index > maxIndex) {
                index = 0;
            }
            return index;
        };
        /**
         * Calculates the scroll increment that will make the tab at the given index visible
         * @param index The index of the tab
         * @param nextIndex The index of the next tab
         * @param scrollPosition The current scroll position
         * @param barWidth The width of the Tab Bar
         */
        MDCTabBarFoundation.prototype.calculateScrollIncrement_ = function (index, nextIndex, scrollPosition, barWidth) {
            var nextTabDimensions = this.adapter.getTabDimensionsAtIndex(nextIndex);
            var relativeContentLeft = nextTabDimensions.contentLeft - scrollPosition - barWidth;
            var relativeContentRight = nextTabDimensions.contentRight - scrollPosition;
            var leftIncrement = relativeContentRight - numbers.EXTRA_SCROLL_AMOUNT;
            var rightIncrement = relativeContentLeft + numbers.EXTRA_SCROLL_AMOUNT;
            if (nextIndex < index) {
                return Math.min(leftIncrement, 0);
            }
            return Math.max(rightIncrement, 0);
        };
        /**
         * Calculates the scroll increment that will make the tab at the given index visible in RTL
         * @param index The index of the tab
         * @param nextIndex The index of the next tab
         * @param scrollPosition The current scroll position
         * @param barWidth The width of the Tab Bar
         * @param scrollContentWidth The width of the scroll content
         */
        MDCTabBarFoundation.prototype.calculateScrollIncrementRTL_ = function (index, nextIndex, scrollPosition, barWidth, scrollContentWidth) {
            var nextTabDimensions = this.adapter.getTabDimensionsAtIndex(nextIndex);
            var relativeContentLeft = scrollContentWidth - nextTabDimensions.contentLeft - scrollPosition;
            var relativeContentRight = scrollContentWidth - nextTabDimensions.contentRight - scrollPosition - barWidth;
            var leftIncrement = relativeContentRight + numbers.EXTRA_SCROLL_AMOUNT;
            var rightIncrement = relativeContentLeft - numbers.EXTRA_SCROLL_AMOUNT;
            if (nextIndex > index) {
                return Math.max(leftIncrement, 0);
            }
            return Math.min(rightIncrement, 0);
        };
        /**
         * Determines the index of the adjacent tab closest to either edge of the Tab Bar
         * @param index The index of the tab
         * @param tabDimensions The dimensions of the tab
         * @param scrollPosition The current scroll position
         * @param barWidth The width of the tab bar
         */
        MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdge_ = function (index, tabDimensions, scrollPosition, barWidth) {
            /**
             * Tabs are laid out in the Tab Scroller like this:
             *
             *    Scroll Position
             *    +---+
             *    |   |   Bar Width
             *    |   +-----------------------------------+
             *    |   |                                   |
             *    |   V                                   V
             *    |   +-----------------------------------+
             *    V   |             Tab Scroller          |
             *    +------------+--------------+-------------------+
             *    |    Tab     |      Tab     |        Tab        |
             *    +------------+--------------+-------------------+
             *        |                                   |
             *        +-----------------------------------+
             *
             * To determine the next adjacent index, we look at the Tab root left and
             * Tab root right, both relative to the scroll position. If the Tab root
             * left is less than 0, then we know it's out of view to the left. If the
             * Tab root right minus the bar width is greater than 0, we know the Tab is
             * out of view to the right. From there, we either increment or decrement
             * the index.
             */
            var relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
            var relativeRootRight = tabDimensions.rootRight - scrollPosition - barWidth;
            var relativeRootDelta = relativeRootLeft + relativeRootRight;
            var leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
            var rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;
            if (leftEdgeIsCloser) {
                return index - 1;
            }
            if (rightEdgeIsCloser) {
                return index + 1;
            }
            return -1;
        };
        /**
         * Determines the index of the adjacent tab closest to either edge of the Tab Bar in RTL
         * @param index The index of the tab
         * @param tabDimensions The dimensions of the tab
         * @param scrollPosition The current scroll position
         * @param barWidth The width of the tab bar
         * @param scrollContentWidth The width of the scroller content
         */
        MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdgeRTL_ = function (index, tabDimensions, scrollPosition, barWidth, scrollContentWidth) {
            var rootLeft = scrollContentWidth - tabDimensions.rootLeft - barWidth - scrollPosition;
            var rootRight = scrollContentWidth - tabDimensions.rootRight - scrollPosition;
            var rootDelta = rootLeft + rootRight;
            var leftEdgeIsCloser = rootLeft > 0 || rootDelta > 0;
            var rightEdgeIsCloser = rootRight < 0 || rootDelta < 0;
            if (leftEdgeIsCloser) {
                return index + 1;
            }
            if (rightEdgeIsCloser) {
                return index - 1;
            }
            return -1;
        };
        /**
         * Returns the key associated with a keydown event
         * @param evt The keydown event
         */
        MDCTabBarFoundation.prototype.getKeyFromEvent_ = function (evt) {
            if (ACCEPTABLE_KEYS.has(evt.key)) {
                return evt.key;
            }
            return KEYCODE_MAP.get(evt.keyCode);
        };
        MDCTabBarFoundation.prototype.isActivationKey_ = function (key) {
            return key === strings$1.SPACE_KEY || key === strings$1.ENTER_KEY;
        };
        /**
         * Returns whether a given index is inclusively between the ends
         * @param index The index to test
         */
        MDCTabBarFoundation.prototype.indexIsInRange_ = function (index) {
            return index >= 0 && index < this.adapter.getTabListLength();
        };
        /**
         * Returns the view's RTL property
         */
        MDCTabBarFoundation.prototype.isRTL_ = function () {
            return this.adapter.isRTL();
        };
        /**
         * Scrolls the tab at the given index into view for left-to-right user agents.
         * @param index The index of the tab to scroll into view
         */
        MDCTabBarFoundation.prototype.scrollIntoView_ = function (index) {
            var scrollPosition = this.adapter.getScrollPosition();
            var barWidth = this.adapter.getOffsetWidth();
            var tabDimensions = this.adapter.getTabDimensionsAtIndex(index);
            var nextIndex = this.findAdjacentTabIndexClosestToEdge_(index, tabDimensions, scrollPosition, barWidth);
            if (!this.indexIsInRange_(nextIndex)) {
                return;
            }
            var scrollIncrement = this.calculateScrollIncrement_(index, nextIndex, scrollPosition, barWidth);
            this.adapter.incrementScroll(scrollIncrement);
        };
        /**
         * Scrolls the tab at the given index into view in RTL
         * @param index The tab index to make visible
         */
        MDCTabBarFoundation.prototype.scrollIntoViewRTL_ = function (index) {
            var scrollPosition = this.adapter.getScrollPosition();
            var barWidth = this.adapter.getOffsetWidth();
            var tabDimensions = this.adapter.getTabDimensionsAtIndex(index);
            var scrollWidth = this.adapter.getScrollContentWidth();
            var nextIndex = this.findAdjacentTabIndexClosestToEdgeRTL_(index, tabDimensions, scrollPosition, barWidth, scrollWidth);
            if (!this.indexIsInRange_(nextIndex)) {
                return;
            }
            var scrollIncrement = this.calculateScrollIncrementRTL_(index, nextIndex, scrollPosition, barWidth, scrollWidth);
            this.adapter.incrementScroll(scrollIncrement);
        };
        return MDCTabBarFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings = MDCTabBarFoundation.strings;
    var tabIdCounter = 0;
    var MDCTabBar = /** @class */ (function (_super) {
        __extends(MDCTabBar, _super);
        function MDCTabBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTabBar.attachTo = function (root) {
            return new MDCTabBar(root);
        };
        Object.defineProperty(MDCTabBar.prototype, "focusOnActivate", {
            set: function (focusOnActivate) {
                this.tabList_.forEach(function (tab) { return tab.focusOnActivate = focusOnActivate; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCTabBar.prototype, "useAutomaticActivation", {
            set: function (useAutomaticActivation) {
                this.foundation.setUseAutomaticActivation(useAutomaticActivation);
            },
            enumerable: true,
            configurable: true
        });
        MDCTabBar.prototype.initialize = function (tabFactory, tabScrollerFactory) {
            if (tabFactory === void 0) { tabFactory = function (el) { return new MDCTab(el); }; }
            if (tabScrollerFactory === void 0) { tabScrollerFactory = function (el) { return new MDCTabScroller(el); }; }
            this.tabList_ = this.instantiateTabs_(tabFactory);
            this.tabScroller_ = this.instantiateTabScroller_(tabScrollerFactory);
        };
        MDCTabBar.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.handleTabInteraction_ = function (evt) {
                return _this.foundation.handleTabInteraction(evt);
            };
            this.handleKeyDown_ = function (evt) { return _this.foundation.handleKeyDown(evt); };
            this.listen(MDCTabFoundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
            this.listen('keydown', this.handleKeyDown_);
            for (var i = 0; i < this.tabList_.length; i++) {
                if (this.tabList_[i].active) {
                    this.scrollIntoView(i);
                    break;
                }
            }
        };
        MDCTabBar.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.unlisten(MDCTabFoundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
            this.unlisten('keydown', this.handleKeyDown_);
            this.tabList_.forEach(function (tab) { return tab.destroy(); });
            if (this.tabScroller_) {
                this.tabScroller_.destroy();
            }
        };
        MDCTabBar.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                scrollTo: function (scrollX) { return _this.tabScroller_.scrollTo(scrollX); },
                incrementScroll: function (scrollXIncrement) {
                    return _this.tabScroller_.incrementScroll(scrollXIncrement);
                },
                getScrollPosition: function () { return _this.tabScroller_.getScrollPosition(); },
                getScrollContentWidth: function () { return _this.tabScroller_.getScrollContentWidth(); },
                getOffsetWidth: function () { return _this.root.offsetWidth; },
                isRTL: function () { return window.getComputedStyle(_this.root).getPropertyValue('direction') === 'rtl'; },
                setActiveTab: function (index) { return _this.foundation.activateTab(index); },
                activateTabAtIndex: function (index, clientRect) {
                    return _this.tabList_[index].activate(clientRect);
                },
                deactivateTabAtIndex: function (index) { return _this.tabList_[index].deactivate(); },
                focusTabAtIndex: function (index) { return _this.tabList_[index].focus(); },
                getTabIndicatorClientRectAtIndex: function (index) {
                    return _this.tabList_[index].computeIndicatorClientRect();
                },
                getTabDimensionsAtIndex: function (index) {
                    return _this.tabList_[index].computeDimensions();
                },
                getPreviousActiveTabIndex: function () {
                    for (var i = 0; i < _this.tabList_.length; i++) {
                        if (_this.tabList_[i].active) {
                            return i;
                        }
                    }
                    return -1;
                },
                getFocusedTabIndex: function () {
                    var tabElements = _this.getTabElements_();
                    var activeElement = document.activeElement;
                    return tabElements.indexOf(activeElement);
                },
                getIndexOfTabById: function (id) {
                    for (var i = 0; i < _this.tabList_.length; i++) {
                        if (_this.tabList_[i].id === id) {
                            return i;
                        }
                    }
                    return -1;
                },
                getTabListLength: function () { return _this.tabList_.length; },
                notifyTabActivated: function (index) { return _this.emit(strings.TAB_ACTIVATED_EVENT, { index: index }, true); },
            };
            // tslint:enable:object-literal-sort-keys
            return new MDCTabBarFoundation(adapter);
        };
        /**
         * Activates the tab at the given index
         * @param index The index of the tab
         */
        MDCTabBar.prototype.activateTab = function (index) {
            this.foundation.activateTab(index);
        };
        /**
         * Scrolls the tab at the given index into view
         * @param index THe index of the tab
         */
        MDCTabBar.prototype.scrollIntoView = function (index) {
            this.foundation.scrollIntoView(index);
        };
        /**
         * Returns all the tab elements in a nice clean array
         */
        MDCTabBar.prototype.getTabElements_ = function () {
            return [].slice.call(this.root.querySelectorAll(strings.TAB_SELECTOR));
        };
        /**
         * Instantiates tab components on all child tab elements
         */
        MDCTabBar.prototype.instantiateTabs_ = function (tabFactory) {
            return this.getTabElements_().map(function (el) {
                el.id = el.id || "mdc-tab-" + ++tabIdCounter;
                return tabFactory(el);
            });
        };
        /**
         * Instantiates tab scroller component on the child tab scroller element
         */
        MDCTabBar.prototype.instantiateTabScroller_ = function (tabScrollerFactory) {
            var tabScrollerElement = this.root.querySelector(strings.TAB_SCROLLER_SELECTOR);
            if (tabScrollerElement) {
                return tabScrollerFactory(tabScrollerElement);
            }
            return null;
        };
        return MDCTabBar;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /* TODO ??

    MDCTextFieldIcon,
    MDCTextFieldHelperText,

    import {
    	MDCTextFieldIcon
    }
    from '@material/textfield/icon';

    import {
    	MDCTextFieldHelperText
    }
    from '@material/textfield/helper-text';
    */

    class Reaper extends sargasso.Sargasso {
    	constructor (element, options) {
    		super(element, options);
    		this.setMetaData(this.options.MDCThing.constructor.name, this.options.MDCThing);
    	}

    	destroy () {
    		this.setMetaData(this.options.MDCThing.constructor.name, null);
    		if (this.options.MDCThing && this.options.MDCThing.destroy) {
    			this.options.MDCThing.destroy();
    		}
    		super.destroy();
    	}
    }

    sargasso.utils.registerSargassoClass('Reaper', Reaper);

    class TropicBird extends sargasso.Sargasso {
    	constructor (element, options = {}) {
    		options.watchDOM = true;
    		super(element, options);
    		this.topAppBar = null;
    		this.drawer = null;
    		this.snackBar = null;
    		this.snackBarTimer = null;
    		this.snackBarQueue = [];
    		this.linearProgress = null;
    		this.linearProgressTimer = null;
    		this.linearProgressOpen = false;
    		this.manageMDCInstances();
    	}

    	DOMChanged (root) {
    		this.manageMDCInstances(root);
    	}

    	makeEphemeral () {
    		if (!document.getElementById('ephemeral')) {
    			const ephemeral = document.createElement('div');
    			ephemeral.setAttribute('id', 'ephemeral');
    			document.body.append(ephemeral);
    		}
    	}

    	dialog (target, title, content, canCancel) {
    		this.makeEphemeral();
    		const template = document.querySelector(target).outerHTML;
    		document.getElementById('ephemeral').innerHTML = template;
    		const dialogContainer = document.getElementById('ephemeral').getElementsByClassName('mdc-dialog')[0];
    		const titleContainer = dialogContainer.getElementsByClassName('mdc-dialog__title')[0];
    		const contentContainer = dialogContainer.getElementsByClassName('mdc-dialog__content')[0];
    		const cancelButton = dialogContainer.getElementsByClassName('mdc-dialog-cancel')[0];

    		titleContainer.textContent = title;
    		contentContainer.textContent = content;
    		if (canCancel) {
    			cancelButton.style.display = 'flex';
    		} else {
    			cancelButton.style.display = 'none';
    		}

    		return new Promise((resolve, reject) => {
    			this.mdcDialog = new MDCDialog(dialogContainer);
    			this.mdcDialog.listen('MDCDialog:closed', (e) => {
    				sargasso.utils.elementTools.removeClass(document.body, 'modal-open');
    				document.getElementById('ephemeral').getElementsByClassName('mdc-dialog')[0].remove();
    				resolve(e.detail.action);
    			});
    			sargasso.utils.elementTools.addClass(document.body, 'modal-open');
    			this.mdcDialog.open();
    		})
    	}

    	progressBar (show, delay = 500) {
    		if (show === true) {
    			if (this.linearProgressTimer) {
    				clearTimeout(this.linearProgressTimer);
    				this.linearProgressTimer = null;
    			}
    			this.linearProgressTimer = setTimeout(() => {
    				this.linearProgressTimer = null;
    				this.linearProgress.open();
    				this.linearProgressOpen = true;
    			}, delay);
    		} else {
    			if (this.linearProgressTimer) {
    				clearTimeout(this.linearProgressTimer);
    				this.linearProgressTimer = null;
    			}
    			if (this.linearProgressOpen) {
    				this.linearProgress.close();
    				this.linearProgressOpen = false;
    			}
    		}
    	}

    	pushSnackBar (level, message, timer = 6000) {
    		this.snackBarQueue.push({
    			level: level,
    			message: message,
    			timer: timer
    		});

    		if (!this.snackBarTimer) {
    			this.popSnackBar();
    		}
    	}

    	popSnackBar () {
    		const item = this.snackBarQueue.shift();

    		const elem = document.querySelector('.mdc-snackbar__label');
    		if (!elem || !this.snackBar) {
    			confirm(item.message);
    			if (this.snackBarQueue.length) {
    				this.popSnackBar();
    			}
    		} else {
    			elem.innerText = item.message;

    			this.snackBar.open();

    			this.snackBarTimer = setTimeout(() => {
    				this.snackBarTimer = null;
    				this.snackBar.close();
    				if (this.snackBarQueue.length) {
    					this.popSnackBar();
    				}
    			}, item.timer);
    		}
    	}

    	manageMDCInstances (root = document) {
    		const managedClasses = [
    			'.mdc-top-app-bar',
    			'.mdc-drawer',
    			'.mdc-snackbar',
    			'.mdc-linear-progress',
    			'.mdc-text-field',
    			'.mdc-select',
    			'.mdc-switch',
    			'.mdc-chip-set',
    			'.mdc-fab',
    			'.mdc-button',
    			'.mdc-icon-button',
    			'.mdc-card__primary-action',
    			'.mdc-tab-bar',
    			'.mdc-tab-scroller'
    		];

    		const wantRipple = [
    			'mdc-fab',
    			'mdc-button',
    			'mdc-icon-button',
    			'mdc-card__primary-action'
    		];

    		const elements = root.querySelectorAll(managedClasses.join(','));
    		for (let i = 0; i < elements.length; i++) {
    			const element = elements[i];
    			if (!sargasso.utils.elementTools.hasClass(element, 'mdc-instantiated')) {
    				sargasso.utils.elementTools.addClass(element, 'mdc-instantiated');

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-top-app-bar')) {
    					this.topAppBar = new MDCTopAppBar(element);
    					new Reaper(element, {
    						MDCThing: this.topAppBar
    					});
    				}

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-drawer')) {
    					this.drawer = new MDCDrawer(element);
    					new Reaper(element, {
    						MDCThing: this.drawer
    					});

    					// close the drawer on any click
    					element.onclick = (e) => {
    						this.drawer.open = !this.drawer.open;
    					};

    					// close the drawer when click outside drawer
    					const scrim = document.querySelector('.mdc-drawer-scrim');
    					if (scrim) {
    						scrim.onclick = (e) => {
    							e.preventDefault();
    							this.drawer.open = !this.drawer.open;
    						};
    					}
    				}

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-snackbar')) {
    					this.snackBar = new MDCSnackbar(element);
    					new Reaper(element, {
    						MDCThing: this.snackBar
    					});
    				}

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-linear-progress')) {
    					this.linearProgress = new MDCLinearProgress(element);
    					new Reaper(element, {
    						MDCThing: this.linearProgress
    					});
    				}

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-text-field')) {
    					const thing = new MDCTextField(element);
    					new Reaper(element, {
    						MDCThing: thing
    					});
    				}

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-select')) {
    					const thing = new MDCSelect(element);
    					new Reaper(element, {
    						MDCThing: thing
    					});
    				}

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-switch')) {
    					const thing = new MDCSwitch(element);
    					new Reaper(element, {
    						MDCThing: thing
    					});
    				}

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-chip-set')) {
    					const thing = new MDCChipSet(element);
    					new Reaper(element, {
    						MDCThing: thing
    					});
    				}

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-tab-bar')) {
    					const thing = new MDCTabBar(element);
    					new Reaper(element, {
    						MDCThing: thing
    					});
    				}

    				if (sargasso.utils.elementTools.hasClass(element, 'mdc-tab-scroller')) {
    					const thing = new MDCTabScroller(element);
    					new Reaper(element, {
    						MDCThing: thing
    					});
    				}

    				for (let j = 0; j < wantRipple.length; j++) {
    					if (sargasso.utils.elementTools.hasClass(element, wantRipple[j])) {
    						const thing = new MDCRipple(element);
    						new Reaper(element, {
    							MDCThing: thing
    						});
    					}
    				}
    			}
    		}

    		// toggle the drawer when hamburger clicked
    		const hamburger = document.querySelector('.hamburger');
    		if (hamburger) {
    			hamburger.onclick = (e) => {
    				e.preventDefault();
    				this.drawer.open = !this.drawer.open;
    			};
    		}
    	}
    }

    sargasso.utils.registerSargassoClass('TropicBird', TropicBird);

    const MDC = {
    	MDCRipple: MDCRipple,
    	MDCLineRipple: MDCLineRipple,
    	MDCTopAppBar: MDCTopAppBar,
    	MDCDrawer: MDCDrawer,
    	MDCDialog: MDCDialog,
    	MDCTextField: MDCTextField,
    	MDCSnackbar: MDCSnackbar,
    	MDCFormField: MDCFormField,
    	MDCCheckbox: MDCCheckbox,
    	MDCSelect: MDCSelect,
    	MDCSwitch: MDCSwitch,
    	MDCLinearProgress: MDCLinearProgress,
    	MDCChipSet: MDCChipSet,
    	MDCTabBar: MDCTabBar,
    	MDCTabScroller: MDCTabScroller
    };

    exports.MDC = MDC;
    exports.TropicBird = TropicBird;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, SargassoModule));
