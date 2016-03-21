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
