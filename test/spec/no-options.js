var expect = require('chai').expect
  , mkfilter = require('../../index')
  , Filter = require('../../filter');

describe('mkfilter:', function() {

  it('should return stream with no options', function(done) {
    expect(mkfilter()).to.be.an('object')
    done();
  });

  it('should create filter stream with no options', function(done) {
    expect(new Filter()).to.be.an('object')
    done();
  });

});
