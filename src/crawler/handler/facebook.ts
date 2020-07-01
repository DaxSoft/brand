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

async function getFacebook({ page }) {
    const response: object = await page.evaluate(function () {
        const result: Record<string | symbol, any> = {};

        // get

        function getLogo() {
            let main = document
                .querySelector('#globalContainer')
                ?.querySelector('.clearfix')
                ?.querySelector('div')
                ?.querySelector('div')
                ?.children.item(0);

            let profileImage = main?.querySelector('img');

            if (!!profileImage && profileImage.hasAttribute('src')) {
                result.logo = profileImage.getAttribute('src');
            }

            let allAElement: Array<any> = [];

            main?.querySelectorAll('a').forEach((el: any) =>
                allAElement.push(el)
            );

            let username = allAElement.find((element) =>
                /^(\@)/g.test(element.innerText.trim())
            );

            if (!!username) {
                result.username = username.innerText.trim();
            }
        }

        function getBanner() {
            let main = document
                .querySelector('#globalContainer')
                ?.querySelector('.clearfix')
                ?.querySelector('div')
                ?.querySelector('div')
                ?.children.item(1);

            let banner = main?.querySelector('img');

            if (!!banner && banner.hasAttribute('src')) {
                result.banner = banner.getAttribute('src');
            }
        }

        // call

        getLogo();

        try {
            getBanner();
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

export default async function crawlerFacebook({
    browser,
    response,
    pageTimeout,
}) {
    if (!response.links.facebook) {
        response.facebook = {
            status: false,
            error: 'FACEBOOK_ERROR',
        };
        return;
    }

    const url = response.links.facebook;

    // goto
    const page = await browser.newPage();
    await gotoPage({ page, url: url, timeout: pageTimeout });
    await page.waitFor(2000);
    response.facebook = await getFacebook({ page });

    response.facebook.status = true;

    await page.close();
}
