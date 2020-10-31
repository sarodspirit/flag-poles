<h1 align="center">
  flagpole⛳ 
</h1>
<p align="center" style="font-size: 1.2rem;">Build fast and simple feature flags to integrate seamlessly into your react components</p>
<hr />



[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs] 
[![Code of Conduct][coc-badge]][coc]

[![Supports React][react-badge]][react]
[![size][size-badge]][unpkg-dist] [![gzip size][gzip-badge]][unpkg-dist]
[![module formats: umd, cjs, and es][module-formats-badge]][unpkg-dist]

## The problem
You need feature flags, to show or hide certain parts of your application and
you want it to be easy. You also don' want to pay a lot of money for this.

## This solution

The library offers a couple of solutions. The first solution, is a flag "guard"
which you can use to wrap your component passing a simple identifier attribute.

The second solution is a compound component which offers on/off branches in case
you want to show custom content if the feature flag is disabled.


For examples on how to use the hooks or the Downshift component, check out our
[docsite][docsite]!


> NOTE: The original use case of this component is autocomplete, however the API
> is powerful and flexible enough to build things like dropdowns as well.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save flagpole
```

> This package also depends on `react`. Please make sure you have it installed
> as well.


## Usage

> [Try it out in the browser][code-sandbox-try-it-out]

```jsx
import * as React from 'react'
import {render} from 'react-dom'
import {FlagProvider, FlagGuard} from 'flagpole'

const FlagMap={
    '#dont_render_me':{ enabled:false}
}

render(
  <FlagProvider value={FlagMap}>
    <div>You can see mee</div>
    <FlagGuard flag="#dont_rende_me">
        <div>I shall not be rendered</div>
    </FlagGuard>
    <div>You can see me too</div>
  </FlagProvider>,
  document.getElementById('root'),
)
```
## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->


<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org

[prs-badge]:
  https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com

[coc-badge]:
  https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/sarodspirit/flagpole/blob/master/CODE_OF_CONDUCT.md
[react-badge]:
  https://img.shields.io/badge/%E2%9A%9B%EF%B8%8F-(p)react-00d8ff.svg?style=flat-square
[react]: https://facebook.github.io/react/
[gzip-badge]:
  http://img.badgesize.io/https://unpkg.com/downshift/dist/downshift.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]:
  http://img.badgesize.io/https://unpkg.com/downshift/dist/downshift.umd.min.js?label=size&style=flat-square
[module-formats-badge]:
  https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[semver]: http://semver.org/
[docsite]: https://downshift-js.com/