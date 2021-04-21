/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default async function rafExecute(fn: () => void): Promise<any> {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      fn();
      resolve();
    });
  });
}
