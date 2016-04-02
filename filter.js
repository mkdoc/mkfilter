var through = require('through3')
  , Node = require('mkast').Node;

/**
 *  Filters nodes by node type.
 *
 *  @module {constructor} Filter
 *  @param {Object} [opts] stream options.
 */
function Filter(opts) {
  opts = opts || {};
  this.flags = opts;
}

/**
 *  Stream transform.
 *
 *  @private {function} transform
 *  @member Filter
 *
 *  @param {Array} node input node.
 *  @param {String} encoding character encoding.
 *  @param {Function} callback function.
 */
function transform(chunk, encoding, cb) {

  // explicitly disabled block element, drop the chunk
  if(this.flags[chunk.type] === true) {
    return cb();
  }

  // check for inline types that need removing
  var doc = Node.createDocumentFragment(chunk)
    , walker = doc.walker()
    , event
    , resume;

  while((event = walker.next())) {
    if(this.flags[event.node.type] === true && event.entering) {
      resume = event.node.next;
      event.node.unlink();
      if(resume) {
        walker.resumeAt(resume);
      }
    }
  }

  // original chunk converted to a document fragment
  // may have had destructive updates - push updated node
  this.push(doc.firstChild);
  cb();
}

module.exports = through.transform(transform, {ctor: Filter})
