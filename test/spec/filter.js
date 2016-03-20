var expect = require('chai').expect
  , fs = require('fs')
  , mkast = require('mkast')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , mkfilter = require('../../index')
  , utils = require('../util')
  , collect = mkast.walker.collect;

describe('mkfilter:', function() {

  it('should make relative links absolute', function(done) {
    var source = 'test/fixtures/filter.md'
      , target = 'target/filter.json.log'
      , data = parser.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data._file = source;

    var input = mkast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {input: input, output: output};
    
    mkfilter(opts);

    output.once('finish', function() {
      var result = utils.result(target);

      console.dir(result);

      expect(result).to.be.an('array');

      done();
    })
  });

});
