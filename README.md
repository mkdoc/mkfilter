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

---

- [Install](#install)
- [Usage](#usage)
- [Example](#example)
- [Help](#help)
- [API](#api)
  - [filter](#filter)
    - [Options](#options)
- [License](#license)

---

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

## Example

Remove all headings from a document:

```shell
mkcat README.md | mkfilter --heading | mkout
```

Remove everything but headings and text from a document:

```shell
mkcat README.md | mkfilter --heading --text --invert | mkout
```

Print code blocks in a document:

```shell
mkcat README.md | mkfilter --code-block --invert | mkout
```

Be careful with inline elements, if the parent element is filtered out they are not included:

```shell
mkcat README.md | mkfilter --link --invert | mkout
```

But if you add a block level element to the filter:

```shell
mkcat README.md | mkfilter --link --paragraph --invert | mkout
```

They will be included in the output.

## Help

```
Usage: mkfilter [options]

  Filter nodes by type.

Options
  -i, --invert            Invert the filter
  --document              Filter document nodes
  --softbreak             Filter softbreak nodes
  --linebreak             Filter linebreak nodes
  --list                  Filter list nodes
  --item                  Filter item nodes
  --paragraph             Filter paragraph nodes
  --text                  Filter text nodes
  --heading               Filter heading nodes
  --emph                  Filter emph nodes
  --strong                Filter strong nodes
  --link                  Filter link nodes
  --image                 Filter image nodes
  --code                  Filter code nodes
  --code-block            Filter code block nodes
  --block-quote           Filter block quote nodes
  --thematic-break        Filter thematic break nodes
  --html-inline           Filter html inline nodes
  --html-block            Filter html block nodes
  --custom-inline         Filter custom inline nodes
  --custom-block          Filter custom block nodes
  --eof                   Filter eof nodes
  -h, --help              Display help and exit
  --version               Print the version and exit

mkfilter@1.1.3
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

---

Created by [mkdoc](https://github.com/mkdoc/mkdoc) on April 18, 2016

[mkdoc]: https://github.com/mkdoc/mkdoc
[mkparse]: https://github.com/mkdoc/mkparse
[commonmark]: http://commonmark.org
[npm]: https://www.npmjs.com
[github]: https://github.com
[jshint]: http://jshint.com
[jscs]: http://jscs.info

