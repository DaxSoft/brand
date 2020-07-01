/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import NodeURL from 'url';

/*
:--------------------------------------------------------------------------
: Handler
:--------------------------------------------------------------------------
*/

async function clearCookies({ page }) {
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
}

async function gotoPage({ page, url, timeout = 1e4 }) {
    const tratedUrl = NodeURL.parse(url);
    await page.goto(tratedUrl.href.replace(/((.*)(www))/g, 'https://www'), {
        timeout,
        waitUntil: ['load', 'domcontentloaded'],
    });
}

/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

export { clearCookies, gotoPage };
