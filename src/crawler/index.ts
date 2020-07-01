/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import { UtilsWait } from '../utils';

/*
:--------------------------------------------------------------------------
: Handler
:--------------------------------------------------------------------------
*/

import {
    IsWebsiteUp,
    crawlerMainWebsite,
    crawlerInstagram,
    crawlerTwitter,
    crawlerFacebook,
} from './handler';

import { I_BrandCrawler_Args, I_BrandCrawler_Response } from './types';

/*
:--------------------------------------------------------------------------
: Bootstrap
:--------------------------------------------------------------------------
*/

async function BrandCrawler({
    website = '',
    defaultHttps = true,
    puppeteer,
    timeout = 0,
    headless = true,
    pageTimeout = 0,
}: I_BrandCrawler_Args): Promise<I_BrandCrawler_Response> {
    const checkWebsite = await IsWebsiteUp({ url: website, defaultHttps });

    if (!checkWebsite) {
        return {
            status: false,
            error: 'WEBSITE_ERROR',
            url: website,
        };
    }

    const response: I_BrandCrawler_Response = {
        status: true,
        url: website,
        instagram: {
            status: false,
        },
        twitter: {
            status: false,
        },
        facebook: {
            status: false,
        },
    };

    // setup puppeteer

    const browser = await puppeteer.launch({
        headless,
        timeout,
    });

    // get into main website

    await crawlerMainWebsite({ browser, response, pageTimeout });

    try {
        await UtilsWait.sec(1);
        await crawlerInstagram({ browser, response, pageTimeout });
    } catch (error) {
        response.instagram = {
            status: false,
            error: error,
        };
    }

    try {
        await UtilsWait.sec(1);
        await crawlerTwitter({ browser, response, pageTimeout });
    } catch (error) {
        response.twitter = {
            status: false,
            error: 'TWITTER_ERROR',
        };
    }

    try {
        await UtilsWait.sec(1);
        await crawlerFacebook({ browser, response, pageTimeout });
    } catch (error) {
        response.facebook = {
            status: false,
            error: 'FACEBOOK_ERROR',
        };
    }

    // return
    await browser.close();
    return response;
}

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

export { BrandCrawler };
