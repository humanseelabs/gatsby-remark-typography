'use strict';

var visit = require('unist-util-visit');
var Typograf = require('typograf');
var tp = new Typograf({ locale: ['ru'] });

module.exports = function (_ref) {
  var markdownAST = _ref.markdownAST,
      markdownNode = _ref.markdownNode;
  var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  visit(markdownAST, 'text', function (node) {
    var processedText = String(tp.execute(node.value));
    node.value = processedText;
  });
  return markdownAST;
};