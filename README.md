<div align="center">
<h1>rich-enum</h1>

<p>A implementation of enum like feature, but more powerful and extensible. </p>
</div>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## The problem

We could use a plain object to simulate an enumeration type. It's fine that if we just need to use this to store the value of a key and access the predefined value by a key. What if we need to store and read more informations by a key or read some information by value ?

Take the api documentation described by `protocol buffers` as an example:

```proto
message SearchRequest {
  enum Corpus {
    UNIVERSAL = 0;
    WEB = 1;
    IMAGES = 2;
    LOCAL = 3;
    NEWS = 4;
    PRODUCTS = 5;
    VIDEO = 6;
  }

  Corpus corpus = 4;
}
```

In the above example, it define an value `corpus` of `enum` type `Corpus`. When we communicate with the back end api, wo need to passed something like this:

```javascript
const Corpus = {
  UNIVERSAL: 0,
  WEB: 1,
  IMAGES: 2,
  LOCAL: 3,
  NEWS: 4,
  PRODUCTS: 5,
  VIDEO: 6,
}

const request = {
  corpus: Corpus.UNIVERSAL,
}
```

In the context of communicating with the back end API, we can create an object to map the key like `UNIVERSAL` to the value `0` and other enumeration values the same way. But if we want to add more information to the enumeration value? Such as detailed description and any other extra pieces of information. For example, we have a value `0` and we want to know which enumeration item has the value `0`, we also want to display the corresponding description for this value.

```javascript
const CorpusText = {
  [Corpus.UNIVERSAL]: 'Universal',
  //...
  [Corpus.VIDEO]: 'Video',
}

CorpusText[corpusValue]
```

The solution the above provided can meet our needs, but it's too troublesome. So we take `rich-enum` as the more great solution.

## This solution

This solution is apparent when we define the enum value, we attach more information with it, then through the key and extensible API to use the enumeration value in the form we need.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Installation](#installation)
* [Usage](#usage)
  * [Basic](#basic)
  * [`extend()`](#extend)
* [Other Solutions](#other-solutions)
* [Contributors](#contributors)
* [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save rich-enum
```

## Usage

### Basic

Define a powerful enumeration:

```javascript
import RichEnum from 'rich-enum'

const CorpusEnum = new RichEnum({
  UNIVERSAL: {
    value: 0,
    text: 'Universal',
  },
  WEB: {
    value: 1,
    text: 'Web',
  },
  IMAGES: {
    value: 2,
    text: 'Images',
  },
  LOCAL: {
    value: 3,
    text: 'Local',
  },
  NEWS: {
    value: 4,
    text: 'News',
  },
  PRODUCTS: {
    value: 5,
    text: 'Products',
  },
  VIDEO: {
    value: 6,
    text: 'Video',
  },
})
```

Then use this:

```javascript
const {value: Corpus} = CorpusEnum
/* read the value by key */
Corpus.UNIVERSAL // 0
Corpus.VIDEO // 6

/* read the text by value */
CorpusEnum.text[Corpus.UNIVERSAL] // 'Universal'
CorpusEnum.text[Corpus.VIDEO] // 'Video'

/* read the all details of one element */
CorpusEnum.UNIVERSAL // { key: 'UNIVERSAL', value: 0, text: 'UNIVERSAL' }
CorpusEnum.VIDEO // { key: 'VIDEO', value: 6, text: 'Video' }

/* loop the all enumerations with detailed information */
CorpusEnum.collection.forEach(({key, value, text}) => {
  console.log({key, value, text})
  // { key: 'UNIVERSAL', value: 0, text: 'Universal' }
  // ...
  // { key: 'VIDEO', value: 6, text: 'Video' }
})
```

The `RichEnum` instance has properties whose key is the `value` of an enumeration item, and the value is the `property value` of the enumeration item for every property defined for enumeration items except property `value`.

The property `value` is the object whose key is the `key` of an item, and value is the value of property `value` in the properties.

For Example:

```javascript
const enumeration = new RichEnumeration({
  TYPE_A: {
    value: 0,
    text: 'Type A',
    extra: 'Extra info',
    xxx: 'xxx',
  },
})

enumeration.value.TYPE_A // 0
enumeration.text[0] // 'Type A'
enumeration.extra[0] // 'Extra info'
enumeration.xxx[0] // 'xxx'
```

### `extend()`

if you defined a rich enumeration object, it's fine for your most scenes to be used. What if you have some extra information need to be bound with the same key only for a specified scene ?

You're allowed to extend it to generate a new `RichEnum` instance object, for example:

```javascript
const SpecifiedCorpusEnum = CorpusEnum.extend({
  UNIVERSAL: {
    extra: 'Extra information of the universal',
  },
})

CorpusEnum.UNIVERSAL // { key: 'UNIVERSAL', value: 0, text: 'Universal', extra: 'Extra information of the universal' }
CorpusEnum.UNIVERSAL.extra // 'Extra information of the universal'
```

The instance method `new RichEnum().extend()` will merge the new detail object with the older one shallowly per key. And return a new instance, so it will not pollute the original instance.

## Other Solutions

I'm not aware of any, if you are please [make a pull request][prs] and add it
here!

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/10795207?v=3" width="100px;"/><br /><sub><b>Jianhua Cheng</b></sub>](https://chengjianhua.github.io)<br />[💻](https://github.com/chengjianhua/rich-enum/commits?author=chengjianhua "Code") [📖](https://github.com/chengjianhua/rich-enum/commits?author=chengjianhua "Documentation") [🚇](#infra-chengjianhua "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/chengjianhua/rich-enum/commits?author=chengjianhua "Tests") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/chengjianhua/rich-enum.svg?style=flat-square
[build]: https://travis-ci.org/chengjianhua/rich-enum
[coverage-badge]: https://img.shields.io/codecov/c/github/chengjianhua/rich-enum.svg?style=flat-square
[coverage]: https://codecov.io/github/chengjianhua/rich-enum
[version-badge]: https://img.shields.io/npm/v/rich-enum.svg?style=flat-square
[package]: https://www.npmjs.com/package/rich-enum
[downloads-badge]: https://img.shields.io/npm/dm/rich-enum.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/rich-enum
[license-badge]: https://img.shields.io/npm/l/rich-enum.svg?style=flat-square
[license]: https://github.com/chengjianhua/rich-enum/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/chengjianhua/rich-enum/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]: https://img.shields.io/github/watchers/chengjianhua/rich-enum.svg?style=social
[github-watch]: https://github.com/chengjianhua/rich-enum/watchers
[github-star-badge]: https://img.shields.io/github/stars/chengjianhua/rich-enum.svg?style=social
[github-star]: https://github.com/chengjianhua/rich-enum/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20rich-enum%20by%20%40chengjianhua%20https%3A%2F%2Fgithub.com%2Fchengjianhua%2Frich-enum%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/chengjianhua/rich-enum.svg?style=social
[emojis]: https://github.com/chengjianhua/all-contributors#emoji-key
[all-contributors]: https://github.com/chengjianhua/all-contributors
