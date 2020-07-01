# @vorlefan/brand

![language](https://img.shields.io/badge/language-typescript-blue.svg)
[![https://badgen.net/bundlephobia/minzip/@vorlefan/brand](https://badgen.net/bundlephobia/minzip/@vorlefan/brand)](https://bundlephobia.com/result?p=@vorlefan/brand)
![version](https://img.shields.io/npm/v/@vorlefan/brand)

> This is a experimental product. Only use it if you know what are you doing xD
> ctrl+shift+v

## :books: Table of Contents

-   [Package](#package)
-   [Install](#package-installation)
-   [Features](#features)
-   [Usage](#usage)
-   [Documentation](#docs)
-   [Disclaimer](#disclaimer)
-   [Example](#example)
-   [Media](#media)

## History Behind

One of the projects I am working has a page where you can search for stock market enterprises (company).
One of my struggles of the project was the requirement to get the brand logo of the company. So I was searching around the web several tools to make it more easy... I have found some, however, either the price was not affordable or the tool itself not attend all my needs. So I have decided to create one using the concept of 'scraping into the web'.

## Packages

[@vorlefan/path](https://github.com/DaxSoft/path) <br />
[puppeteer](https://github.com/puppeteer/puppeteer) <br />

## Install

With [npm](https://npmjs.org) do:

```
npm install @vorlefan/brand puppeteer
```

With [yarn](https://yarnpkg.com/en/) do:

```
yarn add  @vorlefan/brand puppeteer
```

## Attention

It is required to install **puppeteer** to execute this package.
If you are using Typescript, don't forget to add the types of the puppeteer

```
yarn add -D @types/puppeteer
```

## Features

**Crawler the brand (logo) and attempt to get more useful data as**

-   Favicon
-   Description
-   Metadata
-   Instagram (Profile Image; Username; Followers Total; Following Total)
-   Facebook (Profile Image; Banner; Username)
-   Twitter (Profile Image; Banner; Username)

## Usage

```ts
// Javascript

const { BrandCrawler } = require('@vorlefan/brand').default;

// Typescript

import { BrandCrawler } from '@vorlefan/brand';
```

## Documentation

#### BrandCrawler : Promise

```ts
import { BrandCrawler } from '@vorlefan/brand';

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

// Default values

BrandCrawler({
    website = '',
    defaultHttps = true,
    puppeteer,
    timeout = 0,
    headless = true,
    pageTimeout = 0,
} : I_BrandCrawler_Args)

// The two args required are the website url and puppeteer instance

import puppeteer from 'puppeteer'
const basic = await BrandCrawler({ website: 'https://www.lojasrenner.com.br/', puppeteer })

// To get the data from social media, just define on args.

const socialMedia = await BrandCrawler({
    website: 'https://www.lojasrenner.com.br/',
    puppeteer,
    instagram: true,
    twitter: true,
    facebook: true
})

```

## Output

```ts
{
  status: true,
  url: 'https://www.lojasrenner.com.br/',
  instagram: {
    logo: 'https://instagram.fcpq10-1.fna.fbcdn.net/v/t51.2885-19/s150x150/97535538_242618216802493_3735315095777968128_n.jpg?_nc_ht=instagram.fcpq10-1.fna.fbcdn.net&_nc_ohc=MuDJ5Sot_9QAX8zYwwl&oh=a2d970591f442d18a5112ab593e274bd&oe=5F27CAB3',
    username: 'lojasrenner',
    postsTotal: '7.663 publicações',
    followersTotal: '6,4milhões seguidores',
    followingTotal: '431 seguindo',
    status: true
  },
  twitter: {
    banner: 'https://pbs.twimg.com/profile_banners/39570657/1592589850/600x200',
    logo: 'https://pbs.twimg.com/profile_images/1258852681088675840/6B5NqABb_200x200.jpg',
    username: '@Lojas_Renner',
    status: true
  },
  facebook: {
    logo: 'https://scontent.fcpq10-1.fna.fbcdn.net/v/t1.0-1/p200x200/97674179_3125074290883014_2785964363712823296_n.png?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQl-dS2WABWb3xXoQBKo7g7-nS7nWkKaM6TfsW_0Bm7xUF5X1AvVFToJB8Mw0BQVqvLNMdvKj_w98lVIKDKVv2uk&_nc_ht=scontent.fcpq10-1.fna&oh=b1feb5ff5c2ec33ac9a3ff6d609c143a&oe=5F216E42',
    username: '@LojasRenner',
    banner: 'https://scontent.fcpq10-1.fna.fbcdn.net/v/t1.0-9/105030549_3220730404650735_412461497651434886_n.png?_nc_cat=101&_nc_sid=6e5ad9&_nc_oc=AQnvPla9Q-x9NYrsws8l2W5TEgKfxzTYli0GnbPg0LhQhZ4Pz4aVfAtufnRSUgQRu6-wUYxJvCVXu7aB3CDOZHja&_nc_ht=scontent.fcpq10-1.fna&oh=afff6c6e415a3153deb449b5d25d590f&oe=5F2347D5',
    status: true
  },
  metadata: {
    favicon: 'https://www.lojasrenner.com.br/favicon.ico',
    appleTouchIcon: '/static/images/pwa/ico_renner_144x144.png',
    title: 'Moda Feminina, Masculina, Infantil e Perfumes - Renner',
    description: 'Compre Online Roupas Femininas, Masculinas, Infantis, Perfumes, Sapatos e Acessórios com pagamento parcelado.
Se quiser retire seu pedido na loja de sua preferência.',
    themeColor: '#B71920'
  },
  links: {
    facebook: 'https://www.facebook.com/LojasRenner/',
    instagram: 'https://www.instagram.com/lojasrenner/',
    twitter: 'https://www.twitter.com/lojas_renner'
  }
}
```

## Disclaimer

While it is true that it can be used in production, there are as well, several fields on the package that needs to be improved! If you want to use this package, my recommendations is: use it only for study or to contribute. If you want to use in production, be at your own risky xD

## Example

By the sake of helping xD, take a look at the folder 'example' of this repository. May it help you, in case of using on production
