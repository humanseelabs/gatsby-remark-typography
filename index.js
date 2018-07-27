'use strict';

var visit = require('unist-util-visit');
var Typograf = require('typograf');

module.exports = function (_ref, _ref2) {
  var markdownAST = _ref.markdownAST,
      markdownNode = _ref.markdownNode;
  var locale = _ref2.locale,
      fields = _ref2.fields,
      disableRules = _ref2.disableRules;

  var tp = new Typograf({ locale: locale });

  disableRules.forEach(function (rule) {
    tp.disableRule(rule);
  });

  visit(markdownAST, 'text', function (node) {
    var processedText = String(tp.execute(node.value));
    node.value = processedText;
  });
  return markdownAST;
};