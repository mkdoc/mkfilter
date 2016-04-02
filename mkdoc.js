var mk = require('mktask');

// @task api build the api docs.
function api(cb) {
  mk.api(
    ['index.js'],
    {
      output: mk.dest('API.md'),
      heading: 'API'
    }, cb);
}

// @task readme build the readme file.
function readme(cb) {
  mk.doc('doc/readme.md')
    .pipe(mk.pi())
    .pipe(mk.ref())
    .pipe(mk.abs())
    .pipe(mk.msg())
    .pipe(mk.toc({depth: 2}))
    .pipe(mk.out())
    .pipe(mk.dest('README.md'))
    .on('finish', cb);
}

mk.task(api);
mk.task(readme);
