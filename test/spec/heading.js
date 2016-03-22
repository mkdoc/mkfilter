var expect = require('chai').expect
  , fs = require('fs')
  , mkast = require('mkast')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , mkfilter = require('../../index')
  , utils = require('../util')
  , collect = mkast.NodeWalker.collect;

describe('mkfilter:', function() {

  it('should have heading type (no filter)', function(done) {
    var source = 'test/fixtures/heading.md'
      , target = 'target/heading.json.log'
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
      expect(result).to.be.an('array');
      var headings = collect(result, Node.HEADING);
      expect(headings.length).to.eql(1);
      done();
    })
  });


  it('should remove heading type', function(done) {
    var source = 'test/fixtures/heading.md'
      , target = 'target/heading.json.log'
      , data = parser.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data._file = source;

    var input = mkast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {input: input, output: output, heading: true};
   
    // use callback style
    mkfilter(opts, 
      function() {
        var result = utils.result(target);
        expect(result).to.be.an('array');
        var headings = collect(result, Node.HEADING);
        expect(headings.length).to.eql(0);
        done();
      }
    )
  });

});
