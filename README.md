# Filter

[![Build Status](https://travis-ci.org/mkdoc/mkfilter.svg?v=3)](https://travis-ci.org/mkdoc/mkfilter)
[![npm version](http://img.shields.io/npm/v/mkfilter.svg?v=3)](https://npmjs.org/package/mkfilter)
[![Coverage Status](https://coveralls.io/repos/mkdoc/mkfilter/badge.svg?branch=master&service=github&v=3)](https://coveralls.io/github/mkdoc/mkfilter?branch=master)

> Filter nodes by type

Takes a map of filter flags and removes the matched types from the stream.

## Install

```
npm i mkfilter --save
```

For the command line interface install [mkdoc][] globally (`npm i -g mkdoc`).

## Usage

Create the stream and write a [commonmark][] document:

```javascript
var filter = require('mkfilter')
  , ast = require('mkast');
ast.src('## Heading\n\nParagraph.')
  .pipe(filter({heading: true}))
  .pipe(ast.stringify({indent: 0}))
  .pipe(process.stdout);
```

## API

### filter

```javascript
filter([opts][, cb])
```

Filter nodes by node type.

Returns an output stream.

* `opts` Object processing options.
* `cb` Function callback function.

#### Options

* `input` Readable input stream.
* `output` Writable output stream.

## License

MIT

Generated by [mkdoc](https://github.com/mkdoc/mkdoc).

[mkdoc]: https://github.com/mkdoc/mkdoc
[mkparse]: https://github.com/mkdoc/mkparse
[commonmark]: http://commonmark.org
[npm]: https://www.npmjs.com
[github]: https://github.com
[jshint]: http://jshint.com
[jscs]: http://jscs.info
