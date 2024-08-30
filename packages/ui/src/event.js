import './global';

export function EventListener(listener) {
    'use strict';

    if (!listener) {
        debugger;
    }

    Event.addListener(listener);

    var sources = [];

    var self = this;

    var publicInterface = {
        addEventSource: addEventSource,
        getEventSources: function() {
            return sources;
        },
        removeEventSource: removeEventSource,
        destroy: destroy,
    };

    for (var k in publicInterface) {
        self[k] = publicInterface[k];
    }

    function removeEventSource(source) {
        sources.remove(source);
    }

    function addEventSource(source) {

        if (sources.indexOf(source) >= 0) {
            return;
        }

        sources.push(source);

    }

    function destroy() {

        if (!sources) { // it's already destroyed
            return;
        }

        sources.each(function(source) {
            source.unbind(listener);
        });
        sources = null;

        Event.removeListener(listener);
    }

}

function Event() {
    'use strict';

    var self = this;

    var publicInterface = {
        getEventHandlers: getEventHandlers,
        bind: bind,
        //bindTo: bindTo,
        //bindSelf: onSelf,
        timeout: timeout,
        trigger: trigger,
        triggerQuery: triggerQuery,
        triggerCb: triggerCb,
        triggerDelay: triggerDelay,
        triggerDelayCb: triggerDelayCb,
        triggerLater: triggerLater,
        unbind: unbind,
        dontSendToSuspended: dontSendToSuspended,
        destroy: destroy,
    };

    for (var k in publicInterface) {
        self[k] = publicInterface[k];
    }

    var cb_cache = null;
    var callbacks;

    var _dontSendToSuspended = false;

    function timeout() {

        var as = arguments;

        setTimeout(function() {
            self.trigger.apply(self, as);
        });

    }

    function getEventHandlers(filter) {

        if (filter) {

            let cb = filter;

            if (filter instanceof RegExp) {
                cb = handler => filter.test(handler.event);
            }

            return callbacks.filter(cb);
        }

        return callbacks;
    }

    /*function onSelf(ev, callback) {

        if (arguments.length == 1) {
            return bind(ev, self);
        }

        return bind(ev, callback, self);

    }*/

    /*function bindTo(target, ev, callback) {

        if (is_.obj(ev)) {
            return target.bind(ev, self, callback);
        }

        return target.bind(ev, callback, self)

    }*/

    function destroy() {

        if (!callbacks) {
            return;
        }

        callbacks.each(function(c) {
            c.listener.removeEventSource(self);
        });
        callbacks = null;
    }

    /*
        binds an event listener

        there's 3 required arguments:

        eventName - event name with flags
        callback -  callback called on the event
        listener -  owner of the callback. when listener.destroy() is called
                    all callbacks of this listener will be unbound automatically

        there're several call signatures

        1)  Event.bind(eventName, callback, listener);

            eventName is a string with event names and flags (words).

                a flag is a word starting with a colon, for example ':once'.
                a flag is affecting events preceeding the flag, for example:

                'event1 event2 :once event3 :first event4' -
                    :once affects event1 and event2,
                    :first affects event3,
                    event4 is bound without any flags.

                the possible flags:

                    :once   executes the callback once and then unbinds it.
                    :skip   skip execution of the callback the first time

                    :first
                    :before
                    :after
                    :last   order groups, the callback is executed in order of these groups.
                            if the group isnt defined, it's a 'default' group and executed
                            between the 'before and :after groups.

                    number
                            order of execution in a order group.
                            executes from smaller to bigger order number.
                            by default the order is 0.

                    :name   provides current eventName as the first argument in the callback

                    :later  executes the callback with setTimeout()

                    @filter
                            executes the callback if the first callback parameter equals string 'filter'.
                            the first callback parameter is removed!!!

                    for example:

                    'event1 event2 :skip :once :later :first -1000 @checkbox :name' -

                        execution happens only if the first callback argument is a string 'checkbox'.
                        skips the first execution of the callback, calls the second time only, then unbinds.
                        it calls setTimeout(callback) in the ':first' order group with order -1000.
                        :name - the first callback parameter is removed because of '@checkbox' and replaced with
                        the currently called event's name - 'event1' or 'event2'.

            callback is
                1)  a function called when the event is triggered (event handler)
                2)  an array of functions. the last one is the event handler.
                    all other functions preceding the handler are precondition callbacks.
                    if any of the precondition callbacks returns a false value (0, '', false, etc)
                    the event handler isn't executed.


        2)  Event.bind(callbacks, listener);

            callbacks is an object:
                {eventName: callback, eventName2: callback2}.
                eventName, eventName2, callback, callback2 have the same format like the signature 1.

        3)  Event.bind(preConditionCb, callbacks, listener);

            preConditionCb
                precondition callback that will be assigned to all callbacks.
                good for global filtering all callbacks assigned.

     */

    function bind(eventName, callback, listener) {

        cb_cache = null;

        //var dont_trace = false;

        if (is_.func(eventName)) { // precondition callback as the first arg

            if (is_.obj(callback)) {

                for (var k in callback) {
                    var cb = callback[k];
                    if (is_.arr(cb)) {
                        cb.unshift(eventName);
                    } else {
                        callback[k] = [eventName, cb];
                    }
                }

                return bind(callback, listener);

            } else {
                // we support only 1 signature only for precondition callback for now
                debugger;
            }

        }

        if (is_.obj(eventName)) {
            Object.keys(eventName).each(function(k) {

                if (is_.obj(eventName[k])) {
                    for (var kk in eventName[k]) {
                        bind(k + (is_.num(kk) ? kk : ' :' + kk), eventName[k][kk], callback, listener);
                    }
                    return;
                }

                bind(k, eventName[k], callback, listener);
            });
            return self;
        }

        var es = eventName.words;

        if (es.length > 1) {

            let args = [], names = [], _callback = callback, preCount = 0;

            for (let i = 0, len = es.length; i < len; i++) {

                let e = es[i];

                if (e === ':once') {
                    args.push({once: true});

                    // if there's several events before 'once', we unbind them all after the callback is triggered
                    if (names.length > 1) {

                        (function(names) {
                            args.push({
                                unbind: function() {
                                    for (let i = 0, len = names.length; i < len; i++) {
                                        unbind(names[i], _callback);
                                    }
                                },
                            });
                        })(names.copy());
                    }
                    continue;
                }

                if (is_.num(e)) {

                    args.push(parseInt(e));
                    continue;

                }

                if (e[0] === '@') {

                    args.push({condition: e});

                    let pre;

                    if (e[1] === '{') {//object filter

                        let flt;

                        /*
                            parse a filter object to filter out callback with the event handler's first object argument
                            if it fails we assume that instead of an object there's the following format:
                            'variable:condition;variable:condition'
                            where the variable is the object's variable path like 'objectVar.objectProp'
                            and the condition is a string that converted to undefined|null|number when possible
                         */

                        try {

                            eval('flt=' + e.substr(1));

                            pre = function(val) {
                                for (let k in flt) {
                                    if (flt[k] !== (typeof val[k] === 'function' ? val[k]() : val[k])) {
                                        return false;
                                    }
                                }
                                return true;
                            };

                        } catch (err) {
                            let parse = e.substr(2, e.length - 3);
                            let conditions = parse.split(';');
                            let checks = [];
                            for (let c of conditions) {
                                let path = c.match(/^([^:]+)/)[1];
                                let val = c.match(/:(.+)$/)[1];
                                if (!(
                                    'undefined null false true'.words.includes(val) ||
                                    is_.num(val)
                                )) {
                                    val = '"' + val + '"';
                                }
                                // todo: add support of functions as item field
                                checks.push(new Function('item', `return item.${ path }===${ val }`));
                            }
                            pre = function(val) {
                                for (let check of checks) {
                                    if (!check(val)) {
                                        return false;
                                    }
                                }
                                return true;
                            };

                        }


                        pre.__eventPreconditionOrder = 1000000;

                    } else if (e[1] === '?') { // check weither a prop isnt empty

                        let prop = e.substr(2);

                        pre = new Function('val', `
                                return !!val.${ prop };
                            `);

                        pre.__eventPreconditionOrder = 1000000;

                    } else {
                        pre = e.substr(1);
                    }

                    if (is_array(_callback)) {
                        _callback.splice(preCount++, 0, pre);
                    } else {
                        preCount++;
                        _callback = [pre, _callback];
                    }

                    args.push({preConditionCount: preCount});

                    continue;
                }

                if (e === ':name') {
                    args.push({
                        addEventName: true,
                    });
                    continue;
                }

                if (e === ':last') {
                    args.push({
                        orderGroup: 2,
                    });
                    continue;
                }

                if (e === ':first') {
                    args.push({
                        orderGroup: -2,
                    });
                    continue;
                }

                if (e === ':after') {
                    args.push({
                        orderGroup: 1,
                    });
                    continue;
                }

                if (e === ':before') {
                    args.push({
                        orderGroup: -1,
                    });
                    continue;
                }

                if (e === ':later') {
                    args.push({
                        later: true,
                    });
                    _callback = _callback.laterCb();
                    continue;
                }

                if (e === ':skip') {

                    args.push({
                        skip: true,
                        /*afterPreCondition: function(c) {
                            delete c.afterPreCondition;
                            c.preConditionCb.remove(pre);
                            // it could be empty but let's _get_callbacks clean it
                        }*/
                    });

                    (function() {

                        // we provide normal function, and it will be called with the callback object as 'this'
                        let pre = function() {
                            this.preConditionCb.remove(pre);
                            return false;
                        };

                        if (is_array(_callback)) {
                            _callback.unshift(pre);
                        } else {
                            _callback = [pre, _callback];
                        }

                    })();

                    continue;

                }

                if (e === ':trigger') { //triggers callback immediately without any preconditions
                    args.push({}); //dummy params to trigger bindArray()
                    if (is_array(_callback)) {
                        _callback.last()();
                    } else {
                        _callback();
                    }
                    continue;
                }

                if (args.length) {
                    bindArray();
                }

                names.push(e);

            }

            bindArray();

            function bindArray() {

                if (args.length) {
                    args.unshift(_callback, listener);
                }

                for (let ii = 0, lenn = names.length; ii < lenn; ii++) {

                    if (args.length) {
                        let copy = args.copy();
                        copy.unshift(names[ii]);
                        bind.apply(self, copy);
                    } else {
                        bind(names[ii], _callback, listener);
                    }
                }
                args = [];
                names = [];
                _callback = callback;
            }


            return self;
        }

        //automatically unbind the previous bind if any

        var calls = callbacks || (callbacks = []);

        var found = false;
        calls.each(function(c) {
            if (c.event == eventName && c.callback === callback) {
                found = c;
                return false;
            }
        });
        if (found) {
            calls.remove(found);
        }

        var preConditionCb;

        if (is_array(callback)) {

            var preConditionArgs = callback;
            var _callback = preConditionArgs.pop();

            // sort preconditions so for example the skip would be the last
            preConditionArgs.sort(function(a, b) {
                a = a.__eventPreconditionOrder || 0;
                b = b.__eventPreconditionOrder || 0;
                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                }
                return 0;
            });

            var testFirstArg = false;

            for (var i = 0, len = preConditionArgs.length; i < len; i++) {

                if (is_.scalar(preConditionArgs[i])) {

                    testFirstArg = true;

                    (function(testArg) {

                        let checkCb;

                        if (testArg[0] === '/' && testArg[testArg.length - 1] === '/') { //regular exp todo: support flags

                            let src = testArg.substr(1, testArg.length - 2);
                            let regexp = new RegExp(src);

                            checkCb = preConditionArgs[i] = function() {
                                return regexp.test(arguments[0]);
                            };

                        } else {

                            checkCb = preConditionArgs[i] = function() {

                                //todo : support numbers, dates

                                if (is_.num(testArg)) {
                                    testArg = parseFloat(testArg);
                                }

                                return arguments[0] === testArg;
                            };
                        }


                        callback = function() {
                            var args = Array.prototype.slice.call(arguments);

                            // there could event name (:name) so check it

                            if (checkCb(args[1]) && args[0] === this.event) {
                                args.splice(1, 1);
                            } else {
                                args.shift();
                            }
                            return _callback.apply(listener, args);
                        };

                        callback.__originFunction = _callback;

                    })(preConditionArgs[i]);

                }

            }

            if (!testFirstArg) {
                callback = _callback;
            }

            preConditionCb = preConditionArgs;

        }

        if (!listener) {
            debugger;
        } 
        // else if (listener instanceof jQuery) {
        //     throw new Error('Event class doesnt support jQuery objects as listeneres');
        // }

        if (listener) {
            addListener(listener);
            //self.trigger('listener:add', listener);
        }


        Event.defineListener(eventName, callback, listener);

        var cb = {
            event: eventName,
            callback: callback,
            listener: listener,
        };

        // looking for custom props

        var args = parseArgs(arguments, 'no-merge');

        if (args.number) {
            cb.order = args.number;
        }

        if (is_.arr(args.object) && args.object.length > 1) {
            args.object.copy().each(function(arg) {
                if (arg !== listener) {
                    for (var k in arg) {
                        cb[k] = arg[k];
                    }
                }
            });
        }

        preConditionCb && (cb.preConditionCb = preConditionCb);

        calls.push(cb);

        return self;

    }

    // Remove one or many callbacks. If `callback` is null, removes all
    // callbacks for the event. If `ev` is null, removes all bound callbacks
    // for all events.
    function unbind(ev, callback) {

        if (!callbacks) {
            return;
        }

        cb_cache = null;

        var self = this;

        var cs;

        if (!ev) {

            callbacks = [];

        } else if (callbacks.length) {

            cs = callbacks;

            var ns = [];

            if (!callback) {

                cs.each(function(c) {
                    if (typeof ev == 'string') {
                        if (c.event != ev) {
                            ns.push(c);
                        } else {
                            log(c);
                        }
                    } else if (typeof ev == 'function') {
                        if (c.callback !== ev) {
                            ns.push(c);
                        } else {
                            log(c);
                        }
                    } else if (is_object(ev) || is_array(ev)) {
                        if (c.listener !== ev) {
                            ns.push(c);
                        } else {
                            log(c);
                        }
                    }
                });

            } else {

                var ns = [];

                cs.copy().each(function(c) {

                    if (!((c.event == ev) && (c.callback === callback))) {

                        ns.push(c);

                    } else {
                        log(c);
                    }
                });

            }

            callbacks = ns;

        }

        function log() {

        }

        return self;

    }

    function _get_callbacks(eventName) {

        if (!cb_cache) {
            cb_cache = {};
        }
        var cs = cb_cache[eventName];

        var hasPreConditions = false;

        if (!cs) {

            cs = [];

            var ordered = false;

            for (var idx = 0; idx < callbacks.length; idx++) {

                var c = callbacks[idx];

                if (c.event == eventName || c.event == 'all') {

                    if (c.preConditionCb) {
                        if (c.preConditionCb.length) {
                            hasPreConditions = true;
                        } else {
                            delete c.preConditionCb; // clean removed preconditions
                        }
                    }
                    if (c.order || c.orderGroup) {
                        ordered = true;
                    }
                    c.idx = idx;
                    cs.push(c);
                }
            }

            ordered && cs.sort(function(a, b) {

                if (a.orderGroup === b.orderGroup) {
                    //continue;
                } else {
                    return (a.orderGroup || 0) < (b.orderGroup || 0) ? -1 : 1;
                }

                if (a.order === b.order) {
                    return a.idx < b.idx ? -1 : 1;
                }

                return (a.order || 0) < (b.order || 0) ? -1 : 1;

            });


            if (hasPreConditions) {
                cs.hasPreConditions = true;
            }

            cb_cache[eventName] = cs;
        }

        return cs;

    }

    function trigger_after(eventName) {

        var args = arguments;
        setTimeout(function() {
            trigger.apply(self, args);
        }, 0);
    }

    function triggerLater() {

        var args = $.makeArray(arguments);
        args.unshift(0);//delay

        return self.triggerDelay.apply(self, args);

    }

    function triggerDelay(delay) {

        var args = $.makeArray(arguments);
        args.shift();
        setTimeout(function() {
            trigger.apply(self, args);
        }, delay);
    }

    function triggerDelayCb(delay) {

        return function() {

            var args = $.makeArray(arguments);
            args.shift();
            setTimeout(function() {
                trigger.apply(self, args);
            }, delay);

        };
    }

    function dontSendToSuspended(val) {
        _dontSendToSuspended = val;
    }

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    function trigger(eventName) {

        if (!callbacks || callbacks.length == 0) {
            return [];
        }

        var args = [].copy(arguments);
        return triggerHandler.call(this, args);

    }

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    function triggerQuery(eventName) {

        if (!callbacks || callbacks.length == 0) {
            return [];
        }

        var args = [].copy(arguments);
        return triggerHandler.call(this, args);

    }

    function triggerCb(eventName) {

        if (!callbacks || callbacks.length == 0) {
            return [];
        }

        var args = [].copy(arguments);
        var cb = args.pop();

        return triggerHandler.call(this, args, cb);


    }

    function triggerHandler(args, cb) {

        var eventName = args[0];
        var self = this;
        var allArgs = args.copy();
        args.shift();


        var cs = _get_callbacks(eventName);

        if (cs.hasPreConditions) {
            cs = cs.filter(function(c) {
                if (c.preConditionCb) {
                    for (let i = 0, len = c.preConditionCb.length; i < len; i++) {

                        let pre;

                        if (i < (c.preConditionCount || 0)) {
                            pre = c.preConditionCb[i].apply(c, [args[i]]);
                        } else {
                            pre = c.preConditionCb[i].apply(c, args);
                        }
                        /*if (c.afterPreCondition) {
                            c.afterPreCondition(c, pre);
                        }*/
                        if (!pre && pre !== undefined) {
                            return false;
                        }

                    }
                }
                return true;
            });
        }

        var out = [];

        if (!cs.length) {
            return out;
        }

        var once = [];

        var log = Event.log(eventName, args, this);

        for (var i = 0; i < cs.length; i++) {
            var c = cs[i];

            if (c.conditionCb) {
                if (c.conditionCb() === false) {
                    continue;
                }
            }

            if (c.once) {
                // register for unbinding later
                once.push(c);
            }

            var result;

            if (log) {

                var logCb = c.callback.__originFunction || c.callback;

                var flags = [];

                c.condition && flags.push(c.condition);
                c.addEventName && flags.push(':name');
                c.once && flags.push(':once');
                c.skip && flags.push(':skip');

                if (c.orderGroup) {

                    var groups = {
                        '-2': 'first',
                        '-1': 'before',
                        '1': 'after',
                        '2': 'last',
                    };

                    flags.push(':' + groups[c.orderGroup]);

                }

                c.order && flags.push(c.order);

                flags = flags.join(' ');
                flags.length && (flags = ' ' + flags);


                console.log('%c' + logCb._name + flags + '      %c' + Event.findFn(logCb), 'color:#B4D466',
                    'font-size:9px;font-family:arial;');

                var start = Date.now();
            }

            if (c.event == 'all' || c.addEventName) {
                result = c.callback.apply(c, allArgs);
            } else {
                result = c.callback.apply(c, args);
            }

            if (log && log.timer) {
                var duration = Date.now() - start;
                duration && console.log('event handler took:', duration + 'ms');
            }

            if (result !== undefined) {
                cb && cb(result);
                out.push(result);
                log && console.log('event handler return:', result);
            }

        }

        log && log.finish(duration, result);

        once.each(function(c) {
            if (c.unbind) {
                c.unbind();
            } else {
                callbacks.remove(c);
                cb_cache && cb_cache[eventName] && cb_cache[eventName].remove(c);
            }
        });

        return out;
    }

    //mixes listener object with EventListener class, allowing automatic unbinding on the object's destroy() call

    function addListener(listener) {

        if (!listener.hasOwnProperty('addEventSource')) {
            mixreturn(listener, new EventListener(listener));
        }

        listener.addEventSource(self);
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

export const EventSource = Event;

// static Event methods for logging

(function() {
    'use strict';

    var listeners = [];
    var listenerId = 0;

    function getClassName(source) {

        var name = source.__className || source.__proto__.constructor.name;

        // look class name in mixed objects

        if ('Event EventListener'.words.includes(name) && source.__mixed) {
            name = source.__mixed.copy().remove('Event').remove('EventListener').join('|');
        }

        return name;
    }

    Event.getClassName = getClassName;

    Event.defineListener = function(eventName, callback, listener) {

        if (!log) {
            return;
        }

        Object.ensureProperty(listener, '__eventListenerId', ++listenerId);

        var logCb = callback;

        if (!logCb._name && listener) {

            var _name = getClassName(listener);

            _name += '[' + listener.__eventListenerId + ']';

            if (logCb.name) {
                var cbName = logCb.name.words()[0];

                if (cbName != eventName) {
                    _name += ' :: ' + cbName;
                }
            }

            Object.defineProperty(
                logCb,
                '_name',
                {value: _name},
            );
        }

    };

    Event.addListener = function(listener) {
        if (!log) {
            return;
        }
        listeners.contains(listener) || listeners.push(listener);
    };

    Event.removeListener = function(listener) {
        if (!log) {
            return;
        }
        listeners.remove(listener);
    };

    // dumps all event handlers in the system grouped by event listeners

    Event.dump = function(mode) {

        if (mode == 'events') {
            return Event.dumpEvents();
        }

        var list = {};

        listeners.each(function(listener) {

            var _name = listener.__className || listener.__proto__.constructor.name;

            if (!list[_name]) {
                list[_name] = [];
            }

            listener.getEventSources().each(function(source) {
                source.getEventHandlers().filter({listener: listener}).each(function(c) {

                    list[_name].push(['%c' + c.callback._name + ': %c' + c.event + '      %c' + Event.findFn(c.callback), 'color:#B4D466', 'color:yellow', 'font-size:9px;font-family:arial;']);

                });
            });


        });

        $.each(list, function(name, listeners) {
            console.groupCollapsed('%c' + name, 'color:#B4D466');

            listeners.each(function(listener) {
                console.log.apply(console, listener);
            });

            console.groupEnd();
        });


    };

    // dumps all event handlers in the system grouped by event sources (binding targets)

    Event.dumpEvents = function(mode) {

        var sources = listeners.collect('getEventSources', true);

        var list = {};

        sources.each(function(source) {

            var name = getClassName(source);

            if (!list[name]) {
                list[name] = [];
            }

            source.getEventHandlers().each(function(c) {

                list[name].push(['%c' + c.callback._name + ': %c' + c.event + '      %c' + Event.findFn(c.callback._originFunction || c.callback), 'color:#B4D466', 'color:yellow', 'font-size:9px;font-family:arial;']);

            });


        });

        $.each(list, function(name, callbacks) {
            console.groupCollapsed('%c' + name, 'color:#B4D466');

            callbacks.each(function(callbacks) {
                console.log.apply(console, callbacks);
            });

            console.groupEnd();
        });


    };


    mixreturn(Event, EventSource);

    Event.__className = 'Event';

    var source;             // whole js source file content
    var sourceLines = [];   // keeps positions of new lines in 'source'
    var sourceUrl;          // source file url for provide a link to a function
    var sourceIndex = window.WeakMap ? new WeakMap : null; // function index for caching

    //  sets source and builds new line position index
    Event.setSources = function(r) {
        source = r[0].source;
        sourceUrl = r[0].url;

        var regexp = new RegExp('\n', 'g');

        while (regexp.test(source)) {
            sourceLines.push(regexp.lastIndex);
        }
    };

    // returns function url in the source (sourceUrl + line number)
    Event.findFn = function(fn) {

        if (!source) {
            return;
        }

        if (!sourceIndex) {
            return find();
        }

        var out = sourceIndex.get(fn);

        if (out) {
            return out;
        }

        out = find();
        sourceIndex.set(fn, out);
        return out;

        function find() {

            var pos = source.indexOf(fn.toString());

            var line = 0;
            while (sourceLines[line++] < pos) {
                // increment line
            }

            return sourceUrl + ':' + line;
        }
    };

    var key = 'Event.logging';
    var keyIgnore = key + '.ignore';
    let keyWatch = key + '.watch';

    var log = localStorage[key];
    if (log) {
        log = log.flags();
    }
    var ignore = false;
    let watch = false;

    setIgnore(localStorage[keyIgnore]);
    setWatch(localStorage[keyWatch]);

    function setIgnore(words) {

        if (!words) {
            ignore = false;
            return;
        }

        ignore = ignore || [];

        var keep = [];

        var args = [].copy(arguments);

        var remove = args.filter(is_.num);

        ignore.each(function(i, idx) {
            if (!remove.contains(++idx)) {
                keep.push(i);
            }
        });

        var sources = ignore.map('source');

        args.filter(is_.str).each(function(words) {

            words.words.forEach(function(pattern) {

                if (sources.contains(pattern)) {
                    console.log('"' + pattern + '" is already ignored');
                    return;
                }

                keep.push(new RegExp(pattern, 'i'));

            });
        });

        ignore = keep;

        localStorage[keyIgnore] = ignore.map(function(i) {
            return i.source;
        }).join(' ');

    }

    function setWatch(words) {

        if (!words) {
            watch = false;
            return;
        }

        watch = watch || [];

        var keep = [];

        var args = [].copy(arguments);

        var remove = args.filter(is_.num);

        watch.each(function(i, idx) {
            if (!remove.contains(++idx)) {
                keep.push(i);
            }
        });

        var sources = watch.map('source');

        args.filter(is_.str).each(function(words) {

            words.words.forEach(function(pattern) {

                if (sources.contains(pattern)) {
                    console.log('"' + pattern + '" is already watched');
                    return;
                }

                keep.push(new RegExp(pattern, 'i'));

            });
        });

        watch = keep;

        localStorage[keyWatch] = watch.map(function(i) {
            return i.source;
        }).join(' ');

    }

    function logTrigger(eventName, args) {

        !this.hasOwnProperty('eventStack') && Object.defineProperty(this, 'eventStack', {writable: true, value: []});

        var eventStack = this.eventStack;

        var logging = !!log;
        var ignored = false;

        while (logging) {

            watch && watch.each(regexp => {
                if (!regexp.test(eventName)) {
                    ignored = true;
                    return false;
                }
            });

            ignore && ignore.each(function(regexp) {
                if (regexp.test(eventName)) {
                    ignored = true;
                    return false;
                }
            });

            if (ignored) {
                break;
            }

            var logArgs = [];

            var e = new Error;

            if (e.stack) {

                var called = e.stack.lines();
                called.splice(0, 4);

                var strip = true;

                while (strip) {

                    if (called[0].indexOf('$delegate') >= 0) {
                        called.shift();
                        strip = true;
                        continue;

                    }

                    if (called[0].indexOf('trigger') >= 0) {
                        called.shift();
                        strip = true;
                        continue;
                    }

                    strip = false;
                }
            } else {
                called = [''];
            }

            //logArgs.unshift(called[0]);

            var triggeredName = (this.__className || this.__proto__.constructor.name) + ' :: ' + eventName;

            var caller = called[0].trim();
            var url = caller.match(/http[^)]+/)[0];
            var from = caller.match(/^([^(]+)(\(|http)/)[1];


            var logName = triggeredName +
                ' %c(' + args.toCompactString() + ')' + ' %c' + from + '      %c' + url;
            logArgs.unshift('%c' + logName, 'font-weight:normal;color:yellow', 'color:#999', 'color:#888 !important', 'font-size:9px;font-family:arial;');

            if (eventStack.find({
                event: triggeredName,
            })) {
                debugger;
            }

            var stackEntry = {
                event: triggeredName,
            };

            eventStack.push(stackEntry);

            console[log.expand ? 'group' : 'groupCollapsed'].apply(console, logArgs);

            if (log.stack) {

                called.shift();

                if (called.length) {

                    console.groupCollapsed(called.shift());

                    console.log(called.join('\n'));

                    //console.trace();
                    console.groupEnd();
                }
            }

            break;

        }

        if (logging && !ignored) {

            var out = {};

            for (var k in log) {
                out[k] = log[k];
            }

            out.finish = function() {
                console.groupEnd();
                eventStack.remove(stackEntry);
            };

            return out;

        }

        return false;
    }

    /*
        turns event logging on/off

        Event.log(true)
            turns event logging on

        Event.log(false)
            turns event logging off

        Event.log(flags)
            flags - words containing:

                stack
                    logs a stack when an event is triggered

                timer|timers|times|time|timings|timing
                    logs event handlers' execution times

                f.e. Event.log('stack times')


     */

    Event.log = function(mode) {

        if (arguments.length == 3) {
            return logTrigger.apply(arguments[2], Array.slice(arguments, 0, 2));
        }


        if (!arguments.length) {
            return log;
        }

        if (!mode) {
            log = false;
            delete localStorage[key];
            Event.trigger('logging');
            return;
        }

        localStorage[key] = mode;
        if (is_.str(mode)) {
            log = mode.flags();
            if (mode.words.intersect('timing timings timers time times'.words)) {
                debugger;
                log.timer = true;
            }
        } else {
            log = {};
        }
        Event.trigger('logging', log);

    };

    /*
    adds/removes events from logging and prints current watched events

    Event.logWatch(false)
        clears the watch list. all events will be logged

    Event.logWatch()
        prints the current watch list

    Event.logWatch(..multiple parameters);

        accepts any number of parameters. the parameters are

        1)  string
                regular expression. all matching event names will be watched
        2)  number
                removes regular expression from the watch list by specified index

        f.e. Event.logWatch(1, 'template') - removes the first watch list item
            and adds 'template' regular expression to the list

 */

    Event.logWatch = function(words) {

        if (!arguments.length) {
            return print();
        }

        if (!words) {
            watch = false;
            console.log('all watches were deleted');
            delete localStorage[keyWatch];
            return;
        }

        setWatch.apply(Event, arguments);

        print();

        function print() {

            if (!watch) {
                return console.log(false);
            }

            watch.each(function(i, idx) {
                console.log(++idx + ': ' + i.source);
            });

        }
    };

    /*
        adds/removes events from logging and prints current ignored events

        Event.logIgnore(false)
            clears the ignore list. all events will be logged

        Event.logIgnore()
            prints the current ignore list

        Event.logIgnore(..multiple parameters);

            accepts any number of parameters. the parameters are

            1)  string
                    regular expression. all matching event names will be ignored
            2)  number
                    removes regular expression from the ignore list by specified index

            f.e. Event.logIgnore(1, 'template') - removes the first ignore list item
                and adds 'template' regular expression to the list

     */

    Event.logIgnore = function(words) {

        if (!arguments.length) {
            return print();
        }

        if (!words) {
            ignore = false;
            console.log('all ignores were deleted');
            delete localStorage[keyIgnore];
            return;
        }

        setIgnore.apply(Event, arguments);

        print();

        function print() {

            if (!ignore) {
                return console.log(false);
            }

            ignore.each(function(i, idx) {
                console.log(++idx + ': ' + i.source);
            });

        }
    };

})();

// some experiment with custom console logging, to be continued

window.devtoolsFormatters = [{
    header: function(obj) {
        'use strict';
        if (!(obj instanceof StackTrace)) {
            return null;
        }
        return ['div', {}, obj.url];
    },
    hasBody: function() {
        'use strict';
        return true;
    },
    body: function(obj) {
        'use strict';
        if (!(obj instanceof StackTrace)) {
            return null;
        }
        return ['div', {}, obj.get().slice(1).join('\n')];
    },
}];


function StackTrace(lines) {
    'use strict';

    var line = lines[0];
    this.url = line.match(/(http.+)\)?/)[1];
    this.callee = line.match(/^(.+)\(?/)[1];


    this.get = function() {
        return lines;
    };

}


if (typeof module !== 'undefined') {
    module.exports = {Event, EventSource};
}
