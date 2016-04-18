# Filter

<? @include readme/badges.md ?>

> Filter nodes by type

Takes a map of filter flags and removes the matched types from the stream.

<? @include readme/install.md ?>

***
<!-- @toc -->
***

## Usage

Create the stream and write a [commonmark][] document:

<? @source {javascript=s/\.\.\/index/mkfilter/gm} usage.js ?>

<? @include {=readme} example.md help.md ?>

<? @exec mkapi index.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>
