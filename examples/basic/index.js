const { BrandCrawler } = require('@vorlefan/brand').default
const puppeteer = require('puppeteer')

let URL = 'https://www.lojasrenner.com.br/'

void (async function () {
    const test = await BrandCrawler({
        website: URL,
        puppeteer,
        timeout: 1e9,
        instagram: true,
        pageTimeout: 0,
        twitter: true,
        facebook: true,
    })

    console.log(test)
})()
