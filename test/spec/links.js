var expect = require('chai').expect
  , fs = require('fs')
  , mkast = require('mkast')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , mkfilter = require('../../index')
  , utils = require('../util')
  , collect = mkast.NodeWalker.collect;

describe('mkfilter:', function() {

  it('should have links type (no filter)', function(done) {
    var source = 'test/fixtures/links.md'
      , target = 'target/links.json.log'
      , data = parser.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data.file = source;

    var input = mkast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {input: input, output: output};
    
    mkfilter(opts);

    output.once('finish', function() {
      var result = utils.result(target);
      expect(result).to.be.an('array');
      var links = collect(result, Node.LINK);
      expect(links.length).to.eql(4);
      done();
    })
  });


  it('should remove links type', function(done) {
    var source = 'test/fixtures/links.md'
      , target = 'target/links.json.log'
      , data = parser.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data.file = source;

    var input = mkast.serialize(data)
      , output = fs.createWriteStream(target)
      // NOTE: must include the block level element
      , opts = {input: input, output: output, link: true};
   
    // use callback style
    mkfilter(opts, 
      function() {
        var result = utils.result(target);
        expect(result).to.be.an('array');
        var links = collect(result, Node.LINK);
        expect(links.length).to.eql(0);
        done();
      }
    )
  });

});
