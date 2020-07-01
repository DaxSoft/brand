/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import http from 'http';
import https from 'https';
import url from 'url';

/*
:--------------------------------------------------------------------------
: Type
:--------------------------------------------------------------------------
*/

interface I_isWebsiteOkay_Args {
    url: string;
    defaultHttps?: boolean;
}

/*
:--------------------------------------------------------------------------
: Handler
:--------------------------------------------------------------------------
*/

async function httpGet(website: string, methodHTTP: any): Promise<any> {
    return await Promise.resolve(
        new Promise((resolve, reject) => {
            const parsedUrl = url.parse(website);

            const request = methodHTTP.get(
                {
                    hostname: parsedUrl.hostname,
                    path: parsedUrl.path,
                    port: parsedUrl.port,
                    method: 'GET',
                },
                ({ statusCode }) => {
                    resolve(statusCode === 200);
                }
            );

            request.on('error', reject);

            request.end();
        })
    );
}

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

export default async function isWebsiteOkay({
    url,
    defaultHttps = true,
}: I_isWebsiteOkay_Args): Promise<boolean> {
    const methodHTTP = /(https\:)/gi.test(url)
        ? https
        : !!defaultHttps
        ? https
        : http;

    const response = await httpGet(url, methodHTTP);

    return response;
}
