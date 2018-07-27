const Typograf = require('typograf')

exports.onPreExtractQueries = ({ boundActionCreators, getNodes, getNode }, { locale, fields, disableRules }) => {
  const tp = new Typograf({ locale })

  disableRules.forEach(rule => {
    tp.disableRule(rule)
  })
  const markdownNodes = getNodes().filter(node => node.internal.type === 'MarkdownRemark')
  markdownNodes.forEach(node => {
    fields.forEach(f => {
      const value = node.frontmatter[f]
      if (value) {
        node.frontmatter[f] = tp.execute(value)
      }
    })
  })
}
