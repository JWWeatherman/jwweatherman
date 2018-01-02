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

  markupList = []
  md = ``
  tableContents = ``
  pageHeading = ``
  headingPageHeading = ``
  heading = ``
  scrollPosition = 0
  pageNumber = 0

  /*
  * Split md contents into pages on '---' horizontal rule
  * @var markIt converts md to html
  * @var addPageNum adds page-num attr to each element on page
  * @var reStringIt converts html back into string
  *
  * slice at end is only needed if user puts hr at end of md, THIS MAY NEED TO BE REMOVED
  * */
  createPages (md) {
    return md.split('---').slice(0, -1)
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
        const pages = this.createPages(allMd)
        this.markupList = this.markPages(pages)

        // console.log(JSON.stringify(config, null, 4))
        buildPage({state: this}, cb)
      })
      .catch(err => console.error(err))
  }

  updatePageNumber (number) {
    this.pageNumber = number
  }

  updateScrollPosition (percent) {
    this.scrollPosition = percent
  }
}

export default MdState
