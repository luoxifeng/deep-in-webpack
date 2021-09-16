const narmol = (node, line, col) => {

}
const htmlParse = (html) => {
  const root = {
    type: 'root',
    tagName: '',
    children: []
  }
  const stack = []
  const startTagReg = /^<([-A-Za-z0-9_]+)/
  var currNode = root
  const htmls = html.split(/\n/)
  var currHtml
  var line = -1
  console.log(htmls)
  var tagStatus = -1
  return

    

  while((currHtml = htmls.shift()) != undefined) {
    line++
    if (!currHtml.trim()) {
      currNode.children.push({
        type: 'empty',
        tagName: '',
        // children: [],
        loc: {
          start: {
            line,
            col: 0
          },
          end: {
            line,
            col: currHtml.length -1
          }
        }
      })
    } else {
      var emptyStr = ''
      if (/^(\s+)/.test(currHtml)) {
        emptyStr = RegExp.$1
        currHtml = currHtml.replace(emptyStr, '')
        narmol(currNode, line, currHtml.length - 1)
      }
      
      if (/^</.test(currHtml)) {
        // 开始标签在一行内
        if (/^<[-A-Za-z0-9_]+(?:((.*)(?:[^>])))?(\/?)>/.test(currHtml)) {
          
        } else if (//) {
          tagStatus = 1 // 开始标签
        }

      }

    }


  }

  return root
}

var html = `
  <div>
    < ffff <ul 
    v-if="9"
    > />>>
      <li></li>
      <li></li>
      <li/>
    </ul>
    <ul v-else>
      <li></li>
      <li></li>
    </ul>
  </div>
`
console.log(htmlParse(html))