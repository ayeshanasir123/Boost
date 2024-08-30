// calls and resolves functions in 'items' array with only 'parallelCount' functions active at a moment
// todo: better name?

Promise.ABORT = Symbol('promise.abort');

Promise.allLimit = function (parallelCount, items) {

    items = items.copy();
    let length = items.length;
    let count = 0;

    return new Promise((resolve, reject) => {

        fillQueue();

        function fillQueue() {

            while (count < parallelCount) {

                if (!items.length) {
                    if (!length) {
                        resolve(true);
                    }
                    return;
                }

                items.shift()().then(out => {
                    count--;
                    length--;
                    fillQueue();
                    return out;
                }).catch(e => {
                    if (e === Promise.ABORT) {
                        items.length = length = 0;
                        reject(new Error('Promise::allLimit - cancelled'));
                    }
                });
                count++;
            }
        }

    });


};

// Promises
{
    let _all = Promise.all;
    Promise.all = function (...args) {

        let arr = [];

        for (let arg of args) {

            if (arg && typeof arg[Symbol.iterator] === 'function') {
                arr.append(arg);
            } else {
                arr.push(arg);
            }
        }

        return _all.call(Promise, arr);
    };
}

globalThis.Promise.timeout = function (delay = 0) {
    return new Promise(resolve => setTimeout(resolve, delay));
};

globalThis.Promise.requestAnimationFrame = function () {
    return new Promise(resolve => requestAnimationFrame(resolve));
};

globalThis.Promise.queue = function () {

    return new function PromiseQueue() {

        const self = this;

        let queue = [];
        let running = false;


        self.push = function (...args) {
            queue.push(...args);
            return self;
        };

        self.run = function () {

            if (running) {
                return self;
            }

            running = true;

            runNext();

            return self;

            function runNext() {

                if (!queue.length) {
                    return;
                }

                let next = queue.shift();
                next().then(runNext);
            }

        };


    };
};
