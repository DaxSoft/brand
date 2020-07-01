/*
:--------------------------------------------------------------------------
: Handlers
:--------------------------------------------------------------------------
*/

/**
 * Wait a certain amount of mileseconds to before continue o
 * @param {Number} ms
 * @example
 * await UtilsWait.ms(1000)
 */

const ms = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Wait a certain amount of seconds to continue
 * @param {sec}
 * @example
 * await UtilsWait.sec(1)
 */

const sec = (sec: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, sec * 1000));

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

export default {
    ms,
    sec,
};
