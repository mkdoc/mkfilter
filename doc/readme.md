# Filter

<? @include readme/badges.md ?>

> Filter nodes by type

Takes a map of filter flags and removes the matched types from the stream.

<? @include {=readme} install.md ?>

## Usage

Create the stream and write a [commonmark][] document:

<? @source {javascript=s/\.\.\/index/mkfilter/gm} usage.js ?>

<? @exec mkapi index.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>