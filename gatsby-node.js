'use strict';

var Typograf = require('typograf');

exports.onPreExtractQueries = function (_ref, _ref2) {
  var boundActionCreators = _ref.boundActionCreators,
      getNodes = _ref.getNodes,
      getNode = _ref.getNode;
  var locale = _ref2.locale,
      fields = _ref2.fields,
      disableRules = _ref2.disableRules;

  var tp = new Typograf({ locale: locale });

  disableRules.forEach(function (rule) {
    tp.disableRule(rule);
  });
  var markdownNodes = getNodes().filter(function (node) {
    return node.internal.type === 'MarkdownRemark';
  });
  markdownNodes.forEach(function (node) {
    fields.forEach(function (f) {
      var value = node.frontmatter[f];
      if (value) {
        node.frontmatter[f] = tp.execute(value);
      }
    });
  });
};