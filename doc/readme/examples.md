## Examples

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
