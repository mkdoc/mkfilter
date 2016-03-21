var through = require('through3')
  , ast = require('mkast')
  //, Node = ast.Node
  , walker = ast.walker.walk;

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

  // @todo: handle inline elements
  //function remove(node, owner) {
    ////console.dir(node._type);
    ////console.dir(owner._type);
  //}

  //walker(chunk, remove);

  // explicitly disabled, drop the chunk
  if(this.flags[chunk._type] === true) {
    return cb();
  }

  this.push(chunk);
  cb();
}

module.exports = through.transform(transform, {ctor: Filter})
