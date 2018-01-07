import buildPage from './BuildPage'
import Vue from 'vue'
import VueResource from 'vue-resource'
import base64 from 'js-base64'
import marked from 'marked'

Vue.use(VueResource)

class MdState {
  constructor ({config}, cb) {
    this.config = config
    this.initializeState(cb)
  }

  headingPage = []
  introduction = []
  mainContent = []
  revisionHistory = []
  tableOfContents = []

  pageHeading = ``
  headingPageHeading = ``
  heading = ``
  scrollPosition = 0
  pageNumber = 0
  introEnd = 0

  /*
  * Split md contents into pages on '---' horizontal rule
  * @var markIt converts md to html
  * @var addPageNum adds page-num attr to each element on page
  * @var reStringIt converts html back into string
  *
  * slice at end is only needed if user puts hr at end of md, THIS MAY NEED TO BE REMOVED
  * */
  makePages (list, groupSize) {
    let rowCount = 0
    let pages = []
    let rowAccum = []

    function updateCount (pageRow) {
      if (pageRow.indexOf('#') >= 0) {
        rowCount += 38 / 16
      } else if (pageRow.indexOf('##') >= 0) {
        rowCount += 30 / 16
      } else if (pageRow.indexOf('###') >= 0) {
        rowCount += 28 / 16
      } else if (pageRow.indexOf('####') >= 0) {
        rowCount += 26 / 16
      } else if (pageRow.indexOf('**') >= 0 || pageRow.indexOf('***') >= 0) {
        rowCount += 22 / 16
      } else if (pageRow !== undefined) {
        rowCount += 16 / 16
      }
    }

    function pushRow (row) {
      rowAccum.push(row)
    }

    while (list.length) {
      const row = list.shift()
      updateCount(row)
      pushRow(row)

      if (rowCount >= groupSize || !list.length) {
        rowCount = 0
        pages.push(rowAccum.join('\n'))
        rowAccum = []
      }
    }
    return pages
  }

  createPages (md) {
    const pageInSections = md.split('---')
    const headingPage = pageInSections.shift()
    const introduction = pageInSections.shift()
    const mainContent = pageInSections.join('---')

    const sections = {}
    sections.headingPage = this.markPages(this.makePages(headingPage.split('\n'), 25))
    sections.introduction = this.markPages(this.makePages(introduction.split('\n'), 25))
    sections.mainContent = this.markPages(this.makePages(mainContent.split('\n'), 25))

    return sections
  }

  markPages (list) {
    return list.map(l => marked(l, { sanitize: true }))
  }

  initializeState (cb) {
    Vue.http.get(this.config.REPO_URL)
      .then(res => {
        const b64 = base64.Base64
        const blob = res.body.content
        const allMd = b64.decode(blob)
        const sections = this.createPages(allMd)
        this.headingPage = sections.headingPage
        this.introduction = sections.introduction
        this.mainContent = sections.mainContent
        // console.log(sections)
        buildPage({state: this}, cb)
      })
      .catch(err => console.error(err))
  }
}

export default MdState
