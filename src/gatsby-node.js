const Typograf = require("typograf");
const tp = new Typograf({ locale: ["ru"] });

const fields = ["description", "lead"];

exports.onPreExtractQueries = ({ boundActionCreators, getNodes, getNode }) => {
  const markdownNodes = getNodes().filter(
    node => node.internal.type === "MarkdownRemark"
  );
  markdownNodes.forEach(node => {
    fields.forEach(f => {
      const value = node.frontmatter[f];
      if (value) {
        node.frontmatter[f] = tp.execute(value);
      }
    });
  });
};
