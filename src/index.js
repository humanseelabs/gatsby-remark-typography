const visit = require(`unist-util-visit`)
const Typograf = require('typograf')
const tp = new Typograf({ locale: ['ru'] })

module.exports = ({ markdownAST, markdownNode }, pluginOptions = {}) => {
  visit(markdownAST, `text`, (node) => {
    const processedText = String(tp.execute(node.value))
    node.value = processedText
  })
  return markdownAST
}
