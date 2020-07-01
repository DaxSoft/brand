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

async function getInstagram({ page }) {
    const response = await page.evaluate(function () {
        const result: any = {};

        // get

        function getLogo() {
            let logo = document
                .querySelector('body')
                ?.querySelector('main')
                ?.querySelector('header')
                ?.querySelector('img');

            if (logo && logo.hasAttribute('src')) {
                result.logo = logo.getAttribute('src');
            }
        }

        function getInfo() {
            let info = document
                .querySelector('body')
                ?.querySelector('main')
                ?.querySelector('header')
                ?.querySelector('section');

            if (!!info) {
                let username = info.querySelector('h2');
                result.username = username?.innerText.trim();

                let numbers = info.querySelector('ul');

                let postsTotal: any = numbers?.children?.item(0);
                if (!!postsTotal && postsTotal.innerText) {
                    result.postsTotal = postsTotal.innerText.trim();
                }

                let followersTotal: any = numbers?.children?.item(1);
                if (!!followersTotal && followersTotal.innerText) {
                    result.followersTotal = followersTotal.innerText.trim();
                }

                let followingTotal: any = numbers?.children?.item(2);
                if (!!followingTotal && followingTotal.innerText) {
                    result.followingTotal = followingTotal.innerText.trim();
                }
            }
        }

        // call

        getLogo();

        try {
            getInfo();
            return result;
        } catch (error) {
            return result;
        }

        return result;
    }, {});
    return response;
}

/*
:--------------------------------------------------------------------------
: Epoxrt
:--------------------------------------------------------------------------
*/

export default async function crawlerInstagram({
    browser,
    response,
    pageTimeout,
}) {
    if (!response.links.instagram) {
        response.instagram = {
            status: false,
            error: 'INSTAGRAM_ERROR',
        };
        return;
    }

    const url = response.links.instagram;

    // goto
    const page = await browser.newPage();
    await gotoPage({ page, url: url, timeout: pageTimeout });
    await page.waitFor(2000);

    response.instagram = await getInstagram({ page });
    response.instagram.status = true;

    await page.close();
}
