/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import { gotoPage } from '../../utils/puppeteer';

/*
:--------------------------------------------------------------------------
: Type
:--------------------------------------------------------------------------
*/

/*
:--------------------------------------------------------------------------
: Handler
:--------------------------------------------------------------------------
*/

async function get_metadata({ page }): Promise<Record<string | symbol, any>> {
    const response: object = await page.evaluate(function () {
        const result: Record<string | symbol, any> = {};

        const head = document.head;

        const allLinks: Array<any> = [];
        const allMetas: Array<any> = [];

        head.querySelectorAll('link').forEach((value) => allLinks.push(value));
        head.querySelectorAll('meta').forEach((value) => allMetas.push(value));

        function getLink(findLink: string, attr = 'href') {
            const value = allLinks.find(
                (element: any) =>
                    element.hasAttribute('rel') &&
                    element.hasAttribute(attr) &&
                    element.getAttribute('rel') === findLink
            );
            return !!value ? value.getAttribute(attr) : null;
        }

        result.favicon = getLink('icon');
        result.appleTouchIcon = getLink('apple-touch-icon');

        result.title = head.querySelector('title')?.innerText.trim();

        function getMeta(findMeta: string) {
            const value = allMetas.find(
                (element: any) =>
                    element.hasAttribute('name') &&
                    element.getAttribute('content') &&
                    element.getAttribute('name') === findMeta
            );

            return !!value ? value.getAttribute('content') : null;
        }

        result.description = getMeta('description');
        result.themeColor = getMeta('theme-color');

        return result;
    }, {});
    return response;
}

async function get_links({ page }): Promise<Record<string | symbol, any>> {
    const response: object = await page.evaluate(function () {
        const result: Record<string | symbol, any> = {};

        const body = document.body;

        const allHref: Array<any> = [];

        body.querySelectorAll('a').forEach((value) =>
            value.hasAttribute('href')
                ? allHref.push(value.getAttribute('href'))
                : null
        );

        function attemptToFind(search: RegExp) {
            const value = allHref.find((href) => {
                const rule = search;
                return rule.test(href);
            });
            return value || '';
        }

        result.facebook = attemptToFind(/(\.)?(facebook)\./gi).replace(
            /((.*)(www|\/\/)(\.)?)/g,
            'https://www.'
        );
        result.instagram = attemptToFind(/(\.)?(instagram)\./gi).replace(
            /((.*)(www|\/\/)(\.)?)/g,
            'https://www.'
        );
        result.twitter = attemptToFind(/(\.)?(twitter)\./gi).replace(
            /((.*)(www|\/\/)(\.)?)/g,
            'https://www.'
        );

        return result;
    }, {});
    return response;
}

/*
:--------------------------------------------------------------------------
: Epoxrt
:--------------------------------------------------------------------------
*/

export default async function crawlerMainWebsite({
    browser,
    response,
    pageTimeout,
}) {
    // goto
    const page = await browser.newPage();
    await gotoPage({ page, url: response.url, timeout: pageTimeout });

    response.metadata = await get_metadata({ page });
    response.links = await get_links({ page });

    await page.close();
}
