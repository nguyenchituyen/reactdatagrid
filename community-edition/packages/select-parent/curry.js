/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
function curry(fn, n) {
    if (typeof n !== 'number') {
        n = fn.length;
    }
    function getCurryClosure(prevArgs) {
        function curryClosure() {
            var len = arguments.length;
            var args = [].concat(prevArgs);
            if (len) {
                args.push.apply(args, arguments);
            }
            if (args.length < n) {
                return getCurryClosure(args);
            }
            return fn.apply(this, args);
        }
        return curryClosure;
    }
    return getCurryClosure([]);
}
module.exports = curry;
