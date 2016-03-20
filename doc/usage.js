var filter = require('../index')
  , ast = require('mkast');
ast.src('## Heading\n\nParagraph.')
  .pipe(filter({heading: true}))
  .pipe(ast.stringify({indent: 0}))
  .pipe(process.stdout);
