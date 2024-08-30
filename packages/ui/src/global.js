/* eslint-disable */
'use strict';

import './prototypes/string.js';
import './prototypes/object.js';

if (!globalThis.__$prototypesIncluded) {

    globalThis.__$prototypesIncluded = true;

    Error.throw = function (msg, ...args) {

        let type = Error;
        if (args.last.prototype instanceof Error) {
            type = args.pop();
        }

        throw new type(msg.interpolate(...args));
    }

    // Numbers

    // (function () {

    //     var padding = '00000000000000000000000000000000000000000000000000000';

    //     Number.prototype.pad = function (len) {
    //         return (padding + this).slice(-len);
    //     };

    // })();

    Number.prototype.ceil = function () {
        return Math.ceil(this);
    };


    // Strings

    JSON.clone = function (obj, cb) {
        return JSON.parse(JSON.stringify(obj, cb));
    };

    JSON.toQuoted = function () {
        let json = JSON.stringify.apply(JSON, arguments);
        return json.replace(/"/gm, '&quot;');
    };

    JSON.safe = function (obj, packer, format) {
        const set = new Set;
        const convert = obj => {
            if (obj && typeof obj === 'object') {
                if (set.has(obj)) {
                    return `[Object]`;
                } else {
                    set.add(obj);
                }
            }
            if (Array.isArray(obj)) {
                return obj.map(convert);
            }

            if (obj && typeof obj === 'object') {
                const out = {};
                for (const k in obj) {
                    out[k] = convert(obj[k]);
                }
                return out;
            }

            return obj;

        }
        obj = convert(obj);
        return JSON.stringify(obj, packer, format);
    };

    {

        /*
      
        @todo: improve escaping but analyzing and conform to angularjs' escaping:
      
        // Regular Expressions for parsing tags and attributes
        var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        // Match everything outside of normal chars and " (quote character)
        NON_ALPHANUMERIC_REGEXP = /([^#-~ |!])/g;
      
        function encodeEntities(value) {
            return value.
            replace(/&/g, '&amp;').
            replace(SURROGATE_PAIR_REGEXP, function(value) {
                var hi = value.charCodeAt(0);
                var low = value.charCodeAt(1);
                return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
            }).
            replace(NON_ALPHANUMERIC_REGEXP, function(value) {
                return '&#' + value.charCodeAt(0) + ';';
            }).
            replace(/</g, '&lt;').
            replace(/>/g, '&gt;');
        }
      
        */

        const escapes = {
            '<': ' ❮',
            '>': '❯',
            '&': '﹠',
            '"': '”',
            '\'': '‛',
            '/': '∕',
        };

        const escapee = new RegExp(/[<>&"'/]/gm);

        /*
            escapes untrusted text for treating it as a safe html according to
            https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
            the unsafe characters are escaped with their Unicode alternatives so a text could be safely escaped several times.
            the escaped text is used in angularjs templates so it's escaped the second time in that case.
         */

        globalThis.$escape = function (input) {

            if (input) {

                if (typeof input === 'string') {
                    return input.replace(escapee, m => escapes[m[0]]);
                }

                return input;
            }

            // since we are expecting a string here, avoid undefines and nulls
            if (input === undefined || input === null) {
                return '';
            }

            return input;

        };
    }


    // Functions

    Function.wrap

    Function.prototype.clone = function () {
        var that = this;
        var temp = function temporary() {
            return that.apply(this, arguments);
        };
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                temp[key] = this[key];
            }
        }
        return temp;
    };

    Function.prototype.timeout = function (delay) {
        // FIXME: Utils is not declared
        var r = this.__timer; // this.__timer || new Utils.Timer(this);
        r.timeout(delay);
        this.__timer = r;
        return r;
    };

    Function.prototype.later = function () {

        let args = [].copy(arguments);
        let self = this;

        let func = function () {
            self.apply(null, args);
        };

        func.__originFunction = self;
        setTimeout(func);

    };

    Function.prototype.laterBind = function (context) {

        let args = [].copy(arguments);
        args.shift();
        let self = this;

        let func = function () {
            self.apply(context, args);
        };

        func.__originFunction = self;
        setTimeout(func);

    };

    Function.prototype.applyLater = function (args, cb) {

        var self = this;

        setTimeout(function () {
            var r = self.apply(null, args);
            cb && cb(r);
        });

    };

    //returns delayed callback with proper THIS
    Function.prototype.laterCb = function () {

        var self = this;

        var out = function () {

            var args = $.makeArray(arguments);

            setTimeout(function () {
                self.apply(null, args);
            });

        };

        out.__originFunction = self;

        return out;

    };

    Function.prototype.interval = function (delay) {
        // FIXME: Utils is not declared
        var r = this.__timer; // this.__timer || new Utils.Timer(this);
        r.interval(delay);
        this.__timer = r;
        return r;
    };

    Function.prototype.stopTimer = function () {
        if (this.__timer) {
            this.__timer.clear();
        }
    };

    Function.prototype.cb = function () {

        var args = [].copy(arguments);
        var self = this;

        var out = function () {
            return self.apply(this, args.copy(arguments));
        };

        out._originFunction = self;
        return out;

    };

    //call later with the last args supplied
    Function.prototype.laterLast = function () {
        this.call_timer_args = arguments;
        if (this.call_timer) {
            return;
        }
        var self = this;
        this.call_timer = setTimeout(function () {
            var args = $.makeArray(self.call_timer_args);
            self.apply(null, args);
            self.call_timer = null;
        }, 0);
    };

    Function.prototype.laterLastCb = function () {

        var self = this;
        var cb_args;
        if (arguments.length) {
            cb_args = arguments;
        }

        return function () {

            self.call_timer_args = arguments;

            if (self.call_timer) {
                return;
            }

            self.call_timer = setTimeout(function () {
                var args = cb_args || self.call_timer_args;
                self.apply(null, args);
                self.call_timer = null;
            }, 0);

        };
    };


    Array.prototype.toSpliced ?? (
        Array.prototype.toSpliced = function (...args) {
            const copy = this.slice();
            copy.splice(...args);
            return copy;
        }
    );

    // Arrays

    Array.prototype.sync = function (arr, idName, addedCb, removedCb) {

        const synced = [];
        const out = {
            added: [],
            removed: [],
        };

        for (let i = 0; i < arr.length; i++) {

            const item = arr[i];
            const found = this.find({ [idName]: item[idName] });

            if (!found && addedCb(item) !== false) {
                synced.push(item);
                out.added.push(item);
                continue;
            }
            found && synced.push(item);
        }

        for (let i = 0; i < this.length; i++) {
            const item = this[i];
            const found = arr.find({ [idName]: item[idName] });
            if (found) {
                continue;
            }

            if (removedCb(item) !== false) {
                out.removed.push(item);
                continue;
            }

            // try insert into the synced array in the previous place
            let inserted = false;

            for (let n = i - 1; i > 0; i--) {
                const prev = synced.find({ [idName]: this[n][idName] });
                if (prev) {
                    synced.insertAfter(prev, item);
                    inserted = true;
                    break;
                }
            }

            inserted || synced.unshift(item);


        }

        this.replace(synced);

        return out;

    };

    Array.ensure = function (val) {

        if (is_.arr(val)) {
            return val;
        }

        if (val === undefined) {
            return [];
        }

        return [val];

    };

    Array.prototype.hasPromise = function () {
        return this.some(item => item && typeof item.then === 'function');
    };

    Array.hasPromise = function (arr) {
        return is_.arr(arr) && arr.hasPromise();
    };

    Array.prototype.next = function (item) {

        var self = this;

        var idx = self.indexOf(item);
        if (idx == self.length - 1) {
            return null;
        }

        return self[idx + 1];
    };

    Array.prototype.prev = function (item) {

        var self = this;

        var idx = self.indexOf(item);
        if (idx == 0) {
            return null;
        }

        return self[idx - 1];
    };

    /*
     returns compact string representation of an array
     if an array item is object - provides 'id' or 'name' or 'title' properties as the most respresentantive ones
     if an array item is function - provides function name with arguments
     */
    Array.prototype.toCompactString = function () {

        var out = [];
        for (var i = 0; i < this.length; i++) {
            var e = this[i];
            if (is_.obj(e)) {

                var name = e.__proto__.constructor.name;
                if (name == 'Object') {

                    name = '';

                    for (const k of 'id title name'.words) {
                        if (e[k]) {
                            name = k + ':' + [e[k]].toCompactString();
                            return false;
                        }
                    }

                    if (!name) {
                        var keys = Object.keys(e);
                        if (keys.length) {
                            name = keys[0] + ':' + [e[keys[0]]].toCompactString();
                        }
                    }

                    name += '..';


                }

                out.push('{' + name + '}');
            } else if (is_.arr(e)) {
                out.push('Array(' + e.length + ')');
            } else if (is_.str(e)) {
                out.push('\'' + e + '\'');
            } else if (e === undefined) {
                out.push('undefined');
            } else if (is_.func(e)) {

                var name = e.name || 'function';
                var src = e.toString();

                // eslint-disable-next-line
                var match = src.match(/function\s*\w*(\(.*\))/ms);
                if (!match) { // arrow function

                    match = src.match(/^(.*=>)\s*(\{?.*\}?)\s*$/ms);
                    name = match[1].replace(/\s*=>/, '=>');
                    if (match[2].length < 25) { // display short arrow function body
                        name += match[2];
                    } else {
                        name += '{..}';
                    }

                } else {
                    name += match[1];
                }

                out.push(name);

            } else {
                out.push(e);
            }
        }

        return out.join(', ');
    };

    Array.slice = function (obj, from, count) {
        return Array.prototype.slice.call(obj, from, count);
    };

    Object.defineProperty(Array.prototype, 'words', {
        get() {
            return this;
        }
    });

    //todo: add support for callbacks,fields
    Array.prototype.max = function (what, outWhat) {

        let accessor = what;
        let outAccessor = outWhat;

        if (is_.str(what)) {
            accessor = new Function('item', 'try { return item.' + what + '; } catch (e) { }');
            if (is_.str(outWhat)) {
                outAccessor = new Function('item', 'try { return item.' + outWhat + '; } catch (e) { }');
            }
        }

        let max = accessor ? accessor(this[0]) : this[0];
        let out;
        outAccessor && (out = outAccessor(this[0]));

        for (let i = 1; i < this.length; i++) {
            let val = accessor ? accessor(this[i]) : this[i];
            if (val !== undefined && max < val) {
                max = val;
                outAccessor && (out = outAccessor(this[i]));
            }
        }

        return out || max;
    };

    Array.prototype.min = function (what) {

        let accessor = what;

        if (is_.str(what)) {
            accessor = new Function('item', 'return item.' + what);
        }

        let min = accessor ? accessor(this[0]) : this[0];

        for (let i = 1; i < this.length; i++) {
            let val = accessor ? accessor(this[i]) : this[i];
            if (min > val) {
                min = val;
            }
        }

        return min;
    };

    Array.prototype.clear = function () {
        this.splice(0, this.length);
        return this;
    };

    {

        let map = Array.prototype.map;
        let pathTest = /[[.]/;

        const mapCb = (cb, thisArg) => {
            if (typeof cb == 'string') {

                var props = cb.words;

                if (props.length == 1) {

                    if (typeof thisArg[0] != 'object') {
                        cb = function (item) {
                            var obj = {};
                            obj[props[0]] = item;
                            return obj;
                        };
                    } else {

                        if (pathTest.test(props[0])) {

                            let fn = new Function('item', 'return item.' + props[0]);

                            cb = function (item) {
                                if (!item) {
                                    return null;
                                }
                                return fn(item);
                            };

                        } else {

                            cb = function (item) {
                                if (!item) {
                                    return null;
                                }
                                return item[props[0]];
                            };
                        }
                    }

                } else {

                    cb = function (item) {
                        var out = {};
                        for (var i = 0; i < props.length; i++) {

                            if (item[props[i]] !== undefined) {
                                out[props[i]] = item[props[i]];
                            }

                        }
                        return out;
                    };
                }
            }
            return cb;
        };

        Array.prototype.flatMap = function (cb, thisArg = this) {

            cb = mapCb(cb, this);
            const out = [];
            for (let i = 0; i < this.length; i++) {
                const arr = cb.call(thisArg, this[i]);
                if (Array.isArray(arr)) {
                    if (arr.length < 100000) {
                        out.push(...arr);
                    } else {
                        for (let i = 0; i < arr.length; i++) {
                            out.push(arr[i]);
                        }
                    }
                } else {
                    out.push(arr);
                }
            }
            return out;
        }


        Array.prototype.map = function (cb, thisArg) {

            if (!this.length) {
                return [];
            }

            cb = mapCb(cb, this);
            return map.call(this, cb, thisArg);

        };
    }

    //todo: make it more smart, not iterating 2 times
    Array.prototype.filterMap = function () {

        //each or map?
        return this.each.apply(this, arguments).filter(function (item) {
            return item !== undefined;
        });
    };

    {

        Array.prototype.createFilter = function (what) {

            let cb = what;

            if (typeof what === 'string') {

                what = what.replace(/\s*(\!?===?)\s?/gm, '$1');

                const conditions = [];

                for (let prop of what.words) {

                    const compare = prop.match(/\!?===?/);

                    if (compare) {

                        const args = prop.split(compare[0]);
                        conditions.push('d.' + args[0] + compare[0] + args[1]);

                    } else if (prop[0] === '!') {

                        prop = prop.substring(1);
                        conditions.push(`!(typeof d.${prop} === 'function' ? d.${prop}() : d.${prop})`);

                    } else {
                        conditions.push(`!!(typeof d.${prop} === 'function' ? d.${prop}() : d.${prop})`);
                    }

                }

                cb = new Function('d', 'return ' + conditions.join('&&'));


            } else if (typeof what === 'object') {

                // @todo: add static compiling, prop paths
                cb = function (d) {
                    for (const k in what) {
                        if (what[k] instanceof Set) {
                            if (!what[k].has(getVal(d, k))) {
                                return false;
                            }
                        } else if (getVal(d, k) !== getVal(what, k)) {
                            return false;
                        }
                    }
                    return true;
                };

                function getVal(d, what) { // eslint-disable-line no-inner-declarations
                    if (typeof d[what] == 'function') {
                        return d[what]();
                    }
                    return d[what];
                }

            }

            return cb;

        }

    }

    {
        const wrap = (method) => {

            const _original = Array.prototype[method];

            Array.prototype[method] = function () {

                arguments[0] = Array.prototype.createFilter.apply(this, arguments);
                return _original.apply(this, arguments);

            };

        }

        'filter some every'.split(' ').forEach(wrap);

    }

    Object.defineProperty(Array.prototype, 'first', {
        get() {
            return this[0];
        },
        set(val) {
            if (!this.length) {
                this.push(val);
            } else {
                this[0] = val;
            }
        }
    });

    Object.defineProperty(Array.prototype, 'last', {
        get() {
            return this[this.length - 1];
        },
        set(val) {
            if (!this.length) {
                this.push(val);
            } else {
                this[this.length - 1] = val;
            }
        }
    });

    /**
     * Verify is n array is sorted.
     * Returns:
     * 0 not sorted.
     * 1 asc sorting.
     * -1 desc sorting.
     */
    Array.prototype.isSorted = function () {

        return (function (direction) {
            return this.reduce(function (prev, next, i, arr) {
                if (direction === undefined) {
                    return (direction = prev <= next ? 1 : -1) || true;
                } else {
                    return (direction + 1 ?
                        (arr[i - 1] <= next) :
                        (arr[i - 1] > next));
                }
            }) ? Number(direction) : false;
        }).call(this);
    };

    Array.prototype.hasSameValues = function (compareWith) {

        if (this.length != compareWith.length) {
            return false;
        }

        for (var i = 0; i < this.length; i++) {
            if (compareWith.indexOf(this[i]) == -1) {
                return false;
            }
        }
        return true;
    };

    Array.prototype.copy = function () {

        //we can pass any number of arguments that will be passed to append()
        //make sure this works when 'this' is an array like object

        var out = Array.prototype.slice.call(this);

        if (arguments.length) {
            out.append.apply(out, arguments);
        }

        return out;

    };

    Array.prototype.add = function () {
        Array.prototype.push.apply(this, arguments);
    };

    Array.prototype.prepend = function () {

        var count = 0;

        var args = Array.prototype.copy.call(arguments);

        var lastArg = args.last;

        var filter;

        if (typeof lastArg == 'string') {// a unique field is provided to add only non-existing items
            args.pop();
            filter = {};
        }

        //dont rely on concat() - it doesn't treat well array-like objects

        for (var i = 0; i < args.length; i++) {

            var arr = args[i];

            var n = arr.length;

            while (--n > -1) {

                if (filter) {//add only unique values
                    filter[lastArg] = arr[n][lastArg];
                    if (!this.find(filter)) {
                        this.unshift(arr[n]);
                        count++;
                    }
                } else {
                    this.unshift(arr[n]);
                    count++;
                }

            }
        }

        return this;

    };
    // @fixme: refactor with arguments to make it faster
    Array.prototype.insertAfter = function (elem, ...items) {

        let idx = this.indexOf(elem);
        return this.splice(idx + 1, 0, ...items);

    };

    Array.prototype.insertBefore = function (elem, ...items) {

        let idx = this.indexOf(elem);
        return this.splice(idx, 0, ...items);

    };


    Array.prototype.append = function () {

        var count = 0;

        var args = Array.prototype.copy.call(arguments);

        var lastArg = args.last;

        var filter;

        if (typeof lastArg == 'string') {// a unique field is provided to add only non-existing items
            args.pop();
            filter = {};
        }

        //dont rely on concat() - it doesn't treat well array-like objects

        for (var i = 0; i < args.length; i++) {

            var arr = args[i];

            for (var n = 0; n < arr.length; n++) {

                if (filter) {//add only unique values
                    filter[lastArg] = arr[n][lastArg];
                    if (!this.find(filter)) {
                        this.push(arr[n]);
                        count++;
                    }
                } else {
                    this.push(arr[n]);
                    count++;
                }

            }
        }

        return this;

    };

    Array.prototype.toReversed ??= function () {
        return this.slice().reverse();
    };

    {

        let locale = 'ru';

        Array.setLocale = function (val) {
            locale = val;
        };

        const accessor = key => new Function('d', `return d.${key}`);
        const accessorFn = key => new Function('d', `return d.${key}?.()`);

        //todo: rename sortInlineBy to sortBy
        //todo: rename sortBy to sortCopyBy

        const { compare: compareString } = Intl.Collator(locale);

        Array.prototype.sortInlineBy = function (sortFn) {

            const self = this;

            if (!self.length) {
                return [];
            }

            if (arguments.length === 2 && typeof arguments[1] === 'number') {
                sortFn = [[].append(arguments)];
            } else if (arguments.length > 1) {
                sortFn = [].append(arguments);
            } else if (typeof sortFn === 'function') {
                sortFn = [[sortFn, 1]];
            }

            if (Array.isArray(sortFn)) {
                sortFn = sortFn.map(key => {
                    if (Array.isArray(key)) return { getVal: key[0], order: key[1] };
                    if (typeof key === 'function') return { getVal: key, order: 1 };
                    if (key[0] === '-') return { key, getVal: accessor(key.slice(1)), order: -1 };
                    return { getVal: accessor(key), order: 1 };
                });
            } else if (sortFn === '-') {
                sortFn = [{ getVal: d => d, order: -1 }];
            } else if (typeof sortFn == 'string') {
                sortFn = sortFn.words.map(key => key[0] === '-' ? { key, getVal: accessor(key.slice(1)), order: -1 } : { getVal: accessor(key), order: 1 });
            } else if (!sortFn) {
                sortFn = [{ getVal: d => d, order: 1 }];
            }

            sortFn.forEach(sort => {
                let val = sort.getVal(self[0]);
                if (sort.key && typeof val === 'function') {
                    sort.getVal = accessorFn(sort.key);
                    val = sort.getVal(self[0]);
                }
                sort.compare = typeof val === 'string' ? (a, b) => compareString(a, b) * sort.order :
                    typeof val === 'number' || val instanceof Date ? (a, b) => (a - b) * sort.order :
                        (a, b) => (a > b ? 1 : a < b ? -1 : 0) * sort.order;

            });

            const compareChain = (a, b, idx = 0) => {
                const { compare, getVal } = sortFn[idx];
                return compare(getVal(a), getVal(b)) || ++idx < sortFn.length && compareChain(a, b, idx);
            };

            self.sort(compareChain);
            return self;

        };

        Array.prototype.sortBy = function (...args) {
            return this.copy().sortInlineBy(...args);
        };

    }

    // returns common values for both arrays
    Array.prototype.intersect = function (arr) {

        //according a benchmark the fastest is smallArray.intersect(bigArray);
        if (this.length > arr.length) {
            return arr.intersect(this);
        }

        let out = [];

        for (let i = 0, len = this.length; i < len; i++) {
            if (arr.includes(this[i])) {
                out.push(this[i]);
            }
        }

        return out;
    };

    // checks whether the array includes all values in any order
    Array.prototype.includesAll = function (...values) {
        return this.includesArray(values);
    };

    // checks whether the array includes all values from other array
    Array.prototype.includesArray = function (arr) {

        for (let i = 0, len = arr.length; i < len; i++) {
            if (!this.includes(arr[i])) {
                return false;
            }
        }

        return true;

    };

    // return array of values not found in the array 'arr' argument
    Array.prototype.diff = function (arr) {

        let diff = [];
        for (let i = 0, len = this.length; i < len; i++) {
            let v = this[i];
            if (!arr.includes(v)) {
                diff.push(v);
            }
        }
        return diff;
    };

    Array.prototype.removeAll = function (val) {
        let idx;
        while ((idx = this.indexOf(val)) !== -1) {
            this.splice(idx, 1);
        }
        return this;
    };

    Array.prototype.remove = function (val) {

        let idx = this.indexOf(val);

        if (idx > -1) {
            this.splice(idx, 1);
        }

        return this;
    };

    Array.prototype.removeArray = function (val) {

        if (is_.str(val)) {
            val = val.words;
        }

        let idx;
        for (let i = 0, len = val.length; i < len; i++) {
            while ((idx = this.indexOf(val[i])) > -1) {
                this.splice(idx, 1);
            }
        }

        return this;
    };

    Array.prototype.removeBy = function (by) {

        var found;

        //todo: optimize by filter()

        while (found = this.find(by)) {
            this.remove(found);
        }

        return this;
    };

    Array.NotEmpty = function () {
    };

    Array.prototype.toggle = function (value, toggle) {

        if (toggle) {
            if (!this.includes(value)) {
                this.push(value);
                return this;
            }
        }
        this.remove(value);
        return this;
    };

    Array.prototype.replace = function () {
        this.length = 0;
        return this.append.apply(this, arguments);
    };

    Array.prototype.replaceBy = function (field, item, addIfNotFound) {

        var filter = {};
        filter[field] = item[field];

        var found = this.find(filter);

        if (found) {
            this.splice(this.indexOf(found), 1, item);
        } else {
            addIfNotFound && this.push(item);
        }

        return found;

    };

    if (!Array.prototype.includes) {
        Array.prototype.includes = function (val) {
            return this.indexOf(val) > -1;
        };
    }

    Array.prototype.contains = function (val) {
        return this.indexOf(val) >= 0;
    };

    if (!Array.prototype.includes) {
        Array.prototype.includes = Array.prototype.contains;
    }

    Array.each = function (arr) {

        var args = [].copy(arguments);
        args.shift();

        return Array.prototype.each.apply(arr, args);

    };

    Array.prototype.each = function (callback, type, idx, finish_cb) {

        var out = [];
        var self = this;

        if (type == 'callback') {

            if (typeof idx == 'function') {
                finish_cb = idx;
                idx = 0;
            }
            if (idx >= this.length || this.length == 0) {
                finish_cb();
                return;
            }
            callback(function () {
                self.each(callback, 'callback', idx + 1, finish_cb);
            }, this[idx], idx);
            return;
        }

        for (var i = 0; i < this.length; i++) {
            if (typeof callback == 'string') {
                var ps = [];
                for (var n = 1; n < arguments.length; n++) {
                    if ([Array.NotEmpty].contains(arguments[n])) {
                        continue;
                    }
                    ps.push(arguments[n]);
                }
                if (typeof this[i][callback] == 'function') {
                    var r = this[i][callback].apply(this[i], ps);
                    if (type === Array.NotEmpty) {
                        if (r) {
                            out.push(r);
                        }
                    } else {
                        out.push(r);
                    }
                } else {
                    out.push(this[i][callback]);
                }
                continue;
            }
            if (type === true) {
                out.push(new callback(this[i]));
                continue;
            }
            if (type == '!empty') {
                var r = callback(this[i], i);
                if (r !== undefined && r !== null) {
                    out.push(r);
                }
            } else {

                var r = callback.call(this, this[i], i);

                if (false === r) {
                    return false;
                } else {
                    out.push(r);
                }
            }
        }
        return out;
    };

    Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)];
    };

    {

        const _find = Array.prototype.find;

        Array.prototype.find = function () {

            arguments[0] = Array.prototype.createFilter.apply(this, arguments);

            return _find.apply(this, arguments);

        };
    }
    {

        const _findIndex = Array.prototype.findIndex;

        Array.prototype.findIndex = function () {

            arguments[0] = Array.prototype.createFilter.apply(this, arguments);

            return _findIndex.apply(this, arguments);

        };
    }

    // shallow 1 level merge of array of objects into 1 object
    Array.prototype.collapse = function () {

        let out = {};

        for (let i = 0, len = this.length; i < len; i++) {
            for (let k in this[i]) {
                out[k] = this[i][k];
            }
        }
        return out;
    };

    Array.prototype.collect = function (field, uniqueField) {

        var out = [];
        var map = globalThis.WeakMap ? new WeakMap : null;
        var unique = [];

        //todo: support field func parameters

        for (var i = 0, len = this.length; i < len; i++) {

            var arr = if_.func(this[i][field]);

            for (var n = 0, nlen = arr.length; n < nlen; n++) {

                if (uniqueField) {
                    var val = uniqueField === true ? arr[n] : if_.func(arr[n][uniqueField]);

                    if (map) {
                        if (!map.get(val)) {
                            map.set(val, true);
                            out.push(val);
                        }
                    } else {
                        if (!unique.contains(val)) {
                            unique.push(val);
                            out.push(val);
                        }
                    }
                } else {
                    out.push(arr[n]);
                }
            }
        }

        return out;
    };

    Array.prototype.update = function (val, field, method) {

        var findBy = {};
        findBy[field] = val[field];

        var found = this.find(findBy);

        if (found) {
            var index = this.indexOf(found);
            this.splice(index, 1, val);
        } else {
            this[method || 'push'](val);
        }

        return this;
    };

    Array.prototype.unique = function (accessor) {

        const arg1 = accessor;

        if (typeof accessor === 'string') {
            accessor = item => if_.func(item[arg1]);
        }

        return this.reduce((r, item) => {
            const key = accessor ? accessor(item) : item;
            if (!r.set.has(key)) {
                r.set.add(key);
                r.arr.push(item);
            }
            return r;
        }, { set: new Set, arr: [] }).arr;

    };

    Array.prototype.uniqueCount = function (accessor) {

        var arg1 = accessor;

        if (is_.str(accessor)) {
            accessor = function (item) {
                return if_.func(item[arg1]);
            };
        }

        var keys = {};
        var out = [];
        for (var i = 0, len = this.length; i < len; i++) {
            var val = this[i];
            var key = accessor ? accessor(val) : val;
            if (keys[key]) {
                keys[key]++;
                continue;
            }
            keys[key] = 1;
        }

        for (let key in keys) {
            out.push({
                value: key,
                count: keys[key],
            });
        }

        return out;
    };

    Map.prototype.ensure = function (key, defaultVal) {
        let out = this.get(key);
        if (out === undefined) {
            if (!this.has(key)) {
                if (typeof defaultVal === 'function') {
                    out = defaultVal();
                } else {
                    out = defaultVal;
                }
                this.set(key, out);

            }
        }
        return out;
    };

    Map.prototype.pop = function (key) {
        let out = this.get(key);
        this.delete(key);
        return out;
    };

    globalThis.object = function (obj, publicInterface = {}) {

        const self = obj;

        for (const [method, func] of Object.entries(publicInterface)) {
            addMethod(method, func);
        }

        addMethod('extends', function (...args) {
            for (const arg of args) {
                mixreturn(arg, self);
            }
        });

        addMethod('mix', function () {
            const args = [].copy(arguments);
            args.unshift(self);
            mixreturn.apply(self, args);
            return self;
        });

        addMethod('addMethod', addMethod);
        addMethod('addReadonlyProperty', addReadonlyProperty);
        addMethod('addReadonlyPropertyCached', addReadonlyProperty);

        const objectMethods = 'mix extends add-method get-methods add-readonly-property add-readonly-property-cached'.flags();

        addMethod('getMethods', () => {

            const out = [];

            const defs = Object.getOwnPropertyDescriptors(self);
            for (const [name, def] of Object.entries(defs)) {

                if (typeof def.value !== 'function') {
                    continue;
                }

                if (objectMethods[name]) {
                    continue;
                }

                out.push([name, def.value]);
            }
            return out;
        });

        function addReadonlyProperty(name, value) {

            if (typeof name !== 'string') {
                for (const [prop, value] of Object.entries(name)) {
                    addReadonlyProperty(prop, value);
                }
                return self;
            }

            if (typeof value === 'function') {

                Object.defineProperty(self, name, {
                    get: value,
                    enumerable: false,
                });
                return self;

            }

            Object.defineProperty(self, name, {
                writable: false,
                enumerable: false,
                value
            });
            return self;
        }

        function addReadonlyPropertyCached(name, value) {

            if (typeof name !== 'string') {
                for (const [prop, value] of Object.entries(name)) {
                    addReadonlyPropertyCached(prop, value);
                }
                return self;
            }

            let cached;

            Object.defineProperty(self, name, {
                get: () => cached ??= value(),
                enumerable: false,
            });

            return self;

        }

        function addMethod(method, func) {

            if (typeof func === 'object') {

                if (typeof func.wait === 'function') {

                    const self = this;

                    let promise;
                    let wait = func.wait;

                    func = async function () {

                        let prev = promise;

                        promise = new Promise(async (resolve, reject) => {

                            await prev;

                            try {
                                await wait.apply(self, arguments);
                                resolve();
                            } catch (e) {
                                reject(e);
                            }

                        });

                        return promise;

                    }


                } else {
                    throw new Error('Not supported method type');
                }

            }

            Object.defineProperty(self, method, {
                value: func,
                enumerable: false,
                writable: true,
            });

        }

        return self;
    };

    globalThis.object.create = function () {

        if (arguments.length == 1 && is_.arr(arguments[0])) {//several classes to create

            var as = arguments[0];

            var out = [];

            as.each(function (a) {
                out.push(object.create.apply(null, [a]));
            });

            return out;

        }

        if (is_.arr(arguments[0])) {

            var as = $.makeArray(arguments);
            var arr = as.shift();

            var out = [];

            arr.each(function (a) {
                var ps = as.copy();
                ps.push(a);
                out.push(object.create.apply(null, ps));
            });

            return out;
        }

        var args = $.makeArray(arguments);

        var factory = args.shift();

        if (factory.bind) {

            args.unshift(null);

            factory = factory.bind.apply(factory, args);

            var obj = new factory();

        } else {

            var obj = new Function();
            if (obj.__proto__) {
                obj.__proto__.constructor = factory;
            }
            factory.apply(obj, args);

        }

        return obj;

    };


    /*
        mixes 2 or more objects' methods together so their methods get shared between them
        dst -
     */
    /*
        mixes 2 or more objects' methods together so their methods get shared between them
        dst -
     */
    globalThis.mixreturn = function (dst, src) {

        //var out=[];//returns overrides;

        if (arguments.length > 2) {//multiple base classes
            var n = 1;
            for (; n < arguments.length; n++) {
                mixreturn(dst, arguments[n]);
            }
            return;
        }

        if (typeof (src) == 'function') {//shortcut: constructor passed as argument
            src = new src();
        }

        // collect class names for diagnostics
        // todo: warn if 2 same classes mixed together

        Object.ensureProperty(dst, '__mixed', [dst.__className || dst.__proto__.constructor.name])
            .push(src.__className || src.__proto__.constructor.name);

        src.hasOwnProperty('__mixed') && (dst.__mixed = dst.__mixed.append(src.__mixed).unique());

        Object.ensureProperty(src, '__mixed', [src.__className || src.__proto__.constructor.name])
            .push(dst.__className || dst.__proto__.constructor.name);

        dst.hasOwnProperty('__mixed') && (src.__mixed = src.__mixed.append(dst.__mixed).unique());

        for (const [x, func] of Object.entries(src)) {

            if (typeof func != 'function') {
                continue;
            }

            if (x === 'mix') {
                continue;
            }

            /*if (!dst.hasOwnProperty(x)) {//if doesn't exists, simply copy it
                Object.defineProperty(dst, x, {
                    value: func.bind(dst),
                    writable: true,
                });
                return;
            }*/

            if (!dst[x]) {
                dst[x] = func.bind(dst);
                continue;
            }

            var overridden = dst[x];

            var prop = function () {

                var r = func.apply(dst, arguments);

                if (func.collectReturnValues) {

                    if (!is_.arr(r)) {
                        r = [r];
                    }

                    var add = overridden.apply(dst, arguments);
                    if (!is_.arr(add)) {
                        add = [add];
                    }

                    for (var i = 0; i < add.length; i++) {
                        r.push(add[i]);
                    }
                    return r;
                }

                if (r === undefined) {
                    //trace("mixreturn: calling overridden method "+(overridden.name||overridden.source.name)+' of '+dst.__proto__.constructor.name);
                    return overridden.apply(dst, arguments);
                }

                return r;

            };


            /*Object.defineProperty(dst, x, {
                value: prop,
                writable: true,
            });*/

            dst[x] = prop;

            // dst[x].overridden=overridden;//mark method for debug purposes
            //src[x]=dst[x];//assigning newly compiled method to source also

        }

        //copying members to source
        for (const [name, prop] of Object.entries(Object.getOwnPropertyDescriptors(dst))) {
            if (typeof prop.value === 'function') {
                Object.defineProperty(src, name, prop);
            }
        }

        return dst;
    }


    globalThis.parseArgs = function (as, flags) {

        flags = flags ? flags.flags() : {};

        var objectCopied = false;

        var out = {};

        for (var i = 0; i < as.length; i++) {
            var a = as[i];
            if (is_numeric(a)) {
                collect('scalar', a);
                collect('number', a);
            } else if (is_string(a)) {
                collect('scalar', a);
                collect('string', a);
                /*} else if (a.__proto__.constructor.name === 'jQuery') {
                    collect('jquery', a);
                } else if (a === document || a === globalThis || a instanceof globalThis.Element) {
                    collect('jquery', $(a));*/
            } else if (is_array(a)) {
                collect('array', a);
            } else if (typeof a == 'function') {
                collect('cb', a);
                /*} else if (a instanceof jQuery.Event) {
                    collect('event', a, false);*/
            } else if (a instanceof globalThis.Error) {
                collect('error', a, false);
            } else if (is_object(a)) {
                collect('object', a);
            } else if (a === false) {
                collect('bool', false);
            } else if (a === true) {
                collect('bool', true);
            }
        }

        if (flags.flags && out.string && out.string.trim()) {//split string as flags
            out.string.trim().split(' ').each(function (n) {
                if (n) {
                    out[n] = true;
                }
            });
        }

        return out;

        function collect(name, a, collectObject) {

            if (out[name]) {

                if (is_array(out[name])) {

                    out[name].push(a);
                    return;

                }

                if (is_object(out[name]) && collectObject !== false) {

                    if (flags.noMerge) {
                        out[name] = [out[name], a];
                        return;
                    }

                    if (!objectCopied) {
                        var obj = out[name];
                        out[name] = {};
                        for (var k in obj) {
                            out[name][k] = obj[k];
                        }
                        objectCopied = true;
                    }

                    for (var k in a) {
                        out[name][k] = a[k];
                    }
                    return;

                }

                out[name] = [out[name], a];
                return;
            }

            out[name] = a;
        }

        function is_scalar(val) {
            return val !== null && val !== undefined && (typeof val != 'object') && (typeof val != 'function');
        }

        function is_func(a) {
            return typeof a == 'function';
        }

        function is_array(a) {
            return a instanceof Array;
        }

        function is_object(val) {
            return val !== null && (typeof val == 'object') && !(val instanceof Array);
        }

        function is_numeric(mixed_var) {
            return (typeof (mixed_var) === 'number' || typeof (mixed_var) === 'string') && mixed_var !== '' && !isNaN(mixed_var);
        }

        function is_string(val) {
            return typeof val == 'string';
        }


    }


    globalThis.iif_ = {

        // if 'fn' is function, executes it and returns true
        // otherwise returns false

        func: function (fn) {
            if (is_.func(fn)) {
                fn.apply(this, Array.slice(arguments, 1));
                return true;
            }
            return false;
        },

    };

    globalThis.if_ = {

        // if 'fn' is function, executes it and returns the result
        // otherwise returns 'fn' value

        func: function (fn) {
            return is_.func(fn) ? fn.apply(this, Array.slice(arguments, 1)) : fn;
        },
    };

    globalThis.is_ = {
        empty: function (val) {
            return val === null || val === undefined || val === '';
        },
        scalar: function (val) {
            return val !== null && val !== undefined && (typeof val != 'object') && (typeof val != 'function');
        },

        func: function (a) {
            return typeof a == 'function';
        },

        arr: function (a) {
            return a instanceof Array;
        },

        obj: function (val) {
            return val !== null && (typeof val == 'object') && !(val instanceof Array);
        },

        num: function (mixed_var) {
            return (typeof (mixed_var) === 'number' || typeof (mixed_var) === 'string') && mixed_var !== '' && !isNaN(mixed_var);
        },

        str: function (val) {
            return typeof val == 'string';
        },
    };

}