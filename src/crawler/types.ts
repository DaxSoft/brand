/*
:--------------------------------------------------------------------------
: crawler/index
:--------------------------------------------------------------------------
*/

export interface I_BrandCrawler_Args {
    website: string;
    facebook?: boolean;
    instagram?: boolean;
    twitter?: boolean;
    extractColor?: boolean;
    defaultHttps?: boolean;
    puppeteer: any;
    timeout?: number;
    headless?: boolean;
    pageTimeout?: number;
}

export interface I_BrandCrawler_Response_Instagram {
    status: boolean;
    error?: string;
    logo?: string;
    postsTotal?: string;
    username?: string;
    followersTotal?: string;
    followingTotal?: string;
}

export interface I_BrandCrawler_Response_Twitter {
    status: boolean;
    error?: string;
    logo?: string;
    banner?: string;
    username?: string;
}

export interface I_BrandCrawler_Response_Facebook {
    status: boolean;
    error?: string;
    logo?: string;
    banner?: string;
    username?: string;
}

export interface I_BrandCrawler_Response {
    status: boolean;
    error?: string;
    url: string;
    metadata?: Record<string | symbol, any>;
    links?: Record<string | symbol, any>;
    instagram?: I_BrandCrawler_Response_Instagram;
    twitter?: I_BrandCrawler_Response_Twitter;
    facebook?: I_BrandCrawler_Response_Facebook;
}
