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

async function getTwitter({ page }) {
    const response: object = await page.evaluate(function () {
        const result: Record<string | symbol, any> = {};

        // get

        function getLogo() {
            let main = document
                .querySelector('#react-root')
                ?.querySelector('main');

            let allImgs: Array<any> = []; ///(profile_banner)/gi.test(img.getAttribute('src'))

            main?.querySelectorAll('img').forEach((img: any) =>
                img.hasAttribute('src') ? allImgs.push(img) : null
            );

            let banner: any = allImgs.find((img: any) =>
                /(profile_banner(s)?\/)/gi.test(img.getAttribute('src'))
            );

            if (!!banner) {
                result.banner = banner.getAttribute('src');
            }

            let profileImage: any = allImgs.find((img: any) =>
                /(profile_image(s)?\/)/gi.test(img.getAttribute('src'))
            );

            if (!!profileImage) {
                result.logo = profileImage.getAttribute('src');
            }
        }

        function getInfo() {
            let main = document
                .querySelector('#react-root')
                ?.querySelector('main');

            let firstNav = main?.querySelector('nav');

            let parentOfNav = firstNav?.parentElement;

            let content = parentOfNav?.children.item(0);

            let username = content?.children.item(1)?.querySelectorAll('span');

            if (!!username) {
                let allSpanUsername: Array<any> = [];
                username.forEach((element: any) =>
                    allSpanUsername.push(element.innerText.trim())
                );

                result.username = allSpanUsername.find((spanText) =>
                    /^(\@)/g.test(spanText)
                );
            }
        }

        // call

        getLogo();

        try {
            getInfo();
        } catch (error) {}

        return result;
    }, {});
    return response;
}

/*
:--------------------------------------------------------------------------
: Epoxrt
:--------------------------------------------------------------------------
*/

export default async function crawlerTwitter({
    browser,
    response,
    pageTimeout,
}) {
    if (!response.links.twitter) {
        response.twitter = {
            status: false,
            error: 'TWITTER_ERROR',
        };
        return;
    }

    // goto
    const url = response.links.twitter;

    // goto
    const page = await browser.newPage();
    await gotoPage({ page, url: url, timeout: pageTimeout });
    await page.waitFor(2000);
    response.twitter = await getTwitter({ page });

    response.twitter.status = true;

    await page.close();
}
