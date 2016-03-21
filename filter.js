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
  this.keys = Object.keys(opts);
  this.flags = opts;
}

/**
 *  Stream transform.
 *
 *  @private {function} transform
 *  @member Filter
 *
 *  @param {Array} node input AST node.
 *  @param {String} encoding character encoding.
 *  @param {Function} callback function.
 */
function transform(chunk, encoding, cb) {
  var flags = this.flags;

  // explicitly disabled, drop the chunk
  if(flags[chunk._type] === true) {
    return cb();
  }

  var doc = Node.createDocumentFragment(chunk)
    , walker = doc.walker()
    , event
    , resume;

  while((event = walker.next())) {
    if(flags[event.node._type] === true && event.entering) {
      resume = event.node.next || event.node.parent;
      event.node.unlink();
      if(resume) {
        walker.resumeAt(resume);
      }
    }
  }

  // original chunk converted to a node
  // may have had destructive updates, serialize and push
  this.push(doc.firstChild);
  cb();
}

module.exports = through.transform(transform, {ctor: Filter})
