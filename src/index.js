const visit = require(`unist-util-visit`)
const Typograf = require('typograf')

module.exports = ({ markdownAST, markdownNode }, { locale, fields, disableRules }) => {
  const tp = new Typograf({ locale })

  disableRules.forEach(rule => {
    tp.disableRule(rule)
  })

  visit(markdownAST, `text`, (node) => {
    const processedText = String(tp.execute(node.value))
    node.value = processedText
  })
  return markdownAST
}
