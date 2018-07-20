"use strict";

var Typograf = require("typograf");
var tp = new Typograf({ locale: ["ru"] });

var fields = ["description", "lead"];

exports.onPreExtractQueries = function (_ref) {
  var boundActionCreators = _ref.boundActionCreators,
      getNodes = _ref.getNodes,
      getNode = _ref.getNode;

  var markdownNodes = getNodes().filter(function (node) {
    return node.internal.type === "MarkdownRemark";
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